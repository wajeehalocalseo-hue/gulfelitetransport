import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { WhatsAppIcon, waPill } from "./WhatsApp";
import { whatsappUrl, site } from "@/lib/site";
import { AUTHOR, authorPage, blogPosts } from "@/content/extra-pages";
import { regions } from "@/content/saudi/regions";

const wrap = "mx-auto max-w-7xl px-5";
const chip = "rounded-full border border-navy/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-navy";
const fact = (p: (typeof blogPosts)[number], label: string) => p.page.facts.find((f) => f.label === label)?.value ?? "";

const expertise = ["Airport transfers", "Umrah and Hajj transport", "City-to-city routes", "Private taxi and cab rides", "Road travel in Saudi Arabia"];
const credentials = [
  "8 years of experience in travel and transportation",
  "Owner of Gulf Elite Transport Group",
  "Author of the guides on this blog",
  "Focus: airports, Umrah and Hajj, city-to-city routes",
];

/** The author page: a profile with a portrait, a few true figures, the guides and how they are written. Only facts given by the author are shown. */
export default function AuthorProfile() {
  const wa = whatsappUrl(`Hello ${site.name}, I would like to request a ride or a transport quote.`);
  const method = authorPage.sections.find((s) => s.id === "method");
  const stats = [
    { n: String(blogPosts.length), label: "Guides published" },
    { n: "8", label: "Years in travel and transport" },
    { n: "3", label: "Focus areas" },
    { n: String(regions.length), label: "Saudi regions with taxi pages" },
  ];
  return (
    <main id="main" className="flex-1">
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-2" />
        <div className={`${wrap} relative pb-24 pt-8 sm:pb-28`}>
          <Breadcrumbs items={authorPage.crumbs.map((c, i, a) => (i === a.length - 1 ? { name: c.name } : { name: c.name, href: c.path }))} />
          <div className="mt-10 grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <div className="relative mx-auto md:mx-0">
              <Image
                src={authorPage.portrait!.src}
                alt={authorPage.portrait!.alt}
                width={authorPage.portrait!.width}
                height={authorPage.portrait!.height}
                priority
                className="h-56 w-56 rounded-[2rem] object-cover shadow-2xl ring-4 ring-accent/80 sm:h-64 sm:w-64"
              />
            </div>
            <div className="text-center md:text-start">
              <span className="inline-block rounded-full border border-accent/50 bg-accent/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-accent">Author profile</span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{AUTHOR.name}</h1>
              <p className="mt-2 text-sm font-extrabold uppercase tracking-wider text-accent">Owner, Gulf Elite Transport Group</p>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/85 md:mx-0">{authorPage.directAnswer.replace(/^Wajeeha Amin is the owner of Gulf Elite Transport Group, a taxi, cab and freight transport company serving Saudi Arabia, and /, "Wajeeha Amin is the owner of Gulf Elite Transport Group and ")}</p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <a href={AUTHOR.profiles[0]} target="_blank" rel="noopener noreferrer me" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:border-accent hover:text-accent">LinkedIn</a>
                <a href={AUTHOR.profiles[1]} target="_blank" rel="noopener noreferrer me" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:border-accent hover:text-accent">Facebook</a>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={`${waPill} !px-6 !py-2.5 text-sm`}>
                    <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`${wrap} relative -mt-14`}>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="rounded-2xl bg-white p-5 text-center shadow-lg ring-1 ring-navy/10">
              <p className="text-3xl font-extrabold text-navy">{s.n}</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${wrap} grid gap-10 py-14 lg:grid-cols-[1fr_22rem]`}>
        <div>
          <div className="flex items-center justify-between gap-4">
            <h2 className="border-s-4 border-accent ps-4 text-2xl font-extrabold text-navy">Latest guides</h2>
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-bold text-navy">{blogPosts.length} posts</span>
          </div>
          <ul className="mt-6 space-y-4">
            {blogPosts.map((p) => (
              <li key={p.slug}>
                <Link href={p.page.path} className="block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 transition hover:shadow-md hover:ring-accent">
                  <p className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
                    <span className="rounded bg-navy px-2 py-0.5 text-accent">{fact(p, "Topic") || "Guide"}</span>
                    <span className="text-muted">{fact(p, "Published")}</span>
                  </p>
                  <h3 className="mt-3 text-xl font-extrabold leading-snug text-navy">{p.page.h1}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{p.page.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-2 font-bold text-navy underline decoration-accent decoration-2 underline-offset-4">All guides on the blog</Link>

          {method && method.kind === "items" && (
            <div className="mt-14">
              <h2 className="border-s-4 border-accent ps-4 text-2xl font-extrabold text-navy">{method.h2}</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {method.items.map((it) => (
                  <li key={it.title} className="rounded-2xl bg-surface p-5">
                    <p className="font-extrabold text-navy">{it.title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted">{it.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
            <h2 className="text-xl font-extrabold text-navy">Areas of expertise</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {expertise.map((e) => (
                <li key={e} className={chip}>{e}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
            <h2 className="text-xl font-extrabold text-navy">Background</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
              {credentials.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-2xl bg-navy p-6 text-white">
            <h2 className="text-xl font-extrabold">Need a ride?</h2>
            <p className="mt-2 text-sm leading-6 text-white/80">Tell us where and when. We confirm the vehicle, driver and fare with you before you commit.</p>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={`${waPill} mt-5 w-full !py-3 text-sm`}>
                <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
              </a>
            )}
            <Link href="/book" className="mt-3 block rounded-full border border-white/30 px-5 py-3 text-center text-sm font-bold hover:border-accent hover:text-accent">Use the booking form</Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
