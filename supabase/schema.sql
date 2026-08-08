-- Affiliate link tracking schema.
-- Run in the Supabase SQL editor, or via `supabase db push`.

create table if not exists affiliate_links (
  slug text primary key,
  destination_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  page_path text,
  locale text,
  referrer text,
  created_at timestamptz not null default now()
);

create index if not exists affiliate_clicks_slug_idx on affiliate_clicks (slug);
create index if not exists affiliate_clicks_created_at_idx on affiliate_clicks (created_at);

alter table affiliate_links enable row level security;
alter table affiliate_clicks enable row level security;

-- No public policies are defined: both tables are only ever accessed with the
-- service role key from the /go/[slug] route handler, which bypasses RLS.
