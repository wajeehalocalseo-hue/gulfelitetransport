import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

/** Figures: OpenStreetMap routing between city centres, light traffic, reviewed November 2026 (the same data as the route pages). Estimates only. */
export const post: Article = {
  slug: "family-trips-in-saudi-arabia-a-transport-plan-for-parents-kids-and-grandparents",
  h1: "Family Trips in Saudi Arabia: A Transport Plan for Parents, Kids and Grandparents",
  description: "How to plan road transport for a family trip in Saudi Arabia: the right vehicle, stops, timing, luggage, and what to tell the driver before you go.",
  category: "Family travel",
  tags: ["Family travel", "Family taxi", "Road trip", "Children", "Older relatives"],
  published: "2026-11-25",
  answer:
    "A family trip goes best when the vehicle, the timing and the stops are planned before you leave. Count every person and every bag, tell the driver about children and older relatives, agree rest and prayer stops, and leave early for long routes. Riyadh to Dammam is about 411 km (roughly 3 hours 55 minutes), and Riyadh to Makkah is about 868 km (roughly 9 hours 35 minutes), so the longer routes need a real plan.",
  sections: [
    section(
      "start",
      "Start with who is travelling",
      p("Families are rarely one group. There may be parents, teenagers, a toddler, and grandparents who need more room to get in and out. Each of them changes the plan a little."),
      ul(
        { title: "Young children", text: "They need regular stops, snacks and something to do. Tell us if you will bring a child seat or if you need one, so it can be checked for your request." },
        { title: "Older relatives", text: "Easy entry, short walks and frequent rest stops matter more than speed. Say so in your request." },
        { title: "Teenagers and adults", text: "Charging points, space and a quiet ride make a long day easier for everyone." },
      ),
    ),
    section(
      "vehicle",
      "Choose the vehicle from people and bags",
      p("The number of passengers is only half of the answer. Bags decide the rest. A family of five with two large cases and a pushchair needs a different vehicle from five adults with cabin bags."),
      p("Tell us how many adults and children there are, how many large bags, and any bulky items such as a pushchair, a cool box or a prayer mat roll. The vehicle is chosen from those numbers and confirmed with you before you commit."),
    ),
    section(
      "distance",
      "How long are the common family routes?",
      p("These are estimated road distances and driving times in light traffic, before stops. A family should add time for rest, food and prayer."),
      table(
        ["Route", "Road distance", "Driving time"],
        [
          ["Riyadh to Buraydah", "about 357 km", "about 3 hr 25 min"],
          ["Riyadh to Dammam", "about 411 km", "about 3 hr 55 min"],
          ["Riyadh to Madinah", "about 837 km", "about 7 hr 45 min"],
          ["Riyadh to Makkah", "about 868 km", "about 9 hr 35 min"],
          ["Riyadh to Jeddah", "about 947 km", "about 10 hr 25 min"],
        ],
        {
          hrefs: ["/taxi-saudi-arabia/routes/riyadh-to-buraydah", "/taxi-saudi-arabia/routes/riyadh-to-dammam", "/taxi-saudi-arabia/routes/riyadh-to-madinah", "/taxi-saudi-arabia/routes/riyadh-to-makkah", "/taxi-saudi-arabia/routes/riyadh-to-jeddah"],
          note: "Estimates from OpenStreetMap routing between city centres, for light traffic, reviewed in November 2026. Stops, prayer times and traffic add time.",
        },
      ),
    ),
    cta("Planning a family trip?", "Tell us who is travelling and how many bags. We confirm the vehicle, driver and fare before you commit."),
    section(
      "timing",
      "Timing and stops",
      ul(
        { title: "Leave early on long routes", text: "Starting in the morning gives you daylight for the whole day and leaves time for stops." },
        { title: "Agree the stops in advance", text: "Prayer, a meal, rest and fuel. For very long days, ask about an overnight stop." },
        { title: "Avoid the hottest part of the day for the longest stretches", text: "Summer afternoons are very hot, and a calm car matters with small children." },
        { title: "Plan the arrival", text: "Know where you will be dropped off, and whether the hotel or home can be reached by car." },
      ),
    ),
    section(
      "bag",
      "A short checklist for the day",
      ol(
        { title: "Documents", text: "Identity documents for every passenger, including children." },
        { title: "Medicines", text: "Keep them in a bag you can reach, not in the boot." },
        { title: "Water and snacks", text: "Enough for the first stretch, before the first stop." },
        { title: "Comfort", text: "A light blanket, a small pillow and something for the children." },
        { title: "Chargers", text: "Phones and tablets are easier to manage with a charger within reach." },
        { title: "Contact numbers", text: "The driver's number and a family contact who knows the plan." },
      ),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Passenger transport", href: "/services/passenger-transport", note: "Transport for groups and families" },
        { name: "Taxi and cab services", href: "/services/taxi-cab-services", note: "How we arrange private rides" },
        { name: "Planning a long-distance taxi from Riyadh", href: "/blog/how-to-plan-a-long-distance-taxi-from-riyadh", note: "A checklist" },
        { name: "Intercity routes", href: "/taxi-saudi-arabia/routes", note: "Every route page" },
        { name: "Book a ride", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "Can you arrange a vehicle big enough for a large family?", a: "Tell us the number of people and bags, and the vehicle is chosen to fit them. If one vehicle is not enough, more than one can be planned." },
    { q: "Can I bring a child seat?", a: "Yes, tell us in your request. If you need one provided, ask, and we confirm what is possible for your date." },
    { q: "Can the driver stop for prayer and rest?", a: "Yes. Tell us in advance and the stops are planned with you." },
    { q: "How early should I leave for a long route?", a: "Early in the morning is best, so the day has room for stops and you can arrive in daylight." },
    { q: "Can I book the return in the same message?", a: "Yes. Ask for both directions and give the dates. The fare is confirmed with you before you commit." },
  ],
  takeaways: standardTakeaways("This guide gives estimates. The following are not published here and are agreed with you for each request."),
};
