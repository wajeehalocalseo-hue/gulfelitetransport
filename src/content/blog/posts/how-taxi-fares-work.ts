import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

/**
 * Figures: OpenStreetMap routing between city centres, light traffic, reviewed November 2026 (the route pages use the same data).
 * No fares are quoted anywhere in this guide.
 */
export const post: Article = {
  slug: "how-taxi-fares-are-worked-out-for-long-trips-in-saudi-arabia",
  h1: "How Taxi Fares Are Worked Out for Long Trips in Saudi Arabia (and Why We Confirm the Fare First)",
  description: "What changes the fare of a long taxi ride in Saudi Arabia: distance, vehicle, bags, stops, return trips and dates. How to compare two quotes fairly.",
  category: "Booking and price",
  tags: ["Taxi fares", "Intercity taxi", "Quote", "Return trip", "Booking"],
  published: "2026-11-24",
  answer:
    "The fare of a long taxi ride in Saudi Arabia depends on the distance and driving time, the vehicle you need, how many people and bags travel, any stops or waiting, whether you want a return, and the date. Because these change for every trip, we do not publish standard fares. We confirm the fare with you before you commit, and we tell you what it includes.",
  sections: [
    section(
      "why",
      "Why there is no single price for a route",
      p("Two people can ask for the same route and receive different quotes, and both quotes can be fair. The reason is that a route is only one part of what you are buying. A ride for one traveller with a small bag is a different job from a ride for a family of six with luggage and a stop for prayer."),
      p("That is why we confirm the fare for each request and do not print a table of prices. A table would be wrong for most people who read it."),
    ),
    section(
      "factors",
      "What changes the fare",
      ul(
        { title: "Distance and driving time", text: "A longer road takes more driving time, fuel and the driver's day. Riyadh to Dammam is about 411 km, roughly 3 hours 55 minutes in light traffic, and Riyadh to Jeddah is about 947 km, roughly 10 hours 25 minutes. They are very different jobs." },
        { title: "The vehicle", text: "A sedan, an SUV and a van are different vehicles for different groups." },
        { title: "People and bags", text: "More passengers and more luggage can mean a larger vehicle." },
        { title: "Stops and waiting time", text: "A rest stop, a meal, a visit or a wait for a flight all add time. Agree them before the ride." },
        { title: "One way or return", text: "A driver who must come back without passengers is a different cost from a planned return with you. Ask for both directions in one request." },
        { title: "Date and time", text: "Holidays, the Hajj season, Ramadan, Fridays and late-night starts can change availability and the fare." },
        { title: "Pickup and drop-off points", text: "A precise address, a pin and an easy access point make the plan cleaner. A remote address can add time." },
      ),
    ),
    section(
      "table",
      "Same distance, different needs",
      p("These two requests have the same route but would not have the same fare. This is only an illustration of what changes a quote, not a price list."),
      table(
        ["Detail", "Request A", "Request B"],
        [
          ["Route", "Riyadh to Dammam", "Riyadh to Dammam"],
          ["Passengers", "1 adult", "6 people, including children"],
          ["Bags", "1 cabin bag", "6 large bags"],
          ["Stops", "None", "A prayer stop and a meal"],
          ["Return", "One way", "Return the same day"],
          ["Vehicle", "A sedan may be enough", "A van may be needed"],
        ],
        { note: "An illustration of what changes a quote. It does not say what either request would cost." },
      ),
    ),
    cta("Want a clear quote?", "Send your route, date, passengers and bags on WhatsApp. We confirm the vehicle, driver and fare before you commit."),
    section(
      "quote",
      "How to ask for a quote that is easy to answer",
      ol(
        { title: "Where from and to", text: "Cities, districts or hotels, with a map pin if you can." },
        { title: "Date and time", text: "The day and the time you want to leave." },
        { title: "People", text: "How many adults and children." },
        { title: "Bags", text: "How many large bags and any bulky items." },
        { title: "Stops and waiting", text: "Prayer stops, meals or a visit on the way." },
        { title: "One way or return", text: "If you return, say when." },
      ),
      p("You can send all of this in one WhatsApp message, or use the [booking form](/book)."),
    ),
    section(
      "compare",
      "How to compare two quotes fairly",
      p("A lower number is not always the better offer. Before you compare, check that both quotes cover the same things."),
      ul(
        { title: "Same vehicle", text: "A sedan and a van are not the same thing." },
        { title: "Same inclusions", text: "Ask whether waiting time, stops and large luggage are included." },
        { title: "Same direction", text: "One way and return are different." },
        { title: "Same date and time", text: "A holiday date is not the same as a quiet weekday." },
        { title: "The fare is confirmed before you commit", text: "Do not agree to a ride where the price is decided after it starts." },
      ),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Taxi and cab services", href: "/services/taxi-cab-services", note: "The service behind these guides" },
        { name: "Riyadh to Dammam taxi", href: "/taxi-saudi-arabia/routes/riyadh-to-dammam", note: "A route page" },
        { name: "Riyadh to Jeddah taxi", href: "/taxi-saudi-arabia/routes/riyadh-to-jeddah", note: "A route page" },
        { name: "Planning a long-distance taxi from Riyadh", href: "/blog/how-to-plan-a-long-distance-taxi-from-riyadh", note: "A checklist" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "Do you publish fixed fares for each route?", a: "No. The fare depends on the vehicle, passengers, bags, stops, date and whether you return, so we confirm it with you for each request." },
    { q: "Is the fare per person or per car?", a: "Ask this of any provider. When we confirm a fare with you, we say what it covers, so you know whether it is for the vehicle and what is included." },
    { q: "Will the fare change after I confirm?", a: "The fare is confirmed with you before you commit, with what it includes. If you ask for a change, such as an extra stop, it is agreed with you first." },
    { q: "Is a return trip cheaper than two one-way rides?", a: "A planned return can be organised better than two separate requests, so ask for both directions in one message. We confirm the fare with you." },
    { q: "How can I get a quick quote?", a: "Message us on WhatsApp with your route, date, passengers and bags. The reply says which vehicle fits and what the fare is." },
  ],
  takeaways: standardTakeaways("This guide explains what changes a fare. The following are not published here and are agreed with you for each request."),
};
