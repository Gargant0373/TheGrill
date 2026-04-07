import Countdown from "../Countdown";
import BackgroundVideo from "../BackgroundVideo";

export default function HomeSlide() {
  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center">
        <div className="w-full aspect-[507.9408/186.47556]" aria-hidden="true" />
        <div className="mt-4 w-full px-4 [container-type:inline-size]">
          <Countdown />
        </div>
      </div>
      <BackgroundVideo />
    </div>
  );
}
