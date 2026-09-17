import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { LANGS } from "@/lib/i18n";

export function LanguageChip() {
  const { lang, setLang, t } = useWeather();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const active = LANGS.find((l) => l.code === lang) ?? LANGS[0]!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("bar.language")}
        aria-expanded={open}
        className="glass-chip flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-semibold text-ink transition hover:bg-white/20"
      >
        <Globe size={15} strokeWidth={2} />
        {active.short}
      </button>

      {open ? (
        <div className="glass-card absolute right-0 z-50 mt-2 w-36 overflow-hidden py-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              aria-current={l.code === lang}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm transition hover:bg-white/10 ${
                l.code === lang ? "font-semibold text-ink" : "text-ink-muted"
              }`}
            >
              {l.label}
              <span className="text-[0.65rem] tracking-wider">{l.short}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}