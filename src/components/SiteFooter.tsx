import { site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
      © {new Date().getFullYear()} {site.name}. All rights reserved.
    </footer>
  );
}
