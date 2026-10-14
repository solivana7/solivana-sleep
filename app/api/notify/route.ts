import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Notify-me intake. Two side-effects, both fire-and-forget so the user
// never sees a delay from downstream outages:
//   1. Resend → info@solivana.com (the practice inbox; never the customer)
//   2. Make.com webhook → GHL contact + sleep-lead tag + event tags + note
//
// Per SoliVana email rules: FROM info@solivana.com TO info@solivana.com.
// Per all-apps-push-to-ghl: every customer-facing app forwards captured
// contact data to GHL via Make.com with {project-slug}-lead tag + result
// note. Tag scheme: sleep-lead + plan-{program|membership|undecided} +
// optional struggle-{slug}.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PLANS = new Set(["program", "membership", "undecided"]);

// In-memory state — single-replica Railway, fine for waitlist phase.
// Resets on restart (acceptable — both maps are short-window guards).
const recentSubmissions = new Map<string, number>();
const RATE_WINDOW_MS = 30_000;
const ipHits = new Map<string, { count: number; windowStart: number }>();
const IP_WINDOW_MS = 60_000;
const IP_MAX_PER_WINDOW = 6;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Fire-and-forget POST to the Make.com scenario that creates/updates the
// GHL contact, applies the sleep-lead + event tags, and writes the result
// note. Never throws — Make outages must not block the user.
async function pushToMake(payload: {
  email: string;
  plan: string;
  struggle: string;
  ip: string;
  userAgent: string;
}): Promise<void> {
  const url = process.env.MAKE_NOTIFY_WEBHOOK_URL;
  if (!url) {
    console.warn("[notify] MAKE_NOTIFY_WEBHOOK_URL not set — skipping GHL push");
    return;
  }

  const tags = ["sleep-lead", `plan-${payload.plan}`];
  if (payload.struggle) {
    const slug = payload.struggle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40);
    if (slug) tags.push(`struggle-${slug}`);
  }

  const note = [
    `SoliVana Sleep — waitlist signup (${new Date().toISOString().slice(0, 10)})`,
    `Plan intent: ${payload.plan}`,
    payload.struggle ? `Sleep struggle: ${payload.struggle}` : null,
    `Source: sleep.solivana.io /api/notify`,
  ]
    .filter(Boolean)
    .join("\n");

  const body = {
    event_type: "waitlist_signup",
    source: "sleep",
    timestamp: new Date().toISOString(),
    contact_data: {
      email: payload.email,
    },
    result_data: {
      plan: payload.plan,
      struggle: payload.struggle || null,
      tags,
      note,
    },
    meta: {
      ip: payload.ip,
      user_agent: payload.userAgent.slice(0, 200),
      app_version: "sleep@1",
    },
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      console.error("[notify] Make webhook non-2xx:", res.status, await res.text().catch(() => ""));
    }
  } catch (e) {
    console.error("[notify] Make webhook error:", e);
  }
}

export async function POST(req: NextRequest) {
  // Per-IP rate limit before parsing so a flood doesn't churn JSON parsing.
  const ip = clientIp(req);
  const now = Date.now();
  const hit = ipHits.get(ip);
  if (hit && now - hit.windowStart < IP_WINDOW_MS) {
    if (hit.count >= IP_MAX_PER_WINDOW) {
      return NextResponse.json({ ok: false, error: "Too many requests. Try again in a minute." }, { status: 429 });
    }
    hit.count += 1;
  } else {
    ipHits.set(ip, { count: 1, windowStart: now });
  }

  let body: { email?: unknown; plan?: unknown; struggle?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real visitors leave `website` empty (it's a hidden field).
  // Bots fill every field. Silently accept (don't tell the bot it failed)
  // so they don't retry with adjusted heuristics.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, deduped: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const plan = typeof body.plan === "string" ? body.plan : "undecided";
  const struggleRaw = typeof body.struggle === "string" ? body.struggle.slice(0, 200) : "";
  const safeStruggle = struggleRaw.replace(/[<>]/g, "");

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }
  const safePlan = PLANS.has(plan) ? plan : "undecided";

  // Dedupe rapid resubmits (same email within 30s window)
  for (const [k, ts] of recentSubmissions) {
    if (now - ts > RATE_WINDOW_MS) recentSubmissions.delete(k);
  }
  if (recentSubmissions.has(email)) {
    return NextResponse.json({ ok: true, deduped: true });
  }
  recentSubmissions.set(email, now);

  // Fire-and-forget GHL push. Not awaited — never delays the user response,
  // never throws into the request lifecycle.
  void pushToMake({
    email,
    plan: safePlan,
    struggle: safeStruggle,
    ip,
    userAgent: req.headers.get("user-agent") || "",
  });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Don't 500 the user if Resend isn't configured — log and accept.
    // The missing-key state is reviewable in Railway logs.
    console.warn("[notify] RESEND_API_KEY not set — accepting without delivery");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const safeEmail = email.replace(/[^a-zA-Z0-9._@+\-]/g, "");
  const subject = `[Sleep] New signup: ${safeEmail} · ${safePlan}`;
  const text = [
    "A new SoliVana Sleep signup just landed.",
    "",
    `Email:     ${safeEmail}`,
    `Plan:      ${safePlan}`,
    safeStruggle ? `Struggle:  ${safeStruggle}` : null,
    `When:      ${new Date().toISOString()}`,
    "",
    "—",
    "Sent by sleep.solivana.io · /api/notify",
  ].filter(Boolean).join("\n");

  try {
    const { error } = await resend.emails.send({
      from: "SoliVana Sleep <info@solivana.com>",
      to: ["info@solivana.com"],
      replyTo: safeEmail,
      subject,
      text,
    });
    if (error) {
      console.error("[notify] Resend error:", error);
      // Still return ok to the user; the failure is operational, not theirs.
      return NextResponse.json({ ok: true, delivered: false });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[notify] Unexpected error:", e);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
