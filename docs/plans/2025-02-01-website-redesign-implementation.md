# Eight Website Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild weareeight.com as a bold, expressive single-page product showcase with asymmetric editorial layout, per-product color worlds, inline expanding reveals, and TASA Orbiter typography.

**Architecture:** Single self-contained `index.html` file. All CSS in an embedded `<style>` tag, all JS in an embedded `<script>` tag. Zero external dependencies except Google Fonts. Hash-based routing for product deep-links.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, grid, clip-path, blend modes), vanilla JS (IntersectionObserver, hash routing, CSS transition orchestration). Google Fonts: TASA Orbiter (display) + Inter (body).

**Design Spec:** `docs/plans/2025-02-01-website-redesign-design.md`

---

## Task 1: Foundation — HTML Structure, Fonts, CSS Reset & Variables

**Files:**
- Rewrite: `index.html` (complete replacement)

**Step 1: Write the HTML shell with fonts and CSS foundation**

Replace the entire `index.html` with the new foundation. This establishes:
- Meta tags, title, description
- Google Fonts: TASA Orbiter (variable, weights 400-800) + Inter (weights 400-500)
- CSS reset, custom properties (base palette + all 8 accent colors + easing)
- Body base styles, scrollbar, selection
- Empty semantic HTML structure (nav, hero, products section, footer)
- Empty `<script>` tag

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eight — Digital Products</title>
    <meta name="description" content="Eight builds digital products — SaaS tools and Shopify themes crafted with precision.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=TASA+Orbiter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
            /* Base palette */
            --bg: #08080A;
            --fg: #EAEAEA;
            --fg-muted: #787878;
            --fg-subtle: #3a3a3a;

            /* Product accents */
            --accent-signal: #E8A849;
            --accent-forge: #5B8DEF;
            --accent-meridian: #6BAF8D;
            --accent-vault: #7B6FD4;
            --accent-prism: #D4708F;
            --accent-relay: #4DBDB9;
            --accent-atlas: #B8A99A;
            --accent-orbit: #9B8EC4;

            /* Typography */
            --font-display: 'TASA Orbiter', sans-serif;
            --font-body: 'Inter', sans-serif;

            /* Easing */
            --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
            --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
        }

        html { scroll-behavior: smooth; font-size: 16px; }

        body {
            font-family: var(--font-body);
            background-color: var(--bg);
            color: var(--fg);
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
            line-height: 1.5;
        }

        a { color: inherit; text-decoration: none; }
        ::selection { background: var(--fg); color: var(--bg); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--fg-subtle); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--fg-muted); }

        .container { max-width: 1320px; margin: 0 auto; padding: 0 40px; }
        @media (max-width: 768px) { .container { padding: 0 20px; } }
    </style>
</head>
<body>
    <nav id="nav"></nav>
    <main>
        <section class="hero" id="hero"></section>
        <section class="products" id="products"></section>
    </main>
    <footer id="footer"></footer>
    <script>
        // Implementation follows in subsequent tasks
    </script>
</body>
</html>
```

**Step 2: Verify it loads**

Open `index.html` in browser. Should see a black page with no errors in console. Check Network tab to confirm both fonts load from Google Fonts.

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: foundation — HTML shell, fonts, CSS reset & variables"
```

---

## Task 2: Hero Section — Full Viewport with Animated Typography

**Files:**
- Modify: `index.html` (CSS + HTML sections)

**Step 1: Add Hero CSS**

Add to the `<style>` block, after the container styles:

