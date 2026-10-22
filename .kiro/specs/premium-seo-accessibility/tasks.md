# Implementation Plan

## Overview

This plan implements the Premium SEO & Accessibility bugfix for the Ranjeet Singh Patel hotel portfolio (React 19 + Vite + Tailwind v4 + Framer Motion). It follows the exploratory bugfix workflow: first surface counterexamples on unfixed code (Property 1: Bug Condition), then capture existing correct behavior to preserve (Property 2: Preservation), then implement the fix across all 12 design areas, and finally verify the exploration tests pass and preservation tests still pass. The fix adds unique per-route metadata via a dependency-free `useDocumentMeta` hook, restores keyboard focus visibility, completes the accessible mobile navigation with a focus trap, guarantees semantic headings/landmarks, repairs the sitemap/social-preview/robots surface, fixes image honesty, verifies color contrast, and moves the 404 page into the shared layout with a `noindex` directive — all without altering the existing luxury navy-and-gold visual identity, animations, glassmorphism, theme system, or verified contact details.

## Tasks

- [ ] 1. Write bug condition exploration tests
  - **Property 1: Bug Condition** - Per-Route Metadata, Focus, Mobile Menu, Landmarks, Crawler/Social, Images, 404, and Contrast
  - **CRITICAL**: These tests MUST FAIL on unfixed code — failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: These tests encode the expected behavior — they will validate the fix when they pass after implementation
  - **GOAL**: Surface counterexamples that demonstrate each bug surface exists
  - Set up test infrastructure (the project has no test framework):
    - Install devDependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`
    - Create `vitest.config.js` with `test.environment: 'jsdom'` and `setupFiles` pointing to a setup file that imports `@testing-library/jest-dom`
    - Add `"test": "vitest --run"` script to `package.json`
    - Create `test/setup.js` importing `@testing-library/jest-dom`
  - Write exploration tests covering each `isBugCondition` kind from the design:
    - **Route metadata test** (`test/explore/routeMeta.test.jsx`): render each page (`AboutPage`, `ExperiencePage`, `ProjectsPage`, `ContactPage`) in a `MemoryRouter`; assert `document.title` is set but `meta[name=description]`, `link[rel=canonical]`, `meta[property="og:title"]`, and `meta[name="twitter:card"]` remain equal to the static `index.html` Home values (not route-specific) — will FAIL the route-specific expectation
    - **Focus visibility test** (`test/explore/focus.test.js`): read `src/styles/index.css` and assert NO global `:focus-visible` rule exists; render `ThemeToggle`, `WhatsAppButton`, and `Navbar`; assert the rendered elements lack `focus-visible:ring-*` class utilities — will FAIL the visible-focus expectation
    - **Mobile menu test** (`test/explore/mobileMenu.test.jsx`): render `Navbar`, open the mobile menu by clicking the toggle; assert the toggle button has NO `aria-expanded` attribute, NO `aria-controls` attribute; assert the menu container has NO `role="dialog"` and NO `aria-modal`; assert Tab key can move focus outside the menu (no trap); assert pressing Escape does NOT close the menu — will FAIL on unfixed code
    - **Landmarks test** (`test/explore/landmarks.test.jsx`): render `MainLayout`; assert there is NO skip-to-main link; assert `<main>` has NO `id` attribute; assert the desktop `<nav>` has NO `aria-label`; assert the mobile menu is NOT a labeled nav/dialog. Separately, render each route page and assert there IS exactly one `h1` (expected to PASS — confirms the heading hypothesis is correct, so no h1 fix is needed)
    - **Crawler/social test** (`test/explore/crawler.test.js`): read `public/sitemap.xml` as text and assert `lastmod` values are `2024-01-01` (stale); read `index.html` and assert `og:image` and `twitter:image` use the relative path `/images/ranjeet/profile.png` and there is NO dedicated `og-image` reference — will FAIL on unfixed code
    - **Image honesty test** (`test/explore/images.test.js`): import `journeyHotels` from `src/data/projects.js`; assert each entry's `image` references a `.webp` file under `/images/ranjeet/` that does NOT exist on disk; assert each entry has a `fallbackImage` pointing to a stock photo (`hotel_exterior.jpg`, `hotel_suite.jpg`, etc.) while `alt` names a specific real property — will FAIL the honesty expectation
    - **404 test** (`test/explore/notfound.test.jsx`): render `AppRoutes` with a `MemoryRouter` routed to `*`; assert `NotFound` renders WITHOUT a `Navbar`, `Footer`, or `WhatsAppButton` (i.e., outside `MainLayout`); assert no `meta[name=robots]` with `noindex` is set — will FAIL on unfixed code
    - **Contrast test** (`test/explore/contrast.test.js`): extract the opacity values used in low-opacity text variants (`/50`, `/60`, `/30`, etc.) from the component source files; compute WCAG contrast ratios for each text-on-background pair using the theme color values (`--color-ivory` `#f5f0e1`, `--color-gold` `#c9a84c`, `--color-navy` `#0a1628`); assert at least one pair FAILS the AA threshold (4.5:1 for normal text, 3:1 for large text) — will FAIL on unfixed code
  - Run all exploration tests on UNFIXED code: `npm run test`
  - **EXPECTED OUTCOME**: Tests FAIL (this is correct — it proves the bugs exist)
  - Document the counterexamples found in a `test/explore/COUNTEREXAMPLES.md` file (e.g., "About page serves Home meta description", "Mobile menu toggle has no aria-expanded", "journeyHotels[0].image references non-existent hotel-the-ideal.webp with stock fallback", "Footer text-[var(--color-ivory)]/50 at 9px fails AA on navy")
  - Mark task complete when tests are written, run, and failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11_

