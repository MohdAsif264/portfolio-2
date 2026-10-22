# Bugfix Requirements Document

## Introduction

This document defines the requirements for fixing SEO and accessibility deficiencies in the Ultra-Premium Hotel General Manager portfolio for Ranjeet Singh Patel (React + Vite + Tailwind CSS v4, React Router, Framer Motion). The portfolio currently serves a single set of static metadata from `index.html` across all routes, lacks a per-route metadata mechanism, suppresses keyboard focus indicators on interactive elements, and provides an incomplete accessible mobile navigation experience. The sitemap contains stale dates and a hardcoded domain, Open Graph image references use a relative path with no dedicated social preview asset, and the 404 page renders outside the shared layout without a `noindex` directive. The fix must add unique, accurate per-route SEO metadata, restore keyboard accessibility, complete semantic HTML structure, and verify the production build, all without altering the existing luxury navy-and-gold visual identity, Framer Motion animations, glassmorphism, dark/light theme, or any verified contact and content details.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a user navigates between routes via client-side navigation THEN the system retains the static index.html title, meta description, canonical URL, robots directive, Open Graph tags, and Twitter card metadata for every route instead of updating to route-specific values
1.2 WHEN a search engine or social crawler accesses any deep route directly THEN the system serves identical Home-page metadata because no route-level metadata management mechanism exists
1.3 WHEN a social platform reads the Open Graph or Twitter image tag THEN the system references a relative image path ("/images/ranjeet/profile.png") and provides no dedicated social preview asset at recommended dimensions (1200×630)
1.4 WHEN a user navigates via keyboard THEN the system suppresses visible focus indicators on interactive elements that apply `focus:outline-none` without a replacement focus style
1.5 WHEN a keyboard or screen reader user operates the mobile navigation menu THEN the system provides no `aria-expanded` state on the toggle button, no `aria-controls` linkage, no focus trap, and no Escape-to-close behavior
1.6 WHEN a user or auditor examines the heading hierarchy of any standalone route THEN the system does not guarantee a single primary heading (h1) per page with logically ordered subheadings
1.7 WHEN a search engine reads sitemap.xml THEN the system provides stale last-modification dates (2024-01-01) and a hardcoded production domain rather than a configurable value
1.8 WHEN below-the-fold images render THEN the system does not consistently apply lazy loading, descriptive alt text, and responsive sizing across all sections
1.9 WHEN the NotFound (404) route renders THEN the system renders it outside the shared header, navigation, and footer layout and provides no `noindex` robots directive
1.10 WHEN internal links, link text, and image references are audited THEN the system has not been verified for descriptive link text, working internal links, correct image paths, and absence of broken images
1.11 WHEN text and background color combinations are measured for accessibility THEN the system has not been verified to meet WCAG AA contrast ratios across all low-opacity text variants used throughout the interface
1.12 WHEN the production build is run after applying the SEO and accessibility changes THEN the system has not been verified to compile and pass without errors

### Expected Behavior (Correct)

2.1 WHEN a user navigates to any route THEN the system SHALL set a unique page title, meta description, canonical URL, robots directive, Open Graph tags, and Twitter card metadata specific to that route, using relevant keywords (Hotel General Manager, Hospitality Operations, Guest Experience, Hotel Management, Kushinagar) naturally without keyword stuffing
2.2 WHEN a search engine or social crawler accesses any deep route directly THEN the system SHALL serve route-level metadata through a compatible mechanism that updates during client-side navigation, and the implementation SHALL document the SEO limitations of a client-rendered Vite SPA
2.3 WHEN a social platform reads the Open Graph or Twitter image tag THEN the system SHALL reference an absolute URL to a dedicated social preview asset at recommended dimensions (1200×630) with descriptive alt text, a consistent professional title, and a concise description using a configured production URL
2.4 WHEN a user navigates via keyboard THEN the system SHALL provide visible focus indicators on all interactive elements (navigation links, theme toggle, call buttons, CV download, WhatsApp button, and contact form controls) with a logical tab order
2.5 WHEN a keyboard or screen reader user operates the mobile navigation menu THEN the system SHALL expose `aria-expanded` on the toggle, link it via `aria-controls`, trap focus within the open menu, close on Escape, and restore focus to the toggle on close, without adding redundant ARIA where semantic HTML suffices
2.6 WHEN a user or auditor examines the heading hierarchy of any route THEN the system SHALL provide exactly one primary heading (h1) per page with logically ordered subheadings (h2, h3) and correct use of header, nav, main, section, article, and footer elements
2.7 WHEN a search engine reads sitemap.xml and robots.txt THEN the system SHALL provide accurate, current entries using a configurable production domain placeholder, with no broken links or nonexistent routes included
2.8 WHEN below-the-fold images render THEN the system SHALL apply lazy loading, descriptive alt text, and responsive sizing, and SHALL NOT lazy-load the hero image
2.9 WHEN the NotFound (404) route renders THEN the system SHALL render it within the shared layout and provide a `noindex` robots directive
2.10 WHEN internal links, link text, and images are audited THEN the system SHALL use descriptive link text, working internal links, correct image paths, no broken images, and SHALL NOT represent stock images as actual hotel properties
2.11 WHEN text and background color combinations are measured THEN the system SHALL meet WCAG AA contrast ratios across all text including low-opacity variants
2.12 WHEN the production build is run THEN the system SHALL compile and pass without errors, and all routes, keyboard navigation, focus visibility, color contrast, image alt text, forms, mobile navigation, and theme controls SHALL be verified

### Unchanged Behavior (Regression Prevention)

3.1 WHEN any route renders THEN the system SHALL CONTINUE TO display the luxury navy-and-gold visual identity, typography, and layout without redesign or simplification
3.2 WHEN the Home page renders THEN the system SHALL CONTINUE TO render the Hero, About, Expertise, Experience, Projects, Achievements, and Contact sections with Framer Motion animations and glassmorphism intact
3.3 WHEN the hero profile photo renders THEN the system SHALL CONTINUE TO use eager (non-lazy) loading and the SafeImage fallback mechanism
3.4 WHEN the theme toggle is used THEN the system SHALL CONTINUE TO switch between dark and light mode with the accessible aria-label and reduced-motion handling preserved
3.5 WHEN the WhatsApp floating button renders THEN the system SHALL CONTINUE TO function with its aria-label, sr-only label, and reduced-motion-aware animations
3.6 WHEN the contact form is used THEN the system SHALL CONTINUE TO provide labeled fields, aria-required and aria-invalid attributes, validation error messages, and the submission feedback flow
3.7 WHEN any contact or professional detail is displayed or placed in metadata THEN the system SHALL CONTINUE TO use the verified centralized profile data (phone +91 8707015028, email ranjeetsinghkushinagar2@gmail.com) and SHALL NOT introduce fictional contact details, fake awards, unverified dates, or internal TODO notes in public metadata
3.8 WHEN Framer Motion animations play THEN the system SHALL CONTINUE TO respect the reduced-motion preference for animated elements that already honor it
3.9 WHEN the 12-year career highlight, Vision/Leadership cards, hotel timeline, and profile photo fallbacks render THEN the system SHALL CONTINUE TO display them unchanged
3.10 WHEN the previous Phase 1-3 features render THEN the system SHALL CONTINUE TO operate without regression
