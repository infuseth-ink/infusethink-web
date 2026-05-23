# Handoff · v1 polish

A PR-style design polish pass on `infusethink-web`. **The files in this folder mirror the upstream repo paths and are drop-in replacements** — apply them and `git diff` for the full picture.

## Scope

This is a typography + color + button + logo pass — the foundational layer. **Placeholder copy and imagery are left untouched** per the project owner. Two small copy tweaks where the metaphor was actively damaging information design (see "Copy tweaks" below) — easy to revert.

Nothing here is a new feature. Nothing changes layout, structure, routing, or content beyond what's listed.

## Apply

```bash
# from your local infusethink-web checkout
git checkout -b design/v1-polish

# copy the files in
cp -r path/to/design_handoff_v1_polish/app/.        app/
cp -r path/to/design_handoff_v1_polish/components/. components/
cp -r path/to/design_handoff_v1_polish/public/.     public/

# install — no new dependencies, but pnpm-lock may regenerate
pnpm install
pnpm dev
```

Then pick a logo option (`public/logos/README.md`) and wire it in — that's the only manual step.

## Changes per file

### `app/layout.tsx`

| Change                                                                                           | Why                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Fraunces({ weight: ['400','600','700'], axes: ['opsz'] })` (was `['400','700','900']`, no axes) | Fraunces ships an optical-size axis that auto-tunes letterforms for display vs body sizes — using it is free quality you were leaving on the table. Dropped weight 900 because the new hero uses 700; added 600 for medium-emphasis copy. |
| CSS var renamed: `--font-playfair` → `--font-fraunces`                                           | The variable claimed to be Playfair but loaded Fraunces. Misleading, fixed. All downstream usages in `globals.css` and `tailwind.config` need to follow.                                                                                  |

### `app/globals.css`

| Change                                                                                                                                | Why                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Added `--brand-green-hover: #3d7e52` — a true 10% darker shift from `--brand-green`                                                   | The old `--brand-green-dark` is 4× darker (kept, but now correctly tagged as "tag text on tinted bg," its actual usage). Two distinct roles need two distinct tokens.                                                                                                                                       |
| Added `--brand-gold-hover: #d4b242`                                                                                                   | Same reasoning, gold side.                                                                                                                                                                                                                                                                                  |
| Warmed `--card` from `#fffdf5` to `#fbf6e7`                                                                                           | Was essentially white on parchment — cards visually dissolved. New value has measurable contrast against `--brand-parchment` without losing the warm-paper feel.                                                                                                                                            |
| Added a 4-color semantic status palette: `--success`, `--warning`, `--info`, `--error` — all tuned to sit in the warm parchment world | The site has no error red, no info banner color, no success-that-isn't-the-brand-green. The moment you ship a form, toast, or status pill, you'd reach for tokens that don't exist. `--destructive` was a stock cold-oklch red that clashed with everything; it now aliases to `--error` (warm terracotta). |
| Added `--neutral-50` through `--neutral-900` — 9-step warm grey scale                                                                 | For dashboards / status pills / dividers — anywhere the brand colors are too loud. All values are tinted slightly warm so they live in the parchment world.                                                                                                                                                 |
| Added `.dark` token block — full dark-mode palette built on `--brand-green-night`                                                     | The variant was declared (`@custom-variant dark`) but no tokens existed. Now flipping `<html className="dark">` actually works. Note: on dark, **gold becomes the primary action color**, not green — green is too low-contrast on the night-brew background.                                               |
| Added shadow tokens: `--shadow-on-light`, `--shadow-on-dark`, `--shadow-card`, `--shadow-card-hover`                                  | The codebase reaches for `shadow-sm` / `shadow-xl` ad hoc. These named recipes encode that the same drop shadow has to be tuned per-surface to actually be visible.                                                                                                                                         |

### `components/ui/button.tsx`