- [ ] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Visual Identity, Animations, Theme, Reduced-Motion, Contact Form A11y, Verified Data, and Phase 1-3 Features
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (cases where `isBugCondition` returns false)
  - Write property-based and observational tests capturing existing correct behavior:
    - **Contact form a11y preservation** (`test/preserve/contactForm.test.jsx`): render `Contact`; assert each input has a label (`aria-labelledby` or wrapping `<label>`), `aria-required` on required fields, and the submission feedback flow elements exist — unchanged from original
    - **ThemeToggle/WhatsApp a11y preservation** (`test/preserve/labels.test.jsx`): render `ThemeToggle` and `WhatsAppButton`; assert `aria-label` and `sr-only` label text are present and match the original; assert reduced-motion handling (the `useReducedMotion` hook is called or a `prefers-reduced-motion` guard exists in the component)
    - **Hero eager loading preservation** (`test/preserve/hero.test.jsx`): render `Hero`; assert the `SafeImage` for the profile photo receives `loading="eager"` — unchanged from original
    - **Button focus-visible ring preservation** (`test/preserve/button.test.jsx`): render `Button`; assert it ALREADY has `focus-visible:ring-*` utility classes (already correct — must remain after fix)
    - **Visual identity / theme token preservation** (`test/preserve/theme.test.js`): read `src/styles/index.css`; assert the CSS custom property values (`--color-navy: #0a1628`, `--color-gold: #c9a84c`, `--color-ivory: #f5f0e1`, `--color-charcoal`, `--color-navy-light`, `--color-navy-mid`, `--color-gold-light`, `--color-muted`) are unchanged; assert `glass-card` class definition exists
    - **Verified data preservation** (`test/preserve/profileData.test.js`): import `profile` from `src/data/profile.js`; assert `profile.phone` equals `+91 8707015028` and `profile.email` equals `ranjeetsinghkushinagar2@gmail.com`; assert no fictional contact details, fake awards, or unverified dates exist in the data file
    - **Home section composition preservation** (`test/preserve/homeSections.test.jsx`): render `Home`; assert it renders `Hero`, `About`, `Expertise`, `Experience`, `Projects`, `Achievements`, and `Contact` sections (all seven present)
    - **Framer Motion / reduced-motion preservation** (`test/preserve/animations.test.jsx`): render `Hero` and `AboutPage`; assert Framer Motion `motion.*` elements are present; assert `useReducedMotion` is imported and used in components that animate
  - Run tests on UNFIXED code: `npm run test`
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

