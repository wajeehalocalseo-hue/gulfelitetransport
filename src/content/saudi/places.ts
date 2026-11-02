import type { Airport, Area, Route } from "./types";

export const airports: Airport[] = [
  {
    id: "king-khalid-international-airport",
    name: "King Khalid International Airport",
    code: "RUH",
    city: "riyadh",
    tagline: "The main international airport of the capital, north of central Riyadh.",
    about:
      "King Khalid International Airport serves Riyadh and is the busiest airport in the centre of the country. It lies north of the city centre, so the ride to Olaya, KAFD or the Diplomatic Quarter crosses a fair part of the city, and morning and evening traffic changes how long that takes.",
    tips: [
      "Give your terminal and flight number when you request a pickup.",
      "Tell us the district and building you are going to, not just 'Riyadh'.",
      "If you arrive late at night, say so; availability is confirmed for each request.",
    ],
  },
  {
    id: "king-abdulaziz-international-airport",
    name: "King Abdulaziz International Airport",
    code: "JED",
    city: "jeddah",
    tagline: "The gateway airport for Jeddah, Makkah and many Umrah and Hajj travellers.",
    about:
      "King Abdulaziz International Airport lies north of Jeddah and is the main arrival point for visitors to Makkah and Jeddah. It has a Haramain high-speed rail station, which some travellers use for Makkah and Madinah, while others request a car for a direct ride to their hotel.",
    tips: [
      "State whether you are going into Jeddah or on to Makkah, as the two journeys are very different.",
      "Vehicle access near the Haram in Makkah is controlled, so the drop-off point is agreed in advance.",
      "Pilgrim group transport is not offered through this page.",
    ],
  },
  {
    id: "prince-mohammad-bin-abdulaziz-international-airport",
    name: "Prince Mohammad bin Abdulaziz International Airport",
    code: "MED",
    city: "madinah",
    tagline: "The airport serving Madinah and the pilgrims and visitors who come to the Prophet's Mosque.",
    about:
      "Prince Mohammad bin Abdulaziz International Airport lies north-east of Madinah. Arrivals are heavily weighted toward pilgrims and visitors heading to hotels near Al-Masjid an-Nabawi, so the practical drop-off point is often a road near the Central Area rather than the hotel door.",
    tips: [
      "Tell us which hotel you are staying at so we can agree the nearest drop-off.",
      "Road access near the mosque can be restricted at prayer times and busy periods.",
      "Entry to the central area is for Muslims only.",
    ],
  },
  {
    id: "king-fahd-international-airport",
    name: "King Fahd International Airport",
    code: "DMM",
    city: "dammam",
    tagline: "The airport of the Eastern Province, serving Dammam, Al Khobar, Dhahran, Jubail and Qatif.",
    about:
      "King Fahd International Airport is one of the largest airports in the world by area and lies well outside Dammam, so rides to Al Khobar, Dhahran or Jubail are long compared with most city trips. It serves the whole Eastern Province, including industrial travellers heading to Jubail.",
    tips: [
      "Allow extra time for the ride, as the airport is far from the city.",
      "Tell us your exact destination, as Dammam, Al Khobar and Dhahran are separate cities.",
      "For industrial sites, bring the pass or authorisation required at the gate.",
    ],
  },
  {
    id: "taif-international-airport",
    name: "Taif International Airport",
    code: "TIF",
    city: "taif",
    tagline: "The airport serving Taif and the mountain area above Makkah.",
    about:
      "Taif International Airport serves a city that is a summer escape for visitors from Jeddah and Riyadh. Rides from the airport usually go either into the city or up to the Al Hada and Al Shafa highlands, which are on steep, winding roads.",
    tips: [
      "Mention if you are going to Al Hada or Al Shafa, as the mountain roads take longer.",
      "Summer holiday periods are busy, so request early.",
      "Fog and weather can affect the mountain roads.",
    ],
  },
  {
    id: "abha-international-airport",
    name: "Abha International Airport",
    code: "AHB",
    city: "abha",
    tagline: "The airport for Abha, Khamis Mushait and the Asir highlands.",
    about:
      "Abha International Airport lies close to Abha and serves most of the Asir region. Many arrivals are visitors heading to mountain destinations such as Al Soudah or Rijal Almaa, so they often ask for a vehicle that suits winding roads.",
    tips: [
      "Say where in the mountains you are staying, as roads are steep and winding.",
      "Mist and rain can affect travel in some seasons.",
      "Khamis Mushait is a short ride from the airport.",
    ],
  },
  {
    id: "tabuk-regional-airport",
    name: "Tabuk Regional Airport",
    code: "TUU",
    city: "tabuk",
    tagline: "The main airport of the north-western Tabuk Region.",
    about:
      "Tabuk Regional Airport is the entry point for the north-west and is used by visitors and workers heading to the Red Sea coast and the new development areas. From the airport most rides go into Tabuk or onward on long desert roads.",
    tips: [
      "Tell us your final destination early, as regional distances are large.",
      "Long desert journeys are planned in advance rather than assumed.",
    ],
  },
  {
    id: "prince-naif-bin-abdulaziz-international-airport",
    name: "Qassim Regional Airport",
    code: "ELQ",
    city: "buraydah",
    tagline: "The airport serving Buraydah, Unaizah and the rest of Qassim.",
    about:
      "Qassim Regional Airport (Prince Naif bin Abdulaziz International Airport) lies between Buraydah and Unaizah. Rides are typically into either city or onward on the highway to Riyadh or Hail.",
    tips: [
      "Say whether you are going to Buraydah or Unaizah.",
      "Rides to Riyadh are long and are confirmed for each request.",
    ],
  },
  {
    id: "hail-regional-airport",
    name: "Hail Regional Airport",
    code: "HAS",
    city: "hail",
    tagline: "The airport of Hail, close to the city.",
    about:
      "Hail Regional Airport is near the city, so rides into town are short. Longer journeys head to the rock-art area at Jubbah or along the highway to Buraydah and Riyadh.",
    tips: [
      "Mention if you plan to travel to sites outside the city.",
      "Long highway rides are confirmed for each request.",
    ],
  },
  {
    id: "king-abdullah-bin-abdulaziz-airport",
    name: "King Abdullah bin Abdulaziz Airport",
    code: "GIZ",
    city: "jazan",
    tagline: "The airport of Jazan on the south-western Red Sea coast.",
    about:
      "King Abdullah bin Abdulaziz Airport serves Jazan and the surrounding coastal plain. Rides from the airport go into Jazan, toward Abu Arish and Sabya, or up the road to Abha, which includes mountain sections.",
    tips: [
      "Tell us your destination clearly, as areas near the border may be restricted.",
      "Rides to Abha include mountain roads and take that into account.",
    ],
  },
  {
    id: "najran-airport",
    name: "Najran Airport",
    code: "EAM",
    city: "najran",
    tagline: "The domestic airport of Najran in the south.",
    about:
      "Najran Airport serves the city and its valley. Rides from the airport usually go into Najran, and long-distance requests, for example to Abha, are planned in advance because of the distances.",
    tips: [
      "Tell us your destination in advance, as some border-area routes are restricted.",
      "Long-distance rides are confirmed for each request.",
    ],
  },
  {
    id: "al-ahsa-international-airport",
    name: "Al-Ahsa International Airport",
    code: "HOF",
    city: "al-hofuf",
    tagline: "The airport serving Hofuf and the Al-Ahsa oasis.",
    about:
      "Al-Ahsa International Airport serves Hofuf and the surrounding oasis. Rides are mostly into Hofuf, to the heritage sites of the oasis, or on the road to Dammam and Al Khobar.",
    tips: [
      "Say whether you are going to Hofuf, Mubarraz or another town in the oasis.",
      "Rides to Dammam and Al Khobar are confirmed for each request.",
    ],
  },
];

