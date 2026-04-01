import type { ButtonHTMLAttributes, ReactNode } from "react";
import { WindowOpenEvent, type WindowType } from "../types/window";

type WindowButtonProps = { event: WindowType; icon?: ReactNode; label: string } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export function WindowButton({ event, icon, label, onClick, ...props }: WindowButtonProps) {
  return (
    <button
      {...props}
      type="button"
      onClick={(e) => {
        onClick?.(e);
        window.dispatchEvent(new WindowOpenEvent({ type: event }));
      }}
    >
      {icon && (
        <span className="text-lg leading-none" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{label}</span>
    </button>
  );
}
