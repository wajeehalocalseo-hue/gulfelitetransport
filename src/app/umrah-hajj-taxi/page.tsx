import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PlaceView from "@/components/PlaceView";
import { umrahHub } from "@/content/saudi/build";
import { placeGraph } from "@/lib/place-schema";
import { fitDescription, fitTitle } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const p = umrahHub;
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default function UmrahHajjHub() {
  if (!umrahHub) notFound();
  return (
    <>
      <JsonLd data={placeGraph(umrahHub)} />
      <PlaceView page={umrahHub} />
    </>
  );
}
