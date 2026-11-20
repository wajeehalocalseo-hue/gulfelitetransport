import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ContactButtons from "./ContactButtons";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import QuoteForm from "./QuoteForm";
import RichText from "./RichText";
import ServiceCard from "./ServiceCard";
import SubServiceCard from "./SubServiceCard";
import { COVERAGE_NOTE, coverageRegions, type CoverageRegion } from "@/content/services/coverage-regions";
import { serviceVariants } from "@/content/services/seo-variants";
import type { Service } from "@/content/services";
import { pageFaqs } from "@/content/services/seo";
import type { SectionId, ServiceSeo } from "@/content/services/seo-types";
import type { ServiceNode } from "@/content/taxonomy";

/**
 * The page for one of the 18 service pages. Every page uses the same brand colours and tokens (navy, accent, surface, ivory, gold, muted).
 * What differs is the layout: each service picks a hero, a way of showing "includes", "how it works", "use cases" and "planning", where the
 * quote form sits and the order of the sections (see content/services/seo-*.ts, `layout`). The words come from the service data and the seo data.
 */

type Props = {
  s: Service;
  seo: ServiceSeo;
  crumbs: { name: string; href?: string }[];
  subs: ServiceNode[];
  related: Service[];
  taxiBlock?: ReactNode;
};

const h2c = "text-2xl font-extrabold tracking-tight text-navy sm:text-3xl";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";
const card = "rounded-2xl border border-navy/10 bg-white p-5";

