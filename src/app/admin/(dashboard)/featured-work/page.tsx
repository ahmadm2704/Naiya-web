import { getFeaturedWork } from "@/lib/content";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { addProject, deleteProject, updateProject } from "./actions";

export default async function AdminFeaturedWorkPage() {
  const items = await getFeaturedWork();

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">Featured work</h1>
      <p className="mt-1 text-charcoal/60">The case study cards on the homepage.</p>

      <div className="mt-8 space-y-4">
        {items.map((item, index) => (
          <form
            key={item.id}
            action={updateProject}
            className="space-y-3 rounded-xl border border-charcoal/10 bg-white p-4"
          >
            <input type="hidden" name="id" value={item.id} />
            <div className="flex gap-3">
              <input name="name" defaultValue={item.name} className="input flex-1" placeholder="Project name" />
              <input name="sort_order" type="number" defaultValue={index} className="input w-20" />
            </div>
            <input name="tag" defaultValue={item.tag} className="input" placeholder="Tag / category" />
            <ImageUploadField name="image_url" label="Image" defaultValue={item.image_url} />
            <div className="flex gap-3">
              <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
                Save
              </button>
              <button
                formAction={deleteProject}
                className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <form
        action={addProject}
        className="mt-6 space-y-3 rounded-xl border border-dashed border-charcoal/30 p-4"
      >
        <div className="flex gap-3">
          <input name="name" placeholder="Project name" required className="input flex-1" />
          <input name="sort_order" type="number" defaultValue={items.length} className="input w-20" />
        </div>
        <input name="tag" placeholder="Tag / category" className="input" />
        <ImageUploadField name="image_url" label="Image" />
        <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
          Add project
        </button>
      </form>
    </div>
  );
}
