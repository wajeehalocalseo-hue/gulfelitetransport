import type { TownSpec } from "../town-routes/factory";

/**
 * The manually assigned keyword set of every Makkah route page: one primary keyword ("Makkah to <place> Taxi Service") and twelve secondary keywords.
 * The first nine follow one pattern; the last three differ by page, as in the brief. Both directions share one page, so several keywords are reverse-direction phrases.
 */
export type MakkahKeywords = { primary: string; secondary: string[] };

/** Pages whose last secondary keywords differ from the common pattern, as assigned in the brief. */
const SPECIAL: Record<string, (n: string) => string[]> = {
  jeddah: (n) => [`${n} to Makkah Taxi Booking`, `Makkah ${n} Intercity Taxi`, `Makkah to ${n} Airport Taxi`, `${n} to Makkah Return Taxi`, `Makkah to ${n} Door-to-Door Transport`],
  taif: (n) => [`Makkah to ${n} Door-to-Door Taxi`, `Makkah to ${n} Family Transport`, `Makkah to ${n} Travel Service`],
};

/** Page ids whose eleventh keyword is "Passenger Transfer" (the others use "Passenger Transport"). */
const TRANSFER = new Set(["al-qunfudhah", "khulais", "bahrah", "ranyah", "maysan", "al-kamil", "hada", "thuwal", "ash-shafa", "qiya"]);

export function keywordsFor(spec: Pick<TownSpec, "id" | "name">): MakkahKeywords {
  const n = spec.name;
  const primary = `Makkah to ${n} Taxi Service`;
  const base = [
    `${n} to Makkah Taxi Service`,
    `Makkah to ${n} Private Taxi`,
    `${n} to Makkah Private Taxi`,
    `Makkah to ${n} Cab Service`,
    `Makkah to ${n} Car Service`,
    `Makkah to ${n} Taxi Booking`,
    `${n} to Makkah Return Taxi`,
    `Makkah ${n} Intercity Taxi`,
    `Makkah to ${n} Private Car`,
  ];
  if (spec.id === "jeddah") {
    return { primary, secondary: [base[0], base[1], base[2], base[3], base[4], base[8], base[5], ...SPECIAL.jeddah(n).slice(0, 1), base[7], ...SPECIAL.jeddah(n).slice(2)] };
  }
  if (spec.id === "taif") {
    return { primary, secondary: [...base, ...SPECIAL.taif(n)] };
  }
  if (spec.id === "rabigh") {
    return { primary, secondary: [...base, `Makkah to ${n} Door-to-Door Transport`, `Makkah to ${n} Passenger Transport`, `${n} to Makkah Car Booking`] };
  }
  return {
    primary,
    secondary: [...base, `Makkah to ${n} Door-to-Door Transport`, `Makkah to ${n} ${TRANSFER.has(spec.id) ? "Passenger Transfer" : "Passenger Transport"}`, spec.id === "al-qunfudhah" ? `${n} to Makkah Car Service` : `${n} to Makkah Car Booking`],
  };
}

const lc = (k: string) => k.replace(/\b(Taxi|Service|Private|Cab|Car|Booking|Return|Intercity|Door-to-Door|Transport|Passenger|Transfer|Airport|Family|Travel)\b/g, (m) => m.toLowerCase());

/**
 * Three extra questions per page that answer how the different names for the same ride relate to each other.
 * They carry the secondary keywords in natural wording and they are real questions people ask, so they are visible in the FAQ and in the FAQ schema.
 */
export function keywordFaqs(spec: Pick<TownSpec, "id" | "name">): { q: string; a: string }[] {
  const n = spec.name;
  const k = keywordsFor(spec).secondary.map(lc);
  const find = (re: RegExp) => k.find((x) => re.test(x)) ?? "";
  const privateTaxi = find(/^Makkah to .* private taxi$/);
  const cab = find(/cab service$/);
  const car = find(/^Makkah to .* car service$/);
  const privateCar = find(/private car$/);
  const reversePrivate = find(/^.* to Makkah private taxi$/);
  const booking = find(/^Makkah to .* taxi booking$/);
  const reverseBooking = find(/^.* to Makkah taxi booking$/);
  const returnTaxi = find(/return taxi$/);
  const carBooking = find(/car booking$/);
  const reverseCar = find(/^.* to Makkah car service$/);
  const reverseService = find(/^.* to Makkah taxi service$/);
  const intercity = find(/intercity taxi$/);
  const door = find(/door-to-door/);
  const extra = k.filter((x) => /passenger (transport|transfer)$|family transport$|travel service$|airport taxi$|door-to-door taxi$/.test(x) && x !== door);
  const list = (xs: string[]) => (xs.length < 2 ? xs.join('') : xs.length === 2 ? xs.join(' and ') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1]);
  const bookings = [...new Set([reverseBooking, carBooking, reverseCar].filter(Boolean))];
  const bookingText = bookings.length ? ` The same steps apply to a ${list(bookings)} request.` : '';
  return [
    {
      q: `Is a ${cab} the same as a ${privateTaxi} or a ${privateCar}?`,
      a: `On this page they mean the same thing: a car with a driver, booked for you or your group, from your pickup in Makkah to your drop-off in ${n}. Whether you ask for a ${privateTaxi}, a ${cab}, a ${car} or a ${privateCar}, and whether you travel in the ${reversePrivate} direction, we confirm the vehicle, the driver and the fare before you commit.`,
    },
    {
      q: `How does a ${booking} work, and can I add a ${returnTaxi}?`,
      a: `Send the pickup, the drop-off, the date and time and how many people and bags are travelling. Ask for the outbound ride, the return or both in one message, and a ${returnTaxi} is planned with a pickup window. A ${reverseService} request follows the same route.${bookingText} Nothing is final until you agree the fare.`,
    },
    {
      q: `Is this a ${intercity} with door-to-door pickup?`,
      a: `Yes. It is an intercity ride between Makkah and ${n}, and the car collects you at the address you give and takes you to the address you name, in either direction. A ${door} request is confirmed with you in the same way${extra.length ? `, as is ${list(extra.map((x) => 'a ' + x))} request` : ''}, with the vehicle chosen for your group. Give the number of passengers and bags so that the vehicle fits.`,
    },
  ];
}
