import type { Faq } from "./types";

/** Arabic name and approximate centre point of each city page (used in structured data and on the page). */
export const cityGeo: Record<string, { ar: string; lat: number; lng: number }> = {
  riyadh: { ar: "الرياض", lat: 24.7136, lng: 46.6753 },
  jeddah: { ar: "جدة", lat: 21.4858, lng: 39.1925 },
  makkah: { ar: "مكة المكرمة", lat: 21.3891, lng: 39.8579 },
  madinah: { ar: "المدينة المنورة", lat: 24.5247, lng: 39.5692 },
  dammam: { ar: "الدمام", lat: 26.4207, lng: 50.0888 },
  "al-khobar": { ar: "الخبر", lat: 26.2794, lng: 50.2083 },
  dhahran: { ar: "الظهران", lat: 26.2361, lng: 50.0393 },
  jubail: { ar: "الجبيل", lat: 27.0046, lng: 49.646 },
  "al-hofuf": { ar: "الهفوف", lat: 25.3647, lng: 49.5876 },
  "al-qatif": { ar: "القطيف", lat: 26.5565, lng: 49.996 },
  taif: { ar: "الطائف", lat: 21.2703, lng: 40.4158 },
  yanbu: { ar: "ينبع", lat: 24.0895, lng: 38.0618 },
  abha: { ar: "أبها", lat: 18.2164, lng: 42.5053 },
  "khamis-mushait": { ar: "خميس مشيط", lat: 18.3, lng: 42.7333 },
  tabuk: { ar: "تبوك", lat: 28.3835, lng: 36.5662 },
  buraydah: { ar: "بريدة", lat: 26.326, lng: 43.975 },
  hail: { ar: "حائل", lat: 27.5114, lng: 41.7208 },
  jazan: { ar: "جازان", lat: 16.8892, lng: 42.5611 },
  najran: { ar: "نجران", lat: 17.4917, lng: 44.1322 },
  "al-bahah": { ar: "الباحة", lat: 20.0129, lng: 41.4677 },
  sakaka: { ar: "سكاكا", lat: 29.9697, lng: 40.2064 },
  arar: { ar: "عرعر", lat: 30.9753, lng: 41.0381 },
  "hafar-al-batin": { ar: "حفر الباطن", lat: 28.4328, lng: 45.9708 },
  "al-kharj": { ar: "الخرج", lat: 24.1556, lng: 47.312 },
};

export type RegionExtra = {
  ar: string;
  /** English Wikipedia article title for the region (entity reference). */
  wiki: string;
  /** How people arrive and move around the region: airports, rail, highways. */
  gettingIn: string;
  /** Typical ride requests in the region. */
  scenarios: { title: string; text: string }[];
  /** Practical planning notes for the region. */
  tips: { title: string; text: string }[];
  /** Neighbouring region ids, used for links. */
  neighbours: string[];
  /** Region-specific questions (answer-first). */
  faqs: Faq[];
};

