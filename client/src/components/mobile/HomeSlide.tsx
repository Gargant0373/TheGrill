import Countdown from "../Countdown";
import BackgroundVideo from "../BackgroundVideo";

export default function HomeSlide() {
  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center">
        <div className="relative w-full aspect-[507.9408/186.47556]" aria-hidden="true">
          <div
            className="absolute inset-0 bg-green-darkest [mask-image:url('/assets/TheGrillLogo_Full_Background.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/assets/TheGrillLogo_Full_Background.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
          />
          <img
            src="/assets/TheGrillLogo_Full_Background.svg"
            className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] object-contain"
            alt="The Grill logo (mobile)"
          />
        </div>
        <div className="mt-4 w-full px-4 [container-type:inline-size]">
          <Countdown />
        </div>
      </div>
      <BackgroundVideo />
    </div>
  );
}
