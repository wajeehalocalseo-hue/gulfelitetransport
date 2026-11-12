-- Run once in Supabase > SQL Editor, AFTER schema.sql, admin.sql and admin-advanced.sql. Safe to run again.
-- Adds the drivers list and lets you assign a driver to a request.

create table if not exists public.drivers (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 2 and 120),
  phone         text not null check (char_length(phone) between 7 and 40),
  city          text check (char_length(city) <= 80),
  vehicle_type  text check (char_length(vehicle_type) <= 40),
  vehicle_model text check (char_length(vehicle_model) <= 80),
  plate         text check (char_length(plate) <= 30),
  languages     text check (char_length(languages) <= 120),
  status        text not null default 'available' check (status in ('available','busy','off')),
  active        boolean not null default true,
  notes         text check (char_length(notes) <= 2000)
);

alter table public.drivers enable row level security;
revoke all on public.drivers from anon, authenticated;
grant select, insert, update, delete on public.drivers to authenticated;

drop policy if exists "admin manages drivers" on public.drivers;
create policy "admin manages drivers" on public.drivers for all to authenticated
  using ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'))
  with check ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));

alter table public.quote_requests
  add column if not exists driver_id uuid references public.drivers(id) on delete set null;
create index if not exists quote_requests_driver_idx on public.quote_requests (driver_id) where driver_id is not null;

-- The public website still cannot set any admin-only field (now including driver_id).
drop policy if exists "anon can insert quote requests" on public.quote_requests;
create policy "anon can insert quote requests"
  on public.quote_requests for insert to anon
  with check (status = 'new' and priority = 'normal' and assigned_to is null and quote_amount is null
              and follow_up_at is null and internal_notes is null and driver_id is null);
