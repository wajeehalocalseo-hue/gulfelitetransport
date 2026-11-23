import type { PlacePage } from "../types";
import { buildDistrictRich } from "./factory";
import type { DistrictRichCtx } from "./olaya";

/**
 * Dhahrat Laban Taxi Service: hand-written page for Dhahrat Laban (Zahrat Laban / Hijrat Laban on OpenStreetMap), a residential district in west Riyadh (built by factory.ts). Primary focus keyword: "Dhahrat Laban Taxi Service" only.
 * IMAGES: five photos from the owner's Google Drive (Dhahrat Laban folder), resized to 1000 px wide WebP (35-115 KB) in public/images/routes/riyadh-districts/dhahrat-laban-taxi-service/ and placed in the about, pickup, family-parks, city, airport sections. The photos show cars and drivers; the page never calls them Gulf Elite's fleet and the alt text describes only what is visible.
 *
 * CENTRE POINT: riyadh-areas.ts, 24.6329/46.5531, used unchanged. OpenStreetMap labels Laban parks at 24.6368/46.5542, Al Hadaya Mall (Najd Road) at 24.6207/46.5475 and schools in Hijrat Laban at 24.652/46.574, all within the Municipality of Irqah.
 * Figures (OSRM, light traffic, Nov 2026): RUH 50.4 km / 36 min; Olaya 19.4 / 18; KAFD 25.2 / 24; Ad Dirah 24.1 / 22; Al Malaz 24.9 / 22; Al Irqah 10.9 / 15; Diplomatic Quarter 12.3 / 16; Al Uraija 17.9 / 20.
 * Roads returned: Asir Street, Najran Street, Al Taief Street (first roads), Western Ring Road, King Khalid Road, King Salman Road (airport); Jeddah Road, Makkah Al Mukarramah Road, King Fahd Road, King Fahd Branch Road (Olaya, Ad Dirah), Imam Turki Bin Abdullah Street (Ad Dirah);
 * Western Ring Road, Northern Ring Road, King Fahd Branch Road, Takhassusi Road, Thumamah Road (KAFD); Najd Road (west edge, mall label).
 * Metro (independent riyadhmetro.org, read 19 Nov 2026): no station called Dhahrat Laban. Line 3 begins further west at Jeddah Road and Tuwaiq; no coordinates are shown, so no distance or claim of proximity is made.
 * Nearby (straight-line centres): Al Irqah 6.4 km, Diplomatic Quarter 8.2, Al Uraija 10.5, Diriyah 11.5, Al Suwaidi 13.0, Al Badiah 13.1.
 * Not to be confused with Dhahrat Al Badiah (a different district, with a Line 3 station).
 * NOT verified: hospitals, boundary, opening hours; no fares, ratings, reviews, fleet details or partnerships.
 */

export const DHAHRATLABAN_WHATSAPP_MESSAGE =
  "Hello Gulf Elite Transport Group, I would like to arrange a private ride to or from Dhahrat Laban, Riyadh. The trip is [for example a home pickup, a family trip, a school run, a ride to Olaya or an airport transfer], my pickup point is [street, building and gate, or I will send a map pin], my destination is [destination and entrance], my date and time are [date and time], and there are [number] passengers and [number] bags. I need a return pickup at [return time]. Please confirm availability and the fare.";

