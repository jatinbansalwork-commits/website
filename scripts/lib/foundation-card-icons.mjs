/**
 * Foundation card stroke icons — keep path strings in sync with src/lib/klear-foundation-icons.ts
 */
import {
  ICON_CAPTURE_STRUCTURE,
  ICON_DATA_BRACES,
  ICON_OPS_INSIGHT,
  ICON_VALIDATE_DOC,
} from './klear-icon-paths.mjs';

const WRAP =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ccg5yoga>';

export const paths = {
  captureStructure: ICON_CAPTURE_STRUCTURE,
  validateDoc: ICON_VALIDATE_DOC,
  dataBraces: ICON_DATA_BRACES,
  opsInsight: ICON_OPS_INSIGHT,
};

function iconSvg(pathMarkup) {
  return `${WRAP}${pathMarkup}</svg>`;
}

function patchFoundCardIconByTitle(html, cardTitle, svg) {
  const escaped = cardTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titleRe = new RegExp(`<h3[^>]*>${escaped}<\\/h3>`);
  const titleMatch = titleRe.exec(html);
  if (!titleMatch) return html;

  const titleIdx = titleMatch.index;
  const articleStart = html.lastIndexOf('<article class="found-card"', titleIdx);
  if (articleStart === -1) return html;

  const articleEnd = html.indexOf('</article>', titleIdx);
  if (articleEnd === -1) return html;
  const articleEndIdx = articleEnd + '</article>'.length;

  const articleHtml = html.slice(articleStart, articleEndIdx);
  const updatedArticle = articleHtml.replace(
    /<svg[\s\S]*?data-astro-cid-ccg5yoga>[\s\S]*?<\/svg>/,
    svg,
  );
  if (updatedArticle === articleHtml) return html;

  return html.slice(0, articleStart) + updatedArticle + html.slice(articleEndIdx);
}

function patchBareChips(html, headingMarker) {
  if (!html.includes(headingMarker)) return html;
  return html.replace(
    /<span class="icon-chip" style="--icon-chip-size:48px"/g,
    '<span class="icon-chip icon-chip--bare" style="--icon-chip-size:48px"',
  );
}

/** Custom Brokers foundation — mirror of build-time patch (for offline JSON refresh). */
export function applyCustomBrokersFoundationIcons(html) {
  if (!html.includes('Addressing key broker challenges')) return html;

  const cards = [
    ['Complex documentation', paths.captureStructure],
    ['Compliance and accuracy', paths.validateDoc],
    ['Efficiency and cost reduction', paths.dataBraces],
    ['Pre- &amp; Post-Audit Support', paths.opsInsight],
  ];

  let out = html;
  for (const [title, p] of cards) {
    out = patchFoundCardIconByTitle(out, title, iconSvg(p));
  }
  return patchBareChips(out, 'Addressing key broker challenges');
}
