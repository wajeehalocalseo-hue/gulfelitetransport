import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Khaleej Taxi Service: hand-written page for Al Khaleej (Al Khalij), a residential district in north-east Riyadh (built by factory.ts).
 * Primary focus keyword: "Al Khaleej Taxi Service" only.
 *
 * IMAGES: five photos from the owner's Google Drive (Al Khaleej folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-khaleej-taxi-service/ and placed in the about, airport, metro, shopping, north-east sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.7768/46.8035, used unchanged for weather and routing. OpenStreetMap spells the district "Al Khalij".
 * Figures (OSRM from that point, light traffic, Nov 2026): RUH 32.3 km / 26 min; Olaya 20.9 / 21; KAFD 23.6 / 25; Ad Dirah 24.5 / 24; Al Malaz 19.2 / 19.
 * Roads returned: Khalid Bin Ahmad Al Sudairy Street, Salman Al Farsi Street, As Sahabah Road, King Abdullah Road, Eastern Ring Road, Airport Road, King Salman Road; to Olaya Khurais Road (and branch), Makkah Al Mukarramah Road, King Fahd Road; to KAFD King Abdullah Road, Takhassusi Road, Thumamah Road.
 * Metro (independent riyadhmetro.org, read 19 Nov 2026; official sources unreachable; no coordinates shown): Al Khaleej is Line 2 (Red) station 13 between Al Hamra and Ishbiliyah; Line 2 start 15 Dec 2024; per-station type and opening not stated. Named after the district; no distance stated.
 * Nearby (straight-line centres): Ishbiliyah 2.2 km, Al Yarmuk 4.1, Al Hamra 5.1, Al Quds 5.6, Al Rawdah 6.0, Granada 6.2, Qurtubah 6.5, Al Naseem 6.8.
 * OpenStreetMap labels used with their own district names: Al Hamra Mall (Sheikh Hassan Bin Hussein Bin Ali Road, Al Khalij District), Othaim Mall (Khurais Road, Al Naseem District East).
 * NOT verified: hospitals, schools, exact boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALKHALEEJ_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Khaleej, Riyadh. The trip is [for example a home pickup, a transfer to or from Al Khaleej metro station, a shopping trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alKhaleejRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-khaleej",
      images: {
        about: { slot: "al-khaleej-neighbourhood-taxi-pickup", alt: "A red saloon with a man in a white head-cloth at the wheel on a street of walled houses as a man in a tunic and a woman in a pink abaya walk past", label: "Photo: al-khaleej-neighbourhood-taxi-pickup.webp", w: 1000, h: 558 },
        airport: { slot: "al-khaleej-ruh-airport-transfer", alt: "A brown SUV with its boot open at a glass-fronted airport terminal as a driver loads a case for a man and a woman with two suitcases", label: "Photo: al-khaleej-ruh-airport-transfer.webp", w: 1000, h: 558 },
        metro: { slot: "al-khaleej-metro-station-connection", alt: "A white SUV with its door open beside a station canopy as a woman in a dark abaya gets out, with a man and a woman with a wheeled suitcase next to it", label: "Photo: al-khaleej-metro-station-connection.webp", w: 1000, h: 558 },
        shopping: { slot: "al-khaleej-family-shopping-trip", alt: "A grey SUV outside a shopping frontage as a family with children and shopping bags and a man in a white shirt stand beside it", label: "Photo: al-khaleej-family-shopping-trip.webp", w: 1000, h: 558 },
        "north-east": { slot: "al-khaleej-north-east-riyadh-ride", alt: "A dark green saloon with a driver and a woman passenger in a blue headscarf on a road beside villas", label: "Photo: al-khaleej-north-east-riyadh-ride.webp", w: 1000, h: 558 },
      },
      name: "Al Khaleej",
      title: "Al Khaleej Taxi Service Riyadh | Metro, Home and Airport",
      description: "Al Khaleej Taxi Service for home pickups, metro transfers, family trips and airport rides from north-east Riyadh, about 32 km from RUH. Fare confirmed first.",
      h1: "Al Khaleej Taxi Service in Riyadh",
      lead: "Al Khaleej Taxi Service from Gulf Elite Transport: private rides from your door in north-east Riyadh, with airport transfers that are shorter than from most districts. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Khaleej, a residential district in north-east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, rides to and from the Riyadh Metro station of the same name, family and shopping trips, and airport transfers to King Khalid International Airport (RUH), about 32 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 32 km by road" },
        { label: "Olaya", value: "about 21 km by road" },
        { label: "KAFD", value: "about 24 km by road" },
        { label: "Area type", value: "residential, north-east Riyadh" },
      ],
      aboutH2: "Al Khaleej: a residential district in north-east Riyadh",
      about: [
        "Al Khaleej, spelled Al Khalij on many maps, is a residential district in the north-east of Riyadh. It lies east of Al Hamra, close to Ishbiliyah and Al Yarmuk, in the part of the city that grew along King Abdullah Road. Villas, apartment buildings, small shops and mosques fill most of its streets.",
        "Compared with the south and the west of Riyadh, this side of town has an easier run to King Khalid International Airport, and that shows in the requests we receive. Families ask for a car with room for suitcases, residents ask for a ride to the airport in time for an early flight, and others book a short trip to a shopping centre or to the metro.",
        "A Riyadh Metro station carries the name Al Khaleej, which is useful if you travel by train for part of the way and want a car for the rest. We explain what we could and could not confirm about the station further down the page.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Khaleej and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 32, min: 26 }, olaya: { km: 21, min: 21 }, kafd: { km: 24, min: 25 }, adDirah: { km: 25, min: 24 }, malaz: { km: 19, min: 19 } },
      blocks: [
        {
          id: "airport",
          h2: "Airport transfers from Al Khaleej to RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 32 km from the centre of Al Khaleej by road, roughly 26 minutes in light traffic according to routing data. The route leaves on Khalid Bin Ahmad Al Sudairy Street and Salman Al Farsi Street, then follows As Sahabah Road, King Abdullah Road, the Eastern Ring Road, Airport Road and King Salman Road. That is shorter than the airport run from the south and west of the city, though rush hours still add time.",
            "For a departure send your flight number, the date and time, your terminal if you know it, the passengers and the bags, and your street and gate or a map pin. For an arrival send your landing time and your destination in Al Khaleej. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "metro",
          h2: "Riyadh Metro and Al Khaleej",
          paragraphs: [
            "An independent Riyadh Metro information site lists Al Khaleej as station 13 on Line 2 (Red), between Al Hamra and Ishbiliyah. It says Line 2 began service on 15 December 2024, but it does not state whether this station is elevated or underground, when it opened, or where it stands on the map. We therefore do not give a walking or driving distance from any address in the district.",
            "We could not check this against the official operator, so please read the official Riyadh Metro information for current stations and services. A taxi can take you from your door to the station, or meet you there with luggage, which is handy for family groups, fixed pickup times and journeys the metro does not reach. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
        {
          id: "north-east",
          h2: "Rides across north-east Riyadh",
          paragraphs: [
            "Many rides from Al Khaleej stay in the north-east. Ishbiliyah is the nearest district, only about 2 km away in a straight line, and Al Yarmuk, Al Hamra, Al Quds and Al Rawdah follow within about 6 km. Neighbours often visit each other, so these are the short, repeat rides, such as the school run, a visit to family, or a lift to a clinic or an office nearby.",
            "King Abdullah Road is the main road for much of this part of the city. It is busy at peak hours, so for a pickup near it say which side of the road you are on, and give a street or a map pin rather than only the district name.",
          ],
        },
        {
          id: "shopping",
          h2: "Shopping and family trips",
          paragraphs: [
            "OpenStreetMap places Al Hamra Mall on Sheikh Hassan Bin Hussein Bin Ali Road in Al Khalij District, and Othaim Mall on Khurais Road in Al Naseem District East, a little further south-east. We do not publish opening hours, parking or entrance details for any shopping centre. Tell us the mall and the entrance you want and we agree a pickup that the car can reach.",
            "For a family shopping outing, give the number of adults and children and the bags you expect to bring back. We choose the vehicle from that and confirm it with you before you commit. Ask for the return pickup in the same request, with a time window, because mall entrances are crowded at weekends and in the evening.",
          ],
        },
        {
          id: "city",
          h2: "To Olaya, KAFD and the old centre",
          paragraphs: [
            "Olaya is about 21 km from Al Khaleej by road, roughly 21 minutes in light traffic, using Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. KAFD is about 24 km away, roughly 25 minutes, staying on King Abdullah Road before Takhassusi Road and Thumamah Road. Ad Dirah and Al Malaz, in the old and central parts of the city, are 19 to 25 km away.",
            "KAFD and many Olaya buildings have controlled entrances, so name the tower and the entrance. We agree a meeting point that the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
        {
          id: "prebook",
          h2: "Pre-booking a ride from Al Khaleej",
          paragraphs: [
            "Booking ahead lets you agree the pickup street, the vehicle and the fare before the day. For the airport it means the pickup time is worked back from your flight, and for the metro it means a car is waiting when your train gets in. A return pickup is easier to arrange in the same request than to find on the day.",
          ],
        },
      ],
      nearIds: ["ishbiliyah", "al-yarmuk", "al-hamra", "al-quds", "al-rawdah", "granada"],
      nearIntro: "These districts are close to Al Khaleej in north-east Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 21 km by road" }],
      whatsappTrips: "a home pickup, a transfer to or from the metro station, a shopping trip or the airport",
      faq: [
        { q: "How can I book a taxi in Al Khaleej, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "How far is Al Khaleej from King Khalid International Airport?", a: "About 32 km by road, roughly 26 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a Riyadh Metro station called Al Khaleej?", a: "An independent metro site lists Al Khaleej as station 13 on Line 2 (Red), between Al Hamra and Ishbiliyah. We could not check it against the official operator or confirm where it stands, so check the official Riyadh Metro information." },
        { q: "Can I book a taxi to or from the metro station?", a: "Yes. Tell us which station, the date and time, and whether you have luggage. We confirm the pickup point with you, and we do not promise access to restricted areas." },
        { q: "Which roads lead out of Al Khaleej?", a: "According to routing data, drives start on Khalid Bin Ahmad Al Sudairy Street and Salman Al Farsi Street and lead on to As Sahabah Road and King Abdullah Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Khaleej?", a: "Ishbiliyah, Al Yarmuk, Al Hamra, Al Quds and Al Rawdah are the closest districts. Each is separate and has its own page." },
        { q: "Can I arrange a ride to Olaya or KAFD?", a: "Yes. Olaya is about 21 km by road and KAFD about 24 km, each roughly 21 to 25 minutes in light traffic. Name the building and the entrance." },
        { q: "What should I include in a booking request?", a: "A map pin or the street and building number, your destination and its entrance, the date and time, the number of passengers and bags, and a phone number." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Khaleej start on Khalid Bin Ahmad Al Sudairy Street and Salman Al Farsi Street. For King Khalid International Airport, routing data follows As Sahabah Road, King Abdullah Road, the Eastern Ring Road, Airport Road and King Salman Road. For Olaya, it uses Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. For KAFD, it stays on King Abdullah Road, then Takhassusi Road and Thumamah Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic. Traffic can change the route at short notice.",
      localIntro: "Find Al Khaleej on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north-east Riyadh districts", "Metro stations and shopping", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Khaleej", "Ishbiliyah", "Al Yarmuk", "Al Hamra", "Al Quds", "Al Rawdah", "Granada", "Qurtubah", "Al Naseem", "Al Janadriyah", "Al Nadhim"],
        places: ["Al Khaleej Metro Station", "Ishbiliyah Metro Station", "Al Hamra Metro Station", "Al Hamra Mall", "Othaim Mall Khurais Road"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport"],
        cities: ["Jeddah", "Dammam", "Al Khobar"],
      },
      waMessage: ALKHALEEJ_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
