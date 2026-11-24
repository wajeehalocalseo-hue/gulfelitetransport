import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import BlogArticle from "@/components/BlogArticle";
import { pageGraph } from "@/lib/schema";
import { abs, site } from "@/lib/site";import { AUTHOR, blogPosts } from "@/content/extra-pages";

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
  const { slug } = await params;
  const post = blogPosts.find((x) => x.slug === slug);
  if (!post) notFound();
  const p = post.page;
  const graph = pageGraph({ path: p.path, name: p.title, description: p.description, type: "WebPage", crumbs: p.crumbs });
  (graph["@graph"] as Record<string, unknown>[]).push({
    "@type": "BlogPosting",
    "@id": `${abs(p.path)}#article`,
    mainEntityOfPage: { "@id": `${abs(p.path)}#webpage` },
    headline: p.h1,
    description: p.description,
    datePublished: post.article.published,
    dateModified: post.article.updated ?? post.article.published,
    inLanguage: site.language,
    articleSection: post.article.category,
    keywords: post.article.tags.join(", "),
    author: { "@type": "Person", name: AUTHOR.name, jobTitle: AUTHOR.role, url: abs(AUTHOR.path), worksFor: { "@id": `${site.url}/#organization` } },
    publisher: { "@id": `${site.url}/#organization` },
  });
  if (post.article.faq.length) {
    (graph["@graph"] as Record<string, unknown>[]).push({
      "@type": "FAQPage",
      "@id": `${abs(p.path)}#faq`,
      mainEntity: post.article.faq.map((q) => ({ "@type": "Question", name: q.q, acceptedAnswer: { "@type": "Answer", text: q.a } })),
    });
  }
  return (
    <>
      <JsonLd data={graph} />
      <BlogArticle article={post.article} />
    </>
  );
}