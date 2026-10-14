import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";
import { NotifyForm } from "@/components/NotifyForm";
import { hasPreview } from "@/lib/auth";

export const metadata = {
  title: "Begin — SoliVana Sleep",
  description: "Set your sleep window and start tonight.",
};

export const dynamic = "force-dynamic";

// Onboarding. Stripe checkout + auth wire in next session; for now we
// collect intent via Resend → info@solivana.com.
//
// Preview-mode visitors (cookie set via PREVIEW_CODE) skip the signup
// entirely and see the same "you're in" entry a paid member will.

const PLAN_COPY: Record<string, { eyebrow: string; title: string; sub: string }> = {
  program: {
    eyebrow: "$99 · The program",
    title: "Reserve your spot in the six-week protocol.",
    sub: "Checkout opens next week. The audio library and the full protocol reading are already live below — start there tonight. Leave your email to be first in when checkout opens.",
  },
  membership: {
    eyebrow: "$12.99/mo · Membership",
    title: "Reserve your spot in continuous care.",
    sub: "Checkout opens next week. The audio library and the full protocol reading are already live below — start there tonight. Leave your email to be first in when checkout opens.",
  },
  undecided: {
    eyebrow: "What's live now, what's coming",
    title: "Open it tonight. Or hold for the paid tier.",
    sub: "The audio library, the six-week protocol reading, the calculator, the science page — all of it is live and free to use right now, no signup needed. The paid tier (daily sleep log, adaptive protocols, 3 am middle-of-the-night protocol) lands when we open Stripe checkout next week.",
  },
};

export default async function BeginPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const sp = await searchParams;
  const plan = sp.plan === "membership" ? "membership" : sp.plan === "program" ? "program" : "undecided";
  const copy = PLAN_COPY[plan];
  const preview = await hasPreview();

  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-6">
            {preview ? (
              <>
                <Eyebrow className="mb-4">You&apos;re in</Eyebrow>
                <h1 className="font-sans text-bark text-4xl md:text-5xl font-light leading-tight">
                  Preview mode is active. Skip checkout.
                </h1>
                <p className="mt-6 text-mid text-lg leading-relaxed">
                  Everything a paid member sees is yours. The audio library
                  works tonight; the protocol reads in ten minutes. The
                  daily sleep log lands in the next session.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/audio" className="btn-primary">
                    Open the audio library
                  </Link>
                  <Link href="/cbt-i" className="btn-secondary">
                    Read the six-week protocol
                  </Link>
                </div>
                <p className="mt-6 text-xs text-mid">
                  Preview cookie persists for one year on this device.
                </p>
              </>
            ) : (
              <>
                <Eyebrow className="mb-4">{copy.eyebrow}</Eyebrow>
                <h1 className="font-sans text-bark text-4xl md:text-5xl font-light leading-tight">
                  {copy.title}
                </h1>
                <p className="mt-6 text-mid text-lg leading-relaxed">{copy.sub}</p>

                {/* Open-now panel — the actual content is already live; the
                    waitlist is for the paid tier specifically. */}
                <div className="mt-10 card card--warm">
                  <p className="eyebrow mb-3">Live tonight · no signup</p>
                  <ul className="space-y-3 text-sm text-mid leading-relaxed">
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-amber mt-0.5">·</span>
                      <span>
                        <Link href="/audio" className="text-bark font-medium underline-offset-4 hover:underline">
                          The audio library
                        </Link>{" "}
                        — four binaural protocols, synthesized live in your browser. Headphones, lights low.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-amber mt-0.5">·</span>
                      <span>
                        <Link href="/cbt-i" className="text-bark font-medium underline-offset-4 hover:underline">
                          The six-week protocol
                        </Link>{" "}
                        — full reading, daily practices, evidence notes. The clinical content is the same content.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span aria-hidden="true" className="text-amber mt-0.5">·</span>
                      <span>
                        <Link href="/#main" className="text-bark font-medium underline-offset-4 hover:underline">
                          The sleep window calculator
                        </Link>{" "}
                        and{" "}
                        <Link href="/science" className="text-bark font-medium underline-offset-4 hover:underline">
                          the evidence base
                        </Link>
                        .
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="mt-10">
                  <p className="eyebrow mb-4">When checkout opens</p>
                  <NotifyForm initialPlan={plan} />
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
