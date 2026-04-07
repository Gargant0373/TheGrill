import useIsMobile from "../hooks/useIsMobile";
import WindowManager from "./desktop/WindowManager";
import PageCarousel from "./mobile/PageCarousel";

export default function PageManager() {
  const isMobile = useIsMobile();

  return isMobile ? <PageCarousel /> : <WindowManager />;
}
