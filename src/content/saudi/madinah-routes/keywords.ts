import type { TownSpec } from "../town-routes/factory";

/**
 * The manually assigned keyword set of every Madinah route page: one primary keyword ("Madinah to <place> Taxi Service") and twelve secondary keywords.
 * Ten follow one pattern. The eleventh differs by page (Airport Taxi, Tourist Transport, Passenger Transport or Passenger Transfer), as assigned in the brief.
 * Both directions share one page, so several keywords are reverse-direction phrases.
 */
export type MadinahKeywords = { primary: string; secondary: string[] };

/** The eleventh secondary keyword, "Madinah to <place> <suffix>", as assigned for each page. */
const ELEVENTH: Record<string, string> = {
  yanbu: "Airport Taxi",
  "al-ula": "Tourist Transport",
  badr: "Passenger Transport",
  khaybar: "Passenger Transfer",
  "al-hanakiyah": "Passenger Transport",
  "mahd-al-dhahab": "Passenger Transfer",
  umluj: "Tourist Transport",
  "al-wajh": "Passenger Transport",
  "al-ais": "Passenger Transfer",
  "yanbu-al-bahr": "Passenger Transfer",
  "yanbu-al-nakhl": "Passenger Transport",
  "wadi-al-fara": "Passenger Transfer",
  "sulaylah-juhainah": "Passenger Transfer",
  faqrah: "Passenger Transfer",
  "al-nabhaniyah": "Passenger Transport",
};

export function keywordsFor(spec: Pick<TownSpec, "id" | "name">): MadinahKeywords {
  const n = spec.name;
  const suffix = ELEVENTH[spec.id];
  if (!suffix) throw new Error(`${spec.id}: no eleventh keyword assigned`);
  return {
    primary: `Madinah to ${n} Taxi Service`,
    secondary: [
      `${n} to Madinah Taxi Service`,
      `Madinah to ${n} Private Taxi`,
      `${n} to Madinah Private Taxi`,
      `Madinah to ${n} Cab Service`,
      `Madinah to ${n} Car Service`,
      `Madinah to ${n} Taxi Booking`,
      `${n} to Madinah Return Taxi`,
      `Madinah ${n} Intercity Taxi`,
      `Madinah to ${n} Private Car`,
      `Madinah to ${n} Door-to-Door Transport`,
      `Madinah to ${n} ${suffix}`,
      `${n} to Madinah Car Booking`,
    ],
  };
}

const lc = (k: string) => k.replace(/\b(Taxi|Service|Private|Cab|Car|Booking|Return|Intercity|Door-to-Door|Transport|Passenger|Transfer|Airport|Tourist)\b/g, (m) => m.toLowerCase());

const list = (xs: string[]) => (xs.length < 2 ? xs.join("") : xs.length === 2 ? xs.join(" and ") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]);

/**
 * Three extra questions per page that explain how the different names for the same ride relate to each other.
 * They carry the secondary keywords in natural wording, and they are real questions people ask, so they appear in the visible FAQ and in the FAQ schema.
 */
export function keywordFaqs(spec: Pick<TownSpec, "id" | "name">): { q: string; a: string }[] {
  const n = spec.name;
  const k = keywordsFor(spec).secondary.map(lc);
  const find = (re: RegExp) => k.find((x) => re.test(x)) ?? "";
  const privateTaxi = find(/^madinah to .* private taxi$/i);
  const cab = find(/cab service$/);
  const car = find(/^madinah to .* car service$/i);
  const privateCar = find(/private car$/);
  const reversePrivate = find(/^.* to madinah private taxi$/i);
  const booking = find(/^madinah to .* taxi booking$/i);
  const returnTaxi = find(/return taxi$/);
  const carBooking = find(/car booking$/);
  const reverseService = find(/^.* to madinah taxi service$/i);
  const intercity = find(/intercity taxi$/);
  const door = find(/door-to-door/);
  const extra = k.filter((x) => /(passenger (transport|transfer)|tourist transport|airport taxi)$/.test(x));
  return [
    {
      q: `Is a ${cab} the same as a ${privateTaxi} or a ${privateCar}?`,
      a: `On this page they mean the same thing: a car with a driver, booked for you or your group, from your pickup in Madinah to your drop-off in ${n}. Whether you ask for a ${privateTaxi}, a ${cab}, a ${car} or a ${privateCar}, and whether you travel in the ${reversePrivate} direction, we confirm the vehicle, the driver and the fare before you commit.`,
    },
    {
      q: `How does a ${booking} work, and can I add a ${returnTaxi}?`,
      a: `Send the pickup, the drop-off, the date and time and how many people and bags are travelling. Ask for the outbound ride, the return or both in one message, and a ${returnTaxi} is planned with a pickup window. A ${reverseService} request follows the same route, and so does a ${carBooking} request. Nothing is final until you agree the fare.`,
    },
    {
      q: `Is this a ${intercity} with door-to-door pickup?`,
      a: `Yes. It is an intercity ride between Madinah and ${n}, and the car collects you at the address you give and takes you to the address you name, in either direction. A ${door} request is confirmed with you in the same way${extra.length ? `, as is ${list(extra.map((x) => "a " + x))} request` : ""}, with the vehicle chosen for your group. Give the number of passengers and bags so that the vehicle fits.`,
    },
  ];
}
