const GALLERY_MANIFEST_PATH = "/gallery/images.json";
const COMPRESSED_PREFIX = "COMPRESSED_";

export type GalleryImage = {
  compressedName: string;
  fullSizeName: string;
  compressedUrl: string;
  fullSizeUrl: string;
};

let galleryImagesCache: GalleryImage[] | null = null;
let galleryImagesPromise: Promise<GalleryImage[]> | null = null;

function toGalleryImage(name: string): GalleryImage {
  const compressedName = name.startsWith(COMPRESSED_PREFIX) ? name : `${COMPRESSED_PREFIX}${name}`;
  const fullSizeName = compressedName.startsWith(COMPRESSED_PREFIX)
    ? compressedName.slice(COMPRESSED_PREFIX.length)
    : compressedName;

  return {
    compressedName,
    fullSizeName,
    compressedUrl: `/gallery/${compressedName}`,
    fullSizeUrl: `/gallery/${fullSizeName}`,
  };
}

function warmCompressedImages(images: GalleryImage[]) {
  images.forEach(({ compressedUrl }) => {
    const image = new Image();
    image.decoding = "async";
    image.src = encodeURI(compressedUrl);
  });
}

export async function preloadGalleryImages(): Promise<GalleryImage[]> {
  if (galleryImagesCache) {
    return galleryImagesCache;
  }

  if (galleryImagesPromise) {
    return galleryImagesPromise;
  }

  galleryImagesPromise = (async () => {
    const response = await fetch(GALLERY_MANIFEST_PATH, { cache: "force-cache" });
    if (!response.ok) {
      throw new Error(`Could not load gallery (${response.status})`);
    }

    const payload = (await response.json()) as unknown;
    if (!Array.isArray(payload) || !payload.every((entry) => typeof entry === "string")) {
      throw new Error("Gallery data has an invalid shape");
    }

    const images = payload.map(toGalleryImage);
    warmCompressedImages(images);
    galleryImagesCache = images;

    return images;
  })().catch((error) => {
    galleryImagesPromise = null;
    throw error;
  });

  return galleryImagesPromise;
}

export function getCachedGalleryImages(): GalleryImage[] | null {
  return galleryImagesCache;
}
