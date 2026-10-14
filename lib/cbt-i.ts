// CBT-I program structure — based on the standard cognitive-behavioral therapy
// for insomnia protocol (Edinger & Carney; AASM clinical guideline). This file
// defines the educational scaffolding only. It is NOT medical treatment for
// clinical insomnia disorder; the UI must always frame it as educational.
//
// Six weeks, ordered by clinical convention. Sleep restriction therapy and
// stimulus control are the two highest-evidence components and appear early.

export type CbtIComponent =
  | "sleep-education"
  | "sleep-restriction"
  | "stimulus-control"
  | "cognitive-restructuring"
  | "relaxation"
  | "circadian-anchoring"
  | "relapse-prevention";

export interface CbtIWeek {
  index: number; // 1..6
  title: string;
  eyebrow: string; // Jost ALL CAPS label
  summary: string;
  components: CbtIComponent[];
  daily: string[]; // 3–5 short, actionable practices
  reading: string; // Short prose card body
  evidence: string; // One-line evidence note for trust
}

export const CBT_I_PROGRAM: CbtIWeek[] = [
  {
    index: 1,
    title: "A truthful sleep window",
    eyebrow: "Week one",
    summary:
      "We measure your real sleep — not the time you spent in bed — and set the window that earns deep recovery back.",
    components: ["sleep-education", "sleep-restriction"],
    daily: [
      "Log time in bed and time asleep, every morning",
      "Set a fixed wake time. Keep it on weekends",
      "Compress your sleep window to your average actual sleep",
    ],
    reading:
      "Most poor sleepers spend two to three hours in bed not sleeping. The fix is counterintuitive: less time in bed for two weeks, then earn time back as efficiency climbs.",
    evidence:
      "Sleep restriction therapy improves sleep efficiency by 10–20 percentage points in meta-analyses.",
  },
  {
    index: 2,
    title: "The bed is for sleep",
    eyebrow: "Week two",
    summary:
      "Stimulus control rebuilds the conditioned link between bed and rapid sleep onset. No phones, no work, no awake-thinking in bed.",
    components: ["stimulus-control"],
    daily: [
      "Use the bed only for sleep and intimacy",
      "If awake more than 20 minutes, leave the bed and read in dim light",
      "Return only when sleepy — not tired, sleepy",
    ],
    reading:
      "Stimulus control retrains the brain's prediction: bed equals sleep, not bed equals worry. The discipline is the medicine.",
    evidence:
      "Stimulus control is a Grade-A recommendation in the AASM clinical practice guideline for chronic insomnia.",
  },
  {
    index: 3,
    title: "The mind that won't quiet",
    eyebrow: "Week three",
    summary:
      "Cognitive restructuring for the catastrophic thoughts that keep you awake — and a real-time audio bridge for the ones that won't release.",
    components: ["cognitive-restructuring", "relaxation"],
    daily: [
      "Name the worry. Write the worst-case. Write the realistic case",
      "Use the SoliVana audio breath ritual at lights-out",
      "If thoughts loop, get up, write them down, return when sleepy",
    ],
    reading:
      "The worry isn't the problem; the meaning your nervous system makes of the worry is. We change the meaning, not the thought.",
    evidence:
      "Cognitive therapy reduces sleep-onset latency by an average of 15 minutes in CBT-I trials.",
  },
  {
    index: 4,
    title: "Recover the circadian signal",
    eyebrow: "Week four",
    summary:
      "Light, temperature, and meal timing — the three external cues your circadian clock listens to. We anchor all three.",
    components: ["circadian-anchoring"],
    daily: [
      "Ten minutes of bright outdoor light within 60 minutes of waking",
      "Bedroom at 65–68°F — the body needs to lose 1°C to enter deep sleep",
      "No food or alcohol within three hours of lights-out",
    ],
    reading:
      "The body runs on light and temperature signals from the environment. When those signals are noisy, melatonin and cortisol drift out of phase. We re-anchor them.",
    evidence:
      "Morning light exposure advances dim-light melatonin onset by 30–60 minutes in two weeks.",
  },
  {
    index: 5,
    title: "Earn time back",
    eyebrow: "Week five",
    summary:
      "Sleep efficiency above 85% for two weeks earns 15 more minutes in bed. Below 80% trims 15 minutes. Real progress, measured.",
    components: ["sleep-restriction"],
    daily: [
      "Calculate weekly sleep efficiency: time asleep ÷ time in bed",
      "Adjust your sleep window per the rule above",
      "Hold the new window for at least 7 nights before adjusting again",
    ],
    reading:
      "The reward for the discipline of weeks one through four. The window expands as your body proves it can use the time.",
    evidence:
      "Titrated sleep restriction therapy yields durable gains 6 months post-treatment in 70%+ of participants.",
  },
  {
    index: 6,
    title: "Hold the gain",
    eyebrow: "Week six",
    summary:
      "Relapse prevention, travel and shift-work playbooks, and the maintenance protocol you carry forward.",
    components: ["relapse-prevention", "sleep-education"],
    daily: [
      "Identify your three relapse triggers (travel, deadline, illness)",
      "Pre-write your protocol for each",
      "Schedule a 7-day reset cadence: when sleep slips, restart Week 1 immediately",
    ],
    reading:
      "Insomnia relapse is normal, recovery is fast if you act inside the first three nights. The maintenance plan is the reason CBT-I outperforms medication at 12 months.",
    evidence:
      "CBT-I outperforms zolpidem at 12 months in head-to-head trials (Morin et al., JAMA 2009).",
  },
];

export const CBT_I_OVERVIEW = {
  duration: "6 weeks",
  cadence: "10 minutes a day",
  evidence: "First-line treatment per the American Academy of Sleep Medicine",
  outcome:
    "Most participants report falling asleep faster, fewer middle-of-the-night wakings, and a sustained gain at 12-month follow-up.",
};

export const COMPONENT_LABEL: Record<CbtIComponent, string> = {
  "sleep-education": "Sleep Education",
  "sleep-restriction": "Sleep Restriction",
  "stimulus-control": "Stimulus Control",
  "cognitive-restructuring": "Cognitive Restructuring",
  relaxation: "Audio Relaxation",
  "circadian-anchoring": "Circadian Anchoring",
  "relapse-prevention": "Relapse Prevention",
};
