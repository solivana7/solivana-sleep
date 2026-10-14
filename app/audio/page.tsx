import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";
import { BinauralPlayer } from "@/components/BinauralPlayer";

export const metadata = {
  title: "Audio Library — SoliVana Sleep",
  description:
    "Binaural protocols and breath ritual for the wind-down, the gate of sleep onset, and deep recovery.",
};

export default function AudioPage() {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow className="mb-4">The intervention layer</Eyebrow>
            <h1 className="font-sans text-bark text-4xl md:text-5xl font-light leading-tight">
              Audio that takes the wheel when your mind won&apos;t.
            </h1>
            <p className="mt-6 text-mid text-lg leading-relaxed max-w-prose">
              Four binaural protocols mapped to the brain&apos;s four nightly states.
              Generated live in your browser — nothing streamed, nothing logged. Tap
              play. Headphones. Lights low.
            </p>

            <div className="mt-10">
              <BinauralPlayer />
            </div>

            <div className="mt-12 card card--warm">
              <Eyebrow className="mb-2">A note on evidence</Eyebrow>
              <p className="text-sm text-mid leading-relaxed">
                Binaural beats produce a measurable EEG response in the matched
                frequency band in most listeners. The clinical literature supports
                modest effects on relaxation, sleep onset, and pre-sleep anxiety —
                stronger when paired with the CBT-I behavioral practices than as a
                standalone tool. We use audio as a bridge into the practice, not a
                replacement for it.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
