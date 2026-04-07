import { useEffect, useMemo, useState } from "react";

const TARGET_TIME = new Date("2026-05-01T18:00:00+03:00");
const END_OF_DAY = new Date("2026-05-02T00:00:00+03:00");

type CountdownPart = {
  label: string;
  value: number;
};

function getTimeRemainingParts(now: Date): CountdownPart[] {
  const diffMs = Math.max(TARGET_TIME.getTime() - now.getTime(), 0);
  const totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "days", value: days },
    { label: "hours", value: hours },
    { label: "minutes", value: minutes },
    { label: "seconds", value: seconds },
  ];
}

function formatValue(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function Countdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const state = useMemo(() => {
    if (now.getTime() < TARGET_TIME.getTime()) {
      return "countdown" as const;
    }

    if (now.getTime() < END_OF_DAY.getTime()) {
      return "meal-time" as const;
    }

    return "next-year" as const;
  }, [now]);

  if (state === "meal-time") {
    return (
      <p className="text-outline-green-light text-center font-black uppercase text-green-dark leading-none text-[clamp(3rem,10vw,6rem)] [@supports(font-size:1cqw)]:text-[min(16cqw,6rem)]">
        Enjoy your meal!
      </p>
    );
  }

  if (state === "next-year") {
    return (
      <p className="text-outline-green-light text-center font-black uppercase text-green-dark leading-none text-[clamp(3rem,10vw,6rem)] [@supports(font-size:1cqw)]:text-[min(16cqw,6rem)]">
        See you next year
      </p>
    );
  }

  const parts = getTimeRemainingParts(now);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6">
      {parts.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-17 flex-col items-center px-2 py-1 sm:min-w-20 sm:px-3"
        >
          <span className="text-outline-green-light font-black leading-none text-green-dark text-[clamp(3rem,10vw,6rem)] [@supports(font-size:1cqw)]:text-[min(16cqw,6rem)]">
            {formatValue(value)}
          </span>
          <span className="text-outline-pink-light mt-1 font-bold uppercase tracking-[0.08em] text-purple-dark leading-none text-[clamp(0.95rem,2.8vw,1.25rem)] [@supports(font-size:1cqw)]:text-[min(4.6cqw,1.25rem)]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
