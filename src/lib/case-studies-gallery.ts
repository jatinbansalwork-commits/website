/** Legency Coverage index: gallery cards under `[data-case-gallery]`. */

import { SITE_NAME } from './brand';
import { KLEAR_CASE_STUDY_CHALLENGE_PARAGRAPHS } from '../data/klear-case-study-challenge-copy';
import {
  KLEAR_CASE_STUDY_SOLUTION_CARDS,
  KLEAR_CASE_STUDY_SOLUTION_CARD_HEADINGS,
  KLEAR_CASE_STUDY_SOLUTION_CARD_TEXT,
  type KlearExtraSolutionCard,
  type KlearExtraSolutionCardBody,
  type KlearSolutionCardBody,
} from '../data/klear-case-study-solution-copy';
import { KLEAR_POST_ENTRY_AUDIT_CASE_SUMMARY } from './marketing-agent-home';

const CS_DETAIL_CID = 'data-astro-cid-f4yest4y';

const ASTRO_CID = 'data-astro-cid-q7obu3qe';

/** Tag filters on Coverage — `data-case-filter` must match each card’s `data-case-category`. */
export const KLEAR_COVERAGE_CASE_FILTERS: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'all', label: 'All tags' },
  { id: 'canada-post-entry-audit', label: 'Canada Post Entry Audit' },
  { id: 'canada-trade-compliance', label: 'Canada Trade Compliance' },
  { id: 'customs-compliance', label: 'Customs Compliance' },
  { id: 'food-and-beverage', label: 'Food and beverage' },
  { id: 'podcast', label: 'Podcast' },
  { id: 'retail', label: 'Retail' },
  { id: 'tariff-refunds', label: 'Tariff refunds' },
  { id: 'tariffs', label: 'Tariffs' },
  { id: 'trade-compliance', label: 'Trade compliance' },
];

const COVERAGE_CARD_TAG_OPTIONS = KLEAR_COVERAGE_CASE_FILTERS.filter((f) => f.id !== 'all');

/** Gallery card order on `/coverage/` (matches round-robin tags). */
const KLEAR_COVERAGE_GALLERY_SLUGS = [
  'grata',
  'blueflame-ai',
  'coreshell',
  'channelsight',
  'arcus',
] as const;

function coverageTagForCaseStudyPathSegment(segment: string): (typeof COVERAGE_CARD_TAG_OPTIONS)[number] {
  const idx = KLEAR_COVERAGE_GALLERY_SLUGS.indexOf(
    segment as (typeof KLEAR_COVERAGE_GALLERY_SLUGS)[number],
  );
  return COVERAGE_CARD_TAG_OPTIONS[idx >= 0 ? idx : 0];
}

/** Real Klear stories on Coverage; Legency mirror ships 16 placeholder cards. */
export const KLEAR_COVERAGE_GALLERY_CARD_LIMIT = 5;

/** Coverage gallery headline overrides by mirror slug (`case-studies.json` path segment). */
const KLEAR_COVERAGE_CARD_TITLES: Readonly<Record<string, string>> = {
  grata:
    'Post Entry Audit Finds $1.7M in Duty Overcharges Hidden by Tariff Stacking',
  'blueflame-ai': 'Giving your logistics program the Customs360 view',
  coreshell:
    'A Big Win: UFlex Industries’ Global Control Tower Journey with KlearHub',
  channelsight:
    'Leveraging KlearNow.AI to streamline the customs clearance process',
  arcus:
    'KlearNow enables Recycled Paper Tubes company to keep goods flowing in post-brexit using AI technology',
};

const KLEAR_COVERAGE_CARD_SUMMARIES: Readonly<Record<string, string>> = {
  grata: KLEAR_POST_ENTRY_AUDIT_CASE_SUMMARY,
  'blueflame-ai':
    'Trusted. Transparent. Tech Endemic. KlearNow.AI helps a large importer of refractured minerals streamline their global supply chain processes through Customs360 visibility, broker coordination, and filing-ready data across borders.',
  coreshell:
    'Discover how UFlex Industries seamlessly integrated KlearHub, propelling their supply chain into a new era of efficiency, transparency, and unprecedented control across their global control tower.',
  channelsight:
    'How an Oilfield Services Global Leader Harnessed the Power of AI Through KlearNow.AI to Consolidate Trade Data and Streamline Customs Clearance Operations.',
  arcus:
    'The Recycled Paper Tubes company imports around 50% of its raw materials from outside the UK, with a significant part of this coming from the EU. They use KlearNow.AI to keep goods moving through post-Brexit customs without delays or manual rework.',
};

