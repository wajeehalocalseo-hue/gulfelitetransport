"use client";

import { useEffect, useState } from "react";

type Now = { temp: number; feels: number; wind: number; code: number; hi: number; lo: number };

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

/** Current weather from Open-Meteo (no key needed). Shows a neutral note until it loads or if it cannot. */
export default function WeatherWidget({ place, lat, lng }: { place: string; lat: number; lng: number }) {
  const [now, setNow] = useState<Now | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctl = new AbortController();
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=1&timezone=auto`;
    fetch(url, { signal: ctl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("weather"))))
      .then((d) =>
        setNow({
          temp: Math.round(d.current.temperature_2m),
          feels: Math.round(d.current.apparent_temperature),
          wind: Math.round(d.current.wind_speed_10m),
          code: d.current.weather_code,
          hi: Math.round(d.daily.temperature_2m_max[0]),
          lo: Math.round(d.daily.temperature_2m_min[0]),
        }),
      )
      .catch((e) => {
        if (e?.name !== "AbortError") setFailed(true);
      });
    return () => ctl.abort();
  }, [lat, lng]);

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
