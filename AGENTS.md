## Iconography (KlearNow)

Marketing UI icons match the homepage **tier feature lists**: bare `icon-chip icon-chip--bare`, **22px**, **24×24** viewBox, **1.5px** round stroke, `currentColor`, no fill.

- **CSS:** `public/css/klear-iconography.css` (loaded sitewide via `ArchiveLayout.astro`)
- **Helpers:** `src/lib/klear-stroke-icons.ts` (`klearStrokeSvg`, `klearStrokeIconChip`)
- **Tier SVG set:** `scripts/lib/tier-list-icons.mjs` (home mirror JSON)
- New inline SVGs must use the same attributes; do not use filled tiles or stroke-width 2+ unless intentionally decorative.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
