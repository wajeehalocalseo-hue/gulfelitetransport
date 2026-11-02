import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { BASE, placeByPath } from "@/content/saudi/build";
import { placeGraph } from "@/lib/place-schema";

const page = () => placeByPath(BASE);

export function generateMetadata(): Metadata {
  const p = page();
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default function TaxiSaudiHub() {
  const p = page();
  if (!p) notFound();
  return (
    <>
      <JsonLd data={placeGraph(p)} />
      <PlaceView page={p} />
    </>
  );
}
