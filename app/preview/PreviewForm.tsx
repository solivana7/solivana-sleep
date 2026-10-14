"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PreviewForm({ initialError = "" }: { initialError?: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">(initialError ? "error" : "idle");
  const [errorMsg, setErrorMsg] = useState(initialError);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setState("error");
        setErrorMsg(data.error || "That code didn't match.");
        return;
      }
      router.push("/audio?preview=1");
      router.refresh();
    } catch {
      setState("error");
      setErrorMsg("Network hiccup. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" aria-label="Enter preview code">
      <label htmlFor="preview-code" className="block">
        <span className="eyebrow block mb-2">Preview code</span>
        <input
          id="preview-code"
          type="text"
          autoComplete="off"
          spellCheck={false}
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={state === "submitting"}
          className="w-full min-h-[48px] px-4 py-3 text-base font-mono border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {state === "submitting" ? "Opening…" : "Open the protocol"}
      </button>
      {state === "error" && errorMsg && (
        <p role="alert" className="mt-4 text-sm text-bark bg-amber/10 border border-amber/30 px-3 py-2 rounded">
          {errorMsg}
        </p>
      )}
      <p className="mt-4 text-xs text-mid">
        Or sign up to the waitlist on{" "}
        <a href="/begin" className="underline hover:text-amber">/begin</a>.
      </p>
    </form>
  );
}
