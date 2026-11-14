import type { Faq } from "./services";

/** Home page content. Wording follows the site rule: nothing is promised that is confirmed per request (fares, times, availability). */

export const hero = {
  eyebrow: "Transport & logistics in Saudi Arabia",
  h1: "Taxi, Freight and Passenger Transport Across Saudi Arabia",
  text: "Request a ride in a [Saudi city](/taxi-saudi-arabia), book an [airport transfer](/taxi-saudi-arabia#airports) or an [intercity trip](/taxi-saudi-arabia/routes), or arrange [freight and cargo](/services/freight-cargo-transport), [equipment moving](/services/equipment-machinery-moving) and [fleet services](/services/contract-fleet-services) for your business. We confirm the vehicle, driver and fare before you commit.",
  chips: ["Taxi & cab rides", "Umrah & Hajj transport", "Airport transfers", "Freight & cargo", "Equipment moving", "Contract fleet"],
  routeChip: "Riyadh to Jeddah, about 950 km",
  fareChip: "Fare confirmed before you commit",
};

export const answer = {
  eyebrow: "At a glance",
  h2: "What is Gulf Elite Transport?",
  text: "Gulf Elite Transport, run by Gulf Elite Transport Group, is a transport and logistics service in Saudi Arabia. It arranges [taxi and cab rides](/services/taxi-cab-services), [airport transfers](/taxi-saudi-arabia#airports) and [intercity trips](/taxi-saudi-arabia/routes) for individuals and organisations, and [freight and cargo transport](/services/freight-cargo-transport), [passenger transport](/services/passenger-transport), [equipment and machinery moving](/services/equipment-machinery-moving) and [contract fleet services](/services/contract-fleet-services) for businesses. Fares, journey times and availability are not published; each request is assessed and confirmed with you before you commit.",
};

