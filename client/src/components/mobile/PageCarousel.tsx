import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

import { getPageTypeFromPath, isPageType } from "../../utils/misc.util";
import pageRegistry from "../pages/registry";
import HomeSlide from "./HomeSlide";
import PageSlide from "./PageSlide";
import BackgroundVideo from "../BackgroundVideo";

type SwipeDirection = -1 | 1;

type Slide = {
  id: string;
  content: ReactNode;
};

type Transition = {
  next: number;
  dir: SwipeDirection;
  started: boolean;
};

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

const TRANSITION_CSS = "transform 260ms cubic-bezier(0.2, 0.65, 0.15, 1)";

function getSlideProps(index: number, active: number, t: Transition | null) {
  if (index === active)
    return {
      style: {
        transform: !t?.started
          ? "rotateY(0deg)"
          : t.dir === 1
            ? "rotateY(-90deg)"
            : "rotateY(90deg)",
        transformOrigin: t?.dir === 1 ? "left center" : "right center",
        transition: t ? TRANSITION_CSS : "none",
      } as React.CSSProperties,
    };

  if (t?.next === index)
    return {
      style: {
        transform: t.started ? "rotateY(0deg)" : t.dir === 1 ? "rotateY(90deg)" : "rotateY(-90deg)",
        transformOrigin: t.dir === 1 ? "right center" : "left center",
        transition: TRANSITION_CSS,
      } as React.CSSProperties,
    };

  return {
    style: {
      transform: "rotateY(180deg)",
      transition: "none",
      visibility: "hidden" as const,
      zIndex: 0,
    },
  };
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
  const [transition, setTransition] = useState<Transition | null>(null);
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
    if (!transition) return;
    const next = transition.next;
    activeRef.current = next;
    setActive(next);
    setTransition(null);

    const nextId = pages[next].id;
    const nextPath = isPageType(nextId) ? `/${nextId}` : "/";
    if (location.pathname !== nextPath) history.replaceState(null, "", nextPath);

    const queued = queuedDir.current;
    queuedDir.current = null;
    if (queued !== null) startSwipe(queued);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const delta = pointerStart.current !== null ? e.clientX - pointerStart.current : 0;
    pointerStart.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (Math.abs(delta) >= 50) triggerSwipe(delta < 0 ? 1 : -1);
  };

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
        {pages.map((page, index) => (
          <article
            key={page.id}
            className="absolute inset-0 overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden]"
            {...getSlideProps(index, active, transition)}
            onTransitionEnd={index === active ? finishSwipe : undefined}
          >
            {page.content}
          </article>
        ))}
      </div>
    </section>
  );
}
