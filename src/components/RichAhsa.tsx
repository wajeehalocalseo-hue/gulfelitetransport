import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Al-Ahsa palette: palm green, date-palm brown, sandstone and ivory. */
const PALM = "bg-[#1f4a2c]";
const BROWN = "text-[#5b3a22]";
const STONE = "bg-[#e6d8b6]";
const IVORY = "bg-[#fbf6ea]";
const GOLDTXT = "text-[#8c6a24]";
const link = "inline-flex items-center gap-2 font-bold text-[#1f4a2c] underline decoration-[#b08a3c] decoration-2 underline-offset-4 hover:text-[#8c6a24]";

/** A row of arches, a quiet nod to the arcades of Hofuf's old town. */
function Arches({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex w-full justify-center gap-3 overflow-hidden ${className}`}>
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="h-10 w-10 shrink-0 rounded-t-full border-2 border-b-0 border-current" />
      ))}
    </div>
  );
}

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-[#fbf6ea]" : "text-[#2a2a1e]"}`}>
      <div className={`${wrap} py-16 sm:py-20`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-[#e3c283]" : GOLDTXT}`}>{eyebrow}</p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      <span aria-hidden="true" className={`mt-4 block h-1 w-16 rounded-full ${center ? "mx-auto" : ""} ${dark ? "bg-[#e3c283]" : "bg-[#b08a3c]"}`} />
      {lead && <p className={`mt-5 text-lg leading-8 ${dark ? "text-[#fbf6ea]/80" : "text-[#5a5a46]"}`}>{lead}</p>}
    </div>
  );
}

export function RichAhsaHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${PALM} text-[#fbf6ea]`}>
      <div className="absolute inset-x-0 bottom-0 text-[#e3c283]/25"><Arches /></div>
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#b08a3c]/20 blur-3xl" />
      <div className={`${wrap} relative py-14 pb-24 sm:py-20 sm:pb-28`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-flex rounded-t-full border border-[#e3c283]/60 px-6 pb-1.5 pt-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#e3c283]">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.3rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#fbf6ea]/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[#fbf6ea]/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#e3c283]" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Al Hofuf." className={`${btn} bg-[#e3c283] text-[#1f4a2c] hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#heritage" className={`${btn} border border-[#fbf6ea]/40 text-[#fbf6ea] hover:border-[#e3c283] hover:text-[#e3c283]`}>Al-Ahsa Destinations</Link>
        </div>
      </div>
    </section>
  );
}

export function RichAhsaBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Al Hofuf.";
  const { terms, eastern, umrah, business, airport, railway, route, cities } = rich;
  const get = (l: string) => rich.facts.find((x) => x.label === l)?.value ?? "";
  return (
    <div>
      {/* Route overview: four ticket cells */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} py-10`}>
          <dl className="grid overflow-hidden rounded-2xl border border-[#b08a3c]/50 bg-white shadow-md sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: "From", v: get("Origin") },
              { l: "To", v: get("Destination") },
              { l: "Road distance (estimate)", v: get("Approximate road distance") },
              { l: "Driving time (estimate)", v: get("Approximate driving time") },
            ].map((c, i) => (
              <div key={c.l} className={`px-6 py-5 ${i > 0 ? "border-t border-dashed border-[#b08a3c]/50 sm:border-l sm:border-t-0" : ""}`}>
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${GOLDTXT}`}>{c.l}</dt>
                <dd className="mt-1 text-lg font-extrabold text-[#1f4a2c]">{c.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm font-semibold text-[#3a3a2a]">{get("Service")} · {get("Direction")}</p>
          <p className="mt-2 text-xs leading-5 text-[#5a5a46]">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction, with the place-name guide beside it */}
      <Block id="about" bg="bg-white">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className={`border-l-4 border-[#b08a3c] ${IVORY} p-5 text-lg font-medium leading-8 ${BROWN}`}>{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#5a5a46]">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          {terms && (
            <aside aria-labelledby="terms-title" className={`rounded-t-[4rem] rounded-b-3xl ${STONE} px-7 pb-8 pt-12`}>
              <h3 id="terms-title" className={`font-display text-2xl ${BROWN}`}>{terms.heading}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4a4a38]">{terms.intro}</p>
              <dl className="mt-5 space-y-4">
                {terms.items.map((t) => (
                  <div key={t.title}>
                    <dt className="font-extrabold text-[#1f4a2c]">{t.title}</dt>
                    <dd className="text-sm leading-7 text-[#4a4a38]">{t.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-sm font-semibold leading-7 text-[#3a3a2a]">{terms.note}</p>
            </aside>
          )}
        </div>
      </Block>

      {/* Why */}
      <Block id="why" bg={IVORY}>
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.why.map((w) => (
            <li key={w.title} className="rounded-t-[3rem] rounded-b-2xl border border-[#e6d8b6] bg-white px-5 pb-5 pt-8">
              <h3 className="font-extrabold text-[#1f4a2c]">{w.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5a5a46]">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Heritage and nature destinations */}
      {eastern && (
        <Block id="heritage" bg={PALM} dark>
          <Head id="heritage" eyebrow="Al-Ahsa Oasis" dark lead={eastern.intro}>{eastern.heading}</Head>
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-5 lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-t-[8rem] rounded-b-3xl ring-1 ring-[#e3c283]/40">
                <ImageSlot folder={f} slot="oasis" alt="Palm groves of the Al-Ahsa Oasis near Al Hofuf" label="Al-Ahsa palm oasis image" width={640} height={720} />
              </div>
              <p className="text-sm leading-7 text-[#fbf6ea]/75">{eastern.note}</p>
            </div>
            <ul className="space-y-3">
              {eastern.items.map((d, i) => (
                <li key={d.name} className="grid gap-1 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:grid-cols-[2.5rem_1fr]">
                  <span className="font-display text-2xl text-[#e3c283]">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#fbf6ea]">{d.href ? <Link href={d.href} className="underline decoration-[#e3c283] underline-offset-4">{d.name}</Link> : d.name}</h3>
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#e3c283]">{d.detail}</p>
                    <p className="mt-1 text-sm leading-7 text-[#fbf6ea]/80">{d.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Block>
      )}

      {/* Family and heritage travel */}
      {umrah && (
        <Block id="family" bg="bg-white">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="family" eyebrow="Family and heritage visits" lead={umrah.intro}>{umrah.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {umrah.items.map((u) => (
                  <li key={u.title} className={`rounded-2xl ${IVORY} p-5`}>
                    <h3 className="font-extrabold text-[#1f4a2c]">{u.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-[#5a5a46]">{umrah.note}</p>
              <Cta message={quote} className={`${btn} mt-5 ${PALM} text-[#fbf6ea] hover:brightness-110`}>Request a Family Quote</Cta>
            </div>
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-3xl shadow-xl">
              <ImageSlot folder={f} slot={umrah.slot} alt={umrah.alt} label="Family and heritage travel image" width={640} height={800} />
            </div>
          </div>
        </Block>
      )}

      {/* Business */}
      {business && (
        <Block id="business" bg={STONE}>
          <Head id="business" eyebrow="For work trips" lead={business.intro}>{business.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-2">
            {business.items.map((b) => (
              <li key={b.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1f4a2c]">{b.title}</h3>
                <p className="mt-1 leading-7 text-[#5a5a46]">{b.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-[#3a3a2a]">{business.note}</p>
          <Cta message={quote} className={`${btn} mt-5 ${PALM} text-[#fbf6ea] hover:brightness-110`}>Request a Business Quote</Cta>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg={IVORY}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-t-[2.5rem] rounded-b-2xl bg-white shadow-md ring-1 ring-[#e6d8b6]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="flex flex-1 flex-col p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${GOLDTXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#1f4a2c]">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#5a5a46]">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Al Hofuf.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Arrival in Al-Ahsa */}
      <Block id="drop" bg="bg-white">
        <Head id="drop" eyebrow="Arriving in Al-Ahsa" lead={rich.dropIntro}>{rich.dropHeading}</Head>
        <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {rich.drops.map((d) => (
                <li key={d.name} className={`rounded-2xl border-l-4 border-[#b08a3c] ${IVORY} p-5`}>
                  <h3 className="font-extrabold text-[#1f4a2c]">{d.name}</h3>
                  <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{d.text}</p>
                </li>
              ))}
            </ul>
            {rich.dropNote && <p role="note" className={`mt-5 rounded-2xl ${STONE} p-5 text-sm font-semibold leading-7 ${BROWN}`}>{rich.dropNote}</p>}
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <ImageSlot folder={f} slot="hofuf" alt={rich.dropAlt} label="Al Hofuf city image" width={700} height={640} />
          </div>
        </div>
      </Block>

      {/* Airport and railway */}
      {(airport || railway) && (
        <Block id="airport" bg={STONE}>
          <div className="grid gap-8 lg:grid-cols-2">
            {airport && (
              <div className="rounded-3xl bg-white p-7 shadow-md">
                <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Al-Ahsa airport image" width={800} height={400} />
                </div>
                <ul className="space-y-4">
                  {airport.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-[#b08a3c] pl-4">
                      <h3 className="font-extrabold text-[#1f4a2c]">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[#5a5a46]">{airport.note}</p>
                <Link href={airport.href} className={`${link} mt-4`}>Al-Ahsa airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
            {railway && (
              <div className="rounded-3xl bg-white p-7 shadow-md">
                <Head id="railway" eyebrow="Railway connection" lead={railway.intro}>{railway.heading}</Head>
                <ul className="space-y-4">
                  {railway.items.map((a) => (
                    <li key={a.title} className="border-l-2 border-[#b08a3c] pl-4">
                      <h3 className="font-extrabold text-[#1f4a2c]">{a.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{a.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[#5a5a46]">{railway.note}</p>
                <Link href={railway.href} className={`${link} mt-4`}>{railway.linkLabel} <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
        </Block>
      )}

      {/* Route planning */}
      {route && (
        <Block id="plan" bg={IVORY}>
          <Head id="plan" eyebrow="Journey planning" lead={route.intro}>{route.heading}</Head>
          <ol className="grid gap-5 md:grid-cols-4">
            {route.stops.map((s, i) => (
              <li key={s.name} className="relative rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#e6d8b6]">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full ${PALM} text-sm font-extrabold text-[#e3c283]`}>{i + 1}</span>
                <p className={`mt-3 text-[11px] font-extrabold uppercase tracking-wider ${GOLDTXT}`}>{s.detail}</p>
                <h3 className="font-extrabold text-[#1f4a2c]">{s.name}</h3>
                <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#5a5a46]">{route.note}</p>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <ul className="space-y-4">
                {rich.plan.map((p) => (
                  <li key={p.title} className="border-l-4 border-[#b08a3c] pl-5">
                    <h3 className="font-extrabold text-[#1f4a2c]">{p.title}</h3>
                    <p className="mt-1 leading-7 text-[#5a5a46]">{p.text}</p>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-display text-xl text-[#1f4a2c]">{rich.pickupHeading}</h3>
              <p className="mt-2 text-sm text-[#5a5a46]">{rich.pickupIntro}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {rich.pickups.map((x) => (
                  <li key={x.name}>
                    {x.href ? (
                      <Link href={x.href} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1f4a2c] ring-1 ring-[#b08a3c]/40 hover:bg-[#e3c283]">{x.name}</Link>
                    ) : (
                      <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1f4a2c] ring-1 ring-[#b08a3c]/40">{x.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#e6d8b6]">
              <iframe
                title="Route map from Riyadh to Al Hofuf"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
              <figcaption className="px-5 py-3 text-sm text-[#5a5a46]">Map of the route from Riyadh to Al Hofuf. The driver chooses the best road on the day.</figcaption>
            </figure>
          </div>
        </Block>
      )}

      {/* Nearby places */}
      {cities && (
        <Block id="cities" bg="bg-white">
          <Head id="cities" eyebrow="Beyond Hofuf" lead={cities.intro}>{cities.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-3">
            {cities.items.map((c) => (
              <li key={c.name} className={`rounded-2xl border-t-4 border-[#b08a3c] ${IVORY} p-6`}>
                <h3 className="text-xl font-extrabold text-[#1f4a2c]">{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : c.name}</h3>
                <p className={`mt-1 text-xs font-extrabold uppercase tracking-wider ${GOLDTXT}`}>{c.detail}</p>
                <p className="mt-3 text-sm leading-7 text-[#5a5a46]">{c.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#5a5a46]">{cities.note}</p>
        </Block>
      )}

      {/* Who */}
      <Block id="who" bg={IVORY}>
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${PALM} text-[#e3c283]`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-[#1f4a2c]">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg={STONE}>
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <span className={`font-display text-4xl leading-none ${GOLDTXT}`}>{i + 1}</span>
              <div>
                <h3 className="font-extrabold text-[#1f4a2c]">{s.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#5a5a46]">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${PALM} text-[#fbf6ea] hover:brightness-110`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* Related */}
      <Block id="related" bg="bg-white">
        <Head id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-2xl border border-[#e6d8b6] ${IVORY} p-5 transition hover:border-[#b08a3c] hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-[#1f4a2c]">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#5a5a46]">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${GOLDTXT} transition group-hover:translate-x-1`} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#5a5a46]">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
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

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className={`relative overflow-hidden ${PALM} text-[#fbf6ea]`}>
        <div className="absolute inset-x-0 top-0 text-[#e3c283]/20"><Arches className="rotate-180" /></div>
        <div className={`${wrap} relative flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center`}>
          <div>
            <h2 id="cta-title" className="font-display max-w-2xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
            <p className="mt-3 max-w-2xl text-lg text-[#fbf6ea]/80">{rich.ctaText}</p>
          </div>
          <Cta message={quote} className={`${btn} shrink-0 bg-[#e3c283] text-[#1f4a2c] hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
