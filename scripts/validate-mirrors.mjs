#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MIRROR = path.join(ROOT, 'src/data/mirror');
const PUBLIC = path.join(ROOT, 'public');

const MEDIA = /\.(webp|png|jpe?g|svg|gif|mp4|webm|woff2?|json|pdf)(\?|$)/i;

function collectMediaRefs(html) {
  const refs = new Set();
  for (const re of [
    /(?:src|href|poster|data-us-project-src|data-live-dither)=["'](\/[^"'#?]+)/gi,
    /url\((\/[^)]+)\)/g,
  ]) {
    let m;
    while ((m = re.exec(html)) !== null) {
      const u = m[1].split('?')[0];
      if (MEDIA.test(u) && !u.startsWith('/_astro')) refs.add(u);
    }
  }
  for (const m of html.matchAll(/\s(?:src|image)srcset=["']([^"']+)["']/gi)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (u?.startsWith('/') && MEDIA.test(u)) refs.add(u.split('?')[0]);
    }
  }
  return refs;
}

const files = (await fs.readdir(MIRROR)).filter((f) => f.endsWith('.json') && f !== 'mirror-chrome.json');
let errors = 0;
let warnings = 0;

for (const file of files) {
  const m = JSON.parse(await fs.readFile(path.join(MIRROR, file), 'utf8'));
  if (!m.inlineStyles?.length) {
    console.warn('WARN', m.path, 'missing inlineStyles');
    warnings++;
  }
  if (m.mainHtml?.includes('<script')) {
    console.warn('WARN', m.path, 'mainHtml still contains <script');
    warnings++;
  }
  if (m.mainHtml?.includes('data-faq') && !m.inlineModules?.length) {
    console.warn('WARN', m.path, 'FAQ markup but no inlineModules');
    warnings++;
  }
  if (m.mainHtml?.includes('data-copy-link') && !m.inlineModules?.length) {
    console.warn('WARN', m.path, 'copy-link markup but no inlineModules');
    warnings++;
  }
  for (const href of [...(m.stylesheets || []), ...(m.scripts || [])]) {
    const local = path.join(PUBLIC, href.replace(/^\//, ''));
    try {
      await fs.access(local);
    } catch {
      console.error('MISSING', m.path, href);
      errors++;
    }
  }
  const mediaHtml = [m.mainHtml || '', ...(m.inlineStyles || [])].join('\n');
  for (const href of collectMediaRefs(mediaHtml)) {
    const local = path.join(PUBLIC, href.replace(/^\//, ''));
    try {
      await fs.access(local);
    } catch {
      console.error('MISSING MEDIA', m.path, href);
      errors++;
    }
  }
}

if (errors) {
  console.error(`Validation failed: ${errors} missing assets, ${warnings} warnings.`);
  process.exit(1);
}
console.log(`Validation OK (${files.length} pages, ${warnings} warnings).`);
