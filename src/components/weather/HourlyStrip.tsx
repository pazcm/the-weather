import { Droplets } from "lucide-react";
import { formatHour, type HourPoint } from "@/lib/weather";
import { WeatherIcon } from "./WeatherIcon";

export function HourlyStrip({ hours, unitSymbol }: { hours: HourPoint[]; unitSymbol: string }) {
  return (
    <section className="glass-card rise-in p-5">
      <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
        Hourly forecast
      </h2>
      <div className="no-scrollbar mt-4 flex gap-5 overflow-x-auto pb-1">
        {hours.map((hour, i) => (
          <div key={hour.time} className="flex min-w-14 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-ink-muted">{formatHour(hour.time, i)}</span>
            <WeatherIcon code={hour.code} isDay={hour.isDay} size={22} />
            <span
              className={`tnum flex items-center gap-0.5 text-[0.65rem] ${
                hour.precipProbability >= 20 ? "text-ink" : "text-transparent"
              }`}
            >
              <Droplets size={10} strokeWidth={2.4} />
              {hour.precipProbability}%
            </span>
            <span className="tnum text-base font-semibold text-ink">
              {Math.round(hour.temperature)}
              {unitSymbol}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
