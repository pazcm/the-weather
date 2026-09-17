export type Lang = "es" | "gl" | "en";

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "es", label: "Español", short: "ES" },
  { code: "gl", label: "Galego", short: "GL" },
  { code: "en", label: "English", short: "EN" },
];

export const LANG_STORAGE_KEY = "aura-weather:lang";

const en = {
  "app.title": "The Weather — hyper-local forecast for {place}",
  "bar.search": "Search city",
  "place.myLocation": "My Location",
  "bar.save": "Save this place",
  "bar.unsave": "Remove from saved places",
  "bar.locate": "Use my current location",
  "bar.language": "Change language",
  "search.dialog": "Search for a city",
  "search.placeholder": "City or town",
  "search.close": "Close search",
  "search.searching": "Searching…",
  "search.empty": "No places found.",
  "state.loading": "Reading the sky over {place}…",
  "state.error": "Couldn't load the forecast right now...! Check your connection and try again.",
  "footer.source": "Data from Open-Meteo · updates every 10 minutes",
  "current.feelsLike": "Feels like",
  "hourly.title": "Hourly forecast",
  "daily.title": "10-day forecast",
  "time.now": "Now",
  "time.today": "Today",
  "wd.0": "Sun",
  "wd.1": "Mon",
  "wd.2": "Tue",
  "wd.3": "Wed",
  "wd.4": "Thu",
  "wd.5": "Fri",
  "wd.6": "Sat",
  "detail.daylight": "Daylight",
  "detail.uv": "UV index",
  "detail.air": "Air quality",
  "detail.wind": "Wind",
  "detail.gusts": "gusts",
  "detail.humidity": "Humidity",
  "detail.dewPoint": "Dew point {value}",
  "detail.relativeHumidity": "Relative humidity",
  "detail.pressure": "Pressure",
  "detail.precipitation": "Precipitation",
  "detail.precipitationSub": "Chance in the next 12 hours",
  "detail.visibility": "Visibility",
  "detail.cloudCover": "Cloud cover {value}%",
  "detail.feelsLike": "Feels like",
  "detail.feelsWarmer": "Humidity makes it feel warmer",
  "detail.feelsCooler": "Wind makes it feel cooler",
  "detail.feelsSame": "Matches the actual temperature",
  "detail.unavailable": "Unavailable",
  "uv.low": "Low",
  "uv.moderate": "Moderate",
  "uv.high": "High",
  "uv.veryHigh": "Very High",
  "uv.extreme": "Extreme",
  "aqi.good": "Good",
  "aqi.moderate": "Moderate",
  "aqi.sensitive": "Unhealthy for Sensitive",
  "aqi.unhealthy": "Unhealthy",
  "aqi.veryUnhealthy": "Very Unhealthy",
  "aqi.hazardous": "Hazardous",
  "pressure.low": "Low",
  "pressure.steady": "Steady",
  "pressure.high": "High",
  "dir.N": "N",
  "dir.NE": "NE",
  "dir.E": "E",
  "dir.SE": "SE",
  "dir.S": "S",
  "dir.SW": "SW",
  "dir.W": "W",
  "dir.NW": "NW",
  "cond.0": "Clear",
  "cond.1": "Mostly Clear",
  "cond.2": "Partly Cloudy",
  "cond.3": "Overcast",
  "cond.45": "Fog",
  "cond.48": "Freezing Fog",
  "cond.51": "Light Drizzle",
  "cond.53": "Drizzle",
  "cond.55": "Heavy Drizzle",
  "cond.56": "Freezing Drizzle",
  "cond.57": "Freezing Drizzle",
  "cond.61": "Light Rain",
  "cond.63": "Rain",
  "cond.65": "Heavy Rain",
  "cond.66": "Freezing Rain",
  "cond.67": "Freezing Rain",
  "cond.71": "Light Snow",
  "cond.73": "Snow",
  "cond.75": "Heavy Snow",
  "cond.77": "Snow Grains",
  "cond.80": "Light Showers",
  "cond.81": "Showers",
  "cond.82": "Heavy Showers",
  "cond.85": "Snow Showers",
  "cond.86": "Snow Showers",
  "cond.95": "Thunderstorm",
  "cond.96": "Thunderstorm & Hail",
  "cond.99": "Severe Thunderstorm",
  "cond.unknown": "Unsettled",
};

export type TKey = keyof typeof en;

