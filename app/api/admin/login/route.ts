import { NextRequest, NextResponse } from "next/server";
import { tryAdminLogin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Per-IP brute-force ceiling. After N failed attempts in the window, lock
// the IP for the remainder of the window. Single-replica state — fine on
// Railway, would need Redis if we ever scale horizontally.
const failedAttempts = new Map<string, { count: number; windowStart: number }>();
const ATTEMPT_WINDOW_MS = 15 * 60_000; // 15 minutes
const MAX_ATTEMPTS = 8;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const now = Date.now();
  const record = failedAttempts.get(ip);
  if (record && now - record.windowStart < ATTEMPT_WINDOW_MS && record.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const password = typeof body.password === "string" ? body.password : "";
  const ok = await tryAdminLogin(password);
  if (!ok) {
    if (!record || now - record.windowStart >= ATTEMPT_WINDOW_MS) {
      failedAttempts.set(ip, { count: 1, windowStart: now });
    } else {
      record.count += 1;
    }
    // Tiny throttle on bad passwords so brute force costs at least a few seconds per attempt
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: false, error: "Incorrect" }, { status: 401 });
  }
  failedAttempts.delete(ip);
  return NextResponse.json({ ok: true });
}
