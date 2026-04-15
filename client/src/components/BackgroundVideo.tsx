import { BACKGROUND_POSTER_SOURCE, BACKGROUND_VIDEO_SOURCE } from "../constants";

export default function BackgroundVideo() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 size-full object-cover saturate-[0.82] sepia-[0.24] brightness-[0.82] contrast-[1.06]"
        src={BACKGROUND_VIDEO_SOURCE}
        title="Window manager background video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        poster={BACKGROUND_POSTER_SOURCE}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(30,20,10,0.34)_100%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,220,175,0.08)_0px,rgba(255,220,175,0.08)_1px,transparent_2px,transparent_3px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(90,56,24,0.18)_0%,rgba(22,12,6,0.38)_100%)]" />
    </div>
  );
}
