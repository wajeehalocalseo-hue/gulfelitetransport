import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Gulf coast business palette: marine navy #12304a, Gulf teal #2f7f84, sea-glass #cfe3dc, sand #e6d9bf, ivory #f7f5ef, graphite #2e3a40, copper #a8683a. */
const NAVY = "bg-[#12304a]";
const IVORY = "bg-[#f7f5ef]";
const GLASS = "bg-[#e3eeea]";
const SAND = "bg-[#efe6d2]";
const COPPER_TXT = "text-[#935a30]";
const link = "inline-flex items-center gap-2 font-bold text-[#12304a] underline decoration-[#a8683a] decoration-2 underline-offset-4 hover:text-[#2f7f84]";

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-[#f7f5ef]" : "text-[#2e3a40]"}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-[#e2b48c]" : COPPER_TXT}`}>
        <span aria-hidden="true" className="h-0.5 w-6 bg-current" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-[#f7f5ef]/80" : "text-[#55646b]"}`}>{lead}</p>}
    </div>
  );
}

/** Three thin wave lines, a quiet coastal detail. */
function Waves({ colour = "#2f7f84", className = "" }: { colour?: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className={`block h-10 w-full ${className}`}>
      {[0, 14, 28].map((y, i) => (
        <path key={y} d={`M0 ${24 + y} C 180 ${4 + y}, 360 ${44 + y}, 540 ${24 + y} S 900 ${4 + y}, 1080 ${24 + y} S 1300 ${40 + y}, 1440 ${24 + y}`} fill="none" stroke={colour} strokeWidth="1.5" opacity={0.55 - i * 0.15} />
      ))}
    </svg>
  );
}

