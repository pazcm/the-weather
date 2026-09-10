import { useEffect, useRef, useState } from "react";
import { Crosshair, Loader2, MapPin, Search, Star, X } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { searchPlaces, type Place } from "@/lib/weather";

export function LocationBar() {
  const { place, setPlace, saved, toggleSaved, isSaved, unit, toggleUnit, geoState, requestLocation } =
    useWeather();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    let active = true;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const found = await searchPlaces(query);
        if (active) setResults(found);
      } finally {
        if (active) setSearching(false);
      }
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const choose = (next: Place) => {
    setPlace(next);
    setOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass-chip flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/20"
        >
          <Search size={15} strokeWidth={2} />
          Search city
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toggleSaved(place)}
            aria-pressed={isSaved(place)}
            aria-label={isSaved(place) ? "Remove from saved places" : "Save this place"}
            className="glass-chip grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-white/20"
          >
            <Star size={16} strokeWidth={2} fill={isSaved(place) ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={requestLocation}
            aria-label="Use my current location"
            className="glass-chip grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-white/20"
          >
            {geoState === "locating" ? (
              <Loader2 size={16} strokeWidth={2} className="animate-spin" />
            ) : (
              <Crosshair size={16} strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            onClick={toggleUnit}
            className="glass-chip tnum rounded-full px-3 py-2 text-sm font-semibold text-ink transition hover:bg-white/20"
          >
            °{unit === "celsius" ? "C" : "F"}
          </button>
        </div>
      </div>

      {saved.length > 0 ? (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {saved.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPlace(s)}
              className="glass-chip shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:text-ink"
            >
              {s.name}
            </button>
          ))}
        </div>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/35 px-4 pt-24 backdrop-blur-sm">
          <div
            className="glass-card w-full max-w-lg overflow-hidden rise-in"
            role="dialog"
            aria-label="Search for a city"
          >
            <div className="flex items-center gap-3 border-b border-white/15 px-5 py-4">
              <Search size={18} strokeWidth={2} className="text-ink-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City or town"
                className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-muted"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close search"
                className="text-ink-muted transition hover:text-ink"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <ul className="max-h-80 overflow-y-auto py-2">
              {searching ? (
                <li className="px-5 py-4 text-sm text-ink-muted">Searching…</li>
              ) : null}
              {!searching && query.trim().length >= 2 && results.length === 0 ? (
                <li className="px-5 py-4 text-sm text-ink-muted">No places found.</li>
              ) : null}
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => choose(r)}
                    className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-white/10"
                  >
                    <MapPin size={16} strokeWidth={2} className="text-ink-muted" />
                    <span className="text-sm font-medium text-ink">{r.name}</span>
                    <span className="ml-auto text-xs text-ink-muted">
                      {[r.admin, r.country].filter(Boolean).join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
