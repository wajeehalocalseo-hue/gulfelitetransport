import { core } from "./core";
import { international } from "./international";
import { delivery } from "./delivery";
import { storage } from "./storage";
import type { Service, ServiceGroup } from "./types";

export type { Faq, Service, ServiceGroup } from "./types";

export const allServices: Service[] = [...core, ...international, ...delivery, ...storage];

// Set PUBLISH_PENDING=1 at build time to preview services that are still pending approval.
const previewPending = process.env.PUBLISH_PENDING === "1";

/** Only approved services are published (linked, built, in sitemap and llms.txt). */
export const services: Service[] = allServices.filter((s) => s.approved || previewPending);

export const pendingServices: Service[] = allServices.filter((s) => !s.approved);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const groups: {
  id: ServiceGroup;
  title: string;
  text: string;
}[] = [
  {
    id: "freight",
    title: "Freight and cargo solutions",
    text: "Moving goods from one place to another is the foundation of most commercial transport. These services cover the movement of cargo, from a single commercial shipment to more specialised freight requirements. Each one starts the same way: a clear description of the goods, the route and the timing, followed by an assessment and a quotation.",
  },
  {
    id: "passenger",
    title: "Passenger transportation solutions",
    text: "People need transport that is predictable. Passenger services cover staff movement, corporate travel, airport transfers and event groups, planned around a schedule so that passengers are collected and delivered where and when they expect.",
  },
  {
    id: "equipment",
    title: "Equipment and industrial transportation",
    text: "Heavy equipment and project loads need more planning than ordinary cargo. Weight, size, access and loading method all shape the move, so these services focus on gathering that information early and coordinating a suitable arrangement.",
  },
  {
    id: "fleet",
    title: "Fleet and distribution solutions",
    text: "Businesses that move goods regularly benefit from arrangements that do not have to be rebuilt each time. Fleet and distribution services support recurring routes, scheduled deliveries and ongoing supply to customers or stores.",
  },
];
