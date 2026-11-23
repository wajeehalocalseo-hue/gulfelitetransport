"use client";

import { useEffect, useState } from "react";
import { LANGUAGES, currentLang, setLang, type Lang } from "@/lib/translate";
import { track } from "@/lib/track";

function choose(next: Lang) {
  track("language_change", { language: next });
  setLang(next);
  window.location.reload();
}

/**
 * Language choice: English, Arabic or Urdu. Picking one stores the choice and reloads the page in that language.
 * "select" is a compact drop-down for the header bar; "buttons" is a row of three buttons for the mobile menu, where the header has no spare width.
 */
export default function LanguageSwitcher({ variant = "select", className }: { variant?: "select" | "buttons"; className?: string }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => setLangState(currentLang()), []);

  if (variant === "buttons") {
    return (
      <div role="group" aria-label="Language" translate="no" className={`notranslate flex items-center gap-2 ${className ?? ""}`}>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            aria-pressed={lang === l.code}
            onClick={() => lang !== l.code && choose(l.code)}
            className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${lang === l.code ? "border-accent bg-accent text-navy" : "border-white/25 text-white/90 hover:border-accent hover:text-accent"}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <label className={`items-center gap-1.5 ${className ?? "inline-flex"}`}>
      <span className="sr-only">Language</span>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      </svg>
      <select
        value={lang}
        aria-label="Language"
        translate="no"
        onChange={(e) => {
          const next = e.target.value as Lang;
          setLangState(next);
          choose(next);
        }}
        className="notranslate cursor-pointer rounded-md border border-white/25 bg-navy px-2 py-1.5 text-sm font-semibold text-white focus-visible:outline-accent"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
