# shohorab.com: AI project guide

> This is the guide for AI assistants and developers. The public-facing readme is `README.md`
> (keep it as it is). When the project changes, update **this** file.

Portfolio of **Shohorab H Shawon**, a Dhaka-based filmmaker, photographer and software engineer.
Live site: <https://shohorab.com>.

> **For AI assistants:** read this file (`AI-README.md`) first. It tells you where everything is, how the pieces
> connect, and which rules keep the site fast and on-theme. Every section stands on its own, so
> jump to what you need. Don't read whole large files when a `grep` for a marker is enough
> (see [Working efficiently](#working-efficiently-read-this-to-save-tokens)).

---

## 1. Stack at a glance

| Area | What is used | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router), **React 19** | Plain **JavaScript/JSX**. Only `sanity/**` and the studio route are TypeScript. |
| Styling | **Tailwind CSS 3.4** + `app/globals.css` | Mostly inline Tailwind with arbitrary values (`bg-[#1a1512]`, `[font-family:var(--font-display)]`). |
| Animation | **framer-motion 11** | `motion.*`, `whileInView`, `AnimatePresence`. |
| Smooth scroll | **@studio-freight/lenis 1.0.42** | Global, in `components/lenis.jsx`. Exposed as `window.lenis`. |
| CMS | **Sanity v4** (`next-sanity`) | Only for the **Journal** (blog). Studio is mounted at `/studio`. |
| Icons | `lucide-react`, `react-icons/fa` | Also `@heroicons/react` (theme toggle) and Font Awesome CSS (dev page). |
| Images | `next/image` + pre-optimized copies in `public/images/web` | See [Images](#7-images-videos-and-media). |
| Node | `engines: 24.x` (`.nvmrc` = 24) | |
| Path alias | `@/` = project root | e.g. `import SiteNavbar from '@/components/SiteNavbar'`. |

## 2. Commands

```bash
npm install
npm run dev               # local dev server (http://localhost:3000)
npm run build             # production build (runs `prebuild` first: git-lfs pull)
npm start                 # serve the production build
npm run lint              # ESLint (see known lint errors in §11)
npm run optimize:images   # make web copies + sizes for gallery photos (§7)
npm run logos:mono        # make single-colour client logos (§7)
```

**Before saying a change is done:** run `npm run lint` and `npm run build`. Both must pass with
no *new* errors.

## 3. Environment variables (`.env.local`, not committed)

| Variable | Used by | Required |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `sanity/env.ts` (Journal + Studio) | Yes, the build throws without it |
| `NEXT_PUBLIC_SANITY_DATASET` | `sanity/env.ts` | Yes |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `sanity/env.ts` | No (defaults to `2026-03-29`) |
| `NEXT_PUBLIC_STUDIO_PATH` | `next.config.mjs` rewrite | No (defaults to `studio`) |
| `NEXT_PUBLIC_MAIL_KEY` | contact forms on `/dev` themes | Only for the `/dev` contact forms |

Never print, commit or hard-code these values.

## 4. Routes

| URL | Source | What it is |
|---|---|---|
| `/` | `app/page.jsx` → `FilmmakerPhotographyTheme` | **Home.** Filmmaker portfolio: hero video, films, still frames, about, clients, contact. |
| `/photos` | `app/photos/page.jsx` → `DarkroomPhotographyTheme` | **Photo gallery ("The Darkroom").** Masonry contact sheet, filters, viewer. |
| `/clients` | `app/clients/page.jsx` | Client / collaboration list. |
| `/journal` | `app/journal/page.jsx` | Blog index (Sanity, ISR `revalidate = 120`). |
| `/journal/[slug]` | `app/journal/[slug]/page.jsx` | Blog post. |
| `/studio` | rewritten to `app/journal/studio/[[...tool]]/page.tsx` | Sanity Studio (CMS editor). |
| `/dev` | `app/dev/page.jsx` → `DevPortfolioClient.jsx` | Software-engineer portfolio with 3 switchable themes (`dev`, `studio`, `comic`/manga). Saved in `localStorage['homepage-theme']`. |
| `/photography` | `app/photography/page.jsx` | Redirects to `/photos`. |
| `/sitemap.xml`, `/robots.txt` | `app/sitemap.js`, `app/robots.js` | SEO. The sitemap includes Journal posts from Sanity. |

Legacy redirects (`next.config.mjs`): `/blog*` → `/journal*`, `/portfolio`, `/projects`,
`/web-projects`, `/ui-projects` → `/dev`, `/photography` → `/photos`, `/journal/studio*` → `/journal`.

## 5. File structure

```
.
├── app/
│   ├── layout.jsx                 # Root layout: metadata, JSON-LD, Poppins font, <LenisProvider>, next-themes <ThemeProvider>
│   ├── globals.css                # Base styles, Lenis CSS, journal colour tokens, keyframes (kenburns), scroll-margin for #sections
│   ├── page.jsx                   # HOME (server): reads video list (videoData + public/videos), loads Instrument Serif (--font-display)
│   ├── head.jsx                   # Legacy favicon links
│   ├── robots.js / sitemap.js     # SEO
│   ├── fonts/Poppins-Bold.ttf     # Local font (--font-poppins)
│   │
│   ├── photography/               # ⚠ Name is historical: holds code for BOTH the home page and /photos
│   │   ├── layout.jsx             # Only wraps the /photography redirect route
│   │   ├── page.jsx               # redirect('/photos')
│   │   ├── themes/
│   │   │   ├── filmmaker-theme/FilmmakerPhotographyTheme.jsx   # THE HOME PAGE UI (~1100 lines, see §8)
│   │   │   └── darkroom-theme/DarkroomPhotographyTheme.jsx     # /photos page logic: filter/search/sort state, URL ?photo= sync, viewer
│   │   └── components/
│   │       ├── photoData.js       # ALL gallery photos: { src, title, category } (+ width/height added from photoDimensions.json)
│   │       ├── photoDimensions.json # Generated by `npm run optimize:images`. Don't edit by hand.
│   │       ├── videoData.js       # ALL films: YouTube URL, title, description, links
│   │       ├── HeroSection.jsx    # /photos hero: "Still frames." + random fanned prints (opens viewer)
│   │       ├── CategoryFilter.jsx # /photos sticky search + sort + category "rolls"
│   │       ├── PhotoGallery.jsx   # /photos masonry "contact sheet" (film frames, develop-on-scroll, grease-pencil hover)
│   │       ├── PhotoViewer.jsx    # /photos full-screen viewer (swipe, auto-hiding controls, share, native fullscreen)
│   │       └── PhotographyFooter.jsx # /photos footer
│   │
│   ├── photos/page.jsx            # /photos route: loads Instrument Serif (--font-darkroom), renders DarkroomPhotographyTheme in <Suspense>
│   │
│   ├── clients/
│   │   ├── page.jsx               # /clients page (server component)
│   │   ├── clientData.js          # Clients: { name, image, logo (mono), type, number }
│   │   └── ClientsMotion.jsx      # framer-motion reveal wrappers for the clients page
│   │
│   ├── journal/                   # Blog (Sanity)
│   │   ├── page.jsx               # Index: GROQ query, filters, featured post
│   │   ├── [slug]/page.jsx        # Post page: Portable Text, TOC, related posts, share
│   │   ├── BlogChrome.jsx         # BlogHeader (= SiteNavbar variant="solid" + ThemeToggle), BlogFooter, AuthorAvatar
│   │   ├── JournalUI.jsx, BlogModernFilterBar.jsx, BlogMotionSection.jsx, BlogThemeShell.jsx,
│   │   │   QuoteOfDayCard.jsx (+ quotes.js), ReadingProgressBar.jsx, TableOfContents.jsx,
│   │   │   PostShareActions.jsx, BackToTopButton.jsx, readingTime.js
│   │   └── studio/[[...tool]]/page.tsx  # Sanity Studio
│   │
│   └── dev/
│       ├── page.jsx               # /dev metadata
│       └── DevPortfolioClient.jsx # Theme switcher that lazy-loads components/{dev,studio,manga}-theme/*
│
├── components/
│   ├── SiteNavbar.jsx             # ★ Shared navbar for /, /photos, /clients, /journal (see §8)
│   ├── lenis.jsx                  # LenisProvider (smooth scroll, window.lenis)
│   ├── ThemeToggle.jsx            # Light/dark toggle (next-themes). Used in the journal navbar.
│   ├── CurrentYear.jsx
│   ├── dev-theme/                 # /dev "dev" theme sections (Hero, Skills, WebProjects, UiProjects, Contact…)
│   ├── studio-theme/              # /dev "studio" theme sections
│   └── manga-theme/               # /dev "comic" theme sections
│
├── sanity/                        # Sanity config used by the Journal
│   ├── env.ts                     # Reads the NEXT_PUBLIC_SANITY_* env vars
│   ├── lib/client.ts, live.ts, image.ts
│   ├── schemaTypes/               # post, author, category, blockContent
│   └── structure.ts
├── sanity.config.ts, sanity.cli.ts
│
├── scripts/
│   ├── optimize-images.mjs        # public/images/* → public/images/web/*.jpg (≤2400px) + photoDimensions.json
│   ├── make-mono-logos.mjs        # public/brands/* → public/brands/mono/*.png (background removed, white + alpha)
│   └── pull-lfs.mjs               # `prebuild`: git lfs pull (videos are in LFS)
│
├── public/
│   ├── images/web/photoN.jpg      # Gallery photos (web copies). Originals are NOT kept in the repo.
│   ├── brands/*.jpg|png           # Client logos (originals, used on /clients)
│   ├── brands/mono/*.png          # Single-colour logos (generated, used on the home page)
│   ├── herocover.mp4              # Home hero background video (~16 MB)
│   ├── cover.jpeg / cover-web.jpg # Hero poster (cover-web is the 95 KB web copy, also the Open Graph image)
│   ├── shohorab1.JPG              # Portrait: navbar avatar, about section, /photos hero
│   ├── profile.jpg, about.*       # Older portraits (/dev, metadata)
│   ├── icons/, projects/          # /dev skill icons and project screenshots
│   ├── videos/                    # Optional local films (*.mov via Git LFS); auto-listed on the home page
│   └── Shohorab_Hossain_Shawon.pdf # CV
│
├── next.config.mjs                # redirects, /studio rewrite, image remotePatterns, cache headers, image minimumCacheTTL
├── tailwind.config.js             # marquee keyframes, journal colour tokens, fonts
├── eslint.config.mjs, jsconfig.json, tsconfig.json, postcss.config.(m)js
└── package.json
```

## 6. Design system: "film / darkroom" theme

The whole public site (home, photos, clients, navbar) shares one look: **a warm, dark film-camera
aesthetic**. Keep new UI inside it.

**Colours** (hard-coded as Tailwind arbitrary values, there are no CSS variables for these):

| Token | Hex | Use |
|---|---|---|
| Ink / deepest | `#0d0b0a` | Screening-room sections (work, /photos), viewer backgrounds |
| Base | `#1a1512` | Default page background |
| Surface | `#211914`, `#120f0d` | Alternate sections, cards |
| Text | `#f2efe9` | Main text (cream). Secondary text uses `text-white/40…70` |
| **Gold accent** | `#d6a85f` | Labels, highlights, buttons, hover states, active nav |
| Rec red | `#a74336` / `#c4473a` | Tiny "● REC" dots and the brand-mark corner square |

**Type:**
- Headlines: the default sans (Arial/Helvetica), `font-medium`, very tight tracking `tracking-[-0.05em]`.
- **Accent word in serif italic gold.** Instrument Serif, loaded per page:
  - **Home:** `--font-display` (from `app/page.jsx`), used like `[font-family:var(--font-display),Georgia,serif] italic text-[#d6a85f]`.
  - **/photos:** `--font-darkroom` (from `app/photos/page.jsx`).
  - **Examples:** "Films in *motion.*", "*loves.*", "Worked *with*", "Still *frames.*".
- Labels: `font-mono text-[10px] uppercase tracking-[0.2em–0.3em]`, often with a short line (`SectionLabel` → "Selected work / 01").

**Recurring motifs:**
- **Camera and film details:** viewfinder corner marks, a "● Rec / Now playing / Safelight on" pulse dot, film grain (radial-dot background at ~4–5% opacity), sprocket holes, "▸ 057" frame numbers, letterbox bars.
- **Shapes:** square corners (no big radii), thin `border-white/10–20` lines, gold borders on hover.
- **Section numbering** on the home page: 01 Work, 02 Frames, 03 About, 04 Collaborations, 05 Contact.

**Journal exception:** the Journal has its own light/dark palette (CSS variables
`--journal-*` in `globals.css`, Tailwind `journal-*` colours) and supports light mode via
`next-themes`. The rest of the site is dark-only.

## 7. Images, videos and media

- **Gallery photos:**
  - **Where they live:** `photoData.js` points to `/images/web/photoN.jpg`.
  - **Why web copies:** Next's image optimizer **refuses source files over 50 MB**, and very large originals made the live site slow. Every gallery image must be a web copy.
  - **Adding photos:**
    1. Put originals in `public/images/` named `photoN.jpg|png`, continuing the numbering (currently up to **photo109**).
    2. Run `npm run optimize:images`. This writes `public/images/web/photoN.jpg` (max 2400px) and regenerates `photoDimensions.json`.
    3. Add `{ src: '/images/web/photoN.jpg', title, category }` to the end of `photoData.js` (no descriptions).
    4. Optional: delete the originals afterwards (they are not kept in the repo).
  - **Real sizes:** `width`/`height` come from `photoDimensions.json`. The masonry gallery needs them to reserve space and avoid layout jumps.
  - **Categories** are derived from the photos, so a new category appears in the filter automatically. Current categories: Architecture, Cat, Conceptual, Flower, Nature, Nightscape, Sky, Street, Studio, Urban, Wildlife. *(He only photographs cats as animals, so don't create an "Animals" category.)*
- **Films:**
  - **Data:** `videoData.js` entries with `youtubeUrl`, `title`, `description`, and `links: [{label, url}]`.
  - **Thumbnails:** `app/page.jsx` builds the embed URL and thumbnails (`maxresdefault.jpg`, falling back to `hqdefault.jpg`; `FilmThumb` handles the fallback).
  - **Order:** the first entry is the featured "Now showing" film. The rest form "The reel".
  - **Local files:** `.mp4/.mov/.webm/.m4v` in `public/videos/` are auto-listed (LFS pointer files are skipped).
- **Client logos:**
  - **Adding a client:** add the logo to `public/brands/`, run `npm run logos:mono`, then add `{ name, image, logo: '/brands/mono/<name>.png', type, number }` to `clientData.js`.
  - **How they're shown:** the home page renders `logo` as a CSS `mask-image` so it can be tinted cream → gold. `/clients` still shows the original `image`.
- **Hero video:**
  - **File:** `public/herocover.mp4` (~16 MB). Re-encoding it to 1080p at about 3–5 MB would speed up the first load.
  - **Behaviour:** it pauses when off screen or when the tab is hidden (`HeroVideo`).
- **Remote images:** allowed hosts are listed in `next.config.mjs` → `images.remotePatterns`. YouTube stills use plain `<img>` (not `next/image`) on purpose.

## 8. How the main pieces work

### `components/SiteNavbar.jsx` (shared navbar)
- **Used by:**
  - **Home:** `<SiteNavbar onHome />`.
  - **/photos:** `<SiteNavbar />` in `DarkroomPhotographyTheme`.
  - **/clients:** `<SiteNavbar />`.
  - **/journal:** `<SiteNavbar variant="solid" actions={<ThemeToggle/>} />` via `BlogHeader`.
- **Links:** `SECTIONS` (Work, Frames, About) are home-page sections. They scroll on home (`scrollToId`) and link to `/#work` etc. elsewhere. `PAGES` (Photos, Clients, Journal) have icons (Aperture, Handshake, BookOpen).
- **Inner pages:** they show a "you are here" label under the brand name and a Home icon.
- **Variants:**
  - **`overlay` (default):** fixed, transparent until scrolled, so pages need top padding (`pt-16 md:pt-20`) or a hero that accounts for it.
  - **`solid`:** sticky and always dark (used in the journal because of light mode).
- **Height** is `h-16` / `md:h-20`. Sticky things below it use `top-16 md:top-20`. Scroll offsets use `-72`.
- **`scrollToId(id)`** is exported and handles Lenis plus the navbar offset. Reuse it instead of writing a new one.

### Home: `FilmmakerPhotographyTheme.jsx`
One large client component. **Find parts by these markers instead of reading the whole file:**

| Marker / function | What it is |
|---|---|
| `DISCIPLINES`, `SERVICES`, `SOCIALS`, `HERO_SOCIALS` | Content arrays at the top |
| `useOffscreenPause()` | Adds the `offscreen-paused` class (pauses CSS loops off screen) |
| `Timecode`, `HeroVideo`, `ViewfinderCorners`, `Marquee` | Hero helpers |
| `FilmThumb`, `FeaturedFilm`, `FilmReel` | Work section ("Now showing" + "The reel" with hover preview) |
| `VideoModal` | Film player modal (autoplay, prev/next, links with icons, Esc / ← →) |
| `{/* Hero */}`, `{/* Disciplines ticker */}`, `{/* Work */}`, `{/* Still frames film strip */}`, `{/* About */}`, `{/* Clients */}`, `{/* Contact / footer */}` | JSX sections in render order (ids: `top`, `work`, `frames`, `about`, `collaborations`, `contact`) |

The "Between the takes" film strip shows 12 random photos per visit, chosen after mount to avoid a hydration mismatch.

### /photos: `DarkroomPhotographyTheme.jsx` + components
- **State:** `selectedCategory`, `searchQuery`, `sortBy` → `displayedPhotos` → `PhotoGallery`.
- **Masonry:** each photo goes into the **shortest column** (left-to-right reading order). Columns are 2 / 3 / 4 by breakpoint (`useSyncExternalStore`).
- **URL:** `?photo=<src>` opens a photo. Old links with original names (`/images/photo12.png`) still resolve by file basename.
- **Client-only:** the page uses `useSearchParams`, so the theme renders on the client inside `<Suspense>`. Random hero prints therefore can't cause a hydration mismatch.
- **Viewer:**
  - **Phones:** swipe to navigate, no arrow buttons.
  - **Controls:** they auto-hide after 1.5 s. A tap shows them for 2.5 s, and another tap hides them instantly.

## 9. Performance rules (the site was laggy before; don't regress)

1. **No React state updates per animation frame.** Write to the DOM or CSS variables via refs (see `Timecode`, the `HeroSection` parallax and the `FilmReel` preview).
2. **Never add `backdrop-blur` or `mix-blend-*` over the hero video.** They get recomputed on every video frame.
3. **Infinite CSS animations must pause off screen:** wrap them with `useOffscreenPause()` (or the `offscreen-paused` / `.kenburns` rules in `globals.css`), and respect `motion-reduce`.
4. **Only web-sized images** go into galleries (see §7). Always give `next/image` a correct `sizes`.
5. **Reserve image space up front** (real aspect ratios) so nothing shifts while scrolling.
6. **Smooth scroll is Lenis.** Use `window.lenis.scrollTo(...)` or `scrollToId`. Don't add CSS `scroll-behavior: smooth`. Put `data-lenis-prevent` on scrollable overlays and call `window.lenis.stop()/start()` for modals.
7. **Clip-path gotcha:** an element hidden by its own `clip-path` never counts as "in view". Put `whileInView` on a parent and animate the child with variants (see the About portrait).
8. **Keep components out of render:** don't define components inside another component's render. Use plain render functions (see `renderSection` in `SiteNavbar`).

## 10. Conventions

- **Language:** JSX with function components and hooks. Add `'use client'` only when hooks or browser APIs are needed. Pages and metadata stay server-side where possible.
- **Imports:** use `@/` for root imports. Relative imports are fine inside a feature folder.
- **Styling:**
  - **Tailwind:** inline utility classes with arbitrary values; colours are written as hex (see §6).
  - **CSS files:** add global CSS to `app/globals.css` only for keyframes and cross-cutting rules.
- **Comments:** short, and explain *why*, matching the existing style.
- **Copy:** don't change visible text, content or the theme without being asked. The owner is protective of the wording.
- **Files:**
  - **Data:** keep data in `*Data.js` files.
  - **Generated files:** `photoDimensions.json`, `public/images/web/*` and `public/brands/mono/*` are produced by the scripts; regenerate them, don't hand-edit.
- **Commits:** the owner commits. Don't commit or push unless asked.

## 11. Known issues and gotchas

- **Existing lint errors:** `npm run lint` reports `react-hooks/set-state-in-effect` errors in `DarkroomPhotographyTheme.jsx` (the URL ↔ selected-photo sync). Treat them as known. Don't "fix" them by changing the viewer's behaviour unless asked.
- **Folder name:** `app/photography/` is a historical name. The home page theme lives there too.
- **Images over 50 MB** fail in `next/image`. Always use `public/images/web`.
- **YouTube stills:** some films are letterboxed, so even `maxresdefault.jpg` shows black bars. That's in the source video.
- **Slow dev server:** the project currently sits on an HDD (drive I:), which triggers Next's "slow filesystem detected" warning in `npm run dev`. Moving the repo to an SSD fixes it; it's not a code problem.
- **Journal needs Sanity env vars:** without them the build fails in `sanity/env.ts`.
- **`/dev`** is an older, separate portfolio with its own three themes. It doesn't use `SiteNavbar` or the film theme.

## Working efficiently (read this to save tokens)

1. **Start from the route table (§4) and file tree (§5).** Open only the file that owns the thing you're changing.
2. **Don't read large files whole:**
   - **`FilmmakerPhotographyTheme.jsx` (~1100 lines):** `grep` for the markers in §8, then read only that range.
   - **`photoData.js` (~570 lines of data):** grep for a `src` or `title`.
   - **`app/journal/[slug]/page.jsx` (~650 lines).**
3. **Never open `public/` binaries** or `package-lock.json`. To see photos, render small thumbnails with `sharp` (already installed with Next).
4. **For UI checks:** build (`npm run build`), `npx next start -p <port>`, and take screenshots with a headless browser. Stop only the server you started (by port), never all Node processes.
5. **Reuse what exists:** `scrollToId`, `SectionLabel`, `useOffscreenPause`, `FilmThumb`, `SiteNavbar`, and the colour and type patterns in §6.
