import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { pageGraph } from "@/lib/schema";
import { abs, site } from "@/lib/site";import { blogPosts } from "@/content/extra-pages";

const find = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  return blogPosts.find((x) => x.slug === slug)?.page;
};

export function generateStaticParams() {
  return blogPosts.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await find(params);
  if (!p) return {};
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path, type: "article" },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await find(params);
  if (!p) notFound();
  const graph = pageGraph({ path: p.path, name: p.title, description: p.description, type: "WebPage", crumbs: p.crumbs });
  (graph["@graph"] as Record<string, unknown>[]).push({
    "@type": "BlogPosting",
    "@id": `${abs(p.path)}#article`,
    mainEntityOfPage: { "@id": `${abs(p.path)}#webpage` },
    headline: p.h1,
    description: p.description,
    datePublished: "2026-11-16",
    dateModified: "2026-11-16",
    inLanguage: site.language,
    author: { "@type": "Organization", name: site.legalName, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
  });
  return (
    <>
      <JsonLd data={graph} />
      <PlaceView page={p} />
    </>
  );
}