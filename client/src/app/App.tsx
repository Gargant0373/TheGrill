import { useEffect } from "react";
import ContextMenu from "../components/desktop/ContextMenu.tsx";
import Navbar from "../components/desktop/Navbar.tsx";
import PageManager from "../components/PageManager.tsx";
import useIsMobile from "../hooks/useIsMobile";
import { getPageTypeFromPath } from "../utils/misc.util";
import { WindowOpenEvent } from "../types/window";

export default function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const pageType = getPageTypeFromPath(window.location.pathname);

    if (pageType) {
      window.dispatchEvent(new WindowOpenEvent({ type: pageType, openMode: "center" }));
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
