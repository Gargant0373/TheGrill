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
    { label: "zile", value: days },
    { label: "ore", value: hours },
    { label: "minute", value: minutes },
    { label: "secunde", value: seconds },
  ];
}

function formatValue(value: number): string {
  return value.toString().padStart(2, "0");
}

export function Countdown() {
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
      <p
        className="text-center text-4xl font-black uppercase text-[#70ae03]"
        style={{ WebkitTextStroke: "1.75px #0D3B89" }}
      >
        Poftă bună!
      </p>
    );
  }

  if (state === "next-year") {
    return (
      <p
        className="text-center text-3xl font-black uppercase text-[#70ae03]"
        style={{ WebkitTextStroke: "1.5px #0D3B89" }}
      >
        Ne vedem anul viitor
      </p>
    );
  }

  const parts = getTimeRemainingParts(now);

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {parts.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-17 flex-col items-center rounded-md border-2 border-blue/70 bg-beige/70 px-3 py-3 backdrop-blur-[1px] sm:min-w-20 sm:px-4"
        >
          <span
            className="text-3xl font-black leading-none text-[#70ae03]"
            style={{ WebkitTextStroke: "1px #0D3B89" }}
          >
            {formatValue(value)}
          </span>
          <span className="mt-1 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-blue sm:text-sm">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
