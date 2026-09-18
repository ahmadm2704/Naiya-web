"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function setEnquiryStatus(formData: FormData) {
  const supabase = await createClient();
  await supabase
    .from("enquiries")
    .update({ status: String(formData.get("status")) })
    .eq("id", String(formData.get("id")));
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteEnquiry(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("enquiries").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
