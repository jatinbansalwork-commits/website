import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, 'public'), dist, { recursive: true });

function copyHtmlFiles(dir, relBase = '') {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relBase ? `${relBase}/${name}` : name;
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === 'dist' || name === 'scripts' || name === 'public') {
        continue;
      }
      copyHtmlFiles(abs, rel);
      continue;
    }
    if (!name.endsWith('.html')) continue;
    const outDir = join(dist, relBase);
    mkdirSync(outDir, { recursive: true });
    cpSync(abs, join(outDir, name));
  }
}

copyHtmlFiles(root);

console.log('Static build written to', dist);
