import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { RIYADH_MAIN, placeByPath } from "@/content/saudi/build";
import { placeGraph } from "@/lib/place-schema";

const page = () => placeByPath(RIYADH_MAIN);

export function generateMetadata(): Metadata {
  const p = page();
  if (!p) return {};
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default function RiyadhTaxiServicePage() {
  const p = page();
  if (!p) notFound();
  return (
    <>
      <JsonLd data={placeGraph(p)} />
      <PlaceView page={p} />
    </>
  );
}
