import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Gulf coast palette: navy #17354A, teal #477E83, sand #D5C3A2, ivory #F7F5EF, charcoal #28343A, mist #E8EEF0, bronze #A98255. */
const NAVY = "bg-[#17354A]";
const IVORY = "bg-[#F7F5EF]";
const MIST = "bg-[#E8EEF0]";
const TEAL_TXT = "text-[#3a6b70]";
const BRONZE_TXT = "text-[#8a6a43]";
const link = "inline-flex items-center gap-2 font-bold text-[#17354A] underline decoration-[#A98255] decoration-2 underline-offset-4 hover:text-[#3a6b70]";

/** A soft wave, used as the edge of the hero and of the final call to action. */
function Wave({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className={`block h-12 w-full sm:h-16 ${flip ? "rotate-180" : ""}`}>
      <path fill={fill} d="M0 80 L0 40 C160 80 320 0 480 30 C640 60 800 80 960 40 C1120 0 1280 20 1440 50 L1440 80 Z" />
    </svg>
  );
}

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-[#F7F5EF]" : "text-[#28343A]"}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-[#D5C3A2]" : TEAL_TXT}`}>{eyebrow}</p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-[#F7F5EF]/80" : "text-[#52606a]"}`}>{lead}</p>}
    </div>
  );
}

function ExtLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

