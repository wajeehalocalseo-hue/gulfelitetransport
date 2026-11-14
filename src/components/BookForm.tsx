"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { mailtoUrl, site, whatsappUrl } from "@/lib/site";
import { saveQuoteRequest, supabaseConfigured } from "@/lib/supabase";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-base text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
const lbl = "grid gap-1.5 text-sm font-semibold text-navy";
const canSubmit = Boolean(supabaseConfigured || site.whatsapp || site.email);

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

/**
 * The booking form: journey details and the passenger's contact details in one form.
 * It is filled in from the short form's query string and sent to the same place as every other request.
 */
export default function BookForm() {
  const q = useSearchParams();
  const loadedAt = useRef(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [channel, setChannel] = useState<"saved" | "whatsapp" | "email" | null>(null);

  const [from, setFrom] = useState(q.get("from") ?? "");
  const [to, setTo] = useState(q.get("to") ?? "");
  const [date, setDate] = useState(q.get("date") ?? "");
  const [time, setTime] = useState(q.get("time") ?? "");
  const [pax, setPax] = useState(Math.max(1, Number(q.get("passengers")) || 1));
  const [bags, setBags] = useState(Math.max(0, Number(q.get("luggage")) || 1));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  function check(): Errors {
    const e: Errors = {};
    if (!from.trim()) e.from = "Please enter the pickup location.";
    if (!to.trim()) e.to = "Please enter the drop-off location.";
    if (!date) e.date = "Please choose the pickup date.";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${date}T00:00`) < today) e.date = "Please choose today or a future date.";
    }
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[+\d][\d\s()-]{6,}$/.test(phone.trim())) e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Please enter a valid email address.";
    return e;
  }

  function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    // Spam protection: hidden honeypot and a minimum fill time. Bots get a fake "sent" state.
    const hp = ev.currentTarget.elements.namedItem("company_website") as HTMLInputElement | null;
    if ((hp && hp.value !== "") || Date.now() - loadedAt.current < 2500) {
      setChannel("saved");
      setStatus("sent");
      return;
    }
    const e = check();
    setErrors(e);
    if (Object.keys(e).length) return;

    const details = [`Passengers: ${pax}`, `Bags: ${bags}`, time && `Time: ${time}`, notes.trim() && `Notes: ${notes.trim()}`].filter(Boolean).join(" | ");
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
    <form onSubmit={submit} noValidate className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-navy/10 sm:p-8">
      <h2 className="text-2xl font-extrabold text-navy">Journey details</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

      <h2 className="mt-8 text-2xl font-extrabold text-navy">Passenger details</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
          Notes <span className="font-normal text-muted">(optional: flight number, return trip, child seat, wheelchair)</span>
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={field} />
        </label>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Sorry, we could not send your request. Please try again or contact us directly.
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="mt-8 w-full rounded-full bg-accent px-8 py-3.5 text-lg font-extrabold text-navy transition hover:brightness-95 disabled:opacity-60">
        {status === "sending" ? "Sending..." : "Send booking request"}
      </button>
      <p className="mt-3 text-center text-sm leading-6 text-muted">
        {supabaseConfigured ? "Your details are saved securely and used only to reply to your request. See our privacy policy." : "This opens WhatsApp or your email app with your request filled in."} No payment now.
      </p>
    </form>
  );
}
