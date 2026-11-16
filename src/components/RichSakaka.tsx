import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Sakaka uses the site palette only (navy, navy-2, accent, gold, ivory, surface). The Al Jouf feel comes from a milepost strip in the hero, chapter-style heritage rows and trail cards. */
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
        <span aria-hidden="true" className="flex items-end gap-[3px]"><span className="h-2 w-1.5 bg-current" /><span className="h-3 w-1.5 bg-current" /><span className="h-4 w-1.5 bg-current" /></span>
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

export function RichSakakaHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const dist = rich.facts.find((x) => x.label === "Approximate road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Approximate driving time")?.value ?? "";
  const posts = rich.route?.stops ?? [];
  return (
    <section className="relative overflow-hidden bg-navy text-ivory">
      <div className={`${wrap} relative pb-12 pt-14 sm:pt-20`}>
        <div className="max-w-2xl">
          <div className="[&_a]:text-ivory [&_li]:text-ivory/80 [&_nav]:text-ivory/80 [&_span]:text-ivory"><Breadcrumbs items={crumbs} /></div>
          <p className="mt-8 inline-flex rounded-md bg-gold px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white">{rich.eyebrow}</p>
          <h1 className="font-display mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
          <p className="mt-6 text-lg leading-8 text-ivory/85">{page.lead}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-extrabold">
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
            <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Sakaka." className={`${btn} bg-accent text-navy hover:brightness-95`}>Get a Free Quote</Cta>
            <Link href="#places" className={`${btn} border border-white/40 text-white hover:bg-white/10`}>Sakaka and Al Jouf Guide</Link>
          </div>
        </div>
        {/* Milepost strip */}
        <ol className="mt-10 grid max-w-3xl grid-cols-2 gap-y-5 border-t border-white/25 pt-5 sm:grid-cols-5" aria-label="Route mileposts">
          {posts.map((p) => (
            <li key={p.name} className="relative pr-3">
              <span aria-hidden="true" className="absolute -top-[1.65rem] left-0 h-3 w-3 rotate-45 bg-accent" />
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{p.detail}</p>
              <p className="mt-0.5 text-sm font-bold leading-5">{p.name}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RichSakakaBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Sakaka.";
  const { terms, eastern, airport, umrah, route, heritage, cities, sites } = rich;
  const trails = (eastern?.items ?? []).map((d) => ({ ...d, km: km(d.detail) }));
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
            <ImageSlot folder={f} slot="al-jouf" alt="The northern oasis and olive groves of Al Jouf near Sakaka" label="Al Jouf oasis image" width={700} height={820} />
          </div>
        </div>
      </Block>

      {/* Sakaka and Al Jouf */}
      {terms && (
        <Block id="places" bg="bg-surface">
          <Head id="places" eyebrow="City and region" lead={terms.intro}>{terms.heading}</Head>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {terms.items.map((t) => (
              <li key={t.title} className="rounded-xl border-t-4 border-gold bg-white p-5 shadow-sm">
                <h3 className="text-lg font-extrabold text-navy">{t.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{t.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm font-semibold">{terms.note}</p>
        </Block>
      )}

      {/* Why */}
      <Block id="why" bg="bg-ivory">
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-accent"><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Route and map */}
      <Block id="route" bg="bg-white">
        <Head id="route" eyebrow="The road north-west" lead={route?.intro}>{route?.heading ?? rich.planHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <figure className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-navy/10">
            <iframe
              title="Route map from Riyadh to Sakaka"
              src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0"
            />
            <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Sakaka. The driver chooses the best road on the day.</figcaption>
          </figure>
          <div>
            <ul className="space-y-3">
              {rich.plan.map((p) => (
                <li key={p.title} className="rounded-xl bg-ivory p-5 ring-1 ring-navy/10">
                  <h3 className="font-extrabold text-navy">{p.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
            {route && <p className="mt-4 text-sm leading-7 text-muted">{route.note}</p>}
          </div>
        </div>
      </Block>

      {/* City heritage as chapters */}
      {heritage && (
        <Block id="heritage" bg="bg-surface">
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28">
              <Head id="heritage" eyebrow="In Sakaka city" lead={heritage.intro}>{heritage.heading}</Head>
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
                <ImageSlot folder={f} slot={heritage.slot} alt={heritage.alt} label="Zaabal Castle image" width={560} height={620} />
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{heritage.note}</p>
            </div>
            <ol className="space-y-3">
              {heritage.items.map((h, i) => (
                <li key={h.name} className="grid gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-navy/10 sm:grid-cols-[3.5rem_1fr]">
                  <span className="font-display text-4xl leading-none text-accent">{i + 1}</span>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-gold">{h.detail}</p>
                    <h3 className="text-lg font-extrabold text-navy">{h.name}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{h.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Block>
      )}

      {/* Beyond Sakaka: trails */}
      {eastern && (
        <Block id="destinations" bg="bg-navy" dark>
          <Head id="destinations" eyebrow="Beyond the city" dark lead={eastern.intro}>{eastern.heading}</Head>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trails.map((d) => (
              <li key={d.name} className="flex flex-col rounded-2xl bg-white/5 p-5 ring-1 ring-white/15">
                <p className="font-display text-4xl leading-none text-accent">{d.km ?? "·"}<span className="ml-1 text-sm font-extrabold text-ivory">km</span></p>
                <p className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-accent">{d.detail}</p>
                <h3 className="mt-3 text-lg font-extrabold">{d.name}</h3>
                <p className="mt-1 flex-1 text-sm leading-7 text-ivory/75">{d.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl rounded-xl border border-accent/60 bg-accent/10 p-4 text-sm leading-7">{eastern.note}</p>
        </Block>
      )}

      {/* Olive groves */}
      {sites && (
        <Block id="olive" bg="bg-ivory">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="olive" eyebrow="Farming landscape" lead={sites.intro}>{sites.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {sites.items.map((s) => (
                  <li key={s.title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-navy/10">
                    <h3 className="font-extrabold text-navy">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-muted">{sites.note}</p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={sites.slot} alt={sites.alt} label="Al Jouf olive groves image" width={560} height={640} />
            </div>
          </div>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg="bg-surface">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-navy/10">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Al Jouf Airport image" width={640} height={600} />
            </div>
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
              <Link href={airport.href} className={`${link} mt-4`}>Sakaka taxi service <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
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
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Sakaka.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Neighbours, families, drop-off and pickup */}
      <Block id="plan" bg="bg-white">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {cities && (
            <div>
              <h2 id="plan-title" className="font-display text-2xl text-navy">{cities.heading}</h2>
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
          {umrah && (
            <div>
              <h3 className="font-display text-2xl text-navy">{umrah.heading}</h3>
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
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
