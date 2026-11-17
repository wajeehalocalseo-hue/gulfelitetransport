import type { Section } from "../types";

/**
 * Gives a district page three photo slots: on its first, middle and last written section (text or items).
 * The slots are placeholders until the owner adds public/images/routes/riyadh-districts/<page>/<slot>.webp, so the layout does not shift.
 * The alt text describes the place, not the company fleet.
 */
export function addImages(sections: Section[], name: string): Section[] {
  const place = name.replace(/\s*\(.*\)\s*$/, "");
  const idx = sections.map((s, i) => ({ s, i })).filter(({ s }) => (s.kind === "text" || s.kind === "items") && s.id !== "limits" && s.id !== "whatsapp").map(({ i }) => i);
  const pick = Array.from(new Set([idx[0], idx[Math.floor(idx.length / 2)], idx[idx.length - 1]])).filter((n): n is number => n !== undefined);
  const specs = [
    { slot: "area", alt: `Streets and buildings in ${place}, Riyadh`, label: `Photo: ${place} area` },
    { slot: "journey", alt: `A private journey to or from ${place}, Riyadh`, label: `Photo: journey from ${place}` },
    { slot: "pickup", alt: `A pickup meeting point in ${place}, Riyadh`, label: `Photo: pickup point in ${place}` },
  ];
  return sections.map((s, i) => {
    const k = pick.indexOf(i);
    return k >= 0 ? { ...s, image: specs[k] } : s;
  });
}
