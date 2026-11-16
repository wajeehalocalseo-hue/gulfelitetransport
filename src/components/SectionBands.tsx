import Link from "next/link";
import LazyMap from "./LazyMap";
import type { ReactNode } from "react";
import FaqList from "./Faq";
import Icon from "./Icon";
import WeatherWidget from "./WeatherWidget";
import type { PlacePage, Section } from "@/content/saudi/types";

/**
 * Wide, banded layout for the Riyadh landing pages (the main page, the districts and the airport page).
 * Every section type has its own wide treatment; the body style and the section order vary from page to page.
 */
const wrap = "mx-auto max-w-7xl px-5";
const ICONS = ["shield", "calendar", "network", "check", "briefcase", "bolt", "bus", "truck"];
const arrowLink = "inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

type Tone = "white" | "surface" | "navy";
type Body = PlacePage["layout"]["body"];

function Band({ id, tone, children }: { id: string; tone: Tone; children: ReactNode }) {
  const bg = tone === "surface" ? "bg-surface" : tone === "navy" ? "bg-navy text-white" : "bg-white";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={bg}>
      <div className={`${wrap} py-14 sm:py-16`}>{children}</div>
    </section>
  );
}

function Head({ id, title, tone, lead }: { id: string; title: string; tone: Tone; lead?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <span aria-hidden="true" className="mb-3 block h-1.5 w-14 rounded-full bg-accent" />
      <h2 id={`${id}-title`} className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      {lead && <p className={`mt-3 text-lg leading-8 ${tone === "navy" ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

function Items({ items, body, tone }: { items: { title: string; text: string }[]; body: Body; tone: Tone }) {
  const dark = tone === "navy";
  if (body === "checklist") {
    return (
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.title + it.text.slice(0, 10)} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
            <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-navy"><Icon name="check" className="h-4 w-4" /></span>
            <div>
              <h3 className="font-extrabold text-navy">{it.title}</h3>
              <p className="mt-1 leading-7 text-muted">{it.text}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  if (body === "accordion") {
    return (
      <div className="divide-y divide-navy/10 rounded-3xl border border-navy/10 bg-white">
        {items.map((it, i) => (
          <details key={it.title + it.text.slice(0, 10)} className="group p-5 sm:p-6" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-extrabold text-navy">
              <h3 className="text-lg">{it.title}</h3>
              <Icon name="chevron" className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 leading-7 text-muted">{it.text}</p>
          </details>
        ))}
      </div>
    );
  }
  if (body === "table") {
    return (
      <dl className="divide-y divide-navy/10 overflow-hidden rounded-3xl border border-navy/10 bg-white">
        {items.map((it) => (
          <div key={it.title + it.text.slice(0, 10)} className="grid gap-1 p-5 sm:grid-cols-[260px_1fr] sm:gap-8 sm:p-6">
            <dt className="font-extrabold text-navy">{it.title}</dt>
            <dd className="leading-7 text-muted">{it.text}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (body === "columns") {
    return (
      <div className="grid gap-x-12 gap-y-7 md:grid-cols-2">
        {items.map((it, i) => (
          <div key={it.title + it.text.slice(0, 10)} className="flex gap-5 border-l-4 border-accent pl-5">
            <span className={`text-3xl font-extrabold ${dark ? "text-accent" : "text-navy/25"}`}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="text-lg font-extrabold">{it.title}</h3>
              <p className={`mt-1 leading-7 ${dark ? "text-white/75" : "text-muted"}`}>{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  const tiles = body === "tiles";
  return (
    <div className={`grid gap-5 ${tiles ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"}`}>
      {items.map((it, i) => (
        <article key={it.title + it.text.slice(0, 10)} className={`rounded-3xl bg-white p-6 text-navy shadow-sm ring-1 ring-navy/10 ${tiles ? "" : "border-t-4 border-accent"}`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-accent"><Icon name={ICONS[i % ICONS.length]} className="h-5 w-5" /></span>
          <h3 className="mt-4 text-lg font-extrabold">{it.title}</h3>
          <p className="mt-2 leading-7 text-muted">{it.text}</p>
        </article>
      ))}
    </div>
  );
}

function Links({ items }: { items: { name: string; href: string; note?: string }[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((r) => (
        <Link key={r.href + r.name} href={r.href} className="group flex h-full flex-col justify-between rounded-2xl border border-navy/10 bg-white p-5 text-navy transition hover:border-accent hover:shadow-md">
          <span>
            <span className="block font-extrabold">{r.name}</span>
            {r.note && <span className="mt-1 block text-sm text-muted">{r.note}</span>}
          </span>
          <Icon name="arrow" className="mt-4 h-5 w-5 text-accent transition group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}

function Table({ s }: { s: Extract<Section, { kind: "table" }> }) {
  return (
    <>
      <div className="overflow-x-auto rounded-3xl border border-navy/10 bg-white shadow-sm">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead className="bg-navy text-white">
            <tr>{s.head.map((h) => <th key={h} scope="col" className="px-5 py-4 text-sm font-extrabold uppercase tracking-wider">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-navy/10 text-muted">
            {s.rows.map((r) => (
              <tr key={r.cells[0]} className="hover:bg-surface">
                {r.cells.map((c, i) => (
                  <td key={i} className={`px-5 py-4 ${i === 0 ? "font-bold text-navy" : ""}`}>
                    {i === 0 && r.href ? <Link href={r.href} className={arrowLink}>{c}</Link> : c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {s.note && <p className="mt-3 text-sm text-muted">{s.note}</p>}
    </>
  );
}

function MapBlock({ s }: { s: Extract<Section, { kind: "map" }> }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm">
        <LazyMap title={`Map of ${s.label ?? s.query}`}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(s.query)}&z=${s.label ? 14 : 11}&output=embed`}
          className="h-80 w-full border-0 sm:h-[26rem]"/>
      </div>
      <ul className="grid content-start gap-3">
        {s.places.length === 0 && <li className="rounded-2xl bg-surface p-5 text-muted">Open the map to see the district and the roads around it.</li>}
        {s.places.map((p) => (
          <li key={p.name}>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-navy/10 bg-white p-4 transition hover:border-accent">
              <span>
                <span className="block font-bold text-navy">{p.name}</span>
                <span className="block text-sm text-muted">{p.note ?? "Open in Google Maps"}</span>
              </span>
              <Icon name="arrow" className="h-5 w-5 shrink-0 text-accent" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Steps({ s }: { s: Extract<Section, { kind: "steps" }> }) {
  return (
    <ol className="grid gap-5 md:grid-cols-4">
      {s.items.map((it, i) => (
        <li key={it.title} className="rounded-3xl bg-navy-2 p-6 ring-1 ring-white/10">
          <span className="text-5xl font-extrabold text-accent">{i + 1}</span>
          <h3 className="mt-3 text-lg font-extrabold">{it.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/75">{it.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default function SectionBands({ page }: { page: PlacePage }) {
  const body = page.layout.body;
  // Which two-tone rhythm the page uses, so neighbouring pages do not look alike.
  const flip = (page.layout.hero.length + page.name.length) % 2 === 0;
  let n = 0;
  return (
    <div>
      <section id="answer" aria-labelledby="answer-title" className="bg-white">
        <div className={`${wrap} py-10`}>
          <h2 id="answer-title" className="sr-only">Summary</h2>
          <p className="rounded-3xl border-l-8 border-accent bg-surface p-6 text-lg font-medium leading-8 text-navy sm:p-8 sm:text-xl sm:leading-9">{page.directAnswer}</p>
        </div>
      </section>
      {page.sections.map((s) => {
        if (s.kind === "steps") return <Band key={s.id} id={s.id} tone="navy"><Head id={s.id} title={s.h2} tone="navy" /><Steps s={s} /></Band>;
        n += 1;
        const tone: Tone = (n % 2 === 0) !== flip ? "surface" : "white";
        return (
          <Band key={s.id} id={s.id} tone={tone}>
            {s.kind === "faq" ? (
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <Head id={s.id} title={s.h2} tone={tone} lead="Short answers to what travellers ask before they book." />
                  <Link href="#quote" className={arrowLink}>Ask for your ride <Icon name="arrow" className="h-4 w-4" /></Link>
                </div>
                <FaqList items={s.items} />
              </div>
            ) : (
              <>
                <Head id={s.id} title={s.h2} tone={tone} lead={"intro" in s ? s.intro : undefined} />
                {s.kind === "text" && <div className="grid gap-6 text-lg leading-8 text-muted md:grid-cols-2">{s.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>}
                {s.kind === "items" && <Items items={s.items} body={body} tone={tone} />}
                {s.kind === "links" && <Links items={s.items} />}
                {s.kind === "table" && <Table s={s} />}
                {s.kind === "map" && <MapBlock s={s} />}
                {s.kind === "weather" && <WeatherWidget place={s.place} lat={s.lat} lng={s.lng} />}
              </>
            )}
          </Band>
        );
      })}
    </div>
  );
}
