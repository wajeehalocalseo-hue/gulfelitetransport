/**
 * Level 3 (micro-service) taxonomy for every sub-service, with the verification decision.
 * These entries have NO public page. The 5 verified micro-services that do have pages live in
 * ./microservices.ts.
 *
 * verification:
 *   verified              - the capability is the same thing as a service the owner confirmed
 *                           (so it is covered by an existing page, not a new one)
 *   pending-verification  - plausible, but not in the business information supplied; the owner must confirm
 *   not-applicable        - does not fit the company's actual offering (none identified so far)
 *
 * recommendation:
 *   hold   - needs owner confirmation first; write unique content and publish once confirmed
 *   merge  - same purpose and search intent as another page (`mergedInto`); do not create a competing page
 *
 * To publish one: confirm it with the owner, write a ChildRecord in ./microservices.ts, and delete the entry here.
 */
export type Verification = "verified" | "pending-verification" | "not-applicable";

export type MicroProposal = {
  sub: string;
  name: string;
  verification: Verification;
  recommendation: "hold" | "merge";
  useCase: string;
  themes: string[];
  entities: string[];
  faqTopics: string[];
  mergedInto?: string;
};

const hold = (
  sub: string,
  name: string,
  useCase: string,
  themes: string[],
  entities: string[],
  faqTopics: string[],
): MicroProposal => ({ sub, name, verification: "pending-verification", recommendation: "hold", useCase, themes, entities, faqTopics });

const merge = (
  sub: string,
  name: string,
  mergedInto: string,
  verification: Verification,
  useCase: string,
): MicroProposal => ({ sub, name, verification, recommendation: "merge", useCase, themes: [], entities: [], faqTopics: [], mergedInto });

