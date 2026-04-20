import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import useIsMobile from "../../hooks/useIsMobile";
import {
  type GalleryImage,
  getCachedGalleryImages,
  preloadGalleryImages,
} from "../../utils/gallery.util";

function PicturesPage() {
  const cachedImages = getCachedGalleryImages();
  const [images, setImages] = useState<GalleryImage[]>(cachedImages ?? []);
  const [isLoading, setIsLoading] = useState(!cachedImages);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isViewerClosing, setIsViewerClosing] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let isActive = true;

    preloadGalleryImages()
      .then((loadedImages) => {
        if (!isActive) return;
        setImages(loadedImages);
        setLoadError(null);
      })
      .catch((error) => {
        if (!isActive) return;
        setLoadError(error instanceof Error ? error.message : "Failed to load gallery");
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const openViewer = useCallback((image: GalleryImage) => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setIsViewerClosing(false);
    setSelectedImage(image);
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
      <h3 className="text-2xl mb-4 text-purple-light">Pictures</h3>
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
          {images.map((image) => (
            <button
              key={image.compressedName}
              type="button"
              onClick={() => openViewer(image)}
              className="overflow-hidden rounded-lg border border-yellow-light bg-yellow-paper shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple"
            >
              <img
                src={image.compressedUrl}
                alt={image.fullSizeName}
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
            <div className="z-[2010] flex max-w-[95vw] flex-col items-center gap-3">
              <img
                src={selectedImage.compressedUrl}
                alt={selectedImage.fullSizeName}
                className="max-h-[86vh] max-w-[95vw] rounded-md border border-yellow-light bg-yellow-paper shadow-2xl object-contain"
              />
              <a
                href={selectedImage.fullSizeUrl}
                download={selectedImage.fullSizeName}
                onClick={(event) => event.stopPropagation()}
                className="rounded-md border border-yellow-light bg-yellow-paper px-4 py-1 text-purple-dark transition-colors hover:bg-yellow-light"
              >
                Download
              </a>
            </div>
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
