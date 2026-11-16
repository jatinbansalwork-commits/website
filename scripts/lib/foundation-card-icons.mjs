/**
 * Foundation card stroke icons — keep path strings in sync with src/lib/klear-foundation-icons.ts
 */
const WRAP =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ccg5yoga>';

export const paths = {
  captureStructure:
    '<path d="M9 2h6"/><path d="M10 2v6.5a4.5 4.5 0 0 0 1.2 3.1c.8.9 1.8 1.4 2.8 1.4s2-.5 2.8-1.4A4.5 4.5 0 0 0 18 8.5V2"/><path d="M7 14h10"/><path d="M8.5 18h7"/><circle cx="10.5" cy="11.5" r=".5"/><circle cx="13.5" cy="10" r=".5"/><circle cx="12" cy="13" r=".5"/>',
  validateDoc:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h5"/><path d="M8 17h3"/><path d="m16 19-2.5-2.5 1.4-1.4 2.5 2.5L16 19z"/><path d="m15.5 14.5 1 1"/>',
  dataBraces:
    '<path d="M8 3H6a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2 0 1.1 0 2.2-.6 3.1-.6.9-.6 1.9-.6 3.1v2a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v2c0 1.1-.9 2-2 2 0 1.1 0 2.2.6 3.1.6.9.6 1.9.6 3.1v2a2 2 0 0 1-2 2h-2"/>',
  opsInsight:
    '<path d="M3 20V9"/><path d="M9 20V5"/><path d="M15 20v-6"/><path d="M21 20V11"/><path d="M3 20h18"/>',
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