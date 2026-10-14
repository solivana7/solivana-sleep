// Web Audio engine for the real-time intervention layer.
// Uses two oscillators panned hard left/right with a frequency offset to
// produce a perceived binaural beat at (rightHz - leftHz). The carrier
// frequency stays in the soothing low-mid range; only the offset varies
// across protocols.
//
// CAUTION: Binaural beats require headphones to work. The UI must check
// playback intent and surface a headphone reminder.

export type BinauralProtocol = {
  id: "wind-down" | "deep-rest" | "fall-asleep" | "alpha-focus";
  name: string;
  carrierHz: number; // base frequency
  offsetHz: number;  // beat frequency (rightHz - leftHz)
  description: string;
  durationMin: number;
};

// Protocols mapped to sleep-stage targets. Delta (0.5–4 Hz) for deep sleep,
// theta (4–8 Hz) for hypnagogic descent, alpha (8–13 Hz) for relaxed wake.
export const BINAURAL_PROTOCOLS: BinauralProtocol[] = [
  {
    id: "wind-down",
    name: "Wind down",
    carrierHz: 174,
    offsetHz: 8.0, // alpha — relaxed-but-awake bridge to sleep
    description: "Alpha-band drift toward the edge of wakefulness. For the 30 minutes before bed.",
    durationMin: 30,
  },
  {
    id: "fall-asleep",
    name: "Fall asleep",
    carrierHz: 136.1,
    offsetHz: 6.0, // theta — hypnagogic descent
    description: "Theta-band drift through the gate of sleep onset. Headphones, lights low.",
    durationMin: 20,
  },
  {
    id: "deep-rest",
    name: "Deep rest",
    carrierHz: 110,
    offsetHz: 2.5, // delta — slow-wave / deep-recovery
    description: "Delta-band field for nights when even one cycle of deep sleep changes the day.",
    durationMin: 45,
  },
  {
    id: "alpha-focus",
    name: "Quiet focus",
    carrierHz: 220,
    offsetHz: 10.0, // alpha — calm cognition for daytime use
    description: "A non-sedating alpha field for the post-lunch hour, when sleep debt becomes brain fog.",
    durationMin: 25,
  },
];

// Lazy AudioContext — created on first user gesture (autoplay policy).
let ctx: AudioContext | null = null;

export interface BinauralHandle {
  stop: () => void;
  isPlaying: () => boolean;
  /** Update master gain live (0..1). Smooth-ramps over ~150ms to avoid clicks. */
  setVolume: (v: number) => void;
}

function getCtx(): AudioContext {
  if (!ctx) {
    const W = window as unknown as { webkitAudioContext?: typeof AudioContext };
    const Klass = window.AudioContext || W.webkitAudioContext;
    if (!Klass) throw new Error("Web Audio API isn't available in this browser.");
    ctx = new Klass();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

// Perceptual gain boost. Pure sine waves are far quieter per RMS than
// music or voice — the ear is most sensitive around 2–4 kHz and our
// carriers sit at 110–220 Hz, well into the "needs more gain" zone.
// A 3× multiplier brings the slider into a useful working range on
// laptop speakers without clipping when the slider hits 1.0.
const PERCEPTUAL_BOOST = 3.0;
const SAFE_CEILING = 0.95;

function clampToHeadroom(v: number): number {
  const boosted = Math.max(0, Math.min(1, v)) * PERCEPTUAL_BOOST;
  // Soft-knee ceiling so we never clip even at slider = 1.0
  return Math.min(boosted, SAFE_CEILING);
}

/**
 * Start a binaural protocol. Returns a handle to stop it or update
 * volume in real time. `volume` is 0..1 from the UI; we apply a
 * perceptual boost internally so sine waves are actually audible.
 */
export function playBinaural(
  protocol: BinauralProtocol,
  volume = 0.5
): BinauralHandle {
  const c = getCtx();
  const now = c.currentTime;

  // Two oscillators, hard-panned, with a small frequency offset
  const oscL = c.createOscillator();
  const oscR = c.createOscillator();
  oscL.type = "sine";
  oscR.type = "sine";
  oscL.frequency.value = protocol.carrierHz;
  oscR.frequency.value = protocol.carrierHz + protocol.offsetHz;

  const panL = c.createStereoPanner();
  const panR = c.createStereoPanner();
  panL.pan.value = -1;
  panR.pan.value = 1;

  // Master fade — graceful in (1.5s) and out (4s)
  const master = c.createGain();
  master.gain.value = 0;
  master.gain.linearRampToValueAtTime(clampToHeadroom(volume), now + 1.5);

  oscL.connect(panL).connect(master);
  oscR.connect(panR).connect(master);
  master.connect(c.destination);

  oscL.start(now);
  oscR.start(now);

  let stopped = false;
  return {
    stop() {
      if (stopped) return;
      stopped = true;
      const t = c.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 4);
      oscL.stop(t + 4.05);
      oscR.stop(t + 4.05);
    },
    isPlaying() { return !stopped; },
    setVolume(v: number) {
      if (stopped) return;
      const t = c.currentTime;
      // Smooth ~150ms ramp so live slider drags don't click
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(clampToHeadroom(v), t + 0.15);
    },
  };
}

// 4-7-8 paced breath — used in CBT-I Week 3 audio relaxation
export interface BreathStep {
  phase: "inhale" | "hold" | "exhale";
  seconds: number;
}
export const BREATH_4_7_8: BreathStep[] = [
  { phase: "inhale", seconds: 4 },
  { phase: "hold", seconds: 7 },
  { phase: "exhale", seconds: 8 },
];