```css
/* ── Nav ── */
nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 24px 0;
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out),
                background 0.5s var(--ease-out), padding 0.4s var(--ease-out);
    pointer-events: none;
}

nav.visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

nav.scrolled {
    background: rgba(8, 8, 10, 0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 16px 0;
}

nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-wordmark {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.02em;
}

.nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
}

.nav-links a {
    font-size: 14px;
    color: var(--fg-muted);
    transition: color 0.3s var(--ease-out);
}

.nav-links a:hover { color: var(--fg); }

/* ── Hero ── */
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.hero-title {
    font-family: var(--font-display);
    font-size: clamp(72px, 14vw, 200px);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.9;
    opacity: 0;
    animation: heroReveal 1.2s var(--ease-out) 0.2s forwards;
    /* Gradient mask breathing effect */
    background: linear-gradient(
        135deg,
        var(--fg) 0%,
        var(--fg-muted) 50%,
        var(--fg) 100%
    );
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: heroReveal 1.2s var(--ease-out) 0.2s forwards,
               gradientShift 8s var(--ease-in-out) infinite 1.5s;
}

.hero-tagline {
    font-family: var(--font-body);
    font-size: clamp(16px, 2vw, 20px);
    color: var(--fg-muted);
    margin-top: 24px;
    opacity: 0;
    animation: fadeUp 0.8s var(--ease-out) 1s forwards;
}

.hero-scroll-line {
    position: absolute;
    bottom: 40px;
    left: 50%;
    width: 1px;
    height: 0;
    background: var(--fg-subtle);
    animation: scrollLine 1.2s var(--ease-out) 1.5s forwards;
}

@keyframes heroReveal {
    from { opacity: 0; transform: translateY(30px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

@keyframes scrollLine {
    from { height: 0; }
    to { height: 60px; }
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

**Step 2: Add Hero HTML**

Replace the nav and hero placeholders:

```html
<nav id="nav">
    <div class="container">
        <a href="#/" class="nav-wordmark">Eight</a>
        <ul class="nav-links">
            <li><a href="#products">Products</a></li>
        </ul>
    </div>
</nav>

<main>
    <section class="hero" id="hero">
        <h1 class="hero-title">Eight</h1>
        <p class="hero-tagline">We make digital products.</p>
        <div class="hero-scroll-line"></div>
    </section>
    <!-- products and footer follow -->
</main>
```

**Step 3: Add nav scroll JS**

In the `<script>` tag, add the IntersectionObserver to show/hide nav based on hero visibility:

```js
// ── Nav visibility ──
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

const heroObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
}, { threshold: 0.1 });

heroObserver.observe(hero);

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });
```

**Step 4: Verify hero**

Open in browser. Should see:
- Full viewport black background
- "Eight" title centered, large, with gradient text effect
- Title animates in (fade up + scale)
- Tagline fades in after title
- Thin scroll line extends at bottom center
- Nav is hidden until you scroll past hero
- Nav shows frosted glass background when scrolled

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: hero section with animated typography and scroll-aware nav"
```

---

## Task 3: Product Data & Asymmetric Editorial Grid Layout

**Files:**
- Modify: `index.html` (CSS + JS)

**Step 1: Add product data to JS**

Add the products array with the new accent colors and visual motif metadata:

```js
const products = [
    {
        slug: 'signal', name: 'Signal', tag: 'Analytics',
        description: 'Real-time analytics that surface what matters.',
        longDesc: 'Signal cuts through noise to give teams the metrics they actually need. Real-time dashboards, smart anomaly detection, and data pipelines that connect any source.',
        accent: '#E8A849',
        features: [
            { title: 'Live Dashboards', desc: 'Custom dashboards that update in real-time with the metrics your team cares about.' },
            { title: 'Smart Alerts', desc: 'Anomaly detection that learns your patterns and alerts only when it matters.' },
            { title: 'Data Pipelines', desc: 'Connect any source. Transform, aggregate, and route data without writing ETL code.' }
        ]
    },
    // ... (all 8 products with same structure, each with their accent hex)
];
```

**Step 2: Add editorial grid CSS**

The asymmetric layout uses CSS Grid with named template areas for the magazine-style stagger:

