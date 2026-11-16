#!/usr/bin/env node
/**
 * Backfill inlineModules, deferredScripts; strip scripts from mainHtml; fix empty manifests.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractInlineModuleScripts,
  extractModuleScriptSrcs,
  prepareMainHtml,
} from './lib/mirror-html.mjs';
import { stripPartnerBadges } from './lib/strip-partner-badges.mjs';

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

function rewriteHtml(html) {
  return rewriteAssetUrls(html).replace(/\s+data-astro-cid-[a-z0-9]+=""/gi, '');
}

function extractBetween(html, startRe, endTag) {
  const m = html.match(startRe);
  if (!m) return null;
  const start = m.index + m[0].length;
  const end = html.indexOf(endTag, start);
  if (end < 0) return null;
  return html.slice(start, end);
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
  let manifest = JSON.parse(await fs.readFile(p, 'utf8'));
  let source = manifest.source === 'wayback' ? 'wayback' : 'live';

  if (manifest.path === '/schedule/' || !manifest.stylesheets?.length || !manifest.scripts?.length) {
    source = 'live';
  }

  try {
    const html = await fetchHtml(manifest.path, source);
    const main = extractBetween(html, /<main[^>]*>/i, '</main>');
    if (!main) throw new Error('no main');

    const stylesheets = [
      ...html.matchAll(/<link\s+rel="stylesheet"\s+href="(\/_astro\/[^"]+)"/gi),
    ].map((m) => m[1]);
    const scripts = extractModuleScriptSrcs(html);
    const inlineStyles = extractInlineStyles(html);
    const inlineModules = extractInlineModuleScripts(html);
    const prepared = prepareMainHtml(rewriteHtml(main));

    manifest.mainHtml = stripPartnerBadges(prepared.mainHtml);
    manifest.scripts = [...new Set([...scripts, ...prepared.mainModuleScripts])];
    manifest.inlineStyles = inlineStyles.length ? inlineStyles : undefined;
    manifest.inlineModules = inlineModules.length ? inlineModules : undefined;
    manifest.deferredScripts = prepared.deferredScripts.length ? prepared.deferredScripts : undefined;

    if (source === 'live' && (manifest.path === '/schedule/' || !manifest.stylesheets?.length)) {
      manifest.stylesheets = [...new Set(stylesheets)];
      manifest.source = 'live';
    }

    await fs.writeFile(p, JSON.stringify(manifest));
    console.log(
      `${manifest.path} → modules ${inlineModules.length}, defer ${prepared.deferredScripts.length}, scripts ${manifest.scripts.length}`,
    );
    ok++;
  } catch (e) {
    console.warn(`skip ${manifest.path}:`, e.message);
  }
}

console.log(`Patched behaviors on ${ok}/${files.length} manifests.`);
