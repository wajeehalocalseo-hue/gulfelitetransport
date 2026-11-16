import { site } from "@/lib/site";

type Item = { key: keyof typeof site.social; label: string; path: string; viewBox?: string };

/** Simple brand marks. A link shows only when its URL is filled in under `social` in src/lib/site.ts. */
const items: Item[] = [
  { key: "facebook", label: "Facebook", path: "M13.5 21v-7.5h2.5l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.7V4.4C16.4 4.4 15.5 4.3 14.5 4.3c-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6V21h2.9Z" },
  { key: "instagram", label: "Instagram", path: "M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.8-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 12c0-2.6 0-2.9-.1-3.9-.1-1-.3-1.7-.7-2.3a4.6 4.6 0 0 0-1.7-1.7c-.6-.4-1.3-.6-2.3-.7C15.9 3.3 15.6 3.3 13 3.3h-2c-2.6 0-2.9 0-3.9.1-1 .1-1.7.3-2.3.7a4.6 4.6 0 0 0-1.7 1.7c-.4.6-.6 1.3-.7 2.3C2.3 9.1 2.3 9.4 2.3 12v.1c0 2.5 0 2.8.1 3.8.1 1 .3 1.7.7 2.3.4.7 1 1.2 1.7 1.7.6.4 1.3.6 2.3.7 1 .1 1.3.1 3.9.1h2c2.6 0 2.9 0 3.9-.1 1-.1 1.7-.3 2.3-.7a4.6 4.6 0 0 0 1.7-1.7c.4-.6.6-1.3.7-2.3.1-1 .1-1.3.1-3.9Z" },
  { key: "tiktok", label: "TikTok", path: "M16.6 3h-2.9v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.9a5.5 5.5 0 1 0 4.7 5.5V9a6.9 6.9 0 0 0 3.9 1.2V7.3a4 4 0 0 1-3.9-4.3Z" },
  { key: "x", label: "X", path: "M17.9 3.5h3.1l-6.8 7.7L22 21h-6.2l-4.8-6.3L5.500 21H2.400l7.200-8.300L2 3.500h6.400l4.400 5.800 5.100-5.800Zm-1.100 15.700h1.700L7.300 5.200H5.500l11.300 14Z" },
  { key: "youtube", label: "YouTube", path: "M21.600 7.200a2.500 2.500 0 0 0-1.800-1.800C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800C22 15.200 22 12 22 12s0-3.200-.4-4.800ZM10 15V9l5.200 3L10 15Z" },
  { key: "linkedin", label: "LinkedIn", path: "M4.500 8.500h3.400V20H4.500V8.500ZM6.200 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4.300 5.500h3.200v1.600h.1c.5-.9 1.600-1.900 3.300-1.900 3.500 0 4.100 2.300 4.100 5.300V20h-3.400v-5.600c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900V20h-3.400V8.500Z" },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  const shown = items.filter((i) => site.social[i.key]);
  if (shown.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="Social profiles">
      {shown.map((i) => (
        <li key={i.key}>
          <a
            href={site.social[i.key]}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={`Gulf Elite Transport on ${i.label}`}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white ring-1 ring-white/15 transition hover:bg-accent hover:text-navy"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor"><path d={i.path} /></svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
