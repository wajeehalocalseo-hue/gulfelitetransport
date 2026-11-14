/**
 * Cross-border routes from Riyadh. One page per destination, both directions on the page.
 *
 * Road distances come from OpenStreetMap routing between the city centres, rounded to 5 km, and are approximate.
 * Coordinates are city centres from OpenStreetMap. The border crossings named here are the well-known ones;
 * where the crossing depends on the route chosen, the text says it is confirmed for each request.
 * Nothing here states a fare, a journey time, a visa rule or a service guarantee.
 */
export type IntlRoute = {
  id: string;
  name: string;
  country: string;
  ar: string;
  lat: number;
  lng: number;
  km: number;
  /** Border crossing note, specific to the route. */
  crossing: string;
  about: string;
  riders: string[];
  tips: string[];
  /** Airports at the destination that rides can start or end at. */
  airports?: string;
};

const UAE_CROSSING =
  "Road travel between Saudi Arabia and the UAE normally crosses at Batha on the Saudi side and Ghuwaifat on the UAE side. The crossing used for your ride is confirmed with you before you travel.";

export const intlRoutes: IntlRoute[] = [
  {
    id: "riyadh-to-dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    ar: "دبي",
    lat: 25.0743,
    lng: 55.1886,
    km: 1040,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Dubai is a long cross-border road journey east through the Eastern Province and the Saudi border post, then along the UAE coast to Dubai. It suits groups, families with luggage and business travellers who prefer one vehicle from door to door instead of flying and arranging a second transfer.",
    riders: ["Business travellers and teams visiting Dubai", "Families travelling with luggage", "Groups travelling to events or holidays"],
    tips: ["Tell us your hotel or address in Dubai, since the city is large and the drop-off area matters.", "Send passenger names and nationalities with your request so border paperwork can be planned."],
    airports: "Dubai International Airport (DXB) and Al Maktoum International Airport (DWC)",
  },
  {
    id: "riyadh-to-sharjah",
    name: "Sharjah",
    country: "United Arab Emirates",
    ar: "الشارقة",
    lat: 25.2692,
    lng: 55.6935,
    km: 1105,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Sharjah ends at the emirate next to Dubai, on the same road corridor but a little further along the coast. Many riders live or work in Sharjah, or are visiting its museums, university district and Corniche, and prefer a drop-off there rather than a transfer from Dubai.",
    riders: ["Residents of Sharjah returning home", "Visitors to Sharjah's cultural sites and universities", "Travellers connecting with flights from Sharjah airport"],
    tips: ["Say whether you are going to central Sharjah, the Corniche or an industrial area.", "Tell us if you connect with a flight so the plan can follow your departure time."],
    airports: "Sharjah International Airport (SHJ)",
  },
  {
    id: "riyadh-to-abu-dhabi",
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    ar: "أبوظبي",
    lat: 24.4538,
    lng: 54.3774,
    km: 960,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Abu Dhabi is the shortest of the UAE road routes from the capital, because Abu Dhabi is the first major UAE city after the border. It is used by government and corporate travellers, by families visiting relatives and by people continuing on to Al Ain or Dubai.",
    riders: ["Government and corporate travellers", "Families visiting relatives in Abu Dhabi", "Travellers continuing to Al Ain or Dubai"],
    tips: ["Give the district, hotel or office in Abu Dhabi, not only the city name.", "Tell us if you are continuing to Al Ain or Dubai so the whole trip is planned together."],
    airports: "Zayed International Airport (AUH)",
  },
  {
    id: "riyadh-to-ajman",
    name: "Ajman",
    country: "United Arab Emirates",
    ar: "عجمان",
    lat: 25.3329,
    lng: 55.996,
    km: 1145,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Ajman ends in the smallest emirate, just north-east of Sharjah. It is a quieter coastal city of apartments, markets and a long waterfront, and many riders are residents, workers and families with relatives there. Ajman has no airport of its own, so flights are usually from nearby Sharjah or Dubai.",
    riders: ["Residents and workers returning to Ajman", "Families visiting relatives", "Travellers staying in Ajman's waterfront hotels"],
    tips: ["Tell us your area in Ajman or the hotel, so the drop-off is exact.", "If you fly from Sharjah or Dubai, say so and the plan can be built around the flight."],
  },
  {
    id: "riyadh-to-al-ain",
    name: "Al Ain",
    country: "United Arab Emirates",
    ar: "العين",
    lat: 24.2249,
    lng: 55.7452,
    km: 1055,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Al Ain runs to the inland oasis city on the UAE's border with Oman, east of Abu Dhabi. Al Ain is known for its oases, forts and the Jebel Hafeet mountain, and the road from the Saudi border passes through Abu Dhabi emirate on the way.",
    riders: ["Visitors to the oases and heritage sites", "Families visiting relatives in Al Ain", "Travellers continuing toward Oman"],
    tips: ["Tell us your hotel or neighbourhood in Al Ain.", "If you are going on toward Oman, say so, since the plan changes."],
    airports: "Al Ain International Airport (AAN)",
  },
  {
    id: "riyadh-to-ras-al-khaimah",
    name: "Ras Al Khaimah",
    country: "United Arab Emirates",
    ar: "رأس الخيمة",
    lat: 25.7738,
    lng: 55.9382,
    km: 1160,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Ras Al Khaimah is among the longest UAE road routes, ending in the northernmost emirate below the Hajar mountains. Visitors go for its beaches, resorts and mountain scenery, and the drop-off is often a hotel or a resort on the coast.",
    riders: ["Holiday travellers heading to RAK resorts", "Families visiting relatives", "Groups travelling to events in the northern emirates"],
    tips: ["Name the resort or hotel, because some are far from the town centre.", "Plan for a very long day of travel and ask us about rest stops."],
    airports: "Ras Al Khaimah International Airport (RKT)",
  },
  {
    id: "riyadh-to-fujairah",
    name: "Fujairah",
    country: "United Arab Emirates",
    ar: "الفجيرة",
    lat: 25.4147,
    lng: 56.2314,
    km: 1180,
    crossing: UAE_CROSSING,
    about:
      "Riyadh to Fujairah is the longest of the UAE routes, ending on the Gulf of Oman side of the country after crossing the Hajar mountains. Fujairah is a port and beach destination, with diving and mountain scenery nearby, so the ride is usually a holiday or work trip.",
    riders: ["Holiday travellers going to the east coast", "Workers and contractors at the port", "Families visiting relatives in Fujairah"],
    tips: ["Tell us your hotel or the port gate you need.", "Plan for a very long journey and ask us about rest stops."],
    airports: "Fujairah International Airport (FJR)",
  },
  {
    id: "riyadh-to-manama",
    name: "Manama",
    country: "Bahrain",
    ar: "المنامة",
    lat: 26.2235,
    lng: 50.5822,
    km: 465,
    crossing:
      "Road travel from Saudi Arabia to Bahrain crosses the King Fahd Causeway, which links the Eastern Province near Al Khobar to Bahrain. Border formalities are carried out at the causeway, and the crossing time is confirmed with you before you travel.",
    about:
      "Riyadh to Manama is the shortest cross-border route from the capital. It follows the Dammam highway to the Eastern Province and then crosses the King Fahd Causeway to the island kingdom. Many riders are weekend visitors, business travellers and families going to Bahrain for the day or the weekend.",
    riders: ["Weekend and holiday visitors", "Business travellers with meetings in Manama", "Families visiting relatives in Bahrain"],
    tips: ["Tell us your hotel or area in Manama.", "Weekends and public holidays make the causeway busy, so allow extra time."],
    airports: "Bahrain International Airport (BAH)",
  },
  {
    id: "riyadh-to-doha",
    name: "Doha",
    country: "Qatar",
    ar: "الدوحة",
    lat: 25.3109,
    lng: 51.5082,
    km: 585,
    crossing:
      "Road travel between Saudi Arabia and Qatar crosses at Salwa on the Saudi side and Abu Samra on the Qatari side, which is the only land border Qatar has. The crossing and any waiting time are confirmed with you before you travel.",
    about:
      "Riyadh to Doha heads south-east across the desert to the Salwa border and then continues across the Qatari peninsula to the capital. Because Qatar has one land border, the route is direct, and it is used by business travellers, football and event visitors, and families.",
    riders: ["Business travellers and teams visiting Doha", "Visitors going to events in Qatar", "Families visiting relatives"],
    tips: ["Tell us your hotel or area in Doha.", "Border waiting times can change with the day, so allow extra time."],
    airports: "Hamad International Airport (DOH)",
  },
  {
    id: "riyadh-to-kuwait-city",
    name: "Kuwait City",
    country: "Kuwait",
    ar: "مدينة الكويت",
    lat: 29.3797,
    lng: 47.9734,
    km: 715,
    crossing:
      "Road travel between Saudi Arabia and Kuwait crosses the northern land border. Which crossing is used depends on the route and on the day, and it is confirmed with you before you travel.",
    about:
      "Riyadh to Kuwait City runs north-east across the desert to the Kuwait border and on to the Gulf coast. It is a long, mostly straight road journey, used by business travellers, by families and by people who want one vehicle for the whole trip instead of changing at the border.",
    riders: ["Business travellers with meetings in Kuwait", "Families visiting relatives in Kuwait", "Groups travelling together"],
    tips: ["Tell us your hotel or district in Kuwait City.", "Plan for a long journey and ask about rest stops."],
    airports: "Kuwait International Airport (KWI)",
  },
  {
    id: "riyadh-to-muscat",
    name: "Muscat",
    country: "Oman",
    ar: "مسقط",
    lat: 23.6124,
    lng: 58.5938,
    km: 1420,
    crossing:
      "Road travel from Saudi Arabia to Oman can go through the UAE or across a direct desert crossing, depending on the route. The route and the border crossings are confirmed with you before you travel.",
    about:
      "Riyadh to Muscat is one of the longest road routes in this list, running to the Omani capital on the Gulf of Oman coast. It is a multi-day style journey for most travellers, so it suits groups, expeditions and people who need a vehicle at the other end rather than a flight.",
    riders: ["Groups on a long road trip", "Business travellers who need a vehicle at both ends", "Families relocating or visiting relatives"],
    tips: ["Plan for more than a day on the road and ask about overnight stops.", "Tell us if you want to stop in the UAE on the way."],
    airports: "Muscat International Airport (MCT)",
  },
  {
    id: "riyadh-to-amman",
    name: "Amman",
    country: "Jordan",
    ar: "عمّان",
    lat: 31.9516,
    lng: 35.9239,
    km: 1435,
    crossing:
      "Road travel between Saudi Arabia and Jordan normally crosses at Haditha on the Saudi side and Al Omari on the Jordanian side. The crossing used for your ride is confirmed with you before you travel.",
    about:
      "Riyadh to Amman runs north-west across the desert to the Jordanian border and then on to the capital. It is a very long road journey used by families, by groups and by travellers who prefer a vehicle to a flight, and it is often combined with onward travel in Jordan or the Levant.",
    riders: ["Families visiting relatives in Jordan", "Groups on a long road trip", "Business travellers who need a vehicle in Jordan"],
    tips: ["Plan for a full day or more on the road and ask about overnight stops.", "Tell us your hotel or district in Amman."],
    airports: "Queen Alia International Airport (AMM)",
  },
];
