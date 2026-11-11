"use client";

import { useSyncExternalStore } from "react";

const KEY = "ge_admin_theme";
const listeners = new Set<() => void>();

export type Theme = "dark" | "light";

function read(): Theme {
  try {
    return localStorage.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

/** Admin theme. Dark is the default; the choice is remembered in this browser. */
export function useAdminTheme(): [Theme, (t: Theme) => void] {
  const theme = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => "dark" as Theme,
  );
  const set = (t: Theme) => {
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* ignore */
    }
    listeners.forEach((l) => l());
  };
  return [theme, set];
}
