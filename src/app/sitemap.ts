import type { MetadataRoute } from "next";
import { indexableNodes, pathOf } from "@/content/taxonomy";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

// Only published, canonical, indexable pages are listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: abs("/"), priority: 1, changeFrequency: "monthly" },
    { url: abs("/services"), priority: 0.9, changeFrequency: "monthly" },
    ...indexableNodes().map((n) => ({
      url: abs(pathOf(n)),
      priority: n.level === 1 ? 0.8 : 0.7,
      changeFrequency: "monthly" as const,
    })),
    { url: abs("/about"), priority: 0.6, changeFrequency: "yearly" },
    { url: abs("/contact"), priority: 0.7, changeFrequency: "yearly" },
    { url: abs("/privacy-policy"), priority: 0.2, changeFrequency: "yearly" },
    { url: abs("/terms-and-conditions"), priority: 0.2, changeFrequency: "yearly" },
  ];
}
