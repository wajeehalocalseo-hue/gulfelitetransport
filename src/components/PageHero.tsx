import type { ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import { BookingCard } from "./HeroBooking";

export default function PageHero({
  crumbs,
  h1,
  lead,
  children,
  aside,
  booking = {},
}: {
  crumbs: { name: string; href?: string }[];
  h1: string;
  lead?: string;
  children?: ReactNode;
  /** Replaces the booking form on the right. Normally leave unset. */
  aside?: ReactNode;
  /** Booking form on the right of the hero. Pass `false` where the page itself is the form. */
  booking?: false | { service?: string; topic?: string };
}) {
  const right = aside ?? (booking === false ? null : <BookingCard service={booking.service} topic={booking.topic} className="w-full max-w-xl justify-self-end lg:max-w-none" />);
  return (
    <section className="bg-navy text-white">
      <div
        className={`mx-auto max-w-7xl px-5 py-14 sm:py-20 ${right ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}
      >
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {h1}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{lead}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {right}
      </div>
    </section>
  );
}
