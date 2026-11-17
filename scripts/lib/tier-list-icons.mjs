/**
 * Stroke icons for home tier lists — keep in sync with src/lib/klear-icon-paths.ts
 * (24×24 viewBox, 1.5 stroke, round caps, icon-chip--bare @ 22px).
 */
import {
  ICON_CLASSIFICATION_TAG,
  ICON_DOC_INGESTION,
  ICON_DRAYAGE,
  ICON_EXCEPTION_FLAG,
  ICON_FILE_CHECK,
  ICON_FILE_SEARCH,
  ICON_GLOBE,
  ICON_LANDED_COST,
  ICON_PRODUCT_BOX,
  ICON_SHIELD_CHECK,
  ICON_TARIFF_CHART,
  ICON_TRACK_TRUCK,
} from './klear-icon-paths.mjs';

const WRAP =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ccg5yoga>';

function wrap(paths) {
  return `${WRAP}${paths}</svg>`;
}

export const tierListIcons = {
  'tier-body-0': [
    wrap(ICON_DOC_INGESTION),
    wrap(ICON_TARIFF_CHART),
    wrap(ICON_CLASSIFICATION_TAG),
    wrap(ICON_PRODUCT_BOX),
  ],
  'tier-body-1': [
    wrap(ICON_FILE_CHECK),
    wrap(ICON_TRACK_TRUCK),
    wrap(ICON_LANDED_COST),
    wrap(ICON_EXCEPTION_FLAG),
  ],
  'tier-body-2': [
    wrap(ICON_GLOBE),
    wrap(ICON_FILE_SEARCH),
    wrap(ICON_SHIELD_CHECK),
    wrap(ICON_DRAYAGE),
  ],
};

export function applyTierListIcons(html) {
  let h = html;
  for (const [bodyId, icons] of Object.entries(tierListIcons)) {
    const start = h.indexOf(`id="${bodyId}"`);
    if (start < 0) continue;
    const ulStart = h.indexOf('<ul class="tier__list"', start);
    const ulEnd = h.indexOf('</ul>', ulStart) + 5;
    let ul = h.slice(ulStart, ulEnd);
    let i = 0;
    ul = ul.replace(/<svg viewBox="0 0 24 24"[\s\S]*?<\/svg>/g, (match) => {
      if (i >= icons.length) return match;
      return icons[i++];
    });
    h = h.slice(0, ulStart) + ul + h.slice(ulEnd);
  }
  return h;
}
