import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";
import { ctaHref } from "@/lib/site";
import { WhatsAppIcon, waPill } from "./WhatsApp";

export const wrap = "mx-auto max-w-7xl px-5";
export const btn = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-center font-extrabold transition";
export const arrowLink = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4 hover:text-gold";

/** A button or link to the quote form, or to WhatsApp once site.contactMethod is switched. */
export function Cta({ children, message, className }: { children: ReactNode; message: string; className: string }) {
  const href = ctaHref(message);
  const external = href.startsWith("http");
  // Pill buttons become the green WhatsApp button. Text links keep their own style.
  if (external && className.includes("rounded-full")) {
    const extra = className.split(/\s+/).filter((c) => /^(mt|mb|ml|mr|mx|my|w|min-w|max-w|self|sm:w|sm:mt|lg:mt)-/.test(c)).join(" ");
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${waPill} ${extra}`}>
        <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
      </a>
    );
  }
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function Band({ id, tone = "white", children }: { id?: string; tone?: "white" | "surface" | "navy"; children: ReactNode }) {
  const bg = tone === "surface" ? "bg-surface" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={bg}>
      <div className={`${wrap} py-16 sm:py-20`}>{children}</div>
    </section>
  );
}

export function Title({ id, children, eyebrow, center = false, dark = false, lead }: { id: string; children: ReactNode; eyebrow?: string; center?: boolean; dark?: boolean; lead?: string }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : "text-gold"}`}>{eyebrow}</p>}
      <h2 id={`${id}-title`} className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

/** The hero text on the left; the booking form is placed on the right by HeroBooking. */
export function RichRouteHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const biz = rich.variant === "business";
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {biz ? (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-2" />
      ) : (
        <>
          <ImageSlot folder={rich.imageFolder} slot="hero" alt={rich.heroAlt} label={`Hero image: ${rich.fromName} to ${rich.toName} private taxi`} width={1600} height={900} fill priority sizes="100vw" className="opacity-60" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
        </>
      )}
      <div className={`${wrap} relative py-14 sm:py-20 ${biz ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
        <div>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-accent">{rich.eyebrow}</p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm font-semibold text-white/90">
              <Icon name="check" className="h-4 w-4 shrink-0 text-accent" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message={`Hello, I would like a free quote for a taxi from ${rich.fromName} to ${rich.toName}.`} className={`${btn} bg-accent text-navy hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#plan" className={`${btn} border border-white/35 text-white hover:border-accent hover:text-accent`}>Plan Your Journey</Link>
        </div>
        </div>
        {biz && (
          <div className="hidden overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15 lg:block">
            <ImageSlot folder={rich.imageFolder} slot="hero" alt={rich.heroAlt} label={`Hero image: ${rich.fromName} to ${rich.toName} private taxi`} width={800} height={600} priority sizes="40vw" />
          </div>
        )}
      </div>
    </section>
  );
}

