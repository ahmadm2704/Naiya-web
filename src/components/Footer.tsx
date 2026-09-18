import Link from "next/link";
import { Mail } from "lucide-react";
import { getSettings } from "@/lib/content";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
    </svg>
  );
}

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold">
            Content<span className="font-script text-3xl font-normal text-yellow"> Casa</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-white/60">
            The home for creative visuals.
          </p>
        </div>

        <div className="flex gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Site
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link href="/services" className="hover:text-yellow">Services</Link></li>
              <li><Link href="/about" className="hover:text-yellow">About</Link></li>
              <li><Link href="/contact" className="hover:text-yellow">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
              Connect
            </p>
            <div className="mt-3 flex gap-4">
              <a href={settings.instagram_url} aria-label="Instagram" className="hover:text-yellow">
                <InstagramIcon width={20} height={20} />
              </a>
              <a href={settings.linkedin_url} aria-label="LinkedIn" className="hover:text-yellow">
                <LinkedinIcon width={20} height={20} />
              </a>
              <a href={`mailto:${settings.contact_email}`} aria-label="Email" className="hover:text-yellow">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Content Casa. All rights reserved.
      </div>
    </footer>
  );
}
