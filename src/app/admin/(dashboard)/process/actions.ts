"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidate() {
  revalidatePath("/admin/process");
  revalidatePath("/services");
}

export async function addStep(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("process_steps").insert({
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  revalidate();
}

export async function updateStep(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("process_steps")
    .update({
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
  revalidate();
}

export async function deleteStep(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("process_steps").delete().eq("id", String(formData.get("id")));
  revalidate();
}
