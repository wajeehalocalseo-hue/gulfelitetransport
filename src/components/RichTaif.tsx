import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Site palette: green (navy, navy-2), gold (accent, gold), ivory and surface, as on the rest of the website. */
const PINE = "bg-navy";
const CLOUD = "bg-ivory";
const ROSE_SOFT = "bg-surface";
const ROSE_TXT = "text-gold";
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold";

/** Layered mountain ridges. */
function Ridges({ top = "#0e3b2c", back = "#14513c" }: { top?: string; back?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 140" preserveAspectRatio="none" className="block h-20 w-full sm:h-28">
      <path fill={back} opacity="0.55" d="M0 140 L0 70 L90 40 L190 80 L300 30 L420 85 L540 45 L660 90 L780 35 L900 80 L1020 28 L1150 84 L1280 50 L1440 90 L1440 140 Z" />
      <path fill={top} d="M0 140 L0 100 L130 70 L250 105 L380 62 L520 108 L650 78 L790 112 L930 68 L1070 106 L1210 74 L1330 104 L1440 84 L1440 140 Z" />
    </svg>
  );
}

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
      <p className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : ROSE_TXT}`}>
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-gold" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function RichTaifHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${CLOUD} text-body`}>
      <div aria-hidden="true" className="absolute -right-16 top-8 h-72 w-72 rounded-full bg-accent/50 blur-3xl" />
      <div className={`${wrap} relative pt-14 sm:pt-20`}>
        <div className="[&_a]:text-navy [&_li]:text-navy/80 [&_nav]:text-navy/80 [&_span]:text-navy"><Breadcrumbs items={crumbs} /></div>
        <p className="mt-8 inline-flex rounded-full bg-gold px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] text-navy sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-body/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-body/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 pb-6 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Taif." className={`${btn} ${PINE} text-white hover:brightness-110`}>Get a Free Quote</Cta>
          <Link href="#mountains" className={`${btn} border border-navy/40 text-navy hover:bg-white`}>Mountain Destinations</Link>
        </div>
      </div>
      <Ridges />
    </section>
  );
}

