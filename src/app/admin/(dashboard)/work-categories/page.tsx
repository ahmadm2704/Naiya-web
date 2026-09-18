import { createClient } from "@/lib/supabase/server";
import { addCategory, deleteCategory, updateCategory } from "./actions";

export default async function AdminWorkCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("content_lists")
    .select("id, label, sort_order")
    .eq("section", "work_categories")
    .order("sort_order");

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-bold">Who we work with</h1>
      <p className="mt-1 text-charcoal/60">
        The category cards in the homepage carousel. Lower order number shows first.
      </p>

      <div className="mt-8 space-y-3">
        {categories?.map((item) => (
          <form
            key={item.id}
            action={updateCategory}
            className="flex items-center gap-3 rounded-xl border border-charcoal/10 bg-white p-4"
          >
            <input type="hidden" name="id" value={item.id} />
            <input name="label" defaultValue={item.label} className="input flex-1" />
            <input
              name="sort_order"
              type="number"
              defaultValue={item.sort_order}
              className="input w-20"
            />
            <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
              Save
            </button>
            <button
              formAction={deleteCategory}
              className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
            >
              Delete
            </button>
          </form>
        ))}
      </div>

      <form
        action={addCategory}
        className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-charcoal/30 p-4"
      >
        <input name="label" placeholder="New category" required className="input flex-1" />
        <input name="sort_order" type="number" defaultValue={categories?.length ?? 0} className="input w-20" />
        <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
          Add
        </button>
      </form>
    </div>
  );
}
