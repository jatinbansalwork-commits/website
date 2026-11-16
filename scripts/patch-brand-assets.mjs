#!/usr/bin/env node
/**
 * Re-apply KlearNow teal on mirrored live-dither + global CSS (safe after fix:interactions).
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { patchBrandAssetsInTree } from './lib/brand-assets.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const n = await patchBrandAssetsInTree(path.join(ROOT, 'public'));
console.log(n ? `Patched ${n} brand asset file(s) under public/_astro.` : 'Brand assets already up to date.');
