// Pre-launch reader profiles. Until the program opens and we have real
// customer testimonials, this section presents the BUYER PERSONAS we built
// the protocol for — labeled clearly as illustrative profiles, not real
// customer quotes. Per FTC endorsement guidelines: composite, hypothetical,
// and AI-assisted reader voices must be unambiguously identified.

interface Profile {
  body: string;
  persona: string;
  context: string;
}

const PROFILES: Profile[] = [
  {
    body: "Tried Calm, Headspace, Oura, three different sleep stories. Nothing changed actual sleep. Then the week-one window calculation made the math obvious: nine hours in bed, six hours of sleep. The protocol compresses the window before it expands it.",
    persona: "The founder who tried everything",
    context: "Series A · sleeps with phone on the nightstand",
  },
  {
    body: "What's missing from every other sleep app is intervention at the moment it matters. Alpha at lights-out is one thing. Theta when the mind loops at 3 am is another. The audio that knows where you are in the night is what makes the protocol hold.",
    persona: "The partner who can't afford a bad week",
    context: "AmLaw 100 · 6:00 a.m. wake, court days",
  },
  {
    body: "Sleep specialists carry six-month waitlists. The protocol is the same one they prescribe in the first session — it's the access that's broken, not the medicine. We rebuilt the access for the schedule of someone who runs a company.",
    persona: "The operating partner with no week off",
    context: "Growth-stage fund · 60+ hour weeks, frequent travel",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-warm" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow mb-3">Who we built this for</p>
        <h2 id="proof-heading" className="font-sans text-bark text-3xl md:text-4xl font-light leading-tight max-w-prose">
          Three reader profiles. Three versions of the same broken night.
        </h2>
        <p className="mt-3 text-mid leading-relaxed max-w-prose">
          The program is in pre-launch. These are the buyer personas the
          protocol was designed against — not real customer testimonials. When
          the program opens and members consent to share, real voices replace
          these.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROFILES.map((q, i) => (
            <figure key={i} className="card flex flex-col h-full">
              <svg
                className="text-amber mb-3"
                width="28"
                height="22"
                viewBox="0 0 28 22"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M0 22V13.2C0 5.9 4.4 1 11.2 0v4.2C7.5 5 5.4 7.4 5.4 11h5.8v11H0zm16.8 0v-8.8c0-7.3 4.4-12.2 11.2-13.2v4.2c-3.7.8-5.8 3.2-5.8 6.8h5.8v11H16.8z" />
              </svg>
              <blockquote className="font-sans text-bark text-base leading-relaxed flex-1">
                {q.body}
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-bark/10">
                <p className="font-medium text-bark text-sm">{q.persona}</p>
                <p className="eyebrow mt-1">{q.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-xs text-mid italic max-w-prose">
          Profiles are illustrative reader personas — not customer testimonials,
          not endorsements, not statements of clinical outcome. Individual
          experience of CBT-I varies.
        </p>
      </div>
    </section>
  );
}
