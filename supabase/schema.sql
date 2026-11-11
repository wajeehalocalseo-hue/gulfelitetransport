-- Run this once in Supabase: Dashboard > SQL Editor > New query > paste > Run.
-- The website (anon key) can only INSERT. Nobody can read rows with the public key;
-- view requests in Dashboard > Table Editor (or with the service role, never in the website).

create table if not exists public.quote_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 2 and 120),
  business      text check (char_length(business) <= 160),
  phone         text not null check (char_length(phone) between 7 and 40),
  email         text not null check (char_length(email) between 5 and 200),
  service       text not null check (char_length(service) <= 160),
  topic         text check (char_length(topic) <= 200),
  pickup        text check (char_length(pickup) <= 300),
  dropoff       text check (char_length(dropoff) <= 300),
  preferred_date date,
  details       text not null check (char_length(details) between 10 and 3000),
  extra         text check (char_length(extra) <= 3000),
  page_path     text check (char_length(page_path) <= 300),
  status        text not null default 'new' check (status in ('new','contacted','quoted','won','lost','spam'))
);

alter table public.quote_requests enable row level security;

drop policy if exists "anon can insert quote requests" on public.quote_requests;
create policy "anon can insert quote requests"
  on public.quote_requests
  for insert
  to anon
  with check (status = 'new');

-- Only INSERT is granted to the public roles; no select/update/delete.
revoke all on public.quote_requests from anon, authenticated;
grant insert on public.quote_requests to anon;

create index if not exists quote_requests_created_idx on public.quote_requests (created_at desc);