```css
/* ── Products Section ── */
.products { padding: 120px 0 80px; }

.products-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 48px;
}

.products-label {
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--fg-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.products-count {
    font-size: 14px;
    color: var(--fg-subtle);
}

/* Asymmetric editorial grid */
.products-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-auto-rows: auto;
    gap: 3px;
}

/* Alternate row pattern: cards 3,4,5 form a 3-column row */
.product-card:nth-child(3) { grid-column: 1; }
.product-card:nth-child(4) { grid-column: 2; }

/* Row 3: flip the ratio */
.product-card:nth-child(5) { grid-column: 1 / -1; }
/* Make row 3 a sub-grid of 2fr 3fr (inverted) */

/* We'll use a different approach: explicit grid areas */
.products-grid {
    display: grid;
    gap: 3px;
    grid-template-columns: repeat(12, 1fr);
}

.product-card:nth-child(1) { grid-column: span 7; }  /* Large left */
.product-card:nth-child(2) { grid-column: span 5; }  /* Small right */
.product-card:nth-child(3) { grid-column: span 4; }  /* Three equal-ish */
.product-card:nth-child(4) { grid-column: span 4; }
.product-card:nth-child(5) { grid-column: span 4; }
.product-card:nth-child(6) { grid-column: span 5; }  /* Inverted row */
.product-card:nth-child(7) { grid-column: span 7; }
.product-card:nth-child(8) { grid-column: 1 / -1; }  /* Full width finale */

@media (max-width: 768px) {
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .product-card:nth-child(n) { grid-column: span 1; }
    .product-card:nth-child(8) { grid-column: span 2; }
}

@media (max-width: 520px) {
    .products-grid { grid-template-columns: 1fr; }
    .product-card:nth-child(n) { grid-column: span 1; }
}
```

**Step 3: Add product card CSS**

```css
/* ── Product Card ── */
.product-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    min-height: 340px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    background: #111113;
    transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}

/* Each card gets its accent as a CSS variable */
.product-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse at 30% 20%,
        color-mix(in srgb, var(--card-accent) 12%, transparent) 0%,
        transparent 70%
    );
    transition: opacity 0.5s var(--ease-out);
    opacity: 0.6;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 60px -15px rgba(0,0,0,0.5);
}

.product-card:hover::before {
    opacity: 1;
}

.product-card-tag {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--card-accent);
    margin-bottom: 12px;
    position: relative;
}

.product-card-name {
    font-family: var(--font-display);
    font-size: clamp(24px, 3vw, 40px);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 8px;
    position: relative;
}

.product-card-desc {
    font-size: 15px;
    color: var(--fg-muted);
    line-height: 1.55;
    max-width: 400px;
    position: relative;
}

/* Arrow indicator */
.product-card-arrow {
    position: absolute;
    top: 28px;
    right: 28px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translate(-8px, 8px);
    transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.product-card:hover .product-card-arrow {
    opacity: 0.6;
    transform: translate(0, 0);
}

.product-card-arrow svg {
    width: 16px;
    height: 16px;
    stroke: var(--fg);
    stroke-width: 1.5;
    fill: none;
}
```

**Step 4: Add abstract visual CSS motifs**

Each product card gets a unique CSS-only geometric visual in the background:

