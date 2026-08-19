# Blasingame Beauty

Marketing + booking site and installable PWA for Emma Blasingame, cosmetology student at
The Salon Professional Academy in Whitehouse, Texas. Built in Astro + TypeScript per the
design handoff in [`/design`](./design/README.md) — read that file for the full visual/behavioral
spec this was built against.

## Run it

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output to /dist
npm run preview   # serve the production build locally
```

## Where things live

| Path | What |
| --- | --- |
| `src/pages/index.astro` | The one-page site, section order |
| `src/pages/card.astro` | Standalone `/card` route for the printed QR |
| `src/pages/sw.js.ts` | Service worker, generated at build time so its offline shell references the real hashed photo URLs |
| `src/components/` | One component per section (Hero, Services, Quiz, …) |
| `src/scripts/` | Client-side behavior (quiz engine, before/after slider, countdown, theme, analytics) |
| `src/data/` | Editable content — see below |
| `src/styles/global.css` | Design tokens (light/dark), keyframes, shared classes |
| `public/manifest.json`, `src/pages/sw.js.ts` | PWA manifest + service worker |

## How Emma edits content

No markup editing needed for day-to-day changes — everything content-shaped lives in
`src/data/*.ts`:

- **`services.ts`** — the six service cards and the flat rate.
- **`quiz.ts`** — the five hair-quiz questions/options and the recommendation rules. The rules
  are deliberately honest (e.g. box dye always gets a consultation, never a promised one-visit
  fix) — keep that intent if you edit the copy.
- **`payments.ts`** — Venmo/Cash App/Zelle tip handles. **The Venmo and Cash App handles are
  placeholders — confirm both with Emma before launch.**
- **`reviews.ts`** — approved reviews shown on the site. Leave empty until real reviews are
  approved; the empty state is intentional (see design handoff).
- **`contact.ts`** — phone numbers, academy address, social links, graduation date.
- **`config.ts`** — feature flags (e.g. `showModelCall`).
- **`portfolio.ts`** — before/after image pairs; empty renders the placeholder slider.

## Open items before launch

Carried over from the design handoff — see [`design/README.md`](./design/README.md) for full
detail:

- Confirm real Venmo/Cash App handles.
- Add real before/after and portfolio photos.
- Wire reviews to a real backend (Supabase/Airtable) with an approval step — currently a
  localStorage placeholder, same as the design prototype.
- Wire an online scheduler (Square/Acuity/GlowUp) into the dashed slot in Booking, or keep the
  `sms:`/`mailto:` flow as-is.
- Pick a domain and update `site` in `astro.config.mjs`.
- Replace the placeholder PWA icons with a real monogram/logo when Emma has one.
- Wire a real privacy-friendly analytics provider (Plausible/Umami) — `src/scripts/analytics.ts`
  is a no-op stub until a domain + script tag are added.

## Deploy

Static output, no server required. Push to `main` and connect the repo in Netlify or Vercel
(build command `npm run build`, publish directory `dist`).
