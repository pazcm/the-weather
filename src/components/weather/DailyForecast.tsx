import { Droplets } from "lucide-react";
import { formatDay, type DayPoint } from "@/lib/weather";
import { WeatherIcon } from "./WeatherIcon";

export function DailyForecast({ days, unitSymbol }: { days: DayPoint[]; unitSymbol: string }) {
  const overallMin = Math.min(...days.map((d) => d.min));
  const overallMax = Math.max(...days.map((d) => d.max));
  const span = Math.max(overallMax - overallMin, 1);

  return (
    <section className="glass-card rise-in p-5">
      <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-muted uppercase">
        10-day forecast
      </h2>
      <ul className="mt-2 divide-y divide-white/12">
        {days.map((day, i) => {
          const left = ((day.min - overallMin) / span) * 100;
          const width = ((day.max - day.min) / span) * 100;
          return (
            <li key={day.date} className="flex items-center gap-3 py-2.5">
              <span className="w-14 text-sm font-semibold text-ink">{formatDay(day.date, i)}</span>
              <span className="flex w-12 items-center gap-1">
                <WeatherIcon code={day.code} size={20} />
                {day.precipProbability >= 20 ? (
                  <span className="tnum flex items-center text-[0.6rem] text-ink-muted">
                    <Droplets size={9} strokeWidth={2.4} />
                    {day.precipProbability}
                  </span>
                ) : null}
              </span>
              <span className="tnum w-9 text-right text-sm text-ink-muted">
                {Math.round(day.min)}°
              </span>
              <span className="relative h-1.5 flex-1 rounded-full bg-white/18">
                <span
                  className="absolute inset-y-0 rounded-full bg-[linear-gradient(90deg,oklch(0.85_0.09_220),oklch(0.9_0.13_75))]"
                  style={{ left: `${left}%`, width: `${Math.max(width, 6)}%` }}
                />
              </span>
              <span className="tnum w-9 text-sm font-semibold text-ink">
                {Math.round(day.max)}°
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
