/**
 * Published fixed prices, per vehicle, in SAR. Leave `rows` empty until you have confirmed prices:
 * the home-page price table only appears once there is at least one row.
 * Example row: { route: "Jeddah Airport to Makkah Hotel", prices: [220, 300, 490, null] }
 * `prices` follows the order of `columns`; use null for "not offered".
 */
export const priceColumns = ["Sedan", "SUV", "Family van", "Minibus"];

export const priceRows: { route: string; prices: (number | null)[] }[] = [];
