"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fleet } from "@/content/home";
import { mailtoUrl, site, whatsappUrl } from "@/lib/site";
import { saveQuoteRequest, supabaseConfigured } from "@/lib/supabase";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const STEPS = ["Journey", "Vehicle", "Return", "Contact"] as const;
const field =
  "w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-base text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
const lbl = "grid gap-1.5 text-sm font-semibold text-navy";
const canSubmit = Boolean(supabaseConfigured || site.whatsapp || site.email);

/** Smallest vehicle that fits the passengers, from the published capacities. */
function suggest(pax: number): string {
  const sizes: [string, number][] = [["Sedan", 4], ["SUV", 6], ["Family van", 8], ["Group van", 12], ["Minibus", 29]];
  return sizes.find(([, max]) => pax <= max)?.[0] ?? "Coach";
}

function Counter({ label, value, set, min = 1, max = 60 }: { label: string; value: number; set: (n: number) => void; min?: number; max?: number }) {
  const id = useId();
  return (
    <div className={lbl}>
      <span id={id}>{label}</span>
      <div role="group" aria-labelledby={id} className="flex items-center justify-between rounded-lg border border-navy/20 bg-white px-2 py-1.5">
        <button type="button" aria-label={`Fewer ${label.toLowerCase()}`} onClick={() => set(Math.max(min, value - 1))} className="h-9 w-9 rounded-md bg-surface text-lg font-bold text-navy hover:bg-navy/10">
          -
        </button>
        <span className="text-lg font-extrabold" aria-live="polite">
          {value}
        </span>
        <button type="button" aria-label={`More ${label.toLowerCase()}`} onClick={() => set(Math.min(max, value + 1))} className="h-9 w-9 rounded-md bg-surface text-lg font-bold text-navy hover:bg-navy/10">
          +
        </button>
      </div>
    </div>
  );
}

