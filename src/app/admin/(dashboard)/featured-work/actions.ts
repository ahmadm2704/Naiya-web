"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidate() {
  revalidatePath("/admin/featured-work");
  revalidatePath("/");
}

export async function addProject(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("featured_work").insert({
    name: String(formData.get("name") || ""),
    tag: String(formData.get("tag") || ""),
    image_url: String(formData.get("image_url") || "") || null,
    sort_order: Number(formData.get("sort_order") || 0),
  });
  revalidate();
}

export async function updateProject(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("featured_work")
    .update({
      name: String(formData.get("name") || ""),
      tag: String(formData.get("tag") || ""),
      image_url: String(formData.get("image_url") || "") || null,
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
  revalidate();
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("featured_work").delete().eq("id", String(formData.get("id")));
  revalidate();
}
