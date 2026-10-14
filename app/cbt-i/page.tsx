import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";
import { CBT_I_PROGRAM, CBT_I_OVERVIEW, COMPONENT_LABEL } from "@/lib/cbt-i";

export const metadata = {
  title: "The CBT-I Protocol — SoliVana Sleep",
  description:
    "Six weeks of cognitive behavioral therapy for insomnia, digitalized. Sleep restriction, stimulus control, cognitive restructuring, circadian anchoring.",
};

export default function CbtIPage() {
  return (
    <>
      <TopBar />
      <main id="main">
        {/* Header */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow className="mb-4">{CBT_I_OVERVIEW.duration} · {CBT_I_OVERVIEW.cadence}</Eyebrow>
            <h1 className="font-sans text-bark text-4xl md:text-5xl font-light leading-tight">
              The protocol your sleep specialist would prescribe — without the waitlist.
            </h1>
            <p className="mt-6 text-mid text-lg leading-relaxed max-w-prose">
              CBT-I is the first-line treatment for chronic insomnia per the AASM
              clinical practice guideline. Six components, sequenced over six weeks.
              Each week is a self-guided practice you read in ten minutes and live for
              seven nights.
            </p>
            <p className="mt-4 text-sm text-mid italic">
              {CBT_I_OVERVIEW.evidence}.
            </p>
          </div>
        </section>

        {/* Weeks — full detail */}
        <section className="pb-12">
          <div className="mx-auto max-w-4xl px-6 space-y-10">
            {CBT_I_PROGRAM.map((w) => (
              <article key={w.index} className="card">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span
                    className="font-display text-5xl font-light text-amber leading-none"
                    aria-hidden="true"
                  >
                    {String(w.index).padStart(2, "0")}
                  </span>
                  <div>
                    <Eyebrow>{w.eyebrow}</Eyebrow>
                    <h2 className="font-sans text-bark text-2xl md:text-3xl font-light leading-tight mt-1">
                      {w.title}
                    </h2>
                  </div>
                </div>

                <p className="text-mid leading-relaxed">{w.summary}</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Eyebrow className="mb-2">Daily practice</Eyebrow>
                    <ul className="space-y-2 text-sm text-mid">
                      {w.daily.map((d, i) => (
                        <li key={i} className="flex gap-3">
                          <span aria-hidden="true" className="text-amber leading-relaxed">·</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Eyebrow className="mb-2">Components</Eyebrow>
                    <ul className="flex flex-wrap gap-2 mb-4">
                      {w.components.map((c) => (
                        <li
                          key={c}
                          className="px-3 py-1 rounded-full border border-bark/15 text-xs text-bark/80 font-display tracking-wider uppercase"
                        >
                          {COMPONENT_LABEL[c]}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-mid leading-relaxed">{w.reading}</p>
                  </div>
                </div>

                <p className="mt-5 pt-4 border-t border-bark/10 text-xs text-mid italic">
                  Evidence note: {w.evidence}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-warm">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow className="inline-block mb-4">Ready</Eyebrow>
            <p className="font-sans text-bark text-2xl md:text-3xl font-light leading-snug">
              Six weeks from tonight, this changes.
            </p>
            <Link href="/begin?plan=program" className="btn-primary mt-8 inline-flex">
              Reserve a spot — $99
            </Link>
            <p className="mt-3 text-xs text-mid">
              Educational interpretation. Not a substitute for clinical diagnosis or treatment.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
