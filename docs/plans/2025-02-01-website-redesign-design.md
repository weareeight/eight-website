# Eight — Website Redesign Design Document

**Date:** 2025-02-01
**Status:** Approved
**Branch:** `feature/single-page-site`

---

## Brief

Eight makes digital products (SaaS tools and Shopify themes). The website serves as both a product catalog and a studio credentials piece. The audience is potential customers and potential clients.

**Tone:** Bold and expressive. Pentagram/Sagmeister territory — typography-forward, unexpected layouts, memorable. Not another dark-mode SaaS grid.

**Constraints:**
- Single-page site, inline product reveals (no separate pages)
- No product screenshots available — the design itself must prove craft
- Zero external JS dependencies (vanilla HTML/CSS/JS)
- Products link externally; detail reveals are inline

---

## Page Structure

### 1. Hero (Full Viewport)

- **Background:** `#08080A` (near-black, existing palette)
- **Title:** "Eight" at massive scale — viewport-width typography using TASA Orbiter display font
- **Tagline:** "We make digital products." — single line, understated
- **Animation:** Title assembles/reveals over ~1s, tagline fades in 0.3s after. A subtle, slow animation on the letterforms (CSS gradient mask shift or letter-spacing that breathes on a long loop)
- **Scroll indicator:** Thin extending line, not a bouncing arrow
- **Nav:** Hidden on load. Fades in as user scrolls past the hero. Fixed position with "Eight" wordmark and minimal links.

### 2. Products Section (Staggered Editorial Layout)

**Not a uniform grid.** An asymmetric, magazine-inspired layout:

- Row 1: One large hero card (~60% width) + one smaller card (~40%)
- Row 2: Two equal cards + one narrow vertical card
- Row 3: Inverse of row 1
- Pattern creates visual rhythm, hierarchy, and rewards scrolling

Cards reveal with scroll-triggered staggered animation following the layout rhythm (large card first, smaller ones follow).

### 3. Product Detail (Inline Expanding Reveal)

Triggered by clicking a product card:

1. **Expansion:** Card smoothly expands to full container width. Other cards fade out and compress (slide away with reduced opacity). CSS transitions with `cubic-bezier(0.16, 1, 0.3, 1)`.
2. **Color bleed:** Product's accent color subtly washes into page background as a vignette/gradient seeping from the expanded card.
3. **Content reveal:** Sequenced animation inside the expanded card:
   - Product name scales up
   - Longer description paragraph (2-3 sentences) fades in
   - Feature bullets appear with staggered timing
   - "Visit [Product Name]" button with external link arrow
   - Close action (× or "Back to products") at top right
4. **Scroll:** Page smoothly scrolls so expanded card sits at viewport top.
5. **Close:** Reverse animation. Cards reappear, color recedes, grid reforms.

