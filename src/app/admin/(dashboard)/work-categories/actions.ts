"use server";

import { revalidatePath } from "next/cache";
import { addListItem, deleteListItem, updateListItem } from "@/lib/admin/contentLists";

function revalidate() {
  revalidatePath("/admin/work-categories");
  revalidatePath("/");
}

export async function addCategory(formData: FormData) {
  await addListItem("work_categories", formData);
  revalidate();
}

export async function updateCategory(formData: FormData) {
  await updateListItem(formData);
  revalidate();
}

export async function deleteCategory(formData: FormData) {
  await deleteListItem(formData);
  revalidate();
}