```css
/* ── Abstract Visual Motifs ── */
.product-card-visual {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 70%;
    opacity: 0.08;
    transition: opacity 0.5s var(--ease-out), transform 0.7s var(--ease-out);
    pointer-events: none;
}

.product-card:hover .product-card-visual {
    opacity: 0.14;
    transform: scale(1.05) rotate(2deg);
}

/* Signal — waveform */
.visual-signal {
    background:
        repeating-linear-gradient(
            0deg,
            transparent,
            transparent 18px,
            var(--card-accent) 18px,
            var(--card-accent) 19px
        );
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M0,50 Q25,10 50,50 T100,50 T150,50 T200,50' fill='none' stroke='white' stroke-width='60'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Cpath d='M0,50 Q25,10 50,50 T100,50 T150,50 T200,50' fill='none' stroke='white' stroke-width='60'/%3E%3C/svg%3E");
    mask-size: cover;
    -webkit-mask-size: cover;
}

/* Forge — intersecting planes */
.visual-forge {
    background:
        linear-gradient(45deg, transparent 40%, var(--card-accent) 40%, var(--card-accent) 41%, transparent 41%),
        linear-gradient(-45deg, transparent 40%, var(--card-accent) 40%, var(--card-accent) 41%, transparent 41%),
        linear-gradient(30deg, transparent 45%, var(--card-accent) 45%, var(--card-accent) 46%, transparent 46%);
}

/* Meridian — grid lines */
.visual-meridian {
    background:
        linear-gradient(0deg, transparent 95%, var(--card-accent) 95%),
        linear-gradient(90deg, transparent 95%, var(--card-accent) 95%);
    background-size: 30px 30px;
}

/* Vault — nested rectangles */
.visual-vault {
    border: 1px solid var(--card-accent);
    box-shadow:
        inset 20px 20px 0 -19px var(--card-accent),
        inset 40px 40px 0 -39px var(--card-accent),
        inset 60px 60px 0 -59px var(--card-accent),
        inset -20px -20px 0 -19px var(--card-accent),
        inset -40px -40px 0 -39px var(--card-accent);
}

/* Prism — refracted triangles */
.visual-prism {
    background:
        linear-gradient(60deg, transparent 60%, color-mix(in srgb, var(--card-accent) 30%, transparent) 60%),
        linear-gradient(120deg, transparent 55%, color-mix(in srgb, var(--card-accent) 20%, transparent) 55%),
        linear-gradient(0deg, transparent 70%, color-mix(in srgb, var(--card-accent) 15%, transparent) 70%);
}

/* Relay — connected dots (using radial gradients) */
.visual-relay {
    background:
        radial-gradient(circle 3px, var(--card-accent) 100%, transparent 100%);
    background-size: 40px 40px;
    background-position: 10px 10px;
}

/* Atlas — topographic contours */
.visual-atlas {
    border-radius: 50%;
    border: 1px solid var(--card-accent);
    box-shadow:
        0 0 0 20px transparent,
        0 0 0 21px var(--card-accent),
        0 0 0 44px transparent,
        0 0 0 45px var(--card-accent),
        0 0 0 70px transparent,
        0 0 0 71px var(--card-accent);
    width: 50%;
    height: 80%;
    top: 10%;
    right: 5%;
}

/* Orbit — concentric circles */
.visual-orbit {
    border-radius: 50%;
    border: 1px solid var(--card-accent);
    box-shadow:
        0 0 0 25px transparent,
        0 0 0 26px var(--card-accent),
        0 0 0 55px transparent,
        0 0 0 56px var(--card-accent),
        0 0 0 90px transparent,
        0 0 0 91px var(--card-accent);
}
```

**Step 5: Render product cards via JS**

```js
// ── Product Data ──
const products = [
    {
        slug: 'signal', name: 'Signal', tag: 'Analytics',
        description: 'Real-time analytics that surface what matters.',
        longDesc: 'Signal cuts through noise to give teams the metrics they actually need. Real-time dashboards, smart anomaly detection, and data pipelines that connect any source.',
        accent: '#E8A849', visual: 'signal',
        features: [
            { title: 'Live Dashboards', desc: 'Custom dashboards that update in real-time with the metrics your team cares about.' },
            { title: 'Smart Alerts', desc: 'Anomaly detection that learns your patterns and alerts only when it matters.' },
            { title: 'Data Pipelines', desc: 'Connect any source. Transform, aggregate, and route data without writing ETL code.' }
        ]
    },
    // ... all 8 products
];

// ── Render Products ──
const grid = document.getElementById('productsGrid');

products.forEach((product, i) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.style.setProperty('--card-accent', product.accent);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${product.name} — ${product.tag}`);
    card.dataset.slug = product.slug;

    card.innerHTML = `
        <div class="product-card-visual visual-${product.visual}"></div>
        <div class="product-card-arrow">
            <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </div>
        <span class="product-card-tag">${product.tag}</span>
        <h2 class="product-card-name">${product.name}</h2>
        <p class="product-card-desc">${product.description}</p>
    `;

    card.addEventListener('click', () => openProduct(product.slug));
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openProduct(product.slug);
        }
    });

    grid.appendChild(card);
});
```

**Step 6: Add scroll reveal observer**

```js
// ── Scroll Reveal ──
function observeReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
}

// Reveal CSS
// (add to <style>)
// .reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out); }
// .reveal.visible { opacity: 1; transform: translateY(0); }