export const regionExtras: Record<string, RegionExtra> = {
  "riyadh-region": {
    ar: "منطقة الرياض",
    wiki: "Riyadh Province",
    gettingIn:
      "King Khalid International Airport (RUH), north of the city centre, is the main gateway. The Riyadh Metro serves parts of the capital, and a passenger railway links Riyadh with Dammam and the Eastern Province. Highways run from Riyadh to Qassim and Hail in the north-west, to Makkah Region in the west, to the Eastern Province in the east and to Al Kharj in the south-east.",
    scenarios: [
      { title: "Airport transfers", text: "RUH to Olaya, the King Abdullah Financial District, the Diplomatic Quarter or a hotel, and back." },
      { title: "Day and evening trips", text: "Rides to Diriyah, the Boulevard areas and Wadi Hanifah." },
      { title: "Commuter and regional rides", text: "Al Kharj to Riyadh, and Riyadh to Buraydah, Dammam or Hail." },
    ],
    tips: [
      { title: "Give the district and building", text: "Riyadh is spread out, so a district name alone is not enough for a pickup." },
      { title: "Allow for peak traffic", text: "Morning and late-afternoon traffic on the ring roads changes how long a ride takes." },
    ],
    neighbours: ["qassim-region", "makkah-region", "eastern-province"],
    faqs: [
      { q: "Which airport serves Riyadh?", a: "King Khalid International Airport (RUH), north of the city centre. Airport transfers can be requested and are confirmed for each request." },
      { q: "Is there a metro in Riyadh?", a: "Yes, the Riyadh Metro serves parts of the city. Many travellers combine it with a car for the first or last stretch of a journey." },
    ],
  },
  "makkah-region": {
    ar: "منطقة مكة المكرمة",
    wiki: "Mecca Province",
    gettingIn:
      "King Abdulaziz International Airport (JED), north of Jeddah, is the main gateway, and Taif International Airport (TIF) serves Taif. The Haramain high-speed railway links Makkah, Jeddah (including the airport) and Madinah, and the road between Jeddah and Makkah is one of the busiest in the country. A mountain road climbs from Makkah and Jeddah up to Taif.",
    scenarios: [
      { title: "Arrivals at Jeddah airport", text: "Rides into Jeddah, or on to Makkah or Taif." },
      { title: "City rides", text: "Jeddah's Corniche, Al-Balad and malls, and Makkah's districts outside the Haram area." },
      { title: "Summer trips to Taif", text: "Families travelling up to Al Hada and Al Shafa." },
    ],
    tips: [
      { title: "Haram access is controlled", text: "Vehicle access near Al-Masjid al-Haram is restricted, so the drop-off point is agreed in advance. Entry to Makkah is for Muslims only." },
      { title: "Ramadan and Hajj are very busy", text: "Request early in those periods. Organised pilgrim and Hajj group transport is not offered through these pages." },
    ],
    neighbours: ["madinah-region", "riyadh-region", "al-bahah-region", "asir-region"],
    faqs: [
      { q: "What is the best way to get from Jeddah airport to Makkah?", a: "Both the Haramain train and a car serve the route. We arrange rides by car, and the drop-off point near the Haram is agreed with you in advance." },
      { q: "Which airport serves Makkah?", a: "Makkah has no airport of its own. Most travellers arrive at King Abdulaziz International Airport (JED) in Jeddah." },
    ],
  },
  "madinah-region": {
    ar: "منطقة المدينة المنورة",
    wiki: "Medina Province",
    gettingIn:
      "Prince Mohammad bin Abdulaziz International Airport (MED) lies north-east of Madinah. Yanbu has its own airport, and AlUla is served by an airport of its own. The Haramain high-speed railway connects Madinah with Makkah and Jeddah, and long highways link the region to Yanbu, Tabuk and Qassim.",
    scenarios: [
      { title: "Airport and hotel transfers", text: "MED to hotels near Al-Masjid an-Nabawi, subject to the access rules around the Central Area." },
      { title: "Site visits", text: "Rides to Quba Mosque, Mount Uhud and other sites around the city." },
      { title: "Regional rides", text: "Madinah to Yanbu, and longer trips toward AlUla and Tabuk." },
    ],
    tips: [
      { title: "Central Area restrictions", text: "Roads near the Prophet's Mosque can be restricted at prayer times and busy periods, and entry to the central area is for Muslims only." },
      { title: "Distances are long", text: "Rides toward AlUla and Tabuk are long desert journeys planned in advance." },
    ],
    neighbours: ["makkah-region", "tabuk-region", "hail-region", "qassim-region"],
    faqs: [
      { q: "Which airport serves Madinah?", a: "Prince Mohammad bin Abdulaziz International Airport (MED), north-east of the city." },
      { q: "Can I travel from Madinah to AlUla?", a: "Long regional rides can be requested. The distance is large, so the vehicle, route and timing are confirmed with you for each request." },
    ],
  },
  "eastern-province": {
    ar: "المنطقة الشرقية",
    wiki: "Eastern Province, Saudi Arabia",
    gettingIn:
      "King Fahd International Airport (DMM) lies well outside Dammam and serves the whole province, and Al-Ahsa International Airport (HOF) serves Hofuf. A passenger railway links Dammam with Riyadh through Al-Ahsa, and the King Fahd Causeway to Bahrain starts near Al Khobar. Coastal highways connect Dammam, Al Khobar, Dhahran, Qatif and Jubail.",
    scenarios: [
      { title: "Airport transfers", text: "DMM to Dammam, Al Khobar, Dhahran or Jubail." },
      { title: "Industrial and corporate rides", text: "Contractors and staff travelling to Jubail, Dhahran and other industrial sites." },
      { title: "Leisure and heritage", text: "Corniches in Dammam and Al Khobar, and the Al-Ahsa oasis." },
    ],
    tips: [
      { title: "The airport is far from the city", text: "King Fahd International Airport is outside the built-up area, so airport rides are longer than city trips." },
      { title: "Controlled sites", text: "Industrial areas and company compounds have gates and passes, so name the site and your contact." },
    ],
    neighbours: ["riyadh-region", "qassim-region", "najran-region"],
    faqs: [
      { q: "Is King Fahd International Airport close to Dammam?", a: "It is outside the city, so rides to Dammam, Al Khobar and Dhahran are longer than a normal city trip. Allow extra time when you give your flight details." },
      { q: "Can you take me to the King Fahd Causeway?", a: "A ride to the Saudi side can be requested. Crossing into Bahrain is a cross-border journey and is not covered by these pages." },
    ],
  },
  "asir-region": {
    ar: "منطقة عسير",
    wiki: "Asir Province",
    gettingIn:
      "Abha International Airport (AHB) lies close to Abha and serves most of the region. Winding mountain roads climb through the Sarawat range from Abha and Khamis Mushait to viewpoints and villages, and longer roads lead to Jazan, Najran and Makkah Region.",
    scenarios: [
      { title: "Airport to mountain stay", text: "AHB to Abha, Khamis Mushait, Al Soudah or Rijal Almaa." },
      { title: "Sightseeing days", text: "Abha Dam Lake, Habala and mountain viewpoints." },
      { title: "Regional rides", text: "Abha to Jazan, and Abha to Najran." },
    ],
    tips: [
      { title: "Mountain roads take longer", text: "Steep, winding roads make rides slower than the distance suggests, and fog can affect them." },
      { title: "Summer is the busy season", text: "Visitors arrive in large numbers to escape the heat, so request early." },
    ],
    neighbours: ["makkah-region", "al-bahah-region", "jazan-region", "najran-region"],
    faqs: [
      { q: "Which airport serves Abha?", a: "Abha International Airport (AHB), close to the city." },
      { q: "Can I be driven up to Al Soudah?", a: "Yes, rides to mountain destinations can be requested. Road and weather conditions are taken into account when the plan is confirmed." },
    ],
  },
  "qassim-region": {
    ar: "منطقة القصيم",
    wiki: "Al-Qassim Province",
    gettingIn:
      "Qassim Regional Airport (ELQ) lies between Buraydah and Unaizah. A main highway links Buraydah with Riyadh to the south and with Hail to the north, and the cities of the region are connected by short roads.",
    scenarios: [
      { title: "Airport rides", text: "ELQ to Buraydah or Unaizah." },
      { title: "Riyadh runs", text: "Buraydah to Riyadh and back." },
      { title: "Date-season trips", text: "Traders and visitors going to the Buraydah dates market." },
    ],
    tips: [
      { title: "Say Buraydah or Unaizah", text: "The airport serves both, so state which city you are going to." },
      { title: "Harvest season", text: "The dates season makes Buraydah busier, so request early." },
    ],
    neighbours: ["riyadh-region", "hail-region", "madinah-region", "eastern-province"],
    faqs: [
      { q: "Which airport serves Buraydah?", a: "Qassim Regional Airport (ELQ), which lies between Buraydah and Unaizah." },
      { q: "Can I book a ride from Buraydah to Riyadh?", a: "Yes. The vehicle, route and fare are confirmed for each request." },
    ],
  },
  "tabuk-region": {
    ar: "منطقة تبوك",
    wiki: "Tabuk Province",
    gettingIn:
      "Tabuk Regional Airport (TUU) serves Tabuk. Long desert highways connect Tabuk with the Red Sea coast, the Jordanian border and Madinah Region, and towns in the region are far apart.",
    scenarios: [
      { title: "Airport rides", text: "TUU to Tabuk city." },
      { title: "Long regional runs", text: "Tabuk to coastal towns and development areas." },
      { title: "Site visits", text: "Wadi Disah and Tabuk Castle." },
    ],
    tips: [
      { title: "Plan long distances early", text: "Rides outside Tabuk are usually full-day journeys." },
      { title: "Some sites are restricted", text: "Access to some development and border areas is controlled, so such requests are assessed individually." },
    ],
    neighbours: ["madinah-region", "hail-region", "al-jawf-region"],
    faqs: [
      { q: "Can I get a ride to the Red Sea coast from Tabuk?", a: "Long regional rides can be requested. Distances are large, so the vehicle, route and timing are confirmed for each request." },
      { q: "Which airport serves Tabuk?", a: "Tabuk Regional Airport (TUU), which serves the city and the region." },
    ],
  },
  "hail-region": {
    ar: "منطقة حائل",
    wiki: "Ha'il Province",
    gettingIn:
      "Hail Regional Airport (HAS) is close to the city. Highways lead south to Buraydah and Riyadh, and a road runs north-west across the desert toward Jubbah and its rock art.",
    scenarios: [
      { title: "Airport rides", text: "HAS to Hail city." },
      { title: "Desert and rock-art visits", text: "Day trips toward Jubbah and the mountains." },
      { title: "Highway runs", text: "Hail to Buraydah and Riyadh." },
    ],
    tips: [
      { title: "Distances are long", text: "Highway trips are planned in advance and may include a rest stop." },
      { title: "Events draw visitors", text: "Local events can make some weekends busy." },
    ],
    neighbours: ["qassim-region", "tabuk-region", "al-jawf-region", "northern-borders-region"],
    faqs: [
      { q: "Which airport serves Hail?", a: "Hail Regional Airport (HAS), close to the city." },
      { q: "Can you take me to the Jubbah rock-art area?", a: "Rides to sites outside the city can be requested. Distances and road conditions are checked, and the plan is confirmed with you." },
    ],
  },
  "jazan-region": {
    ar: "منطقة جازان",
    wiki: "Jizan Province",
    gettingIn:
      "King Abdullah bin Abdulaziz Airport (GIZ) serves Jazan. The port area handles ferries to the Farasan Islands, and the road to Abha climbs into the Asir mountains. Some areas near the Yemen border are restricted.",
    scenarios: [
      { title: "Airport rides", text: "GIZ to Jazan, Sabya or Abu Arish." },
      { title: "Coast and islands", text: "Rides to the ferry departure area for the Farasan Islands." },
      { title: "Mountain route", text: "Jazan to Abha." },
    ],
    tips: [
      { title: "Restricted border areas", text: "Rides toward the Yemen border are not assumed and need to be assessed first." },
      { title: "Hot and humid", text: "The coast is warm and humid, so plan rides accordingly." },
    ],
    neighbours: ["asir-region", "najran-region"],
    faqs: [
      { q: "Can I travel to the Farasan Islands?", a: "Rides to the ferry departure area can be requested. The crossing itself is arranged separately with the ferry operator." },
      { q: "Can I travel from Jazan to Abha?", a: "Yes. Mountain sections slow the journey, and timing is confirmed with you for each request." },
    ],
  },
  "najran-region": {
    ar: "منطقة نجران",
    wiki: "Najran Province",
    gettingIn:
      "Najran Airport (EAM) serves the city. The main road runs north through Asir to Abha and Khamis Mushait, and roads lead east toward Sharurah. Some areas near the Yemen border are restricted.",
    scenarios: [
      { title: "Airport rides", text: "EAM to Najran city." },
      { title: "Heritage visits", text: "Najran Fort and the Al Ukhdud archaeological site." },
      { title: "Long-distance rides", text: "Najran to Abha and Khamis Mushait." },
    ],
    tips: [
      { title: "Long distances", text: "Najran is far from the other main cities, so intercity rides are planned in advance." },
      { title: "Restricted border areas", text: "Rides toward the border region are not assumed and need to be assessed first." },
    ],
    neighbours: ["asir-region", "jazan-region", "eastern-province"],
    faqs: [
      { q: "Which airport serves Najran?", a: "Najran Airport (EAM)." },
      { q: "Is Najran reachable from Abha?", a: "A ride from Abha to Najran can be requested. It is a long journey, and the vehicle, route and timing are confirmed with you." },
    ],
  },
  "al-bahah-region": {
    ar: "منطقة الباحة",
    wiki: "Al Bahah Province",
    gettingIn:
      "Al Bahah has a domestic airport. The main approach is by mountain road from Taif and Makkah Region, and roads lead south to Asir. The terrain is steep with many bends.",
    scenarios: [
      { title: "Hill-station trips", text: "Rides from Taif or Makkah Region up to Al Bahah." },
      { title: "Forest and village visits", text: "Raghadan Forest Park and Dhi Ayn." },
      { title: "Regional rides", text: "Al Bahah to Abha." },
    ],
    tips: [
      { title: "Slower than the map suggests", text: "Steep, curving roads and sudden fog can slow a journey." },
      { title: "Request in advance", text: "Plan mountain rides ahead so the vehicle suits the route." },
    ],
    neighbours: ["makkah-region", "asir-region"],
    faqs: [
      { q: "Can I travel to Al Bahah from Taif?", a: "Yes, rides on the Taif route can be requested. The mountain road is slower than the distance suggests, and the plan is confirmed in advance." },
      { q: "Is there an airport in Al Bahah?", a: "Al Bahah has a domestic airport that serves the region." },
    ],
  },
  "al-jawf-region": {
    ar: "منطقة الجوف",
    wiki: "Al Jawf Province",
    gettingIn:
      "Al Jouf Airport serves Sakaka, the regional capital. Long desert highways connect Sakaka with Hail, Tabuk and the Northern Borders Region, and the Jordanian border lies to the north-west.",
    scenarios: [
      { title: "Airport rides", text: "Al Jouf Airport to Sakaka." },
      { title: "Heritage visits", text: "Dumat al-Jandal and Marid Castle." },
      { title: "Regional journeys", text: "Sakaka to Hail, Tabuk or Arar." },
    ],
    tips: [
      { title: "Long, quiet highways", text: "Towns are far apart, so plan long rides in advance." },
      { title: "Border areas", text: "Rides toward border areas are not assumed and are assessed first." },
    ],
    neighbours: ["tabuk-region", "hail-region", "northern-borders-region"],
    faqs: [
      { q: "Can you take me to Dumat al-Jandal?", a: "Rides to Dumat al-Jandal can be requested. The plan is confirmed with you for each request." },
      { q: "What is the main city in Al Jawf?", a: "Sakaka is the regional capital." },
    ],
  },
  "northern-borders-region": {
    ar: "منطقة الحدود الشمالية",
    wiki: "Northern Borders Province",
    gettingIn:
      "Arar Domestic Airport serves Arar, the regional capital. Long highways lead to Sakaka and Hail, and the border with Iraq lies to the north.",
    scenarios: [
      { title: "Airport rides", text: "Arar Domestic Airport to Arar city." },
      { title: "Regional rides", text: "Arar to Rafha and Turaif." },
      { title: "Long-distance runs", text: "Arar to Sakaka and Hail." },
    ],
    tips: [
      { title: "Sparse region", text: "Distances are long, and rides are planned in advance." },
      { title: "Border areas are restricted", text: "Rides toward the border are not assumed and need to be assessed first." },
    ],
    neighbours: ["al-jawf-region", "hail-region"],
    faqs: [
      { q: "Do you take passengers to the border area?", a: "Rides toward the border region are not assumed. Share where you are going and we will tell you whether it can be assessed." },
      { q: "What is the main city of the Northern Borders Region?", a: "Arar is the regional capital." },
    ],
  },
};
