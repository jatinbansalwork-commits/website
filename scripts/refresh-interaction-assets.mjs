#!/usr/bin/env node
/**
 * Fix broken sections: fresh _astro JS from live, import graph, static assets, URL cleanup.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LIVE = 'https://legencymedia.com';
const ASTRO_DIR = path.join(ROOT, 'public', '_astro');

function rewriteAssetUrls(text) {
  return text
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+im_\//g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+id_\//g, '')
    .replace(/\/web\/\d+im_\/https?:\/\/[^/]+/g, '')
    .replace(/https?:\/\/web\.archive\.org\/web\/\d+\/(https?:\/\/[^'"`]+)/g, '$1')
    .replace(/var _____WB\$wombat[\s\S]*?\}\{/m, '{')
    .replace(/let window = _____WB\$wombat[\s\S]*?;/g, '');
}

async function fetchLive(rel) {
  const url = `${LIVE}${rel.startsWith('/') ? rel : `/${rel}`}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${rel} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function writePublic(rel, data, isText = false) {
  const local = path.join(ROOT, 'public', rel.replace(/^\//, ''));
  await fs.mkdir(path.dirname(local), { recursive: true });
  let body = data;
  if (isText) {
    body = rewriteAssetUrls(data.toString('utf8'));
  }
  await fs.writeFile(local, body);
}

function extractJsImports(code) {
  const imports = new Set();
  for (const m of code.matchAll(/from\s*["']\.\/([^"']+)["']/g)) imports.add(m[1]);
  for (const m of code.matchAll(/import\s*["']\.\/([^"']+)["']/g)) imports.add(m[1]);
  return [...imports];
}

import { recolorTexCloser } from './lib/recolor-tex-closer.mjs';
import { patchGlobalFontDisplay } from './lib/layout-stable.mjs';
import { patchMirroredAsset, patchBrandAssetsInTree } from './lib/brand-assets.mjs';

function applyLiveDitherBrandPatches(text, filename) {
  return patchMirroredAsset(text, filename);
}

async function downloadAstroJs(filename) {
  const rel = `/_astro/${filename}`;
  const buf = await fetchLive(rel);
  let text = rewriteAssetUrls(buf.toString('utf8'));
  text = applyLiveDitherBrandPatches(text, filename);
  await writePublic(rel, text, true);
  return text;
}

async function refreshJsGraph(seedFiles) {
  const queue = [...new Set(seedFiles)];
  const done = new Set();
  while (queue.length) {
    const file = queue.shift();
    if (done.has(file)) continue;
    done.add(file);
    console.log('  js', file);
    let text;
    try {
      text = await downloadAstroJs(file);
    } catch (e) {
      console.warn('  miss js', file, e.message);
      continue;
    }
    for (const dep of extractJsImports(text)) {
      const depFile = dep.includes('.js') ? dep : `${dep}.js`;
      if (!done.has(depFile)) queue.push(depFile);
    }
  }
  return done.size;
}

function addAssetPath(paths, raw) {
  const p = raw.split('?')[0].split('#')[0];
  if (!p.startsWith('/') || p.startsWith('//') || p.endsWith('/')) return;
  if (p.startsWith('/_astro')) return;
  paths.add(p);
}

function collectAssetPathsFromHtml(html) {
  const paths = new Set();
  for (const re of [
    /(?:src|href|poster)=["'](\/(?!\/)[^"'#?]+)["']/g,
    /data-live-dither=["']([^"']+)["']/g,
    /data-us-project-src=["']([^"']+)["']/g,
    /url\((\/[^)]+)\)/g,
  ]) {
    let m;
    while ((m = re.exec(html)) !== null) addAssetPath(paths, m[1]);
  }
  for (const m of html.matchAll(/\ssrcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url?.startsWith('/')) addAssetPath(paths, url);
    }
  }
  for (const m of html.matchAll(/\simagesrcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url?.startsWith('/')) addAssetPath(paths, url);
    }
  }
  return paths;
}

async function downloadStaticAsset(rel) {
  if (rel.endsWith('/')) return;
  try {
    const buf = await fetchLive(rel);
    const ext = path.extname(rel).toLowerCase();
    if (['.css', '.js', '.svg', '.json', '.xml', '.txt'].includes(ext)) {
      const base = path.basename(rel);
      let text = rewriteAssetUrls(buf.toString('utf8'));
      text = patchMirroredAsset(text, base);
      await writePublic(rel, text, true);
    } else {
      await writePublic(rel, buf, false);
    }
  } catch (e) {
    console.warn('  miss asset', rel, e.message);
  }
}

const mirrorDir = path.join(ROOT, 'src/data/mirror');
const files = (await fs.readdir(mirrorDir)).filter((f) => f.endsWith('.json') && !f.includes('index'));

const seedJs = [
  'Nav.astro_astro_type_script_index_0_lang.BTi8Y4C0.js',
  'Footer.astro_astro_type_script_index_0_lang.QLgbxcz6.js',
  'ConsentBanner.astro_astro_type_script_index_0_lang.BlWZOVqD.js',
  'Base.astro_astro_type_script_index_0_lang.BUtqXeGZ.js',
  'Base.astro_astro_type_script_index_1_lang.s69FG7Vr.js',
];

for (const f of files) {
  const data = JSON.parse(await fs.readFile(path.join(mirrorDir, f), 'utf8'));
  for (const s of data.scripts || []) {
    const name = s.replace(/^\/_astro\//, '');
    if (name && !seedJs.includes(name)) seedJs.push(name);
  }
}

console.log('Refreshing _astro JS graph from live site…');
const jsCount = await refreshJsGraph(seedJs);
console.log(`Downloaded ${jsCount} JS modules`);

console.log('Harvesting static assets from mirror JSON…');
/** Custom Earth hero — regenerate via npm run generate:hero-earth */
const SKIP_STATIC_DOWNLOAD = new Set(['/img/home-planet.webp', '/img/home-planet-poster.webp']);