export const paths = [
  {
    icon: "bus",
    scene: "taxi-cab-services",
    title: "Taxi & cab rides",
    text: "City rides, airport transfers and [intercity routes](/taxi-saudi-arabia/routes), organised by region, city, area, airport and route so you can find your place quickly.",
    points: ["13 regions and 24 city guides", "12 airport guides", "24 intercity routes"],
    cta: "Find your city or route",
    href: "/taxi-saudi-arabia",
  },
  {
    icon: "truck",
    scene: "freight-cargo-transport",
    title: "Business transport & logistics",
    text: "[Freight and cargo](/services/freight-cargo-transport), [equipment and machinery](/services/equipment-machinery-moving), [containers](/services/container-transportation), [last-mile delivery](/services/last-mile-delivery), [distribution](/services/commercial-distribution-services), [storage](/services/warehousing-storage) and [contract fleets](/services/contract-fleet-services) for operations that move regularly.",
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
  text: "Every region, city, airport and route has its own page with the real places people travel to, notes on getting there and what to tell us when you request a ride. Popular starting points are [taxi in Riyadh](/riyadh-taxi-service), [taxi in Jeddah](/taxi-saudi-arabia/makkah-region/jeddah), [Makkah taxi rides](/taxi-saudi-arabia/makkah-region/makkah), [Madinah taxi rides](/taxi-saudi-arabia/madinah-region/madinah) and [Dammam taxi rides](/taxi-saudi-arabia/eastern-province/dammam). Choose where you are starting and we confirm the vehicle, driver and fare for your request.",
  regionsHeading: "Browse by region",
  citiesHeading: "Popular cities",
  routesHeading: "Popular intercity routes",
  airportsHeading: "Airport transfers",
  note: "Taxi and passenger services are regulated in Saudi Arabia. The arrangements for each ride, including who provides it and which permits apply, are confirmed for each request.",
};

export const servicesIntro = {
  eyebrow: "Business services",
  h2: "Eighteen services, grouped by what you are moving",
  text: "Each service has its own page with what is included, who it is for and the information we need for a quotation. Common starting points are freight and cargo transport, [container transportation](/services/container-transportation), [warehousing and storage](/services/warehousing-storage) and [last-mile delivery](/services/last-mile-delivery). If your requirement combines several, describe the whole picture in one request and we will help you plan it together.",
};

export const process = {
  eyebrow: "How it works",
  h2: "From request to arrival in four steps",
  text: "The same simple process applies to a taxi ride, a pallet or a project move.",
  steps: [
    { title: "Tell us what you need", text: "Where from, where to, when, and who or what is travelling: passengers and bags, cargo, or equipment." },
    { title: "We check and assess", text: "We look at vehicle suitability, route and timing, and confirm whether we can support your request, from a [taxi ride](/services/taxi-cab-services) to an [industrial move](/services/industrial-project-logistics)." },
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
    { icon: "briefcase", title: "Business and personal in one place", text: "Rides for individuals and visitors, and [transport and logistics for companies](/services), handled by one team." },
    { icon: "calendar", title: "One-off or recurring", text: "Request a single ride or delivery, or set up a [scheduled delivery](/services/last-mile-delivery/scheduled-delivery) pattern or [monthly vehicle contracts](/services/contract-fleet-services/monthly-vehicle-contracts) when your needs repeat." },
    { icon: "shield", title: "Honest about limits", text: "Where something needs checking, such as Hajj-season movement that the authorities control, we say so plainly." },
    { icon: "headset", title: "Clear communication", text: "Questions and changes are handled directly, and details are confirmed in writing where it matters. You can [contact our team](/contact) at any time." },
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
    { icon: "factory", title: "Manufacturing", text: "Raw materials in, finished goods out and [equipment moved between production areas](/services/equipment-machinery-moving/industrial-machinery-relocation)." },
    { icon: "hardhat", title: "Construction", text: "[Materials to site](/services/freight-cargo-transport/building-materials-transportation), [plant between locations](/services/equipment-machinery-moving/construction-machinery-relocation) and [workers on schedule](/services/passenger-transport/staff-transportation)." },
    { icon: "cog", title: "Industrial operations", text: "[Heavy equipment](/services/equipment-machinery-moving/heavy-equipment-transportation), [spare parts](/services/spare-parts-automotive-logistics) and regular supply runs." },
    { icon: "briefcase", title: "Corporate businesses", text: "[Corporate passenger transport](/services/passenger-transport/corporate-passenger-transport) for staff and visitors, [airport pickups for visiting staff](/services/passenger-transport/airport-transfers), plus occasional stock or documents." },
    { icon: "store", title: "Retail & distribution", text: "[Retail distribution](/services/commercial-distribution-services/retail-distribution) gets stock to the right place on the right day, with recurring arrangements." },
    { icon: "calendar", title: "Events & hospitality", text: "Guests by [event passenger transport](/services/passenger-transport/event-passenger-transport), plus [exhibition and event equipment](/services/trade-show-exhibition-logistics) around event dates." },
    { icon: "building", title: "Commercial enterprises", text: "Offices, clinics and workshops with varied transport needs, from [office relocation](/services/furniture-household-moving/office-relocation) to regular deliveries." },
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
    { topic: "Service arrangements", alone: "Fixed options that may not suit your volumes.", with: "Flexible arrangements from one-off jobs to contract fleets." },
    { topic: "Recurring needs", alone: "The same request repeated and re-explained every time.", with: "[Recurring delivery](/services/last-mile-delivery/scheduled-delivery) arranged once and reused." },
    { topic: "Pricing clarity", alone: "Costs can become clear only after work begins.", with: "A fare or quotation provided before you commit to an arrangement." },
  ],
};

export const faqs: Faq[] = [
  {
    q: "What is Gulf Elite Transport?",
    a: "Gulf Elite Transport, run by Gulf Elite Transport Group, is a transport and logistics service in Saudi Arabia. It arranges [taxi and cab rides](/services/taxi-cab-services), airport transfers and intercity trips, and freight and cargo, [passenger transport](/services/passenger-transport), equipment moving and fleet services for businesses. Fares and availability are confirmed for each request.",
  },
  {
    q: "Where can I request a taxi or cab?",
    a: "Across Saudi Arabia. The taxi pages are organised by region, city, area, airport and intercity route, starting with the main cities such as [Riyadh](/riyadh-taxi-service), [Jeddah](/taxi-saudi-arabia/makkah-region/jeddah), [Makkah](/taxi-saudi-arabia/makkah-region/makkah), [Madinah](/taxi-saudi-arabia/madinah-region/madinah) and [Dammam](/taxi-saudi-arabia/eastern-province/dammam). Requests from other towns can be discussed, and availability is confirmed for each request.",
  },
  {
    q: "Are your fares fixed?",
    a: "No standard fares are published. We confirm the fare for your taxi or cab ride, or a quotation for freight and other services, before you commit to anything.",
  },
  {
    q: "Who provides the rides?",
    a: "Rides are arranged with licensed local drivers and transport providers in Saudi Arabia. Gulf Elite Transport Group takes your request, passes it to a suitable provider and confirms the vehicle, driver and fare with you before you commit.",
  },
  {
    q: "Can I book an airport transfer?",
    a: "Yes. Send your flight details, terminal if you know it, your destination and the number of passengers and bags. Each airport guide explains what to include.",
  },
  {
    q: "Do you provide Hajj or Umrah transport?",
    a: "Yes. We arrange taxi and car transport for Umrah and Hajj visitors in Makkah, Madinah and Jeddah: [airport transfers](/umrah-hajj-taxi/jeddah-airport-to-makkah), rides to the Haram, journeys between the holy cities and [group transport](/umrah-hajj-taxi/group-transport-for-umrah) of any size. Movement during Hajj is controlled by the authorities, so we confirm what can be arranged for your dates. See [Umrah and Hajj taxi](/umrah-hajj-taxi).",
  },
  {
    q: "What transport services does Gulf Elite Transport provide?",
    a: "Gulf Elite Transport provides eighteen services in four groups: freight and cargo, passenger transport, equipment and industrial transportation, and fleet and distribution. They include freight and cargo transport, [international freight forwarding](/services/international-freight-forwarding), [container transportation](/services/container-transportation), [express and urgent delivery](/services/express-urgent-delivery), [refrigerated transportation](/services/refrigerated-transportation), [passenger transport](/services/passenger-transport), equipment and machinery moving, [industrial and project logistics](/services/industrial-project-logistics), contract fleet services, [last-mile delivery](/services/last-mile-delivery), [commercial distribution](/services/commercial-distribution-services), [warehousing and storage](/services/warehousing-storage), [vehicle transportation](/services/vehicle-transportation), [furniture and household moving](/services/furniture-household-moving), [packaging and cargo handling](/services/packaging-cargo-handling), [trade show and exhibition logistics](/services/trade-show-exhibition-logistics), [spare parts and automotive logistics](/services/spare-parts-automotive-logistics), and taxi and cab services. You can request one-off jobs or recurring arrangements.",
  },
  {
    q: "Do you transport heavy machinery?",
    a: "[Heavy machinery](/services/equipment-machinery-moving/heavy-equipment-transportation) and [industrial equipment moves](/services/equipment-machinery-moving/industrial-machinery-relocation) can be requested. Because each load is different, we first assess its weight, dimensions and the access at both sites, then confirm what is possible before agreeing to a quotation.",
  },
  {
    q: "Do you provide monthly fleet contracts?",
    a: "[Monthly vehicle contracts](/services/contract-fleet-services/monthly-vehicle-contracts) and other recurring fleet arrangements can be discussed under our contract fleet services. Share your routes, volumes and expected duration, and we will respond with a proposal.",
  },
  {
    q: "How can I request a quote or a ride?",
    a: "Use the request form on this page, the call and WhatsApp buttons where they are shown, or [contact us](/contact). Describe the service, the pickup and drop-off or delivery locations, your preferred date and the key details about the passengers, cargo or equipment.",
  },
  {
    q: "How can I confirm service availability in my area?",
    a: "Availability depends on your locations, the type of service and the dates. Send those details and we confirm whether we can support the request, or say clearly if we cannot, so you can look at other options without losing time. For intercity trips, see the route guides.",
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

export const fleet = {
  eyebrow: "Choose the right vehicle",
  h2: "Vehicles for every group size",
  text: "Tell us how many passengers and bags you have and we recommend the right vehicle. These are typical capacities; the exact vehicle and its seats and luggage space are confirmed for each booking. If you carry a lot of luggage, choose the next size up.",
  items: [
    { name: "Sedan", pax: "1-4", bags: "2 large bags", best: "Individuals, couples and small families on city and airport rides." },
    { name: "SUV", pax: "4-6", bags: "3-4 large bags", best: "Families wanting more space and comfort, including longer trips." },
    { name: "Family van", pax: "6-8", bags: "5-7 large bags", best: "Extended families and small groups travelling together." },
    { name: "Group van", pax: "8-12", bags: "8-10 large bags", best: "Larger groups with luggage, airport transfers and intercity trips." },
    { name: "Minibus", pax: "13-29", bags: "Ample luggage space", best: "Organised groups, events and tours." },
    { name: "Coach", pax: "30+", bags: "Under-coach storage", best: "Large groups and coordinated corporate or event travel." },
  ],
  note: "Child seats and special assistance can be requested; availability is confirmed per booking.",
};

export const pricing = {
  eyebrow: "Pricing",
  h2: "A clear price before you commit",
  points: [
    { title: "One price per vehicle", text: "Quotes are for the whole vehicle, not per person, so a full car costs the same as one with a single passenger." },
    { title: "Confirmed before you book", text: "We confirm the vehicle, driver and price with you first. You agree to it before anything is arranged." },
    { title: "Told you what affects it", text: "Distance, vehicle size, waiting time, luggage and time of day can change a price. We explain what applies to your trip." },
  ],
  tableTitle: "Fixed prices on popular routes",
  tableNote: "Prices are per vehicle in Saudi riyals (SAR) and confirmed when you book.",
  cta: "Get your price",
};

export const umrah = {
  eyebrow: "Makkah & Madinah",
  h2: "Taxi and transport for Umrah and Hajj visitors",
  text: "Pilgrims and visitors travel to Makkah and Madinah every month of the year. We arrange the rides around the journey: from the airport to your hotel, from your hotel to the Haram and back, and between the two holy cities, for a single traveller or a large group. Tell us your group and your luggage and we arrange the right vehicles.",
  items: [
    { title: "Airport to hotel", text: "From [Jeddah airport to Makkah](/umrah-hajj-taxi/jeddah-airport-to-makkah), [Jeddah airport to Madinah](/umrah-hajj-taxi/jeddah-airport-to-madinah) or [Madinah airport to your hotel](/umrah-hajj-taxi/madinah-airport-to-madinah-hotel)." },
    { title: "Hotel to the Haram", text: "Rides to [Al-Masjid al-Haram](/umrah-hajj-taxi/makkah-hotel-to-haram) and the [Prophet's Mosque](/umrah-hajj-taxi/madinah-hotel-to-prophets-mosque), with a timed pickup afterwards." },
    { title: "Between the holy cities", text: "[Madinah to Makkah for Umrah](/taxi-saudi-arabia/routes/makkah-to-madinah), with a stop at the Miqat, and [Makkah to Madinah](/taxi-saudi-arabia/routes/makkah-to-madinah) afterwards." },
    { title: "Groups of any size", text: "Cars, vans, minibuses and coaches, arranged together for your party: [group transport for Umrah](/umrah-hajj-taxi/group-transport-for-umrah)." },
    { title: "Families and elders", text: "Pickups and stops planned around slower walkers and young children: [family and elderly pilgrims](/umrah-hajj-taxi/family-and-elderly-pilgrims)." },
    { title: "Ramadan and Hajj", text: "Plan early for the busiest weeks: [Ramadan Umrah transport](/umrah-hajj-taxi/ramadan-umrah-transport) and [Hajj season transport](/umrah-hajj-taxi/hajj-season-transport)." },
  ],
  cta: "See all Umrah & Hajj rides",
};
