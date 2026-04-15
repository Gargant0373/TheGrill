import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { WindowFocusEvent, WindowOpenEvent, type Position } from "../../types/window";
import { WINDOW_OPEN_EVENT } from "../../constants";
import usePositionedOverlay from "../../hooks/usePositionedOverlay";
import PositionedOverlay from "./PositionedOverlay";
import type { PageType } from "../../types/page";

export type WindowAspectRatio = "1-1" | "3-4" | "4-3" | "10-16" | "16-10";

const FRAME_SVGS: Record<WindowAspectRatio, string> = {
  "1-1": "/assets/frames/Frame_1_1.svg",
  "3-4": "/assets/frames/Frame_3_4.svg",
  "4-3": "/assets/frames/Frame_4_3.svg",
  "10-16": "/assets/frames/Frame_10_16.svg",
  "16-10": "/assets/frames/Frame_16_10.svg",
};

const ASPECT_RATIO_VALUES: Record<WindowAspectRatio, number> = {
  "1-1": 1,
  "3-4": 3 / 4,
  "4-3": 4 / 3,
  "10-16": 10 / 16,
  "16-10": 16 / 10,
};

type WindowProps = {
  id: PageType;
  children: ReactNode;
  className?: string;
  containerRef: RefObject<HTMLDivElement | null>;
  zIndex: number;
  defaultPosition?: Position;
  aspectRatio?: WindowAspectRatio;
};

export default function Window({
  id,
  children,
  className,
  containerRef,
  zIndex,
  defaultPosition,
  aspectRatio = "1-1",
}: WindowProps) {
  const { position, setPosition, isClosing, closeOverlay } = usePositionedOverlay();
  const windowRef = useRef<HTMLDivElement | null>(null);
  const lastPositionRef = useRef<Position | null>(defaultPosition ?? null);

  const emitFocus = useCallback(
    () => window.dispatchEvent(new WindowFocusEvent({ type: id })),
    [id],
  );

  const clamp = useCallback(
    (x: number, y: number) => {
      const c = containerRef.current,
        w = windowRef.current;
      if (!c || !w) return { x, y };
      return {
        x: Math.min(Math.max(0, x), Math.max(0, c.clientWidth - w.offsetWidth)),
        y: Math.min(Math.max(0, y), Math.max(0, c.clientHeight - w.offsetHeight)),
      };
    },
    [containerRef],
  );

  const randomPos = useCallback(() => {
    const c = containerRef.current;

    if (!c) return defaultPosition ?? { x: 24, y: 24 };

    const w = windowRef.current?.offsetWidth ?? 420,
      h = windowRef.current?.offsetHeight ?? 260;
    return {
      x: Math.round(Math.random() * Math.max(0, c.clientWidth - w)),
      y: Math.round(Math.random() * Math.max(0, c.clientHeight - h)),
    };
  }, [containerRef, defaultPosition]);

  const centerPos = useCallback(() => {
    const c = containerRef.current,
      w = windowRef.current;

    return clamp(
      Math.round(
        (Math.max(0, c?.clientWidth ?? innerWidth) - Math.max(1, w?.offsetWidth ?? 420)) / 2,
      ),
      Math.round(
        (Math.max(0, c?.clientHeight ?? innerHeight) - Math.max(1, w?.offsetHeight ?? 260)) / 2,
      ),
    );
  }, [clamp, containerRef]);

  useEffect(() => {
    const handler: EventListener = (e) => {
      const { detail } = e as WindowOpenEvent;

      if (detail?.type !== id) return;

      let pos = lastPositionRef.current;

      if (detail.openMode === "center") {
        pos = centerPos();
        setPosition(pos);
        lastPositionRef.current = pos;
        requestAnimationFrame(() => {
          const p = centerPos();
          setPosition(p);
          lastPositionRef.current = p;
        });
      } else {
        pos ??= randomPos();
        setPosition(pos);
        lastPositionRef.current = pos;
      }
      emitFocus();
    };
    window.addEventListener(WINDOW_OPEN_EVENT, handler);
    return () => window.removeEventListener(WINDOW_OPEN_EVENT, handler);
  }, [centerPos, randomPos, id, emitFocus, setPosition]);

  useEffect(() => {
    const handler = () =>
      setPosition((p) => {
        if (!p) return p;
        const c = clamp(p.x, p.y);
        lastPositionRef.current = c;
        return c;
      });
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [clamp, setPosition]);

  const beginDrag = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.button !== 0 || !position) return;
    emitFocus();

    const { x: ix, y: iy } = position,
      sx = e.clientX,
      sy = e.clientY;

    const onMove = (me: PointerEvent) => {
      const p = clamp(ix + me.clientX - sx, iy + me.clientY - sy);
      setPosition(p);
      lastPositionRef.current = p;
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  if (!position) return null;

  return (
    <PositionedOverlay
      ref={windowRef}
      position={position}
      isClosing={isClosing}
      zIndex={zIndex}
      onPointerDown={(e) => {
        emitFocus();
        if (
          !(e.target as HTMLElement).closest(
            '[data-window-content="true"], [data-window-close="true"]',
          )
        )
          beginDrag(e);
      }}
      className={`absolute w-105 max-w-[calc(100%-1rem)] min-w-48 min-h-48 cursor-move rounded-md bg-yellow-light p-10 flex flex-col justify-start ${className ?? ""}`}
      style={
        {
          "--window-frame-image": `url('${FRAME_SVGS[aspectRatio]}')`,
          aspectRatio: ASPECT_RATIO_VALUES[aspectRatio],
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -m-10 inset-0 z-20 bg-no-repeat bg-center bg-[length:100%_100%]"
        style={{ backgroundImage: "var(--window-frame-image)" }}
      />
      <header className="mb-1 flex select-none items-center gap-2">
        <button
          type="button"
          data-window-close="true"
          onClick={closeOverlay}
          className="group inline-flex cursor-pointer items-center justify-center rounded-sm bg-transparent p-1 text-lg font-black leading-none outline-none transition-colors duration-150 active:bg-purple-dark"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAB1JREFUCNdjOMADQgYGIMRzAISYGYAIwoaIQ9QAAKYLB+eSH+asAAAAAElFTkSuQmCC"
            alt="Close"
            className="h-2.5 w-2.5 transition-[filter] duration-150 filter-[brightness(0)_saturate(100%)_invert(18%)_sepia(88%)_saturate(1796%)_hue-rotate(207deg)_brightness(90%)_contrast(106%)] group-active:filter-[brightness(0)_saturate(100%)_invert(92%)_sepia(25%)_saturate(577%)_hue-rotate(330deg)_brightness(100%)_contrast(95%)]"
          />
        </button>
        <div className="flex min-h-7 flex-1 cursor-move items-center" />
        <span className="text-lg uppercase tracking-tight text-purple-dark font-title">{id}</span>
      </header>
      <div
        data-window-content="true"
        className={`cursor-auto rounded-md border border-green-light bg-yellow-surface p-3 overflow-auto ${className ?? ""}`.trim()}
      >
        {children}
      </div>
    </PositionedOverlay>
  );
}
