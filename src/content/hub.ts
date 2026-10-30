import type { Faq } from "./services";

export const hubAnswer = {
  h2: "What transport services does Gulf Elite Transport provide?",
  answer:
    "Gulf Elite Transport provides twelve transport and logistics services for businesses and organisations: freight and cargo (including international freight forwarding, container transportation, express and urgent delivery and refrigerated transportation), passenger transport, equipment and industrial transportation, and fleet and distribution services. Every request is assessed individually and you receive a clear quotation before you commit. Availability depends on the pickup and delivery locations, the type of service and the dates, and is confirmed for each request.",
  more: "Together they cover business transportation services from commercial cargo transportation and corporate passenger transport to industrial machinery relocation and recurring business transport. Every service follows the same principle: describe what you need, receive an assessment and a quotation, and confirm only when you are comfortable with the plan.",
};

export const hubAudience = {
  h2: "Who are these services designed for?",
  answer:
    "These services are designed for businesses and organisations that need to move goods, passengers or equipment, and for those who need that transport on a recurring basis. Typical customers are manufacturers, contractors, retailers and distributors, hotels and event organisers, corporate teams and equipment suppliers.",
};

/** Answer-first explanation of each service, written for the overview page (the service pages go deeper). */
export const hubQa: Record<
  string,
  { q: string; a: string; pointsLabel: string; points: "includes" | "steps" }
> = {
  "freight-cargo-transport": {
    q: "What is included in freight and cargo transport?",
    a: "Freight and cargo transport covers the road movement of commercial goods between a pickup location and a delivery location, together with the coordination around it: pickup and delivery arrangements, route and schedule planning and shipment handling information. It suits one-off shipments as well as repeat movements.",
    pointsLabel: "Included:",
    points: "includes",
  },
  "passenger-transport": {
    q: "What passenger transportation options are available?",
    a: "Passenger transport covers staff transportation, corporate passenger movement, airport passenger transfers, event transportation and scheduled recurring passenger movement. The right option depends on the number of passengers, the route and the timing.",
    pointsLabel: "Options:",
    points: "includes",
  },
  "equipment-machinery-moving": {
    q: "How does equipment and machinery moving work?",
    a: "It starts with the equipment type, weight and dimensions and the access at both sites. We use that information to assess vehicle suitability and the loading and unloading arrangements, confirm what is possible, and provide a quotation before the move is agreed.",
    pointsLabel: "The process:",
    points: "steps",
  },
  "contract-fleet-services": {
    q: "What are contract fleet services?",
    a: "Contract fleet services are dedicated fleet arrangements and monthly vehicle contracts for businesses with recurring transport requirements. You agree the requirement once and rely on a consistent arrangement for an agreed period, instead of booking each job separately.",
    pointsLabel: "Included:",
    points: "includes",
  },
  "international-freight-forwarding": {
    q: "What is international freight forwarding?",
    a: "International freight forwarding is the planning and coordination of goods that move between countries, including routing, documentation awareness and the handover between each stage of the journey. Customs responsibilities are agreed clearly before a shipment moves.",
    pointsLabel: "Included:",
    points: "includes",
  },
  "container-transportation": {
    q: "How does container transportation work?",
    a: "A container movement is planned around the container size and weight, the collection point, and access at the delivery site. We assess vehicle suitability and timing, confirm what can be supported, and provide a quotation before collection and delivery are arranged.",
    pointsLabel: "The process:",
    points: "steps",
  },
  "last-mile-delivery": {
    q: "What is last-mile delivery?",
    a: "Last-mile delivery is the final stage of a goods journey, moving goods from a local hub or storage point to the recipient. It is planned around addresses, delivery windows and handover requirements, for one-off runs or recurring routes.",
    pointsLabel: "Included:",
    points: "includes",
  },
  "express-urgent-delivery": {
    q: "How do express and urgent deliveries work?",
    a: "Express and urgent delivery is the priority transport of time-sensitive shipments. You state the deadline, we check whether it can be supported for the route and timing, and only then confirm a quotation. No delivery time is assumed in advance.",
    pointsLabel: "The process:",
    points: "steps",
  },
  "warehousing-storage": {
    q: "What does warehousing and storage involve?",
    a: "Warehousing and storage is the holding of goods between receipt and onward movement, together with the handling needed to receive and release them. It is planned around what is stored, how much, for how long and how it connects to onward transport.",
    pointsLabel: "Included:",
    points: "includes",
  },
  "refrigerated-transportation": {
    q: "How is refrigerated transportation arranged?",
    a: "Refrigerated transportation starts with the goods and the temperature range they must stay within. We confirm individually whether a suitable arrangement can be supported for the route and timing before a quotation is agreed.",
    pointsLabel: "The process:",
    points: "steps",
  },
  "industrial-project-logistics": {
    q: "What is industrial and project logistics?",
    a: "Industrial and project logistics is the planning and coordination of transport for projects where equipment and materials arrive at a site over time. It is organised by project phase, with site access and delivery sequence agreed in advance.",
    pointsLabel: "Included:",
    points: "includes",
  },
  "commercial-distribution-services": {
    q: "What are commercial distribution services?",
    a: "Commercial distribution is the planned, often repeated movement of goods from a supplier or storage point to several business customers, stores or sites. It is built around routes, schedules and volumes and can run as a recurring arrangement.",
    pointsLabel: "Included:",
    points: "includes",
  },
};

