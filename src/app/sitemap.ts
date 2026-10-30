import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: abs("/"), priority: 1, changeFrequency: "monthly" },
    { url: abs("/services"), priority: 0.9, changeFrequency: "monthly" },
    ...services.map((s) => ({
      url: abs(`/services/${s.slug}`),
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    { url: abs("/about"), priority: 0.6, changeFrequency: "yearly" },
    { url: abs("/contact"), priority: 0.7, changeFrequency: "yearly" },
    { url: abs("/privacy-policy"), priority: 0.2, changeFrequency: "yearly" },
    { url: abs("/terms-and-conditions"), priority: 0.2, changeFrequency: "yearly" },
  ];
}
