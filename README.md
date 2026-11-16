# KlearNow

Marketing site for [KlearNow](https://klearnow.ai/) — product pages, company pages, and nav/footer chrome.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321/`.

## Build

```bash
npm run build
npm run preview
```

## Project layout

| Piece | Location |
|--------|-----------|
| Page bodies | `src/data/mirror/*.json` |
| Nav + footer chrome | `src/data/mirror-chrome.json` |
| Static assets | `public/` (`img/`, `fonts/`, `css/`, bundled scripts) |
| Route map | `src/data/routes.json` |
| Brand / page patches | `src/lib/marketing-agent-home.ts`, `src/lib/strip-partner-badges.ts` |
| Iconography | `public/css/klear-iconography.css`, `src/lib/klear-stroke-icons.ts` |

Pages render through `ArchiveLayout`.

## Refresh mirrored assets

```bash
npm run sync:wayback
npm run fix:assets
npm run fix:interactions
npm run patch:inline-styles
npm run patch:behaviors
npm run mirror:refresh
```

Or:

```bash
npm run mirror:refresh && npm run dev
```
