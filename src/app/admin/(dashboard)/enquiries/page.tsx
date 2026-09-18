import { createClient } from "@/lib/supabase/server";
import { deleteEnquiry, setEnquiryStatus } from "./actions";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-yellow text-charcoal",
  contacted: "bg-charcoal text-white",
  archived: "bg-charcoal/10 text-charcoal/60",
};

export default async function AdminEnquiriesPage() {
  const supabase = await createClient();
  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-bold">Enquiries</h1>
      <p className="mt-1 text-charcoal/60">Every submission from the contact form.</p>

      <div className="mt-8 space-y-4">
        {!enquiries?.length && (
          <p className="rounded-xl border border-dashed border-charcoal/30 p-6 text-center text-charcoal/50">
            No enquiries yet.
          </p>
        )}

        {enquiries?.map((enquiry) => (
          <div key={enquiry.id} className="rounded-2xl border border-charcoal/10 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold">{enquiry.name}</p>
                <p className="text-sm text-charcoal/60">
                  {enquiry.company_name} &middot; {enquiry.email}
                  {enquiry.phone ? ` · ${enquiry.phone}` : ""}
                </p>
                <p className="text-sm text-charcoal/60">{enquiry.social_handle}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${STATUS_STYLES[enquiry.status] ?? STATUS_STYLES.new}`}
              >
                {enquiry.status}
              </span>
            </div>

            {enquiry.package && (
              <p className="mt-3 text-sm">
                <span className="font-semibold">Package: </span>
                {enquiry.package}
              </p>
            )}

            {enquiry.help_with?.length > 0 && (
              <p className="mt-2 text-sm">
                <span className="font-semibold">Needs help with: </span>
                {enquiry.help_with.join(", ")}
              </p>
            )}

            {enquiry.brand_summary && (
              <p className="mt-2 text-sm text-charcoal/70">{enquiry.brand_summary}</p>
            )}

            <p className="mt-3 text-xs text-charcoal/40">
              {new Date(enquiry.created_at).toLocaleString()}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {(["new", "contacted", "archived"] as const).map((status) => (
                <form key={status} action={setEnquiryStatus}>
                  <input type="hidden" name="id" value={enquiry.id} />
                  <input type="hidden" name="status" value={status} />
                  <button
                    disabled={enquiry.status === status}
                    className="rounded-full border border-charcoal/20 px-3 py-1.5 text-xs font-semibold capitalize hover:bg-charcoal hover:text-white disabled:opacity-40"
                  >
                    Mark {status}
                  </button>
                </form>
              ))}
              <form action={deleteEnquiry}>
                <input type="hidden" name="id" value={enquiry.id} />
                <button className="rounded-full border border-maroon px-3 py-1.5 text-xs font-semibold text-maroon">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
