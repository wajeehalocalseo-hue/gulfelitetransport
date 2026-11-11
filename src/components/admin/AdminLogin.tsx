"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminSignIn, supabaseConfigured } from "@/lib/supabase";

const input =
  "w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-base text-navy focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    setBusy(true);
    setError("");
    try {
      await adminSignIn(String(d.get("email") ?? "").trim(), String(d.get("password") ?? ""));
      router.push("/admin");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign in.");
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border-t-4 border-accent bg-white p-8 shadow-xl ring-1 ring-black/5">
      <h1 className="text-2xl font-extrabold text-navy">Admin sign in</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Gulf Elite Transport Group. Authorised staff only.</p>
      {!supabaseConfigured ? (
        <p role="alert" className="mt-6 text-sm text-red-700">Supabase is not configured for this build.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold text-navy">
            Email
            <input name="email" type="email" required autoComplete="username" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-navy">
            Password
            <input name="password" type="password" required autoComplete="current-password" className={input} />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-accent px-6 py-3 font-extrabold text-navy transition hover:brightness-95 disabled:opacity-60"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
