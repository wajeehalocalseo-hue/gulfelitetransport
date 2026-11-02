import type { Region } from "./types";

/** The 13 administrative regions of Saudi Arabia. Text is general geography; nothing here claims coverage. */
export const regions: Region[] = [
  {
    id: "riyadh-region",
    name: "Riyadh Region",
    capital: "riyadh",
    tagline: "The central region around the national capital, where most government and corporate travel begins.",
    about:
      "Riyadh Region sits on the central plateau and is built around the capital. Rides here are mostly long road journeys between districts, business parks, ministries and the airport, and from Riyadh outwards to smaller towns on the region's highways.",
    other: ["Al Kharj", "Diriyah", "Al Majmaah", "Al Zulfi", "Ad Dawadmi", "Afif", "Wadi ad-Dawasir"],
  },
  {
    id: "makkah-region",
    name: "Makkah Region",
    capital: "makkah",
    tagline: "The western region that holds Makkah, Jeddah and Taif, and the busiest pilgrim and Red Sea corridor in the country.",
    about:
      "Makkah Region combines the holy city of Makkah, the Red Sea port of Jeddah and the mountain resort city of Taif. Trips here are shaped by pilgrimage seasons, Jeddah's airport and port traffic, and the short, busy corridor linking Makkah and Jeddah.",
    other: ["Rabigh", "Al Qunfudhah", "Al Jumum", "Turubah", "Khulais"],
  },
  {
    id: "madinah-region",
    name: "Madinah Region",
    capital: "madinah",
    tagline: "The north-western region around Madinah, with the Red Sea port of Yanbu and the heritage landscapes of AlUla.",
    about:
      "Madinah Region is centred on the city that holds Al-Masjid an-Nabawi. Alongside pilgrim and visitor travel it includes the industrial and port city of Yanbu on the Red Sea and the desert heritage area of AlUla, so ride requests range from short city trips to long desert roads.",
    other: ["Yanbu", "AlUla", "Badr", "Khaybar", "Al Hinakiyah"],
  },
  {
    id: "eastern-province",
    name: "Eastern Province",
    capital: "dammam",
    tagline: "The Gulf-coast region of the energy industry, ports and the Dammam metropolitan area.",
    about:
      "The Eastern Province runs along the Arabian Gulf and is the centre of the country's oil and gas industry. Rides cluster around Dammam, Al Khobar and Dhahran, the industrial city of Jubail, the Al-Ahsa oasis and the border towns toward Kuwait and Bahrain.",
    other: ["Ras Tanura", "Abqaiq", "Al Khafji", "Nairiyah", "Buqayq"],
  },
  {
    id: "asir-region",
    name: "Asir Region",
    capital: "abha",
    tagline: "The south-western highland region of cooler mountain towns, terraced villages and winding roads.",
    about:
      "Asir rises into the Sarawat mountains in the south-west, which gives it a cooler climate than most of the country. Abha and Khamis Mushait form the main urban pair, and many rides climb mountain roads to viewpoints, villages and parks, so road and weather conditions matter.",
    other: ["Bisha", "Muhayil", "Rijal Almaa", "Ahad Rafidah", "Sarat Abidah"],
  },
  {
    id: "qassim-region",
    name: "Qassim Region",
    capital: "buraydah",
    tagline: "The agricultural heartland of the north-centre, known for dates and its string of oasis cities.",
    about:
      "Qassim lies north of Riyadh and is known for date farming and a cluster of connected cities. Buraydah and Unaizah are the main centres, and many rides here are regional trips between these cities, the regional airport and the road to Riyadh.",
    other: ["Unaizah", "Ar Rass", "Al Bukayriyah", "Al Mithnab"],
  },
  {
    id: "tabuk-region",
    name: "Tabuk Region",
    capital: "tabuk",
    tagline: "The north-western frontier region of long desert roads, Red Sea coastline and new giga-project sites.",
    about:
      "Tabuk Region reaches from the Jordanian border to the Red Sea coast. Distances are large and towns are far apart, so trips are usually long road journeys, and the region is also where several major new development areas are located.",
    other: ["Duba", "Haql", "Tayma", "Al Wajh", "NEOM area"],
  },
  {
    id: "hail-region",
    name: "Hail Region",
    capital: "hail",
    tagline: "The northern mountain-and-desert region around the city of Hail.",
    about:
      "Hail Region lies between the Aja and Salma mountain ranges and the desert to the north. Hail is the main city, and rides are typically regional journeys connecting it with Qassim, Riyadh and the rock-art areas to the north-west.",
    other: ["Baqaa", "Al Ghazalah", "Ash Shinan", "Mawqaq"],
  },
  {
    id: "jazan-region",
    name: "Jazan Region",
    capital: "jazan",
    tagline: "The south-western coastal region on the Red Sea, bordering Yemen, with a warm, humid climate.",
    about:
      "Jazan is a fertile coastal strip in the south-west of the country, with a port, a growing economic city and the offshore Farasan Islands. Roads connect Jazan with Abu Arish, Sabya and the Asir highlands, and the climate is warmer and more humid than the interior.",
    other: ["Sabya", "Abu Arish", "Samtah", "Farasan Islands", "Ad Darb"],
  },
  {
    id: "najran-region",
    name: "Najran Region",
    capital: "najran",
    tagline: "The southern border region of fertile valleys and ancient sites around the city of Najran.",
    about:
      "Najran lies in the south along the Yemen border and is known for farmland in its valley and for archaeological sites. Rides are mostly local trips within Najran and longer road journeys north to Abha and east toward Sharurah.",
    other: ["Sharurah", "Hubuna", "Badr Al-Janub", "Yadamah"],
  },
  {
    id: "al-bahah-region",
    name: "Al Bahah Region",
    capital: "al-bahah",
    tagline: "The smallest region by area, a green mountain area between Makkah Region and Asir.",
    about:
      "Al Bahah is a mountainous region in the south-west with forest parks and stone-built villages. It is reached by winding mountain roads from Taif and Makkah Region, so ride planning has to allow for slower sections and changing weather.",
    other: ["Baljurashi", "Al Mandaq", "Al Mikhwah", "Qilwah"],
  },
  {
    id: "al-jawf-region",
    name: "Al Jawf Region",
    capital: "sakaka",
    tagline: "The far-northern region of olive groves and ancient desert settlements.",
    about:
      "Al Jawf lies in the north of the country near the Jordanian border and is known for olive farming and for old settlements such as Dumat al-Jandal. Towns are well apart, and most rides are long regional journeys on desert highways.",
    other: ["Dumat Al-Jandal", "Qurayyat", "Tabarjal"],
  },
  {
    id: "northern-borders-region",
    name: "Northern Borders Region",
    capital: "arar",
    tagline: "The remote northern region on the border with Iraq, centred on Arar.",
    about:
      "The Northern Borders Region is a sparsely populated area of desert plains along the Iraq border. Arar is the regional capital, with Rafha and Turaif further out, and distances between them are long.",
    other: ["Rafha", "Turaif", "Al Uwayqilah"],
  },
];
