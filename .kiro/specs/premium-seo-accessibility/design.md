# Premium SEO & Accessibility Bugfix Design

## Overview

The portfolio is a client-rendered Vite SPA (React 19 + React Router 7 + Framer Motion + Tailwind v4) for Ranjeet Singh Patel, Hotel General Manager at Hotel The Ideal, Kushinagar. Today it serves one static set of `<head>` metadata from `index.html` on every route, updates only `document.title` per page, and leaves the rest of the metadata, accessibility, and SEO surface incomplete. This design defines a targeted, low-risk fix that adds unique per-route metadata, restores keyboard focus visibility, completes the accessible mobile navigation, guarantees semantic heading/landmark structure, repairs the sitemap/social-preview/robots surface, and moves the 404 page into the shared layout with a `noindex` directive — all without altering the existing luxury navy-and-gold identity, animations, glassmorphism, theme system, or verified contact details.

The general strategy is a dependency-free, React 19-safe metadata hook plus focused CSS/ARIA/landmark additions. No existing component is replaced; components are extended with the missing attributes and styles. The "bug" is treated as a composite condition over route rendering and interactive-element behavior, formalized below so the fix and preservation checks can be validated against it.

## Glossary

- **Bug_Condition (C)**: The condition that triggers the bug — a route render, focus event, mobile-menu interaction, crawler read, image render, or 404 render that exhibits one of the documented SEO/accessibility deficiencies.
- **Property (P)**: The desired behavior for buggy inputs — route-specific metadata is applied, visible focus indicators appear, the mobile menu exposes ARIA state and traps/restores focus, headings and landmarks are correct, the sitemap/social-preview/robots surface is accurate, images are honest and lazy-loaded, and the 404 renders in-layout with `noindex`.
- **Preservation**: Existing behaviors that must remain unchanged — visual identity, Framer Motion animations, glassmorphism, dark/light theme, reduced-motion handling, contact form labels/aria, ThemeToggle/WhatsApp aria-labels, hero eager loading, SafeImage fallback, and verified contact/profile data.
- **F**: The current (unfixed) application — static `index.html` metadata for all routes, `document.title`-only updates, suppressed/weak focus indicators, incomplete mobile menu ARIA, stale sitemap, relative Open Graph image, 404 outside the layout.
- **F'**: The fixed application — per-route metadata via a `useDocumentMeta` hook, visible `focus-visible` indicators, complete mobile menu ARIA + focus trap, guaranteed landmarks/headings, accurate sitemap, absolute social-preview image, 404 in-layout with `noindex`.
- **useDocumentMeta**: A new custom hook in `src/hooks/useDocumentMeta.js` that imperatively updates `document.title` and `<head>` meta tags on route change without any third-party dependency.
- **ROUTE_SEO**: A new centralized per-route metadata map (in `src/data/seo.js`) keyed by route path, the single source of route titles, descriptions, canonicals, robots directives, and Open Graph/Twitter values.
- **SITE_URL**: A new configurable production URL constant (`import.meta.env.VITE_SITE_URL` with a fallback default) used to build absolute canonical/Open Graph/Twitter URLs and to keep the sitemap/robots domain in sync.
- **isBugCondition / expectedBehavior**: Pseudocode predicates (below) that define the buggy input set and the correct post-fix behavior used by the fix and preservation checks.

## Bug Details

### Bug Condition

The bug manifests across six surfaces of the SPA. For any route the user or crawler reaches, for any interactive element the user focuses, and for any mobile-menu or 404 interaction, the unfixed system fails at least one of: route metadata, keyboard focus visibility, mobile-menu accessibility, heading/landmark guarantees, crawler/social assets, or honest image representation.

