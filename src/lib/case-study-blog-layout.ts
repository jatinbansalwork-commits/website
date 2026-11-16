/** Re-skin Coverage (case-studies mirror) with the Legency blog list / post chrome. */

import type { MirrorManifest } from './mirror-types';
import { klearSiteNavHrefs } from '../data/klear-nav-urls';
import { KLEAR_COVERAGE_CASE_FILTERS } from './case-studies-gallery';

const BLOG_INDEX_CSS = '/_astro/index.CdOpebYh.css';
const BLOG_POST_LAYOUT_CSS = '/_astro/_slug_.CwQmvq9W.css';
const BLOG_POST_DATES_CSS = '/_astro/content-dates.BuDO8NS7.css';
const CASE_STUDY_SECTION_CSS = '/_astro/_slug_.CjSPQXea.css';

const BLOG_INDEX_CID = 'data-astro-cid-x255k2k2';
const BLOG_POST_CID = 'data-astro-cid-zg7dkzxc';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function uniqueStylesheets(urls: string[]): string[] {
  return [...new Set(urls)];
}

/** Blog list + post stylesheets; drop case-study-only gallery modules. */
export function augmentManifestForCaseStudyBlogLayout(manifest: MirrorManifest): MirrorManifest {
  if (manifest.slug === 'case-studies') {
    const withoutIndex = manifest.stylesheets.filter((s) => !/\/index\.[^/]+\.css$/.test(s));
    return {
      ...manifest,
      stylesheets: uniqueStylesheets([...withoutIndex, BLOG_INDEX_CSS]),
      inlineModules: [],
    };
  }

  if (manifest.kind === 'case-study') {
    const base = manifest.stylesheets.filter(
      (s) => !s.includes('_slug_.CK85GR9c'),
    );
    return {
      ...manifest,
      stylesheets: uniqueStylesheets([
        ...base,
        BLOG_POST_DATES_CSS,
        BLOG_POST_LAYOUT_CSS,
        CASE_STUDY_SECTION_CSS,
      ]),
    };
  }

  return manifest;
}

type CoverageCard = {
  href: string;
  title: string;
  summary: string;
  category: string;
  tagLabel: string;
  mediaHtml: string;
};

function parseCoverageGalleryCards(html: string): CoverageCard[] {
  const cards: CoverageCard[] = [];
  const articleRe = /<article class="work-card"([^>]*)>([\s\S]*?)<\/article>/g;

  for (const match of html.matchAll(articleRe)) {
    const attrs = match[1];
    const body = match[2];
    const category = attrs.match(/data-case-category="([^"]*)"/)?.[1] ?? 'all';
    const href =
      body.match(/<h2[^>]*>\s*<a[^>]+href="([^"]+)"/)?.[1] ??
      body.match(/href="(\/case-studies\/[^"]+)"/)?.[1] ??
      '#';
    const title = stripTags(body.match(/<h2[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1] ?? '');
    const summary = stripTags(body.match(/<p class="work-card__summary"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '');
    const tagLabel = stripTags(
      body.match(/<ul class="work-card__tags"[^>]*>\s*<li[^>]*>([\s\S]*?)<\/li>/)?.[1] ?? '',
    );
    const img = body.match(/<img class="case-visual"[^>]*>/)?.[0];
    const placeholder = '<span class="case-visual case-visual--placeholder" aria-hidden="true"></span>';
    const mediaHtml = img ?? placeholder;

    if (!title) continue;
    cards.push({ href, title, summary, category, tagLabel, mediaHtml });
  }

  return cards;
}

function buildPostCardMedia(card: CoverageCard): string {
  if (card.mediaHtml.startsWith('<img')) {
    const img = card.mediaHtml.replace(/\bclass="[^"]*"/, 'class="post-card__img"');
    return `<div class="post-card__media" ${BLOG_INDEX_CID}>${img}</div>`;
  }
  return `<div class="post-card__media post-card__media--placeholder" ${BLOG_INDEX_CID}>${card.mediaHtml}</div>`;
}

