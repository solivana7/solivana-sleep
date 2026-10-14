"use client";

import { useMemo, useState } from "react";

// The CBT-I sleep restriction therapy calculator, simplified for a
// landing-page demo. The reader inputs four numbers; we compute:
//   - Time In Bed (TIB)
//   - Total Sleep Time (TST)
//   - Sleep Efficiency (SE = TST / TIB)
//   - Prescribed Sleep Window (PSW = TST, with a floor of 5h per
//     CBT-I safety guideline; titrate up over weeks as SE > 85%)
//
// This is the same arithmetic a sleep specialist runs on a paper diary
// in week one. Showing it interactively on the landing page is the
// fastest way to make the value prop tangible.

type TimeStr = string; // "HH:MM"

function parseTime(t: TimeStr): number | null {
  // returns minutes-since-midnight or null
  const m = /^([01]?\d|2[0-3]):([0-5]\d)$/.exec(t);
  if (!m) return null;
  return parseInt(m[1], 10) * 60 + parseInt(m[2], 10);
}

function fmtTime(mins: number): string {
  const m = ((mins % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "am" : "pm";
  return `${h12}:${mm.toString().padStart(2, "0")} ${ampm}`;
}

function fmtDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function SleepWindowCalculator() {
  const [bedtime, setBedtime] = useState<TimeStr>("22:30");
  const [waketime, setWaketime] = useState<TimeStr>("06:30");
  const [onsetMin, setOnsetMin] = useState<number>(30);
  const [wakeDuringMin, setWakeDuringMin] = useState<number>(45);

  const result = useMemo(() => {
    const bed = parseTime(bedtime);
    const wake = parseTime(waketime);
    if (bed === null || wake === null) return null;

    let tib = wake - bed;
    if (tib <= 0) tib += 24 * 60; // overnight wrap
    if (tib < 240 || tib > 14 * 60) return null; // 4–14h sanity range

    const lostMin = Math.max(0, onsetMin) + Math.max(0, wakeDuringMin);
    const tst = Math.max(0, tib - lostMin);
    const efficiency = tib > 0 ? tst / tib : 0;

    // CBT-I prescribed window: TST, with a floor of 5h. Titrate up
    // when efficiency > 85% for a week.
    const FLOOR = 5 * 60;
    const psw = Math.max(FLOOR, Math.round(tst / 15) * 15); // round to nearest 15 min
    // New bedtime: keep wake time fixed (CBT-I rule), compute new bed
    const newBed = ((wake - psw) % (24 * 60) + 24 * 60) % (24 * 60);
    const compression = tib - psw;

    return { tib, tst, efficiency, psw, newBed, wake, compression, lostMin };
  }, [bedtime, waketime, onsetMin, wakeDuringMin]);

  return (
    <div className="card">
      <p className="eyebrow mb-3">Your sleep, this week</p>
      <h3 className="font-sans text-bark text-2xl md:text-3xl font-light leading-snug mb-1">
        Sleep window calculator
      </h3>
      <p className="text-sm text-mid leading-relaxed">
        The same arithmetic a sleep specialist runs on your paper diary in
        Week 1. Try your real numbers — see what the protocol would prescribe.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="eyebrow block mb-2">Lights-out</span>
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="w-full min-h-[48px] px-3 py-2 text-base font-display tracking-wider border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
          />
        </label>
        <label className="block">
          <span className="eyebrow block mb-2">Wake-up</span>
          <input
            type="time"
            value={waketime}
            onChange={(e) => setWaketime(e.target.value)}
            className="w-full min-h-[48px] px-3 py-2 text-base font-display tracking-wider border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
          />
        </label>
        <label className="block">
          <span className="eyebrow block mb-2">Falling-asleep time (min)</span>
          <input
            type="number"
            min={0}
            max={180}
            step={5}
            value={onsetMin}
            onChange={(e) => setOnsetMin(parseInt(e.target.value, 10) || 0)}
            className="w-full min-h-[48px] px-3 py-2 text-base border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
          />
        </label>
        <label className="block">
          <span className="eyebrow block mb-2">Awake during night (min)</span>
          <input
            type="number"
            min={0}
            max={300}
            step={5}
            value={wakeDuringMin}
            onChange={(e) => setWakeDuringMin(parseInt(e.target.value, 10) || 0)}
            className="w-full min-h-[48px] px-3 py-2 text-base border border-bark/15 rounded-md bg-white text-bark focus:outline-none focus:border-amber"
          />
        </label>
      </div>

      {result && (
        <div className="mt-7 pt-6 border-t border-bark/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="eyebrow mb-1">Time in bed</p>
              <p className="font-display text-2xl text-bark font-light">{fmtDuration(result.tib)}</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Actual sleep</p>
              <p className="font-display text-2xl text-bark font-light">{fmtDuration(result.tst)}</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Efficiency</p>
              <p className={`font-display text-2xl font-light ${result.efficiency >= 0.85 ? "text-bark" : "text-amber"}`}>
                {Math.round(result.efficiency * 100)}%
              </p>
            </div>
          </div>

          <div className="mt-6 p-5 rounded-lg bg-warm border-l-0 border-b-2 border-amber">
            <p className="eyebrow mb-2">Your prescribed window</p>
            <p className="font-sans text-bark text-2xl md:text-3xl font-light leading-snug">
              <span className="font-medium">{fmtTime(result.newBed)}</span> → <span className="font-medium">{fmtTime(result.wake)}</span>
              <span className="text-mid font-light"> · {fmtDuration(result.psw)}</span>
            </p>
            <p className="mt-3 text-sm text-mid leading-relaxed">
              {result.efficiency >= 0.85 ? (
                <>
                  Your efficiency is already strong. The protocol holds this
                  window for a week, then earns you 15 more minutes in bed.
                </>
              ) : result.compression > 0 ? (
                <>
                  You&apos;re currently in bed <strong className="text-bark">{fmtDuration(result.tib)}</strong> but
                  only sleeping <strong className="text-bark">{fmtDuration(result.tst)}</strong>. The protocol
                  compresses your window by <strong className="text-bark">{fmtDuration(result.compression)}</strong> for
                  two weeks — counterintuitive, but it&apos;s what retrains the
                  body to sleep deeper. Then we earn time back as efficiency climbs.
                </>
              ) : (
                <>
                  Your numbers say sleep efficiency is below 85%. The protocol
                  re-anchors your wake time, layers in stimulus control, and
                  titrates the window weekly.
                </>
              )}
            </p>
          </div>

          <p className="mt-4 text-xs text-mid italic leading-relaxed">
            Educational interpretation only. Sleep restriction therapy is not
            appropriate for people with bipolar disorder, untreated sleep apnea,
            seizure disorder, or active psychosis — use only with clinical
            supervision in those cases. Full{" "}
            <a href="/terms" className="underline hover:text-amber">eligibility</a>.
          </p>
        </div>
      )}
    </div>
  );
}