export function RichKhobarHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${NAVY} text-[#F7F5EF]`}>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#17354A] via-[#17354A] to-[#2a5a63]" />
      <div className={`${wrap} relative pb-6 pt-14 sm:pt-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-flex rounded-full bg-[#477E83]/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#D5C3A2] ring-1 ring-[#D5C3A2]/40">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.1rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F7F5EF]/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[#F7F5EF]/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#D5C3A2]" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Al Khobar." className={`${btn} bg-[#D5C3A2] text-[#17354A] hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#airport" className={`${btn} border border-[#F7F5EF]/40 text-[#F7F5EF] hover:border-[#D5C3A2] hover:text-[#D5C3A2]`}>Airport Transfers</Link>
        </div>
      </div>
      <Wave fill="#F7F5EF" />
    </section>
  );
}

export function RichKhobarBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Al Khobar.";
  const { terms, route, eastern, business, cities, airport, causeway } = rich;
  const get = (l: string) => rich.facts.find((x) => x.label === l)?.value ?? "";
  return (
    <div>
      {/* Route panel */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} pb-10`}>
          <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-[#D5C3A2]/60 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div className={`${NAVY} px-6 py-5 text-[#F7F5EF]`}>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#D5C3A2]">Route</p>
              <p className="font-display mt-1 text-2xl">{get("Origin")} to Al Khobar</p>
              <p className="mt-1 text-sm text-[#F7F5EF]/75">{get("Main road")}</p>
            </div>
            {[
              { l: "Road distance (estimate)", v: get("Approximate road distance") },
              { l: "Driving time (estimate)", v: get("Approximate driving time") },
              { l: "Service", v: get("Service") },
            ].map((c) => (
              <div key={c.l} className="border-t border-[#E8EEF0] px-6 py-5 md:border-l md:border-t-0">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE_TXT}`}>{c.l}</p>
                <p className="mt-1 text-lg font-extrabold text-[#17354A]">{c.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#52606a]">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction and the three cities */}
      <Block id="about" bg={IVORY}>
        <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="rounded-xl border-l-4 border-[#477E83] bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#52606a]">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#D5C3A2]/60">
            <ImageSlot folder={f} slot="waterfront" alt="Al Khobar skyline and the Arabian Gulf waterfront" label="Al Khobar waterfront image" width={700} height={620} />
          </div>
        </div>
        {terms && (
          <div className="mt-12">
            <h3 className="font-display text-2xl text-[#17354A]">{terms.heading}</h3>
            <p className="mt-2 max-w-3xl text-[#52606a]">{terms.intro}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {terms.items.map((t, i) => (
                <div key={t.title} className={`rounded-2xl p-5 ${i === 0 ? `${NAVY} text-[#F7F5EF]` : "bg-white shadow-sm ring-1 ring-[#E8EEF0]"}`}>
                  <dt className={`font-extrabold ${i === 0 ? "text-[#D5C3A2]" : "text-[#17354A]"}`}>{t.title}</dt>
                  <dd className={`mt-1 text-sm leading-7 ${i === 0 ? "text-[#F7F5EF]/80" : "text-[#52606a]"}`}>{t.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm font-semibold">{terms.note}</p>
          </div>
        )}
      </Block>

      {/* Why */}
      <Block id="why" bg="bg-white">
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w) => (
            <li key={w.title} className="border-t-2 border-[#477E83] pt-4">
              <h3 className="text-lg font-extrabold text-[#17354A]">{w.title}</h3>
              <p className="mt-1 leading-7 text-[#52606a]">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* The road, with the map */}
      {route && (
        <Block id="plan" bg={MIST}>
          <Head id="plan" eyebrow="The road to the coast" lead={route.intro}>{route.heading}</Head>
          <ol className="relative grid gap-5 md:grid-cols-4">
            <span aria-hidden="true" className="absolute left-4 right-4 top-[1.15rem] hidden h-0.5 bg-[#477E83]/50 md:block" />
            {route.stops.map((s, i) => (
              <li key={s.name} className="relative">
                <span className={`relative flex h-9 w-9 items-center justify-center rounded-full ${NAVY} text-sm font-extrabold text-[#D5C3A2] ring-4 ring-[#E8EEF0]`}>{i + 1}</span>
                <p className={`mt-3 text-[11px] font-extrabold uppercase tracking-wider ${BRONZE_TXT}`}>{s.detail}</p>
                <h3 className="font-extrabold text-[#17354A]">{s.name}</h3>
                <p className="mt-1 text-sm leading-7 text-[#52606a]">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#52606a]">{route.note}</p>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <figure className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-[#D5C3A2]/60">
              <iframe
                title="Route map from Riyadh to Al Khobar"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[4/3] w-full border-0"
              />
              <figcaption className="px-5 py-3 text-sm text-[#52606a]">Map of the route from Riyadh to Al Khobar. The driver chooses the best road on the day.</figcaption>
            </figure>
            <ul className="space-y-4">
              {rich.plan.map((p) => (
                <li key={p.title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold text-[#17354A]">{p.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-[#52606a]">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Block>
      )}

      {/* Business travel */}
      {business && (
        <Block id="business" bg={NAVY} dark>
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Head id="business" eyebrow="For work trips" dark lead={business.intro}>{business.heading}</Head>
              <p className="text-sm leading-7 text-[#F7F5EF]/75">{business.note}</p>
              <Cta message={quote} className={`${btn} mt-5 bg-[#D5C3A2] text-[#17354A] hover:brightness-95`}>Request a Business Quote</Cta>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {business.items.map((b) => (
                <li key={b.title} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                  <h3 className="font-extrabold text-[#D5C3A2]">{b.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#F7F5EF]/80">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Block>
      )}

      {/* Destination guide */}
      {eastern && (
        <Block id="destinations" bg={IVORY}>
          <Head id="destinations" eyebrow="Al Khobar" lead={eastern.intro}>{eastern.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {eastern.items.map((d) => (
              <li key={d.name} className="rounded-2xl border-t-4 border-[#477E83] bg-white p-5 shadow-sm">
                <h3 className="text-lg font-extrabold text-[#17354A]">{d.name}</h3>
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE_TXT}`}>{d.detail}</p>
                <p className="mt-2 text-sm leading-7 text-[#52606a]">{d.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="corniche" alt="Al Khobar Corniche and the Water Tower" label="Al Khobar Corniche image" width={800} height={380} /></div>
            <div className="overflow-hidden rounded-2xl"><ImageSlot folder={f} slot="half-moon-bay" alt="Half Moon Bay, a coastal destination south of Al Khobar" label="Half Moon Bay image" width={800} height={380} /></div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#52606a]">{eastern.note}</p>
        </Block>
      )}

      {/* Dammam and Dhahran */}
      {cities && (
        <Block id="cities" bg="bg-white">
          <Head id="cities" eyebrow="The wider area" lead={cities.intro}>{cities.heading}</Head>
          <ul className="grid gap-5 md:grid-cols-3">
            {cities.items.map((c) => (
              <li key={c.name} className={`rounded-2xl ${MIST} p-6`}>
                <h3 className="text-xl font-extrabold text-[#17354A]">{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : c.name}</h3>
                <p className={`mt-1 text-xs font-extrabold uppercase tracking-wider ${BRONZE_TXT}`}>{c.detail}</p>
                <p className="mt-3 text-sm leading-7 text-[#52606a]">{c.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#52606a]">{cities.note}</p>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg={MIST}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
              <ul className="space-y-4">
                {airport.items.map((a) => (
                  <li key={a.title} className="border-l-2 border-[#A98255] pl-4">
                    <h3 className="font-extrabold text-[#17354A]">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#52606a]">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#52606a]">{airport.note}</p>
              <Link href={airport.href} className={`${link} mt-4`}>King Fahd Airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-[#D5C3A2]/60">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="King Fahd International Airport image" width={640} height={640} />
            </div>
          </div>
        </Block>
      )}

      {/* Causeway: an important notice */}
      {causeway && (
        <Block id="causeway" bg={IVORY}>
          <div className="rounded-3xl border-2 border-[#A98255] bg-white p-7 shadow-md sm:p-10">
            <Head id="causeway" eyebrow="Important: Bahrain" lead={causeway.intro}>{causeway.heading}</Head>
            <ul className="grid gap-5 md:grid-cols-3">
              {causeway.items.map((c) => (
                <li key={c.title} className={`rounded-2xl ${IVORY} p-5 ring-1 ring-[#D5C3A2]/60`}>
                  <h3 className="font-extrabold text-[#17354A]">{c.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#52606a]">{c.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#52606a]">{causeway.note}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="font-bold text-[#17354A]">Official and related:</span>
              {causeway.links.map((l) => (
                <ExtLink key={l.href} href={l.href} className={link}>{l.name}</ExtLink>
              ))}
            </p>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg="bg-white">
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#E8EEF0]">
              <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={`Vehicle image: ${v.name}`} width={800} height={500} sizes="(min-width: 1024px) 25vw, 100vw" />
              <div className="flex flex-1 flex-col border-t-4 border-[#477E83] p-5">
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${BRONZE_TXT}`}>{v.best}</p>
                <h3 className="mt-1 text-xl font-extrabold text-[#17354A]">{v.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-[#52606a]">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Al Khobar.`} className={`${link} mt-4 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Arrival and pickups */}
      <Block id="drop" bg={IVORY}>
        <Head id="drop" eyebrow="Your addresses" lead={rich.dropIntro}>{rich.dropHeading}</Head>
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {rich.drops.map((d) => (
              <li key={d.name} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#E8EEF0]">
                <h3 className="font-extrabold text-[#17354A]">{d.name}</h3>
                <p className="text-sm leading-7 text-[#52606a]">{d.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="font-display text-xl text-[#17354A]">{rich.pickupHeading}</h3>
            <p className="mt-2 text-sm text-[#52606a]">{rich.pickupIntro}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {rich.pickups.map((x) => (
                <li key={x.name}>
                  {x.href ? (
                    <Link href={x.href} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#17354A] ring-1 ring-[#D5C3A2] hover:bg-[#D5C3A2]">{x.name}</Link>
                  ) : (
                    <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#17354A] ring-1 ring-[#D5C3A2]">{x.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>

      {/* Who */}
      <Block id="who" bg="bg-white">
        <Head id="who" eyebrow="Who travels this route" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className={`rounded-2xl ${MIST} p-5`}>
              <h3 className="font-extrabold text-[#17354A]">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#52606a]">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg={MIST}>
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-5 shadow-sm">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${NAVY} font-extrabold text-[#D5C3A2]`}>{i + 1}</span>
              <h3 className="mt-3 font-extrabold text-[#17354A]">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#52606a]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${NAVY} text-[#F7F5EF] hover:brightness-125`}>Start Your Request</Cta>
        </div>
      </Block>

      {/* FAQ */}
      <Block id="faq" bg="bg-white">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28">
            <Head id="faq" eyebrow="Questions">{rich.faqHeading}</Head>
            <Cta message={quote} className={link}>Ask for your quote <Icon name="arrow" className="h-4 w-4" /></Cta>
          </div>
          <FaqList items={rich.faq.map((x) => ({ q: x.q, a: x.a }))} />
        </div>
      </Block>

      {/* Related */}
      <Block id="related" bg={IVORY}>
        <Head id="related" eyebrow="More routes and pages">{rich.relatedHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rich.related.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-[#D5C3A2]/60 bg-white p-5 transition hover:border-[#477E83] hover:shadow-md">
                <span>
                  <span className="block font-extrabold text-[#17354A]">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#52606a]">{r.text}</span>
                </span>
                <Icon name="arrow" className={`mt-4 h-5 w-5 ${TEAL_TXT} transition group-hover:translate-x-1`} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#52606a]">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
      </Block>

      {/* Final call to action, under a wave */}
      <section aria-labelledby="cta-title" className={`${NAVY} text-[#F7F5EF]`}>
        <div className="bg-[#F7F5EF]"><Wave fill="#17354A" flip /></div>
        <div className={`${wrap} flex flex-col items-center gap-5 pb-16 pt-4 text-center`}>
          <h2 id="cta-title" className="font-display max-w-3xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
          <p className="max-w-2xl text-lg text-[#F7F5EF]/80">{rich.ctaText}</p>
          <Cta message={quote} className={`${btn} bg-[#D5C3A2] text-[#17354A] hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
