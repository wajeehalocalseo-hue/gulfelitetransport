import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import QuoteForm from "@/components/QuoteForm";
import ServiceImage from "@/components/ServiceImage";
import { HeroPanorama } from "@/components/ServiceScene";
import * as c from "@/content/home";
import { airports, routes } from "@/content/saudi/places";
import { cities } from "@/content/saudi/cities";
import { regions } from "@/content/saudi/regions";
import { BASE } from "@/content/saudi/build";
import { groups, services } from "@/content/services";
import { pageGraph } from "@/lib/schema";
import { site, telUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const eyebrow = "text-sm font-bold uppercase tracking-[0.18em] text-accent";
const h2 = "mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl";
const lead = "mt-4 max-w-3xl text-lg leading-8 text-muted";
const wrap = "mx-auto max-w-7xl px-5";
const btn = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center font-bold transition";
const btnPrimary = `${btn} bg-accent text-navy hover:brightness-95`;
const btnGhost = `${btn} border border-white/30 text-white hover:border-accent hover:text-accent`;
const chip = "rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy transition hover:border-accent hover:bg-accent/15";

const cityName = (id: string) => cities.find((x) => x.id === id)?.name ?? id;
const cityPath = (id: string) => {
  const ct = cities.find((x) => x.id === id);
  return ct ? `${BASE}/${ct.region}/${ct.id}` : BASE;
};

export default function Home() {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a ride or a transport quote.`);
  const topCities = cities.slice(0, 8);
  const topRoutes = routes.slice(0, 6);
  const topAirports = airports.slice(0, 4);
  const counts = [
    { n: services.length, label: "transport services", sub: "each with its own guide" },
    { n: regions.length, label: "regions", sub: "of Saudi Arabia" },
    { n: cities.length, label: "city guides", sub: "with real places" },
    { n: airports.length, label: "airport guides", sub: "for transfers" },
    { n: routes.length, label: "intercity routes", sub: "with road distances" },
  ];

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: "/",
          name: "Gulf Elite Transport | Taxi, Freight & Passenger Transport in Saudi Arabia",
          description:
            "Taxi and cab rides by Saudi city and route, plus freight, cargo, passenger transport, equipment moving and contract fleet services.",
        })}
      />

      {/* 1. Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className={`${wrap} relative grid items-center gap-12 pb-28 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-32 lg:pt-20`}>
          <div>
            <p className={eyebrow}>{c.hero.eyebrow}</p>
            <h1 id="hero-title" className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              {c.hero.h1}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">{c.hero.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="What we arrange">
              {c.hero.chips.map((x) => (
                <li key={x} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white/90 ring-1 ring-white/15">
                  {x}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#quote" className={btnPrimary}>
                Request a Ride or Quote
              </Link>
              <Link href={BASE} className={btnGhost}>
                Find Your City
              </Link>
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
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-2xl">
              <HeroPanorama className="block aspect-[10/7] h-full w-full" />
            </div>
            <p className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow-lg">
              <Icon name="network" className="h-4 w-4 text-accent" /> {c.hero.routeChip}
            </p>
            <p className="absolute -top-4 right-4 flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-navy shadow-lg">
              <Icon name="check" className="h-4 w-4" /> {c.hero.fareChip}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Two paths (overlaps the hero) */}
      <section aria-label="Choose a service type" className={`${wrap} relative z-10 -mt-16`}>
        <div className="grid gap-5 md:grid-cols-2">
          {c.paths.map((p) => (
            <article key={p.title} className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-xl transition hover:-translate-y-1">
              <div className="relative aspect-[2/1] overflow-hidden bg-navy">
                <ServiceImage slug={p.scene} title={p.title} className="h-full w-full transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-1 flex-col p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-accent">
                  <Icon name={p.icon} className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-2xl font-extrabold text-navy">{p.title}</h2>
                  <p className="mt-2 leading-7 text-muted">{p.text}</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-1">
                {p.points.map((x) => (
                  <li key={x} className="flex gap-2 text-sm font-medium text-navy">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
                  </li>
                ))}
              </ul>
              <Link href={p.href} className="mt-6 inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4">
                {p.cta} <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Direct answer (AEO) */}
      <section aria-labelledby="answer-title" className={`${wrap} py-16`}>
        <div className="mx-auto max-w-4xl rounded-3xl border-l-4 border-accent bg-white p-7 shadow-sm sm:p-9">
          <p className={eyebrow}>{c.answer.eyebrow}</p>
          <h2 id="answer-title" className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">
            {c.answer.h2}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted">{c.answer.text}</p>
        </div>
      </section>

      {/* 4. Finder */}
      <section aria-labelledby="finder-title" className="bg-white py-20">
        <div className={wrap}>
          <p className={eyebrow}>{c.finder.eyebrow}</p>
          <h2 id="finder-title" className={h2}>{c.finder.h2}</h2>
          <p className={lead}>{c.finder.text}</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.finder.items.map((i) => (
              <li key={i.title}>
                <Link href={i.href} className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-surface p-5 transition hover:-translate-y-0.5 hover:border-accent hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent">
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

      {/* 5. Taxi coverage */}
      <section id="coverage" aria-labelledby="taxi-title" className={`${wrap} py-20`}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl ring-1 ring-navy/10 shadow-xl">
            <ServiceImage slug="taxi-cab-services" title="Taxi and cab rides in Saudi Arabia" className="h-full w-full" />
          </div>
          <div>
            <p className={eyebrow}>{c.taxi.eyebrow}</p>
            <h2 id="taxi-title" className={h2}>{c.taxi.h2}</h2>
            <p className={lead}>{c.taxi.text}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={BASE} className={`${btn} bg-navy text-white hover:bg-navy-2`}>Browse all of Saudi Arabia</Link>
              <Link href={`${BASE}/routes`} className={`${btn} border border-navy/25 text-navy hover:border-accent hover:bg-accent/10`}>Intercity routes</Link>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-navy">{c.taxi.regionsHeading}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {regions.map((r) => (
                <li key={r.id}>
                  <Link href={`${BASE}/${r.id}`} className={chip}>{r.name}</Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xl font-extrabold text-navy">{c.taxi.citiesHeading}</h3>
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
              <h3 className="text-xl font-extrabold text-navy">{c.taxi.routesHeading}</h3>
              <ul className="mt-4 space-y-2">
                {topRoutes.map((r) => (
                  <li key={r.id}>
                    <Link href={`${BASE}/routes/${r.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-accent">
                      <span>{cityName(r.from)} to {cityName(r.to)}</span>
                      <span className="text-xs font-medium text-muted">~{r.km} km</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-navy">{c.taxi.airportsHeading}</h3>
              <ul className="mt-4 space-y-2">
                {topAirports.map((a) => (
                  <li key={a.id}>
                    <Link href={`${BASE}/airports/${a.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-accent">
                      <span>{a.name}</span>
                      <span className="rounded-md bg-navy px-2 py-0.5 text-xs font-bold text-accent">{a.code}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 rounded-xl border border-accent/50 bg-accent/10 p-5 text-sm font-semibold leading-6 text-navy">{c.taxi.note}</p>
      </section>

      {/* 6. Numbers */}
      <section aria-labelledby="stats-title" className="bg-navy py-16 text-white">
        <div className={wrap}>
          <p className={eyebrow}>{c.stats.eyebrow}</p>
          <h2 id="stats-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{c.stats.h2}</h2>
          <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
            {counts.map((s) => (
              <div key={s.label} className="rounded-2xl bg-navy-2 p-5 ring-1 ring-white/10">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-4xl font-extrabold text-accent">{s.n}</span>
                  <span className="mt-1 block font-bold">{s.label}</span>
                  <span className="block text-xs text-white/65">{s.sub}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-white/60">{c.stats.note}</p>
        </div>
      </section>

      {/* 7. Services by group */}
      <section aria-labelledby="services-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.servicesIntro.eyebrow}</p>
        <h2 id="services-title" className={h2}>{c.servicesIntro.h2}</h2>
        <p className={lead}>{c.servicesIntro.text}</p>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
          {groups.map((g) => {
            const list = services.filter((s) => s.group === g.id);
            return (
              <article key={g.id} className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="text-2xl font-extrabold text-navy">{g.label}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{g.text.split(". ")[0]}.</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {list.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-xl bg-surface p-3 ring-1 ring-navy/10 transition hover:ring-accent">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-accent">
                          <Icon name={s.icon} className="h-5 w-5" />
                        </span>
                        <span className="flex-1 text-sm font-bold leading-snug text-navy">{s.title}</span>
                        <Icon name="arrow" className="h-4 w-4 text-navy/40 transition group-hover:translate-x-1 group-hover:text-accent" />
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
      </section>

      {/* 8. Process */}
      <section aria-labelledby="process-title" className="bg-white py-20">
        <div className={wrap}>
          <p className={eyebrow}>{c.process.eyebrow}</p>
          <h2 id="process-title" className={h2}>{c.process.h2}</h2>
          <p className={lead}>{c.process.text}</p>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {c.process.steps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-navy/10 bg-surface p-6">
                {i < c.process.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-4 top-12 hidden h-0.5 w-8 bg-accent lg:block" />
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-extrabold text-navy">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 9. Why */}
      <section aria-labelledby="why-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.why.eyebrow}</p>
        <h2 id="why-title" className={h2}>{c.why.h2}</h2>
        <p className={lead}>{c.why.text}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.why.items.map((w) => (
            <article key={w.title} className="rounded-2xl border border-navy/10 bg-white p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-accent">
                <Icon name={w.icon} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-navy">{w.title}</h3>
              <p className="mt-2 leading-7 text-muted">{w.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 10. Who we help */}
      <section id="industries" aria-labelledby="industries-title" className="bg-navy py-20 text-white">
        <div className={wrap}>
          <p className={eyebrow}>{c.industries.eyebrow}</p>
          <h2 id="industries-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{c.industries.h2}</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">{c.industries.text}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.industries.items.map((i) => (
              <article key={i.title} className="rounded-2xl bg-navy-2 p-5 ring-1 ring-white/10">
                <Icon name={i.icon} className="h-7 w-7 text-accent" />
                <h3 className="mt-3 text-lg font-bold">{i.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/75">{i.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Benefits */}
      <section aria-labelledby="benefits-title" className={`${wrap} py-20`}>
        <p className={eyebrow}>{c.benefits.eyebrow}</p>
        <h2 id="benefits-title" className={h2}>{c.benefits.h2}</h2>
        <p className={lead}>{c.benefits.text}</p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
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
                  <td className="p-4 leading-6 text-navy">{r.with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12. FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-5">
          <p className={eyebrow}>FAQ</p>
          <h2 id="faq-title" className={h2}>Frequently asked questions</h2>
          <div className="mt-10">
            <FaqList items={c.faqs} />
          </div>
        </div>
      </section>

      {/* 13. CTA band */}
      <section aria-labelledby="cta-title" className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 id="cta-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">{c.ctaBand.h2}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">{c.ctaBand.text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#quote" className={btnPrimary}>Request a Ride or Quote</Link>
            {telUrl && <a href={telUrl} className={btnGhost}>Call Now</a>}
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={btnGhost}>WhatsApp Us</a>
            )}
          </div>
        </div>
      </section>

      {/* 14. Request form */}
      <section id="quote" aria-labelledby="quote-title" className={`${wrap} py-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className={eyebrow}>{c.formIntro.eyebrow}</p>
            <h2 id="quote-title" className={h2}>{c.formIntro.h2}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{c.formIntro.text}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
