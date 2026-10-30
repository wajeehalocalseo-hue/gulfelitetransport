"use client";

import { useEffect, useId, useRef, useState } from "react";
import { services } from "@/content/services";
import { mailtoUrl, site, whatsappUrl } from "@/lib/site";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const input =
  "w-full rounded-lg border border-navy/20 bg-white px-3.5 py-3 text-base text-navy placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-600";
const labelCls = "grid gap-1.5 text-sm font-semibold text-navy";

const canSubmit = Boolean(site.whatsapp || site.email);

/**
 * `variant="quick"` is a shorter form (name, phone, email, service, details) for placing
 * near the top of a page. `full` also asks for locations, date and extra requirements.
 */
export default function QuoteForm({
  defaultService = "",
  variant = "full",
}: {
  defaultService?: string;
  variant?: "full" | "quick";
}) {
  const quick = variant === "quick";
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [channel, setChannel] = useState<"whatsapp" | "email" | null>(null);
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
    if (!quick && !v.pickup) e.pickup = "Please enter the pickup location.";
    if (!quick && !v.delivery) e.delivery = "Please enter the delivery location.";
    if (v.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${v.date}T00:00`) < today) e.date = "Please choose today or a future date.";
    }
    if (v.details.length < 10) e.details = "Please describe what needs to be moved (at least a few words).";
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const d = new FormData(ev.currentTarget);
    const v: Record<string, string> = {};
    for (const k of ["name", "business", "phone", "email", "service", "pickup", "delivery", "date", "details", "extra"]) {
      v[k] = String(d.get(k) ?? "").trim();
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
      v.pickup && `Pickup: ${v.pickup}`,
      v.delivery && `Delivery: ${v.delivery}`,
      v.date && `Preferred date: ${v.date}`,
      `Details: ${v.details}`,
      v.extra && `Additional requirements: ${v.extra}`,
    ].filter(Boolean);
    const text = lines.join("\n");

    setStatus("sending");
    try {
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
        <p className="font-semibold">Your request is ready to send.</p>
        <p className="mt-2 text-sm leading-6">
          {channel === "email"
            ? "Your email app has opened with your request. Please press send there to complete it."
            : "WhatsApp has opened with your request. Please press send there to complete it."}{" "}
          Nothing is stored on this website.
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
            <input {...common("pickup")} required className={input} />
            {msg("pickup")}
          </label>
          <label className={labelCls}>
            Delivery location
            <input {...common("delivery")} required className={input} />
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
        {quick ? "What do you need to move?" : "Shipment / passenger / equipment details"}
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
        This form opens {site.whatsapp ? "WhatsApp" : "your email app"} with your request
        prefilled so you can send it. Nothing is stored on this website.
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
