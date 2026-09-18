import { getAbout } from "@/lib/content";
import { updateAbout } from "./actions";

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">About text</h1>
      <p className="mt-1 text-charcoal/60">The mission copy shown on the About page.</p>

      <form action={updateAbout} className="mt-8 space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Lead line</span>
          <input name="lead" defaultValue={about.lead} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Paragraph 1</span>
          <textarea name="paragraph_1" defaultValue={about.paragraph_1} rows={4} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Paragraph 2</span>
          <textarea name="paragraph_2" defaultValue={about.paragraph_2} rows={4} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Closing line</span>
          <input name="closing_line" defaultValue={about.closing_line} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Founders intro</span>
          <textarea
            name="founders_intro"
            defaultValue={about.founders_intro}
            rows={2}
            className="input mt-1.5"
          />
        </label>

        <button className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white hover:bg-maroon">
          Save changes
        </button>
      </form>
    </div>
  );
}
