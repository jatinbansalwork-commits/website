/**
 * Foundation problem-card icons — same stroke system as tier lists (see AGENTS.md).
 * Keep path strings in sync with `scripts/lib/foundation-card-icons.mjs`.
 */

import {
  ICON_AUDIT_ALERT,
  ICON_CAPTURE_STRUCTURE,
  ICON_DATA_BRACES,
  ICON_DOC_INGESTION,
  ICON_DRAYAGE,
  ICON_MANUAL_ENTRY,
  ICON_OPS_INSIGHT,
  ICON_VALIDATE_DOC,
} from './klear-icon-paths';
import { klearStrokeSvg } from './klear-stroke-icons';

/** Foundation problem cards — larger than tier list bullets (was Legency 48px tile). */
export const KLEAR_FOUNDATION_ICON_SIZE_PX = 48;

export const KLEAR_ICON_CAPTURE_STRUCTURE = ICON_CAPTURE_STRUCTURE;
export const KLEAR_ICON_VALIDATE_DOC = ICON_VALIDATE_DOC;
export const KLEAR_ICON_DATA_BRACES = ICON_DATA_BRACES;
export const KLEAR_ICON_OPS_INSIGHT = ICON_OPS_INSIGHT;
export const KLEAR_ICON_DOC_INGESTION = ICON_DOC_INGESTION;
export const KLEAR_ICON_MANUAL_ENTRY = ICON_MANUAL_ENTRY;
export const KLEAR_ICON_AUDIT_ALERT = ICON_AUDIT_ALERT;
export const KLEAR_ICON_DRAYAGE = ICON_DRAYAGE;

export function klearFoundationIconSvg(paths: string): string {
  return klearStrokeSvg(paths, 'data-astro-cid-ccg5yoga');
}

export function patchFoundCardIconByTitle(
  mainHtml: string,
  cardTitle: string,
  iconSvg: string,
): string {
  const escapedTitle = cardTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titleRe = new RegExp(`<h3[^>]*>${escapedTitle}<\\/h3>`);
  const titleMatch = titleRe.exec(mainHtml);
  if (!titleMatch) return mainHtml;

  const titleIdx = titleMatch.index;
  const articleStart = mainHtml.lastIndexOf('<article class="found-card"', titleIdx);
  if (articleStart === -1) return mainHtml;

  const articleEnd = mainHtml.indexOf('</article>', titleIdx);
  if (articleEnd === -1) return mainHtml;
  const articleEndIdx = articleEnd + '</article>'.length;

  const articleHtml = mainHtml.slice(articleStart, articleEndIdx);
  const updatedArticle = articleHtml.replace(
    /<svg[\s\S]*?data-astro-cid-ccg5yoga>[\s\S]*?<\/svg>/,
    iconSvg,
  );

  if (updatedArticle === articleHtml) return mainHtml;

  return mainHtml.slice(0, articleStart) + updatedArticle + mainHtml.slice(articleEndIdx);
}

export function applyFoundationCardIcons(
  mainHtml: string,
  pageGuard: (html: string) => boolean,
  cards: readonly { title: string; paths: string }[],
): string {
  if (!pageGuard(mainHtml)) return mainHtml;

  let html = mainHtml;
  for (const card of cards) {
    html = patchFoundCardIconByTitle(html, card.title, klearFoundationIconSvg(card.paths));
  }
  return html;
}

/** Legency tiles / undersized chips → bare stroke at foundation card scale (48px). */
export function patchFoundationBareIconChips(mainHtml: string, headingMarker: string): string {
  if (!mainHtml.includes(headingMarker)) return mainHtml;

  const size = KLEAR_FOUNDATION_ICON_SIZE_PX;
  const bareChip = `<span class="icon-chip icon-chip--bare" style="--icon-chip-size:${size}px"`;

  let out = mainHtml;
  let searchFrom = 0;
  while (true) {
    const foundationStart = out.indexOf('<section class="section foundation"', searchFrom);
    if (foundationStart === -1) break;
    const foundationEnd = out.indexOf('</section>', foundationStart);
    if (foundationEnd === -1) break;

    const section = out.slice(foundationStart, foundationEnd);
    const patchedSection = section.replace(
      /<span class="icon-chip(?: icon-chip--bare)?" style="--icon-chip-size:(?:22|48)px"/g,
      bareChip,
    );
    out = out.slice(0, foundationStart) + patchedSection + out.slice(foundationEnd);
    searchFrom = foundationStart + patchedSection.length;
  }

  return out;
}