**Formal Specification:**
```
FUNCTION isBugCondition(X)
  INPUT: X = { kind, route?, element?, interaction?, image?, text? }
  OUTPUT: boolean

  CASE X.kind OF
    "route-render":
      // a route page is being rendered for path P
      RETURN NOT hasRouteSpecificMetadata(X.route)            // 1.1, 1.2

    "focus":
      // an interactive element is focused via keyboard
      RETURN elementIn(X.element, INTERACTIVE_ELEMENTS)
             AND NOT hasVisibleFocusIndicator(X.element)       // 1.4

    "mobile-menu":
      // the mobile navigation menu is opened or operated
      RETURN NOT (
        toggleHasAriaExpanded(X.interaction)
        AND toggleHasAriaControls(X.interaction)
        AND menuHasFocusTrap(X.interaction)
        AND menuClosesOnEscape(X.interaction)
        AND menuRestoresFocus(X.interaction)
      )                                                      // 1.5

    "headings":
      // a route's heading/landmark structure is examined
      RETURN NOT (
        exactlyOneH1(X.route)
        AND orderedSubheadings(X.route)
        AND hasLandmarks(X.route)                             // header, nav, main, section, footer
      )                                                       // 1.6

    "crawler-social":
      RETURN staleSitemapDates()
        OR hardcodedUnconfigurableDomain()
        OR relativeOgImageUrl()
        OR noDedicatedSocialPreviewAsset()                     // 1.3, 1.7

    "image":
      RETURN misrepresentsStockAsRealProperty(X.image)
        OR (belowTheFold(X.image) AND NOT lazyLoaded(X.image))
        OR missingOrEmptyAlt(X.image)                          // 1.8, 1.10

    "not-found":
      RETURN rendersOutsideSharedLayout(X.route)
        OR NOT hasNoindexDirective(X.route)                     // 1.9

    "contrast":
      RETURN NOT meetsWCAG_AA(X.text, X.background)             // 1.11
  END CASE
END FUNCTION
```

`INTERACTIVE_ELEMENTS` = navigation links, theme toggle, call/CV links, WhatsApp button, contact form controls, filter/expand buttons, scroll-to-top, 404 buttons, and the hero scroll link.

### Examples

- **Route metadata (1.1, 1.2)**: Navigating to `/about` leaves the title as the Home page title and the description/canonical/og:*/twitter:* as the Home values from `index.html`. Expected: a unique About title, description, canonical `…/about`, and route-specific og/twitter tags.
- **Focus visibility (1.4)**: Tabbing to the theme toggle, WhatsApp button, a navbar link, or a contact input shows no consistent visible focus ring (the contact inputs only change border color to `--color-gold)/70`, which is weak). Expected: a visible gold focus ring on every interactive element.
- **Mobile menu (1.5)**: Opening the mobile menu, the toggle exposes no `aria-expanded`/`aria-controls`, the menu has no `role="dialog"`/`aria-modal`, Tab can leave the menu, Escape does not close it, and focus is not restored to the toggle. Expected: `aria-expanded`/`aria-controls` on the toggle, a dialog with focus trap, Escape-to-close, and focus restoration.
- **Headings/landmarks (1.6)**: The DOM has no skip link, `<main>` has no `id`, and the mobile menu is a `<div>` without nav/role semantics. Expected: one `h1` per route, ordered subheadings, labeled landmarks, and a skip-to-main link.
- **Crawler/social (1.3, 1.7)**: `sitemap.xml` lists `lastmod` 2024-01-01 and a hardcoded domain; `og:image` is the relative `/images/ranjeet/profile.png` with no dedicated 1200×630 asset. Expected: current dates, a configurable domain, and an absolute URL to a dedicated social preview asset.
- **Image honesty (1.10, 2.10)**: The four `journeyHotels` reference `/images/ranjeet/hotel-*.webp` files that do not exist, so `SafeImage` falls back to stock photos (`hotel_exterior.jpg`, `hotel_suite.jpg`, …) shown with alt like `"Hotel The Ideal, Kushinagar"`, misrepresenting a stock photo as the actual property. Expected: a branded placeholder (no false photo) or clearly illustrative alt text.
- **404 (1.9)**: The `*` route renders `NotFound` outside `MainLayout` (no header/nav/footer) with no `noindex`. Expected: 404 inside the shared layout with a `noindex, follow` directive.
- **Contrast (1.11)**: Low-opacity text such as `text-[var(--color-ivory)]/50` (9px footer subtitle) or `text-[var(--color-gold)]/60` may fall below WCAG AA 4.5:1 for small text on the dark background. Expected: all text, including low-opacity variants, meets AA in both themes.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The luxury navy-and-gold visual identity, typography, and layout render without redesign or simplification (3.1).
- The Home page renders Hero, About, Expertise, Experience, Projects, Achievements, and Contact with Framer Motion animations and glassmorphism intact (3.2).
- The hero profile photo loads eagerly and uses the SafeImage fallback mechanism (3.3).
- The theme toggle switches dark/light with its accessible `aria-label` and reduced-motion handling preserved (3.4).
- The WhatsApp floating button keeps its `aria-label`, `sr-only` label, and reduced-motion-aware animation (3.5).
- The contact form keeps labeled fields, `aria-required`, `aria-invalid`, validation messages, and the submission feedback flow (3.6).
- All contact/professional details use verified centralized profile data (phone +91 8707015028, email ranjeetsinghkushinagar2@gmail.com); no fictional contact details, fake awards, unverified dates, or internal TODO notes appear in public metadata (3.7).
- Framer Motion animations continue to honor the reduced-motion preference for elements that already honor it (3.8).
- The 12-year career highlight, Vision/Leadership cards, hotel timeline, and profile photo fallbacks render unchanged (3.9).
- Previous Phase 1–3 features operate without regression (3.10).

