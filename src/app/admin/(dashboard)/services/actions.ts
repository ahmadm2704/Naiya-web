"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidate() {
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

function parseFeatures(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function addGroup(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("service_groups").insert({
    title: String(formData.get("title") || ""),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  revalidate();
}

export async function updateGroup(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("service_groups")
    .update({
      title: String(formData.get("title") || ""),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
  revalidate();
}

export async function deleteGroup(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("service_groups").delete().eq("id", String(formData.get("id")));
  revalidate();
}

export async function addPackage(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("service_packages").insert({
    group_id: String(formData.get("group_id")),
    name: String(formData.get("name") || ""),
    features: parseFeatures(String(formData.get("features") || "")),
    sort_order: Number(formData.get("sort_order") || 0),
  });
  revalidate();
}

export async function updatePackage(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("service_packages")
    .update({
      name: String(formData.get("name") || ""),
      features: parseFeatures(String(formData.get("features") || "")),
      sort_order: Number(formData.get("sort_order") || 0),
    })
    .eq("id", String(formData.get("id")));
  revalidate();
}

export async function deletePackage(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("service_packages").delete().eq("id", String(formData.get("id")));
  revalidate();
}