const es: Record<TKey, string> = {
  "app.title": "El Tiempo — previsión hiperlocal para {place}",
  "bar.search": "Buscar ciudad",
  "place.myLocation": "Mi ubicación",
  "bar.save": "Guardar este lugar",
  "bar.unsave": "Quitar de lugares guardados",
  "bar.locate": "Usar mi ubicación actual",
  "bar.language": "Cambiar idioma",
  "search.dialog": "Buscar una ciudad",
  "search.placeholder": "Ciudad o pueblo",
  "search.close": "Cerrar búsqueda",
  "search.searching": "Buscando…",
  "search.empty": "No se han encontrado lugares.",
  "state.loading": "Leyendo el cielo sobre {place}…",
  "state.error": "No se ha podido cargar la previsión...! Comprueba tu conexión e inténtalo de nuevo.",
  "footer.source": "Datos de Open-Meteo · se actualiza cada 10 minutos",
  "current.feelsLike": "Sensación",
  "hourly.title": "Previsión por horas",
  "daily.title": "Previsión a 10 días",
  "time.now": "Ahora",
  "time.today": "Hoy",
  "wd.0": "dom",
  "wd.1": "lun",
  "wd.2": "mar",
  "wd.3": "mié",
  "wd.4": "jue",
  "wd.5": "vie",
  "wd.6": "sáb",
  "detail.daylight": "Luz del día",
  "detail.uv": "Índice UV",
  "detail.air": "Calidad del aire",
  "detail.wind": "Viento",
  "detail.gusts": "rachas",
  "detail.humidity": "Humedad",
  "detail.dewPoint": "Punto de rocío {value}",
  "detail.relativeHumidity": "Humedad relativa",
  "detail.pressure": "Presión",
  "detail.precipitation": "Precipitación",
  "detail.precipitationSub": "Probabilidad en las próximas 12 horas",
  "detail.visibility": "Visibilidad",
  "detail.cloudCover": "Nubosidad {value}%",
  "detail.feelsLike": "Sensación térmica",
  "detail.feelsWarmer": "La humedad hace que parezca más cálido",
  "detail.feelsCooler": "El viento hace que parezca más frío",
  "detail.feelsSame": "Coincide con la temperatura real",
  "detail.unavailable": "No disponible",
  "uv.low": "Bajo",
  "uv.moderate": "Moderado",
  "uv.high": "Alto",
  "uv.veryHigh": "Muy alto",
  "uv.extreme": "Extremo",
  "aqi.good": "Buena",
  "aqi.moderate": "Moderada",
  "aqi.sensitive": "Insalubre para sensibles",
  "aqi.unhealthy": "Insalubre",
  "aqi.veryUnhealthy": "Muy insalubre",
  "aqi.hazardous": "Peligrosa",
  "pressure.low": "Baja",
  "pressure.steady": "Estable",
  "pressure.high": "Alta",
  "dir.N": "N",
  "dir.NE": "NE",
  "dir.E": "E",
  "dir.SE": "SE",
  "dir.S": "S",
  "dir.SW": "SO",
  "dir.W": "O",
  "dir.NW": "NO",
  "cond.0": "Despejado",
  "cond.1": "Mayormente despejado",
  "cond.2": "Parcialmente nublado",
  "cond.3": "Cubierto",
  "cond.45": "Niebla",
  "cond.48": "Niebla helada",
  "cond.51": "Llovizna débil",
  "cond.53": "Llovizna",
  "cond.55": "Llovizna intensa",
  "cond.56": "Llovizna helada",
  "cond.57": "Llovizna helada",
  "cond.61": "Lluvia débil",
  "cond.63": "Lluvia",
  "cond.65": "Lluvia intensa",
  "cond.66": "Lluvia helada",
  "cond.67": "Lluvia helada",
  "cond.71": "Nieve débil",
  "cond.73": "Nieve",
  "cond.75": "Nieve intensa",
  "cond.77": "Granos de nieve",
  "cond.80": "Chubascos débiles",
  "cond.81": "Chubascos",
  "cond.82": "Chubascos intensos",
  "cond.85": "Chubascos de nieve",
  "cond.86": "Chubascos de nieve",
  "cond.95": "Tormenta",
  "cond.96": "Tormenta con granizo",
  "cond.99": "Tormenta severa",
  "cond.unknown": "Inestable",
};

