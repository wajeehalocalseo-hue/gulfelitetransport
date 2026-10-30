import { hubAnswer, hubFaqs } from "@/content/hub";
import { services } from "@/content/services";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const contact = [
    site.phone && `- Phone: ${site.phone}`,
    site.email && `- Email: ${site.email}`,
    site.address && `- Address: ${site.address}`,
    site.hours && `- Hours: ${site.hours}`,
    `- Contact page: ${abs("/contact")}`,
    `- Quote form: ${abs("/services")}#quote`,
  ].filter(Boolean);

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a transport and logistics service for businesses and organisations. It provides freight and cargo transport, passenger transport, equipment and machinery moving, and contract fleet services.`,
    "",
    "## Summary",
    hubAnswer.answer,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Main pages",
    `- [Home](${abs("/")})`,
    `- [All services](${abs("/services")}): overview, comparison table, service selection guide and FAQs`,
    `- [About](${abs("/about")})`,
    `- [Contact](${abs("/contact")})`,
    `- [Full service details for AI systems](${abs("/llms-full.txt")})`,
    "",
    "## Quick answers",
    ...hubFaqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Contact",
    ...contact,
    "",
    "## Notes",
    "- Prices are not published. Each request receives a quotation based on its own details before the customer commits.",
    "- Service availability depends on pickup and delivery locations, service type and dates, and is confirmed individually for each request.",
    site.serviceAreas.length
      ? `- Confirmed service areas: ${site.serviceAreas.join(", ")}`
      : "- Specific service areas are confirmed on request; no fixed coverage list is published.",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
