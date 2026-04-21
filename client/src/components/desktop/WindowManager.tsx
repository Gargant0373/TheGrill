import { useRef, useState, useEffect } from "react";
import { WINDOW_FOCUS_EVENT } from "../../constants";
import type { WindowFocusEvent } from "../../types/window";
import BackgroundVideo from "../BackgroundVideo";
import Countdown from "../Countdown";
import pageRegistry from "../pages/registry";
import Window, { type WindowAspectRatio } from "./Window";
import type { PageType } from "../../types/page";

const WINDOW_RATIOS: Record<PageType, WindowAspectRatio> = {
  about: "1-1",
  guidelines: "1-1",
  location: "3-4",
  pictures: "10-16",
};

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
        <div className="absolute inset-0 z-20 flex flex-col items-center">
          <img
            src="/assets/wavy_logo_colors.svg"
            className="mt-4 w-6/10 h-auto"
            alt="The Grill logo"
          />
          <div className="absolute bottom-32 mt-6 w-6/10 px-4 [container-type:inline-size]">
            <Countdown />
          </div>
          <a
            href="https://www.instagram.com/thegrill.live/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex justify-center z-30 mt-6 text-green-dark text-outline-green-light text-xl cursor-pointer absolute bottom-22"
            aria-label="Visit our Instagram"
          >
            <img
              src="/assets/instagram.svg"
              alt="Instagram"
              className="w-7 h-7 invert icon-green-outline"
            />
            <span className="font-semibold ml-2">@thegrill.live</span>
          </a>
        </div>
        <BackgroundVideo />
        {pageRegistry.map(({ id, Component }) => (
          <Window
            key={id}
            id={id}
            containerRef={containerRef}
            zIndex={(windowOrder.indexOf(id) ?? 1) + 30}
            aspectRatio={WINDOW_RATIOS[id] || "1-1"}
          >
            <Component />
          </Window>
        ))}
      </div>
    </section>
  );
}
