// FAQ. Real questions executives ask in the first conversation with a
// sleep specialist — answered in the founder's voice. <details>/<summary>
// gives native accessibility for free and works without JS.

interface QA {
  q: string;
  a: string;
}

const ITEMS: QA[] = [
  {
    q: "Will this work if I'm on Ambien, Lunesta, or trazodone?",
    a: "CBT-I works alongside sleep medication and is the recommended path to weaning off — never abruptly, always with your prescriber. The first two weeks focus on rebuilding the sleep-wake architecture; many readers begin tapering with their prescriber at week three or four. We're not your prescriber.",
  },
  {
    q: "I have an Oura / Whoop / Apple Watch. Do I need it?",
    a: "No — the program works without a wearable. The membership tier uses real sleep-stage data to adapt the protocol; the $99 program runs on a daily self-reported diary, which is the same input a clinician collects in week one. Either works.",
  },
  {
    q: "What if I miss a night?",
    a: "Nothing breaks. CBT-I tolerates noise — what matters is the weekly pattern, not the perfect single night. Travel, deadlines, a sick kid. Week six explicitly covers the relapse-prevention protocol for exactly these moments.",
  },
  {
    q: "How long until I feel a difference?",
    a: "Most readers report deeper sleep within seven nights and consistent sleep onset within two weeks. The deepest gain — falling back asleep at 3 am without anxiety — typically lands in week four. Not a guarantee; an honest pattern from the trials.",
  },
  {
    q: "I think I have sleep apnea. Should I do this first?",
    a: "No. Loud snoring, witnessed apneas, or daytime sleep attacks are red flags that need a sleep study, not a behavioral protocol. CBT-I is the right tool for psychophysiological insomnia. The wrong tool for apnea. See a sleep specialist first.",
  },
  {
    q: "Is this actually private?",
    a: "Sleep logs live on your device by default. Wearable data requires an explicit consent step at the moment you connect the provider — never opt-in by default. We don't sell or share data, and we treat what we do hold with HIPAA-adjacent care. /privacy has the full picture.",
  },
  {
    q: "Can my employer cover this?",
    a: "Yes — the B2B2C licensing path is live. Email info@solivana.com and we'll send the employer brief. Productivity ROI math, anonymized aggregate reporting, integration with the major benefit platforms.",
  },
  {
    q: "What does 'binaural beat' actually mean?",
    a: "Two slightly different frequencies, one in each ear. Your brain perceives the difference as a third tone in the matched frequency band — alpha for relaxed-awake, theta for sleep onset, delta for deep sleep. Headphones are required. The audio is generated live in your browser — never streamed, never logged.",
  },
];

export function Faq() {
  return (
    <section className="py-20" aria-labelledby="faq-heading" id="faq">
      <div className="mx-auto max-w-3xl px-6">
        <p className="eyebrow mb-3">Real questions</p>
        <h2 id="faq-heading" className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight">
          The first conversation with a sleep specialist, abbreviated.
        </h2>

        <dl className="mt-10 space-y-2">
          {ITEMS.map((item, i) => (
            <details
              key={i}
              className="group border-b border-bark/10 last:border-b-0 py-2"
            >
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-3 min-h-[44px]">
                <dt className="font-sans text-bark text-lg font-medium leading-snug flex-1">
                  {item.q}
                </dt>
                <span
                  aria-hidden="true"
                  className="text-amber text-2xl font-light leading-none flex-shrink-0 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <dd className="text-mid leading-relaxed pb-4 pr-10 max-w-prose">
                {item.a}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
