import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchWeather, reverseGeocode, type Place, type WeatherBundle } from "@/lib/weather";
import {
  createT,
  detectLang,
  isLang,
  LANG_STORAGE_KEY,
  type Lang,
  type TFunction,
} from "@/lib/i18n";

type Unit = "celsius" | "fahrenheit";
type GeoState = "idle" | "locating" | "granted" | "denied";

type WeatherContextValue = {
  place: Place;
  setPlace: (place: Place) => void;
  saved: Place[];
  toggleSaved: (place: Place) => void;
  isSaved: (place: Place) => boolean;
  unit: Unit;
  toggleUnit: () => void;
  geoState: GeoState;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TFunction;
  requestLocation: () => void;
  weather: WeatherBundle | undefined;
  isLoading: boolean;
  error: Error | null;
};

const FALLBACK_PLACE: Place = {
  id: "2643743",
  name: "As Pontes de García Rodríguez",
  admin: "Galicia",
  country: "Spain",
  latitude: 43.44917,
  longitude: -7.85316,
};

const WeatherContext = createContext<WeatherContextValue | null>(null);

const SAVED_KEY = "aura-weather:saved";
const UNIT_KEY = "aura-weather:unit";

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [place, setPlaceState] = useState<Place>(FALLBACK_PLACE);
  const [saved, setSaved] = useState<Place[]>([]);
  const [unit, setUnit] = useState<Unit>("celsius");
  const [lang, setLangState] = useState<Lang>("es");
  const [geoState, setGeoState] = useState<GeoState>("idle");
  
  useEffect(() => {
    try {
      const rawSaved = localStorage.getItem(SAVED_KEY);
      if (rawSaved) setSaved(JSON.parse(rawSaved) as Place[]);
      const rawUnit = localStorage.getItem(UNIT_KEY);
      if (rawUnit === "fahrenheit" || rawUnit === "celsius") setUnit(rawUnit);
      const rawLang = localStorage.getItem(LANG_STORAGE_KEY);
      setLangState(isLang(rawLang) ? rawLang : detectLang());
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const langRef = useRef<Lang>(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoState("denied");
      return;
    }
    setGeoState("locating");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const found = await reverseGeocode(
          pos.coords.latitude,
          pos.coords.longitude,
          langRef.current,
        );
        setPlaceState(found);
        setGeoState("granted");
      },
      () => setGeoState("denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5 * 60 * 1000 },
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const setPlace = useCallback((next: Place) => setPlaceState(next), []);

  const toggleSaved = useCallback((next: Place) => {
    setSaved((prev) => {
      const exists = prev.some((p) => p.id === next.id);
      const updated = exists ? prev.filter((p) => p.id !== next.id) : [...prev, next];
      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  }, []);

  const isSaved = useCallback((next: Place) => saved.some((p) => p.id === next.id), [saved]);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === "celsius" ? "fahrenheit" : "celsius";
      try {
        localStorage.setItem(UNIT_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useMemo(() => createT(lang), [lang]);

  const query = useQuery({
    queryKey: ["weather", place.latitude, place.longitude, unit],
    queryFn: () => fetchWeather(place.latitude, place.longitude, unit),
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
  });

  const value = useMemo<WeatherContextValue>(
    () => ({
      place,
      setPlace,
      saved,
      toggleSaved,
      isSaved,
      unit,
      toggleUnit,
      lang,
      setLang,
      t,
      geoState,
      requestLocation,
      weather: query.data,
      isLoading: query.isPending,
      error: (query.error as Error) ?? null,
    }),
    [
      place,
      setPlace,
      saved,
      toggleSaved,
      isSaved,
      unit,
      toggleUnit,
      lang,
      setLang,
      t,
      geoState,
      requestLocation,
      query.data,
      query.isPending,
      query.error,
    ],
  );

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used inside WeatherProvider");
  return ctx;
}
