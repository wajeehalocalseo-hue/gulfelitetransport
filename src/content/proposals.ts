/**
 * Proposed sub-services that do NOT have a public page, with the reason.
 *
 *  - pending-verification: needs the business owner to confirm the service is really offered.
 *  - draft: overlaps a published page; kept as a section or mention there, not its own page
 *           (`mergedInto` names the page that covers it) to avoid thin or competing pages.
 *  - archived: judged not relevant to the business.
 *
 * To publish one: confirm it with the owner, write unique content as a ChildRecord in
 * ./subservices.ts, and delete the entry here.
 */
/**
 * Set a status here to take a page with full content out of publication without deleting it,
 * e.g. { "staff-transportation": "pending-verification" }. Overridden pages are not built,
 * linked or listed in the sitemap (preview builds create them as noindex).
 */
export const statusOverrides: Record<string, "draft" | "pending-verification" | "published" | "archived"> = {};

export type Proposal = {
  main: string;
  name: string;
  status: "pending-verification" | "draft" | "archived";
  note: string;
  mergedInto?: string;
};

const PV = "pending-verification" as const;
const D = "draft" as const;

const unverified = "Not covered by the business information supplied; needs owner confirmation.";

export const proposals: Proposal[] = [
  /* A. Freight & Cargo Transport */
  { main: "freight-cargo-transport", name: "General Freight Transportation", status: D, note: "Same topic as Commercial Cargo Transportation.", mergedInto: "commercial-cargo-transportation" },
  { main: "freight-cargo-transport", name: "Business Stock Transportation", status: PV, note: unverified },
  { main: "freight-cargo-transport", name: "Raw Material Transportation", status: PV, note: unverified },
  { main: "freight-cargo-transport", name: "Finished Goods Transportation", status: PV, note: unverified },
  { main: "freight-cargo-transport", name: "Supplier-to-Business Deliveries", status: D, note: "Covered as a use case on Commercial Cargo Transportation.", mergedInto: "commercial-cargo-transportation" },
  { main: "freight-cargo-transport", name: "Project Cargo Transportation", status: D, note: "Overlaps the Industrial & Project Logistics service.", mergedInto: "industrial-project-logistics" },

  /* B. Passenger Transport */
  { main: "passenger-transport", name: "Business Guest Transportation", status: D, note: "Covered on Corporate Passenger Transport.", mergedInto: "corporate-passenger-transport" },
  { main: "passenger-transport", name: "Hotel Guest Transportation", status: PV, note: unverified },
  { main: "passenger-transport", name: "Scheduled Passenger Transport", status: D, note: "Covered on Staff Transportation.", mergedInto: "staff-transportation" },

  /* C. Equipment & Machinery Moving */
  { main: "equipment-machinery-moving", name: "Industrial Machinery Transportation", status: D, note: "Covered on Industrial Machinery Relocation.", mergedInto: "industrial-machinery-relocation" },
  { main: "equipment-machinery-moving", name: "Manufacturing Equipment Moving", status: D, note: "Covered on Industrial Machinery Relocation.", mergedInto: "industrial-machinery-relocation" },
  { main: "equipment-machinery-moving", name: "Commercial Equipment Delivery", status: PV, note: unverified },
  { main: "equipment-machinery-moving", name: "Plant and Facility Equipment Moving", status: D, note: "Covered on Industrial Machinery Relocation.", mergedInto: "industrial-machinery-relocation" },
  { main: "equipment-machinery-moving", name: "Project Equipment Transportation", status: D, note: "Overlaps the Industrial & Project Logistics service.", mergedInto: "industrial-project-logistics" },
  { main: "equipment-machinery-moving", name: "Oversized Equipment Transportation", status: PV, note: "Implies permits and specialist capability; needs owner confirmation." },

  /* D. Contract Fleet Services */
  { main: "contract-fleet-services", name: "Corporate Fleet Arrangements", status: D, note: "Covered on Dedicated Fleet Services.", mergedInto: "dedicated-fleet-services" },
  { main: "contract-fleet-services", name: "Recurring Cargo Transportation", status: D, note: "Covered by Scheduled Cargo Transportation.", mergedInto: "scheduled-cargo-transportation" },
  { main: "contract-fleet-services", name: "Scheduled Delivery Fleet", status: D, note: "Covered by Scheduled Cargo Transportation.", mergedInto: "scheduled-cargo-transportation" },
  { main: "contract-fleet-services", name: "Business Distribution Fleet", status: PV, note: unverified },
  { main: "contract-fleet-services", name: "Project-Based Fleet Support", status: PV, note: unverified },
  { main: "contract-fleet-services", name: "Seasonal Fleet Arrangements", status: PV, note: unverified },
  { main: "contract-fleet-services", name: "Long-Term Transport Contracts", status: D, note: "Covered on Monthly Vehicle Contracts.", mergedInto: "monthly-vehicle-contracts" },

  /* Candidate sub-services for the other main services (no sub-services were supplied for these) */
  { main: "express-urgent-delivery", name: "Time-Critical Shipment Delivery", status: PV, note: "Delivery-time capability needs owner confirmation." },
  { main: "warehousing-storage", name: "Pre-Distribution Storage", status: PV, note: "Storage facilities need owner confirmation." },
  { main: "refrigerated-transportation", name: "Temperature-Controlled Delivery", status: PV, note: "Refrigerated vehicles need owner confirmation." },
  { main: "industrial-project-logistics", name: "Phased Site Deliveries", status: PV, note: unverified },
  { main: "industrial-project-logistics", name: "Plant Installation Logistics", status: PV, note: unverified },
];