export const areas: Area[] = [
  {
    id: "olaya",
    city: "riyadh",
    name: "Olaya",
    tagline: "Olaya is Riyadh's main business, hotel and shopping district, running along Olaya Street.",
    about:
      "Olaya is built along a long north-south road lined with towers, hotels and malls. It is where many international visitors stay and where business meetings cluster, so airport transfers and short city rides are most common here.",
    places: [
      { name: "Kingdom Centre", note: "Landmark tower and mall" },
      { name: "Al Faisaliah Tower", note: "Office tower and mall" },
      { name: "Olaya Street", note: "Main commercial road" },
    ],
    faq: { q: "Is Olaya a good place to be picked up from?", a: "Yes, but the street is busy, so give the exact building or side road for pickup. Availability is confirmed for each request." },
  },
  {
    id: "king-abdullah-financial-district",
    city: "riyadh",
    name: "King Abdullah Financial District (KAFD)",
    tagline: "KAFD is a planned financial district in north Riyadh, built around a cluster of towers.",
    about:
      "KAFD is a purpose-built district of offices, hotels and residences, with its own roads and a metro station. Entrances and car parks are controlled, so it helps to name the tower and the entrance you will use.",
    places: [
      { name: "KAFD metro station", note: "Interchange for several metro lines" },
      { name: "Office towers", note: "Financial and corporate offices" },
      { name: "KAFD Grand Mosque", note: "Prominent mosque in the district" },
    ],
    faq: { q: "Can I be picked up inside KAFD?", a: "Entrances and parking are controlled, so tell us the tower and gate. What is possible is confirmed for each request." },
  },
  {
    id: "diplomatic-quarter",
    city: "riyadh",
    name: "Diplomatic Quarter",
    tagline: "The Diplomatic Quarter is the walled district of embassies and international organisations in west Riyadh.",
    about:
      "The Diplomatic Quarter is an enclosed, green district with its own security checks. Visitors normally need to be registered in advance by the embassy or organisation they are visiting, so a ride here is arranged around a named host and entrance.",
    places: [
      { name: "Embassies", note: "Foreign missions in the district" },
      { name: "Riyadh Diplomatic Quarter entrance", note: "Controlled security gate" },
      { name: "Wadi Hanifah (nearby)", note: "Valley and park to the west" },
    ],
    faq: { q: "Can I enter the Diplomatic Quarter by taxi?", a: "Entry is controlled by the district. Your host must register you, and we confirm what is possible for each request." },
  },
  {
    id: "diriyah",
    city: "riyadh",
    name: "Diriyah",
    tagline: "Diriyah is the historic birthplace of the first Saudi state, now a major heritage and cultural destination.",
    about:
      "Diriyah, on the north-west edge of Riyadh, includes the At-Turaif district, a UNESCO World Heritage Site, and a fast-growing dining and cultural area. Visitor numbers are highest in the evenings and at weekends, so booking ahead for the return ride matters.",
    places: [
      { name: "At-Turaif", note: "UNESCO World Heritage Site" },
      { name: "Bujairi Terrace", note: "Restaurants and cafes" },
      { name: "Wadi Hanifah", note: "Valley running through the area" },
    ],
    faq: { q: "Can I arrange my return ride from Diriyah in advance?", a: "Yes, arranging a return pickup in advance is sensible for busy evenings. The plan is confirmed for each request." },
  },
  {
    id: "hittin",
    city: "riyadh",
    name: "Hittin",
    tagline: "Hittin is a northern Riyadh district of villas, offices and shopping.",
    about:
      "Hittin lies in north Riyadh not far from the King Fahd Road and King Salman Road corridors. It is mainly residential with business parks and shopping, and many trips from here go to the airport, Olaya and KAFD.",
    places: [
      { name: "Hittin district centre", note: "Shops and restaurants" },
      { name: "Northern ring road", note: "Link to the airport and other districts" },
    ],
    faq: { q: "Can I book a ride from Hittin to the airport?", a: "Yes, airport rides can be requested. Timing is confirmed with you for each request." },
  },
  {
    id: "al-balad",
    city: "jeddah",
    name: "Al-Balad",
    tagline: "Al-Balad is Jeddah's historic old town, a UNESCO World Heritage Site of coral-stone merchant houses.",
    about:
      "Al-Balad is a dense area of narrow streets and traditional houses with projecting wooden balconies. Cars cannot reach every part, so pickups are normally at the edge of the old town, and visitors walk the last distance.",
    places: [
      { name: "Nasseef House", note: "Historic merchant house" },
      { name: "Souq Al Alawi", note: "Traditional covered market" },
      { name: "Al-Balad gates", note: "Entry points to the old town" },
    ],
    faq: { q: "Can a car go into the old town of Al-Balad?", a: "Access to the narrow streets is limited, so the pickup or drop-off is normally at the edge. We confirm the exact point for each request." },
  },
  {
    id: "al-hamra",
    city: "jeddah",
    name: "Al-Hamra",
    tagline: "Al-Hamra is a central Jeddah district of hotels, offices, embassies and consulates.",
    about:
      "Al-Hamra lies close to the Corniche and has many hotels and corporate offices. It is a common starting point for rides to the airport, Al-Balad and the Corniche.",
    places: [
      { name: "Jeddah Corniche (nearby)", note: "Waterfront promenade" },
      { name: "Hotels and offices", note: "Business and visitor accommodation" },
    ],
    faq: { q: "Can I book a ride from Al-Hamra to Jeddah airport?", a: "Yes, airport rides can be requested. Allow extra time, as the airport is in the north of the city. Timing is confirmed for each request." },
  },
  {
    id: "al-rawdah",
    city: "jeddah",
    name: "Al-Rawdah",
    tagline: "Al-Rawdah is a central residential and commercial district in Jeddah with many cafes and shops.",
    about:
      "Al-Rawdah is a lively area with restaurants, cafes and businesses, and its roads are busiest in the evenings. Many local trips from here are to the Corniche, malls and nearby districts.",
    places: [
      { name: "Al-Rawdah cafes and restaurants", note: "Dining and nightlife area" },
      { name: "Jeddah Corniche (nearby)", note: "Waterfront promenade" },
    ],
    faq: { q: "Is Al-Rawdah busy in the evening?", a: "Yes, evenings are busy, so booking in advance is sensible. Availability is confirmed for each request." },
  },
  {
    id: "al-shati",
    city: "jeddah",
    name: "Al-Shati",
    tagline: "Al-Shati is Jeddah's seafront district, close to the Corniche and its parks.",
    about:
      "Al-Shati runs along the coast and has apartments, hotels and waterfront parks. Visitors come for the Corniche promenade and sea views, and weekend evenings are particularly busy.",
    places: [
      { name: "Jeddah Corniche", note: "Waterfront promenade" },
      { name: "King Fahd Fountain (nearby)", note: "Famous fountain on the Red Sea" },
    ],
    faq: { q: "Can I get a ride from Al-Shati to the Corniche?", a: "Yes, short rides can be requested. Weekend evenings are busy, so book in advance. Availability is confirmed for each request." },
  },
  {
    id: "obhur",
    city: "jeddah",
    name: "Obhur",
    tagline: "Obhur is a coastal district on the northern edge of Jeddah, built around sea inlets known as creeks.",
    about:
      "Obhur has beach resorts, villas and marinas on the shoreline north of the city. It is a weekend destination for residents, so rides from the city are heaviest on Thursday and Friday afternoons.",
    places: [
      { name: "Obhur creeks", note: "Sea inlets and waterfront area" },
      { name: "Beach resorts", note: "Private beach and leisure areas" },
    ],
    faq: { q: "Is Obhur far from the city centre?", a: "It is on the northern edge of Jeddah, so a ride from the centre is longer than a typical city trip. Timing is confirmed with you for each request." },
  },
];