- [ ] 3. Fix for SEO and accessibility deficiencies

  - [ ] 3.1 Create centralized SEO data module
    - Create `src/data/seo.js`
    - Define `SITE_URL` = `import.meta.env.VITE_SITE_URL || 'https://ranjeetsinghpatel.com'` (configurable production domain with fallback default)
    - Define `OG_IMAGE` = `${SITE_URL}/images/og-image.jpg` (absolute URL to the dedicated 1200×630 social preview asset)
    - Define `ROUTE_SEO` map keyed by route path: `/`, `/about`, `/experience`, `/projects`, `/contact`, and a `notFound` entry
    - Each entry: `{ title, description, path, robots, type, ogTitle, ogDescription, keywords }` where canonical is `${SITE_URL}${path}`, og/twitter URL is `${SITE_URL}${path}`, og/twitter image is `OG_IMAGE`
    - Use verified profile keywords naturally (Hotel General Manager, Hospitality Operations, Guest Experience, Hotel Management, Kushinagar) without keyword stuffing; only verified facts (no fake awards, unverified dates, or TODO notes)
    - Home entry mirrors the current `index.html` metadata values so the static fallback and runtime values agree
    - 404 entry sets `robots` to `noindex, follow`
    - Acceptance: `SITE_URL` is configurable via env var; `OG_IMAGE` is an absolute URL; every `ROUTE_SEO` entry produces an absolute canonical; the `notFound` entry has `robots: 'noindex, follow'`; no fictional data appears
    - _Bug_Condition: isBugCondition({ kind: "crawler-social" }) where staleSitemapDates() OR hardcodedUnconfigurableDomain() OR relativeOgImageUrl() OR noDedicatedSocialPreviewAsset()_
    - _Expected_Behavior: expectedBehavior({ kind: "crawler-social" }) — current sitemap dates, configurable domain, absolute dedicated og image_
    - _Preservation: 3.7 — verified centralized profile/contact data remains the source; no fictional contact details introduced_
    - _Requirements: 2.2, 2.3, 2.7_

  - [ ] 3.2 Create useDocumentMeta hook
    - Create `src/hooks/useDocumentMeta.js`
    - `useDocumentMeta(meta)` accepts a `ROUTE_SEO` entry (or a plain meta object) and imperatively sets/updates `<head>` tags in a `useEffect`:
      - `document.title`
      - `meta[name="description"]`, `meta[name="robots"]`, `meta[name="keywords"]`
      - `link[rel="canonical"]`
      - og:* tags (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`)
      - twitter:* tags (`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`)
    - Create missing tags if they don't exist; update existing ones by `name`/`property` attribute match
    - On unmount, restore the Home/default values so the static fallback is never left stale on a different route
    - No third-party dependency (React 19-safe, imperative DOM)
    - Acceptance: given a `ROUTE_SEO` entry, `document.title` and all listed meta/link tags are created or updated to route-specific values; on unmount, Home values are restored
    - _Bug_Condition: isBugCondition({ kind: "route-render" }) where NOT hasRouteSpecificMetadata(route)_
    - _Expected_Behavior: expectedBehavior({ kind: "route-render" }) — hasRouteSpecificMetadata(route) is true (unique title/description/canonical/robots/og/twitter)_
    - _Preservation: 3.10 — previous features operate without regression; hook does not alter existing component rendering_
    - _Requirements: 2.1, 2.2_

  - [ ] 3.3 Create useFocusTrap hook
    - Create `src/hooks/useFocusTrap.js`
    - `useFocusTrap(ref, active)` accepts a container ref and an active boolean
    - When `active` becomes true: move focus to the first focusable element in the container; trap Tab/Shift+Tab within the container (wrap around to last/first); handle Escape to close (return a close handler or wire a window `keydown` listener)
    - When `active` becomes false (menu closes): restore focus to the element that had focus before the trap activated (the toggle button)
    - Query focusable elements using a selector for `a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])`
    - Clean up all event listeners on unmount/deactivation
    - Acceptance: when active, focus moves to the first item, Tab/Shift+Tab stays within the container, Escape closes, and focus returns to the toggle; when inactive, no behavior
    - _Bug_Condition: isBugCondition({ kind: "mobile-menu" }) where NOT (toggleHasAriaExpanded AND toggleHasAriaControls AND menuHasFocusTrap AND menuClosesOnEscape AND menuRestoresFocus)_
    - _Expected_Behavior: expectedBehavior({ kind: "mobile-menu" }) — focus trap, Escape-close, and focus restoration all hold_
    - _Preservation: 3.4, 3.8 — theme toggle and reduced-motion handling preserved; no changes to existing toggle styling_
    - _Requirements: 2.5_

  - [ ] 3.4 Wire route pages to useDocumentMeta and move NotFound into MainLayout
    - Replace the existing `useEffect(() => { document.title = ...; window.scrollTo(0,0); }, [])` in each page with a call to `useDocumentMeta(ROUTE_SEO['/path'])`:
      - `Home.jsx` → `useDocumentMeta(ROUTE_SEO['/'])`
      - `AboutPage.jsx` → `useDocumentMeta(ROUTE_SEO['/about'])`
      - `ExperiencePage.jsx` → `useDocumentMeta(ROUTE_SEO['/experience'])`
      - `ProjectsPage.jsx` → `useDocumentMeta(ROUTE_SEO['/projects'])`
      - `ContactPage.jsx` → `useDocumentMeta(ROUTE_SEO['/contact'])`
    - Keep `window.scrollTo(0, 0)` calls where they exist (preserve scroll-to-top behavior)
    - `NotFound.jsx`: call `useDocumentMeta(ROUTE_SEO.notFound)` (sets `robots: 'noindex, follow'`); remove `min-h-screen` full-screen chrome since the layout now provides header/footer; keep the centered 404 content inside a `<section>`
    - `AppRoutes.jsx`: move the `*` route inside `MainLayout` + `PageTransition` like the other routes so NotFound renders with the shared header/nav/footer
    - Acceptance: each route sets unique metadata via the hook; NotFound renders inside MainLayout; NotFound sets `noindex, follow`; all five standard routes still render correctly within MainLayout
    - _Bug_Condition: isBugCondition({ kind: "route-render" }) AND isBugCondition({ kind: "not-found" }) where rendersOutsideSharedLayout OR NOT hasNoindexDirective_
    - _Expected_Behavior: expectedBehavior({ kind: "route-render" }) AND expectedBehavior({ kind: "not-found" }) — renders inside MainLayout with noindex, follow_
    - _Preservation: 3.2, 3.9, 3.10 — Home sections, career highlight, and Phase 1-3 features render unchanged; no content changes_
    - _Requirements: 2.1, 2.2, 2.9_

  - [ ] 3.5 Update index.html static fallback
    - Update `og:image` from the relative `/images/ranjeet/profile.png` to the absolute `${SITE_URL}/images/og-image.jpg` URL (crawlers without JS see the dedicated asset)
    - Update `twitter:image` to the same absolute `og-image.jpg` URL
    - Keep all other static tags as the Home fallback (the runtime hook overrides per route for JS-capable clients)
    - Add an `og:image:alt` meta tag describing the social preview
    - Add an `og:image:width` and `og:image:height` tag (1200×630) for proper social card rendering
    - Acceptance: `og:image` and `twitter:image` are absolute URLs to the dedicated og-image asset; `og:image:alt` exists; no relative image paths remain in og/twitter tags
    - _Bug_Condition: isBugCondition({ kind: "crawler-social" }) where relativeOgImageUrl() OR noDedicatedSocialPreviewAsset()_
    - _Expected_Behavior: expectedBehavior({ kind: "crawler-social" }) — absolute dedicated og image_
    - _Preservation: 3.1 — all other index.html content (fonts, favicon, theme-color, canonical) unchanged_
    - _Requirements: 2.3_

  - [ ] 3.6 Add global focus-visible CSS and component focus rings
    - Add a global keyboard-only focus fallback in `src/styles/index.css`:
      `:focus-visible { outline: 2px solid var(--color-gold); outline-offset: 2px; }`
    - Mouse focus is unaffected because `:focus-visible` only matches keyboard focus
    - Add `focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]` to these components (matching the existing `Button.jsx` pattern):
      - `ThemeToggle.jsx` — the toggle button
      - `WhatsAppButton.jsx` — the floating button
      - `Navbar.jsx` — desktop nav links, mobile toggle button, call link, CV download link, mobile menu links, mobile call link, mobile CV link
      - `Footer.jsx` — footer links and scroll-to-top button
      - `Projects.jsx` — filter buttons and expand/collapse buttons
      - `NotFound.jsx` — the home/back buttons
      - `Hero.jsx` — the hero scroll link
    - `Contact.jsx`: keep the existing border change and add `focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]` alongside the existing `focus:outline-none` so keyboard focus is clearly visible
    - `Button.jsx`: add `focus-visible:ring-offset-[var(--color-navy)]` so the existing ring offset matches the theme background
    - No `tabindex` changes; DOM order already provides a logical tab order
    - Acceptance: keyboard focus on every interactive element shows a visible gold ring; mouse clicks show no focus ring; existing `Button.jsx` ring behavior is unchanged
    - _Bug_Condition: isBugCondition({ kind: "focus" }) where elementIn(X.element, INTERACTIVE_ELEMENTS) AND NOT hasVisibleFocusIndicator(X.element)_
    - _Expected_Behavior: expectedBehavior({ kind: "focus" }) — hasVisibleFocusIndicator(element) is true (gold focus-visible ring)_
    - _Preservation: 3.4, 3.5, 3.6 — ThemeToggle/WhatsApp aria-labels, sr-only labels, and contact form labels/aria-required/aria-invalid are unchanged; only focus styling is added_
    - _Requirements: 2.4_

  - [ ] 3.7 Mobile menu accessibility — wire useFocusTrap and ARIA into Navbar
    - Toggle button: add `aria-expanded={mobileOpen}` and `aria-controls="mobile-menu"`; make the `aria-label` dynamic (`mobileOpen ? 'Close menu' : 'Open menu'`)
    - Menu container (`motion.div`): add `id="mobile-menu"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Site navigation"`
    - Wrap the link list inside the menu in a `<nav aria-label="Mobile">` so it is a labeled landmark
    - Integrate `useFocusTrap(menuRef, mobileOpen)` to move focus to the first menu item on open, trap Tab/Shift+Tab within the menu, close on Escape, and restore focus to the toggle on close
    - Ensure the menu closes on route change (NavLink `onClick` already sets `mobileOpen(false)`); verify Escape also closes and restores focus
    - Add the `focus-visible:ring-*` utilities to the mobile menu links (part of task 3.6, verify here)
    - No `role="button"` on real `<button>` elements (no redundant ARIA)
    - Acceptance: toggle exposes `aria-expanded`/`aria-controls`; menu has dialog role with aria-modal; focus is trapped while open; Escape closes and restores focus to the toggle; `aria-expanded` toggles correctly on open/close
    - _Bug_Condition: isBugCondition({ kind: "mobile-menu" }) where NOT (toggleHasAriaExpanded AND toggleHasAriaControls AND menuHasFocusTrap AND menuClosesOnEscape AND menuRestoresFocus)_
    - _Expected_Behavior: expectedBehavior({ kind: "mobile-menu" }) — aria-expanded, aria-controls, focus trap, Escape-close, and focus restoration all hold_
    - _Preservation: 3.2, 3.8 — Framer Motion animations for the menu are preserved; reduced-motion handling preserved; menu visual design unchanged_
    - _Requirements: 2.5_

  - [ ] 3.8 Heading hierarchy and landmarks
    - `MainLayout.jsx`: add `id="main-content"` to the `<main>` element; add a visually-hidden "Skip to main content" skip link as the first focusable element (styled to be visible on focus, using an off-screen technique that moves into view on `:focus`)
    - `Navbar.jsx`: add `aria-label="Primary"` to the desktop `<nav>` element
    - `SectionHeading.jsx`: accept an optional `id` prop and render it on the `h2` element so sections can be targeted with `aria-labelledby`
    - Add `aria-labelledby` to the main section wrappers that currently lack it (reference the `SectionHeading` `id`)
    - `Footer.jsx`: add `aria-label="Site footer"` to the `<footer>` element
    - Verify heading hierarchy: confirm exactly one `h1` per route already exists (Hero h1 on Home; banner h1 on About/Experience/Projects/Contact; h1 on NotFound); `SectionHeading` stays `h2`; card titles stay `h3`/`h4`; verify no skipped heading levels remain
    - Acceptance: skip link is the first focusable element and jumps to `#main-content`; `<main>` has `id="main-content"`; desktop nav has `aria-label="Primary"`; footer has `aria-label="Site footer"`; each route has exactly one `h1`; no skipped heading levels
    - _Bug_Condition: isBugCondition({ kind: "headings" }) where NOT (exactlyOneH1 AND orderedSubheadings AND hasLandmarks)_
    - _Expected_Behavior: expectedBehavior({ kind: "headings" }) — exactly one h1, ordered subheadings, labeled landmarks, skip link present_
    - _Preservation: 3.1, 3.2 — visual identity and section composition unchanged; only attributes and the skip link are added_
    - _Requirements: 2.6_

  - [ ] 3.9 Update sitemap.xml and robots.txt
    - `public/sitemap.xml`: update each `<lastmod>` to a current, accurate date; keep only the five real routes (`/`, `/about`, `/experience`, `/projects`, `/contact`); do NOT add the `*`/404 route (which is `noindex`); use the production domain consistently with `SITE_URL`
    - `public/robots.txt`: keep `Allow: /` and the `Sitemap:` line; ensure the domain matches `SITE_URL`
    - Verify no broken links or nonexistent routes are listed (all five routes exist in `AppRoutes.jsx`)
    - Add a code comment in `src/data/seo.js` documenting that the sitemap/robots domain is centralized in `SITE_URL` and optionally injectable via `VITE_SITE_URL` at build time
    - Acceptance: sitemap has current `lastmod` dates (not 2024-01-01); domain matches `SITE_URL`; only five real routes listed; robots sitemap URL matches `SITE_URL`
    - _Bug_Condition: isBugCondition({ kind: "crawler-social" }) where staleSitemapDates() OR hardcodedUnconfigurableDomain()_
    - _Expected_Behavior: expectedBehavior({ kind: "crawler-social" }) — current sitemap dates, configurable domain_
    - _Preservation: 3.7 — verified route paths unchanged; no fictional routes added_
    - _Requirements: 2.7_

  - [ ] 3.10 Create dedicated social preview asset
    - Create a dedicated `public/images/og-image.jpg` at 1200×630 dimensions (brand navy background, gold accent, name "Ranjeet Singh Patel", public title "Hotel General Manager", hotel "Hotel The Ideal", location "Kushinagar")
    - Provide an `og-image.svg` source file in `public/images/` as a designable starting point (for future raster export); reference the JPG (not SVG) for og/twitter since most platforms reject SVG for social previews
    - The `og-image:alt` text (set in `src/data/seo.js` and `index.html`) describes the preview: "Ranjeet Singh Patel — Hotel General Manager at Hotel The Ideal, Kushinagar"
    - Verify the asset is referenced via the absolute `OG_IMAGE` URL in both the runtime hook (via `ROUTE_SEO`) and the static `index.html` (from task 3.5)
    - Acceptance: `public/images/og-image.jpg` exists at 1200×630; `og-image.svg` source exists; og/twitter tags reference the absolute URL to this asset; `og:image:alt` is set
    - _Bug_Condition: isBugCondition({ kind: "crawler-social" }) where noDedicatedSocialPreviewAsset()_
    - _Expected_Behavior: expectedBehavior({ kind: "crawler-social" }) — absolute dedicated og image at recommended dimensions_
    - _Preservation: 3.1 — brand navy-and-gold visual identity maintained in the social preview; no existing images altered_
    - _Requirements: 2.3_

  - [ ] 3.11 Image SEO and honesty
    - `src/data/projects.js`: set `fallbackImage: null` for all four `journeyHotels` entries so `SafeImage` renders the branded `Building2` placeholder (honest, on-brand, no false photo) instead of a stock photo presented as the actual hotel; keep `alt` descriptive (e.g., "Hotel The Ideal, Kushinagar — property listing card")
    - `src/pages/AboutPage.jsx`: for `propertyShowcase` entries that reference non-existent `.webp` files, either set `fallbackImage: null` (use branded placeholder) or update `alt`/`title` to clearly read as an illustrative hospitality environment (not the specific hotel); recommend the placeholder for consistency
    - `src/components/ui/SafeImage.jsx`: add `decoding="async"` to the `<img>` element; where the container has a known aspect ratio, pass intrinsic `width`/`height` attributes to reduce CLS; keep `loading` default `lazy` and the Hero `loading="eager"` unchanged
    - Verify every `SafeImage` call site passes a descriptive, non-empty `alt` (audit confirmed all call sites pass `alt`; no raw `<img>` exists outside `SafeImage`)
    - Verify the hero image is NOT lazy-loaded (still `loading="eager"`)
    - Acceptance: hotel cards render the branded placeholder (no stock-as-real photos); all images have non-empty descriptive `alt`; hero image loads eagerly; below-the-fold images are lazy-loaded with `decoding="async"`
    - _Bug_Condition: isBugCondition({ kind: "image" }) where misrepresentsStockAsRealProperty OR (belowTheFold AND NOT lazyLoaded) OR missingOrEmptyAlt_
    - _Expected_Behavior: expectedBehavior({ kind: "image" }) — honest representation (no stock-as-real), lazy below the fold, non-empty descriptive alt_
    - _Preservation: 3.3 — hero profile photo still loads eagerly and uses SafeImage fallback mechanism; 3.9 — profile photo fallbacks render unchanged_
    - _Requirements: 2.8, 2.10_

  - [ ] 3.12 Color contrast audit and opacity fixes
    - Produce a contrast audit table for every low-opacity text variant actually used (`/85`, `/80`, `/75`, `/70`, `/60`, `/50`, `/40`, `/30`, `/20`) against each real background (navy `#0a1628`, navy-light, navy-mid, charcoal, glass-card over navy) in both dark and light themes
    - Compute WCAG ratios: normal text needs ≥ 4.5:1; large text (≥ 18px or ≥ 14px bold) needs ≥ 3:1
    - For each failing pair, raise the opacity to the lowest passing value or switch to the solid `--color-muted`/`--color-ivory` token
    - Likely candidates to fix: `text-[var(--color-ivory)]/50` (9px footer subtitle) — bump to a passing opacity or use `--color-muted`; `text-[var(--color-gold)]/60` and `/70` decorative labels on dark — bump to a passing opacity
    - Do NOT change the theme token values themselves (preserves the visual identity); only adjust per-use opacities where they fail AA
    - Verify contrast in both dark and light themes
    - Acceptance: all text/background pairs (including low-opacity variants) meet WCAG AA in both themes; theme token values are unchanged; visual identity is preserved
    - _Bug_Condition: isBugCondition({ kind: "contrast" }) where NOT meetsWCAG_AA(text, background)_
    - _Expected_Behavior: expectedBehavior({ kind: "contrast" }) — meetsWCAG_AA(text, background) in both themes_
    - _Preservation: 3.1 — luxury navy-and-gold visual identity preserved; only opacity values adjusted, not token values_
    - _Requirements: 2.11_

  - [ ] 3.13 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Per-Route Metadata, Focus, Mobile Menu, Landmarks, Crawler/Social, Images, 404, and Contrast
    - **IMPORTANT**: Re-run the SAME tests from task 1 — do NOT write new tests
    - The tests from task 1 encode the expected behavior; when they pass, it confirms the expected behavior is satisfied
    - Run all exploration tests: `npm run test`
    - **EXPECTED OUTCOME**: Tests PASS (confirms all bug surfaces are fixed)
    - If any test fails, investigate and fix the implementation (not the test) until all pass
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11_

  - [ ] 3.14 Verify preservation tests still pass
    - **Property 2: Preservation** - Visual Identity, Animations, Theme, Reduced-Motion, Contact Form A11y, Verified Data, and Phase 1-3 Features
    - **IMPORTANT**: Re-run the SAME tests from task 2 — do NOT write new tests
    - Run all preservation tests: `npm run test`
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - Confirm all tests still pass after the fix (no regressions to visual identity, animations, theme, contact form a11y, verified data, or Phase 1-3 features)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

