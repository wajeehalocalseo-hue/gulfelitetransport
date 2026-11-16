import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Asir palette: pine #2f4f43, juniper #5f7d68, terracotta #b5603f, sandstone #d8c4a0, ivory #f6f2ea, charcoal #2f3433, bronze #9c7a43. */
const PINE = "bg-[#2f4f43]";
const IVORY = "bg-[#f6f2ea]";
const SAND = "bg-[#ece2cf]";
const TERRA_TXT = "text-[#a24f31]";
const link = "inline-flex items-center gap-2 font-bold text-[#2f4f43] underline decoration-[#b5603f] decoration-2 underline-offset-4 hover:text-[#a24f31]";

/** A band of small triangles, a quiet reference to Al-Qatt Al-Asiri geometric art. */
function Qatt({ colour = "#b5603f", back = "#d8c4a0", className = "" }: { colour?: string; back?: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 16" preserveAspectRatio="xMidYMid slice" className={`block h-4 w-full ${className}`}>
      <rect width="240" height="16" fill={back} />
      {Array.from({ length: 20 }).map((_, i) => (
        <path key={i} d={`M${i * 12} 16 L${i * 12 + 6} 2 L${i * 12 + 12} 16 Z`} fill={i % 2 ? colour : "#2f4f43"} />
      ))}
    </svg>
  );
}

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-[#f6f2ea]" : "text-[#2f3433]"}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-[#e0b79d]" : TERRA_TXT}`}>
        <span aria-hidden="true" className="h-0 w-0 border-x-[6px] border-b-[10px] border-x-transparent border-b-current" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-[#f6f2ea]/80" : "text-[#586260]"}`}>{lead}</p>}
    </div>
  );
}

