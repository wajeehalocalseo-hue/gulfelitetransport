import { site } from "@/lib/site";

async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
      © <Year /> {site.name}. All rights reserved.
    </footer>
  );
}
