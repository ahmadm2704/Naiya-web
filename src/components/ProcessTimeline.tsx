import { METHOD_STEPS } from "@/data/services";

export default function ProcessTimeline() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {METHOD_STEPS.map((step, index) => (
        <div key={step.title} className="rounded-2xl border border-charcoal/10 p-6">
          <span className="font-display text-3xl font-bold text-maroon">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-3 font-display text-lg font-semibold">{step.title}</p>
          <p className="mt-2 text-sm text-charcoal/70">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