export function dhahratLabanRich(ctx: DistrictRichCtx): Pick<PlacePage, "title" | "description" | "h1" | "lead" | "directAnswer" | "facts" | "sections"> & { whatsappMessage: string } {
  return buildDistrictRich(
    {
      id: "dhahrat-laban",
      images: {
        about: { slot: "dhahrat-laban-family-taxi-pickup", alt: "A dark green SUV with a door open on a street of gated villas as a man in a white thobe greets a man, a woman and a boy with wheeled suitcases", label: "Photo: dhahrat-laban-family-taxi-pickup.webp", w: 1000, h: 558 },
        pickup: { slot: "dhahrat-laban-door-to-door-taxi-pickup", alt: "A silver SUV on a paved street of villas as a man in a pale blue shirt greets a woman in a dark teal abaya who holds up her phone", label: "Photo: dhahrat-laban-door-to-door-taxi-pickup.webp", w: 1000, h: 558 },
        "family-parks": { slot: "dhahrat-laban-family-park-outing-taxi", alt: "A white SUV beside a landscaped park with palm trees as a woman in a dark abaya at the open door greets a family of two adults and two children", label: "Photo: dhahrat-laban-family-park-outing-taxi.webp", w: 1000, h: 558 },
        city: { slot: "dhahrat-laban-central-riyadh-ride", alt: "A dark purple saloon with a driver and two passengers on a multi-lane Riyadh highway beneath signs for Central Riyadh, with the city skyline behind", label: "Photo: dhahrat-laban-central-riyadh-ride.webp", w: 1000, h: 558 },
        airport: { slot: "dhahrat-laban-ruh-airport-transfer", alt: "A copper-brown SUV with its boot open beneath a sign for King Khalid International Airport as two men load suitcases and a woman in a pink abaya waits", label: "Photo: dhahrat-laban-ruh-airport-transfer.webp", w: 1000, h: 558 },
      },
      name: "Dhahrat Laban",
      title: "Dhahrat Laban Taxi Service Riyadh | West Riyadh Rides",
      description: "Dhahrat Laban Taxi Service for home pickups, family and school trips, rides to Olaya and Ad Dirah and airport transfers from west Riyadh. Fare confirmed first.",
      h1: "Dhahrat Laban Taxi Service in Riyadh",
      lead: "Dhahrat Laban Taxi Service from Gulf Elite Transport: private rides from your door at the western edge of Riyadh, planned in advance because the road to the airport crosses the whole city. Book on WhatsApp or use the booking form, and we confirm the vehicle, driver and fare before you commit.",
      directAnswer:
        "In Dhahrat Laban, a residential district in west Riyadh, Gulf Elite Transport takes bookings for private taxi pickups from villas and apartments, family and school journeys, rides to Olaya, Ad Dirah and the Diplomatic Quarter, and airport transfers to King Khalid International Airport (RUH), about 50 km by road. A booking does not give entry to private property. Send your pin or address, destination, date, time, passenger count and any return time by WhatsApp or the booking form, and we confirm the vehicle, driver and fare before you commit. Fares are not published, because each ride is quoted for your request.",
      facts: [
        { label: "Riyadh Airport (RUH)", value: "about 50 km by road" },
        { label: "Olaya", value: "about 19 km by road" },
        { label: "Ad Dirah", value: "about 24 km by road" },
        { label: "Area type", value: "residential, west Riyadh" },
      ],
      aboutH2: "Dhahrat Laban: a residential district at the western edge",
      about: [
        "Dhahrat Laban is a residential district in the west of Riyadh, west of Al Uraija and south-west of Al Irqah. On many maps it is spelled Zahrat Laban, and a part of it is labelled Hijrat Laban. OpenStreetMap places it within the Municipality of Irqah, together with Al Irqah itself. Laban Park and a shopping centre on Najd Road are both mapped close to its centre.",
        "Do not confuse it with Dhahrat Al Badiah. That is a different district, further east, with a Riyadh Metro station named after it. If your pickup is in Dhahrat Laban, say so and send a map pin.",
        "Because the district is at the western edge, the centre of Riyadh is a long drive away and the airport, in the far north-east, is one of the longest transfers in the city. People who live here book ahead for the airport, for school runs, for appointments and for visits to relatives.",
      ],
      journeysNote: "These are road estimates for light traffic, from OpenStreetMap routing between the centre of Dhahrat Laban and the other district centres and the airport, reviewed in November 2026. They are not straight-line distances. Traffic, your exact pickup, the entrance of your destination and any stops change the time, so they are not a promised journey time.",
      figs: { ruh: { km: 50, min: 36 }, olaya: { km: 19, min: 18 }, kafd: { km: 25, min: 24 }, adDirah: { km: 24, min: 22 }, malaz: { km: 25, min: 22 } },
      blocks: [
        {
          id: "airport",
          h2: "The long airport run from Dhahrat Laban to RUH",
          paragraphs: [
            "King Khalid International Airport (RUH) is about 50 km from the centre of Dhahrat Laban by road, roughly 36 minutes in light traffic according to routing data, which follows the Western Ring Road, King Khalid Road and King Salman Road. It is one of the longer airport transfers in Riyadh, and the figure assumes quiet roads. Busy hours, your terminal and your exact starting street can add a good deal of time.",
            "For a departure send your flight number, the date and time, the terminal if you know it, the passengers and bags, and your street and gate or a map pin. Because the drive is long, allow generous time for an early flight and say so in the request. For an arrival send your landing time and where you are going. A return transfer can be asked for in the same booking. We do not promise flight tracking, meet-and-greet service or a fixed waiting time, and the pickup point at the airport follows the airport's own rules.",
          ],
        },
        {
          id: "pickup",
          h2: "Door-to-door pickups in Dhahrat Laban",
          paragraphs: [
            "Send the street name, the villa or building number and a map pin. Asir Street, Najran Street and Al Taief Street are the local roads that routing data uses when leaving the centre of the district, so naming the one nearest you can help. A landmark such as a mosque or a school makes the pickup easier.",
            "If you live in a compound, tell us the name and the gate you will use. A taxi booking does not give permission to enter private property, and we do not promise access to private roads or controlled entrances. Where entry is limited, agree a meeting point outside the gate that the car can reach. Give a phone number you will answer, the number of passengers and the number of bags.",
          ],
        },
        {
          id: "family-parks",
          h2: "Family outings, parks and shopping",
          paragraphs: [
            "OpenStreetMap shows parks labelled Laban close to the centre of the district, a larger park a little way north-east, and Al Hadaya Mall on Najd Road, to the south-west. We do not publish opening hours, facilities, parking or entrance details for any of them. Tell us the place and the entrance you want, and we agree a pickup the car can reach.",
            "For a family outing, tell us how many adults and children are travelling and what you expect to carry home. We choose the vehicle from that and confirm it with you before you commit. Ask for the return pickup in the same request, with a time window.",
          ],
        },
        {
          id: "city",
          h2: "To Olaya, Ad Dirah and the Diplomatic Quarter",
          paragraphs: [
            "Olaya is about 19 km from Dhahrat Laban by road, roughly 18 minutes in light traffic, by Jeddah Road, Makkah Al Mukarramah Road and King Fahd Road. Ad Dirah is about 24 km away, roughly 22 minutes, and Al Malaz about 25 km. The Diplomatic Quarter is about 12 km away, roughly 16 minutes. KAFD is about 25 km away, roughly 24 minutes, via the Western and Northern Ring Roads.",
            "The Diplomatic Quarter, KAFD and many Olaya buildings have controlled entrances, so name the gate, the tower and the entrance, and ask your host about passes. We agree a meeting point the car can reach and do not promise access to restricted areas or private car parks. Gulf Elite Transport has no partnership with any of these places.",
          ],
        },
        {
          id: "metro",
          h2: "Public transport near Dhahrat Laban",
          paragraphs: [
            "An independent Riyadh Metro information site lists no station called Dhahrat Laban. Line 3 (Orange) starts further west, at Jeddah Road and Tuwaiq, but the site shows no map coordinates, so we do not state how far they are from an address in the district, and we could not check the details against the official operator.",
            "Please read the official Riyadh Metro information for current stations and services. A taxi can take you from your door to a station, or meet you there with luggage. Gulf Elite Transport is not part of the metro and has no partnership with it, and we do not publish metro fares, hours or journey times.",
          ],
        },
      ],
      nearIds: ["al-irqah", "diplomatic-quarter", "al-uraija", "diriyah", "al-suwaidi", "al-badiah"],
      nearIntro: "These districts are the closest to Dhahrat Laban that have their own pages, but none is part of it. The distances below are straight-line distances between district centres, not driving distances. Each ride page covers both directions.",
      nearExtra: [{ name: "Olaya", id: "olaya", note: "Offices, hotels and shopping, about 19 km by road" }],
      whatsappTrips: "a home pickup, a family trip, a school run, a ride to Olaya or the airport",
      faq: [
        { q: "How can I book a taxi in Dhahrat Laban, Riyadh?", a: "Message us on WhatsApp or use the booking form on this page. Send your pickup address or map pin, destination, date, time and passenger count. We confirm the vehicle, driver and fare before you commit." },
        { q: "Is Dhahrat Laban the same as Dhahrat Al Badiah?", a: "No. They are separate districts. Dhahrat Al Badiah is further east and has a Line 3 metro station. Send a map pin if you are unsure." },
        { q: "How far is Dhahrat Laban from King Khalid International Airport?", a: "About 50 km by road, roughly 36 minutes in light traffic. Busy hours, your terminal and your exact street change that, so it is not a promised journey time." },
        { q: "Is there a metro station in Dhahrat Laban?", a: "An independent metro site lists none. Line 3 starts further west. Check the official Riyadh Metro information for current services." },
        { q: "Which roads lead out of Dhahrat Laban?", a: "According to routing data, drives start on Asir Street, Najran Street and Al Taief Street and lead on to the Western Ring Road, Jeddah Road and King Khalid Road. The best route depends on your pickup, destination and traffic." },
        { q: "Which neighbourhoods are near Dhahrat Laban?", a: "Al Irqah, the Diplomatic Quarter, Al Uraija and Diriyah are the closest districts with pages. Each is separate." },
        { q: "Can I arrange a ride to Olaya or Ad Dirah?", a: "Yes. Olaya is about 19 km by road and Ad Dirah about 24 km, roughly 18 to 22 minutes in light traffic. Name the building and the entrance." },
        { q: "Can I request a return pickup?", a: "Yes, and we suggest it for long rides. Ask for the return in the same request, with a time window. Waiting is agreed separately, and availability is confirmed for each request." },
        { q: "How are fares confirmed?", a: "No standard fares are published. Each ride is quoted for your request, and you confirm the fare before you commit." },
      ],
      directions:
        "Most drives from Dhahrat Laban start on Asir Street and Najran Street, then join Al Taief Street. For King Khalid International Airport, routing data follows the Western Ring Road, King Khalid Road and King Salman Road. For Olaya, it uses Jeddah Road, Makkah Al Mukarramah Road, King Fahd Road and King Fahd Branch Road. For Ad Dirah, it follows the same roads to Imam Turki Bin Abdullah Street. For KAFD, it uses the Western and Northern Ring Roads. These roads come from OpenStreetMap routing and are a guide. The best route depends on your exact pickup point and current traffic.",
      localIntro: "Find Dhahrat Laban on the map, read how the main roads lead out of the district, and open nearby neighbourhoods and destinations in Google Maps.",
      linkLists: {
        titles: ["Nearby west Riyadh districts", "Parks, malls and metro stations", "Other Riyadh destinations", "Other Saudi cities"],
        districts: ["Dhahrat Laban", "Al Irqah", "Diplomatic Quarter", "Al Uraija", "Dhahrat Al Badiah", "Al Suwaidi", "Al Badiah", "Al Nakheel", "Hittin", "Al Khuzama"],
        places: ["Al Hadaya Mall", "Laban Park", "Jeddah Road Metro Station", "Tuwaiq Metro Station", "Wadi Laban"],
        others: ["Olaya", "King Abdullah Financial District", "Ad Dirah", "Al Malaz", "Diriyah", "King Khalid International Airport", "Al Murabba"],
        cities: ["Jeddah", "Makkah", "Taif"],
      },
      waMessage: DHAHRATLABAN_WHATSAPP_MESSAGE,
    },
    ctx,
  );
}