**Scope:**
All inputs that do NOT satisfy `isBugCondition` should be completely unaffected in behavior by this fix. This includes:
- Mouse interactions (no new `focus-visible` rings appear on mouse click).
- Elements that already have correct behavior — `Button.jsx` already has a `focus-visible` ring; the contact form already has labels/`aria-required`/`aria-invalid`; ThemeToggle/WhatsApp already have `aria-label`/`sr-only`; Hero already loads eagerly and honors reduced motion.
- Verified profile/contact data values and the dark/light theme token system.

## Hypothesized Root Cause

Based on the bug description and code review, the most likely causes are:

1. **No per-route metadata mechanism**: Each page only sets `document.title` in a `useEffect`; all other `<head>` tags come from the static `index.html`. There is no React Helmet or equivalent, and no route-level data structure describing per-route title/description/canonical/og/twitter. `react-helmet-async` is not installed and has known React 19 compatibility friction (legacy lifecycle/`findDOMNode` warnings, spotty maintenance); a Vite SSR/prerender plugin is heavier than this client-rendered SPA needs.

2. **Suppressed/weak focus indicators**: `focus:outline-none` is applied to the four contact form inputs with only a border-color change as the replacement; `Button.jsx` already has a proper `focus-visible` ring, so the pattern exists but is not applied elsewhere. Other interactive elements rely on the browser default outline, which is inconsistent and not styled to the brand. There is no global `:focus-visible` fallback in `src/styles/index.css`.

3. **Incomplete mobile-menu ARIA/keyboard support**: The `Navbar` mobile toggle has only `aria-label="Toggle menu"` (no `aria-expanded`/`aria-controls`); the menu is a `motion.div` with no `role`/`aria-modal`/id; there is no focus trap, no Escape handler, and no focus restoration.

4. **Missing landmark guarantees**: `MainLayout` has `<main>` but no `id` and no skip link; the desktop nav lacks an `aria-label`; the mobile menu is not a labeled nav/dialog; section headings lack `id`s for `aria-labelledby`.

5. **Stale/static crawler/social assets**: `sitemap.xml` and `robots.txt` are hand-maintained static files with a hardcoded domain and 2024-01-01 dates; `SITE_META`/index.html reference a relative `og:image` with no dedicated 1200×630 asset.

6. **Image honesty gap**: `projects.js` points at non-existent `.webp` files, so `SafeImage` silently falls back to stock photos presented with property-specific alt text.

7. **404 outside the layout**: The `*` route in `AppRoutes.jsx` wraps `NotFound` in `PageTransition` only (no `MainLayout`), and no route sets a `noindex` directive.

## Correctness Properties

Property 1: Bug Condition - Per-Route Metadata, Focus, Mobile Menu, Landmarks, Crawler/Social, Images, 404, and Contrast

_For any_ input where the bug condition holds (isBugCondition returns true), the fixed function SHALL produce route-specific title/description/canonical/robots/og/twitter metadata, a visible keyboard focus indicator on every interactive element, a mobile menu with `aria-expanded`/`aria-controls`, focus trap, Escape-to-close, and focus restoration, exactly one `h1` per route with ordered subheadings and labeled landmarks, an accurate configurable-domain sitemap with current dates and a dedicated absolute social-preview image, honest (non-misrepresented) lazy-loaded images with descriptive alt text, a 404 page rendered inside the shared layout with a `noindex` directive, and WCAG AA-compliant text contrast including low-opacity variants.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11**

Property 2: Preservation - Visual Identity, Animations, Theme, Reduced-Motion, Contact Form A11y, Verified Data, and Phase 1-3 Features

