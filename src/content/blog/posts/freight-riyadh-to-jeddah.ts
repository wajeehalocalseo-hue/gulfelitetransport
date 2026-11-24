import { cta, links, ol, p, section, standardTakeaways, table, ul, type Article } from "../types";

/** Figures: OpenStreetMap routing, Riyadh to Jeddah city centres (946.5 km). Freight transit times are not given, because a loaded truck differs from a car and the time is confirmed per request. */
export const post: Article = {
  slug: "how-to-book-freight-from-riyadh-to-jeddah",
  h1: "How to Book Freight from Riyadh to Jeddah: What to Prepare Before the Truck Arrives",
  description: "Booking freight from Riyadh to Jeddah: what to prepare, how to choose the vehicle, what to put in your request, and what is confirmed for each load.",
  category: "Freight and logistics",
  tags: ["Freight", "Riyadh to Jeddah", "Cargo transport", "Trucks", "Logistics"],
  published: "2026-11-25",
  answer:
    "To book freight from Riyadh to Jeddah, send a description of the cargo with its weight and size, the pickup and delivery addresses, who will load and unload, and your date. The road is about 947 km, but a loaded truck is slower than a car, so the transit time, the vehicle and the price are confirmed for each load and are not published as one figure.",
  sections: [
    section(
      "route",
      "The route in one paragraph",
      p("Riyadh and Jeddah are about 947 km apart by road (946.5 km in our routing data). That is a car estimate for light traffic of about 10 hours 25 minutes. A loaded truck is slower and follows its own rules and rest times, so do not plan around the car figure. The transit time for your cargo is confirmed when your request is confirmed."),
      p("For the passenger side of this route, see the [Riyadh to Jeddah taxi page](/taxi-saudi-arabia/routes/riyadh-to-jeddah). Freight is arranged through the [freight and cargo transport](/services/freight-cargo-transport) service."),
    ),
    section(
      "prepare",
      "What to prepare before you ask for a quote",
      ol(
        { title: "A clear description of the cargo", text: "What it is, how many items, and whether it is fragile, heavy or needs to stay upright." },
        { title: "Weight and size", text: "The total weight and the length, width and height of the largest item. If it is on pallets, say how many." },
        { title: "Packing", text: "Whether it is already packed, or you need packing help." },
        { title: "Pickup details", text: "The address, the access (a gate, a loading dock or a street) and the time window." },
        { title: "Delivery details", text: "The address in Jeddah, a contact person, and the hours the site is open." },
        { title: "Loading and unloading", text: "Who loads, who unloads, and whether equipment such as a forklift is available at each end." },
        { title: "Your date", text: "The day the cargo must leave, and the day it must arrive." },
      ),
    ),
    cta("Have a load for Jeddah?", "Send the cargo, weight, size and addresses on WhatsApp. We confirm the vehicle and the price before you commit."),
    section(
      "vehicle",
      "Choosing the vehicle",
      p("The right vehicle depends on the size and weight of the load and on how much space you need. This is a general guide. We confirm the vehicle for your request."),
      table(
        ["Load", "What usually fits", "Related service"],
        [
          ["A few boxes or a small item", "A pickup or a van", "Express and urgent delivery"],
          ["Furniture and household goods", "A van or a closed truck", "Furniture and household moving"],
          ["Pallets or commercial goods", "A truck", "Freight and cargo transport"],
          ["Goods that must stay cold", "A refrigerated vehicle", "Refrigerated transportation"],
          ["Machines and equipment", "A truck or trailer suited to the load", "Equipment and machinery moving"],
          ["A container", "A vehicle for containers", "Container transportation"],
        ],
        {
          hrefs: ["/services/express-urgent-delivery", "/services/furniture-household-moving", "/services/freight-cargo-transport", "/services/refrigerated-transportation", "/services/equipment-machinery-moving", "/services/container-transportation"],
          note: "A general guide, not a quote. The vehicle is confirmed for each request.",
        },
      ),
    ),
    section(
      "confirm",
      "What is confirmed for each load",
      ul(
        { title: "The vehicle", text: "The type and size for your cargo." },
        { title: "The price", text: "No standard prices are published. The price depends on the cargo, the vehicle, the date and the service." },
        { title: "The transit time", text: "Confirmed with you, since a loaded truck differs from a car." },
        { title: "Who handles loading and unloading", text: "Agreed before the pickup, so nobody arrives without the right equipment." },
        { title: "Documents", text: "Ask what paperwork you need for your goods, and keep it with the load." },
      ),
      p("If the load has special needs, such as height, weight or fragile items, mention them at the start, so the quote is right the first time."),
    ),
    section(
      "related",
      "Related pages",
      links(
        { name: "Freight and cargo transport", href: "/services/freight-cargo-transport", note: "The main freight service" },
        { name: "Express and urgent delivery", href: "/services/express-urgent-delivery", note: "For small, fast loads" },
        { name: "Packaging and cargo handling", href: "/services/packaging-cargo-handling", note: "Packing and loading" },
        { name: "Container transportation", href: "/services/container-transportation", note: "Port and container moves" },
        { name: "Book a ride or a load", href: "/book", note: "The booking form" },
      ),
    ),
  ],
  faq: [
    { q: "How long does freight take from Riyadh to Jeddah?", a: "It depends on the vehicle, the load and the schedule. The road is about 947 km, but a loaded truck is slower than a car, so the time is confirmed for each request." },
    { q: "What do you need to give me a price?", a: "A description of the cargo, its weight and size, the pickup and delivery addresses, who loads and unloads, and your date." },
    { q: "Can you help with packing?", a: "Packing and cargo handling is one of our services. Say in your request what help you need." },
    { q: "Can I send a small parcel as well as a large load?", a: "Yes. Describe what you have, and the right service and vehicle are confirmed for it." },
    { q: "Do you publish standard freight prices?", a: "No. The price depends on the cargo, the vehicle, the date and the service, so it is confirmed with you before you commit." },
  ],
  takeaways: standardTakeaways("This guide is general. The following are not published here and are agreed with you for each load."),
};
