import Hero from "@/components/Hero";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import FeaturedWork from "@/components/FeaturedWork";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeWorkWith />
      <FeaturedWork />

      <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Creative without the chaos.
          <br />
          Strategy with purpose.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-charcoal/70">
          From content creation and creative direction to social media management
          and campaign strategy — we take care of the process from concept to
          execution.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-full bg-charcoal px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-maroon"
        >
          Start your enquiry
        </Link>
      </section>
    </>
  );
}
