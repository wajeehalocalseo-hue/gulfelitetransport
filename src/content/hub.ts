import type { Faq } from "./services";

export const hubIntro = {
  h2: "Transport and logistics services for businesses",
  paragraphs: [
    "Gulf Elite Transport helps businesses and organisations arrange the movement of goods, people and equipment. Every service on this page follows the same principle: describe what you need, receive an assessment and a clear quotation, and confirm only when you are comfortable with the plan.",
    "The services are grouped by the kind of problem they solve. If you are moving goods, start with freight and cargo. If you are moving people, look at passenger transport. If the load is heavy or industrial, see equipment and industrial transportation. If the need is regular, fleet and distribution arrangements save you from repeating the same request.",
    "Availability depends on your pickup and delivery locations, the type of service and the dates involved. We confirm it individually for every request instead of assuming it.",
  ],
};

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
    a: "The services listed on this page, covering freight and cargo, passenger transport, equipment and machinery moving, and contract fleet arrangements. Each service has its own page with details and a quote form.",
  },
  {
    q: "How do I choose the right service?",
    a: "Use the selection guide above, or describe your requirement in a quote request and we will tell you which service fits it best.",
  },
  {
    q: "Can I combine more than one service?",
    a: "Yes. If your requirement spans several services, describe it in one enquiry and we will help you plan it together.",
  },
  {
    q: "How do I request a quotation?",
    a: "Use the quote form on this page or on any service page. Include the service, locations, date and details of the cargo, passengers or equipment.",
  },
  {
    q: "Is availability the same everywhere?",
    a: "No. Availability depends on the locations, service type and dates. We confirm it for each request.",
  },
  {
    q: "Do you offer recurring arrangements?",
    a: "Yes, recurring requirements can be discussed. Ask about contract fleet services if your need is ongoing.",
  },
];
