import type { RefObject } from "react";
import { WINDOW_FOCUS_EVENT, WINDOW_OPEN_EVENT } from "../constants";

export enum WindowType {
  ABOUT = "about",
  LOCATION = "location",
  GUIDELINES = "guidelines",
  PICTURES = "pictures",
  CONTACT = "contact",
  SETTINGS = "settings",
}

export type WindowOpenMode = "default" | "center";

export type WindowOpenPayload = {
  type: WindowType;
  openMode?: WindowOpenMode;
};

export type WindowFocusPayload = {
  type: WindowType;
};

export class WindowOpenEvent extends CustomEvent<WindowOpenPayload> {
  constructor(detail: WindowOpenPayload) {
    super(WINDOW_OPEN_EVENT, { detail });
  }
}

export class WindowFocusEvent extends CustomEvent<WindowFocusPayload> {
  constructor(detail: WindowFocusPayload) {
    super(WINDOW_FOCUS_EVENT, { detail });
  }
}

export type WindowManagerRenderProps = {
  id: WindowType;
  containerRef: RefObject<HTMLDivElement | null>;
  zIndex: number;
};

export type WindowModule = {
  default: (props: WindowManagerRenderProps) => React.JSX.Element;
};

export type Position = {
  x: number;
  y: number;
};
