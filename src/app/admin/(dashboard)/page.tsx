import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const SECTIONS = [
  { href: "/admin/hero", label: "Home hero", description: "Tagline, headline, subheadline" },
  { href: "/admin/work-categories", label: "Who we work with", description: "Homepage category carousel" },
  { href: "/admin/featured-work", label: "Featured work", description: "Case study cards" },
  { href: "/admin/services", label: "Services & packages", description: "Service groups, packages, features" },
  { href: "/admin/add-ons", label: "Add-ons", description: "Extra service line items" },
  { href: "/admin/process", label: "The Method", description: "6-step process timeline" },
  { href: "/admin/about", label: "About text", description: "Mission & about copy" },
  { href: "/admin/values", label: "Core values", description: "About page value cards" },
  { href: "/admin/founders", label: "Founders", description: "Team bios & photos" },
  { href: "/admin/settings", label: "Site settings", description: "Contact email & social links" },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { count: newCount } = await supabase
    .from("enquiries")
    .select("id", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Dashboard</h1>
      <p className="mt-1 text-charcoal/60">Manage every part of the Content Casa website.</p>

      <Link
        href="/admin/enquiries"
        className="mt-6 flex items-center justify-between rounded-2xl bg-charcoal px-6 py-5 text-white"
      >
        <div>
          <p className="font-display text-lg font-semibold">Enquiries</p>
          <p className="text-sm text-white/60">New contact form submissions</p>
        </div>
        <span className="rounded-full bg-yellow px-4 py-1.5 text-sm font-bold text-charcoal">
          {newCount ?? 0} new
        </span>
      </Link>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-2xl border border-charcoal/10 bg-white p-5 transition-colors hover:border-maroon"
          >
            <p className="font-display text-lg font-semibold">{section.label}</p>
            <p className="mt-1 text-sm text-charcoal/60">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
