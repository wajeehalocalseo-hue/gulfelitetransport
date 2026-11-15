/**
 * Landing-page content for the 22 Riyadh intercity routes. Each route has its own introduction, reasons, planning
 * note, related routes and questions, so the pages are not one template with the city name swapped.
 *
 * Distances and driving times come from OpenStreetMap routing (see route-times.json). Destination places and
 * airports come from cities.ts. Nothing here states a fare, a rating or a guarantee, and nothing is promised
 * about availability.
 */
export type RouteProfile = {
  title: string;
  /** Short selling point used in the description. */
  tail: string;
  intro: string;
  why: { title: string; text: string }[];
  plan: string;
  /** Route ids, or "intl:<id>" for an international page. */
  related: string[];
  faq: { q: string; a: string }[];
};

export const routeProfiles: Record<string, RouteProfile> = {
  "riyadh-to-jeddah": {
    title: "Riyadh to Jeddah Taxi: Private Intercity Ride",
    tail: "Airport, hotel and family rides.",
    intro:
      "Riyadh to Jeddah takes you across the width of the kingdom, over the central plateau and down through the Hijaz mountains to the Red Sea coast. It is the longest of the main city-to-city routes, so most people who book a private car are groups, families with luggage, or travellers who want to be collected from the door and dropped at the hotel or office in Jeddah.",
    why: [
      { title: "One car for the whole journey", text: "No change at an airport or station, and the car waits for your group instead of a boarding time." },
      { title: "Drop-off where you need it", text: "Jeddah is a long city, so name the district or hotel. Rides can end in Al-Balad, on the Corniche, in Al-Hamra or at the airport." },
      { title: "Stops planned in advance", text: "On a journey this long, rest stops and prayer breaks can be agreed when you request the ride." },
    ],
    plan: "Plan the departure so you reach Jeddah in daylight and outside the evening rush. Tell us if you need to catch a flight from King Abdulaziz International Airport, because the time you must arrive decides when we leave Riyadh.",
    related: ["riyadh-to-makkah", "riyadh-to-madinah", "riyadh-to-taif"],
    faq: [
      { q: "Is a private taxi better than flying from Riyadh to Jeddah?", a: "Flying is faster for one traveller. A private car suits groups, families with luggage, people carrying equipment and anyone who wants door-to-door travel with stops of their choice." },
      { q: "Can the ride end at Jeddah airport or in Al-Balad?", a: "Yes, give us the exact drop-off point in Jeddah, such as King Abdulaziz International Airport, a hotel or an address, and it is confirmed with the rest of the plan." },
      { q: "Can I continue from Jeddah to Makkah on the same booking?", a: "Yes, ask for the extra leg in the same request. Entry to Makkah is restricted to Muslims, and the drop-off near the Haram is agreed in advance." },
    ],
  },
  "riyadh-to-dammam": {
    title: "Riyadh to Dammam Taxi: Private Ride and Transfers",
    tail: "Business trips and airport transfers.",
    intro:
      "Riyadh to Dammam links the capital with the Eastern Province across a flat desert highway. It is one of the busiest business routes in the country, because energy, industrial and government work is split between the two cities, and a passenger train also runs between them. A private car is chosen for meetings with several stops, equipment and a fixed arrival time.",
    why: [
      { title: "Flexible against the train", text: "A car leaves when you are ready and goes to your hotel or office, rather than to a station." },
      { title: "Several stops in one trip", text: "Dammam, Al Khobar and Dhahran are close together, so one booking can cover meetings in more than one of them." },
      { title: "Planned around a flight", text: "King Fahd International Airport serves the area, and the pickup can be planned back from your departure time." },
    ],
    plan: "Weekday mornings and Thursday evenings are the busiest. Say whether you are going to Dammam, Al Khobar or Dhahran, because they are separate drop-offs.",
    related: ["riyadh-to-al-khobar", "riyadh-to-dhahran", "riyadh-to-jubail"],
    faq: [
      { q: "Can I be dropped in Al Khobar or Dhahran instead of Dammam?", a: "Yes. The three are neighbours on the Gulf coast, so give your exact destination and the drop-off is confirmed with the plan." },
      { q: "Can I book Dammam airport as part of the trip?", a: "Yes. Send your flight details for King Fahd International Airport and the pickup or drop-off is planned around them." },
      { q: "Is a return from Dammam to Riyadh possible on the same request?", a: "Yes. Ask for the return and give the day and time you want to travel back, or tell us you will confirm it later." },
    ],
  },
  "riyadh-to-makkah": {
    title: "Riyadh to Makkah (Mecca) Taxi: Umrah & Family Rides",
    tail: "Umrah, hotels and family groups.",
    intro:
      "Riyadh to Makkah crosses the country to the holy city, and most riders are families and groups travelling for Umrah or for a stay near the Haram. Entry to Makkah is restricted to Muslims, and vehicle access close to the Haram is controlled, so the plan for the last stretch matters as much as the long road.",
    why: [
      { title: "Hotel drop-off agreed first", text: "Tell us your hotel and the nearest permitted drop-off point is agreed before you leave Riyadh." },
      { title: "Room for the group and the bags", text: "Families and groups travelling for Umrah often carry more luggage, so the vehicle is chosen to fit." },
      { title: "Prayer and rest stops", text: "A journey this long can include planned stops, which you can ask for in the request." },
    ],
    plan: "Peak pilgrim periods and Ramadan affect traffic and availability around Makkah, so ask early. Give your hotel name, the number of passengers and the number of bags.",
    related: ["riyadh-to-madinah", "riyadh-to-jeddah", "riyadh-to-taif"],
    faq: [
      { q: "Can the car go right up to my hotel near the Haram?", a: "Vehicle access near the Haram is controlled, so the drop-off point is agreed in advance and may be on a nearby road. We confirm it for each request." },
      { q: "Can I add Madinah or Jeddah to the same trip?", a: "Yes. Many pilgrims combine Makkah with Madinah or Jeddah, and the extra legs can be requested together." },
      { q: "Who can travel to Makkah?", a: "Entry to Makkah is restricted to Muslims. Passengers are responsible for their own permits and documents." },
    ],
  },
  "riyadh-to-madinah": {
    title: "Riyadh to Madinah (Medina) Taxi: Private Family Ride",
    tail: "Family and group travel.",
    intro:
      "Riyadh to Madinah runs north-west across the country to the city of the Prophet's Mosque. Travellers usually go for religious visits, often with family, and the road can be combined with a stop in Qassim. The central area of Madinah is restricted to Muslims, so the drop-off near the mosque is planned in advance.",
    why: [
      { title: "A calmer arrival", text: "A car arranged to your hotel means no searching for transport after a long drive." },
      { title: "Combine with Makkah", text: "The Haramain high-speed rail and the road link Madinah, Makkah and Jeddah, and a car can cover the legs you do not want to take by rail." },
      { title: "Qassim on the way", text: "The route can pass through Qassim, so a stop in Buraydah can be planned." },
    ],
    plan: "Tell us your hotel and the area of Madinah, since roads near the mosque are controlled at busy times. Ask about rest stops for a long journey.",
    related: ["riyadh-to-makkah", "riyadh-to-jeddah", "riyadh-to-yanbu"],
    faq: [
      { q: "Can I be dropped close to the Prophet's Mosque?", a: "The central area has controlled access, so the nearest permitted drop-off point is agreed in advance and confirmed with your request." },
      { q: "Can I travel from Madinah on to Makkah?", a: "Yes, ask for the next leg in the same request, or book it later from the Madinah to Makkah ride page." },
      { q: "Is the route possible in one day?", a: "It is a long drive, so many travellers plan an early start and rest stops. We confirm the plan for your request and do not promise a journey time." },
    ],
  },
  "riyadh-to-buraydah": {
    title: "Riyadh to Buraydah Taxi: Private Qassim Ride",
    tail: "Qassim, dates market and family visits.",
    intro:
      "Riyadh to Buraydah heads north on a straight highway to the date-farming heartland of Qassim. It is used by traders going to the dates market, by families visiting relatives and by workers, and it is busiest in the harvest season. Buraydah is also the natural halfway stop on the road to Hail.",
    why: [
      { title: "Shorter than the long routes", text: "At about a third of the distance to Jeddah, it works well as a day trip with a return the same day." },
      { title: "Trade and harvest season", text: "In the date season we plan around busier roads and market hours." },
      { title: "A stop on the way north", text: "Buraydah can be the first leg of a longer trip to Hail or beyond." },
    ],
    plan: "Tell us whether you are going to Buraydah or to another Qassim town such as Unaizah, since the drop-off point changes.",
    related: ["riyadh-to-hail", "riyadh-to-madinah", "riyadh-to-sakaka"],
    faq: [
      { q: "Can I be dropped at the dates market?", a: "Yes. Give us the market or the address and the drop-off is confirmed, with a return pickup arranged if you want one." },
      { q: "Can the trip continue to Hail?", a: "Yes. Buraydah is on the way to Hail, so a stop and an onward leg can be planned together." },
      { q: "Can I go and return on the same day?", a: "Many travellers do. Tell us the time you want to come back and we plan the return with the outward ride." },
    ],
  },
  "riyadh-to-al-hofuf": {
    title: "Riyadh to Al Hofuf Taxi: Private Al-Ahsa Ride",
    tail: "Al-Ahsa Oasis visits and family travel.",
    intro:
      "Riyadh to Al Hofuf runs east across the desert to the Al-Ahsa oasis, which is a UNESCO World Heritage Site. It is a route for visitors to the oasis and its markets, for families with relatives in Hofuf, and for people heading on toward the Eastern Province, and the road is long and straight.",
    why: [
      { title: "Straight to the oasis", text: "A private car takes you directly to the oasis district or hotel you name." },
      { title: "Sights in one day", text: "A driver can wait or return for you while you visit the heritage sites and markets." },
      { title: "Continue to the coast", text: "Hofuf is within reach of Dammam and Al Khobar, so an onward ride can be added." },
    ],
    plan: "Say whether you are going to Hofuf itself or to another town in the oasis, and plan rest stops, since the road is long and the landscape is open.",
    related: ["riyadh-to-dammam", "riyadh-to-al-khobar", "riyadh-to-jubail"],
    faq: [
      { q: "Can the driver wait while I visit the oasis?", a: "Waiting and a return pickup can be arranged. Tell us how long you plan to stay and the plan is confirmed with you." },
      { q: "Is Al-Ahsa the same as Al Hofuf?", a: "Al Hofuf is the main city of the Al-Ahsa oasis. Tell us your exact town or hotel so the drop-off is right." },
      { q: "Can I continue from Hofuf to Dammam?", a: "Yes. The onward ride can be requested together with the trip from Riyadh." },
    ],
  },
  "riyadh-to-hail": {
    title: "Riyadh to Hail Taxi: Private Ride to the North",
    tail: "Hail events, desert trips and family visits.",
    intro:
      "Riyadh to Hail travels north-west through Qassim to the mountain city of Hail, set between the Aja and Salma ranges. People go for the city's events and desert landscapes, for family visits and for work in the northern region. It is a long drive, and Buraydah is a natural place to break the journey.",
    why: [
      { title: "A break in Qassim", text: "A stop in Buraydah can be planned so the drive is not one continuous run." },
      { title: "Desert and mountain trips", text: "Hail's surroundings are popular with visitors, and a car with a driver can cover the area." },
      { title: "A door-to-door return", text: "The return from Hail can be requested with the outward ride." },
    ],
    plan: "Tell us your hotel or address in Hail and whether you want a stop in Buraydah on the way.",
    related: ["riyadh-to-buraydah", "riyadh-to-sakaka", "riyadh-to-arar"],
    faq: [
      { q: "Can I stop in Buraydah on the way?", a: "Yes. Buraydah is on the road, and a stop can be added when you request the ride." },
      { q: "Can the car take me to the desert around Hail?", a: "Rides to places around Hail can be requested. Tell us where, and we confirm whether the vehicle is suitable for the road." },
      { q: "Is there an airport at Hail?", a: "Yes, Hail has an airport. If you are connecting with a flight, give us the details and the pickup is planned around it." },
    ],
  },
  "riyadh-to-al-kharj": {
    title: "Riyadh to Al Kharj Taxi: Daily and Private Rides",
    tail: "Commuters, contractors and farm visits.",
    intro:
      "Riyadh to Al Kharj is a short run south-east of the capital, used every day by workers and by visitors to the farms and industrial areas around Al Kharj. Because it is much shorter than the other routes, it suits same-day trips and regular commuting arrangements.",
    why: [
      { title: "A short, repeatable trip", text: "Regular rides between Riyadh and Al Kharj can be discussed instead of booking each one." },
      { title: "Site and farm visits", text: "Contractors and visitors can be collected from Riyadh and taken to the site gate you name." },
      { title: "Same-day return", text: "The distance makes a return the same day easy to plan." },
    ],
    plan: "Access to military and industrial sites is controlled by their operators, so give the gate and the contact who expects you.",
    related: ["riyadh-to-al-hofuf", "riyadh-to-dammam", "riyadh-to-najran"],
    faq: [
      { q: "Can I arrange rides to Al Kharj every day?", a: "Regular commuter arrangements can be discussed. Tell us the days, times and pickup points and we confirm what is possible." },
      { q: "Can the car go to a farm or a factory gate?", a: "Rides to a named site can be requested. Access is controlled by the site, so give us the gate and the contact." },
      { q: "Is Al Kharj a city of its own?", a: "Yes. It is a separate city in Riyadh Region, south-east of Riyadh, and it has its own page on this site." },
    ],
  },
  "riyadh-to-al-khobar": {
    title: "Riyadh to Al Khobar Taxi: Private Gulf Coast Ride",
    tail: "Corniche, offices and the causeway.",
    intro:
      "Riyadh to Al Khobar follows the Dammam highway and ends on the Gulf coast, in the commercial and residential city beside Dammam. It suits visitors going to Khobar's offices, hotels and Corniche, and travellers continuing to Bahrain over the King Fahd Causeway.",
    why: [
      { title: "Right at your hotel or office", text: "Khobar is a city of towers and waterfront hotels, so a drop-off at the entrance saves a transfer." },
      { title: "A start for Bahrain", text: "If you are crossing to Bahrain, the Khobar leg and the causeway can be planned together." },
      { title: "Neighbouring cities", text: "Dammam and Dhahran are next door, so one booking can cover meetings in more than one." },
    ],
    plan: "Give the hotel, office or district in Al Khobar, since Dammam and Dhahran are separate drop-offs.",
    related: ["riyadh-to-dammam", "riyadh-to-dhahran", "intl:riyadh-to-manama"],
    faq: [
      { q: "Can I go on to Bahrain from Al Khobar?", a: "A request for Bahrain can be made. The King Fahd Causeway links the Eastern Province with Bahrain, and the plan is confirmed with you." },
      { q: "Is Al Khobar close to Dammam airport?", a: "King Fahd International Airport serves the Dammam, Al Khobar and Dhahran area. Give your flight details and the transfer is planned around them." },
      { q: "Can I book a return from Al Khobar?", a: "Yes, ask for the return in the same request and give the day and time you want to travel back." },
    ],
  },
  "riyadh-to-dhahran": {
    title: "Riyadh to Dhahran Taxi: Private Ride, Aramco & KFUPM",
    tail: "Aramco, KFUPM and the Eastern Province.",
    intro:
      "Riyadh to Dhahran ends in the Eastern Province city that is home to Saudi Aramco's headquarters and King Fahd University of Petroleum and Minerals. Many riders on this route are employees, contractors and university visitors, and entry to company and campus areas is controlled by their operators.",
    why: [
      { title: "Gate-aware planning", text: "Tell us the gate or building and the contact who expects you, and the plan allows for the entry checks." },
      { title: "University and family visits", text: "Parents and visitors to KFUPM can be collected from Riyadh and dropped at the entrance they name." },
      { title: "A base for the Eastern Province", text: "Dhahran is close to Al Khobar and Dammam, so you can reach meetings in all three." },
    ],
    plan: "Access to Aramco and campus areas is controlled by their operators. Send the passenger names and the host's name if you have them.",
    related: ["riyadh-to-al-khobar", "riyadh-to-dammam", "riyadh-to-jubail"],
    faq: [
      { q: "Can the car enter Aramco or KFUPM?", a: "Entry is controlled by the operator. Tell us the gate and the host, and we confirm what is possible for your request." },
      { q: "Is Dhahran the same as Dammam?", a: "No. Dhahran, Dammam and Al Khobar are neighbouring cities, so tell us which one is your drop-off." },
      { q: "Can you collect me from Dhahran for the return?", a: "Yes. Ask for the return in the same request with the day and time you want." },
    ],
  },
  "riyadh-to-taif": {
    title: "Riyadh to Taif Taxi: Private Mountain Road Ride",
    tail: "Summer escapes and Umrah connections.",
    intro:
      "Riyadh to Taif runs west across the central plateau and climbs into the Sarawat mountains. Taif is higher and cooler than most Saudi cities, so the route is busiest in summer when families leave Riyadh for the mountains, and it is also the way to Taif's airport for Umrah travellers.",
    why: [
      { title: "Cool-weather escape", text: "A private car takes a family and its luggage straight to the mountain hotel or rental." },
      { title: "A way into the Makkah region", text: "From Taif you can continue to Makkah or Jeddah, and the legs can be requested together." },
      { title: "Plan for the climb", text: "The last stretch is mountain road, so we plan the time of day with you." },
    ],
    plan: "Tell us if you are connecting to Makkah or to Taif airport, so the timing can be planned.",
    related: ["riyadh-to-makkah", "riyadh-to-jeddah", "riyadh-to-al-baha"],
    faq: [
      { q: "When is the route busiest?", a: "Summer, school holidays and public holidays, when families travel to the cooler mountains. Booking early helps." },
      { q: "Can I continue from Taif to Makkah?", a: "Yes. Ask for the extra leg in the same request. Entry to Makkah is restricted to Muslims." },
      { q: "Can the ride end at Taif airport?", a: "Yes. Send your flight details and the transfer is planned around them." },
    ],
  },
  "riyadh-to-abha": {
    title: "Riyadh to Abha Taxi: Private Ride to Asir",
    tail: "Asir mountains and summer holidays.",
    intro:
      "Riyadh to Abha is a long road journey south-west to the capital of the Asir region, high in the mountains. Abha is a summer destination for its cooler weather and landscapes, so the route is busiest in the warm months and on public holidays, and it is the gateway to nearby Khamis Mushait.",
    why: [
      { title: "A family holiday, door to door", text: "A private car carries a family, its luggage and its plans straight to the mountain hotel." },
      { title: "Reach the mountain resorts", text: "Rides can continue from Abha to the resort areas you name." },
      { title: "Stops on a long road", text: "Rest stops and overnight breaks are planned with you for a journey this long." },
    ],
    plan: "Allow a full day of travel, and tell us if you are going on to Khamis Mushait or a mountain resort.",
    related: ["riyadh-to-jazan", "riyadh-to-najran", "riyadh-to-al-baha"],
    faq: [
      { q: "Can the ride go on to Khamis Mushait?", a: "Yes. Khamis Mushait is next to Abha and can be added to the request." },
      { q: "Is there an airport in Abha?", a: "Yes, Abha has an airport. Send your flight details and the pickup is planned around them." },
      { q: "What is the best time of year?", a: "Summer is popular because Abha is cooler than the plains. Peak holidays are busy, so ask early." },
    ],
  },
  "riyadh-to-jubail": {
    title: "Riyadh to Jubail Taxi: Private Industrial City Ride",
    tail: "Contractors, plants and company visits.",
    intro:
      "Riyadh to Jubail ends on the Gulf coast at the industrial city of Jubail, built around large petrochemical and heavy industry zones. Most trips are for work, so the drop-off is usually a company, a contractor camp or a hotel, and entry to industrial areas is controlled.",
    why: [
      { title: "Gate-aware drop-off", text: "Give the company or site gate and the contact, and the plan allows for the entry checks." },
      { title: "Shift and meeting times", text: "If your return depends on a shift or meeting, tell us and we plan the pickup around it." },
      { title: "One car for a team", text: "Engineers and visitors travelling together can share one vehicle, sized to the group and the bags." },
    ],
    plan: "Industrial areas control access, so send the passenger names and the gate in advance.",
    related: ["riyadh-to-dammam", "riyadh-to-al-khobar", "riyadh-to-hafar-al-batin"],
    faq: [
      { q: "Can the car go inside the industrial area?", a: "Access is controlled by each company. Tell us the gate and the host and we confirm what is possible." },
      { q: "Is Jubail on the way to Dammam?", a: "Jubail lies north of Dammam on the Gulf coast. Rides to both can be requested, and the order of stops is planned with you." },
      { q: "Can I book regular rides for staff?", a: "Regular arrangements can be discussed. Tell us the days, times and sites and we confirm what is possible." },
    ],
  },
  "riyadh-to-yanbu": {
    title: "Riyadh to Yanbu Taxi: Private Red Sea Coast Ride",
    tail: "Industrial area, port and the coast.",
    intro:
      "Riyadh to Yanbu is among the longest road journeys from the capital, ending on the Red Sea coast in a port and industrial city. Many trips are for work in the industrial area, while others are holiday visits to the shore, and the road passes through the Madinah region.",
    why: [
      { title: "Work trips with equipment", text: "A private car carries people and the bags or samples they need, to the site you name." },
      { title: "A stop in Madinah", text: "The route runs through the Madinah region, so a visit there can be added to the trip." },
      { title: "Overnight breaks planned", text: "Because it is more than a day's drive for many travellers, overnight stops can be arranged." },
    ],
    plan: "Say whether you are going to the industrial area, the port or the old town, and plan for more than a day on the road.",
    related: ["riyadh-to-madinah", "riyadh-to-jeddah", "riyadh-to-alula"],
    faq: [
      { q: "Can I be dropped at the industrial area?", a: "Yes. Tell us the company gate and the host. Access is controlled by the site, and we confirm what is possible." },
      { q: "Can I stop in Madinah on the way?", a: "Yes, a stop can be added. Entry to the central area of Madinah is restricted to Muslims." },
      { q: "Is there an airport at Yanbu?", a: "Yes, Yanbu has an airport. Send your flight details and the ride is planned around them." },
    ],
  },
  "riyadh-to-alula": {
    title: "Riyadh to AlUla Taxi: Private Ride to Hegra",
    tail: "Hegra, heritage tours and events.",
    intro:
      "Riyadh to AlUla heads north-west to the oasis valley that holds Hegra, Saudi Arabia's first UNESCO World Heritage Site. Most travellers are visitors to the heritage and desert sites, so the best months are the cooler ones, and tours and entry to the sites are booked through their operators.",
    why: [
      { title: "Straight to your resort", text: "A car with a driver takes you to the hotel or resort in AlUla you name." },
      { title: "Sized for a group", text: "Tour groups and families can share one vehicle sized to the passengers and bags." },
      { title: "Return planned for you", text: "The return to Riyadh can be requested with the outward ride." },
    ],
    plan: "Book your site tickets and tours separately; we arrange the ride only. Tell us the resort and the dates of your stay.",
    related: ["riyadh-to-tabuk", "riyadh-to-madinah", "riyadh-to-yanbu"],
    faq: [
      { q: "Do you book the Hegra tickets?", a: "No. Tickets and tours are booked through their operators. We arrange the ride between Riyadh and AlUla." },
      { q: "Can I travel on to Tabuk from AlUla?", a: "Yes. Tabuk lies further north, and the next leg can be requested with the rest." },
      { q: "When is the best time to visit?", a: "The cooler months are the most popular. Event periods are busy, so booking early helps." },
    ],
  },
  "riyadh-to-tabuk": {
    title: "Riyadh to Tabuk Taxi: Private Long-Distance Ride",
    tail: "Groups, equipment and the north-west.",
    intro:
      "Riyadh to Tabuk is the longest road route in this list, running north-west across the country to the far north-west of Saudi Arabia. Most travellers fly, so a road ride is mainly for groups, heavy luggage or people who need a vehicle at the other end.",
    why: [
      { title: "Equipment and luggage", text: "A car or van can carry bags and equipment that an airline would charge for or refuse." },
      { title: "A vehicle at both ends", text: "If you need a car in Tabuk, you can travel in it instead of arranging a second one." },
      { title: "Overnight stops planned", text: "At this distance the plan includes rest and overnight stops that you agree with us." },
    ],
    plan: "State the number of passengers and bags so the vehicle can be chosen properly, and plan for more than a day on the road.",
    related: ["riyadh-to-alula", "riyadh-to-hail", "riyadh-to-sakaka"],
    faq: [
      { q: "Is it realistic to travel by road from Riyadh to Tabuk?", a: "It is a very long drive. A road ride suits groups, heavy baggage and travellers who need a vehicle, and many others choose to fly." },
      { q: "Can we stop at AlUla on the way?", a: "AlUla lies on the north-western side of the country, so a stop can be requested and we confirm the plan with you." },
      { q: "Can I book a return from Tabuk?", a: "Yes. Ask for the return in the same request and give the day you want to travel back." },
    ],
  },
  "riyadh-to-jazan": {
    title: "Riyadh to Jazan Taxi: Private Ride to the South-West",
    tail: "Red Sea coast, ferries and family visits.",
    intro:
      "Riyadh to Jazan crosses the country to the far south-west, ending on the Red Sea coast near the Yemeni border. Jazan is a port city and the gateway to the Farasan Islands, and the road passes through the Asir mountains on the way down to the coast.",
    why: [
      { title: "A way to the Farasan ferry", text: "A car can take you to the port in time for your ferry, if you give us the time." },
      { title: "Through the Asir mountains", text: "Travellers can break the journey in Abha before the descent to the coast." },
      { title: "Family visits", text: "Families with relatives in Jazan can travel together with their luggage." },
    ],
    plan: "Allow more than a day for the road. Tell us if you are connecting to a ferry or a flight from Jazan.",
    related: ["riyadh-to-abha", "riyadh-to-najran", "riyadh-to-al-baha"],
    faq: [
      { q: "Can the ride connect to the Farasan Islands ferry?", a: "Tell us the ferry time and the port, and the plan is built around it. Ferry tickets are booked separately." },
      { q: "Can I stop in Abha on the way?", a: "Yes. Abha is on the way, and a stop can be added to the request." },
      { q: "Is there an airport at Jazan?", a: "Yes, Jazan has an airport. Send your flight details and the ride is planned around them." },
    ],
  },
  "riyadh-to-najran": {
    title: "Riyadh to Najran Taxi: Private Ride to the South",
    tail: "Historic sites and family travel.",
    intro:
      "Riyadh to Najran runs south through the desert to a historic oasis city on the Yemeni border. Najran is known for its old mud-brick buildings and rock-art sites, and a long road ride suits groups and families who want a vehicle for the whole stay.",
    why: [
      { title: "A vehicle for the stay", text: "If you want a car for the sites, the ride from Riyadh and the local trips can be planned together." },
      { title: "A direct southern route", text: "The road runs south without the mountain climb of the western routes." },
      { title: "Family travel", text: "Families can travel with their luggage in one vehicle." },
    ],
    plan: "Tell us if your drop-off is close to the border, since access in border areas can be controlled.",
    related: ["riyadh-to-abha", "riyadh-to-jazan", "riyadh-to-al-baha"],
    faq: [
      { q: "Can the car go to places near the border?", a: "Access in border areas can be controlled. Tell us the place and we confirm what is possible." },
      { q: "Can I visit the historic sites by car?", a: "Yes. Tell us what you want to see and the plan can include rides between the sites." },
      { q: "Is there an airport at Najran?", a: "Yes, Najran has an airport. Send your flight details and the ride is planned around them." },
    ],
  },
  "riyadh-to-al-baha": {
    title: "Riyadh to Al Baha Taxi: Private Mountain Ride",
    tail: "Mountain villages and summer holidays.",
    intro:
      "Riyadh to Al Baha heads west and then south-west up into the Sarawat mountains, to a small region known for its cooler climate, forests and villages. The route is busiest in summer and on holidays, when families come for the weather.",
    why: [
      { title: "Mountain roads, planned", text: "Mountain roads are slower, so we plan the timing of the ride with you." },
      { title: "Village and hotel drop-offs", text: "Give the village or hotel and the drop-off is confirmed in advance." },
      { title: "A link to Taif and Abha", text: "Al Baha lies between Taif and Abha, so an onward leg can be added." },
    ],
    plan: "Plan for a long day of travel with rest stops, and tell us your hotel or village in advance.",
    related: ["riyadh-to-taif", "riyadh-to-abha", "riyadh-to-jeddah"],
    faq: [
      { q: "Can I continue to Abha or Taif?", a: "Yes. Both lie on routes from Al Baha, and an onward leg can be requested." },
      { q: "When is the route busiest?", a: "In summer and on holidays, when families travel for the cooler weather. Booking early helps." },
      { q: "Is the road suitable for a family with luggage?", a: "Yes, and we confirm a vehicle that fits the group and the bags. Mountain roads are slower, so the timing is planned with you." },
    ],
  },
  "riyadh-to-sakaka": {
    title: "Riyadh to Sakaka Taxi: Private Ride to Al Jouf",
    tail: "Al Jouf, olive farms and family visits.",
    intro:
      "Riyadh to Sakaka runs north-west to the capital of the Al Jouf region, a farming area known for olives. The route is long, and most riders are families with relatives in the region, workers on contracts and visitors to the northern oases.",
    why: [
      { title: "Door-to-door in the north", text: "Families and workers are collected from home and taken to the address in Sakaka." },
      { title: "Farm and oasis visits", text: "Visitors can be taken to the farms and oases around Sakaka." },
      { title: "A route to Arar and Hail", text: "Sakaka lies between Hail and Arar, so an onward leg can be added." },
    ],
    plan: "Plan for a full day on the road with rest stops, and tell us the drop-off point in Sakaka or a nearby town.",
    related: ["riyadh-to-arar", "riyadh-to-hail", "riyadh-to-tabuk"],
    faq: [
      { q: "Is Al Jouf the same as Sakaka?", a: "Sakaka is the main city of the Al Jouf region. Tell us your exact town or address so the drop-off is right." },
      { q: "Can I continue to Arar?", a: "Yes. Arar is further north, and an onward leg can be requested with the rest." },
      { q: "Is there an airport at Sakaka?", a: "Yes, Al Jouf has an airport. Send your flight details and the ride is planned around them." },
    ],
  },
  "riyadh-to-arar": {
    title: "Riyadh to Arar Taxi: Private Ride to the North",
    tail: "The Northern Borders region.",
    intro:
      "Riyadh to Arar goes to the north, to the capital of the Northern Borders region near the Iraqi border. It is a very long road trip, used by families, workers on contract and travellers who prefer a vehicle to the limited flights.",
    why: [
      { title: "A vehicle for a long trip", text: "Families and workers carry their luggage in one vehicle for the whole journey." },
      { title: "Stops planned in advance", text: "Rest and overnight stops are agreed when you request the ride." },
      { title: "An onward link", text: "Arar lies beyond Sakaka, so the route can be planned with a stop there." },
    ],
    plan: "Plan for more than a day on the road. Tell us if your drop-off is close to the border, since access there can be controlled.",
    related: ["riyadh-to-sakaka", "riyadh-to-hail", "riyadh-to-hafar-al-batin"],
    faq: [
      { q: "Can the ride stop in Sakaka or Hail?", a: "Yes. Both lie on the way, and a stop can be added to the request." },
      { q: "Can the car go close to the border?", a: "Access in border areas can be controlled. Tell us the place and we confirm what is possible." },
      { q: "Is there an airport at Arar?", a: "Yes, Arar has an airport. Send your flight details and the ride is planned around them." },
    ],
  },
  "riyadh-to-hafar-al-batin": {
    title: "Riyadh to Hafar Al Batin Taxi: Private Intercity Ride",
    tail: "Workers, families and border travellers.",
    intro:
      "Riyadh to Hafar Al Batin runs north-east to a city close to the borders with Kuwait and Iraq. It is a route for families, workers and business travellers, and it is also used by people continuing on toward the border crossing.",
    why: [
      { title: "A direct northern-eastern route", text: "The road runs north-east from Riyadh without a mountain climb." },
      { title: "Continue to Kuwait", text: "Travellers heading to Kuwait can plan the Saudi leg and the border leg together." },
      { title: "Workers and families", text: "Groups travelling together can share one vehicle sized to the passengers and bags." },
    ],
    plan: "Tell us if you are continuing to a border crossing, since access and documents are the traveller's responsibility. Plan for a long drive with rest stops.",
    related: ["riyadh-to-arar", "riyadh-to-jubail", "intl:riyadh-to-kuwait-city"],
    faq: [
      { q: "Can I continue to Kuwait City?", a: "A request for Kuwait City can be made. Passports, visas and permits are the traveller's responsibility, and the plan is confirmed with you." },
      { q: "Is Hafar Al Batin near the border?", a: "Yes, it is close to the borders with Kuwait and Iraq. Tell us your drop-off so the plan allows for any access controls." },
      { q: "Is there an airport at Hafar Al Batin?", a: "Yes, it has an airport. Send your flight details and the ride is planned around them." },
    ],
  },
};
