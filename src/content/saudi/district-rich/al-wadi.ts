import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Wadi Taxi Service: hand-written page for Al Wadi, a residential district in north Riyadh (built by factory.ts). Primary focus keyword: "Al Wadi Taxi Service" only.
 * IMAGES: four reserved slots: area, journey, street and pickup (factory passes four to addImages). Suggested files in al-wadi-taxi-service/: al-wadi-private-taxi-service-riyadh.webp, al-wadi-to-kafd-business-taxi.webp, al-wadi-airport-taxi-transfer.webp.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.7894/46.6914, used unchanged. OpenStreetMap labels a primary health care clinic "AlWadi" at 24.7880/46.6973 and a school in "Al Wadi District" at 24.7835/46.6865, consistent with that point.
 * Figures (OSRM, light traffic, Nov 2026): RUH 24.0 km / 18 min; Olaya 16.9 / 17; KAFD 12.5 / 13; Ad Dirah 23.8 / 21; Al Malaz 17.5 / 17; Al Falah 3.0 / 5.
 * Roads returned: Wadi As Sarh Street (first road), Wadi Az Zarqa Street, Prince Mohammed Bin Salman Bin Abdulaziz Road, Airport Road, King Salman Road (airport); Northern Ring Road, King Fahd Road, King Fahd Branch Road, Prince Mohammed Bin Abdulaziz Road, Olaya Street, KAFD ring road;
 * Imam Turki Bin Abdullah Street (Ad Dirah).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station called Al Wadi; none is claimed.
 * Nearby (straight-line centres): Al Falah 1.9 km, Al Izdihar 2.8, Al Ghadir 4.0, Al Mughrizat 4.5, Granada 5.3, KAFD 5.5, Al Yasmin 6.1, Al Sahafah 6.3.
 * OpenStreetMap labels used with their own district names: Falah Park (Al Falah District), Al Nakheel Mall (Al Mugharzat/Al Nuzhah), Imam Muhammad Ibn Saud Islamic University (Al Nargis address). Tala Mall carries two different district labels, so it is not placed.
 * NOT verified: hospitals, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALWADI_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Wadi, Riyadh. The trip is [for example a home pickup, a commute to KAFD, a school run, a shopping trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alWadiRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-wadi",
      name: "Al Wadi",
      title: "Al Wadi Taxi Service Riyadh | Home, KAFD and Airport Rides",
      description: "Al Wadi Taxi Service for home pickups, commutes to KAFD, school and shopping trips and airport rides from north Riyadh, about 24 km from RUH. Fare confirmed first.",
      h1: "Al Wadi Taxi Service in Riyadh",
      lead: "Al Wadi Taxi Service from Gulf Elite Transport: private rides from your home in north Riyadh, close to the financial district, with airport transfers and city journeys agreed in advance. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Wadi, a residential district in north Riyadh between Al Falah and Al Sahafah, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, commutes to KAFD and Olaya, school and shopping trips, family journeys, and airport transfers to King Khalid International Airport (RUH), about 24 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 24 km by road" },
        { label: "KAFD", value: "about 13 km by road" },
        { label: "Olaya", value: "about 17 km by road" },
        { label: "Area type", value: "residential, north Riyadh" },
      ],
      aboutH2: "Al Wadi: a residential district on the northern ring",
      about: [
        "Al Wadi is a residential district in the north of Riyadh, just west of Al Falah and south-east of Al Sahafah. It is made up of villas and apartment buildings along quiet streets, with neighbourhood shops, schools and a health clinic that OpenStreetMap labels with the district's name.",
        "The district's main advantage is where it sits. The Northern Ring Road is close, which gives a direct run to the financial district, KAFD, about 13 km away by road. Olaya is about 17 km away and the airport about 24 km, so most journeys that people ask about from Al Wadi are of a reasonable length.",
        "Do not confuse it with Al Ghadir, which lies to the south-west and is nearer to KAFD in a straight line, or with Al Falah, its neighbour to the east. Each of them has its own page, and we ask for a map pin so that the driver heads for the right one.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Wadi and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 24, min: 18 }, olaya: { km: 17, min: 17 }, kafd: { km: 13, min: 13 }, adDirah: { km: 24, min: 21 }, malaz: { km: 18, min: 17 } },
      blocks: [
        {
          id: "kafd-commute",
          h2: "Commuting from Al Wadi to KAFD and Olaya",
          paragraphs: [
            "KAFD is about 13 km from the centre of Al Wadi by road, roughly 13 minutes in light traffic, using Wadi As Sarh Street, Wadi Az Zarqa Street, the Northern Ring Road and the KAFD ring road. Olaya is about 17 km away, roughly 17 minutes, by the Northern Ring Road, King Fahd Road and Olaya Street. At rush hour these roads are much slower, so tell us when you must arrive.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. For a regular commute, tell us the days and times and we say what can be arranged. Each request is confirmed individually, and Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Wadi and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 24 km from the centre of Al Wadi by road, roughly 18 minutes in light traffic. Routing data follows Wadi Az Zarqa Street, Prince Mohammed Bin Salman Bin Abdulaziz Road, Airport Road and King Salman Road. Morning and evening traffic on the northern roads, and the terminal you are using, can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "school-clinic",
          h2: "School runs and clinic visits",
          paragraphs: [
            "OpenStreetMap labels a school in Al Wadi District and a primary health care clinic named for Al Wadi, and larger schools and the Imam Muhammad Ibn Saud Islamic University lie a short way to the north-east and north. We could not confirm the gates, hours or rules of any of them. For a school run, give the school and the exact gate, and allow extra time at the start and end of the day.",
            "For a clinic or hospital visit, give the name of the place, the branch and the entrance you need. A ride does not include any appointment and is not an emergency or medical transport service. Ask for a return pickup in the same request, with a time window, and tell us if your plans change.",
          ],
        },
        {
          id: "shopping",
          h2: "Shopping and weekend trips",
          paragraphs: [
            "Al Nakheel Mall is on Othman Bin Affan Road, towards Al Mugharzat, a short drive south-east of Al Wadi according to OpenStreetMap, and Falah Park is listed in the neighbouring district of Al Falah. We do not publish opening hours, parking or entrance details for any mall or park.",
            "For a family outing, tell us how many adults and children are travelling and what you expect to carry back. We choose the vehicle from that and confirm it with you before you commit. Mall entrances are crowded at weekends and in the evening, so agree a pickup point and a return time in advance.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Al Wadi",
          paragraphs: [
            "An independent Riyadh Metro information site lists no station called Al Wadi, and we could not check this against the official operator. We do not state the distance to any station, because the site shows no map coordinates. Please read the official Riyadh Metro information for current stations and services.",
            "A taxi can take you from your door to a station, or meet you there with luggage. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
      ],
      nearIds: ["al-falah", "al-izdihar", "al-ghadir", "al-mughrizat", "granada", "al-sahafah"],
      nearIntro: "These districts are close to Al Wadi in north Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "KAFD", id: "king-abdullah-financial-district", note: "The financial district, about 13 km by road" }],
      whatsappTrips: "a home pickup, a commute to KAFD, a school run, a shopping trip or the airport",
      faq: [
        { q: "How can I book a taxi in Al Wadi, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "How far is Al Wadi from King Khalid International Airport?", a: "About 24 km by road, roughly 18 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is Al Wadi the same as Al Ghadir?", a: "No. They are separate districts. Al Ghadir lies to the south-west, close to KAFD, and Al Wadi lies between Al Falah and Al Sahafah. Send a map pin if you are unsure." },
        { q: "Can you arrange a regular commute to KAFD?", a: "Tell us the days, times and destination tower, and we say what can be arranged. Each request is confirmed individually, and we do not promise access to private car parks." },
        { q: "Is there a metro station in Al Wadi?", a: "An independent metro site lists no station called Al Wadi. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Wadi?", a: "According to routing data, drives start on Wadi As Sarh Street and lead on to Wadi Az Zarqa Street, the Northern Ring Road and Prince Mohammed Bin Salman Bin Abdulaziz Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Wadi?", a: "Al Falah, Al Izdihar, Al Ghadir, Al Mughrizat and Granada are the closest districts. Each is separate and has its own page." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Wadi start on Wadi As Sarh Street. For King Khalid International Airport, routing data uses Wadi Az Zarqa Street, Prince Mohammed Bin Salman Bin Abdulaziz Road, Airport Road and King Salman Road. For KAFD and Olaya, it joins the Northern Ring Road, then King Fahd Branch Road or King Fahd Road. For Ad Dirah, it follows the Northern Ring Road and King Fahd Road to Imam Turki Bin Abdullah Street. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point, destination and current traffic. Send a pin.",
      localIntro: "Find Al Wadi on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north Riyadh districts", "Malls, parks and universities", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Wadi", "Al Falah", "Al Izdihar", "Al Ghadir", "Al Mughrizat", "Granada", "Al Yasmin", "Al Sahafah", "Al Aqiq", "Qurtubah", "Al Nargis"],
        places: ["Al Nakheel Mall", "Falah Park", "Imam Muhammad Ibn Saud Islamic University", "Granada Mall"],
        others: ["King Abdullah Financial District", "Olaya", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport"],
        cities: ["Jeddah", "Dammam", "Buraidah", "Al Kharj"],
      },
      waMessage: ALWADI_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
