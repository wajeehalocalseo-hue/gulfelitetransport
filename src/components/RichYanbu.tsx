import Link from "next/link";
import { useId } from "react";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Red Sea coast and heritage port palette: deep Red Sea blue #0d3447, marine teal #2d6f78, coral-stone #e8dcc4, warm sand #f1e7d3, ivory #faf7f0, charcoal #25282a, terracotta #b2593a. */
const SEA = "bg-[#0d3447]";
const IVORY = "bg-[#faf7f0]";
const STONE = "bg-[#ebe0c9]";
const SAND = "bg-[#f3eadb]";
const CHAR = "bg-[#25282a]";
const TERRA_TXT = "text-[#a34e30]";
const link = "inline-flex items-center gap-2 font-bold text-[#0d3447] underline decoration-[#b2593a] decoration-2 underline-offset-4 hover:text-[#2d6f78]";

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-[#faf7f0]" : "text-[#25282a]"}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-[#e8a98c]" : TERRA_TXT}`}>
        <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-current" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-[#faf7f0]/80" : "text-[#555c5e]"}`}>{lead}</p>}
    </div>
  );
}

/** A quiet lattice, echoing the carved wooden balconies of old Yanbu. */
function Lattice({ colour = "#ffffff", opacity = 0.07, className = "" }: { colour?: string; opacity?: number; className?: string }) {
  const id = useId();
  return (
    <svg aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M22 0 L44 22 L22 44 L0 22 Z" fill="none" stroke={colour} strokeWidth="1" />
          <circle cx="22" cy="22" r="3" fill="none" stroke={colour} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function RichYanbuHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const dist = rich.facts.find((x) => x.label === "Approximate road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Approximate driving time")?.value ?? "";
  return (
    <section className={`relative overflow-hidden ${SEA} text-[#faf7f0]`}>
      <Lattice />
      <div className={`${wrap} relative grid grid-cols-1 items-center gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr] [&>*]:min-w-0`}>
        <div>
          <div className="[&_a]:text-[#faf7f0] [&_li]:text-[#faf7f0]/80 [&_nav]:text-[#faf7f0]/80 [&_span]:text-[#faf7f0]"><Breadcrumbs items={crumbs} /></div>
          <p className="mt-8 inline-flex rounded-md bg-[#b2593a] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white">{rich.eyebrow}</p>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#faf7f0]/85">{page.lead}</p>
          <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {rich.heroPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[#faf7f0]/90">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#e8a98c]" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Yanbu." className={`${btn} bg-[#e8a98c] text-[#0d3447] hover:brightness-95`}>Get a Free Quote</Cta>
            <Link href="#areas" className={`${btn} border border-white/40 text-white hover:bg-white/10`}>Three Areas of Yanbu</Link>
          </div>
        </div>
        {/* Route card in coral-stone with an arched top */}
        <div className="mx-auto w-full max-w-sm rounded-t-[8rem] rounded-b-2xl bg-[#ebe0c9] px-7 pb-7 pt-14 text-[#0d3447] shadow-2xl ring-4 ring-white/10">
          <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#a34e30]">Route summary</p>
          <p className="font-display mt-3 text-center text-3xl leading-tight">Riyadh <span aria-hidden="true" className="text-[#b2593a]">→</span> Yanbu</p>
          <div className="mt-6 space-y-3 border-t border-[#0d3447]/20 pt-5 text-center">
            <p><span className="block text-xs font-bold uppercase tracking-wider text-[#555c5e]">Road distance</span><span className="text-xl font-extrabold">{dist}</span></p>
            <p><span className="block text-xs font-bold uppercase tracking-wider text-[#555c5e]">Driving time</span><span className="text-xl font-extrabold">{time}</span></p>
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-[#555c5e]">Estimates, without stops. Breaks and traffic add time.</p>
        </div>
      </div>
    </section>
  );
}

export function RichYanbuBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Yanbu.";
  const { terms, business, eastern, airport, cities, umrah, route, heritage, market, sites } = rich;
  return (
    <div>
      {/* Route overview */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} py-8`}>
          <dl className="grid overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#d8cdb4] sm:grid-cols-2 lg:grid-cols-3">
            {rich.facts.map((x, i) => (
              <div key={x.label} className={`px-5 py-4 ${i % 3 ? "lg:border-l lg:border-[#e3d8c0]" : ""} ${i > 0 ? "border-t border-[#e3d8c0] lg:border-t-0" : ""} ${i > 2 ? "lg:border-t" : ""}`}>
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{x.label}</dt>
                <dd className="mt-0.5 font-bold text-[#0d3447]">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-[#555c5e]">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg={IVORY}>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className="rounded-lg border-l-4 border-[#2d6f78] bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#555c5e]">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-t-[10rem] rounded-b-2xl shadow-xl ring-1 ring-[#d8cdb4]">
            <ImageSlot folder={f} slot="red-sea" alt="The Red Sea coast at Yanbu" label="Yanbu Red Sea image" width={700} height={820} />
          </div>
        </div>
      </Block>

      {/* The three areas of Yanbu */}
      {terms && (
        <Block id="areas" bg={STONE}>
          <Head id="areas" eyebrow="Choose the right Yanbu" lead={terms.intro}>{terms.heading}</Head>
          <ol className="grid gap-6 lg:grid-cols-3">
            {terms.items.map((t, i) => (
              <li key={t.title} className="relative rounded-t-[4rem] rounded-b-2xl bg-white px-6 pb-6 pt-12 shadow-md ring-1 ring-[#d8cdb4]">
                <span className={`absolute left-1/2 top-4 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full ${SEA} font-extrabold text-[#e8a98c]`}>{i + 1}</span>
                <h3 className="text-center text-xl font-extrabold text-[#0d3447]">{t.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#555c5e]">{t.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-3xl text-sm font-semibold">{terms.note}</p>
        </Block>
      )}

      {/* Why */}
      <Block id="why" bg={IVORY}>
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm ring-1 ring-[#e3d8c0]">
              <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${SEA} text-[#e8a98c]`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-[#0d3447]">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#555c5e]">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Heritage */}
      {heritage && (
        <Block id="heritage" bg={SAND}>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Head id="heritage" eyebrow="Historic Yanbu" lead={heritage.intro}>{heritage.heading}</Head>
              <div className="overflow-hidden rounded-t-[8rem] rounded-b-2xl shadow-lg ring-1 ring-[#d8cdb4]">
                <ImageSlot folder={f} slot={heritage.slot} alt={heritage.alt} label="Old town of Yanbu image" width={640} height={620} />
              </div>
            </div>
            <div>
              <ul className="space-y-4 lg:mt-24">
                {heritage.items.map((h) => (
                  <li key={h.name} className="rounded-xl border-l-4 border-[#b2593a] bg-white p-5 shadow-sm">
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{h.detail}</p>
                    <h3 className="mt-1 text-lg font-extrabold text-[#0d3447]">{h.name}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#555c5e]">{h.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-[#555c5e]">{heritage.note}</p>
            </div>
          </div>
        </Block>
      )}

      {/* Waterfront and Red Sea */}
      {eastern && (
        <Block id="destinations" bg={SEA} dark>
          <div className="relative">
            <Head id="destinations" eyebrow="Waterfront and Red Sea" dark lead={eastern.intro}>{eastern.heading}</Head>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {eastern.items.map((d) => (
                <article key={d.name} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/15">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#e8a98c]">{d.detail}</p>
                  <h3 className="mt-1 text-lg font-extrabold">{d.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#faf7f0]/75">{d.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="corniche" alt="The Yanbu Corniche and waterfront" label="Yanbu waterfront image" width={800} height={340} /></div>
              <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="marine" alt="The Red Sea reef off Yanbu, a diving and snorkelling area" label="Red Sea marine image" width={800} height={340} /></div>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#faf7f0]/75">{eastern.note}</p>
          </div>
        </Block>
      )}

      {/* Industrial City: the key business section */}
      {business && (
        <Block id="access" bg={CHAR} dark>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Head id="access" eyebrow="Business and site travel" dark lead={business.intro}>{business.heading}</Head>
              <div role="note" className="rounded-2xl border-2 border-[#b2593a] bg-[#b2593a]/15 p-5">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#e8a98c]"><Icon name="check" className="h-4 w-4" /> Please note</p>
                <p className="mt-2 leading-7 text-[#faf7f0]">{business.note}</p>
              </div>
              <Cta message={quote} className={`${btn} mt-5 bg-[#e8a98c] text-[#25282a] hover:brightness-95`}>Request a Business Quote</Cta>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {business.items.map((b, i) => (
                <li key={b.title} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="font-display text-2xl text-[#e8a98c]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-extrabold text-[#faf7f0]">{b.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#faf7f0]/75">{b.text}</p>
                </li>
              ))}
            </ol>
          </div>
          {market && (
            <div id="port" className="mt-12 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 sm:p-8">
              <h3 className="font-display text-2xl text-[#faf7f0]">{market.heading}</h3>
              <p className="mt-2 max-w-3xl leading-7 text-[#faf7f0]/75">{market.intro}</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {market.items.map((m) => (
                  <li key={m.title} className="border-l-2 border-[#b2593a] pl-4">
                    <h4 className="font-extrabold text-[#faf7f0]">{m.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-[#faf7f0]/75">{m.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#e8a98c]">{market.note}</p>
            </div>
          )}
        </Block>
      )}

      {/* Yanbu Al-Nakhl */}
      {sites && (
        <Block id="nakhl" bg={IVORY}>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#d8cdb4]">
              <ImageSlot folder={f} slot={sites.slot} alt={sites.alt} label="Yanbu Al-Nakhl image" width={640} height={560} />
            </div>
            <div>
              <Head id="nakhl" eyebrow="Inland Yanbu" lead={sites.intro}>{sites.heading}</Head>
              <ul className="grid gap-4 sm:grid-cols-2">
                {sites.items.map((s) => (
                  <li key={s.title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e3d8c0]">
                    <h3 className="font-extrabold text-[#0d3447]">{s.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#555c5e]">{s.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-7 text-[#555c5e]">{sites.note}</p>
            </div>
          </div>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg={STONE}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
              <ul className="space-y-4">
                {airport.items.map((a) => (
                  <li key={a.title} className="border-l-2 border-[#b2593a] pl-4">
                    <h3 className="font-extrabold text-[#0d3447]">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#555c5e]">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#555c5e]">{airport.note}</p>
              <Link href={airport.href} className={`${link} mt-4`}>Yanbu Airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#d8cdb4]">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="Yanbu Airport image" width={640} height={600} />
            </div>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg={IVORY}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-[#e3d8c0]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="flex flex-1 flex-col border-t-4 border-[#2d6f78] p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#0d3447]">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#555c5e]">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Yanbu.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Nearby cities and families */}
      <Block id="nearby" bg={SAND}>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {cities && (
            <div>
              <Head id="nearby" eyebrow="The west coast" lead={cities.intro}>{cities.heading}</Head>
              <ul className="space-y-3">
                {cities.items.map((c) => (
                  <li key={c.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e3d8c0]">
                    <h3 className="font-extrabold text-[#0d3447]">{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : c.name}</h3>
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{c.detail}</p>
                    <p className="mt-1 text-sm leading-7 text-[#555c5e]">{c.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-[#555c5e]">{cities.note}</p>
            </div>
          )}
          {umrah && (
            <div>
              <Head id="family" eyebrow="Families and holiday visitors" lead={umrah.intro}>{umrah.heading}</Head>
              <ul className="space-y-3">
                {umrah.items.map((u) => (
                  <li key={u.title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e3d8c0]">
                    <h3 className="font-extrabold text-[#0d3447]">{u.title}</h3>
                    <p className="text-sm leading-7 text-[#555c5e]">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-[#555c5e]">{umrah.note}</p>
            </div>
          )}
        </div>
      </Block>

      {/* Journey planning and map */}
      <Block id="plan" bg="bg-white">
        <Head id="plan" eyebrow="Journey planning" lead={route?.intro}>{route?.heading ?? rich.planHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <figure className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#d8cdb4]">
            <iframe
              title="Route map from Riyadh to Yanbu"
              src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0"
            />
            <figcaption className="px-5 py-3 text-sm text-[#555c5e]">Map of the route from Riyadh to Yanbu. The driver chooses the best road on the day.</figcaption>
          </figure>
          <div>
            {route && (
              <ol className="relative space-y-4 border-l-2 border-[#2d6f78]/50 pl-6">
                {route.stops.map((s) => (
                  <li key={s.name} className="relative">
                    <span aria-hidden="true" className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rotate-45 bg-[#b2593a] ring-4 ring-white" />
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${TERRA_TXT}`}>{s.detail}</p>
                    <h3 className="font-extrabold text-[#0d3447]">{s.name}</h3>
                    <p className="text-sm leading-6 text-[#555c5e]">{s.text}</p>
                  </li>
                ))}
              </ol>
            )}
            {route && <p className="mt-4 text-sm leading-7 text-[#555c5e]">{route.note}</p>}
          </div>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {rich.plan.map((p) => (
            <li key={p.title} className={`rounded-xl ${IVORY} p-5 ring-1 ring-[#e3d8c0]`}>
              <h3 className="font-extrabold text-[#0d3447]">{p.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#555c5e]">{p.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-[#0d3447]">{rich.dropHeading}</h3>
            <p className="mt-2 text-sm text-[#555c5e]">{rich.dropIntro}</p>
            <ul className="mt-3 space-y-2">
              {rich.drops.map((d) => (
                <li key={d.name} className="text-sm leading-7 text-[#555c5e]"><strong className="text-[#0d3447]">{d.name}.</strong> {d.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-[#0d3447]">{rich.pickupHeading}</h3>
            <p className="mt-2 text-sm text-[#555c5e]">{rich.pickupIntro}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-[#faf7f0] px-4 py-2 text-sm font-bold text-[#0d3447] ring-1 ring-[#d8cdb4] hover:bg-[#ebe0c9]">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-[#faf7f0] px-4 py-2 text-sm font-bold text-[#0d3447] ring-1 ring-[#d8cdb4]">{x.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      {/* Who */}
      <Block id="who" bg={STONE}>
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#0d3447]">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#555c5e]">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg="bg-white">
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className={`rounded-xl ${SAND} p-5`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${SEA} font-extrabold text-[#e8a98c]`}>{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-[#0d3447]">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#555c5e]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${SEA} text-white hover:brightness-125`}>Start Your Request</Cta>
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
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-xl border border-[#d8cdb4] ${IVORY} p-5 transition hover:border-[#2d6f78] hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-[#0d3447]">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#555c5e]">{r.text}</span>
                </span>
                <Icon name="arrow" className="mt-4 h-5 w-5 text-[#2d6f78] transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#555c5e]">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
      </Block>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className={`relative overflow-hidden ${SEA} text-[#faf7f0]`}>
        <Lattice />
        <div className={`${wrap} relative flex flex-col items-center gap-5 py-14 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-[#faf7f0]/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-[#e8a98c] text-[#0d3447] hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
