# Handoff: Blasingame Beauty — Emma Blasingame's stylist site & PWA

## Overview

A one-page marketing + booking site for **Emma Blasingame**, an 18-year-old cosmetology student at The Salon Professional Academy in Whitehouse, Texas. It has to do four jobs: let clients book her, replace the paper business card she hands out, recruit hair models for her school requirements, and install to a phone home screen as an app.

**Target repo:** `CBlasingameLLC/Emma_Cosmetology_Website` (branch `main`, currently empty — this is the initial commit).

## About the design files

The files in this bundle are **design references authored in HTML** — a working prototype of the intended look and behavior, not production code to copy directly. `Blasingame Beauty.dc.html` uses a streaming component format (a template plus a logic class, inline styles only, no stylesheets) that exists to make design iteration fast. It is **not** the shipping architecture.

Your job is to **rebuild these designs in a real production stack** (§Stack), lifting exact values — colors, type, spacing, radii, animation timings, and copy — from the prototype. Every interaction in the prototype works; use it as the behavioral source of truth. Open it in a browser to feel the motion before you start.

## Fidelity

**High-fidelity.** Colors, typography, spacing, motion and copy are final. Recreate the UI faithfully. The only intentionally unfinished elements are marked in the design with monospace `[ bracketed ]` labels — placeholder photo slots, the QR code, the scheduler embed, and the payment handles. Those are known gaps, listed in §Open items.

## Stack

- **Astro** (or Next.js static export) + TypeScript. Static output; no server needed for v1.
- **Tailwind** with the tokens below mapped into `tailwind.config`, or plain CSS with the custom properties copied verbatim. Either is fine — be consistent.
- Self-host fonts via `@fontsource` (Cormorant Garamond, Jost). No render-blocking Google Fonts link in production.
- Content in typed data files (`src/data/services.ts`, `quiz.ts`, `reviews.ts`, `payments.ts`) so Emma's edits never touch markup.
- Deploy to **Netlify** or **Vercel**. Custom domain when Emma picks one (`blasingamebeauty.com` suggested).

## Design tokens

Every color derives from `--hue: 350`, so the whole site re-tints from one number. Defined on `:root`, dark mode under `:root[data-theme="dark"]`.

**Light**
```css
--bg: oklch(99.2% .006 var(--hue));      --bg-2: oklch(97.4% .014 var(--hue));
--surface: oklch(99.8% .004 var(--hue)); --surface-2: oklch(96.4% .02 var(--hue));
--ink: oklch(23% .028 var(--hue));       --ink-2: oklch(46% .022 var(--hue));
--ink-3: oklch(62% .022 var(--hue));     --line: oklch(91% .024 var(--hue));
--pink: oklch(66% .17 var(--hue));       --pink-2: oklch(55% .17 var(--hue));
--pink-soft: oklch(94% .036 var(--hue)); --gold: oklch(70% .085 85);
--glow: oklch(66% .17 var(--hue) / .3);  --onpink: oklch(99% .01 var(--hue));
--shadow: 0 18px 50px -24px oklch(45% .12 var(--hue) / .38);
```

**Dark (neon)**
```css
--bg: oklch(13.5% .014 var(--hue));      --bg-2: oklch(16.5% .02 var(--hue));
--surface: oklch(18.5% .024 var(--hue)); --surface-2: oklch(23% .032 var(--hue));
--ink: oklch(97% .012 var(--hue));       --ink-2: oklch(75% .024 var(--hue));
--ink-3: oklch(60% .03 var(--hue));      --line: oklch(30% .038 var(--hue));
--pink: oklch(78% .245 var(--hue));      --pink-2: oklch(86% .19 var(--hue));
--pink-soft: oklch(26% .075 var(--hue)); --gold: oklch(82% .09 85);
--glow: oklch(78% .245 var(--hue) / .5); --onpink: oklch(14% .022 var(--hue));
--shadow: 0 22px 64px -26px oklch(4% .04 var(--hue) / .85);
```

