import { NextRequest, NextResponse } from "next/server";
import { tryPreview } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// One-click preview activation via shareable URL.
// GET /api/preview/activate?code=XXX&next=/audio
//
// Used by /preview when a `?code=` query is present (server components
// can't set cookies, only route handlers can). Also supports a `next`
// query for redirect target — defaults to /audio.

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = (url.searchParams.get("code") || "").trim();
  const nextPath = url.searchParams.get("next") || "/audio";
  const safeNext = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/audio";

  // Railway's proxy delivers requests to the container as 0.0.0.0:8080,
  // so `req.url` carries that internal address. Reconstruct the public
  // origin from forwarded headers so redirects land on the visitor's
  // actual host (web-production-*.railway.app, sleep.solivana.io, etc).
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    url.host;
  const publicOrigin = `${proto}://${host}`;

  const ok = await tryPreview(code);
  if (!ok) {
    return NextResponse.redirect(`${publicOrigin}/preview?invalid=1`);
  }
  const sep = safeNext.includes("?") ? "&" : "?";
  return NextResponse.redirect(`${publicOrigin}${safeNext}${sep}preview=1`);
}
