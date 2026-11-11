# Supabase backend

1. **Table**: run `schema.sql` in the SQL Editor.
2. **Email alerts via Resend** (admin: wajeehalocalseo@gmail.com):
   - Resend: create an API key. With the free `onboarding@resend.dev` sender, Resend only delivers to the email your Resend account was registered with, so register Resend with wajeehalocalseo@gmail.com, or verify the domain gulfelitetransportgroup.com in Resend and set `FROM_EMAIL`.
   - Deploy the function (needs Supabase CLI):
     `supabase functions deploy notify-quote --no-verify-jwt`
     (or paste `functions/notify-quote/index.ts` in Dashboard > Edge Functions > New function; turn "Verify JWT" off).
   - Set secrets (Dashboard > Edge Functions > Secrets, or `supabase secrets set`):
     - `RESEND_API_KEY` = your Resend key
     - `ADMIN_EMAIL` = wajeehalocalseo@gmail.com
     - `WEBHOOK_SECRET` = any long random string
     - `FROM_EMAIL` (optional) = `Gulf Elite Transport <quotes@gulfelitetransportgroup.com>` once the domain is verified
   - Dashboard > Database > Webhooks > Create: table `quote_requests`, event **Insert**, type **Supabase Edge Functions** (or HTTP Request) to `notify-quote`, add HTTP header `x-webhook-secret` = the same WEBHOOK_SECRET.
