import Link from "next/link";
import type { ReactNode } from "react";
import FaqList from "./Faq";
import Icon from "./Icon";
import type { PlacePage } from "@/content/saudi/types";
import { mailtoUrl, site, telUrl, whatsappUrl } from "@/lib/site";

type L = NonNullable<PlacePage["landing"]>;
type Tone = "white" | "surface" | "navy";

const wrap = "mx-auto max-w-7xl px-5";
const WHY_ICONS = ["shield", "calendar", "network", "check"];
const LIMIT_ICONS = ["briefcase", "bolt", "truck", "calendar"];

function Band({ id, tone = "white", children, tight = false }: { id?: string; tone?: Tone; children: ReactNode; tight?: boolean }) {
  const bg = tone === "surface" ? "bg-surface" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={bg}>
      <div className={`${wrap} ${tight ? "py-10 sm:py-12" : "py-14 sm:py-16"}`}>{children}</div>
    </section>
  );
}

function Head({ id, eyebrow, title, tone = "white", center = false, lead }: { id: string; eyebrow?: string; title: string; tone?: Tone; center?: boolean; lead?: string }) {
  const dark = tone === "navy";
  return (
    <div className={`mb-8 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${dark ? "text-accent" : "text-gold"}`}>{eyebrow}</p>}
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {lead && <p className={`mt-3 text-lg leading-8 ${dark ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

function tagFor(href: string) {
  if (href.includes("/international/")) return "Cross-border";
  if (href.includes("/routes/")) return href.endsWith("/routes") ? "All routes" : "Another route";
  if (href.includes("/airports/")) return "Airport";
  if (href.startsWith("/riyadh-taxi-service")) return "Pickup in Riyadh";
  return "Destination city";
}

const arrowLink = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

/* ---------------------------------------------------------------- facts */
function Facts({ l, variant }: { l: L; variant: number }) {
  if (variant === 1) {
    return (
      <section className="bg-navy text-white" aria-label="Route facts">
        <div className={`${wrap} grid gap-px py-2 sm:grid-cols-2 lg:grid-cols-4`}>
          {l.stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center lg:border-r lg:border-white/10 lg:last:border-0">
              <p className="text-3xl font-extrabold text-accent sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  const overlap = variant === 3;
  return (
    <section aria-label="Route facts" className="bg-white pt-10">
      <div className={wrap}>
        <dl className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${overlap ? "rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-navy/10" : ""}`}>
          {l.stats.map((s) => (
            <div key={s.label} className={`flex items-start gap-4 rounded-2xl p-5 ${variant === 2 ? "border border-navy/10 bg-white" : "bg-surface"}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-navy">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-muted">{s.label}</dt>
                <dd className="mt-1 text-lg font-extrabold leading-6 text-navy">{s.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- route graphic */
function RouteCard({ l }: { l: L }) {
  return (
    <div className="rounded-3xl bg-navy p-6 text-white shadow-xl">
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-4 w-4 shrink-0 rounded-full bg-white" />
        <span className="h-0 flex-1 border-t-4 border-dashed border-accent" />
        <span className="shrink-0 rounded-full bg-accent px-3 py-1 text-xs font-extrabold text-navy">about {l.km} km</span>
        <span className="h-0 flex-1 border-t-4 border-dashed border-accent" />
        <span className="h-4 w-4 shrink-0 rounded-full bg-accent ring-4 ring-accent/30" />
      </div>
      <div className="mt-3 flex justify-between text-lg font-extrabold">
        <span>{l.from}</span>
        <span>{l.to}</span>
      </div>
      <ul className="mt-5 divide-y divide-white/10 text-sm">
        {l.stats.map((s) => (
          <li key={s.label} className="flex justify-between gap-4 py-2.5">
            <span className="text-white/65">{s.label}</span>
            <span className="text-right font-bold">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- about */
function About({ l, page, variant }: { l: L; page: PlacePage; variant: number }) {
  const [first, ...rest] = l.about;
  if (variant === 1) {
    return (
      <Band id="about" tone="white">
        <Head id="about" eyebrow="The route" title={`About the ${l.from} to ${l.to} route`} />
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <p className="border-l-4 border-accent pl-6 text-2xl font-semibold leading-10 text-navy">{first}</p>
          <div className="space-y-4 text-lg leading-8 text-muted">{rest.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
        </div>
      </Band>
    );
  }
  if (variant === 3) {
    return (
      <Band id="about" tone="surface">
        <Head id="about" eyebrow="The route" title={`${l.from} to ${l.to}, explained`} center />
        <div className="mx-auto max-w-5xl gap-10 text-lg leading-8 text-muted md:columns-2">
          {l.about.map((p) => <p key={p.slice(0, 24)} className="mb-5 break-inside-avoid">{p}</p>)}
        </div>
      </Band>
    );
  }
  return (
    <Band id="about" tone={variant === 2 ? "surface" : "white"}>
      <div className={`grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] ${variant === 2 ? "lg:grid-cols-[1fr_1.25fr]" : ""}`}>
        <div className={variant === 2 ? "lg:order-2" : ""}>
          <Head id="about" eyebrow="The route" title={`About the ${l.from} to ${l.to} route`} />
          <div className="space-y-4 text-lg leading-8 text-muted">{l.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
          <p className="mt-6 rounded-2xl border-l-4 border-accent bg-white p-5 text-base font-medium leading-7 text-navy shadow-sm">{page.directAnswer}</p>
        </div>
        <div className={variant === 2 ? "lg:order-1 lg:sticky lg:top-24" : "lg:sticky lg:top-24"}>
          <RouteCard l={l} />
        </div>
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- why */
function Why({ l, variant }: { l: L; variant: number }) {
  const title = `Why book a private taxi from ${l.from} to ${l.to}`;
  if (variant === 1) {
    return (
      <Band id="why" tone="surface">
        <Head id="why" eyebrow="Why this ride" title={title} />
        <ol className="divide-y divide-navy/10 rounded-3xl border border-navy/10 bg-white">
          {l.why.map((w, i) => (
            <li key={w.title} className="grid gap-4 p-6 sm:grid-cols-[72px_1fr] sm:items-center sm:p-8">
              <span className="text-5xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-xl font-extrabold text-navy">{w.title}</h3>
                <p className="mt-1 text-lg leading-8 text-muted">{w.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Band>
    );
  }
  if (variant === 3) {
    return (
      <Band id="why" tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl bg-navy p-8 text-white">
            <Head id="why" eyebrow="Why this ride" title={title} tone="navy" />
            <Link href="#quote" className="inline-flex rounded-full bg-accent px-6 py-3 font-extrabold text-navy hover:brightness-95">Book this ride</Link>
          </div>
          <ul className="space-y-4">
            {l.why.map((w) => (
              <li key={w.title} className="flex gap-4 rounded-2xl border border-navy/10 bg-surface p-5">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-navy"><Icon name="check" className="h-4 w-4" /></span>
                <div>
                  <h3 className="font-extrabold text-navy">{w.title}</h3>
                  <p className="mt-1 leading-7 text-muted">{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Band>
    );
  }
  return (
    <Band id="why" tone={variant === 2 ? "white" : "surface"}>
      <Head id="why" eyebrow="Why this ride" title={title} center />
      <div className={`grid gap-5 ${variant === 2 ? "sm:grid-cols-2" : "md:grid-cols-3"}`}>
        {l.why.map((w, i) => (
          <article key={w.title} className={`rounded-3xl bg-white p-7 shadow-sm ring-1 ring-navy/10 ${variant === 2 ? "border-t-4 border-accent" : ""}`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-accent"><Icon name={WHY_ICONS[i % WHY_ICONS.length]} className="h-6 w-6" /></span>
            <h3 className="mt-5 text-xl font-extrabold text-navy">{w.title}</h3>
            <p className="mt-2 leading-7 text-muted">{w.text}</p>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- places */
function Places({ l, variant }: { l: L; variant: number }) {
  const title = `Where rides in ${l.to} go`;
  if (variant === 1 || variant === 3) {
    return (
      <Band id="places" tone={variant === 1 ? "white" : "surface"}>
        <Head id="places" eyebrow="Destination" title={title} lead={l.placesIntro} />
        <ul className="flex flex-wrap gap-3">
          {l.places.map((p) => (
            <li key={p.title} className="rounded-full bg-white px-5 py-3 shadow-sm ring-1 ring-navy/15">
              <span className="font-extrabold text-navy">{p.title}</span>
              <span className="ml-2 text-sm text-muted">{p.text}</span>
            </li>
          ))}
        </ul>
      </Band>
    );
  }
  return (
    <Band id="places" tone={variant === 2 ? "white" : "white"}>
      <Head id="places" eyebrow="Destination" title={title} lead={l.placesIntro} />
      <div className={`grid gap-4 ${variant === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {l.places.map((p, i) => (
          <article key={p.title} className="flex gap-4 rounded-2xl border border-navy/10 bg-surface p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-accent">{i + 1}</span>
            <div>
              <h3 className="font-extrabold text-navy">{p.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{p.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- plan and riders */
function Plan({ l, variant }: { l: L; variant: number }) {
  return (
    <Band id="plan" tone={variant === 0 || variant === 3 ? "surface" : "white"}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Head id="plan" eyebrow="Before you travel" title="Planning your journey" />
          <ul className="space-y-4">
            {l.plan.map((p) => (
              <li key={p.title + p.text.slice(0, 12)} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-navy"><Icon name="check" className="h-4 w-4" /></span>
                <div>
                  <h3 className="font-extrabold text-navy">{p.title}</h3>
                  <p className="leading-7 text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Head id="riders" eyebrow="Who rides" title="Who travels this route" />
          <ul className="grid gap-4">
            {l.riders.map((r, i) => (
              <li key={r.text} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-accent"><Icon name={["bus", "briefcase", "building"][i % 3]} className="h-5 w-5" /></span>
                <p className="font-semibold leading-6 text-navy">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- steps */
function Steps({ l, variant }: { l: L; variant: number }) {
  const vertical = variant === 1 || variant === 3;
  return (
    <Band id="how" tone="navy">
      <Head id="how" eyebrow="Booking" title="How a request works" tone="navy" center />
      {vertical ? (
        <ol className="mx-auto max-w-3xl space-y-0">
          {l.steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0">
              {i < l.steps.length - 1 && <span aria-hidden="true" className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 bg-accent/40" />}
              <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
              <div>
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="mt-1 leading-7 text-white/75">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <ol className="grid gap-5 md:grid-cols-4">
          {l.steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-navy-2 p-6 ring-1 ring-white/10">
              <span className="text-5xl font-extrabold text-accent">{i + 1}</span>
              <h3 className="mt-3 text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">{s.text}</p>
            </li>
          ))}
        </ol>
      )}
    </Band>
  );
}

/* ---------------------------------------------------------------- links */
function Related({ l, variant }: { l: L; variant: number }) {
  return (
    <Band id="links" tone={variant === 2 ? "surface" : "white"}>
      <Head id="links" eyebrow="Keep exploring" title="Related routes and pages" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...l.related, ...l.pickups].filter((r, i, all) => all.findIndex((x) => x.href === r.href) === i).map((r) => (
          <Link key={r.href + r.name} href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 transition hover:border-accent hover:shadow-md">
            <span>
              <span className="mb-2 inline-block rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-gold ring-1 ring-navy/10">{tagFor(r.href)}</span>
              <span className="block font-extrabold text-navy">{r.name}</span>
              {r.note && <span className="mt-1 block text-sm text-muted">{r.note}</span>}
            </span>
            <Icon name="arrow" className="mt-4 h-5 w-5 text-accent transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </Band>
  );
}

function Limits({ l }: { l: L }) {
  return (
    <Band id="limits" tone="surface" tight>
      <Head id="limits" eyebrow="Good to know" title="What is confirmed for each request" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {l.limits.map((x, i) => (
          <div key={x.title} className="rounded-2xl bg-white p-5 ring-1 ring-navy/10">
            <Icon name={LIMIT_ICONS[i % LIMIT_ICONS.length]} className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-extrabold text-navy">{x.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{x.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted">{l.note}</p>
    </Band>
  );
}

function Faq({ l, variant }: { l: L; variant: number }) {
  const half = Math.ceil(l.faq.length / 2);
  if (variant === 1) {
    return (
      <Band id="faq" tone="white">
        <Head id="faq" eyebrow="Questions" title={`Riyadh to ${l.to} taxi: questions`} />
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <FaqList items={l.faq.slice(0, half)} />
          <FaqList items={l.faq.slice(half)} />
        </div>
      </Band>
    );
  }
  return (
    <Band id="faq" tone="white">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Head id="faq" eyebrow="Questions" title={`Riyadh to ${l.to} taxi: questions`} lead="Short answers to what travellers ask before they book this route." />
          <Link href="#quote" className={arrowLink}>Ask for your ride <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <FaqList items={l.faq} />
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- trust row */
function TrustRow({ l, variant }: { l: L; variant: number }) {
  const items = [
    { icon: "shield", text: "Private car, not a shared ride" },
    { icon: "check", text: "Fare confirmed before you commit" },
    { icon: "network", text: `Both directions, one request` },
    { icon: "bus", text: `Pickup at your door in ${l.from}` },
  ];
  return (
    <section aria-label="What you get" className={variant % 2 === 0 ? "border-b border-navy/10 bg-white" : "bg-navy-2 text-white"}>
      <ul className={`${wrap} grid gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4`}>
        {items.map((i) => (
          <li key={i.text} className="flex items-center gap-3 text-sm font-bold">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${variant % 2 === 0 ? "bg-accent text-navy" : "bg-accent text-navy"}`}><Icon name={i.icon} className="h-4 w-4" /></span>
            {i.text}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- vehicles */
const VEHICLES = [
  { icon: "bus", name: "Sedan", best: "One to three passengers", tags: ["City and airport rides", "Light luggage"] },
  { icon: "truck", name: "SUV", best: "Families and mixed luggage", tags: ["More space", "Good for long roads"] },
  { icon: "network", name: "Van or minibus", best: "Groups travelling together", tags: ["Seats for the whole group", "Room for bags"] },
  { icon: "briefcase", name: "Executive car", best: "Business guests and occasions", tags: ["Chauffeur-driven", "Premium comfort"] },
];

function Vehicles({ l, variant }: { l: L; variant: number }) {
  return (
    <Band id="vehicles" tone={variant === 1 || variant === 3 ? "surface" : "white"}>
      <Head id="vehicles" eyebrow="Vehicles" title={`Choose the vehicle for ${l.from} to ${l.to}`} lead="Tell us your group and bags and we confirm the vehicle for your request. Nothing is fixed until you agree to it." />
      <div className={variant === 2 ? "grid gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-4"}>
        {VEHICLES.map((v) => (
          <article key={v.name} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-accent"><Icon name={v.icon} className="h-6 w-6" /></span>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-widest text-gold">{v.best}</p>
            <h3 className="mt-1 text-xl font-extrabold text-navy">{v.name}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {v.tags.map((t) => <li key={t} className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy ring-1 ring-navy/10">{t}</li>)}
            </ul>
            <Link href="#quote" className={`${arrowLink} mt-5 pt-1 text-sm`}>Ask for this vehicle <Icon name="arrow" className="h-4 w-4" /></Link>
          </article>
        ))}
      </div>
    </Band>
  );
}

/* ---------------------------------------------------------------- closing call to action */
function Closing({ l }: { l: L }) {
  const wa = whatsappUrl(`Hello ${site.name}, I would like a taxi from ${l.from} to ${l.to}.`);
  const mail = mailtoUrl(`Taxi ${l.from} to ${l.to}`, `Hello ${site.name}, I would like a taxi from ${l.from} to ${l.to}.`);
  const btn = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-extrabold transition";
  return (
    <section aria-label="Book this route" className="bg-accent text-navy">
      <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center`}>
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to book {l.from} to {l.to}?</h2>
          <p className="mt-1 max-w-2xl font-medium text-navy/80">Send your route details and we come back with the plan.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="#quote" className={`${btn} bg-navy text-white hover:bg-navy-2`}>Request this ride</Link>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} border-2 border-navy/40 hover:bg-white/30`}><Icon name="chat" className="h-4 w-4" /> WhatsApp</a>}
          {telUrl && <a href={telUrl} className={`${btn} border-2 border-navy/40 hover:bg-white/30`}><Icon name="phone" className="h-4 w-4" /> Call</a>}
          {mail && <a href={mail} className={`${btn} border-2 border-navy/40 hover:bg-white/30`}><Icon name="mail" className="h-4 w-4" /> Email</a>}
        </div>
      </div>
    </section>
  );
}
/* ---------------------------------------------------------------- page */
export default function RouteLanding({ page }: { page: PlacePage }) {
  const l = page.landing!;
  const v = l.variant;
  const facts = <Facts l={l} variant={v} />;
  const about = <About l={l} page={page} variant={v} />;
  const why = <Why l={l} variant={v} />;
  const places = <Places l={l} variant={v} />;
  const plan = <Plan l={l} variant={v} />;
  const steps = <Steps l={l} variant={v} />;
  const related = <Related l={l} variant={v} />;
  const limits = <Limits l={l} />;
  const faq = <Faq l={l} variant={v} />;
  const trust = <TrustRow l={l} variant={v} />;
  const vehicles = <Vehicles l={l} variant={v} />;
  const closing = <Closing l={l} />;
  const order: ReactNode[][] = [
    [trust, facts, about, why, vehicles, places, steps, plan, related, faq, limits, closing],
    [trust, about, facts, why, places, vehicles, plan, steps, faq, related, limits, closing],
    [trust, facts, why, about, vehicles, places, plan, steps, related, faq, limits, closing],
    [trust, facts, about, steps, why, places, vehicles, plan, related, faq, limits, closing],
  ];
  return (
    <div className="flex flex-col">
      {order[v].map((node, i) => (
        <div key={i}>{node}</div>
      ))}
    </div>
  );
}
