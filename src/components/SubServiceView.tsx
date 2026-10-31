import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import ContactButtons from "./ContactButtons";
import FaqList from "./Faq";
import Icon from "./Icon";
import QuoteForm from "./QuoteForm";
import ServiceImage from "./ServiceImage";
import SubServiceCard from "./SubServiceCard";
import type { ServiceNode } from "@/content/taxonomy";
import type { Layout, PageContent } from "@/content/subservices";

const h2 = "text-2xl font-extrabold tracking-tight text-navy sm:text-3xl";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";
const defaultLayout: Layout = { hero: "split", body: "cards", form: "aside" };

function Check({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 leading-7 text-muted">
      <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" />
      <span>{children}</span>
    </li>
  );
}

function Table({ head, rows }: { head: [string, string]; rows: [string, string][] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <table className="w-full border-collapse text-left text-sm max-md:block">
        <thead className="bg-navy text-white max-md:sr-only">
          <tr>
            <th scope="col" className="w-1/3 p-4 font-bold">{head[0]}</th>
            <th scope="col" className="p-4 font-bold">{head[1]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy/10 max-md:block">
          {rows.map(([a, b]) => (
            <tr key={a} className="align-top max-md:block max-md:p-4">
              <th scope="row" className="p-4 font-bold text-navy max-md:block max-md:p-0 max-md:pb-1">{a}</th>
              <td className="p-4 leading-6 text-muted max-md:block max-md:p-0">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
type Props = {
  node: ServiceNode;
  parent: ServiceNode;
  main: ServiceNode;
  subs: ServiceNode[];
  related: ServiceNode[];
};

/**
 * Renders a Level 2 / Level 3 page. The same content is shown in different shapes depending on
 * `node.layout` (hero style, body style and form placement), so pages do not all look alike.
 * Headings, ids and content order stay SEO-safe in every variant.
 */
export default function SubServiceView({ node, parent, main, subs, related }: Props) {
  const c = node.content as PageContent;
  const L = node.layout ?? defaultLayout;
  const crumbs = node.breadcrumbs.map((b, i, a) => (i === a.length - 1 ? { name: b.name } : { name: b.name, href: b.path }));
  const quoteHref = L.form === "hero" ? "#hero-quote" : "#quote";
  const facts = [
    { label: "Best for", value: node.audienceShort },
    { label: "Typical use", value: c.applications[0]?.title ?? "" },
    { label: "We ask for", value: c.quoteInfo.slice(0, 2).join(", ") },
    { label: "Availability", value: "Confirmed for each request" },
  ];

  /* ------------------------------------------------------------------ hero */
  const quickForm = (
    <div id="hero-quote" className="rounded-2xl bg-white p-6 text-navy shadow-2xl sm:p-7">
      <h2 className="text-xl font-extrabold">Get a free quote</h2>
      <p className="mb-5 mt-1 text-sm leading-6 text-muted">Tell us what you need and we will reply with a quotation.</p>
      <QuoteForm variant="quick" defaultService={main.name} topic={node.name} />
    </div>
  );

  const image = (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-black/10">
      <ServiceImage slug={node.slug} sceneSlug={node.image.sceneSlug} flip={node.order % 2 === 0} title={node.name} priority className="h-full w-full" />
    </div>
  );

  const factsCard = (
    <dl className="rounded-2xl bg-navy p-6 text-white shadow-xl">
      {facts.map((f) => (
        <div key={f.label} className="border-b border-white/10 py-3 first:pt-0 last:border-0 last:pb-0">
          <dt className="text-xs font-bold uppercase tracking-wider text-accent">{f.label}</dt>
          <dd className="mt-1 text-sm leading-6 text-white/85">{f.value}</dd>
        </div>
      ))}
    </dl>
  );

  const hero: ReactNode = (() => {
    switch (L.hero) {
      case "banner":
        return (
          <section className="border-b border-navy/10 bg-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Breadcrumbs items={crumbs} tone="light" />
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{c.h1}</h1>
                <span aria-hidden="true" className="mt-5 block h-1.5 w-20 rounded-full bg-accent" />
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{c.lead}</p>
                <ContactButtons quoteHref={quoteHref} service={node.name} tone="light" className="mt-8" />
              </div>
              {L.form === "hero" ? quickForm : factsCard}
            </div>
          </section>
        );
      case "facts":
        return (
          <section className="bg-navy text-white">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
              <div className={L.form === "hero" ? "grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]" : ""}>
                <div>
                  <Breadcrumbs items={crumbs} />
                  <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{c.h1}</h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{c.lead}</p>
                  <ContactButtons quoteHref={quoteHref} service={node.name} className="mt-8" />
                </div>
                {L.form === "hero" && quickForm}
              </div>
              <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {facts.map((f) => (
                  <div key={f.label} className="rounded-xl bg-navy-2 p-5 ring-1 ring-white/10">
                    <dt className="text-xs font-bold uppercase tracking-wider text-accent">{f.label}</dt>
                    <dd className="mt-2 text-sm leading-6 text-white/85">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        );
      case "route":
        return (
          <section className="bg-navy text-white">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
              <div className={L.form === "hero" ? "grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]" : ""}>
                <div>
                  <Breadcrumbs items={crumbs} />
                  <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{c.h1}</h1>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{c.lead}</p>
                  <ContactButtons quoteHref={quoteHref} service={node.name} className="mt-8" />
                </div>
                {L.form === "hero" && quickForm}
              </div>
              <ol aria-label="How a movement runs" className="mt-12 grid grid-cols-3 gap-2 text-center sm:gap-4">
                {["Pickup agreed", "Route planned", "Delivery confirmed"].map((s, i) => (
                  <li key={s} className="relative">
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                    {i < 2 && <span aria-hidden="true" className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-6 border-t-2 border-dashed border-accent/60" />}
                    <span className="mt-3 block text-xs font-semibold text-white/85 sm:text-sm">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      default:
        return (
          <section className="bg-navy text-white">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <Breadcrumbs items={crumbs} />
                <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{c.h1}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{c.lead}</p>
                <ContactButtons quoteHref={quoteHref} service={node.name} className="mt-8" />
              </div>
              {L.form === "hero" ? quickForm : image}
            </div>
          </section>
        );
    }
  })();

  /* -------------------------------------------------------------- sections */
  const sections: Record<string, { label: string; node: ReactNode } | null> = {
    answer: {
      label: "Summary",
      node: (
        <section id="answer" aria-labelledby="answer-title">
          <h2 id="answer-title" className="sr-only">Summary</h2>
          <p className="rounded-2xl border-l-4 border-accent bg-white p-6 text-lg font-medium leading-8 text-navy">{c.directAnswer}</p>
          <p className="mt-4 text-sm text-muted">
            {node.level === 3 && main.id !== parent.id ? (
              <>
                Part of <Link href={parent.fullUrl} className={textLink}>{parent.name}</Link>, within{" "}
                <Link href={main.fullUrl} className={textLink}>{main.name}</Link>
              </>
            ) : (
              <>Part of <Link href={parent.fullUrl} className={textLink}>{parent.name}</Link></>
            )}{" "}
            | <Link href="/services" className={textLink}>All services</Link>
          </p>
        </section>
      ),
    },
    overview: {
      label: "Overview",
      node: (
        <section id="overview" aria-labelledby="overview-title">
          <h2 id="overview-title" className={h2}>{node.name} overview</h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            {c.overview.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>
      ),
    },
    differs: {
      label: "How it differs",
      node: (
        <section id="differs" aria-labelledby="differs-title">
          <h2 id="differs-title" className={h2}>{c.differs.heading}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{c.differs.text}</p>
        </section>
      ),
    },
    includes: {
      label: "What's included",
      node: (
        <section id="included" aria-labelledby="included-title">
          <h2 id="included-title" className={h2}>What {node.name.toLowerCase()} includes</h2>
          {L.body === "table" ? (
            <Table head={["Component", "What it means"]} rows={c.includes.map((i) => [i.title, i.text])} />
          ) : L.body === "timeline" ? (
            <ul className="mt-6 space-y-5 border-l-2 border-accent/50 pl-6">
              {c.includes.map((i) => (
                <li key={i.title} className="relative">
                  <span aria-hidden="true" className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full bg-accent" />
                  <h3 className="font-bold text-navy">{i.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{i.text}</p>
                </li>
              ))}
            </ul>
          ) : L.body === "checklist" ? (
            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {c.includes.map((i) => (
                <Check key={i.title}><strong className="text-navy">{i.title}.</strong> {i.text}</Check>
              ))}
            </ul>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.includes.map((i) => (
                <article key={i.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <h3 className="font-bold text-navy">{i.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{i.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      ),
    },
    solutions: subs.length
      ? {
          label: "Solutions",
          node: (
            <section id="solutions" aria-labelledby="solutions-title">
              <h2 id="solutions-title" className={h2}>Explore Our {node.name} Solutions</h2>
              <p className="mt-4 text-lg leading-8 text-muted">
                {node.name} covers some specific requirements. Choose the closest one for details on what it includes and what we need to prepare a quotation.
              </p>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {subs.map((k) => (
                  <li key={k.id} className="flex"><SubServiceCard node={k} /></li>
                ))}
              </ul>
            </section>
          ),
        }
      : null,
    audience: {
      label: "Who needs it",
      node: (
        <section id="audience" aria-labelledby="audience-title">
          <h2 id="audience-title" className={h2}>Who needs {node.name.toLowerCase()}?</h2>
          <ul className="mt-5 space-y-3">
            {c.audience.map((a) => (
              <Check key={a}>{a}</Check>
            ))}
          </ul>
        </section>
      ),
    },
    applications: {
      label: "Applications",
      node: (
        <section id="applications" aria-labelledby="applications-title">
          <h2 id="applications-title" className={h2}>Typical applications</h2>
          {L.body === "table" ? (
            <Table head={["Use case", "Example"]} rows={c.applications.map((u) => [u.title, u.text])} />
          ) : L.body === "timeline" || L.body === "checklist" ? (
            <ul className="mt-6 space-y-3">
              {c.applications.map((u) => (
                <li key={u.title} className="rounded-xl border-l-4 border-accent bg-white p-4">
                  <strong className="text-navy">{u.title}.</strong> <span className="text-muted">{u.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.applications.map((u) => (
                <article key={u.title} className="rounded-2xl bg-navy p-5 text-white">
                  <h3 className="font-bold text-accent">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-white/80">{u.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      ),
    },
    steps: {
      label: "How it works",
      node: (
        <section id="how" aria-labelledby="how-title">
          <h2 id="how-title" className={h2}>How it works</h2>
          {L.body === "timeline" ? (
            <ol className="mt-8 space-y-0">
              {c.steps.map((st, i) => (
                <li key={st.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < c.steps.length - 1 && <span aria-hidden="true" className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-0.5 bg-accent/40" />}
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-navy">{st.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-muted">{st.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          ) : L.body === "table" ? (
            <ol className="mt-6 grid overflow-hidden rounded-2xl border border-navy/10 bg-white sm:grid-cols-2 lg:grid-cols-4">
              {c.steps.map((st, i) => (
                <li key={st.title} className="border-b border-navy/10 p-5 last:border-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Step {i + 1}</span>
                  <h3 className="mt-1 font-bold text-navy">{st.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{st.text}</p>
                </li>
              ))}
            </ol>
          ) : L.body === "checklist" ? (
            <ol className="mt-6 space-y-3 rounded-2xl border border-navy/10 bg-white p-5">
              {c.steps.map((st, i) => (
                <li key={st.title} className="flex gap-4">
                  <span className="text-2xl font-extrabold text-accent">{i + 1}</span>
                  <p className="leading-7 text-muted"><strong className="text-navy">{st.title}.</strong> {st.text}</p>
                </li>
              ))}
            </ol>
          ) : (
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.steps.map((st, i) => (
                <li key={st.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-navy">{st.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{st.text}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      ),
    },
    considerations: {
      label: "Planning",
      node: (
        <section id="considerations" aria-labelledby="considerations-title">
          <h2 id="considerations-title" className={h2}>Planning considerations</h2>
          {L.body === "table" ? (
            <Table head={["Consideration", "Why it matters"]} rows={c.considerations.map((x) => [x.title, x.text])} />
          ) : L.body === "timeline" ? (
            <div className="mt-6 divide-y divide-navy/10 rounded-2xl border border-navy/10 bg-white">
              {c.considerations.map((x) => (
                <details key={x.title} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy">
                    {x.title}
                    <Icon name="chevron" className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-muted">{x.text}</p>
                </details>
              ))}
            </div>
          ) : L.body === "checklist" ? (
            <ul className="mt-6 space-y-3">
              {c.considerations.map((x) => (
                <Check key={x.title}><strong className="text-navy">{x.title}.</strong> {x.text}</Check>
              ))}
            </ul>
          ) : (
            <dl className="mt-6 space-y-4">
              {c.considerations.map((x) => (
                <div key={x.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <dt className="font-bold text-navy">{x.title}</dt>
                  <dd className="mt-1.5 text-sm leading-7 text-muted">{x.text}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      ),
    },
    info: {
      label: "Quotation info",
      node: (
        <section id="info" aria-labelledby="info-title">
          {L.body === "checklist" ? (
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
              <h2 id="info-title" className="text-2xl font-extrabold text-accent sm:text-3xl">Before you request: what we need for a quotation</h2>
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {c.quoteInfo.map((q) => (
                  <li key={q} className="flex gap-3 text-white/85">
                    <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" /> {q}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-white/70">Availability depends on your locations and dates. We confirm it with you before any arrangement is made.</p>
            </div>
          ) : (
            <>
              <h2 id="info-title" className={h2}>Information we need for a quotation</h2>
              <ul className="mt-5 space-y-3">
                {c.quoteInfo.map((q) => (
                  <Check key={q}>{q}</Check>
                ))}
              </ul>
              <p className="mt-6 text-muted">Availability depends on your locations and dates. We confirm it with you before any arrangement is made.</p>
            </>
          )}
        </section>
      ),
    },
    faq: {
      label: "FAQ",
      node: (
        <section id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className={h2}>{node.name}: frequently asked questions</h2>
          <div className="mt-6"><FaqList items={c.faqs} /></div>
        </section>
      ),
    },
    related: related.length
      ? {
          label: "Related",
          node: (
            <section id="related" aria-labelledby="related-title">
              <h2 id="related-title" className={h2}>Related services</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {related.map((o) => (
                  <li key={o.id} className="flex"><SubServiceCard node={o} /></li>
                ))}
              </ul>
            </section>
          ),
        }
      : null,
  };

  const orders: Record<Layout["body"], string[]> = {
    cards: ["answer", "overview", "differs", "includes", "solutions", "audience", "applications", "steps", "considerations", "info", "faq", "related"],
    timeline: ["answer", "overview", "steps", "differs", "includes", "solutions", "applications", "audience", "considerations", "info", "faq", "related"],
    table: ["answer", "differs", "includes", "solutions", "overview", "applications", "steps", "considerations", "audience", "info", "faq", "related"],
    checklist: ["answer", "info", "overview", "differs", "includes", "solutions", "audience", "steps", "applications", "considerations", "faq", "related"],
  };
  const order = orders[L.body].filter((k) => sections[k]);
  const chipTargets: Record<string, string> = { answer: "answer", overview: "overview", includes: "included", solutions: "solutions", applications: "applications", steps: "how", info: "info", faq: "faq" };
  const chips = [
    ...order.filter((k) => chipTargets[k] && k !== "answer").map((k) => ({ href: `#${chipTargets[k]}`, label: sections[k]!.label })),
    { href: "#quote", label: "Get a quote" },
  ];

  const body = (
    <div className="min-w-0 space-y-14">
      {order.map((k) => (
        <div key={k}>{sections[k]!.node}</div>
      ))}
      <p className="text-muted">
        Back to <Link href={parent.fullUrl} className={textLink}>{parent.name}</Link>,{" "}
        {node.level === 3 && main.id !== parent.id && (
          <>
            <Link href={main.fullUrl} className={textLink}>{main.name}</Link>,{" "}
          </>
        )}
        see all <Link href="/services" className={textLink}>transport services</Link>, read{" "}
        <Link href="/about" className={textLink}>about Gulf Elite Transport</Link> or{" "}
        <Link href="/contact" className={textLink}>contact the team</Link>.
      </p>
    </div>
  );

  const fullForm = (
    <QuoteForm defaultService={main.name} topic={node.name} />
  );

  return (
    <main id="main" className="flex-1">
      {hero}

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

      {L.form === "aside" ? (
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.45fr_1fr]">
          {body}
          <aside id="quote" aria-labelledby="quote-title" className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 id="quote-title" className="text-xl font-extrabold text-navy">Request a {node.name} quote</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Just have a question first? <Link href="/contact" className={textLink}>Request service information</Link>.
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
                <h2 id="quote-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">Request a {node.name} quote</h2>
                <p className="mt-4 text-lg leading-8 text-white/75">
                  Tell us what you need and we will respond with a quotation or the questions we need answered. Or{" "}
                  <Link href="/contact" className="font-bold text-accent underline underline-offset-4">request service information</Link>.
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
