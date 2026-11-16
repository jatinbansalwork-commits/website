#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { applyTierListIcons } from './lib/tier-list-icons.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const homePath = path.join(ROOT, 'src/data/mirror/home.json');
const data = JSON.parse(fs.readFileSync(homePath, 'utf8'));
const next = applyTierListIcons(data.mainHtml);
if (next === data.mainHtml) {
  console.log('No tier icon changes needed.');
} else {
  data.mainHtml = next;
  fs.writeFileSync(homePath, JSON.stringify(data, null, 2) + '\n');
  console.log('Updated tier list icons in home.json');
}
