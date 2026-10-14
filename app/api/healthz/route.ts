// Railway healthcheck endpoint. Dynamic so it's served from the live
// server (not a prerendered static file) — earlier attempt with
// force-static may have interfered with standalone-mode serving.
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  return Response.json({ ok: true, service: "solivana-sleep" });
}
