import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Yarmuk Taxi Service: hand-written page for Al Yarmuk (Al Yarmouk on OpenStreetMap), a residential district in north-east Riyadh with a Line 6 metro station of the same name (built by factory.ts). Primary focus keyword: "Al Yarmuk Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Al Yarmuk folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-yarmuk-taxi-service/ and placed in the about, metro, shopping, airport, city sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.8085/46.7835, used unchanged. OpenStreetMap labels Al Yarmouk District places (Al Yarmouk Plaza 24.8118/46.7707, a dispensary 24.8103/46.7908), consistent with that point.
 * Figures (OSRM, light traffic, Nov 2026): RUH 28.0 km / 21 min; Olaya 26.4 / 23; KAFD 21.4 / 21; Ad Dirah 30.0 / 27; Al Malaz 24.6 / 21; Ishbiliyah 4.7 / 9; Qurtubah 9.1 / 11; Al Khaleej 11.1 / 12.
 * Roads returned: Mansour Aba Al Khail Street (first road), Muhammad Ali Jinnah Street, As Sahabah Road, Abu Jafar Al Mansour Street, Khalid Bin Al Waleed Street, Dammam Road, Airport Road, King Salman Road (airport);
 * Dammam Road, Northern Ring Road, King Fahd Branch Road, KAFD ring road (KAFD); Eastern Ring Road, Makkah Al Mukarramah Road, King Fahd Road (Olaya).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026; no coordinates shown): Al Yarmuk is Line 6 (Purple) station 6, between Granadia and Al Hamra. Line 6 began service on 1 Dec 2024 and is described as mostly elevated, but the station's own type is not stated. Named after the district; no distance is stated.
 * Nearby (straight-line centres): Ishbiliyah 1.9 km, Qurtubah 3.4, Al Khaleej 4.1, Granada 4.5, Al Hamra 4.8, Al Quds 6.7.
 * OpenStreetMap labels used with their own district names: Atyaf Mall (Imam Abdullah Ibn Saud Ibn Abdul Aziz Road), Al Yarmouk Plaza (Al Yarmouk District), Al Muwanisiyah (neighbouring district to the north).
 * NOT verified: hospitals, schools, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALYARMUK_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Yarmuk, Riyadh. The trip is [for example a home pickup, a transfer to or from Al Yarmuk metro station, a shopping trip or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alYarmukRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-yarmuk",
      images: {
        about: { slot: "al-yarmuk-residential-district-taxi-pickup", alt: "A dark blue SUV with a door open beside a walled house as two men in white thobes talk to a woman in a lilac abaya and a boy with a small suitcase", label: "Photo: al-yarmuk-residential-district-taxi-pickup.webp", w: 1000, h: 558 },
        metro: { slot: "al-yarmuk-metro-station-transfer", alt: "A bronze SUV with a woman at the wheel stopped beside the Al Yarmuk metro station entrance as a man with a wheeled suitcase speaks to her", label: "Photo: al-yarmuk-metro-station-transfer.webp", w: 1000, h: 558 },
        shopping: { slot: "al-yarmuk-shopping-family-trip", alt: "A white SUV with a door open on a pavement near office and retail buildings as a woman in a black abaya greets a family with shopping bags", label: "Photo: al-yarmuk-shopping-family-trip.webp", w: 1000, h: 558 },
        airport: { slot: "al-yarmuk-ruh-airport-transfer", alt: "A grey SUV with its boot open beneath the arches of King Khalid International Airport as a man loads a case while a man and a woman with luggage talk", label: "Photo: al-yarmuk-ruh-airport-transfer.webp", w: 1000, h: 558 },
        city: { slot: "al-yarmuk-neighbourhood-city-rides", alt: "A red saloon with a driver and passengers on a highway under a sign for Al Yarmuk, Ishbiliyah, Qurtubah and Granada", label: "Photo: al-yarmuk-neighbourhood-city-rides.webp", w: 1000, h: 558 },
      },
      name: "Al Yarmuk",
      title: "Al Yarmuk Taxi Service Riyadh | Metro, Home and Airport",
      description: "Al Yarmuk Taxi Service for home pickups, metro transfers, shopping and family trips and airport rides from north-east Riyadh, about 28 km from RUH. Fare confirmed first.",
      h1: "Al Yarmuk Taxi Service in Riyadh",
      lead: "Al Yarmuk Taxi Service from Gulf Elite Transport: private rides from your home in north-east Riyadh, with transfers to the Line 6 metro station of the same name and to the airport. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Yarmuk, a residential district in north-east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, rides to and from the Riyadh Metro station of the same name on Line 6, shopping and family trips, and airport transfers to King Khalid International Airport (RUH), about 28 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 28 km by road" },
        { label: "KAFD", value: "about 21 km by road" },
        { label: "Olaya", value: "about 26 km by road" },
        { label: "Area type", value: "residential, north-east Riyadh" },
      ],
      aboutH2: "Al Yarmuk: a residential district with its own metro stop",
      about: [
        "Al Yarmuk, spelled Al Yarmouk on OpenStreetMap, is a residential district in north-east Riyadh, east of Granada and Qurtubah and just north-west of Ishbiliyah. Its streets are lined with villas and apartment blocks, and the shopping and services that serve them cluster along the roads that cross the district.",
        "What sets it apart from some of its neighbours is the metro. A Riyadh Metro station carries the name Al Yarmuk, which makes the district a natural starting point for journeys that combine a train with a car. We explain below what an independent metro site says about the station and what we could not confirm.",
        "Most rides we are asked for from Al Yarmuk are short or medium: a lift to Ishbiliyah, Al Hamra or Qurtubah, a trip to a shopping centre, or a run to the airport, which is about 28 km away.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Yarmuk and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 28, min: 21 }, olaya: { km: 26, min: 23 }, kafd: { km: 21, min: 21 }, adDirah: { km: 30, min: 27 }, malaz: { km: 25, min: 21 } },
      blocks: [
        {
          id: "metro",
          h2: "The Al Yarmuk metro station and your ride",
          paragraphs: [
            "An independent Riyadh Metro information site lists Al Yarmuk as station 6 on Line 6 (Purple), between Granadia and Al Hamra. It says the line began service on 1 December 2024 and describes it as mostly elevated, but it does not say whether this station is elevated, and it shows no map coordinates. We therefore give no walking or driving distance from a given address, and we could not check any detail against the official operator.",
            "Please read the official Riyadh Metro information for current services. A taxi can take you from your door to the station, or meet you there with luggage, which is useful for families, fixed pickup times and journeys the train does not reach. Tell us which side of the station you will wait on. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
        {
          id: "shopping",
          h2: "Shopping and family trips in Al Yarmuk",
          paragraphs: [
            "OpenStreetMap places Atyaf Mall on Imam Abdullah Ibn Saud Ibn Abdul Aziz Road, a short way south-west of the centre of the district, and Al Yarmouk Plaza on the district's western side. Al Muwanisiyah, a neighbouring district to the north, has further plazas. We do not publish opening hours, parking or entrance details for any of them.",
            "For a family outing, tell us how many adults and children are travelling and what you expect to carry home. We choose the vehicle from that and confirm it with you before you commit. Ask for the return pickup in the same request, with a time window, because mall entrances are crowded in the evening and at weekends.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Yarmuk and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 28 km from the centre of Al Yarmuk by road, roughly 21 minutes in light traffic. Routing data starts on Mansour Aba Al Khail Street and Muhammad Ali Jinnah Street, then follows As Sahabah Road, Khalid Bin Al Waleed Street, Dammam Road, Airport Road and King Salman Road. Peak hours and your terminal can add time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "neighbours",
          h2: "Short rides to neighbouring districts",
          paragraphs: [
            "Ishbiliyah is the nearest district, about 2 km away in a straight line and about 5 km by road, roughly 9 minutes. Qurtubah is about 9 km by road and Al Khaleej about 11 km, each roughly 11 to 12 minutes in light traffic. Granada and Al Hamra lie to the west and south-west, between 4 and 5 km away in a straight line.",
            "These are the school runs, family visits and short errands that fill a week. Give the street or building at the other end, and tell us which district it is in, because several districts nearby have similar names. We agree a meeting point the car can reach and do not promise access to restricted streets.",
          ],
        },
        {
          id: "city",
          h2: "To KAFD, Olaya and the old centre",
          paragraphs: [
            "KAFD is about 21 km from Al Yarmuk by road, roughly 21 minutes in light traffic, by Dammam Road, the Northern Ring Road and the KAFD ring road. Olaya is about 26 km away, roughly 23 minutes, through the Eastern Ring Road, Makkah Al Mukarramah Road and King Fahd Road. Al Malaz is about 25 km away and Ad Dirah about 30 km.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts.",
          ],
        },
      ],
      nearIds: ["ishbiliyah", "qurtubah", "al-khaleej", "granada", "al-hamra", "al-quds"],
      nearIntro: "These districts are close to Al Yarmuk in north-east Riyadh but are not part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "KAFD", id: "king-abdullah-financial-district", note: "The financial district, about 21 km by road" }],
      whatsappTrips: "a home pickup, a transfer to or from the metro station, a shopping trip or the airport",
      faq: [
        { q: "How can I book a taxi in Al Yarmuk, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Is there a metro station called Al Yarmuk?", a: "An independent metro site lists Al Yarmuk as station 6 on Line 6 (Purple), between Granadia and Al Hamra. We could not check it against the official operator or confirm where it stands, so check the official Riyadh Metro information." },
        { q: "Can I book a taxi to or from the metro station?", a: "Yes. Tell us which station, the date and time, and whether you have luggage. We confirm the pickup point with you and do not promise access to restricted areas." },
        { q: "How far is Al Yarmuk from King Khalid International Airport?", a: "About 28 km by road, roughly 21 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Which roads lead out of Al Yarmuk?", a: "According to routing data, drives start on Mansour Aba Al Khail Street and Muhammad Ali Jinnah Street and lead on to As Sahabah Road and Dammam Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Yarmuk?", a: "Ishbiliyah, Qurtubah, Al Khaleej, Granada and Al Hamra are the closest districts. Each is separate and has its own page." },
        { q: "Can I arrange a ride to KAFD or Olaya?", a: "Yes. KAFD is about 21 km by road and Olaya about 26 km, roughly 21 to 23 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Yarmuk start on Mansour Aba Al Khail Street and Muhammad Ali Jinnah Street. For King Khalid International Airport, routing data uses As Sahabah Road, Khalid Bin Al Waleed Street, Dammam Road, Airport Road and King Salman Road. For KAFD, it continues on Dammam Road, the Northern Ring Road and the KAFD ring road. For Olaya, it joins the Eastern Ring Road, Makkah Al Mukarramah Road and King Fahd Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point, destination and current traffic. Send a map pin.",
      localIntro: "Find Al Yarmuk on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby north-east Riyadh districts", "Metro stations and shopping", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Yarmuk", "Ishbiliyah", "Qurtubah", "Al Khaleej", "Granada", "Al Hamra", "Al Quds", "Al Muwanisiyah", "Al Janadriyah", "Al Rawdah"],
        places: ["Al Yarmuk Metro Station", "Granadia Metro Station", "Al Hamra Metro Station", "Atyaf Mall", "Al Yarmouk Plaza"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Riyadh Exhibition Center"],
        cities: ["Jeddah", "Dammam", "Al Khobar"],
      },
      waMessage: ALYARMUK_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
