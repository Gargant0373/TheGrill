import { WINDOW_FOCUS_EVENT, WINDOW_OPEN_EVENT } from "../constants";
import type { PageType } from "./page";

export type WindowOpenMode = "default" | "center";

export type WindowOpenPayload = {
  type: PageType;
  openMode?: WindowOpenMode;
};

export type WindowFocusPayload = {
  type: PageType;
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

export type Position = {
  x: number;
  y: number;
};
