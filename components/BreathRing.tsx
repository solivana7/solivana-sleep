"use client";

import { useEffect, useState } from "react";

// 4-7-8 breath ring. Signature visual on the audio block. CSS-only
// animation respects prefers-reduced-motion via globals.css. Phase
// label updates in sync with the cycle.

const PHASES = [
  { name: "Inhale", seconds: 4 },
  { name: "Hold", seconds: 7 },
  { name: "Exhale", seconds: 8 },
] as const;

const CYCLE = PHASES.reduce((acc, p) => acc + p.seconds, 0); // 19s

export function BreathRing() {
  const [phase, setPhase] = useState<typeof PHASES[number]["name"]>("Inhale");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    let t = 0;
    const iv = setInterval(() => {
      t = (t + 1) % CYCLE;
      // Determine which phase we're in
      let acc = 0;
      for (const p of PHASES) {
        acc += p.seconds;
        if (t < acc) {
          setPhase(p.name);
          return;
        }
      }
    }, 1000);
    return () => clearInterval(iv);
  }, [running]);

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
        aria-label="Four-seven-eight breath visualization"
      >
        {/* Outer ring — slowly pulses */}
        <div
          className={`absolute inset-0 rounded-full border border-amber/40 ${running ? "breath-outer" : ""}`}
          aria-hidden="true"
        />
        {/* Inner orb — scales with breath phase */}
        <div
          className={`absolute inset-6 rounded-full bg-amber/15 ${running ? "breath-inner" : ""}`}
          aria-hidden="true"
        />
        {/* Center — phase label */}
        <div className="relative z-10 text-center">
          <p className="eyebrow">{running ? "Now" : "Tap to begin"}</p>
          <p className="font-display text-3xl text-bark font-light mt-1">
            {running ? phase : "Breath ritual"}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        aria-pressed={running}
        className="btn-secondary mt-6"
      >
        {running ? "Pause" : "Begin the cycle"}
      </button>

      <p className="mt-3 text-xs text-mid">4-7-8 · used in CBT-I Week 3 audio relaxation</p>

      {/* Scoped CSS for the smooth breath cycle. The keyframes follow
          the 4-7-8 cadence: scale up over 4s, hold 7s, scale down 8s.
          Keep this on the component so global motion stays minimal. */}
      <style jsx>{`
        @keyframes breathInner {
          0% { transform: scale(0.7); opacity: 0.5; }
          21% { transform: scale(1); opacity: 0.85; }
          /* 4s ÷ 19s ≈ 21% */
          57.9% { transform: scale(1); opacity: 0.85; }
          /* hold from 21% to 57.9% (4+7 of 19) */
          100% { transform: scale(0.7); opacity: 0.5; }
        }
        @keyframes breathOuter {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .breath-inner {
          animation: breathInner 19s ease-in-out infinite;
        }
        .breath-outer {
          animation: breathOuter 19s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .breath-inner, .breath-outer { animation: none; }
        }
      `}</style>
    </div>
  );
}