**Typography**
- Display / numerals: **Cormorant Garamond**, weights 300–500, italic used for emphasis (`like you`, pull quotes, review text). Sizes: h1 `clamp(46px,7.6vw,90px)` at `line-height:.97`, `letter-spacing:-.02em`; h2 `clamp(36px,5.4vw,62px)` at `1.02`; card h3 22–28px.
- Body / UI: **Jost**, 300–600. Body `clamp(15px,1.3vw,18.5px)`, `line-height:1.7–1.75`, color `--ink-2`, `text-wrap:pretty` on paragraphs.
- Eyebrow labels: Jost 10.5–11.5px, `letter-spacing:.2em–.24em`, uppercase, color `--pink-2` (or `--ink-3` on muted variants).
- Monospace placeholders: `ui-monospace, SFMono-Regular, Menlo, monospace` at 10.5–12px, color `--ink-3`.

**Spacing & shape**
- Container `width: min(1180px, 92vw); margin-inline: auto`. Quiz container narrows to `min(880px, 92vw)`.
- Section rhythm `padding: clamp(76px, 9vw, 132px) 0`. Countdown and footer are tighter (`clamp(52px,7vw,96px)`).
- Radii: cards 18–24px, quiz shell 26px, pills 999px, inputs 12px, hero image `220px 220px 22px 22px`.
- Grids: `repeat(auto-fit, minmax(Npx, 1fr))` with `gap: 12–16px` for card rows, `gap: clamp(30px,5vw,72px)` for two-column splits. Use flex/grid + `gap` throughout — no margin-based spacing between siblings.

**Motion**
- Easing `cubic-bezier(.2,.7,.2,1)` everywhere. Hovers 250–300ms. Reveals ~900ms.
- Keyframes: `rise` (opacity+22px), `riseIn` (opacity+34px+scale .985), `pop` (quiz step change), `pulseGlow` (box-shadow breathe), `floaty` (±9px loop), `marquee` (translateX -50%), `blink` (live dots), `sheen` (button light sweep), `spin` (hero conic ring, 18s).
- Card hover: `translateY(-4px to -6px)` + `border-color: var(--pink)`.
- Button hover: `translateY(-3px)` + deeper `--glow` shadow.
- Scroll reveals use `animation-timeline: view(); animation-range: entry 4% cover 26%`. Where unsupported the animation plays once and lands visible — **verify that fallback in Safari and Firefox.**

## Screens / views

One page, section-anchored nav. In order:

### 1. Scroll progress bar
Fixed top, 2px, `linear-gradient(90deg, var(--gold), var(--pink))` with `--glow` shadow. Width = scroll fraction of `scrollHeight - innerHeight`.

### 2. Sticky header
`backdrop-filter: blur(14px) saturate(1.4)`, background `color-mix(in oklab, var(--bg) 82%, transparent)`, 1px bottom `--line`. Left: "Blasingame" (Cormorant 23px) + "BEAUTY" (10px, `.3em`, `--pink-2`). Right: nav links (Services / Hair Quiz / Work / About, 13px uppercase `.12em`), theme toggle, Book pill.
- Nav link for the section in view turns `--pink` (IntersectionObserver, `rootMargin: -45% 0px -50% 0px`).
- Theme toggle: 52×28px pill, 22px knob in `--pink` with `--glow`, translates 24px on dark, `transition: transform .38s cubic-bezier(.5,1.6,.4,1)`.

### 3. Hero
Two-column `auto-fit minmax(320px,1fr)`, `gap: clamp(34px,5vw,70px)`.
- Left: live "Now booking student clinic" pill (blinking dot) → h1 **"Hair that feels / *like you*."** (italic line in `--pink-2`) → body paragraph → two CTAs (primary "Book an appointment" with animated `sheen`; ghost "Take the hair quiz") → three stat cells above a `--line` rule: flat rate, days to licensing, "Whitehouse / Tyler / East Texas".
- Right: `assets/emma-chair.jpg` at `aspect-ratio:4/5`, `object-position:50% 22%`, arch radius, wrapped in a rotating `conic-gradient` glow ring (`spin 18s`, `blur(22px)`, opacity .5). Floating "Behind the chair / Emma Blasingame" chip, `floaty 6s`. Whole group tilts to the cursor: `perspective(1100px) rotateY(±9deg) rotateX(±9deg)`, pointer-driven, `(hover: hover)` only.
- Decorative radial blob top-right, `pointer-events:none`.

### 4. Marquee band
`--bg-2`, 1px rules top and bottom, 15px vertical padding. Duplicated track, `marquee 34s linear infinite`, 12px uppercase `.24em` `--ink-3`, `✦` separators in `--pink`: academy · supervision · services · location · student rates.

