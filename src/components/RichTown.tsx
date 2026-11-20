import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import LazyMap from "./LazyMap";
import { Band, Title, arrowLink, btn, wrap } from "./RichRoute";
import { LocalBand } from "./SectionBands";
import { WhatsAppIcon, waPill } from "./WhatsApp";
import type { PlacePage } from "@/content/saudi/types";
import type { TownRich, TownSectionId } from "@/content/saudi/town-routes/types";

/**
 * The Riyadh Region town route pages (Riyadh to Al Majma'ah, Al Dawadmi and the rest). One component, six styles (town.style):
 * the hero, the way each block is presented and the order of the blocks all change with the style, so the pages do not look alike.
 * Colours are always the site's own tokens. Photos are reserved slots: public/images/routes/<town.imageFolder>/<slot>.webp with the
 * slots hero, highway, riyadh and destination (a labelled placeholder of the same size shows until a photo is added).
 */

type P = { page: PlacePage; t: TownRich };

const folder = (t: TownRich) => t.imageFolder;
const frame = "overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy/10";

function Contact({ t, tone = "dark" }: { t: TownRich; tone?: "dark" | "light" }) {
  const secondary = tone === "dark" ? "border border-white/35 text-white hover:border-accent hover:text-accent" : "border border-navy/30 text-navy hover:border-accent hover:bg-accent/10";
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {t.contact.outUrl && (
        <a href={t.contact.outUrl} target="_blank" rel="noopener noreferrer" className={waPill}>
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp: Riyadh to {t.toName}
        </a>
      )}
      {t.contact.backUrl && (
        <a href={t.contact.backUrl} target="_blank" rel="noopener noreferrer" className={`${btn} ${secondary}`}>
          {t.toName} to Riyadh
        </a>
      )}
      <Link href="/book" className={`${btn} ${secondary}`}>
        Or use the booking form
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ heroes */

export function TownHero({ page, town: t }: { page: PlacePage; town: TownRich }) {
  const crumbs = page.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const title = (cls: string) => <h1 className={`font-display ${cls}`}>{page.h1}</h1>;

  if (t.style === "journey")
    return (
      <section className="bg-ivory">
        <div className={`${wrap} py-14 sm:py-20`}>
          <Breadcrumbs items={crumbs} tone="light" />
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-gold">{t.eyebrow}</p>
          {title("mt-4 max-w-3xl text-4xl leading-[1.1] text-navy sm:text-5xl")}
          <div className="mt-8 flex max-w-2xl items-center gap-3 text-navy" aria-label={`Route from Riyadh to ${t.toName}`}>
            <span className="font-extrabold">Riyadh</span>
            <span aria-hidden="true" className="h-0.5 flex-1 bg-accent" />
            <span className="rounded-full bg-accent px-4 py-1 text-sm font-extrabold">about {Math.round(t.km)} km</span>
            <span aria-hidden="true" className="h-0.5 flex-1 bg-accent" />
            <span className="font-extrabold">{t.toName}</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{page.lead}</p>
          <ul className="mt-6 grid max-w-2xl gap-2.5 sm:grid-cols-2">
            {t.heroPoints.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm font-semibold text-navy"><Icon name="check" className="h-4 w-4 shrink-0 text-gold" /> {p}</li>
            ))}
          </ul>
          <div className="mt-8"><Contact t={t} tone="light" /></div>
        </div>
      </section>
    );

  if (t.style === "editorial")
    return (
      <section className="bg-navy text-white">
        <div className={`${wrap} py-14 sm:py-20`}>
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-accent">{t.eyebrow}</p>
          {title("mt-4 max-w-3xl text-4xl leading-[1.08] sm:text-6xl")}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{page.lead}</p>
          <div className={`${frame} mt-8 max-w-3xl`}>
            <ImageSlot folder={folder(t)} slot="hero" alt={t.heroAlt} label={`Hero image: Riyadh to ${t.toName}`} width={1000} height={420} priority sizes="(min-width: 1100px) 45vw, 100vw" />
          </div>
          <div className="mt-8"><Contact t={t} /></div>
        </div>
      </section>
    );

  if (t.style === "split")
    return (
      <section className="bg-navy text-white">
        <div className={`${wrap} py-14 sm:py-20`}>
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 border-l-8 border-accent pl-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-accent">{t.eyebrow}</p>
            {title("mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl")}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{page.lead}</p>
          </div>
          <ul className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {t.heroPoints.map((p) => (
              <li key={p} className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-semibold"><Icon name="check" className="h-5 w-5 shrink-0 text-accent" /> {p}</li>
            ))}
          </ul>
          <div className="mt-8"><Contact t={t} /></div>
        </div>
      </section>
    );

  if (t.style === "board")
    return (
      <section className="bg-navy-2 text-white">
        <div className={`${wrap} py-14 sm:py-20`}>
          <Breadcrumbs items={crumbs} />
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-accent">{t.eyebrow}</p>
          {title("mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl")}
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/15 ring-1 ring-white/15 sm:grid-cols-4">
            {[["From", "Riyadh"], ["To", t.toName], ["Distance", `about ${Math.round(t.km)} km`], ["Drive", `about ${t.min} min`]].map(([k, v]) => (
              <div key={k} className="bg-navy px-4 py-4">
                <dt className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{k}</dt>
                <dd className="mt-1 text-lg font-extrabold">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{page.lead}</p>
          <div className="mt-8"><Contact t={t} /></div>
        </div>
      </section>
    );

  if (t.style === "ledger")
    return (
      <section className="bg-white">
        <div className={`${wrap} py-14 sm:py-20`}>
          <Breadcrumbs items={crumbs} tone="light" />
          <div className="mt-8 grid gap-8 border-l-8 border-accent pl-6 lg:max-w-3xl">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">{t.eyebrow}</p>
              {title("mt-4 text-4xl leading-[1.1] text-navy sm:text-5xl")}
              <p className="mt-5 text-lg leading-8 text-muted">{page.lead}</p>
            </div>
            <ol className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-ivory">
              {t.heroPoints.map((p, i) => (
                <li key={p} className="flex items-center gap-4 px-5 py-3.5 text-sm font-semibold text-navy">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-extrabold">{i + 1}</span>{p}
                </li>
              ))}
            </ol>
            <Contact t={t} tone="light" />
          </div>
        </div>
      </section>
    );

  // road: a full-width photo behind the text
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <ImageSlot folder={folder(t)} slot="hero" alt={t.heroAlt} label={`Hero image: Riyadh to ${t.toName}`} width={1600} height={900} fill priority sizes="100vw" className="opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/50" />
      <div className={`${wrap} relative py-14 sm:py-20`}>
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-accent">{t.eyebrow}</p>
        {title("mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]")}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{page.lead}</p>
        <ul className="mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-2">
          {t.heroPoints.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm font-semibold text-white/90"><Icon name="check" className="h-4 w-4 shrink-0 text-accent" /> {p}</li>
          ))}
        </ul>
        <div className="mt-9"><Contact t={t} /></div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- sections */

function Facts({ t }: { t: TownRich }) {
  const dark = t.style === "board" || t.style === "split";
  return (
    <section aria-label="Route information" className={dark ? "bg-navy-2 text-white" : "border-b border-navy/10 bg-white"}>
      <div className={`${wrap} py-8`}>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {t.facts.map((x) => (
            <div key={x.label} className="border-l-2 border-accent pl-4">
              <dt className={`text-[11px] font-extrabold uppercase tracking-wider ${dark ? "text-accent" : "text-muted"}`}>{x.label}</dt>
              <dd className={`mt-1 font-bold leading-snug ${dark ? "text-white" : "text-navy"}`}>{x.value}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-5 text-xs leading-5 ${dark ? "text-white/70" : "text-muted"}`}>{t.factsNote}</p>
      </div>
    </section>
  );
}

function Intro({ page, t }: P) {
  const img = (slot: string, alt: string, label: string, w: number, h: number) => (
    <div className={frame}><ImageSlot folder={folder(t)} slot={slot} alt={alt} label={label} width={w} height={h} sizes="(min-width: 1024px) 40vw, 100vw" /></div>
  );
  const text = (
    <div>
      <Title id="about" eyebrow="About this route">{t.introHeading}</Title>
      <p className="rounded-2xl border-l-4 border-accent bg-surface p-5 text-lg font-medium leading-8 text-navy">{page.directAnswer}</p>
      <div className="mt-6 space-y-4 text-lg leading-8 text-muted">{t.intro.map((p) => <p key={p.slice(0, 26)}>{p}</p>)}</div>
    </div>
  );
  const highway = img("highway", t.highwayAlt, "Saudi highway image", 800, 640);
  const hero = img("hero", t.heroAlt, `Hero image: Riyadh to ${t.toName}`, 800, 420);
  if (t.style === "journey" || t.style === "ledger")
    return <Band id="about"><div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">{highway}{text}</div></Band>;
  if (t.style === "editorial")
    return <Band id="about" tone="surface"><div className="mx-auto max-w-4xl">{text}<div className="mt-10">{highway}</div></div></Band>;
  if (t.style === "board")
    return <Band id="about"><div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">{text}<div className="grid gap-6">{highway}{hero}</div></div></Band>;
  if (t.style === "split")
    return <Band id="about"><div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">{text}{highway}</div></Band>;
  return <Band id="about"><div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">{text}{highway}</div></Band>;
}

function Both({ t }: P) {
  const panels = [
    { n: "01", label: `Riyadh to ${t.toName}`, ...t.out },
    { n: "02", label: `${t.toName} to Riyadh`, ...t.back },
  ];
  const body = (x: (typeof panels)[number]) => (
    <>
      <h3 className="text-xl font-extrabold text-navy">{x.heading}</h3>
      <div className="mt-3 space-y-3 leading-7 text-muted">{x.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
    </>
  );
  const head = <Title id="both" eyebrow="Both directions on one page" lead={`The road distance is the same either way, about ${Math.round(t.km)} km. One request can cover the trip out, the trip back or both.`}>{`Riyadh to ${t.toName} and back`}</Title>;
  if (t.style === "journey")
    return (
      <Band id="both" tone="surface">
        {head}
        <ol className="max-w-3xl border-l-2 border-accent pl-8">
          {panels.map((x) => (
            <li key={x.n} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.9rem] flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-accent">{x.n}</span>
              <p className="text-xs font-extrabold uppercase tracking-wider text-gold">{x.label}</p>
              {body(x)}
            </li>
          ))}
        </ol>
      </Band>
    );
  if (t.style === "editorial")
    return (
      <Band id="both">
        {head}
        <div className="grid gap-10 md:grid-cols-2">
          {panels.map((x) => (
            <div key={x.n} className="border-t-4 border-accent pt-6">
              <span className="font-display text-6xl text-gold">{x.n}</span>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-muted">{x.label}</p>
              {body(x)}
            </div>
          ))}
        </div>
      </Band>
    );
  if (t.style === "board" || t.style === "ledger")
    return (
      <Band id="both" tone="surface">
        {head}
        <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Distance and drive time in both directions</caption>
            <thead className="bg-navy text-white"><tr><th scope="col" className="px-4 py-3">Direction</th><th scope="col" className="px-4 py-3">Distance</th><th scope="col" className="px-4 py-3">Light traffic</th></tr></thead>
            <tbody className="divide-y divide-navy/10">
              {panels.map((x) => (<tr key={x.n}><th scope="row" className="px-4 py-3 font-bold text-navy">{x.label}</th><td className="px-4 py-3 text-muted">about {Math.round(t.km)} km</td><td className="px-4 py-3 text-muted">about {t.min} min</td></tr>))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">{panels.map((x) => <div key={x.n}>{body(x)}</div>)}</div>
      </Band>
    );
  if (t.style === "split")
    return (
      <Band id="both" tone="surface">
        {head}
        <div className="grid gap-6 md:grid-cols-2">
          {panels.map((x) => (
            <article key={x.n} className="rounded-3xl bg-navy p-7 text-white">
              <p className="text-xs font-extrabold uppercase tracking-wider text-accent">{x.label}</p>
              <h3 className="mt-2 text-xl font-extrabold">{x.heading}</h3>
              <div className="mt-3 space-y-3 leading-7 text-white/80">{x.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
            </article>
          ))}
        </div>
      </Band>
    );
  return (
    <Band id="both" tone="surface">
      {head}
      <div className="grid gap-8 md:grid-cols-2">
        {panels.map((x) => (
          <article key={x.n} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-navy/10">
            <p className="text-xs font-extrabold uppercase tracking-wider text-gold">{x.label}</p>
            <div className="mt-2">{body(x)}</div>
          </article>
        ))}
      </div>
    </Band>
  );
}

function List({ items, style, id }: { items: { name: string; text: string }[]; style: TownRich["style"]; id: string }) {
  if (style === "board")
    return (
      <div className="space-y-3">
        {items.map((x) => (
          <details key={x.name} className="group rounded-2xl border border-navy/10 bg-white p-5 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold text-navy">{x.name}<Icon name="arrow" className="h-4 w-4 shrink-0 text-accent transition group-open:rotate-90" /></summary>
            <p className="mt-3 leading-7 text-muted">{x.text}</p>
          </details>
        ))}
      </div>
    );
  if (style === "ledger")
    return (
      <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{id}</caption>
          <tbody className="divide-y divide-navy/10">
            {items.map((x) => (<tr key={x.name} className="align-top"><th scope="row" className="w-1/3 px-4 py-3 font-bold text-navy">{x.name}</th><td className="px-4 py-3 leading-7 text-muted">{x.text}</td></tr>))}
          </tbody>
        </table>
      </div>
    );
  if (style === "journey" || style === "editorial")
    return (
      <ol className="divide-y divide-navy/10 border-y border-navy/10">
        {items.map((x, i) => (
          <li key={x.name} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]">
            <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
            <div><h3 className="font-extrabold text-navy">{x.name}</h3><p className="mt-1 leading-7 text-muted">{x.text}</p></div>
          </li>
        ))}
      </ol>
    );
  if (style === "split")
    return (
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((x) => (
          <li key={x.name} className="rounded-2xl border-t-4 border-accent bg-white p-5 shadow-sm ring-1 ring-navy/10"><h3 className="font-extrabold text-navy">{x.name}</h3><p className="mt-1 text-sm leading-6 text-muted">{x.text}</p></li>
        ))}
      </ul>
    );
  return (
    <ul className="grid gap-4">
      {items.map((x) => (
        <li key={x.name} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10"><h3 className="text-lg font-extrabold text-navy">{x.name}</h3><p className="mt-1 leading-7 text-muted">{x.text}</p></li>
      ))}
    </ul>
  );
}

function Pickups({ t }: P) {
  const flip = t.style === "editorial" || t.style === "split";
  return (
    <Band id="pickup" tone="surface">
      <div className={`grid items-start gap-12 ${flip ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}>
        <div className={`${flip ? "lg:order-2" : ""} lg:sticky lg:top-28`}>
          <Title id="pickup" eyebrow="Starting in Riyadh" lead={t.pickupIntro}>{t.pickupHeading}</Title>
          <div className={frame}><ImageSlot folder={folder(t)} slot="riyadh" alt={t.pickupAlt} label="Riyadh city image" width={800} height={600} sizes="(min-width: 1024px) 35vw, 100vw" /></div>
        </div>
        <div className={flip ? "lg:order-1" : ""}><List items={t.pickups} style={t.style} id="Pickup points in Riyadh" /></div>
      </div>
    </Band>
  );
}

function Drops({ t }: P) {
  const flip = t.style === "road" || t.style === "board";
  return (
    <Band id="drop">
      <div className={`grid items-start gap-12 ${flip ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[0.8fr_1.2fr]"}`}>
        <div className={`${flip ? "lg:order-2" : ""} lg:sticky lg:top-28`}>
          <Title id="drop" eyebrow={`Arriving in ${t.toName}`} lead={t.dropIntro}>{t.dropHeading}</Title>
          <div className={frame}><ImageSlot folder={folder(t)} slot="destination" alt={t.dropAlt} label={`${t.toName} destination image`} width={800} height={720} sizes="(min-width: 1024px) 35vw, 100vw" /></div>
        </div>
        <div className={flip ? "lg:order-1" : ""}><List items={t.drops} style={t.style} id={`Drop-off points in ${t.toName}`} /></div>
      </div>
    </Band>
  );
}

function Places({ t }: P) {
  const scroll = t.style === "journey";
  const rows = t.style === "editorial" || t.style === "ledger";
  return (
    <Band id="places" tone="navy">
      <Title id="places" eyebrow={`Around ${t.toName}`} dark lead={t.placesIntro}>{t.placesHeading}</Title>
      {rows ? (
        <ul className="divide-y divide-white/15 border-y border-white/15">
          {t.places.map((p) => (
            <li key={p.name} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr]">
              <div><h3 className="font-extrabold text-accent">{p.name}</h3><p className="text-xs font-extrabold uppercase tracking-wider text-white/60">{p.detail}</p></div>
              <p className="leading-7 text-white/80">{p.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={scroll ? "flex snap-x gap-5 overflow-x-auto pb-3" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
          {t.places.map((p) => (
            <li key={p.name} className={`rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 ${scroll ? "min-w-[17rem] max-w-[19rem] shrink-0 snap-start" : ""}`}>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-accent">{p.detail}</p>
              <h3 className="mt-1 text-lg font-extrabold text-white">{p.name}</h3>
              <p className="mt-2 text-sm leading-7 text-white/75">{p.text}</p>
            </li>
          ))}
        </ul>
      )}
    </Band>
  );
}

function Plan({ t }: P) {
  const withMap = t.style !== "editorial" && t.style !== "ledger";
  return (
    <Band id="plan">
      <Title id="plan" eyebrow="Journey planning">{t.planHeading}</Title>
      <div className={`grid items-start gap-10 ${withMap ? "lg:grid-cols-2" : ""}`}>
        <ol className="space-y-6">
          {t.plan.map((p, i) => (
            <li key={p.title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-accent">{i + 1}</span>
              <div><h3 className="text-lg font-extrabold text-navy">{p.title}</h3><p className="mt-1 leading-7 text-muted">{p.text}</p></div>
            </li>
          ))}
        </ol>
        {withMap && (
          <figure>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-navy/10">
              <LazyMap title={`Route map from Riyadh to ${t.toName}`} src={`https://maps.google.com/maps?saddr=${encodeURIComponent(t.mapQuery.from)}&daddr=${encodeURIComponent(t.mapQuery.to)}&output=embed`} className="aspect-[4/3] w-full" />
            </div>
            <figcaption className="mt-3 text-sm text-muted">Map of the route from Riyadh to {t.toName}. The driver chooses the best road on the day.</figcaption>
          </figure>
        )}
      </div>
    </Band>
  );
}

function Info({ t }: P) {
  return (
    <Band id="info" tone="surface">
      <Title id="info" eyebrow="Good to know" lead={t.infoIntro}>{t.infoHeading}</Title>
      {t.style === "board" ? (
        <div className="space-y-3">
          {t.info.map((x) => (
            <details key={x.title} className="group rounded-2xl border border-navy/10 bg-white p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold text-navy">{x.title}<Icon name="arrow" className="h-4 w-4 text-accent transition group-open:rotate-90" /></summary>
              <p className="mt-3 leading-7 text-muted">{x.text}</p>
            </details>
          ))}
        </div>
      ) : (
        <ul className={t.style === "split" ? "grid gap-5 md:grid-cols-2" : "grid gap-x-10 gap-y-6 md:grid-cols-2"}>
          {t.info.map((x) => (
            <li key={x.title} className={t.style === "split" ? "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10" : "flex gap-4"}>
              {t.style !== "split" && <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-navy"><Icon name="check" className="h-4 w-4" /></span>}
              <div><h3 className="font-extrabold text-navy">{x.title}</h3><p className="leading-7 text-muted">{x.text}</p></div>
            </li>
          ))}
        </ul>
      )}
    </Band>
  );
}

function Related({ t }: P) {
  return (
    <Band id="related">
      <Title id="related" eyebrow="More routes">{t.relatedHeading}</Title>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.related.map((r) => (
          <li key={r.href}>
            <Link href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 transition hover:border-accent hover:shadow-md">
              <span><span className="block text-lg font-extrabold text-navy">{r.name}</span><span className="mt-1 block text-sm leading-6 text-muted">{r.text}</span></span>
              <Icon name="arrow" className="mt-4 h-5 w-5 text-accent transition group-hover:translate-x-1" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-muted">
        More pages: <Link href="/riyadh-taxi-service" className={arrowLink}>Riyadh taxi service</Link>{" · "}
        <Link href="/taxi-saudi-arabia/riyadh-region" className={arrowLink}>Riyadh Region</Link>{" · "}
        <Link href="/taxi-saudi-arabia/airports/king-khalid-international-airport" className={arrowLink}>King Khalid International Airport</Link>{" · "}
        <Link href="/taxi-saudi-arabia/routes" className={arrowLink}>All routes</Link>{" · "}
        <Link href="/book" className={arrowLink}>Book a ride</Link>{" · "}
        <Link href="/contact" className={arrowLink}>Contact us</Link>
      </p>
    </Band>
  );
}

function Faq({ t }: P) {
  const sticky = t.style === "road" || t.style === "split" || t.style === "ledger";
  return (
    <Band id="faq" tone="surface">
      <div className={sticky ? "grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr]" : "mx-auto max-w-3xl"}>
        <div className={sticky ? "lg:sticky lg:top-28" : "mb-6"}>
          <Title id="faq" eyebrow="Questions" lead="Straight answers to what travellers ask before booking this route.">{t.faqHeading}</Title>
        </div>
        <FaqList items={t.faq.map((x) => ({ q: x.q, a: x.a }))} />
      </div>
    </Band>
  );
}

/* -------------------------------------------------------------------- page */

export function TownBody({ page, town: t }: { page: PlacePage; town: TownRich }) {
  const render: Record<TownSectionId, ReactNode> = {
    intro: <Intro page={page} t={t} />,
    both: <Both page={page} t={t} />,
    pickups: <Pickups page={page} t={t} />,
    drops: <Drops page={page} t={t} />,
    places: <Places page={page} t={t} />,
    plan: <Plan page={page} t={t} />,
    info: <Info page={page} t={t} />,
    related: <Related page={page} t={t} />,
    faq: <Faq page={page} t={t} />,
  };
  return (
    <div>
      <Facts t={t} />
      {t.order.map((id) => <div key={id}>{render[id]}</div>)}
      <LocalBand s={t.local} tone="white" />
      <section aria-labelledby="cta-title" className="bg-accent text-navy">
        <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center`}>
          <div>
            <h2 id="cta-title" className="font-display text-3xl sm:text-4xl">{t.ctaHeading}</h2>
            <p className="mt-2 max-w-2xl text-lg font-medium text-navy/80">{t.ctaText}</p>
          </div>
          <div className="shrink-0"><Contact t={t} tone="light" /></div>
        </div>
      </section>
    </div>
  );
}

export const townChips = (t: TownRich) => [
  { href: "#about", label: "About" },
  { href: "#both", label: "Both directions" },
  { href: "#pickup", label: "Pickup in Riyadh" },
  { href: "#drop", label: `Drop-off in ${t.toName}` },
  { href: "#places", label: `Around ${t.toName}` },
  { href: "#faq", label: "FAQ" },
  { href: "#local", label: "Directions and weather" },
];
