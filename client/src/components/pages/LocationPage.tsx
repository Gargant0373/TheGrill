import { useEffect } from "react";

const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=52.02005820686467,4.381998553612656&t=k&z=16&output=embed";

let mapWarmupDone = false;

function LocationPage() {
  useEffect(() => {
    if (mapWarmupDone) {
      return;
    }

    const warmupFrame = document.createElement("iframe");
    warmupFrame.src = MAP_EMBED_SRC;
    warmupFrame.setAttribute("aria-hidden", "true");
    warmupFrame.tabIndex = -1;
    warmupFrame.width = "1";
    warmupFrame.height = "1";
    warmupFrame.style.position = "absolute";
    warmupFrame.style.left = "-9999px";
    warmupFrame.style.top = "-9999px";
    warmupFrame.style.opacity = "0";

    const markDone = () => {
      mapWarmupDone = true;
      if (warmupFrame.parentElement) {
        warmupFrame.remove();
      }
    };

    warmupFrame.addEventListener("load", markDone, { once: true });
    document.body.appendChild(warmupFrame);

    const timeoutId = window.setTimeout(markDone, 8000);

    return () => {
      window.clearTimeout(timeoutId);
      warmupFrame.removeEventListener("load", markDone);
      if (warmupFrame.parentElement) {
        warmupFrame.remove();
      }
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl mb-4 text-center">Location</h3>
      <div>
        <p className="mb-2">1st of May @ Delftse Hout</p>
      </div>
      <iframe
        width="100%"
        src={MAP_EMBED_SRC}
        height="300em"
        style={{ border: 0 }}
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default LocationPage;
