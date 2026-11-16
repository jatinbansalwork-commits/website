#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { patchMirroredAsset } from './lib/brand-assets.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function rewriteAssetUrls(text) {
  return text
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+im_\//g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+id_\//g, '')
    .replace(/\/web\/\d+im_\/https?:\/\/legencymedia\.com/g, '')
    .replace(/\/web\/\d+id_\/https?:\/\/legencymedia\.com/g, '')
    .replace(/https?:\/\/legencymedia\.com/g, '');
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let n = 0;
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) n += await walk(p);
    else if (/\.(css|js|svg)$/i.test(ent.name)) {
      const raw = await fs.readFile(p, 'utf8');
      let next = rewriteAssetUrls(raw);
      next = patchMirroredAsset(next, ent.name);
      if (next !== raw) {
        await fs.writeFile(p, next);
        n++;
      }
    }
  }
  return n;
}

const fonts = [
  '/fonts/PPFrama-Medium.woff2',
  '/fonts/PPFramaText-Regular.woff2',
  '/fonts/PPFrama-Semibold.woff2',
];

for (const f of fonts) {
  const local = path.join(ROOT, 'public', f);
  try {
    await fs.access(local);
  } catch {
    const res = await fetch(`https://legencymedia.com${f}`);
    if (res.ok) {
      await fs.mkdir(path.dirname(local), { recursive: true });
      await fs.writeFile(local, Buffer.from(await res.arrayBuffer()));
      console.log('fetched', f);
    }
  }
}

const fixed = await walk(path.join(ROOT, 'public', '_astro'));
console.log(`Rewrote ${fixed} asset files under public/_astro`);
