#!/usr/bin/env node
/**
 * Offline refresh of foundation card icons in mirror JSON (optional).
 * Runtime patches in MirroredMain.astro are authoritative at build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyCustomBrokersFoundationIcons } from './lib/foundation-card-icons.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const targets = ['src/data/mirror/aeo-agency.json'];

let changed = 0;
for (const rel of targets) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.warn(`Skip missing ${rel}`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const next = applyCustomBrokersFoundationIcons(data.mainHtml ?? '');
  if (next !== data.mainHtml) {
    data.mainHtml = next;
    fs.writeFileSync(filePath, JSON.stringify(data) + '\n');
    console.log(`Updated foundation icons in ${rel}`);
    changed++;
  }
}

if (!changed) console.log('No foundation icon changes needed.');