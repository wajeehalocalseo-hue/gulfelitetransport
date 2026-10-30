"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./Icon";
import { nav, site, telUrl } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    !href.includes("#") && (href === pathname || (href !== "/" && pathname.startsWith(`${href}/`)));

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-lg font-extrabold tracking-tight"
        >
          Gulf Elite <span className="text-accent">Transport</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`transition-colors hover:text-accent ${isActive(l.href) ? "text-accent" : "text-white/85"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {telUrl && (
            <a
              href={telUrl}
              className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent md:inline-flex"
            >
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </a>
          )}
          <Link
            href="/#quote"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-navy transition hover:brightness-95 sm:inline-block"
          >
            Get a Free Quote
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/10 bg-navy px-5 pb-5 lg:hidden">
          <ul className="grid gap-1 pt-3">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 font-medium ${isActive(l.href) ? "bg-white/10 text-accent" : "text-white/90"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#quote"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-accent px-3 py-3 text-center font-bold text-navy"
              >
                Get a Free Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
