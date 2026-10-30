import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactButtons from "@/components/ContactButtons";
import FaqList from "@/components/Faq";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import ServiceImage from "@/components/ServiceImage";
import SubServiceCard from "@/components/SubServiceCard";
import {
  getNode,
  isBuildable,
  isIndexable,
  nodeByPath,
  publishedChildren,
  serviceNodes,
} from "@/content/taxonomy";
import { pageGraph } from "@/lib/schema";

/**
 * One template for every Level 2 (sub-service) and Level 3 (micro-service) page.
 * Pages are generated only for published nodes (plus unpublished ones in PUBLISH_PENDING preview
 * builds, which are marked noindex). Adding a record to the service data is enough to create a page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceNodes.filter(isBuildable).map((n) => {
    const segs = n.fullUrl.split("/").slice(2);
    return { slug: segs[0], path: segs.slice(1) };
  });
}

const find = async (params: Promise<{ slug: string; path: string[] }>) => {
  const { slug, path } = await params;
  const node = nodeByPath([slug, ...path]);
  return node && isBuildable(node) ? node : undefined;
};

export async function generateMetadata({ params }: PageProps<"/services/[slug]/[...path]">): Promise<Metadata> {
  const node = await find(params);
  if (!node) return {};
  return {
    title: node.seoTitle,
    description: node.metaDescription,
    alternates: { canonical: node.fullUrl },
    // Unpublished nodes (preview builds only) must never be indexed.
    robots: node.status === "published" ? undefined : { index: false, follow: false },
    openGraph: { title: node.seoTitle, description: node.metaDescription, url: node.fullUrl },
    twitter: { card: "summary_large_image", title: node.seoTitle, description: node.metaDescription },
  };
}

const h2 = "text-2xl font-extrabold tracking-tight text-navy sm:text-3xl";
const textLink = "font-bold text-navy underline decoration-accent decoration-2 underline-offset-4";

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

export default async function SubServicePage({ params }: PageProps<"/services/[slug]/[...path]">) {
  const node = await find(params);
  if (!node?.content) notFound();
  const c = node.content;
  const parent = node.parentId ? getNode(node.parentId) : undefined;
  const main = getNode(node.mainServiceId);
  if (!parent || !main) notFound();

  const children = publishedChildren(node.id);
  const related = node.relatedServices
    .map((id) => getNode(id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n && isIndexable(n) && n.id !== node.id));
  const siblings = related.filter((n) => n.parentId === node.parentId);
  const others = related.filter((n) => n.parentId !== node.parentId);

  return (
    <main id="main" className="flex-1">
      <JsonLd
        data={pageGraph({
          path: node.fullUrl,
          name: node.seoTitle,
          description: node.metaDescription,
          crumbs: node.breadcrumbs,
          service: {
            name: node.name,
            description: c.directAnswer,
            serviceType: node.name,
            parentPath: parent.fullUrl,
            children: children.map((k) => ({ name: k.name, path: k.fullUrl })),
          },
        })}
      />

      <PageHero
        crumbs={node.breadcrumbs.map((b, i, a) => (i === a.length - 1 ? { name: b.name } : { name: b.name, href: b.path }))}
        h1={c.h1}
        lead={c.lead}
        aside={
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10">
            <ServiceImage
              slug={node.slug}
              sceneSlug={node.image.sceneSlug}
              flip={node.order % 2 === 0}
              title={node.name}
              priority
              className="h-full w-full"
            />
          </div>
        }
      >
        <ContactButtons service={node.name} />
      </PageHero>

      <nav aria-label="On this page" className="border-b border-navy/10 bg-white">
        <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3">
          {[
            ["#overview", "Overview"],
            ["#included", "What's included"],
            ["#applications", "Applications"],
            ["#how", "How it works"],
            ["#info", "Quotation info"],
            ["#faq", "FAQ"],
            ["#quote", "Get a quote"],
          ].map(([href, label]) => (
            <li key={href} className="shrink-0">
              <a
                href={href}
                className="inline-block rounded-full px-4 py-2 text-sm font-semibold text-navy ring-1 ring-navy/15 hover:bg-accent hover:ring-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.45fr_1fr]">
        <div className="min-w-0 space-y-14">
          <section aria-labelledby="answer">
            <h2 id="answer" className="sr-only">Summary</h2>
            <p className="rounded-2xl border-l-4 border-accent bg-white p-6 text-lg font-medium leading-8 text-navy">
              {c.directAnswer}
            </p>
            <p className="mt-4 text-sm text-muted">
              Part of{" "}
              <Link href={parent.fullUrl} className={textLink}>{parent.name}</Link>
              {" "}| <Link href="/services" className={textLink}>All services</Link>
            </p>
          </section>

          <section aria-labelledby="overview">
            <h2 id="overview" className={h2}>{node.name} overview</h2>
            <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
              {c.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="differs">
            <h2 id="differs" className={h2}>{c.differs.heading}</h2>
            <p className="mt-4 text-lg leading-8 text-muted">{c.differs.text}</p>
          </section>

          <section aria-labelledby="included">
            <h2 id="included" className={h2}>What {node.name.toLowerCase()} includes</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.includes.map((i) => (
                <article key={i.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <h3 className="font-bold text-navy">{i.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{i.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="audience">
            <h2 id="audience" className={h2}>Who needs {node.name.toLowerCase()}?</h2>
            <Checklist items={c.audience} />
          </section>

          <section aria-labelledby="applications">
            <h2 id="applications" className={h2}>Typical applications</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.applications.map((u) => (
                <article key={u.title} className="rounded-2xl bg-navy p-5 text-white">
                  <h3 className="font-bold text-accent">{u.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-white/80">{u.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="how">
            <h2 id="how" className={h2}>How it works</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {c.steps.map((st, i) => (
                <li key={st.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-extrabold text-navy">{i + 1}</span>
                  <h3 className="mt-3 font-bold text-navy">{st.title}</h3>
                  <p className="mt-1.5 text-sm leading-7 text-muted">{st.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="considerations">
            <h2 id="considerations" className={h2}>Planning considerations</h2>
            <dl className="mt-6 space-y-4">
              {c.considerations.map((x) => (
                <div key={x.title} className="rounded-2xl border border-navy/10 bg-white p-5">
                  <dt className="font-bold text-navy">{x.title}</dt>
                  <dd className="mt-1.5 text-sm leading-7 text-muted">{x.text}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="info">
            <h2 id="info" className={h2}>Information we need for a quotation</h2>
            <Checklist items={c.quoteInfo} />
            <p className="mt-6 text-muted">
              Availability depends on your locations and dates. We confirm it with you before any
              arrangement is made.
            </p>
          </section>

          {children.length > 0 && (
            <section aria-labelledby="options">
              <h2 id="options" className={h2}>Explore {node.name} options</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {children.map((k) => (
                  <li key={k.id} className="flex">
                    <SubServiceCard node={k} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="faq">
            <h2 id="faq" className={h2}>{node.name}: frequently asked questions</h2>
            <div className="mt-6">
              <FaqList items={c.faqs} />
            </div>
          </section>

          {(siblings.length > 0 || others.length > 0) && (
            <section aria-labelledby="related">
              <h2 id="related" className={h2}>Related services</h2>
              <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                {[...siblings, ...others].map((o) => (
                  <li key={o.id} className="flex">
                    <SubServiceCard node={o} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="text-muted">
            Back to <Link href={parent.fullUrl} className={textLink}>{parent.name}</Link>, see all{" "}
            <Link href="/services" className={textLink}>transport services</Link>, read{" "}
            <Link href="/about" className={textLink}>about Gulf Elite Transport</Link> or{" "}
            <Link href="/contact" className={textLink}>contact the team</Link>.
          </p>
        </div>

        <aside
          id="quote"
          aria-labelledby="quote-title"
          className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24"
        >
          <h2 id="quote-title" className="text-xl font-extrabold text-navy">
            Request a {node.name} quote
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Just have a question first?{" "}
            <Link href="/contact" className={textLink}>
              Request service information
            </Link>
            .
          </p>
          <div className="mt-5">
            <QuoteForm defaultService={main.name} topic={node.name} />
          </div>
        </aside>
      </div>
    </main>
  );
}
