import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { placeByPath, umrahSubPages } from "@/content/saudi/build";
import { UMRAH_BASE } from "@/content/umrah/pages";
import { placeGraph } from "@/lib/place-schema";
import { fitDescription, fitTitle } from "@/lib/seo";

/** Umrah and Hajj topic pages below the hub. */
export const dynamicParams = false;

export function generateStaticParams() {
  return umrahSubPages.map((p) => ({ path: p.path.slice(UMRAH_BASE.length + 1).split("/") }));
}

const find = async (params: Promise<{ path: string[] }>) => {
  const { path } = await params;
  return placeByPath(`${UMRAH_BASE}/${path.join("/")}`);
};

export async function generateMetadata({ params }: PageProps<"/umrah-hajj-taxi/[...path]">): Promise<Metadata> {
  const p = await find(params);
  if (!p) return {};
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default async function UmrahTopicPage({ params }: PageProps<"/umrah-hajj-taxi/[...path]">) {
  const p = await find(params);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={placeGraph(p)} />
      <PlaceView page={p} />
    </>
  );
}
