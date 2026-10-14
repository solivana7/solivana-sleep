# Make.com scenarios — SoliVana Sleep

Source of truth for the Make.com integrations this app depends on.

## 1. `sleep-notify` — waitlist signup → GHL

**Trigger source:** `POST /api/notify` from `sleep.solivana.io`. The handler
fires this fanout fire-and-forget (4-second AbortController cap), so any
non-2xx response or timeout is logged but never blocks the user.

**Env var (Railway → Sleep service → Variables):**

```
MAKE_NOTIFY_WEBHOOK_URL=https://hook.us2.make.com/<webhook-id>
```

### Webhook payload

```json
{
  "event_type": "waitlist_signup",
  "source": "sleep",
  "timestamp": "2026-05-15T22:14:03.221Z",
  "contact_data": {
    "email": "reader@example.com"
  },
  "result_data": {
    "plan": "program",
    "struggle": "wakes at 3am and can't get back to sleep",
    "tags": [
      "sleep-lead",
      "plan-program",
      "struggle-wakes-at-3am-and-can-t-get-back-to-sleep"
    ],
    "note": "SoliVana Sleep — waitlist signup (2026-05-15)\nPlan intent: program\nSleep struggle: wakes at 3am and can't get back to sleep\nSource: sleep.solivana.io /api/notify"
  },
  "meta": {
    "ip": "203.0.113.42",
    "user_agent": "Mozilla/5.0 ...",
    "app_version": "sleep@1"
  }
}
```

### Tag taxonomy

| Tag                       | When applied                                | Notes                                  |
| ------------------------- | ------------------------------------------- | -------------------------------------- |
| `sleep-lead`              | Every signup                                | Project tag                            |
| `plan-program`            | Reader picked the $99 program               | Mutually exclusive with the others     |
| `plan-membership`         | Reader picked the $12.99/mo membership      | Mutually exclusive                     |
| `plan-undecided`          | Reader picked "Tell me when it's ready"     | Default                                |
| `struggle-{slug}`         | Reader entered a free-text struggle (≤200c) | Slug = lowercase, non-alnum→hyphen     |

After purchase, downstream Stripe webhook (not yet wired) will add
`sleep-customer`. After PDF download (also not yet wired) will add
`sleep-pdf-downloaded`.

### Make scenario modules

1. **Custom webhook** — receive trigger. Name it `sleep-notify` so it's
   distinguishable from any future scenarios in this workspace.
2. **LeadConnector → Find or Create Contact** — match by
   `{{1.contact_data.email}}`. If found, update; if not, create with email
   only (we collect nothing else at the waitlist step).
3. **Iterator → result_data.tags** — iterate the tag array. (Alternative:
   one Add Tag module per tag, less flexible but easier to inspect.)
4. **LeadConnector → Add Tag** — `{{3.value}}` to contact `{{2.id}}`.
5. **LeadConnector → Create Note** — body = `{{1.result_data.note}}` on
   contact `{{2.id}}`.

### Error handling

- App side: `MAKE_NOTIFY_WEBHOOK_URL` unset → warn-log, skip silently
- App side: non-2xx → error-log with status + body
- App side: timeout → 4s AbortController, error-log with `AbortError`
- Make side: scenario must complete in well under 4s or the app abandons
  it. Keep modules to <5 ops; no AI/enrichment steps here

### E2E test checklist (do every time the scenario or webhook URL changes)

- [ ] `MAKE_NOTIFY_WEBHOOK_URL` is set in Railway and matches the live Make hook
- [ ] Submit a real signup at https://sleep.solivana.io with a sentinel email
      like `qa+sleep-<timestamp>@solivana.com`
- [ ] Within 10 seconds, the contact appears in GHL with:
  - [ ] `sleep-lead` tag
  - [ ] `plan-{program|membership|undecided}` tag matching the form selection
  - [ ] `struggle-...` tag if a struggle radio was selected
  - [ ] A note containing the date, plan intent, and source
- [ ] Make scenario log shows status 200 + ≤2s execution

## Future scenarios (not yet wired)

- `sleep-checkout-completed` — Stripe checkout.session.completed → add
  `sleep-customer` tag + payment note + remove `sleep-lead`
- `sleep-pdf-downloaded` — PDF route → `sleep-pdf-downloaded` event tag
- `sleep-week-1-complete` — protocol progress → `sleep-week-1-complete`
  for engagement scoring

Each new scenario gets its own section in this doc and its own
`MAKE_*_WEBHOOK_URL` env var so they can be deployed and tested
independently.