function buildPostCard(card: CoverageCard): string {
  const tag = card.tagLabel || 'Coverage';
  return `<li class="filter-list__item" data-filter-name="${escapeHtml(card.category)}" ${BLOG_INDEX_CID}><a class="post-card" href="${escapeHtml(card.href)}" ${BLOG_INDEX_CID}>${buildPostCardMedia(card)}<div class="post-card__meta" ${BLOG_INDEX_CID}><span class="post-card__tag" data-tag="${escapeHtml(card.category)}" ${BLOG_INDEX_CID}>${escapeHtml(tag)}</span></div><h3 class="post-card__title" ${BLOG_INDEX_CID}>${escapeHtml(card.title)}</h3>${card.summary ? `<p class="post-card__desc" ${BLOG_INDEX_CID}>${escapeHtml(card.summary)}</p>` : ''}</a></li>`;
}

const FEATURED_CTA = `<a class="btn-bubble-arrow btn-bubble-arrow--blue" href="HREF_PLACEHOLDER"><motion>CTA</motion></a>`
  .replace(
    '<motion>CTA</motion>',
    `<div class="btn-bubble-arrow__content"><span class="btn-bubble-arrow__content-text">Read more</span></div>`,
  );

function buildFeaturedCard(card: CoverageCard): string {
  const img = card.mediaHtml.startsWith('<img')
    ? card.mediaHtml.replace(/\bclass="[^"]*"/, 'class="featured__img"')
    : `<span class="featured__img featured__img--placeholder" aria-hidden="true"></span>`;
  const tag = card.tagLabel || 'Coverage';
  const cta = FEATURED_CTA.replace('HREF_PLACEHOLDER', escapeHtml(card.href));

  return `<section class="featured" ${BLOG_INDEX_CID}><div class="container" ${BLOG_INDEX_CID}><h2 class="featured__label" ${BLOG_INDEX_CID}>Featured case study</h2><article class="featured__card" ${BLOG_INDEX_CID}><a class="featured__img-link" href="${escapeHtml(card.href)}" tabindex="-1" aria-hidden="true" ${BLOG_INDEX_CID}>${img}</a><div class="featured__body" ${BLOG_INDEX_CID}><div class="featured__meta" ${BLOG_INDEX_CID}><span class="featured__chip" data-tag="${escapeHtml(card.category)}" ${BLOG_INDEX_CID}>${escapeHtml(tag)}</span></div><h3 class="featured__title" ${BLOG_INDEX_CID}><a class="featured__title-link" href="${escapeHtml(card.href)}" ${BLOG_INDEX_CID}>${escapeHtml(card.title)}</a></h3>${card.summary ? `<p class="featured__desc" ${BLOG_INDEX_CID}>${escapeHtml(card.summary)}</p>` : ''}<div class="featured__cta" ${BLOG_INDEX_CID}>${cta}</div></div></article></div></section>`;
}

function buildRecentGrid(cards: CoverageCard[]): string {
  const filterButtons = KLEAR_COVERAGE_CASE_FILTERS.map(
    (f) =>
      `<button type="button" class="filter-btn" data-filter-target="${escapeHtml(f.id)}" ${BLOG_INDEX_CID}>${escapeHtml(f.label)}</button>`,
  ).join('');

  const list = cards.map((c) => buildPostCard(c)).join('');

  return `<section class="section recent" data-filter-group ${BLOG_INDEX_CID}><div class="container" ${BLOG_INDEX_CID}><div class="recent__head" ${BLOG_INDEX_CID}><h2 class="recent__title" ${BLOG_INDEX_CID}>All case studies</h2><div class="recent__filters" role="group" aria-label="Filter case studies by tag" ${BLOG_INDEX_CID}>${filterButtons}</div></div><ul class="recent__grid" ${BLOG_INDEX_CID}>${list}</ul></div></section>`;
}