_For any_ input where the bug condition does NOT hold (isBugCondition returns false), the fixed function SHALL produce the same result as the original function, preserving the luxury visual identity, Framer Motion animations and glassmorphism, dark/light theme, reduced-motion handling, the hero eager-loading and SafeImage fallback, the contact form labels/aria/validation, the ThemeToggle/WhatsApp aria-labels, the verified centralized profile/contact data, and all previous Phase 1-3 features.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10**

## Fix Implementation

### Approach decision: metadata management

Three options were considered for per-route metadata:

1. **react-helmet-async** — adds a dependency and has React 19 compatibility concerns (legacy lifecycle/`findDOMNode` warnings, inconsistent maintenance); overkill for a client-rendered SPA that only needs imperative `<head>` updates.
2. **Vite SSR/prerender plugin** (e.g., `vite-plugin-ssr`, `vite-plugin-prerender`) — would make route meta available to crawlers without JS, but introduces a render pipeline change far beyond the scope of this bugfix and risks regressing the existing Vite config.
3. **Custom `useDocumentMeta` hook** — dependency-free, React 19-safe, and sufficient for client-side updates. The static `index.html` remains the crawler fallback (documented limitation per 2.2).

**Decision**: Option 3. The SPA limitation (crawlers that do not execute JS see the static `index.html` Home metadata) is documented in code comments and the README so requirement 2.2 is satisfied without an SSR change.

### Changes Required

**1. Centralized per-route metadata — `src/data/seo.js` (new)**
- Define `SITE_URL` = `import.meta.env.VITE_SITE_URL || 'https://ranjeetsinghpatel.com'` (configurable domain; default matches the existing production domain).
- Define `OG_IMAGE` = `${SITE_URL}/images/og-image.jpg` (absolute URL to the dedicated 1200×630 asset).
- Define `ROUTE_SEO` keyed by route path (`/`, `/about`, `/experience`, `/projects`, `/contact`, plus a `notFound` entry). Each entry: `{ title, description, path, robots, type, ogTitle, ogDescription, keywords }`. Canonical and og/twitter URLs are derived as `${SITE_URL}${path}`; og/twitter image is `OG_IMAGE`. Content uses the verified profile keywords naturally (Hotel General Manager, Hospitality Operations, Guest Experience, Hotel Management, Kushinagar) without stuffing, and only verified facts (no fake awards/unverified dates/TODOs).
- The Home entry mirrors the current `index.html`/`SITE_META` values so the static fallback and runtime values agree.

