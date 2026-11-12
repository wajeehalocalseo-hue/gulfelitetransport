import HeaderNav, { type MenuData } from "./HeaderNav";
import { cities } from "@/content/saudi/cities";
import { airports, routes } from "@/content/saudi/places";
import { regions } from "@/content/saudi/regions";
import { groups, services } from "@/content/services";
import { umrahSubPages } from "@/content/saudi/build";
import { UMRAH_BASE } from "@/content/umrah/pages";

const BASE = "/taxi-saudi-arabia";
const cityName = (id: string) => cities.find((c) => c.id === id)?.name ?? id;

/** Builds the menu data on the server so the client menu does not ship the full page content. */
export default function SiteHeader() {
  const menu: MenuData = {
    taxi: {
      base: BASE,
      regions: regions.map((r) => ({ name: r.name, href: `${BASE}/${r.id}` })),
      cities: cities.slice(0, 8).map((c) => ({ name: c.name, href: `${BASE}/${c.region}/${c.id}` })),
      routes: routes.slice(0, 6).map((r) => ({ name: `${cityName(r.from)} to ${cityName(r.to)}`, href: `${BASE}/routes/${r.id}`, km: r.km })),
      airports: airports.slice(0, 5).map((a) => ({ name: a.name, href: `${BASE}/airports/${a.id}`, code: a.code })),
    },
    umrah: {
      hub: UMRAH_BASE,
      columns: [
        { label: "Airport and train", slugs: ["jeddah-airport-to-makkah", "jeddah-airport-to-madinah", "madinah-airport-to-madinah-hotel", "madinah-airport-to-makkah", "haramain-train-station-transfers", "makkah-hotel-to-jeddah-airport", "madinah-hotel-to-madinah-airport", "night-and-early-morning-transfers"] },
        { label: "In Makkah", slugs: ["makkah-hotel-to-haram", "umrah-taxi-with-waiting", "makkah-ziyarat-rides"], extra: [{ name: "Taxi in Makkah", href: `${BASE}/makkah-region/makkah` }] },
        { label: "In Madinah", slugs: ["madinah-hotel-to-prophets-mosque", "madinah-ziyarat-rides"], extra: [{ name: "Taxi in Madinah", href: `${BASE}/madinah-region/madinah` }] },
        { label: "Between cities and groups", slugs: ["madinah-to-makkah-for-umrah", "makkah-to-madinah-for-umrah", "group-transport-for-umrah", "family-and-elderly-pilgrims", "taif-to-makkah-for-umrah", "umrah-itinerary-transport-plan", "umrah-transport-for-travel-agents", "ramadan-umrah-transport", "hajj-season-transport"] },
      ].map((c) => ({
        label: c.label,
        items: [
          ...c.slugs.flatMap((s) => {
            const p = umrahSubPages.find((x) => x.path === `${UMRAH_BASE}/${s}`);
            return p ? [{ name: p.name, href: p.path }] : [];
          }),
          ...(c.extra ?? []),
        ],
      })),
    },
    services: groups.map((g) => ({
      label: g.label,
      items: services.filter((s) => s.group === g.id).map((s) => ({ title: s.title, href: `/services/${s.slug}`, icon: s.icon })),
    })),
  };
  return <HeaderNav menu={menu} />;
}
