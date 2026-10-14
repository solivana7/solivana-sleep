import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Brand";

export const metadata = {
  title: "The Science — SoliVana Sleep",
  description:
    "The clinical evidence behind CBT-I, sleep restriction therapy, stimulus control, and circadian anchoring. Annotated bibliography.",
};

// /science — annotated bibliography. Builds trust for the
// burned-out-exec reader who wants the citations before signing up.
// Every claim on the rest of the site traces to one of these.

interface Citation {
  authors: string;
  year: number;
  title: string;
  venue: string;
  url?: string;
  takeaway: string;
}

const CITATIONS: Citation[] = [
  {
    authors: "Edinger, J. D., Arnedt, J. T., Bertisch, S. M., et al.",
    year: 2021,
    title:
      "Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine clinical practice guideline.",
    venue: "Journal of Clinical Sleep Medicine, 17(2), 255–262.",
    url: "https://jcsm.aasm.org/doi/10.5664/jcsm.8986",
    takeaway:
      "CBT-I receives a strong recommendation (Grade-A evidence) as first-line therapy for chronic insomnia disorder. Sleep restriction and stimulus control are core, evidence-supported components.",
  },
  {
    authors: "Morin, C. M., Vallières, A., Guay, B., et al.",
    year: 2009,
    title:
      "Cognitive behavioral therapy, singly and combined with medication, for persistent insomnia: a randomized controlled trial.",
    venue: "JAMA, 301(19), 2005–2015.",
    url: "https://jamanetwork.com/journals/jama/fullarticle/183931",
    takeaway:
      "At 12-month follow-up, CBT-I alone outperformed both medication alone and CBT-I + medication. The behavioral skills generalize; the drug effect does not.",
  },
  {
    authors: "Trauer, J. M., Qian, M. Y., Doyle, J. S., et al.",
    year: 2015,
    title:
      "Cognitive behavioral therapy for chronic insomnia: a systematic review and meta-analysis.",
    venue: "Annals of Internal Medicine, 163(3), 191–204.",
    url: "https://www.acpjournals.org/doi/10.7326/M14-2841",
    takeaway:
      "Across 20 trials and 1,162 participants, CBT-I produced clinically meaningful improvements in sleep-onset latency, wake-after-sleep-onset, and sleep efficiency — durable at follow-up.",
  },
  {
    authors: "Spielman, A. J., Saskin, P., & Thorpy, M. J.",
    year: 1987,
    title:
      "Treatment of chronic insomnia by restriction of time in bed.",
    venue: "Sleep, 10(1), 45–56.",
    url: "https://pubmed.ncbi.nlm.nih.gov/3563247/",
    takeaway:
      "The original sleep restriction therapy paper. Counterintuitive at first — less time in bed, deeper sleep — but the durable mechanism is clear: rebuilding sleep efficiency before adding time back.",
  },
  {
    authors: "Verreault, M. D., Granger, É., Neveu, X., et al.",
    year: 2024,
    title:
      "The effectiveness of stimulus control in cognitive behavioural therapy for insomnia in adults: a systematic review and network meta-analysis.",
    venue: "Journal of Sleep Research, 33(5), e14008.",
    url: "https://pubmed.ncbi.nlm.nih.gov/37586843/",
    takeaway:
      "Modern network meta-analysis of stimulus control — the bed-equals-sleep retraining protocol. Confirms the 50-year-old Bootzin instructions still hold up: if awake more than 20 minutes in bed, leave; return only when sleepy.",
  },
  {
    authors: "Hafner, M., Stepanek, M., Taylor, J., Troxel, W. M., & van Stolk, C.",
    year: 2016,
    title:
      "Why sleep matters — the economic costs of insufficient sleep.",
    venue: "RAND Corporation, RR-1791-VH.",
    url: "https://www.rand.org/pubs/research_reports/RR1791.html",
    takeaway:
      "Insufficient sleep costs the US economy up to $411 billion per year — roughly $2,280 per US worker. The cost-of-doing-nothing case for employers.",
  },
  {
    authors: "Crowley, S. J., Lee, C., Tseng, C. Y., Fogg, L. F., & Eastman, C. I.",
    year: 2015,
    title:
      "Phase advancing human circadian rhythms with morning bright light, afternoon melatonin, and gradually shifted sleep: can we reduce morning bright-light duration?",
    venue: "Sleep Medicine, 16(2), 288–297.",
    url: "https://pubmed.ncbi.nlm.nih.gov/25620199/",
    takeaway:
      "The circadian anchoring infrastructure CBT-I sits on top of: morning bright light advances the body clock, evening melatonin reinforces it. Even 30 minutes of morning light delivers most of the phase-shift effect of two hours.",
  },
  {
    authors: "Garcia-Argibay, M., García-Navarro, J., et al.",
    year: 2019,
    title:
      "Efficacy of binaural auditory beats in cognition, anxiety, and pain perception: a meta-analysis.",
    venue: "Psychological Research, 83(2), 357–372.",
    url: "https://link.springer.com/article/10.1007/s00426-018-1066-8",
    takeaway:
      "Binaural beats produce modest effects on relaxation and pre-sleep anxiety, stronger when paired with behavioral practice than as a standalone. Why we treat audio as a bridge into the CBT-I work, not a replacement.",
  },
];

export default function SciencePage() {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <Eyebrow className="mb-4">The evidence base</Eyebrow>
            <h1 className="font-sans text-bark text-4xl md:text-5xl font-light leading-tight">
              Every claim on this site has a citation.
            </h1>
            <p className="mt-6 text-mid text-lg leading-relaxed max-w-prose">
              Annotated bibliography of the primary literature behind the SoliVana
              Sleep protocol. If you came in skeptical, this is the page that
              decides it.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="mx-auto max-w-4xl px-6 space-y-6">
            {CITATIONS.map((c, i) => (
              <article key={i} className="card">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <span className="font-display text-3xl text-amber font-light leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="eyebrow">{c.year}</p>
                </div>
                <h2 className="font-sans text-bark text-lg md:text-xl font-medium leading-snug">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-mid">
                  {c.authors} · <em>{c.venue}</em>
                </p>
                <p className="mt-4 text-mid leading-relaxed">{c.takeaway}</p>
                {c.url && (
                  <p className="mt-4">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-display tracking-wider uppercase text-amber hover:underline"
                    >
                      Read the study →
                    </a>
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 bg-warm">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Eyebrow className="inline-block mb-4">Convinced</Eyebrow>
            <p className="font-sans text-bark text-2xl md:text-3xl font-light leading-snug">
              The protocol that was on the other side of this evidence — yours tonight.
            </p>
            <Link href="/begin?plan=program" className="btn-primary mt-8 inline-flex">
              Reserve a spot — $99
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