export const pricingFactors = [
  "Distance and route",
  "Type, size and weight of the load, or number of passengers",
  "Vehicle type required",
  "Loading, unloading and waiting time",
  "Timing, including urgency and recurring schedules",
];

export const hubQuotation = {
  h2: "Quotation, pricing and availability",
  text: "Three questions come up before almost every request. Here are the short answers.",
  info: {
    q: "What information is required for a quotation?",
    a: "To prepare a quotation we need the service you want, the pickup and delivery locations, your preferred date and details of what is moving: the cargo type and weight, the number of passengers, or the equipment dimensions. The more precise the details, the faster we can assess your request.",
    list: [
      "The service you need",
      "Pickup and delivery locations",
      "Preferred date and any time window",
      "Details of the cargo, passengers or equipment",
      "Site access, loading or luggage requirements",
      "A contact person and phone number",
    ],
  },
  pricing: {
    q: "How is service pricing determined?",
    a: "Prices are not published because they depend on the details of each request. Every quotation is based on the factors below, and you receive it before you commit to anything.",
  },
  availability: {
    q: "How is availability confirmed?",
    a: "Availability is confirmed individually for every request, based on the pickup and delivery locations, the type of service and the dates. We reply with a quotation if we can support the request, or explain clearly if we cannot, so that you can look at other options without losing time.",
    steps: [
      "You send the service, locations and date",
      "We check whether we can support that route and timing",
      "We reply with a quotation or a clear explanation",
      "Once you confirm, the arrangement is agreed in detail",
    ],
  },
};

export const hubFacts = {
  h2: "Service facts at a glance",
  rows: [
    { label: "Who the services are for", value: "Businesses and organisations that need to move goods, passengers or equipment, including recurring needs" },
    { label: "How to request a service", value: "Use the quote form on this page, or the contact page" },
    { label: "Quotation", value: "Provided before you commit; nothing is arranged until you confirm" },
    { label: "Pricing basis", value: "Quotation-based, depending on the details of each request" },
    { label: "Availability", value: "Confirmed individually for each request, never assumed" },
  ],
};

export const groupsIntro = {
  h2: "Services grouped by what you need to move",
  text: "Start with the kind of movement you have in mind. Goods, people, heavy equipment and recurring supply each have their own service, with a dedicated page covering what is included and what we need to prepare a quotation.",
};

export const midCta = {
  h2: "Not sure which service fits?",
  text: "Describe your requirement in your own words. We will tell you which service suits it best, and what we need to prepare your quotation.",
};

export const hubOnPage = [
  { href: "#services", label: "All services" },
  { href: "#guide", label: "Find your service" },
  { href: "#answer", label: "Overview" },
  { href: "#compare", label: "Compare" },
  { href: "#quotation", label: "Quotation" },
  { href: "#faq", label: "FAQ" },
  { href: "#quote", label: "Get a quote" },
];

export const hubIndustries = {
  h2: "Industries these services support",
  text: "These are the types of customer our services are designed for. They describe typical requirements and do not imply partnerships with any named company.",
  items: [
    { title: "Manufacturing", text: "Materials in, finished goods out and equipment between plants." },
    { title: "Construction", text: "Materials, plant and workers moving to project sites." },
    { title: "Industrial operations", text: "Spare parts, heavy equipment and regular supply runs." },
    { title: "Corporate businesses", text: "Staff transport, visitor transfers and inter-office movements." },
    { title: "Retail and distribution", text: "Stock replenishment and scheduled supply to stores." },
    { title: "Events and hospitality", text: "Guest transport and one-off equipment deliveries." },
    { title: "Commercial enterprises", text: "Varied transport needs for offices, workshops and clinics." },
    { title: "Equipment suppliers", text: "Safe delivery of machinery and equipment to customers." },
  ],
};

