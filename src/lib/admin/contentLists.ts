import { createClient } from "@/lib/supabase/server";

export async function addListItem(section: "work_categories" | "add_ons", formData: FormData) {
  const supabase = await createClient();
  await supabase.from("content_lists").insert({
    section,
    label: String(formData.get("label") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
}

export async function updateListItem(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("content_lists")
    .update({
      label: String(formData.get("label") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
}

export async function deleteListItem(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("content_lists").delete().eq("id", String(formData.get("id")));
}
