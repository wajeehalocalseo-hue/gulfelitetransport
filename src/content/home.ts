import type { Faq } from "./services";

/** Home page content. Wording follows the site rule: nothing is promised that is confirmed per request (fares, times, availability). */

export const hero = {
  eyebrow: "Transport & logistics in Saudi Arabia",
  h1: "Taxi, Freight and Passenger Transport Across Saudi Arabia",
  text: "Request a ride in a Saudi city, book an airport transfer or an intercity trip, or arrange freight, equipment and fleet services for your business. We confirm the vehicle, driver and fare before you commit.",
  chips: ["Taxi & cab rides", "Airport transfers", "Freight & cargo", "Equipment moving", "Contract fleet"],
  routeChip: "Riyadh to Jeddah, about 950 km",
  fareChip: "Fare confirmed before you commit",
};

export const answer = {
  eyebrow: "At a glance",
  h2: "What is Gulf Elite Transport?",
  text: "Gulf Elite Transport, run by Gulf Elite Transport Group, is a transport and logistics service in Saudi Arabia. It arranges taxi and cab rides, airport transfers and intercity trips for individuals and organisations, and freight, cargo, passenger transport, equipment moving and contract fleet services for businesses. Fares, journey times and availability are not published; each request is assessed and confirmed with you before you commit.",
};

export const paths = [
  {
    icon: "bus",
    scene: "taxi-cab-services",
    title: "Taxi & cab rides",
    text: "City rides, airport transfers and intercity routes, organised by region, city, area, airport and route so you can find your place quickly.",
    points: ["13 regions and 24 city guides", "12 airport guides", "24 intercity routes"],
    cta: "Find your city or route",
    href: "/taxi-saudi-arabia",
  },
  {
    icon: "truck",
    scene: "freight-cargo-transport",
    title: "Business transport & logistics",
    text: "Freight and cargo, equipment and machinery, containers, delivery, distribution, storage and contract fleets for operations that move regularly.",
    points: ["One-off jobs or recurring arrangements", "Quotation before you commit", "Services for every stage of a movement"],
    cta: "Explore all services",
    href: "/services",
  },
];

export const finder = {
  eyebrow: "Start here",
  h2: "What do you need to move?",
  text: "Pick the closest match. Each page explains what to include in your request.",
  items: [
    { icon: "bus", title: "A ride in my city", text: "Hotels, offices, malls and attractions.", href: "/taxi-saudi-arabia" },
    { icon: "globe", title: "An airport transfer", text: "Pickups and drop-offs at Saudi airports.", href: "/taxi-saudi-arabia/airports/king-khalid-international-airport" },
    { icon: "network", title: "A trip between cities", text: "Riyadh, Jeddah, Makkah, Dammam and more.", href: "/taxi-saudi-arabia/routes" },
    { icon: "truck", title: "Goods or cargo", text: "Commercial freight, pickup and delivery.", href: "/services/freight-cargo-transport" },
    { icon: "cog", title: "Machinery or equipment", text: "Heavy and industrial equipment moving.", href: "/services/equipment-machinery-moving" },
    { icon: "contract", title: "A fleet on contract", text: "Dedicated vehicles for recurring needs.", href: "/services/contract-fleet-services" },
    { icon: "box", title: "Deliveries to customers", text: "Last-mile and scheduled delivery.", href: "/services/last-mile-delivery" },
    { icon: "warehouse", title: "Storage before delivery", text: "Short and long-term storage and handling.", href: "/services/warehousing-storage" },
  ],
};

export const taxi = {
  eyebrow: "Taxi & cab rides",
  h2: "Taxi and cab rides across Saudi Arabia, city by city",
  text: "Every region, city, airport and route has its own page with the real places people travel to, notes on getting there and what to tell us when you request a ride. Choose where you are starting and we confirm the vehicle, driver and fare for your request.",
  regionsHeading: "Browse by region",
  citiesHeading: "Popular cities",
  routesHeading: "Popular intercity routes",
  airportsHeading: "Airport transfers",
  note: "Taxi and passenger services are regulated in Saudi Arabia. The arrangements for each ride, including who provides it and which permits apply, are confirmed for each request.",
};

export const servicesIntro = {
  eyebrow: "Business services",
  h2: "Eighteen services, grouped by what you are moving",
  text: "Each service has its own page with what is included, who it is for and the information we need for a quotation. If your requirement combines several, describe the whole picture in one request and we will help you plan it together.",
};