export const microProposals: MicroProposal[] = [
  /* commercial-cargo-transportation */
  hold("commercial-cargo-transportation", "Retail Stock Transportation", "A retailer moving stock from a depot or supplier to shops.", ["retail stock delivery", "store replenishment"], ["retailers", "distribution centres"], ["What counts as retail stock?", "How are store delivery windows agreed?"]),
  hold("commercial-cargo-transportation", "Wholesale Goods Transportation", "A wholesaler delivering orders to business customers.", ["wholesale delivery", "bulk order transport"], ["wholesalers", "trade customers"], ["How are mixed orders loaded?", "What details help a wholesale quotation?"]),
  hold("commercial-cargo-transportation", "Business Inventory Transfers", "A company moving inventory between its own locations.", ["inventory transfer", "stock transfer between sites"], ["warehouses", "branches"], ["How are transfer schedules set?", "What documents travel with inventory?"]),
  merge("commercial-cargo-transportation", "Inter-Branch Goods Transportation", "business-inventory-transfers", "pending-verification", "Same intent as Business Inventory Transfers."),
  merge("commercial-cargo-transportation", "Scheduled Commercial Cargo Movement", "scheduled-cargo-transportation", "verified", "Covered by the Scheduled Cargo Transportation sub-service."),

  /* scheduled-cargo-transportation */
  merge("scheduled-cargo-transportation", "Regular Business Deliveries", "scheduled-cargo-transportation", "verified", "Same purpose and search intent as the parent page."),
  hold("scheduled-cargo-transportation", "Weekly Supply Runs", "Cargo delivered to the same customer or site on the same day each week.", ["weekly supply delivery", "standing delivery day"], ["suppliers", "customers"], ["How are skipped weeks handled?", "How are weekly volumes planned?"]),
  hold("scheduled-cargo-transportation", "Recurring Site-to-Site Cargo Transfers", "Regular cargo movement between two company sites.", ["site-to-site transfer", "recurring cargo route"], ["factories", "depots"], ["How is the route fixed?", "How are extra loads requested?"]),
  hold("scheduled-cargo-transportation", "Seasonal Cargo Schedules", "A cargo schedule that runs only during a busy season.", ["seasonal delivery schedule", "peak season cargo"], ["seasonal businesses"], ["How are start and end dates set?", "How is peak capacity discussed?"]),
  hold("scheduled-cargo-transportation", "Month-End Cargo Movements", "Predictable movements that follow a business calendar.", ["month-end deliveries", "calendar-based cargo"], ["finance cycles", "retail cycles"], ["How are month-end peaks planned?"]),

  /* corporate-passenger-transport */
  hold("corporate-passenger-transport", "Executive Business Transfers", "Senior visitors transferred between hotel, office and meetings.", ["executive transfer", "VIP business travel"], ["executives", "assistants"], ["What vehicle is used?", "How are itineraries shared?"]),
  merge("corporate-passenger-transport", "Inter-Office Passenger Transfers", "staff-transportation", "pending-verification", "Covered as inter-office movement on Staff Transportation."),
  hold("corporate-passenger-transport", "Corporate Meeting Transportation", "Transport to and from a day of meetings at another venue.", ["meeting transport", "business meeting transfers"], ["meeting organisers"], ["How are meeting overruns handled?"]),
  hold("corporate-passenger-transport", "Business Delegation Transfers", "A delegation moved across a multi-day programme.", ["delegation transport", "visiting delegation transfers"], ["delegations", "protocol teams"], ["How is a multi-day programme planned?"]),
  merge("corporate-passenger-transport", "Scheduled Corporate Passenger Movement", "corporate-passenger-transport", "verified", "Same purpose as the parent page, which is itinerary-based."),

  /* staff-transportation */
  hold("staff-transportation", "Shift-Based Staff Transport", "Pickups timed to the start and end of work shifts.", ["shift transport", "employee commute"], ["employers", "site managers"], ["How are shift changes communicated?"]),
  hold("staff-transportation", "Employee Shuttle Routes", "A fixed route with set stops for employees.", ["employee shuttle", "staff shuttle route"], ["HR teams"], ["How are stops chosen?"]),
  hold("staff-transportation", "Inter-Office Staff Shuttles", "A regular run between two company offices.", ["inter-office shuttle", "office to office transport"], ["multi-site companies"], ["How is the timetable set?"]),
  hold("staff-transportation", "Worker Transport to Project Sites", "Workers moved from accommodation or a gathering point to a site.", ["worker transport", "site commute"], ["contractors", "project teams"], ["How are headcount changes handled?"]),
  hold("staff-transportation", "Temporary Project Staff Transport", "Staff transport for the duration of a project.", ["project staff transport", "temporary staff shuttle"], ["project managers"], ["How is the end date handled?"]),

  /* airport-transfers (2 verified micro-services are published) */
  hold("airport-transfers", "Group Airport Transfers", "Several passengers travelling to or from the airport together.", ["group airport transfer", "team airport transport"], ["travel coordinators"], ["How many passengers can travel together?"]),
  hold("airport-transfers", "Early-Morning and Late-Night Airport Transfers", "Transfers for flights outside normal hours.", ["night airport transfer", "dawn airport pickup"], ["travellers"], ["How are out-of-hours transfers confirmed?"]),
  merge("airport-transfers", "Return Airport Transfers", "airport-departure-drop-offs", "verified", "Arrival and departure are covered by two pages; a return booking combines them."),

  /* event-passenger-transport */
  hold("event-passenger-transport", "Conference Shuttle Services", "Delegates shuttled between a hotel and a conference centre.", ["conference shuttle", "delegate transport"], ["conference organisers"], ["How is the shuttle loop scheduled?"]),
  hold("event-passenger-transport", "Corporate Function Transport", "Guests collected and returned after a company event.", ["corporate event transport", "company function transfers"], ["event planners"], ["How are return times set?"]),
  hold("event-passenger-transport", "Hotel-to-Venue Guest Shuttles", "Hotel guests moved to an event venue and back.", ["hotel shuttle", "guest shuttle to venue"], ["hotels"], ["How are pickup points agreed?"]),
  hold("event-passenger-transport", "Multi-Venue Event Transport", "Movement between more than one location during an event.", ["multi-venue transport", "event day transfers"], ["festival organisers"], ["How are multi-venue days planned?"]),

  /* heavy-equipment-transportation (2 verified micro-services are published) */
  merge("heavy-equipment-transportation", "Construction Plant Delivery", "construction-equipment-transport", "pending-verification", "Same intent as Construction Equipment Transport."),
  hold("heavy-equipment-transportation", "Equipment Return to Yard", "Equipment collected at the end of a job.", ["equipment return", "plant collection"], ["hire companies", "contractors"], ["How is collection timing agreed?"]),
  merge("heavy-equipment-transportation", "Machine Transport with Attachments", "vehicle-suitability-for-heavy-equipment", "verified", "Attachments are part of the vehicle suitability assessment."),
  merge("heavy-equipment-transportation", "Oversized Heavy Equipment Moves", "oversized-equipment-transportation", "pending-verification", "Same intent as Oversized Equipment Transportation."),

  /* industrial-machinery-relocation */
  merge("industrial-machinery-relocation", "Production Line Relocation", "factory-machinery-relocation", "pending-verification", "Same intent as Factory Machinery Relocation."),
  merge("industrial-machinery-relocation", "Multi-Machine Move Sequencing", "industrial-machinery-relocation", "verified", "Sequencing is already a core section of the parent page."),
  hold("industrial-machinery-relocation", "Facility Consolidation Moves", "Equipment from two sites brought together.", ["site consolidation", "facility merge relocation"], ["multi-site manufacturers"], ["How is a two-site move sequenced?"]),

  /* dedicated-fleet-services */
  hold("dedicated-fleet-services", "Daily Delivery Route Vehicles", "A vehicle assigned to one daily delivery route.", ["dedicated delivery vehicle", "daily route fleet"], ["distributors"], ["How is the route fixed?"]),
  hold("dedicated-fleet-services", "Project Fleet Support", "Vehicles allocated to a project for its duration.", ["project fleet", "site vehicles"], ["project teams"], ["How is the end of the project handled?"]),
  merge("dedicated-fleet-services", "Peak-Season Fleet Capacity", "seasonal-fleet-arrangements", "pending-verification", "Same intent as Seasonal Fleet Arrangements."),
  hold("dedicated-fleet-services", "Dedicated Staff Transport Vehicles", "Vehicles assigned only to staff transport.", ["dedicated staff vehicle", "employee fleet"], ["employers"], ["Are drivers included?"]),

  /* monthly-vehicle-contracts */
  hold("monthly-vehicle-contracts", "Monthly Staff Transport Contracts", "A monthly contract for employee transport.", ["monthly staff transport", "staff transport contract"], ["employers"], ["How long is the minimum term?"]),
  hold("monthly-vehicle-contracts", "Monthly Delivery Contracts", "A monthly contract for regular deliveries.", ["monthly delivery contract", "recurring delivery contract"], ["suppliers"], ["How are extra deliveries handled?"]),
  hold("monthly-vehicle-contracts", "Fixed-Term Project Contracts", "A contract for the fixed length of a project.", ["project transport contract", "fixed-term vehicle contract"], ["contractors"], ["How is early termination handled?"]),
  merge("monthly-vehicle-contracts", "Contract Review and Renewal", "monthly-vehicle-contracts", "pending-verification", "A part of the contract process on the parent page, not a separate service."),
];
