import { useEffect } from "react";
import { ContextMenu } from "../components/ContextMenu";
import { Navbar } from "../components/Navbar.tsx";
import { WindowManager } from "../components/WindowManager";
import { WindowOpenEvent, WindowType } from "../types/window";

export function App() {
  useEffect(() => {
    const normalized = decodeURIComponent(window.location.pathname)
      .replace(/^\/+|\/+$/g, "")
      .toLowerCase() as WindowType;

    if (normalized && !normalized.includes("/") && Object.values(WindowType).includes(normalized)) {
      window.dispatchEvent(new WindowOpenEvent({ type: normalized, openMode: "center" }));
    }
  }, []);

  return (
    <div className="relative size-full overflow-hidden bg-beige-dark">
      <WindowManager />
      <Navbar />
      <ContextMenu />
    </div>
  );
}
