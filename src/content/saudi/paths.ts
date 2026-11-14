/** Public address of a city page. Riyadh's main page lives on a keyword URL; every other city is under its region. */
export const RIYADH_LANDING = "/riyadh-taxi-service";

export const cityHref = (base: string, c: { id: string; region: string }) => (c.id === "riyadh" ? RIYADH_LANDING : `${base}/${c.region}/${c.id}`);
