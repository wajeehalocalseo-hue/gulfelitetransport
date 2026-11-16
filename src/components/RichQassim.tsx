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

/* Site palette: green (navy, navy-2), gold (accent, gold), ivory and surface, as on the rest of the website. */
const OLIVE = "bg-navy";
const SAND = "bg-ivory";
const SAND_DEEP = "bg-surface";
const BRONZE_TEXT = "text-gold";
const BROWN_TEXT = "text-body";
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold";

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-ivory" : "text-navy"}`}>
      <div className={`${wrap} py-16 sm:py-20`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-block border-b-2 border-gold pb-1 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : BRONZE_TEXT}`}>{eyebrow}</p>
      <h2 id={`${id}-title`} className="font-display mt-4 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function RichQassimHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${OLIVE} text-ivory`}>
      {/* diagonal weave detail */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #d4af6a 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, #d4af6a 0 1px, transparent 1px 22px)" }} />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-gold/20 to-transparent lg:block" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-10 bg-accent" /> {rich.eyebrow}
        </div>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.3rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ivory/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Buraydah." className={`${btn} bg-accent text-navy hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#destinations" className={`${btn} border border-ivory/40 text-ivory hover:border-accent hover:text-accent`}>Where in Buraydah?</Link>
        </div>
      </div>
    </section>
  );
}

