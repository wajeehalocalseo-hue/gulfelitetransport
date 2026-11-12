export type Place = { name: string; note: string };
export type Faq = { q: string; a: string };

export type Region = {
  id: string;
  name: string;
  capital: string;
  tagline: string;
  about: string;
  /** Other cities named on the region page (no page of their own yet). */
  other: string[];
};

export type City = {
  id: string;
  name: string;
  region: string;
  /** English Wikipedia article title, used only as an entity reference (schema sameAs). */
  wiki: string;
  tagline: string;
  about: string;
  getting: string;
  places: Place[];
  airport?: string;
  nearby: string[];
  faq: Faq;
};

export type Area = {
  id: string;
  city: string;
  name: string;
  tagline: string;
  about: string;
  places: Place[];
  faq: Faq;
};

export type Airport = {
  id: string;
  name: string;
  code: string;
  city: string;
  tagline: string;
  about: string;
  tips: string[];
};

export type Route = {
  id: string;
  from: string;
  to: string;
  /** Approximate road distance in km (rounded; confirmed per request). */
  km: number;
  about: string;
  riders: string[];
  tips: string[];
};

export type PageKind = "hub" | "region" | "city" | "area" | "airport" | "route" | "pair" | "topic";

export type Section =
  | { id: string; h2: string; kind: "text"; paragraphs: string[] }
  | { id: string; h2: string; kind: "items"; intro?: string; items: { title: string; text: string }[] }
  | { id: string; h2: string; kind: "steps"; items: { title: string; text: string }[] }
  | { id: string; h2: string; kind: "links"; intro?: string; items: { name: string; href: string; note?: string }[] }
  | { id: string; h2: string; kind: "faq"; items: Faq[] };

export type PlaceLayout = {
  hero: "dark" | "light" | "ledger" | "inset" | "centered" | "board" | "routeline" | "routeband" | "schematic";
  body: "cards" | "columns" | "tiles" | "checklist" | "accordion" | "table";
  form: "aside" | "bottom" | "hero";
};

export type PlacePage = {
  kind: PageKind;
  /** Full path, e.g. /taxi-saudi-arabia/riyadh-region/riyadh */
  path: string;
  /** Short name of the place or route. */
  name: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  directAnswer: string;
  crumbs: { name: string; path: string }[];
  facts: { label: string; value: string }[];
  sections: Section[];
  layout: PlaceLayout;
  /** Entities for schema.org. */
  entities: { type: "Country" | "AdministrativeArea" | "City" | "Place" | "Airport"; name: string; wiki?: string; iata?: string; ar?: string; lat?: number; lng?: number }[];
  route?: { from: string; to: string; km: number };
  /** Two points inside one city, used for the schematic hero and structured data. */
  pair?: { a: { name: string; lat: number; lng: number }; b: { name: string; lat: number; lng: number }; km: number; type: "airport" | "hub" | "district" };
  /** Used to prefill the quote form. */
  prefill?: { pickup?: string; dropoff?: string };
  /** Child pages listed in an ItemList. */
  children: { name: string; path: string }[];
};
