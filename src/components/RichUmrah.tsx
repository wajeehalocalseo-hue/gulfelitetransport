import { useId } from "react";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, arrowLink, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/** Subtle geometric lattice (eight-point stars) used as a quiet background detail. */
export function Lattice({ tone = "light" }: { tone?: "light" | "dark" }) {
  const stroke = tone === "dark" ? "#d4af6a" : "#0e3b2c";
  const pid = `lat-${useId().replace(/:/g, "")}`;
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${tone === "dark" ? "opacity-[0.12]" : "opacity-[0.07]"}`}>
      <defs>
        <pattern id={pid} width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M28 4 L34 22 L52 28 L34 34 L28 52 L22 34 L4 28 L22 22 Z" fill="none" stroke={stroke} strokeWidth="1" />
          <circle cx="0" cy="0" r="2" fill={stroke} />
          <circle cx="56" cy="0" r="2" fill={stroke} />
          <circle cx="0" cy="56" r="2" fill={stroke} />
          <circle cx="56" cy="56" r="2" fill={stroke} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

export function Heading({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: React.ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : "text-gold"} ${center ? "justify-center" : ""}`}>
        <span aria-hidden="true" className="h-px w-8 bg-current" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function Section({ id, className = "", children, pattern }: { id: string; className?: string; children: React.ReactNode; pattern?: "light" | "dark" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative overflow-hidden ${className}`}>
      {pattern && <Lattice tone={pattern} />}
      <div className={`${wrap} relative py-16 sm:py-20`}>{children}</div>
    </section>
  );
}

export function RichUmrahHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Lattice tone="dark" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-block rounded-full border border-accent/50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.3rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-white/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Makkah." className={`${btn} bg-accent text-navy hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#umrah" className={`${btn} border border-white/35 text-white hover:border-accent hover:text-accent`}>Umrah and Family Travel</Link>
        </div>
      </div>
    </section>
  );
}

