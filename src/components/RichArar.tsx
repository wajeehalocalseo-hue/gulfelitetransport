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

/* Arar uses the site palette only (navy, navy-2, accent, gold, ivory, surface). Its composition is a two-column editorial layout: a sticky heading rail on the left, content on the right. */
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-gold";

/** A section with a sticky heading rail on the left and its content on the right. */
function Row({ id, bg, no, eyebrow, title, lead, children, dark = false }: { id: string; bg: string; no: string; eyebrow: string; title: ReactNode; lead?: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-ivory" : "text-body"}`}>
      <div className={`${wrap} grid gap-8 py-14 sm:py-[4.5rem] lg:grid-cols-[0.42fr_1fr] lg:gap-14`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`font-display text-5xl leading-none ${dark ? "text-accent" : "text-gold"}`}>{no}</p>
          <p className={`mt-3 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : "text-gold"}`}>{eyebrow}</p>
          <h2 id={`${id}-title`} className="font-display mt-2 text-3xl leading-tight sm:text-[2rem]">{title}</h2>
          {lead && <p className={`mt-4 leading-7 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function km(detail: string): number | null {
  const m = detail.replace(/,/g, "").match(/(\d+)\s*km/i);
  return m ? Number(m[1]) : null;
}

export function RichArarHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const dist = rich.facts.find((x) => x.label === "Approximate road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Approximate driving time")?.value ?? "";
  return (
    <section className="relative overflow-hidden bg-navy-2 text-ivory">
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-accent" />
      <div className={`${wrap} relative pb-12 pt-14 sm:pt-20`}>
        <div className="max-w-2xl">
          <div className="[&_a]:text-ivory [&_li]:text-ivory/80 [&_nav]:text-ivory/80 [&_span]:text-ivory"><Breadcrumbs items={crumbs} /></div>
          <p className="mt-8 inline-flex rounded-md bg-gold px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white">{rich.eyebrow}</p>
          <h1 className="font-display mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
          <p className="mt-6 text-lg leading-8 text-ivory/85">{page.lead}</p>
          {/* Both directions */}
          <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">Outbound</p>
              <p className="mt-1 font-bold">Riyadh <span aria-hidden="true" className="text-accent">→</span> Arar</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 ring-1 ring-white/20">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">Return</p>
              <p className="mt-1 font-bold">Arar <span aria-hidden="true" className="text-accent">→</span> Riyadh</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-extrabold">
            <span className="rounded-md bg-white/10 px-4 py-2 ring-1 ring-white/20">{dist}</span>
            <span className="rounded-md bg-white/10 px-4 py-2 ring-1 ring-white/20">{time}</span>
          </div>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {rich.heroPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ivory/90">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Arar." className={`${btn} bg-accent text-navy hover:brightness-95`}>Get a Free Quote</Cta>
            <Link href="#places" className={`${btn} border border-white/40 text-white hover:bg-white/10`}>Arar and the Region</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RichArarBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Arar.";
  const { terms, eastern, airport, umrah, route, heritage, cities, market, business } = rich;
  const trails = (eastern?.items ?? []).map((d) => ({ ...d, km: km(d.detail) }));
  const maxKm = Math.max(1, ...trails.map((t) => t.km ?? 0));
  return (
    <div>
      {/* Route facts */}
      <section aria-label="Route overview" className="bg-ivory">
        <div className={`${wrap} py-8`}>
          <dl className="grid overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-3">
            {rich.facts.map((x, i) => (
              <div key={x.label} className={`px-5 py-4 ${i % 3 ? "lg:border-l lg:border-navy/10" : ""} ${i > 0 ? "border-t border-navy/10 lg:border-t-0" : ""} ${i > 2 ? "lg:border-t" : ""}`}>
                <dt className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{x.label}</dt>
                <dd className="mt-0.5 font-bold text-navy">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-muted">{rich.factsNote}</p>
        </div>
      </section>

      {/* 01 Introduction */}
      <Row id="about" bg="bg-ivory" no="01" eyebrow="About this route" title={rich.introHeading}>
        <p className="rounded-lg border-l-4 border-gold bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
        <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
          {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
          <ImageSlot folder={f} slot="northern-road" alt="The open desert road from Riyadh towards Arar in the north" label="Northern road image" width={900} height={420} />
        </div>
      </Row>

      {/* 02 Arar and the region */}
      {terms && (
        <Row id="places" bg="bg-surface" no="02" eyebrow="City and region" title={terms.heading} lead={terms.intro}>
          <dl className="divide-y divide-navy/10 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10">
            {terms.items.map((t) => (
              <div key={t.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-extrabold text-navy">{t.title}</dt>
                <dd className="leading-7 text-muted">{t.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm font-semibold">{terms.note}</p>
        </Row>
      )}

      {/* 03 Why */}
      <Row id="why" bg="bg-ivory" no="03" eyebrow="Why a private taxi" title={rich.whyHeading}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-accent"><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Row>

      {/* 04 Route */}
      <Row id="route" bg="bg-white" no="04" eyebrow="The road north" title={route?.heading ?? rich.planHeading} lead={route?.intro}>
        {route && (
          <ol className="relative space-y-5 border-l-2 border-gold/50 pl-7">
            {route.stops.map((s) => (
              <li key={s.name} className="relative">
                <span aria-hidden="true" className="absolute -left-[2.15rem] top-1.5 h-3.5 w-3.5 rotate-45 bg-gold ring-4 ring-white" />
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{s.detail}</p>
                <h3 className="text-lg font-extrabold text-navy">{s.name}</h3>
                <p className="text-sm leading-6 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        )}
        {route && <p className="mt-4 text-sm leading-7 text-muted">{route.note}</p>}
        <figure className="mt-6 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy/10">
          <LazyMap title="Route map from Riyadh to Arar"
            src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
            className="aspect-[16/10] w-full" />
          <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Arar. The driver chooses the best road on the day.</figcaption>
        </figure>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {rich.plan.map((p) => (
            <li key={p.title} className="rounded-xl bg-ivory p-5 ring-1 ring-navy/10">
              <h3 className="font-extrabold text-navy">{p.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Row>

      {/* 05 City places */}
      {heritage && (
        <Row id="destinations" bg="bg-surface" no="05" eyebrow="In Arar city" title={heritage.heading} lead={heritage.intro}>
          <div className="grid gap-4 sm:grid-cols-2">
            {heritage.items.map((h) => (
              <article key={h.name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{h.detail}</p>
                <h3 className="mt-1 text-lg font-extrabold text-navy">{h.name}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{h.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-navy/10">
            <ImageSlot folder={f} slot={heritage.slot} alt={heritage.alt} label="Old Emirate Palace image" width={900} height={380} />
          </div>
          <p className="mt-4 text-sm leading-7 text-muted">{heritage.note}</p>
        </Row>
      )}

      {/* 06 Role in the north */}
      {market && (
        <Row id="north" bg="bg-ivory" no="06" eyebrow="Local background" title={market.heading} lead={market.intro}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {market.items.map((m) => (
              <li key={m.title} className="rounded-xl border-t-4 border-gold bg-white p-5 shadow-sm">
                <h3 className="font-extrabold text-navy">{m.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-muted">{market.note}</p>
        </Row>
      )}

      {/* 07 Regional trips with distance bars */}
      {eastern && (
        <Row id="region" bg="bg-navy" no="07" eyebrow="Beyond the city" title={eastern.heading} lead={eastern.intro} dark>
          <ul className="space-y-3">
            {trails.map((d) => (
              <li key={d.name} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/15">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-extrabold">{d.name}</h3>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{d.detail}</p>
                </div>
                {d.km !== null && (
                  <div aria-hidden="true" className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(6, Math.round((d.km / maxKm) * 100))}%` }} />
                  </div>
                )}
                <p className="mt-2 text-sm leading-7 text-ivory/75">{d.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-ivory/75">{eastern.note}</p>
        </Row>
      )}

      {/* 08 Border and controlled access */}
      {business && (
        <Row id="access" bg="bg-navy-2" no="08" eyebrow="Please read" title={business.heading} lead={business.intro} dark>
          <div role="note" className="rounded-2xl border-2 border-accent bg-accent/10 p-5">
            <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-accent"><Icon name="check" className="h-4 w-4" /> Please note</p>
            <p className="mt-2 leading-7 text-ivory">{business.note}</p>
          </div>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2">
            {business.items.map((b, i) => (
              <li key={b.title} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <span className="font-display text-2xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-extrabold text-ivory">{b.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ivory/75">{b.text}</p>
              </li>
            ))}
          </ol>
          <Cta message={quote} className={`${btn} mt-5 bg-accent text-navy hover:brightness-95`}>Request a Quote</Cta>
        </Row>
      )}

      {/* 09 Airport */}
      {airport && (
        <Row id="airport" bg="bg-ivory" no="09" eyebrow="Airport transfers" title={airport.heading} lead={airport.intro}>
          <ul className="space-y-4">
            {airport.items.map((a) => (
              <li key={a.title} className="border-l-2 border-gold pl-4">
                <h3 className="font-extrabold text-navy">{a.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{airport.note}</p>
          <Link href={airport.href} className={`${link} mt-4`}>Arar taxi service <Icon name="arrow" className="h-4 w-4" /></Link>
          <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-navy/10">
            <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Arar Airport image" width={900} height={340} />
          </div>
        </Row>
      )}

      {/* 10 Vehicles */}
      <Row id="vehicles" bg="bg-surface" no="10" eyebrow="Vehicles" title={rich.vehiclesHeading} lead={rich.vehiclesIntro}>
        <ul className="grid gap-5 sm:grid-cols-2">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 30vw, 100vw" />
              <div className="flex flex-1 flex-col border-t-4 border-accent p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Arar.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Row>

      {/* 11 Planning */}
      <Row id="plan" bg="bg-white" no="11" eyebrow="Journey planning" title="Families, Drop-off and Pickup">
        <div className="grid gap-8 md:grid-cols-2">
          {umrah && (
            <div>
              <h3 className="font-display text-xl text-navy">{umrah.heading}</h3>
              <p className="mt-2 text-sm text-muted">{umrah.intro}</p>
              <ul className="mt-3 space-y-2">
                {umrah.items.map((u) => (
                  <li key={u.title} className="text-sm leading-7 text-muted"><strong className="text-navy">{u.title}.</strong> {u.text}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm leading-7 text-muted">{umrah.note}</p>
            </div>
          )}
          <div>
            <h3 className="font-display text-xl text-navy">{rich.dropHeading}</h3>
            <p className="mt-2 text-sm text-muted">{rich.dropIntro}</p>
            <ul className="mt-3 space-y-2">
              {rich.drops.map((d) => (
                <li key={d.name} className="text-sm leading-7 text-muted"><strong className="text-navy">{d.name}.</strong> {d.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-navy">{rich.pickupHeading}</h3>
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
          {cities && (
            <div>
              <h3 className="font-display text-xl text-navy">{cities.heading}</h3>
              <p className="mt-2 text-sm text-muted">{cities.intro}</p>
              <ul className="mt-3 space-y-2">
                {cities.items.map((c) => (
                  <li key={c.name} className="text-sm leading-7 text-muted">
                    <strong>{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : <span className="text-navy">{c.name}</span>}</strong> <span className="text-gold">({c.detail}).</span> {c.text}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm leading-7 text-muted">{cities.note}</p>
            </div>
          )}
        </div>
      </Row>

      {/* 12 Who */}
      <Row id="who" bg="bg-surface" no="12" eyebrow="Who travels" title={rich.whoHeading}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Row>

      {/* 13 Steps */}
      <Row id="how" bg="bg-white" no="13" eyebrow="Booking" title={rich.stepsHeading}>
        <ol className="space-y-3">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-xl bg-surface p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-extrabold text-accent">{i + 1}</span>
              <div>
                <h3 className="font-extrabold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <Cta message={quote} className={`${btn} mt-6 bg-navy text-white hover:brightness-125`}>Start Your Request</Cta>
      </Row>

      {/* 14 FAQ */}
      <Row id="faq" bg="bg-ivory" no="14" eyebrow="Questions" title={rich.faqHeading}>
        <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        <Cta message={quote} className={`${link} mt-5`}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
      </Row>

      {/* Related */}
      <section id="related" aria-labelledby="related-title" className="bg-white">
        <div className={`${wrap} py-14`}>
          <h2 id="related-title" className="font-display text-2xl text-navy">{rich.relatedHeading}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </section>

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
