import type { ChildRecord } from "./subservices";

/**
 * Level 3 (micro-service) records. Intentionally empty.
 *
 * A micro-service becomes a public, indexable page only when it has
 *  - verified availability (confirmed by the business owner), and
 *  - meaningful unique content (not a copy of its parent).
 *
 * To add one, append a ChildRecord with `level: 3` and `parentId` set to a sub-service id,
 * and give it a status in ./proposals.ts (or add it to `publishedMicroServices` below).
 * The nested route /services/<main>/<sub>/<micro> and its breadcrumbs, canonical URL,
 * metadata, JSON-LD and sitemap entry are generated automatically.
 *
 * Candidate ideas (NOT published, need owner verification):
 *   general-cargo-movement, business-stock-transportation, inter-site-cargo-transfers
 */
export const microServices: ChildRecord[] = [];

/** Ids of micro-services the owner has verified and approved for publication. */
export const publishedMicroServices: string[] = [];
