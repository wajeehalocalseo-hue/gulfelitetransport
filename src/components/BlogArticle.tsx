import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import FaqList from "./Faq";
import RichText from "./RichText";
import { WhatsAppIcon, waPill } from "./WhatsApp";
import { abs, site, whatsappUrl } from "@/lib/site";
import { AUTHOR, authorPage, blogPosts } from "@/content/extra-pages";
import { formatDate, type Article, type ArticleSection, type Block } from "@/content/blog/types";

const wrap = "mx-auto max-w-7xl px-5";
const POPULAR = [
  { name: "Riyadh to Jeddah", href: "/taxi-saudi-arabia/routes/riyadh-to-jeddah" },
  { name: "Riyadh to Makkah", href: "/taxi-saudi-arabia/routes/riyadh-to-makkah" },
  { name: "Riyadh to Madinah", href: "/taxi-saudi-arabia/routes/riyadh-to-madinah" },
  { name: "Riyadh to Dammam", href: "/taxi-saudi-arabia/routes/riyadh-to-dammam" },
  { name: "Makkah to Madinah", href: "/taxi-saudi-arabia/routes/makkah-to-madinah" },
  { name: "Makkah to Jeddah", href: "/taxi-saudi-arabia/routes/makkah-to-jeddah" },
  { name: "Riyadh airport taxi", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
  { name: "Umrah and Hajj taxi", href: "/umrah-hajj-taxi" },
];

const wc = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const blockWords = (b: Block): number => {
  switch (b.t) {
    case "p": return wc(b.text);
    case "ul": case "ol": return b.items.reduce((n, i) => n + wc(i.title ?? "") + wc(i.text), 0);
    case "table": return b.rows.reduce((n, r) => n + r.reduce((m, c) => m + wc(c), 0), 0);
    case "links": return b.items.reduce((n, i) => n + wc(i.name) + wc(i.note ?? ""), 0);
    default: return 0;
  }
};
export const readMinutes = (a: Article) => Math.max(2, Math.round((a.sections.reduce((n, s) => n + s.blocks.reduce((m, b) => m + blockWords(b), 0), 0) + a.faq.reduce((n, f) => n + wc(f.q) + wc(f.a), 0) + wc(a.answer)) / 200));

function Cta({ title, text, tone = "dark", children }: { title: string; text: string; tone?: "dark" | "light"; children?: ReactNode }) {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a ride or a transport quote.`);
  const dark = tone === "dark";
  return (
    <aside className={`my-8 flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between ${dark ? "bg-navy text-white" : "border border-accent/40 bg-accent/10 text-navy"}`}>
      <div>
        <p className="text-xl font-extrabold">{title}</p>
        <p className={`mt-1.5 text-sm leading-6 ${dark ? "text-white/80" : "text-muted"}`}>{text}</p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-3">
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={`${waPill} !px-5 !py-2.5 text-sm`}>
            <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
          </a>
        )}
        {children ?? <Link href="/book" className={`rounded-full border px-5 py-2.5 text-sm font-bold ${dark ? "border-white/30 hover:border-accent hover:text-accent" : "border-navy/25 hover:border-accent"}`}>Booking form</Link>}
      </div>
    </aside>
  );
}

function BlockView({ b }: { b: Block }): ReactNode {
  switch (b.t) {
    case "p":
      return <p className="leading-8 text-muted"><RichText text={b.text} /></p>;
    case "ul":
      return (
        <ul className="space-y-3">
          {b.items.map((i) => (
            <li key={(i.title ?? "") + i.text.slice(0, 20)} className="flex gap-3 leading-7 text-muted">
              <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{i.title && <strong className="text-navy">{i.title}{/[.?!]$/.test(i.title) ? " " : ". "}</strong>}<RichText text={i.text} /></span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3">
          {b.items.map((i, n) => (
            <li key={(i.title ?? "") + i.text.slice(0, 20)} className="flex gap-3 leading-7 text-muted">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-extrabold text-accent">{n + 1}</span>
              <span>{i.title && <strong className="text-navy">{i.title}{/[.?!]$/.test(i.title) ? " " : ". "}</strong>}<RichText text={i.text} /></span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div>
          <div className="overflow-x-auto rounded-xl ring-1 ring-navy/10">
            <table className="w-full min-w-[32rem] border-collapse text-start text-sm">
              <thead className="bg-navy text-white">
                <tr>{b.head.map((h) => <th key={h} scope="col" className="px-4 py-3 text-start font-bold uppercase tracking-wide">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-navy/10 bg-white">
                {b.rows.map((r, ri) => (
                  <tr key={r[0] + ri}>
                    {r.map((c, i) => (
                      <td key={i} className={`px-4 py-3 ${i === 0 ? "font-semibold text-navy" : "text-muted"}`}>
                        {i === 0 && b.hrefs?.[ri] ? <Link href={b.hrefs[ri]!} className="underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">{c}</Link> : c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.note && <p className="mt-3 text-sm leading-6 text-muted">{b.note}</p>}
        </div>
      );
    case "links":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {b.items.map((i) => (
            <li key={i.href}>
              <Link href={i.href} className="block rounded-xl border border-navy/10 bg-white p-4 transition hover:border-accent hover:shadow-sm">
                <span className="font-bold text-navy">{i.name}</span>
                {i.note && <span className="mt-1 block text-sm leading-6 text-muted">{i.note}</span>}
              </Link>
            </li>
          ))}
        </ul>
      );
    case "cta":
      return <Cta tone="light" title={b.title} text={b.text} />;
  }
}

/** A blog post in the standard article layout: heading and details, table of contents, calls to action, sidebar and author box. */
export default function BlogArticle({ article: a }: { article: Article }) {
  const path = `/blog/${a.slug}`;
  const url = abs(path);
  const minutes = readMinutes(a);
  const published = formatDate(a.published);
  const updated = formatDate(a.updated ?? a.published);
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a ride or a transport quote.`);
  const enc = encodeURIComponent;
  const share = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${a.h1} ${url}`)}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "X", href: `https://x.com/intent/post?url=${enc(url)}&text=${enc(a.h1)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Email", href: `mailto:?subject=${enc(a.h1)}&body=${enc(url)}` },
  ];
  const toc = a.sections.filter((s) => s.h2);
  const hasCta = a.sections.some((s) => s.blocks.some((b) => b.t === "cta"));
  const recent = blogPosts.filter((p) => p.slug !== a.slug).slice(0, 5);
  const SectionView = ({ s }: { s: ArticleSection }) => (
    <section id={s.id} className={s.h2 ? "scroll-mt-28 pt-10" : ""}>
      {s.h2 && <h2 className="border-b border-navy/10 pb-3 text-2xl font-extrabold text-navy">{s.h2}</h2>}
      <div className={`space-y-4 ${s.h2 ? "mt-5" : ""}`}>
        {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
      </div>
    </section>
  );

  return (
    <main id="main" className="flex-1 bg-surface">
      <section className="border-b border-navy/10 bg-white">
        <div className={`${wrap} py-10 sm:py-14`}>
          <Breadcrumbs tone="light" items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: a.category }]} />
          <span className="mt-6 inline-block rounded-full bg-navy px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-accent">{a.category}</span>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">{a.h1}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <Link href={AUTHOR.path} className="inline-flex items-center gap-2 font-semibold text-navy hover:text-accent">
              <Image src={AUTHOR.photo} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover ring-1 ring-accent" />
              {AUTHOR.name}
            </Link>
            <span>Published {published}</span>
            <span>Last updated {updated}</span>
            <span>{minutes} min read</span>
          </p>
        </div>
      </section>

      <div className={`${wrap} grid gap-8 py-10 lg:grid-cols-[1fr_21rem]`}>
        <div className="min-w-0 space-y-6">
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-10">
            <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
              <span className="me-1 font-bold text-navy">Share:</span>
              {share.map((s) => (
                <a key={s.label} href={s.href} {...(s.href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })} aria-label={`Share on ${s.label}`} className="rounded-full border border-navy/15 px-3 py-1 font-semibold text-navy transition hover:border-accent hover:text-accent">{s.label}</a>
              ))}
            </div>

            <Cta title="Need a reliable ride in Saudi Arabia?" text="Airport, intercity or Umrah transfer: send your trip and we confirm the vehicle, driver and fare first." />

            <details open className="rounded-xl border border-navy/10 bg-surface">
              <summary className="cursor-pointer list-none px-5 py-4 font-extrabold text-navy">Table of contents</summary>
              <ol className="space-y-2 border-t border-navy/10 px-5 py-4 text-sm">
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} className="font-semibold text-navy hover:text-accent">{t.h2}</a></li>
                ))}
                {a.faq.length > 0 && <li><a href="#questions" className="font-semibold text-navy hover:text-accent">Questions and answers</a></li>}
              </ol>
            </details>

            <div className="mt-8 rounded-xl border-s-4 border-accent bg-surface p-5">
              <p className="text-xs font-extrabold uppercase tracking-wider text-accent">Quick answer</p>
              <p className="mt-2 leading-8 text-navy"><RichText text={a.answer} /></p>
            </div>

            {a.sections.map((s, i) => (
              <div key={s.id}>
                <SectionView s={s} />
                {!hasCta && i === 1 && <Cta tone="light" title="Need a lift right now?" text="Message us your pickup, drop-off and date. We reply with the vehicle and the fare before you commit." />}
              </div>
            ))}

            {a.faq.length > 0 && (
              <section id="questions" className="scroll-mt-28 pt-10">
                <h2 className="border-b border-navy/10 pb-3 text-2xl font-extrabold text-navy">Questions and answers</h2>
                <div className="mt-5"><FaqList items={a.faq} /></div>
              </section>
            )}

            {a.takeaways && (
              <section id="takeaways" className="mt-10 scroll-mt-28 rounded-xl border border-navy/10 bg-surface p-6">
                <h2 className="text-xl font-extrabold text-navy">Key takeaways</h2>
                {a.takeaways.intro && <p className="mt-2 text-sm leading-6 text-muted">{a.takeaways.intro}</p>}
                <ul className="mt-4 space-y-3">
                  {a.takeaways.items.map((i) => (
                    <li key={i.title} className="flex gap-3 text-sm leading-6 text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span><strong className="text-navy">{i.title}.</strong> {i.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Cta title="Ready to travel?" text="Tell us where and when. The vehicle, driver and fare are confirmed with you before you commit." />

            {a.tags.length > 0 && (
              <ul className="flex flex-wrap gap-2 border-t border-navy/10 pt-6" aria-label="Tags">
                {a.tags.map((t) => (
                  <li key={t} className="rounded-full bg-surface px-3 py-1 text-sm font-semibold text-navy">{t}</li>
                ))}
              </ul>
            )}
          </article>

          <section aria-label="About the author" className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:flex-row sm:items-start">
            <Image src={AUTHOR.photo} alt={`Portrait of ${AUTHOR.name}`} width={96} height={96} className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-accent" />
            <div>
              <p className="text-2xl font-extrabold text-navy">{AUTHOR.name}</p>
              <p className="text-xs font-extrabold uppercase tracking-wider text-muted">Owner, Gulf Elite Transport Group</p>
              <p className="mt-3 text-sm leading-7 text-muted">With 8 years of experience in travel and transportation, {AUTHOR.name} focuses on airport transfers, Umrah and Hajj transport, and city-to-city routes.</p>
              <p className="mt-4 flex flex-wrap items-center gap-3 text-sm font-bold">
                <a href={AUTHOR.profiles[0]} target="_blank" rel="noopener noreferrer me" className="rounded-full border border-navy/15 px-3.5 py-1.5 text-navy hover:border-accent">LinkedIn</a>
                <a href={AUTHOR.profiles[1]} target="_blank" rel="noopener noreferrer me" className="rounded-full border border-navy/15 px-3.5 py-1.5 text-navy hover:border-accent">Facebook</a>
                <Link href={authorPage.path} className="ms-auto text-navy underline decoration-accent decoration-2 underline-offset-4">View profile</Link>
              </p>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
            <h2 className="text-2xl font-extrabold leading-snug text-navy">Planning an airport, Umrah or intercity ride?</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Send your trip on WhatsApp and we confirm the vehicle, driver and fare first.</p>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${waPill} mt-4 w-full !py-3 text-sm`}>
                <WhatsAppIcon className="h-5 w-5" /> Get a quote on WhatsApp
              </a>
            )}
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
            <h2 className="border-b border-navy/10 pb-3 text-xl font-extrabold text-navy">More guides</h2>
            <ul className="mt-2 divide-y divide-navy/10">
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link href={p.page.path} className="block py-3 hover:text-accent">
                    <span className="block font-bold leading-snug text-navy">{p.article.h1}</span>
                    <span className="mt-1 block text-xs text-muted">{formatDate(p.published)}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="mt-3 block text-center text-xs font-extrabold uppercase tracking-wider text-navy hover:text-accent">View all guides</Link>
          </section>

          {a.tags.length > 0 && (
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
              <h2 className="text-xl font-extrabold text-navy">Related topics</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <li key={t} className="rounded-full border border-navy/15 px-3 py-1 text-sm font-semibold text-navy">{t}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <h2 className="text-xl font-extrabold text-navy">Popular routes</h2>
            <ul className="mt-3 space-y-1.5">
              {POPULAR.map((r) => (
                <li key={r.href}><Link href={r.href} className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-navy hover:bg-white">{r.name}</Link></li>
              ))}
            </ul>
            <Link href="/book" className="mt-4 block rounded-full bg-navy px-5 py-3 text-center text-sm font-bold text-white hover:bg-navy-2">Book a ride</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
