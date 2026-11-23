import type { CityArea } from "../riyadh-areas";
import { fmtKm } from "../riyadh-districts";
import { bearing, haversine } from "../pairs";
import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Mansourah Taxi Service: hand-written page for Al Mansourah (Al Mansoura), a residential district at the southern edge of Riyadh (built by factory.ts). Primary focus keyword: "Al Mansourah Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Al Mansourah folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-mansourah-taxi-service/ and placed in the about, airport, pickup, old-centre, metro sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.5192/46.7996, used unchanged. Very few places are mapped around it (a search for "Al Mansoura District" found nothing), so the page names roads and districts only.
 * Figures (OSRM, light traffic, Nov 2026): RUH 61.9 km / 52 min; Olaya 25.8 / 33; KAFD 38.0 / 45; Ad Dirah 19.1 / 28; Al Malaz 25.2 / 28; Ad Dar Al Baida 11.7 / 19; Al Aziziyah 14.2 / 23; Al Shifa 17.6 / 27.
 * Roads returned: Ibn Hawqal Street (first road), Al Aziziyah Street, Al Kharj Road, South Ring Road, Eastern Ring Road, Airport Road, King Salman Road (airport); Al Hair Road, Al Batha Street, Al Madinah Al Munawwarah Road, King Faisal Bin Abdulaziz Road, Imam Turki Bin Abdullah Street (Ad Dirah), King Fahd Road and King Fahd Branch Road (Olaya).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station called Al Mansourah. Line 1 (Blue) ends at Ad Dar Al Baida in the south, with Al Aziziah, Public Transport Center and Manfouhah before it. Straight-line gap to Ad Dar Al Baida station uses the coordinates 24.5596/46.7765 noted in an earlier check of that site (also used on the Al Dar Al Baida page); it is not a walking or driving distance.
 * Nearby (straight-line centres): Ad Dar Al Baida 5.2 km, Al Aziziyah 8.2, Al Shifa 11.5, Al Suwaidi 15.1, Ad Dirah 15.2, Al Badiah 16.0, Al Murabba 17.1, Al Malaz 17.7.
 * NOT verified / left out: malls, hospitals, schools, parks, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

const STATION = { name: "Ad Dar Al Baida", lat: 24.5596, lng: 46.7765 };
const COMPASS = ["north", "north-east", "east", "south-east", "south", "south-west", "west", "north-west"];
const compass = (deg: number) => COMPASS[Math.round(deg / 45) % 8];

