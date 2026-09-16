# Lavi Motion Pass — CHANGELOG

**Folder:** `/workspace/website-tech/lavi-motion/`  
**Shipped:** Tue Sep 15, 2026 (PT)  
**Base:** Static redesign HTML (same copy, IA, ink/gold/sand, CTAs)

All image `src` / CSS `url(...)` now point at  
`https://lavi-smoke-liquor.vercel.app/img/FILENAME`  
so a Vercel HTML-only deploy still loads photos. Local `img/` kept as reference.

---

## Phase 1 — Lenis + ScrollTrigger product pacing

- **Lenis tuned:** lerp `0.08` desktop / `0.14` on touch (gentler, less fight with iOS); `syncTouch: false`.
- **GSAP 3.12.5 + ScrollTrigger** from jsDelivr.
- **Official Lenis ↔ ScrollTrigger wire:** `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add` / `lagSmoothing(0)`.
- **`prefers-reduced-motion`:** disables Lenis + scrub animations; age-gate still hides instantly; content remains readable.
- **`#stock` cards:** desktop scrubbed scale/opacity + image Ken-Burns; mobile short fade/snap only (no long pins).
- **`#deals` 818 block:** scrubbed bg scale/opacity, copy reveal, gold **price-claim stamp** (“Best 818 price in Reno”); Smirnoff mixer tips stagger in as three scrubbed beats.
- **`#locations`:** twin cards slide/stagger from opposite sides.
- **Marquee:** animation duration subtly tied to scroll velocity.

## Phase 2 — Ritual moments

- **Age-gate dissolve:** Yes → opacity + blur + scale into hero (not instant `display:none`); CSS shimmer behind type (no Rive required); `localStorage` key `lavi21` unchanged; reduced-motion = instant hide.
- **Hero cinema:** shelf-wall Ken-Burns / parallax scrubbed with scroll; smoke layers ease with scroll.
- **VIP success:** CSS 3D card-flip + gold flash on `.done` / `.flipped`; reduced-motion falls back to instant swap.
- **Watermark:** `Preview · Motion pass · WorkGrain`.

## Phase 3 — Glass showcase (lightweight)

- New **`#glass`** section after stock / before deals.
- Features `knives-case.jpg` in a CSS `perspective` + `rotateY` product card.
- Desktop: pointer tilt + slow auto-orbit; touch: static photo (no forced 3D).
- CTAs: **Call Midtown** / **See it Midtown** (no cart).
- No Three.js / WebGL — CSS-only for mobile reliability; photo is the mandatory fallback.

## Phase 4 — Pulse X WebGL film teardown (`pulse-webgl-v1`)

- Replaced the short photo `clip-path` peel (`#geekbar`) with a **Three.js CDN** procedural Pulse X: squat purple-metal body, curved constellation screen, 26–28 named meshes (tip, seals, shells, chassis halves, glass + module, constellation, brand plate, PCB, cell, coil/mesh/wick/tank/chimney, USB-C, LEDs, cap, screws).
- Sticky full-viewport canvas on a **1000vh / 750vh** runway. GSAP ScrollTrigger scrub: hold/orbit → sequential explode with labels → exploded hold → reverse reassemble → settle. Syncs with the page Lenis ticker.
- `prefers-reduced-motion` and missing-WebGL fall back to the real product photo. Old CSS-stick / slice-peel code removed. Rest of the Lavi page unchanged.

## Unchanged (intentional)

- Section IDs: `#top` `#stock` `#deals` `#locations` `#reviews` `#inner-circle`.
- All marketing copy, tel/maps/VIP CTAs, color tokens, fonts.
- Lazy images, sticky mobile call bar, FAQ, footer.
- Single static HTML — CDN Tailwind + Lenis + GSAP only. No build, no npm, no React.