- [ ] 4. Checkpoint - Ensure all tests pass and production build succeeds
  - Run the full test suite: `npm run test` — all tests must pass
  - Run the production build: `npm run build` — must compile without errors
  - Run the linter: `npm run lint` (oxlint) — must pass without errors
  - Manually verify each route's metadata (title, description, canonical, robots, og/twitter tags) is route-specific
  - Manually verify keyboard tab order and visible focus rings on all interactive elements
  - Manually verify mobile menu ARIA state, focus trap, Escape-to-close, and focus restoration
  - Manually verify heading/landmark structure (one h1 per route, skip link, labeled nav/main/footer)
  - Manually verify sitemap/robots content and the og-image asset
  - Manually verify the 404 page renders inside the layout with a noindex directive
  - Manually verify image alt text, lazy loading, and no stock-as-real photos
  - Manually verify color contrast meets WCAG AA in both themes
  - Ensure all tests pass; ask the user if questions arise

## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "tasks": ["1", "2"],
      "description": "Exploration tests (fail on unfixed code) and preservation tests (pass on unfixed code) — run in parallel; task 1 sets up test infrastructure"
    },
    {
      "wave": 2,
      "tasks": ["3.1", "3.2", "3.3", "3.6", "3.8", "3.11", "3.12"],
      "description": "Implementation sub-tasks with no internal dependencies: seo.js, useDocumentMeta hook, useFocusTrap hook, focus-visible CSS, landmarks, image honesty, contrast audit"
    },
    {
      "wave": 3,
      "tasks": ["3.4", "3.5", "3.7", "3.9", "3.10"],
      "description": "Implementation sub-tasks depending on wave 2 outputs: wire pages (needs 3.1+3.2), index.html (needs 3.1), mobile menu (needs 3.3), sitemap (needs 3.1), OG asset (needs 3.1)"
    },
    {
      "wave": 4,
      "tasks": ["3.13", "3.14"],
      "description": "Verification sub-tasks: re-run exploration tests (Property 1) and preservation tests (Property 2) after all implementation"
    },
    {
      "wave": 5,
      "tasks": ["4"],
      "description": "Checkpoint: full test suite, production build, lint, and manual verification"
    }
  ],
  "dependencies": [
    { "from": "1", "to": "3.13", "reason": "exploration tests validate the fix" },
    { "from": "2", "to": "3.14", "reason": "preservation tests verify no regressions" },
    { "from": "3.1", "to": "3.4", "reason": "pages reference ROUTE_SEO" },
    { "from": "3.2", "to": "3.4", "reason": "pages call useDocumentMeta" },
    { "from": "3.1", "to": "3.5", "reason": "index.html references OG_IMAGE" },
    { "from": "3.3", "to": "3.7", "reason": "Navbar uses useFocusTrap" },
    { "from": "3.1", "to": "3.9", "reason": "sitemap/robots reference SITE_URL" },
    { "from": "3.1", "to": "3.10", "reason": "OG asset referenced by OG_IMAGE" },
    { "from": "3.4", "to": "3.13", "reason": "all implementation before verification" },
    { "from": "3.12", "to": "3.13", "reason": "all implementation before verification" },
    { "from": "3.14", "to": "4", "reason": "checkpoint after all tasks" }
  ]
}
```

Key dependencies:
- Task 1 must complete before Task 3 (exploration tests validate the fix)
- Task 2 must complete before Task 3.14 (preservation tests verify no regressions)
- 3.1 (seo.js) must complete before 3.4, 3.5, 3.9, 3.10 (they reference SITE_URL and ROUTE_SEO)
- 3.2 (useDocumentMeta) must complete before 3.4 (pages call the hook)
- 3.3 (useFocusTrap) must complete before 3.7 (Navbar uses the hook)
- 3.1–3.12 must complete before 3.13 and 3.14 (verification sub-tasks)
- Task 4 (Checkpoint) runs after all tasks complete

## Notes

- **Test infrastructure**: The project currently has no test framework. Task 1 sets up vitest + jsdom + @testing-library/react + fast-check as devDependencies. The `"test": "vitest --run"` script uses the `--run` flag for single-execution (no watch mode).
- **Client-rendered SPA limitation**: Per requirement 2.2, crawlers that do not execute JavaScript see the static `index.html` Home metadata. The `useDocumentMeta` hook updates metadata for JS-capable clients during client-side navigation. This limitation is documented in code comments and the README, not via an SSR change.
- **No React Helmet**: A custom `useDocumentMeta` hook was chosen over `react-helmet-async` (React 19 compatibility concerns) and Vite SSR/prerender plugins (heavier than needed). See design.md "Approach decision: metadata management".
- **Image honesty**: Setting `fallbackImage: null` for `journeyHotels` renders the branded `Building2` placeholder instead of stock photos presented as real properties. If real photos are supplied later, restore the `fallbackImage` values.
- **Contrast fixes**: Only per-use opacity values are adjusted where they fail WCAG AA; the theme token values (`--color-navy`, `--color-gold`, `--color-ivory`, etc.) are never changed to preserve the visual identity.
- **Manual verification**: Task 4 includes manual checks for visual/interactive surfaces that are difficult to fully automate (keyboard tab order, focus ring visibility, mobile menu behavior, color contrast in both themes). These complement the automated tests.
