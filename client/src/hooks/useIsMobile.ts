import { useState, useEffect } from "react";

/**
 * Custom React hook to determine if the screen is mobile-sized (default < 640px).
 * @param breakpoint - The max width in px to consider as mobile (default: 640)
 * @returns boolean - true if mobile, false otherwise
 */
export default function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
