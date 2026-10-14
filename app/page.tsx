import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Brand";
import { SleepWindowCalculator } from "@/components/SleepWindowCalculator";
import { BreathRing } from "@/components/BreathRing";
import { TonightPanel } from "@/components/TonightPanel";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { CBT_I_PROGRAM, CBT_I_OVERVIEW } from "@/lib/cbt-i";

// Landing — editorial restraint, generous whitespace, brand truth on
// type + color. Voice: a calm text from a sleep coach to a burned-out exec.

export default function Home() {
  return (
    <>
      <TopBar />
      <main id="main">
        {/* HERO ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-5">For sleep that won&apos;t hold</Eyebrow>
              <h1 className="font-sans text-bark text-4xl sm:text-5xl md:text-6xl font-light leading-[1.05] tracking-tight">
                Stop tracking bad sleep.
                <br />
                <em className="not-italic text-amber font-light">Start fixing it.</em>
              </h1>
              <p className="mt-6 text-mid text-lg leading-relaxed max-w-prose">
                CBT-I, real-time audio interventions, and circadian recovery — built for
                executives whose nights stopped working. Six weeks. Ten minutes a day.
                A return to sleep your body remembers how to do.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/cbt-i" className="btn-primary" aria-label="Read the six-week sleep protocol">
                  Read the protocol
                </Link>
                <Link href="/audio" className="btn-secondary" aria-label="Open the audio library — works tonight, no signup">
                  Try the audio tonight
                </Link>
              </div>
              <p className="mt-6 text-xs text-mid/80">
                Both are live now — no signup needed. The paid tier (daily log + adaptive
                protocols + 3 am protocol) is the only thing gated.{" "}
                <Link href="/begin" className="underline hover:text-amber">
                  Notify me when it opens.
                </Link>
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="card card--warm">
                <Eyebrow className="mb-3">The difference</Eyebrow>
                <p className="font-sans text-bark text-xl leading-snug font-light">
                  Sleep tracking tells you what happened.
                </p>
                <p className="font-sans text-amber text-xl leading-snug font-light italic mt-1">
                  We change what happens next.
                </p>
                <hr className="my-5 border-bark/10" />
                <dl className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <dt className="eyebrow mb-1">Weeks</dt>
                    <dd className="font-display text-3xl text-bark">6</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Daily</dt>
                    <dd className="font-display text-3xl text-bark">10<span className="text-base">m</span></dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Evidence</dt>
                    <dd className="font-display text-3xl text-bark">A</dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs text-mid leading-relaxed">
                  AASM Grade-A evidence rating for CBT-I. Most programs delivered by a
                  clinician have a six-month waitlist. This one starts tonight.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* SLEEP WINDOW CALCULATOR — the interactive CBT-I demo ─────── */}
        <section className="py-16 md:py-20 bg-warm">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <Eyebrow className="mb-3">The work of week one</Eyebrow>
              <h2 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
                The number most readers miss.
              </h2>
              <p className="mt-4 text-mid leading-relaxed">
                Most poor sleepers spend two to three hours in bed not sleeping.
                The fix isn&apos;t more time — it&apos;s the right window. Run the
                same arithmetic a sleep specialist runs on your paper diary in
                Week 1. The number you see at the bottom is what the protocol
                would prescribe.
              </p>
              <p className="mt-4 text-sm text-mid">
                Counterintuitive at first. Durable inside two weeks.
              </p>
            </div>
            <div className="lg:col-span-7">
              <SleepWindowCalculator />
            </div>
          </div>
        </section>

        {/* WHAT'S DIFFERENT ──────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow className="mb-3">The shift</Eyebrow>
            <h2 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight max-w-prose">
              Calm has stories. Headspace has sounds. We have therapy.
            </h2>
            <p className="mt-4 text-mid text-lg leading-relaxed max-w-prose">
              CBT-I is the gold-standard treatment for insomnia per the American Academy
              of Sleep Medicine. Until now, the only way to access it was a sleep
              specialist with a six-month waitlist. We digitalized the protocol — every
              page reviewed against the AASM clinical practice guideline.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card
                eyebrow="The protocol"
                title="CBT-I, digitalized"
                body="Six weeks of the same therapy clinical sleep specialists prescribe. Sleep restriction, stimulus control, cognitive restructuring — sequenced for a reader who wants to fix this without becoming a patient."
              />
              <Card
                eyebrow="Real-time"
                title="Audio that intervenes"
                body="Adaptive soundscapes, binaural fields, and breath ritual triggered by the moment — lights-out, 3am wake, 30-minute wind-down. Headphones, then the engine takes the wheel."
              />
              <Card
                eyebrow="Circadian"
                title="The signal, restored"
                body="Light at the right time. Temperature at the right time. A wake alarm tied to your phase, not the calendar. Your body remembers what to do once we stop overriding it."
              />
            </div>
          </div>
        </section>

        {/* CBT-I 6-WEEK SCAN ─────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <Eyebrow className="mb-3">{CBT_I_OVERVIEW.duration}</Eyebrow>
                <h2 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight max-w-prose">
                  The six-week protocol, in plain order.
                </h2>
                <p className="mt-3 text-mid leading-relaxed max-w-prose">
                  {CBT_I_OVERVIEW.outcome}
                </p>
              </div>
              <Link href="/cbt-i" className="btn-secondary">Read the full protocol</Link>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {CBT_I_PROGRAM.map((w) => (
                <li key={w.index}>
                  <article className="card h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-3xl font-light text-amber leading-none w-10 text-center">
                        {String(w.index).padStart(2, "0")}
                      </span>
                      <Eyebrow>{w.eyebrow}</Eyebrow>
                    </div>
                    <h3 className="font-sans text-bark text-lg font-medium mb-2 leading-snug">{w.title}</h3>
                    <p className="text-sm text-mid leading-relaxed flex-1">{w.summary}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* AUDIO ENGINE — with live breath ring ──────────────────────── */}
        <section className="bg-warm py-20">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <Eyebrow className="mb-3">The intervention layer</Eyebrow>
              <h2 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
                Audio that knows where you are in the night.
              </h2>
              <p className="mt-4 text-mid leading-relaxed">
                Four protocols mapped to sleep-stage targets — alpha for the 30 minutes
                before bed, theta through the gate of onset, delta for deep recovery,
                a non-sedating field for the post-lunch hour. Headphones, lights low,
                the engine handles the rest.
              </p>
              <p className="mt-4 text-sm text-mid leading-relaxed">
                The breath ritual to the right is the same one we use in
                Week 3 audio relaxation. Try it for one cycle.
              </p>
              <Link href="/audio" className="btn-secondary mt-6 inline-flex">Open the audio library</Link>
            </div>

            <div className="md:col-span-5">
              <BreathRing />
            </div>
          </div>
        </section>

        {/* TONIGHT PANEL — concrete 90-minute sequence ──────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <Eyebrow className="mb-3">Concrete</Eyebrow>
              <h2 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
                Not a vague vibe. A specific sequence.
              </h2>
              <p className="mt-4 text-mid leading-relaxed">
                What we&apos;d ask you to do in the next 90 minutes if you began
                tonight. Lights-out anchors the timeline; shift earlier or later
                to match your wake time.
              </p>
            </div>
            <div className="lg:col-span-7">
              <TonightPanel />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS ──────────────────────────────────────────────── */}
        <Testimonials />

        {/* WEARABLES ─────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow className="mb-3">Wearable integration</Eyebrow>
            <h2 className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight max-w-prose">
              Bring the data you&apos;re already collecting.
            </h2>
            <p className="mt-4 text-mid leading-relaxed max-w-prose">
              Oura, Whoop, and Apple Health connect once with explicit consent. The
              protocol uses real sleep stage, not your guess. Your data stays on your
              device until you turn on practitioner sync.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-mid">
              {["Oura", "Whoop", "Apple Health", "Garmin", "Fitbit"].map((b) => (
                <span key={b} className="font-display tracking-wider uppercase text-sm">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING ──────────────────────────────────────────────────── */}
        <section className="bg-bark text-cream py-20">
          <div className="mx-auto max-w-6xl px-6">
            <Eyebrow className="mb-3" >Membership</Eyebrow>
            <h2 className="font-sans text-cream text-3xl md:text-4xl font-light leading-tight max-w-prose">
              Two ways to begin.
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <article className="rounded-2xl border border-cream/15 border-b-2 border-b-amber p-8 bg-cream/[0.04]">
                <p className="eyebrow text-cream/70 mb-3">The program</p>
                <h3 className="font-sans text-cream text-2xl font-light mb-2">
                  6-week CBT-I protocol
                </h3>
                <p className="font-display text-amber text-5xl font-light mb-2">$99<span className="text-lg align-top text-cream/70 ml-1">once</span></p>
                <p className="text-sm text-cream/80 leading-relaxed mb-6">
                  Lifetime access to the six-week protocol, the audio library, and the
                  daily sleep log. Restart any time.
                </p>
                <Link href="/begin?plan=program" className="btn-primary">Reserve a spot</Link>
              </article>

              <article className="rounded-2xl border border-cream/15 border-b-2 border-b-amber p-8 bg-cream/[0.04]">
                <p className="eyebrow text-cream/70 mb-3">The membership</p>
                <h3 className="font-sans text-cream text-2xl font-light mb-2">
                  Continuous care
                </h3>
                <p className="font-display text-amber text-5xl font-light mb-2">$12.99<span className="text-lg align-top text-cream/70 ml-1">/month</span></p>
                <p className="text-sm text-cream/80 leading-relaxed mb-6">
                  Adaptive protocols, new audio every season, wearable sync, and the
                  3&nbsp;am middle-of-the-night protocol unlocked.
                </p>
                <Link href="/begin?plan=membership" className="btn-primary">Reserve a spot</Link>
              </article>
            </div>

            <p className="mt-10 text-sm text-cream/70 leading-relaxed max-w-prose">
              For employers: insufficient sleep is estimated to cost roughly $2,280
              per US worker per year in lost productivity
              <a
                href="https://www.rand.org/pubs/research_reports/RR1791.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/60 hover:text-amber underline-offset-4 hover:underline ml-1"
                aria-label="RAND Corporation 2016 study"
              >
                (RAND, 2016)
              </a>
              . Reach out at{" "}
              <a href="mailto:info@solivana.com?subject=Employer%20Sleep%20Program" className="text-amber underline hover:no-underline">
                info@solivana.com
              </a>{" "}
              to discuss B2B2C licensing.
            </p>
          </div>
        </section>

        {/* FAQ ──────────────────────────────────────────────────────── */}
        <Faq />

        {/* CLOSING ──────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow className="mb-4 inline-block">Tonight</Eyebrow>
            <p className="font-sans text-bark text-2xl md:text-3xl font-light leading-snug">
              You&apos;ve already tried the trackers. You know they don&apos;t change anything.
              <br />
              <span className="text-amber italic">Try the therapy.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/audio" className="btn-primary">Open tonight&apos;s audio</Link>
              <Link href="/cbt-i" className="btn-secondary">Read the protocol</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
