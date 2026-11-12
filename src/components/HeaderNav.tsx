"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Logo from "./Logo";
import { site, telUrl, whatsappUrl } from "@/lib/site";

export type MenuData = {
  taxi: {
    base: string;
    regions: { name: string; href: string }[];
    cities: { name: string; href: string }[];
    routes: { name: string; href: string; km: number }[];
    airports: { name: string; href: string; code: string }[];
  };
  services: { label: string; items: { title: string; href: string; icon: string }[] }[];
  umrah: { hub: string; columns: { label: string; items: { name: string; href: string }[] }[] };
};

type MenuId = "taxi" | "umrah" | "services";

const linkBase = "rounded-md px-1.5 py-1 text-sm text-navy/80 transition hover:bg-accent/15 hover:text-navy";
const heading = "text-xs font-bold uppercase tracking-[0.16em] text-navy/50";

export default function HeaderNav({ menu }: { menu: MenuData }) {
  const pathname = usePathname();
  // Menus belong to the page they were opened on, so navigating closes them without an effect.
  const [menuState, setMenuState] = useState<{ id: MenuId | null; mobile: boolean; path: string }>({ id: null, mobile: false, path: "" });
  const fresh = menuState.path === pathname;
  const open = fresh ? menuState.id : null;
  const mobile = fresh && menuState.mobile;
  const setOpen = useCallback((id: MenuId | null) => setMenuState({ id, mobile: false, path: pathname }), [pathname]);
  const setMobile = useCallback((v: boolean) => setMenuState({ id: null, mobile: v, path: pathname }), [pathname]);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => setMenuState({ id: null, mobile: false, path: pathname }), [pathname]);

  // Shadow once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape and outside click close the menus.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onClick = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [closeAll, setOpen]);

  const enter = (id: MenuId) => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(id);
  };
  const leave = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(null), 160);
  };

  const section = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const taxiActive = section(menu.taxi.base);
  const servicesActive = section("/services");
  const umrahActive = section(menu.umrah.hub);
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a ride or a transport quote.`);

  const topItems = [
    telUrl && { href: telUrl, label: site.phone, icon: "phone", external: false },
    wa && { href: wa, label: "WhatsApp", icon: "chat", external: true },
    site.email && { href: `mailto:${site.email}`, label: site.email, icon: "mail", external: false },
  ].filter(Boolean) as { href: string; label: string; icon: string; external: boolean }[];

  const trigger = (id: MenuId, label: string, active: boolean) => (
    <button
      type="button"
      aria-expanded={open === id}
      aria-controls={`menu-${id}`}
      onClick={() => setOpen(open === id ? null : id)}
      onMouseEnter={() => enter(id)}
      className={`relative inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition hover:bg-white/10 ${active || open === id ? "text-accent" : "text-white/90"}`}
    >
      {label}
      <Icon name="chevron" className={`h-3.5 w-3.5 transition-transform ${open === id ? "rotate-180" : ""}`} />
      {active && <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[15px] h-0.5 rounded-full bg-accent" />}
    </button>
  );

  const plain = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      onMouseEnter={leave}
      aria-current={active ? "page" : undefined}
      className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition hover:bg-white/10 ${active ? "text-accent" : "text-white/90"}`}
    >
      {label}
      {active && <span aria-hidden="true" className="absolute inset-x-3.5 -bottom-[15px] h-0.5 rounded-full bg-accent" />}
    </Link>
  );

  return (
    <header ref={root} className={`sticky top-0 z-40 text-white transition-shadow ${scrolled ? "shadow-lg shadow-black/25" : ""}`} onMouseLeave={leave}>
      {/* Top bar */}
      <div className="hidden bg-[#0b1320] text-xs text-white/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-2">
          <p className="flex items-center gap-2">
            <Icon name="globe" className="h-3.5 w-3.5 text-accent" />
            Taxi, freight and passenger transport across Saudi Arabia
          </p>
          <ul className="flex items-center gap-5">
            {topItems.map((i) => (
              <li key={i.label}>
                <a
                  href={i.href}
                  {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center gap-1.5 font-semibold text-white/85 hover:text-accent"
                >
                  <Icon name={i.icon} className="h-3.5 w-3.5" /> {i.label}
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-accent" /> Fares confirmed before you commit
            </li>
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-white/10 bg-navy/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" aria-label="Gulf Elite Transport, home" className="rounded-lg" onMouseEnter={leave}>
            <Logo tone="dark" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {trigger("taxi", "Taxi & Cab", taxiActive)}
            {trigger("umrah", "Makkah & Madinah", umrahActive)}
            {trigger("services", "Services", servicesActive)}
            {plain("/about", "About", pathname === "/about")}
            {plain("/#industries", "Industries", false)}
            {plain("/contact", "Contact", pathname === "/contact")}
          </nav>

          <div className="flex items-center gap-2" onMouseEnter={leave}>
            {telUrl && (
              <a
                href={telUrl}
                className="hidden items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold hover:border-accent hover:text-accent xl:inline-flex"
              >
                <Icon name="phone" className="h-4 w-4" /> {site.phone}
              </a>
            )}
            <Link
              href="/#quote"
              className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-navy shadow-sm transition hover:brightness-95 sm:inline-block"
            >
              Request a Ride or Quote
            </Link>
            <button
              type="button"
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              onClick={() => setMobile(!mobile)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 lg:hidden"
            >
              <Icon name={mobile ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Taxi mega menu */}
      {open === "taxi" && (
        <div id="menu-taxi" onMouseEnter={() => enter("taxi")} className="absolute inset-x-0 top-full hidden border-t-4 border-accent bg-white text-navy shadow-2xl lg:block">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1.25fr_0.8fr_1fr_0.95fr]">
            <div>
              <p className={heading}>Browse by region</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                {menu.taxi.regions.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} onClick={closeAll} className={`block ${linkBase}`}>
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={heading}>Popular cities</p>
              <ul className="mt-3 space-y-1">
                {menu.taxi.cities.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} onClick={closeAll} className={`block ${linkBase}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={heading}>Popular routes</p>
              <ul className="mt-3 space-y-1">
                {menu.taxi.routes.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} onClick={closeAll} className={`flex items-center justify-between gap-3 ${linkBase}`}>
                      <span>{r.name}</span>
                      <span className="text-xs text-navy/50">~{r.km} km</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={`${heading} mt-5`}>Airports</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {menu.taxi.airports.map((a) => (
                  <li key={a.href}>
                    <Link href={a.href} onClick={closeAll} title={a.name} className="rounded-md bg-navy px-2.5 py-1 text-xs font-bold text-accent hover:brightness-110">
                      {a.code}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-lg font-extrabold">Taxi &amp; cab rides across Saudi Arabia</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Regions, cities, airports and routes, each with real places and what to include in your request.</p>
              <Link href={menu.taxi.base} onClick={closeAll} className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-navy hover:brightness-95">
                Browse all <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href={`${menu.taxi.base}/routes`} onClick={closeAll} className="mt-3 block text-sm font-semibold text-accent hover:underline">
                See all intercity routes
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Makkah & Madinah (Umrah and Hajj) mega menu */}
      {open === "umrah" && (
        <div id="menu-umrah" onMouseEnter={() => enter("umrah")} className="absolute inset-x-0 top-full hidden border-t-4 border-accent bg-white text-navy shadow-2xl lg:block">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 lg:grid-cols-[1fr_1fr_1fr_1fr_1.05fr]">
            {menu.umrah.columns.map((col) => (
              <div key={col.label}>
                <p className={heading}>{col.label}</p>
                <ul className="mt-3 space-y-1">
                  {col.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} onClick={closeAll} className={`block ${linkBase}`}>
                        {i.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-lg font-extrabold">Umrah &amp; Hajj taxi</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Airport, hotel, Haram and between the holy cities, for any size of group.</p>
              <Link href={menu.umrah.hub} onClick={closeAll} className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-navy hover:brightness-95">
                See all pilgrim rides <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Services mega menu */}
      {open === "services" && (
        <div id="menu-services" onMouseEnter={() => enter("services")} className="absolute inset-x-0 top-full hidden border-t-4 border-accent bg-white text-navy shadow-2xl lg:block">
          <div className="mx-auto max-w-7xl px-5 py-8">
            <div className="grid gap-8 lg:grid-cols-4">
              {menu.services.map((g) => (
                <div key={g.label}>
                  <p className={heading}>{g.label}</p>
                  <ul className="mt-3 space-y-1">
                    {g.items.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} onClick={closeAll} className={`flex items-center gap-2.5 ${linkBase}`}>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-navy text-accent">
                            <Icon name={s.icon} className="h-4 w-4" />
                          </span>
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface px-6 py-4">
              <p className="text-sm font-semibold text-navy">Not sure which service fits? Use the service finder and comparison table.</p>
              <div className="flex gap-3">
                <Link href="/services" onClick={closeAll} className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-2">
                  All services
                </Link>
                <Link href="/#quote" onClick={closeAll} className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-navy hover:brightness-95">
                  Request a quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobile && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-white/10 bg-navy px-5 pb-6 lg:hidden">
          <ul className="grid gap-1 pt-3">
            <li>
              <details className="group rounded-lg" open={taxiActive}>
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 font-semibold text-white/95">
                  Taxi &amp; Cab
                  <Icon name="chevron" className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 px-3 pb-3 text-sm">
                  <Link href={menu.taxi.base} className="block font-bold text-accent">All of Saudi Arabia</Link>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50">Regions</p>
                    <ul className="mt-2 grid grid-cols-2 gap-1">
                      {menu.taxi.regions.map((r) => (
                        <li key={r.href}><Link href={r.href} className="block rounded px-1 py-1.5 text-white/85">{r.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50">Popular cities</p>
                    <ul className="mt-2 grid grid-cols-2 gap-1">
                      {menu.taxi.cities.map((c) => (
                        <li key={c.href}><Link href={c.href} className="block rounded px-1 py-1.5 text-white/85">{c.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <Link href={`${menu.taxi.base}/routes`} className="block font-semibold text-accent">Intercity routes</Link>
                </div>
              </details>
            </li>
            <li>
              <details className="group rounded-lg" open={umrahActive}>
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 font-semibold text-white/95">
                  Makkah &amp; Madinah
                  <Icon name="chevron" className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 px-3 pb-3 text-sm">
                  <Link href={menu.umrah.hub} className="block font-bold text-accent">Umrah &amp; Hajj taxi: all pages</Link>
                  {menu.umrah.columns.map((col) => (
                    <div key={col.label}>
                      <p className="text-xs font-bold uppercase tracking-wider text-white/50">{col.label}</p>
                      <ul className="mt-2 space-y-0.5">
                        {col.items.map((i) => (
                          <li key={i.href}><Link href={i.href} className="block rounded px-1 py-1.5 text-white/85">{i.name}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            </li>
            <li>
              <details className="group rounded-lg" open={servicesActive}>
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 font-semibold text-white/95">
                  Services
                  <Icon name="chevron" className="h-4 w-4 transition-transform group-open:rotate-180" />
                </summary>
                <div className="space-y-4 px-3 pb-3 text-sm">
                  {menu.services.map((g) => (
                    <div key={g.label}>
                      <p className="text-xs font-bold uppercase tracking-wider text-white/50">{g.label}</p>
                      <ul className="mt-2 space-y-0.5">
                        {g.items.map((s) => (
                          <li key={s.href}><Link href={s.href} className="block rounded px-1 py-1.5 text-white/85">{s.title}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link href="/services" className="block font-bold text-accent">Compare all services</Link>
                </div>
              </details>
            </li>
            {[
              ["/about", "About"],
              ["/#industries", "Industries"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="block rounded-lg px-3 py-3 font-semibold text-white/95">{label}</Link>
              </li>
            ))}
            <li>
              <Link href="/#quote" className="mt-2 block rounded-full bg-accent px-3 py-3.5 text-center font-bold text-navy">
                Request a Ride or Quote
              </Link>
            </li>
            {topItems.length > 0 && (
              <li className="mt-2 grid gap-2">
                {topItems.map((i) => (
                  <a key={i.label} href={i.href} {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 py-3 text-sm font-semibold text-white">
                    <Icon name={i.icon} className="h-4 w-4" /> {i.label}
                  </a>
                ))}
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
