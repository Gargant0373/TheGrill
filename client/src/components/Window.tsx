import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { WindowFocusEvent, WindowOpenEvent, type Position, type WindowType } from "../types/window";
import { WINDOW_OPEN_EVENT } from "../constants";
import usePositionedOverlay from "../hooks/usePositionedOverlay";
import { PositionedOverlay } from "./PositionedOverlay";

type WindowProps = {
  id: WindowType;
  children: ReactNode;
  className?: string;
  containerRef: RefObject<HTMLDivElement | null>;
  zIndex: number;
  defaultPosition?: Position;
};

export function Window({
  id,
  children,
  className,
  containerRef,
  zIndex,
  defaultPosition,
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
      className="absolute w-105 max-w-[calc(100%-1rem)] cursor-move rounded-md border-2 border-blue bg-[#f7edd4] p-1.5"
    >
      <header className="mb-1 flex select-none items-center gap-2">
        <button
          type="button"
          data-window-close="true"
          onClick={closeOverlay}
          className="group inline-flex cursor-pointer items-center justify-center rounded-sm bg-transparent p-1 text-lg font-black leading-none outline-none transition-colors duration-150 active:bg-blue-dark"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOAQMAAAAlhr+SAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAB1JREFUCNdjOMADQgYGIMRzAISYGYAIwoaIQ9QAAKYLB+eSH+asAAAAAElFTkSuQmCC"
            alt="Close"
            className="h-2.5 w-2.5 transition-[filter] duration-150 filter-[brightness(0)_saturate(100%)_invert(18%)_sepia(88%)_saturate(1796%)_hue-rotate(207deg)_brightness(90%)_contrast(106%)] group-active:filter-[brightness(0)_saturate(100%)_invert(92%)_sepia(25%)_saturate(577%)_hue-rotate(330deg)_brightness(100%)_contrast(95%)]"
          />
        </button>
        <div className="flex min-h-7 flex-1 cursor-move items-center" />
        <span className="text-lg uppercase tracking-tight text-blue-dark font-ishmeria">{id}</span>
      </header>
      <div
        data-window-content="true"
        className={`cursor-auto rounded-md border border-blue bg-[#f9f6ee] p-3 ${className ?? ""}`.trim()}
      >
        {children}
      </div>
    </PositionedOverlay>
  );
}