const gl: Record<TKey, string> = {
  "app.title": "O Tempo — predición hiperlocal para {place}",
  "bar.search": "Buscar cidade",
  "place.myLocation": "A miña localización",
  "bar.save": "Gardar este lugar",
  "bar.unsave": "Quitar dos lugares gardados",
  "bar.locate": "Usar a miña localización actual",
  "bar.language": "Cambiar idioma",
  "search.dialog": "Buscar unha cidade",
  "search.placeholder": "Cidade ou vila",
  "search.close": "Pechar a busca",
  "search.searching": "Buscando…",
  "search.empty": "Non se atoparon lugares, volve a probar.",
  "state.loading": "Lendo o ceo sobre {place}…",
  "state.error": "Non se puido cargar a predición...! Comproba a túa conexión e téntao de novo.",
  "footer.source": "Datos de Open-Meteo · actualízase cada 10 minutos",
  "current.feelsLike": "Sensación",
  "hourly.title": "Predición por horas",
  "daily.title": "Predición a 10 días",
  "time.now": "Agora",
  "time.today": "Hoxe",
  "wd.0": "dom",
  "wd.1": "luns",
  "wd.2": "mar",
  "wd.3": "mér",
  "wd.4": "xov",
  "wd.5": "ven",
  "wd.6": "sáb",
  "detail.daylight": "Luz do día",
  "detail.uv": "Índice UV",
  "detail.air": "Calidade do aire",
  "detail.wind": "Vento",
  "detail.gusts": "refachos",
  "detail.humidity": "Humidade",
  "detail.dewPoint": "Punto de orballo {value}",
  "detail.relativeHumidity": "Humidade relativa",
  "detail.pressure": "Presión",
  "detail.precipitation": "Precipitación",
  "detail.precipitationSub": "Probabilidade nas próximas 12 horas",
  "detail.visibility": "Visibilidade",
  "detail.cloudCover": "Nubosidade {value}%",
  "detail.feelsLike": "Sensación térmica",
  "detail.feelsWarmer": "A humidade fai que pareza máis cálido",
  "detail.feelsCooler": "O vento fai que pareza máis frío",
  "detail.feelsSame": "Coincide coa temperatura real",
  "detail.unavailable": "Non dispoñible",
  "uv.low": "Baixo",
  "uv.moderate": "Moderado",
  "uv.high": "Alto",
  "uv.veryHigh": "Moi alto",
  "uv.extreme": "Extremo",
  "aqi.good": "Boa",
  "aqi.moderate": "Moderada",
  "aqi.sensitive": "Insalubre para sensibles",
  "aqi.unhealthy": "Insalubre",
  "aqi.veryUnhealthy": "Moi insalubre",
  "aqi.hazardous": "Perigosa",
  "pressure.low": "Baixa",
  "pressure.steady": "Estable",
  "pressure.high": "Alta",
  "dir.N": "N",
  "dir.NE": "NE",
  "dir.E": "L",
  "dir.SE": "SL",
  "dir.S": "S",
  "dir.SW": "SO",
  "dir.W": "O",
  "dir.NW": "NO",
  "cond.0": "Despexado",
  "cond.1": "Maiormente despexado",
  "cond.2": "Parcialmente anubrado",
  "cond.3": "Cuberto",
  "cond.45": "Néboa",
  "cond.48": "Néboa xeada",
  "cond.51": "Chuvisca débil",
  "cond.53": "Chuvisca",
  "cond.55": "Chuvisca intensa",
  "cond.56": "Chuvisca xeada",
  "cond.57": "Chuvisca xeada",
  "cond.61": "Choiva débil",
  "cond.63": "Choiva",
  "cond.65": "Choiva intensa",
  "cond.66": "Choiva xeada",
  "cond.67": "Choiva xeada",
  "cond.71": "Neve débil",
  "cond.73": "Neve",
  "cond.75": "Neve intensa",
  "cond.77": "Grans de neve",
  "cond.80": "Chuvascos débiles",
  "cond.81": "Chuvascos",
  "cond.82": "Chuvascos intensos",
  "cond.85": "Chuvascos de neve",
  "cond.86": "Chuvascos de neve",
  "cond.95": "Treboada",
  "cond.96": "Treboada con sarabia",
  "cond.99": "Treboada severa",
  "cond.unknown": "Inestable",
};

export const dictionaries: Record<Lang, Record<TKey, string>> = { en, es, gl };

export type TFunction = (key: TKey, vars?: Record<string, string | number>) => string;

export function createT(lang: Lang): TFunction {
  const dict = dictionaries[lang] ?? dictionaries.en;
  return (key, vars) => {
    let out = dict[key] ?? dictionaries.en[key] ?? String(key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        out = out.replaceAll(`{${k}}`, String(v));
      }
    }
    return out;
  };
}

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "es" || value === "gl";
}

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const candidates = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  for (const raw of candidates) {
    const tag = String(raw).toLowerCase();
    if (tag.startsWith("gl")) return "gl";
    if (tag.startsWith("es") || tag.startsWith("ca")) return "es";
    if (tag.startsWith("en")) return "en";
  }
  return "en";
}

export function localeOf(lang: Lang): string {
  return lang === "es" ? "es-ES" : lang === "gl" ? "gl-ES" : "en-US";
}

/** Open-Meteo has no Galician locale; fall back to Spanish for place names. */
export function geoLang(lang: Lang): string {
  return lang === "gl" ? "es" : lang;
}

function safeFormat(lang: Lang, date: Date, options: Intl.DateTimeFormatOptions): string {
  try {
    return new Intl.DateTimeFormat(localeOf(lang), options).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
}

export function formatHour(iso: string, index: number, lang: Lang): string {
  if (index === 0) return createT(lang)("time.now");
  const date = new Date(`${iso.slice(0, 16)}:00`);
  if (lang === "en") {
    const hour = Number(iso.slice(11, 13));
    const suffix = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${h12}${suffix}`;
  }
  return safeFormat(lang, date, { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function formatDay(iso: string, index: number, lang: Lang): string {
  const t = createT(lang);
  if (index === 0) return t("time.today");
  const date = new Date(`${iso}T12:00:00`);
  return t(`wd.${date.getDay()}` as TKey);
}

export function formatClock(iso: string, lang: Lang): string {
  const date = new Date(`${iso.slice(0, 16)}:00`);
  if (lang === "en") {
    const hour = Number(iso.slice(11, 13));
    const minute = iso.slice(14, 16);
    const suffix = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${h12}:${minute} ${suffix}`;
  }
  return safeFormat(lang, date, { hour: "2-digit", minute: "2-digit", hour12: false });
}