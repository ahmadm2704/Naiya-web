"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateHero(formData: FormData) {
  const supabase = await createClient();
  await supabase.from("site_content").upsert({
    key: "hero",
    data: {
      tagline: String(formData.get("tagline") || ""),
      headline: String(formData.get("headline") || ""),
      subheadline: String(formData.get("subheadline") || ""),
    },
    updated_at: new Date().toISOString(),
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
}