export function RichAbhaHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${PINE} text-[#f6f2ea]`}>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#2f4f43] via-[#2f4f43] to-[#4d6b5b]" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#b5603f] pb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#e0b79d]">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f6f2ea]/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[#f6f2ea]/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#e0b79d]" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Abha." className={`${btn} bg-[#d8c4a0] text-[#2f4f43] hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#corridor" className={`${btn} border border-[#f6f2ea]/40 text-[#f6f2ea] hover:border-[#d8c4a0] hover:text-[#d8c4a0]`}>See the Road</Link>
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
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[#d8c4a0] ring-1 ring-[#d8c4a0] lg:grid-cols-6">
            {rich.facts.map((x) => (
              <div key={x.label} className="bg-white px-4 py-3">
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{x.label}</dt>
                <dd className="mt-0.5 text-sm font-bold leading-snug text-[#2f4f43]">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-[#586260]">{rich.factsNote}</p>
        </div>
      </section>

      {/* Corridor profile */}
      {route && (
        <Block id="corridor" bg={SAND}>
          <Head id="corridor" eyebrow="The road to Asir" lead={route.intro}>{route.heading}</Head>
          <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-[#d8c4a0] sm:p-8">
            <ol className="relative grid gap-6 md:grid-cols-5">
              <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[1.05rem] hidden h-0.5 bg-gradient-to-r from-[#5f7d68] to-[#b5603f] md:block" />
              {route.stops.map((s, i) => (
                <li key={s.name} className="relative text-center">
                  <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white ring-4 ring-white ${i === route.stops.length - 1 ? "bg-[#b5603f]" : "bg-[#2f4f43]"}`}>{i + 1}</span>
                  <p className={`mt-3 text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{s.detail}</p>
                  <h3 className="font-extrabold text-[#2f4f43]">{s.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#586260]">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#586260]">{route.note}</p>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#d8c4a0]">
              <iframe
                title="Route map from Riyadh to Abha"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
              <figcaption className="px-5 py-3 text-sm text-[#586260]">Map of the route from Riyadh to Abha. The driver chooses the best road on the day.</figcaption>
            </figure>
            <ul className="space-y-3">
              {rich.plan.map((p) => (
                <li key={p.title} className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="font-extrabold text-[#2f4f43]">{p.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#586260]">{p.text}</p>
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
            <p className="rounded-2xl border-l-4 border-[#b5603f] bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#586260]">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#d8c4a0]">
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
              <h3 className="font-extrabold text-[#2f4f43]">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#586260]">{w.text}</p>
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
                    <h3 className="font-extrabold text-[#2f4f43]">{d.name}</h3>
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{d.detail}</p>
                  </div>
                  <p className="text-sm leading-7 text-[#586260]">{d.text}</p>
                </li>
              ))}
            </ul>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="muftaha" alt="Al Muftaha Art Village in Abha" label="Al Muftaha Art Village image" width={600} height={300} /></div>
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="abha-lake" alt="Abha Dam Lake and the city" label="Abha city image" width={600} height={300} /></div>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#586260]">{eastern.note}</p>
        </Block>
      )}

      {/* Wider Asir */}
      {cities && (
        <Block id="asir" bg={PINE} dark>
          <Head id="asir" eyebrow="The wider Asir region" dark lead={cities.intro}>{cities.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cities.items.map((c) => (
              <li key={c.name} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/15">
                <h3 className="text-xl font-extrabold text-[#e0b79d]">{c.href ? <Link href={c.href} className="underline decoration-[#b5603f] underline-offset-4">{c.name}</Link> : c.name}</h3>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#f6f2ea]/60">{c.detail}</p>
                <p className="mt-2 text-sm leading-7 text-[#f6f2ea]/80">{c.text}</p>
              </li>
            ))}
            <li className="overflow-hidden rounded-2xl ring-1 ring-white/15 md:col-span-2 lg:col-span-1">
              <ImageSlot folder={f} slot="soudah" alt="Al Soudah Mountain, north-west of Abha" label="Al Soudah image" width={600} height={420} />
            </li>
          </ul>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-[#f6f2ea]/75">{cities.note}</p>
        </Block>
      )}

      {/* Geography clarity */}
      {terms && (
        <Block id="places" bg="bg-white">
          <Head id="places" eyebrow="Choose the right place" lead={terms.intro}>{terms.heading}</Head>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {terms.items.map((t, i) => (
              <div key={t.title} className={`rounded-2xl p-5 ${i === 0 ? `${PINE} text-[#f6f2ea]` : IVORY}`}>
                <dt className={`font-extrabold ${i === 0 ? "text-[#e0b79d]" : "text-[#2f4f43]"}`}>{t.title}</dt>
                <dd className={`mt-1 text-sm leading-7 ${i === 0 ? "text-[#f6f2ea]/80" : "text-[#586260]"}`}>{t.text}</dd>
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
                    <h3 className="font-extrabold text-[#2f4f43]">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#586260]">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#586260]">{airport.note}</p>
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
                    <h3 className="font-extrabold text-[#2f4f43]">{u.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#586260]">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-[#586260]">{umrah.note}</p>
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
            <li key={v.name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#d8c4a0]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <Qatt className="h-2" />
              <div className="flex flex-1 flex-col p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#2f4f43]">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#586260]">{v.text}</p>
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
              <li key={d.name} className={`rounded-xl border-l-4 border-[#b5603f] ${IVORY} p-4`}>
                <h3 className="font-extrabold text-[#2f4f43]">{d.name}</h3>
                <p className="text-sm leading-7 text-[#586260]">{d.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="font-display text-xl text-[#2f4f43]">{rich.pickupHeading}</h3>
            <p className="mt-2 text-sm text-[#586260]">{rich.pickupIntro}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-[#f6f2ea] px-4 py-2 text-sm font-bold text-[#2f4f43] ring-1 ring-[#d8c4a0] hover:bg-[#d8c4a0]">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-[#f6f2ea] px-4 py-2 text-sm font-bold text-[#2f4f43] ring-1 ring-[#d8c4a0]">{x.name}</span>
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
              <h3 className="font-extrabold text-[#2f4f43]">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#586260]">{w.text}</p>
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
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${PINE} font-extrabold text-[#e0b79d]`}>{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-[#2f4f43]">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#586260]">{s.text}</p>
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
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-2xl border border-[#d8c4a0] ${IVORY} p-5 transition hover:border-[#b5603f] hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-[#2f4f43]">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#586260]">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${TERRA_TXT} transition group-hover:translate-x-1`} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#586260]">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
      </Block>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className={`${PINE} text-[#f6f2ea]`}>
        <Qatt />
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center`}>
          <div>
            <h2 id="cta-title" className="font-display max-w-2xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
            <p className="mt-3 max-w-2xl text-lg text-[#f6f2ea]/80">{rich.ctaText}</p>
          </div>
          <Cta message={quote} className={`${btn} shrink-0 bg-[#d8c4a0] text-[#2f4f43] hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
