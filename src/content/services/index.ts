import { core } from "./core";
import { international } from "./international";
import { delivery } from "./delivery";
import { storage } from "./storage";
import { extended } from "./extended";
import type { Service, ServiceGroup } from "./types";

export type { Faq, Service, ServiceGroup } from "./types";

export const allServices: Service[] = [...core, ...international, ...delivery, ...storage, ...extended];

// Set PUBLISH_PENDING=1 at build time to preview services that are still pending approval.
const previewPending = process.env.PUBLISH_PENDING === "1";

/** Only approved services are published (linked, built, in sitemap and llms.txt). */
export const services: Service[] = allServices.filter((s) => s.approved || previewPending);

export const pendingServices: Service[] = allServices.filter((s) => !s.approved);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const groups: {
  id: ServiceGroup;
  label: string;
  title: string;
  text: string;
}[] = [
  {
    id: "freight",
    label: "Freight & cargo",
    title: "Freight and cargo solutions",
    text: "Moving goods from one place to another is the foundation of most commercial transport. These services cover commercial cargo transportation, from a single shipment to international freight, container movements, urgent deliveries and temperature-sensitive goods. Each one starts the same way: a clear description of the goods, the route and the timing, followed by an assessment and a quotation.",
  },
  {
    id: "passenger",
    label: "Passenger",
    title: "Passenger transportation solutions",
    text: "People need transport that is predictable. Passenger services cover staff transportation, corporate passenger transport, airport passenger transfers and event groups, planned around a schedule so that passengers are collected and delivered where and when they expect.",
  },
  {
    id: "equipment",
    label: "Equipment & industrial",
    title: "Equipment and industrial transportation",
    text: "Heavy equipment moving, industrial machinery relocation and project logistics need more planning than ordinary cargo. Weight, size, access and loading method all shape the move, so these services focus on gathering that information early and coordinating a suitable arrangement.",
  },
  {
    id: "fleet",
    label: "Fleet & distribution",
    title: "Fleet and distribution solutions",
    text: "Businesses that move goods regularly benefit from arrangements that do not have to be rebuilt each time. Monthly fleet contracts, last-mile delivery, commercial distribution and warehousing support recurring business transport, scheduled deliveries and ongoing supply to customers or stores.",
  },
];