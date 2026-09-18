"use server";

import { revalidatePath } from "next/cache";
import { addListItem, deleteListItem, updateListItem } from "@/lib/admin/contentLists";

function revalidate() {
  revalidatePath("/admin/add-ons");
  revalidatePath("/services");
}

export async function addAddOn(formData: FormData) {
  await addListItem("add_ons", formData);
  revalidate();
}

export async function updateAddOn(formData: FormData) {
  await updateListItem(formData);
  revalidate();
}

export async function deleteAddOn(formData: FormData) {
  await deleteListItem(formData);
  revalidate();
}
