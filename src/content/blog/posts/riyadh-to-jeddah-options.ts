import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

/**
 * Figures: OpenStreetMap routing, Riyadh to Jeddah city centres, light traffic, reviewed November 2026 (946.5 km, 625 minutes).
 * Other options are described without prices or timetables, because those change and are not ours to quote.
 */
export const post: Article = {
  slug: "riyadh-to-jeddah-by-road-taxi-bus-or-rental-car",
  h1: "Riyadh to Jeddah by Road: Private Taxi, Bus or Rental Car?",
  description: "Riyadh to Jeddah is about 947 km by road. Compare a private taxi, a coach, a rental car and a flight by comfort, luggage, timing and who travels.",
  category: "Intercity travel",
  tags: ["Riyadh to Jeddah", "Intercity taxi", "Private taxi", "Road trip", "Rental car"],
  published: "2026-11-24",
  answer:
    "Riyadh to Jeddah is about 947 km by road, roughly 10 hours 25 minutes of driving in light traffic and more with rest stops. A private taxi suits families, groups, heavy luggage and travellers who want one door-to-door vehicle. A coach suits one traveller on a budget who is happy to follow a timetable, a rental car suits drivers who want to go their own way, and a flight is fastest for a single traveller.",
  sections: [
    section(
      "road",
      "What the road is like on paper",
      p("The road distance from central Riyadh to central Jeddah is about 947 km (946.5 km in our routing data), and the estimated driving time is about 10 hours 25 minutes in light traffic. That is before rest stops, prayer stops, meals, fuel and traffic."),
      p("Most people therefore plan a full day. Leave early, agree the stops, and avoid arriving in the dark if you can. The estimate is a guide, not a promise, and your own journey will be planned and confirmed with you."),
      p("For the details of this route, see the [Riyadh to Jeddah taxi page](/taxi-saudi-arabia/routes/riyadh-to-jeddah)."),
    ),
    section(
      "compare",
      "The four options side by side",
      p("This table is about how each option feels, not about prices. Fares, schedules and availability change, so check them with each operator or airline before you decide."),
      table(
        ["What matters", "Private taxi", "Coach", "Rental car", "Flight"],
        [
          ["Door to door", "Yes, from your address", "No, to and from the station", "Yes, you collect and return it", "No, to and from two airports"],
          ["Luggage", "Chosen to fit your bags", "Limited by the operator's rules", "Your own space", "Limited by the airline's rules"],
          ["Group or family", "One vehicle together", "Each person needs a seat", "Together, but you drive", "Each person needs a ticket"],
          ["Timing", "Agreed with you", "Follows a timetable", "Your choice", "Follows a timetable"],
          ["Who drives", "A driver", "A driver", "You", "The airline"],
          ["Stops on the way", "Agreed in advance", "Set by the operator", "Your choice", "None"],
        ],
        { note: "A general comparison, not a price list. We arrange private taxis, so we are not neutral. The table is written to be fair to each option." },
      ),
    ),
    section(
      "taxi",
      "When a private taxi makes the most sense",
      ul(
        { title: "You travel as a family or a group", text: "One vehicle keeps everyone together and you share one fare instead of buying many tickets." },
        { title: "You have a lot of luggage", text: "Tell us the number of bags and the vehicle is chosen to fit them." },
        { title: "You want to leave from your door and arrive at your door", text: "No station, no airport queue and no second ride at either end." },
        { title: "You need stops", text: "Prayer, rest and meal stops can be agreed in advance, and a longer stop can be planned for an overnight break." },
        { title: "You travel with older relatives or children", text: "A calm, planned ride with known stops is easier than a crowded timetable." },
      ),
    ),
    cta("Planning Riyadh to Jeddah?", "Send your date, passengers and bags on WhatsApp. We confirm the vehicle, driver and fare before you commit."),
    section(
      "other",
      "When something else is the better choice",
      ul(
        { title: "A flight", text: "For one traveller in a hurry, the flight is faster. Remember to add the time to reach the airport, check in, and get from the Jeddah airport to your destination." },
        { title: "A coach", text: "For one traveller with little luggage and a flexible plan, a coach can cost less. You follow the operator's timetable and stops." },
        { title: "A rental car", text: "If you enjoy driving, want to explore on the way, or will stay in Jeddah for several days and need a car there, a rental car gives you freedom. You also take on the driving, the fuel and the return." },
      ),
    ),
    section(
      "plan",
      "How to plan the ride well",
      ol(
        { title: "Choose the date and the time", text: "Ask for an early start. Decide whether you want to arrive in daylight." },
        { title: "Give exact addresses", text: "Both pickup and drop-off, with a map pin if you can." },
        { title: "Say who and what is travelling", text: "Number of passengers, children, and large bags." },
        { title: "Agree the stops", text: "Prayer stops, a meal and a rest. For very long days, ask about an overnight stop." },
        { title: "Decide on the return", text: "If you need to come back, ask for both directions in one request." },
        { title: "Confirm the fare first", text: "You should know the fare, and what it includes, before the ride is final." },
      ),
      p("For a longer checklist, read [Planning a long-distance taxi from Riyadh](/blog/how-to-plan-a-long-distance-taxi-from-riyadh)."),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Riyadh to Jeddah taxi", href: "/taxi-saudi-arabia/routes/riyadh-to-jeddah", note: "The route page for a private taxi" },
        { name: "Riyadh to Saudi cities by road", href: "/blog/riyadh-to-saudi-cities-road-distance-and-driving-time", note: "Distances to 22 cities" },
        { name: "Jeddah airport", href: "/taxi-saudi-arabia/airports/king-abdulaziz-international-airport", note: "Airport transfers in Jeddah" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "How far is it from Riyadh to Jeddah by road?", a: "About 947 km between the city centres, with an estimated driving time of about 10 hours 25 minutes in light traffic. Rest stops and traffic add to this." },
    { q: "Can I do Riyadh to Jeddah in one day by taxi?", a: "Yes, many travellers do. Leave early, agree the stops, and plan to arrive in daylight if you can. For very long days, ask about an overnight stop." },
    { q: "Can I book a return ride in the same message?", a: "Yes. Ask for both directions in one request and give the dates. The fare is confirmed with you before you commit." },
    { q: "Is a private taxi better than a flight?", a: "For one traveller in a hurry, a flight is faster. A private car suits groups, families, luggage and travellers who want one vehicle from door to door." },
    { q: "Can the driver stop for prayer?", a: "Yes. Tell us in your request, and the stops are planned with you." },
  ],
  takeaways: standardTakeaways("This guide gives estimates. The following are not published here and are agreed with you for each request."),
};
