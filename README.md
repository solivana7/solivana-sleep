# SoliVana Sleep

> Stop tracking bad sleep. Start fixing it.

**Live:** https://sleep.solivana.io
**Stack:** Next.js (App Router) · TypeScript · Tailwind · Web Audio API · Node 20+

## The problem

CBT-I — cognitive behavioral therapy for insomnia — is the first-line
clinical recommendation for chronic insomnia, ahead of medication. Access
is the bottleneck: trained specialists are scarce, specialist-led programs
cost hundreds to thousands of dollars, and most consumers are handed a
tracking app that documents the problem without changing it.

## The approach

This app digitizes a structured 6-week CBT-I protocol — sleep-window
restriction, stimulus control, wind-down architecture — and pairs it with
a real-time binaural audio engine as a bridge into the behavioral practice.
Every evidence claim on the marketing surfaces carries a citation; the full
bibliography lives at `/science`. Framing is educational throughout: the
app never claims to treat, cure, or diagnose, and sleep-restriction
eligibility caveats (bipolar disorder, untreated sleep apnea, psychosis
without clinical supervision) are disclosed in `/terms`.

## Engineering highlights

- **HMAC-SHA256 cookie tokens** (`lib/auth.ts`) — admin and preview cookies
  store `HMAC(secret, scope)`, never the secret itself; comparison via
  `timingSafeEqual` on equal-length digests. httpOnly + Secure +
  SameSite=Lax.
- **Honeypot + per-IP rate limiting** on intake — bots that fill the hidden
  field get a silent success so they don't adapt; real visitors are capped
  at 6 submissions/min/IP before parsing.
- **4-second `AbortController` cap** on the CRM fanout — the downstream
  webhook gets 4s, never awaited by the request; timeouts and non-2xx are
  logged, never user-visible.
- **Graceful degradation** — missing email/CRM configuration degrades to
  "accept and log," never a 500 to the visitor.
- **De-dark-patterned funnel** — the waitlist states plainly what exists
  today vs. what's coming; no fake scarcity, no pre-checked boxes, no
  manufactured countdowns.

## Structure

- `app/` — App Router pages (landing, `/cbt-i`, `/audio`, `/pricing`,
  `/begin`, `/science`, `/privacy`, `/terms`, `/disclosure`) plus route
  handlers (`/api/notify`, `/api/admin/*`, `/api/preview/*`, `/api/healthz`)
- `components/` — UI incl. `BinauralPlayer` (client-side Web Audio),
  `SleepWindowCalculator`, `NotifyForm` (multi-step intake)
- `lib/cbt-i.ts` — the 6-week program data structure with evidence notes
- `lib/audio.ts` — binaural engine (alpha / theta / delta protocols)
- `docs/make-scenarios.md` — CRM webhook contract + ops test checklist
- `Dockerfile` + `railway.json` — standalone Next.js build with healthcheck

## Compliance surfaces

- Preview/admin access is env-gated and code-based; nothing sensitive ships
  in the repo.
- Intake notifications go to the practice inbox only — the customer never
  receives email from the waitlist form.
- Every AI-generated surface carries an AI-disclosure tag; `/disclosure`,
  `/privacy`, and `/terms` are real pages, not placeholders.

## Local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Roadmap

Magic-link auth, Stripe checkout, daily sleep log with weekly efficiency
scoring, wearable OAuth (Oura first), offline middle-of-the-night audio via
service worker, privacy-respecting analytics.

---

Portfolio — code shared for review, not licensed for reuse.