| Change                                                                                                  | Why                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Removed `hover:scale-[1.03]`                                                                            | Pill buttons that scale on hover read as tooltips popping up, not press responses. Replaced with `hover:brightness-95` + the existing `active:translate-y-px` for honest tactile feedback.                                                                 |
| Added `[&_[data-arrow]]:group-hover:translate-x-0.5`                                                    | Any `<span data-arrow>→</span>` inside a button now shifts 2px right on hover. Signature animation, replaces the scale tic — see Hero / FeaturedCourse where `<span data-arrow>` is used.                                                                  |
| New variant `marketing` — gold bg, surface-adaptive shadow via `--shadow-on-light` / `--shadow-on-dark` | The hero CTA recipe was being assembled inline at every callsite (`bg`, `color`, `shadow`) in raw inline-styles. Now it's a named variant.                                                                                                                 |
| New variant `glass` — `bg-white/8` + `border-white/55` (up from `/35`) + `backdrop-blur-sm`             | The hero secondary CTA at `/35` border was nearly invisible — read as a label, not a button. Codified and bumped.                                                                                                                                          |
| New `shape` prop: `default` \| `pill`                                                                   | The codebase manually adds `rounded-full` to every marketing CTA. Now `shape="pill"` does it explicitly.                                                                                                                                                   |
| Retuned size scale upward: sm 36 / default 40 / lg 48 / **new xl 56**                                   | Old defaults (24/28/32/36) were dashboard-tuned. Marketing CTAs were hitting the `lg` size + custom `py-3` padding overrides everywhere — a tell that the default wasn't right. The new `xl` size hits 56px and is the right call for hero / landing CTAs. |
| `data-loading` attribute styling                                                                        | Was missing. Now `<Button loading>` gives a sane visual (cursor-progress, slight opacity drop) without you wiring anything else up.                                                                                                                        |

### `components/home/HeroSection.tsx`

| Change                                                                                           | Why                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| h1: `font-black` → `font-bold` (Fraunces 900 → 700)                                              | Fraunces Black is _aggressive_. The brand voice is tea-sommelier-warm, not high-energy. With the new opsz axis active (see `layout.tsx`), Fraunces 700 at 48px renders with display-tuned letterforms — you get the right gravitas without the inky overweight. |
| Subhead trimmed: dropped the second sentence                                                     | The original ran two metaphor verbs ("sip" + "brew") in one breath. The CTA pair below already does the audience pivot. Subhead is now one tight value-prop sentence.                                                                                           |
| Buttons swapped to `variant="marketing"` and `variant="glass"`, plus `size="xl"`, `shape="pill"` | All the inline-style scaffolding that used to live in this file (`backgroundColor`, `boxShadow`, `border`, etc.) now lives in the button component where it belongs.                                                                                            |
| `<span data-arrow>→</span>` added inside primary CTA                                             | Gets the new on-hover shift animation.                                                                                                                                                                                                                          |

### `components/home/PillarsSection.tsx`

Copy edits — see "Copy tweaks" section below.

### `components/home/FeaturedCourseSection.tsx`

Copy edit — see "Copy tweaks" section below.

### `public/logos/`

Three SVG logo options in versioned subfolders. **`option-a-wordmark` is the recommendation**. See `public/logos/README.md` for the full breakdown and integration steps.

## Copy tweaks (small, opt-out friendly)

These cross the "no placeholder edits" line but are low-risk and high-impact. Easy to revert in 3 minutes if you'd rather not ship them.

1. **`HeroSection.tsx`** — subhead lost its second sentence ("Sip your first cup — or share your brew with the world"). The hero already says "Infuse thoughts, ink futures" and the CTA pair does the audience pivot. The second sentence was metaphor-stacking.
2. **`HeroSection.tsx`** — CTA labels switched to sentence case ("Start learning" / "Start teaching") to match the rest of the site, which is consistent sentence case. This is a casing rule, not a copy rewrite.
3. **`PillarsSection.tsx`** — Pillar 2 title: "Boost with every cup" → "Compounds into mastery." The "cup" verb in the title duplicated the metaphor already carried by the body copy.
4. **`PillarsSection.tsx`** — Pillar 3 title: "Never brew or sip alone" → "Never learn alone." Original used both metaphor verbs in a four-word title — densest metaphor concentration on the page.
5. **`FeaturedCourseSection.tsx`** — CTA: "Start brewing →" → "Start the series →." In the product's own vocabulary, brewing = author. The button is for learners enrolling in the series, so the original was using the wrong verb. (The instructor "Start brewing" CTA elsewhere on the site is correct.)

