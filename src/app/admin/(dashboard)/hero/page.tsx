import { getHero } from "@/lib/content";
import { updateHero } from "./actions";

export default async function AdminHeroPage() {
  const hero = await getHero();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">Home hero</h1>
      <p className="mt-1 text-charcoal/60">
        The script tagline, big headline and subheadline at the top of the homepage.
      </p>

      <form action={updateHero} className="mt-8 space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6">
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Script tagline</span>
          <input name="tagline" defaultValue={hero.tagline} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Headline</span>
          <textarea name="headline" defaultValue={hero.headline} rows={2} className="input mt-1.5" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-charcoal/80">Subheadline</span>
          <input name="subheadline" defaultValue={hero.subheadline} className="input mt-1.5" />
        </label>

        <button className="rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-white hover:bg-maroon">
          Save changes
        </button>
      </form>
    </div>
  );
}