export const process = {
  eyebrow: "How it works",
  h2: "From request to arrival in four steps",
  text: "The same simple process applies to a taxi ride, a pallet or a project move.",
  steps: [
    { title: "Tell us what you need", text: "Where from, where to, when, and who or what is travelling: passengers and bags, cargo, or equipment." },
    { title: "We check and assess", text: "We look at vehicle suitability, route and timing, and confirm whether we can support your request." },
    { title: "You get the confirmation", text: "The vehicle, driver details where relevant and the fare or quotation are confirmed with you before you commit." },
    { title: "We carry it out", text: "Pickup and delivery run to the agreed plan, and any change is communicated promptly." },
  ],
};

export const why = {
  eyebrow: "Why Gulf Elite Transport",
  h2: "How the service is designed to work",
  text: "No big claims here. These are the principles behind the service, and you can judge them from your first request.",
  items: [
    { icon: "check", title: "Confirmed before you commit", text: "The vehicle, driver and fare or quotation are confirmed first. Nothing is arranged until you agree." },
    { icon: "network", title: "Organised by place", text: "Regions, cities, areas, airports and routes each have a guide, so you can see how your trip works before you ask." },
    { icon: "briefcase", title: "Business and personal in one place", text: "Rides for individuals and visitors, and transport and logistics for companies, handled by one team." },
    { icon: "calendar", title: "One-off or recurring", text: "Request a single ride or delivery, or set up a regular pattern or contract fleet when your needs repeat." },
    { icon: "shield", title: "Honest about limits", text: "Where something needs checking or is not offered, such as pilgrim group transport, we say so plainly." },
    { icon: "headset", title: "Clear communication", text: "Questions and changes are handled directly, and details are confirmed in writing where it matters." },
  ],
};

export const stats = {
  eyebrow: "On this website",
  h2: "Guides to plan your trip or shipment",
  note: "Counts of the dedicated pages published on this site.",
};

export const about = {
  eyebrow: "About Gulf Elite Transport",
  h2: "Transport support for businesses that need things to move on time",
  paragraphs: [
    "Gulf Elite Transport is a transport and logistics service for businesses and organisations. We help customers arrange the movement of goods, people and equipment, and we offer contract fleet arrangements for operations that need transport on a regular basis. Our services fall into four groups: freight and cargo (including international freight forwarding, container transportation, express and urgent delivery and refrigerated transportation), passenger transport, equipment and industrial transportation, and fleet and distribution (contract fleet, last-mile delivery, commercial distribution, warehousing and storage, vehicle transportation, furniture and household moving, packaging and cargo handling, trade show and exhibition logistics, spare parts and automotive logistics, and taxi and cab services).",
    "Our approach is straightforward. We start by understanding what you need to move, where it is going and when it needs to arrive. We then assess the requirement, confirm availability for your locations and dates, and provide a clear quotation. Nothing is arranged until you are comfortable with the details. This keeps the process transparent and helps prevent the misunderstandings that tend to cause delays on the day of a movement.",
    "We serve customers who value dependable coordination: operations managers moving stock between sites, project teams relocating machinery, human resources teams arranging staff transport and administrators booking airport transfers for visiting colleagues. Whatever the size of the request, the aim is the same, to make transport one less thing that your team has to worry about.",
  ],
};

export const industries = {
  eyebrow: "Who we help",
  h2: "Transport for the sectors that depend on moving things",
  text: "These are the customer segments our services are designed to support. Listing a sector describes the type of requirement we can help with and does not imply a partnership with any named company.",
  items: [
    { icon: "factory", title: "Manufacturing", text: "Raw materials in, finished goods out and equipment between production areas." },
    { icon: "hardhat", title: "Construction", text: "Materials to site, plant between locations and workers on schedule." },
    { icon: "cog", title: "Industrial operations", text: "Heavy equipment, spare parts and regular supply runs." },
    { icon: "briefcase", title: "Corporate businesses", text: "Staff, visitors and airport transfers, plus occasional stock or documents." },
    { icon: "store", title: "Retail & distribution", text: "Stock to the right place on the right day, with recurring arrangements." },
    { icon: "calendar", title: "Events & hospitality", text: "Guests, staff and event equipment around event dates." },
    { icon: "building", title: "Commercial enterprises", text: "Offices, clinics and workshops with varied transport needs." },
    { icon: "truck", title: "Equipment suppliers", text: "Machinery delivered safely, with vehicle suitability and loading planned." },
  ],
};

