import Countdown from "../Countdown";

export default function HomeSlide() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 z-20 flex flex-col items-center">
        <div className="relative w-full aspect-[507.9408/186.47556]" aria-hidden="true">
          {/* <div */}
          {/*   className="absolute inset-0 bg-green-darkest [mask-image:url('/assets/wavy_logo_colors_full_background.svg')] [mask-size:100%_100%] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-image:url('/assets/TheGrillLogo_Full_Background.svg')] [-webkit-mask-size:100%_100%] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]" */}
          {/* /> */}
          <img
            src="/assets/wavy_logo_colors_full_background.svg"
            className="absolute w-[calc(100%)] object-contain"
            alt="The Grill logo (mobile)"
          />
        </div>
        <div className="mt-4 w-full px-4 [container-type:inline-size]">
          <Countdown />
        </div>
        <a
          href="https://www.instagram.com/thegrill.live/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex justify-center z-30 mt-6 text-green-dark text-outline-green-light text-xl"
          aria-label="Visit our Instagram"
        >
          <img
            src="/assets/instagram.svg"
            alt="Instagram"
            className="w-7 h-7 invert icon-green-outline"
          />
          <span className="font-semibold ml-2">@thegrill.live</span>
        </a>
      </div>
    </div>
  );
}
