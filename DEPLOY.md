# Deploy - Aquai Website

Static Next.js export → Hostinger shared hosting via FTP.

## One-time setup

### 1. Get FTP credentials from Hostinger
1. Log in at [hostinger.com](https://www.hostinger.com) → **Hosting**
2. Select your plan → **Files** → **FTP Accounts**
3. Create an FTP account (set directory to `/public_html`)
4. Copy: **FTP Host**, **FTP Username**, **FTP Password**

### 2. Create `.env.local`
```bash
cp .env.local.example .env.local
# Then edit .env.local with your actual credentials
```

### 3. Verify the deploy tool is built
```bash
cd D:\FounderMode\Apps\next-hostinger-cd
npm run build    # compiles src/ → dist/
```

---

## Deploying

### Build + deploy in one command
```bash
npm run build:deploy
```

### Or separately
```bash
npm run build       # exports static site to out/
npm run deploy      # uploads out/ to Hostinger via FTP
```

### Test locally before deploying
```bash
npm run build
npx serve out       # visit http://localhost:3000
```

---

## What gets deployed

`npm run build` produces `out/` containing:
- All HTML pages (44 product pages + 5 series pages + home/about/contact/products)
- `_next/static/` - hashed JS/CSS bundles
- `public/` assets copied verbatim: images, logo, hero, `.htaccess`

The `.htaccess` (from `public/.htaccess`) is automatically included and configures:
- Custom 404 → `/404.html`
- Cache headers: 1 yr for `_next/static`, 30 days for images, 1 hr for HTML
- Gzip compression

---

## Web3Forms (contact form)

Before going live, replace the placeholder key in [`components/contact/ContactForm.tsx`](components/contact/ContactForm.tsx):

1. Sign up free at [web3forms.com](https://web3forms.com)
2. Create an access key for your email address
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` on line 4 of `ContactForm.tsx`
4. Rebuild and redeploy

---

## Updating the site

To push updates after the initial deploy:
```bash
npm run build:deploy
```

FTP upload replaces files in place - no database or server restart needed.

---

## Real photos

Drop photos into `public/products/<series-slug>/` named exactly as the product slug (e.g., `elite-towel-rack-gold.jpeg`). Get the full expected filename list:
```bash
node scripts/list-images.mjs
```
Then rebuild and redeploy.
