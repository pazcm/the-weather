export type Place = {
  id: string;
  name: string;
  admin?: string | undefined;
  country?: string | undefined;
  latitude: number;
  longitude: number;
};

export type WeatherCondition =
  | "clear"
  | "cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

export type CurrentWeather = {
  temperature: number;
  apparent: number;
  humidity: number;
  code: number;
  isDay: boolean;
  windSpeed: number;
  windGusts: number;
  windDirection: number;
  pressure: number;
  cloudCover: number;
  precipitation: number;
  visibility: number | null;
  dewPoint: number | null;
};

export type HourPoint = {
  time: string;
  temperature: number;
  code: number;
  isDay: boolean;
  precipProbability: number;
};

export type DayPoint = {
  date: string;
  code: number;
  max: number;
  min: number;
  sunrise: string;
  sunset: string;
  uvMax: number;
  precipProbability: number;
  windMax: number;
};

export type AirQuality = {
  aqi: number | null;
  pm25: number | null;
  pm10: number | null;
  ozone: number | null;
  uvIndex: number | null;
};

export type WeatherBundle = {
  current: CurrentWeather;
  hourly: HourPoint[];
  daily: DayPoint[];
  air: AirQuality;
  timezone: string;
  utcOffsetSeconds: number;
};

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const REVERSE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

async function getJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return (await res.json()) as T;
}

