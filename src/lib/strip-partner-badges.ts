import { footerColumns, servicesNavAccordionLabel, siteNav } from '../data/navigation';
import { klearNavHrefRewrites } from '../data/klear-nav-urls';
import { stripLegencyReferences } from './brand';

/** Hide disabled primary nav items from archive chrome (pages stay routable). */
export function removeDisabledSiteNavItems(html: string): string {
  let out = html;
  for (const item of siteNav) {
    if (!('disabled' in item && item.disabled)) continue;
    const escaped = item.href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(
      new RegExp(
        `<li[^>]*>\\s*<a class="tsnav__li"[^>]*href="${escaped}"[^>]*>[\\s\\S]*?<\\/a>\\s*<\\/li>`,
        'gi',
      ),
      '',
    );
  }
  return out;
}

/** Remove Webflow Enterprise + Google Preferred Source partner marks from mirrored templates. */
export function stripPartnerBadges(html: string): string {
  let out = html;
  out = out.replace(/<div class="footer__badge"[^>]*>[\s\S]*?<\/div>/gi, '');
  out = out.replace(/<a class="footer__prefsrc"[^>]*>[\s\S]*?<\/a>/gi, '');
  out = out.replace(/<div class="hero__badge"[^>]*>[\s\S]*?<\/div>/gi, '');
  out = out.replace(/<a class="badge-link"[^>]*>[\s\S]*?<\/a>/gi, '');
  out = out.replace(/<img[^>]*\bsrc="\/img\/badge-enterprise[^"]*"[^>]*>/gi, '');
  out = out.replace(/<img[^>]*\bsrc="\/img\/google-preferred-source-dark\.png"[^>]*>/gi, '');
  return out;
}

/** Footer copyright line → {year} KlearNow.AI (keeps data-dynamic-year span). */
export function patchFooterCopyright(html: string): string {
  let out = html.replace(
    /<span([^>]*)>\s*<span data-dynamic-year([^>]*)>(\d{4})<\/span>\s*Legency Media\s*<\/span>/g,
    '<span$1><span data-dynamic-year$2>$3</span> KlearNow.AI</span>',
  );
  out = out.replace(
    /©\s*<span([^>]*)>\s*<span data-dynamic-year([^>]*)>(\d{4})<\/span>\s*KlearNow\.AI\s*<\/span>/g,
    '<span$1><span data-dynamic-year$2>$3</span> KlearNow.AI</span>',
  );
  return out;
}

/** Legency mirror paths → KlearNow canonical nav URLs. */
export function patchNavKlearHrefs(html: string): string {
  let out = html;
  for (const [from, to] of klearNavHrefRewrites) {
    out = out.replaceAll(`href="${from}"`, `href="${to}"`);
  }
  out = out.replaceAll('href="/slef-filers/"', 'href="/self-filers/"');
  return out;
}

/** Site nav “About” → KlearNow post-entry audit label (still links to /about/). */
export function patchNavAboutLabel(html: string): string {
  return html.replace(
    /(<a class="tsnav__li" href="\/about\/"[^>]*>)About(<\/a>)/g,
    '$1Post-Entry Audit$2',
  );
}

/** Site nav “How we work” → Tariff Calcultor (still links to /how-we-work/). */
export function patchNavHowWeWorkLabel(html: string): string {
  return html.replace(
    /(<a class="tsnav__li" href="\/how-we-work\/"[^>]*>)How we work(<\/a>)/g,
    '$1Tariff Calcultor$2',
  );
}

/** Site nav “Case studies” → Coverage (still links to /case-studies/). */
export function patchNavCaseStudiesLabel(html: string): string {
  return html.replace(
    /(<a class="tsnav__li" href="\/case-studies\/"[^>]*>)Case studies(<\/a>)/g,
    '$1Coverage$2',
  );
}

/** Services mega-menu group “Websites” → Products. */
export function patchNavWebsitesGroupLabel(html: string): string {
  return html.replace(
    /(<span class="tsnav__group-label"[^>]*>)Websites(<\/span>)/g,
    '$1Products$2',
  );
}

