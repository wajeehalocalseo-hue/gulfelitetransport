import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { RIYADH_MAIN, placePages, placeByPath } from "@/content/saudi/build";
import { placeGraph } from "@/lib/place-schema";

/** Districts and district-to-district rides under the Riyadh Taxi Service page. */
export function generateStaticParams() {
  return placePages.filter((p) => p.path.startsWith(`${RIYADH_MAIN}/`)).map((p) => ({ slug: p.path.slice(RIYADH_MAIN.length + 1) }));
}

const pageFor = async (params: Promise<{ slug: string }>) => placeByPath(`${RIYADH_MAIN}/${(await params).slug}`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await pageFor(params);
  if (!p) return {};
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default async function RiyadhSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await pageFor(params);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={placeGraph(p)} />
      <PlaceView page={p} />
    </>
  );
}
