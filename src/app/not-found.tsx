import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">Error 404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-navy">Page not found</h1>
      <p className="mt-4 text-lg text-muted">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-accent px-6 py-3 font-bold text-navy">
          Go to homepage
        </Link>
        <Link href="/services" className="rounded-full border border-navy/30 px-6 py-3 font-bold text-navy">
          View services
        </Link>
      </div>
    </main>
  );
}
