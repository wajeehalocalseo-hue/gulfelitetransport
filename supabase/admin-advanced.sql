-- Run once in Supabase > SQL Editor, AFTER schema.sql and admin.sql. Safe to run again.
-- Adds CRM fields to quote_requests and an activity log (request_events).

alter table public.quote_requests
  add column if not exists priority text not null default 'normal',
  add column if not exists assigned_to text,
  add column if not exists quote_amount numeric(12,2),
  add column if not exists follow_up_at date,
  add column if not exists internal_notes text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.quote_requests drop constraint if exists quote_requests_priority_check;
alter table public.quote_requests add constraint quote_requests_priority_check check (priority in ('low','normal','high','urgent'));
alter table public.quote_requests drop constraint if exists quote_requests_notes_len;
alter table public.quote_requests add constraint quote_requests_notes_len check (char_length(internal_notes) <= 5000);
alter table public.quote_requests drop constraint if exists quote_requests_assigned_len;
alter table public.quote_requests add constraint quote_requests_assigned_len check (char_length(assigned_to) <= 120);

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists quote_requests_touch on public.quote_requests;
create trigger quote_requests_touch before update on public.quote_requests
  for each row execute function public.touch_updated_at();

-- The public website may only create plain "new" requests: it cannot set any admin-only field.
drop policy if exists "anon can insert quote requests" on public.quote_requests;
create policy "anon can insert quote requests"
  on public.quote_requests for insert to anon
  with check (status = 'new' and priority = 'normal' and assigned_to is null and quote_amount is null
              and follow_up_at is null and internal_notes is null);

create index if not exists quote_requests_status_idx on public.quote_requests (status);
create index if not exists quote_requests_followup_idx on public.quote_requests (follow_up_at) where follow_up_at is not null;

-- Activity log (status changes, notes, assignments). Admin only.
create table if not exists public.request_events (
  id         uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.quote_requests(id) on delete cascade,
  created_at timestamptz not null default now(),
  actor      text not null check (char_length(actor) <= 200),
  kind       text not null check (char_length(kind) <= 40),
  text       text not null check (char_length(text) <= 2000)
);
alter table public.request_events enable row level security;
revoke all on public.request_events from anon, authenticated;
grant select, insert, delete on public.request_events to authenticated;

drop policy if exists "admin reads events" on public.request_events;
create policy "admin reads events" on public.request_events for select to authenticated
  using ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));
drop policy if exists "admin writes events" on public.request_events;
create policy "admin writes events" on public.request_events for insert to authenticated
  with check ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));
drop policy if exists "admin deletes events" on public.request_events;
create policy "admin deletes events" on public.request_events for delete to authenticated
  using ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));

create index if not exists request_events_req_idx on public.request_events (request_id, created_at desc);