function Fig({ s, seo, i, className = "", priority = false, wide = false }: { s: Service; seo: ServiceSeo; i: 0 | 1 | 2; className?: string; priority?: boolean; wide?: boolean }) {
  const im = seo.images[i];
  return (
    <figure className={`overflow-hidden rounded-2xl shadow-sm ring-1 ring-navy/10 ${className}`}>
      {/* {im.label}: put the photo at public/images/routes/services/{s.slug}/{im.slot}.webp (about 1000 x 558) */}
      <ImageSlot folder={`services/${s.slug}`} slot={im.slot} alt={im.alt} label={im.label} width={1000} height={wide ? 330 : 558} priority={priority} icon={<Icon name={s.icon} className="h-5 w-5" />} sizes="(min-width: 1024px) 40rem, 100vw" />
    </figure>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((a) => (
        <li key={a} className="flex gap-3 leading-7 text-muted">
          <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" /> {a}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ heroes */

/**
 * The compact enquiry form in every hero. It is the site's own QuoteForm in its "compact" variant (same fields, validation,
 * saving, WhatsApp/email fallback, spam protection and analytics as every other form), in a small card. On phones it is placed
 * first in the hero, so it is the first thing under the site header (`max-lg:order-first` on the grid or flex parent).
 */
function HeroForm({ s, className = "" }: { s: Service; className?: string }) {
  return (
    <div id="hero-quote" className={`w-full max-w-xl rounded-2xl border-t-4 border-accent bg-white p-4 text-navy shadow-xl ring-1 ring-black/10 sm:p-5 max-lg:order-first max-lg:mx-auto ${className}`}>
      <h2 className="text-lg font-extrabold">Request a quote</h2>
      <p className="mb-3 mt-0.5 text-sm leading-6 text-muted">Tell us what you need. We reply with questions or a quotation.</p>
      <QuoteForm variant="compact" defaultService={s.title} />
    </div>
  );
}

function Hero({ s, seo, crumbs }: Pick<Props, "s" | "seo" | "crumbs">) {
  const v = seo.layout.hero;
  const wa = (tone: "dark" | "light", className = "") => <ContactButtons service={s.title} message={seo.waMessage} quoteHref="#hero-quote" tone={tone} className={className} />;
  const h1 = (cls: string) => <h1 className={cls}>{seo.h1}</h1>;

  if (v === "split")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-5 py-6 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <Breadcrumbs items={crumbs} />
            {h1("mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl")}
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
            <div className="mt-6">{wa("dark")}</div>
          </div>
          <HeroForm s={s} className="lg:justify-self-end" />
        </div>
      </section>
    );

  if (v === "light-image")
    return (
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <Breadcrumbs items={crumbs} tone="light" />
            {h1("mt-5 text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl")}
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">{seo.lead}</p>
            <div className="mt-6">{wa("light")}</div>
            <Fig s={s} seo={seo} i={0} className="mt-8" priority />
          </div>
          <HeroForm s={s} className="lg:justify-self-end" />
        </div>
      </section>
    );

  if (v === "band")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10">
            <div>
              <Breadcrumbs items={crumbs} />
              {h1("mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl")}
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
              <div className="mt-6">{wa("dark")}</div>
            </div>
            <HeroForm s={s} className="lg:justify-self-end" />
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
            {s.benefits.map((b) => (
              <li key={b} className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-semibold">
                <Icon name="check" className="h-5 w-5 shrink-0 text-accent" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );

  if (v === "ledger")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
            <div>
              <Breadcrumbs items={crumbs} />
              {h1("mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl")}
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
              <div className="mt-6">{wa("dark")}</div>
            </div>
            <HeroForm s={s} className="lg:justify-self-end" />
          </div>
          <ol className="mt-8 grid divide-y divide-white/15 overflow-hidden rounded-3xl border border-white/15 bg-white/5 sm:grid-cols-2 sm:divide-y-0 lg:grid-flow-col lg:auto-cols-fr lg:divide-x">
            {s.benefits.map((b, i) => (
              <li key={b} className="flex items-center gap-4 px-5 py-4 sm:border-b sm:border-white/10 lg:border-b-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                <span className="text-sm font-semibold">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );

  if (v === "centered")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-5 py-6 text-center sm:py-12">
          <HeroForm s={s} className="mb-8 text-left max-lg:mb-6 lg:order-last lg:mb-0 lg:mt-8 lg:max-w-2xl" />
          <Breadcrumbs items={crumbs} center />
          {h1("mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl")}
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
          <div className="mt-6 flex justify-center">{wa("dark", "sm:justify-center")}</div>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {s.benefits.map((b) => (
              <li key={b} className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/90">{b}</li>
            ))}
          </ul>
        </div>
      </section>
    );

  // banner: light text block, the form beside it and a wide photo underneath
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-10">
          <div className="lg:border-l-8 lg:border-accent lg:pl-6">
            <Breadcrumbs items={crumbs} tone="light" />
            {h1("mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl")}
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{seo.lead}</p>
            <div className="mt-6">{wa("light")}</div>
          </div>
          <HeroForm s={s} className="lg:justify-self-end" />
        </div>
        <Fig s={s} seo={seo} i={0} className="mt-8" priority />
      </div>
    </section>
  );
}

/** Four service-specific stages as a visual strip, so each page shows how its own service runs at a glance. */
function Rail({ seo }: Pick<Props, "seo">) {
  const { style, items } = seo.rail;
  return (
    <section aria-labelledby="glance-title">
      <h2 id="glance-title" className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold">At a glance</h2>
      {style === "arrows" && (
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.title} className="relative rounded-2xl border border-navy/10 bg-white p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-accent"><Icon name={it.icon} className="h-5 w-5" /></span>
              <h3 className="mt-3 font-bold text-navy">{it.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{it.text}</p>
              {i < items.length - 1 && <Icon name="arrow" className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-accent p-1 text-navy lg:block" />}
            </li>
          ))}
        </ol>
      )}
      {style === "stacked" && (
        <ol className="mt-4 grid divide-y divide-navy/10 overflow-hidden rounded-2xl bg-navy text-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
          {items.map((it, i) => (
            <li key={it.title} className="p-5">
              <span className="text-3xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 flex items-center gap-2 font-bold"><Icon name={it.icon} className="h-4 w-4 text-accent" /> {it.title}</h3>
              <p className="mt-1 text-sm leading-6 text-white/75">{it.text}</p>
            </li>
          ))}
        </ol>
      )}
      {style === "chips" && (
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li key={it.title} className="flex items-center gap-3 rounded-full border border-navy/15 bg-ivory py-2.5 pl-2.5 pr-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-navy"><Icon name={it.icon} className="h-5 w-5" /></span>
              <span className="leading-tight"><span className="block text-sm font-bold text-navy">{it.title}</span><span className="block text-xs text-muted">{it.text}</span></span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- sections */

function Overview({ s, seo }: Pick<Props, "s" | "seo">) {
  const paras = [...seo.intro, ...s.overview.slice(1)];
  const figInHero = seo.layout.hero === "light-image" || seo.layout.hero === "banner";
  // The first two paragraphs sit beside the photo; the rest run underneath in two columns, so no column ends in a gap.
  const head = figInHero ? [] : paras.slice(0, 2);
  const tail = figInHero ? paras : paras.slice(2);
  const p = (t: string) => <p key={t.slice(0, 28)} className="pb-4 last:pb-0"><RichText text={t} /></p>;
  return (
    <section id="overview" aria-labelledby="overview-title">
      <h2 id="overview-title" className={h2c}>{seo.h2.overview}</h2>
      {head.length > 0 && (
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4 text-lg leading-8 text-muted">{head.map((t) => <p key={t.slice(0, 28)}><RichText text={t} /></p>)}</div>
          <Fig s={s} seo={seo} i={0} />
        </div>
      )}
      {tail.length > 0 && <div className={`${head.length ? "mt-6" : "mt-5"} text-lg leading-8 text-muted lg:columns-2 lg:gap-10`}>{tail.map(p)}</div>}
    </section>
  );
}

function Includes({ s, seo }: Pick<Props, "s" | "seo">) {
  const style = seo.layout.includes;
  return (
    <section id="includes" aria-labelledby="includes-title">
      <h2 id="includes-title" className={h2c}>{seo.h2.includes}</h2>
      {style === "cards" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {s.includes.map((i) => (
            <article key={i.title} className={card}>
              <h3 className="font-bold text-navy">{i.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-muted">{i.text}</p>
            </article>
          ))}
        </div>
      )}
      {style === "ledger" && (
        <ol className="mt-6 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
          {s.includes.map((i, n) => (
            <li key={i.title} className="grid gap-2 p-5 sm:grid-cols-[3rem_1fr] sm:gap-5">
              <span className="text-2xl font-extrabold text-gold">{String(n + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-bold text-navy">{i.title}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">{i.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {style === "tiles" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {s.includes.map((i) => (
            <article key={i.title} className="rounded-2xl border-t-4 border-accent bg-white p-5 shadow-sm ring-1 ring-navy/10">
              <Icon name="check" className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-bold text-navy">{i.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-muted">{i.text}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function How({ s, seo }: Pick<Props, "s" | "seo">) {
  const style = seo.layout.steps;
  const steps = (
    <>
      {style === "grid" && (
        <ol className="grid gap-4 sm:grid-cols-2">
          {s.steps.map((st, i) => (
            <li key={st.title} className={card}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
              <h3 className="mt-3 font-bold text-navy">{st.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-muted">{st.text}</p>
            </li>
          ))}
        </ol>
      )}
      {style === "timeline" && (
        <ol className="space-y-0 border-l-2 border-accent pl-6">
          {s.steps.map((st, i) => (
            <li key={st.title} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[2.2rem] flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-accent">{i + 1}</span>
              <h3 className="font-bold text-navy">{st.title}</h3>
              <p className="mt-1 max-w-2xl text-sm leading-7 text-muted">{st.text}</p>
            </li>
          ))}
        </ol>
      )}
      {style === "chevrons" && (
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <li key={st.title} className="rounded-2xl bg-navy p-5 text-white">
              <span className="text-sm font-extrabold uppercase tracking-wider text-accent">Step {i + 1}</span>
              <h3 className="mt-2 font-bold">{st.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-white/80">{st.text}</p>
            </li>
          ))}
        </ol>
      )}
    </>
  );
  return (
    <section id="how" aria-labelledby="how-title">
      <h2 id="how-title" className={h2c}>{seo.h2.how}</h2>
      {/* A wide photo banner above the steps, so no column is left with empty space under a photo. */}
      <div className="mt-6 space-y-6">
        <Fig s={s} seo={seo} i={1} wide />
        {steps}
      </div>
    </section>
  );
}

function UseCases({ s, seo }: Pick<Props, "s" | "seo">) {
  const style = seo.layout.usecases;
  return (
    <section id="usecases" aria-labelledby="usecases-title">
      <h2 id="usecases-title" className={h2c}>{seo.h2.usecases}</h2>
      {style === "navy" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {s.useCases.map((u) => (
            <article key={u.title} className="rounded-2xl bg-navy p-5 text-white">
              <h3 className="font-bold text-accent">{u.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-white/80">{u.text}</p>
            </article>
          ))}
        </div>
      )}
      {style === "columns" && (
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {s.useCases.map((u) => (
            <article key={u.title} className="border-t-2 border-accent pt-4">
              <h3 className="font-bold text-navy">{u.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-muted">{u.text}</p>
            </article>
          ))}
        </div>
      )}
      {style === "list" && (
        <dl className="mt-6 divide-y divide-navy/10 rounded-2xl bg-ivory ring-1 ring-navy/10">
          {s.useCases.map((u) => (
            <div key={u.title} className="grid gap-1 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
              <dt className="font-bold text-navy">{u.title}</dt>
              <dd className="text-sm leading-7 text-muted">{u.text}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

function Planning({ s, seo }: Pick<Props, "s" | "seo">) {
  const style = seo.layout.planning;
  return (
    <section id="planning" aria-labelledby="planning-title">
      <h2 id="planning-title" className={h2c}>{seo.h2.planning}</h2>
      <p className="mt-4 text-lg leading-8 text-muted">
        A few points make the biggest difference to how smoothly this service runs. Thinking about them before you send your request leads to a faster and more accurate quotation.
      </p>
      {style === "cards" && (
        <dl className="mt-6 space-y-4">
          {s.considerations.map((c) => (
            <div key={c.title} className={card}>
              <dt className="font-bold text-navy">{c.title}</dt>
              <dd className="mt-1.5 text-sm leading-7 text-muted">{c.text}</dd>
            </div>
          ))}
        </dl>
      )}
      {style === "split" && (
        <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {s.considerations.map((c) => (
            <div key={c.title} className="border-l-4 border-accent pl-4">
              <dt className="font-bold text-navy">{c.title}</dt>
              <dd className="mt-1 text-sm leading-7 text-muted">{c.text}</dd>
            </div>
          ))}
        </dl>
      )}
      {style === "table" && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{seo.h2.planning}</caption>
            <thead className="bg-navy text-white">
              <tr><th scope="col" className="px-4 py-3 font-bold">Point</th><th scope="col" className="px-4 py-3 font-bold">Why it matters</th></tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {s.considerations.map((c) => (
                <tr key={c.title} className="align-top">
                  <th scope="row" className="w-1/3 px-4 py-3 font-bold text-navy">{c.title}</th>
                  <td className="px-4 py-3 leading-7 text-muted">{c.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/** Short blocks on the common ways the service is requested, each under its own H3. */
function Variants({ s }: Pick<Props, "s">) {
  const v = serviceVariants[s.slug];
  if (!v) return null;
  return (
    <section id="variants" aria-labelledby="variants-title" className="mt-12">
      <h2 id="variants-title" className={h2c}>{v.h2}</h2>
      <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
        {v.items.map((b) => (
          <article key={b.h} className="border-t-2 border-accent pt-4">
            <h3 className="text-lg font-bold text-navy">{b.h}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{b.t}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Coverage({ s, seo }: Pick<Props, "s" | "seo">) {
  const style = seo.coverageStyle;
  const link = seo.linkRegions;
  const regionName = (r: CoverageRegion) => (link ? <Link href={r.taxiPath} className="underline decoration-accent decoration-2 underline-offset-4 hover:text-gold">{r.name}</Link> : r.name);
  const chips = (r: CoverageRegion) => (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {r.cities.map((c) => (
        <li key={c} className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-navy ring-1 ring-navy/10">{c}</li>
      ))}
    </ul>
  );
  return (
    <section id="coverage" aria-labelledby="coverage-title">
      <h2 id="coverage-title" className={h2c}>{seo.h2.coverage}</h2>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <div className="space-y-4 text-lg leading-8 text-muted">
          {seo.coverage.paragraphs.map((p) => (
            <p key={p.slice(0, 28)}><RichText text={p} /></p>
          ))}
        </div>
        <Fig s={s} seo={seo} i={2} />
      </div>

      <h3 className="mt-8 text-xl font-bold text-navy">Places this service is often asked about</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {seo.coverage.cities.map((c) => (
          <li key={c.name} className="rounded-2xl border border-navy/10 bg-white p-4">
            <span className="font-bold text-navy">{c.name}</span>
            <span className="mt-1 block text-sm leading-6 text-muted">{c.note}</span>
          </li>
        ))}
      </ul>

      <h3 className="mt-10 text-xl font-bold text-navy">All 13 regions of Saudi Arabia</h3>
      <p className="mt-2 leading-7 text-muted">
        {s.title} requests can be made for places in any of the Kingdom&apos;s regions. Tap a region to see the cities and towns that are commonly asked about.
      </p>

      {style === "grid" && (
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coverageRegions.map((r) => (
            <li key={r.id} className="rounded-2xl border-t-4 border-accent bg-white p-5 shadow-sm ring-1 ring-navy/10">
              <h4 className="font-extrabold text-navy">{regionName(r)}</h4>
              <p className="mt-1 text-sm leading-6 text-muted">{r.note}</p>
              {chips(r)}
            </li>
          ))}
        </ul>
      )}

      {style === "accordion" && (
        <div className="mt-5 divide-y divide-navy/10 overflow-hidden rounded-2xl border border-navy/10 bg-white">
          {coverageRegions.map((r, i) => (
            <details key={r.id} className="group p-4 sm:p-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-extrabold text-navy">
                <span>{r.name} <span className="ml-1 text-xs font-semibold text-muted">{r.cities.length} places</span></span>
                <Icon name="chevron" className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-2 text-sm leading-6 text-muted">{r.note}{link && <> <Link href={r.taxiPath} className="font-bold text-navy underline decoration-accent decoration-2 underline-offset-4">Taxi pages for {r.name}</Link>.</>}</p>
              {chips(r)}
            </details>
          ))}
        </div>
      )}

      {style === "columns" && (
        <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverageRegions.map((r, i) => (
            <div key={r.id} className="border-l-4 border-accent pl-4">
              <dt className="flex items-baseline gap-2 font-extrabold text-navy"><span className="text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>{regionName(r)}</dt>
              <dd className="mt-1 text-sm leading-7 text-muted">{r.cities.join(", ")}</dd>
            </div>
          ))}
        </dl>
      )}

      <p className="mt-5 text-sm leading-6 text-muted">{COVERAGE_NOTE}</p>
    </section>
  );
}

/* -------------------------------------------------------------------- page */

export default function ServicePageView({ s, seo, crumbs, subs, related, taxiBlock }: Props) {
  const faqItems = pageFaqs(s.slug, seo, s.faqs);
  const order = seo.layout.order;
  const present: { id: SectionId | "quote"; label: string }[] = [];
  const labels: Record<string, string> = { overview: "Overview", includes: "What's included", solutions: "Solutions", how: "How it works", audience: "Who needs it", usecases: "Use cases", coverage: "Saudi Arabia coverage", planning: "Planning", info: "Quotation info", faq: "FAQ", related: "Related services" };

  const render = (id: SectionId): ReactNode => {
    switch (id) {
      case "overview": return <Overview s={s} seo={seo} />;
      case "includes":
        return (
          <>
            <Includes s={s} seo={seo} />
            <Variants s={s} />
            {taxiBlock}
            {subs.length > 0 && (
              <section id="solutions" aria-labelledby="solutions-title" className="mt-14">
                <h2 id="solutions-title" className={h2c}>Explore Our {s.title} Solutions</h2>
                <p className="mt-4 text-lg leading-8 text-muted">
                  {s.title} covers several specific needs. Choose the one closest to your requirement for details on what it includes, who it suits and what we need to prepare a quotation.
                </p>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {subs.map((k) => (
                    <li key={k.id} className="flex"><SubServiceCard node={k} /></li>
                  ))}
                </ul>
              </section>
            )}
          </>
        );
      case "solutions": return null;
      case "how": return <How s={s} seo={seo} />;
      case "audience":
        return (
          <section id="audience" aria-labelledby="audience-title">
            <h2 id="audience-title" className={h2c}>Who needs this service</h2>
            <Checklist items={s.audience} />
          </section>
        );
      case "usecases": return <UseCases s={s} seo={seo} />;
      case "coverage": return <Coverage s={s} seo={seo} />;
      case "planning": return <Planning s={s} seo={seo} />;
      case "info":
        return (
          <section id="info" aria-labelledby="info-title">
            <h2 id="info-title" className={h2c}>Information we need for a quotation</h2>
            <p className="mt-4 text-lg leading-8 text-muted">The more precisely you describe the requirement, the faster we can assess it. Please include:</p>
            <Checklist items={s.quoteInfo} />
            <h3 className="mt-8 text-xl font-bold text-navy">What affects the quotation?</h3>
            <Checklist items={s.quoteFactors} />
            <p className="mt-6 text-muted">Availability depends on your locations and dates. We confirm it with you before any arrangement is made.</p>
          </section>
        );
      case "faq":
        return (
          <section id="faq" aria-labelledby="faq-title">
            <h2 id="faq-title" className={h2c}>{seo.h2.faq}</h2>
            <div className="mt-6"><FaqList items={faqItems} /></div>
          </section>
        );
      case "related":
        return (
          <section id="related" aria-labelledby="related-title">
            <h2 id="related-title" className={h2c}>Related services</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((o) => (
                <li key={o.slug} className="flex"><ServiceCard s={o} headingLevel={3} /></li>
              ))}
            </ul>
            <p className="mt-6 text-muted">
              See all <Link href="/services" className={textLink}>transport services</Link>, read <Link href="/about" className={textLink}>about Gulf Elite Transport</Link> or{" "}
              <Link href="/contact" className={textLink}>contact the team</Link>.
            </p>
          </section>
        );
    }
  };

  for (const id of order) {
    if (id === "solutions") continue;
    present.push({ id, label: labels[id] });
    if (id === "includes" && subs.length) present.push({ id: "solutions", label: labels.solutions });
  }
  present.push({ id: "quote", label: "Get a quote" });

  const band = seo.layout.aside === "band";

  const intro = (dark: boolean) => (
    <div className={dark ? "text-white" : "text-navy"}>
      <h2 id="quote-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">{seo.cta.heading}</h2>
      <p className={`mt-3 leading-7 ${dark ? "text-white/80" : "text-muted"}`}>{seo.cta.text}</p>
      <div className="mt-6"><ContactButtons service={s.title} message={seo.waMessage} quoteHref="#quote-form" tone={dark ? "dark" : "light"} /></div>
    </div>
  );

  return (
    <main id="main" className="flex-1">
      <Hero s={s} seo={seo} crumbs={crumbs} />

      <nav aria-label="On this page" className="border-b border-navy/10 bg-white">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {present.map((p) => (
            <li key={p.id} className="shrink-0">
              <a href={`#${p.id}`} className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-navy ring-1 ring-navy/15 hover:bg-accent hover:ring-accent">{p.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content in full-width bands that alternate between the page surface and white, so the page has rhythm instead of one long column. */}
      <div className="py-10 sm:py-12">
        <div className="mx-auto max-w-5xl space-y-10 px-5">
          <section aria-labelledby="answer">
            <h2 id="answer" className="sr-only">Summary</h2>
            <p className="rounded-2xl border-l-4 border-accent bg-white p-6 text-lg font-medium leading-8 text-navy shadow-sm">{seo.directAnswer}</p>
          </section>
          <Rail seo={seo} />
        </div>
      </div>
      {order.map((id, n) => (
        <div key={id} className={n % 2 === 0 ? "bg-white" : ""}>
          <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">{render(id)}</div>
        </div>
      ))}

      {/* The second enquiry form: the complete QuoteForm, full width, in two columns of fields (never a tall side column). */}
      {band ? (
        <section id="quote" aria-labelledby="quote-title" className="bg-navy">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            {intro(true)}
            <div id="quote-form" className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm leading-6 text-muted">Just have a question first? <Link href="/contact" className={textLink}>Request service information</Link>.</p>
              <div className="mt-4"><QuoteForm defaultService={s.title} /></div>
            </div>
          </div>
        </section>
      ) : (
        <section id="quote" aria-labelledby="quote-title" className="border-t border-navy/10 bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-12">
            <div className="text-center [&>div]:mx-auto [&_div]:justify-center">{intro(false)}</div>
            <div id="quote-form" className="mt-8 rounded-2xl border-t-4 border-accent bg-white p-5 shadow-md sm:p-7">
              <p className="text-sm leading-6 text-muted">Just have a question first? <Link href="/contact" className={textLink}>Request service information</Link>.</p>
              <div className="mt-4"><QuoteForm defaultService={s.title} /></div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
