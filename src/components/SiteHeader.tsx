"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import { nav, site, whatsappUrl } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => !href.includes("#") && href === pathname;

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="text-lg font-semibold tracking-wide" onClick={() => setOpen(false)}>
          <span className="text-gold">Gulf</span> Elite Transport
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm xl:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`transition-colors hover:text-gold ${isActive(l.href) ? "text-gold" : "text-white/80"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl(`Hello ${site.name}, I would like to book a ride.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold sm:inline-flex"
          >
            <Icon name="chat" className="h-4 w-4" /> WhatsApp
          </a>
          <Link
            href="/#book"
            className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-110 sm:inline-block"
          >
            Book Now
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-ink px-5 pb-5 xl:hidden">
          <ul className="grid gap-1 pt-3">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 ${isActive(l.href) ? "bg-white/10 text-gold" : "text-white/85"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
