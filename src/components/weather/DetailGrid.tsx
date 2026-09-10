import {
  Compass,
  Droplets,
  Eye,
  Gauge,
  Leaf,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  Umbrella,
  Wind,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  aqiLabel,
  formatClock,
  pressureLabel,
  uvLabel,
  windDirectionLabel,
  type AirQuality,
  type CurrentWeather,
  type DayPoint,
  type HourPoint,
} from "@/lib/weather";

function Card({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="glass-card flex flex-col gap-2 p-4">
      <h3 className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
        {icon}
        {title}
      </h3>
      <div className="text-ink">{children}</div>
    </div>
  );
}

function Meter({ value }: { value: number }) {
  return (
    <span className="mt-2 block h-1.5 w-full rounded-full bg-white/18">
      <span
        className="block h-full rounded-full bg-[linear-gradient(90deg,oklch(0.88_0.1_150),oklch(0.85_0.14_60),oklch(0.68_0.2_25))]"
        style={{ width: `${Math.min(Math.max(value, 3), 100)}%` }}
      />
    </span>
  );
}

type Props = {
  current: CurrentWeather;
  today: DayPoint;
  air: AirQuality;
  hours: HourPoint[];
  unitSymbol: string;
  speedUnit: string;
};

export function DetailGrid({ current, today, air, hours, unitSymbol, speedUnit }: Props) {
  const uv = air.uvIndex ?? today.uvMax;
  const nextRain = hours.slice(0, 12).reduce((max, h) => Math.max(max, h.precipProbability), 0);
  const sunriseClock = formatClock(today.sunrise);
  const sunsetClock = formatClock(today.sunset);

  const sunriseMin = Number(today.sunrise.slice(11, 13)) * 60 + Number(today.sunrise.slice(14, 16));
  const sunsetMin = Number(today.sunset.slice(11, 13)) * 60 + Number(today.sunset.slice(14, 16));
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const dayProgress = Math.min(
    Math.max((nowMin - sunriseMin) / Math.max(sunsetMin - sunriseMin, 1), 0),
    1,
  );
  const arcX = 8 + dayProgress * 84;
  const arcY = 46 - Math.sin(dayProgress * Math.PI) * 32;

  return (
    <section className="rise-in grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <div className="glass-card p-5">
          <h3 className="flex items-center gap-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-muted uppercase">
            <Sunrise size={13} strokeWidth={2.2} />
            Daylight
          </h3>
          <svg viewBox="0 0 100 54" className="mt-2 h-24 w-full" aria-hidden>
            <path
              d="M8 46 Q50 -6 92 46"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.28"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <line x1="0" y1="46" x2="100" y2="46" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.6" />
            <circle cx={arcX} cy={arcY} r="3.6" fill="currentColor" />
            <circle cx={arcX} cy={arcY} r="7" fill="currentColor" fillOpacity="0.25" />
          </svg>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-ink">
              <Sunrise size={15} strokeWidth={2} /> {sunriseClock}
            </span>
            <span className="flex items-center gap-1.5 text-ink">
              <Sunset size={15} strokeWidth={2} /> {sunsetClock}
            </span>
          </div>
        </div>
      </div>

      <Card icon={<Sun size={13} strokeWidth={2.2} />} title="UV index">
        <p className="tnum text-3xl font-light">{Math.round(uv)}</p>
        <p className="text-sm text-ink-muted">{uvLabel(uv)}</p>
        <Meter value={(uv / 11) * 100} />
      </Card>

      <Card icon={<Leaf size={13} strokeWidth={2.2} />} title="Air quality">
        <p className="tnum text-3xl font-light">{air.aqi != null ? Math.round(air.aqi) : "—"}</p>
        <p className="text-sm text-ink-muted">{air.aqi != null ? aqiLabel(air.aqi) : "Unavailable"}</p>
        {air.aqi != null ? <Meter value={(air.aqi / 300) * 100} /> : null}
      </Card>

      <Card icon={<Wind size={13} strokeWidth={2.2} />} title="Wind">
        <p className="tnum text-3xl font-light">
          {Math.round(current.windSpeed)}
          <span className="ml-1 text-base text-ink-muted">{speedUnit}</span>
        </p>
        <p className="flex items-center gap-1 text-sm text-ink-muted">
          <Compass size={13} strokeWidth={2} />
          {windDirectionLabel(current.windDirection)} · gusts {Math.round(current.windGusts)}{" "}
          {speedUnit}
        </p>
      </Card>

      <Card icon={<Droplets size={13} strokeWidth={2.2} />} title="Humidity">
        <p className="tnum text-3xl font-light">{Math.round(current.humidity)}%</p>
        <p className="text-sm text-ink-muted">
          {current.dewPoint != null
            ? `Dew point ${Math.round(current.dewPoint)}${unitSymbol}`
            : "Relative humidity"}
        </p>
      </Card>

      <Card icon={<Gauge size={13} strokeWidth={2.2} />} title="Pressure">
        <p className="tnum text-3xl font-light">
          {Math.round(current.pressure)}
          <span className="ml-1 text-base text-ink-muted">hPa</span>
        </p>
        <p className="text-sm text-ink-muted">{pressureLabel(current.pressure)}</p>
      </Card>

      <Card icon={<Umbrella size={13} strokeWidth={2.2} />} title="Precipitation">
        <p className="tnum text-3xl font-light">{nextRain}%</p>
        <p className="text-sm text-ink-muted">Chance in the next 12 hours</p>
      </Card>

      <Card icon={<Eye size={13} strokeWidth={2.2} />} title="Visibility">
        <p className="tnum text-3xl font-light">
          {current.visibility != null ? Math.round(current.visibility / 1000) : "—"}
          <span className="ml-1 text-base text-ink-muted">km</span>
        </p>
        <p className="text-sm text-ink-muted">Cloud cover {Math.round(current.cloudCover)}%</p>
      </Card>

      <Card icon={<Thermometer size={13} strokeWidth={2.2} />} title="Feels like">
        <p className="tnum text-3xl font-light">
          {Math.round(current.apparent)}
          {unitSymbol}
        </p>
        <p className="text-sm text-ink-muted">
          {current.apparent > current.temperature
            ? "Humidity makes it feel warmer"
            : current.apparent < current.temperature
              ? "Wind makes it feel cooler"
              : "Matches the actual temperature"}
        </p>
      </Card>
    </section>
  );
}