export function RichUmrahBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Makkah.";
  const umrah = rich.umrah;
  const miqat = rich.miqat;
  const airport = rich.airport;
  return (
    <div>
      {/* Route snapshot: a card that overlaps the hero edge */}
      <section aria-label="Route snapshot" className="relative z-10 bg-ivory">
        <div className={`${wrap} pb-4`}>
          <div className="-mt-0 rounded-3xl border-t-4 border-accent bg-white p-6 shadow-xl ring-1 ring-navy/10 sm:p-8">
            <h2 className="font-display text-2xl text-navy">Route snapshot</h2>
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              {rich.facts.map((x) => (
                <div key={x.label}>
                  <dt className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{x.label}</dt>
                  <dd className="mt-1 font-bold leading-snug text-navy">{x.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-5 text-muted">{rich.factsNote}</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <Section id="about" className="bg-ivory">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Heading id="about" eyebrow="About this route">{rich.introHeading}</Heading>
            <p className="rounded-2xl border-l-4 border-accent bg-white p-5 text-lg font-medium leading-8 text-navy shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-navy/10">
            <ImageSlot folder={f} slot="highway" alt={rich.highwayAlt} label="Highway journey image" width={800} height={700} />
          </div>
        </div>
      </Section>

      {/* Why */}
      <Section id="why" className="bg-white">
        <Heading id="why" eyebrow="Why a private transfer" center>{rich.whyHeading}</Heading>
        <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-4 rounded-2xl bg-surface p-5">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-accent"><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Umrah and family travel */}
      {umrah && (
        <Section id="umrah" className="bg-navy text-white" pattern="dark">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-28">
              <Heading id="umrah" eyebrow="Umrah and family travel" dark lead={umrah.intro}>{umrah.heading}</Heading>
              <div className="overflow-hidden rounded-[2rem] ring-1 ring-white/15">
                <ImageSlot folder={f} slot={umrah.slot} alt={umrah.alt} label="Family travel image" width={800} height={600} />
              </div>
            </div>
            <div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {umrah.items.map((u) => (
                  <li key={u.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                    <h3 className="font-extrabold text-accent">{u.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/80">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border border-accent/40 p-5 text-sm leading-7 text-white/85">{umrah.note}</p>
              <Cta message={quote} className={`${btn} mt-6 bg-accent text-navy hover:brightness-95`}>Request a Family Quote</Cta>
            </div>
          </div>
        </Section>
      )}

      {/* Makkah drop-off planning */}
      <Section id="drop" className="bg-ivory">
        <Heading id="drop" eyebrow="Arriving in Makkah" lead={rich.dropIntro}>{rich.dropHeading}</Heading>
        <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-navy/10">
            <h3 className="font-display text-xl text-navy">What to send us</h3>
            <ul className="mt-4 space-y-3">
              {rich.dropChecklist?.map((c) => (
                <li key={c} className="flex gap-3 leading-7 text-muted">
                  <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-gold" /> {c}
                </li>
              ))}
            </ul>
            <div className="mt-6 overflow-hidden rounded-2xl">
              <ImageSlot folder={f} slot="makkah" alt={rich.dropAlt} label="Makkah city context image" width={600} height={420} />
            </div>
          </div>
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {rich.drops.map((d) => (
                <li key={d.name} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <h3 className="font-extrabold text-navy">{d.href ? <Link href={d.href} className={arrowLink}>{d.name}</Link> : d.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
            {rich.dropNote && <p role="note" className="mt-5 rounded-2xl bg-accent/25 p-5 text-sm font-semibold leading-7 text-navy">{rich.dropNote}</p>}
          </div>
        </div>
      </Section>

      {/* Vehicles */}
      <Section id="vehicles" className="bg-white">
        <Heading id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Heading>
        <ul className="grid gap-6 md:grid-cols-2">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="overflow-hidden rounded-3xl bg-surface ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={420} sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{v.best}</p>
                <h3 className="mt-1 text-2xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Makkah.`} className={`${arrowLink} mt-4`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Journey planning with the map */}
      <Section id="plan" className="bg-ivory">
        <Heading id="plan" eyebrow="Journey planning">{rich.planHeading}</Heading>
        <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-navy/10">
          <iframe
            title="Route map from Riyadh to Makkah"
            src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[16/8] w-full border-0 max-sm:aspect-[4/3]"
          />
          <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Makkah. The driver chooses the best road on the day.</figcaption>
        </figure>
        <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {rich.plan.map((p, i) => (
            <li key={p.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
              <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-extrabold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-12 font-display text-2xl text-navy">{rich.pickupHeading}</h3>
        <p className="mt-2 max-w-3xl text-muted">{rich.pickupIntro}</p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {rich.pickups.map((x) => (
            <li key={x.name}>
              {x.href ? (
                <Link href={x.href} className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy ring-1 ring-navy/15 hover:bg-accent hover:ring-accent">{x.name}</Link>
              ) : (
                <span className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-bold text-navy ring-1 ring-navy/15">{x.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Miqat and preparation */}
      {miqat && (
        <Section id="miqat" className="bg-surface" pattern="light">
          <Heading id="miqat" eyebrow="Travel preparation" lead={miqat.intro}>{miqat.heading}</Heading>
          <ul className="grid gap-5 md:grid-cols-2">
            {miqat.items.map((m) => (
              <li key={m.title} className="rounded-2xl border-l-4 border-accent bg-white p-5 shadow-sm">
                <h3 className="font-extrabold text-navy">{m.title}</h3>
                <p className="mt-1 leading-7 text-muted">{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">{miqat.note}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="font-bold text-navy">Official sources:</span>
            {miqat.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={arrowLink}>{l.name}</a>
            ))}
          </p>
        </Section>
      )}

      {/* JED clarification */}
      {airport && (
        <Section id="airport" className="bg-white">
          <div className="grid items-center gap-10 rounded-3xl bg-navy p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Heading id="airport" eyebrow="Airport clarification" dark lead={airport.intro}>{airport.heading}</Heading>
              <ul className="space-y-4">
                {airport.items.map((a) => (
                  <li key={a.title} className="border-l-2 border-accent pl-5">
                    <h3 className="font-extrabold text-accent">{a.title}</h3>
                    <p className="mt-1 leading-7 text-white/80">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-white/70">{airport.note}</p>
              <Link href={airport.href} className="mt-4 inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">Jeddah airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/15">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Jeddah airport image" width={600} height={600} />
            </div>
          </div>
        </Section>
      )}

      {/* Related and combined journeys */}
      <Section id="related" className="bg-ivory">
        <Heading id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Heading>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 transition hover:border-accent hover:shadow-md">
                <span>
                  <span className="block text-lg font-extrabold text-navy">{r.name}</span>
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

      {/* Who */}
      <Section id="who" className="bg-white">
        <Heading id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Heading>
        <ul className="flex flex-wrap justify-center gap-4">
          {rich.who.map((w) => (
            <li key={w.title} className="w-full rounded-2xl bg-surface p-5 sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]">
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Steps: vertical timeline */}
      <Section id="how" className="bg-surface">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28">
            <Heading id="how" eyebrow="Booking">{rich.stepsHeading}</Heading>
            <Cta message={quote} className={`${btn} bg-navy text-white hover:bg-navy-2`}>Start Your Request</Cta>
          </div>
          <ol className="relative space-y-7 border-l-2 border-accent/60 pl-8">
            {rich.steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full bg-navy font-extrabold text-accent">{i + 1}</span>
                <h3 className="text-lg font-extrabold text-navy">{s.title}</h3>
                <p className="mt-1 leading-7 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <Heading id="faq" eyebrow="Questions" center>{rich.faqHeading}</Heading>
        <div className="mx-auto max-w-4xl">
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Section>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy text-white">
        <Lattice tone="dark" />
        <div className={`${wrap} relative flex flex-col items-center gap-6 py-16 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-white/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-accent text-navy hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