**2. Metadata hook — `src/hooks/useDocumentMeta.js` (new)**
- `useDocumentMeta(meta)` reads a `ROUTE_SEO` entry and imperatively sets/updates in a `useEffect`: `document.title`; meta `description`, `robots`, `keywords`; `link[rel=canonical]`; og:* (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`); twitter:* (`twitter:card`, `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`). It creates missing tags and updates existing ones by `name`/`property`, and restores Home values on unmount so the static fallback is never left stale.
- For the 404 route it sets `robots` to `noindex, follow`.

**3. Wire pages to the hook**
- `Home`, `AboutPage`, `ExperiencePage`, `ProjectsPage`, `ContactPage`: replace the existing `document.title = …` `useEffect` with `useDocumentMeta(ROUTE_SEO['/…'])`.
- `NotFound`: call `useDocumentMeta(ROUTE_SEO.notFound)` (sets `noindex, follow`).
- `AppRoutes.jsx`: move the `*` route into `MainLayout` + `PageTransition` like the other routes.
- `NotFound.jsx`: drop `min-h-screen` full-screen chrome (the layout now provides header/footer); keep the centered 404 content inside a section.

**4. index.html static fallback**
- Update `og:image`/`twitter:image` to the absolute `OG_IMAGE` URL (crawlers without JS still see the dedicated asset). Keep the rest as the Home fallback. The runtime hook overrides per route for JS-capable clients.

**5. Focus indicators — `src/styles/index.css` + components**
- Add a global keyboard-only fallback:
  ```
  :focus-visible { outline: 2px solid var(--color-gold); outline-offset: 2px; }
  ```
  (Mouse focus is unaffected because it uses `:focus-visible`.)
- Add `focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]` (matching the existing `Button.jsx` pattern) to: `ThemeToggle.jsx`, `WhatsAppButton.jsx`, the navbar links/toggle/call/CV links in `Navbar.jsx`, the footer links and scroll-to-top button in `Footer.jsx`, the filter/expand buttons in `Projects.jsx`, the buttons in `NotFound.jsx`, and the hero scroll link in `Hero.jsx`.
- Contact form inputs (`Contact.jsx`): keep the existing border change and add `focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-navy)]` alongside `focus:outline-none` so keyboard focus is clearly visible.
- `Button.jsx`: add `focus-visible:ring-offset-[var(--color-navy)]` so the existing ring offset matches the theme.
- No tabindex changes; DOM order already provides a logical tab order.

**6. Mobile menu accessibility — `Navbar.jsx` + new `src/hooks/useFocusTrap.js`**
- Toggle button: add `aria-expanded={mobileOpen}` and `aria-controls="mobile-menu"`; make the `aria-label` dynamic (`mobileOpen ? 'Close menu' : 'Open menu'`).
- Menu container: add `id="mobile-menu"`, `role="dialog"`, `aria-modal="true"`, `aria-label="Site navigation"`; wrap the link list in `<nav aria-label="Mobile">` so it is a labeled landmark.
- `useFocusTrap(ref, active)`: when active, move focus to the first focusable element, trap Tab/Shift+Tab within the container, close on Escape (via a returned handler wired to `onKeyDown`/window listener), and restore focus to the toggle on close. No `role="button"` on real `<button>`s (no redundant ARIA).
- Close the menu on route change (NavLink `onClick` already sets `mobileOpen(false)`); ensure Escape also closes and restores focus.

**7. Heading hierarchy & landmarks**
- Audit confirms exactly one `h1` per route already (Hero `h1` on Home; banner `h1` on About/Experience/Projects/Contact; `h1` on NotFound). Lock this in: no new `h1`s are introduced; `SectionHeading` stays `h2`; card titles stay `h3`/`h4`. Verify no skipped levels remain.
- `MainLayout.jsx`: add `id="main-content"` to `<main>` and a visually-hidden "Skip to main content" skip link as the first focusable element (styled, visible on focus).
- `Navbar.jsx`: add `aria-label="Primary"` to the desktop `<nav>`.
- `SectionHeading.jsx`: accept an optional `id` and render it on the `h2` so sections can be targeted with `aria-labelledby` where useful (add `aria-labelledby` to the main section wrappers that currently lack it).
- `Footer.jsx`: optionally add `aria-label="Site footer"` to `<footer>`.

**8. Sitemap & robots — `public/sitemap.xml`, `public/robots.txt`, `src/data/seo.js`**
- `sitemap.xml`: update each `<lastmod>` to a current, accurate date; keep the five real routes only (do not add the `*`/404 route, which is `noindex`); use the production domain consistently with `SITE_URL`. Document that the domain is centralized in `SITE_URL` (and optionally injectable via `VITE_SITE_URL` at build).
- `robots.txt`: keep `Allow: /` and the `Sitemap:` line; ensure the domain matches `SITE_URL`.
- Ensure no broken links or nonexistent routes are listed (the five routes all exist in `AppRoutes.jsx`).

**9. Social preview asset**
- Create a dedicated `public/images/og-image.jpg` at 1200×630 (brand navy background, gold accent, name, public title, hotel, Kushinagar). Provide an `og-image.svg` source as a designable starting point if a raster export is not yet available; reference the JPG/PNG (not SVG) for og/twitter since most platforms reject SVG for social previews. Add `og:image:alt` describing the preview.
- Reference it via the absolute `OG_IMAGE` URL in both the runtime hook and the static `index.html`.

**10. Image SEO & honesty — `src/data/projects.js`, `src/pages/AboutPage.jsx`, `src/components/ui/SafeImage.jsx`**
- Projects cards: the referenced `.webp` files do not exist; set `fallbackImage: null` for the four `journeyHotels` so `SafeImage` renders the branded `Building2` placeholder (honest, on-brand, no false photo) rather than a stock photo presented as the actual hotel. Keep `alt` descriptive (e.g., "Hotel The Ideal, Kushinagar — property listing card"). (Decision point: if real photos are supplied later, restore them.)
- AboutPage `propertyShowcase`: either use the branded placeholder or update `alt`/`title` to clearly read as an illustrative hospitality environment (not the specific hotel). Recommend the placeholder for consistency.
- `SafeImage.jsx`: add `decoding="async"` and, where the container has a known aspect ratio, pass intrinsic `width`/`height` to reduce CLS; keep `loading` default `lazy` and the Hero `loading="eager"` unchanged (3.3).
- Verify every `SafeImage` call site passes a descriptive, non-empty `alt` (audit confirmed all call sites pass `alt`; no raw `<img>` exists outside `SafeImage`).

**11. Color contrast verification — `src/styles/index.css` + component opacity tokens**
- Produce a contrast audit table for every low-opacity text variant actually used (`/85`, `/80`, `/75`, `/70`, `/60`, `/50`, `/40`, `/30`, `/20`) against each real background (navy, navy-light, navy-mid, charcoal, glass-card over navy) in both dark and light themes. Compute WCAG ratios (normal text ≥ 4.5:1; large text ≥ 3:1).
- For each failing pair, raise the opacity to the lowest passing value or switch to the solid `--color-muted`/`--color-ivory` token. Likely candidates: `text-[var(--color-ivory)]/50` (9px footer subtitle) and `text-[var(--color-gold)]/60`/`/70` decorative labels on dark — bump to a passing opacity or use `--color-muted`/`--color-ivory`.
- Do not change the theme token values themselves (preserves the visual identity); only adjust per-use opacities where they fail AA.

**12. Build verification**
- Run `npm run build` (vite build) and `npm run lint` (oxlint); both must pass. Manually verify each route's metadata, keyboard tab order and visible focus, mobile menu ARIA/focus trap/Escape, heading/landmark structure, sitemap/robots, og image, 404 in-layout with noindex, image alt/lazy behavior, and color contrast.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate each deficiency on the unfixed code, then verify the fix produces the expected behavior for buggy inputs and preserves existing behavior for non-buggy inputs. Because the bug is a composite over several surfaces, exploratory checks are organized per `isBugCondition` kind.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root-cause analysis. If a hypothesis is refuted (e.g., a route already has correct headings), re-scope the fix.

**Test Plan**: For each `isBugCondition` kind, run a focused check against the UNFIXED code and record the failing example.

**Test Cases**:
1. **Route metadata test**: On `/about`, `/experience`, `/projects`, `/contact`, assert `document.title`, `meta[name=description]`, `link[rel=canonical]`, and `og:*`/`twitter:*` equal the Home values from `index.html` (will fail the "route-specific" expectation on unfixed code).
2. **Focus visibility test**: Tab through navbar links, theme toggle, WhatsApp button, contact inputs, filter buttons, 404 buttons; capture whether a visible, consistent focus indicator appears (contact inputs show only a border change; others rely on default outline — inconsistent).
3. **Mobile menu test**: Open the mobile menu; assert the toggle lacks `aria-expanded`/`aria-controls`, the menu lacks `role="dialog"`/`aria-modal`, Tab escapes the menu, and Escape does not close it (will fail on unfixed code).
4. **Landmarks test**: Assert there is no skip link, `<main>` has no `id`, the desktop nav has no `aria-label`, and the mobile menu is not a labeled nav/dialog (will fail on unfixed code). Confirm there is exactly one `h1` per route (expected to pass — confirms the heading hypothesis).
5. **Crawler/social test**: Read `sitemap.xml` (stale 2024-01-01, hardcoded domain) and `index.html` (`og:image` relative, no dedicated asset) (will fail on unfixed code).
6. **Image honesty test**: Load `/projects`; confirm the hotel cards render stock fallback photos with property-specific alt text (will fail on unfixed code).
7. **404 test**: Visit an unknown path; assert `NotFound` renders without header/nav/footer and has no `noindex` meta (will fail on unfixed code).
8. **Contrast test**: Compute contrast for `text-[var(--color-ivory)]/50`, `/60`, `/30` on dark backgrounds (likely fails AA for small text on unfixed code).

**Expected Counterexamples**:
- Identical Home metadata served on every deep route (possible causes: no route meta mechanism, title-only updates).
- No/few visible focus rings on keyboard navigation (possible causes: `focus:outline-none` without replacement, no global `:focus-visible`).
- Mobile menu missing ARIA state, focus trap, and Escape (possible causes: toggle has only `aria-label`, menu is a plain `div`).
- Stock photos labeled as real hotels (possible cause: non-existent `.webp` sources fall back to stock images).

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL X WHERE isBugCondition(X) DO
  result := F'(X)
  ASSERT expectedBehavior(result, X.kind)
END FOR
```

