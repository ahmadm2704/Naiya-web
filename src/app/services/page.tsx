import type { Metadata } from "next";
import ServicesAccordion from "@/components/ServicesAccordion";
import ProcessTimeline from "@/components/ProcessTimeline";
import { ADD_ONS } from "@/data/services";

export const metadata: Metadata = {
  title: "Services | Content Casa",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <div className="max-w-2xl">
        <p className="font-script text-3xl text-maroon">Select your package</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Our Services</h1>
        <p className="mt-4 text-charcoal/70">
          Click a heading to see what&rsquo;s included in each package. Choose the
          option that fits your brand and we&rsquo;ll take it from there.
        </p>
      </div>

      <div className="mt-12">
        <ServicesAccordion />
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold">Add-ons</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ADD_ONS.map((addon) => (
            <div
              key={addon}
              className="rounded-xl bg-charcoal px-5 py-4 text-sm font-medium text-white"
            >
              {addon}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl font-bold">The Method</h2>
        <p className="mt-2 max-w-xl text-charcoal/70">
          Our six-step process for turning your brand into content people stop,
          look and remember.
        </p>
        <div className="mt-8">
          <ProcessTimeline />
        </div>
      </section>
    </div>
  );
}
