#!/usr/bin/env node
/**
 * Pull legencymedia.com pages + assets from Wayback (Oct 17, 2026).
 * Output: src/data/mirror/<slug>.json + public/_astro/* + public/fonts/* + public/img/*
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
import { applyNavLogoPlaceholder } from './lib/nav-logo-placeholder.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TIMESTAMP = process.env.WAYBACK_TS || '20261017113451';
/** Custom Earth hero — regenerate via npm run generate:hero-earth */
const SKIP_PLANET_DOWNLOAD = new Set(['/img/home-planet.webp', '/img/home-planet-poster.webp']);
const BASE = 'https://legencymedia.com';
const WAYBACK_ID = `https://web.archive.org/web/${TIMESTAMP}id_/`;
const WAYBACK_RAW = `https://web.archive.org/web/${TIMESTAMP}im_/`;

const routes = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/routes.json'), 'utf8'));

const assetQueue = new Set();
const downloaded = new Set();

function waybackPageUrl(sitePath) {
  const u = sitePath === '/' ? `${BASE}/` : `${BASE}${sitePath}`;
  return `${WAYBACK_ID}${u}`;
}

function pathToMirrorSlug(sitePath) {
  if (sitePath === '/') return 'home';
  return sitePath.replace(/^\/|\/$/g, '').replace(/\//g, '__');
}

function extractBetween(html, startRe, endTag) {
  const m = html.match(startRe);
  if (!m) return null;
  const start = m.index + m[0].length;
  const end = html.indexOf(endTag, start);
  if (end < 0) return null;
  return html.slice(start, end);
}

function collectAssets(html) {
  const paths = new Set();
  for (const re of [
    /(?:href|src)=["'](\/(?:_astro|fonts|img|scripts)[^"']+)["']/g,
    /url\((\/(?:fonts|img)[^)]+)\)/g,
  ]) {
    let m;
    while ((m = re.exec(html)) !== null) paths.add(m[1].split('?')[0]);
  }
  return paths;
}

function rewriteAssetUrls(text) {
  return text
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+im_\//g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+id_\//g, '')
    .replace(/\/web\/\d+im_\/https?:\/\/legencymedia\.com/g, '')
    .replace(/\/web\/\d+id_\/https?:\/\/legencymedia\.com/g, '')
    .replace(/https?:\/\/legencymedia\.com/g, '');
}

function rewriteHtml(html) {
  return rewriteAssetUrls(html).replace(/\s+data-astro-cid-[a-z0-9]+=""/gi, '');
}

function extractInlineStyles(html) {
  const blocks = [];
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const css = rewriteAssetUrls(m[1].trim());
    if (css) blocks.push(css);
  }
  return blocks;
}

async function fetchText(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      const text = await res.text();
      if (!res.ok || text.includes('Internet Archive bots')) throw new Error(`HTTP ${res.status}`);
      if (text.trimStart().startsWith('<!DOCTYPE html>') && url.includes('/_astro/')) {
        throw new Error('asset returned HTML');
      }
      return text;
    } catch (e) {
      if (i === retries) throw e;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
}

async function fetchBinary(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.slice(0, 15).toString().includes('<!DOCTYPE')) throw new Error('binary returned HTML');
  return buf;
}

async function downloadAsset(assetPath) {
  if (SKIP_PLANET_DOWNLOAD.has(assetPath)) return;
  if (downloaded.has(assetPath)) return;
  downloaded.add(assetPath);
  const local = path.join(ROOT, 'public', assetPath.replace(/^\//, ''));
  await fs.mkdir(path.dirname(local), { recursive: true });
  const preferLive = /\.js$/i.test(assetPath);
  const primaryUrl = preferLive ? `${BASE}${assetPath}` : `${WAYBACK_RAW}${BASE}${assetPath}`;
  try {
    if (/\.(css|js|svg|xml|txt)$/i.test(assetPath)) {
      let text = await fetchText(primaryUrl);
      text = rewriteAssetUrls(text);
      await fs.writeFile(local, text);
    } else {
      const buf = await fetchBinary(primaryUrl);
      await fs.writeFile(local, buf);
    }
  } catch {
    try {
      const urlLive = `${BASE}${assetPath}`;
      const res = await fetch(urlLive);
      if (!res.ok) return;
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.writeFile(local, buf);
    } catch {
      console.warn('  miss asset', assetPath);
    }
  }
}

async function fetchLivePage(sitePath) {
  const u = sitePath === '/' ? `${BASE}/` : `${BASE}${sitePath}`;
  return fetchText(u);
}

async function processPage(route) {
  let source = 'wayback';
  let html;
  try {
    html = await fetchText(waybackPageUrl(route.path));
  } catch (e) {
  try {
    html = await fetchLivePage(route.path);
    source = 'live';
    console.warn(`fallback live ${route.path} (wayback: ${e.message})`);
  } catch (e2) {
    console.warn(`skip ${route.path}: wayback ${e.message}; live ${e2.message}`);
    return null;
  }
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : route.title;
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const description = descMatch?.[1]?.replace(/&amp;/g, '&') ?? '';

  const main = extractBetween(html, /<main[^>]*>/i, '</main>');
  if (!main) {
    console.warn(`no <main> ${route.path}`);
    return null;
  }

  const stylesheets = [...html.matchAll(/<link\s+rel="stylesheet"\s+href="(\/_astro\/[^"]+)"/gi)].map((m) => m[1]);
  const inlineStyles = extractInlineStyles(html);
  const scripts = extractModuleScriptSrcs(html);
  const inlineModules = extractInlineModuleScripts(html);
  const prepared = prepareMainHtml(rewriteHtml(main));

  const pageAssetPaths = collectAssets(main);
  for (const p of [...stylesheets, ...scripts, ...pageAssetPaths]) assetQueue.add(p);

  const slug = pathToMirrorSlug(route.path);
  const manifest = {
    path: route.path,
    slug,
    kind: route.kind,
    title,
    description,
    source,
    stylesheets: [...new Set(stylesheets)],
    inlineStyles: inlineStyles.length ? inlineStyles : undefined,
    inlineModules: inlineModules.length ? inlineModules : undefined,
    deferredScripts: prepared.deferredScripts.length ? prepared.deferredScripts : undefined,
    scripts: [...new Set([...scripts, ...prepared.mainModuleScripts])],
    mainHtml: stripPartnerBadges(prepared.mainHtml),
  };

  const outDir = path.join(ROOT, 'src/data/mirror');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, `${slug}.json`), JSON.stringify(manifest, null, 0));
  console.log(`ok ${route.path} (${main.length} chars, ${stylesheets.length} css)`);
  return manifest;
}

async function pool(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx]);
    }
  }
  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}

