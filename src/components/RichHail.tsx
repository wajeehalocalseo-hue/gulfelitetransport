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
const CHAR = "bg-navy";
const IVORY = "bg-ivory";
const STONE = "bg-surface";
const BRONZE = "text-gold";
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-gold";

/** A ridge line: a quiet reference to the Aja and Salma ranges. */
function Ridge({ fill = "#fbf7ee", className = "" }: { fill?: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className={`block h-16 w-full sm:h-24 ${className}`}>
      <path fill={fill} d="M0 120 L0 78 L120 40 L210 66 L330 18 L450 70 L560 44 L690 86 L820 30 L940 72 L1060 22 L1190 74 L1310 46 L1440 80 L1440 120 Z" />
    </svg>
  );
}

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
      <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : BRONZE}`}>{eyebrow}</p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

function ExtLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function RichHailHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${CHAR} text-ivory`}>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-2" />
      <div className={`${wrap} relative pb-10 pt-14 sm:pt-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent" /> {rich.eyebrow}
        </p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.1rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ivory/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Hail." className={`${btn} bg-accent text-navy hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#heritage" className={`${btn} border border-ivory/40 text-ivory hover:border-accent hover:text-accent`}>Discover Hail</Link>
        </div>
      </div>
      <Ridge className="relative" />
    </section>
  );
}

