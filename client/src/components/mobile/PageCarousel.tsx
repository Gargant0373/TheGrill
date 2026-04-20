import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

import { getPageTypeFromPath, isPageType } from "../../utils/misc.util";
import BackgroundVideo from "../BackgroundVideo";
import pageRegistry from "../pages/registry";
import HomeSlide from "./HomeSlide";
import PageSlide from "./PageSlide";

type SwipeDirection = -1 | 1;

type Slide = {
  id: string;
  content: ReactNode;
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export default function PageCarousel() {
  const pages = useMemo<Slide[]>(
    () => [
      { id: "home", content: <HomeSlide /> },
      ...pageRegistry.map(({ id, Component }) => ({
        id,
        content: (
          <PageSlide>
            <Component />
          </PageSlide>
        ),
      })),
    ],
    [],
  );

  const [active, setActive] = useState(() =>
    Math.max(
      0,
      pages.findIndex((p) => p.id === getPageTypeFromPath(location.pathname)),
    ),
  );
  const [transition, setTransition] = useState<{
    next: number;
    dir: SwipeDirection;
    started: boolean;
  } | null>(null);
  const activeRef = useRef(active);
  const queuedDir = useRef<SwipeDirection | null>(null);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    if (!transition?.started) {
      const id = requestAnimationFrame(() =>
        setTransition((t) => (t ? { ...t, started: true } : t)),
      );
      return () => cancelAnimationFrame(id);
    }
  }, [transition?.next]);

  const startSwipe = (dir: SwipeDirection) => {
    const next = wrapIndex(activeRef.current + dir, pages.length);
    setTransition({ next, dir, started: false });
  };

  const triggerSwipe = (dir: SwipeDirection) => {
    if (transition) {
      queuedDir.current = dir;
      return;
    }
    startSwipe(dir);
  };

  const finishSwipe = () => {
    if (!transition) {
      return;
    }

    const next = transition.next;

    activeRef.current = next;
    setActive(next);
    setTransition(null);

    const nextId = pages[next].id;
    const nextPath = isPageType(nextId) ? `/${nextId}` : "/";

    if (location.pathname !== nextPath) {
      history.replaceState(null, "", nextPath);
    }

    const queued = queuedDir.current;
    queuedDir.current = null;
    if (queued !== null) {
      startSwipe(queued);
    }
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const delta = pointerStart.current !== null ? e.clientX - pointerStart.current : 0;
    pointerStart.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (Math.abs(delta) >= 50) {
      triggerSwipe(delta < 0 ? 1 : -1);
    }
  };

  const rotY = (deg: number) => `rotateY(${deg}deg)`;

  const currentTransform = !transition
    ? rotY(0)
    : rotY(transition.started ? (transition.dir === 1 ? -90 : 90) : 0);

  const incomingTransform = !transition
    ? rotY(0)
    : rotY(transition.started ? 0 : transition.dir === 1 ? 90 : -90);

  const slideStyle = (origin: string, transform: string, isTransitioning: boolean) => ({
    transformStyle: "preserve-3d" as const,
    backfaceVisibility: "hidden" as const,
    transformOrigin: origin,
    transform,
    transition: isTransitioning ? "transform 260ms cubic-bezier(0.2, 0.65, 0.15, 1)" : "none",
  });

  return (
    <section
      className="relative size-full overflow-hidden bg-teal-900"
      style={{ perspective: "1200px" }}
    >
      <BackgroundVideo />
      <div className="absolute bottom-0 inset-x-0 z-40 w-full text-center [container-type:inline-size] flex flex-row">
        <div className="relative w-1/2 overflow-hidden" onClick={() => triggerSwipe(-1)}>
          <img src="/assets/swipe.svg" alt="Swipe left indicator" className="scale-x-[-1]" />
        </div>
        <div className="relative w-1/2 overflow-hidden" onClick={() => triggerSwipe(1)}>
          <img src="/assets/swipe.svg" alt="Swipe right indicator" />
        </div>
      </div>
      <div
        className="relative size-full touch-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <article
          key={`current-${pages[active].id}`}
          className="absolute inset-0 overflow-hidden"
          style={slideStyle(
            transition?.dir === 1 ? "left center" : "right center",
            currentTransform,
            !!transition,
          )}
          onTransitionEnd={finishSwipe}
        >
          {pages[active].content}
        </article>

        {transition && (
          <article
            key={`incoming-${pages[transition.next].id}`}
            className="absolute inset-0 overflow-hidden"
            style={slideStyle(
              transition.dir === 1 ? "right center" : "left center",
              incomingTransform,
              true,
            )}
          >
            {pages[transition.next].content}
          </article>
        )}
      </div>
    </section>
  );
}
