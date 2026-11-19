import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import ContactButtons from "./ContactButtons";
import FaqList from "./Faq";
import Icon from "./Icon";
import ImageSlot from "./ImageSlot";
import PageHero from "./PageHero";
import QuoteForm from "./QuoteForm";
import RichText from "./RichText";
import ServiceCard from "./ServiceCard";
import SubServiceCard from "./SubServiceCard";
import type { Service } from "@/content/services";
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

function Fig({ s, seo, i, className = "", priority = false }: { s: Service; seo: ServiceSeo; i: 0 | 1 | 2; className?: string; priority?: boolean }) {
  const im = seo.images[i];
  return (
    <figure className={`overflow-hidden rounded-2xl shadow-sm ring-1 ring-navy/10 ${className}`}>
      {/* {im.label}: put the photo at public/images/routes/services/{s.slug}/{im.slot}.webp (about 1000 x 558) */}
      <ImageSlot folder={`services/${s.slug}`} slot={im.slot} alt={im.alt} label={im.label} width={1000} height={558} priority={priority} sizes="(min-width: 1024px) 40rem, 100vw" />
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

function Hero({ s, seo, crumbs }: Pick<Props, "s" | "seo" | "crumbs">) {
  const wa = <ContactButtons service={s.title} message={seo.waMessage} />;
  const v = seo.layout.hero;
  if (v === "split") return <PageHero crumbs={crumbs} h1={seo.h1} lead={seo.lead} booking={{ service: s.title }}>{wa}</PageHero>;

  if (v === "light-image")
    return (
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Breadcrumbs items={crumbs} tone="light" />
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{seo.h1}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{seo.lead}</p>
            <div className="mt-8"><ContactButtons service={s.title} message={seo.waMessage} tone="light" /></div>
          </div>
          <Fig s={s} seo={seo} i={0} priority />
        </div>
      </section>
    );

  if (v === "band")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{seo.h1}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
              <div className="mt-8">{wa}</div>
            </div>
            <ul className="grid gap-3">
              {s.benefits.map((b) => (
                <li key={b} className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-semibold">
                  <Icon name="check" className="h-5 w-5 shrink-0 text-accent" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );

  if (v === "ledger")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{seo.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
            <div className="mt-8">{wa}</div>
          </div>
          <ol className="divide-y divide-white/15 rounded-3xl border border-white/15 bg-white/5">
            {s.benefits.map((b, i) => (
              <li key={b} className="flex items-center gap-4 px-6 py-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                <span className="font-semibold">{b}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );

  if (v === "centered")
    return (
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:py-20">
          <Breadcrumbs items={crumbs} center />
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{seo.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">{seo.lead}</p>
          <div className="mt-8 flex justify-center"><ContactButtons service={s.title} message={seo.waMessage} className="sm:justify-center" /></div>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {s.benefits.map((b) => (
              <li key={b} className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold text-white/90">{b}</li>
            ))}
          </ul>
        </div>
      </section>
    );

  // banner: light text block with a wide photo underneath
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <Breadcrumbs items={crumbs} tone="light" />
        <div className="mt-6 grid gap-8 border-l-8 border-accent pl-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{seo.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{seo.lead}</p>
          </div>
          <div><ContactButtons service={s.title} message={seo.waMessage} tone="light" /></div>
        </div>
        <Fig s={s} seo={seo} i={0} className="mt-10" priority />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- sections */

function Overview({ s, seo }: Pick<Props, "s" | "seo">) {
  const paras = [...seo.intro, ...s.overview.slice(1)];
  const figInHero = seo.layout.hero === "light-image" || seo.layout.hero === "banner";
  const body = (
    <div className="space-y-4 text-lg leading-8 text-muted">
      {paras.map((p) => (
        <p key={p.slice(0, 28)}><RichText text={p} /></p>
      ))}
    </div>
  );
  return (
    <section id="overview" aria-labelledby="overview-title">
      <h2 id="overview-title" className={h2c}>{seo.h2.overview}</h2>
      <div className="mt-5">
        {figInHero ? body : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            {body}
            <Fig s={s} seo={seo} i={0} />
          </div>
        )}
      </div>
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
  return (
    <section id="how" aria-labelledby="how-title">
      <h2 id="how-title" className={h2c}>{seo.h2.how}</h2>
      <Fig s={s} seo={seo} i={1} className="mt-6" />
      {style === "grid" && (
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
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
        <ol className="mt-8 space-y-0 border-l-2 border-accent pl-6">
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
        <ol className="mt-6 grid gap-3 lg:grid-cols-4">
          {s.steps.map((st, i) => (
            <li key={st.title} className="rounded-2xl bg-navy p-5 text-white">
              <span className="text-sm font-extrabold uppercase tracking-wider text-accent">Step {i + 1}</span>
              <h3 className="mt-2 font-bold">{st.title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-white/80">{st.text}</p>
            </li>
          ))}
        </ol>
      )}
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

function Coverage({ s, seo }: Pick<Props, "s" | "seo">) {
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
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {seo.coverage.cities.map((c) => (
          <li key={c.name} className="rounded-2xl border border-navy/10 bg-white p-4">
            <span className="font-bold text-navy">{c.name}</span>
            <span className="mt-1 block text-sm leading-6 text-muted">{c.note}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-6 text-muted">These are places where goods and people move. They are not a list of offices or depots. Availability depends on your locations and dates and is confirmed with you before any arrangement is made.</p>
    </section>
  );
}

/* -------------------------------------------------------------------- page */

export default function ServicePageView({ s, seo, crumbs, subs, related, taxiBlock }: Props) {
  const faqItems = [...seo.faqs, ...s.faqs];
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
            {taxiBlock}
            {subs.length > 0 && (
              <section id="solutions" aria-labelledby="solutions-title" className="mt-14">
                <h2 id="solutions-title" className={h2c}>Explore Our {s.title} Solutions</h2>
                <p className="mt-4 text-lg leading-8 text-muted">
                  {s.title} covers several specific needs. Choose the one closest to your requirement for details on what it includes, who it suits and what we need to prepare a quotation.
                </p>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
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

  const sticky = seo.layout.aside === "sticky";
  const sections = order.map((id) => <div key={id}>{render(id)}</div>);

  const quoteBox = (
    <>
      <h2 id="quote-title" className="text-xl font-extrabold text-navy">{seo.cta.heading}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        {seo.cta.text} Just have a question first? <Link href="/contact" className={textLink}>Request service information</Link>.
      </p>
      <div className="mt-5"><QuoteForm defaultService={s.title} /></div>
    </>
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

      <div className={sticky ? "mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.45fr_1fr]" : "mx-auto max-w-5xl px-5 py-16"}>
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="answer">
            <h2 id="answer" className="sr-only">Summary</h2>
            <p className="rounded-2xl border-l-4 border-accent bg-white p-6 text-lg font-medium leading-8 text-navy">{seo.directAnswer}</p>
          </section>
          {sections}
        </div>
        {sticky && (
          <aside id="quote" aria-labelledby="quote-title" className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            {quoteBox}
          </aside>
        )}
      </div>

      {!sticky && (
        <section id="quote" aria-labelledby="quote-title" className="bg-navy">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="text-white">
              <h2 id="quote-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">{seo.cta.heading}</h2>
              <p className="mt-3 leading-7 text-white/80">{seo.cta.text}</p>
              <div className="mt-6"><ContactButtons service={s.title} message={seo.waMessage} quoteHref="#quote-form" /></div>
            </div>
            <div id="quote-form" className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-sm leading-6 text-muted">Just have a question first? <Link href="/contact" className={textLink}>Request service information</Link>.</p>
              <div className="mt-4"><QuoteForm defaultService={s.title} /></div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