/** Coverage index → blog list shell (bloghead, featured, recent grid). */
export function patchCaseStudyIndexToBlogLayout(mainHtml: string): string {
  const heroMatch = mainHtml.match(/<section class="work-hero"[^>]*>[\s\S]*?<\/section>/);
  if (!heroMatch) return mainHtml;

  const hero = heroMatch[0];
  const label = stripTags(hero.match(/<span class="label"[^>]*>([\s\S]*?)<\/span>/)?.[1] ?? 'Coverage');
  const titleRaw = hero.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
  const title = stripTags(titleRaw);

  const cards = parseCoverageGalleryCards(mainHtml);
  if (cards.length === 0) return mainHtml;

  const head = `<header class="bloghead" ${BLOG_INDEX_CID}><div class="container" ${BLOG_INDEX_CID}><span class="label" ${BLOG_INDEX_CID}>${escapeHtml(label)}</span><h1 class="bloghead__title" ${BLOG_INDEX_CID}>${escapeHtml(title)}</h1></div></header>`;

  const featured = buildFeaturedCard(cards[0]);
  const recent = buildRecentGrid(cards);

  const stripped = mainHtml
    .replace(/<section class="work-hero"[^>]*>[\s\S]*?<\/section>/, '')
    .replace(/<section class="work section"[^>]*>[\s\S]*?<\/section>/, '')
    .replace(/<section class="ctaband"[^>]*>[\s\S]*?<\/section>/, '')
    .trim();

  if (stripped) {
    return `${head}${featured}${recent}${stripped}`;
  }

  return `${head}${featured}${recent}`;
}

function extractHeroCover(heroHtml: string): string {
  const img = heroHtml.match(/<img[^>]+>/)?.[0];
  if (img && !img.includes('placeholder')) {
    return img.replace(/\bclass="[^"]*"/, 'class="posthead__cover"');
  }
  return `<div class="posthead__cover posthead__cover--placeholder" aria-hidden="true"></div>`;
}

/** Case study detail → blog post shell (posthead + post rail + prose body). */
export function patchCaseStudyDetailToBlogLayout(mainHtml: string): string {
  const heroMatch = mainHtml.match(/<section class="cs-hero"[^>]*>[\s\S]*?<\/section>/);
  if (!heroMatch) return mainHtml;

  const hero = heroMatch[0];
  const tag = stripTags(
    hero.match(/<ul class="coverage-hero__tags"[^>]*>\s*<li[^>]*>([\s\S]*?)<\/li>/)?.[1] ??
      hero.match(/<span class="cs-hero__client"[^>]*>([\s\S]*?)<\/span>/)?.[1] ??
      'Case study',
  );
  const title = stripTags(hero.match(/<h1 class="cs-hero__title"[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
  const summary = stripTags(hero.match(/<p class="side-card__text"[^>]*>([\s\S]*?)<\/p>/)?.[1] ?? '');
  const cover = extractHeroCover(hero);
  const coverageHref = klearSiteNavHrefs.coverage;

  const posthead = `<header class="posthead" ${BLOG_POST_CID}><div class="container posthead__inner" ${BLOG_POST_CID}><div class="posthead__text" ${BLOG_POST_CID}><p class="posthead__kicker" ${BLOG_POST_CID}><a class="posthead__crumb" href="${coverageHref}" ${BLOG_POST_CID}>Coverage</a><span class="posthead__sep" aria-hidden="true" ${BLOG_POST_CID}>/</span><span class="label posthead__tag" ${BLOG_POST_CID}>${escapeHtml(tag)}</span></p><h1 class="posthead__title" ${BLOG_POST_CID}>${escapeHtml(title)}</h1>${summary ? `<p class="posthead__summary" ${BLOG_POST_CID}>${escapeHtml(summary)}</p>` : ''}</div>${cover}</div></header>`;

  const sections = mainHtml.replace(heroMatch[0], '').trim();

  const postShell = `<div class="container post" data-toc-wrap data-toc-offset="120" data-toc-levels="h2,h3" ${BLOG_POST_CID}><aside class="post__rail" ${BLOG_POST_CID}><div class="post__meta-row" ${BLOG_POST_CID}><span class="post__meta-label" ${BLOG_POST_CID}>Format</span><span ${BLOG_POST_CID}>Case study</span></div><div class="post__meta-row" ${BLOG_POST_CID}><span class="post__meta-label" ${BLOG_POST_CID}>Topic</span><span ${BLOG_POST_CID}>${escapeHtml(tag)}</span></div><div class="post__rail-sticky" data-lenis-prevent ${BLOG_POST_CID}><div class="post__toc" ${BLOG_POST_CID}><span class="post__toc-label" ${BLOG_POST_CID}>On this page</span><nav data-toc-list class="toc-list" aria-label="On this page" ${BLOG_POST_CID}></nav></div></div></aside><article class="post__body" ${BLOG_POST_CID}><div class="prose kn-coverage-prose" data-toc-content ${BLOG_POST_CID}>${sections}</div></article></div>`;

  return `${posthead}${postShell}`;
}
