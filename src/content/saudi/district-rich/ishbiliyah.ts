import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Ishbiliyah Taxi Service: hand-written page for Ishbiliyah (Al Ishbiliyah on OpenStreetMap), a residential district in north-east Riyadh with a Line 2 metro station of the same name (built by factory.ts). Primary focus keyword: "Ishbiliyah Taxi Service" only.
 * IMAGES: four reserved slots: area, journey, street and pickup (factory passes four to addImages). Suggested files in ishbiliyah-taxi-service/: ishbiliyah-private-taxi-service-riyadh.webp, ishbiliyah-metro-station-taxi-pickup.webp, ishbiliyah-airport-taxi-transfer.webp.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.7945/46.7942, used unchanged. OpenStreetMap labels Al Ishbiliyah District places at 24.7967/46.8040 and 24.7990/46.8144, consistent with that point.
 * Figures (OSRM, light traffic, Nov 2026): RUH 32.9 km / 26 min; Olaya 21.7 / 23; KAFD 24.2 / 25; Ad Dirah 28.1 / 26; Al Malaz 22.7 / 21; Al Yarmuk 4.6 / 6; Al Khaleej 5.3 / 9; Al Hamra 5.9 / 8.
 * Roads returned: Abdullah Bin Qais Street (first road), King Abdullah Road, Eastern Ring Road, Airport Road, King Salman Road (airport); King Abdullah Road, Olaya Street, King Fahd Branch Road (Olaya); King Abdullah Road, Takhassusi Road, Thumamah Road, KAFD ring road (KAFD).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026; no coordinates shown): Ishbiliyah is Line 2 (Red) station 14, between Al Khaleej and King Fahd Sport City, the eastern terminus. Line 2 began service on 15 Dec 2024; per-station type and opening not stated. Named after the district; no distance is stated.
 * Nearby (straight-line centres): Al Yarmuk 1.9 km, Al Khaleej 2.2, Al Hamra 4.7, Qurtubah 4.8, Granada 5.1, Al Quds 6.0, Al Janadriyah 6.5, Al Rawdah 7.3.
 * OpenStreetMap labels used with their own district names: Atyaf Mall (Imam Abdullah Ibn Saud Ibn Abdul Aziz Road), Al Hamra Mall (Al Khalij District).
 * NOT verified: hospitals, schools, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ISHBILIYAH_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Ishbiliyah, Riyadh. The trip is [for example a home pickup, a transfer to or from Ishbiliyah metro station, a family trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function ishbiliyahRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "ishbiliyah",
      name: "Ishbiliyah",
      title: "Ishbiliyah Taxi Service Riyadh | Home, Metro and Airport",
      description: "Ishbiliyah Taxi Service for home pickups, Line 2 metro transfers, family trips and airport rides from north-east Riyadh, about 33 km from RUH. Fare confirmed first.",
      h1: "Ishbiliyah Taxi Service in Riyadh",
      lead: "Ishbiliyah Taxi Service from Gulf Elite Transport: private rides from your door in north-east Riyadh, with transfers to the metro station of the same name and to the airport. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Ishbiliyah, a residential district in north-east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, rides to and from the Riyadh Metro station of the same name on Line 2, family and shopping trips, and airport transfers to King Khalid International Airport (RUH), about 33 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 33 km by road" },
        { label: "Olaya", value: "about 22 km by road" },
        { label: "KAFD", value: "about 24 km by road" },
        { label: "Area type", value: "residential, north-east Riyadh" },
      ],
      aboutH2: "Ishbiliyah: a residential district near the end of Line 2",
      about: [
        "Ishbiliyah, spelled Al Ishbiliyah on OpenStreetMap, is a residential district in north-east Riyadh, south-east of Al Yarmuk and north of Al Khaleej. The name is the Arabic form of Seville, and like Granada and Qurtubah nearby it belongs to the group of Andalusian-named districts in this part of the city. Villas and low apartment buildings fill most of its streets.",
        "It has a Riyadh Metro station of the same name. According to an independent metro site, Ishbiliyah is station 14 of 15 on Line 2 (Red), one stop before the eastern terminus at King Fahd Sport City. That makes it one of the last stations on the line, and a natural place to change from the train to a car for a door-to-door ride.",
        "Rides from Ishbiliyah are mostly local. Neighbours travel to Al Yarmuk and Al Khaleej, families go to shopping centres, and residents book the airport run, which is about 33 km away. We describe each below.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Ishbiliyah and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 33, min: 26 }, olaya: { km: 22, min: 23 }, kafd: { km: 24, min: 25 }, adDirah: { km: 28, min: 26 }, malaz: { km: 23, min: 21 } },
      blocks: [
        {
          id: "metro",
          h2: "The Ishbiliyah metro station and your ride",
          paragraphs: [
            "The independent Riyadh Metro information site we checked lists Ishbiliyah between Al Khaleej and King Fahd Sport City on Line 2 (Red). It says Line 2 began service on 15 December 2024, but it does not state whether this station is elevated or underground, when it opened, or where it stands on the map, so we give no distance from any address and we could not check the details against the official operator.",
            "Please read the official Riyadh Metro information for current services. A taxi can take you from your door to the station, or meet you there with luggage, which suits family groups, fixed pickup times and journeys the train does not reach. Tell us which side of the station you will wait on. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
        {
          id: "streets",
          h2: "Finding the right street in Ishbiliyah",
          paragraphs: [
            "Streets in Ishbiliyah look alike, and Al Yarmuk and Al Khaleej lie within a few kilometres on either side. Send a map pin, the villa or building number and the nearest main road, such as King Abdullah Road. A landmark such as a mosque or a school helps too. Abdullah Bin Qais Street is the first road that routing data uses when leaving the centre of the district.",
            "If you live in a compound, tell us the name and the gate. A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate that the car can reach, and give a phone number you will answer.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Ishbiliyah and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 33 km from the centre of Ishbiliyah by road, roughly 26 minutes in light traffic. Routing data follows Abdullah Bin Qais Street, King Abdullah Road, the Eastern Ring Road, Airport Road and King Salman Road. Peak hours and your terminal can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "shopping",
          h2: "Shopping and neighbourhood trips",
          paragraphs: [
            "OpenStreetMap places Atyaf Mall on Imam Abdullah Ibn Saud Ibn Abdul Aziz Road, a few kilometres to the west, and Al Hamra Mall in Al Khalij District, to the south-west. We do not publish opening hours, parking or entrance details for any shopping centre. Tell us the mall and the entrance you want, and we agree a pickup that the car can reach.",
            "Al Yarmuk is about 5 km away by road, roughly 6 minutes in light traffic, and Al Khaleej is about 5 km away, roughly 9 minutes. For a family outing, tell us how many adults and children are travelling and what you expect to carry, and ask for the return pickup in the same request.",
          ],
        },
        {
          id: "city",
          h2: "To Olaya, KAFD and the old centre",
          paragraphs: [
            "Olaya is about 22 km from Ishbiliyah by road, roughly 23 minutes in light traffic, along King Abdullah Road and Olaya Street. KAFD is about 24 km away, roughly 25 minutes, by King Abdullah Road, Takhassusi Road and Thumamah Road. Al Malaz is about 23 km away and Ad Dirah about 28 km.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
      ],
      nearIds: ["al-yarmuk", "al-khaleej", "al-hamra", "qurtubah", "granada", "al-quds"],
      nearIntro: "These districts are close to Ishbiliyah in north-east Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 22 km by road" }],
      whatsappTrips: "a home pickup, a transfer to or from the metro station, a family trip or the airport",
      faq: [
        { q: "How can I book a taxi in Ishbiliyah, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Is there a metro station called Ishbiliyah?", a: "An independent metro site lists Ishbiliyah as station 14 on Line 2 (Red), between Al Khaleej and King Fahd Sport City. We could not check it against the official operator or confirm where it stands, so check the official Riyadh Metro information." },
        { q: "Can I book a taxi to or from the metro station?", a: "Yes. Tell us which station, the date and time, and whether you have luggage. We confirm the pickup point with you and do not promise access to restricted areas." },
        { q: "How far is Ishbiliyah from King Khalid International Airport?", a: "About 33 km by road, roughly 26 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Which roads lead out of Ishbiliyah?", a: "According to routing data, drives start on Abdullah Bin Qais Street and lead on to King Abdullah Road, the Eastern Ring Road and Olaya Street. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Ishbiliyah?", a: "Al Yarmuk, Al Khaleej, Al Hamra, Qurtubah and Granada are the closest districts. Each is separate and has its own page." },
        { q: "Can I arrange a ride to KAFD or Olaya?", a: "Yes. Olaya is about 22 km by road and KAFD about 24 km, roughly 23 to 25 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Ishbiliyah start on Abdullah Bin Qais Street. For King Khalid International Airport, routing data joins King Abdullah Road, the Eastern Ring Road, Airport Road and King Salman Road. For Olaya, it stays on King Abdullah Road and then follows Olaya Street. For KAFD, it uses King Abdullah Road, Takhassusi Road, Thumamah Road and the KAFD ring road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic. Please confirm your pickup point with us. Please confirm the exact pickup point with us before you travel.",
      localIntro: "Find Ishbiliyah on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north-east Riyadh districts", "Metro stations and shopping", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Ishbiliyah", "Al Yarmuk", "Al Khaleej", "Al Hamra", "Qurtubah", "Granada", "Al Quds", "Al Janadriyah", "Al Rawdah", "Al Nadhim"],
        places: ["Ishbiliyah Metro Station", "Al Khaleej Metro Station", "King Fahd Sport City Metro Station", "Atyaf Mall", "Al Hamra Mall"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Riyadh Exhibition Center"],
        cities: ["Jeddah", "Dammam", "Al Khobar"],
      },
      waMessage: ISHBILIYAH_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
