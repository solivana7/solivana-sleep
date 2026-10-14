import { NextRequest, NextResponse } from "next/server";
import { tryPreview, clearPreview } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: { code?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const code = typeof body.code === "string" ? body.code.trim() : "";
  const ok = await tryPreview(code);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ ok: false, error: "That code didn't match." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearPreview();
  return NextResponse.json({ ok: true });
}