/** Products group: Webflow Enterprise nav card → KlearData. */
export function patchNavKlearDataLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/services\/webflow-enterprise\/"[^>]*><span class="tsnav__link-title"[^>]*>)Webflow Enterprise(<\/span><span class="tsnav__link-blurb"[^>]*>)Webflow builds for complex sites and the teams who manage them\.(<\/span><\/a>)/g,
    '$1KlearData$2Turn every document into filing-ready data$3',
  );
}

/** Products group: Webflow support nav card → KlearHub. */
export function patchNavKlearHubLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/services\/webflow-support\/"[^>]*><span class="tsnav__link-title"[^>]*>)Webflow support(<\/span><span class="tsnav__link-blurb"[^>]*>)Ongoing development and technical support for your Webflow site\.(<\/span><\/a>)/g,
    '$1KlearHub$2The software gathering trade compliance globally$3',
  );
}

/** Products group: WordPress to Webflow nav card → Managed Trade. */
export function patchNavManagedTradeLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/services\/wordpress-to-webflow-migration\/"[^>]*><span class="tsnav__link-title"[^>]*>)WordPress to Webflow(<\/span><span class="tsnav__link-blurb"[^>]*>)A planned migration with URL mapping, redirects and search checks\.(<\/span><\/a>)/g,
    '$1Managed Trade$2Our licensed broker runs it for you$3',
  );
}

/** Operation TYpe group: Technical SEO → Trade Compliance. */
export function patchNavTradeComplianceLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/services\/technical-seo\/"[^>]*><span class="tsnav__link-title"[^>]*>)Technical SEO(<\/span><span class="tsnav__link-blurb"[^>]*>)Fix technical issues affecting search visibility and page performance\.(<\/span><\/a>)/g,
    '$1Trade Compliance$2Real-TIme import Visibilty$3',
  );
}

/** Operation TYpe group: AEO agency → Custom Brokers. */
export function patchNavCustomBrokersLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/aeo-agency\/"[^>]*><span class="tsnav__link-title"[^>]*>)AEO agency(<\/span><span class="tsnav__link-blurb"[^>]*>)Improve how AI tools find and describe your business, with citation tracking\.(<\/span><\/a>)/g,
    '$1Custom Brokers$2File Faster, Fewer Errors$3',
  );
}

/** Operation TYpe group: Search & AI visibility → Freight Forwarders. */
export function patchNavFreightForwardersLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/services\/search-ai-visibility\/"[^>]*><span class="tsnav__link-title"[^>]*>)Search &amp; AI visibility(<\/span><span class="tsnav__link-blurb"[^>]*>)SEO and AI visibility work based on how buyers research your category\.(<\/span><\/a>)/g,
    '$1Freight Forwarders$2AI-driven clearance workflow$3',
  );
}

/** Services mega-menu group “Search & AI” → Operation TYpe. */
export function patchNavSearchAiGroupLabel(html: string): string {
  return html.replace(
    /(<span class="tsnav__group-label"[^>]*>)Search &amp; AI(<\/span>)/g,
    '$1Operation TYpe$2',
  );
}

/** Products → Operation TYpe: Astro web development card (same href/copy). */
export function moveNavAstroLinkToOperationType(html: string): string {
  const liRe =
    /<li[^>]*>\s*<a class="tsnav__link" href="\/services\/astro-agency\/"[\s\S]*?<\/a>\s*<\/li>/;
  const match = html.match(liRe);
  if (!match) return html;

  const li = match[0];
  let out = html.replace(liRe, '');

  const groupMarker = '<div class="tsnav__group"';
  const firstGroup = out.indexOf(groupMarker);
  const secondGroup = out.indexOf(groupMarker, firstGroup + 1);
  if (secondGroup === -1) return html;

  const ulClose = out.indexOf('</ul>', secondGroup);
  if (ulClose === -1) return html;

  return out.slice(0, ulClose) + li + out.slice(ulClose);
}

/** Place book CTA in the services grid beside Operation TYpe (third column). */
export function moveNavBookBesideOperationType(html: string): string {
  const bookRe = /<aside class="tsnav__book"[\s\S]*?<\/aside>/;
  const bookMatch = html.match(bookRe);
  if (!bookMatch) return html;

  const book = bookMatch[0];
  let out = html.replace(bookRe, '');

  const groupsStart = out.indexOf('<div class="tsnav__groups"');
  if (groupsStart === -1) return html;

  const groupMarker = '<div class="tsnav__group"';
  const g1 = out.indexOf(groupMarker, groupsStart);
  const g2 = out.indexOf(groupMarker, g1 + 1);
  if (g2 === -1) return html;

  const ulEnd = out.indexOf('</ul>', g2);
  if (ulEnd === -1) return html;
  const groupEnd = out.indexOf('</div>', ulEnd);
  if (groupEnd === -1) return html;
  const insertAt = groupEnd + '</div>'.length;

  return out.slice(0, insertAt) + book + out.slice(insertAt);
}