const assetPaths = new Set([
  '/scene/band-loop.json',
  '/video/donut.mp4',
  '/video/donut.webm',
  '/video/donut-poster.jpg',
  '/img/mark-white.svg',
  '/img/logo-white.svg',
  '/img/google-preferred-source-dark.png',
  '/img/tex-closer.png',
]);

for (const f of files) {
  const data = JSON.parse(await fs.readFile(path.join(mirrorDir, f), 'utf8'));
  collectAssetPathsFromHtml(data.mainHtml || '').forEach((p) => assetPaths.add(p));
  for (const block of data.inlineStyles || []) {
    collectAssetPathsFromHtml(block).forEach((p) => assetPaths.add(p));
  }
  for (const s of data.stylesheets || []) assetPaths.add(s);
}

let n = 0;
for (const p of [...assetPaths].sort()) {
  if (SKIP_STATIC_DOWNLOAD.has(p)) continue;
  n++;
  if (n % 25 === 0) console.log(`  assets ${n}/${assetPaths.size}`);
  await downloadStaticAsset(p);
}
console.log(`Downloaded ${assetPaths.size} static assets (best effort).`);
recolorTexCloser(ROOT);

// Re-run CSS URL cleanup
const { execSync } = await import('node:child_process');
execSync('node scripts/fix-asset-urls.mjs', { cwd: ROOT, stdio: 'inherit' });
if (await patchGlobalFontDisplay(path.join(ROOT, 'public'))) {
  console.log('Patched global CSS font-display → optional (layout-stable).');
}
const brandFiles = await patchBrandAssetsInTree(path.join(ROOT, 'public'));
if (brandFiles) console.log(`Re-applied KlearNow brand on ${brandFiles} _astro file(s).`);
console.log('Done.');
