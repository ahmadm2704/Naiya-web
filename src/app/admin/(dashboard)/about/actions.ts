"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateAbout(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("site_content").upsert({
    key: "about",
    data: {
      lead: String(formData.get("lead") || ""),
      paragraph_1: String(formData.get("paragraph_1") || ""),
      paragraph_2: String(formData.get("paragraph_2") || ""),
      closing_line: String(formData.get("closing_line") || ""),
      founders_intro: String(formData.get("founders_intro") || ""),
    },
    updated_at: new Date().toISOString(),
  });

  revalidatePath("/admin/about");
  revalidatePath("/about");
}