export async function searchPlaces(query: string): Promise<Place[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const data = await getJSON<{
    results?: Array<{
      id: number;
      name: string;
      admin1?: string;
      country?: string;
      latitude: number;
      longitude: number;
    }>;
  }>(`${GEOCODE_URL}?name=${encodeURIComponent(q)}&count=8&language=en&format=json`);

  return (data.results ?? []).map((r) => ({
    id: String(r.id),
    name: r.name,
    admin: r.admin1,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export async function reverseGeocode(latitude: number, longitude: number): Promise<Place> {
  try {
    const data = await getJSON<{
      city?: string;
      locality?: string;
      principalSubdivision?: string;
      countryName?: string;
    }>(`${REVERSE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    return {
      id: `${latitude.toFixed(3)},${longitude.toFixed(3)}`,
      name: data.city || data.locality || "My Location",
      admin: data.principalSubdivision,
      country: data.countryName,
      latitude,
      longitude,
    };
  } catch {
    return {
      id: `${latitude.toFixed(3)},${longitude.toFixed(3)}`,
      name: "My Location",
      latitude,
      longitude,
    };
  }
}

type ForecastResponse = {
  timezone: string;
  utc_offset_seconds: number;
  current: Record<string, number>;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: (number | null)[];
    is_day: number[];
    visibility: (number | null)[];
    dew_point_2m: (number | null)[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: (number | null)[];
    precipitation_probability_max: (number | null)[];
    wind_speed_10m_max: number[];
  };
};

type AirResponse = {
  current?: {
    us_aqi?: number | null;
    pm2_5?: number | null;
    pm10?: number | null;
    ozone?: number | null;
    uv_index?: number | null;
  };
};

export async function fetchWeather(
  latitude: number,
  longitude: number,
  unit: "celsius" | "fahrenheit",
): Promise<WeatherBundle> {
  const tempUnit = unit === "fahrenheit" ? "&temperature_unit=fahrenheit&wind_speed_unit=mph" : "";
  const forecastUrl =
    `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,apparent_temperature,relative_humidity_2m,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m` +
    `&hourly=temperature_2m,weather_code,precipitation_probability,is_day,visibility,dew_point_2m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,wind_speed_10m_max` +
    `&timezone=auto&forecast_days=10${tempUnit}`;

  const airUrl =
    `${AIR_URL}?latitude=${latitude}&longitude=${longitude}` +
    `&current=us_aqi,pm2_5,pm10,ozone,uv_index&timezone=auto`;

  const [forecast, air] = await Promise.all([
    getJSON<ForecastResponse>(forecastUrl),
    getJSON<AirResponse>(airUrl).catch(() => ({}) as AirResponse),
  ]);

  const nowIso = new Date(Date.now() + forecast.utc_offset_seconds * 1000)
    .toISOString()
    .slice(0, 13);
  let startIdx = forecast.hourly.time.findIndex((t) => t.slice(0, 13) >= nowIso);
  if (startIdx < 0) startIdx = 0;

  const h = forecast.hourly;
  const d = forecast.daily;
  const cur = forecast.current;
  const num = (v: number | null | undefined, fallback = 0) => (v == null ? fallback : v);

  const hourly: HourPoint[] = h.time.slice(startIdx, startIdx + 24).map((time, i) => {
    const idx = startIdx + i;
    return {
      time,
      temperature: num(h.temperature_2m[idx]),
      code: num(h.weather_code[idx]),
      isDay: h.is_day[idx] === 1,
      precipProbability: num(h.precipitation_probability[idx]),
    };
  });

  const daily: DayPoint[] = d.time.map((date, i) => ({
    date,
    code: num(d.weather_code[i]),
    max: num(d.temperature_2m_max[i]),
    min: num(d.temperature_2m_min[i]),
    sunrise: d.sunrise[i] ?? `${date}T06:00`,
    sunset: d.sunset[i] ?? `${date}T18:00`,
    uvMax: num(d.uv_index_max[i]),
    precipProbability: num(d.precipitation_probability_max[i]),
    windMax: num(d.wind_speed_10m_max[i]),
  }));

  const current: CurrentWeather = {
    temperature: num(cur["temperature_2m"]),
    apparent: num(cur["apparent_temperature"]),
    humidity: num(cur["relative_humidity_2m"]),
    code: num(cur["weather_code"]),
    isDay: cur["is_day"] === 1,
    windSpeed: num(cur["wind_speed_10m"]),
    windGusts: num(cur["wind_gusts_10m"]),
    windDirection: num(cur["wind_direction_10m"]),
    pressure: num(cur["pressure_msl"]),
    cloudCover: num(cur["cloud_cover"]),
    precipitation: num(cur["precipitation"]),
    visibility: h.visibility[startIdx] ?? null,
    dewPoint: h.dew_point_2m[startIdx] ?? null,
  };


  return {
    current,
    hourly,
    daily,
    air: {
      aqi: air.current?.us_aqi ?? null,
      pm25: air.current?.pm2_5 ?? null,
      pm10: air.current?.pm10 ?? null,
      ozone: air.current?.ozone ?? null,
      uvIndex: air.current?.uv_index ?? null,
    },
    timezone: forecast.timezone,
    utcOffsetSeconds: forecast.utc_offset_seconds,
  };
}

// helpers for formatting and labeling weather data
export function conditionFromCode(code: number): WeatherCondition {
  if (code === 0 || code === 1) return "clear";
  if (code === 2) return "cloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle";
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return "rain";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "snow";
  if (code >= 95) return "thunder";
  return "cloudy";
}

export function describeCode(code: number): string {
  const map: Record<number, string> = {
    0: "Clear",
    1: "Mostly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Freezing Fog",
    51: "Light Drizzle",
    53: "Drizzle",
    55: "Heavy Drizzle",
    56: "Freezing Drizzle",
    57: "Freezing Drizzle",
    61: "Light Rain",
    63: "Rain",
    65: "Heavy Rain",
    66: "Freezing Rain",
    67: "Freezing Rain",
    71: "Light Snow",
    73: "Snow",
    75: "Heavy Snow",
    77: "Snow Grains",
    80: "Light Showers",
    81: "Showers",
    82: "Heavy Showers",
    85: "Snow Showers",
    86: "Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm & Hail",
    99: "Severe Thunderstorm",
  };
  return map[code] ?? "Unsettled";
}

export function skyKey(code: number, isDay: boolean): string {
  return `${conditionFromCode(code)}-${isDay ? "day" : "night"}`;
}

export function uvLabel(uv: number): string {
  if (uv < 3) return "Low";
  if (uv < 6) return "Moderate";
  if (uv < 8) return "High";
  if (uv < 11) return "Very High";
  return "Extreme";
}

export function aqiLabel(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

export function windDirectionLabel(deg: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(deg / 45) % 8] ?? "N";
}

export function pressureLabel(hPa: number): string {
  if (hPa < 1000) return "Low";
  if (hPa > 1020) return "High";
  return "Steady";
}

export function formatHour(iso: string, index: number): string {
  if (index === 0) return "Now";
  const hour = Number(iso.slice(11, 13));
  const suffix = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}${suffix}`;
}

export function formatDay(iso: string, index: number): string {
  if (index === 0) return "Today";
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatClock(iso: string): string {
  const hour = Number(iso.slice(11, 13));
  const minute = iso.slice(14, 16);
  const suffix = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${minute} ${suffix}`;
}
