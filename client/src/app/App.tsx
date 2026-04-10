import { useEffect } from "react";
import ContextMenu from "../components/desktop/ContextMenu.tsx";
import Navbar from "../components/desktop/Navbar.tsx";
import PageManager from "../components/PageManager.tsx";
import useIsMobile from "../hooks/useIsMobile";
import { getPageTypeFromPath } from "../utils/misc.util";
import { WindowOpenEvent } from "../types/window";

const STATIC_ASSET_PATHS = [
  "/thegrill2025.mp4",
  "/icons.svg",
  "/favicon.svg",
  "/assets/TheGrillLogo_White.svg",
  "/assets/Assets.svg",
  "/assets/Placeholder.svg",
  "/assets/border.svg",
  "/assets/TheGrillLogo_Full.svg",
  "/assets/TheGrillLogo_Full_Background.svg",
  "/assets/frames/Frame 1-1.svg",
  "/assets/frames/Frame_16_10.svg",
  "/assets/frames/Frame_4_3.svg",
  "/assets/frames/Frame_1_1.svg",
  "/assets/frames/Frame 4-3.svg",
  "/assets/frames/Frame_16-1.svg",
  "/fonts/bellybeans.ttf",
  "/fonts/Ishmeria.ttf",
  "/fonts/retro-wild.otf",
];

let staticAssetsWarmed = false;

function warmStaticAssets() {
  STATIC_ASSET_PATHS.forEach((path) => {
    const url = encodeURI(path);
    const lower = path.toLowerCase();

    if (/(\.png|\.jpe?g|\.gif|\.webp|\.svg)$/.test(lower)) {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      return;
    }

    if (/(\.ttf|\.otf|\.woff2?)$/.test(lower)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.href = url;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      return;
    }

    if (/(\.mp4|\.webm|\.ogg)$/.test(lower)) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = url;
      document.head.appendChild(link);
      return;
    }

    fetch(url, { cache: "force-cache" }).catch(() => {
      // Ignore warmup failures; normal loading path still works.
    });
  });
}

export default function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    const pageType = getPageTypeFromPath(window.location.pathname);

    if (pageType) {
      window.dispatchEvent(new WindowOpenEvent({ type: pageType, openMode: "center" }));
    }
  }, []);

  useEffect(() => {
    if (staticAssetsWarmed) {
      return;
    }
    staticAssetsWarmed = true;

    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | null = null;
    const runWarmup = () => warmStaticAssets();

    if (typeof win.requestIdleCallback === "function") {
      idleId = win.requestIdleCallback(() => runWarmup());
      return () => {
        if (idleId !== null && typeof win.cancelIdleCallback === "function") {
          win.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = setTimeout(runWarmup, 0);
    return () => {
      clearTimeout(timeoutId);
    };
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
