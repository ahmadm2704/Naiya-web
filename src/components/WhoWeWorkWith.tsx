"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderMedia from "./PlaceholderMedia";

const CATEGORIES = [
  "Beauty & Aesthetics",
  "Hotels & Experiences",
  "Food & Hospitality",
  "Health & Wellness",
  "Lifestyle & Independent Brands",
];

export default function WhoWeWorkWith() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Who we work with</h2>
        <div className="hidden gap-2 sm:flex">
          <button
            aria-label="Previous"
            onClick={scrollPrev}
            className="rounded-full border border-charcoal/20 p-2 transition-colors hover:bg-charcoal hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            onClick={scrollNext}
            className="rounded-full border border-charcoal/20 p-2 transition-colors hover:bg-charcoal hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {CATEGORIES.map((category) => (
            <div key={category} className="min-w-[75%] flex-shrink-0 sm:min-w-[38%] lg:min-w-[28%]">
              <PlaceholderMedia
                label={category}
                className="aspect-[4/5] w-full rounded-2xl p-6"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
