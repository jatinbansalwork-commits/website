/** Run after downloading tex-closer from live (legacy blue dither). */
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function recolorTexCloser(root = ROOT) {
  try {
    execSync('python3 scripts/recolor-tex-closer.py', { cwd: root, stdio: 'inherit' });
    return true;
  } catch {
    return false;
  }
}
