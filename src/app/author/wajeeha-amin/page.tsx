import { fitDescription, fitTitle } from "@/lib/seo";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AuthorProfile from "@/components/AuthorProfile";
import { pageGraph } from "@/lib/schema";
import { abs, site } from "@/lib/site";
import { AUTHOR, authorPage } from "@/content/extra-pages";

export function generateMetadata(): Metadata {
  const p = authorPage;
  return {
    title: fitTitle(p.title),
    description: fitDescription(p.description),
    alternates: { canonical: p.path },
    openGraph: { title: p.title, description: p.description, url: p.path, type: "profile" },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

export default function AuthorPage() {
  const p = authorPage;
  const personId = `${abs(p.path)}#person`;
  const graph = pageGraph({ path: p.path, name: p.title, description: p.description, type: "ProfilePage", crumbs: p.crumbs });
  const nodes = graph["@graph"] as Record<string, unknown>[];
  nodes[0].mainEntity = { "@id": personId };
  nodes.push({
    "@type": "Person",
    "@id": personId,
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: abs(p.path),
    image: abs(AUTHOR.photo),
    sameAs: [...AUTHOR.profiles],
    description: p.directAnswer,
    worksFor: { "@id": `${site.url}/#organization` },
    knowsAbout: ["Airport transfers in Saudi Arabia", "Umrah and Hajj transport", "City-to-city routes in Saudi Arabia", "Taxi and cab services"],
  });
  return (
    <>
      <JsonLd data={graph} />
      <AuthorProfile />
    </>
  );
}
