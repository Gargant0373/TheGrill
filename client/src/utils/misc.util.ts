import { PageType } from "../types/page";

const PAGE_TYPES = new Set<string>(Object.values(PageType));

export function isPageType(value: string): value is PageType {
  return PAGE_TYPES.has(value);
}

export function getPageTypeFromPath(pathname: string): PageType | null {
  const normalized = decodeURIComponent(pathname)
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  return isPageType(normalized) ? normalized : null;
}
