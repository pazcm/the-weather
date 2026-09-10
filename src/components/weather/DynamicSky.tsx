import type { ReactNode } from "react";
import { conditionFromCode } from "@/lib/weather";

type Props = {
  code: number;
  isDay: boolean;
  children: ReactNode;
};

export function DynamicSky({ code, isDay, children }: Props) {
  const condition = conditionFromCode(code);
  const skyKey = `${condition}-${isDay ? "day" : "night"}`;
  const wet = condition === "rain" || condition === "drizzle" || condition === "thunder";

  return (
    <div data-sky={skyKey} className="sky-surface relative min-h-screen overflow-hidden text-ink">
      {/* Soft drifting cloud volumes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="cloud-drift absolute -top-40 -left-24 h-[36rem] w-[36rem] rounded-full bg-white/12 blur-3xl" />
        <div
          className="cloud-drift absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-white/10 blur-3xl"
          style={{ animationDelay: "-14s" }}
        />
        <div
          className="cloud-drift absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-white/8 blur-3xl"
          style={{ animationDelay: "-26s" }}
        />
        {condition === "fog" ? (
          <div className="absolute inset-0 bg-white/12 backdrop-blur-[2px]" />
        ) : null}
        {wet ? (
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,oklch(0.15_0.04_260/0.35))]" />
        ) : null}
        {condition === "snow" ? <div className="absolute inset-0 bg-white/10" /> : null}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