export function RichHailBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Hail.";
  const { route, eastern, cities, airport, railway } = rich;
  const get = (l: string) => rich.facts.find((x) => x.label === l)?.value ?? "";
  return (
    <div>
      {/* Route overview: a ridge-profile strip */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} py-10`}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { l: "Road distance (estimate)", v: get("Approximate road distance") },
              { l: "Driving time (estimate)", v: get("Approximate driving time") },
              { l: "Main corridor", v: get("Main corridor") },
            ].map((c) => (
              <div key={c.l} className="rounded-xl border-b-4 border-accent bg-white px-6 py-5 shadow-sm">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE}`}>{c.l}</p>
                <p className="mt-1 text-xl font-extrabold text-navy">{c.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-navy">{get("Origin")} to {get("Destination")} · {get("Service")}</p>
          <p className="mt-2 text-xs leading-5 text-muted">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg="bg-white">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className={`border-l-4 border-accent ${IVORY} p-5 text-lg font-medium leading-8`}>{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-surface">
            <ImageSlot folder={f} slot="mountains" alt="Aja and Salma mountain scenery near Hail" label="Hail mountain landscape image" width={700} height={820} />
          </div>
        </div>
      </Block>

      {/* The road, as a vertical ridge route */}
      {route && (
        <Block id="plan" bg={STONE}>
          <Head id="plan" eyebrow="The road to Hail" lead={route.intro}>{route.heading}</Head>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <ol className="relative space-y-6 border-l-2 border-dashed border-gold/60 pl-8">
              {route.stops.map((s) => (
                <li key={s.name} className="relative">
                  <span aria-hidden="true" className="absolute -left-[2.45rem] top-1 h-4 w-4 rounded-full border-4 border-ivory bg-gold" />
                  <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE}`}>{s.detail}</p>
                  <h3 className="text-lg font-extrabold text-navy">{s.name}</h3>
                  <p className="text-sm leading-7 text-muted">{s.text}</p>
                </li>
              ))}
              <li className="text-sm leading-7 text-muted">{route.note}</li>
            </ol>
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-surface">
              <LazyMap title="Route map from Riyadh to Hail"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                className="aspect-[4/3] w-full" />
              <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Hail. The driver chooses the best road on the day.</figcaption>
            </figure>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {rich.plan.map((p) => (
              <li key={p.title} className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-extrabold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* Why */}
      <Block id="why" bg="bg-white">
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-4 border-b border-surface pb-5">
              <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${CHAR} text-accent`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Hail heritage: in the city, then beyond it */}
      <Block id="heritage" bg={CHAR} dark>
        <div className="grid gap-12 lg:grid-cols-2">
          {eastern && (
            <div>
              <Head id="heritage" eyebrow="In the city" dark lead={eastern.intro}>{eastern.heading}</Head>
              <ul className="space-y-4">
                {eastern.items.map((d) => (
                  <li key={d.name} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                    <h3 className="text-lg font-extrabold text-ivory">{d.name}</h3>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{d.detail}</p>
                    <p className="mt-1 text-sm leading-7 text-ivory/80">{d.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-ivory/70">{eastern.note}</p>
              <div className="mt-6 overflow-hidden rounded-2xl">
                <ImageSlot folder={f} slot="aarif-fort" alt="A'arif Fort overlooking Hail city" label="A'arif Fort image" width={800} height={420} />
              </div>
            </div>
          )}
          {cities && (
            <div>
              <Head id="beyond" eyebrow="Outside the city" dark lead={cities.intro}>{cities.heading}</Head>
              <ul className="space-y-4">
                {cities.items.map((d) => (
                  <li key={d.name} className="rounded-2xl border border-accent/40 p-5">
                    <h3 className="text-lg font-extrabold text-accent">{d.name}</h3>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-ivory/60">{d.detail}</p>
                    <p className="mt-1 text-sm leading-7 text-ivory/80">{d.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-ivory/70">{cities.note}</p>
              <div className="mt-6 overflow-hidden rounded-2xl">
                <ImageSlot folder={f} slot="jubbah" alt="Jubbah rock art and Jabal Umm Sinman, outside Hail city" label="Jubbah rock art image" width={800} height={420} />
              </div>
            </div>
          )}
        </div>
      </Block>

      {/* Vehicles: rows */}
      <Block id="vehicles" bg={IVORY}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 md:grid-cols-2">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="grid overflow-hidden rounded-2xl bg-white shadow-md sm:grid-cols-[1fr_12rem]">
              <div className="flex flex-col justify-center p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Hail.`} className={`${link} mt-3 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 640px) 12rem, 100vw" className="h-full" />
            </li>
          ))}
        </ul>
      </Block>

      {/* Arrival, airport and railway */}
      <Block id="drop" bg="bg-white">
        <Head id="drop" eyebrow="Arriving in Hail" lead={rich.dropIntro}>{rich.dropHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-3">
          {rich.drops.map((d) => (
            <li key={d.name} className={`rounded-2xl border-t-4 border-accent ${IVORY} p-5`}>
              <h3 className="font-extrabold text-navy">{d.href ? <Link href={d.href} className={link}>{d.name}</Link> : d.name}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{d.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 overflow-hidden rounded-3xl">
          <ImageSlot folder={f} slot="hail" alt={rich.dropAlt} label="Hail city image" width={1200} height={360} />
        </div>
      </Block>

      {(airport || railway) && (
        <Block id="airport" bg={STONE}>
          <div className="grid gap-8 lg:grid-cols-2">
            {airport && (
              <div className="rounded-3xl bg-white p-7 shadow-md">
                <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
                <ul className="space-y-4">
                  {airport.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-extrabold text-navy">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-muted">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">{airport.note}</p>
                <Link href={airport.href} className={`${link} mt-4`}>Hail airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
            {railway && (
              <div className="rounded-3xl bg-white p-7 shadow-md">
                <Head id="railway" eyebrow="Railway connection" lead={railway.intro}>{railway.heading}</Head>
                <ul className="space-y-4">
                  {railway.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-extrabold text-navy">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-muted">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted">{railway.note}</p>
                <ExtLink href={railway.href} className={`${link} mt-4`}>{railway.linkLabel} <Icon name="arrow" className="h-4 w-4" /></ExtLink>
              </div>
            )}
          </div>
        </Block>
      )}

      {/* Pickups in Riyadh */}
      <Block id="pickup" bg="bg-white">
        <Head id="pickup" eyebrow="Starting in Riyadh" lead={rich.pickupIntro}>{rich.pickupHeading}</Head>
        <ul className="flex flex-wrap gap-3">
          {rich.pickups.map((x) => (
            <li key={x.name}>
              {x.href ? (
                <Link href={x.href} className={`inline-flex rounded-full ${IVORY} px-5 py-2.5 text-sm font-bold text-navy ring-1 ring-accent/50 hover:bg-accent`}>{x.name}</Link>
              ) : (
                <span className={`inline-flex rounded-full ${IVORY} px-5 py-2.5 text-sm font-bold text-navy ring-1 ring-accent/50`}>{x.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Block>

      {/* Who */}
      <Block id="who" bg={IVORY}>
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-surface">
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg="bg-white">
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-4">
          {rich.steps.map((s, i) => (
            <li key={s.title} className={`rounded-2xl ${STONE} p-5`}>
              <span className={`font-display text-4xl ${BRONZE}`}>{i + 1}</span>
              <h3 className="mt-2 font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${CHAR} text-ivory hover:brightness-125`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* Related */}
      <Block id="related" bg={IVORY}>
        <Head id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-surface bg-white p-5 transition hover:border-accent hover:shadow-md">
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${BRONZE} transition group-hover:translate-x-1`} />
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
      <Block id="faq" bg="bg-white">
        <Head id="faq" eyebrow="Questions" center>{rich.faqHeading}</Head>
        <div className="mx-auto max-w-4xl">
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Block>

      {/* Final call to action, under a ridge */}
      <section aria-labelledby="cta-title" className={`${CHAR} text-ivory`}>
        <Ridge fill="#ffffff" className="rotate-180" />
        <div className={`${wrap} flex flex-col items-center gap-5 pb-16 pt-6 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-ivory/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-accent text-navy hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
