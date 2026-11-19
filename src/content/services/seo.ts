import { seoA } from "./seo-a";
import { seoB } from "./seo-b";
import { seoC } from "./seo-c";
import type { ServiceSeo } from "./seo-types";

export type { ServiceSeo } from "./seo-types";

/** Page-level SEO, coverage and layout data for the 18 service pages. See seo-types.ts. */
export const serviceSeo: Record<string, ServiceSeo> = { ...seoA, ...seoB, ...seoC };

export const getServiceSeo = (slug: string): ServiceSeo | undefined => serviceSeo[slug];
