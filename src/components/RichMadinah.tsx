import Link from "next/link";
import LazyMap from "./LazyMap";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, arrowLink, btn, wrap } from "./RichRoute";
import { Heading, Lattice, Section } from "./RichUmrah";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/** Light, airy hero: ivory with a faint lattice and an arch-shaped accent. The booking form sits beside it (HeroBooking). */
export function RichMadinahHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className="relative overflow-hidden bg-ivory text-navy">
      <Lattice tone="light" />
      <div aria-hidden="true" className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <div className="[&_a]:text-navy/70 [&_li]:text-navy/70 [&_nav]:text-navy/70 [&_span]:text-navy"><Breadcrumbs items={crumbs} /></div>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.3rem]">{page.h1}</h1>
        <div className="mt-6 flex max-w-3xl gap-4">
          <span aria-hidden="true" className="w-1 shrink-0 rounded-full bg-accent" />
          <p className="text-lg leading-8 text-navy/80">{page.lead}</p>
        </div>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-navy/85">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Madinah." className={`${btn} bg-navy text-white hover:bg-navy-2`}>Get a Free Quote</Cta>
          <Link href="#visit" className={`${btn} border border-navy/30 text-navy hover:border-navy hover:bg-white`}>Visiting Madinah</Link>
        </div>
      </div>
    </section>
  );
}

