import { useEffect } from "react";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d146.06180812122417!2d4.381849020458697!3d52.02005098552107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m0!4m3!3m2!1d52.02005820686467!2d4.381998553612656!5e1!3m2!1sen!2snl!4v1746032547216!5m2!1sen!2snl";

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
    <div className="flex flex-col gap-3">
      <div>
        <p className="mb-0 mt-2">1st of May @ Delftse Hout</p>
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