export function RichJubailHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const dist = rich.facts.find((x) => x.label === "Approximate road distance")?.value ?? "";
  const time = rich.facts.find((x) => x.label === "Approximate driving time")?.value ?? "";
  return (
    <section className={`relative overflow-hidden ${GLASS} text-[#12304a]`}>
      <div className={`${wrap} relative pb-4 pt-14 sm:pt-20`}>
        <div className="[&_a]:text-[#12304a] [&_li]:text-[#12304a]/80 [&_nav]:text-[#12304a]/80 [&_span]:text-[#12304a]"><Breadcrumbs items={crumbs} /></div>
        <p className="mt-8 inline-flex rounded-md bg-[#12304a] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#e2b48c]">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#12304a]/85">{page.lead}</p>
        <div className="mt-6 flex max-w-xl flex-wrap items-center gap-3 text-sm font-extrabold">
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm ring-1 ring-[#2f7f84]/40">{dist}</span>
          <span className="rounded-full bg-white px-4 py-1.5 shadow-sm ring-1 ring-[#2f7f84]/40">{time}</span>
        </div>
        <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[#12304a]/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#2f7f84]" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 pb-4 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Jubail." className={`${btn} ${NAVY} text-white hover:brightness-125`}>Get a Free Quote</Cta>
          <Link href="#access" className={`${btn} border border-[#12304a]/40 text-[#12304a] hover:bg-white`}>Industrial City Access</Link>
        </div>
      </div>
      <Waves />
    </section>
  );
}

export function RichJubailBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Jubail.";
  const { terms, business, eastern, airport, cities, umrah, route } = rich;
  return (
    <div>
      {/* Route overview */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} py-8`}>
          <dl className="grid overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#d9cfb8] sm:grid-cols-2 lg:grid-cols-3">
            {rich.facts.map((x, i) => (
              <div key={x.label} className={`px-5 py-4 ${i % 3 ? "lg:border-l lg:border-[#e6d9bf]" : ""} ${i > 0 ? "border-t border-[#e6d9bf] lg:border-t-0" : ""} ${i > 2 ? "lg:border-t" : ""}`}>
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{x.label}</dt>
                <dd className="mt-0.5 font-bold text-[#12304a]">{x.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-[#55646b]">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg={IVORY}>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className="rounded-lg border-l-4 border-[#2f7f84] bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#55646b]">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#d9cfb8]">
            <ImageSlot folder={f} slot="gulf-coast" alt="The Arabian Gulf coast at Jubail" label="Jubail Gulf coast image" width={700} height={820} />
          </div>
        </div>
      </Block>

      {/* Old Jubail vs Industrial City: a real table */}
      {terms && (
        <Block id="areas" bg="bg-white">
          <Head id="areas" eyebrow="Choose the right area" lead={terms.intro}>{terms.heading}</Head>
          <div className="overflow-hidden rounded-xl ring-1 ring-[#d9cfb8]">
            <table className="w-full text-left">
              <thead className={`${NAVY} text-xs uppercase tracking-wider text-[#e2b48c]`}>
                <tr><th scope="col" className="px-5 py-3">Area</th><th scope="col" className="px-5 py-3">What it is and the travel context</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e6d9bf]">
                {terms.items.map((t, i) => (
                  <tr key={t.title} className={`align-top ${i % 2 ? IVORY : "bg-white"}`}>
                    <th scope="row" className="w-1/3 px-5 py-4 font-extrabold text-[#12304a]">{t.title}</th>
                    <td className="px-5 py-4 leading-7 text-[#55646b]">{t.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm font-semibold">{terms.note}</p>
        </Block>
      )}

      {/* Industrial City access: the key section */}
      {business && (
        <Block id="access" bg={NAVY} dark>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Head id="access" eyebrow="Business and site travel" dark lead={business.intro}>{business.heading}</Head>
              <div role="note" className="rounded-2xl border-2 border-[#a8683a] bg-[#a8683a]/15 p-5">
                <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#e2b48c]"><Icon name="check" className="h-4 w-4" /> Please note</p>
                <p className="mt-2 leading-7 text-[#f7f5ef]">{business.note}</p>
              </div>
              <Cta message={quote} className={`${btn} mt-5 bg-[#e2b48c] text-[#12304a] hover:brightness-95`}>Request a Business Quote</Cta>
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {business.items.map((b, i) => (
                <li key={b.title} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                  <span className="font-display text-2xl text-[#e2b48c]">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 font-extrabold text-[#f7f5ef]">{b.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#f7f5ef]/75">{b.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Block>
      )}

      {/* Why */}
      <Block id="why" bg={IVORY}>
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
              <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${NAVY} text-[#e2b48c]`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-[#12304a]">{w.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[#55646b]">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Destination mosaic */}
      {eastern && (
        <Block id="destinations" bg={SAND}>
          <Head id="destinations" eyebrow="Jubail destinations" lead={eastern.intro}>{eastern.heading}</Head>
          <div className="grid gap-5 lg:grid-cols-3">
            {eastern.items.map((d, i) => (
              <article key={d.name} className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-[#d9cfb8]`}>
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{d.detail}</p>
                <h3 className="mt-1 text-lg font-extrabold text-[#12304a]">{d.name}</h3>
                <p className="mt-2 text-sm leading-7 text-[#55646b]">{d.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="balad" alt="Jubail Balad, the old coastal town" label="Old Jubail image" width={800} height={340} /></div>
            <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="corniche" alt="Jubail Corniche and Al Fanateer waterfront" label="Jubail waterfront image" width={800} height={340} /></div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#55646b]">{eastern.note}</p>
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
                  <li key={a.title} className="border-l-2 border-[#a8683a] pl-4">
                    <h3 className="font-extrabold text-[#12304a]">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#55646b]">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#55646b]">{airport.note}</p>
              <Link href={airport.href} className={`${link} mt-4`}>King Fahd Airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#d9cfb8]">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="King Fahd International Airport image" width={640} height={600} />
            </div>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg={GLASS}>
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="flex flex-1 flex-col border-t-4 border-[#2f7f84] p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#12304a]">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#55646b]">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Jubail.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Neighbouring cities and families */}
      <Block id="nearby" bg={IVORY}>
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {cities && (
            <div>
              <Head id="nearby" eyebrow="The Gulf coast" lead={cities.intro}>{cities.heading}</Head>
              <ul className="space-y-3">
                {cities.items.map((c) => (
                  <li key={c.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e6d9bf]">
                    <h3 className="font-extrabold text-[#12304a]">{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : c.name}</h3>
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{c.detail}</p>
                    <p className="mt-1 text-sm leading-7 text-[#55646b]">{c.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-[#55646b]">{cities.note}</p>
            </div>
          )}
          {umrah && (
            <div>
              <Head id="family" eyebrow="Families and coastal visitors" lead={umrah.intro}>{umrah.heading}</Head>
              <ul className="space-y-3">
                {umrah.items.map((u) => (
                  <li key={u.title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e6d9bf]">
                    <h3 className="font-extrabold text-[#12304a]">{u.title}</h3>
                    <p className="text-sm leading-7 text-[#55646b]">{u.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm leading-7 text-[#55646b]">{umrah.note}</p>
            </div>
          )}
        </div>
      </Block>

      {/* Journey planning and map */}
      <Block id="plan" bg="bg-white">
        <Head id="plan" eyebrow="Journey planning" lead={route?.intro}>{route?.heading ?? rich.planHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <figure className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#d9cfb8]">
            <iframe
              title="Route map from Riyadh to Jubail"
              src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0"
            />
            <figcaption className="px-5 py-3 text-sm text-[#55646b]">Map of the route from Riyadh to Jubail. The driver chooses the best road on the day.</figcaption>
          </figure>
          <div>
            {route && (
              <ol className="relative space-y-4 border-l-2 border-[#2f7f84]/50 pl-6">
                {route.stops.map((s) => (
                  <li key={s.name} className="relative">
                    <span aria-hidden="true" className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full bg-[#a8683a] ring-4 ring-white" />
                    <p className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{s.detail}</p>
                    <h3 className="font-extrabold text-[#12304a]">{s.name}</h3>
                    <p className="text-sm leading-6 text-[#55646b]">{s.text}</p>
                  </li>
                ))}
              </ol>
            )}
            {route && <p className="mt-4 text-sm leading-7 text-[#55646b]">{route.note}</p>}
          </div>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {rich.plan.map((p) => (
            <li key={p.title} className={`rounded-xl ${IVORY} p-5`}>
              <h3 className="font-extrabold text-[#12304a]">{p.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#55646b]">{p.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-[#12304a]">{rich.dropHeading}</h3>
            <p className="mt-2 text-sm text-[#55646b]">{rich.dropIntro}</p>
            <ul className="mt-3 space-y-2">
              {rich.drops.map((d) => (
                <li key={d.name} className="text-sm leading-7 text-[#55646b]"><strong className="text-[#12304a]">{d.name}.</strong> {d.text}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-[#12304a]">{rich.pickupHeading}</h3>
            <p className="mt-2 text-sm text-[#55646b]">{rich.pickupIntro}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-[#f7f5ef] px-4 py-2 text-sm font-bold text-[#12304a] ring-1 ring-[#d9cfb8] hover:bg-[#e6d9bf]">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-[#f7f5ef] px-4 py-2 text-sm font-bold text-[#12304a] ring-1 ring-[#d9cfb8]">{x.name}</span>
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
            <li key={w.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-extrabold text-[#12304a]">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#55646b]">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg="bg-white">
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className={`rounded-xl ${GLASS} p-5`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${NAVY} font-extrabold text-[#e2b48c]`}>{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-[#12304a]">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#55646b]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${NAVY} text-white hover:brightness-125`}>Start Your Request</Cta>
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
              <Link href={r.href} className={`group flex h-full flex-col justify-between rounded-xl border border-[#d9cfb8] ${IVORY} p-5 transition hover:border-[#2f7f84] hover:shadow-md`}>
                <span>
                  <span className="block font-extrabold text-[#12304a]">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#55646b]">{r.text}</span>
                </span>
                <Icon name="arrow" className="mt-4 h-5 w-5 text-[#2f7f84] transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#55646b]">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
      </Block>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className={`${NAVY} text-[#f7f5ef]`}>
        <Waves colour="#e2b48c" className="opacity-70" />
        <div className={`${wrap} flex flex-col items-center gap-5 pb-14 pt-4 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-[#f7f5ef]/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-[#e2b48c] text-[#12304a] hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
