import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Al Nadhim Taxi Service: hand-written page for Al Nadhim (An Nazim on OpenStreetMap), a residential district in east Riyadh (built by factory.ts). Primary focus keyword: "Al Nadhim Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Al Nadhim folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/al-nadhim-taxi-service/ and placed in the about, pickup, east-neighbours, airport, long-rides sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.8001/46.8960, used unchanged. OpenStreetMap labels schools in "Al-Nazim District" at 24.808/46.882-46.899, a mosque at 24.8172/46.8836 and Family Care Hospital (Al Rimayah District) at 24.8010/46.8715.
 * Figures (OSRM, light traffic, Nov 2026): RUH 37.3 km / 34 min; Olaya 28.3 / 25; KAFD 38.7 / 34; Ad Dirah 31.9 / 29; Al Malaz 26.6 / 24; Al Janadriyah 7.9 / 10; Al Khaleej 15.3 / 18.
 * Roads returned: Khurais Road, Imam Abdullah Bin Saud Bin Abdulaziz Road, Janadriyah Branch Road and Janadriyah Road, Muhammad Bin Faraj Street, King Salman Road (airport); Khurais Road, Makkah Al Mukarramah Road, King Fahd Road, King Fahd Branch Road (Olaya);
 * Janadriyah Road, Dammam Road, Northern Ring Road, King Fahd Branch Road, KAFD ring road (KAFD). The first local streets (Arabic only in the data) are not stated.
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station in Al Nadhim. Line 6 has Khurais Road, As Salam and An Naseem further west; no coordinates are shown, so no claim of proximity is made.
 * Nearby (straight-line centres): Al Janadriyah 4.9 km, Al Khaleej 9.7, Ishbiliyah 10.3, Al Yarmuk 11.4, Al Naseem 11.5.
 * NOT verified: malls, parks, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const ALNADHIM_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Al Nadhim, Riyadh. The trip is [for example a home pickup, a family trip, a long city ride or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function alNadhimRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "al-nadhim",
      images: {
        about: { slot: "al-nadhim-eastern-district-taxi-pickup", alt: "A blue SUV on a pavement beside high walls and gates as a man in a white thobe, a man in a patterned head-cloth with a suitcase and a woman in a green abaya walk up", label: "Photo: al-nadhim-eastern-district-taxi-pickup.webp", w: 1000, h: 558 },
        pickup: { slot: "al-nadhim-taxi-pickup-phone-confirmation", alt: "A woman in a blue headscarf checks her phone beside a white SUV with a woman at the wheel, on a street of walled houses with a mosque minaret in the distance", label: "Photo: al-nadhim-taxi-pickup-phone-confirmation.webp", w: 1000, h: 558 },
        "east-neighbours": { slot: "al-nadhim-family-ride-to-neighbouring-districts", alt: "A silver SUV with its door open on a street of walled villas as a man with a lanyard, a man in a thobe, a boy with a backpack, a woman in a black abaya and a girl stand beside it", label: "Photo: al-nadhim-family-ride-to-neighbouring-districts.webp", w: 1000, h: 558 },
        airport: { slot: "al-nadhim-ruh-airport-transfer", alt: "A maroon SUV with its boot open at an airport departures kerb as a man with a bag, a man in a dark jacket and a woman with a suitcase stand beside it", label: "Photo: al-nadhim-ruh-airport-transfer.webp", w: 1000, h: 558 },
        "long-rides": { slot: "al-nadhim-long-ride-to-central-riyadh", alt: "A silver SUV with a driver and a passenger on a multi-lane road under a sign for the Riyadh departure, with the city skyline behind", label: "Photo: al-nadhim-long-ride-to-central-riyadh.webp", w: 1000, h: 558 },
      },
      name: "Al Nadhim",
      title: "Al Nadhim Taxi Service Riyadh | East Riyadh Home and Airport",
      description: "Al Nadhim Taxi Service for home pickups, family trips, long city rides and airport transfers from east Riyadh, about 37 km from RUH. Fare confirmed first.",
      h1: "Al Nadhim Taxi Service in Riyadh",
      lead: "Al Nadhim Taxi Service from Gulf Elite Transport: private rides from your door in east Riyadh, planned in advance because the roads to the centre and to the airport are long. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Al Nadhim, spelled An Nazim on some maps, a residential district in east Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and group journeys, long rides to Olaya and the old centre, and airport transfers to King Khalid International Airport (RUH), about 37 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 37 km by road" },
        { label: "Olaya", value: "about 28 km by road" },
        { label: "Al Janadriyah", value: "about 8 km by road" },
        { label: "Area type", value: "residential, east Riyadh" },
      ],
      aboutH2: "Al Nadhim: a residential district in the east of Riyadh",
      about: [
        "Al Nadhim, written An Nazim or Al-Nazim on OpenStreetMap, is a residential district in the east of Riyadh. It lies well east of Al Yarmuk and Ishbiliyah and east of Al Janadriyah, and it falls within the Al Naseem municipality on the map. Schools and a mosque are labelled inside it, and a hospital called Family Care sits just to the west in Al Rimayah.",
        "Because Al Nadhim is far from the centre, almost every ride from here is a longer one. Olaya is about 28 km away, the airport about 37 km, and the financial district about 39 km. The roads are wide, but the distances add up, so the time of day and the pickup point matter more than they do in a central district.",
        "Families in Al Nadhim book rides for visits across the city, for weddings and gatherings, and for airport journeys with luggage. We ask for a map pin and a clear time, and we confirm the vehicle and fare before the day.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Al Nadhim and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 37, min: 34 }, olaya: { km: 28, min: 25 }, kafd: { km: 39, min: 34 }, adDirah: { km: 32, min: 29 }, malaz: { km: 27, min: 24 } },
      blocks: [
        {
          id: "pickup",
          h2: "Pickups in an eastern district",
          paragraphs: [
            "Send the street name, the villa or building number and a map pin. Some streets in the eastern districts are sparsely mapped, so a pin and a nearby landmark, such as a mosque or a school, help a driver who is new to the area. If you live in a compound, tell us the name and the gate you will use.",
            "A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate that the car can reach. Give a phone number you will answer, the number of passengers and the number of bags.",
          ],
        },
        {
          id: "airport",
          h2: "Airport transfers between Al Nadhim and RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 37 km from the centre of Al Nadhim by road, roughly 34 minutes in light traffic. Routing data uses Khurais Road, Imam Abdullah Bin Saud Bin Abdulaziz Road, Janadriyah Road and King Salman Road, so the drive crosses the north-east of the city. Peak hours and your terminal can add a good deal of time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your map pin. Because the drive is long, allow generous time for an early flight and say so in the request. For an arrival send your landing time and your address. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "long-rides",
          h2: "Long rides to Olaya, KAFD and the old centre",
          paragraphs: [
            "Olaya is about 28 km from Al Nadhim by road, roughly 25 minutes in light traffic, via Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. Al Malaz is about 27 km away and Ad Dirah about 32 km, each roughly half an hour. KAFD is about 39 km away, roughly 34 minutes, by Janadriyah Road, Dammam Road and the Northern Ring Road.",
            "KAFD and many Olaya towers have controlled entrances, so name the tower and the entrance. We agree a meeting point the car can reach and do not promise access to towers or private car parks. Gulf Elite Transport has no partnership with KAFD or any business in these districts. Ask for a return pickup in the same request, with a time window.",
          ],
        },
        {
          id: "east-neighbours",
          h2: "Rides to Al Janadriyah and neighbouring districts",
          paragraphs: [
            "Al Janadriyah is the nearest district with its own page, about 5 km away in a straight line and about 8 km by road, roughly 10 minutes. Al Khaleej, Ishbiliyah and Al Yarmuk are 10 to 11 km away in a straight line, and the road distance is longer. Al Khaleej is about 15 km by road, roughly 18 minutes.",
            "Family Care Hospital is labelled in Al Rimayah, a short way to the west, and OpenStreetMap shows several schools in the district itself. We could not confirm gates, hours or rules for any of them. Give the name of the place, the branch and the gate. A ride is not an emergency or medical transport service.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Al Nadhim",
          paragraphs: [
            "An independent Riyadh Metro information site shows no station in Al Nadhim. Line 6 (Purple) has stations further west, including Khurais Road, As Salam and An Naseem, but the site shows no map coordinates, so we do not state how far they are from an address here, and we could not check the details against the official operator.",
            "Please read the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or meet you there with luggage. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
      ],
      nearIds: ["al-janadriyah", "al-khaleej", "ishbiliyah", "al-yarmuk", "al-naseem"],
      nearIntro: "These districts are the closest to Al Nadhim that have their own pages, but none is part of it. The distances below are straight-line distances between district centres, not driving distances, and the road distance is often longer. Each ride page covers both directions.",
      nearExtra: [{ name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 28 km by road" }],
      whatsappTrips: "a home pickup, a family trip, a long city ride or the airport",
      faq: [
        { q: "How can I book a taxi in Al Nadhim, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Is Al Nadhim the same as An Nazim?", a: "Yes. Maps spell the district Al Nadhim, An Nazim and Al-Nazim. Send a map pin and we confirm the pickup point with you." },
        { q: "How far is Al Nadhim from King Khalid International Airport?", a: "About 37 km by road, roughly 34 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Al Nadhim?", a: "An independent metro site shows none here. Line 6 has stations further west. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Al Nadhim?", a: "According to routing data, drives join Khurais Road and lead on to Imam Abdullah Bin Saud Bin Abdulaziz Road, Janadriyah Road, Makkah Al Mukarramah Road and King Fahd Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Al Nadhim?", a: "Al Janadriyah is the nearest, and Al Khaleej, Ishbiliyah, Al Yarmuk and Al Naseem follow at about 10 to 12 km. Each is separate and has its own page." },
        { q: "Can I arrange a ride to Olaya?", a: "Yes. Olaya is about 28 km by road, roughly 25 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it for long rides. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Al Nadhim lead onto Khurais Road. For King Khalid International Airport, routing data continues on Imam Abdullah Bin Saud Bin Abdulaziz Road, Janadriyah Road and King Salman Road. For Olaya, it uses Khurais Road, Makkah Al Mukarramah Road and King Fahd Road. For KAFD, it follows Janadriyah Road, Dammam Road and the Northern Ring Road. For Al Janadriyah, it stays on Khurais Road and Imam Abdullah Bin Saud Bin Abdulaziz Road. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point, destination and current traffic. Send a pin.",
      localIntro: "Find Al Nadhim on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby east Riyadh districts", "Metro stations and shopping", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Al Nadhim", "Al Janadriyah", "Al Khaleej", "Ishbiliyah", "Al Yarmuk", "Al Naseem", "Al Rimayah", "Al Hamra", "Qurtubah", "Al Rawdah", "Al Salam"],
        places: ["An Naseem Metro Station", "Khurais Road Metro Station", "As Salam Metro Station", "Othaim Mall Khurais Road"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport"],
        cities: ["Jeddah", "Dammam", "Al Hofuf", "Al Khobar"],
      },
      waMessage: ALNADHIM_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