### 5. Services
Header row (eyebrow "In the chair", h2 "Services & rates", flat-rate note). Six cards, `auto-fit minmax(258px,1fr)`:

| Category | Title | Duration |
| --- | --- | --- |
| Cutting | Haircut & style | 60–75 min |
| Styling | Blowout & thermal style | 45–60 min |
| Color | Color, gloss & toner | 90 min – 2 hr |
| Lightening | Highlights & balayage | 2–3 hr |
| Treatment | Deep conditioning | 30–45 min |
| Occasion | Updos & event styling | 60–90 min |

Each card: category eyebrow, Cormorant 26px title, description, then a `--line` footer row with duration left / price right. Every card shows the same flat rate. **Cursor spotlight:** card background is `radial-gradient(420px circle at var(--mx,50%) var(--my,0%), var(--pink-soft), transparent 62%), var(--surface)` with `--mx/--my` set from pointer position. Below: a note that times are estimates and all services are instructor-supervised.

### 6. Hair Goal Quiz — the centerpiece
Centered header, then a `--surface` shell (radius 26px, `--shadow`, `min-height:400px`) with a 3px progress bar pinned to its top edge (gold→pink, `transition: width .45s`).

Three stages: **intro** (pulsing `?` medallion, "Let's figure out what your hair actually needs.", Start button) → **question** (1 of 5, Back link, Cormorant question, hint line, option grid `auto-fit minmax(220px,1fr)`; each option is a ≥76px button with label + sub-label, hover lift + pink border; a tap advances immediately) → **result** (`pop` animation).

Questions and full option copy live in the prototype's logic class; move to `src/data/quiz.ts`:
```ts
type Question = { key:'goal'|'history'|'texture'|'upkeep'|'timing'; title:string; hint:string; options:{label:string; sub:string}[] };
```

Recommendation rules — **keep exactly; the honesty is the point:**
- `goal=cut` → **Haircut & style**, 60–75 min, one visit, upkeep 10–12 wks if upkeep=low else 6–8 wks.
- `goal=color` + `history=box dye` → **Color consultation first, then correction**, "consult 20 min, then 2–3 hr", **two or more visits**. Never promise a one-session fix on box dye.
- `goal=color` + `upkeep=low` → **Balayage or a face-frame**, 2–3 hr, 3–4 month upkeep.
- `goal=color` + `history=highlighted` → **Partial highlights + toner**, 2–2.5 hr, 8–10 wks.
- `goal=color` (else) → **All-over color + gloss**, 90 min–2 hr, 6–8 wks.
- `goal=event` → **Blowout or updo**, 45–90 min.
- `goal=repair` → **Deep conditioning + a dusting**, 45–60 min, then every 4–6 wks.
- `goal=unsure` → **Consultation + blowout**, 60 min, no commitment.

Result shows three stat tiles (time in chair / visits / upkeep), a dashed "Notes for your consultation" panel built from texture + hair history + "bring 2–3 inspiration photos" + the flat rate, then **"Fill out my booking request →"** (writes service + timing + notes into the booking form and smooth-scrolls to `#book`, offset −84px) and "Start over".

**Add on rebuild:** persist answers to `sessionStorage` so a refresh mid-quiz doesn't lose progress; fire `quiz_complete` analytics with the recommended service.

### 7. Before & After / portfolio
Comparison slider, `aspect-ratio:16/9`, `min-height:300px`, radius 24px. Two diagonally striped placeholder panels (`repeating-linear-gradient(45deg, …)` — before panel tinted `--pink-soft`). Before label is left-aligned, after label right-aligned, both `pointer-events:none`, so neither collides with the handle at any position. Top layer clipped by `clip-path: inset(0 calc(100% - var(--ba,55%)) 0 0)`. 2px `--pink` divider + 52px circular handle (`pulseGlow`, `cursor:ew-resize`, `role="slider"` with live `aria-valuenow`). Drag via pointer events on the root; **arrow keys move it ±4%**. "Drag · or use arrow keys" chip bottom-center. Below: four dashed 4/5 "coming soon" slots (color work / blowout / haircut / updo) and a line linking Instagram + TikTok.

Wire the real version to accept image pairs: `{ before: string; after: string; alt: string; service: string }[]`.

