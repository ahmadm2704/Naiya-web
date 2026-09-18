import Link from "next/link";
import Image from "next/image";
import PlaceholderMedia from "./PlaceholderMedia";
import type { FeaturedWorkItem } from "@/lib/defaults";

export default function FeaturedWork({ items }: { items: FeaturedWorkItem[] }) {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Featured work</h2>
          <Link
            href="/services"
            className="text-sm font-semibold uppercase tracking-wide text-maroon hover:underline"
          >
            Our portfolio &rarr;
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {items.map((project) => (
            <div key={project.id} className="group">
              {project.image_url ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src={project.image_url}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <PlaceholderMedia label={project.name} className="aspect-square w-full rounded-2xl p-6" />
              )}
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                {project.tag}
              </p>
              <p className="font-display text-lg font-semibold">{project.name}</p>
              <Link
                href="/contact"
                className="mt-1 inline-block text-sm font-semibold text-maroon group-hover:underline"
              >
                View case study
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
