create table if not exists public.site_maker_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Untitled site',
  sections jsonb not null default '[]'::jsonb,
  owner_token text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_maker_form_submissions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.site_maker_projects(id) on delete cascade,
  form_element_id text not null,
  fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Create a public bucket named site-maker-media separately in Supabase Storage.
