import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import RichText from "@/components/RichText";
import HomePhoto from "@/components/HomePhoto";
import ServiceImage from "@/components/ServiceImage";
import TripBar from "@/components/TripBar";
import { WhatsAppIcon } from "@/components/WhatsApp";
import * as c from "@/content/home";
import { blogPosts } from "@/content/extra-pages";
import { airports, routes } from "@/content/saudi/places";
import { routeProfiles } from "@/content/saudi/route-profiles";
import routeTimes from "@/content/saudi/route-times.json";
import { riyadhAreas } from "@/content/saudi/riyadh-areas";
import { fmtMin } from "@/content/saudi/riyadh-districts";
import { cities } from "@/content/saudi/cities";
import { cityHref } from "@/content/saudi/paths";
import { regions } from "@/content/saudi/regions";
import { BASE } from "@/content/saudi/build";
import { priceColumns, priceRows } from "@/content/prices";
import { groups, services } from "@/content/services";
import { homeDescription, homeGraph, homeTitle } from "@/lib/home-schema";
import { abs, site, telUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: { title: homeTitle, description: homeDescription, url: abs("/"), siteName: site.name, type: "website", locale: "en" },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription },
};

const wrap = "mx-auto max-w-7xl px-5";
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center font-bold transition";
const btnPrimary = `${btn} bg-accent text-navy hover:brightness-95`;
const btnGhost = `${btn} border border-white/30 text-white hover:border-accent hover:text-accent`;
const btnDark = `${btn} bg-navy text-white hover:bg-navy-2`;
const btnOutline = `${btn} border border-navy/25 text-navy hover:border-accent hover:bg-accent/10`;
const chip = "rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy transition hover:border-accent hover:bg-accent/15";
const card = "rounded-2xl border border-accent/25 bg-white";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-gold";

/** Descriptive alt text for the vehicle photos on the home page. The photos are illustrations of each class. */
const VEHICLE_ALT: Record<string, string> = {
  Sedan: "Private sedan for city and airport rides in Riyadh",
  SUV: "Private SUV for family and long-distance rides in Saudi Arabia",
  "Family van": "Family van for groups travelling together in Saudi Arabia",
  "Group van": "Group van for airport transfers and intercity trips in Saudi Arabia",
  Coach: "Coach for large groups and event travel in Saudi Arabia",
};
const cityName = (id: string) => cities.find((x) => x.id === id)?.name ?? id;
const cityPath = (id: string) => {
  const ct = cities.find((x) => x.id === id);
  return ct ? cityHref(BASE, ct) : BASE;
};

/** Consistent section heading: gold rule + small caps label, serif title, optional lead. */
function Head({ id, eyebrow, title, lead, dark = false, center = false }: { id: string; eyebrow: string; title: string; lead?: ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <header className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-accent" : "text-gold"} ${center ? "justify-center" : ""}`}>
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className={`font-display mt-3 text-3xl leading-tight sm:text-4xl ${dark ? "text-white" : "text-navy"}`}>{title}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </header>
  );
}