export function RichTaifBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Taif.";
  const { terms, route, cities, market, eastern, umrah, airport } = rich;
  const get = (l: string) => rich.facts.find((x) => x.label === l)?.value ?? "";
  return (
    <div>
      {/* Route overview */}
      <section aria-label="Route overview" className={PINE}>
        <div className={`${wrap} py-8 text-ivory`}>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-6">
            {rich.facts.map((x) => (
              <div key={x.label} className="border-l-2 border-accent pl-3">
                <dt className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{x.label}</dt>
                <dd className="mt-0.5 text-sm font-bold leading-snug">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-ivory/70">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg={CLOUD}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className="rounded-2xl border-l-4 border-gold bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] border-2 border-accent" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
              <ImageSlot folder={f} slot="highlands" alt="Taif highlands and the Sarawat mountains" label="Taif highlands image" width={700} height={800} />
            </div>
          </div>
        </div>
      </Block>

      {/* The road */}
      {route && (
        <Block id="plan" bg="bg-white">
          <Head id="plan" eyebrow="The road to the mountains" lead={route.intro}>{route.heading}</Head>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <ol className="relative space-y-5 border-l-2 border-navy/40 pl-7">
              {route.stops.map((s) => (
                <li key={s.name} className="relative">
                  <span aria-hidden="true" className="absolute -left-[2.2rem] top-1 h-4 w-4 rounded-full border-4 border-white bg-gold" />
                  <p className={`text-[11px] font-extrabold uppercase tracking-wider ${ROSE_TXT}`}>{s.detail}</p>
                  <h3 className="font-extrabold text-navy">{s.name}</h3>
                  <p className="text-sm leading-7 text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#e4d9bd]">
              <iframe
                title="Route map from Riyadh to Taif"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
              <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Taif. The driver chooses the best road on the day.</figcaption>
            </figure>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-muted">{route.note}</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {rich.plan.map((p) => (
              <li key={p.title} className={`rounded-2xl ${CLOUD} p-5`}>
                <h3 className="font-extrabold text-navy">{p.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Block>
      )}

      {/* Why */}
      <Block id="why" bg={CLOUD}>
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-3">
              <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${PINE} text-accent`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-navy">{w.title}</h3>
                <p className="text-sm leading-7 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Mountain destinations */}
      {cities && (
        <Block id="mountains" bg={PINE} dark>
          <Head id="mountains" eyebrow="Sarawat highlands" dark lead={cities.intro}>{cities.heading}</Head>
          <ul className="grid gap-6 md:grid-cols-3">
            {cities.items.map((c, i) => (
              <li key={c.name} className="overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/15">
                <ImageSlot folder={f} slot={["hada", "shafa", "daka"][i] ?? "hada"} alt={`${c.name}, a mountain destination near Taif`} label={`${c.name} image`} width={600} height={360} sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-accent">{c.name}</h3>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-ivory/60">{c.detail}</p>
                  <p className="mt-2 text-sm leading-7 text-ivory/80">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-ivory/75">{cities.note}</p>
        </Block>
      )}

      {/* Rose heritage */}
      {market && (
        <Block id="roses" bg={ROSE_SOFT}>
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="roses" eyebrow="Taif roses" lead={market.intro}>{market.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {market.items.map((m) => (
                  <li key={m.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-accent/60">
                    <h3 className={`font-extrabold ${ROSE_TXT}`}>{m.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{m.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-muted">{market.note}</p>
            </div>
            <div className="overflow-hidden rounded-t-[10rem] rounded-b-3xl shadow-xl ring-1 ring-accent">
              <ImageSlot folder={f} slot="roses" alt="Taif rose farm during the spring harvest" label="Taif rose farm image" width={600} height={760} />
            </div>
          </div>
        </Block>
      )}

      {/* City heritage */}
      {eastern && (
        <Block id="heritage" bg="bg-white">
          <Head id="heritage" eyebrow="In and around the city" lead={eastern.intro}>{eastern.heading}</Head>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="grid gap-4 sm:grid-cols-2">
              {eastern.items.map((d) => (
                <li key={d.name} className={`rounded-2xl ${CLOUD} p-5`}>
                  <h3 className="font-extrabold text-navy">{d.name}</h3>
                  <p className={`text-[11px] font-extrabold uppercase tracking-wider ${ROSE_TXT}`}>{d.detail}</p>
                  <p className="mt-1 text-sm leading-7 text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="shubra" alt="Shubra Palace in Taif" label="Shubra Palace image" width={600} height={300} /></div>
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="okaz" alt="Souq Okaz, a historic site outside central Taif" label="Souq Okaz image" width={600} height={300} /></div>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">{eastern.note}</p>
        </Block>
      )}

      {/* Family and holiday */}
      {umrah && (
        <Block id="family" bg={CLOUD}>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-[2rem] shadow-xl">
              <ImageSlot folder={f} slot={umrah.slot} alt={umrah.alt} label="Family travel image" width={560} height={640} />
            </div>
            <div>
              <Head id="family" eyebrow="Family and holiday travel" lead={umrah.intro}>{umrah.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {umrah.items.map((u) => (
                  <li key={u.title} className="rounded-2xl bg-white p-5 shadow-sm">
                    <h3 className="font-extrabold text-navy">{u.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-muted">{umrah.note}</p>
              <Cta message={quote} className={`${btn} mt-5 ${PINE} text-white hover:brightness-110`}>Request a Family Quote</Cta>
            </div>
          </div>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg="bg-white">
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
              <Link href={airport.href} className={`${link} mt-4`}>Taif airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-[#e4d9bd]">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Taif airport image" width={640} height={560} />
            </div>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg={CLOUD}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#e4d9bd]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="flex flex-1 flex-col p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${ROSE_TXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Taif.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Addresses and onward travel */}
      <Block id="drop" bg="bg-white">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Head id="drop" eyebrow="Your addresses" lead={rich.dropIntro}>{rich.dropHeading}</Head>
            <ul className="space-y-3">
              {rich.drops.map((d) => (
                <li key={d.name} className={`rounded-xl ${CLOUD} p-4`}>
                  <h3 className="font-extrabold text-navy">{d.name}</h3>
                  <p className="text-sm leading-7 text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-xl text-navy">{rich.pickupHeading}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm font-bold text-navy ring-1 ring-accent hover:bg-accent">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm font-bold text-navy ring-1 ring-accent">{x.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {terms && (
            <aside aria-labelledby="terms-title" className={`rounded-3xl ${ROSE_SOFT} p-7`}>
              <h3 id="terms-title" className="font-display text-2xl text-navy">{terms.heading}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{terms.intro}</p>
              <dl className="mt-4 space-y-3">
                {terms.items.map((t) => (
                  <div key={t.title}>
                    <dt className="font-extrabold text-navy">{t.title}</dt>
                    <dd className="text-sm leading-7 text-muted">{t.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm font-semibold leading-7">{terms.note}</p>
            </aside>
          )}
        </div>
      </Block>

      {/* Who */}
      <Block id="who" bg={CLOUD}>
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e4d9bd]">
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
            <li key={s.title} className={`rounded-2xl ${CLOUD} p-5`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${PINE} font-extrabold text-accent`}>{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-navy">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${PINE} text-white hover:brightness-110`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* FAQ */}
      <Block id="faq" bg={CLOUD}>
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
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-2xl border border-[#e4d9bd] ${CLOUD} p-5 transition hover:border-gold hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${ROSE_TXT} transition group-hover:translate-x-1`} />
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

      {/* Final call to action, over a ridge */}
      <section aria-labelledby="cta-title" className={`${PINE} text-ivory`}>
        <div className="rotate-180 bg-white"><Ridges top="#0e3b2c" back="#d4af6a" /></div>
        <div className={`${wrap} flex flex-col items-center gap-5 pb-16 pt-4 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-ivory/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-accent text-body hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
