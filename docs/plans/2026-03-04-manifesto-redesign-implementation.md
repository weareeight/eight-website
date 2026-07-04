# Manifesto Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Eight website from a product showcase into a bold, manifesto-style About Us page.

**Architecture:** Single-file rewrite of index.html. Strip all product-related CSS/HTML/JS. Replace with stats ribbon, full-viewport belief statements with fresh generative visuals, and minimal footer.

**Tech Stack:** Vanilla HTML/CSS/JS, GitHub Pages, TASA Orbiter font.

---

### Task 1: Rewrite the full page

**Files:**
- Modify: `index.html` (complete rewrite of content, keeping infrastructure)

**What to keep:**
- Head: charset, viewport, theme-color, favicons, manifest, Google Fonts
- CSS: reset, custom properties (base palette + fonts + easing only — remove product accents), body, scrollbar, selection, link reset, container, keyframes (fadeUp, scrollLine, fadeIn), hero + hero-logo + dot animations, scroll reveal, footer, cookie consent, reduced motion
- HTML: hero section (update tagline), cookie consent dialog
- JS: scroll reveal observer, cookie consent/GA script

**What to remove:**
- CSS: all product accent vars, nav styles, product grid, product card, visual motifs (signal/forge/meridian/vault/prism/relay/atlas/orbit/themestack), expand state, color bleed, expanded content, close button, visit button, product images, nav logo styles
- HTML: nav element, products section
- JS: nav scroll observer, nav hover flicker, product data array, render cards, expand/collapse functions, hash routing, lazy-load bg observer

**What to add:**

**CSS — Stats ribbon:**
```css
.stats {
    padding: 0 0 120px;
    opacity: 0;
    animation: fadeUp 0.8s var(--ease-out) 2.4s forwards;
}

.stats-inner {
    display: flex;
    justify-content: center;
    gap: 48px;
    font-size: 14px;
    color: var(--fg-muted);
    letter-spacing: 0.05em;
}

.stats-inner span {
    white-space: nowrap;
}

@media (max-width: 520px) {
    .stats-inner {
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
}
```

**CSS — Beliefs section:**
```css
.beliefs {
    padding: 0 0 120px;
}

.belief {
    min-height: 80vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.belief-text {
    font-family: var(--font-display);
    font-size: clamp(28px, 5vw, 64px);
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.15;
    max-width: 900px;
    position: relative;
    z-index: 1;
}

.belief-visual {
    position: absolute;
    right: -5%;
    top: 50%;
    transform: translateY(-50%);
    width: 45%;
    height: 70%;
    opacity: 0.04;
    pointer-events: none;
    transition: opacity 0.8s var(--ease-out);
}

.belief.visible .belief-visual {
    opacity: 0.07;
}
```

**CSS — Fresh generative visuals (4 new patterns):**
- Weave: intersecting fine diagonal lines
- Pulse: concentric expanding circles
- Lattice: fine dot grid
- Shift: horizontal gradient bands

**HTML — Stats ribbon (after hero, before beliefs):**
```html
<section class="stats">
    <div class="container">
        <div class="stats-inner">
            <span>Est. 2012</span>
            <span>11 people</span>
            <span>United Kingdom</span>
        </div>
    </div>
</section>
```

**HTML — Beliefs section:**
```html
<section class="beliefs">
    <div class="container">
        <div class="belief reveal">
            <div class="belief-visual visual-weave"></div>
            <p class="belief-text">Software should be beautiful. Not just functional — beautiful.</p>
        </div>
        <div class="belief reveal">
            <div class="belief-visual visual-pulse"></div>
            <p class="belief-text">Small teams. No layers. Every engineer ships.</p>
        </div>
        <div class="belief reveal">
            <div class="belief-visual visual-lattice"></div>
            <p class="belief-text">We've been doing this since 2012. We'll be doing it long after the hype fades.</p>
        </div>
        <div class="belief reveal">
            <div class="belief-visual visual-shift"></div>
            <p class="belief-text">Craft compounds. Every detail matters because details are all there is.</p>
        </div>
    </div>
</section>
```

**HTML — Footer:**
```html
<footer>
    <div class="container">
        <div class="footer-inner">
            <p class="footer-quiet">&copy; Eight 2026</p>
        </div>
    </div>
</footer>
```

**JS — Simplified (only need):**
- Scroll reveal observer (unchanged)
- Cookie consent (unchanged)

**Update head:**
- Title: "Eight — Software Engineering"
- Meta description: "Eight. Software engineering since 2012."

**Step 1:** Rewrite index.html with all changes above.

**Step 2:** Test in browser — verify hero, stats, beliefs scroll-reveal, footer, cookie consent, reduced motion, responsive.

**Step 3:** Commit.

```bash
git add index.html
git commit -m "feat: transform site from product showcase to manifesto-style about page"
```