export default function BookWizard() {
  const q = useSearchParams();
  const uid = useId();
  const loadedAt = useRef(0);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [channel, setChannel] = useState<"saved" | "whatsapp" | "email" | null>(null);

  const [from, setFrom] = useState(q.get("from") ?? "");
  const [to, setTo] = useState(q.get("to") ?? "");
  const [date, setDate] = useState(q.get("date") ?? "");
  const [time, setTime] = useState(q.get("time") ?? "");
  const [pax, setPax] = useState(Math.max(1, Number(q.get("passengers")) || 1));
  const [bags, setBags] = useState(Math.max(0, Number(q.get("luggage")) || 1));
  const [vehicle, setVehicle] = useState("Any");
  const [ret, setRet] = useState(false);
  const [retDate, setRetDate] = useState("");
  const [retTime, setRetTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  const suggested = suggest(pax);

  function check(s: number): Errors {
    const e: Errors = {};
    if (s === 0) {
      if (!from.trim()) e.from = "Please enter the pickup location.";
      if (!to.trim()) e.to = "Please enter the drop-off location.";
      if (!date) e.date = "Please choose the pickup date.";
      else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(`${date}T00:00`) < today) e.date = "Please choose today or a future date.";
      }
    }
    if (s === 2 && ret) {
      if (!retDate) e.retDate = "Please choose the return date.";
      else if (date && retDate < date) e.retDate = "The return cannot be before the pickup date.";
    }
    if (s === 3) {
      if (name.trim().length < 2) e.name = "Please enter your full name.";
      if (!/^[+\d][\d\s()-]{6,}$/.test(phone.trim())) e.phone = "Please enter a valid phone number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid email address.";
    }
    return e;
  }

  function next() {
    const e = check(step);
    setErrors(e);
    if (!Object.keys(e).length) setStep(step + 1);
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const hp = (ev.currentTarget as HTMLFormElement).elements.namedItem("company_website") as HTMLInputElement | null;
    if ((hp && hp.value !== "") || Date.now() - loadedAt.current < 2500) {
      setStatus("sent");
      setChannel("saved");
      return;
    }
    const e = check(3);
    setErrors(e);
    if (Object.keys(e).length) return;

    const details = [
      `Passengers: ${pax}`,
      `Bags: ${bags}`,
      time && `Time: ${time}`,
      `Vehicle: ${vehicle === "Any" ? `no preference (suggested: ${suggested})` : vehicle}`,
      ret ? `Return: ${retDate}${retTime ? ` at ${retTime}` : ""}` : "One way",
      notes.trim() && `Notes: ${notes.trim()}`,
    ]
      .filter(Boolean)
      .join(" | ");
    const text = [`Booking request - ${site.name}`, `Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`, `Pickup: ${from}`, `Drop-off: ${to}`, `Date: ${date}`, details].join("\n");

    setStatus("sending");
    void (async () => {
      try {
        if (supabaseConfigured) {
          try {
            await saveQuoteRequest({
              name: name.trim(),
              phone: phone.trim(),
              email: email.trim(),
              service: "Taxi & Cab Services",
              topic: "Booking page",
              pickup: from.trim(),
              dropoff: to.trim(),
              preferred_date: date,
              details,
              page_path: window.location.pathname,
            });
            setChannel("saved");
            setStatus("sent");
            return;
          } catch {
            // Fall through to WhatsApp or email so the request is never lost.
          }
        }
        const wa = whatsappUrl(text);
        const mail = mailtoUrl("Booking request: Taxi & Cab Services", text);
        if (wa) {
          setChannel("whatsapp");
          window.open(wa, "_blank", "noopener,noreferrer");
        } else if (mail) {
          setChannel("email");
          window.location.href = mail;
        } else {
          throw new Error("No contact channel configured");
        }
        setStatus("sent");
      } catch {
        setStatus("error");
      }
    })();
  }

  const err = (k: string) =>
    errors[k] ? (
      <span role="alert" className="text-sm font-normal text-red-700">
        {errors[k]}
      </span>
    ) : null;
  const inv = (k: string) => ({ "aria-invalid": errors[k] ? (true as const) : undefined });

  if (!canSubmit) {
    return (
      <div role="status" className="rounded-xl border border-accent/50 bg-accent/10 p-6 text-navy">
        <p className="font-semibold">The booking form is not connected yet.</p>
        <p className="mt-2 text-sm leading-6">Add a verified WhatsApp number or email address in <code>src/lib/site.ts</code> to enable bookings.</p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-green-700/30 bg-green-50 p-8 text-navy">
        <h2 className="text-2xl font-extrabold">{channel === "saved" ? "Thank you, your request has been received." : "Your request is ready to send."}</h2>
        <p className="mt-3 leading-7">
          {channel === "saved"
            ? "We will check the vehicle and driver for your trip and contact you on the phone number or email you gave. The fare is confirmed with you before you commit."
            : channel === "email"
              ? "Your email app has opened with your request. Please press send there to complete it."
              : "WhatsApp has opened with your request. Please press send there to complete it."}
        </p>
        <Link href="/" className="mt-5 inline-block font-semibold underline decoration-accent decoration-2 underline-offset-4">
          Back to the home page
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div>
        <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Booking steps">
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined} className="text-center text-xs font-bold uppercase tracking-wide">
              <span className={`mx-auto mb-1 grid h-9 w-9 place-items-center rounded-full text-sm ${i <= step ? "bg-navy text-white" : "bg-navy/10 text-navy/60"}`}>{i + 1}</span>
              <span className={i === step ? "text-navy" : "text-muted"}>{s}</span>
            </li>
          ))}
        </ol>

        <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-navy/10 sm:p-8">
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <h2 className="text-2xl font-extrabold text-navy sm:col-span-2">Journey details</h2>
              <label className={`${lbl} sm:col-span-2`}>
                From
                <input {...inv("from")} value={from} onChange={(e) => setFrom(e.target.value)} autoComplete="off" placeholder="Address, hotel or airport" className={field} />
                {err("from")}
              </label>
              <label className={`${lbl} sm:col-span-2`}>
                To
                <input {...inv("to")} value={to} onChange={(e) => setTo(e.target.value)} autoComplete="off" placeholder="Address, hotel or airport" className={field} />
                {err("to")}
              </label>
              <label className={lbl}>
                Date
                <input {...inv("date")} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
                {err("date")}
              </label>
              <label className={lbl}>
                Time
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={field} />
              </label>
              <Counter label="Passengers" value={pax} set={setPax} />
              <Counter label="Large bags" value={bags} set={setBags} min={0} />
            </div>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="text-2xl font-extrabold text-navy">Choose a vehicle</legend>
              <p className="mt-2 text-sm leading-6 text-muted">For {pax} passenger{pax === 1 ? "" : "s"} we suggest a {suggested}. The exact vehicle is confirmed for your request.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Any", ...fleet.items.map((v) => v.name)].map((n) => {
                  const v = fleet.items.find((x) => x.name === n);
                  return (
                    <label key={n} className={`cursor-pointer rounded-xl border p-4 transition has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:ring-2 has-[:checked]:ring-accent/50 ${n === suggested ? "border-navy/40" : "border-navy/15"}`}>
                      <input type="radio" name="vehicle" value={n} checked={vehicle === n} onChange={() => setVehicle(n)} className="sr-only" />
                      <span className="flex items-center justify-between gap-2 font-extrabold text-navy">
                        {n === "Any" ? "No preference" : n}
                        {n === suggested && <span className="rounded-full bg-navy px-2 py-0.5 text-[11px] font-bold uppercase text-white">Suggested</span>}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-muted">{v ? `${v.pax} passengers, ${v.bags.toLowerCase()}. ${v.best}` : "We choose the right size from your passengers and bags."}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <h2 className="text-2xl font-extrabold text-navy sm:col-span-2">Return trip</h2>
              <div role="radiogroup" aria-label="Trip type" className="grid grid-cols-2 gap-3 sm:col-span-2">
                {[
                  [false, "One way"],
                  [true, "Add a return"],
                ].map(([val, text]) => (
                  <label key={String(text)} className="cursor-pointer rounded-xl border border-navy/15 p-4 text-center font-bold text-navy has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:ring-2 has-[:checked]:ring-accent/50">
                    <input type="radio" name="trip" checked={ret === val} onChange={() => setRet(val as boolean)} className="sr-only" />
                    {text as string}
                  </label>
                ))}
              </div>
              {ret && (
                <>
                  <label className={lbl}>
                    Return date
                    <input {...inv("retDate")} type="date" min={date || undefined} value={retDate} onChange={(e) => setRetDate(e.target.value)} className={field} />
                    {err("retDate")}
                  </label>
                  <label className={lbl}>
                    Return time
                    <input type="time" value={retTime} onChange={(e) => setRetTime(e.target.value)} className={field} />
                  </label>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <h2 className="text-2xl font-extrabold text-navy sm:col-span-2">Your contact details</h2>
              <label className={lbl}>
                Full name
                <input {...inv("name")} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
                {err("name")}
              </label>
              <label className={lbl}>
                Phone / WhatsApp
                <input {...inv("phone")} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder="+966..." className={field} />
                {err("phone")}
              </label>
              <label className={`${lbl} sm:col-span-2`}>
                Email
                <input {...inv("email")} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={field} />
                {err("email")}
              </label>
              <label className={`${lbl} sm:col-span-2`}>
                Notes <span className="font-normal text-muted">(optional: flight number, child seat, wheelchair)</span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
              </label>
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Leave this field empty
                  <input name="company_website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {status === "error" && (
                <p role="alert" className="text-sm text-red-700 sm:col-span-2">
                  Sorry, we could not send your request. Please try again or contact us directly.
                </p>
              )}
              <p id={`${uid}-note`} className="text-sm leading-6 text-muted sm:col-span-2">
                {supabaseConfigured ? "Your details are saved securely and used only to reply to your request. See our privacy policy." : "This opens WhatsApp or your email app with your request filled in."} No payment now.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="rounded-full px-5 py-3 font-semibold text-navy underline decoration-accent decoration-2 underline-offset-4">
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button type="button" onClick={next} className="rounded-full bg-accent px-8 py-3.5 font-extrabold text-navy transition hover:brightness-95">
                {step === 0 ? "Choose vehicle" : "Continue"}
              </button>
            ) : (
              <button type="submit" disabled={status === "sending"} className="rounded-full bg-accent px-8 py-3.5 font-extrabold text-navy transition hover:brightness-95 disabled:opacity-60">
                {status === "sending" ? "Sending..." : "Send booking request"}
              </button>
            )}
          </div>
        </form>
      </div>

      <aside className="h-fit rounded-2xl bg-navy p-6 text-white lg:sticky lg:top-24" aria-label="Trip summary">
        <h2 className="text-lg font-extrabold">Trip summary</h2>
        <dl className="mt-4 grid gap-3 text-sm">
          <div>
            <dt className="text-xs font-bold uppercase text-accent">Pickup</dt>
            <dd className="font-semibold">{from || "Not set yet"}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase text-accent">Drop-off</dt>
            <dd className="font-semibold">{to || "Not set yet"}</dd>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-white/15 pt-3">
            <div>
              <dt className="text-white/60">Date</dt>
              <dd className="font-semibold">{date || "-"}</dd>
            </div>
            <div>
              <dt className="text-white/60">Time</dt>
              <dd className="font-semibold">{time || "-"}</dd>
            </div>
            <div>
              <dt className="text-white/60">Passengers</dt>
              <dd className="font-semibold">{pax}</dd>
            </div>
            <div>
              <dt className="text-white/60">Vehicle</dt>
              <dd className="font-semibold">{vehicle === "Any" ? `Any (${suggested})` : vehicle}</dd>
            </div>
          </div>
          {ret && (
            <div className="border-t border-white/15 pt-3">
              <dt className="text-white/60">Return</dt>
              <dd className="font-semibold">{retDate || "Date not set"}{retTime ? ` at ${retTime}` : ""}</dd>
            </div>
          )}
        </dl>
        <p className="mt-5 text-xs leading-5 text-white/70">The fare is confirmed with you before you commit. No fare is shown here.</p>
      </aside>
    </div>
  );
}
