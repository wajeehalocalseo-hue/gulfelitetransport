import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { pageGraph } from "@/lib/schema";
import { abs, site } from "@/lib/site";import { blogIndex, blogPosts } from "@/content/extra-pages";

export function generateMetadata(): Metadata {
  const p = blogIndex;
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default function BlogIndexPage() {
  const p = blogIndex;
  const graph = pageGraph({
    path: p.path,
    name: p.title,
    description: p.description,
    type: "CollectionPage",
    crumbs: p.crumbs,
    items: blogPosts.map((x) => ({ name: x.page.name, path: x.page.path })),
  });
  return (
    <>
      <JsonLd data={graph} />
      <PlaceView page={p} />
    </>
  );
}