export function RichQassimBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Buraydah.";
  const { market, business, airport, railway, route, cities } = rich;
  return (
    <div>
      {/* Route ledger */}
      <section aria-label="Route overview" className={SAND}>
        <div className={`${wrap} py-10`}>
          <div className="overflow-hidden rounded-2xl border border-gold/50 bg-white shadow-md">
            <div className={`${OLIVE} px-6 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-accent`}>Route overview</div>
            <dl className="grid divide-y divide-surface sm:grid-cols-2 sm:divide-y-0">
              {rich.facts.map((x, i) => (
                <div key={x.label} className={`flex items-baseline justify-between gap-4 px-6 py-3.5 ${i >= 2 ? "sm:border-t sm:border-surface" : ""} ${i % 2 === 0 ? "sm:border-r sm:border-surface" : ""}`}>
                  <dt className="text-xs font-extrabold uppercase tracking-wider text-gold">{x.label}</dt>
                  <dd className="text-right font-bold text-navy">{x.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 text-xs leading-5 text-muted">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg="bg-white">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className={`border-l-4 border-gold ${SAND} p-5 text-lg font-medium leading-8 ${BROWN_TEXT}`}>{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl border-2 border-gold/60" />
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <ImageSlot folder={f} slot="landscape" alt={rich.highwayAlt} label="Qassim landscape image" width={800} height={900} />
            </div>
          </div>
        </div>
      </Block>

      {/* Why */}
      <Block id="why" bg={SAND}>
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w, i) => (
            <li key={w.title} className="flex gap-4">
              <span className={`font-display text-5xl leading-none ${BRONZE_TEXT}`}>{i + 1}</span>
              <div>
                <h3 className="text-lg font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Destination guide */}
      <Block id="destinations" bg="bg-white">
        <Head id="destinations" eyebrow="Arriving in Buraydah" lead={rich.dropIntro}>{rich.dropHeading}</Head>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <ol className="divide-y divide-surface rounded-2xl border border-surface">
            {rich.drops.map((d, i) => (
              <li key={d.name} className="grid gap-2 p-5 sm:grid-cols-[3rem_14rem_1fr] sm:items-baseline sm:gap-5">
                <span className={`font-display text-2xl ${BRONZE_TEXT}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-extrabold text-navy">{d.href ? <Link href={d.href} className={link}>{d.name}</Link> : d.name}</h3>
                <p className="leading-7 text-muted">{d.text}</p>
              </li>
            ))}
          </ol>
          <div className="space-y-5">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <ImageSlot folder={f} slot="buraydah" alt={rich.dropAlt} label="Buraydah city context image" width={700} height={520} />
            </div>
            {rich.dropNote && <p role="note" className={`rounded-2xl ${SAND_DEEP} p-5 text-sm font-semibold leading-7 ${BROWN_TEXT}`}>{rich.dropNote}</p>}
          </div>
        </div>
      </Block>

      {/* Dates market and seasons */}
      {market && (
        <Block id="market" bg={SAND_DEEP}>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Head id="market" eyebrow="Qassim and its dates" lead={market.intro}>{market.heading}</Head>
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <ImageSlot folder={f} slot="dates-market" alt="Buraydah Dates Market, a common destination for visitors from Riyadh" label="Buraydah Dates Market image" width={700} height={520} />
              </div>
            </div>
            <div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {market.items.map((m) => (
                  <li key={m.title} className="rounded-2xl bg-white p-5 shadow-sm">
                    <h3 className={`font-extrabold ${BROWN_TEXT}`}>{m.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{m.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-muted">{market.note}</p>
            </div>
          </div>
        </Block>
      )}

      {/* Business travel: a plain two-column table */}
      {business && (
        <Block id="business" bg="bg-white">
          <Head id="business" eyebrow="For work trips" lead={business.intro}>{business.heading}</Head>
          <div className="overflow-hidden rounded-2xl border border-surface">
            <table className="w-full text-left">
              <thead className={`${OLIVE} text-xs uppercase tracking-wider text-accent`}>
                <tr><th scope="col" className="px-5 py-3">Trip</th><th scope="col" className="px-5 py-3">How we plan it</th></tr>
              </thead>
              <tbody className="divide-y divide-surface">
                {business.items.map((b) => (
                  <tr key={b.title} className="align-top">
                    <th scope="row" className="w-1/3 px-5 py-4 font-extrabold text-navy">{b.title}</th>
                    <td className="px-5 py-4 leading-7 text-muted">{b.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-muted">{business.note}</p>
          <Cta message={quote} className={`${btn} mt-5 ${OLIVE} text-ivory hover:brightness-110`}>Request a Business Quote</Cta>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg={SAND}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 lg:grid-cols-2">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="grid overflow-hidden rounded-2xl bg-white shadow-md sm:grid-cols-[14rem_1fr]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 640px) 14rem, 100vw" className="h-full" />
              <div className="flex flex-col justify-center p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE_TEXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Buraydah.`} className={`${link} mt-3 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Airport and railway */}
      {(airport || railway) && (
        <Block id="airport" bg={OLIVE} dark>
          <div className="grid gap-8 lg:grid-cols-2">
            {airport && (
              <div className="rounded-3xl border border-accent/30 bg-white/5 p-7">
                <Head id="airport" eyebrow="Airport transfers" dark lead={airport.intro}>{airport.heading}</Head>
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Qassim airport image" width={800} height={400} />
                </div>
                <ul className="space-y-4">
                  {airport.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-extrabold text-accent">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-ivory/80">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ivory/70">{airport.note}</p>
                <Link href={airport.href} className="mt-4 inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">Qassim airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
            {railway && (
              <div className="rounded-3xl border border-accent/30 bg-white/5 p-7">
                <Head id="railway" eyebrow="Railway connection" dark lead={railway.intro}>{railway.heading}</Head>
                <ul className="space-y-4">
                  {railway.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-extrabold text-accent">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-ivory/80">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-ivory/70">{railway.note}</p>
                <Link href={railway.href} className="mt-4 inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">{railway.linkLabel} <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
        </Block>
      )}

      {/* Route planning with the map on the left */}
      {route && (
        <Block id="plan" bg="bg-white">
          <Head id="plan" eyebrow="Journey planning" lead={route.intro}>{route.heading}</Head>
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-surface">
              <LazyMap title="Route map from Riyadh to Buraydah"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                className="aspect-[4/3] w-full" />
              <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Buraydah. The driver chooses the best road on the day.</figcaption>
            </figure>
            <div>
              <ol className="space-y-4">
                {route.stops.map((s, i) => (
                  <li key={s.name} className="flex gap-4">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${OLIVE} text-sm font-extrabold text-accent`}>{i + 1}</span>
                    <div>
                      <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE_TEXT}`}>{s.detail}</p>
                      <h3 className="font-extrabold text-navy">{s.name}</h3>
                      <p className="text-sm leading-7 text-muted">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-sm leading-7 text-muted">{route.note}</p>
            </div>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {rich.plan.map((p) => (
              <li key={p.title} className={`rounded-2xl ${SAND} p-5`}>
                <h3 className="font-extrabold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <h3 className="mt-10 font-display text-2xl text-navy">{rich.pickupHeading}</h3>
          <p className="mt-2 max-w-3xl text-muted">{rich.pickupIntro}</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {rich.pickups.map((x) => (
              <li key={x.name}>
                {x.href ? (
                  <Link href={x.href} className={`inline-flex rounded-full ${SAND} px-4 py-2 text-sm font-bold text-navy ring-1 ring-gold/40 hover:bg-accent`}>{x.name}</Link>
                ) : (
                  <span className={`inline-flex rounded-full ${SAND} px-4 py-2 text-sm font-bold text-navy ring-1 ring-gold/40`}>{x.name}</span>
                )}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* Nearby Qassim cities */}
      {cities && (
        <Block id="cities" bg={SAND}>
          <Head id="cities" eyebrow="Beyond Buraydah" lead={cities.intro}>{cities.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-3">
            {cities.items.map((c) => (
              <li key={c.name} className="rounded-2xl border-t-4 border-gold bg-white p-6 shadow-sm">
                <h3 className="text-xl font-extrabold text-navy">{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : c.name}</h3>
                <p className={`mt-1 text-xs font-extrabold uppercase tracking-wider ${BRONZE_TEXT}`}>{c.detail}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">{cities.note}</p>
        </Block>
      )}

      {/* Who */}
      <Block id="who" bg="bg-white">
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className={`rounded-2xl ${SAND} p-5`}>
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg={SAND_DEEP}>
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-white p-5 shadow-sm">
              <span className={`font-display text-4xl ${BRONZE_TEXT}`}>{i + 1}</span>
              <h3 className="mt-2 font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${OLIVE} text-ivory hover:brightness-110`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* Related */}
      <Block id="related" bg="bg-white">
        <Head id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-2xl border border-surface ${SAND} p-5 transition hover:border-gold hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${BRONZE_TEXT} transition group-hover:translate-x-1`} />
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

      {/* FAQ */}
      <Block id="faq" bg={SAND}>
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28">
            <Head id="faq" eyebrow="Questions">{rich.faqHeading}</Head>
            <Cta message={quote} className={link}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
          </div>
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Block>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className={`${OLIVE} text-ivory`}>
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center`}>
          <div>
            <h2 id="cta-title" className="font-display max-w-2xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
            <p className="mt-3 max-w-2xl text-lg text-ivory/80">{rich.ctaText}</p>
          </div>
          <Cta message={quote} className={`${btn} shrink-0 bg-accent text-navy hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
