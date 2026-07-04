---
date: 2026-07-04
topic: holding-page-redesign
---

# Eight Holding Page — Spitball Round

## The Brief (as stated)

- Live site = eight dots + "We Make Software" + click-8-times chaos easter egg.
- The chaos effect is loved, but nobody discovers it. The lesson: fun must be
  ambient or invited, never hidden behind an unhinted interaction.
- The eight dots are the logo (screenshot = logo) — keep them central.
- Purpose of the page: verify Eight is a legit small software studio. No sales CTA.
- Direction: something really fun.

## Note: existing WIP

`feature/single-page-site` has an uncommitted "manifesto" redesign
(hero + stats ribbon + belief statements, see
`docs/plans/2026-03-04-manifesto-redesign-*.md`). That direction is quiet and
serious — the opposite of this brief. Decide whether to abandon or cherry-pick
(the stats ribbon `Est. 2012 · 11 people · UK` is worth keeping in any concept).

## Concepts

### 1. The Ninth Dot ⭐ recommended
The logo is a 3×3 grid with the ninth position empty. Make the visitor's cursor
a dot — same size, same colour. The eight dots react to it (lean toward it,
make room). The empty corner reads as an invitation; when the cursor rests in
the ninth position and completes the grid, the beloved chaos mode fires.
- Solves discoverability with gestalt pattern-completion instead of instructions.
- Keeps the existing chaos payoff almost verbatim.
- Mobile: tap the gap (the gap can subtly pulse on touch devices).

### 2. The Dots Make Software
Ambient vignette loop: the dots break formation and literally build things —
scaffold a wireframe, type into a terminal, plot a graph, assemble a mobile
screen — then return to the logo. "We make software," demonstrated by the logo
itself, no interaction required.

### 3. Desk Pets
The dots are eight little creatures with boid-ish behaviour: idle formations,
curiosity about the cursor, startle reflexes, one falls asleep after hours
(real local time), they scatter and regroup. Fun is ambient and immediate.

### 4. Proof of Life
Legitimacy as the concept: the dots pulse on real GitHub org activity
(public API), with a quiet line like "last shipped 3 hours ago · est. 2012 ·
11 people · UK". The page is quiet; the work visibly isn't.

### 5. Dot-Matrix Everything
The dot becomes the atom of the whole page: "WE MAKE SOFTWARE" rendered in
dot-matrix type that assembles/ripples/dissolves, and when it fades, the last
eight dots standing are the logo. One visual language, logo-first.

### 6. The Self-Aware Changelog
Copy-led and cheap: the page shows its own version history.
"v3.0 — removed the hidden thing nobody found. v2.4 — someone found it (hi, Dave).
v1.0 — eight dots." Craft + humour + longevity = legitimacy.

## Legitimacy layer (applies to every concept)

The current page fails the "are they real?" test regardless of visuals. Add a
quiet strip: Est. 2012 · 11 people · UK · hello@weareeight.com (+ optionally
Companies House number / product names). This alone fixes half the brief.

## Open Questions

- Keep the chaos-mode payoff (Ninth Dot preserves it) or retire it?
- Should product names appear at all, or is the manifesto-era "no products" stance still policy?
- Is there appetite for a live-data dependency (GitHub API) on a static GitHub Pages site?

## Next Steps

Pick a front-runner (or a combination — Ninth Dot + Desk Pets idle behaviour +
legitimacy strip compose well) → prototype it on a branch.
