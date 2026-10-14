import { NextResponse } from "next/server";
import { clearAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  await clearAdmin();
  return NextResponse.json({ ok: true });
}
