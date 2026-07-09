# DESIGN.md — Design System

## Direction
**"Porcelain & Navy."** Light, airy, architectural luxury — the visual language of
premium sanitaryware showrooms. Deep navy carries the brand's blue; red appears only
as a rare, deliberate micro-accent. Generous whitespace, large product photography,
restrained motion. The products are the heroes; the UI stays quiet around them.

Red is NEVER used for backgrounds, large surfaces, or body text. It appears only in:
the logo, small hover accents, an occasional 2px detail line. Overusing red makes the
site look like a discount retailer — the single fastest way to kill "premium."

## Color tokens (put in tailwind.config.ts)
<!-- Adjust navy/red to sample the actual logo colors before Phase 0 -->
- `porcelain`  #FAFAF7  — page background
- `mist`       #EFF1F0  — alternate section background, card surfaces
- `navy`       #196db5  — primary brand color: headings, header, footer, buttons
- `navy-deep`  #0A1830  — footer, hover states
- `steel`      #5C6B7A  — secondary text, captions
- `accent-red` ##f21928  — micro-accent only
- `chrome`     #C9CED4  — hairline borders, dividers (nod to chrome finishes)

## Typography
- **Display:** Prata (serif, single weight) — page titles, hero headline, series names.
  Used large and sparingly; letter-spacing slightly tight, never bold-faked.
- **Body/UI:** Manrope — paragraphs, nav, buttons, specs. Weights 400/500/600 only.
- **Eyebrow/labels:** Manrope 600, 11–12px, uppercase, tracking 0.14em, color steel —
  used for series labels and section kickers (e.g. "SERIES — AURA").
- Scale: hero clamp(2.5rem→4.5rem); h2 clamp(1.75rem→2.75rem); body 1rem/1.7.

## Signature element
**The chrome hairline.** A 1px `chrome` line motif that echoes polished metal:
under section eyebrows, between spec rows, and as the product-card hover cue —
on hover, a hairline draws itself across the card bottom (scaleX 0→1) in `navy`,
tipping to `accent-red` for 150ms at completion. Subtle, consistent, memorable.

## Layout
- Max content width 1280px; section vertical padding 96–128px desktop / 64px mobile
- Product grid: 4 cols desktop / 2 tablet / 1–2 mobile, 24–32px gaps
- Product cards: image on `mist` background with generous padding (products float
  like showroom pieces), name in navy, series eyebrow above, no heavy card borders
  or drop shadows — flat, gallery-like
- Product detail: 55/45 split — large image left, sticky info column right (desktop)

## Motion (lib/motion.ts — reuse everywhere)
Principle: one orchestrated moment per view, quiet everywhere else. Ease:
`[0.22, 1, 0.36, 1]`, durations 0.5–0.8s. Respect `prefers-reduced-motion` globally.
- **Hero load:** headline lines rise + fade staggered 80ms; hero image scales
  1.05→1 over 1.2s
- **Scroll reveal:** sections fade-rise 24px, `whileInView`, once: true
- **Product grid:** stagger children 60ms on first reveal
- **Card hover:** image scale 1→1.04 (0.6s), hairline draw; NO lift/shadow
- **Page transitions:** simple 0.3s fade via template.tsx
- **Header:** transparent over hero → solid porcelain + hairline border on scroll
- Do NOT add: parallax everywhere, cursor followers, particle effects, marquees.

## Imagery rules
Product photos on consistent neutral backgrounds; if source photos vary, place them
on `mist` tiles with uniform padding so the grid reads as one collection.

## Copy voice
Confident, spare, material-led: "Solid brass. Hand-polished." Sentence case,
no exclamation marks, no marketing filler ("world-class", "best-in-class" banned).


## Finish system (new)
Products carry a finish that matters to buyers — treat it as a first-class visual:
- **Finish badge** on product cards: eyebrow-style label (Manrope 600, 11px,
  uppercase, tracking 0.14em) with a 8px round swatch dot before the text.
- Swatch tokens: `finish-chrome` #C9CED4 · `finish-gold` #C9A24B ·
  `finish-rosegold` #C08A7D · `finish-mattblack` #1E1E1E · `finish-mirror` #DEE3E8
  · `finish-satin` #B9BFC4 · `finish-glossy` #D6DBE0 · `finish-cp` #C9CED4
- **Elite finish filter**: three pill chips (Gold / Rose Gold / Chrome) with the
  swatch dot; active pill = navy fill, porcelain text. Filtering animates the grid
  re-flow with Framer Motion layout animations (smooth, 0.4s).
- Brava (Matt Black) series page may invert its hero band: navy-deep background,
  porcelain text — the one sanctioned dark moment on the site. Products grid
  stays on porcelain.

## Placeholder images
Placeholders are part of the design until real photos arrive: mist #EFF1F0
background, product name in Prata (navy), series + finish in the eyebrow style
(steel), centered, generous margins — they should look intentional, not broken.