observeReveals();
```

**Step 7: Add products section HTML**

```html
<section class="products" id="products">
    <div class="container">
        <div class="products-header reveal">
            <span class="products-label">Products</span>
            <span class="products-count">01—08</span>
        </div>
        <div class="products-grid" id="productsGrid">
            <!-- Cards injected by JS -->
        </div>
    </div>
</section>
```

**Step 8: Verify grid**

Open in browser. Should see:
- Asymmetric grid: first row 7:5 ratio, second row 4:4:4, third row 5:7, last card full width
- Each card has unique accent color tinting the background
- Each card has a different abstract visual motif in the upper right
- Hover lifts the card, intensifies the accent, shows arrow
- Cards are keyboard-focusable
- Staggered scroll reveal on scroll

**Step 9: Commit**

```bash
git add index.html
git commit -m "feat: asymmetric editorial product grid with color worlds and abstract visuals"
```

---

## Task 4: Product Inline Expanding Reveal

**Files:**
- Modify: `index.html` (CSS + JS)

**Step 1: Add expanded state CSS**

```css
/* ── Product Reveal (Expanded State) ── */
.products-grid.has-expanded .product-card {
    opacity: 0;
    transform: scale(0.95);
    pointer-events: none;
    transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.products-grid.has-expanded .product-card.expanded {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
    grid-column: 1 / -1 !important;
    min-height: auto;
    cursor: default;
}

.product-expanded-content {
    display: none;
    padding-top: 40px;
}

.product-card.expanded .product-expanded-content {
    display: block;
}

.product-card.expanded .product-card-visual {
    opacity: 0.06;
    width: 40%;
    height: 100%;
}

.product-card.expanded .product-card-name {
    font-size: clamp(36px, 5vw, 72px);
}

.product-card.expanded .product-card-desc {
    display: none;
}

.product-expanded-desc {
    font-size: 18px;
    color: var(--fg-muted);
    line-height: 1.7;
    max-width: 640px;
    margin-bottom: 48px;
    opacity: 0;
    animation: fadeUp 0.5s var(--ease-out) 0.15s forwards;
}

.product-expanded-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    padding-top: 40px;
    border-top: 1px solid var(--fg-subtle);
}

.product-expanded-features .feature-item {
    opacity: 0;
    animation: fadeUp 0.4s var(--ease-out) forwards;
}

.product-expanded-features .feature-item:nth-child(1) { animation-delay: 0.2s; }
.product-expanded-features .feature-item:nth-child(2) { animation-delay: 0.25s; }
.product-expanded-features .feature-item:nth-child(3) { animation-delay: 0.3s; }

.feature-item h3 {
    font-family: var(--font-display);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
}

.feature-item p {
    font-size: 14px;
    color: var(--fg-muted);
    line-height: 1.6;
}

.product-expanded-actions {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-top: 48px;
    opacity: 0;
    animation: fadeUp 0.4s var(--ease-out) 0.35s forwards;
}

.product-visit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border: 1px solid var(--card-accent);
    color: var(--card-accent);
    font-size: 14px;
    font-family: var(--font-body);
    transition: background 0.3s var(--ease-out), color 0.3s var(--ease-out);
    cursor: pointer;
}

.product-visit-btn:hover {
    background: var(--card-accent);
    color: var(--bg);
}

.product-visit-btn svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    stroke-width: 1.5;
    fill: none;
}

.product-close-btn {
    position: absolute;
    top: 28px;
    right: 28px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    animation: fadeIn 0.3s var(--ease-out) 0.2s forwards;
    background: none;
    border: none;
    color: var(--fg-muted);
    transition: color 0.3s var(--ease-out);
}

.product-close-btn:hover { color: var(--fg); }

.product-close-btn svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 1.5;
    fill: none;
}

/* Color bleed effect on body */
body.product-open::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    background: radial-gradient(
        ellipse at 50% 30%,
        var(--active-accent) 0%,
        transparent 70%
    );
    opacity: 0.07;
    transition: opacity 0.7s var(--ease-in-out);
}

