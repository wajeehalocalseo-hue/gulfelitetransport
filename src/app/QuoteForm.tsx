"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const field =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function QuoteForm() {
  const [service, setService] = useState<string>(site.services[0].title);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = [
      `Quote request: ${service}`,
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Details: ${d.get("details")}`,
    ].join("\n");
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label className="grid gap-1 text-sm font-medium">
        Name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Phone
        <input name="phone" type="tel" required autoComplete="tel" className={field} />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Service
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={field}
        >
          {site.services.map((s) => (
            <option key={s.title}>{s.title}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Details (pickup, drop-off, date)
        <textarea name="details" rows={4} required className={field} />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Send quote request on WhatsApp
      </button>
    </form>
  );
}
