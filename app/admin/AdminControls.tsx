"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eyebrow } from "@/components/Brand";

// Inline admin controls — sign out + preview-mode toggle. The toggle
// uses the same /api/preview endpoint that the public /preview page
// uses, so the behavior is identical to a shared-code recipient.

export function AdminControls({ previewActive }: { previewActive: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"signout" | "preview-on" | "preview-off" | null>(null);
  const [previewCode, setPreviewCode] = useState("");
  const [previewError, setPreviewError] = useState("");

  async function signOut() {
    setBusy("signout");
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
    router.refresh();
  }

  async function enablePreview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy("preview-on");
    setPreviewError("");
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: previewCode }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setPreviewError(data.error || "That code didn't match.");
      } else {
        setPreviewCode("");
        router.refresh();
      }
    } finally {
      setBusy(null);
    }
  }

  async function disablePreview() {
    if (busy) return;
    setBusy("preview-off");
    try {
      await fetch("/api/preview", { method: "DELETE" });
    } catch {}
    setBusy(null);
    router.refresh();
  }

  return (
    <div className="mt-7 card">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <div>
          <Eyebrow>Preview mode</Eyebrow>
          <p className="font-sans text-bark text-lg font-light mt-1">
            {previewActive
              ? "You're previewing as a member. Everything's unlocked."
              : "Enable preview to bypass the (forthcoming) paywall."}
          </p>
        </div>
        <span
          className={`inline-flex items-center gap-2 text-xs font-display tracking-wider uppercase px-3 py-1 rounded-full border ${
            previewActive
              ? "border-amber bg-amber/10 text-bark"
              : "border-bark/15 text-mid"
          }`}
        >
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full ${previewActive ? "bg-amber" : "bg-mid/50"}`}
          />
          {previewActive ? "Active" : "Inactive"}
        </span>
      </div>

      {previewActive ? (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={disablePreview}
            disabled={!!busy}
            className="btn-secondary disabled:opacity-60"
          >
            {busy === "preview-off" ? "Disabling…" : "Exit preview"}
          </button>
          <Link href="/begin" className="btn-primary">
            Open as member
          </Link>
        </div>
      ) : (
        <form onSubmit={enablePreview} className="flex flex-wrap gap-3 items-end">
          <label className="block flex-1 min-w-[220px]">
            <span className="eyebrow block mb-2">Preview code</span>
            <input
              type="text"
              autoComplete="off"
              spellCheck={false}
              value={previewCode}
              onChange={(e) => setPreviewCode(e.target.value)}
              placeholder="Enter PREVIEW_CODE value"
              className="w-full min-h-[48px] px-4 py-3 text-base font-mono border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
            />
          </label>
          <button
            type="submit"
            disabled={!!busy || !previewCode}
            className="btn-primary disabled:opacity-60"
          >
            {busy === "preview-on" ? "Activating…" : "Enable"}
          </button>
        </form>
      )}

      {previewError && (
        <p role="alert" className="mt-3 text-sm text-bark bg-amber/10 border border-amber/30 px-3 py-2 rounded">
          {previewError}
        </p>
      )}

      <hr className="my-5 border-bark/10" />

      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="text-mid">
          Signed in as admin. Single-user gate via cookie.
        </p>
        <button
          type="button"
          onClick={signOut}
          disabled={!!busy}
          className="text-mid hover:text-amber underline underline-offset-4 disabled:opacity-60"
        >
          {busy === "signout" ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
