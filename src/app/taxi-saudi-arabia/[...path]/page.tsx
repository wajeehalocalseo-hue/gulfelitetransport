import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { BASE, placeByPath, subPages } from "@/content/saudi/build";
import { placeGraph } from "@/lib/place-schema";

/** One route for every Saudi taxi page below the hub: regions, cities, areas, airports and routes. */
export const dynamicParams = false;

export function generateStaticParams() {
  return subPages.map((p) => ({ path: p.path.slice(BASE.length + 1).split("/") }));
}

const find = async (params: Promise<{ path: string[] }>) => {
  const { path } = await params;
  return placeByPath(`${BASE}/${path.join("/")}`);
};

export async function generateMetadata({ params }: PageProps<"/taxi-saudi-arabia/[...path]">): Promise<Metadata> {
  const p = await find(params);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default async function TaxiSaudiPage({ params }: PageProps<"/taxi-saudi-arabia/[...path]">) {
  const p = await find(params);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={placeGraph(p)} />
      <PlaceView page={p} />
    </>
  );
}
