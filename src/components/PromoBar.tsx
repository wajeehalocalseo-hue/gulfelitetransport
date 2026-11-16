"use client";

import { useEffect, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsApp";

const KEY = "ge-promo-dismissed";

/** A slim notice above the header, with a WhatsApp button. It can be closed, and stays closed for the rest of the visit. */
export default function PromoBar() {
  const href = whatsappUrl(`Hello ${site.name}, I would like to book a ride.`);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setHidden(true);
    } catch {
      /* storage can be blocked, the bar then simply shows */
    }
  }, []);

  if (!href || hidden) return null;
  return (
    <div role="region" aria-label="Booking notice" className="relative bg-accent text-navy">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-10 py-2 text-center text-sm">
        <p className="font-semibold">
          <span className="font-extrabold">Book your ride on WhatsApp</span>
          <span aria-hidden="true" className="mx-2">·</span>
          Vehicle, driver and fare confirmed before you commit
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-extrabold text-[#06391f] shadow-sm transition hover:brightness-95"
        >
          <WhatsAppIcon className="h-4 w-4" /> Book on WhatsApp
        </a>
      </div>
      <button
        type="button"
        aria-label="Close notice"
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
        }}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-lg leading-none text-navy/70 transition hover:bg-navy/10 hover:text-navy"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}