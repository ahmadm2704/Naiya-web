-- Run this in the Supabase SQL editor for your project.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company_name text not null,
  email text not null,
  phone text,
  social_handle text not null,
  help_with text[] not null default '{}',
  brand_summary text,
  package text
);

alter table public.enquiries enable row level security;

-- Allow the public contact form (anon key) to insert new enquiries.
create policy "Allow public inserts" on public.enquiries
  for insert
  to anon
  with check (true);

-- No select/update/delete policy is created for anon, so submitted
-- enquiries can only be read from the Supabase dashboard or with the
-- service role key.
