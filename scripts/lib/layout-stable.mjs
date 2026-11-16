import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Keep mirrored global CSS from re-downloading font-display:swap (causes refresh FOUT).
 */
export async function patchGlobalFontDisplay(publicDir) {
  const cssPath = path.join(publicDir, '_astro', 'global.Btqt_PqA.css');
  let text;
  try {
    text = await fs.readFile(cssPath, 'utf8');
  } catch {
    return false;
  }
  if (!text.includes('font-display:swap')) return false;
  const next = text.replaceAll('font-display:swap', 'font-display:optional');
  if (next === text) return false;
  await fs.writeFile(cssPath, next);
  return true;
}