export const benefits = {
  eyebrow: "Customer benefits",
  h2: "Why use a coordinated transport service?",
  text: "Arranging transport yourself can work for occasional jobs, but it becomes time-consuming as requirements grow. This comparison shows where a coordinated service can help.",
  rows: [
    { topic: "Transport planning", alone: "Each job planned separately, often at short notice.", with: "Requirements assessed up front, with vehicle and route matched to the job." },
    { topic: "Communication", alone: "Several providers and contacts to chase for updates.", with: "Centralised communication through one team." },
    { topic: "Service arrangements", alone: "Fixed options that may not suit your volumes.", with: "Flexible arrangements from one-off jobs to contracts." },
    { topic: "Recurring needs", alone: "The same request repeated and re-explained every time.", with: "Recurring transport arranged once and reused." },
    { topic: "Pricing clarity", alone: "Costs can become clear only after work begins.", with: "A fare or quotation provided before you commit to an arrangement." },
  ],
};

export const faqs: Faq[] = [
  {
    q: "What is Gulf Elite Transport?",
    a: "Gulf Elite Transport, run by Gulf Elite Transport Group, is a transport and logistics service in Saudi Arabia. It arranges taxi and cab rides, airport transfers and intercity trips, and freight, cargo, passenger transport, equipment moving and fleet services for businesses. Fares and availability are confirmed for each request.",
  },
  {
    q: "Where can I request a taxi or cab?",
    a: "Across Saudi Arabia. The taxi pages are organised by region, city, area, airport and intercity route, starting with the main cities such as Riyadh, Jeddah, Makkah, Madinah and Dammam. Requests from other towns can be discussed, and availability is confirmed for each request.",
  },
  {
    q: "Are your fares fixed?",
    a: "No standard fares are published. We confirm the fare for your ride, or a quotation for freight and other services, before you commit to anything.",
  },
  {
    q: "Can I book an airport transfer?",
    a: "Yes. Send your flight details, terminal if you know it, your destination and the number of passengers and bags. Each airport page explains what to include.",
  },
  {
    q: "Do you provide Hajj or Umrah group transport?",
    a: "No. The taxi pages cover individual ride requests only. Organised pilgrim or Hajj group transport is not offered through this website.",
  },
  {
    q: "What transport services does Gulf Elite Transport provide?",
    a: "Gulf Elite Transport provides eighteen services in four groups: freight and cargo, passenger transport, equipment and industrial transportation, and fleet and distribution. They include freight and cargo transport, international freight forwarding, container transportation, express and urgent delivery, refrigerated transportation, passenger transport, equipment and machinery moving, industrial and project logistics, contract fleet services, last-mile delivery, commercial distribution, warehousing and storage, vehicle transportation, furniture and household moving, packaging and cargo handling, trade show and exhibition logistics, spare parts and automotive logistics, and taxi and cab services. You can request one-off jobs or recurring arrangements.",
  },
  {
    q: "Do you transport heavy machinery?",
    a: "Heavy machinery and industrial equipment moves can be requested. Because each load is different, we first assess its weight, dimensions and the access at both sites, then confirm what is possible before agreeing to a quotation.",
  },
  {
    q: "Do you provide monthly fleet contracts?",
    a: "Monthly and other recurring fleet arrangements can be discussed under our contract fleet services. Share your routes, volumes and expected duration, and we will respond with a proposal.",
  },
  {
    q: "How can I request a quote or a ride?",
    a: "Use the request form on this page, or the call and WhatsApp buttons where they are shown. Describe the service, the pickup and drop-off or delivery locations, your preferred date and the key details about the passengers, cargo or equipment.",
  },
  {
    q: "How can I confirm service availability in my area?",
    a: "Availability depends on your locations, the type of service and the dates. Send those details and we confirm whether we can support the request, or say clearly if we cannot, so you can look at other options without losing time.",
  },
];

export const ctaBand = {
  h2: "Ready to book a ride or plan a shipment?",
  text: "Tell us where you are going and what is travelling. We reply with the confirmation or the questions we need answered.",
};

export const formIntro = {
  eyebrow: "Request a ride or a quote",
  h2: "Tell us where and what",
  text: "Complete the form with as much detail as you can. A clear description lets us assess your request faster and respond with a confirmation, a quotation or any questions we need answered. There is no obligation, and nothing is arranged until you confirm.",
};
