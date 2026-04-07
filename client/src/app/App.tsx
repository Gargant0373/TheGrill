import { useEffect } from "react";
import ContextMenu from "../components/desktop/ContextMenu.tsx";
import Navbar from "../components/desktop/Navbar.tsx";
import PageManager from "../components/PageManager.tsx";
import useIsMobile from "../hooks/useIsMobile";
import { WindowOpenEvent } from "../types/window";
import { PageType } from "../types/page.ts";

export default function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const normalized = decodeURIComponent(window.location.pathname)
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase() as PageType;

    if (Object.values(PageType).includes(normalized)) {
      window.dispatchEvent(new WindowOpenEvent({ type: normalized, openMode: "center" }));
    }
  }, []);

  return (
    <div className="relative size-full overflow-hidden bg-yellow-dark">
      <PageManager />
      {!isMobile && (
        <>
          <Navbar /> <ContextMenu />
        </>
      )}
    </div>
  );
}