@media (max-width: 768px) {
    .product-expanded-features {
        grid-template-columns: 1fr;
        gap: 28px;
    }
}
```

**Step 2: Add expand/collapse JS**

```js
// ── Product Expand/Collapse ──
let activeProduct = null;

function openProduct(slug) {
    const product = products.find(p => p.slug === slug);
    if (!product) return;

    const grid = document.getElementById('productsGrid');
    const card = grid.querySelector(`[data-slug="${slug}"]`);
    if (!card) return;

    activeProduct = slug;
    window.location.hash = `#${slug}`;

    // Set color bleed
    document.body.classList.add('product-open');
    document.body.style.setProperty('--active-accent', product.accent);

    // Inject expanded content
    let expanded = card.querySelector('.product-expanded-content');
    if (!expanded) {
        expanded = document.createElement('div');
        expanded.className = 'product-expanded-content';
        expanded.innerHTML = `
            <button class="product-close-btn" aria-label="Close">
                <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <p class="product-expanded-desc">${product.longDesc}</p>
            <div class="product-expanded-features">
                ${product.features.map(f => `
                    <div class="feature-item">
                        <h3>${f.title}</h3>
                        <p>${f.desc}</p>
                    </div>
                `).join('')}
            </div>
            <div class="product-expanded-actions">
                <a href="#" class="product-visit-btn" target="_blank" rel="noopener">
                    Visit ${product.name}
                    <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                </a>
            </div>
        `;
        card.appendChild(expanded);

        expanded.querySelector('.product-close-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            closeProduct();
        });
    }

    // Expand
    grid.classList.add('has-expanded');
    card.classList.add('expanded');

    // Scroll to card
    requestAnimationFrame(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Focus management
    const closeBtn = card.querySelector('.product-close-btn');
    if (closeBtn) closeBtn.focus();
}

function closeProduct() {
    const grid = document.getElementById('productsGrid');
    const expandedCard = grid.querySelector('.product-card.expanded');

    if (expandedCard) {
        expandedCard.classList.remove('expanded');
    }

    grid.classList.remove('has-expanded');
    document.body.classList.remove('product-open');
    activeProduct = null;
    window.location.hash = '#/';

    // Return focus to the card
    if (expandedCard) {
        requestAnimationFrame(() => expandedCard.focus());
    }
}

// Escape to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeProduct) {
        closeProduct();
    }
});

// Hash routing
function handleHash() {
    const hash = window.location.hash.slice(1); // remove #
    if (hash && hash !== '/' && hash !== 'products') {
        const product = products.find(p => p.slug === hash);
        if (product && activeProduct !== hash) {
            openProduct(hash);
        }
    } else if (activeProduct) {
        closeProduct();
    }
}

window.addEventListener('hashchange', handleHash);
// On load
handleHash();
```

**Step 3: Verify expand/collapse**

Open in browser. Test:
- Click a product card → card expands to full width, others fade out
- Product name enlarges, description and features animate in
- Background gets subtle color bleed from product accent
- Close button (×) appears top right → click closes, grid reforms
- Escape key closes
- Tab/Enter opens a card
- URL updates with hash (#signal, etc.)
- Direct navigation to `#signal` opens that product on load
- Focus moves to close button on open, back to card on close

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: inline product expand/collapse with color bleed and keyboard nav"
```

---

## Task 5: Footer & Reduced Motion

**Files:**
- Modify: `index.html` (CSS + HTML)

**Step 1: Add footer CSS**

```css
/* ── Footer ── */
footer {
    padding: 48px 0;
    border-top: 1px solid var(--fg-subtle);
    margin-top: 120px;
}

.footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-brand {
    font-family: var(--font-display);
    font-size: 14px;
    color: var(--fg-muted);
}

.footer-links {
    display: flex;
    gap: 28px;
}

.footer-links a {
    font-size: 13px;
    color: var(--fg-muted);
    transition: color 0.3s var(--ease-out);
}

.footer-links a:hover { color: var(--fg); }

