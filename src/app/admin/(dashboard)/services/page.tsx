import { getServiceGroups } from "@/lib/content";
import {
  addGroup,
  addPackage,
  deleteGroup,
  deletePackage,
  updateGroup,
  updatePackage,
} from "./actions";

export default async function AdminServicesPage() {
  const groups = await getServiceGroups();

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold">Services & packages</h1>
      <p className="mt-1 text-charcoal/60">
        Groups (e.g. &ldquo;Shoots&rdquo;) each contain a few packages. Features: one per line.
      </p>

      <div className="mt-8 space-y-8">
        {groups.map((group, groupIndex) => (
          <div key={group.id} className="rounded-2xl border border-charcoal/10 bg-white p-5">
            <form action={updateGroup} className="flex items-center gap-3">
              <input type="hidden" name="id" value={group.id} />
              <input name="title" defaultValue={group.title} className="input flex-1 font-display font-semibold" />
              <input name="sort_order" type="number" defaultValue={groupIndex} className="input w-20" />
              <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
                Save
              </button>
              <button
                formAction={deleteGroup}
                className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
              >
                Delete group
              </button>
            </form>

            <div className="mt-5 space-y-4 border-t border-charcoal/10 pt-5">
              {group.packages.map((pkg, pkgIndex) => (
                <form
                  key={pkg.id}
                  action={updatePackage}
                  className="space-y-2 rounded-xl bg-cream p-4"
                >
                  <input type="hidden" name="id" value={pkg.id} />
                  <div className="flex gap-3">
                    <input name="name" defaultValue={pkg.name} className="input flex-1" placeholder="Package name" />
                    <input name="sort_order" type="number" defaultValue={pkgIndex} className="input w-20" />
                  </div>
                  <textarea
                    name="features"
                    defaultValue={pkg.features.join("\n")}
                    rows={5}
                    className="input font-mono text-xs"
                    placeholder={"One feature per line"}
                  />
                  <div className="flex gap-3">
                    <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
                      Save
                    </button>
                    <button
                      formAction={deletePackage}
                      className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
                    >
                      Delete package
                    </button>
                  </div>
                </form>
              ))}

              <form action={addPackage} className="space-y-2 rounded-xl border border-dashed border-charcoal/30 p-4">
                <input type="hidden" name="group_id" value={group.id} />
                <div className="flex gap-3">
                  <input name="name" placeholder="New package name" required className="input flex-1" />
                  <input name="sort_order" type="number" defaultValue={group.packages.length} className="input w-20" />
                </div>
                <textarea name="features" rows={4} className="input font-mono text-xs" placeholder="One feature per line" />
                <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
                  Add package
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <form
        action={addGroup}
        className="mt-8 flex items-center gap-3 rounded-xl border border-dashed border-charcoal/30 p-4"
      >
        <input name="title" placeholder="New group title" required className="input flex-1" />
        <input name="sort_order" type="number" defaultValue={groups.length} className="input w-20" />
        <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
          Add group
        </button>
      </form>
    </div>
  );
}