`expectedBehavior` per kind:
- `route-render` → `hasRouteSpecificMetadata(route)` is true (unique title/description/canonical/robots/og/twitter).
- `focus` → `hasVisibleFocusIndicator(element)` is true (gold `focus-visible` ring).
- `mobile-menu` → `aria-expanded`, `aria-controls`, focus trap, Escape-close, and focus restoration all hold.
- `headings` → exactly one `h1`, ordered subheadings, labeled landmarks, skip link present.
- `crawler-social` → current sitemap dates, configurable domain, absolute dedicated og image.
- `image` → honest representation (no stock-as-real), lazy below the fold, non-empty descriptive alt.
- `not-found` → renders inside `MainLayout` with `noindex, follow`.
- `contrast` → `meetsWCAG_AA(text, background)` in both themes.

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT F(X) = F'(X)
END FOR
```

**Testing Approach**: Property-based/manual checks are used for preservation because the "already-correct" surface is broad and behavior-sensitive. Confirm: mouse interactions show no new focus rings; `Button.jsx` ring behavior is unchanged; contact form labels/`aria-required`/`aria-invalid`/validation/submission flow are unchanged; ThemeToggle/WhatsApp `aria-label`/`sr-only` are unchanged; hero eager loading and SafeImage fallback are unchanged; reduced-motion handling is unchanged; theme token values are unchanged; verified contact/profile data are unchanged; Home section composition, animations, and glassmorphism are unchanged.

**Test Cases**:
1. **Mouse-click preservation**: Click buttons/links with a mouse; assert no `focus-visible` ring appears and behavior matches the original.
2. **Contact form preservation**: Submit the form with valid/invalid data; assert labels, `aria-required`, `aria-invalid`, error messages, and feedback flow match the original (only a focus ring was added).
3. **Theme/reduced-motion preservation**: Toggle theme and enable reduced-motion; assert ThemeToggle/WhatsApp/Hero behavior matches the original.
4. **Visual identity preservation**: Render Home and each standalone page; assert navy-and-gold styling, typography, animations, and glassmorphism match the original (no theme token value changes).
5. **Verified data preservation**: Assert all metadata and visible details use the verified centralized profile data (no fictional contact/awards/dates).

### Unit Tests

- `useDocumentMeta`: given a `ROUTE_SEO` entry, assert `document.title`, `meta[name=description]`, `meta[name=robots]`, `link[rel=canonical]`, `og:*`, and `twitter:*` are created/updated; on unmount, Home values are restored.
- `useFocusTrap`: when active, assert focus moves to the first item, Tab/Shift+Tab stay within the container, Escape closes, and focus returns to the toggle; when inactive, assert no behavior.
- `ROUTE_SEO`: assert each entry produces an absolute canonical and an absolute `OG_IMAGE` URL using `SITE_URL`; assert the 404 entry sets `noindex, follow`; assert no fictional contact/awards/dates appear.
- Contrast helper: assert each audited text/background pair meets AA (dark and light themes).

### Property-Based Tests

- For any route path in the route set, `useDocumentMeta(ROUTE_SEO[path])` yields a canonical equal to `${SITE_URL}${path}` and a unique title/description distinct from every other route.
- For any interactive element in `INTERACTIVE_ELEMENTS`, keyboard focus yields a non-empty visible focus ring while mouse focus yields none.
- For any random low-opacity text variant in the audit set, the computed contrast either passes AA or is flagged for a bump (and the bumped value passes).
- For any image in `journeyHotels`/`propertyShowcase`, the rendered alt is non-empty and the element is not a stock photo presented as a real property.

### Integration Tests

- Full navigation flow: visit `/`, `/about`, `/experience`, `/projects`, `/contact`, and an unknown path; assert each route's metadata, single `h1`, landmark labels, and (for 404) in-layout render with `noindex`.
- Mobile menu flow: open the menu via keyboard, Tab through links (trapped), press Escape (closes and restores focus to the toggle), and confirm `aria-expanded` toggles.
- Keyboard flow: Tab from the skip link through the header, main content, and footer; assert a visible focus ring on every interactive element and a logical order.
- Crawler/social flow: fetch `sitemap.xml` and `robots.txt`; assert current dates, the configurable domain, and the five real routes; assert `index.html` and runtime og/twitter tags reference the absolute dedicated og image.
- Build flow: run `npm run build` and `npm run lint`; assert both pass with no errors.
