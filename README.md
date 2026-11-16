# Legency Media — full-site template

An **Astro** static template that reproduces [legencymedia.com](https://legencymedia.com/) end to end: **73 routes**, production **`/_astro` CSS/JS**, nav/footer chrome, and page-level interactions from the original Astro build.

## Design baseline (homepage)

The **homepage** is taken from the [Internet Archive snapshot of 17 Oct 2026](https://web.archive.org/web/20261017113451/https://legencymedia.com/), including the **Saturn / ringed-planet hero** (`hero__planet` + live dither on `home-planet.webp`), not the newer glass-mark hero on the live site today.

Other URLs use the live site HTML when that snapshot did not capture them; re-run sync after future Wayback crawls to pull more pages from archive.

## What's included

| Piece | Location |
|--------|-----------|
| Mirrored page bodies | `src/data/mirror/*.json` |
| Nav + footer (archive chrome) | `src/data/mirror-chrome.json` |
| Original build assets | `public/_astro/`, `public/img/`, `public/fonts/` |
| Route map | `src/data/routes.json` (from sitemap) |
| Sync tooling | `scripts/sync-wayback.mjs` |
| Site notes | `docs/SITE-AUDIT.md` |

Pages render through `ArchiveLayout.astro`, which loads the same global bundles, per-page stylesheets, and module scripts as the source site.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321/`.

## Refresh mirrors from the web

```bash
npm run sync:wayback
npm run fix:assets          # clean Wayback URLs in CSS
npm run fix:interactions    # JS chunks, images, scenes, videos from live
npm run patch:inline-styles # scoped component CSS from source <style> tags (required for mirror pages)
npm run patch:behaviors     # inline module JS (FAQ, blog copy-link, stats, etc.)
npm run mirror:refresh      # full asset + style + behavior refresh (recommended)
```

Or one shot after changing mirrors:

```bash
npm run mirror:refresh && npm run dev
```

### What “fully functional” means in this template

| Layer | Source |
|--------|--------|
| Page markup | `src/data/mirror/*.json` (`mainHtml`) |
| Linked CSS/JS | `public/_astro/*` |
| Scoped component CSS | `inlineStyles` injected in `ArchiveLayout` |
| Page-specific JS (FAQ, copy link, home stats) | `inlineModules` + `manifest.scripts` |
| Global interactions (Lenis, GSAP, dither, nav) | `Base.astro_…js` bundles |
| Nav/footer | `src/data/mirror-chrome.json` |
| Third-party embeds (e.g. Calendly on `/schedule/`) | `deferredScripts` |

Home intentionally uses the **Oct 2026 Wayback Saturn hero** (`source: wayback`). Live production uses the glass hero + GlassMark; swap home via a fresh `sync:wayback` only if you want live parity.

## Sync script

This script:

1. Fetches each route from Wayback (`WAYBACK_TS`, default `20261017113451`).
2. Falls back to the **live** site when the archive returns 404.
3. Downloads referenced `/_astro`, fonts, and images into `public/`.
4. Regenerates `src/data/mirror-index.json` and `mirror-chrome.json`.

## Build

```bash
npm run build
npm run preview
```

## Fidelity notes

- **Fonts:** PP Frama files are mirrored under `public/fonts/` when available from archive/live.
- **Third-party tags** (e.g. Rialto analytics) are not required for layout or interactions and are omitted.
- **Legal:** Unofficial template for learning and rebranding. Do not ship Legency trademarks, copy, or client marks without permission.
