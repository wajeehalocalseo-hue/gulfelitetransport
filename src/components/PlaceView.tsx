import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ContactButtons from "./ContactButtons";
import FaqList from "./Faq";
import Icon from "./Icon";
import HeroBooking from "./HeroBooking";
import QuoteForm from "./QuoteForm";
import WeatherWidget from "./WeatherWidget";
import { TAXI_SERVICE } from "@/content/saudi/build";
import type { PlacePage, Section } from "@/content/saudi/types";

const h2 = "text-2xl font-extrabold tracking-tight text-navy sm:text-3xl";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";
const pad = (n: number) => String(n + 1).padStart(2, "0");

/** Wraps Arabic runs in a language-tagged span so screen readers and search engines read them as Arabic. */
const ARABIC = /([\u0600-\u06FF]+(?:\s+[\u0600-\u06FF]+)*)/;
function t(s: string): ReactNode {
  const parts = s.split(ARABIC);
  if (parts.length === 1) return s;
  return parts.map((p, i) => (i % 2 ? <span key={i} lang="ar" dir="rtl">{p}</span> : p));
}

/** Two points drawn at their true relative positions (north is up), with the distance between them. */
function Schematic({ pair }: { pair: NonNullable<PlacePage["pair"]> }) {
  const { a, b, km } = pair;
  const W = 520;
  const H = 340;
  const pad = 70;
  const kx = Math.cos((((a.lat + b.lat) / 2) * Math.PI) / 180);
  const dx = (b.lng - a.lng) * kx;
  const dy = b.lat - a.lat;
  const span = Math.max(Math.abs(dx), Math.abs(dy), 0.0001);
  const scale = (Math.min(W, H) - 2 * pad) / span;
  const cx = W / 2;
  const cy = H / 2;
  const ax = cx - (dx * scale) / 2;
  const ay = cy + (dy * scale) / 2;
  const bx = cx + (dx * scale) / 2;
  const by = cy - (dy * scale) / 2;
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  const label = (x: number, y: number, name: string, up: boolean) => (
    <text x={x} y={y + (up ? -16 : 28)} textAnchor="middle" className="fill-navy text-[15px] font-bold">
      {name.length > 26 ? `${name.slice(0, 24)}...` : name}
    </text>
  );
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Relative positions of ${a.name} and ${b.name}, about ${km < 10 ? km.toFixed(1) : Math.round(km)} kilometres apart`} className="w-full rounded-3xl bg-surface ring-1 ring-navy/10">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="#101c2c" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width={W} height={H} rx="24" fill="url(#grid)" />
      <path d={`M${ax} ${ay} Q ${mx + (ay - by) * 0.12} ${my + (bx - ax) * 0.12} ${bx} ${by}`} fill="none" stroke="#f5a623" strokeWidth="4" strokeDasharray="10 10" strokeLinecap="round" />
      <circle cx={ax} cy={ay} r="11" fill="#101c2c" />
      <circle cx={ax} cy={ay} r="4.5" fill="#f5a623" />
      <circle cx={bx} cy={by} r="11" fill="#f5a623" />
      <circle cx={bx} cy={by} r="4.5" fill="#101c2c" />
      {label(ax, ay, a.name, ay >= by)}
      {label(bx, by, b.name, by > ay)}
      <g transform={`translate(${mx} ${my})`}>
        <rect x="-44" y="-15" width="88" height="30" rx="15" fill="#101c2c" />
        <text textAnchor="middle" y="5" className="fill-white text-[13px] font-bold">about {km < 10 ? km.toFixed(1) : Math.round(km)} km</text>
      </g>
      <g transform={`translate(${W - 34} 36)`}>
        <circle r="17" fill="#fff" stroke="#101c2c" strokeOpacity="0.2" />
        <path d="M0 -10L5 6L0 3L-5 6Z" fill="#101c2c" />
        <text y="-19" textAnchor="middle" className="fill-navy text-[11px] font-bold">N</text>
      </g>
    </svg>
  );
}
/* ------------------------------------------------------------------ section bodies */
type Item = { title: string; text: string };

function Items({ items, style, steps = false }: { items: Item[]; style: PlacePage["layout"]["body"]; steps?: boolean }) {
  const label = (i: number) => (steps ? `Step ${i + 1}` : pad(i));
  if (style === "accordion") {
    return (
      <div className="mt-6 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
        {items.map((it, i) => (
          <details key={it.title} className="group p-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
              <span>
                {steps && <span className="mr-3 text-accent">{i + 1}.</span>}
                {t(it.title)}
              </span>
              <Icon name="chevron" className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-2 text-sm leading-7 text-muted">{t(it.text)}</p>
          </details>
        ))}
      </div>
    );
  }
  if (style === "table") {
    return (
      <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white">
        <table className="w-full border-collapse text-left text-sm max-md:block">
          <tbody className="divide-y divide-navy/10 max-md:block">
            {items.map((it) => (
              <tr key={it.title} className="align-top max-md:block max-md:p-4">
                <th scope="row" className="w-1/3 p-4 font-bold text-navy max-md:block max-md:w-auto max-md:p-0 max-md:pb-1">{t(it.title)}</th>
                <td className="p-4 leading-6 text-muted max-md:block max-md:p-0">{t(it.text)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (style === "columns") {
    return (
      <div className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
        {items.map((it, i) => (
          <div key={it.title} className="grid gap-1 py-5 md:grid-cols-[1fr_2fr] md:gap-8">
            <h3 className="font-bold text-navy">
              <span className="mr-3 text-accent">{pad(i)}</span>
              {t(it.title)}
            </h3>
            <p className="text-sm leading-7 text-muted">{t(it.text)}</p>
          </div>
        ))}
      </div>
    );
  }
  if (style === "tiles") {
    return (
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.title} className="rounded-2xl bg-surface p-5 ring-1 ring-navy/10">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">{label(i)}</span>
            <h3 className="mt-2 font-bold text-navy">{t(it.title)}</h3>
            <p className="mt-1.5 text-sm leading-7 text-muted">{t(it.text)}</p>
          </li>
        ))}
      </ul>
    );
  }
  if (style === "checklist") {
    return (
      <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.title} className="flex gap-3 leading-7 text-muted">
            <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <span>
              <strong className="text-navy">{t(it.title)}.</strong> {t(it.text)}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((it, i) => (
        <article key={it.title} className="rounded-2xl border border-navy/10 bg-white p-5">
          {steps && <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>}
          <h3 className={`font-bold text-navy ${steps ? "mt-3" : ""}`}>{t(it.title)}</h3>
          <p className="mt-1.5 text-sm leading-7 text-muted">{t(it.text)}</p>
        </article>
      ))}
    </div>
  );
}

function Links({ items, style }: { items: { name: string; href: string; note?: string }[]; style: PlacePage["layout"]["body"] }) {
  if (style === "columns" || style === "table") {
    return (
      <ul className="mt-6 divide-y divide-navy/10 border-y border-navy/10">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="grid gap-1 py-4 hover:bg-surface md:grid-cols-[2fr_1fr] md:gap-6">
              <span className="font-bold text-navy">{t(l.name)}</span>
              <span className="text-sm text-muted">{l.note ? t(l.note) : null}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  if (style === "checklist") {
    return (
      <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((l) => (
          <li key={l.href} className="flex gap-3">
            <Icon name="arrow" className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <Link href={l.href} className={textLink}>
              {t(l.name)}
            </Link>
            {l.note && <span className="text-sm text-muted">{t(l.note)}</span>}
          </li>
        ))}
      </ul>
    );
  }
  const tile = style === "tiles";
  return (
    <ul className={`mt-6 grid gap-3 sm:grid-cols-2 ${tile ? "lg:grid-cols-3" : ""}`}>
      {items.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className={`block h-full rounded-2xl p-4 transition hover:border-accent ${tile ? "bg-surface ring-1 ring-navy/10 hover:ring-accent" : "border border-navy/10 bg-white"}`}
          >
            <span className="font-bold text-navy">{t(l.name)}</span>
            {l.note && <span className="mt-1 block text-sm text-muted">{t(l.note)}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SectionBlock({ s, style }: { s: Section; style: PlacePage["layout"]["body"] }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`}>
      <h2 id={`${s.id}-title`} className={h2}>
        {s.h2}
      </h2>
      {s.kind === "text" && (
        <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 30)}>{t(p)}</p>
          ))}
        </div>
      )}
      {s.kind === "items" && (
        <>
          {s.intro && <p className="mt-4 text-muted">{s.intro}</p>}
          <Items items={s.items} style={style} />
        </>
      )}
      {s.kind === "steps" && <Items items={s.items} style={style} steps />}
      {s.kind === "links" && (
        <>
          {s.intro && <p className="mt-4 text-muted">{s.intro}</p>}
          <Links items={s.items} style={style} />
        </>
      )}
      {s.kind === "faq" && (
        <div className="mt-6">
          <FaqList items={s.items} />
        </div>
      )}
      {s.kind === "table" && (
        <>
          {s.intro && <p className="mt-4 text-lg leading-8 text-muted">{s.intro}</p>}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-navy/10 bg-white">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm sm:text-base">
              <thead className="bg-surface text-navy">
                <tr>
                  {s.head.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-extrabold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10 text-muted">
                {s.rows.map((r) => (
                  <tr key={r.cells[0]}>
                    {r.cells.map((c, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? "font-semibold text-navy" : ""}`}>
                        {i === 0 && r.href ? <Link href={r.href} className={textLink}>{c}</Link> : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {s.note && <p className="mt-3 text-sm text-muted">{s.note}</p>}
        </>
      )}
      {s.kind === "map" && (
        <>
          {s.intro && <p className="mt-4 text-lg leading-8 text-muted">{s.intro}</p>}
          <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white">
            <iframe
              title={`Map of ${s.query}`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(s.query)}&z=11&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 sm:h-96"
            />
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {s.places.map((p) => (
              <li key={p.name}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full rounded-2xl border border-navy/10 bg-white p-4 transition hover:border-accent"
                >
                  <span className="font-bold text-navy">{p.name}</span>
                  <span className="mt-1 block text-sm text-muted">{p.note ?? "Open in Google Maps"}</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {s.kind === "weather" && (
        <>
          {s.intro && <p className="mt-4 text-lg leading-8 text-muted">{s.intro}</p>}
          <WeatherWidget place={s.place} lat={s.lat} lng={s.lng} />
        </>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ page */
export default function PlaceView({ page }: { page: PlacePage }) {
  const L0 = page.layout;
  // The booking form always sits in the hero (HeroBooking), so the old "hero" form placement falls back to the page-bottom form.
  const L = { ...L0, form: (page.simple ? "bottom" : L0.form === "hero" ? "aside" : L0.form) as typeof L0.form };
  const quoteHref = "#hero-quote";
  // A landing-page style page has no breadcrumb row above the heading (the breadcrumb data stays in the page's schema).
  const crumbs = (page.simple ? [] : page.crumbs).map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }));
  const pre = page.prefill ?? {};

  const quickForm = (
    <div id="hero-quote" className="rounded-2xl bg-white p-6 text-navy shadow-2xl sm:p-7">
      <h2 className="text-xl font-extrabold">Request a ride</h2>
      <p className="mb-5 mt-1 text-sm leading-6 text-muted">Tell us where and when. We confirm the vehicle, driver and fare first.</p>
      <QuoteForm variant="quick" defaultService={TAXI_SERVICE} topic={page.name} pickupDefault={pre.pickup} dropoffDefault={pre.dropoff} />
    </div>
  );
  const fullForm = <QuoteForm defaultService={TAXI_SERVICE} topic={page.name} pickupDefault={pre.pickup} dropoffDefault={pre.dropoff} />;

  const factList = (cls: string, tone: "dark" | "light") => (
    <dl className={cls}>
      {page.facts.map((f) => (
        <div key={f.label} className={tone === "dark" ? "border-b border-white/10 py-3 first:pt-0 last:border-0 last:pb-0" : "py-3"}>
          <dt className="text-xs font-bold uppercase tracking-wider text-accent">{f.label}</dt>
          <dd className={`mt-1 text-sm leading-6 ${tone === "dark" ? "text-white/85" : "text-muted"}`}>{t(f.value)}</dd>
        </div>
      ))}
    </dl>
  );

  const btns = (tone: "dark" | "light", cls = "mt-8") => <ContactButtons quoteHref={quoteHref} service={`a taxi or cab in ${page.name}`} tone={tone} className={cls} />;

  const hero: ReactNode = (() => {
    switch (L.hero) {
      case "centered":
        return (
          <section className="border-b border-navy/10 bg-gradient-to-b from-white to-surface">
            <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:py-20">
              <Breadcrumbs items={crumbs} tone="light" center />
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{page.h1}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">{page.lead}</p>
              {btns("light", "mt-8 justify-center")}
              <ul className="mt-8 flex flex-wrap justify-center gap-2">
                {page.facts.map((f) => (
                  <li key={f.label} className="rounded-full bg-white px-4 py-2 text-xs text-muted ring-1 ring-navy/10">
                    <strong className="text-navy">{f.label}:</strong> {f.value}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      case "light":
        return (
          <section className="border-b border-navy/10 bg-white">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
              <Breadcrumbs items={crumbs} tone="light" />
              <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{page.h1}</h1>
              <span aria-hidden="true" className="mt-5 block h-1.5 w-20 rounded-full bg-accent" />
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{page.lead}</p>
              {btns("light")}
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
                {page.facts.map((f) => (
                  <div key={f.label} className="bg-white p-5">
                    <dt className="text-xs font-bold uppercase tracking-wider text-accent">{f.label}</dt>
                    <dd className="mt-1.5 text-sm leading-6 text-muted">{t(f.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        );
      case "ledger":
        return (
          <section className="border-b border-navy/10 bg-surface">
            <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-l-4 border-accent pl-6">
                <Breadcrumbs items={crumbs} tone="light" />
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{page.h1}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{page.lead}</p>
                {btns("light")}
              </div>
              <ol className="divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
                {page.facts.map((f, i) => (
                  <li key={f.label} className="flex gap-4 p-5">
                    <span className="text-2xl font-extrabold text-accent">{pad(i)}</span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-navy">{f.label}</span>
                      <p className="mt-1 text-sm leading-6 text-muted">{t(f.value)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      case "inset":
        return (
          <section className="bg-navy text-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="order-2 lg:order-1">
                <div aria-hidden="true" className="flex h-28 w-28 items-center justify-center rounded-3xl bg-accent text-6xl font-extrabold text-navy">
                  {page.name.charAt(0)}
                </div>
                {factList("mt-6 rounded-2xl bg-navy-2 p-5 ring-1 ring-white/10", "dark")}
              </div>
              <div className="order-1 lg:order-2">
                <Breadcrumbs items={crumbs} />
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{page.h1}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{page.lead}</p>
                {btns("dark")}
              </div>
            </div>
          </section>
        );
      case "board":
        return (
          <section className="bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
              <Breadcrumbs items={crumbs} />
              <div className="mt-6 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{page.h1}</h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{page.lead}</p>
                  {btns("dark")}
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/40 p-5 font-mono">
                  <p aria-hidden="true" className="text-6xl font-extrabold tracking-widest text-accent">{page.facts[0]?.value}</p>
                  <dl className="mt-4 divide-y divide-white/10 text-sm">
                    {page.facts.slice(1).map((f) => (
                      <div key={f.label} className="flex justify-between gap-4 py-2">
                        <dt className="uppercase tracking-wider text-white/60">{f.label}</dt>
                        <dd className="text-right text-white">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>
        );
      case "schematic":
        return (
          <section className="border-b border-navy/10 bg-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1fr_1fr]">
              <div>
                <Breadcrumbs items={crumbs} tone="light" />
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{page.h1}</h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{page.lead}</p>
                {btns("light")}
                <ul className="mt-8 flex flex-wrap gap-2">
                  {page.facts.slice(1, 4).map((f) => (
                    <li key={f.label} className="rounded-full bg-surface px-4 py-2 text-xs text-muted ring-1 ring-navy/10">
                      <strong className="text-navy">{f.label}:</strong> {t(f.value)}
                    </li>
                  ))}
                </ul>
              </div>
              {page.pair && <Schematic pair={page.pair} />}
            </div>
          </section>
        );
      case "routeline":        return (
          <section className="border-b border-navy/10 bg-white">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
              <Breadcrumbs items={crumbs} tone="light" />
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{page.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{page.lead}</p>
              <div aria-hidden="true" className="mt-10 flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-navy" />
                <span className="h-0 flex-1 border-t-4 border-dashed border-accent" />
                <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-extrabold text-navy">about {page.route?.km} km</span>
                <span className="h-0 flex-1 border-t-4 border-dashed border-accent" />
                <span className="h-4 w-4 rounded-full bg-accent ring-4 ring-accent/30" />
              </div>
              <div className="mt-3 flex justify-between text-lg font-extrabold text-navy">
                <span>{page.route?.from}</span>
                <span>{page.route?.to}</span>
              </div>
              {btns("light")}
            </div>
          </section>
        );
      case "routeband":
        return (
          <section className="bg-navy text-white">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
              <Breadcrumbs items={crumbs} />
              <div aria-hidden="true" className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
                <p className="text-3xl font-extrabold sm:text-5xl">{page.route?.from}</p>
                <p className="flex items-center gap-3 text-accent">
                  <Icon name="arrow" className="h-8 w-8" />
                  <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-extrabold text-navy">about {page.route?.km} km</span>
                </p>
                <p className="text-3xl font-extrabold sm:text-right sm:text-5xl">{page.route?.to}</p>
              </div>
              <h1 className="sr-only">{page.h1}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">{page.lead}</p>
              {btns("dark")}
            </div>
          </section>
        );
      default:
        return (
          <section className="bg-navy text-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Breadcrumbs items={crumbs} />
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{page.h1}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{page.lead}</p>
                {btns("dark")}
              </div>
              {factList("rounded-2xl bg-navy-2 p-6 shadow-xl ring-1 ring-white/10", "dark")}
            </div>
          </section>
        );
    }
  })();

  const chips = [
    ...page.sections.filter((s) => s.id !== "limits").slice(0, 6).map((s) => ({ href: `#${s.id}`, label: s.h2.length > 28 ? s.h2.slice(0, 26).trimEnd() + "..." : s.h2 })),
    { href: "#quote", label: "Request a ride" },
  ];

  const body = (
    <div className="min-w-0 space-y-14">
      <section id="answer" aria-labelledby="answer-title">
        <h2 id="answer-title" className="sr-only">Summary</h2>
        <p className="rounded-2xl border-l-4 border-accent bg-white p-6 text-lg font-medium leading-8 text-navy">{t(page.directAnswer)}</p>
        <p className="mt-4 text-sm text-muted">
          Part of <Link href="/services/taxi-cab-services" className={textLink}>Taxi &amp; Cab Services</Link> | <Link href="/taxi-saudi-arabia" className={textLink}>All of Saudi Arabia</Link>
        </p>
      </section>
      {page.sections.map((s) => (
        <SectionBlock key={s.id} s={s} style={L.body} />
      ))}
    </div>
  );

  return (
    <main id="main" data-layout={`${L.hero}/${L.body}/${L.form}`} className="flex-1">
      <HeroBooking service={TAXI_SERVICE} topic={page.name} pickup={pre.pickup} dropoff={pre.dropoff}>
        {hero}
      </HeroBooking>
      <nav aria-label="On this page" className="border-b border-navy/10 bg-white">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {chips.map((ch) => (
            <li key={ch.href} className="shrink-0">
              <a href={ch.href} className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-navy ring-1 ring-navy/15 hover:bg-accent hover:ring-accent">
                {ch.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {L.form === "hero" && (
        <section className="border-b border-navy/10 bg-navy">
          <div className="mx-auto max-w-2xl px-5 py-8">{quickForm}</div>
        </section>
      )}

      {L.form === "aside" ? (
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.45fr_1fr]">
          {body}
          <aside id="quote" aria-labelledby="quote-title" className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 id="quote-title" className="text-xl font-extrabold text-navy">Request a ride: {page.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Just have a question first? <Link href="/contact" className={textLink}>Contact us</Link>.
            </p>
            <div className="mt-5">{fullForm}</div>
          </aside>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-4xl px-5 py-16">{body}</div>
          <section id="quote" aria-labelledby="quote-title" className="bg-navy text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <h2 id="quote-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Request a ride: {page.name}</h2>
                <p className="mt-4 text-lg leading-8 text-white/75">
                  Tell us where and when. We confirm the vehicle, driver and fare before you commit. Or{" "}
                  <Link href="/contact" className="font-bold text-accent underline underline-offset-4">contact us</Link>.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 text-navy sm:p-8">{fullForm}</div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
