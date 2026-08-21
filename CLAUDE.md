# CLAUDE.md - Project Rules (read before any task)

## Project
Premium static marketing website for **Aquai** - manufacturer of bath accessories
and SS304 kitchen sinks. 44 products across 5 series. No database, no CMS, no auth.

## Tech stack (fixed - do not deviate)
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Framer Motion for animations
- Product data: `data/products.json` (source of truth) accessed ONLY through
  `data/catalog.ts` (typed helpers + public/private field separation)
- Fonts via `next/font/google`

## HARD CONSTRAINT: static export on shared hosting (Hostinger)
The site deploys as plain HTML/CSS/JS to a shared server. No Node.js runtime.
- `next.config.js` must have: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`
- NEVER use: API routes, server actions, middleware, `next/image` remote optimization,
  ISR/revalidate, dynamic routes without `generateStaticParams`, cookies/headers APIs
- Contact form: Web3Forms/Formspree client-side POST - no backend
- All product/series pages statically generated via `generateStaticParams`
- Verify every feature works after `next build` produces the `out/` folder

## DATA PRIVACY CONSTRAINT (critical)
`products.json` contains internal fields: `d_p` (dealer price) and `code_no`.
These must NEVER ship to the browser or appear in rendered HTML:
- Client components ("use client") may only receive `PublicProduct[]` created via
  `toPublic()` from catalog.ts - never raw product objects or the json import
- Never render `d_p` or `code_no` anywhere
- After builds, verify: `grep -r "21680" out/` must return ONLY nothing
  (21680 is a known dealer price used as a leak canary)

## Displayed product fields (current scope)
Product cards/pages show ONLY: image, product_name, type, series, finish.
Elite Series products exist in 3 finishes (Gold, Rose Gold, Chrome) - show finish
as a small badge/label and offer a finish filter on the Elite series page.
size / material / code / price may be enabled later via PublicProduct.

## Images
- Path convention: `public/products/<series-slug>/<product-slug>.jpeg`
  (the `image` field in products.json already contains the exact path)
- `scripts/generate-placeholders.mjs`: for EVERY product in products.json missing
  its image file, generate a 1200×1200 placeholder .jpeg (sharp: `mist` #EFF1F0
  background, product name + series + finish as centered SVG text) so the full
  site is browsable before real photos arrive. Also one `_series-cover.png`
  per series. Idempotent: never overwrite an existing file.
- When real photos arrive they replace placeholders at the same path - no code change
- `scripts/optimize-images.mjs`: compress/resize any jpeg in public/products
  to max 1200px, quality ~80
- Always explicit width/height or aspect-ratio to prevent layout shift

## Design system
Follow `docs/DESIGN.md` exactly. Tokens live in `tailwind.config.ts` - never invent
new colors/fonts/spacing. Red is a micro-accent only.

## Code conventions
- Components in `components/`, one per file, PascalCase
- Shared Framer Motion variants in `lib/motion.ts` - reuse, don't redefine inline
- All animations respect `prefers-reduced-motion`
- Mobile-first responsive; test at 375px, 768px, 1280px
- Semantic HTML, alt text on every product image, visible focus states

## Workflow
- Work in the phases defined in `docs/PRD.md` - do not jump ahead
- After each phase: `npm run build`, fix export errors, run the leak-canary grep,
  then commit with a descriptive message