export function RichRouteBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const biz = rich.variant === "business";
  const f = rich.imageFolder;
  const quote = `Hello, I would like a quote for a taxi from ${rich.fromName} to ${rich.toName}.`;
  return (
    <div>
      {/* Quick route information */}
      <section aria-label="Route information" className={biz ? "bg-navy-2 text-white" : "border-b border-navy/10 bg-white"}>
        <div className={`${wrap} py-8`}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {rich.facts.map((x) => (
              <div key={x.label} className="border-l-2 border-accent pl-4">
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${biz ? "text-accent" : "text-muted"}`}>{x.label}</dt>
                <dd className={`mt-1 font-bold leading-snug ${biz ? "text-white" : "text-navy"}`}>{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className={`mt-5 text-xs leading-5 ${biz ? "text-white/70" : "text-muted"}`}>{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Band id="about">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Title id="about" eyebrow="About this route">{rich.introHeading}</Title>
            <p className="rounded-2xl border-l-4 border-accent bg-surface p-5 text-lg font-medium leading-8 text-navy">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy/10">
            <ImageSlot folder={f} slot="highway" alt={rich.highwayAlt} label="Saudi highway image" width={800} height={640} />
          </div>
        </div>
      </Band>

      {/* Why */}
      <Band id="why" tone="surface">
        <Title id="why" eyebrow="Why this ride" center>{rich.whyHeading}</Title>
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w, i) => (
            <li key={w.title} className="border-t-2 border-accent pt-5">
              <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-extrabold text-navy">{w.title}</h3>
              <p className="mt-2 leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      {rich.business && (
        <Band id="business" tone="navy">
          <Title id="business" eyebrow="For work trips" dark lead={rich.business.intro}>{rich.business.heading}</Title>
          <ul className="grid gap-5 md:grid-cols-2">
            {rich.business.items.map((b, i) => (
              <li key={b.title} className="flex gap-5 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <span className="font-display text-4xl leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-white">{b.title}</h3>
                  <p className="mt-1 leading-7 text-white/75">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-white/75">{rich.business.note}</p>
          <Cta message={quote} className={`${btn} mt-6 bg-accent text-navy hover:brightness-95`}>Request a Business Quote</Cta>
        </Band>
      )}

      {/* Vehicles */}
      <Band id="vehicles">
        <Title id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Title>
        <ul className={biz ? "grid gap-5" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
          {rich.vehicles.map((v) => (
            <li key={v.name} className={biz ? "grid overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-navy/10 sm:grid-cols-[18rem_1fr]" : "flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-navy/10"}>
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes={biz ? "(min-width: 640px) 18rem, 100vw" : "(min-width: 1024px) 25vw, 100vw"} className={biz ? "h-full object-cover" : ""} />
              <div className="flex flex-1 flex-col justify-center p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 flex-1 leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from ${rich.fromName} to ${rich.toName}.`} className={`${arrowLink} mt-5`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      {/* Riyadh pickups */}
      <Band id="pickup" tone={biz ? "white" : "surface"}>
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28">
            <Title id="pickup" eyebrow={`Starting in ${rich.fromName}`} lead={rich.pickupIntro}>{rich.pickupHeading}</Title>
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy/10">
              <ImageSlot folder={f} slot="riyadh" alt={rich.pickupAlt} label="Riyadh city image" width={800} height={600} />
            </div>
          </div>
          <ul className="grid gap-4">
            {rich.pickups.map((x) => (
              <li key={x.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
                <h3 className="text-lg font-extrabold text-navy">{x.href ? <Link href={x.href} className={arrowLink}>{x.name}</Link> : x.name}</h3>
                <p className="mt-1 leading-7 text-muted">{x.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      {/* Drop-offs */}
      <Band id="drop">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Title id="drop" eyebrow={`Arriving in ${rich.toName}`} lead={rich.dropIntro}>{rich.dropHeading}</Title>
            <ul className="grid gap-4 sm:grid-cols-2">
              {rich.drops.map((x) => (
                <li key={x.name} className="rounded-2xl border border-navy/10 bg-surface p-5">
                  <h3 className="font-extrabold text-navy">{x.href ? <Link href={x.href} className={arrowLink}>{x.name}</Link> : x.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{x.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy/10 lg:sticky lg:top-28">
            <ImageSlot folder={f} slot="destination" alt={rich.dropAlt} label={`${rich.toName} destination image`} width={800} height={720} />
          </div>
        </div>
      </Band>

      {rich.eastern && (
        <Band id="eastern" tone="surface">
          <Title id="eastern" eyebrow="Eastern Province" lead={rich.eastern.intro}>{rich.eastern.heading}</Title>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {rich.eastern.items.map((e) => (
              <li key={e.name} className="flex flex-col rounded-2xl border-t-4 border-accent bg-white p-6 shadow-sm ring-1 ring-navy/10">
                <h3 className="text-xl font-extrabold text-navy">{e.href ? <Link href={e.href} className={arrowLink}>{e.name}</Link> : e.name}</h3>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-wider text-gold">{e.detail}</p>
                <p className="mt-3 leading-7 text-muted">{e.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">{rich.eastern.note}</p>
        </Band>
      )}

      {rich.airport && (
        <Band id="airport" tone="navy">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Title id="airport" eyebrow="Airport transfers" dark lead={rich.airport.intro}>{rich.airport.heading}</Title>
              <ul className="space-y-5">
                {rich.airport.items.map((a) => (
                  <li key={a.title} className="border-l-2 border-accent pl-5">
                    <h3 className="text-lg font-extrabold text-accent">{a.title}</h3>
                    <p className="mt-1 leading-7 text-white/80">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-white/75">{rich.airport.note}</p>
              <Link href={rich.airport.href} className="mt-5 inline-flex items-center gap-2 font-bold text-accent underline underline-offset-4">Airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/15">
              <ImageSlot folder={f} slot={rich.airport.slot} alt={rich.airport.alt} label={`${rich.toName} airport image`} width={800} height={640} />
            </div>
          </div>
        </Band>
      )}

      {/* Journey planning with the route map */}
      <Band id="plan" tone={rich.airport ? "white" : "surface"}>
        <Title id="plan" eyebrow="Journey planning">{rich.planHeading}</Title>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <ol className="space-y-6">
            {rich.plan.map((p, i) => (
              <li key={p.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-accent">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-extrabold text-navy">{p.title}</h3>
                  <p className="mt-1 leading-7 text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-navy/10">
              <iframe
                title={`Route map from ${rich.fromName} to ${rich.toName}`}
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted">Map of the route from {rich.fromName} to {rich.toName}. The driver chooses the best road on the day.</figcaption>
          </figure>
        </div>
      </Band>

      {/* Who it suits */}
      <Band id="who" tone="navy">
        <Title id="who" eyebrow="Who it is for" dark center>{rich.whoHeading}</Title>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
              <h3 className="text-lg font-extrabold text-accent">{w.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/75">{w.text}</p>
            </li>
          ))}
        </ul>
      </Band>

      {/* How booking works */}
      <Band id="how">
        <Title id="how" eyebrow="Booking" center>{rich.stepsHeading}</Title>
        <ol className="grid gap-8 md:grid-cols-4">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent font-display text-2xl text-navy shadow-md">{i + 1}</span>
              <h3 className="mt-4 text-lg font-extrabold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Cta message={quote} className={`${btn} bg-navy text-white hover:bg-navy-2`}>Book Your Private Taxi</Cta>
        </div>
      </Band>

      {/* Practical information */}
      <Band id="info" tone="surface">
        <Title id="info" eyebrow="Good to know" lead={rich.infoIntro}>{rich.infoHeading}</Title>
        <ul className="grid gap-x-10 gap-y-6 md:grid-cols-2">
          {rich.info.map((x) => (
            <li key={x.title} className="flex gap-4">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-navy"><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{x.title}</h3>
                <p className="leading-7 text-muted">{x.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Band>

      {/* Related routes */}
      <Band id="related">
        <Title id="related" eyebrow="More routes">{rich.relatedHeading}</Title>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
        <p className="mt-8 text-sm text-muted">
          More pages: <Link href="/riyadh-taxi-service" className={arrowLink}>Riyadh taxi service</Link>{" · "}
          {rich.toHref && <><Link href={rich.toHref} className={arrowLink}>Taxi in {rich.toName}</Link>{" · "}</>}
          <Link href="/taxi-saudi-arabia/routes" className={arrowLink}>All routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={arrowLink}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={arrowLink}>Contact us</Link>
        </p>
      </Band>

      {/* FAQ */}
      <Band id="faq" tone="surface">
        <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-28">
            <Title id="faq" eyebrow="Questions" lead="Straight answers to what travellers ask before booking this route.">{rich.faqHeading}</Title>
            <Cta message={quote} className={arrowLink}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
          </div>
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Band>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className="bg-accent text-navy">
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center`}>
          <div>
            <h2 id="cta-title" className="font-display text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
            <p className="mt-2 max-w-2xl text-lg font-medium text-navy/80">{rich.ctaText}</p>
          </div>
          <Cta message={quote} className={`${btn} shrink-0 bg-navy text-white hover:bg-navy-2`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
