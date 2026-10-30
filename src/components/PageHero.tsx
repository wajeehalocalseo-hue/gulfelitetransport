import Breadcrumbs from "./Breadcrumbs";

export default function PageHero({
  crumbs,
  h1,
  lead,
}: {
  crumbs: { name: string; href?: string }[];
  h1: string;
  lead?: string;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {h1}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{lead}</p>}
      </div>
    </section>
  );
}
