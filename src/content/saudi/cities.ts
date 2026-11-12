import type { City } from "./types";

/**
 * The first 24 city pages. Every city has its own paragraph, its own list of real places and its own question,
 * so the pages are not copies of one template. Nothing here states a fare, a journey time or a service guarantee.
 */
export const cities: City[] = [
  {
    id: "riyadh",
    name: "Riyadh",
    region: "riyadh-region",
    wiki: "Riyadh",
    tagline: "Riyadh is the capital and largest city of Saudi Arabia, spread across a wide plateau in the centre of the country.",
    about:
      "Riyadh is built around long arterial roads and ring roads rather than one compact centre. Business travel gathers around Olaya and the King Abdullah Financial District, government and diplomatic trips go to the Diplomatic Quarter, and visitors often add Diriyah and the Boulevard entertainment areas in the evening.",
    getting:
      "A ride across Riyadh can cross several districts and busy ring roads, so a precise pickup point and building entrance save time. King Khalid International Airport is north of the centre, and the Riyadh Metro serves part of the city, which some travellers combine with a car for the last stretch.",
    places: [
      { name: "Olaya", note: "Main business, hotel and shopping district" },
      { name: "King Abdullah Financial District (KAFD)", note: "Financial towers and a metro interchange" },
      { name: "Diplomatic Quarter", note: "Embassies and international organisations" },
      { name: "Diriyah", note: "At-Turaif, a UNESCO World Heritage Site" },
      { name: "Kingdom Centre", note: "Landmark tower and mall in Olaya" },
    ],
    airport: "king-khalid-international-airport",
    nearby: ["al-kharj", "buraydah", "hail", "dammam"],
    faq: {
      q: "Can I book a ride from Riyadh to another city?",
      a: "Yes, intercity rides from Riyadh, for example to Dammam, Jeddah or Buraydah, can be requested. The vehicle, route and fare are confirmed for each request before you commit.",
    },
  },
  {
    id: "jeddah",
    name: "Jeddah",
    region: "makkah-region",
    wiki: "Jeddah",
    tagline: "Jeddah is the Red Sea port city of Saudi Arabia and the main gateway to Makkah.",
    about:
      "Jeddah stretches along the Red Sea coast, with the historic Al-Balad district in the south, a long Corniche in the north and large malls and business streets in between. It is also the arrival point for many travellers heading to Makkah, so airport and station transfers are a large part of local travel.",
    getting:
      "King Abdulaziz International Airport is in the north of the city and has a Haramain high-speed rail station, with the Sulaimaniyah station on the other side of the city. Because the city is long and north-south traffic can be heavy, it helps to state which district and which side of the city you start from.",
    places: [
      { name: "Al-Balad", note: "Historic quarter, UNESCO World Heritage Site" },
      { name: "Jeddah Corniche", note: "Waterfront with the King Fahd Fountain" },
      { name: "Jeddah Islamic Port", note: "One of the main Red Sea ports" },
      { name: "Al-Hamra", note: "Central district of hotels and offices" },
      { name: "Red Sea Mall", note: "Large shopping mall in the north" },
    ],
    airport: "king-abdulaziz-international-airport",
    nearby: ["makkah", "taif", "madinah", "yanbu"],
    faq: {
      q: "Can I be collected from Jeddah airport and taken to Makkah?",
      a: "Rides from Jeddah airport to Makkah can be requested. Vehicle access near the Haram in Makkah is controlled, so the exact drop-off point is agreed with you in advance.",
    },
  },
  {
    id: "makkah",
    name: "Makkah",
    region: "makkah-region",
    wiki: "Mecca",
    tagline: "Makkah is the holiest city in Islam and the centre of the Hajj and Umrah pilgrimages.",
    about:
      "Makkah is organised around Al-Masjid al-Haram, and local travel is shaped by the movement of pilgrims, especially in Ramadan and the Hajj season. Hotels cluster near the Haram, while other visitors and residents stay in districts such as Aziziyah and travel in by road. Entry to Makkah is restricted to Muslims.",
    getting:
      "Roads close to the Haram are controlled and can be restricted at busy times, so the practical pickup or drop-off point may be some distance from a hotel door. The Haramain high-speed railway has a station in Makkah. We arrange taxi and car transport for Umrah and Hajj visitors, from airport transfers to rides to the Haram, for any size of group; each request is confirmed individually.",
    places: [
      { name: "Al-Masjid al-Haram", note: "The Grand Mosque; vehicle access nearby is controlled" },
      { name: "Abraj Al Bait", note: "Clock Tower complex next to the Haram" },
      { name: "Haramain station", note: "High-speed rail link to Jeddah and Madinah" },
      { name: "Aziziyah", note: "Residential district used by visitors" },
      { name: "Jabal al-Noor", note: "Hill containing the Cave of Hira" },
    ],
    airport: "king-abdulaziz-international-airport",
    nearby: ["jeddah", "taif", "madinah"],
    faq: {
      q: "Do you provide Hajj or Umrah transport?",
      a: "Yes. We arrange taxi and car transport for Umrah and Hajj visitors in and around Makkah, including airport transfers, rides to the Haram and journeys to Madinah, for individuals and groups of any size. Movement during the Hajj season is controlled by the authorities, so availability and arrangements are confirmed for each request.",
    },
  },
  {
    id: "madinah",
    name: "Madinah",
    region: "madinah-region",
    wiki: "Medina",
    tagline: "Madinah is the second holiest city in Islam, home to Al-Masjid an-Nabawi.",
    about:
      "Madinah is a smaller, quieter city than Jeddah or Riyadh, built around the Prophet's Mosque. Most visitors stay in the Central Area close to the mosque and make short trips to sites such as Quba Mosque and Mount Uhud. Entry to the central area is restricted to Muslims.",
    getting:
      "Traffic around the Central Area can be restricted at prayer times and during busy seasons, so a pickup is often arranged on a nearby road. Prince Mohammad bin Abdulaziz International Airport is north-east of the city, and the Haramain station connects Madinah to Makkah and Jeddah. Taxi and car transport for Umrah and Hajj visitors, including groups, can be requested for the airport, the Prophet's Mosque and the journey to Makkah.",
    places: [
      { name: "Al-Masjid an-Nabawi", note: "The Prophet's Mosque" },
      { name: "Quba Mosque", note: "First mosque built in Islam, south of the centre" },
      { name: "Mount Uhud", note: "Historic site north of the city" },
      { name: "Masjid al-Qiblatayn", note: "Mosque with two prayer directions" },
      { name: "Haramain station", note: "High-speed rail link to Makkah and Jeddah" },
    ],
    airport: "prince-mohammad-bin-abdulaziz-international-airport",
    nearby: ["yanbu", "makkah", "jeddah"],
    faq: {
      q: "Can I request a ride from Madinah airport to my hotel?",
      a: "Yes, airport pickups can be requested. Because roads near the Central Area can be restricted, the drop-off point close to your hotel is confirmed with you beforehand.",
    },
  },
  {
    id: "dammam",
    name: "Dammam",
    region: "eastern-province",
    wiki: "Dammam",
    tagline: "Dammam is the capital of the Eastern Province and the main port city on the Arabian Gulf coast.",
    about:
      "Dammam is the administrative centre of the Eastern Province and, with Al Khobar and Dhahran, forms a tightly linked urban area. Port, industry and corporate offices drive much of the travel, and many riders move between the three cities on the same day.",
    getting:
      "King Fahd International Airport lies well outside the built-up area, so airport rides are longer than city rides and benefit from advance planning. A passenger rail line also links Dammam with Riyadh, and the Corniche and the main commercial streets are the most common drop-off points.",
    places: [
      { name: "Dammam Corniche", note: "Waterfront and family park area" },
      { name: "King Abdulaziz Port", note: "Major container and cargo port" },
      { name: "Dammam railway station", note: "Passenger rail to Riyadh" },
      { name: "Al Faisaliyah", note: "Central district of offices and shops" },
      { name: "King Fahd International Airport", note: "One of the largest airports by area" },
    ],
    airport: "king-fahd-international-airport",
    nearby: ["al-khobar", "dhahran", "al-qatif", "jubail"],
    faq: {
      q: "Is the airport far from Dammam city?",
      a: "King Fahd International Airport is outside the city, so the ride is longer than a city trip. Please allow for that when you give your flight time; we confirm the plan with you for each request.",
    },
  },
  {
    id: "al-khobar",
    name: "Al Khobar",
    region: "eastern-province",
    wiki: "Khobar",
    tagline: "Al Khobar is a Gulf-coast city known for its Corniche, shopping streets and the causeway to Bahrain.",
    about:
      "Al Khobar sits on the coast beside Dammam and Dhahran. It is the city of choice for many residents and visitors in the Eastern Province because of its waterfront, restaurants and the shopping streets around Prince Turki Street, and it is the starting point for the King Fahd Causeway to Bahrain.",
    getting:
      "Short trips between Al Khobar, Dammam and Dhahran are the most common requests. Weekend evenings are busy near the Corniche, so a pickup on a side street rather than the waterfront road can be easier. Rides to the causeway are for the Saudi side only; cross-border travel is not part of this page.",
    places: [
      { name: "Al Khobar Corniche", note: "Waterfront promenade and restaurants" },
      { name: "Prince Turki Street", note: "Main commercial street" },
      { name: "Al Rakah", note: "Residential and commercial district" },
      { name: "King Fahd Causeway", note: "Road link to Bahrain (Saudi side only here)" },
      { name: "Half Moon Bay", note: "Beach area south of the city" },
    ],
    airport: "king-fahd-international-airport",
    nearby: ["dammam", "dhahran", "al-qatif", "al-hofuf"],
    faq: {
      q: "Can you take me to the King Fahd Causeway?",
      a: "A ride to the Saudi side of the causeway can be requested. Crossing into Bahrain is a cross-border journey, which is not covered by this page and would need to be assessed separately.",
    },
  },
  {
    id: "dhahran",
    name: "Dhahran",
    region: "eastern-province",
    wiki: "Dhahran",
    tagline: "Dhahran is the home of Saudi Aramco's headquarters and a major university and cultural centre.",
    about:
      "Dhahran is much smaller than its neighbours, but it carries an important share of the region's business and academic travel because of Saudi Aramco, King Fahd University of Petroleum and Minerals, and the Ithra cultural centre. Much of the area is gated or controlled, so access arrangements matter.",
    getting:
      "Many of the main sites in Dhahran have controlled access, and visitors may need to be named in advance. Please give the exact entrance and the name of the contact who is expecting you, so the pickup or drop-off can be arranged properly. We do not assume any access rights on your behalf.",
    places: [
      { name: "Saudi Aramco headquarters", note: "Controlled-access company area" },
      { name: "KFUPM", note: "King Fahd University of Petroleum and Minerals" },
      { name: "Ithra", note: "King Abdulaziz Center for World Culture" },
      { name: "Dhahran Expo", note: "Exhibition and conference centre" },
    ],
    airport: "king-fahd-international-airport",
    nearby: ["al-khobar", "dammam", "al-qatif"],
    faq: {
      q: "Can you collect me from inside a controlled compound?",
      a: "Entry to controlled areas depends on the site's own rules. Tell us the entrance and the contact who is expecting you, and we confirm what is possible for your request.",
    },
  },
  {
    id: "jubail",
    name: "Jubail",
    region: "eastern-province",
    wiki: "Jubail",
    tagline: "Jubail is a Gulf-coast industrial city with one of the world's largest petrochemical complexes.",
    about:
      "Jubail has two parts: the old town on the coast and Jubail Industrial City, a large planned area of plants and worker housing built by the Royal Commission. Travel is dominated by shift changes, contractor visits and trips to and from Dammam and the airport.",
    getting:
      "Industrial areas have gates and security checks, so passengers should have site passes ready. Rides to Dammam and King Fahd International Airport are the most common long trips, and early-morning and late-afternoon traffic follows industrial shift times.",
    places: [
      { name: "Jubail Industrial City", note: "Large planned industrial area" },
      { name: "Jubail Corniche", note: "Coastal park and promenade" },
      { name: "Jubail Fish Market", note: "Traditional waterfront market" },
      { name: "Royal Commission area", note: "Administrative and residential zone" },
    ],
    airport: "king-fahd-international-airport",
    nearby: ["dammam", "al-qatif", "al-khobar"],
    faq: {
      q: "Do you take passengers to industrial sites?",
      a: "Rides to industrial areas can be requested. Entry depends on the site's own security rules, so passengers need to have the required pass or gate authorisation.",
    },
  },
  {
    id: "al-hofuf",
    name: "Al Hofuf (Al-Ahsa)",
    region: "eastern-province",
    wiki: "Hofuf",
    tagline: "Hofuf is the main city of the Al-Ahsa oasis, a UNESCO World Heritage Site in the east of the country.",
    about:
      "Hofuf is the largest city in Al-Ahsa, one of the biggest date oases in the world. Visitors come for the old market, historic forts and palm groves, while residents travel for work and family connections, and many trips are regional ones to Dammam, Al Khobar and Riyadh.",
    getting:
      "Inside Hofuf the older centre has narrow streets near the market, so a pickup on a main road is usually easier. Al-Ahsa International Airport serves the area, and the road to Dammam and Al Khobar is one of the busiest regional routes.",
    places: [
      { name: "Al-Ahsa Oasis", note: "UNESCO World Heritage Site" },
      { name: "Qaisariah Souq", note: "Traditional covered market" },
      { name: "Jawatha Mosque", note: "One of the oldest mosques in the region" },
      { name: "Ibrahim Palace", note: "Historic fortress" },
    ],
    airport: "al-ahsa-international-airport",
    nearby: ["dammam", "al-khobar", "al-qatif"],
    faq: {
      q: "Can I travel from Hofuf to Dammam or Riyadh?",
      a: "Yes, intercity rides from Hofuf can be requested. Vehicle, route and fare are confirmed for each request before you commit.",
    },
  },
  {
    id: "al-qatif",
    name: "Al Qatif",
    region: "eastern-province",
    wiki: "Qatif",
    tagline: "Al Qatif is an old coastal oasis city just north of Dammam.",
    about:
      "Qatif is one of the oldest settlements on the Gulf coast, with palm groves, traditional markets and a fort. It now forms part of the Dammam metropolitan area, so daily trips link it with Dammam, Dhahran and Jubail.",
    getting:
      "The main roads between Qatif and Dammam are heavily used on weekdays, and the old town streets are narrower than the highway areas. Giving a landmark near your pickup point helps the driver find you quickly.",
    places: [
      { name: "Qatif Oasis", note: "Palm groves and old farms" },
      { name: "Tarout Castle", note: "Historic fort on nearby Tarout Island" },
      { name: "Qatif old market", note: "Traditional shops and stalls" },
    ],
    airport: "king-fahd-international-airport",
    nearby: ["dammam", "jubail", "al-khobar"],
    faq: {
      q: "Is Qatif covered from Dammam airport?",
      a: "Airport rides to and from Qatif can be requested. They are confirmed for each request and not assumed.",
    },
  },
  {
    id: "taif",
    name: "Taif",
    region: "makkah-region",
    wiki: "Taif",
    tagline: "Taif is a mountain city known for its cool summers, rose farms and as a summer retreat from the heat of Jeddah and Riyadh.",
    about:
      "Taif sits high in the Hijaz mountains, so it is much cooler in summer than Makkah or Jeddah. Families come for the rose farms, fruit orchards and parks of Al Hada and Al Shafa, and the city is a popular weekend and holiday destination, with the busiest period in the hot months.",
    getting:
      "The road up to Al Hada and Al Shafa is steep and winding, so rides there take longer than the distance suggests and can be affected by fog and weather. Taif International Airport serves the city, and the road down to Makkah and Jeddah is one of the most travelled regional routes.",
    places: [
      { name: "Al Hada", note: "Mountain resort area with a cable car" },
      { name: "Al Shafa", note: "Highland district with farms and parks" },
      { name: "Souq Okaz", note: "Historic fair site and cultural event venue" },
      { name: "Shubra Palace", note: "Historic palace museum in the city" },
      { name: "Taif rose farms", note: "Seasonal rose harvest areas" },
    ],
    airport: "taif-international-airport",
    nearby: ["makkah", "jeddah", "al-bahah"],
    faq: {
      q: "Can I get a ride up to Al Hada?",
      a: "Rides to Al Hada can be requested. The mountain road is steep and affected by weather, so timing and the vehicle are confirmed with you in advance.",
    },
  },
  {
    id: "yanbu",
    name: "Yanbu",
    region: "madinah-region",
    wiki: "Yanbu",
    tagline: "Yanbu is a Red Sea port and industrial city on the western coast.",
    about:
      "Yanbu has two main areas: Yanbu Al-Bahr, the old coastal town, and Yanbu Industrial City, a large complex of refineries and petrochemical plants. Travel is driven by industrial contractors, port work and visitors heading to the beaches and old town.",
    getting:
      "Industrial City sites have controlled gates, and passengers must have their passes. The coastal road between Yanbu and Jeddah is long, and Madinah is the other main regional destination, with the airport serving both business and leisure trips.",
    places: [
      { name: "Yanbu Industrial City", note: "Refineries and petrochemical plants" },
      { name: "Yanbu Al-Bahr old town", note: "Historic coral-stone houses" },
      { name: "Yanbu Corniche", note: "Waterfront promenade" },
      { name: "Yanbu Commercial Port", note: "Red Sea port" },
    ],
    airport: "prince-abdulmohsen-bin-abdulaziz-international-airport",
    nearby: ["madinah", "jeddah"],
    faq: {
      q: "Do you take contractors to Yanbu Industrial City?",
      a: "Rides to industrial areas can be requested. Entry depends on the site's gate rules, so passengers need the required pass or authorisation.",
    },
  },
  {
    id: "alula",
    name: "AlUla",
    region: "madinah-region",
    wiki: "AlUla",
    tagline: "AlUla is an oasis town in the desert of north-west Saudi Arabia, known for the ancient site of Hegra.",
    about:
      "AlUla lies in Madinah Region and is known for its sandstone canyons and rock formations and for Hegra, the pre-Islamic tomb site also called Madain Salih. Visitors come for the heritage sites, the old town, desert resorts and seasonal events, and most travel is between the airport, a resort and the places they have booked.",
    getting:
      "Distances between the town, the heritage sites and desert resorts can be long, and some sites are visited only by booked tour. AlUla International Airport is the main way in, and Madinah is the main city to the south. Tell us the resort or site rather than a street address, and we confirm the vehicle, driver and fare for your request.",
    places: [
      { name: "Hegra (Madain Salih)", note: "Pre-Islamic tomb site; visits are by booking" },
      { name: "Elephant Rock", note: "A well-known sandstone formation outside the town" },
      { name: "AlUla Old Town", note: "Historic mud-brick town in the oasis" },
      { name: "AlUla International Airport", note: "The airport serving the area" },
    ],
    airport: "alula-international-airport",
    nearby: ["madinah", "tabuk", "yanbu"],
    faq: {
      q: "Can you take me to Hegra?",
      a: "Rides to the Hegra area can be requested. Entry to the site is by booked visit, so make that booking yourself and tell us the time, and we confirm the ride to match it.",
    },
  },  {
    id: "abha",
    name: "Abha",
    region: "asir-region",
    wiki: "Abha",
    tagline: "Abha is the capital of Asir and a mountain city with a cool climate, sitting at more than 2,000 metres above sea level.",
    about:
      "Abha is the tourism hub of the south-west, with green mountain scenery, old stone villages and parks. Visitors arrive in large numbers in summer to escape the heat of the rest of the country, and residents travel to Khamis Mushait and the surrounding towns daily.",
    getting:
      "Mountain roads mean rides can be slower than the map suggests, and fog is common in some seasons. Abha International Airport is close to the city, and many visitors ask for a ride directly to a viewpoint or village outside it.",
    places: [
      { name: "Al Soudah", note: "One of the highest points in the country" },
      { name: "Abha Dam Lake", note: "Reservoir and park area" },
      { name: "Al Muftaha", note: "Arts village in the city" },
      { name: "Habala", note: "Terraced hillside village" },
      { name: "Rijal Almaa", note: "Historic stone village in the mountains" },
    ],
    airport: "abha-international-airport",
    nearby: ["khamis-mushait", "jazan", "najran", "al-bahah"],
    faq: {
      q: "Can I be driven from Abha to Al Soudah?",
      a: "Yes, rides to mountain destinations such as Al Soudah can be requested. Mountain roads and weather are taken into account when the plan is confirmed.",
    },
  },
  {
    id: "khamis-mushait",
    name: "Khamis Mushait",
    region: "asir-region",
    wiki: "Khamis Mushait",
    tagline: "Khamis Mushait is the largest city in Asir, close to Abha and the commercial centre of the south-west.",
    about:
      "Khamis Mushait is a larger and busier city than Abha, with a strong commercial centre, markets and a large residential population. The two cities almost merge, and a large share of everyday travel in Asir is between them.",
    getting:
      "The Abha to Khamis Mushait link is short, but it is busy on weekday mornings and Thursday evenings. Abha International Airport is the nearest main airport, and rides to the mountain tourist areas generally start from either city.",
    places: [
      { name: "Khamis Mushait city centre", note: "Large markets and retail areas" },
      { name: "Abha–Khamis road", note: "The main link to Abha" },
      { name: "Asir National Park (area)", note: "Mountain parkland to the west" },
      { name: "Abha International Airport", note: "Nearest main airport" },
    ],
    airport: "abha-international-airport",
    nearby: ["abha", "najran", "jazan"],
    faq: {
      q: "Is Khamis Mushait covered if I land at Abha airport?",
      a: "Rides between Abha airport and Khamis Mushait can be requested and are confirmed for each request.",
    },
  },
  {
    id: "tabuk",
    name: "Tabuk",
    region: "tabuk-region",
    wiki: "Tabuk, Saudi Arabia",
    tagline: "Tabuk is the main city in the north-west and the gateway to the Red Sea coast and the new development areas in the region.",
    about:
      "Tabuk is a regional centre with a historic fort and a long role as a stop on the old Hejaz railway line. The city serves surrounding towns, and long desert roads connect it with the Red Sea coast, the Jordanian border and the large new development areas in the region.",
    getting:
      "Distances from Tabuk to other places in the region are long, and rides outside the city tend to be full-day journeys. Tabuk has its own regional airport, and most requests are for city trips, airport rides and long regional runs.",
    places: [
      { name: "Tabuk Castle", note: "Historic Ottoman-era fort in the city" },
      { name: "Hejaz Railway station (Tabuk)", note: "Restored historic station" },
      { name: "Tabuk Regional Airport", note: "Domestic and some regional flights" },
      { name: "Wadi Disah", note: "Sandstone canyon in the region" },
    ],
    airport: "tabuk-regional-airport",
    nearby: ["hail", "madinah"],
    faq: {
      q: "Can I travel from Tabuk to the Red Sea coast?",
      a: "Long regional rides from Tabuk can be requested. Distances are large, so the vehicle, route and timing are confirmed with you for each request.",
    },
  },
  {
    id: "buraydah",
    name: "Buraydah",
    region: "qassim-region",
    wiki: "Buraydah",
    tagline: "Buraydah is the capital of Qassim and one of the largest date-trading cities in the world.",
    about:
      "Buraydah is the largest city in Qassim and the centre of the region's date farming. In the date season, the city's date market draws traders and visitors, and the city lies north of Riyadh, so Riyadh trips are a regular request.",
    getting:
      "The regional airport lies between Buraydah and the neighbouring city of Unaizah. Most rides are either within Buraydah, to and from the airport, or on the highway to Riyadh and Hail, so the airport location is worth mentioning when you book.",
    places: [
      { name: "Buraydah Dates Market", note: "One of the largest date markets" },
      { name: "Qassim Regional Airport", note: "Serves Buraydah and Unaizah" },
      { name: "Qassim University", note: "Large university campus" },
      { name: "Buraydah city centre", note: "Main shopping and government area" },
    ],
    airport: "prince-naif-bin-abdulaziz-international-airport",
    nearby: ["riyadh", "hail"],
    faq: {
      q: "Can I book a ride from Buraydah to Riyadh?",
      a: "Yes, rides on the Riyadh route can be requested. The vehicle, route and fare are confirmed for each request.",
    },
  },
  {
    id: "hail",
    name: "Hail",
    region: "hail-region",
    wiki: "Ha'il",
    tagline: "Hail is the capital of the Hail Region, set between the Aja and Salma mountain ranges.",
    about:
      "Hail is a regional city that lies between two granite mountain ranges and has a long history as a stop on desert caravan routes. It is known for local events, desert landscapes and the ancient rock-art sites in the region, and it connects Qassim and the north.",
    getting:
      "Long highways link Hail with Buraydah and Riyadh, and the road to the rock-art area at Jubbah heads north-west across desert. Hail's regional airport is close to the city, so airport rides are short and long trips are planned in advance.",
    places: [
      { name: "Aja and Salma mountains", note: "Granite ranges around the city" },
      { name: "Hail Regional Airport", note: "Close to the city" },
      { name: "Jubbah rock art", note: "UNESCO site north-west of the city" },
      { name: "Hail city centre", note: "Main markets and administration" },
    ],
    airport: "hail-regional-airport",
    nearby: ["buraydah", "riyadh", "tabuk"],
    faq: {
      q: "Can you take me to the Jubbah rock-art area?",
      a: "Rides to sites outside the city can be requested. Distances and road conditions are checked, and the plan is confirmed with you for each request.",
    },
  },
  {
    id: "jazan",
    name: "Jazan",
    region: "jazan-region",
    wiki: "Jazan",
    tagline: "Jazan is a Red Sea port city in the far south-west, near the Yemen border and the Farasan Islands.",
    about:
      "Jazan sits on the Red Sea coast in a fertile plain. It has a port, a developing economic city, and departure points for boats to the Farasan Islands. The climate is warm and humid, and the road up to Abha and the mountains is a popular route for visitors.",
    getting:
      "King Abdullah bin Abdulaziz Airport serves Jazan, and the port area handles ferry traffic to Farasan. Some border areas near Yemen are restricted, so rides toward the border region are not assumed and need to be assessed first.",
    places: [
      { name: "Jazan Corniche", note: "Waterfront park and promenade" },
      { name: "Jazan Dam (Wadi Jazan)", note: "Major dam and lake" },
      { name: "Farasan Islands ferry", note: "Departures from the Jazan area" },
      { name: "Jazan Economic City", note: "Planned port and industrial zone" },
    ],
    airport: "king-abdullah-bin-abdulaziz-airport",
    nearby: ["abha", "najran", "khamis-mushait"],
    faq: {
      q: "Can I travel from Jazan to Abha?",
      a: "Yes, the Jazan to Abha route can be requested. Mountain sections slow the journey, and timing is confirmed with you for each request.",
    },
  },
  {
    id: "najran",
    name: "Najran",
    region: "najran-region",
    wiki: "Najran",
    tagline: "Najran is a southern border city in a fertile valley, known for its fort and ancient sites.",
    about:
      "Najran lies in the south of the country near the Yemen border in a valley with farms and date palms. It has a long history, and visitors come for the Najran Fort, the ancient site of Al Ukhdud and the mud-brick architecture.",
    getting:
      "Najran is a long way from the other main cities, so intercity rides, for example to Abha, are long. Some areas close to the border are restricted, so rides toward the border region need to be assessed first and are not assumed.",
    places: [
      { name: "Najran Fort (Aba Al-Saud)", note: "Mud-brick fort in the city" },
      { name: "Al Ukhdud", note: "Archaeological site" },
      { name: "Najran Valley", note: "Farmland and palm groves" },
      { name: "Najran Airport", note: "Serves the city" },
    ],
    airport: "najran-airport",
    nearby: ["khamis-mushait", "abha", "jazan"],
    faq: {
      q: "Is Najran reachable from Abha?",
      a: "A ride from Abha to Najran can be requested. It is a long journey, and the vehicle, route and timing are confirmed with you in advance.",
    },
  },
  {
    id: "al-bahah",
    name: "Al Bahah",
    region: "al-bahah-region",
    wiki: "Al Bahah",
    tagline: "Al Bahah is a mountain city with forest parks and stone villages, reached by winding roads from the Hijaz.",
    about:
      "Al Bahah is the capital of the smallest region by area, and it is popular with visitors for its green hills, cool air and traditional villages such as Dhi Ayn. The roads are steep and have many curves, so travel takes longer than the distance suggests.",
    getting:
      "The main approach is from Taif and Makkah Region over mountain roads. Fog and rain can change conditions quickly, so the driver and vehicle are chosen to suit the route. Al Bahah has a domestic airport.",
    places: [
      { name: "Raghadan Forest Park", note: "Mountain park with viewpoints" },
      { name: "Dhi Ayn village", note: "Stone village on a rock" },
      { name: "Al Bahah domestic airport", note: "Serves the region" },
      { name: "Al Bahah city centre", note: "Main shopping and administration" },
    ],
    airport: "al-bahah-airport",
    nearby: ["taif", "abha"],
    faq: {
      q: "Can I travel to Al Bahah from Taif?",
      a: "Yes, rides on the Taif route can be requested. The mountain road is slower than the distance suggests, and the plan is confirmed with you in advance.",
    },
  },
  {
    id: "sakaka",
    name: "Sakaka",
    region: "al-jawf-region",
    wiki: "Sakaka",
    tagline: "Sakaka is the capital of Al Jawf, an oasis city in the north surrounded by olive groves.",
    about:
      "Sakaka sits in a depression in the northern desert, and it is the main base for visiting the old settlement of Dumat al-Jandal and the surrounding olive farms. It is a regional administrative centre with a small airport.",
    getting:
      "The area is far from the main cities, and most rides are long regional journeys. Trips to Dumat al-Jandal and Marid Castle from Sakaka are short by comparison, and the airport is the main link to the rest of the country.",
    places: [
      { name: "Dumat al-Jandal", note: "Ancient settlement with Marid Castle" },
      { name: "Al Jawf olive farms", note: "Large olive groves" },
      { name: "Zaabal Castle", note: "Rock fort in Sakaka" },
      { name: "Al Jouf Airport", note: "Serves the region" },
    ],
    airport: "al-jouf-airport",
    nearby: ["arar", "tabuk", "hail"],
    faq: {
      q: "Can you take me to Dumat al-Jandal?",
      a: "Rides to Dumat al-Jandal can be requested. The plan is confirmed with you for each request.",
    },
  },
  {
    id: "arar",
    name: "Arar",
    region: "northern-borders-region",
    wiki: "Arar, Saudi Arabia",
    tagline: "Arar is the capital of the Northern Borders Region, near the Iraqi border.",
    about:
      "Arar is a small regional capital on a flat desert plain in the far north. It handles administration, trade with surrounding towns and the region's connection to the rest of the country by road and air.",
    getting:
      "Arar is far from other main cities, and long highways connect it with Sakaka, Hail and Riyadh. The border area is restricted, so rides toward it are not assumed and would need to be assessed first. Arar has its own airport.",
    places: [
      { name: "Arar city centre", note: "Main shopping and government area" },
      { name: "Arar Domestic Airport", note: "Serves the region" },
      { name: "Northern Borders University", note: "Regional university" },
    ],
    airport: "arar-airport",
    nearby: ["sakaka", "hail"],
    faq: {
      q: "Do you take passengers to the border area?",
      a: "Rides toward the border region are not assumed. Share where you are going and we will tell you whether it can be assessed.",
    },
  },
  {
    id: "hafar-al-batin",
    name: "Hafar Al-Batin",
    region: "eastern-province",
    wiki: "Hafar Al-Batin",
    tagline: "Hafar Al-Batin is a northern Eastern Province city close to the Kuwait and Iraq borders.",
    about:
      "Hafar Al-Batin sits in the north of the Eastern Province in a flat desert area known for livestock trading and long-distance road transport. It is a regional centre for the surrounding area and a stop on the road between the Gulf and the north.",
    getting:
      "It is far from Dammam and the other big urban centres, so most rides from here are regional ones. The border areas near Kuwait and Iraq are restricted, so rides toward them are not assumed.",
    places: [
      { name: "Hafar Al-Batin city centre", note: "Main shopping area" },
      { name: "Wadi Al-Batin", note: "Dry river valley that gives the city its name" },
      { name: "Northern highway", note: "Main route toward the Gulf and the north" },
    ],
    nearby: ["dammam", "buraydah"],
    faq: {
      q: "Can I book a ride from Hafar Al-Batin to Dammam?",
      a: "A ride to Dammam can be requested. It is a long journey, so the vehicle, route and timing are confirmed with you for each request.",
    },
  },
  {
    id: "al-kharj",
    name: "Al Kharj",
    region: "riyadh-region",
    wiki: "Al-Kharj",
    tagline: "Al Kharj is an agricultural and industrial city south-east of Riyadh.",
    about:
      "Al Kharj is known for farms, dairy production and the Prince Sultan Air Base, and it has grown into a large city of its own to the south-east of Riyadh. Many residents commute to the capital, and Riyadh is the most common destination for rides from here.",
    getting:
      "The road to Riyadh is a busy commuter route, particularly in the morning and late afternoon. Access to military and industrial areas is controlled by their operators, so passengers should arrange permission in advance.",
    places: [
      { name: "Al Kharj farms", note: "Large dairy and agricultural area" },
      { name: "Al Kharj city centre", note: "Main shopping and administration" },
      { name: "Riyadh road", note: "Commuter route to the capital" },
    ],
    nearby: ["riyadh", "al-hofuf"],
    faq: {
      q: "Can I book a daily ride from Al Kharj to Riyadh?",
      a: "Regular rides can be discussed once we know the days and times. Availability is confirmed for each arrangement.",
    },
  },
];
