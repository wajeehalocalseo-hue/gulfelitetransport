"use client";

import { useEffect, useId, useRef, useState } from "react";
import { services } from "@/content/services";
import { mailtoUrl, site, whatsappUrl } from "@/lib/site";
import { saveQuoteRequest, supabaseConfigured } from "@/lib/supabase";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-base text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
const labelCls = "grid gap-1.5 text-sm font-semibold text-navy";

const canSubmit = Boolean(supabaseConfigured || site.whatsapp || site.email);

/**
 * `variant="quick"` is a shorter form (name, phone, email, service, details) for placing
 * near the top of a page. `full` also asks for locations, date and extra requirements.
 */
export default function QuoteForm({
  defaultService = "",
  variant = "full",
  topic = "",
  pickupDefault = "",
  dropoffDefault = "",
}: {
  defaultService?: string;
  variant?: "full" | "quick" | "booking";
  /** Sub-service the visitor is viewing; added to the message as context, not to the fields. */
  topic?: string;
  /** Prefills for location pages. */
  pickupDefault?: string;
  dropoffDefault?: string;
}) {
  const booking = variant === "booking";
  const quick = variant === "quick";
  const ride = defaultService === "Taxi & Cab Services";
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [channel, setChannel] = useState<"whatsapp" | "email" | "saved" | null>(null);
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  function validate(v: Record<string, string>): Errors {
    const e: Errors = {};
    if (v.name.length < 2) e.name = "Please enter your full name.";
    if (!/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
    if (!v.service) e.service = "Please choose the service you need.";
    if ((booking || !quick) && !v.pickup) e.pickup = "Please enter the pickup location.";
    if ((booking || !quick) && !v.delivery) e.delivery = ride ? "Please enter the drop-off location." : "Please enter the delivery location.";
    if (v.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${v.date}T00:00`) < today) e.date = "Please choose today or a future date.";
    }
    if (v.details.length < 10) e.details = ride ? "Please tell us how many passengers and bags, and when." : "Please describe what needs to be moved (at least a few words).";
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    const v: Record<string, string> = {};
    for (const k of ["name", "business", "phone", "email", "service", "pickup", "delivery", "date", "details", "extra", "time", "passengers", "vehicle", "notes"]) {
      v[k] = String(d.get(k) ?? "").trim();
    }
    if (booking && ride) {
      v.details = [`Passengers: ${v.passengers || "1"}`, v.time && `Time: ${v.time}`, v.vehicle && `Vehicle: ${v.vehicle}`, v.notes && `Notes: ${v.notes}`]
        .filter(Boolean)
        .join(" | ");
    }

    // Spam protection: hidden honeypot field + a minimum fill time. Bots get a fake "sent" state.
    const isBot = String(d.get("company_website") ?? "") !== "" || Date.now() - loadedAt.current < 2500;
    if (isBot) {
      setStatus("sent");
      return;
    }

    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      return;
    }

    const lines = [
      `Quote request - ${site.name}`,
      `Name: ${v.name}`,
      v.business && `Business: ${v.business}`,
      `Phone: ${v.phone}`,
      `Email: ${v.email}`,
      `Service: ${v.service}`,
      topic && `Topic: ${topic}`,
      v.pickup && `Pickup: ${v.pickup}`,
      v.delivery && `${ride ? "Drop-off" : "Delivery"}: ${v.delivery}`,
      v.date && `Preferred date: ${v.date}`,
      `Details: ${v.details}`,
      v.extra && `Additional requirements: ${v.extra}`,
    ].filter(Boolean);
    const text = lines.join("\n");

    setStatus("sending");
    void (async () => {
    try {
      if (supabaseConfigured) {
        try {
          await saveQuoteRequest({
            name: v.name,
            business: v.business,
            phone: v.phone,
            email: v.email,
            service: v.service,
            topic,
            pickup: v.pickup,
            dropoff: v.delivery,
            preferred_date: v.date,
            details: v.details,
            extra: v.extra,
            page_path: window.location.pathname,
          });
          setChannel("saved");
          setStatus("sent");
          return;
        } catch {
          // Fall through to WhatsApp / email so the request is never lost.
        }
      }
      const wa = whatsappUrl(text);
      const mail = mailtoUrl(`Quote request: ${v.service}`, text);
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

  const err = (k: string) => errors[k];
  const common = (k: string) => ({
    name: k,
    "aria-invalid": err(k) ? (true as const) : undefined,
    "aria-describedby": err(k) ? `${uid}-${k}-error` : undefined,
  });
  const msg = (k: string) =>
    err(k) ? (
      <span id={`${uid}-${k}-error`} role="alert" className="text-sm font-normal text-red-700">
        {err(k)}
      </span>
    ) : null;

  if (!canSubmit) {
    return (
      <div role="status" className="rounded-xl border border-accent/50 bg-accent/10 p-6 text-navy">
        <p className="font-semibold">The quote form is not connected yet.</p>
        <p className="mt-2 text-sm leading-6">
          Add a verified WhatsApp number or email address in <code>src/lib/site.ts</code> to
          enable quote requests. Until then, this form is intentionally disabled instead of
          pretending to save submissions.
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-green-700/30 bg-green-50 p-6 text-navy">
        <p className="font-semibold">
          {channel === "saved" ? "Thank you, your request has been received." : "Your request is ready to send."}
        </p>
        <p className="mt-2 text-sm leading-6">
          {channel === "saved"
            ? "Our team will review it and contact you on the phone number or email you gave."
            : channel === "email"
              ? "Your email app has opened with your request. Please press send there to complete it."
              : "WhatsApp has opened with your request. Please press send there to complete it."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4"
        >
          Submit another request
        </button>
      </div>
    );
  }

  if (booking) {
    const sm =
      "w-full rounded-lg border border-navy/20 bg-white px-3 py-2.5 text-sm text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
    const lbl = "grid gap-1 text-xs font-bold uppercase tracking-wide text-navy/80";
    const full = "col-span-2";
    return (
      <form onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-3 gap-y-3" aria-describedby={`${uid}-note`}>
        {ride ? (
          <input type="hidden" name="service" value={defaultService} />
        ) : (
          <label className={`${lbl} ${full}`}>
            Service
            <select {...common("service")} required defaultValue={defaultService} className={sm}>
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            {msg("service")}
          </label>
        )}
        <label className={`${lbl} ${full}`}>
          {ride ? "Pickup" : "Pickup location"}
          <input {...common("pickup")} defaultValue={pickupDefault} required autoComplete="off" placeholder={ride ? "Address, hotel or airport" : "City or address"} className={sm} />
          {msg("pickup")}
        </label>
        <label className={`${lbl} ${full}`}>
          {ride ? "Drop-off" : "Delivery location"}
          <input {...common("delivery")} defaultValue={dropoffDefault} required autoComplete="off" placeholder={ride ? "Address, hotel or airport" : "City or address"} className={sm} />
          {msg("delivery")}
        </label>
        <label className={`${lbl} ${ride ? "" : full}`}>
          Date
          <input {...common("date")} type="date" className={sm} />
          {msg("date")}
        </label>
        {ride && (
          <>
            <label className={lbl}>
              Time
              <input name="time" type="time" className={sm} />
            </label>
            <label className={lbl}>
              Passengers
              <select name="passengers" defaultValue="1" className={sm}>
                {Array.from({ length: 14 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
                <option value="15+">15 or more</option>
              </select>
            </label>
            <label className={lbl}>
              Vehicle
              <select name="vehicle" defaultValue="Any" className={sm}>
                {["Any", "Sedan", "SUV", "Family van", "Minibus", "Luxury"].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <label className={lbl}>
          Full name
          <input {...common("name")} required autoComplete="name" className={sm} />
          {msg("name")}
        </label>
        <label className={lbl}>
          Phone
          <input {...common("phone")} type="tel" required autoComplete="tel" placeholder="+966..." className={sm} />
          {msg("phone")}
        </label>
        <label className={`${lbl} ${full}`}>
          Email
          <input {...common("email")} type="email" required autoComplete="email" className={sm} />
          {msg("email")}
        </label>
        {ride ? (
          <label className={`${lbl} ${full}`}>
            Notes <span className="font-normal normal-case text-muted">(optional: bags, child seat, flight no.)</span>
            <input name="notes" className={sm} />
          </label>
        ) : (
          <label className={`${lbl} ${full}`}>
            What do you need to move?
            <textarea {...common("details")} rows={2} required className={sm} />
            {msg("details")}
          </label>
        )}

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Leave this field empty
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {status === "error" && (
          <p role="alert" className="col-span-2 text-sm text-red-700">
            Sorry, we could not send your request. Please try again or contact us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="col-span-2 rounded-full bg-accent px-6 py-3 font-extrabold text-navy transition hover:brightness-95 focus-visible:outline-navy disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : ride ? "Book this ride" : "Request my quote"}
        </button>
        <p id={`${uid}-note`} className="col-span-2 text-center text-xs leading-5 text-muted">
          No payment now. We confirm the vehicle, driver and price before you commit.
        </p>
      </form>
    );
  }

  return (
    <div className="@container">
    <form onSubmit={onSubmit} noValidate className="grid gap-4 @lg:grid-cols-2" aria-describedby={`${uid}-note`}>
      <label className={labelCls}>
        Full name
        <input {...common("name")} required autoComplete="name" className={input} />
        {msg("name")}
      </label>
      {!quick && (
        <label className={labelCls}>
          Business name <span className="font-normal text-muted">(optional)</span>
          <input name="business" autoComplete="organization" className={input} />
        </label>
      )}
      <label className={labelCls}>
        Phone number
        <input {...common("phone")} type="tel" required autoComplete="tel" className={input} />
        {msg("phone")}
      </label>
      <label className={labelCls}>
        Email address
        <input {...common("email")} type="email" required autoComplete="email" className={input} />
        {msg("email")}
      </label>
      <label className={`${labelCls} @lg:col-span-2`}>
        Service required
        <select {...common("service")} required defaultValue={defaultService} className={input}>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
        {msg("service")}
      </label>
      {!quick && (
        <>
          <label className={labelCls}>
            Pickup location
            <input {...common("pickup")} defaultValue={pickupDefault} required className={input} />
            {msg("pickup")}
          </label>
          <label className={labelCls}>
            {ride ? "Drop-off location" : "Delivery location"}
            <input {...common("delivery")} defaultValue={dropoffDefault} required className={input} />
            {msg("delivery")}
          </label>
          <label className={`${labelCls} @lg:col-span-2`}>
            Preferred date <span className="font-normal text-muted">(optional)</span>
            <input {...common("date")} type="date" className={input} />
            {msg("date")}
          </label>
        </>
      )}
      <label className={`${labelCls} @lg:col-span-2`}>
        {quick
          ? ride
            ? "Passengers, bags and time"
            : "What do you need to move?"
          : ride
            ? "Ride details (passengers, bags, time)"
            : "Shipment / passenger / equipment details"}
        <textarea {...common("details")} rows={quick ? 3 : 4} required className={input} />
        {msg("details")}
      </label>
      {!quick && (
        <label className={`${labelCls} @lg:col-span-2`}>
          Additional requirements <span className="font-normal text-muted">(optional)</span>
          <textarea name="extra" rows={3} className={input} />
        </label>
      )}

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it in */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700 @lg:col-span-2">
          Sorry, we could not open the message. Please try again or contact us directly.
        </p>
      )}

      <p id={`${uid}-note`} className="text-sm leading-6 text-muted @lg:col-span-2">
        {supabaseConfigured
          ? "Your details are saved securely and used only to reply to your request. See our privacy policy."
          : `This form opens ${site.whatsapp ? "WhatsApp" : "your email app"} with your request prefilled so you can send it. Nothing is stored on this website.`}
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-accent px-7 py-3.5 font-semibold text-navy transition hover:brightness-95 focus-visible:outline-navy disabled:opacity-60 @lg:col-span-2"
      >
        {status === "sending" ? "Preparing your request..." : "Get a Free Quote"}
      </button>
    </form>
    </div>
  );
}
