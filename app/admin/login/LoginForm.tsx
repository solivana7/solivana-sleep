"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setState("error");
        setErrorMsg(data.error || "Incorrect password.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setState("error");
      setErrorMsg("Network hiccup. Try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" aria-label="Admin sign in">
      <label htmlFor="admin-password" className="block">
        <span className="eyebrow block mb-2">Password</span>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={state === "submitting"}
          className="w-full min-h-[48px] px-4 py-3 text-base border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {state === "submitting" ? "One moment…" : "Sign in"}
      </button>
      {state === "error" && (
        <p role="alert" className="mt-4 text-sm text-bark bg-amber/10 border border-amber/30 px-3 py-2 rounded">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
