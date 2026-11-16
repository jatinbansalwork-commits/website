import fs from 'node:fs/promises';
import path from 'node:path';
import { applyLiveDitherBrandPatches } from './live-dither-brand.mjs';

/** Legency mirror CSS → KlearNow teal token (survives fix:interactions re-download). */
export function patchGlobalBrandCss(text) {
  return text
    .replace(/--blue:#0004f6\b/g, '--blue:#005d7c')
    .replace(/--blue:#046ef5\b/g, '--blue:#005d7c')
    .replace(/#0004f6\b/g, '#005d7c');
}

export function patchMirroredAsset(text, filename) {
  if (filename.includes('live-dither') && filename.endsWith('.js')) {
    return applyLiveDitherBrandPatches(text);
  }
  if (filename === 'global.Btqt_PqA.css' || filename.endsWith('global.Btqt_PqA.css')) {
    let next = patchGlobalBrandCss(text);
    next = next.replaceAll('font-display:swap', 'font-display:optional');
    return next;
  }
  return text;
}

export async function patchBrandAssetsInTree(publicDir) {
  const astro = path.join(publicDir, '_astro');
  let changed = 0;
  let entries;
  try {
    entries = await fs.readdir(astro);
  } catch {
    return changed;
  }
  for (const name of entries) {
    if (!/live-dither.*\.js$/i.test(name) && name !== 'global.Btqt_PqA.css') continue;
    const filePath = path.join(astro, name);
    const raw = await fs.readFile(filePath, 'utf8');
    const next = patchMirroredAsset(raw, name);
    if (next !== raw) {
      await fs.writeFile(filePath, next);
      changed++;
    }
  }
  return changed;
}
