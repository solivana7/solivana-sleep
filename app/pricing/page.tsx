import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";

export const metadata = {
  title: "Membership — SoliVana Sleep",
  description: "$12.99 per month or $99 lifetime. CBT-I, audio library, wearable sync.",
};

const PLANS = [
  {
    id: "program" as const,
    eyebrow: "The program",
    name: "6-week CBT-I protocol",
    price: "$99",
    cadence: "once",
    body: "Lifetime access to the six-week protocol, the audio library, and the daily sleep log. Restart whenever travel or a deadline knocks you back.",
    cta: "Reserve a spot",
    href: "/begin?plan=program",
    bullets: [
      "Six weeks of guided CBT-I practice",
      "Full audio library — wind-down, theta descent, delta recovery",
      "Daily sleep log with weekly efficiency calculation",
      "Lifetime restart any time",
    ],
  },
  {
    id: "membership" as const,
    eyebrow: "The membership",
    name: "Continuous care",
    price: "$12.99",
    cadence: "/month",
    body: "Adaptive protocols that recalibrate to your wearable data, new audio every season, and the 3 am middle-of-the-night protocol.",
    cta: "Reserve a spot",
    href: "/begin?plan=membership",
    bullets: [
      "Everything in the program",
      "Adaptive sleep window from your wearable data",
      "Seasonal audio drops",
      "3 am middle-of-the-night protocol",
      "Practitioner sync (opt-in)",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <Eyebrow className="mb-4">Membership</Eyebrow>
            <h1 className="font-sans text-bark text-4xl md:text-5xl font-light leading-tight max-w-prose">
              Two paths in. Both end with the body remembering how to sleep.
            </h1>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {PLANS.map((p) => (
                <article key={p.id} className="card flex flex-col">
                  <Eyebrow className="mb-2">{p.eyebrow}</Eyebrow>
                  <h2 className="font-sans text-bark text-2xl font-light mb-4">{p.name}</h2>
                  <p className="font-display text-5xl font-light text-bark mb-1">
                    {p.price}
                    <span className="text-base text-mid ml-1">{p.cadence}</span>
                  </p>
                  <p className="text-mid leading-relaxed mt-3">{p.body}</p>

                  <ul className="mt-5 space-y-2 text-sm text-mid flex-1">
                    {p.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden="true" className="text-amber">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={p.href} className="btn-primary mt-8">
                    {p.cta}
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-14 card card--warm">
              <Eyebrow className="mb-2">For employers</Eyebrow>
              <p className="font-sans text-bark text-xl leading-snug font-light">
                Insufficient sleep is estimated to cost roughly $2,280 per US
                worker per year in lost productivity
                <a
                  href="https://www.rand.org/pubs/research_reports/RR1791.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mid hover:text-amber underline-offset-4 hover:underline text-sm ml-1"
                  aria-label="RAND Corporation 2016 study"
                >
                  (RAND, 2016)
                </a>
                .
              </p>
              <p className="mt-3 text-mid leading-relaxed">
                We offer B2B2C licensing — branded program access for your team, no
                per-seat support overhead. Reach out at{" "}
                <a
                  href="mailto:info@solivana.com?subject=Employer%20Sleep%20Program"
                  className="text-bark underline hover:text-amber"
                >
                  info@solivana.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
