import { getFounders } from "@/lib/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { addFounder, deleteFounder, updateFounder } from "./actions";

export default async function AdminFoundersPage() {
  const founders = await getFounders();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">Founders</h1>
      <p className="mt-1 text-charcoal/60">Team bios shown on the About page.</p>

      <div className="mt-8 space-y-4">
        {founders.map((founder, index) => (
          <form
            key={founder.id}
            action={updateFounder}
            className="space-y-3 rounded-xl border border-charcoal/10 bg-white p-4"
          >
            <input type="hidden" name="id" value={founder.id} />
            <div className="flex gap-3">
              <input name="name" defaultValue={founder.name} className="input flex-1" placeholder="Name" />
              <input name="sort_order" type="number" defaultValue={index} className="input w-20" />
            </div>
            <input name="role" defaultValue={founder.role} className="input" placeholder="Role" />
            <ImageUploadField name="image_url" label="Photo" defaultValue={founder.image_url} />
            <div className="flex gap-3">
              <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
                Save
              </button>
              <button
                formAction={deleteFounder}
                className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <form
        action={addFounder}
        className="mt-6 space-y-3 rounded-xl border border-dashed border-charcoal/30 p-4"
      >
        <div className="flex gap-3">
          <input name="name" placeholder="Name" required className="input flex-1" />
          <input name="sort_order" type="number" defaultValue={founders.length} className="input w-20" />
        </div>
        <input name="role" placeholder="Role" defaultValue="Co-founder, Content Casa" className="input" />
        <ImageUploadField name="image_url" label="Photo" />
        <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
          Add founder
        </button>
      </form>
    </div>
  );
}
