/**
 * Exports docs/page-tracker.csv: every page (built or not), its URL, status and push date.
 * Run with:  npm run tracker
 *
 * The data comes from the real service graph (src/content/taxonomy.ts) and git history, so it is
 * never typed by hand. Import the CSV into Google Sheets with File > Import > Upload > Replace data.
 * "Date pushed" is the date of the commit that first added the page; each commit is pushed right away.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { site } from "../src/lib/site";
import { isIndexable, serviceNodes, type ServiceNode } from "../src/content/taxonomy";

const root = path.resolve(__dirname, "..");

function git(args: string): string {
  try {
    return execSync(`git ${args}`, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

/** First commit that introduced a string anywhere in src/: "YYYY-MM-DD,hash". */
function firstCommitFor(needle: string): [string, string] {
  const out = git(`log --reverse --format=%cs,%h -S"${needle}" -- src`).split("\n")[0] ?? "";
  const [date = "", hash = ""] = out.split(",");
  return [date, hash];
}

function firstCommitOfFile(file: string): [string, string] {
  const out = git(`log --diff-filter=A --format=%cs,%h -- "${file}"`).split("\n").pop() ?? "";
  const [date = "", hash = ""] = out.split(",");
  return [date, hash];
}

type Row = {
  level: string;
  name: string;
  urlPath: string;
  main: string;
  parent: string;
  built: "Yes" | "No";
  status: string;
  date: string;
  commit: string;
  notes: string;
};

const rows: Row[] = [];

// Fixed site pages.
const fixed: [string, string, string][] = [
  ["Home", "/", "src/app/page.tsx"],
  ["Services (overview)", "/services", "src/app/services/page.tsx"],
  ["About Us", "/about", "src/app/about/page.tsx"],
  ["Contact Us", "/contact", "src/app/contact/page.tsx"],
  ["Privacy Policy", "/privacy-policy", "src/app/privacy-policy/page.tsx"],
  ["Terms & Conditions", "/terms-and-conditions", "src/app/terms-and-conditions/page.tsx"],
];
for (const [name, urlPath, file] of fixed) {
  const [date, commit] = firstCommitOfFile(file);
  rows.push({ level: "Site page", name, urlPath, main: "", parent: "", built: "Yes", status: "Built and published", date, commit, notes: "" });
}

const byId = new Map(serviceNodes.map((n) => [n.id, n]));
const mainOrder = new Map(serviceNodes.filter((n) => n.level === 1).map((n, i) => [n.id, i]));
const levelName = { 1: "Main service", 2: "Sub-service", 3: "Micro-service" } as const;

function statusOf(n: ServiceNode): { built: "Yes" | "No"; status: string } {
  const hasPage = n.level === 1 ? n.verificationStatus === "verified" : Boolean(n.content);
  if (hasPage && isIndexable(n)) return { built: "Yes", status: "Built and published" };
  if (n.status === "draft") return { built: "No", status: n.mergedInto ? `Not built - merged into ${byId.get(n.mergedInto)?.name ?? n.mergedInto}` : "Not built - draft" };
  if (n.status === "archived") return { built: "No", status: "Not built - archived" };
  return { built: "No", status: "Not built - pending owner verification" };
}

const sorted = [...serviceNodes].sort(
  (a, b) =>
    (mainOrder.get(a.mainServiceId) ?? 99) - (mainOrder.get(b.mainServiceId) ?? 99) ||
    a.level - b.level ||
    Number(statusOf(b).built === "Yes") - Number(statusOf(a).built === "Yes") ||
    a.order - b.order ||
    a.name.localeCompare(b.name),
);

for (const n of sorted) {
  const { built, status } = statusOf(n);
  const [date, commit] = built === "Yes" ? firstCommitFor(n.slug) : ["", ""];
  rows.push({
    level: levelName[n.level],
    name: n.name,
    urlPath: n.fullUrl,
    main: n.level === 1 ? "" : (byId.get(n.mainServiceId)?.name ?? ""),
    parent: n.parentId ? (byId.get(n.parentId)?.name ?? "") : "",
    built,
    status,
    date,
    commit,
    notes: built === "Yes" ? "" : (n.note ?? ""),
  });
}

const esc = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const header = ["No", "Level", "Page name", "URL path", "Full URL", "Main service", "Parent", "Built?", "Status", "Date pushed", "Commit", "Notes"];
const lines = [
  header.join(","),
  ...rows.map((r, i) =>
    [String(i + 1), r.level, r.name, r.urlPath, `${site.url}${r.urlPath === "/" ? "" : r.urlPath}`, r.main, r.parent, r.built, r.status, r.date, r.commit, r.notes]
      .map(esc)
      .join(","),
  ),
];

fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs", "page-tracker.csv"), lines.join("\n") + "\n", "utf8");

const built = rows.filter((r) => r.built === "Yes");
const count = (lvl: string) => built.filter((r) => r.level === lvl).length;
console.log(`rows: ${rows.length}`);
console.log(`built: ${built.length} (site pages ${count("Site page")}, main ${count("Main service")}, sub ${count("Sub-service")}, micro ${count("Micro-service")})`);
console.log(`not built: ${rows.length - built.length}`);