console.log(`Wayback sync ts=${TIMESTAMP} routes=${routes.length}`);
const manifests = (await pool(routes, 4, processPage)).filter(Boolean);

for (const m of manifests) {
  for (const s of m.stylesheets) assetQueue.add(s);
  for (const s of m.scripts) assetQueue.add(s);
  collectAssets(m.mainHtml).forEach((p) => assetQueue.add(p));
}

// Never overwrite Wayback home (Saturn hero) with live glass hero.
const homePath = path.join(ROOT, 'src/data/mirror/home.json');
try {
  const home = JSON.parse(await fs.readFile(homePath, 'utf8'));
  if (home.source === 'wayback') {
    console.log('Keeping Wayback home.json (custom hero markup)');
  }
} catch {
  /* no home yet */
}

const globalAssets = [
  '/_astro/global.Btqt_PqA.css',
  '/_astro/Base.Cz7aN_E5.css',
  '/_astro/ConsentBanner.Bjqg_HPr.css',
  '/_astro/Nav.astro_astro_type_script_index_0_lang.BTi8Y4C0.js',
  '/_astro/Footer.astro_astro_type_script_index_0_lang.QLgbxcz6.js',
  '/_astro/ConsentBanner.astro_astro_type_script_index_0_lang.BlWZOVqD.js',
  '/_astro/Base.astro_astro_type_script_index_0_lang.BUtqXeGZ.js',
  '/_astro/Base.astro_astro_type_script_index_1_lang.s69FG7Vr.js',
  '/img/logo.svg',
  '/img/badge-enterprise.svg',
  '/favicon-transparent.png',
  '/favicon-adaptive.svg',
  '/apple-touch-icon.png',
];
globalAssets.forEach((p) => assetQueue.add(p));

console.log(`Downloading ${assetQueue.size} assets…`);
let n = 0;
for (const p of assetQueue) {
  n++;
  if (n % 20 === 0) console.log(`  ${n}/${assetQueue.size}`);
  await downloadAsset(p);
}

const index = manifests.map(({ slug, path: p, kind, title }) => ({ slug, path: p, kind, title }));
await fs.writeFile(path.join(ROOT, 'src/data/mirror-index.json'), JSON.stringify({ timestamp: TIMESTAMP, pages: index }, null, 2));

let chromeHtml = null;
try {
  chromeHtml = await fetchText(waybackPageUrl('/'));
  const nav = chromeHtml.match(/<nav class="tsnav"[\s\S]*?<\/nav>/i)?.[0];
  const footer = chromeHtml.match(/<footer class="site-footer"[\s\S]*?<\/footer>/i)?.[0];
  const consent = chromeHtml.match(/<aside id="consent-banner"[\s\S]*?<\/aside>/i)?.[0];
  if (nav && footer) {
    const chromeDir = path.join(ROOT, 'src/data');
    await fs.writeFile(
      path.join(chromeDir, 'mirror-chrome.json'),
      JSON.stringify(
        {
          navHtml: applyNavLogoPlaceholder(rewriteHtml(nav)),
          footerHtml: stripPartnerBadges(rewriteHtml(footer)),
          consentHtml: consent ? rewriteHtml(consent) : '',
        },
        null,
        2,
      ),
    );
    console.log('Saved mirror-chrome.json (nav + footer)');
  }
} catch (e) {
  console.warn('chrome extract failed', e.message);
}

console.log(`Done: ${manifests.length} pages mirrored.`);
