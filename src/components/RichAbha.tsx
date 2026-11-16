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
const PINE = "bg-navy";
const IVORY = "bg-ivory";
const SAND = "bg-surface";
const TERRA_TXT = "text-gold";
const link = "inline-flex items-center gap-2 font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold";

/** A band of small triangles, a quiet reference to Al-Qatt Al-Asiri geometric art. */
function Qatt({ colour = "#7d5f1c", back = "#e4d9bd", className = "" }: { colour?: string; back?: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 16" preserveAspectRatio="xMidYMid slice" className={`block h-4 w-full ${className}`}>
      <rect width="240" height="16" fill={back} />
      {Array.from({ length: 20 }).map((_, i) => (
        <path key={i} d={`M${i * 12} 16 L${i * 12 + 6} 2 L${i * 12 + 12} 16 Z`} fill={i % 2 ? colour : "#0e3b2c"} />
      ))}
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
      <p className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-accent" : TERRA_TXT}`}>
        <span aria-hidden="true" className="h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-current" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-ivory/80" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function RichAbhaHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${PINE} text-ivory`}>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-2" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-accent">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-ivory/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Abha." className={`${btn} bg-[#e4d9bd] text-navy hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#corridor" className={`${btn} border border-ivory/40 text-ivory hover:border-[#e4d9bd] hover:text-[#e4d9bd]`}>See the Road</Link>
        </div>
      </div>
      <Qatt />
    </section>
  );
}

export function RichAbhaBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Abha.";
  const { terms, route, eastern, cities, umrah, airport } = rich;
  const get = (l: string) => rich.facts.find((x) => x.label === l)?.value ?? "";
  return (
    <div>
      {/* Overview strip */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} py-8`}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#e4d9bd] ring-1 ring-[#e4d9bd] lg:grid-cols-6">
            {rich.facts.map((x) => (
              <div key={x.label} className="bg-white px-4 py-3">
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{x.label}</dt>
                <dd className="mt-0.5 text-sm font-bold leading-snug text-navy">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-muted">{rich.factsNote}</p>
        </div>
      </section>

      {/* Corridor profile */}
      {route && (
        <Block id="corridor" bg={SAND}>
          <Head id="corridor" eyebrow="The road to Asir" lead={route.intro}>{route.heading}</Head>
          <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-[#e4d9bd] sm:p-8">
            <ol className="relative grid gap-6 md:grid-cols-5">
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[1.05rem] hidden h-0.5 bg-gradient-to-r from-navy-2 to-gold md:block" />
              {route.stops.map((s, i) => (
                <li key={s.name} className="relative text-center">
                  <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white ring-4 ring-white ${i === route.stops.length - 1 ? "bg-gold" : "bg-navy"}`}>{i + 1}</span>
                  <p className={`mt-3 text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{s.detail}</p>
                  <h3 className="font-extrabold text-navy">{s.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">{route.note}</p>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#e4d9bd]">
              <LazyMap title="Route map from Riyadh to Abha"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                className="aspect-[4/3] w-full" />
              <figcaption className="px-5 py-3 text-sm text-muted">Map of the route from Riyadh to Abha. The driver chooses the best road on the day.</figcaption>
            </figure>
            <ul className="space-y-3">
              {rich.plan.map((p) => (
                <li key={p.title} className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="font-extrabold text-navy">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Block>
      )}

      {/* Introduction */}
      <Block id="about" bg={IVORY}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className="rounded-2xl border-l-4 border-gold bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#e4d9bd]">
            <ImageSlot folder={f} slot="highlands" alt="The Asir highlands and Sarawat mountains near Abha" label="Asir highlands image" width={700} height={820} />
          </div>
        </div>
      </Block>

      {/* Why */}
      <Block id="why" bg="bg-white">
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w, i) => (
            <li key={w.title} className={`rounded-2xl p-5 ${i % 2 ? SAND : IVORY}`}>
              <h3 className="font-extrabold text-navy">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-muted">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Abha city */}
      {eastern && (
        <Block id="abha" bg={IVORY}>
          <Head id="abha" eyebrow="Abha city" lead={eastern.intro}>{eastern.heading}</Head>
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ul className="space-y-3">
              {eastern.items.map((d) => (
                <li key={d.name} className="grid gap-1 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-[13rem_1fr] sm:gap-5">
                  <div>
                    <h3 className="font-extrabold text-navy">{d.name}</h3>
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{d.detail}</p>
                  </div>
                  <p className="text-sm leading-7 text-muted">{d.text}</p>
                </li>
              ))}
            </ul>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="muftaha" alt="Al Muftaha Art Village in Abha" label="Al Muftaha Art Village image" width={600} height={300} /></div>
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="abha-lake" alt="Abha Dam Lake and the city" label="Abha city image" width={600} height={300} /></div>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">{eastern.note}</p>
        </Block>
      )}

      {/* Wider Asir */}
      {cities && (
        <Block id="asir" bg={PINE} dark>
          <Head id="asir" eyebrow="The wider Asir region" dark lead={cities.intro}>{cities.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cities.items.map((c) => (
              <li key={c.name} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/15">
                <h3 className="text-xl font-extrabold text-accent">{c.href ? <Link href={c.href} className="underline decoration-gold underline-offset-4">{c.name}</Link> : c.name}</h3>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-ivory/60">{c.detail}</p>
                <p className="mt-2 text-sm leading-7 text-ivory/80">{c.text}</p>
              </li>
            ))}
            <li className="overflow-hidden rounded-2xl ring-1 ring-white/15 md:col-span-2 lg:col-span-1">
              <ImageSlot folder={f} slot="soudah" alt="Al Soudah Mountain, north-west of Abha" label="Al Soudah image" width={600} height={420} />
            </li>
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-ivory/75">{cities.note}</p>
        </Block>
      )}

      {/* Geography clarity */}
      {terms && (
        <Block id="places" bg="bg-white">
          <Head id="places" eyebrow="Choose the right place" lead={terms.intro}>{terms.heading}</Head>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {terms.items.map((t, i) => (
              <div key={t.title} className={`rounded-2xl p-5 ${i === 0 ? `${PINE} text-ivory` : IVORY}`}>
                <dt className={`font-extrabold ${i === 0 ? "text-accent" : "text-navy"}`}>{t.title}</dt>
                <dd className={`mt-1 text-sm leading-7 ${i === 0 ? "text-ivory/80" : "text-muted"}`}>{t.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm font-semibold">{terms.note}</p>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg={SAND}>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Abha airport image" width={640} height={620} />
            </div>
            <div>
              <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
              <ul className="space-y-3">
                {airport.items.map((a) => (
                  <li key={a.title} className="rounded-xl bg-white p-4 shadow-sm">
                    <h3 className="font-extrabold text-navy">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">{airport.note}</p>
              <Link href={airport.href} className={`${link} mt-4`}>Abha airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </div>
        </Block>
      )}

      {/* Family */}
      {umrah && (
        <Block id="family" bg="bg-white">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Head id="family" eyebrow="Family and holiday travel" lead={umrah.intro}>{umrah.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {umrah.items.map((u) => (
                  <li key={u.title} className={`rounded-2xl ${IVORY} p-5`}>
                    <h3 className="font-extrabold text-navy">{u.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-muted">{umrah.note}</p>
              <Cta message={quote} className={`${btn} mt-5 ${PINE} text-white hover:brightness-110`}>Request a Family Quote</Cta>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <ImageSlot folder={f} slot={umrah.slot} alt={umrah.alt} label="Family travel image" width={560} height={680} />
            </div>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg={IVORY}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#e4d9bd]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <Qatt className="h-2" />
              <div className="flex flex-1 flex-col p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-muted">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Abha.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Addresses */}
      <Block id="drop" bg="bg-white">
        <Head id="drop" eyebrow="Your addresses" lead={rich.dropIntro}>{rich.dropHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <ul className="space-y-3">
            {rich.drops.map((d) => (
              <li key={d.name} className={`rounded-xl border-l-4 border-gold ${IVORY} p-4`}>
                <h3 className="font-extrabold text-navy">{d.name}</h3>
                <p className="text-sm leading-7 text-muted">{d.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="font-display text-xl text-navy">{rich.pickupHeading}</h3>
            <p className="mt-2 text-sm text-muted">{rich.pickupIntro}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm font-bold text-navy ring-1 ring-[#e4d9bd] hover:bg-[#e4d9bd]">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-ivory px-4 py-2 text-sm font-bold text-navy ring-1 ring-[#e4d9bd]">{x.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      {/* Who */}
      <Block id="who" bg={SAND}>
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-2xl bg-white p-5 shadow-sm">
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
            <li key={s.title} className={`rounded-2xl ${IVORY} p-5`}>
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
      <Block id="faq" bg={IVORY}>
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
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-2xl border border-[#e4d9bd] ${IVORY} p-5 transition hover:border-gold hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-navy">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${TERRA_TXT} transition group-hover:translate-x-1`} />
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
      <section aria-labelledby="cta-title" className={`${PINE} text-ivory`}>
        <Qatt />
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center`}>
          <div>
            <h2 id="cta-title" className="font-display max-w-2xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
            <p className="mt-3 max-w-2xl text-lg text-ivory/80">{rich.ctaText}</p>
          </div>
          <Cta message={quote} className={`${btn} shrink-0 bg-[#e4d9bd] text-navy hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
