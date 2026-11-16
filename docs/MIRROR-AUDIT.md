# Mirror template audit (Nov 2026)

## Coverage

| Check | Status |
|--------|--------|
| 73 routes in `src/data/mirror/*.json` | OK |
| Linked `/_astro/*` assets on disk | OK (`npm run validate:mirrors`) |
| Images in `src` / `srcset` / CSS `url()` | OK — `fix:interactions` harvests `srcset`; validate checks media |
| Scoped CSS (`inlineStyles`) all pages | OK |
| Page behaviors (`inlineModules`) | OK — FAQ (21), blog copy-link (22), service/industry extras |
| Global JS (Lenis, GSAP, dither, nav, footer) | OK via `Base.astro_…js` |
| `/schedule/` live Calendly layout | OK (resynced from live) |
| `/get-in-touch/` multi-step form JS | OK (`get-in-touch.astro_…js` + enquiry bundles) |

## Homepage sections (Wayback Oct 2026)

| Section | Layout | Interactions |
|---------|--------|----------------|
| Hero + Saturn planet | OK | `live-dither`, planet canvas |
| Track record + logo wall | OK | Logo wall JS in `live-dither` bundle |
| Tiers | OK | Accordion via `Base` (`data-tier-card`) |
| ChannelSight quote | OK | Testimonial slider in `Base` |
| Google reviews band | OK | Static quotes (Wayback layout) |
| Case studies | OK | — |
| Arc marquee + Unicorn band | OK | Lazy Unicorn Studio |
| How we work cards | OK | — |
| Separates sticky dither | OK | `data-sticky-feature` + dither |
| Blog teaser | OK | — |
| Footer CTA wave | OK | `dithered-wave` in Footer bundle |

**Intentional vs live production home:** Template keeps the **Wayback Saturn hero**, not the current **glass hero** (`GlassMark`). Live also has separate `stats` counter + `client-slider` sections and Grata feature band — those are not in the Oct 2026 mirror HTML.

To match **today’s** live homepage instead, re-sync home from live (remove Wayback guard in `sync-wayback.mjs`) and run `npm run mirror:refresh`.

## Known non-local behaviour

- **Content Scoreability Checker** — URL fetch runs against production APIs when you submit a URL.
- **Enquiry API** (`/api/enquiries`) — requires production backend; form UI still runs locally.
- **Rialto / GA / LinkedIn** — only after cookie consent on production; consent UI is mirrored.
- **Calendly** — embed loads from `calendly.com` when online.

## Refresh workflow

```bash
npm run mirror:refresh   # assets + inline CSS + inline JS + validate
npm run dev
```

After editing mirrors:

```bash
npm run sync:wayback     # optional full HTML re-pull
npm run mirror:refresh
```
