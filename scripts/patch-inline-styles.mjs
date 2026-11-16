#!/usr/bin/env node
/**
 * Backfill inlineStyles on mirror manifests (scoped Astro CSS from <style> tags).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIMESTAMP = process.env.WAYBACK_TS || '20261017113451';
const BASE = 'https://legencymedia.com';
const WAYBACK_ID = `https://web.archive.org/web/${TIMESTAMP}id_/`;
const MIRROR = path.join(ROOT, 'src/data/mirror');

function rewriteAssetUrls(text) {
  return text
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+im_\//g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+id_\//g, '')
    .replace(/\/web\/\d+im_\/https?:\/\/[^/]+/g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+\/(https?:\/\/[^'"`]+)/g, '$1')
    .replace(/https?:\/\/legencymedia\.com/g, '');
}

function extractInlineStyles(html) {
  const blocks = [];
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const css = rewriteAssetUrls(m[1].trim());
    if (css) blocks.push(css);
  }
  return blocks;
}

async function fetchHtml(routePath, source) {
  const u = routePath === '/' ? `${BASE}/` : `${BASE}${routePath}`;
  const url = source === 'wayback' ? `${WAYBACK_ID}${u}` : u;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.text();
}

const files = (await fs.readdir(MIRROR)).filter((f) => f.endsWith('.json') && f !== 'mirror-chrome.json');
let ok = 0;
for (const file of files) {
  const p = path.join(MIRROR, file);
  const manifest = JSON.parse(await fs.readFile(p, 'utf8'));
  const source = manifest.source === 'wayback' ? 'wayback' : 'live';
  try {
    const html = await fetchHtml(manifest.path, source);
    const inlineStyles = extractInlineStyles(html);
    manifest.inlineStyles = inlineStyles.length ? inlineStyles : undefined;
    await fs.writeFile(p, JSON.stringify(manifest));
    console.log(`${manifest.path} → ${inlineStyles.length} style block(s)`);
    ok++;
  } catch (e) {
    console.warn(`skip ${manifest.path}:`, e.message);
  }
}
console.log(`Patched ${ok}/${files.length} manifests.`);
