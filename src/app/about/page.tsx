import type { Metadata } from "next";
import PlaceholderMedia from "@/components/PlaceholderMedia";

export const metadata: Metadata = {
  title: "About | Content Casa",
};

const VALUES = [
  {
    number: "01",
    title: "Creativity & Innovation",
    tagline: "Challenging the ordinary.",
    body: "We believe in challenging the expected. We champion forward-thinking, fresh perspectives and creative approaches that are uniquely tailored to every brand we work with.",
  },
  {
    number: "02",
    title: "Trust & Partnerships",
    tagline: "Your brand is our business.",
    body: "We believe sustainable collaboration is built on transparency, trust and reliability. Becoming an extension of your team, we treat every project with the same care and commitment as our own.",
  },
  {
    number: "03",
    title: "Strategy & Excellence",
    tagline: "Good isn't good enough.",
    body: "We believe in doing things properly. Every idea is backed by purpose and every detail matters, combining strategic thinking with high quality execution.",
  },
];

const FOUNDERS = ["Rochelle", "Ria", "Naiya"];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">About us</h1>
        <p className="mt-6 font-display text-xl font-semibold text-maroon">
          We create what makes people stop, look and remember.
        </p>
        <p className="mt-6 text-charcoal/70">
          Content Casa is a creative marketing agency built for ambitious
          businesses that want to grow without the constant pressure of managing
          their own marketing. We combine visual creativity with proven strategy
          to create bespoke content and marketing that makes brands more
          memorable, authentic and impactful.
        </p>
        <p className="mt-4 text-charcoal/70">
          From content creation and creative direction to social media
          management and campaign strategy, we take care of the process from
          concept to execution. We get to know your business, understand what
          you need and bring forward creative solutions that make your life
          easier and your marketing work harder.
        </p>
        <p className="mt-6 font-display text-lg font-semibold">
          Creative without the chaos. Strategy with purpose. Marketing you can
          rely on.
        </p>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <h2 className="text-center font-display text-3xl font-bold">Core values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-6">
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
        <p className="mt-2 max-w-xl text-charcoal/70">
          10 years combined experience, First Class BA (Hons) Advertising and
          Marketing Communications, and two awards for creative media
          production.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {FOUNDERS.map((name) => (
            <div key={name}>
              <PlaceholderMedia label={name} className="aspect-[3/4] w-full rounded-2xl" />
              <p className="mt-3 font-display text-lg font-semibold">{name}</p>
              <p className="text-sm text-charcoal/60">Co-founder, Content Casa</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
