"use client";

import { useEffect } from "react";
import { LANGUAGES, currentLang } from "@/lib/translate";

type W = Window & {
  google?: { translate?: { TranslateElement: new (o: Record<string, unknown>, id: string) => unknown } };
  googleTranslateElementInit?: () => void;
};

/**
 * Loads the Google website translator, but only for visitors who chose Arabic or Urdu (the choice is in the "googtrans" cookie).
 * It also sets the page language and direction, so Arabic and Urdu read right to left.
 */
export default function TranslateLoader() {
  useEffect(() => {
    const lang = currentLang();
    const root = document.documentElement;
    if (lang === "en") return;
    const meta = LANGUAGES.find((l) => l.code === lang);
    root.setAttribute("lang", lang);
    root.setAttribute("dir", meta?.dir ?? "rtl");

    // The translator wraps text in new elements. React can then fail when it later removes or moves a node it no longer finds,
    // so these two calls tolerate a node that is already gone.
    const proto = Node.prototype;
    const removeChild = proto.removeChild;
    const insertBefore = proto.insertBefore;
    proto.removeChild = function <T extends Node>(this: Node, child: T): T {
      if (child.parentNode !== this) return child;
      return removeChild.call(this, child) as T;
    };
    proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
      if (ref && ref.parentNode !== this) return node;
      return insertBefore.call(this, node, ref) as T;
    };

    const w = window as W;
    w.googleTranslateElementInit = () => {
      if (!w.google?.translate) return;
      new w.google.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "ar,ur", autoDisplay: false }, "google_translate_element");
    };
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(s);
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" />;
}
