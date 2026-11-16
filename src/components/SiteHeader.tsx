import HeaderNav, { type MenuData } from "./HeaderNav";
import { cities } from "@/content/saudi/cities";
import { cityHref } from "@/content/saudi/paths";
import { airports, routes } from "@/content/saudi/places";
import { regions } from "@/content/saudi/regions";
import { groups, services } from "@/content/services";

const BASE = "/taxi-saudi-arabia";
const cityName = (id: string) => cities.find((c) => c.id === id)?.name ?? id;

/** Builds the menu data on the server so the client menu does not ship the full page content. */
export default function SiteHeader() {
  const menu: MenuData = {
    taxi: {
      base: BASE,
      regions: regions.map((r) => ({ name: r.name, href: `${BASE}/${r.id}` })),
      cities: cities.slice(0, 8).map((c) => ({ name: c.name, href: cityHref(BASE, c) })),
      routes: routes.slice(0, 6).map((r) => ({ name: `${cityName(r.from)} to ${cityName(r.to)}`, href: `${BASE}/routes/${r.id}`, km: r.km })),
      airports: ["RUH", "JED", "MED", "DMM", "TIF", "AHB"].flatMap((code) => airports.filter((a) => a.code === code)).map((a) => ({ name: a.name, href: `${BASE}/airports/${a.id}`, code: a.code })),
    },
    // Transport services (passenger and taxi) come first, then the other services.
    services: [...groups].sort((a, b) => (a.id === "passenger" ? -1 : 0) - (b.id === "passenger" ? -1 : 0)).map((g) => ({
      label: g.label,
      items: services.filter((s) => s.group === g.id).map((s) => ({ title: s.title, href: `/services/${s.slug}`, icon: s.icon })),
    })),
  };
  return <HeaderNav menu={menu} />;
}
