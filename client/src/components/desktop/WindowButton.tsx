import type { ButtonHTMLAttributes, ReactNode } from "react";
import { WindowOpenEvent } from "../../types/window";
import type { PageType } from "../../types/page";

type WindowButtonProps = { event: PageType; icon?: ReactNode; label: string } & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
>;

export default function WindowButton({ event, icon, label, onClick, ...props }: WindowButtonProps) {
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
