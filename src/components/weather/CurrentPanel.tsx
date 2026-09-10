import { MapPin } from "lucide-react";
import { describeCode, type CurrentWeather, type DayPoint, type Place } from "@/lib/weather";
import { WeatherIcon } from "./WeatherIcon";

type Props = {
  place: Place;
  current: CurrentWeather;
  today: DayPoint;
  unitSymbol: string;
};

export function CurrentPanel({ place, current, today, unitSymbol }: Props) {
  return (
    <section className="rise-in flex flex-col items-center pt-10 pb-8 text-center">
      <p className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-ink-muted">
        <MapPin size={14} strokeWidth={2} />
        {place.name}
        {place.admin ? `, ${place.admin}` : ""}
      </p>

      <div className="tnum mt-2 flex items-start text-[7rem] leading-[0.95] font-extralight tracking-tight text-ink sm:text-[8.5rem]">
        {Math.round(current.temperature)}
        <span className="mt-3 text-4xl font-light sm:mt-4">{unitSymbol}</span>
      </div>

      <div className="mt-1 flex items-center gap-2 text-lg font-medium text-ink">
        <WeatherIcon code={current.code} isDay={current.isDay} size={22} />
        {describeCode(current.code)}
      </div>

      <p className="tnum mt-1 text-sm text-ink-muted">
        H:{Math.round(today.max)}{unitSymbol} · L:{Math.round(today.min)}{unitSymbol} · Feels like{" "}
        {Math.round(current.apparent)}{unitSymbol}
      </p>
    </section>
  );
}
