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
const GREEN = "bg-navy";
const CREAM = "bg-ivory";
const SAGE = "bg-surface";
const OLIVE_TXT = "text-navy-2";
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-navy-2";

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-ivory" : "text-body"}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

/** A heading with a large side numeral, used to give the page a numbered, corridor-like rhythm. */
function Head({ id, no, eyebrow, children, lead, dark = false }: { id: string; no: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean }) {
  return (
    <div className="mb-10 grid max-w-4xl gap-4 sm:grid-cols-[5rem_1fr]">
      <span aria-hidden="true" className={`font-display text-6xl leading-none ${dark ? "text-accent/70" : "text-accent"}`}>{no}</span>
      <div>
        <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : OLIVE_TXT}`}>{eyebrow}</p>
        <h2 id={`${id}-title`} className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{children}</h2>
        {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
      </div>
    </div>
  );
}

export function RichKharjHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const dist = rich.facts.find((x) => x.label === "Approximate road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Approximate driving time")?.value ?? "";
  return (
    <section className={`relative overflow-hidden ${SAGE} text-body`}>
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-navy" />
      <div className={`${wrap} relative py-14 pl-8 sm:py-20`}>
        <div className="[&_a]:text-navy [&_li]:text-navy/80 [&_nav]:text-navy/80 [&_span]:text-navy"><Breadcrumbs items={crumbs} /></div>
        <p className="mt-8 inline-flex rounded-md bg-navy px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] text-navy sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-body/85">{page.lead}</p>
        {/* Route line */}
        <div className="mt-7 flex max-w-xl items-center gap-3" aria-label={`${dist}, ${time}`}>
          <span className="rounded-md bg-navy px-3 py-1.5 text-sm font-extrabold text-ivory">Riyadh</span>
          <span aria-hidden="true" className="h-0 flex-1 border-t-2 border-dashed border-navy-2" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-navy-2">{dist}</span>
          <span aria-hidden="true" className="h-0 flex-1 border-t-2 border-dashed border-navy-2" />
          <span className="rounded-md bg-navy px-3 py-1.5 text-sm font-extrabold text-ivory">Al Kharj</span>
        </div>
        <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-body/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-navy" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Al Kharj." className={`${btn} ${GREEN} text-ivory hover:brightness-110`}>Get a Free Quote</Cta>
          <Link href="#corridor" className={`${btn} border border-navy/40 text-navy hover:bg-white`}>The Business Corridor</Link>
        </div>
      </div>
    </section>
  );
}

export function RichKharjBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Al Kharj.";
  const { terms, business, market, eastern, sites, cities } = rich;
  return (
    <div>
      {/* At-a-glance bar */}
      <section aria-label="Route overview" className={GREEN}>
        <div className={`${wrap} py-6`}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-ivory lg:grid-cols-6">
            {rich.facts.map((x) => (
              <div key={x.label}>
                <dt className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{x.label}</dt>
                <dd className="mt-0.5 text-sm font-bold leading-snug">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-ivory/70">{rich.factsNote}</p>
        </div>
      </section>

      {/* 01 Introduction and location clarity */}
      <Block id="about" bg={CREAM}>
        <Head id="about" no="01" eyebrow="About this route">{rich.introHeading}</Head>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="rounded-xl border-l-4 border-navy bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          {terms && (
            <aside aria-labelledby="terms-title" className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-accent/50">
              <h3 id="terms-title" className="font-display text-xl text-navy">{terms.heading}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{terms.intro}</p>
              <dl className="mt-4 divide-y divide-surface">
                {terms.items.map((t) => (
                  <div key={t.title} className="py-3">
                    <dt className="font-extrabold text-navy">{t.title}</dt>
                    <dd className="text-sm leading-7 text-muted">{t.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm font-semibold leading-7">{terms.note}</p>
            </aside>
          )}
        </div>
      </Block>

      {/* 02 Commuter and business corridor */}
      {business && (
        <Block id="corridor" bg={GREEN} dark>
          <Head id="corridor" no="02" eyebrow="Work and family" dark lead={business.intro}>{business.heading}</Head>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {business.items.map((b) => (
              <div key={b.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <h3 className="font-extrabold text-accent">{b.title}</h3>
                <p className="mt-2 text-sm leading-7 text-ivory/80">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-ivory/75">{business.note}</p>
          <Cta message={quote} className={`${btn} mt-5 bg-accent text-navy hover:brightness-95`}>Request a Quote</Cta>
        </Block>
      )}

      {/* 03 Why */}
      <Block id="why" bg="bg-white">
        <Head id="why" no="03" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className={`flex gap-4 rounded-2xl ${CREAM} p-5`}>
              <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${GREEN} text-accent`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* 04 Oasis and agriculture */}
      {market && (
        <Block id="oasis" bg={SAGE}>
          <Head id="oasis" no="04" eyebrow="The Al Kharj oasis" lead={market.intro}>{market.heading}</Head>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {market.items.map((m) => (
                <li key={m.title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold text-navy">{m.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{m.text}</p>
                </li>
              ))}
            </ul>
            <div>
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <ImageSlot folder={f} slot="oasis" alt="The Al Kharj oasis with farms and palm groves" label="Al Kharj oasis image" width={800} height={520} />
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{market.note}</p>
            </div>
          </div>
        </Block>
      )}

      {/* 05 Local places */}
      {eastern && (
        <Block id="places" bg={CREAM}>
          <Head id="places" no="05" eyebrow="Local landmarks" lead={eastern.intro}>{eastern.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-2">
            {eastern.items.map((d, i) => (
              <li key={d.name} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-surface">
                <span className={`font-display text-3xl ${OLIVE_TXT}`}>{i + 1}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy">{d.name}</h3>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{d.detail}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{d.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
            <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="palace" alt="King Abdulaziz Historical Palace in Al-Saih, Al Kharj" label="King Abdulaziz Historical Palace image" width={800} height={400} /></div>
            <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="springs" alt="A historic spring in the Al Kharj oasis" label="Al Kharj springs image" width={800} height={400} /></div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{eastern.note}</p>
        </Block>
      )}

      {/* 06 Farm, factory and site transfers */}
      {sites && (
        <Block id="sites" bg={GREEN} dark>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="sites" no="06" eyebrow="Farms, factories and sites" dark lead={sites.intro}>{sites.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {sites.items.map((s) => (
                  <li key={s.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                    <h3 className="font-extrabold text-accent">{s.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-ivory/80">{s.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-2xl border border-accent/40 p-5 text-sm leading-7 text-ivory/85">{sites.note}</p>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
              <ImageSlot folder={f} slot={sites.slot} alt={sites.alt} label="Farm and industrial landscape image" width={640} height={780} />
            </div>
          </div>
        </Block>
      )}

      {/* 07 Vehicles: a comparison table */}
      <Block id="vehicles" bg="bg-white">
        <Head id="vehicles" no="07" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="divide-y divide-surface overflow-hidden rounded-2xl border border-surface">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="grid items-center gap-4 p-4 sm:grid-cols-[10rem_1fr_auto]">
              <div className="overflow-hidden rounded-xl">
                <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 640px) 10rem, 100vw" />
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{v.best}</p>
                <h3 className="text-lg font-extrabold text-navy">{v.name}</h3>
                <p className="text-sm leading-7 text-muted">{v.text}</p>
              </div>
              <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Al Kharj.`} className={`${btn} border border-navy px-5 py-2.5 text-sm text-navy hover:bg-navy hover:text-white`}>Ask about this vehicle</Cta>
            </li>
          ))}
        </ul>
      </Block>

      {/* 08 Where in Al Kharj, plan and map */}
      <Block id="drop" bg={SAGE}>
        <Head id="drop" no="08" eyebrow="Arriving in Al Kharj" lead={rich.dropIntro}>{rich.dropHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <ul className="space-y-3">
              {rich.drops.map((d) => (
                <li key={d.name} className="rounded-xl border-l-4 border-navy-2 bg-white p-4 shadow-sm">
                  <h3 className="font-extrabold text-navy">{d.name}</h3>
                  <p className="text-sm leading-7 text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
            {rich.dropNote && <p role="note" className="mt-4 rounded-xl bg-accent/30 p-4 text-sm font-semibold leading-7">{rich.dropNote}</p>}
          </div>
          <figure className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-accent/50">
            <LazyMap title="Route map from Riyadh to Al Kharj"
              src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
              className="aspect-[4/3] w-full" />
            <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Al Kharj. The driver chooses the best road on the day.</figcaption>
          </figure>
        </div>
      </Block>

      {/* 09 Journey planning and nearby places */}
      <Block id="plan" bg={CREAM}>
        <Head id="plan" no="09" eyebrow="Journey planning">{rich.planHeading}</Head>
        <ul className="grid gap-5 md:grid-cols-3">
          {rich.plan.map((p) => (
            <li key={p.title} className="rounded-2xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-navy">{p.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
        {cities && (
          <div className="mt-10">
            <h3 className="font-display text-2xl text-navy">{cities.heading}</h3>
            <p className="mt-2 max-w-3xl text-muted">{cities.intro}</p>
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {cities.items.map((c) => (
                <li key={c.name} className="rounded-2xl border-t-4 border-navy-2 bg-white p-5 shadow-sm">
                  <h4 className="font-extrabold text-navy">{c.name}</h4>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{c.detail}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{c.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{cities.note}</p>
          </div>
        )}
        <h3 className="mt-10 font-display text-2xl text-navy">{rich.pickupHeading}</h3>
        <p className="mt-2 max-w-3xl text-muted">{rich.pickupIntro}</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {rich.pickups.map((x) => (
            <li key={x.name}>
              {x.href ? (
                <Link href={x.href} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-navy ring-1 ring-accent/60 hover:bg-accent">{x.name}</Link>
              ) : (
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-navy ring-1 ring-accent/60">{x.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Block>

      {/* 10 Who */}
      <Block id="who" bg="bg-white">
        <Head id="who" no="10" eyebrow="Who uses it">{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className={`rounded-2xl ${SAGE} p-5`}>
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* 11 Steps */}
      <Block id="how" bg={CREAM}>
        <Head id="how" no="11" eyebrow="Booking">{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-surface">
              <span className={`font-display text-3xl ${OLIVE_TXT}`}>{i + 1}</span>
              <h3 className="mt-2 font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Cta message={quote} className={`${btn} ${GREEN} text-ivory hover:brightness-110`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* 12 FAQ */}
      <Block id="faq" bg="bg-white">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28">
            <Head id="faq" no="12" eyebrow="Questions">{rich.faqHeading}</Head>
            <Cta message={quote} className={link}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
          </div>
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Block>

      {/* 13 Related */}
      <Block id="related" bg={SAGE}>
        <Head id="related" no="13" eyebrow="More routes and pages">{rich.relatedHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-accent/50 bg-white p-5 transition hover:border-navy hover:shadow-md">
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${OLIVE_TXT} transition group-hover:translate-x-1`} />
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
      <section aria-labelledby="cta-title" className={`${GREEN} text-ivory`}>
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
