import type { Faq } from "./services";

export const hubAnswer = {
  h2: "What transport services does Gulf Elite Transport provide?",
  answer:
    "Gulf Elite Transport provides freight and cargo transport, passenger transport, equipment and machinery moving, and contract fleet services for businesses and organisations. Every request is assessed individually and you receive a clear quotation before you commit. Availability depends on the pickup and delivery locations, the type of service and the dates, and is confirmed for each request.",
  more: "Every service follows the same principle: describe what you need, receive an assessment and a quotation, and confirm only when you are comfortable with the plan.",
};

export const hubFacts = {
  h2: "Service facts at a glance",
  rows: [
    { label: "Who the services are for", value: "Businesses and organisations that need to move goods, passengers or equipment" },
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
  { href: "#answer", label: "Overview" },
  { href: "#services", label: "Services" },
  { href: "#compare", label: "Compare" },
  { href: "#guide", label: "Which service?" },
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
    a: "Gulf Elite Transport offers freight and cargo transport, passenger transport, equipment and machinery moving, and contract fleet services. Each has its own page describing what is included, who it is for and what information is needed for a quotation.",
  },
  {
    q: "Who are these transport services for?",
    a: "They are for businesses and organisations, such as manufacturers, contractors, retailers, distributors, hotels, event organisers and corporate teams. Individual requirements are assessed case by case.",
  },
  {
    q: "How do I choose the right service?",
    a: "Match the service to what you are moving: goods go with freight and cargo, people with passenger transport, heavy loads with equipment moving and regular needs with contract fleet. The selection guide on this page helps, and we can advise if your request spans several services.",
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
