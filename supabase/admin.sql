-- Run once in Supabase > SQL Editor, AFTER schema.sql.
-- Lets ONLY the admin account (matched by the email inside the signed login token) read, update and delete
-- quote requests. Everyone else (including the public site key) still can only INSERT.
-- To add another admin, add their email to the list in both policies.

drop policy if exists "admin can read quote requests" on public.quote_requests;
create policy "admin can read quote requests"
  on public.quote_requests for select to authenticated
  using ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));

drop policy if exists "admin can update quote requests" on public.quote_requests;
create policy "admin can update quote requests"
  on public.quote_requests for update to authenticated
  using ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'))
  with check ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));

drop policy if exists "admin can delete quote requests" on public.quote_requests;
create policy "admin can delete quote requests"
  on public.quote_requests for delete to authenticated
  using ((auth.jwt() ->> 'email') in ('wajeehalocalseo@gmail.com'));

grant select, update, delete on public.quote_requests to authenticated;