/** Nav panel eyebrows — empty markup; spacing from layout-stable.css. */
export function hideNavPanelEyebrows(html: string): string {
  return html
    .replace(
      /<p class="tsnav__eyebrow tsnav__eyebrow--site"[^>]*>Site<\/p>/g,
      '<p class="tsnav__eyebrow tsnav__eyebrow--site" aria-hidden="true"></p>',
    )
    .replace(
      /<p class="tsnav__eyebrow tsnav__eyebrow--services"[^>]*>Services<\/p>/g,
      '<p class="tsnav__eyebrow tsnav__eyebrow--services" aria-hidden="true"></p>',
    );
}

/** Services mega-menu: drop Conversion column. */
export function removeNavConversionGroup(html: string): string {
  return html.replace(
    /<div class="tsnav__group"[^>]*><span class="tsnav__group-label"[^>]*>Conversion<\/span><ul class="tsnav__group-list"[^>]*>[\s\S]*?<\/ul><\/div>/,
    '',
  );
}

/** Services mega-menu book CTA → Ask Klear. */
export function patchNavServicesBookCta(html: string): string {
  return html.replace(
    /(<div class="tsnav__book-cta"[^>]*>[\s\S]*?<span class="btn-bubble-arrow__content-text"[^>]*>)Get in touch(<\/span>)/,
    '$1Ask Klear$2',
  );
}

/** Operation TYpe group: Astro web development → Self Filers. */
export function patchNavSelfFilersLink(html: string): string {
  return html.replace(
    /(<a class="tsnav__link" href="\/services\/astro-agency\/"[^>]*><span class="tsnav__link-title"[^>]*>)Astro web development(<\/span><span class="tsnav__link-blurb"[^>]*>)Fast static sites in your own repository, on the same design system\.(<\/span><\/a>)/g,
    '$1Self Filers$2Clean Data, Faster Filing$3',
  );
}

/** Archive nav: Legency LinkedIn → KlearNow. */
export function patchNavLinkedIn(html: string): string {
  return stripLegencyReferences(html);
}

/** Nav accordion trigger — “Services” → Service model. */
export function patchNavServicesAccordionLabel(html: string): string {
  return html.replace(
    /(<button class="tsnav__acc-head"[^>]*>[\s\S]*?<span[^>]*>)Services(<\/span>)/,
    `$1${servicesNavAccordionLabel}$2`,
  );
}

export function applyKlearNavChrome(html: string): string {
  let out = html;
  out = patchNavLinkedIn(out);
  out = patchNavServicesAccordionLabel(out);
  out = patchNavAboutLabel(out);
  out = patchNavHowWeWorkLabel(out);
  out = patchNavCaseStudiesLabel(out);
  out = patchNavWebsitesGroupLabel(out);
  out = patchNavSearchAiGroupLabel(out);
  out = patchNavKlearDataLink(out);
  out = patchNavKlearHubLink(out);
  out = patchNavManagedTradeLink(out);
  out = patchNavFreightForwardersLink(out);
  out = patchNavCustomBrokersLink(out);
  out = patchNavTradeComplianceLink(out);
  out = moveNavAstroLinkToOperationType(out);
  out = patchNavSelfFilersLink(out);
  out = patchNavServicesBookCta(out);
  out = removeNavConversionGroup(out);
  out = moveNavBookBesideOperationType(out);
  out = hideNavPanelEyebrows(out);
  out = patchNavKlearHrefs(out);
  out = removeDisabledSiteNavItems(out);
  return stripLegencyReferences(out);
}

const KLEAR_FOOTER_LOGO_IMG =
  'class="footer__logo" src="/img/klearnow-logo-horizontal-primary.svg" alt="KlearNow" width="231" height="57"';

