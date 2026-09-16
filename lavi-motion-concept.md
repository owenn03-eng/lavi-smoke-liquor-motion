# Lavi Smoke & Liquor — Motion Concept Draft

**Status:** Concept only (no implementation)  
**Audited:** Tue Sep 15, 2026 · evening PT  
**Live sites:** [Original](https://www.lavismokeliquor.com) · [Redesign (Vercel)](https://lavi-smoke-liquor.vercel.app)  
**Scroll / showcase refs:** [PAX](https://www.pax.com/) · [Dr.Dabber](https://drdabber.com/) · [Aether](https://aether1.ai/) · [Prism](https://prismwaterpipes.com/) · [Shopify Supply](https://shopify.supply/)

---

## 1. What each site is today

### Original — https://www.lavismokeliquor.com

- **Layout / IA:** Classic multi-page brochure site (Home, About Us, Product Gallery, Testimonials, Contact Us) plus location pages and “The Gram.” Homepage stacks phone numbers → welcome → two locations → “OUR PRODUCTS” (CBD / VAPE / ACCESSORIES) → why-us wall of text → Google reviews → review videos (Vimeo) → contact form → about/hours footer.
- **Vibe:** Local smoke-shop marketing — emoji-heavy copy, display fonts (Bebas/Passion One family mix), bright builder chrome. Reads as “vape shop that also has liquor/snacks,” not a dual premium brand.
- **Age-gate:** None detected in HTML/copy (no 21+ verify, no gate modal). Site opens straight into tobacco/vapor/alcohol content.
- **Ecommerce:** No cart, no Shopify/WooCommerce. Informational only — CTAs are Call / Map / Hours / Email / Leave a Review.
- **What sells:** Primary framing = vape + CBD + accessories. Beer/liquor/food appear in body copy and reviews, but are not first-class nav or product modules. Product Gallery currently leans hard into Smirnoff Electric Guava mixers more than glass/disposables cinema.
- **Tech:** Site-builder stack (hashed `/assets/application-*.js`, `/system/sites/…/custom.css`, `data-page-id`) — not a custom Next app. GA + reCAPTCHA on contact.
- **Gaps vs premium:** No age ritual, weak dual-business hierarchy, no product-as-hero cinema, no smooth scroll or scrubbed storytelling, emoji/brochure tone vs ritual brand, static photo collage energy, CTAs don’t create desire — they only route to phone/maps.

### Redesign — https://lavi-smoke-liquor.vercel.app (WorkGrain / Claude Code)

- **What improved:**
  - Dual business finally named and paced: **Smoke & Liquor**, marquee of Disposables → Heady Glass → 818 → Craft Beer → Kava → CBD → Cigars…
  - Clear section IA: Age gate → Hero → Marquee → What we stock (01–08) → Deals (818 hero + Smirnoff) → Photo strip → Why Lavi’s → Locations → Reviews → Inner Circle VIP → FAQ → Final CTA.
  - Premium visual system: ink `#0A0908`, gold `#D4A54A`, sand `#EFE7D8`, Bodoni Moda + Manrope + DM Mono, grain, hairline rules, gold eyebrows.
  - Age-gate present (localStorage `lavi21`), sticky nav, call/directions CTAs, VIP reward screen, “Watch the reel / Check today’s price.”
  - Real shelf photography (disposable wall, kava shots, glass case, merch hats) instead of stock emoji blocks.
- **Still flat / static:**
  - Lenis is already wired (`lenis@1.1.18`, `lerp: 0.09`) + IntersectionObserver `.rv` fades — that’s the whole motion system.
  - No ScrollTrigger scrub, no pinned scrollytelling, no Rive, no WebGL/Three, no product orbit, no configurator.
  - Age-gate is a prettier dead modal (fixed overlay + two buttons) — not a brand moment.
  - Hero is a single veiled still (`img/shelf-wall.jpg`), not a cinematic object.
  - Deals section sells 818 + Smirnoff with mixer tips — still brochure cards, not paced product pages.
  - Still **no ecommerce** (correct for counter-claim VIP model, but means motion must drive *visit*, not ATC).
- **Tech signals:** Static single HTML on **Vercel** (CDN Tailwind + inline CSS/JS). **Not** Next/React/`__NEXT_DATA__`. Detectable libs: Tailwind CDN, Google Fonts, Lenis. Deploy = static file host.

---

## 2. Concept vision — “Insane 3D Lavi”

**Pitch frame:** Reno’s one-stop shelf, filmed like a flagship device site — but the “device” is the *shop wall* and a rotating cast of hero SKUs (818 bottle, heady glass, disposable wall, kava shot). Dual business is the plot: smoke aisle ↔ liquor aisle, same night, same counter.

### Homepage scroll journey (section order)

1. **Age ritual (not a modal funeral)**  
   Dark room, gold hairline, soft ambient grain. A single glass object (or bottle silhouette) catches light. Type: *“Are you 21 or older?”* Confirm with a tactile Rive press — gate dissolves *into* the hero shelf rather than popping away.

2. **Hero — “The Wall”**  
   Full-viewport disposable/glass wall photo (already on redesign) becomes a **slow Ken-Burns + parallax depth** as Lenis eases in. Headline stays: *Whatever you came for, it’s on the shelf.* Primary CTAs: Call Midtown / Call McCarran / scroll cue. Secondary: “Tonight’s deal.”

3. **Marquee of vices (already exists — make it feel expensive)**  
   Existing ✦ ticker (Disposables · Heady Glass · 818 · Craft Beer · Kava…) gains velocity linked to scroll (subtle) and gold separators that tick like a luxury ticker, not a carnival.

4. **Split aisle — Smoke | Liquor**  
   Two pinned columns scrub into view: left = vape/disposables/glass; right = spirits/beer/shots. User doesn’t click a catalog — they *feel* the dual shop. Tap either side → soft scroll to stock tiles or deals.

5. **What we stock — 01–08 as a scrolly deck**  
   Keep the redesign’s numbered categories (Vape & Disposables → Liquor & Beer → Exotic Snacks → Glass & Accessories → CBD → Tobacco/Cigars/Merch → New arrivals → Lowest prices). Each card **pins briefly**, photo zooms 3–5%, label locks, then releases. Product-serving, not decorative particles.

6. **Deal cinema — 818 as bottle hero**  
   818 Tequila is the clearest liquor flagship on both sites. Treat it like PAX treats a device: bottle enters frame, rotates/lights, price-claim line (*best deal in Reno*) stamps in, then “Check today’s price” / call. Smirnoff Electric Guava follows as a **mixer vignette** (pineapple / Sprite / lime tips scrub in as three beats — content already written on both sites).

7. **Glass moment (optional deep link)**  
   From “Heady glass” tile: a short Prism-adjacent beat — orbit a featured piece or “build your look” teaser (colors/percs as taste, not full commerce SKU maze). CTA: *See it Midtown* / *Ask Ricki*.

8. **Photo strip → Why Lavi’s**  
   Existing tile grid (shelf-tall, kava, mushroom candy, pens, CBD, hats, Space Gas) gets hover cinema + one pinned “community” strip into the five proof points (selection, guidance, community, quality, lowest prices).

9. **Locations — two doors**  
   Midtown vs McCarran cards slide in as twin doors; hours and tap-to-call are the conversion. McCarran keeps “Smoke & Food Mart 2 / snacks & food” nuance.

10. **Reviews as voice, not carousels of doom**  
    Carol / Sione / Brian / Shari-Lynn quotes already on redesign — large Bodoni quote marks, one-at-a-time scrub or horizontal snap. Link out to Google.

11. **Inner Circle VIP**  
    Keep counter-claim reward UX. Motion: form → success screen “flash” like a loyalty card flipping. 21+ copy stays.

12. **FAQ + Final CTA**  
    Accordion (already there) + giant *Stop by today* with dual call buttons and @lavi_smoke_shop.

### Key templates beyond home

| Template | Hero object | Motion job |
|---|---|---|
| **Deal / 818** | Bottle | Product cinema → call for price |
| **Glass feature** | Single water pipe / pen | Orbit or scrubbed detail → visit |
| **Location** | Door + shelf B-roll | Map/hours urgency, open-till-10 |
| **VIP** | Reward card | Micro-delight, show-to-clerk |

**Conversion north star:** Every motion beat ends in *call*, *directions*, or *show VIP at counter* — never a fake “Add to cart” for a shop that sells at the register.

---

## 3. Technique map (ranked by impact for THIS shop)

| Rank | Technique | Stack | Live reference | Where on Lavi | Why it helps conversion / premium | Effort | Mobile note |
|---|---|---|---|---|---|---|---|
| 1 | **Lenis smooth scroll (tune + section anchors)** | Lenis | Already on redesign; scroll feel peers [Aether](https://aether1.ai/), pacing peers [PAX](https://www.pax.com/) | Global on redesign; keep `prefers-reduced-motion` off-ramp | Makes the existing gold/ink UI feel intentional; anchors Stock / Deals / Locations feel “flagship” | **S** | Keep lerp gentler on touch; don’t fight native iOS momentum |
| 2 | **GSAP ScrollTrigger scrub / scrollytelling** | GSAP + ScrollTrigger | [Shopify Supply](https://shopify.supply/) (GSAP + ScrollTrigger on Hydrogen) | Pin **What we stock 01–08**, scrub **818 deal**, beat-in Smirnoff mixers | Turns brochure categories into a journey; holds attention through dual catalog without a cart | **M** | Fewer pins on small screens; replace pin with short fades/snaps |
| 3 | **PAX / Dr.Dabber product-page pacing** | Editorial layout + light GSAP | [PAX](https://www.pax.com/) · [Dr.Dabber](https://drdabber.com/) | Deal templates + future “Glass” / “Disposable wall” feature pages | Ritual pacing (*claim → object → proof → CTA*) makes “lowest price on 818” feel like a launch, not a flyer | **M** | Stack vertically; one hero frame above the fold |
| 4 | **Rive age-gate + micro-interactions** | Rive | Rive signals on [PAX](https://www.pax.com/) · [Dr.Dabber](https://drdabber.com/) · [Prism](https://prismwaterpipes.com/) | Replace static `#gate` modal; also VIP card flip, CTA press states, scroll cue | Age compliance becomes brand theater; reduces bounce-from-boring-gate; micro-delight on VIP claim | **M** | Lightweight .riv; still image fallback if Rive fails |
| 5 | **Hero product cinema (2.5D / video loop)** | Short looped MP4/WebM or CSS/WebGL light | Device cinema energy on [Dr.Dabber](https://drdabber.com/) · object focus on [Aether](https://aether1.ai/) | Hero shelf OR 818 bottle as rotating/light-wrapped object | Instant premium read; gives the roommate something to demo in 5 seconds | **M** | Prefer muted looping video over heavy 3D on phones |
| 6 | **Three.js / R3F product orbit (optional)** | Three.js or React Three Fiber | WebGL/Three signals on [Dr.Dabber](https://drdabber.com/) · canvas journey on [Aether](https://aether1.ai/) | Featured glass piece or 818 bottle on Deal / Glass pages | Tangible “pick it up” desire → drive Midtown visit for heady glass | **L** | Gate behind `pointer: fine` + reduced-motion; photo fallback |
| 7 | **Prism-style glass configurator (taste, not full SKU ERP)** | React configurator pattern (Prism uses React + `/apps/configurator`) | [Prism 3D builders](https://prismwaterpipes.com/) · [builder landing](https://prismwaterpipes.com/pages/3d-builder-landing-page) | “Build a look” teaser for glass colors/style → *We’ll hunt it / special order* | Differentiates Lavi from every Reno smoke site; feeds special-order FAQ already on redesign | **L** | Touch-first orbit; save “build” as screenshot to show clerk |

**Must-include candidates covered above:** Lenis, GSAP ScrollTrigger scrub/scrollytelling, Rive age-gate + micros, optional Three/R3F orbit, Prism-style configurator, PAX/Dr.Dabber product pacing.

---

## 4. Age-gate concept — premium, doesn’t kill vibe

**Contrast the typical dead modal:** gray box, “You must be 21,” Yes/No, legal wallpaper.

**Lavi ritual (builds on redesign’s existing gate copy):**

- Full-bleed ink room, existing gold hairline and Bodoni *“Are you 21 or older?”* — keep the legal line about tobacco, vapor, alcohol.
- **Hero object in soft focus behind type:** condensation on an 818 bottle *or* light catching a glass piece — Rive idle shimmer (3–4s loop).
- Primary control: gold **Yes, I’m 21+** as a Rive press (weight, gold fill travels). On success: object brightens, gate **crossfades into the disposable-wall hero** (shared imagery = continuous world, not a portal slam).
- Secondary: ghost **No, take me back** → Google (already on redesign).
- Persist with `localStorage` (`lavi21`) as today; respect `prefers-reduced-motion` (instant hide, no shimmer).
- Optional: tiny DM Mono stamp *Midtown · McCarran · Open till 10* so the gate still sells the shop.

**Goal:** compliance theater that feels like walking past the curtain into the shelf — not like failing a CAPTCHA.

---

## 5. What NOT to do — decoration traps for a local smoke + liquor shop

- **Particle hell / smoke WebGL wallpaper** that doesn’t show a SKU people can buy tonight.
- **Fake ecommerce** (ghost ATC, empty collections) when fulfillment is the counter + VIP screen.
- **Autoplay loud reels** with music on land — kills Midtown quick-stop intent; use muted loops only.
- **Infinite scroll of 200 disposables** — inventory churns weekly; site should sell *the wall + the deal*, not a stale catalog.
- **Age-gate gamification** (spin wheels, “guess the year”) — legal/trust risk, feels trashy next to Bodoni/gold.
- **Parallax on every section** until mobile users get motion sick — pin sparsely; one hero + one deal cinema is enough.
- **Copying Prism’s full modular commerce** before staff can fulfill custom builds — teaser/special-order only.
- **Emoji-era marketing relapse** from the original site — redesign’s voice is the bar; don’t undo it with 🔥🏷️.
- **Heavy Three.js on the homepage** before Lenis + ScrollTrigger exist — tech demo ≠ conversion.
- **Ignoring dual business** (vape-only motion, liquor as afterthought) — 818 + Smirnoff are already the written heroes; use them.

---

## 6. Phased rollout (no full build now)

| Phase | Scope | Benefit |
|---|---|---|
| **Phase 0** | This brief | Align Owen + roommate on vision, refs, and non-goals before any code |
| **Phase 1** | Tune Lenis; add GSAP ScrollTrigger section pins/scrubs on **Stock 01–08**, **Deals**, **Locations**; richer reveals; keep static HTML or light enhance on current Vercel redesign | Biggest perceived upgrade per hour; homepage finally *feels* like PAX/Aether pacing without 3D risk |
| **Phase 2** | Hero product cinema + 818 bottle (or shelf) loop; Rive age-gate dissolve into hero; VIP card micro; Deal template paced like [PAX](https://www.pax.com/) / [Dr.Dabber](https://drdabber.com/) | Memorable 5-second demo; age-gate stops being a bounce event; deal pages convert curiosity → call |
| **Phase 3** | Optional Three/R3F orbit for featured glass + lightweight Prism-style “build a look” teaser tied to special orders | Category leadership on heady glass; gives enthusiasts a reason to open the site, not only Google “vape shop Reno” |

---

## 7. One-paragraph pitch (send to roommate)

We’re not rebuilding ecommerce — Lavi sells at two Reno counters — so the site should feel like walking into the Midtown wall: a premium age ritual that dissolves into the disposable/glass shelf, Lenis + ScrollTrigger that scrub the dual aisles (smoke ↔ liquor), and an 818 bottle cinema beat that makes “best price in town” land like a product launch, with Smirnoff mixer tips as a three-beat vignette and CTAs that only ever do Call / Directions / show VIP to the clerk; skip particle candy and fake carts, ship Phase 1 motion on the existing Vercel redesign first, then hero cinema + Rive gate, and only later optional glass orbit/configurator teaser inspired by Prism — so the site finally matches the gold/ink redesign and actually makes someone drive to Virginia St or McCarran tonight.

---

### Appendix — quick reference map

| Need | Steal feel from | Lavi content hook |
|---|---|---|
| Smooth scroll body | [Aether](https://aether1.ai/) + redesign’s Lenis | Whole single-page |
| Scrubbed storytelling | [Shopify Supply](https://shopify.supply/) | Stock 01–08, Deals |
| Device/product ritual | [PAX](https://www.pax.com/), [Dr.Dabber](https://drdabber.com/) | 818, glass, disposable wall |
| 3D customize desire | [Prism](https://prismwaterpipes.com/) | Heady glass special order |
| Compliance with taste | Redesign `#gate` + Rive polish from cannabis flagships | 21+ tobacco/vapor/alcohol |

*End of Phase 0 concept draft.*
