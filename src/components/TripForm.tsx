"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

const field =
  "w-full rounded-lg border border-navy/20 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
const lbl = "grid gap-1 text-xs font-bold uppercase tracking-wide text-navy/80";

/**
 * Short trip form for ride pages: pickup, drop-off, date and time. It does not send anything;
 * "Continue Booking" opens /book with these values filled in, where the rest of the booking is completed.
 */
export default function TripForm({ pickupDefault = "", dropoffDefault = "" }: { pickupDefault?: string; dropoffDefault?: string }) {
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
    <form onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-3 gap-y-3" aria-describedby={`${uid}-note`}>
      <label className={`${lbl} col-span-2`}>
        Pickup
        <input name="from" defaultValue={pickupDefault} autoComplete="off" placeholder="Address, hotel or airport" aria-invalid={error ? true : undefined} className={field} />
      </label>
      <label className={`${lbl} col-span-2`}>
        Drop-off
        <input name="to" defaultValue={dropoffDefault} autoComplete="off" placeholder="Address, hotel or airport" aria-invalid={error ? true : undefined} className={field} />
      </label>
      <label className={lbl}>
        Pickup date
        <input name="date" type="date" className={field} />
      </label>
      <label className={lbl}>
        Pickup time
        <input name="time" type="time" className={field} />
      </label>
      {error && (
        <p role="alert" className="col-span-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <button type="submit" className="col-span-2 rounded-full bg-accent px-6 py-3 font-extrabold text-navy transition hover:brightness-95 focus-visible:outline-navy">
        Continue Booking
      </button>
      <p id={`${uid}-note`} className="col-span-2 text-center text-xs leading-5 text-muted">
        Next you choose the vehicle and add your contact details. No payment now.
      </p>
    </form>
  );
}