### 8. Hair Models Wanted
`--bg-2` band. Left column: pink-outlined live "Models wanted" pill, h2 "Be a hair model", explanation, then the four terms — flat rate applies; longer appointment because the instructor checks the work; a licensed instructor supervises start to finish; photos only ever with permission — then a "Volunteer as a model" CTA to `#book`. Right column: four numbered spotlight cards (01 Vivid color, 02 Short cuts, 03 Perms & texture, 04 Updos). Section is behind a `showModelCall` flag; keep it toggleable in config.

### 9. About Emma
Two columns. Left: `assets/emma-portrait.jpg`, radius 22px, `object-position:50% 30%`, soft gradient glow behind, cursor tilt, floating "Est. 2026" chip (`floaty 7s`). Right: eyebrow "Meet your stylist", h2 "Hi, I'm Emma", three paragraphs in her own words, then the **1 Peter 4:10** pull quote — `border-left: 2px solid var(--gold)`, `--bg-2` fill, radius `0 16px 16px 0`, Cormorant italic `clamp(20px,2.4vw,26px)`, attribution in `--gold` uppercase `.18em` — then a closing paragraph. Copy is Emma's own; do not rewrite it.

### 10. Countdown
`--bg-2` band, centered. Eyebrow "The road to licensed", h2 "Graduating March 2027", supporting line, then a live "Counting down live to March 1, 2027 · 9:00 AM" pill with a blinking dot. Four tiles (`auto-fit minmax(120px,1fr)`, max 660px): **Days / Hours / Minutes / Seconds**, Cormorant `clamp(38px,5vw,54px)` in `--pink-2` (seconds in `--pink` with a `--glow` text-shadow), zero-padded to two digits. Below, a precise total: "That's N hours, or N minutes, until I'm licensed" (locale-formatted). Ticks every 1000ms from `Date.parse('2027-03-01T09:00:00')`.

### 11. Reviews
Two columns. Left: approved reviews (star string, Cormorant italic quote, uppercase name) or the empty state — dashed panel, pulsing `✦` medallion, **"The first review is still open."** Right: submit form on `--surface` (name, five star buttons with unselected stars at `opacity:.32`, textarea, full-width submit that flips to "Thank you ♡" for 2.6s), plus a line explaining reviews go to Emma for approval first.

Prototype stores submissions in `localStorage`. **Production:**
1. `POST /api/reviews` → **Supabase** (or Airtable) row with `status:'pending'`.
2. Notify Emma by email/SMS with approve/reject links.
3. Only `status:'approved'` renders publicly; rebuild on approval via webhook, or fetch client-side.
4. Honeypot + rate limit. No CAPTCHA unless spam actually appears.
5. **Keep the empty state until at least two reviews are approved** — an honest empty state beats invented testimonials.

