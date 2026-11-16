"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import Icon from "./Icon";

const field =
  "w-full rounded-xl border border-navy/10 bg-surface px-3.5 py-3 text-sm text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
const lbl = "grid gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-navy/70";

/**
 * Wide booking bar for the home hero: pickup, drop-off, date and time on one row.
 * Nothing is sent from here. "Continue Booking" opens /book with these values filled in.
 */
export default function TripBar() {
  const router = useRouter();
  const uid = useId();
  const [error, setError] = useState("");

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    const from = String(d.get("from") ?? "").trim();
    const to = String(d.get("to") ?? "").trim();
    if (!from || !to) {
      setError("Please enter the pickup and the drop-off location.");
      return;
    }
    const q = new URLSearchParams({ from, to });
    const date = String(d.get("date") ?? "");
    const time = String(d.get("time") ?? "");
    if (date) q.set("date", date);
    if (time) q.set("time", time);
    router.push(`/book?${q.toString()}`);
  }

  return (
    <div id="hero-quote" className="mx-auto w-full max-w-5xl rounded-3xl bg-white p-4 text-left text-navy shadow-2xl ring-1 ring-black/10 sm:p-5">
      <form onSubmit={onSubmit} noValidate aria-label="Book your ride" aria-describedby={`${uid}-note`} className="grid gap-3 md:grid-cols-4">
        <label className={lbl}>
          <span className="flex items-center gap-1.5"><Icon name="arrow" className="h-3.5 w-3.5 text-gold" /> Pickup</span>
          <input name="from" autoComplete="off" placeholder="City, airport or hotel" aria-invalid={error ? true : undefined} className={field} />
        </label>
        <label className={lbl}>
          <span className="flex items-center gap-1.5"><Icon name="globe" className="h-3.5 w-3.5 text-gold" /> Drop-off</span>
          <input name="to" autoComplete="off" placeholder="City, airport or hotel" aria-invalid={error ? true : undefined} className={field} />
        </label>
        <label className={lbl}>
          <span className="flex items-center gap-1.5"><Icon name="calendar" className="h-3.5 w-3.5 text-gold" /> Pickup date</span>
          <input name="date" type="date" className={field} />
        </label>
        <label className={lbl}>
          <span className="flex items-center gap-1.5"><Icon name="bolt" className="h-3.5 w-3.5 text-gold" /> Pickup time</span>
          <input name="time" type="time" className={field} />
        </label>
        {error && <p role="alert" className="text-sm text-red-700 md:col-span-4">{error}</p>}
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy px-6 py-3.5 font-extrabold text-white transition hover:bg-navy-2 md:col-span-4">
          Continue Booking <Icon name="arrow" className="h-4 w-4 text-accent" />
        </button>
      </form>
      <p id={`${uid}-note`} className="mt-3 text-center text-xs text-muted">Next you choose the vehicle and add your contact details. No payment now.</p>
    </div>
  );
}
