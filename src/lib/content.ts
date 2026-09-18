import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  DEFAULT_ABOUT,
  DEFAULT_ADD_ONS,
  DEFAULT_CORE_VALUES,
  DEFAULT_FEATURED_WORK,
  DEFAULT_FOUNDERS,
  DEFAULT_HERO,
  DEFAULT_PROCESS_STEPS,
  DEFAULT_SERVICE_GROUPS,
  DEFAULT_SETTINGS,
  DEFAULT_WORK_CATEGORIES,
  type AboutContent,
  type CoreValue,
  type FeaturedWorkItem,
  type Founder,
  type HeroContent,
  type ProcessStep,
  type ServiceGroupWithPackages,
  type SettingsContent,
} from "@/lib/defaults";

async function getClient() {
  if (!isSupabaseConfigured) return null;
  try {
    return await createClient();
  } catch {
    return null;
  }
}

export async function getHero(): Promise<HeroContent> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_HERO;
  const { data } = await supabase.from("site_content").select("data").eq("key", "hero").single();
  return { ...DEFAULT_HERO, ...(data?.data as Partial<HeroContent>) };
}

export async function getAbout(): Promise<AboutContent> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_ABOUT;
  const { data } = await supabase.from("site_content").select("data").eq("key", "about").single();
  return { ...DEFAULT_ABOUT, ...(data?.data as Partial<AboutContent>) };
}

export async function getSettings(): Promise<SettingsContent> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_SETTINGS;
  const { data } = await supabase.from("site_content").select("data").eq("key", "settings").single();
  return { ...DEFAULT_SETTINGS, ...(data?.data as Partial<SettingsContent>) };
}

export async function getWorkCategories(): Promise<{ id: string; label: string }[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_WORK_CATEGORIES;
  const { data } = await supabase
    .from("content_lists")
    .select("id, label")
    .eq("section", "work_categories")
    .order("sort_order");
  return data?.length ? data : DEFAULT_WORK_CATEGORIES;
}

export async function getAddOns(): Promise<{ id: string; label: string }[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_ADD_ONS;
  const { data } = await supabase
    .from("content_lists")
    .select("id, label")
    .eq("section", "add_ons")
    .order("sort_order");
  return data?.length ? data : DEFAULT_ADD_ONS;
}

export async function getFeaturedWork(): Promise<FeaturedWorkItem[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_FEATURED_WORK;
  const { data } = await supabase
    .from("featured_work")
    .select("id, name, tag, image_url")
    .order("sort_order");
  return data?.length ? data : DEFAULT_FEATURED_WORK;
}

export async function getFounders(): Promise<Founder[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_FOUNDERS;
  const { data } = await supabase
    .from("founders")
    .select("id, name, role, image_url")
    .order("sort_order");
  return data?.length ? data : DEFAULT_FOUNDERS;
}

export async function getCoreValues(): Promise<CoreValue[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_CORE_VALUES;
  const { data } = await supabase
    .from("core_values")
    .select("id, number, title, tagline, body")
    .order("sort_order");
  return data?.length ? data : DEFAULT_CORE_VALUES;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_PROCESS_STEPS;
  const { data } = await supabase
    .from("process_steps")
    .select("id, title, description")
    .order("sort_order");
  return data?.length ? data : DEFAULT_PROCESS_STEPS;
}

export async function getServiceGroups(): Promise<ServiceGroupWithPackages[]> {
  const supabase = await getClient();
  if (!supabase) return DEFAULT_SERVICE_GROUPS;

  const { data: groups } = await supabase
    .from("service_groups")
    .select("id, title")
    .order("sort_order");
  if (!groups?.length) return DEFAULT_SERVICE_GROUPS;

  const { data: packages } = await supabase
    .from("service_packages")
    .select("id, group_id, name, features")
    .order("sort_order");

  return groups.map((group) => ({
    id: group.id,
    title: group.title,
    packages: (packages ?? []).filter((pkg) => pkg.group_id === group.id),
  }));
}
