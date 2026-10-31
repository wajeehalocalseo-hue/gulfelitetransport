import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import SubServiceView from "@/components/SubServiceView";
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
 * One route for every Level 2 (sub-service) and Level 3 (micro-service) page.
 * Pages are generated only for published nodes (plus unpublished ones in PUBLISH_PENDING preview
 * builds, which are marked noindex). Adding a record to the service data is enough to create a page;
 * its look comes from the record's `layout` (see SubServiceView).
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

export default async function SubServicePage({ params }: PageProps<"/services/[slug]/[...path]">) {
  const node = await find(params);
  if (!node?.content) notFound();
  const parent = node.parentId ? getNode(node.parentId) : undefined;
  const main = getNode(node.mainServiceId);
  if (!parent || !main) notFound();

  const children = publishedChildren(node.id);
  const all = node.relatedServices
    .map((id) => getNode(id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n && isIndexable(n) && n.id !== node.id));
  // Siblings first, then related services from other branches.
  const related = [...all.filter((n) => n.parentId === node.parentId), ...all.filter((n) => n.parentId !== node.parentId)];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path: node.fullUrl,
          name: node.seoTitle,
          description: node.metaDescription,
          crumbs: node.breadcrumbs,
          service: {
            name: node.name,
            description: node.content.directAnswer,
            serviceType: node.name,
            parentPath: parent.fullUrl,
            children: children.map((k) => ({ name: k.name, path: k.fullUrl })),
          },
        })}
      />
      <SubServiceView node={node} parent={parent} main={main} subs={children} related={related} />
    </>
  );
}