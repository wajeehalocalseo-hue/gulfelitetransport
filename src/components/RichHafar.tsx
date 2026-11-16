import Link from "next/link";
import LazyMap from "./LazyMap";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Hafar Al Batin uses the site palette only (navy, navy-2, accent, gold, ivory, surface). Its identity is a straight desert-corridor line in the hero and a three-way destination chooser. */
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-gold";

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-ivory" : "text-body"}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : "text-gold"}`}>
        <span aria-hidden="true" className="flex items-center gap-1"><span className="h-[3px] w-3 bg-current" /><span className="h-[3px] w-3 bg-current opacity-60" /><span className="h-[3px] w-3 bg-current opacity-30" /></span>
        {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

function km(detail: string): number | null {
  const m = detail.replace(/,/g, "").match(/(\d+)\s*km/i);
  return m ? Number(m[1]) : null;
}

export function RichHafarHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const dist = rich.facts.find((x) => x.label === "Approximate road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Approximate driving time")?.value ?? "";
  return (
    <section className="relative overflow-hidden bg-surface text-navy">
      <div className={`${wrap} relative pb-12 pt-14 sm:pt-20`}>
        <div className="max-w-2xl">
          <div className="[&_a]:text-navy [&_li]:text-navy/80 [&_nav]:text-navy/80 [&_span]:text-navy"><Breadcrumbs items={crumbs} /></div>
          <p className="mt-8 inline-flex rounded-md bg-navy px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">{rich.eyebrow}</p>
          <h1 className="font-display mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
          <p className="mt-6 text-lg leading-8 text-navy/85">{page.lead}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {rich.heroPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-navy/90">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Hafar Al Batin." className={`${btn} bg-navy text-white hover:brightness-125`}>Get a Free Quote</Cta>
            <Link href="#choose" className={`${btn} border border-navy/40 text-navy hover:bg-white`}>City, Al-Qaisumah or Airport</Link>
          </div>
        </div>
        {/* Corridor line: Riyadh to Hafar Al Batin */}
        <div className="mt-10 max-w-3xl rounded-xl bg-white/80 p-5 ring-1 ring-navy/15">
          <div className="flex items-center gap-3">
            <span className="text-sm font-extrabold">Riyadh</span>
            <span aria-hidden="true" className="relative h-0.5 flex-1 border-t-2 border-dashed border-gold" />
            <span className="text-sm font-extrabold">Hafar Al Batin</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-extrabold">
            <span className="rounded-md bg-navy px-3 py-1.5 text-accent">{dist}</span>
            <span className="rounded-md bg-navy px-3 py-1.5 text-accent">{time}</span>
            <span className="rounded-md bg-surface px-3 py-1.5 ring-1 ring-navy/15">Both directions</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RichHafarBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Hafar Al Batin.";
  const { terms, eastern, airport, umrah, route, heritage, cities, causeway } = rich;
  const places = (eastern?.items ?? []).map((d) => ({ ...d, km: km(d.detail) }));
  return (
    <div>
      {/* Route facts */}
      <section aria-label="Route overview" className="bg-navy text-ivory">
        <div className={`${wrap} pb-8 pt-2`}>
          <dl className="grid overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {rich.facts.map((x, i) => (
              <div key={x.label} className={`px-5 py-4 ${i % 3 ? "lg:border-l lg:border-white/15" : ""} ${i > 0 ? "border-t border-white/15 lg:border-t-0" : ""} ${i > 2 ? "lg:border-t" : ""}`}>
                <dt className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{x.label}</dt>
                <dd className="mt-0.5 font-bold">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-ivory/70">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg="bg-ivory">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className="rounded-lg border-l-4 border-gold bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-navy/10">
            <ImageSlot folder={f} slot="desert-road" alt="The long desert highway from Riyadh to Hafar Al Batin" label="Desert road image" width={700} height={820} />
          </div>
        </div>
      </Block>

      {/* Destination chooser */}
      {terms && (
        <Block id="choose" bg="bg-surface">
          <Head id="choose" eyebrow="Which destination?" lead={terms.intro}>{terms.heading}</Head>
          <ol className="grid gap-5 lg:grid-cols-3">
            {terms.items.map((t, i) => (
              <li key={t.title} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-extrabold text-accent">{i + 1}</span>
                <h3 className="mt-3 text-xl font-extrabold text-navy">{t.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">{t.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-sm font-semibold">{terms.note}</p>
          {cities && (
            <div className="mt-8 overflow-x-auto rounded-xl ring-1 ring-navy/15">
              <table className="w-full min-w-[32rem] text-left">
                <caption className="bg-navy px-5 py-3 text-left text-xs font-extrabold uppercase tracking-wider text-accent">{cities.heading}</caption>
                <thead className="bg-navy-2 text-xs uppercase tracking-wider text-accent">
                  <tr><th scope="col" className="px-5 py-2">Destination</th><th scope="col" className="px-5 py-2">Distance and driving time</th><th scope="col" className="px-5 py-2">Note</th></tr>
                </thead>
                <tbody className="divide-y divide-navy/10 bg-white">
                  {cities.items.map((c) => (
                    <tr key={c.name} className="align-top">
                      <th scope="row" className="px-5 py-3 font-extrabold text-navy">{c.name}</th>
                      <td className="px-5 py-3 text-sm font-bold text-gold">{c.detail}</td>
                      <td className="px-5 py-3 text-sm leading-7 text-muted">{c.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="bg-white px-5 pb-4 text-xs leading-5 text-muted">{cities.note}</p>
            </div>
          )}
        </Block>
      )}

      {/* Why */}
      <Block id="why" bg="bg-ivory">
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className="border-t-2 border-gold pt-4">
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Route and map */}
      <Block id="route" bg="bg-white">
        <Head id="route" eyebrow="The road north" lead={route?.intro}>{route?.heading ?? rich.planHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            {route && (
              <ol className="relative space-y-5 border-l-2 border-dashed border-gold/60 pl-7">
                {route.stops.map((s) => (
                  <li key={s.name} className="relative">
                    <span aria-hidden="true" className="absolute -left-[2.2rem] top-1.5 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-white" />
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{s.detail}</p>
                    <h3 className="text-lg font-extrabold text-navy">{s.name}</h3>
                    <p className="text-sm leading-6 text-muted">{s.text}</p>
                  </li>
                ))}
              </ol>
            )}
            {route && <p className="mt-5 text-sm leading-7 text-muted">{route.note}</p>}
          </div>
          <figure className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy/10">
            <LazyMap title="Route map from Riyadh to Hafar Al Batin"
              src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
              className="aspect-[4/3] w-full" />
            <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Hafar Al Batin. The driver chooses the best road on the day.</figcaption>
          </figure>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {rich.plan.map((p) => (
            <li key={p.title} className="rounded-xl bg-ivory p-5 ring-1 ring-navy/10">
              <h3 className="font-extrabold text-navy">{p.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* City places */}
      {heritage && (
        <Block id="destinations" bg="bg-surface">
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="destinations" eyebrow="In Hafar Al Batin city" lead={heritage.intro}>{heritage.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {heritage.items.map((h) => (
                  <li key={h.name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{h.detail}</p>
                    <h3 className="mt-1 text-lg font-extrabold text-navy">{h.name}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{h.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-muted">{heritage.note}</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={heritage.slot} alt={heritage.alt} label="Hafar Al Batin city image" width={560} height={680} />
            </div>
          </div>
        </Block>
      )}

      {/* Governorate */}
      {eastern && (
        <Block id="governorate" bg="bg-ivory">
          <Head id="governorate" eyebrow="The governorate" lead={eastern.intro}>{eastern.heading}</Head>
          <ol className="divide-y divide-navy/10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10">
            {places.map((d) => (
              <li key={d.name} className="grid items-center gap-2 px-5 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                <p className="font-display text-3xl leading-none text-gold">{d.km ?? "·"}<span className="ml-1 text-sm font-extrabold text-navy">km</span></p>
                <div>
                  <h3 className="font-extrabold text-navy">{d.name}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{eastern.note}</p>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg="bg-surface">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
              <ul className="space-y-4">
                {airport.items.map((a) => (
                  <li key={a.title} className="border-l-2 border-gold pl-4">
                    <h3 className="font-extrabold text-navy">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{airport.note}</p>
              <Link href={airport.href} className={`${link} mt-4`}>Hafar Al Batin taxi service <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Al-Qaisumah Airport image" width={640} height={600} />
            </div>
          </div>
        </Block>
      )}

      {/* Kuwait and the border */}
      {causeway && (
        <Block id="border" bg="bg-navy-2" dark>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Head id="border" eyebrow="Please read" dark lead={causeway.intro}>{causeway.heading}</Head>
              <div role="note" className="rounded-2xl border-2 border-accent bg-accent/10 p-5">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-accent"><Icon name="check" className="h-4 w-4" /> Please note</p>
                <p className="mt-2 leading-7 text-ivory">{causeway.note}</p>
              </div>
              <ul className="mt-5 space-y-2">
                {causeway.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">{l.name} <Icon name="arrow" className="h-4 w-4" /></Link></li>
                ))}
              </ul>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {causeway.items.map((b, i) => (
                <li key={b.title} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="font-display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-extrabold text-ivory">{b.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ivory/75">{b.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg="bg-ivory">
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="flex flex-1 flex-col border-t-4 border-accent p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Hafar Al Batin.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Families, drop-off and pickup */}
      <Block id="plan" bg="bg-white">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          {umrah && (
            <div>
              <h2 id="plan-title" className="font-display text-2xl text-navy">{umrah.heading}</h2>
              <p className="mt-2 text-sm text-muted">{umrah.intro}</p>
              <ul className="mt-3 space-y-2">
                {umrah.items.map((u) => (
                  <li key={u.title} className="text-sm leading-7 text-muted"><strong className="text-navy">{u.title}.</strong> {u.text}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-muted">{umrah.note}</p>
            </div>
          )}
          <div>
            <h3 className="font-display text-2xl text-navy">{rich.dropHeading}</h3>
            <p className="mt-2 text-sm text-muted">{rich.dropIntro}</p>
            <ul className="mt-3 space-y-2">
              {rich.drops.map((d) => (
                <li key={d.name} className="text-sm leading-7 text-muted"><strong className="text-navy">{d.name}.</strong> {d.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl text-navy">{rich.pickupHeading}</h3>
            <p className="mt-2 text-sm text-muted">{rich.pickupIntro}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm font-bold text-navy ring-1 ring-navy/10 hover:bg-surface">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm font-bold text-navy ring-1 ring-navy/10">{x.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      {/* Who */}
      <Block id="who" bg="bg-surface">
        <Head id="who" eyebrow="Who travels" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg="bg-white">
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="rounded-xl bg-surface p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-extrabold text-accent">{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} bg-navy text-white hover:brightness-125`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* FAQ */}
      <Block id="faq" bg="bg-ivory">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28">
            <Head id="faq" eyebrow="Questions">{rich.faqHeading}</Head>
            <Cta message={quote} className={link}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
          </div>
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Block>

      {/* Related */}
      <Block id="related" bg="bg-white">
        <Head id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-xl border border-navy/10 bg-ivory p-5 transition hover:border-gold hover:shadow-md">
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className="mt-4 h-5 w-5 text-gold transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
      </Block>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className="bg-navy text-ivory">
        <div className={`${wrap} flex flex-col items-center gap-5 py-14 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-ivory/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-accent text-navy hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