export function RichMadinahBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Madinah.";
  const { umrah, route, airport, railway, ziyarat } = rich;
  const distance = rich.facts.find((x) => x.label === "Road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Estimated driving time")?.value ?? "";
  return (
    <div>
      {/* Route strip: a single line from origin to destination */}
      <section aria-label="Route overview" className="bg-white">
        <div className={`${wrap} py-10`}>
          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            <div className="rounded-2xl bg-navy px-6 py-4 text-white md:min-w-40">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">Origin</p>
              <p className="font-display text-2xl">{rich.fromName}</p>
            </div>
            <div className="flex flex-1 items-center gap-3 text-center">
              <span aria-hidden="true" className="hidden h-px flex-1 border-t-2 border-dashed border-accent md:block" />
              <div className="mx-auto rounded-full bg-surface px-5 py-2 text-sm font-bold text-navy ring-1 ring-accent/50">
                {distance} · {time}
              </div>
              <span aria-hidden="true" className="hidden h-px flex-1 border-t-2 border-dashed border-accent md:block" />
            </div>
            <div className="rounded-2xl bg-navy px-6 py-4 text-white md:min-w-40 md:text-right">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">Destination</p>
              <p className="font-display text-2xl">{rich.toName} (Medina)</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {rich.facts.filter((x) => !["Origin", "Destination", "Road distance", "Estimated driving time"].includes(x.label)).map((x) => (
              <div key={x.label} className="rounded-xl bg-surface px-4 py-3">
                <dt className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{x.label}</dt>
                <dd className="mt-1 font-bold text-navy">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-muted">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Section id="about" className="bg-ivory">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Heading id="about" eyebrow="About this route">{rich.introHeading}</Heading>
            <p className="rounded-2xl bg-white p-5 text-lg font-medium leading-8 text-navy shadow-sm ring-1 ring-navy/10">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-xl ring-1 ring-navy/10">
            <ImageSlot folder={f} slot="highway" alt={rich.highwayAlt} label="Highway journey image" width={rich.imageAspect?.highway?.[0] ?? 640} height={rich.imageAspect?.highway?.[1] ?? 800} />
          </div>
        </div>
      </Section>

      {/* Why: numbered tiles in two rows of four */}
      <Section id="why" className="bg-white">
        <Heading id="why" eyebrow="Why a private taxi" center>{rich.whyHeading}</Heading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.why.map((w, i) => (
            <li key={w.title} className="rounded-2xl border border-navy/10 bg-ivory p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display text-navy">{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Visit and family travel */}
      {umrah && (
        <Section id="visit" className="bg-surface" pattern="light">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <Heading id="visit" eyebrow="Visiting Madinah" lead={umrah.intro}>{umrah.heading}</Heading>
              <div className="mx-auto w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-xl ring-1 ring-navy/10">
                <ImageSlot folder={f} slot={umrah.slot} alt={umrah.alt} label="Family travel image" width={rich.imageAspect?.family?.[0] ?? 640} height={rich.imageAspect?.family?.[1] ?? 720} />
              </div>
            </div>
            <div>
              <ul className="divide-y divide-navy/10 rounded-3xl bg-white px-6 shadow-md ring-1 ring-navy/10">
                {umrah.items.map((u) => (
                  <li key={u.title} className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                    <h3 className="font-extrabold text-navy">{u.title}</h3>
                    <p className="leading-7 text-muted">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-muted">{umrah.note}</p>
              <Cta message={quote} className={`${btn} mt-5 bg-navy text-white hover:bg-navy-2`}>Request a Family Quote</Cta>
            </div>
          </div>
        </Section>
      )}

      {/* Destination and drop-off planning */}
      <Section id="drop" className="bg-white">
        <Heading id="drop" eyebrow="Arriving in Madinah" lead={rich.dropIntro}>{rich.dropHeading}</Heading>
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {rich.drops.map((d) => (
                <li key={d.name} className="rounded-t-[3rem] rounded-b-2xl border border-navy/10 bg-ivory px-5 pb-5 pt-8 text-center">
                  <h3 className="font-extrabold text-navy">{d.href ? <Link href={d.href} className={arrowLink}>{d.name}</Link> : d.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
            {rich.dropNote && <p role="note" className="mt-5 rounded-2xl bg-accent/25 p-5 text-sm font-semibold leading-7 text-navy">{rich.dropNote}</p>}
            <div className="mt-6 overflow-hidden rounded-3xl">
              <ImageSlot folder={f} slot="madinah" alt={rich.dropAlt} label="Madinah hotel arrival image" width={rich.imageAspect?.madinah?.[0] ?? 900} height={rich.imageAspect?.madinah?.[1] ?? 420} />
            </div>
          </div>
          <div className="rounded-3xl bg-navy p-7 text-white shadow-xl">
            <h3 className="font-display text-2xl text-accent">What to send us</h3>
            <ul className="mt-4 space-y-3">
              {rich.dropChecklist?.map((c) => (
                <li key={c} className="flex gap-3 leading-7 text-white/85">
                  <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-accent" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Vehicles: a horizontal scroll strip */}
      <Section id="vehicles" className="bg-ivory">
        <Heading id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Heading>
        <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-navy/10 sm:w-[46%] lg:w-auto">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 80vw" />
              <div className="p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Madinah.`} className={`${arrowLink} mt-4`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* The road via Qassim, with the map */}
      {route && (
        <Section id="plan" className="bg-white">
          <Heading id="plan" eyebrow="Journey planning" lead={route.intro}>{route.heading}</Heading>
          <ol className="relative grid gap-6 md:grid-cols-4">
            <span aria-hidden="true" className="absolute left-0 right-0 top-5 hidden h-0.5 bg-accent/50 md:block" />
            {route.stops.map((s) => (
              <li key={s.name} className="relative">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-navy text-accent ring-4 ring-white"><Icon name="check" className="h-4 w-4" /></span>
                <p className="mt-3 text-[11px] font-extrabold uppercase tracking-wider text-gold">{s.detail}</p>
                <h3 className="text-lg font-extrabold text-navy">{s.name}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">{route.note}</p>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <ul className="space-y-5">
              {rich.plan.map((p) => (
                <li key={p.title} className="border-l-4 border-accent pl-5">
                  <h3 className="font-extrabold text-navy">{p.title}</h3>
                  <p className="mt-1 leading-7 text-muted">{p.text}</p>
                </li>
              ))}
              <li className="pt-2">
                <h3 className="font-extrabold text-navy">{rich.pickupHeading}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{rich.pickupIntro}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {rich.pickups.map((x) => (
                    <li key={x.name}>
                      {x.href ? (
                        <Link href={x.href} className="inline-flex rounded-full bg-surface px-4 py-2 text-sm font-bold text-navy ring-1 ring-navy/15 hover:bg-accent hover:ring-accent">{x.name}</Link>
                      ) : (
                        <span className="inline-flex rounded-full bg-surface px-4 py-2 text-sm font-bold text-navy ring-1 ring-navy/15">{x.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-navy/10">
              <LazyMap title="Route map from Riyadh to Madinah"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                className="aspect-[4/3] w-full" />
              <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Madinah. The driver chooses the best road on the day.</figcaption>
            </figure>
          </div>
        </Section>
      )}

      {/* Airport and railway side by side */}
      {(airport || railway) && (
        <Section id="airport" className="bg-navy text-white" pattern="dark">
          <div className="grid gap-8 lg:grid-cols-2">
            {airport && (
              <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/15">
                <Heading id="airport" eyebrow="Airport transfers" dark lead={airport.intro}>{airport.heading}</Heading>
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Madinah airport image" width={rich.imageAspect?.airport?.[0] ?? 800} height={rich.imageAspect?.airport?.[1] ?? 400} />
                </div>
                <ul className="space-y-4">
                  {airport.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-extrabold text-accent">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-white/80">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-white/70">{airport.note}</p>
                <Link href={airport.href} className="mt-4 inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">Madinah airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
            {railway && (
              <div className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/15">
                <Heading id="railway" eyebrow="Railway connection" dark lead={railway.intro}>{railway.heading}</Heading>
                <ul className="space-y-4">
                  {railway.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-accent pl-4">
                      <h3 className="font-extrabold text-accent">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-white/80">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-white/70">{railway.note}</p>
                <Link href={railway.href} className="mt-4 inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">{railway.linkLabel} <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Ziyarat planning */}
      {ziyarat && (
        <Section id="ziyarat" className="bg-surface">
          <Heading id="ziyarat" eyebrow="Visits in Madinah" lead={ziyarat.intro}>{ziyarat.heading}</Heading>
          <ul className="grid gap-5 md:grid-cols-3">
            {ziyarat.items.map((z) => (
              <li key={z.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
                <h3 className="text-lg font-extrabold text-navy">{z.href ? <Link href={z.href} className={arrowLink}>{z.name}</Link> : z.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{z.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">{ziyarat.note}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="font-bold text-navy">Official sources:</span>
            {ziyarat.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={arrowLink}>{l.name}</a>
            ))}
          </p>
        </Section>
      )}

      {/* Who */}
      <Section id="who" className="bg-white">
        <Heading id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Heading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="flex gap-4 rounded-2xl bg-ivory p-5">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-accent"><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Steps: six numbered cards */}
      <Section id="how" className="bg-ivory">
        <Heading id="how" eyebrow="Booking" center>{rich.stepsHeading}</Heading>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
              <span className="font-display text-4xl leading-none text-gold">{i + 1}</span>
              <div>
                <h3 className="font-extrabold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} bg-navy text-white hover:bg-navy-2`}>Start Your Request</Cta>
        </div>
      </Section>

      {/* Related */}
      <Section id="related" className="bg-white">
        <Heading id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Heading>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-ivory p-5 transition hover:border-accent hover:shadow-md">
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className="mt-4 h-5 w-5 text-accent transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={arrowLink}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={arrowLink}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={arrowLink}>Contact us</Link>
        </p>
      </Section>

      {/* FAQ: heading beside the list */}
      <Section id="faq" className="bg-surface">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28">
            <Heading id="faq" eyebrow="Questions">{rich.faqHeading}</Heading>
            <Cta message={quote} className={arrowLink}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
          </div>
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Section>

      {/* Final call to action: light card with a gold frame */}
      <section aria-labelledby="cta-title" className="bg-ivory">
        <div className={`${wrap} py-16`}>
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-accent bg-white p-8 text-center shadow-xl sm:p-14">
            <Lattice tone="light" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
              <h2 id="cta-title" className="font-display text-3xl text-navy sm:text-4xl">{rich.ctaHeading}</h2>
              <p className="text-lg leading-8 text-muted">{rich.ctaText}</p>
              <Cta message={quote} className={`${btn} bg-navy text-white hover:bg-navy-2`}>{rich.ctaButton}</Cta>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