const CASE_STUDY_CARD_RE =
  /<article\b[^>]*\bclass="work-card"[^>]*\bdata-case-category=/g;

function buildCoverageFilterButtons(): string {
  return KLEAR_COVERAGE_CASE_FILTERS.map((filter, index) => {
    const pressed = index === 0 ? 'true' : 'false';
    return `<button type="button" data-case-filter="${filter.id}" aria-pressed="${pressed}" aria-controls="case-grid" ${ASTRO_CID}>${filter.label}</button>`;
  }).join('');
}

/** Drop Legency placeholder cards after the first N gallery entries. */
export function patchCaseStudyGalleryTrimExtraCards(
  mainHtml: string,
  keepCount = KLEAR_COVERAGE_GALLERY_CARD_LIMIT,
): string {
  if (keepCount <= 0) return mainHtml;

  let cardIndex = 0;
  return mainHtml.replace(/<article class="work-card"[\s\S]*?<\/article>/g, (article) => {
    cardIndex += 1;
    return cardIndex <= keepCount ? article : '';
  });
}

/** Eyebrow above Coverage hero h1. */
export function patchCaseStudyGalleryHeroLabel(mainHtml: string): string {
  return mainHtml.replace(
    /<span class="label" data-astro-cid-q7obu3qe>Case studies<\/span>/,
    `<span class="label" ${ASTRO_CID}>${SITE_NAME}</span>`,
  );
}

/** Coverage hero title (replaces Legency “Selected work.”). */
export function patchCaseStudyGalleryHeroTitle(mainHtml: string): string {
  return mainHtml.replace(
    /<h1 data-astro-cid-q7obu3qe>Selected work<span data-astro-cid-q7obu3qe>\.<\/span><\/h1>/,
    `<h1 ${ASTRO_CID}>Case studies<span ${ASTRO_CID}>.</span></h1>`,
  );
}

/** Gallery card CTA label. */
export function patchCaseStudyGalleryCardCta(mainHtml: string): string {
  return mainHtml.replace(/View case study/g, 'Read more');
}

const CASE_VISUAL_PLACEHOLDER =
  '<span class="case-visual case-visual--placeholder" aria-hidden="true"></span>';

/** Replace Legency desk/monitor photos with an empty visual slot until Klear art is ready. */
export function patchCaseStudyVisualPlaceholder(mainHtml: string): string {
  return mainHtml.replace(/<img class="case-visual"[^>]*>/g, CASE_VISUAL_PLACEHOLDER);
}

/** @deprecated Use {@link patchCaseStudyVisualPlaceholder}. */
export const patchCaseStudyGalleryCardVisualPlaceholder = patchCaseStudyVisualPlaceholder;

/** Drop Legency photo credit / staging caption under the case study hero visual. */
export function patchCaseStudyDetailRemoveHeroFigcaption(mainHtml: string): string {
  return mainHtml.replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/g, '');
}

/** Remove Legency hero metric block (e.g. “19 reusable section families”). */
export function patchCaseStudyDetailRemoveHeroStats(mainHtml: string): string {
  return mainHtml.replace(/<dl class="cs-stats"[^>]*>[\s\S]*?<\/dl>/g, '');
}

/** Remove “Our role” header row from the hero side card. */
export function patchCaseStudyDetailRemoveSideCardTop(mainHtml: string): string {
  return mainHtml.replace(/<div class="side-card__top"[^>]*>[\s\S]*?<\/div>/g, '');
}

/** Hero side card body — same summary as the Coverage gallery card. */
export function patchCaseStudyDetailSideCardText(mainHtml: string, mirrorSlug: string): string {
  const segment = mirrorSlug.replace(/^case-studies__/, '');
  const summary = KLEAR_COVERAGE_CARD_SUMMARIES[segment];
  if (!summary) return mainHtml;

  return mainHtml.replace(
    /(<p class="side-card__text"[^>]*>)[\s\S]*?(<\/p>)/,
    (_match, open: string, close: string) => `${open}${summary}${close}`,
  );
}

/** Drop Legency challenge headline (Klear stories use body copy only). */
export function patchCaseStudyDetailRemoveChallengeTitle(mainHtml: string): string {
  return mainHtml.replace(/<h2[^>]*class="challenge__title"[^>]*>[\s\S]*?<\/h2>/g, '');
}

