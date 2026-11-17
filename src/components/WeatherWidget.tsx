"use client";

import { useEffect, useState } from "react";

type Now = { temp: number; feels: number; wind: number; humidity: number; code: number; hi: number; lo: number; time: string };

/** WMO weather codes, grouped into the plain words a traveller needs. */
function describe(code: number) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
}

function symbol(code: number) {
  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";
  return "☁️";
}

const CACHE_MS = 10 * 60 * 1000;

/**
 * Current weather from Open-Meteo (no key needed), with times in Riyadh local time.
 * Responses are kept in sessionStorage for ten minutes so a visitor does not trigger repeated calls.
 * Shows a neutral note until it loads or if it cannot; it never shows made-up numbers.
 * variant "strip" is the slim full-width row used at the bottom of the district pages.
 */
export default function WeatherWidget({ place, lat, lng, variant = "card" }: { place: string; lat: number; lng: number; variant?: "card" | "strip" }) {
  const [now, setNow] = useState<Now | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const key = `weather:${lat}:${lng}`;
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        const c = JSON.parse(raw) as { at: number; now: Now };
        if (Date.now() - c.at < CACHE_MS) {
          setNow(c.now);
          return;
        }
      }
    } catch {
      /* storage unavailable: fetch instead */
    }
    const ctl = new AbortController();
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=Asia%2FRiyadh`;
    fetch(url, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("weather"))))
      .then((d) => {
        const n: Now = {
          temp: Math.round(d.current.temperature_2m),
          feels: Math.round(d.current.apparent_temperature),
          wind: Math.round(d.current.wind_speed_10m),
          humidity: Math.round(d.current.relative_humidity_2m),
          code: d.current.weather_code,
          hi: Math.round(d.daily.temperature_2m_max[0]),
          lo: Math.round(d.daily.temperature_2m_min[0]),
          time: String(d.current.time ?? "").slice(11, 16),
        };
        setNow(n);
        try {
          sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), now: n }));
        } catch {
          /* ignore */
        }
      })
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true);
      });
    return () => ctl.abort();
  }, [lat, lng]);

  if (variant === "strip") {
    const items = now
      ? [
          { label: "Feels like", value: `${now.feels}°C` },
          { label: "Humidity", value: `${now.humidity}%` },
          { label: "Wind", value: `${now.wind} km/h` },
          { label: "Today", value: `${now.lo}° to ${now.hi}°C` },
          { label: "Updated", value: now.time ? `${now.time} Riyadh time` : "just now" },
        ]
      : [];
    return (
      <div className="rounded-2xl border border-navy/10 bg-white px-6 py-5 text-navy shadow-sm" aria-live="polite" style={{ minHeight: "6.5rem" }}>
        {now ? (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-4">
              <span aria-hidden="true" className="text-4xl leading-none">{symbol(now.code)}</span>
              <div>
                <p className="text-4xl font-extrabold leading-none">{now.temp}&deg;C</p>
                <p className="mt-1 text-sm text-muted">{describe(now.code)} in {place}</p>
              </div>
            </div>
            <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-5">
              {items.map((i) => (
                <div key={i.label}>
                  <dt className="text-xs font-bold uppercase tracking-wider text-accent">{i.label}</dt>
                  <dd className="mt-0.5 font-semibold">{i.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <p className="text-muted">{failed ? `The live weather for ${place} is unavailable right now. Please try again later.` : `Loading the weather for ${place}...`}</p>
        )}
        <p className="mt-3 text-xs text-muted">
          Live data from{" "}
          <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Open-Meteo.com</a>
          , for the coordinates of {place}. Summer afternoons are hot, so ask for a pickup in the shade or indoors.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-navy/10 bg-white p-6" aria-live="polite">
      {now ? (
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <p className="text-5xl font-extrabold text-navy">{now.temp}°C</p>
            <p className="mt-1 text-muted">{describe(now.code)} in {place} right now</p>
          </div>
          <dl className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <dt className="font-bold uppercase tracking-wider text-accent">Feels like</dt>
              <dd className="mt-1 text-muted">{now.feels}°C</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wider text-accent">Today</dt>
              <dd className="mt-1 text-muted">{now.lo}° to {now.hi}°C</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wider text-accent">Wind</dt>
              <dd className="mt-1 text-muted">{now.wind} km/h</dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="text-muted">{failed ? `The live weather for ${place} could not be loaded right now.` : `Loading the weather for ${place}...`}</p>
      )}
      <p className="mt-4 text-xs text-muted">Weather data from Open-Meteo. Summer afternoons are hot, so ask for a pickup in the shade or indoors.</p>
    </div>
  );
}
