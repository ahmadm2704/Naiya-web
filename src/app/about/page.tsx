import type { Metadata } from "next";
import Image from "next/image";
import PlaceholderMedia from "@/components/PlaceholderMedia";
import { getAbout, getCoreValues, getFounders } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Content Casa",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [about, values, founders] = await Promise.all([
    getAbout(),
    getCoreValues(),
    getFounders(),
  ]);

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">About us</h1>
        <p className="mt-6 font-display text-xl font-semibold text-maroon">{about.lead}</p>
        <p className="mt-6 text-charcoal/70">{about.paragraph_1}</p>
        <p className="mt-4 text-charcoal/70">{about.paragraph_2}</p>
        <p className="mt-6 font-display text-lg font-semibold">{about.closing_line}</p>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="text-center font-display text-3xl font-bold">Core values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.id} className="rounded-2xl bg-white p-6">
                <span className="font-display text-3xl font-bold text-maroon">
                  {value.number}
                </span>
                <p className="mt-3 font-display text-lg font-semibold">{value.title}</p>
                <p className="text-sm font-semibold uppercase tracking-wide text-charcoal/50">
                  {value.tagline}
                </p>
                <p className="mt-3 text-sm text-charcoal/70">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <h2 className="font-display text-3xl font-bold">Behind the brand</h2>
        <p className="mt-2 max-w-xl text-charcoal/70">{about.founders_intro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {founders.map((founder) => (
            <div key={founder.id}>
              {founder.image_url ? (
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                  <Image src={founder.image_url} alt={founder.name} fill className="object-cover" />
                </div>
              ) : (
                <PlaceholderMedia label={founder.name} className="aspect-[3/4] w-full rounded-2xl" />
              )}
              <p className="mt-3 font-display text-lg font-semibold">{founder.name}</p>
              <p className="text-sm text-charcoal/60">{founder.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
