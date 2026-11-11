-- BLOB website: form submissions, uploads bucket, rate limiting.
-- Every object is prefixed blob_ so it can live beside another app's tables.
-- All tables have RLS enabled and NO policies: anon/authenticated roles can neither
-- read nor write them. The site writes only through blob_submit(), which needs
-- the website's own secret (see "Scoped server access" below).


-- ---------------------------------------------------------------------------
-- Shared columns: id, created_at, source_page, utm_*, consent, status
-- ---------------------------------------------------------------------------

create table if not exists public.blob_waitlist (
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
create unique index if not exists blob_waitlist_email_key on public.blob_waitlist (lower(email));

create table if not exists public.blob_b2b_enquiries (
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
  interests text[] not null default '{}', -- fleet_quote | pilot | night_demo
  areas text[] not null default '{}',
  timeline text not null,
  budget_range text,
  message text,
  source_page text,
  utm_source text, utm_medium text, utm_campaign text, utm_term text, utm_content text,
  consent boolean not null check (consent),
  status text not null default 'new'
);

create table if not exists public.blob_atelier_commissions (
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

create table if not exists public.blob_contact_messages (
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
create table if not exists public.blob_reservations (
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

create index if not exists blob_b2b_created_idx on public.blob_b2b_enquiries (created_at desc);
create index if not exists blob_atelier_created_idx on public.blob_atelier_commissions (created_at desc);
create index if not exists blob_contact_created_idx on public.blob_contact_messages (created_at desc);

alter table public.blob_waitlist enable row level security;
alter table public.blob_b2b_enquiries enable row level security;
alter table public.blob_atelier_commissions enable row level security;
alter table public.blob_contact_messages enable row level security;
alter table public.blob_reservations enable row level security;

revoke all on public.blob_waitlist, public.blob_b2b_enquiries, public.blob_atelier_commissions, public.blob_contact_messages, public.blob_reservations from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Rate limiting (hashed IP keys only; rows older than a day are purged)
-- ---------------------------------------------------------------------------
create table if not exists public.blob_rate_limits (
  key text primary key,
  window_start timestamptz not null default now(),
  hits integer not null default 0
);
alter table public.blob_rate_limits enable row level security;
revoke all on public.blob_rate_limits from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Scoped server access.
-- The website does NOT need the project's service-role key. It calls the two
-- functions below with its own secret (BLOB_DB_SECRET). Only a SHA-256 hash of
-- that secret is stored here. This lets BLOB share a database with another app
-- without the website being able to read or change that app's data.
-- Set the hash once:
--   insert into public.blob_config (key, value) values ('submit_secret_hash', '<sha256 hex>')
--   on conflict (key) do update set value = excluded.value;
-- ---------------------------------------------------------------------------
create table if not exists public.blob_config (
  key text primary key,
  value text not null
);
alter table public.blob_config enable row level security;
revoke all on public.blob_config from anon, authenticated;

create or replace function public.blob_check_secret(p_secret text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_secret is null or not exists (
    select 1 from public.blob_config
    where key = 'submit_secret_hash'
      and value = encode(sha256(convert_to(p_secret, 'UTF8')), 'hex')
  ) then
    raise exception 'not authorised' using errcode = '42501';
  end if;
end;
$$;

create or replace function public.blob_rate_limit_hit(p_secret text, p_key text, p_window_seconds integer, p_max integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hits integer;
begin
  perform public.blob_check_secret(p_secret);
  delete from public.blob_rate_limits where window_start < now() - interval '1 day';

  insert into public.blob_rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update
    set hits = case when r.window_start < now() - make_interval(secs => p_window_seconds) then 1 else r.hits + 1 end,
        window_start = case when r.window_start < now() - make_interval(secs => p_window_seconds) then now() else r.window_start end
  returning hits into v_hits;

  return v_hits <= p_max;
end;
$$;

-- Inserts one validated form submission. Returns 'ok' or 'duplicate'.
create or replace function public.blob_submit(p_secret text, p_form text, p_row jsonb)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_table text;
  v_cols text;
begin
  perform public.blob_check_secret(p_secret);

  v_table := case p_form
    when 'waitlist' then 'blob_waitlist'
    when 'b2b' then 'blob_b2b_enquiries'
    when 'atelier' then 'blob_atelier_commissions'
    when 'contact' then 'blob_contact_messages'
    when 'reservation' then 'blob_reservations'
  end;
  if v_table is null then
    raise exception 'unknown form %', p_form;
  end if;

  -- Only real columns of the target table, never id / created_at.
  select string_agg(quote_ident(c.column_name), ', ')
    into v_cols
  from information_schema.columns c
  where c.table_schema = 'public'
    and c.table_name = v_table
    and c.column_name not in ('id', 'created_at')
    and p_row ? c.column_name;

  if v_cols is null then
    raise exception 'empty submission';
  end if;

  begin
    execute format(
      'insert into public.%I (%s) select %s from jsonb_populate_record(null::public.%I, $1)',
      v_table, v_cols, v_cols, v_table
    ) using p_row;
  exception when unique_violation then
    return 'duplicate';
  end;
  return 'ok';
end;
$$;

revoke all on function public.blob_check_secret(text) from public, anon, authenticated;
revoke all on function public.blob_rate_limit_hit(text, text, integer, integer) from public;
revoke all on function public.blob_submit(text, text, jsonb) from public;
grant execute on function public.blob_rate_limit_hit(text, text, integer, integer) to anon, service_role;
grant execute on function public.blob_submit(text, text, jsonb) to anon, service_role;

-- ---------------------------------------------------------------------------
-- Storage: private bucket for Atelier inspiration images
-- 10 MB per file, images only. No storage policies → no public/anon access;
-- uploads happen only via server-issued signed upload URLs.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blob-atelier-uploads',
  'blob-atelier-uploads',
  false,
  10485760,
  array['image/jpeg','image/png','image/webp','image/avif','image/heic','image/heif']
)
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;