**Hash routing:** URL updates (#signal, #vault, etc.) for deep-linking.

### 4. Footer

- Minimal single line: "Eight — Digital Products" left, links right
- Links: X (Twitter), Contact, Terms, Privacy
- Thin rule above. Nothing else.

---

## Visual Identity System

### Product Color Worlds

Each product gets a unique accent color and visual motif. No screenshots — the design language communicates the product's essence.

| Product | Accent | Hex | Mood | Visual Motif |
|---------|--------|-----|------|-------------|
| Signal | Warm amber | `#E8A849` | Clarity, insight | Flowing waveform |
| Forge | Steel blue | `#5B8DEF` | Precision, craft | Intersecting planes |
| Meridian | Sage green | `#6BAF8D` | Structure, growth | Meridian lines/grid |
| Vault | Deep indigo | `#7B6FD4` | Security, trust | Nested shields/layers |
| Prism | Rose pink | `#D4708F` | Creativity, spectrum | Refracted geometry |
| Relay | Teal | `#4DBDB9` | Connection, flow | Connected nodes |
| Atlas | Warm gray | `#B8A99A` | Foundation, knowledge | Topographic contours |
| Orbit | Soft violet | `#9B8EC4` | Scale, ecosystem | Concentric circles |

### Card Design

- Product name in large, confident typography
- One-line description
- Category tag
- Abstract CSS visual element (geometric/generative shape unique to each product)
- Subtle background using the product's color palette (not a gradient — a shift)
- **Hover:** Card lifts (translateY + shadow), abstract visual animates, accent color warms

---

## Typography

### Font Pairing

- **Display / Headings:** TASA Orbiter — geometric, humanist, scientific precision with warmth
- **Body:** Clean sans-serif (Inter, Geist, or similar) for readability

### Type Scale

- Hero title: `clamp(72px, 14vw, 200px)` — viewport-dominating
- Product names (in grid): `clamp(24px, 3vw, 40px)`
- Product names (expanded): `clamp(36px, 5vw, 72px)`
- Section labels: `14px` uppercase, tracked
- Body text: `16px`, generous line-height (1.6)
- Small text / tags: `13px`

---

## Color Palette

### Base Palette (unchanged)

```css
--bg: #08080A;          /* Near-black background */
--fg: #EAEAEA;          /* Off-white foreground */
--fg-muted: #787878;    /* Medium gray secondary */
--fg-subtle: #3a3a3a;   /* Dark gray borders */
```

### Per-Product Accent Colors

Applied as CSS custom properties on each card element for theming:

```css
--accent-signal: #E8A849;
--accent-forge: #5B8DEF;
--accent-meridian: #6BAF8D;
--accent-vault: #7B6FD4;
--accent-prism: #D4708F;
--accent-relay: #4DBDB9;
--accent-atlas: #B8A99A;
--accent-orbit: #9B8EC4;
```

---

## Motion Design

### Easing

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
```

### Choreography

| Event | Duration | Easing | Detail |
|-------|----------|--------|--------|
| Page load — title | 1s | ease-out | Title assembles/reveals |
| Page load — tagline | 0.5s | ease-out | Fades in 0.3s after title |
| Page load — scroll cue | 0.5s | ease-out | Appears last |
| Scroll — nav appear | 0.3s | ease-out | Fades in when hero passes |
| Scroll — card reveal | 0.6s | ease-out | Staggered by layout position |
| Hover — card lift | 0.3s | ease-out | translateY(-4px) + shadow |
| Hover — visual animate | 0.5s | ease-in-out | Rotate/pulse/shift |
| Click — card expand | 0.5s | ease-out | Expand to full width |
| Click — content sequence | 0.3s each | ease-out | 0.05s staggers |
| Click — color bleed | 0.7s | ease-in-out | Background gradient shift |
| Close — reverse all | 0.4s | ease-out | Reverse choreography |

### Reduced Motion

All motion respects `prefers-reduced-motion`:
- Instant state changes
- No animation
- Same content and layout
- Functional parity

---

## Interaction Details

### Keyboard Accessibility

- `Tab` navigates between product cards
- `Enter` / `Space` opens product reveal
- `Escape` closes product reveal
- Focus management: focus moves into expanded card, returns on close

### Touch / Mobile

- Cards stack to single column below 640px
- Hero title scales down (stays bold via clamp)
- Product reveals become full-width takeovers on mobile
- Close targets minimum 44px
- Swipe gesture not required (button close sufficient)

### Performance

- Zero external JS dependencies
- CSS-only abstract visuals (no canvas, no WebGL)
- Intersection Observer for scroll-triggered reveals
- 60fps target for all animations
- Single HTML file architecture maintained

---

## Product Data

Eight products, each with: name, tag, short description, long description, features (3), accent color, visual motif, external link.

| # | Product | Tag | Description |
|---|---------|-----|-------------|
| 1 | Signal | Analytics | Real-time analytics for modern teams |
| 2 | Forge | Developer Tools | Build, test, and deploy with precision |
| 3 | Meridian | Project Management | Navigate projects from start to finish |
| 4 | Vault | Security | Enterprise-grade protection, simplified |
| 5 | Prism | Design Systems | Design tokens and components at scale |
| 6 | Relay | Communications | Team messaging that stays out of the way |
| 7 | Atlas | Data Platform | Map, query, and understand your data |
| 8 | Orbit | Infrastructure | Cloud infrastructure that scales with you |

---

## Technical Architecture

- Single `index.html` file (self-contained)
- Embedded `<style>` block with CSS custom properties for theming
- Embedded `<script>` block with vanilla JS
- Hash-based routing for product deep-links
- Google Fonts for TASA Orbiter + body font
- GitHub Pages deployment (CNAME: weareeight.com)
- No build step. No bundler. No framework.

---

## Success Criteria

The site should make someone:
1. **Stop scrolling** — the hero arrests attention
2. **Explore every product** — the editorial layout and color worlds create curiosity
3. **Remember the name** — "Eight" sticks because of how it was presented
4. **Trust the studio** — the execution quality proves capability without saying it
5. **Share the URL** — the site is distinctive enough that people send it to others
