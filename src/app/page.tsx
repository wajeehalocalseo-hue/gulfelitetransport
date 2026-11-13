import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import RichText from "@/components/RichText";
import ServiceImage from "@/components/ServiceImage";
import { BookingCard } from "@/components/HeroBooking";
import * as c from "@/content/home";
import { airports, routes } from "@/content/saudi/places";
import { cities } from "@/content/saudi/cities";
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
const btn = "inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-center font-bold transition";
const btnPrimary = `${btn} bg-accent text-navy hover:brightness-95`;
const btnGhost = `${btn} border border-white/30 text-white hover:border-accent hover:text-accent`;
const btnDark = `${btn} bg-navy text-white hover:bg-navy-2`;
const btnOutline = `${btn} border border-navy/25 text-navy hover:border-accent hover:bg-accent/10`;
const chip = "rounded-md border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy transition hover:border-accent hover:bg-accent/15";
const card = "rounded-lg border border-navy/10 bg-white";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-gold";

const cityName = (id: string) => cities.find((x) => x.id === id)?.name ?? id;
const cityPath = (id: string) => {
  const ct = cities.find((x) => x.id === id);
  return ct ? `${BASE}/${ct.region}/${ct.id}` : BASE;
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
  const topCities = cities.slice(0, 8);
  const topRoutes = routes.slice(0, 6);
  const topAirports = airports.slice(0, 4);
  const counts = [
    { n: services.length, label: "transport services" },
    { n: regions.length, label: "regions covered" },
    { n: cities.length, label: "city guides" },
    { n: airports.length, label: "airport guides" },
    { n: routes.length, label: "intercity routes" },
  ];
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
      <section aria-labelledby="hero-title" className="relative overflow-hidden border-b-4 border-accent bg-navy text-white">
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
        <div className={`${wrap} relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24`}>
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {c.hero.eyebrow}
            </p>
            <h1 id="hero-title" className="font-display mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.3rem]">
              {c.hero.h1}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80"><RichText text={c.hero.text} tone="dark" /></p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2" aria-label="What we arrange">
              {c.hero.chips.map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-accent" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#hero-quote" className={btnPrimary}>Request a Ride or Quote</Link>
              <Link href={BASE} className={btnGhost}>Find Your City</Link>
              {telUrl && (
                <a href={telUrl} className={btnGhost}>
                  <Icon name="phone" className="h-4 w-4" /> Call Now
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                  <Icon name="chat" className="h-4 w-4" /> WhatsApp Us
                </a>
              )}
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <Icon name="shield" className="h-4 w-4 text-accent" /> {c.hero.fareChip}
            </p>
          </div>
          <div className="w-full max-w-xl justify-self-end lg:max-w-none">
            <BookingCard service="Taxi & Cab Services" className="w-full" />
            <p className="mt-3 text-center text-sm text-white/80">
              Moving freight, equipment or a fleet?{" "}
              <Link href="/contact" className="font-semibold text-accent underline underline-offset-4">
                Request a quotation
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Coverage ledger (entity facts, taken from the real page data) */}
      <section aria-label="Coverage at a glance" className="border-b border-navy/10 bg-ivory">
        <div className={`${wrap} py-8`}>
          <dl className="grid grid-cols-2 gap-y-6 text-center sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-navy/15">
            {counts.map((s) => (
              <div key={s.label} className="px-4">
                <dd className="font-display text-4xl text-navy">{s.n}</dd>
                <dt className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-center text-xs text-muted">{c.stats.note}</p>
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

      {/* 4. Two paths */}
      <section aria-label="Choose a service type" className={`${wrap} pb-20`}>
        <div className="grid gap-6 md:grid-cols-2">
          {c.paths.map((p) => (
            <article key={p.title} className={`group flex flex-col overflow-hidden ${card} shadow-sm transition hover:shadow-lg`}>
              <div className="relative aspect-[2/1] overflow-hidden bg-navy">
                <ServiceImage slug={p.scene} title={p.title} className="h-full w-full transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col border-t-4 border-accent p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-navy text-accent">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl text-navy">{p.title}</h2>
                    <p className="mt-2 leading-7 text-muted"><RichText text={p.text} /></p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2">
                  {p.points.map((x) => (
                    <li key={x} className="flex gap-2 text-sm font-medium text-navy">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {x}
                    </li>
                  ))}
                </ul>
                <Link href={p.href} className={`${textLink} mt-6 inline-flex items-center gap-2`}>
                  {p.cta} <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Finder */}
      <section aria-labelledby="finder-title" className="bg-white py-20">
        <div className={wrap}>
          <Head id="finder-title" eyebrow={c.finder.eyebrow} title={c.finder.h2} lead={c.finder.text} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.finder.items.map((i) => (
              <li key={i.title}>
                <Link href={i.href} className="group flex h-full flex-col rounded-lg border border-navy/10 bg-ivory p-5 transition hover:border-accent hover:shadow-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-navy text-accent">
                    <Icon name={i.icon} />
                  </span>
                  <span className="mt-4 text-lg font-bold text-navy">{i.title}</span>
                  <span className="mt-1 text-sm leading-6 text-muted">{i.text}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-bold text-navy">
                    Open <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
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

      {/* 7. Vehicles */}
      <section aria-labelledby="fleet-title" className="bg-ivory py-20">
        <div className={wrap}>
          <Head id="fleet-title" eyebrow={c.fleet.eyebrow} title={c.fleet.h2} lead={c.fleet.text} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.fleet.items.map((v) => (
              <li key={v.name} className={`flex flex-col ${card} border-t-4 border-t-accent p-6 shadow-sm`}>
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
      <section aria-labelledby="pricing-title" className={`${wrap} py-20`}>
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

      {/* 10. Process */}
      <section aria-labelledby="process-title" className={`${wrap} py-20`}>
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

      {/* 11. Why */}
      <section aria-labelledby="why-title" className="bg-ivory py-20">
        <div className={wrap}>
          <Head id="why-title" eyebrow={c.why.eyebrow} title={c.why.h2} lead={c.why.text} />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {c.why.items.map((w) => (
              <article key={w.title} className={`${card} p-6`}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-navy text-accent">
                  <Icon name={w.icon} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy">{w.title}</h3>
                <p className="mt-2 leading-7 text-muted"><RichText text={w.text} /></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. About (entity and trust) */}
      <section aria-labelledby="about-title" className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Head id="about-title" eyebrow={c.about.eyebrow} title={c.about.h2} />
          <div className="space-y-5 text-lg leading-8 text-muted">
            {c.about.paragraphs.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              <Link href="/about" className={textLink}>About Gulf Elite Transport Group</Link>
              {" · "}
              <Link href="/contact" className={textLink}>Contact the team</Link>
            </p>
          </div>
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

      {/* 15. FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Head id="faq-title" eyebrow="FAQ" title="Frequently asked questions" center />
          <div className="mt-10">
            <FaqList items={c.faqs} />
          </div>
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