/** Legency wordmark in footer brand column → KlearNow horizontal logo. */
export function patchFooterLogo(html: string): string {
  let out = html;
  out = out.replace(/aria-label="Legency Media homepage"/g, 'aria-label="KlearNow home"');
  // Mirror chrome may already say alt="KlearNow" while src is still logo-white.svg (Legency artwork).
  out = out.replace(
    /class="footer__logo" src="\/img\/logo-white\.svg" alt="[^"]*" width="\d+" height="\d+"/g,
    KLEAR_FOOTER_LOGO_IMG,
  );
  return out;
}

/** Legency “Galway City, Ireland” line in Company column — not used on KlearNow. */
export function removeFooterPlace(html: string): string {
  return html.replace(/<p class="footer__place"[^>]*>[\s\S]*?<\/p>/gi, '');
}

const FOOTER_COL_SPACER =
  '<div class="footer__col footer__col--spacer" aria-hidden="true"></div>';

type FooterLink = { href: string; label: string; disabled?: boolean };

function mirrorFooterLinkItem(link: FooterLink): string {
  if (link.disabled) {
    return `<li data-astro-cid-jo6i4kqk><span class="footer__link footer__link--disabled" aria-disabled="true" data-astro-cid-jo6i4kqk>${link.label}</span></li>`;
  }
  return `<li data-astro-cid-jo6i4kqk><a href="${link.href}" data-astro-cid-jo6i4kqk>${link.label}</a></li>`;
}

function mirrorFooterColHtml(title: string, links: readonly FooterLink[]): string {
  const items = links.map((link) => mirrorFooterLinkItem(link)).join('');
  return `<div class="footer__col" data-astro-cid-jo6i4kqk><h3 data-astro-cid-jo6i4kqk>${title}</h3><ul data-astro-cid-jo6i4kqk>${items}</ul></div>`;
}

function replaceMirrorFooterCol(
  html: string,
  legacyHeading: string,
  column: { title: string; links: readonly FooterLink[] },
): string {
  const escaped = legacyHeading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `<div class="footer__col"[^>]*>\\s*<h3[^>]*>${escaped}<\\/h3>[\\s\\S]*?<\\/div>`,
  );
  return html.replace(re, mirrorFooterColHtml(column.title, column.links));
}

/** Legency footer link columns → KlearNow Resources / Our Products / Company. */
export function patchFooterLinkColumns(html: string): string {
  const resources = footerColumns.find((col) => col.title === 'Resources');
  const products = footerColumns.find((col) => col.title === 'Our Products');
  const company = footerColumns.find((col) => col.title === 'Company');
  if (!resources || !products || !company) return html;

  let out = html;
  out = replaceMirrorFooterCol(out, 'Conversion', resources);
  out = replaceMirrorFooterCol(out, 'Industries', products);
  out = replaceMirrorFooterCol(out, 'Company', company);
  return out;
}

/** Legency Websites + Search & AI footer columns → empty grid slots (keep layout). */
export function spacerFooterWebsitesAndSearchColumns(html: string): string {
  let out = html;
  out = out.replace(
    /<div class="footer__col"[^>]*>\s*<h3[^>]*>Websites<\/h3>[\s\S]*?<\/div>/,
    FOOTER_COL_SPACER,
  );
  out = out.replace(
    /<div class="footer__col"[^>]*>\s*<h3[^>]*>Search &amp; AI<\/h3>[\s\S]*?<\/div>/,
    FOOTER_COL_SPACER,
  );
  return out;
}

/** Cookie policy link + “Cookie choices” reopen control in footer bar. */
export function removeFooterCookieLegal(html: string): string {
  let out = html;
  out = out.replace(/<a href="\/cookies\/"[^>]*>[\s\S]*?<\/a>/gi, '');
  out = out.replace(/<button type="button" class="footer__consent"[^>]*>[\s\S]*?<\/button>/gi, '');
  return out;
}

/** Legency footer parallax CTA (“Get in touch” ring) — omitted on KlearNow. */
export function removeFooterCloserSection(html: string): string {
  const marker = '<section class="closer"';
  const start = html.indexOf(marker);
  if (start === -1) return html;

  let depth = 0;
  let i = start;
  while (i < html.length) {
    const open = html.indexOf('<section', i);
    const close = html.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return html.slice(0, start) + html.slice(i);
    }
  }

  return html;
}
