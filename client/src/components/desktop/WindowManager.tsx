import { useRef, useState, useEffect } from "react";
import { WINDOW_FOCUS_EVENT } from "../../constants";
import type { WindowFocusEvent } from "../../types/window";
import BackgroundVideo from "../BackgroundVideo";
import Countdown from "../Countdown";
import pageRegistry from "../pages/registry";
import Window from "./Window";

export default function WindowManager() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [windowOrder, setWindowOrder] = useState(() => pageRegistry.map(({ id }) => id));

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
        className="relative z-10 size-full overflow-hidden sm:rounded-[100px] sm:border-3 border-green-light bg-yellow"
      >
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center">
          <img
            src="/assets/TheGrillLogo_Full.svg"
            className="mt-4 w-6/10 h-auto"
            alt="The Grill logo"
          />
          <div className="mt-6 w-6/10 px-4 [container-type:inline-size]">
            <Countdown />
          </div>
        </div>
        <BackgroundVideo />
        {pageRegistry.map(({ id, Component }) => (
          <Window
            key={id}
            id={id}
            containerRef={containerRef}
            zIndex={(windowOrder.indexOf(id) ?? 1) + 30}
          >
            <Component />
          </Window>
        ))}
      </div>
    </section>
  );
}
