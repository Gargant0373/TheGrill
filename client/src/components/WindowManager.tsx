import { useEffect, useRef, useState } from "react";

import { useIsMobile } from "../hooks/useIsMobile";
import { WindowFocusEvent } from "../types/window";
import windowsRegistry from "./windows/registry";
import { Countdown } from "./Countdown";
import { BACKGROUND_VIDEO_SOURCE, WINDOW_FOCUS_EVENT } from "../constants";

export function WindowManager() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [windowOrder, setWindowOrder] = useState(() => windowsRegistry.map(({ id }) => id));
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler: EventListener = (e) => {
      const id = (e as WindowFocusEvent).detail?.type;
      if (id) setWindowOrder((o) => [...o.filter((x) => x !== id), id]);
    };
    window.addEventListener(WINDOW_FOCUS_EVENT, handler);
    return () => window.removeEventListener(WINDOW_FOCUS_EVENT, handler);
  }, []);

  return (
    <section className="relative size-full overflow-hidden bg-teal-900 px-0 sm:p-6">
      <div
        ref={containerRef}
        className="relative z-10 size-full overflow-hidden sm:rounded-[100px] sm:border-3 border-emerald-600 bg-beige"
      >
        {isMobile ? (
          <img 
            src="/assets/TheGrillLogo_Full_Background.svg"
            className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 w-full h-auto"
            alt="The Grill logo (mobile)"
          />
        ) : (
          <img 
            src="/assets/TheGrillLogo_Full.svg"
            className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 w-6/10 h-auto mt-4"
            alt="The Grill logo"
          />
        )}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 px-4">
          <Countdown />
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 size-full object-cover saturate-[0.82] sepia-[0.24] brightness-[0.82] contrast-[1.06]"
            src={BACKGROUND_VIDEO_SOURCE}
            title="Window manager background video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(30,20,10,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,220,175,0.08)_0px,rgba(255,220,175,0.08)_1px,transparent_2px,transparent_3px)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(90,56,24,0.18)_0%,rgba(22,12,6,0.38)_100%)]" />
        </div>
        {windowsRegistry.map(({ id, Component }) => (
          <Component
            key={id}
            id={id}
            containerRef={containerRef}
            zIndex={(windowOrder.indexOf(id) ?? 1) + 30}
          />
        ))}
      </div>
    </section>
  );
}
