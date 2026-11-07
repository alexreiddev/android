-- BLOB website: form submissions, uploads bucket, rate limiting.
-- All tables have RLS enabled and NO policies: anon/authenticated roles can neither
-- read nor write. The site inserts only from the server with the service role key.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Shared columns: id, created_at, source_page, utm_*, consent, status
-- ---------------------------------------------------------------------------

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  name text,
  city text,
  interest text check (interest in ('field','soft','atelier','firefly_path','undecided')),
  source_page text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  consent boolean not null default true, -- joining the waitlist is the consent
  status text not null default 'new'
);
create unique index if not exists waitlist_email_key on public.waitlist (lower(email));

create table if not exists public.b2b_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  property_name text not null,
  contact_name text not null,
  role text,
  email text not null,
  phone text not null,
  property_type text not null check (property_type in ('resort','homestay','plantation_stay','campsite','other')),
  location text not null,
  units_estimated integer not null check (units_estimated > 0),
  areas text[] not null default '{}',
  timeline text not null,
  budget_range text,
  message text,
  source_page text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  consent boolean not null check (consent),
  status text not null default 'new'
);

create table if not exists public.atelier_commissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text not null,
  client_type text not null check (client_type in ('homeowner','architect','interior_designer','landscape_designer','hospitality')),
  project_location text not null,
  pieces integer not null check (pieces > 0),
  glass_finish text not null check (glass_finish in ('clear','frosted','undecided')),
  placement text not null check (placement in ('indoor','outdoor','both')),
  upload_paths text[] not null default '{}' check (cardinality(upload_paths) <= 5),
  budget_range text,
  desired_date text,
  message text,
  source_page text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  consent boolean not null check (consent),
  status text not null default 'new'
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  topic text,
  message text not null,
  source_page text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  consent boolean not null check (consent),
  status text not null default 'new'
);

-- Phase 2 (pre-orders, disabled by default)
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tier text,
  razorpay_order_id text not null,
  razorpay_payment_id text not null unique,
  amount_inr numeric,
  email text,
  phone text,
  status text not null default 'paid'
);

create index if not exists b2b_created_idx on public.b2b_enquiries (created_at desc);
create index if not exists atelier_created_idx on public.atelier_commissions (created_at desc);
create index if not exists contact_created_idx on public.contact_messages (created_at desc);

alter table public.waitlist enable row level security;
alter table public.b2b_enquiries enable row level security;
alter table public.atelier_commissions enable row level security;
alter table public.contact_messages enable row level security;
alter table public.reservations enable row level security;

revoke all on public.waitlist, public.b2b_enquiries, public.atelier_commissions, public.contact_messages, public.reservations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Rate limiting (hashed IP keys only; rows older than a day are purged)
-- ---------------------------------------------------------------------------
create table if not exists public.rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  hits integer not null default 0
);
alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon, authenticated;

create or replace function public.rate_limit_hit(p_key text, p_window_seconds integer, p_max integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hits integer;
begin
  -- opportunistic cleanup
  delete from public.rate_limits where window_start < now() - interval '1 day';

  insert into public.rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update
    set hits = case when r.window_start < now() - make_interval(secs => p_window_seconds) then 1 else r.hits + 1 end,
        window_start = case when r.window_start < now() - make_interval(secs => p_window_seconds) then now() else r.window_start end
  returning hits into v_hits;

  return v_hits <= p_max;
end;
$$;

revoke all on function public.rate_limit_hit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.rate_limit_hit(text, integer, integer) to service_role;

-- ---------------------------------------------------------------------------
-- Storage: private bucket for Atelier inspiration images
-- 10 MB per file, images only. No storage policies → no public/anon access;
-- uploads happen only via server-issued signed upload URLs.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'atelier-uploads',
  'atelier-uploads',
  false,
  10485760,
  array['image/jpeg','image/png','image/webp','image/avif','image/heic','image/heif']
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
