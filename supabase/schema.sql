-- Run this in the Supabase SQL editor for your project.
-- Safe to re-run: uses "if not exists" / "on conflict do nothing" throughout.

-- =========================================================
-- Contact form enquiries
-- =========================================================
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
  package text,
  status text not null default 'new' check (status in ('new', 'contacted', 'archived'))
);

alter table public.enquiries enable row level security;

drop policy if exists "Allow public inserts" on public.enquiries;
create policy "Allow public inserts" on public.enquiries
  for insert to anon with check (true);

drop policy if exists "Admins can read enquiries" on public.enquiries;
create policy "Admins can read enquiries" on public.enquiries
  for select to authenticated using (true);

drop policy if exists "Admins can update enquiries" on public.enquiries;
create policy "Admins can update enquiries" on public.enquiries
  for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete enquiries" on public.enquiries;
create policy "Admins can delete enquiries" on public.enquiries
  for delete to authenticated using (true);

-- =========================================================
-- Editable site content (admin-managed)
-- =========================================================

-- Singleton text blocks, keyed by section (hero / about / settings).
create table if not exists public.site_content (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Generic ordered label lists (who-we-work-with categories, add-ons).
create table if not exists public.content_lists (
  id uuid primary key default gen_random_uuid(),
  section text not null check (section in ('work_categories', 'add_ons')),
  label text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.featured_work (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text not null,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.founders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default 'Co-founder, Content Casa',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.core_values (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null,
  tagline text not null,
  body text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.service_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.service_groups(id) on delete cascade,
  name text not null,
  features text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Public can read all content; only signed-in admins can write.
do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'site_content', 'content_lists', 'featured_work', 'founders',
      'core_values', 'process_steps', 'service_groups', 'service_packages'
    ])
  loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "Public can read" on public.%I;', t);
    execute format(
      'create policy "Public can read" on public.%I for select to anon, authenticated using (true);', t
    );

    execute format('drop policy if exists "Admins can insert" on public.%I;', t);
    execute format(
      'create policy "Admins can insert" on public.%I for insert to authenticated with check (true);', t
    );

    execute format('drop policy if exists "Admins can update" on public.%I;', t);
    execute format(
      'create policy "Admins can update" on public.%I for update to authenticated using (true) with check (true);', t
    );

    execute format('drop policy if exists "Admins can delete" on public.%I;', t);
    execute format(
      'create policy "Admins can delete" on public.%I for delete to authenticated using (true);', t
    );
  end loop;
end $$;

-- =========================================================
-- Storage bucket for admin-uploaded images
-- =========================================================
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view site-media" on storage.objects;
create policy "Public can view site-media" on storage.objects
  for select to public using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site-media" on storage.objects;
create policy "Admins can upload site-media" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media');

drop policy if exists "Admins can update site-media" on storage.objects;
create policy "Admins can update site-media" on storage.objects
  for update to authenticated using (bucket_id = 'site-media') with check (bucket_id = 'site-media');

drop policy if exists "Admins can delete site-media" on storage.objects;
create policy "Admins can delete site-media" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media');

-- =========================================================
-- Seed data — matches the current hardcoded content so the
-- site looks the same the moment it switches to the database.
-- =========================================================

insert into public.site_content (key, data) values
  ('hero', '{
    "tagline": "The home for creative visuals",
    "headline": "We create visuals that make brands impossible to ignore.",
    "subheadline": "You run your business. We''ll create the content."
  }'::jsonb),
  ('about', '{
    "lead": "We create what makes people stop, look and remember.",
    "paragraph_1": "Content Casa is a creative marketing agency built for ambitious businesses that want to grow without the constant pressure of managing their own marketing. We combine visual creativity with proven strategy to create bespoke content and marketing that makes brands more memorable, authentic and impactful.",
    "paragraph_2": "From content creation and creative direction to social media management and campaign strategy, we take care of the process from concept to execution. We get to know your business, understand what you need and bring forward creative solutions that make your life easier and your marketing work harder.",
    "closing_line": "Creative without the chaos. Strategy with purpose. Marketing you can rely on.",
    "founders_intro": "10 years combined experience, First Class BA (Hons) Advertising and Marketing Communications, and two awards for creative media production."
  }'::jsonb),
  ('settings', '{
    "contact_email": "hello@contentcasa.co",
    "instagram_url": "#",
    "linkedin_url": "#"
  }'::jsonb)
on conflict (key) do nothing;

insert into public.content_lists (section, label, sort_order)
select 'work_categories', label, sort_order from (values
  ('Beauty & Aesthetics', 0),
  ('Hotels & Experiences', 1),
  ('Food & Hospitality', 2),
  ('Health & Wellness', 3),
  ('Lifestyle & Independent Brands', 4)
) as v(label, sort_order)
where not exists (select 1 from public.content_lists where section = 'work_categories');

insert into public.content_lists (section, label, sort_order)
select 'add_ons', label, sort_order from (values
  ('Email marketing', 0),
  ('SMS marketing', 1),
  ('Flyer design', 2),
  ('Business card design', 3),
  ('Long form videos', 4),
  ('Logo', 5),
  ('Raw footage library', 6),
  ('Additional social media platform (Instagram, TikTok, Facebook, LinkedIn)', 7)
) as v(label, sort_order)
where not exists (select 1 from public.content_lists where section = 'add_ons');

insert into public.featured_work (name, tag, sort_order)
select name, tag, sort_order from (values
  ('The Atomic Growth Club', 'Influencer campaigns', 0),
  ('Feathered Lane Studios', 'Social strategy & creation', 1),
  ('The Lazy Cow Cocktails', 'Social strategy & creation', 2)
) as v(name, tag, sort_order)
where not exists (select 1 from public.featured_work);

insert into public.founders (name, role, sort_order)
select name, 'Co-founder, Content Casa', sort_order from (values
  ('Rochelle', 0), ('Ria', 1), ('Naiya', 2)
) as v(name, sort_order)
where not exists (select 1 from public.founders);

insert into public.core_values (number, title, tagline, body, sort_order)
select number, title, tagline, body, sort_order from (values
  ('01', 'Creativity & Innovation', 'Challenging the ordinary.',
    'We believe in challenging the expected. We champion forward-thinking, fresh perspectives and creative approaches that are uniquely tailored to every brand we work with.', 0),
  ('02', 'Trust & Partnerships', 'Your brand is our business.',
    'We believe sustainable collaboration is built on transparency, trust and reliability. Becoming an extension of your team, we treat every project with the same care and commitment as our own.', 1),
  ('03', 'Strategy & Excellence', 'Good isn''t good enough.',
    'We believe in doing things properly. Every idea is backed by purpose and every detail matters, combining strategic thinking with high quality execution.', 2)
) as v(number, title, tagline, body, sort_order)
where not exists (select 1 from public.core_values);

insert into public.process_steps (title, description, sort_order)
select title, description, sort_order from (values
  ('Understand the brief', 'We get to know your business, goals and audience so we know exactly what you need.', 0),
  ('Research & gather insights', 'We research your market and audience to uncover opportunities and inform our approach.', 1),
  ('Define key messages & choose appropriate channels', 'We establish what to say, who to reach and where your brand needs to show up.', 2),
  ('Develop creative direction', 'We turn strategy into creative concepts, visuals and content that feel true to your brand.', 3),
  ('Launch & manage', 'We bring everything to life and handle the content, social media and marketing so you don''t have to.', 4),
  ('Review & refine', 'We measure what''s working and use those insights to continually improve your marketing.', 5)
) as v(title, description, sort_order)
where not exists (select 1 from public.process_steps);

do $$
declare
  smm_id uuid;
  shoots_id uuid;
begin
  if not exists (select 1 from public.service_groups) then
    insert into public.service_groups (title, sort_order) values ('Social Media Marketing Management', 0)
      returning id into smm_id;
    insert into public.service_groups (title, sort_order) values ('Shoots', 1)
      returning id into shoots_id;

    insert into public.service_packages (group_id, name, features, sort_order) values
      (smm_id, 'Content', array[
        '4 hour shoot', 'Tailored content plan', '12 edited content assets',
        'Multi-location coverage (10 mile radius)', 'Studio hire available',
        'Caption generation', 'Monthly engagement review', 'Comment management'
      ], 0),
      (smm_id, 'Growth', array[
        '4 hour shoot', 'Tailored content plan', '15 edited content assets',
        'Multi-location coverage', 'Studio hire available', 'Caption generation',
        'Content calendar', 'Content publishing', '2-3 stories per week',
        'Monthly full analytics review', 'Community engagement management',
        '2 social media platforms'
      ], 1),
      (smm_id, 'Social Takeover', array[
        '4-6 hour shoot', 'Tailored content plan', '20 edited content assets',
        'Multi-location coverage', 'Studio hire available', 'Caption generation',
        'Content calendar', 'Content publishing', '2-3 stories per week',
        'Monthly full analytics review', 'Community engagement management',
        'Engagement & audience growth', 'DM management', '3 social media platforms'
      ], 2);

    insert into public.service_packages (group_id, name, features, sort_order) values
      (shoots_id, 'Content Day', array[
        'Content plan/moodboard', 'Creative strategy discussion', '2 hour shoot',
        'Creative direction', '10 edited visuals',
        'Photography and videography — posts and reels', 'Optional 1 month review call'
      ], 0),
      (shoots_id, 'Campaign Creation', array[
        'Research & audience analysis', 'Concept creation', 'Creative strategy discussion',
        'Tailored visuals', 'Tailored 2 hour photo or video shoot',
        'Logistics/location planning', 'Edited campaign content', 'Optional studio hire'
      ], 1),
      (shoots_id, 'Campaign Production', array[
        'Full creative concept', 'Pre-production', 'Professional photo/video production',
        'Scripts/storyboards', 'Social cutdowns', 'Campaign graphics', 'Copywriting',
        'Campaign launch strategy', 'Campaign performance tracking & reporting'
      ], 2);
  end if;
end $$;
