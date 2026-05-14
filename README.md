# AvocadoDentist.com — Downtown Dental Studio

High-performance, SEO-optimized dental practice website for Dr. Richard J Gill and Downtown Dental Studio in Fallbrook, CA. Built as a static site deployed globally on Cloudflare's edge network.

**Live:** https://avocadodentist.com

---

## Tech Stack & Rationale

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | [Astro 6](https://astro.build) | Zero-JS by default. Ships pure HTML/CSS — perfect for content sites where every kilobyte matters. Pages score 99–100 on Lighthouse. |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first, tree-shaken at build time. No unused CSS shipped to users. Custom `@theme` variables map directly to the brand palette. |
| **Hosting** | [Cloudflare Pages](https://pages.cloudflare.com) | Global CDN, free tier, instant cache invalidation on deploy. Built-in analytics, DDoS protection, and automatic HTTP/3. |
| **CI/CD** | GitHub → Cloudflare Pages | `git push main` triggers build + deploy. No manual steps. |
| **Images** | WebP with JPG fallback | `<picture>` elements serve modern WebP to supporting browsers, JPG to legacy. Images are resized and compressed at build time. |
| **Node** | ≥22.12 LTS | Astro 6 minimum requirement. |

## Why Astro over WordPress / Next.js / plain HTML?

- **WordPress** — Dynamic PHP means database queries on every request, plugin bloat, security patches, and slower page loads. A dental practice site doesn't need a CMS server — the content changes maybe once a month.

- **Next.js / React SPA** — Ships a JavaScript runtime (70KB+) for interactivity this site doesn't need. No cart, no auth, no real-time updates. Astro renders to static HTML at build time so users download exactly zero framework JS.

- **Plain HTML** — No component reuse, no layout inheritance, no build-time optimizations (image compression, CSS tree-shaking, sitemap generation). Hand-maintaining 18 pages of raw HTML is brittle.

**Astro gives us: component architecture, build-time optimization, and 0KB of JavaScript shipped to the client** — the best of all worlds for a content/marketing site.

## Architecture

```
src/
├── pages/              # File-based routing — each .astro = one URL
│   ├── index.astro     # Homepage (hero, trust bar, services grid, tour, CTA)
│   ├── about.astro     # Dr. Gill bio, practice philosophy
│   ├── contact.astro   # Phone, address, map, hours
│   ├── services/       # 6 service landing pages (one per procedure)
│   │   ├── index.astro
│   │   ├── general-dentistry.astro
│   │   ├── cosmetic-dentistry.astro
│   │   ├── dental-implants.astro
│   │   ├── invisalign.astro
│   │   ├── root-canals-crowns.astro
│   │   └── emergency-dentistry.astro
│   ├── blog/           # 5 SEO-optimized articles + blog index
│   ├── patient-info.astro
│   └── memberships.astro
├── components/
│   ├── Header.astro    # Nav, logo, mobile menu
│   ├── Footer.astro    # Contact, hours, links
│   └── Schema.astro    # JSON-LD structured data (Dentist, LocalBusiness)
├── layouts/
│   ├── Layout.astro    # Base layout — <head> SEO tags, OG, Twitter cards
│   └── BlogLayout.astro
└── styles/
    └── global.css      # Tailwind v4 theme, brand tokens, utility classes
```

## SEO Features (built-in)

| Feature | Implementation |
|---------|---------------|
| **JSON-LD Structured Data** | `Schema.astro` injects `Dentist`, `LocalBusiness`, and `FAQ` schema — helps Google show rich results (star ratings, hours, address) |
| **Open Graph + Twitter Cards** | Every page auto-generates `og:title`, `og:description`, `og:image`, `twitter:card` from frontmatter |
| **Canonical URLs** | Self-referencing canonicals on every page — prevents duplicate content penalties |
| **Auto-generated Sitemap** | `@astrojs/sitemap` builds `sitemap.xml` at deploy time — submitted to Google Search Console |
| **Semantic HTML** | Proper heading hierarchy (`h1` → `h2` → `h3`), landmark regions (`<main>`, `<nav>`, `<footer>`), descriptive alt text on all images |
| **Mobile-first** | Tailwind responsive utilities. All pages pass Google Mobile-Friendly Test. |
| **Performance** | 0KB JS shipped. Static HTML served from Cloudflare edge. Lighthouse 99–100 on Performance. |

### For Marketers & SEO Agencies

**Things already done:**
- Local schema markup (name, address, phone, geo coordinates) — Google uses this for the local 3-pack and Knowledge Panel
- Service-specific landing pages (one page per procedure, not one giant "Services" page) — better keyword targeting
- Blog with 5 geo-targeted posts (e.g., "Emergency Dentist Fallbrook CA — What to Do")
- Fast-loading pages (Core Web Vitals pass) — confirmed ranking factor

**Things you can extend without a developer:**
- Edit page copy: open any `.astro` file in `src/pages/`, find the text, edit it. The HTML structure and design won't break.
- Add blog posts: duplicate any file in `src/pages/blog/`, rename it, edit the content. It auto-appears in the blog index.
- Replace images: drop a new photo in `public/images/`, update the `<img src="/images/...">` reference.

**Things a developer should handle:**
- Adding Google Analytics / Tag Manager (<1 hour)
- Setting up Google Search Console verification (<10 minutes)
- Creating a Google Business Profile and linking it to the schema markup
- Setting up call tracking numbers

## Local Development

```bash
# Clone
git clone git@github.com:thebossnow/avocado-dentist.git
cd avocado-dentist

# Install
npm install

# Dev server (hot reload)
npm run dev
# → http://localhost:4321

# Production build
npm run build
# → dist/ (static files ready for deployment)

# Preview production build locally
npm run preview
```

## Deployment

Every push to `main` triggers Cloudflare Pages to run:

```bash
npm run build   # → dist/
```

Cloudflare then deploys `dist/` to their global CDN. Total deploy time: ~30 seconds.

To deploy manually via CLI:

```bash
npx wrangler pages deploy dist/ --project-name avocado-dentist --branch main --commit-dirty=true
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `astro` | Static site generator |
| `@astrojs/sitemap` | Auto `sitemap.xml` generation |
| `@tailwindcss/vite` | Tailwind CSS 4 Vite plugin |
| `tailwindcss` | Utility CSS framework |
| `wrangler` | Cloudflare Pages CLI (dev only) |

---

*Built for speed. Optimized for search. Designed to convert.*
