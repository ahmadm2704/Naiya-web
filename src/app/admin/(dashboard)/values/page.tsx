import { getCoreValues } from "@/lib/content";
import { addValue, deleteValue, updateValue } from "./actions";

export default async function AdminValuesPage() {
  const values = await getCoreValues();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold">Core values</h1>
      <p className="mt-1 text-charcoal/60">The three value cards on the About page.</p>

      <div className="mt-8 space-y-4">
        {values.map((value, index) => (
          <form
            key={value.id}
            action={updateValue}
            className="space-y-3 rounded-xl border border-charcoal/10 bg-white p-4"
          >
            <input type="hidden" name="id" value={value.id} />
            <div className="flex gap-3">
              <input name="number" defaultValue={value.number} className="input w-20" />
              <input name="title" defaultValue={value.title} className="input flex-1" />
              <input name="sort_order" type="number" defaultValue={index} className="input w-20" />
            </div>
            <input name="tagline" defaultValue={value.tagline} className="input" placeholder="Tagline" />
            <textarea name="body" defaultValue={value.body} rows={3} className="input" />
            <div className="flex gap-3">
              <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
                Save
              </button>
              <button
                formAction={deleteValue}
                className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <form
        action={addValue}
        className="mt-6 space-y-3 rounded-xl border border-dashed border-charcoal/30 p-4"
      >
        <div className="flex gap-3">
          <input name="number" placeholder="04" required className="input w-20" />
          <input name="title" placeholder="Title" required className="input flex-1" />
          <input name="sort_order" type="number" defaultValue={values.length} className="input w-20" />
        </div>
        <input name="tagline" placeholder="Tagline" className="input" />
        <textarea name="body" placeholder="Body" rows={3} className="input" />
        <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
          Add value
        </button>
      </form>
    </div>
  );
}
