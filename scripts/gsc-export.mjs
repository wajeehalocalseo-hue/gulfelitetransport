// Daily Google Search Console export. Reads the last 28 days (ending 3 days ago, the API lags) by query and page,
// writes docs/gsc/latest.csv, a dated copy, and docs/gsc/report.md with what to look at next.
// Needs GSC_SERVICE_ACCOUNT_JSON (the whole key file) and GSC_SITE_URL (for example sc-domain:gulfelitetransportgroup.com).
// The key is read from the environment only; it is never written to disk or committed.
import { createSign } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

const keyJson = process.env.GSC_SERVICE_ACCOUNT_JSON;
const siteUrl = process.env.GSC_SITE_URL;
if (!keyJson || !siteUrl) {
  console.error("Set GSC_SERVICE_ACCOUNT_JSON and GSC_SITE_URL.");
  process.exit(1);
}
const key = JSON.parse(keyJson);

const b64 = (b) => Buffer.from(b).toString("base64url");
async function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const body = b64(JSON.stringify({ iss: key.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const sig = createSign("RSA-SHA256").update(`${head}.${body}`).sign(key.private_key, "base64url");
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${body}.${sig}` }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error(`Token error: ${JSON.stringify(j)}`);
  return j.access_token;
}

const day = (offset) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
const endDate = day(3);
const startDate = day(30);

async function query(access, dimensions) {
  const rows = [];
  for (let start = 0; ; start += 25000) {
    const res = await fetch(`https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, {
      method: "POST",
      headers: { authorization: `Bearer ${access}`, "content-type": "application/json" },
      body: JSON.stringify({ startDate, endDate, dimensions, rowLimit: 25000, startRow: start }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(`Search Console error: ${JSON.stringify(j)}`);
    rows.push(...(j.rows ?? []));
    if ((j.rows ?? []).length < 25000) break;
  }
  return rows;
}

const csvCell = (v) => `"${String(v).replaceAll('"', '""')}"`;
const access = await token();
const rows = (await query(access, ["query", "page"])).map((r) => ({
  query: r.keys[0],
  page: r.keys[1].replace(/^https?:\/\/[^/]+/, ""),
  clicks: r.clicks,
  impressions: r.impressions,
  ctr: r.ctr,
  position: r.position,
}));

mkdirSync("docs/gsc", { recursive: true });
const header = "query,page,clicks,impressions,ctr,position\n";
const csv = header + rows.sort((a, b) => b.impressions - a.impressions).map((r) => [csvCell(r.query), csvCell(r.page), r.clicks, r.impressions, r.ctr.toFixed(4), r.position.toFixed(1)].join(",")).join("\n") + "\n";
writeFileSync("docs/gsc/latest.csv", csv);
writeFileSync(`docs/gsc/${endDate}.csv`, csv);

// Report. Thresholds are small on purpose while the site has little traffic.
const total = rows.reduce((s, r) => ({ c: s.c + r.clicks, i: s.i + r.impressions }), { c: 0, i: 0 });
const list = (title, items, note) => `\n## ${title}\n${note}\n\n${items.length ? "| Query | Page | Impr. | Clicks | CTR | Pos. |\n|---|---|---|---|---|---|\n" + items.slice(0, 25).map((r) => `| ${r.query} | ${r.page} | ${r.impressions} | ${r.clicks} | ${(r.ctr * 100).toFixed(1)}% | ${r.position.toFixed(1)} |`).join("\n") : "_None yet._"}\n`;
const report =
  `# Search Console report (${startDate} to ${endDate})\n\nTotal: ${total.i} impressions, ${total.c} clicks, ${rows.length} query and page pairs.\n` +
  list("Close to page one (position 5 to 20, 3+ impressions)", rows.filter((r) => r.position >= 5 && r.position <= 20 && r.impressions >= 3).sort((a, b) => b.impressions - a.impressions), "Best candidates for a stronger title, intro and FAQ on the page shown.") +
  list("Seen often but not clicked (CTR under 2%, position 1 to 10, 5+ impressions)", rows.filter((r) => r.position <= 10 && r.impressions >= 5 && r.ctr < 0.02).sort((a, b) => b.impressions - a.impressions), "The title or description does not match what people searched for.") +
  list("Getting clicks", rows.filter((r) => r.clicks > 0).sort((a, b) => b.clicks - a.clicks), "Protect these pages; do not rewrite them without a reason.");
writeFileSync("docs/gsc/report.md", report);
console.log(`Wrote ${rows.length} rows for ${startDate} to ${endDate}.`);
