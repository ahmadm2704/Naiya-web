import { getProcessSteps } from "@/lib/content";
import { addStep, deleteStep, updateStep } from "./actions";

export default async function AdminProcessPage() {
  const steps = await getProcessSteps();

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold">The Method</h1>
      <p className="mt-1 text-charcoal/60">The 6-step process shown on the Services page.</p>

      <div className="mt-8 space-y-4">
        {steps.map((step, index) => (
          <form
            key={step.id}
            action={updateStep}
            className="space-y-3 rounded-xl border border-charcoal/10 bg-white p-4"
          >
            <input type="hidden" name="id" value={step.id} />
            <div className="flex items-center gap-3">
              <span className="font-display text-xl font-bold text-maroon">
                {String(index + 1).padStart(2, "0")}
              </span>
              <input name="title" defaultValue={step.title} className="input flex-1" />
              <input name="sort_order" type="number" defaultValue={index} className="input w-20" />
            </div>
            <textarea name="description" defaultValue={step.description} rows={2} className="input" />
            <div className="flex gap-3">
              <button className="rounded-full bg-charcoal px-4 py-2 text-xs font-semibold text-white hover:bg-maroon">
                Save
              </button>
              <button
                formAction={deleteStep}
                className="rounded-full border border-maroon px-4 py-2 text-xs font-semibold text-maroon"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <form
        action={addStep}
        className="mt-6 space-y-3 rounded-xl border border-dashed border-charcoal/30 p-4"
      >
        <div className="flex items-center gap-3">
          <input name="title" placeholder="New step title" required className="input flex-1" />
          <input name="sort_order" type="number" defaultValue={steps.length} className="input w-20" />
        </div>
        <textarea name="description" placeholder="Description" rows={2} className="input" />
        <button className="rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white">
          Add step
        </button>
      </form>
    </div>
  );
}