export const routes: Route[] = [
  {
    id: "riyadh-to-jeddah",
    from: "riyadh",
    to: "jeddah",
    km: 950,
    about:
      "Riyadh to Jeddah is the longest of the main domestic city-to-city routes, crossing the central plateau and the Hijaz mountains before coming down to the Red Sea coast. It is normally a full-day road journey, and many travellers choose to fly instead, so a road ride is generally for groups, luggage-heavy trips or those who prefer to travel by road.",
    riders: ["Business travellers carrying equipment or samples", "Families travelling with luggage", "Groups heading to Jeddah for Umrah or events"],
    tips: ["Plan for a full day of travel and ask us about rest stops.", "State the number of passengers and bags so the vehicle can be chosen properly."],
  },
  {
    id: "riyadh-to-dammam",
    from: "riyadh",
    to: "dammam",
    km: 400,
    about:
      "Riyadh to Dammam links the capital and the Eastern Province across a flat desert highway. It is one of the busiest corporate routes in the country, because energy, industrial and government offices are split between the two cities, and a passenger train also runs between them.",
    riders: ["Corporate teams moving between the capital and the Eastern Province", "Contractors visiting industrial sites", "Visitors continuing to Al Khobar or Dhahran"],
    tips: ["Say whether you are going to Dammam, Al Khobar or Dhahran, as these are separate drop-offs.", "Weekday mornings and Thursday evenings are the busiest."],
  },
  {
    id: "riyadh-to-makkah",
    from: "riyadh",
    to: "makkah",
    km: 870,
    about:
      "Riyadh to Makkah crosses the width of the country to the holy city. The journey is long, and many pilgrims and visitors choose it for family travel. Vehicle access close to the Haram is controlled, so the final drop-off point is agreed in advance. Entry to Makkah is restricted to Muslims.",
    riders: ["Families travelling for Umrah", "Visitors going to Makkah for religious reasons", "Residents travelling for family visits"],
    tips: ["Confirm the hotel and the nearest permitted drop-off point.", "Peak pilgrim periods can affect traffic and availability."],
  },
  {
    id: "riyadh-to-madinah",
    from: "riyadh",
    to: "madinah",
    km: 850,
    about:
      "Riyadh to Madinah is a long road journey north-west across the country to the city of the Prophet's Mosque. Travellers usually go for religious visits, and the route can be combined with a stop in Qassim or the Hijaz region. Entry to the central area of Madinah is restricted to Muslims.",
    riders: ["Families travelling for religious visits", "Groups travelling together", "Visitors combining Madinah with other cities"],
    tips: ["Agree the drop-off point near your hotel in advance.", "Ask about rest stops for a long journey."],
  },
  {
    id: "riyadh-to-buraydah",
    from: "riyadh",
    to: "buraydah",
    km: 330,
    about:
      "Riyadh to Buraydah heads north on a straight highway to the date-farming heartland of Qassim. The route is used by traders, families and workers, and is busiest in the date harvest season when the Buraydah market is active.",
    riders: ["Traders going to the dates market", "Families visiting relatives", "Business travellers heading to Qassim"],
    tips: ["Tell us if you are going to Buraydah or Unaizah.", "Harvest season can affect timing and availability."],
  },
  {
    id: "riyadh-to-al-hofuf",
    from: "riyadh",
    to: "al-hofuf",
    km: 330,
    about:
      "Riyadh to Hofuf runs east across the desert toward the Al-Ahsa oasis. It is a route for visitors to the oasis's heritage sites, for family travel, and for people heading toward the Eastern Province.",
    riders: ["Visitors going to the Al-Ahsa Oasis", "Families with relatives in Hofuf", "Business travellers heading to the Eastern Province"],
    tips: ["Say whether you are going to Hofuf itself or a different town in the oasis.", "The road is long and straight, so plan rest stops."],
  },
  {
    id: "riyadh-to-hail",
    from: "riyadh",
    to: "hail",
    km: 640,
    about:
      "Riyadh to Hail travels north-west through Qassim and then on to the mountain city of Hail. The route is used by residents, visitors to Hail's events and desert landscapes, and families. It is a long drive, and Qassim is a natural stopping point.",
    riders: ["Visitors to Hail's festivals and desert areas", "Families visiting relatives", "Business travellers to the northern region"],
    tips: ["Ask about a stop in Buraydah on the way.", "Plan for a long journey with rest stops."],
  },
  {
    id: "riyadh-to-al-kharj",
    from: "riyadh",
    to: "al-kharj",
    km: 80,
    about:
      "Riyadh to Al Kharj is a short commuter route south-east of the capital. It is used daily by workers and by visitors going to the farms and industrial areas around Al Kharj.",
    riders: ["Commuters between Al Kharj and Riyadh", "Contractors working in Al Kharj", "Families visiting relatives"],
    tips: ["Regular commuter arrangements can be discussed.", "Access to military and industrial sites is controlled by their operators."],
  },
  {
    id: "jeddah-to-makkah",
    from: "jeddah",
    to: "makkah",
    km: 80,
    about:
      "Jeddah to Makkah is a short, very heavily used route that carries pilgrims from the Red Sea port and airport to the holy city. Traffic is intense in Ramadan and the Hajj season, and vehicle access to the area around the Haram is controlled. Entry to Makkah is restricted to Muslims.",
    riders: ["Pilgrims arriving at Jeddah airport", "Residents visiting Makkah", "Visitors combining Jeddah and Makkah"],
    tips: ["Agree the drop-off point in advance because of controlled access.", "Peak seasons need earlier booking."],
  },
  {
    id: "jeddah-to-madinah",
    from: "jeddah",
    to: "madinah",
    km: 420,
    about:
      "Jeddah to Madinah is a main pilgrim and visitor route running north from the Red Sea coast. The Haramain high-speed rail line serves the same corridor, but a road ride suits groups, those with luggage or travellers who want a direct trip to a hotel.",
    riders: ["Pilgrims moving between the two holy cities", "Families with luggage", "Visitors arriving at Jeddah airport"],
    tips: ["Say which hotel you are going to so the drop-off can be agreed.", "Prayer times and peak seasons can affect road access in Madinah."],
  },
  {
    id: "jeddah-to-taif",
    from: "jeddah",
    to: "taif",
    km: 170,
    about:
      "Jeddah to Taif climbs from the sea-level coast into the Hijaz mountains, so the temperature drops noticeably on the way up. It is a popular summer route for families escaping the heat, and the final climb is steep and winding.",
    riders: ["Families taking summer breaks", "Weekend visitors", "Groups going to Al Hada or Al Shafa"],
    tips: ["Tell us if you are going on to Al Hada, as the roads are steep.", "Weather and fog can affect the mountain section."],
  },
  {
    id: "jeddah-to-yanbu",
    from: "jeddah",
    to: "yanbu",
    km: 330,
    about:
      "Jeddah to Yanbu follows the Red Sea coast north to the industrial and port city of Yanbu. It is used by contractors and workers heading to Yanbu Industrial City, and by visitors to the old town and beaches.",
    riders: ["Industrial contractors", "Workers on rotation", "Visitors to the Yanbu coast"],
    tips: ["Industrial sites need passes arranged in advance.", "State your exact destination in Yanbu, as the old town and industrial city are separate."],
  },
  {
    id: "jeddah-to-abha",
    from: "jeddah",
    to: "abha",
    km: 700,
    about:
      "Jeddah to Abha runs south along the coastal plain and then climbs into the Asir highlands. It is a long route, and the final mountain roads are winding, so it is usually planned as a full day with stops.",
    riders: ["Visitors heading to the Asir mountains", "Families on summer holidays", "Business travellers to the south-west"],
    tips: ["Ask us about rest stops for a long trip.", "Mountain roads and weather affect the final stretch."],
  },
  {
    id: "makkah-to-madinah",
    from: "makkah",
    to: "madinah",
    km: 450,
    about:
      "Makkah to Madinah connects the two holy cities and is one of the most travelled pilgrim routes in the world. A high-speed rail line also runs along the corridor. A road ride is typically requested by groups, families with luggage or people who want a door-to-door journey.",
    riders: ["Pilgrims moving between the two holy cities", "Families travelling together", "Groups with luggage"],
    tips: ["Agree your drop-off points in both cities in advance.", "Peak pilgrim periods need earlier booking."],
  },
  {
    id: "makkah-to-taif",
    from: "makkah",
    to: "taif",
    km: 90,
    about:
      "Makkah to Taif climbs from the low basin of the holy city to the cool plateau of Taif by a mountain road with several steep sections. It is popular with families who combine pilgrim visits with a break in the hills.",
    riders: ["Families combining Umrah with a break", "Visitors to Taif's parks", "Residents travelling for weekends"],
    tips: ["Tell us if you are going to Al Hada, as the roads are steeper.", "Fog and weather can slow the climb."],
  },
  {
    id: "madinah-to-yanbu",
    from: "madinah",
    to: "yanbu",
    km: 220,
    about:
      "Madinah to Yanbu crosses from the inland holy city to the Red Sea coast. The road is used by workers going to Yanbu Industrial City and by visitors who want to see the Red Sea coast after visiting Madinah.",
    riders: ["Industrial workers and contractors", "Visitors combining Madinah and the coast", "Families visiting relatives"],
    tips: ["Industrial sites need passes arranged in advance.", "State your exact destination in Yanbu."],
  },
  {
    id: "dammam-to-al-khobar",
    from: "dammam",
    to: "al-khobar",
    km: 20,
    about:
      "Dammam to Al Khobar is a short urban hop between two neighbouring Gulf cities that function almost like one. Rides are mostly by residents and workers going between offices, malls and the Corniche, and the road is busy at commute times.",
    riders: ["Commuters and office workers", "Shoppers and diners", "Visitors going to the Corniche"],
    tips: ["Give a precise pickup point, as both cities have many similar streets.", "Rush hours are the busiest."],
  },
  {
    id: "dammam-to-jubail",
    from: "dammam",
    to: "jubail",
    km: 90,
    about:
      "Dammam to Jubail runs north along the Gulf coast to the industrial city. It is a core commuter and contractor route for the petrochemical industry, with traffic following shift times.",
    riders: ["Industrial contractors", "Workers on shift rotations", "Visitors going to Jubail"],
    tips: ["Industrial sites need passes arranged in advance.", "Peak traffic follows industrial shift times."],
  },
  {
    id: "dammam-to-al-hofuf",
    from: "dammam",
    to: "al-hofuf",
    km: 130,
    about:
      "Dammam to Hofuf heads inland to the Al-Ahsa oasis. It is used by residents going to the oasis for family reasons and by visitors to the oasis's heritage sites.",
    riders: ["Families visiting relatives", "Visitors to the Al-Ahsa Oasis", "Business travellers"],
    tips: ["Tell us whether you want Hofuf itself or another town in the oasis.", "Weekends are busy with visitors."],
  },
  {
    id: "dammam-to-al-qatif",
    from: "dammam",
    to: "al-qatif",
    km: 25,
    about:
      "Dammam to Qatif is a short trip north to the old oasis city of Qatif. Residents use it daily, and visitors go to the old market and Tarout Castle.",
    riders: ["Daily commuters", "Visitors to the old market", "Families visiting relatives"],
    tips: ["Give a landmark near your pickup point.", "Weekday peaks are busy."],
  },
  {
    id: "abha-to-khamis-mushait",
    from: "abha",
    to: "khamis-mushait",
    km: 30,
    about:
      "Abha to Khamis Mushait is a short link between the two largest cities in Asir. Traffic is heavy on weekday mornings and Thursday evenings, and many residents live in one city and work or shop in the other.",
    riders: ["Commuters and shoppers", "Visitors changing between hotels", "Airport travellers"],
    tips: ["State which side of each city you are starting from.", "Thursday evenings and weekday mornings are busy."],
  },
  {
    id: "abha-to-jazan",
    from: "abha",
    to: "jazan",
    km: 250,
    about:
      "Abha to Jazan descends from the cool Asir mountains to the hot, humid Red Sea coast. The winding mountain road drops quickly, so the temperature and scenery change dramatically on the way down.",
    riders: ["Visitors going to the coast", "Families with relatives in Jazan", "Workers travelling to the port or economic city"],
    tips: ["Mountain sections slow the trip.", "Weather and fog can affect the descent."],
  },
  {
    id: "hail-to-buraydah",
    from: "hail",
    to: "buraydah",
    km: 290,
    about:
      "Hail to Buraydah links the two northern regional capitals across the desert. It is used by families, traders and visitors going between Hail's mountains and Qassim's date farms.",
    riders: ["Traders and business travellers", "Families visiting relatives", "Visitors combining Hail and Qassim"],
    tips: ["Plan for a long journey with a rest stop.", "Harvest season can make Buraydah busier."],
  },
  {
    id: "al-hofuf-to-al-khobar",
    from: "al-hofuf",
    to: "al-khobar",
    km: 150,
    about:
      "Hofuf to Al Khobar links the Al-Ahsa oasis with the Gulf-coast city. It is a regular route for people living in Al-Ahsa but working or shopping on the coast, and for visitors to Al Khobar's Corniche.",
    riders: ["Commuters and shoppers", "Families visiting relatives", "Visitors to the Corniche"],
    tips: ["Say whether you are heading to the Corniche or an office district.", "Weekend evenings are busy."],
  },
];
