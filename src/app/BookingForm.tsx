"use client";

import { useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

const field =
  "w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-3 text-base text-zinc-900 placeholder:text-zinc-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";
const label = "grid gap-1.5 text-sm font-medium text-zinc-800";

export default function BookingForm({ id = "booking" }: { id?: string }) {
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const get = (k: string) => String(d.get(k) ?? "").trim();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${get("date")}T00:00`) < today) {
      setError("Please choose a pickup date that is today or later.");
      return;
    }
    const pax = Number(get("passengers"));
    if (!Number.isInteger(pax) || pax < 1 || pax > 50) {
      setError("Please enter between 1 and 50 passengers.");
      return;
    }
    setError("");

    const text = [
      `Hello ${site.name}, I would like to request a quote.`,
      `Pickup: ${get("pickup")}`,
      `Drop-off: ${get("dropoff")}`,
      `Date: ${get("date")}`,
      `Time: ${get("time")}`,
      `Passengers: ${pax}`,
      `Vehicle: ${get("vehicle")}`,
    ].join("\n");
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <label className={label}>
        Pickup location
        <input id={`${id}-pickup`} name="pickup" required autoComplete="off" placeholder="Airport, hotel or address" className={field} />
      </label>
      <label className={label}>
        Drop-off location
        <input name="dropoff" required autoComplete="off" placeholder="Destination" className={field} />
      </label>
      <label className={label}>
        Pickup date
        <input name="date" type="date" required className={field} />
      </label>
      <label className={label}>
        Pickup time
        <input name="time" type="time" required className={field} />
      </label>
      <label className={label}>
        Passengers
        <input name="passengers" type="number" inputMode="numeric" min={1} max={50} defaultValue={1} required className={field} />
      </label>
      <label className={label}>
        Vehicle preference
        <select name="vehicle" defaultValue="No preference" className={field}>
          <option>No preference</option>
          {site.fleet.map((v) => (
            <option key={v.name}>{v.name}</option>
          ))}
        </select>
      </label>
      <p role="alert" aria-live="polite" className="min-h-0 text-sm text-red-700 sm:col-span-2">
        {error}
      </p>
      <button
        type="submit"
        className="rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:bg-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:col-span-2"
      >
        Get a Quote on WhatsApp
      </button>
    </form>
  );
}
