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
  ].filter(Boolean);

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a transport and logistics service for businesses. It provides freight and cargo transport, passenger transport, equipment and machinery moving, and contract fleet services.`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${s.short}`),
    "",
    "## Pages",
    `- [Home](${abs("/")})`,
    `- [All services](${abs("/services")})`,
    `- [About](${abs("/about")})`,
    `- [Contact](${abs("/contact")})`,
    "",
    "## Contact",
    ...contact,
    "",
    "## Notes",
    "- Service availability depends on pickup and delivery locations, service type and dates, and is confirmed individually for each request.",
    site.serviceAreas.length
      ? `- Confirmed service areas: ${site.serviceAreas.join(", ")}`
      : "- Specific service areas are confirmed on request.",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
