import type { RefObject } from "react";

export type PageModule = {
  default: () => React.JSX.Element;
};

export enum PageType {
  ABOUT = "about",
  LOCATION = "location",
  GUIDELINES = "guidelines",
  PICTURES = "pictures",
  CONTACT = "contact",
}

export type PageManagerRenderProps = {
  id: PageType;
  containerRef: RefObject<HTMLDivElement | null>;
  zIndex: number;
};
