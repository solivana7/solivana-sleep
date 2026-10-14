// Persistent indicator that preview mode is active. Server-rendered
// so it's part of the initial HTML and never flashes. Sits below the
// top bar; can be dismissed for the current page but reappears on
// navigation since the cookie persists.

import Link from "next/link";
import { hasPreview } from "@/lib/auth";

export async function PreviewBanner() {
  const active = await hasPreview();
  if (!active) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-amber/10 border-b border-amber/30 text-bark"
    >
      <div className="mx-auto max-w-6xl px-6 py-2 flex items-center justify-between gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-3 min-h-[36px]">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-amber"
          />
          <span className="eyebrow">Preview mode</span>
          <span className="text-mid hidden sm:inline">
            All features unlocked. Cookie expires in one year.
          </span>
        </div>
        <Link
          href="/admin/login"
          className="text-xs font-display tracking-wider uppercase text-mid hover:text-amber min-h-[36px] inline-flex items-center"
        >
          Manage
        </Link>
      </div>
    </div>
  );
}
