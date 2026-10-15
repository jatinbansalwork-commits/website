# KlearNow website (monorepo)

## Single source of truth (production)

| What | Path | Command |
|------|------|---------|
| **Public marketing homepage** | `marketing-site/` | `npm run dev` |
| Vercel production build | `marketing-site/dist` | `npm run build` (via root `vercel.json`) |

GitHub **`main`** → one Vercel project on this repo → **`marketing-site`**. That is the canonical live site.

## Other apps (not production unless you configure Vercel separately)

| App | Path | Local dev |
|-----|------|-----------|
| React prototype homepage | `src/` + root `index.html` | `npm run dev:react` |
| Multi-page HTML template | `landing-template/` | `npm run dev:landing-template` |
| Next.js experiment | `next-app/` | see `next-app/README.md` |

Do **not** attach a second Vercel project to `landing-template/` for the same brand—use the root project only.

## Vercel cleanup (one URL)

In [Vercel Dashboard](https://vercel.com/dashboard):

1. Keep **one** project linked to `jatinbansalwork-commits/website` with root directory **`.`** (repository root).
2. **Delete** or disconnect Git on duplicate projects (e.g. `landing-template-flame`, old `website-steel-*` imports).
3. Set **Production Domain** on the kept project (e.g. `jatinbansalwork-commits-website.vercel.app`).
4. Redeploy **Production** after merging `vercel.json` changes on `main`.

Preview deployment URLs will still appear per commit; ignore them for “the” site—use the production domain only.
