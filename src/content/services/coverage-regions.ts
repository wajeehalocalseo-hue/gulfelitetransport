/**
 * The 13 administrative regions of Saudi Arabia and the cities and towns shown in the service page coverage sections.
 * The region list and the town names match the site's own geography (src/content/saudi/regions.ts, cities.ts and the
 * Riyadh town pages). Cities are places where goods and people move. They are never presented as Gulf Elite offices,
 * depots or warehouses: the pages say that availability depends on the locations, the service and operational confirmation.
 */
export type CoverageRegion = {
  id: string;
  name: string;
  /** Path of the existing taxi page for this region; used only on the passenger and taxi service pages. */
  taxiPath: string;
  /** One short, factual line about the region. */
  note: string;
  cities: string[];
};

export const coverageRegions: CoverageRegion[] = [
  {
    id: "riyadh",
    name: "Riyadh Region",
    taxiPath: "/taxi-saudi-arabia/riyadh-region",
    note: "The central region around the capital.",
    cities: ["Riyadh", "Al Kharj", "Al Majma'ah", "Al Dawadmi", "Al Zulfi", "Shaqra", "Afif", "Al Quwayiyah", "Wadi Al-Dawasir", "Al Muzahimiyah", "Al Diriyah", "Huraymila"],
  },
  {
    id: "makkah",
    name: "Makkah Region",
    taxiPath: "/taxi-saudi-arabia/makkah-region",
    note: "The western region on the Red Sea, with Jeddah's port and the holy city of Makkah.",
    cities: ["Jeddah", "Makkah", "Taif", "Rabigh", "Al Lith", "Al Qunfudhah"],
  },
  {
    id: "madinah",
    name: "Madinah Region",
    taxiPath: "/taxi-saudi-arabia/madinah-region",
    note: "The north-western region around Madinah, with the Red Sea industrial city of Yanbu.",
    cities: ["Madinah", "Yanbu", "AlUla", "Khaybar", "Badr"],
  },
  {
    id: "eastern",
    name: "Eastern Province",
    taxiPath: "/taxi-saudi-arabia/eastern-province",
    note: "The Gulf coast region of ports, oil and industry.",
    cities: ["Dammam", "Al Khobar", "Dhahran", "Jubail", "Al Ahsa", "Qatif", "Hafar Al Batin", "Ras Tanura"],
  },
  {
    id: "qassim",
    name: "Qassim Region",
    taxiPath: "/taxi-saudi-arabia/qassim-region",
    note: "A central agricultural region north-west of Riyadh.",
    cities: ["Buraydah", "Unaizah", "Ar Rass", "Al Bukayriyah"],
  },
  {
    id: "asir",
    name: "Asir Region",
    taxiPath: "/taxi-saudi-arabia/asir-region",
    note: "The south-western highlands.",
    cities: ["Abha", "Khamis Mushait", "Bisha", "Muhayil"],
  },
  {
    id: "jazan",
    name: "Jazan Region",
    taxiPath: "/taxi-saudi-arabia/jazan-region",
    note: "The south-western coastal region on the Red Sea.",
    cities: ["Jazan", "Sabya", "Abu Arish", "Samtah"],
  },
  {
    id: "tabuk",
    name: "Tabuk Region",
    taxiPath: "/taxi-saudi-arabia/tabuk-region",
    note: "The north-western region towards Jordan and the Red Sea coast.",
    cities: ["Tabuk", "Duba", "Al Wajh", "Haql", "Tayma"],
  },
  {
    id: "hail",
    name: "Hail Region",
    taxiPath: "/taxi-saudi-arabia/hail-region",
    note: "A northern region on the route between Riyadh and the north.",
    cities: ["Hail", "Baqaa", "Al Ghazalah"],
  },
  {
    id: "northern-borders",
    name: "Northern Borders Region",
    taxiPath: "/taxi-saudi-arabia/northern-borders-region",
    note: "The far north, bordering Iraq.",
    cities: ["Arar", "Rafha", "Turaif"],
  },
  {
    id: "jouf",
    name: "Al Jouf Region (Al Jawf)",
    taxiPath: "/taxi-saudi-arabia/al-jawf-region",
    note: "The north-western region around Sakaka.",
    cities: ["Sakaka", "Qurayyat", "Dumat Al Jandal"],
  },
  {
    id: "bahah",
    name: "Al Bahah Region",
    taxiPath: "/taxi-saudi-arabia/al-bahah-region",
    note: "A small south-western highland region.",
    cities: ["Al Bahah", "Baljurashi", "Al Mandaq"],
  },
  {
    id: "najran",
    name: "Najran Region",
    taxiPath: "/taxi-saudi-arabia/najran-region",
    note: "The southern region on the border with Yemen.",
    cities: ["Najran", "Sharurah"],
  },
];

export const COVERAGE_NOTE =
  "These are places where goods and people move across Saudi Arabia. They are not a list of Gulf Elite offices, depots or warehouses. Availability depends on the locations, the service and the dates, and is confirmed with you before any arrangement is made.";
