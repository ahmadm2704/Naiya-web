"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidate() {
  revalidatePath("/admin/values");
  revalidatePath("/about");
}

export async function addValue(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("core_values").insert({
    number: String(formData.get("number") || ""),
    title: String(formData.get("title") || ""),
    tagline: String(formData.get("tagline") || ""),
    body: String(formData.get("body") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  revalidate();
}

export async function updateValue(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("core_values")
    .update({
      number: String(formData.get("number") || ""),
      title: String(formData.get("title") || ""),
      tagline: String(formData.get("tagline") || ""),
      body: String(formData.get("body") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
  revalidate();
}

export async function deleteValue(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("core_values").delete().eq("id", String(formData.get("id")));
  revalidate();
}
