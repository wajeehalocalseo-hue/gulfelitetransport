import { services } from "@/content/services";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

/** Plain-text export of every published service page, intended for AI systems and crawlers. */
export function GET() {
  const list = (items: string[]) => items.map((i) => `- ${i}`);

  const body = [
    `# ${site.name} - full service details`,
    "",
    `Source: ${abs("/services")}`,
    "",
    ...services.flatMap((s) => [
      `## ${s.title}`,
      `URL: ${abs(`/services/${s.slug}`)}`,
      "",
      s.directAnswer,
      "",
      ...s.overview.flatMap((p) => [p, ""]),
      "### What it includes",
      ...s.includes.map((i) => `- ${i.title}: ${i.text}`),
      "",
      "### How it works",
      ...s.steps.map((st, i) => `${i + 1}. ${st.title}: ${st.text}`),
      "",
      "### Who needs it",
      ...list(s.audience),
      "",
      "### Information needed for a quotation",
      ...list(s.quoteInfo),
      "",
      "### What affects the quotation",
      ...list(s.quoteFactors),
      "",
      "### Frequently asked questions",
      ...s.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
    ]),
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
