"use client";

import { useState } from "react";
import Link from "next/link";

// Multi-step intake. Email-only would have worked, but a single optional
// follow-up question (sleep struggle) gives the practice real signal on
// every lead while still feeling like one form to the reader.
//
// The customer NEVER receives email from this submission — only the
// practice inbox gets the notification.

const STRUGGLES = [
  { value: "onset", label: "Trouble falling asleep" },
  { value: "maintenance", label: "Trouble staying asleep" },
  { value: "early-waking", label: "Waking too early, can't fall back" },
  { value: "all", label: "All of the above" },
];

export function NotifyForm({ initialPlan = "undecided" }: { initialPlan?: string }) {
  const [email, setEmail] = useState("");
  const [plan] = useState(initialPlan);
  const [struggle, setStruggle] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — must stay empty
  const [state, setState] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan, struggle, website }),
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        setState("error");
        setErrorMsg(data.error || "Something went wrong. Try again in a moment.");
        return;
      }
      setState("ok");
    } catch {
      setState("error");
      setErrorMsg("Network hiccup. Try again in a moment.");
    }
  }

  if (state === "ok") {
    return (
      <div className="card" aria-live="polite">
        <p className="eyebrow mb-2">You&apos;re on the list</p>
        <p className="font-sans text-bark text-xl font-light leading-snug">
          One email when the protocol opens. Then silence until you&apos;re in.
        </p>
        <p className="mt-4 text-sm text-mid leading-relaxed">
          In the meantime, the audio library works tonight — no signup needed.
        </p>
        <Link href="/audio" className="btn-secondary mt-6 inline-flex">
          Open the audio library
        </Link>
      </div>
    );
  }

  return (
    <form className="card" onSubmit={onSubmit} aria-label="Notify me when SoliVana Sleep opens">
      {/* Honeypot — hidden from humans, irresistible to dumb bots. Real
          visitors leave it empty; the API silently drops anything filled in. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden" style={{ position: "absolute" }}>
        <label>
          Website (leave blank)
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>
      <label htmlFor="email" className="block">
        <span className="eyebrow block mb-2">Email</span>
        <input
          id="email"
          name="email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === "submitting"}
          className="w-full min-h-[48px] px-4 py-3 text-base border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
        />
      </label>

      <fieldset className="mt-6">
        <legend className="eyebrow mb-3">What&apos;s the pattern? (optional)</legend>
        <div className="space-y-2">
          {STRUGGLES.map((s) => (
            <label
              key={s.value}
              className="flex items-start gap-3 p-3 rounded-md border border-bark/10 hover:border-amber cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="struggle"
                value={s.value}
                checked={struggle === s.value}
                onChange={() => setStruggle(s.value)}
                disabled={state === "submitting"}
                className="mt-1 accent-amber w-4 h-4"
              />
              <span className="text-sm text-bark">{s.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 flex items-start gap-3 text-sm text-mid">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={state === "submitting"}
          className="mt-1 accent-amber w-5 h-5"
        />
        <span>
          I consent to one email from SoliVana when the program opens. I can
          unsubscribe at any time.{" "}
          <Link href="/privacy" className="underline text-bark hover:text-amber">
            Privacy.
          </Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary mt-6 w-full disabled:opacity-60 disabled:cursor-wait"
      >
        {state === "submitting" ? "One moment…" : "Hold my spot"}
      </button>

      {state === "error" && (
        <p role="alert" className="mt-4 text-sm text-bark bg-amber/10 border border-amber/30 px-3 py-2 rounded">
          {errorMsg}
        </p>
      )}

      <p className="mt-4 text-xs text-mid italic">
        One email. No marketing list. Educational interpretation only — not a
        substitute for clinical diagnosis or treatment of insomnia disorder.
      </p>
    </form>
  );
}
