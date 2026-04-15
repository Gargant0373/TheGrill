import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useIsMobile from "../../hooks/useIsMobile";

function PicturesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isViewerClosing, setIsViewerClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let isActive = true;

    const loadImages = async () => {
      try {
        const response = await fetch("/gallery/images.json");
        if (!response.ok) {
          throw new Error(`Could not load gallery (${response.status})`);
        }

        const payload = (await response.json()) as unknown;
        if (!Array.isArray(payload) || !payload.every((entry) => typeof entry === "string")) {
          throw new Error("Gallery data has an invalid shape");
        }

        if (isActive) {
          setImages(payload);
          setLoadError(null);
        }
      } catch (error) {
        if (!isActive) return;
        setLoadError(error instanceof Error ? error.message : "Failed to load gallery");
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadImages();

    return () => {
      isActive = false;
    };
  }, []);

  const openViewer = useCallback((imageName: string) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsViewerClosing(false);
    setSelectedImage(imageName);
  }, []);

  const closeViewer = useCallback(() => {
    if (!selectedImage || isViewerClosing) return;

    setIsViewerClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setSelectedImage(null);
      setIsViewerClosing(false);
      closeTimeoutRef.current = null;
    }, 160);
  }, [isViewerClosing, selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeViewer();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeViewer, selectedImage]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="m-0 w-full text-center space-y-4">
      <h3 className="text-2xl mb-4">Pictures</h3>
      {isLoading && <p className="text-purple">Loading photos...</p>}

      {loadError && <p className="text-purple">{loadError}</p>}

      {!isLoading && !loadError && (
        <div
          className={
            isMobile
              ? "grid grid-cols-2 gap-3"
              : "grid grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))] gap-3 overflow-y-auto pr-1 h-full"
          }
        >
          {images.map((img) => (
            <button
              key={img}
              type="button"
              onClick={() => openViewer(img)}
              className="overflow-hidden rounded-lg border border-yellow-light bg-yellow-paper shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
            >
              <img
                src={`/gallery/${img}`}
                alt={img}
                className="w-full aspect-[4/3] object-cover object-center transition-transform duration-200 hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {selectedImage &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image preview"
            className={`fixed inset-0 z-[2000] flex items-center justify-center overflow-auto bg-green-dark/80 p-4 ${isViewerClosing ? "animate-window-close" : "animate-window-open"}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeViewer();
              }
            }}
          >
            <img
              src={`/gallery/${selectedImage}`}
              alt={selectedImage}
              className="max-h-[90vh] max-w-[95vw] rounded-md border border-yellow-light bg-yellow-paper shadow-2xl object-contain"
            />
            {!isMobile && (
              <button
                type="button"
                aria-label="Close fullscreen image"
                onClick={closeViewer}
                className="fixed top-10 right-15 z-[2010] rounded-md border border-yellow-light bg-yellow-paper px-3 py-1 text-purple-dark transition-colors hover:bg-yellow-light [right:calc(env(safe-area-inset-right)+0.75rem)] [top:calc(env(safe-area-inset-top)+0.75rem)]"
              >
                Close
              </button>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}

export default PicturesPage;
