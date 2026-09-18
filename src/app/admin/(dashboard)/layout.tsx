import Link from "next/link";
import { signOut } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/hero", label: "Home hero" },
  { href: "/admin/work-categories", label: "Who we work with" },
  { href: "/admin/featured-work", label: "Featured work" },
  { href: "/admin/services", label: "Services & packages" },
  { href: "/admin/add-ons", label: "Add-ons" },
  { href: "/admin/process", label: "The Method" },
  { href: "/admin/about", label: "About text" },
  { href: "/admin/values", label: "Core values" },
  { href: "/admin/founders", label: "Founders" },
  { href: "/admin/settings", label: "Site settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-64 shrink-0 flex-col bg-charcoal text-white md:flex">
        <div className="px-6 py-6">
          <p className="font-display text-xl font-bold">
            Content<span className="font-script text-2xl font-normal text-yellow"> Casa</span>
          </p>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-white/40">Admin</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <p className="truncate text-xs text-white/50">{user?.email}</p>
          <form action={signOut} className="mt-2">
            <button className="text-sm font-medium text-yellow hover:underline">Sign out</button>
          </form>
        </div>
      </aside>

      <main className="flex-1 px-6 py-8 sm:px-10">
        <div className="mb-6 flex items-center justify-between md:hidden">
          <p className="font-display text-lg font-bold">Content Casa Admin</p>
          <form action={signOut}>
            <button className="text-sm font-medium text-maroon">Sign out</button>
          </form>
        </div>
        {children}
      </main>
    </div>
  );
}
