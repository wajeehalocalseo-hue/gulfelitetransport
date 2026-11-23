import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Banban Taxi Service: hand-written page for Banban, at the far-northern edge of Riyadh (built by factory.ts). Primary focus keyword: "Banban Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Banban folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/banban-taxi-service/ and placed in the about, pickup, airport, long-rides, nearby-rides sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 25.0017/46.5880, used unchanged. Very few places are mapped around it, so the page names none except roads and districts.
 * Figures (OSRM, light traffic, Nov 2026): RUH 51.9 km / 43 min (the straight line to the airport is only about 12 km; routing leaves along Banban Road and King Fahd Road and returns by King Salman Road, so the page says it is long and is confirmed per booking);
 * Olaya 44.5 / 41; KAFD 37.6 / 36; Ad Dirah 51.4 / 45; Al Malaz 52.4 / 45; Al Arid 26.9 / 30; Al Qirawan 22.4 / 27.
 * Roads returned: Wadi Wej Street, Abu Bakr As Siddiq Road, Banban Road, King Fahd Road, King Fahd Branch Road, King Salman Branch Road, King Salman Road, Prince Mohammed Bin Abdulaziz Road, Olaya Street, KAFD ring road.
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station in this area; none is claimed.
 * Nearby (straight-line centres): Al Arid 12.2 km, King Khalid International Airport 12.2, Al Qirawan 13.8, Al Narjis 18.5, Al Yasmin 20.5.
 * NOT verified / left out: the OpenStreetMap result "King Salman Park, Banban" (could not be confirmed), malls, hospitals, schools, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const BANBAN_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Banban, Riyadh. The trip is [for example a home or farm pickup, a family trip, a long city ride or an airport transfer], my pickup point is [map pin, nearest road and any gate], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function banbanRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "banban",
      images: {
        about: { slot: "banban-edge-of-city-taxi-pickup", alt: "Two men beside a dark grey SUV on an empty desert roadside, one checking his phone, with a bag on the ground and street lights stretching into the distance", label: "Photo: banban-edge-of-city-taxi-pickup.webp", w: 1000, h: 558 },
        pickup: { slot: "banban-family-taxi-pickup", alt: "A copper-brown SUV on a wide road outside a large villa as a man in a white thobe loads luggage while a family with a child walks up", label: "Photo: banban-family-taxi-pickup.webp", w: 1000, h: 558 },
        airport: { slot: "banban-ruh-airport-transfer", alt: "A white saloon with its boot open at King Khalid International Airport as a woman in a black abaya, a man in a grey jacket and a woman in a scarf with suitcases stand beside it", label: "Photo: banban-ruh-airport-transfer.webp", w: 1000, h: 558 },
        "long-rides": { slot: "banban-kafd-olaya-long-ride", alt: "A dark blue saloon with a driver and a passenger on a Riyadh highway under a sign for KAFD and Al Olaya, with the skyline behind", label: "Photo: banban-kafd-olaya-long-ride.webp", w: 1000, h: 558 },
        "nearby-rides": { slot: "banban-ride-to-nearby-northern-districts", alt: "A silver SUV with its boot open on a road at the desert edge as a man in a blue shirt loads luggage for a family, beneath a sign for Al Arid, Al Qirawan and Al Narjis", label: "Photo: banban-ride-to-nearby-northern-districts.webp", w: 1000, h: 558 },
      },
      name: "Banban",
      title: "Banban Taxi Service Riyadh | Pre-Booked Long Rides",
      description: "Banban Taxi Service for pre-booked pickups at the far-north edge of Riyadh: city rides, family trips and airport transfers. Fare confirmed before you commit.",
      h1: "Banban Taxi Service in Riyadh",
      lead: "Banban Taxi Service from Gulf Elite Transport: private rides from Banban at the far-northern edge of Riyadh, where distances are long and a pre-booked car saves the wait. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Banban, at the far-northern edge of Riyadh, Gulf Elite Transport takes bookings for private taxi pickups, family and group journeys, long rides into the city, and airport transfers to King Khalid International Airport (RUH). Routing data gives about 52 km by road to the airport, far more than the straight line, so we confirm the route with you. A booking does not give entry to private property. Send your map pin, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 52 km by road" },
        { label: "KAFD", value: "about 38 km by road" },
        { label: "Olaya", value: "about 45 km by road" },
        { label: "Area type", value: "far-northern edge of Riyadh" },
      ],
      aboutH2: "Banban: the far-northern edge of Riyadh",
      about: [
        "Banban lies at the far-northern edge of Riyadh, beyond Al Arid and Al Narjis. It is not a dense city district. Compared with central Riyadh, there are fewer buildings, fewer mapped places and longer gaps between them, and a ride from here is usually a long ride.",
        "That is why people in Banban book ahead. A taxi that has to find an address in a sparsely mapped area is slow to arrive, while one booked with a map pin, a time and a destination can leave the city in time. We ask for those three details on every request.",
        "On this page we name roads and nearby districts rather than shops or landmarks, because we could not confirm the names and positions of places around Banban. If you know a landmark by your gate, include it in the request.",
      ],
      journeysIntro: "Road distance and light-traffic driving time from the centre of Banban to the places people ask about most. These are long journeys, so pick a row to open the full ride page, which covers both directions.",
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Banban and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. The airport is only about 12 km away in a straight line, but routing leaves along Banban Road and King Fahd Road and returns by King Salman Road, so the road figure is much higher. Traffic, your exact pickup and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 52, min: 43 }, olaya: { km: 45, min: 41 }, kafd: { km: 38, min: 36 }, adDirah: { km: 51, min: 45 }, malaz: { km: 52, min: 45 } },
      blocks: [
        {
          id: "pickup",
          h2: "Pickups at the edge of the city",
          paragraphs: [
            "Send a map pin and the name of the nearest main road, and say whether the pickup is a house, a farm gate, a compound or a building entrance. If the last part of the route is not paved or not on the map, tell us so, and agree a meeting point on a road the car can reach. A taxi booking does not give permission to enter private land, and we do not promise access to private tracks or restricted entrances.",
            "Give a phone number that works at your gate. Mobile signal can be patchy at the edge of the city, so it helps to be ready a little before the agreed time. Tell us how many passengers there are and how many bags, because vehicle choice follows from that and is confirmed before you commit.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Banban and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is only about 12 km from Banban in a straight line, but the road distance is longer. Routing data gives about 52 km and roughly 43 minutes in light traffic: the route leaves on Wadi Wej Street and Abu Bakr As Siddiq Road, joins Banban Road and King Fahd Road, and reaches the airport by King Salman Branch Road and King Salman Road. Because the figure is far above the straight line, we confirm the route and the timing with you for each booking.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your map pin. For an arrival send your landing time and your address. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "long-rides",
          h2: "Long rides into the city",
          paragraphs: [
            "KAFD is about 38 km from Banban by road, roughly 36 minutes in light traffic, using King Fahd Road and the KAFD ring road. Olaya is about 45 km away, roughly 41 minutes, via King Fahd Branch Road, Prince Mohammed Bin Abdulaziz Road and Olaya Street. Ad Dirah and Al Malaz are each about 50 km away, a little under an hour at best.",
            "On rides this long, the hour of the day matters. Tell us when you must arrive, name the tower or building and the entrance, and allow extra time for peak traffic. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "nearby-rides",
          h2: "Rides to nearby northern districts",
          paragraphs: [
            "Al Arid is the nearest district with a page, about 12 km away in a straight line and about 27 km by the road that routing data follows, roughly half an hour. Al Qirawan is about 14 km away in a straight line and about 22 km by road. Al Narjis and Al Yasmin lie further south and east.",
            "The straight-line distance on this page is only a guide to which district is nearby. It is not a road distance and it does not tell you how long the drive takes, which depends on the road network around the pickup.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Banban",
          paragraphs: [
            "An independent Riyadh Metro information site shows no station in Banban or in the far north of the city, and we could not check this against the official operator. Please read the official Riyadh Metro and bus information for current services. We do not claim a metro link for this area.",
            "A private taxi suits long journeys, fixed pickup times and places that public transport does not reach. Gulf Elite Transport is not part of the metro or any bus operator and has no partnership with them.",
          ],
        },
      ],
      nearIds: ["al-arid", "al-qirawan", "al-narjis", "al-yasmin", "al-malqa"],
      nearIntro: "These districts are the closest to Banban that have their own pages, but none is part of it. The distances below are straight-line distances between district centres, not driving distances, and the road distance is often longer. Each ride page covers both directions.",
      nearExtra: [{ name: "King Khalid International Airport", id: "king-khalid-international-airport", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport", note: "About 12 km in a straight line, about 52 km by road" }],
      whatsappTrips: "a home or farm pickup, a family trip, a long city ride or the airport",
      faq: [
        { q: "How can I book a taxi in Banban, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Why is the airport so far by road when it looks close?", a: "The airport is about 12 km away in a straight line, but the roads from Banban run south before they reach it. Routing data gives about 52 km, so we confirm the route with you." },
        { q: "Should I book Banban rides in advance?", a: "Yes. Banban is at the edge of the city and distances are long, so a pre-booked ride with a map pin and a time is the most reliable way to arrange it." },
        { q: "What if my street is not on the map?", a: "Send a map pin and the nearest main road, and tell us where the car can reach. We agree a meeting point with you before the day." },
        { q: "Is there a metro station in Banban?", a: "An independent metro site shows none in the far north of the city. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Banban?", a: "According to routing data, drives start on Wadi Wej Street and Abu Bakr As Siddiq Road and lead on to Banban Road and King Fahd Road. The best route depends on your pickup, destination and traffic." },
        { q: "Can I arrange a ride to KAFD or Olaya?", a: "Yes. KAFD is about 38 km by road and Olaya about 45 km, roughly 36 to 41 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it for long rides. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Banban start on Wadi Wej Street and Abu Bakr As Siddiq Road, then join Banban Road and King Fahd Road. For King Khalid International Airport, routing data continues onto King Fahd Branch Road, King Salman Branch Road and King Salman Road. For KAFD, it leaves King Fahd Road for the KAFD ring road. For Olaya, it uses King Fahd Branch Road, Prince Mohammed Bin Abdulaziz Road and Olaya Street. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point, destination and current traffic. Please send a map pin.",
      localIntro: "Find Banban on the map, read how the main roads lead out of the area, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north Riyadh districts", "Universities and heritage places", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Banban", "Al Arid", "Al Qirawan", "Al Narjis", "Al Yasmin", "Al Malqa", "Al Sahafah", "Al Aqiq"],
        places: ["King Khalid International Airport Terminal 5", "Al Yamamah University", "Inaya Medical College", "At-Turaif District"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Hittin", "Al Murabba"],
        cities: ["Jeddah", "Dammam", "Buraidah", "Al Kharj", "Hail"],
      },
      waMessage: BANBAN_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
