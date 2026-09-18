import { getSettings } from "@/lib/content";
import { updateSettings } from "./actions";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl font-bold">Site settings</h1>
      <p className="mt-1 text-charcoal/60">Contact details and social links shown in the footer.</p>

      <form action={updateSettings} className="mt-8 space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Contact email</span>
          <input name="contact_email" defaultValue={settings.contact_email} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Instagram URL</span>
          <input name="instagram_url" defaultValue={settings.instagram_url} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">LinkedIn URL</span>
          <input name="linkedin_url" defaultValue={settings.linkedin_url} className="input mt-1.5" />
        </label>

        <button className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white hover:bg-maroon">
          Save changes
        </button>
      </form>
    </div>
  );
}