/** Drop Legency solution headline in `section.solution`. */
export function patchCaseStudyDetailRemoveSolutionTitle(mainHtml: string): string {
  return mainHtml.replace(/<h2[^>]*class="solution__title"[^>]*>[\s\S]*?<\/h2>/g, '');
}

function isRichSolutionCardBody(
  blocks: KlearSolutionCardBody,
): blocks is { readonly html: string } {
  return typeof blocks === 'object' && blocks !== null && 'html' in blocks;
}

function formatSolutionCardText(blocks: KlearSolutionCardBody): string {
  if (isRichSolutionCardBody(blocks)) return blocks.html;
  const parts = typeof blocks === 'string' ? [blocks] : [...blocks];
  return parts.join('<br><br>');
}

function iconChipFromSolCard(articleHtml: string): string {
  const match = articleHtml.match(/<span class="icon-chip[^>]*>[\s\S]*?<\/span>/);
  return match?.[0] ?? '';
}

function extraSolutionCardBodyHtml(body: KlearExtraSolutionCardBody): string {
  if (isRichSolutionCardBody(body)) {
    return `<div class="sol-card__text sol-card__text--rich" ${CS_DETAIL_CID}>${body.html}</div>`;
  }
  if (Array.isArray(body)) {
    return body
      .map((item) => {
        if (typeof item === 'object' && item !== null && 'html' in item) {
          return `<div class="sol-card__text sol-card__text--rich" ${CS_DETAIL_CID}>${item.html}</div>`;
        }
        return `<p class="sol-card__text" ${CS_DETAIL_CID} style="white-space: pre-line;">${item}</p>`;
      })
      .join('');
  }
  return `<p class="sol-card__text" ${CS_DETAIL_CID} style="white-space: pre-line;">${body}</p>`;
}

function buildExtraSolutionCard(
  card: KlearExtraSolutionCard,
  articles: RegExpMatchArray[],
): string {
  const iconIndex = card.iconSourceIndex ?? articles.length - 1;
  const source = articles[iconIndex] ?? articles[articles.length - 1];
  const iconChip = iconChipFromSolCard(source[0]);
  const bodyHtml = extraSolutionCardBodyHtml(card.body);

  return `<article class="sol-card" ${CS_DETAIL_CID}><div class="sol-card__top" ${CS_DETAIL_CID}><h3 class="sol-card__heading" ${CS_DETAIL_CID}>${card.heading}</h3>${iconChip}</div>${bodyHtml}</article>`;
}

/** Replace Legency solution cards (heading + body) inside `section.solution` only. */
export function patchCaseStudyDetailSolutionSection(mainHtml: string, mirrorSlug: string): string {
  const segment = mirrorSlug.replace(/^case-studies__/, '');
  const headings = KLEAR_CASE_STUDY_SOLUTION_CARD_HEADINGS[segment];
  const cardCopy = KLEAR_CASE_STUDY_SOLUTION_CARD_TEXT[segment];
  if (!headings?.length && !cardCopy?.length) return mainHtml;

  return mainHtml.replace(
    /(<section class="solution[^>]*>)([\s\S]*?)(<\/section>\s*(?=<section ))/,
    (_match, open: string, inner: string, close: string) => {
      let cardIndex = 0;
      const patched = inner.replace(
        /(<article class="sol-card"[^>]*>)([\s\S]*?)(<\/article>)/gi,
        (articleMatch, articleOpen: string, articleInner: string, articleClose: string) => {
          const title = headings?.[cardIndex];
          const copy = cardCopy?.[cardIndex];
          cardIndex += 1;
          if (!title && !copy) return articleMatch;

          let next = articleInner;
          if (title) {
            next = next.replace(
              /(<h3 class="sol-card__heading")([^>]*>)([\s\S]*?)(<\/h3>)/,
              (_m, hOpen: string, hMid: string, _hBody: string, hClose: string) =>
                `${hOpen}${hMid}${title}${hClose}`,
            );
          }
          if (copy) {
            const rich = isRichSolutionCardBody(copy);
            const bodyHtml = rich
              ? `<div class="sol-card__text sol-card__text--rich" ${CS_DETAIL_CID}>${copy.html}</div>`
              : `<p class="sol-card__text" ${CS_DETAIL_CID} style="white-space: pre-line;">${formatSolutionCardText(copy)}</p>`;
            next = next.replace(
              /<p class="sol-card__text"[^>]*>[\s\S]*?<\/p>|<div class="sol-card__text[^>]*>[\s\S]*?<\/div>/,
              bodyHtml,
            );
          }
          return `${articleOpen}${next}${articleClose}`;
        },
      );
      return `${open}${patched}${close}`;
    },
  );
}

/** Remove Legency outcome band (`section.outcome`). */
export function patchCaseStudyDetailRemoveOutcomeSection(mainHtml: string): string {
  return mainHtml.replace(/<section class="outcome"[^>]*>[\s\S]*?<\/section>/, '');
}

/** Append configured extra solution cards after patched mirror cards. */
export function patchCaseStudyDetailAppendSolutionCards(mainHtml: string, mirrorSlug: string): string {
  const segment = mirrorSlug.replace(/^case-studies__/, '');
  const extras = KLEAR_CASE_STUDY_SOLUTION_CARDS[segment];
  if (!extras?.length) return mainHtml;

  const sectionMatch = mainHtml.match(
    /<section class="solution[^>]*>[\s\S]*?<\/section>\s*(?=<section )/,
  );
  if (!sectionMatch) return mainHtml;

  const articles = [...sectionMatch[0].matchAll(/<article class="sol-card"[\s\S]*?<\/article>/g)];
  const templateArticle = articles.at(-1)?.[0];
  if (!templateArticle) return mainHtml;

  const built = extras.map((card) => buildExtraSolutionCard(card, articles)).join('');
  const insertAt = sectionMatch[0].lastIndexOf(templateArticle) + templateArticle.length;
  const updatedSection =
    sectionMatch[0].slice(0, insertAt) + built + sectionMatch[0].slice(insertAt);

  return mainHtml.replace(sectionMatch[0], updatedSection);
}

/** Replace Legency challenge narrative in `section.challenge`. */
export function patchCaseStudyDetailChallengeBody(mainHtml: string, mirrorSlug: string): string {
  const segment = mirrorSlug.replace(/^case-studies__/, '');
  const paragraphs = KLEAR_CASE_STUDY_CHALLENGE_PARAGRAPHS[segment];
  if (!paragraphs?.length) return mainHtml;

  const body = paragraphs.map((text) => `<p ${CS_DETAIL_CID}>${text}</p>`).join('');

  return mainHtml.replace(
    /(<div class="challenge__text"[^>]*>)[\s\S]*?(<\/div>)/,
    (_match, open: string, close: string) => `${open}${body}${close}`,
  );
}

/** Case study detail hero title — same copy as the Coverage gallery card. */
export function patchCaseStudyDetailHeroTitle(mainHtml: string, mirrorSlug: string): string {
  const segment = mirrorSlug.replace(/^case-studies__/, '');
  const title = KLEAR_COVERAGE_CARD_TITLES[segment];
  if (!title) return mainHtml;

  return mainHtml.replace(
    /(<h1 class="cs-hero__title"[^>]*>)[\s\S]*?(<\/h1>)/,
    (_match, open: string, close: string) => `${open}${title}${close}`,
  );
}

/** Swap Legency client chip for the Coverage gallery tag on the matching story. */
export function patchCaseStudyDetailCoverageTag(
  mainHtml: string,
  mirrorSlug: string,
): string {
  const segment = mirrorSlug.replace(/^case-studies__/, '');
  const { label } = coverageTagForCaseStudyPathSegment(segment);
  const markup = `<ul class="coverage-hero__tags" data-astro-cid-f4yest4y><li data-astro-cid-f4yest4y>${label}</li></ul>`;

  if (/<span class="cs-hero__client"/.test(mainHtml)) {
    return mainHtml.replace(/<span class="cs-hero__client"[^>]*>[\s\S]*?<\/span>/, markup);
  }
  if (/<img class="cs-hero__logo"/.test(mainHtml)) {
    return mainHtml.replace(/<img class="cs-hero__logo"[^>]*>/, markup);
  }
  return mainHtml;
}

/** Drop client + industry row on gallery cards. */
export function patchCaseStudyGalleryRemoveCardIdentity(mainHtml: string): string {
  return mainHtml.replace(
    /<div class="work-card__identity"[^>]*>[\s\S]*?<\/div>/g,
    '',
  );
}

/** Remove metric block and status pill on gallery cards. */
export function patchCaseStudyGalleryRemoveCardStatsAndStatus(mainHtml: string): string {
  return mainHtml
    .replace(/<dl class="work-card__stats"[^>]*>[\s\S]*?<\/dl>/g, '')
    .replace(/<p class="work-card__status"[^>]*>[\s\S]*?<\/p>/g, '');
}

/**
 * Swap Legency service chips for Coverage tags; set `data-case-category` for toolbar filters.
 * Placeholder Legency cards are round-robin assigned until real Klear stories replace them.
 */
function patchCoverageCardCopyBySlug(
  mainHtml: string,
  titles: Readonly<Record<string, string>>,
  summaries: Readonly<Record<string, string>>,
): string {
  if (Object.keys(titles).length === 0 && Object.keys(summaries).length === 0) {
    return mainHtml;
  }

  return mainHtml.replace(
    /<article class="work-card"([^>]*)>([\s\S]*?)<\/article>/g,
    (full, attrs: string, body: string) => {
      const slug = body.match(/href="\/case-studies\/([^"/]+)\//)?.[1];
      if (!slug) return full;

      let nextBody = body;
      const title = titles[slug];
      if (title) {
        nextBody = nextBody.replace(
          /(<h2[^>]*>\s*<a[^>]*href="[^"]*"[^>]*>)[^<]+(<\/a>)/,
          (_m, open: string, close: string) => `${open}${title}${close}`,
        );
      }

      const summary = summaries[slug];
      if (summary) {
        nextBody = nextBody.replace(
          /(<p class="work-card__summary"[^>]*>)[^<]+(<\/p>)/,
          (_m, open: string, close: string) => `${open}${summary}${close}`,
        );
      }

      if (nextBody === body) return full;
      return `<article class="work-card"${attrs}>${nextBody}</article>`;
    },
  );
}

export function patchCaseStudyGalleryCardTitles(mainHtml: string): string {
  return patchCoverageCardCopyBySlug(mainHtml, KLEAR_COVERAGE_CARD_TITLES, {});
}

export function patchCaseStudyGalleryCardSummaries(mainHtml: string): string {
  return patchCoverageCardCopyBySlug(mainHtml, {}, KLEAR_COVERAGE_CARD_SUMMARIES);
}

export function patchCaseStudyGalleryCardTags(mainHtml: string): string {
  let cardIndex = 0;
  return mainHtml.replace(
    /<article class="work-card"([^>]*)>([\s\S]*?)<\/article>/g,
    (_full, attrs: string, body: string) => {
      const tag = COVERAGE_CARD_TAG_OPTIONS[cardIndex % COVERAGE_CARD_TAG_OPTIONS.length];
      cardIndex += 1;

      const nextAttrs = attrs.includes('data-case-category=')
        ? attrs.replace(/data-case-category="[^"]*"/, `data-case-category="${tag.id}"`)
        : `${attrs} data-case-category="${tag.id}"`;

      const nextBody = body.replace(
        /<ul class="work-card__tags"[^>]*>[\s\S]*?<\/ul>/,
        `<ul class="work-card__tags" ${ASTRO_CID}><li ${ASTRO_CID}>${tag.label}</li></ul>`,
      );

      return `<article class="work-card"${nextAttrs}>${nextBody}</article>`;
    },
  );
}

/** Swap Legency service filters for KlearNow coverage tags. */
export function patchCaseStudyGalleryFilters(mainHtml: string): string {
  const buttons = buildCoverageFilterButtons();
  return mainHtml.replace(
    /<div class="work__filters"[^>]*>[\s\S]*?<\/div>/,
    `<div class="work__filters" role="group" aria-label="Filter by tag" data-case-filters hidden ${ASTRO_CID}>${buttons}</div>`,
  );
}

export function countCaseStudyGalleryCards(mainHtml: string): number {
  return (mainHtml.match(CASE_STUDY_CARD_RE) ?? []).length;
}

export function formatCaseStudyProjectCount(count: number): string {
  return count === 1 ? '1 project' : `${count} projects`;
}

/** Keep `.work__count` in sync with visible gallery cards (filter script reads the same node). */
export function patchCaseStudyGalleryProjectCount(mainHtml: string): string {
  const count = countCaseStudyGalleryCards(mainHtml);
  if (count === 0) return mainHtml;

  const label = formatCaseStudyProjectCount(count);
  return mainHtml.replace(
    /<p class="work__count"([^>]*)>[^<]*<\/p>/,
    (_, attrs: string) => {
      const rest = attrs.replace(/\sdata-case-count(?:="[^"]*")?/, '');
      return `<p class="work__count"${rest} data-case-count="${count}">${label}</p>`;
    },
  );
}
