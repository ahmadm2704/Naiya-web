"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidate() {
  revalidatePath("/admin/founders");
  revalidatePath("/about");
}

export async function addFounder(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("founders").insert({
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || "Co-founder, Content Casa"),
    image_url: String(formData.get("image_url") || "") || null,
    sort_order: Number(formData.get("sort_order") || 0),
  });
  revalidate();
}

export async function updateFounder(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("founders")
    .update({
      name: String(formData.get("name") || ""),
      role: String(formData.get("role") || ""),
      image_url: String(formData.get("image_url") || "") || null,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
  revalidate();
}

export async function deleteFounder(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("founders").delete().eq("id", String(formData.get("id")));
  revalidate();
}