export const hubProcess = {
  h2: "How a service request works",
  steps: [
    { title: "Share your requirement", text: "Tell us what needs to move, where and when." },
    { title: "Receive an assessment", text: "We review the details and confirm what can be supported." },
    { title: "Confirm the arrangement", text: "You accept a quotation and the plan is agreed." },
    { title: "Coordinate delivery", text: "The movement is carried out and changes are communicated." },
  ],
};

export const hubWhy = {
  h2: "Why businesses choose Gulf Elite Transport",
  items: [
    "Flexible options from one-off jobs to recurring arrangements",
    "A clear quotation before you commit",
    "Professional communication from enquiry to delivery",
    "Several transport categories under one coordinated service",
    "Support for recurring business requirements",
    "Availability confirmed individually, never assumed",
  ],
};

export const selectionGuide = {
  h2: "Which service do I need?",
  text: "If you are not sure where your requirement fits, use this guide. When a request spans more than one service, describe the whole picture in a single enquiry.",
  rows: [
    { need: "I need to move commercial goods from one place to another", slug: "freight-cargo-transport" },
    { need: "I need to transport staff, guests or an event group", slug: "passenger-transport" },
    { need: "I need to move heavy machinery or equipment", slug: "equipment-machinery-moving" },
    { need: "I need transport on a regular, recurring basis", slug: "contract-fleet-services" },
    { need: "I need to ship goods across a border", slug: "international-freight-forwarding" },
    { need: "I need to move a shipping container", slug: "container-transportation" },
    { need: "I need to deliver to customers or branches", slug: "last-mile-delivery" },
    { need: "I have a time-critical shipment", slug: "express-urgent-delivery" },
    { need: "I need goods held before delivery", slug: "warehousing-storage" },
    { need: "My goods must stay within a temperature range", slug: "refrigerated-transportation" },
    { need: "I am coordinating transport for an industrial project", slug: "industrial-project-logistics" },
    { need: "I supply several customers on a regular schedule", slug: "commercial-distribution-services" },
  ],
};

export const hubFaqs: Faq[] = [
  {
    q: "What services does Gulf Elite Transport offer?",
    a: "Gulf Elite Transport offers twelve services: freight and cargo transport, international freight forwarding, container transportation, express and urgent delivery, refrigerated transportation, passenger transport, equipment and machinery moving, industrial and project logistics, contract fleet services, last-mile delivery, commercial distribution, and warehousing and storage. Each has its own page describing what is included, who it is for and what information is needed for a quotation.",
  },
  {
    q: "Who are these transport services for?",
    a: "They are for businesses and organisations, such as manufacturers, contractors, retailers, distributors, hotels, event organisers and corporate teams. Individual requirements are assessed case by case.",
  },
  {
    q: "How do I choose the right service?",
    a: "Match the service to what you are moving: goods go with freight and cargo, people with passenger transport, heavy loads with equipment moving or project logistics, and regular needs with contract fleet, last-mile delivery or distribution. The service finder on this page helps, and we can advise if your request spans several services.",
  },
  {
    q: "Can I combine more than one service in one request?",
    a: "Yes. If your requirement spans several services, for example moving equipment and then supplying a site regularly, describe the whole picture in one enquiry and we will help you plan it together.",
  },
  {
    q: "How do I request a quotation?",
    a: "Use the quote form on this page or on any service page, and include the service, locations, date and details of the cargo, passengers or equipment. We reply with a quotation or with the questions we need answered.",
  },
  {
    q: "What information do you need to prepare a quotation?",
    a: "Generally the type of service, pickup and delivery locations, preferred date, and details of the goods, passengers or equipment such as weight, size or number. Each service page lists exactly what helps for that service.",
  },
  {
    q: "Are your prices published online?",
    a: "No. Prices depend on the distance, the load or passenger numbers, the vehicle type and the timing, so each request receives a quotation based on its own details before you commit.",
  },
  {
    q: "Is availability the same in every location?",
    a: "No. Availability depends on the pickup and delivery locations, the type of service and the dates involved. We confirm it individually for each request instead of assuming it.",
  },
  {
    q: "Do you offer airport transfers and staff transport?",
    a: "Yes, both are part of our passenger transport service, along with corporate passenger movement and event transport. Share the passenger numbers, route and timing and we confirm availability.",
  },
  {
    q: "Do you offer recurring or monthly arrangements?",
    a: "Yes. Recurring requirements can be discussed under contract fleet services, which cover dedicated fleet arrangements and monthly vehicle contracts for ongoing transport needs.",
  },
];
