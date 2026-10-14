// Internal auth + preview-mode cookie helpers.
//
// Two independent capabilities:
//   1. ADMIN — full /admin access. Cookie: solivana-admin. Password
//      comes from ADMIN_PASSWORD env var.
//   2. PREVIEW — bypass the (forward-looking) paywall. Cookie:
//      solivana-preview. Code comes from PREVIEW_CODE env var.
//      Anyone with the code can fully exercise the product without
//      signup — used for internal testing and for sharing with reviewers.
//
// The cookie value is HMAC-SHA256(secret, "solivana-<scope>-v1"), not the
// secret itself. A stolen cookie can be replayed but cannot be reversed
// to recover the env secret. Cookies are httpOnly + Secure + SameSite=Lax.

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "solivana-admin";
export const PREVIEW_COOKIE = "solivana-preview";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function tokenFor(secret: string, scope: "admin" | "preview"): string {
  return createHmac("sha256", secret).update(`solivana-${scope}-v1`).digest("hex");
}

function safeEqHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const jar = await cookies();
  const c = jar.get(ADMIN_COOKIE);
  if (!c?.value) return false;
  return safeEqHex(c.value, tokenFor(expected, "admin"));
}

export async function hasPreview(): Promise<boolean> {
  const expected = process.env.PREVIEW_CODE;
  if (!expected) return false;
  const jar = await cookies();
  const c = jar.get(PREVIEW_COOKIE);
  if (!c?.value) return false;
  return safeEqHex(c.value, tokenFor(expected, "preview"));
}

/** Verify a submitted admin password and set the cookie. Returns ok. */
export async function tryAdminLogin(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  if (!safeEqHex(tokenFor(password, "admin"), tokenFor(expected, "admin"))) return false;
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, tokenFor(expected, "admin"), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
  return true;
}

/** Verify a submitted preview code and set the cookie. Returns ok. */
export async function tryPreview(code: string): Promise<boolean> {
  const expected = process.env.PREVIEW_CODE;
  if (!expected || !code) return false;
  if (!safeEqHex(tokenFor(code, "preview"), tokenFor(expected, "preview"))) return false;
  const jar = await cookies();
  jar.set(PREVIEW_COOKIE, tokenFor(expected, "preview"), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
  });
  return true;
}

export async function clearAdmin(): Promise<void> {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function clearPreview(): Promise<void> {
  const jar = await cookies();
  jar.delete(PREVIEW_COOKIE);
}
