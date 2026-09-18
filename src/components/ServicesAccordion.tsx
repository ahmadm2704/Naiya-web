"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Check } from "lucide-react";
import type { ServiceGroupWithPackages } from "@/lib/defaults";

export default function ServicesAccordion({ groups }: { groups: ServiceGroupWithPackages[] }) {
  const [openId, setOpenId] = useState<string | null>(groups[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const isOpen = openId === group.id;
        return (
          <div key={group.id} className="overflow-hidden rounded-2xl border border-charcoal/10">
            <button
              onClick={() => setOpenId(isOpen ? null : group.id)}
              className="flex w-full items-center justify-between bg-charcoal px-6 py-5 text-left text-white"
            >
              <span className="font-display text-xl font-semibold sm:text-2xl">
                {group.title}
              </span>
              <ChevronDown
                size={22}
                className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="grid gap-6 bg-cream p-6 sm:grid-cols-3 sm:p-8">
                {group.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-charcoal/5"
                  >
                    <p className="font-display text-lg font-bold">{pkg.name}</p>
                    <ul className="mt-4 flex-1 space-y-2 text-sm text-charcoal/70">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <Check size={16} className="mt-0.5 shrink-0 text-maroon" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/contact?package=${encodeURIComponent(`${group.title} — ${pkg.name}`)}`}
                      className="mt-6 rounded-full bg-charcoal px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-maroon"
                    >
                      View case study
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
