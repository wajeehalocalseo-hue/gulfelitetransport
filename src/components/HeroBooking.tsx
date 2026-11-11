import type { ReactNode } from "react";
import QuoteForm from "./QuoteForm";

const TAXI = "Taxi & Cab Services";

type FormProps = {
  /** Prefilled service. "Taxi & Cab Services" switches the form to a ride booking. */
  service?: string;
  topic?: string;
  pickup?: string;
  dropoff?: string;
  className?: string;
};

/** The booking card (title + form). Used on its own in the home hero and by HeroBooking elsewhere. */
export function BookingCard({ service = "", topic = "", pickup = "", dropoff = "", className = "" }: FormProps) {
  const ride = service === TAXI;
  return (
    <div id="hero-quote" className={`rounded-2xl border-t-4 border-accent bg-white p-5 text-navy shadow-2xl ring-1 ring-black/10 ${className}`}>
      <h2 className="text-xl font-extrabold">{ride ? "Book your ride" : "Get a free quote"}</h2>
      <p className="mb-4 mt-1 text-sm leading-6 text-muted">
        {ride ? "Tell us where and when. We confirm the vehicle, driver and fare first." : "Tell us what you need and we will reply with a quotation."}
      </p>
      <QuoteForm variant="booking" defaultService={service} topic={topic} pickupDefault={pickup} dropoffDefault={dropoff} />
    </div>
  );
}

/**
 * Puts the booking form on the right side of a page hero (wide screens) and directly under the hero
 * on smaller screens. The hero keeps its own design: on wide screens its content area is narrowed
 * to leave room for the form, and the form floats over the hero's right side.
 */
export default function HeroBooking({ children, ...form }: FormProps & { children: ReactNode }) {
  return (
    <div className="relative">
      <div className="min-[1100px]:[&>section]:min-h-[720px] min-[1100px]:[&>section>div:last-child]:max-w-7xl min-[1100px]:[&>section>div:last-child]:pr-[450px]">
        {children}
      </div>
      <div className="bg-navy px-5 pb-10 pt-6 min-[1100px]:pointer-events-none min-[1100px]:absolute min-[1100px]:inset-x-0 min-[1100px]:top-0 min-[1100px]:bg-transparent min-[1100px]:p-0">
        <div className="mx-auto max-w-7xl min-[1100px]:flex min-[1100px]:justify-end min-[1100px]:px-5 min-[1100px]:pt-10">
          <BookingCard {...form} className="pointer-events-auto mx-auto w-full max-w-xl min-[1100px]:mx-0 min-[1100px]:w-[420px] min-[1100px]:max-w-none" />
        </div>
      </div>
    </div>
  );
}