export const ALMANSOURAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Mansourah, Riyadh. The trip is [for example a home pickup, a family trip, a ride to Ad Dirah or Olaya, a transfer to or from a Line 1 metro station or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alMansourahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  const me = ctx.all.find((x) => x.id === "al-mansourah");
  if (!me) throw new Error("Al Mansourah is missing from riyadh-areas.ts");
  const stKm = fmtKm(haversine(me, STATION as unknown as CityArea));
  const stDir = compass(bearing(me, STATION as unknown as CityArea));
  return buildDistrictRich(
    {
      id: "al-mansourah",
      images: {
        about: { slot: "al-mansourah-family-group-taxi", alt: "A white minivan with its boot open on a street of walled villas as a man in a white thobe and a woman in a black abaya load suitcases while a woman and two children wait", label: "Photo: al-mansourah-family-group-taxi.webp", w: 1000, h: 558 },
        airport: { slot: "al-mansourah-ruh-airport-transfer", alt: "A grey SUV with a driver and two passengers on an elevated road beneath a blue sign for King Khalid International Airport, with the city skyline behind", label: "Photo: al-mansourah-ruh-airport-transfer.webp", w: 1000, h: 558 },
        pickup: { slot: "al-mansourah-residential-taxi-pickup", alt: "A red saloon with its boot open on a paved street of villas as a man in a white thobe loads a suitcase for a man in a long tunic and a woman in a green abaya", label: "Photo: al-mansourah-residential-taxi-pickup.webp", w: 1000, h: 558 },
        "old-centre": { slot: "al-mansourah-olaya-kafd-taxi-journey", alt: "A silver saloon with a driver and passengers on a highway beneath a green sign for Al Olaya and KAFD, with the skyline behind", label: "Photo: al-mansourah-olaya-kafd-taxi-journey.webp", w: 1000, h: 558 },
        metro: { slot: "al-mansourah-metro-station-transfer", alt: "A teal SUV stopped beside a metro station and a sign for Al Mansourah Metro Station as a man in a long tunic and a woman in a blue abaya check a phone", label: "Photo: al-mansourah-metro-station-transfer.webp", w: 1000, h: 558 },
      },
      name: "Al Mansourah",
      title: "Al Mansourah Taxi Service Riyadh | South Riyadh Rides",
      description: "Al Mansourah Taxi Service for pre-booked home pickups, family trips, rides to Ad Dirah and Olaya and airport transfers from south Riyadh. Fare confirmed first.",
      h1: "Al Mansourah Taxi Service in Riyadh",
      lead: "Al Mansourah Taxi Service from Gulf Elite Transport: private rides from your door at the southern edge of Riyadh, planned in advance because the airport and the northern business districts are a long way off. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Mansourah, a residential district at the southern edge of Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, rides to Ad Dirah and Olaya, trips to and from Line 1 metro stations in the south, and airport transfers to King Khalid International Airport (RUH), about 62 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 62 km by road" },
        { label: "Ad Dirah", value: "about 19 km by road" },
        { label: "Olaya", value: "about 26 km by road" },
        { label: "Area type", value: "residential, southern edge of Riyadh" },
      ],
      aboutH2: "Al Mansourah: a residential district at the southern edge",
      about: [
        "Al Mansourah is a residential district in the south of Riyadh, south of Al Aziziyah and Ad Dar Al Baida. It is one of the districts nearest the southern edge of the built-up city, so the roads out of it lead north through other districts before they reach the centre. Few places are mapped around its centre, and some maps spell it Al Mansoura.",
        "Rides from Al Mansourah are mostly long. Ad Dirah, the old centre, is about 19 km away by road, Olaya about 26 km, KAFD about 38 km, and the airport, in the far north, about 62 km, the longest transfer on our Riyadh district pages. For these journeys, the booking details matter more than they do in a central district.",
        "We ask for a map pin, a clear time and a return plan, and we confirm the vehicle and fare before the day. On this page we name roads and districts rather than shops, because we could not confirm the names and positions of places inside Al Mansourah.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Mansourah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 62, min: 52 }, olaya: { km: 26, min: 33 }, kafd: { km: 38, min: 45 }, adDirah: { km: 19, min: 28 }, malaz: { km: 25, min: 28 } },
      blocks: [
        {
          id: "airport",
          h2: "The long airport run from Al Mansourah to RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 62 km from the centre of Al Mansourah by road, roughly 52 minutes in light traffic according to routing data. The route leaves on Ibn Hawqal Street and Al Aziziyah Street, then follows Al Kharj Road, the South Ring Road, the Eastern Ring Road, Airport Road and King Salman Road, so it crosses the whole city. Busy hours, your terminal and your starting street can add a good deal of time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your map pin. Because the drive is long, allow generous time for an early flight and say so in the request. For an arrival send your landing time and your address. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "pickup",
          h2: "Pickups at the southern edge",
          paragraphs: [
            "Send a map pin, the villa or building number and the nearest main road. Because few places are mapped around Al Mansourah, a landmark such as a mosque or a school, if there is one near you, is a good addition. If the last stretch of road is unpaved or still under construction, tell us, and agree a meeting point on a road the car can reach.",
            "A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate. Give a phone number that works at your gate, the number of passengers and the number of bags.",
          ],
        },
        {
          id: "old-centre",
          h2: "Rides north to Ad Dirah, Al Malaz and Olaya",
          paragraphs: [
            `Ad Dirah is about 19 km from Al Mansourah by road, roughly 28 minutes in light traffic, by Al Hair Road, Al Batha Street, Al Madinah Al Munawwarah Road and Imam Turki Bin Abdullah Street. Al Malaz is about 25 km away, roughly 28 minutes. Olaya is about 26 km away, roughly 33 minutes, through Al Hair Road, King Faisal Bin Abdulaziz Road and King Fahd Road. KAFD is about 38 km away, roughly 45 minutes.`,
            "Ad Dirah has narrow streets and busy markets, so tell us the name of the place you are going to and where the driver should wait. KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to restricted streets, towers or private car parks.",
          ],
        },
        {
          id: "metro",
          h2: "Riyadh Metro in the south",
          paragraphs: [
            `An independent Riyadh Metro information site lists no station called Al Mansourah. Line 1 (Blue) ends in the south at Ad Dar Al Baida, after Al Aziziah, the Public Transport Center and Manfouhah. An earlier check of that site listed coordinates for Ad Dar Al Baida that put it about ${stKm} km to the ${stDir} of the centre of Al Mansourah, in a straight line. That is not a walking or driving distance, and the station belongs to a neighbouring district.`,
            "We could not check this against the official operator, so please read the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or meet you there with luggage. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
        {
          id: "south-neighbours",
          h2: "Rides to nearby southern districts",
          paragraphs: [
            "Ad Dar Al Baida is the nearest district, about 12 km by road, roughly 19 minutes in light traffic. Al Aziziyah is about 14 km by road, roughly 23 minutes, and Al Shifa about 18 km, roughly 27 minutes. These are the visits to relatives, school runs and errands that fill a week, and they are longer than the straight-line distances suggest.",
            "For a school, clinic or hospital visit, give the name of the place, the branch and the gate, and tell us which district it is in. A ride is not an emergency or medical transport service, and we do not publish opening hours or entrance details for any place.",
          ],
        },
      ],
      nearIds: ["al-dar-al-baida", "al-aziziyah", "al-shifa", "al-suwaidi", "al-badiah", "al-murabba"],
      nearIntro: "These districts are the closest to Al Mansourah that have their own pages, but none is part of it. The distances below are straight-line distances between district centres, not driving distances, and the road distance is often longer. Each ride page covers both directions.",
      nearExtra: [
        { name: "Ad Dirah", id: "ad-dirah", note: "The old centre of Riyadh, about 19 km by road" },
        { name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 26 km by road" },
      ],
      whatsappTrips: "a home pickup, a family trip, a ride to Ad Dirah or Olaya, a metro transfer or the airport",
      faq: [
        { q: "How can I book a taxi in Al Mansourah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "How far is Al Mansourah from King Khalid International Airport?", a: "About 62 km by road, roughly 52 minutes in light traffic, which makes it one of the longest airport transfers from a Riyadh district. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Should I book Al Mansourah rides in advance?", a: "Yes. Distances are long, so a pre-booked ride with a map pin, a time and a return plan is the most reliable way to arrange it." },
        { q: "Is there a metro station in Al Mansourah?", a: "An independent metro site lists none here. Line 1 ends at Ad Dar Al Baida in a neighbouring district. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Mansourah?", a: "According to routing data, drives start on Ibn Hawqal Street and lead on to Al Hair Road, Al Aziziyah Street and Al Kharj Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Mansourah?", a: "Ad Dar Al Baida, Al Aziziyah and Al Shifa are the closest districts with pages. Each is separate." },
        { q: "Can I arrange a ride to Ad Dirah or Olaya?", a: "Yes. Ad Dirah is about 19 km by road and Olaya about 26 km, roughly 28 to 33 minutes in light traffic. Name the place and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it for long rides. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Mansourah start on Ibn Hawqal Street. For Ad Dirah and Olaya, routing data uses Al Hair Road, then Al Batha Street and Al Madinah Al Munawwarah Road, with King Faisal Bin Abdulaziz Road and King Fahd Road for Olaya. For King Khalid International Airport, it follows Al Aziziyah Street, Al Kharj Road, the South Ring Road, the Eastern Ring Road, Airport Road and King Salman Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic. Traffic can change the route at short notice.",
      localIntro: "Find Al Mansourah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby south and central Riyadh districts", "Line 1 metro stations in the south", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Mansourah", "Ad Dar Al Baida", "Al Aziziyah", "Al Shifa", "Al Suwaidi", "Al Badiah", "Al Murabba", "Al Malaz", "Ad Dirah", "Manfuhah"],
        places: ["Ad Dar Al Baida Metro Station", "Al Aziziah Metro Station", "Public Transport Center Metro Station", "Manfouhah Metro Station", "Al Batha"],
        others: ["Olaya", "King Abdullah Financial District", "Diriyah", "King Khalid International Airport", "Qasr Al Hokm", "National Museum of Saudi Arabia", "Wadi Hanifah"],
        cities: ["Al Kharj", "Jeddah", "Dammam"],
      },
      waMessage: ALMANSOURAH_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
