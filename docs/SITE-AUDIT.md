# Legency Media — site audit (template source)

Source: [legencymedia.com](https://legencymedia.com/) — Astro static site, ~70 URLs in `sitemap-0.xml`.

## Global UX flow

1. **Entry** — Blue page-transition grid (disabled when `prefers-reduced-motion`).
2. **Cookie banner** — Bottom-left dialog; Accept all / Necessary only / Customise (GA + LinkedIn toggles on live site).
3. **Fixed nav** — White floating bar: logo, Menu toggle, separate **Get in touch** bubble button (desktop).
4. **Scroll** — Smooth scroll (`html { scroll-behavior: smooth }`); heavy sections use intersection observers for reveal/count-up.

## Navigation (two-step mega menu)

| State | Interaction |
|--------|-------------|
| Collapsed | Hamburger + “Menu” label; CTA pinned top-right |
| Open | Backdrop blur; bar expands full width; site links slide in (left); service groups (3 columns) + dark CTA card (right) |
| Mobile | Site list hidden; Services accordion; bottom full-width CTA |
| Close | X label, backdrop click, Escape |

Service groups: **Websites**, **Search & AI**, **Conversion** — each link has title + grey blurb; hover shifts title blue.

## Homepage sections (top → bottom)

| # | Section | Key interactions |
|---|---------|------------------|
| 1 | Planet hero (Oct 2026 archive) | `hero__planet` + live dither on `/img/home-planet.webp`; enterprise badge; logo wall cycles partners. Live site later switched to glass-mark WebGL hero. |
| 2 | Track record | 3 stats animate count-up on enter viewport |
| 3 | Retainer tiers | 3 cards stagger-animate in; tier accordions on small screens; Premium card has video background |
| 4 | Grata feature | Dark band; scrolling marquee title; underline link |
| 5 | Testimonials | Horizontal track; prev/next; keyboard arrows |
| 6 | Case studies | 2-up cards; bubble “Read the case study” |
| 7 | Arc marquee | SVG curved text scroll |
| 8 | How we work | 3 icon chips |
| 9 | Webflow / search / conversion | Sticky scroll + UnicornStudio visuals + pixel reveal transition |
| 10 | Blog teaser | 3 post cards with tag pills |
| 11 | Footer closer | Rotating ring text; dither wave canvas; parallax on scroll |

## Page types

| Kind | Example | Layout notes |
|------|---------|--------------|
| Service / landing | `/services/webflow-enterprise/` | Secondary hero, problem/solution grids, FAQ accordion, case study callout |
| About | `/about/` | Narrative + numbered pillars + stats |
| Case study index | `/case-studies/` | Filterable grid of client cards |
| Case study | `/case-studies/grata/` | Hero metrics, role, deliverables list |
| Blog index | `/blog/` | Featured post + filter chips |
| Blog post | `/blog/...` | Prose, figures, tables, callouts |
| Contact | `/get-in-touch/` | Multi-step form (JS), logo wall, testimonial |
| Legal | `/privacy/`, `/cookies/` | Prose |

## Design tokens (from live CSS)

- `--blue: #005d7c`, `--bg: #f2f2f2`, `--ink: #201d1d`, `--lime: #9bff60`
- Fonts on live site: **PP Frama** / **PP Frama Text** (commercial). Template uses **Syne** + **DM Sans** as stand-ins.
- Motion easing: `cubic-bezier(.625, .05, 0, 1)` (~0.5–0.75s)

## Template fidelity notes (current repo)

- **73 pages** mirrored into `src/data/mirror/*.json` via `npm run sync:wayback`.
- **Homepage** from Wayback **20261017113451** (Saturn hero). Remaining routes use live HTML when absent from that crawl.
- **Original** `/_astro` CSS/JS and **archive nav/footer** chrome ship under `public/` and `src/data/mirror-chrome.json`.
- Some effects (UnicornStudio on inner landings, external embeds) still depend on live third-party URLs inside mirrored markup.
