import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, ReactNode } from "react";

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
          <PageSlide title={id}>
            <Component />
          </PageSlide>
        ),
      })),
    ],
    [],
  );

  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState<{
    next: number;
    dir: SwipeDirection;
    started: boolean;
  } | null>(null);
  const activeRef = useRef(0);
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

    activeRef.current = transition.next;
    setActive(transition.next);
    setTransition(null);

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
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40">
        <div className="relative w-full aspect-[507.9408/186.47556]">
          <div
            className="absolute inset-0 bg-green-darkest [mask-image:url('/assets/TheGrillLogo_Full_Background.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/assets/TheGrillLogo_Full_Background.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
            aria-hidden="true"
          />
          <img
            src="/assets/TheGrillLogo_Full_Background.svg"
            className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] object-contain"
            alt="The Grill logo (mobile)"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-10 inset-x-0 z-40 w-full px-4 text-center [container-type:inline-size]">
        <p className="text-outline-green-light font-black uppercase tracking-[0.08em] text-green-dark leading-none text-[clamp(3rem,10vw,6rem)] [@supports(font-size:1cqw)]:text-[min(16cqw,6rem)]">
          Swipe
        </p>
        <p className="text-outline-green-light -mt-2 font-title text-green-dark leading-none rotate-2 text-[clamp(3rem,10vw,6rem)] [@supports(font-size:1cqw)]:text-[min(16cqw,6rem)]">
          ➜
        </p>
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