### 12. Booking
`--bg-2` band. Left: "Appointment request" card (name, what you'd like, when works for you, anything I should know) with two actions — **Send as text** (`sms:+19037301234?&body=…`) and **Send as email** (`mailto:?subject=…&body=…`), both URL-encoded from the form — plus reassurance that nothing sends until they hit send.

Right column: two tap-to-call cards — **903-730-1234** (Emma direct, "I answer texts fastest") and **903-871-7575** (the academy, "ask for Emma") — both real numbers, both `tel:` links. Then a dashed **scheduler slot**.

- **v1 ships as-is:** `sms:` / `mailto:` composition. Zero backend, works today.
- **v2:** Emma chose an embedded third-party scheduler — Square Appointments, Acuity, or GlowUp. Mount it in the dashed slot, lazy-load with `IntersectionObserver`, and force its theme to the site palette. If the widget can't be themed, use a styled "Book on [platform]" button rather than dropping a mismatched iframe into the page.

### 13. Leave a tip
`--bg-2` band, centered header: eyebrow "Never expected, always appreciated", h2 "Leave a tip", and copy stating plainly that the academy sets her rate, tips aren't part of the price, and they fund her kit, shears and licensing exam. Three spotlight cards (`auto-fit minmax(240px,1fr)`, max 900px):

| Method | Value | Behavior |
| --- | --- | --- |
| Venmo | `@Emma-Blasingame` | `https://venmo.com/u/<handle>` in a new tab |
| Cash App | `$emmablasingame` | `https://cash.app/$<cashtag>` in a new tab |
| Zelle | `903-730-1234` | Button copies the number ("Number copied ♡" for 2.2s) — Zelle has no web deep link, so the client sends from their own bank app |

Closing line notes cash in the chair is welcome. **The Venmo and Cash App handles are placeholders** — confirm both with Emma before launch and move all three into `src/data/payments.ts`. Keep the tone: never a paywall, never a nag, no suggested amounts, and never gate booking behind it.

### 14. Digital business card
Left: eyebrow "Share me", h2 "Digital business card", copy, and buttons — **Save to contacts** (generates a `.vcf`, see §Assets), **Share this page** (`navigator.share`, clipboard fallback, "Link copied ♡"), and **Install the app** (only when `beforeinstallprompt` has fired). Below them, an "Add it to your home screen" panel with iPhone (Share → Add to Home Screen) and Android (menu → Install app) instructions.

Right: the card itself — tilting, spotlit, radius 24px, corner glow. Name in Cormorant `clamp(30px,3.6vw,40px)`, role line "Cosmetology student · Blasingame Beauty" in `--pink-2`, phone / academy / city stack, Instagram + TikTok pills, and a 132px dashed square for the QR.

**Replace the QR placeholder with a real code** generated at build time (`qrcode` npm → inline SVG, `--ink` on `--surface`). Also add a standalone `/card` route so a printed QR points at just the card.

### 15. Footer
`--bg-2`, four columns (brand blurb / Visit / Reach me / Follow) over a `--line` rule, then two small-print lines: "© 2026 Emma Blasingame. Made with love by her brother." and "All services performed under licensed instructor supervision."

## PWA requirements

Emma wants an installable app. `manifest.json` and `sw.js` in this bundle are working references — carry both forward, adjusting paths for the production build.

- **Manifest:** name "Blasingame Beauty — Hair by Emma", short_name "Blasingame", `display: standalone`, `background_color: #fdf7f9`, `theme_color: #e0699a`, `start_url: "/"` and `scope: "/"` in production. Icons: 192, 512, and a **maskable** 512 (the maskable variant is a full-bleed square — no rounded corners, safe zone respected).
- **Icons:** `assets/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — pink `#e0699a` field, cream `#fffafc` serif "B". These are placeholders good enough to ship; replace with a proper monogram or her logo when she has one.
- **Shortcuts:** Book (`/#book`), Hair quiz (`/#quiz`), Tip (`/#tip`).
- **Service worker:** network-first for documents (so content is never stale), cache-first with background refresh for assets, old caches purged on activate. Register only over `http(s)`. Add an update flow — on `controllerchange`, show a small "New version — refresh" pill rather than reloading under the user.
- **`theme-color` follows the toggled theme,** not just `prefers-color-scheme`: `#fdf7f9` light, `#1a1113` dark, updated in JS whenever the theme changes.
- **Install button** appears only after `beforeinstallprompt` fires; iOS never fires it, which is why the written instructions are always visible.
- **Offline:** the shell, both photos and the icons must load with no network. Verify in Chrome DevTools → Application → Offline, and by installing on a real iPhone and a real Android phone.
- Ship a 1024px `apple-touch-icon`, and splash handling for iOS if it looks rough on install.

## State

All client-side; no auth in v1.

| State | Purpose | Persistence |
| --- | --- | --- |
| `dark` | Theme | `localStorage['bb-theme']`, applied by an inline script **before paint** (no flash) |
| `stage` / `step` / `answers` | Quiz machine (`intro` → `q` → `result`) | `sessionStorage` on rebuild |
| `form{name,service,when,notes}` | Booking request; written by the quiz | in-memory |
| `reviews`, `rvName`, `rvText`, `rvStars`, `rvSent` | Review list + submit form | `localStorage['bb-reviews']` in the prototype → **API in production** |
| `zelleCopied`, `shared` | 2.2s confirmation labels | in-memory |
| `canInstall` | `beforeinstallprompt` captured | in-memory |
| `now` | 1s countdown tick | in-memory |
| `--mx/--my`, `--ba`, `--sp`, `--knob`, `--qp` | Pointer spotlight, slider position, scroll progress, toggle knob, quiz progress | CSS custom properties written directly to the DOM — deliberately **outside** the render cycle so pointer moves and drags never trigger re-renders. Preserve that separation. |

## Accessibility & performance

- Tap targets ≥44px (already true). Add visible `:focus-visible` rings in `--pink` — the prototype relies on defaults.
- Honor `prefers-reduced-motion`: disable `floaty`, `spin`, `marquee`, `pulseGlow`, `sheen`, `blink`; keep opacity fades.
- Slider handle is a real `role="slider"` with `aria-valuenow` and keyboard control. Keep both.
- Honor `prefers-color-scheme` on first visit, then let the toggle win.
- Compress the headshots hard (they're multi-MB originals): AVIF + WebP, explicit `width`/`height`, `fetchpriority="high"` on the hero. Keep the existing alt text.
- Target Lighthouse ≥95 mobile and a PWA-installable audit pass.
- SEO: `LocalBusiness` + `Person` JSON-LD (name, both phones, Whitehouse TX, Instagram/TikTok as `sameAs`), OG image from the salon headshot, sitemap, `robots.txt`.

## Analytics

Privacy-friendly (Plausible or Umami). Events: `quiz_start`, `quiz_complete` (+ recommended service), `booking_sms_click`, `booking_email_click`, `call_direct`, `call_academy`, `model_cta_click`, `tip_click` (+ method), `vcard_download`, `pwa_install`, `theme_toggle`. These tell Emma which services people actually want before she's licensed.

## Assets

| Asset | Notes |
| --- | --- |
| `assets/emma-chair.jpg` | Salon headshot, black backdrop, holding shears. Hero. Alt: "Emma Blasingame in the salon chair holding shears". Uncompressed original from the client. |
| `assets/emma-portrait.jpg` | Outdoor portrait, cream dress. About. Alt: "Emma Blasingame leaning against a column in a cream dress". Uncompressed original. |
| `assets/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Generated PWA icons, pink field + cream serif "B". Placeholder quality — replace when she has a logo. |
| vCard | Generated in JS, downloaded as `emma-blasingame.vcf`: `FN:Emma Blasingame`, `ORG:Blasingame Beauty`, `TITLE:Cosmetology Student`, `TEL;TYPE=CELL:+19037301234`, `TEL;TYPE=WORK:+19038717575`, `ADR;TYPE=WORK` The Salon Professional Academy, Whitehouse, TX, USA, `URL` Instagram. |
| QR code | **Not built.** Generate at build time from the production URL. |
| Fonts | Cormorant Garamond + Jost, Google Fonts → move to `@fontsource`. |

Real contact details, all confirmed by the client: **903-730-1234** (Emma direct), **903-871-7575** (academy), Instagram + TikTok `@blasingame_beauty`.

## Files in this bundle

| File | What it is |
| --- | --- |
| `Blasingame Beauty.dc.html` | The design prototype — visual and behavioral source of truth. Open it in a browser. |
| `support.js` | Runtime the prototype needs to render. Not part of production. |
| `manifest.json` | PWA manifest reference. |
| `sw.js` | Service worker reference (network-first documents, cache-first assets). |
| `assets/` | Photos and generated PWA icons. |

## First commit

The repo `CBlasingameLLC/Emma_Cosmetology_Website` is empty. Suggested initial structure:

```
/src           app code (Astro/Next)
/src/data      services.ts, quiz.ts, payments.ts, reviews.ts
/public        manifest.json, sw.js, icons, compressed photos
/design        this bundle, committed for reference
README.md      setup, deploy, and how Emma edits content
```

Commit the design bundle under `/design` so the reference travels with the code, then push to `main` and wire up the deploy.

## Open items for Emma

- **Real work photos** — the before/after slider and four portfolio slots are built and waiting. Two shots of the same client (before + after, same angle and lighting) make that section sing.
- **Venmo and Cash App handles** — currently placeholders.
- **Clinic days and hours** at the academy — not in the design yet.
- **Confirm the March 2027 graduation date**; the countdown targets `2027-03-01T09:00:00`.
- Domain choice, and whether to show `$15` publicly or say "student rates".
- Whether reviews live on the site or point at Google/Facebook instead.

## Deliberately deferred

Loyalty/referral card, digital gift cards, cancellation waitlist, aftercare guides, and Instagram/TikTok feed embeds were all considered and cut from v1. Externalize services, reviews and payments as data from day one and these slot in without a redesign.

## Definition of done

Deployed to a live URL. Both themes correct with no flash on load. Quiz → booking prefill works end to end on iOS Safari and Android Chrome. `tel:` / `sms:` links open the right apps on real phones. Tip links open the right apps; Zelle copy works. Real QR code. Installs to the home screen on both platforms and opens offline. Lighthouse ≥95 mobile. Emma can update services, payment handles and reviews without editing markup.
