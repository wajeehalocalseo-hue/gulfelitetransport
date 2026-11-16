"use client";

import { useEffect, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

/** A round WhatsApp button fixed to the right edge. A small "Book via WhatsApp" note shows for a few seconds, then on hover or focus. */
export default function FloatingWhatsApp() {
  const href = whatsappUrl(`Hello ${site.name}, I would like to book a ride.`);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const open = window.setTimeout(() => setHint(true), 2500);
    const close = window.setTimeout(() => setHint(false), 10500);
    return () => {
      window.clearTimeout(open);
      window.clearTimeout(close);
    };
  }, []);

  if (!href) return null;
  return (
    <div className="group fixed bottom-24 right-4 z-30 flex items-center gap-3 md:bottom-6 md:right-5">
      <span
        className={`pointer-events-none hidden rounded-full bg-white md:block px-4 py-2 text-sm font-extrabold text-navy shadow-lg ring-1 ring-navy/10 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${hint ? "opacity-100" : "opacity-0"}`}
      >
        Book via WhatsApp
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book via WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.55)] ring-4 ring-white/80 transition hover:scale-105 focus-visible:outline-navy"
      >
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping" />
        <WhatsAppIcon className="relative h-8 w-8" />
      </a>
    </div>
  );
}