export default function Home() {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a ride or a transport quote.`);
  const heroRoutes = ["riyadh-to-jeddah", "riyadh-to-makkah", "riyadh-to-madinah", "riyadh-to-dammam"].flatMap((id) => routes.filter((r) => r.id === id));
  const routeCount = Object.keys(routeProfiles).length;
  const districtCount = riyadhAreas.filter((a) => a.kind !== "airport").length;
  const baseStats = [
    { icon: "calendar", big: "24/7", label: "Requests every day", sub: "Open 24 hours" },
    { icon: "shield", big: "Licensed", label: "and fully insured", sub: "Private transport" },
    { icon: "network", big: String(routeCount), label: "Routes from Riyadh", sub: "Both directions" },
    { icon: "building", big: String(districtCount), label: "Riyadh districts", sub: "Pickups across the city" },
  ];
  const proofStats = [
    ...(site.proof.passengersServed ? [{ icon: "bus", big: site.proof.passengersServed, label: "Passengers served", sub: "Completed rides" }] : []),
    ...(site.proof.drivers ? [{ icon: "briefcase", big: site.proof.drivers, label: "Drivers", sub: "Professional drivers" }] : []),
    ...(site.proof.googleReviews ? [{ icon: "check", big: site.proof.googleReviews, label: "Customer reviews", sub: "From our customers" }] : []),
  ];
  // With real figures set in site.ts the row leads with them; otherwise it shows the four coverage cards.
  const statCards = proofStats.length ? [...proofStats, ...baseStats.slice(0, 3)] : baseStats;  const times = routeTimes as Record<string, { km: number; min: number }>;
  const routeCards = ["riyadh-to-jeddah", "riyadh-to-dammam", "riyadh-to-makkah"].flatMap((id) => {
    const r = routes.find((x) => x.id === id);
    const prof = routeProfiles[id];
    if (!r || !prof || !times[id]) return [];
    return [{ id, to: cityName(r.to), km: r.km, time: fmtMin(times[id].min), text: prof.why[0].text }];
  });  const topCities = cities.slice(0, 8);
  const topRoutes = routes.slice(0, 6);
  const topAirports = airports.slice(0, 4);
  const contactRows: { label: string; value: string; href?: string }[] = [
    ...(site.phone && telUrl ? [{ label: "Phone", value: site.phone, href: telUrl }] : []),
    ...(wa ? [{ label: "WhatsApp", value: "Message us on WhatsApp", href: wa }] : []),
    ...(site.email ? [{ label: "Email", value: site.email, href: `mailto:${site.email}` }] : []),
    ...(site.address ? [{ label: "Address", value: site.address }] : []),
    ...(site.hours ? [{ label: "Hours", value: site.hours }] : []),
  ];

  return (
    <main id="main" className="flex-1">
      <JsonLd data={homeGraph()} />

      {/* 1. Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-navy-2 text-white">
        <HomePhoto name="hero-car" fill priority alt="Private taxi and chauffeur car in Riyadh at sunset with the city skyline" width={1600} height={900} sizes="100vw" className="object-cover object-[88%_bottom]" />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/65 lg:bg-gradient-to-b lg:from-navy/85 lg:via-navy/40 lg:to-navy/20" />
        <ul aria-label="What you get" className="relative border-b border-white/10 bg-black/25">
          <li className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/85">
            <span className="inline-flex items-center gap-2"><Icon name="calendar" className="h-3.5 w-3.5 text-accent" /> Available 24/7</span>
            <span className="inline-flex items-center gap-2"><Icon name="shield" className="h-3.5 w-3.5 text-accent" /> Licensed and insured</span>
            <span className="inline-flex items-center gap-2"><Icon name="check" className="h-3.5 w-3.5 text-accent" /> {c.hero.fareChip}</span>
            <span className="inline-flex items-center gap-2"><Icon name="bus" className="h-3.5 w-3.5 text-accent" /> Private rides</span>
          </li>
        </ul>
        <div className={`${wrap} relative flex flex-col items-center py-14 text-center lg:min-h-[940px] lg:pb-24 lg:pt-20`}>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {c.hero.eyebrow}
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
          </p>
          <h1 id="hero-title" className="font-display mt-5 max-w-4xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {c.hero.h1.split(" Across ")[0]}{" "}
            <span className="block text-accent">Across {c.hero.h1.split(" Across ")[1]}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">Book a taxi, an airport transfer or an Umrah ride, or ask for a freight quotation. We confirm the vehicle, driver and fare with you before you commit.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-center font-extrabold text-[#06391f] shadow-sm transition hover:brightness-95">
                <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
              </a>
            )}
            <Link href="#hero-quote" className={wa ? btnGhost : btnPrimary}>{wa ? "Use the Booking Form" : "Get Instant Quote"} <Icon name="arrow" className="h-4 w-4" /></Link>
            {telUrl && (
              <a href={telUrl} className={btnGhost}>
                <Icon name="phone" className="h-4 w-4" /> Call Now
              </a>
            )}

          </div>
          <div className="mt-10 w-full lg:mt-auto">
            <TripBar />
            <p className="mt-4 text-sm text-white/85">
              Moving freight, equipment or a fleet?{" "}
              <Link href="/contact" className="font-semibold text-accent underline underline-offset-4">Request a quotation</Link>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/60">Popular routes</span>
            {heroRoutes.map((r) => (
              <Link key={r.id} href={`${BASE}/routes/${r.id}`} className="rounded-full border border-white/25 bg-black/20 px-4 py-1.5 text-xs font-bold text-white/90 backdrop-blur transition hover:border-accent hover:text-accent">
                {cityName(r.from)} to {cityName(r.to)}
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* 1b. The coverage in numbers (counts come from the pages the site actually has) */}
      <section aria-label="Coverage in numbers" className="relative z-10 -mt-10 pb-2">
        <div className={wrap}>
          <ul className={`grid gap-4 sm:grid-cols-2 ${statCards.length > 4 ? "lg:grid-cols-3 xl:grid-cols-6" : "lg:grid-cols-4"}`}>
            {statCards.map((s) => (
              <li key={s.label} className="rounded-3xl bg-white p-6 text-center shadow-xl ring-1 ring-accent/25">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy text-accent"><Icon name={s.icon} className="h-5 w-5" /></span>
                <p className="font-display mt-3 text-4xl text-navy">{s.big}</p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-muted">{s.label}</p>
                <p className="mt-1 text-xs font-bold text-gold">{s.sub}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* 2. What do you need? The first thing a new visitor sees under the hero */}
      <section id="choose" aria-labelledby="choose-title" className="border-b border-navy/10 bg-ivory py-16">
        <div className={wrap}>
          <Head id="choose-title" eyebrow="Start here" title="What do you need?" lead="Pick one. Each opens a page with the details and a booking form." center />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: "bus", title: "Taxi & cab rides", text: "A car with a driver in a Saudi city, to or from an airport, or between cities.", href: BASE, cta: "Find your city", href2: `${BASE}/routes`, cta2: "Intercity routes" },
              { icon: "building", title: "Umrah & Hajj transport", text: "Rides between Jeddah, Makkah, Madinah and Taif: airport, hotel, the Haram and between the holy cities.", href: "/umrah-hajj-taxi", cta: "Umrah & Hajj rides", href2: "/umrah-hajj-taxi/jeddah-airport-to-makkah", cta2: "Jeddah airport to Makkah" },
              { icon: "truck", title: "Freight, cargo & equipment", text: "Trucks, containers, equipment moving, contract fleets and delivery for businesses.", href: "/services", cta: "See all services", href2: "/contact", cta2: "Request a quotation" },
            ].map((x) => (
              <li key={x.title} className={`flex flex-col ${card} border-t-4 border-t-accent p-7 shadow-sm`}>
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-navy text-accent">
                  <Icon name={x.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-5 text-2xl text-navy">{x.title}</h3>
                <p className="mt-2 flex-1 leading-7 text-muted">{x.text}</p>
                <Link href={x.href} className={`${btnDark} mt-6`}>{x.cta}</Link>
                <Link href={x.href2} className={`${textLink} mt-4 text-center`}>{x.cta2}</Link>
              </li>
            ))}
          </ul>
          <nav aria-label="Jump to a section" className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="font-semibold text-muted">Or jump to:</span>
            {[
              ["How it works", "#process"],
              ["Vehicles", "#fleet"],
              ["Prices", "#pricing"],
              ["Questions", "#faq"],
              ["Contact", "#quote"],
            ].map(([t, h]) => (
              <Link key={h} href={h} className={chip}>{t}</Link>
            ))}
          </nav>
        </div>
      </section>

      {/* 12. About (entity and trust), laid out as photo and text */}
      <section aria-labelledby="about-title" className="bg-white py-20">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-2`}>
          <div className="relative pb-8 pr-4 lg:pb-10">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy to-navy-2 shadow-2xl ring-1 ring-accent/30">
              <HomePhoto name="suv" fill alt="Private SUV for family and long-distance rides in Saudi Arabia" width={900} height={506} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" fallback={<span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-accent"><Icon name="bus" className="h-20 w-20" /></span>} />
            </div>
            <div className="absolute bottom-0 right-0 flex max-w-[16rem] items-start gap-3 rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-accent/30">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy text-accent"><Icon name="shield" className="h-6 w-6" /></span>
              <div>
                <p className="text-lg font-extrabold leading-tight text-navy">Licensed</p>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-muted">and fully insured</p>
                <p className="mt-2 text-xs leading-5 text-muted">Private transport across Saudi Arabia for individuals, families and organisations.</p>
              </div>
            </div>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">{c.about.eyebrow}</p>
            <h2 id="about-title" className="font-display mt-4 text-3xl leading-tight text-navy sm:text-4xl">{c.about.h2}</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
              {c.about.paragraphs.slice(1).map((pp) => (
                <p key={pp}>{pp}</p>
              ))}
              <p>
                <Link href="/about" className={textLink}>About Gulf Elite Transport Group</Link>
                {" Â· "}
                <Link href="/contact" className={textLink}>Contact the team</Link>
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                { icon: "bus", title: "Four vehicle classes", text: "Sedan, SUV, van and executive" },
                { icon: "calendar", title: "24/7 requests", text: "Every day, at any hour" },
                { icon: "check", title: "Fare confirmed first", text: "Before you commit" },
                { icon: "briefcase", title: "Driver details confirmed", text: "Sent before you travel" },
              ].map((f) => (
                <li key={f.title} className="flex items-center gap-3 rounded-2xl border border-accent/25 bg-surface p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gold ring-1 ring-accent/30"><Icon name={f.icon} className="h-5 w-5" /></span>
                  <span>
                    <span className="block font-extrabold text-navy">{f.title}</span>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-muted">{f.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* 11. Why, in a dark panel with a short statement of how a request works */}
      <section aria-labelledby="why-title" className="bg-navy-2/40 py-16">
        <div className={wrap}>
          <div className="grid gap-10 rounded-[2rem] bg-navy p-8 text-white shadow-2xl ring-1 ring-accent/20 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex rounded-full bg-accent/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent">{c.why.eyebrow}</p>
              <h2 id="why-title" className="font-display mt-4 text-3xl leading-tight sm:text-4xl">{c.why.h2}</h2>
              <p className="mt-4 text-lg leading-8 text-white/75">{c.why.text}</p>
              <ul className="mt-8 space-y-5">
                {c.why.items.map((w) => (
                  <li key={w.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30"><Icon name={w.icon} className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-extrabold">{w.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-white/70"><RichText text={w.text} tone="dark" /></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-center rounded-3xl bg-black/35 p-6 ring-1 ring-accent/25 sm:p-8">
              <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-accent"><Icon name="bolt" className="h-4 w-4" /> How we work</p>
              <p className="mt-4 border-l-4 border-accent pl-5 text-lg font-medium italic leading-8 text-white/90">&ldquo;You tell us where and when. We confirm the vehicle, driver and fare. Nothing is agreed until you say yes.&rdquo;</p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="font-display text-2xl text-accent">Fare first</p>
                  <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-white/60">Confirmed before you commit</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="font-display text-2xl text-accent">Private</p>
                  <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-white/60">A car for your group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11a. Google reviews, shown only when the real rating, count and link are set in site.ts */}
      {site.proof.googleRating && site.proof.googleReviews && site.proof.googleReviewsUrl && (
        <section aria-label="Google reviews" className="bg-navy py-12 text-white">
          <div className={`${wrap} flex flex-col items-center gap-5 text-center`}>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-extrabold ring-1 ring-accent/30">
              <span aria-hidden="true" className="text-accent">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              {site.proof.googleRating} on Google &middot; {site.proof.googleReviews} reviews
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">What our customers say</h2>
            <p className="max-w-2xl text-white/70">Read the reviews exactly as customers left them on our Google Business Profile.</p>
            <a href={site.proof.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>Read our reviews on Google <Icon name="arrow" className="h-4 w-4" /></a>
          </div>
        </section>
      )}
      {/* 11b. Popular routes from Riyadh */}
      <section id="routes" aria-labelledby="routes-title" className="bg-black py-20 text-white">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-accent">Routes</p>
              <h2 id="routes-title" className="font-display mt-3 text-3xl leading-tight sm:text-4xl">Popular routes from Riyadh</h2>
              <p className="mt-3 max-w-2xl text-white/65">Each route page covers both directions, with the distance, the driving time and what to tell us when you ask for a ride.</p>
            </div>
            <Link href={`${BASE}/routes`} className="inline-flex items-center gap-2 text-sm font-extrabold text-accent underline decoration-accent/50 underline-offset-4">All {routeCount} routes from Riyadh <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {routeCards.map((r) => (
              <li key={r.id} className="flex flex-col rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:ring-accent/60">
                <h3 className="text-xl font-extrabold">Taxi from Riyadh to {r.to}</h3>
                <p className="mt-2 text-sm font-bold italic text-accent">about {r.km} km &middot; roughly {r.time}</p>
                <p className="mt-3 flex-1 text-sm leading-7 text-white/65">{r.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {["Door to door", "Both directions", "Fare confirmed first"].map((t) => (
                    <li key={t} className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white/75">{t}</li>
                  ))}
                </ul>
                <Link href={`${BASE}/routes/${r.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white hover:text-accent">Book this route <Icon name="arrow" className="h-4 w-4" /></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* 7. Vehicles */}
      <section id="fleet" aria-labelledby="fleet-title" className="bg-ivory py-20">
        <div className={wrap}>
          <Head id="fleet-title" eyebrow={c.fleet.eyebrow} title={c.fleet.h2} lead={c.fleet.text} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.fleet.items.map((v) => (
              <li key={v.name} className={`flex flex-col overflow-hidden ${card} border-t-4 border-t-accent p-6 shadow-sm`}>
                <HomePhoto name={v.name.toLowerCase().replace(/\s+/g, "-")} alt={VEHICLE_ALT[v.name] ?? `${v.name} for private rides in Saudi Arabia`} width={900} height={506} className="-mx-6 -mt-6 mb-5 aspect-video h-auto w-[calc(100%+3rem)] max-w-none object-cover" sizes="(min-width: 1024px) 33vw, 100vw" fallback={<div aria-hidden="true" className="-mx-6 -mt-6 mb-5 flex aspect-video w-[calc(100%+3rem)] items-center justify-center bg-gradient-to-br from-navy to-navy-2 text-accent"><Icon name="bus" className="h-14 w-14" /></div>} />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl text-navy">{v.name}</h3>
                  <span className="text-sm font-extrabold text-gold">{v.pax} passengers</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-navy">Luggage: <span className="font-normal text-muted">{v.bags}</span></p>
                <p className="mt-2 flex-1 leading-7 text-muted">{v.best}</p>
                <Link href="#hero-quote" className={`${textLink} mt-4`}>Book a {v.name.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">{c.fleet.note}</p>
        </div>
      </section>

      {/* 8. Pricing */}
      <section id="pricing" aria-labelledby="pricing-title" className={`${wrap} py-20`}>
        <Head id="pricing-title" eyebrow={c.pricing.eyebrow} title={c.pricing.h2} />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {c.pricing.points.map((p, i) => (
            <li key={p.title} className={`${card} p-6 shadow-sm`}>
              <span className="font-display text-4xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-extrabold text-navy">{p.title}</h3>
              <p className="mt-2 leading-7 text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
        {priceRows.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display text-xl text-navy">{c.pricing.tableTitle}</h3>
            <div className={`mt-4 overflow-x-auto ${card} shadow-sm`}>
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">{c.pricing.tableTitle}</caption>
                <thead className="bg-navy text-white">
                  <tr>
                    <th scope="col" className="px-4 py-3">Route</th>
                    {priceColumns.map((col) => <th key={col} scope="col" className="px-4 py-3">{col}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {priceRows.map((r) => (
                    <tr key={r.route}>
                      <th scope="row" className="px-4 py-3 font-semibold text-navy">{r.route}</th>
                      {priceColumns.map((col, i) => <td key={col} className="px-4 py-3 tabular-nums text-navy">{r.prices[i] != null ? `SAR ${r.prices[i]}` : "-"}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted">{c.pricing.tableNote}</p>
          </div>
        )}
        <Link href="#hero-quote" className={`${btnPrimary} mt-8`}>{c.pricing.cta}</Link>
      </section>

      {/* 6. Taxi coverage (local SEO: places, airports, routes as entities) */}
      <section id="coverage" aria-labelledby="taxi-title" className={`${wrap} py-20`}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[16/11] overflow-hidden rounded-lg ring-1 ring-navy/10 shadow-lg">
            <ServiceImage slug="taxi-cab-services" title="Taxi and cab rides in Saudi Arabia" className="h-full w-full" />
          </div>
          <div>
            <Head id="taxi-title" eyebrow={c.taxi.eyebrow} title={c.taxi.h2} lead={<RichText text={c.taxi.text} />} />
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={BASE} className={btnDark}>Browse all of Saudi Arabia</Link>
              <Link href={`${BASE}/routes`} className={btnOutline}>Intercity routes</Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-navy">{c.taxi.regionsHeading}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {regions.map((r) => (
                <li key={r.id}>
                  <Link href={`${BASE}/${r.id}`} className={chip}>{r.name}</Link>
                </li>
              ))}
            </ul>
            <h3 className="font-display mt-8 text-xl text-navy">{c.taxi.citiesHeading}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {topCities.map((ct) => (
                <li key={ct.id}>
                  <Link href={cityPath(ct.id)} className={chip}>{ct.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <h3 className="font-display text-xl text-navy">{c.taxi.routesHeading}</h3>
              <ul className="mt-4 space-y-2">
                {topRoutes.map((r) => (
                  <li key={r.id}>
                    <Link href={`${BASE}/routes/${r.id}`} className="flex items-center justify-between gap-3 rounded-md border border-navy/10 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-accent">
                      <span>{cityName(r.from)} to {cityName(r.to)}</span>
                      <span className="text-xs font-medium text-muted">~{r.km} km</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl text-navy">{c.taxi.airportsHeading}</h3>
              <ul className="mt-4 space-y-2">
                {topAirports.map((a) => (
                  <li key={a.id}>
                    <Link href={`${BASE}/airports/${a.id}`} className="flex items-center justify-between gap-3 rounded-md border border-navy/10 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-accent">
                      <span>{a.name}</span>
                      <span className="rounded bg-navy px-2 py-0.5 text-xs font-bold text-accent">{a.code}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 border-l-4 border-accent bg-accent/10 p-5 text-sm font-semibold leading-6 text-navy">{c.taxi.note}</p>
      </section>

      {/* 6b. Makkah and Madinah: Umrah and Hajj transport */}
      <section id="umrah" aria-labelledby="umrah-title" className="bg-navy py-20 text-white">
        <div className={wrap}>
          <Head id="umrah-title" eyebrow={c.umrah.eyebrow} title={c.umrah.h2} lead={c.umrah.text} dark />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.umrah.items.map((i) => (
              <li key={i.title} className="rounded-lg bg-navy-2 p-6 ring-1 ring-white/10">
                <h3 className="font-display text-xl">{i.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/75"><RichText text={i.text} tone="dark" /></p>
              </li>
            ))}
          </ul>
          <Link href="/umrah-hajj-taxi" className={`${btnPrimary} mt-8`}>{c.umrah.cta}</Link>
        </div>
      </section>

      {/* 10. Process */}
      <section id="process" aria-labelledby="process-title" className={`${wrap} py-20`}>
        <Head id="process-title" eyebrow={c.process.eyebrow} title={c.process.h2} lead={c.process.text} />
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map((s, i) => (
            <li key={s.title} className="relative border-t-2 border-navy/15 pt-6">
              <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-12 bg-accent" />
              <span className="font-display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted"><RichText text={s.text} /></p>
            </li>
          ))}
        </ol>
      </section>

      {/* 9. Services by group */}
      <section aria-labelledby="services-title" className="bg-white py-20">
        <div className={wrap}>
          <Head id="services-title" eyebrow={c.servicesIntro.eyebrow} title={c.servicesIntro.h2} lead={<RichText text={c.servicesIntro.text} />} />
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
            {groups.map((g) => {
              const list = services.filter((s) => s.group === g.id);
              return (
                <article key={g.id} className="rounded-lg border border-navy/10 bg-ivory p-6 sm:p-8">
                  <h3 className="font-display text-2xl text-navy">{g.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{g.text.split(". ")[0]}.</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {list.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-md bg-white p-3 ring-1 ring-navy/10 transition hover:ring-accent">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-navy text-accent">
                            <Icon name={s.icon} className="h-5 w-5" />
                          </span>
                          <span className="flex-1 text-sm font-bold leading-snug text-navy">{s.title}</span>
                          <Icon name="arrow" className="h-4 w-4 text-navy/40 transition group-hover:translate-x-1 group-hover:text-gold" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className={btnPrimary}>Compare all {services.length} services</Link>
          </div>
        </div>
      </section>

      {/* 3. Direct answer (AEO / GEO: a self-contained definition) */}
      <section aria-labelledby="answer-title" className={`${wrap} py-16`}>
        <div className="mx-auto max-w-4xl border-l-4 border-accent bg-white p-7 shadow-sm sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{c.answer.eyebrow}</p>
          <h2 id="answer-title" className="font-display mt-2 text-2xl text-navy sm:text-3xl">{c.answer.h2}</h2>
          <p id="answer-text" className="mt-4 text-lg leading-8 text-muted"><RichText text={c.answer.text} /></p>
        </div>
      </section>

      {/* 13. Who we help */}
      <section id="industries" aria-labelledby="industries-title" className="bg-navy py-20 text-white">
        <div className={wrap}>
          <Head id="industries-title" eyebrow={c.industries.eyebrow} title={c.industries.h2} lead={c.industries.text} dark />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.industries.items.map((i) => (
              <article key={i.title} className="rounded-lg bg-navy-2 p-5 ring-1 ring-white/10">
                <Icon name={i.icon} className="h-7 w-7 text-accent" />
                <h3 className="mt-3 text-lg font-bold">{i.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/75"><RichText text={i.text} tone="dark" /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Benefits */}
      <section aria-labelledby="benefits-title" className={`${wrap} py-20`}>
        <Head id="benefits-title" eyebrow={c.benefits.eyebrow} title={c.benefits.h2} lead={c.benefits.text} />
        <div className={`mt-10 overflow-x-auto ${card}`}>
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="sr-only">Comparison of arranging transport yourself and using a coordinated transport service</caption>
            <thead className="bg-navy text-white">
              <tr>
                <th scope="col" className="p-4 font-bold">Topic</th>
                <th scope="col" className="p-4 font-bold">Arranging it yourself</th>
                <th scope="col" className="p-4 font-bold text-accent">With Gulf Elite Transport</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {c.benefits.rows.map((r) => (
                <tr key={r.topic}>
                  <th scope="row" className="p-4 font-bold text-navy">{r.topic}</th>
                  <td className="p-4 leading-6 text-muted">{r.alone}</td>
                  <td className="p-4 leading-6 text-navy"><RichText text={r.with} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 14b. Travel guides */}
      <section id="guides" aria-labelledby="guides-title" className="bg-surface py-20">
        <div className={wrap}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="guides-title" className="font-display text-3xl text-navy sm:text-4xl">Taxi travel guides</h2>
              <p className="mt-2 text-lg text-muted">Distances, driving times, border crossings and checklists for travel from Riyadh.</p>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-extrabold text-navy underline decoration-accent decoration-2 underline-offset-4">View all guides <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((g) => (
              <li key={g.slug} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-accent/25 transition hover:shadow-lg">
                <div className="relative flex h-32 items-end bg-gradient-to-br from-navy to-navy-2 p-4">
                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-extrabold text-navy">16 Nov 2026</span>
                  <Icon name="globe" className="absolute right-4 top-4 h-8 w-8 text-accent/60" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-snug text-navy">{g.page.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">{g.page.description}</p>
                  <Link href={g.page.path} className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-navy hover:text-gold">Read guide <Icon name="arrow" className="h-4 w-4" /></Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* 15. FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-white py-20">
        <div className={`${wrap} grid items-start gap-10 lg:grid-cols-[1.4fr_0.8fr]`}>
          <div>
            <Head id="faq-title" eyebrow="FAQ" title="Frequently asked questions" />
            <div className="mt-8">
              <FaqList items={c.faqs} />
            </div>
          </div>
          <aside className="rounded-3xl bg-navy p-7 text-white shadow-xl ring-1 ring-accent/25 lg:sticky lg:top-28">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent"><Icon name="chat" className="h-6 w-6" /></span>
            <h3 className="font-display mt-4 text-2xl">Still have a question?</h3>
            <p className="mt-2 leading-7 text-white/70">Send us your route and your group and we confirm the vehicle, driver and fare before you commit.</p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="#hero-quote" className={btnPrimary}>Book a Ride</Link>
              <Link href="/contact" className={btnGhost}>Contact us</Link>
            </div>
          </aside>
        </div>
      </section>
      {/* 16. Request form and contact details (local SEO: NAP when verified) */}
      <section id="quote" aria-labelledby="quote-title" className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Head id="quote-title" eyebrow={c.formIntro.eyebrow} title={c.formIntro.h2} lead={c.formIntro.text} />
            <address className="mt-8 not-italic">
              <h3 className="font-display text-xl text-navy">{site.legalName}</h3>
              <p className="mt-1 text-sm text-muted">Transport and logistics service, {site.country}</p>
              {contactRows.length > 0 && (
                <dl className="mt-4 space-y-2 text-sm">
                  {contactRows.map((r) => (
                    <div key={r.label} className="flex gap-3">
                      <dt className="w-20 shrink-0 font-bold text-navy">{r.label}</dt>
                      <dd className="text-muted">{r.href ? <a href={r.href} className={textLink}>{r.value}</a> : r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <p className="mt-4 text-sm text-muted">Service area: all regions of Saudi Arabia, confirmed for each request.</p>
            </address>
          </div>
          <div className={`${card} p-6 shadow-sm sm:p-8`}>
            <QuoteForm />
          </div>
        </div>
      </section>

    </main>
  );
}
