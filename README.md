# IconSpirit Indonesia — Landing Page

Marketing site for IconSpirit Indonesia (interior contractor & custom furniture, est. 2003).
Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**.

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
src/
  app/
    layout.tsx        # fonts, SEO metadata, LocalBusiness JSON-LD
    page.tsx          # section composition
    globals.css       # design tokens (colors, fonts) + reveal animation
    icon.svg          # favicon (brand monogram)
    sitemap.ts        # /sitemap.xml
    robots.ts         # /robots.txt
  components/         # Header, Hero, About, Services, Stats, ProjectGallery, Contact, Footer, WhatsAppFloat
  lib/
    site.ts           # brand + contact constants (edit here)
    projects.ts       # project data (names, categories, photo counts, copy)
public/
  images/             # OPTIMIZED web images only (generated — see below)
  logo.png / logo-light.png
scripts/
  optimize-images.mjs # regenerates public/images from the source masters
```

## Editing content

- **Contact details, WhatsApp number, address, socials** → `src/lib/site.ts`
- **Projects (names, blurbs, categories)** → `src/lib/projects.ts`
- **Services copy** → `src/components/Services.tsx`

## Contact form (email)

The form posts to the `/api/contact` route handler, which emails the enquiry to
the company inbox — the same behaviour as the old site's `sendmail.php`, but via
SMTP + nodemailer. It collects **name, email, phone, message** (with a hidden
honeypot field for spam).

Configure SMTP before it can send: copy `.env.local.example` → `.env.local` and
fill in `SMTP_HOST/PORT/USER/PASS` and `CONTACT_TO`. On Vercel, add the same
values as Environment Variables. Until configured, the form returns a friendly
"contact us on WhatsApp" message instead of crashing.

## Images

Full-resolution master photos are **kept outside this repo** in the sibling folder
`../iconspirit_source_assets/` (they total ~630 MB and should never be committed).
Only optimized WebP files live in `public/images/`.

To regenerate optimized images after adding/replacing masters:

```bash
node scripts/optimize-images.mjs
```

This resizes + converts everything to WebP (12–18 MB originals → ~80–140 KB each).

## ⚠️ Company profile video

The original site served a **414 MB** unoptimized `.mp4` — a major cause of the old
site's slow load. It is intentionally **not** bundled here. Host it externally
(YouTube, Vimeo, or Cloudflare Stream) and embed the player, or compress it with
ffmpeg to ~1080p first. The poster frame is already used as the backdrop of the
stats section (`public/images/video-poster.webp`).

## Deploy

Deploy to **Vercel** (zero-config for Next.js, global CDN). Update `site.url` in
`src/lib/site.ts` to the production domain so canonical URLs, sitemap, and Open
Graph tags are correct.