@media (max-width: 520px) {
    .footer-inner {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
}
```

**Step 2: Add footer HTML**

```html
<footer>
    <div class="container">
        <div class="footer-inner">
            <span class="footer-brand">Eight — Digital Products</span>
            <div class="footer-links">
                <a href="https://x.com" target="_blank" rel="noopener">X</a>
                <a href="mailto:hello@weareeight.com">Contact</a>
                <a href="#/">Terms</a>
                <a href="#/">Privacy</a>
            </div>
        </div>
    </div>
</footer>
```

**Step 3: Add reduced motion CSS**

```css
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    html { scroll-behavior: auto; }
    .reveal { opacity: 1; transform: none; }
    .hero-title { opacity: 1; background-position: 0% 50% !important; }
    .hero-tagline { opacity: 1; }
    .hero-scroll-line { height: 60px; }
    nav { opacity: 1; transform: none; pointer-events: auto; }
}
```

**Step 4: Verify**

- Footer renders at bottom with correct layout
- Reduced motion: enable in system preferences → all animations are instant, all content visible
- Responsive: check at 520px breakpoint for stacked footer

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: footer and reduced motion support"
```

---

## Task 6: Responsive Polish, Performance & Final QA

**Files:**
- Modify: `index.html`

**Step 1: Mobile responsive passes**

Test and fix these breakpoints:
- **1024px:** Grid should still be readable, cards not too small
- **768px:** Two-column grid, stacked hero, adjusted padding
- **520px:** Single-column grid, full-width cards, stacked footer
- **375px (iPhone SE):** Everything still legible, no horizontal scroll

Ensure:
- All touch targets ≥ 44px
- Product expand works on mobile (full-width takeover)
- Close button easily reachable on mobile
- Feature grid stacks to single column on mobile

**Step 2: Performance check**

- Confirm no layout shifts (CLS = 0)
- Confirm no external JS loaded
- Confirm fonts load with `display=swap` (no invisible text)
- Run Lighthouse audit — target 95+ on Performance, 100 on Accessibility

**Step 3: Cross-browser basics**

- Verify `color-mix()` fallbacks for older browsers (add fallback backgrounds)
- Verify `-webkit-background-clip` for Safari
- Verify `backdrop-filter` for Safari

**Step 4: Final CSS cleanup**

- Remove any unused styles from old design
- Ensure no duplicate declarations
- Verify CSS custom properties are all referenced

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: responsive polish, performance optimization, and cross-browser fixes"
```

---

## Task 7: Final Review & Integration Commit

**Files:**
- Verify: `index.html`, `CNAME`

**Step 1: Full manual walkthrough**

Verify against the design spec (`docs/plans/2025-02-01-website-redesign-design.md`):
- [ ] Hero: Full viewport, "Eight" in TASA Orbiter at massive scale, gradient breathing
- [ ] Tagline: "We make digital products." fades in after title
- [ ] Scroll line: Extends at bottom of hero
- [ ] Nav: Hidden until scroll past hero, frosted glass when scrolled
- [ ] Products: Asymmetric editorial grid (7:5, 4:4:4, 5:7, full)
- [ ] Cards: Unique accent colors, abstract CSS visuals, hover lift
- [ ] Expand: Full-width inline reveal, color bleed, content sequence
- [ ] Close: Escape, button, hash — all work, animation reverses
- [ ] Keyboard: Tab through cards, Enter to open, Escape to close
- [ ] Footer: "Eight — Digital Products" + links
- [ ] Reduced motion: All content visible, no animation
- [ ] Mobile: Responsive at all breakpoints
- [ ] Performance: No external JS, fonts swap, minimal paint

**Step 2: Final commit (if any changes)**

```bash
git add index.html
git commit -m "polish: final QA pass and design spec verification"
```

---

## Execution Notes

- **All work is in a single file** (`index.html`). Each task adds CSS and/or JS to the embedded blocks.
- **No build tools needed.** Open `index.html` directly in a browser to test.
- **TASA Orbiter** is loaded from Google Fonts: `https://fonts.googleapis.com/css2?family=TASA+Orbiter:wght@400;500;600;700`
- **`color-mix()`** has wide support (Chrome 111+, Safari 16.2+, Firefox 113+) but add fallbacks for older browsers.
- **Commit after each task.** Each task produces a working, shippable increment.
