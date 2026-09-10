import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Loader2 } from "lucide-react";
import { WeatherProvider, useWeather } from "@/context/WeatherContext";
import { DynamicSky } from "@/components/weather/DynamicSky";
import { LocationBar } from "@/components/weather/LocationBar";
import { CurrentPanel } from "@/components/weather/CurrentPanel";
import { HourlyStrip } from "@/components/weather/HourlyStrip";
import { DailyForecast } from "@/components/weather/DailyForecast";
import { DetailGrid } from "@/components/weather/DetailGrid";

const title = "The Weather — Hyper-local forecasts, beautifully clear";
const description =
  "Live hyper-local weather: current conditions, hourly and 10-day forecasts, air quality, UV, wind, humidity, pressure and daylight — in a glass interface that shifts with the sky.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WeatherPage,
});

function WeatherPage() {
  return (
    <WeatherProvider>
      <WeatherScreen />
    </WeatherProvider>
  );
}

function WeatherScreen() {
  const { place, weather, isLoading, error, unit } = useWeather();
  const unitSymbol = "°";
  const speedUnit = unit === "celsius" ? "km/h" : "mph";

  const code = weather?.current.code ?? 3;
  const isDay = weather?.current.isDay ?? true;

  return (
    <DynamicSky code={code} isDay={isDay}>
      <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-16">
        <h1 className="sr-only">The Weather — hyper-local forecast for {place.name}</h1>
        <LocationBar />

        {isLoading && !weather ? (
          <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-ink-muted">
            <Loader2 size={28} strokeWidth={1.8} className="animate-spin" />
            <p className="text-sm">Reading the sky over {place.name}…</p>
          </div>
        ) : null}

        {error && !weather ? (
          <div className="glass-card mt-10 flex flex-col items-center gap-2 p-8 text-center">
            <AlertTriangle size={24} strokeWidth={1.8} />
            <p className="text-sm text-ink-muted">
              Couldn&apos;t load the forecast right now. Check your connection and try again.
            </p>
          </div>
        ) : null}

        {weather && weather.daily[0] ? (
          <div className="space-y-4">
            <CurrentPanel
              place={place}
              current={weather.current}
              today={weather.daily[0]}
              unitSymbol={unitSymbol}
            />
            <HourlyStrip hours={weather.hourly} unitSymbol={unitSymbol} />
            <DailyForecast days={weather.daily} unitSymbol={unitSymbol} />
            <DetailGrid
              current={weather.current}
              today={weather.daily[0]}
              air={weather.air}
              hours={weather.hourly}
              unitSymbol={unitSymbol}
              speedUnit={speedUnit}
            />
            <p className="pt-2 text-center text-xs text-ink-muted">
              Data from Open-Meteo · updates every 10 minutes
            </p>
          </div>
        ) : null}
      </main>
    </DynamicSky>
  );
}
