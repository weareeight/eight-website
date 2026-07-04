# Eight Website — "The Manifesto" Redesign

## Context

Competitors are looking to Eight to figure out what to build next. We don't want to show products anymore. The website becomes a glorified About Us page — pure credibility, no asks.

## Design Direction

**Tone:** Bold & ambitious. Opinionated statements about craft.
**Audience:** Clients, competitors, potential hires — equally.
**Visuals:** Fresh direction (not repurposing product patterns). Single cohesive visual language.
**CTA:** None. Pure presence.

## Structure

### 1. Hero (full viewport)
- Keep animated dot-grid logo (unchanged)
- New tagline: "We engineer beautiful software." — short, declarative
- Keep scroll indicator line animation

### 2. Stats Ribbon
- Single horizontal line of facts: `Est. 2012 · 11 people · UK`
- Understated typography, muted color (#787878 or similar)
- Scroll-reveal fade-in

### 3. Beliefs Section
- 3–4 bold statements about how Eight builds software
- Each belief gets a full-viewport "moment" — large display type
- Scroll-triggered reveals, staggered
- Subtle visual element per belief (fresh generative/geometric — not the old product patterns)
- Example beliefs (placeholder — can refine copy later):
  - "Software should be beautiful. Not just functional — beautiful."
  - "Small teams. No layers. Every engineer ships."
  - "We've been doing this since 2012. We'll be doing it long after the hype fades."
  - "Craft compounds. Every detail matters because details are all there is."

### 4. Footer
- Just `© Eight 2026`
- No links, no CTA, no socials
- Confidence of asking for nothing

## Visual Direction

- Dark background (#08080A) — keep
- TASA Orbiter font — keep
- Single new generative visual: a flowing particle/line field or subtle grid distortion that responds to scroll position
- One visual language for the whole page (replaces 9 product-specific patterns)
- Keep all existing animation easing curves and accessibility (reduced motion, keyboard nav, ARIA)

## What Gets Removed

- All 9 product cards and expanded states
- Product grid section
- Product-specific CSS patterns (Signal, Prism, Vault, etc.)
- Product-specific JavaScript (expand/collapse, color bleed)
- Hash-based routing for product deep-links
- Navigation links (nothing to navigate to on a single-flow page)
- "Coming Soon" buttons

## What Stays

- Dot-grid logo + animations
- Dark aesthetic, TASA Orbiter typography
- Cookie consent
- Favicons and manifest
- GitHub Pages deployment
- Scroll-reveal animation pattern
- Accessibility features
- Performance approach (vanilla, no dependencies)

## Tech

Same stack: vanilla HTML/CSS/JS, single index.html, GitHub Pages. No build process needed.
