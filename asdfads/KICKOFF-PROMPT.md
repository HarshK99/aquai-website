# How to run this project in Claude Code (v2 — Aquai)

## One-time setup (before opening Claude Code)
1. Empty project folder → open in VS Code
2. Place files:
```
aquai-site/
├── CLAUDE.md
├── data/
│   ├── products.json        ← full catalogue, 44 products (pre-generated)
│   └── catalog.ts           ← typed access layer (pre-written)
└── docs/
    ├── PRD.md
    └── DESIGN.md            ← original DESIGN.md + addendum appended at the end
```
3. Edit TODOs: logo hex values in DESIGN.md, series descriptions +
   `featured: true` picks in products.json, contact details in PRD.md.
   (code_no / d_p / size per product can be filled anytime — they're internal.)
4. `git init && git add . && git commit -m "aquai project docs and catalogue"`
5. Run `claude`, press Shift+Tab for Plan Mode, paste the kickoff prompt below.

## Golden rules
- Plan Mode before each phase; review, then approve
- One phase per request; `/clear` between phases (CLAUDE.md persists)
- After every phase: "Run npm run build, fix export errors, and run the
  price-leak check from CLAUDE.md"
- Paste screenshots for visual fixes

---

## KICKOFF PROMPT (first message in Claude Code)

Read CLAUDE.md, docs/PRD.md, docs/DESIGN.md, data/catalog.ts and skim
data/products.json before doing anything.

You are the senior front-end engineer on this project. We build in the phases
defined in PRD.md, one at a time. Two hard constraints from CLAUDE.md that can
never be violated: (1) Next.js static export compatibility, (2) internal fields
d_p and code_no must never reach the browser — client components only ever
receive PublicProduct via toPublic().

Do Phase 0 only:
1. Scaffold create-next-app in the current directory (TypeScript, Tailwind,
   App Router, ESLint) — preserve the existing CLAUDE.md, data/, docs/ files.
2. Configure next.config.js for static export exactly per CLAUDE.md.
3. tailwind.config.ts with every token from docs/DESIGN.md, including the
   finish swatch colors from the addendum.
4. Load Prata and Manrope via next/font/google.
5. lib/motion.ts with shared variants (heroStagger, fadeRise, gridStagger,
   hairlineDraw, gridReflow) wrapped to respect prefers-reduced-motion.
6. Verify data/catalog.ts imports products.json cleanly and typechecks.
7. Write scripts/generate-placeholders.mjs per CLAUDE.md (sharp; 1200×1200
   mist-background .jpeg with product name / series / finish text per the
   DESIGN.md placeholder spec; plus _series-cover.png per series; idempotent)
   — then RUN it and confirm all 49 files exist under public/products/.
8. Write scripts/list-images.mjs (prints every expected image path) and
   scripts/optimize-images.mjs (sharp, max 1200px, q80, in-place).
9. npm run build → confirm out/ generates; run the leak canary:
   grep -r "21680" out/ must return nothing.

Then show me the file tree + build output and STOP for my review.

---

## Per-phase prompts

**Phase 1:** "Phase 1 from PRD.md: layout shell — sticky Header with scroll state
per DESIGN.md, Footer, Section/Container primitives, page transition wrapper.
Build, verify export, leak check, commit."

**Phase 2:** "Phase 2: Home page per PRD.md/DESIGN.md — hero load sequence,
featured series band (all 5 series), featured products grid with stagger and
finish badges, chrome hairline signature. This sets the quality bar. Build,
leak check, commit."

**Phase 3:** "Phase 3: product system — /products with client-side series filter
(+ Elite finish chips with animated grid re-flow), /series/[slug] pages (Brava
gets the inverted dark hero band), /products/[slug] detail pages via
generateStaticParams, related products preferring same finish. Client components
receive PublicProduct only. Verify all 44 product pages in out/, run leak check,
commit."

**Phase 4:** "Phase 4: About and Contact — form posts client-side to Web3Forms
(key: <PASTE_KEY>), WhatsApp link, map embed. Build, commit."

**Phase 5:** "Phase 5: polish — metadata/OpenGraph per route, sitemap, 404,
motion restraint pass per DESIGN.md, a11y (focus, alt text from product_name +
finish, contrast), Lighthouse 90+. Build, leak check, commit."

**Phase 6:** "Phase 6: deploy prep — run optimize-images, test out/ with
npx serve, write .htaccess (404 + caching) and DEPLOY.md with exact Hostinger
upload steps. Final leak check, commit."
