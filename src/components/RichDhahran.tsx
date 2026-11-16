import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import { Cta, btn, wrap } from "./RichRoute";
import type { PlacePage } from "@/content/saudi/types";
import type { RichRoute } from "@/content/saudi/rich-types";

/* Dhahran palette: petroleum navy #203744, teal #397B78, ivory #F5F3ED, sandstone grey #C6BDAF, graphite #333B40, copper #A77B53. */
const NAVY = "bg-[#203744]";
const IVORY = "bg-[#F5F3ED]";
const STONE = "bg-[#E7E3DA]";
const COPPER_TXT = "text-[#8b6240]";
const GRAPH = "text-[#333B40]";
const link = "inline-flex items-center gap-2 font-bold text-[#203744] underline decoration-[#A77B53] decoration-2 underline-offset-4 hover:text-[#397B78]";

function Block({ id, bg, children, dark = false }: { id: string; bg: string; children: ReactNode; dark?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`${bg} ${dark ? "text-[#F5F3ED]" : GRAPH}`}>
      <div className={`${wrap} py-14 sm:py-[4.5rem]`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, children, lead, dark = false, center = false }: { id: string; eyebrow: string; children: ReactNode; lead?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] ${dark ? "text-[#d9b48b]" : COPPER_TXT}`}>
        <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-current" /> {eyebrow}
      </p>
      <h2 id={`${id}-title`} className="font-display mt-3 text-3xl leading-tight sm:text-4xl">{children}</h2>
      {lead && <p className={`mt-4 text-lg leading-8 ${dark ? "text-[#F5F3ED]/80" : "text-[#58636a]"}`}>{lead}</p>}
    </div>
  );
}

export function RichDhahranHero({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  return (
    <section className={`relative overflow-hidden ${NAVY} text-[#F5F3ED]`}>
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-[#397B78]/30 lg:block" style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }} />
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#A77B53] via-[#397B78] to-transparent" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 inline-flex items-center gap-2 border-l-4 border-[#A77B53] pl-3 text-xs font-extrabold uppercase tracking-[0.18em] text-[#d9b48b]">{rich.eyebrow}</p>
        <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.1rem]">{page.h1}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F5F3ED]/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {rich.heroPoints.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-[#F5F3ED]/90">
              <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[#d9b48b]" /> {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Cta message="Hello, I would like a free quote for a taxi from Riyadh to Dhahran." className={`${btn} bg-[#d9b48b] text-[#203744] hover:brightness-95`}>Get a Free Quote</Cta>
          <Link href="#business" className={`${btn} border border-[#F5F3ED]/40 text-[#F5F3ED] hover:border-[#d9b48b] hover:text-[#d9b48b]`}>Business Travel</Link>
        </div>
      </div>
    </section>
  );
}

export function RichDhahranBody({ page, rich }: { page: PlacePage; rich: RichRoute }) {
  const f = rich.imageFolder;
  const quote = "Hello, I would like a quote for a taxi from Riyadh to Dhahran.";
  const { business, sites, eastern, cities, airport, terms, route } = rich;
  const get = (l: string) => rich.facts.find((x) => x.label === l)?.value ?? "";
  return (
    <div>
      {/* Slim route strip */}
      <section aria-label="Route overview" className={IVORY}>
        <div className={`${wrap} py-8`}>
          <dl className="flex flex-wrap items-stretch divide-x divide-[#C6BDAF] rounded-xl bg-white shadow-sm ring-1 ring-[#C6BDAF]/60">
            {[
              { l: "Route", v: `${get("Origin")} to Dhahran` },
              { l: "Road distance (estimate)", v: get("Approximate road distance") },
              { l: "Driving time (estimate)", v: get("Approximate driving time") },
              { l: "Main road", v: get("Main road") },
              { l: "Service", v: "Both directions" },
            ].map((c) => (
              <div key={c.l} className="min-w-[10rem] flex-1 px-5 py-4">
                <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{c.l}</dt>
                <dd className="mt-0.5 font-extrabold text-[#203744]">{c.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs leading-5 text-[#58636a]">{rich.factsNote}</p>
        </div>
      </section>

      {/* Introduction */}
      <Block id="about" bg={IVORY}>
        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Head id="about" eyebrow="About this route">{rich.introHeading}</Head>
            <p className="rounded-lg border-l-4 border-[#397B78] bg-white p-5 text-lg font-medium leading-8 shadow-sm">{page.directAnswer}</p>
            <div className="mt-6 space-y-4 text-lg leading-8 text-[#58636a]">
              {rich.intro.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#C6BDAF]/60" style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%)" }}>
            <ImageSlot folder={f} slot="dhahran" alt="Modern architecture in Dhahran, Eastern Province" label="Dhahran cityscape image" width={700} height={780} />
          </div>
        </div>
      </Block>

      {/* Why */}
      <Block id="why" bg="bg-white">
        <Head id="why" eyebrow="Why a private taxi">{rich.whyHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.why.map((w, i) => (
            <li key={w.title} className={`rounded-lg ${IVORY} p-5`}>
              <span className={`font-display text-3xl ${COPPER_TXT}`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 font-extrabold text-[#203744]">{w.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#58636a]">{w.text}</p>
            </li>
          ))}
        </ul>
      </Block>

      {/* Business and energy-sector travel */}
      {business && (
        <Block id="business" bg={NAVY} dark>
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-28">
              <Head id="business" eyebrow="Energy and business" dark lead={business.intro}>{business.heading}</Head>
              <p className="rounded-xl border border-[#d9b48b]/40 p-5 text-sm leading-7 text-[#F5F3ED]/85">{business.note}</p>
              <Cta message={quote} className={`${btn} mt-5 bg-[#d9b48b] text-[#203744] hover:brightness-95`}>Request a Business Quote</Cta>
            </div>
            <ol className="space-y-4">
              {business.items.map((b, i) => (
                <li key={b.title} className="flex gap-5 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                  <span className="font-display text-4xl leading-none text-[#d9b48b]">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-extrabold text-[#F5F3ED]">{b.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#F5F3ED]/75">{b.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Block>
      )}

      {/* KFUPM and Ithra, side by side */}
      {(sites || eastern) && (
        <Block id="campus" bg={STONE}>
          <div className="grid gap-8 lg:grid-cols-2">
            {sites && (
              <article className="overflow-hidden rounded-2xl bg-white shadow-md">
                <ImageSlot folder={f} slot={sites.slot} alt={sites.alt} label="KFUPM campus image" width={800} height={340} />
                <div className="p-6">
                  <Head id="kfupm" eyebrow="University" lead={sites.intro}>{sites.heading}</Head>
                  <ul className="space-y-3">
                    {sites.items.map((s) => (
                      <li key={s.title} className="border-l-2 border-[#A77B53] pl-4">
                        <h3 className="font-extrabold text-[#203744]">{s.title}</h3>
                        <p className="text-sm leading-7 text-[#58636a]">{s.text}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-7 text-[#58636a]">{sites.note}</p>
                </div>
              </article>
            )}
            {eastern && (
              <article className="overflow-hidden rounded-2xl bg-white shadow-md">
                <ImageSlot folder={f} slot="ithra" alt="Ithra, the King Abdulaziz Center for World Culture in Dhahran" label="Ithra image" width={800} height={340} />
                <div className="p-6">
                  <Head id="ithra" eyebrow="Culture" lead={eastern.intro}>{eastern.heading}</Head>
                  <ul className="space-y-3">
                    {eastern.items.map((d) => (
                      <li key={d.name} className="border-l-2 border-[#397B78] pl-4">
                        <h3 className="font-extrabold text-[#203744]">{d.name}</h3>
                        <p className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{d.detail}</p>
                        <p className="text-sm leading-7 text-[#58636a]">{d.text}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm leading-7 text-[#58636a]">{eastern.note}</p>
                </div>
              </article>
            )}
          </div>
        </Block>
      )}

      {/* Three cities diagram */}
      {cities && (
        <Block id="cities" bg="bg-white">
          <Head id="cities" eyebrow="Choose the right city" lead={cities.intro}>{cities.heading}</Head>
          <div aria-hidden="true" className="mb-6 hidden items-center gap-3 md:flex">
            <span className="rounded-md bg-[#E7E3DA] px-4 py-2 text-sm font-extrabold text-[#203744]">Dammam</span>
            <span className="h-0 flex-1 border-t-2 border-dashed border-[#A77B53]" />
            <span className={`rounded-md ${NAVY} px-5 py-2.5 text-sm font-extrabold text-[#F5F3ED] ring-4 ring-[#d9b48b]/50`}>Dhahran</span>
            <span className="h-0 flex-1 border-t-2 border-dashed border-[#A77B53]" />
            <span className="rounded-md bg-[#E7E3DA] px-4 py-2 text-sm font-extrabold text-[#203744]">Al Khobar</span>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {cities.items.map((c, i) => (
              <li key={c.name} className={`rounded-xl p-6 ${i === 0 ? `${NAVY} text-[#F5F3ED]` : `${IVORY}`}`}>
                <h3 className={`text-xl font-extrabold ${i === 0 ? "text-[#d9b48b]" : "text-[#203744]"}`}>{c.href ? <Link href={c.href} className={link}>{c.name}</Link> : c.name}</h3>
                <p className={`mt-1 text-xs font-extrabold uppercase tracking-wider ${i === 0 ? "text-[#F5F3ED]/60" : COPPER_TXT}`}>{c.detail}</p>
                <p className={`mt-3 text-sm leading-7 ${i === 0 ? "text-[#F5F3ED]/80" : "text-[#58636a]"}`}>{c.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#58636a]">{cities.note}</p>
        </Block>
      )}

      {/* Airport */}
      {airport && (
        <Block id="airport" bg={IVORY}>
          <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#C6BDAF]/60">
              <ImageSlot folder={f} slot={airport.slot} alt={airport.alt} label="King Fahd International Airport image" width={640} height={640} />
            </div>
            <div>
              <Head id="airport" eyebrow="Airport transfers" lead={airport.intro}>{airport.heading}</Head>
              <ul className="space-y-4">
                {airport.items.map((a) => (
                  <li key={a.title} className="rounded-lg bg-white p-4 shadow-sm">
                    <h3 className="font-extrabold text-[#203744]">{a.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[#58636a]">{a.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-[#58636a]">{airport.note}</p>
              <Link href={airport.href} className={`${link} mt-4`}>King Fahd Airport taxi page <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </div>
        </Block>
      )}

      {/* Vehicles */}
      <Block id="vehicles" bg="bg-white">
        <Head id="vehicles" eyebrow="Vehicles" lead={rich.vehiclesIntro}>{rich.vehiclesHeading}</Head>
        <ul className="grid gap-5 md:grid-cols-2">
          {rich.vehicles.map((v) => (
            <li key={v.name} className="flex gap-4 rounded-xl border border-[#E7E3DA] p-4">
              <div className="w-32 shrink-0 overflow-hidden rounded-lg sm:w-40">
                <ImageSlot folder={f} slot={v.slot} homePhoto={v.homePhoto} alt={v.alt} label={v.name} width={800} height={500} sizes="10rem" />
              </div>
              <div>
                <p className={`text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{v.best}</p>
                <h3 className="text-lg font-extrabold text-[#203744]">{v.name}</h3>
                <p className="text-sm leading-6 text-[#58636a]">{v.text}</p>
                <Cta message={`Hello, I would like to ask about a ${v.name} from Riyadh to Dhahran.`} className={`${link} mt-2 text-sm`}>Ask about this vehicle <Icon name="arrow" className="h-4 w-4" /></Cta>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* What to send, and the road with the map */}
      <Block id="plan" bg={STONE}>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            {terms && (
              <>
                <Head id="plan" eyebrow="Journey planning and access" lead={terms.intro}>{terms.heading}</Head>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {terms.items.map((t) => (
                    <li key={t.title} className="rounded-lg bg-white p-4 shadow-sm">
                      <h3 className="font-extrabold text-[#203744]">{t.title}</h3>
                      <p className="text-sm leading-6 text-[#58636a]">{t.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold leading-7">{terms.note}</p>
              </>
            )}
          </div>
          <figure className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#C6BDAF]/60">
            <iframe
              title="Route map from Riyadh to Dhahran"
              src={`https://maps.google.com/maps?saddr=${encodeURIComponent(rich.mapQuery.from)}&daddr=${encodeURIComponent(rich.mapQuery.to)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full border-0"
            />
            <figcaption className="px-5 py-3 text-sm text-[#58636a]">Map of the route from Riyadh to Dhahran. The driver chooses the best road on the day.</figcaption>
          </figure>
        </div>
        {route && (
          <div className="mt-10">
            <h3 className="font-display text-2xl text-[#203744]">{route.heading}</h3>
            <p className="mt-2 max-w-3xl text-[#58636a]">{route.intro}</p>
            <ol className="mt-5 grid gap-4 md:grid-cols-4">
              {route.stops.map((s, i) => (
                <li key={s.name} className="rounded-lg bg-white p-4 shadow-sm">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full ${NAVY} text-sm font-extrabold text-[#d9b48b]`}>{i + 1}</span>
                  <p className={`mt-2 text-[11px] font-extrabold uppercase tracking-wider ${COPPER_TXT}`}>{s.detail}</p>
                  <h4 className="font-extrabold text-[#203744]">{s.name}</h4>
                  <p className="text-sm leading-6 text-[#58636a]">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#58636a]">{route.note}</p>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {rich.plan.map((p) => (
                <li key={p.title} className="border-l-4 border-[#397B78] pl-4">
                  <h4 className="font-extrabold text-[#203744]">{p.title}</h4>
                  <p className="text-sm leading-7 text-[#58636a]">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <h3 className="mt-10 font-display text-xl text-[#203744]">{rich.pickupHeading}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {rich.pickups.map((x) => (
            <li key={x.name}>
              {x.href ? (
                <Link href={x.href} className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#203744] ring-1 ring-[#C6BDAF] hover:bg-[#d9b48b]">{x.name}</Link>
              ) : (
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#203744] ring-1 ring-[#C6BDAF]">{x.name}</span>
              )}
            </li>
          ))}
        </ul>
      </Block>

      {/* Who */}
      <Block id="who" bg="bg-white">
        <Head id="who" eyebrow="Who uses it" center>{rich.whoHeading}</Head>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rich.who.map((w) => (
            <li key={w.title} className={`flex gap-3 rounded-lg ${IVORY} p-5`}>
              <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${NAVY} text-[#d9b48b]`}><Icon name="check" className="h-4 w-4" /></span>
              <div>
                <h3 className="font-extrabold text-[#203744]">{w.title}</h3>
                <p className="text-sm leading-7 text-[#58636a]">{w.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      {/* Steps */}
      <Block id="how" bg={IVORY}>
        <Head id="how" eyebrow="Booking" center>{rich.stepsHeading}</Head>
        <ol className="grid gap-4 md:grid-cols-5">
          {rich.steps.map((s, i) => (
            <li key={s.title} className="relative rounded-lg bg-white p-5 shadow-sm" style={{ clipPath: "polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%)" }}>
              <span className={`font-display text-3xl ${COPPER_TXT}`}>{i + 1}</span>
              <h3 className="mt-1 font-extrabold text-[#203744]">{s.title}</h3>
              <p className="mt-1 pr-4 text-sm leading-6 text-[#58636a]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Cta message={quote} className={`${btn} ${NAVY} text-[#F5F3ED] hover:brightness-125`}>Start Your Request</Cta>
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
              <Link href={r.href} className="group flex h-full flex-col justify-between rounded-xl border border-[#C6BDAF]/60 bg-white p-5 transition hover:border-[#397B78] hover:shadow-md">
                <span>
                  <span className="block font-extrabold text-[#203744]">{r.name}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#58636a]">{r.text}</span>
                </span>
                <Icon name="arrow" className="mt-4 h-5 w-5 text-[#397B78] transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-[#58636a]">
          More pages: <Link href="/taxi-saudi-arabia/routes" className={link}>All intercity routes in Saudi Arabia</Link>{" · "}
          <Link href="/services/taxi-cab-services" className={link}>Taxi and cab services</Link>{" · "}
          <Link href="/contact" className={link}>Contact us</Link>
        </p>
      </Block>

      {/* Final call to action */}
      <section aria-labelledby="cta-title" className={`relative overflow-hidden ${NAVY} text-[#F5F3ED]`}>
        <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-1/3 bg-[#397B78]/25 lg:block" style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }} />
        <div className={`${wrap} relative flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center`}>
          <div className="lg:pl-[28%]">
            <h2 id="cta-title" className="font-display max-w-2xl text-3xl sm:text-4xl">{rich.ctaHeading}</h2>
            <p className="mt-3 max-w-2xl text-lg text-[#F5F3ED]/80">{rich.ctaText}</p>
          </div>
          <Cta message={quote} className={`${btn} shrink-0 bg-[#d9b48b] text-[#203744] hover:brightness-95`}>{rich.ctaButton}</Cta>
        </div>
      </section>
    </div>
  );
}
