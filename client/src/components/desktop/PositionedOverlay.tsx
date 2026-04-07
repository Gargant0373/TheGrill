import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import type { Position } from "../../types/window";

type PositionedOverlayProps = {
  position: Position | null;
  isClosing: boolean;
  zIndex?: number;
} & ComponentPropsWithoutRef<"div">;

export default forwardRef<HTMLDivElement, PositionedOverlayProps>(
  ({ position, isClosing, children, className = "", zIndex, style, ...props }, ref) => {
    if (!position && !isClosing) return null;
    return (
      <div
        {...props}
        ref={ref}
        className={twMerge(isClosing ? "animate-window-close" : "animate-window-open", className)}
        style={{
          left: position?.x,
          top: position?.y,
          pointerEvents: isClosing ? "none" : "auto",
          ...(zIndex !== undefined && { zIndex }),
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);
