# PRD - Aquai Website

## Client & goal
**Aquai** - manufacturer of premium bath accessories and SS304 kitchen sinks.
44 products across 5 series. Goal: a product showcase that presents the catalogue
as a luxury brand and drives dealer/architect/homeowner inquiries.
No e-commerce, no public pricing - inquiry-driven.

## Contact details (use on Contact page + Footer)
- Distributor: CORE ENTRADE INDIA PVT LTD. (authorized distributor of Aquai)
- Address: Transport Nagar, Navagram, Rajkot – 360003, Gujarat, India
- Phone: +91 97060 41000 (render as tel: link `tel:+919706041000`)
- WhatsApp: +91 97060 41000 (link: `https://wa.me/919706041000` with a
  pre-filled message like "Hi, I'd like to inquire about Aquai products")
- Email: coregujarat@coreindia.co.in (render as `mailto:` link)
- Map embed: Google Maps for "Transport Nagar, Navagram, Rajkot, Gujarat 360003"
- Footer shows: distributor name, phone, email. Full address only on Contact page.

## Audience
Dealers & distributors, architects/interior designers, premium homeowners.

## Series & catalogue (data/products.json - already populated)
1. **Ultra Slim Shower K Series** (1) - Ultra Slim Shower, SS 202 Mirror
2. **Daizy Series** (10) - bath accessories, SS 304 (+ SS Grab Bar, SS 202 CP)
3. **Elite Series** (24) - 8 accessories × 3 finishes: Gold, Rose Gold, Chrome
4. **Brava Series** (6) - Matt Black accessories, SS 304
5. **Premium Series - SS304 Sinks** (3) - Satin, Glossy, Double-Bowl
6. **Shower & Bathroom Accessories** (25) - umbrella category, split into 4
   sub-groups on the category page:
   - Shower & Drainage (8): shower arms, floor trap drain, square line grating,
     cockroach trap, one pic fix jali, long drain channel
   - Fixing & Mounting Hardware (7): rack bolt kits, basin bolt kit, EWC kit,
     urinal clamp, brass nipples, wall mixer legs
   - Plumbing & Valves (6): waste couplings, pillar cock flange, CPVC ball valve,
     CP angle valve, sink waste coupling SS304
   - Sanitary & Cisterns (4): dual/single flush cisterns, smart seat cover,
     urinal spreader
   Products that come in multiple colours (Black / Gold / Rose Gold) have ONE
   product page each with an interactive colour selector - not separate URLs.
   Design/config options (e.g. "Line Design", "With Tiles Insert", sink
   "Regular" vs "Single Bowl with Drain Board") are NOT shown on the site: they
   live in `config_options` in products.json (internal, stored for reference
   only). Only colour is a customer-facing variant.
7. **Standard Series - SS Sinks** (1) - S.S. Sink Standard (Regular + Single
   Bowl with Drain Board listed as variants on one product page). Separate from
   Premium Sinks - different range.

Total: 70 products, 7 series/categories.


TODO in products.json: fill code_no / d_p / size / box_pkg per item from the
catalogue (internal fields - never displayed), series descriptions, choose ~6
`featured: true` products for the home page.

## Navigation structure
Header dropdown for "Series":
  Daizy | Elite | Brava | Ultra Slim Shower K
  Shower & Bathroom Accessories (links to category page with sub-group tabs/anchors)
  Premium Sinks | Standard Sinks

## Display scope (current)
Publicly shown per product: image, product_name, type, series, finish, and
colour variants. Nothing else.
Elite pages get a finish filter (Gold / Rose Gold / Chrome) + finish badge on cards.
Products with colour variants show a colour selector on the detail page (selecting
a colour tints the photo via CSS filter - indicative, since there are no per-colour
photos yet - and adds the colour to the enquiry message) plus swatch dots on cards.
Prices, codes, sizes, and `config_options` exist in data but are internal - see
CLAUDE.md privacy rules.

## Pages
1. **Home** - hero, featured series band (5 series), featured products, story teaser, inquiry CTA
2. **Products** (`/products/`) - all 44, client-side series filter (+ finish filter chip when Elite selected)
3. **Series** (`/series/[slug]/`) - intro + its products; Elite adds finish filter
4. **Product detail** (`/products/[slug]/`) - large image, name, type, series, finish,
   related products (same series, same finish preferred), inquiry CTA
5. **About** - company story, manufacturing quality, values
6. **Contact** - inquiry form (Web3Forms), plus all details from the "Contact details" section above: click-to-call phone, WhatsApp button, email link, address, map embed

## Navigation
Sticky header: Home, Products, Series (dropdown listing the 5), About, Contact + CTA.
Footer: series links, contact info.

## Build phases (execute one at a time)
- **Phase 0 - Scaffold:** create-next-app (TS, Tailwind, App Router), static-export
  config, design tokens, fonts, `lib/motion.ts`, place data/products.json +
  data/catalog.ts, write & RUN `scripts/generate-placeholders.mjs` so all 44
  product images + 5 series covers exist as placeholder .jpeg files.
  Verify `npm run build` outputs `out/`.
- **Phase 1 - Layout shell:** Header (sticky, scroll-aware), Footer, Section/Container
  primitives, page transition wrapper.
- **Phase 2 - Home page:** sets the design bar - polish fully.
- **Phase 3 - Product system:** listing + filters, series pages, product detail pages
  (generateStaticParams for all 44 + 5), related products, finish badges.
  Verify all 44 product pages exist in out/ and run the price-leak grep.
- **Phase 4 - About & Contact:** static pages + working form.
- **Phase 5 - Polish:** animation pass, SEO (metadata, OpenGraph, sitemap), 404,
  Lighthouse 90+, a11y audit.
- **Phase 6 - Deploy prep:** optimize images, verify out/ with `npx serve out`,
  `.htaccess`, DEPLOY.md with Hostinger steps.

## Real photo workflow (for the human, not Claude Code)
Drop photos into `public/products/<series-slug>/` named exactly as the product's
slug, e.g. `elite-towel-rack-gold.jpeg` - it instantly replaces the placeholder.
Get the exact expected filename list anytime: `node scripts/list-images.mjs`
(small script that prints every image path from products.json - create in Phase 0).

## Deployment (Hostinger shared)
Upload contents of `out/` to `public_html/`. `.htaccess`: 404 → /404.html,
cache headers for /_next/static and images.

## Success criteria
Premium feel, fast on mobile, any product in ≤2 clicks, zero internal data
(prices/codes) in the shipped site, frictionless inquiry.
