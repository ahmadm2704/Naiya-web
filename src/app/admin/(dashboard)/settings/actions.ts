"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("site_content").upsert({
    key: "settings",
    data: {
      contact_email: String(formData.get("contact_email") || ""),
      instagram_url: String(formData.get("instagram_url") || ""),
      linkedin_url: String(formData.get("linkedin_url") || ""),
    },
    updated_at: new Date().toISOString(),
  });

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
}