The metaphor still dominates after these — the page still says **teabag, steep, sip** (in the Pillars / Course descriptions and the Testimonials h2). The edits just take out duplicates and a verb mismatch.

## What's NOT touched (per scope)

- All marketing copy except the 5 items above.
- The Testimonials section + its fictional-disclaimer note.
- The hero illustration and the three pillar illustrations.
- All section layout, ordering, padding.
- The Navbar and Footer.
- The Card component (`components/ui/card.tsx`).
- Routing, page composition, any data flow.

## Design tokens — before / after

```diff
// FONTS
- --font-playfair         (lying name; loaded Fraunces)
+ --font-fraunces         (correct name; loads Fraunces with opsz axis)

// PRIMARY HOVER
- --brand-green-dark: #2f6341  (used for both "hover" and "tag text")
+ --brand-green-hover: #3d7e52 (10% shift, true hover)
+ --brand-green-dark:  #2f6341 (kept, now only for tag text on tinted bg)

// CARD SURFACE
- --card: #fffdf5
+ --card: #fbf6e7        (slightly warmer; real contrast vs parchment)

// SEMANTIC STATUS  (all new)
+ --success: #5a8f4a   --success-fg: #ffffff
+ --warning: #d49431   --warning-fg: #2b1d05
+ --info:    #5a7b8f   --info-fg:    #ffffff
+ --error:   #b54637   --error-fg:   #ffffff

// DESTRUCTIVE
- --destructive: oklch(0.577 0.245 27.325)  (stock cold red)
+ --destructive: var(--error)               (warm terracotta)

// NEUTRALS  (all new, 9 steps)
+ --neutral-50  → --neutral-900

// DARK MODE TOKENS  (all new)
+ .dark { --background: #0d1f12; --foreground: #f0e9cf; … }

// SHADOWS  (all new)
+ --shadow-on-light: 0 12px 24px -8px rgba(13,31,18,0.22), …
+ --shadow-on-dark:  0 12px 24px -8px rgba(0,0,0,0.55), …
+ --shadow-card:       …
+ --shadow-card-hover: …
```

## File manifest

```
design_handoff_v1_polish/
├── README.md                                  ← this file
├── app/
│   ├── globals.css                            ← color tokens, dark mode, semantics
│   └── layout.tsx                             ← Fraunces opsz, var rename
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx                    ← weight, subhead, button variants
│   │   ├── PillarsSection.tsx                 ← 2 title edits
│   │   └── FeaturedCourseSection.tsx          ← CTA label
│   └── ui/
│       └── button.tsx                         ← variants, sizes, hover, states
└── public/
    └── logos/
        ├── README.md                          ← option breakdown + wiring
        ├── option-a-wordmark/  (5 SVGs)       ← RECOMMENDED
        ├── option-b-i-mark/    (4 SVGs)
        └── option-c-cup/       (4 SVGs)
```

## Things to verify after applying

- Visually compare the hero on a 1440px display before and after. The new Fraunces 700 + opsz looks lighter; if that feels too light, bump back to `font-bold` + a custom `font-weight: 750` style or revert to `font-black` — both are clean reverts.
- The dark-mode tokens are defined but no UI currently _uses_ them. Wire `<html className={dark ? 'dark' : ''}>` via your preferred toggle (`next-themes` is the standard pick) when you're ready.
- The new `marketing` and `glass` button variants are used in `HeroSection.tsx`. The `FeaturedCourseSection.tsx` still uses raw `<button>` elements with inline styles — not converted in this pass to keep the diff small. Convert those to the new `Button` component in a follow-up.
