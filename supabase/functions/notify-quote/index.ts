// Supabase Edge Function: emails the admin through Resend when a row is inserted into quote_requests.
// Triggered by a Database Webhook (see supabase/README.md). Secrets are set in Supabase, never in the repo:
//   RESEND_API_KEY, WEBHOOK_SECRET, ADMIN_EMAIL, FROM_EMAIL
const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

Deno.serve(async (req) => {
  if (req.headers.get("x-webhook-secret") !== Deno.env.get("WEBHOOK_SECRET")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const payload = await req.json().catch(() => null);
  const r = payload?.record;
  if (payload?.type !== "INSERT" || !r) return new Response("Ignored", { status: 200 });

  const rows: [string, unknown][] = [
    ["Name", r.name],
    ["Business", r.business],
    ["Phone", r.phone],
    ["Email", r.email],
    ["Service", r.service],
    ["Topic", r.topic],
    ["Pickup", r.pickup],
    ["Drop-off / delivery", r.dropoff],
    ["Preferred date", r.preferred_date],
    ["Details", r.details],
    ["Additional requirements", r.extra],
    ["Page", r.page_path],
  ];
  const html =
    `<h2>New quote request</h2><table cellpadding="6" style="border-collapse:collapse">` +
    rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("") +
    `</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: Deno.env.get("FROM_EMAIL") ?? "Gulf Elite Transport <onboarding@resend.dev>",
      to: [Deno.env.get("ADMIN_EMAIL")],
      reply_to: r.email,
      subject: `New quote request: ${String(r.service ?? "").slice(0, 80)} - ${String(r.name ?? "").slice(0, 60)}`,
      html,
    }),
  });

  return new Response(res.ok ? "Sent" : `Resend error ${res.status}`, { status: res.ok ? 200 : 502 });
});
