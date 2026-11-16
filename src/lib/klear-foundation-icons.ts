/**
 * Foundation problem-card icons — same stroke system as tier lists (see AGENTS.md).
 * Keep path strings in sync with `scripts/lib/foundation-card-icons.mjs`.
 */

import { klearStrokeSvg } from './klear-stroke-icons';

/** Foundation problem cards — larger than tier list bullets (was Legency 48px tile). */
export const KLEAR_FOUNDATION_ICON_SIZE_PX = 48;

/** Capture / structure / document intake (screenshot: flask). */
export const KLEAR_ICON_CAPTURE_STRUCTURE =
  '<path d="M9 2h6"/><path d="M10 2v6.5a4.5 4.5 0 0 0 1.2 3.1c.8.9 1.8 1.4 2.8 1.4s2-.5 2.8-1.4A4.5 4.5 0 0 0 18 8.5V2"/><path d="M7 14h10"/><path d="M8.5 18h7"/><circle cx="10.5" cy="11.5" r=".5"/><circle cx="13.5" cy="10" r=".5"/><circle cx="12" cy="13" r=".5"/>';

/** Validate / flag / compliance (screenshot: document + pencil). */
export const KLEAR_ICON_VALIDATE_DOC =
  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h5"/><path d="M8 17h3"/><path d="m16 19-2.5-2.5 1.4-1.4 2.5 2.5L16 19z"/><path d="m15.5 14.5 1 1"/>';

/** Structured data / integration (screenshot: braces). */
export const KLEAR_ICON_DATA_BRACES =
  '<path d="M8 3H6a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2 0 1.1 0 2.2-.6 3.1-.6.9-.6 1.9-.6 3.1v2a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v2c0 1.1-.9 2-2 2 0 1.1 0 2.2.6 3.1.6.9.6 1.9.6 3.1v2a2 2 0 0 1-2 2h-2"/>';

/** Reporting / BI / audit insight (screenshot: bar chart). */
export const KLEAR_ICON_OPS_INSIGHT =
  '<path d="M3 20V9"/><path d="M9 20V5"/><path d="M15 20v-6"/><path d="M21 20V11"/><path d="M3 20h18"/>';

/** Data ingestion stack (tier list mirror). */
export const KLEAR_ICON_DOC_INGESTION =
  '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v4c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 9v4c0 1.7 3.6 3 8 3s8-1.3 8-3V9"/><path d="M12 13v8"/><path d="m9 18 3 3 3-3"/>';

/** Manual re-keying / forms. */
export const KLEAR_ICON_MANUAL_ENTRY =
  '<rect width="18" height="12" x="3" y="6" rx="2"/><path d="M7 10h.01"/><path d="M11 10h6"/><path d="M7 14h.01"/><path d="M11 14h6"/>';

/** Audit / exception surfacing. */
export const KLEAR_ICON_AUDIT_ALERT =
  '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>';

/** Drayage / inland move. */
export const KLEAR_ICON_DRAYAGE =
  '<path d="M10 17h4"/><path d="M3 9h11v8H3z"/><path d="M14 9h4l3 4v4h-7V9z"/><circle cx="7.5" cy="18" r="1.5"/><circle cx="17.5" cy="18" r="1.5"/>';

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