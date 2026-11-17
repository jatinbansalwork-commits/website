import marketingAgentShell from '../data/marketing-agent-shell.html?raw';
import homeBandsSection from '../data/home-bands-section.html?raw';
import homeAstroServicesSection from '../data/home-astro-services-section.html?raw';
import homeRotSection from '../data/home-rot-section.html?raw';
import klearHubScopeFeeSection from '../data/klear-hub-scope-fee-section.html?raw';
import klearHubRotSection from '../data/klear-hub-rot-section.html?raw';
import klearDataTestimonialsSection from '../data/testimonials-section.html?raw';
import klearDataLeaksSection from '../data/leaks-section.html?raw';
import klearDataEntryLineSection from '../data/klear-data-entry-line-section.html?raw';
import klearHubHomeServicesExtraCards from '../data/klear-hub-home-services-extra-cards.html?raw';
import klearDataVsSection from '../data/klear-data-vs-section.html?raw';
import managedTradeHomeServicesRepeatSection from '../data/managed-trade-home-services-repeat-section.html?raw';
import klearDataFeeSection from '../data/klear-data-fee-section.html?raw';
import klearDataDpServiceChoices from '../data/klear-data-dp-service-choices.html?raw';
import freightForwardersDpAltSection from '../data/freight-forwarders-dp-alt-section.html?raw';
import klearOperationSvcHeroSection from '../data/klear-operation-svc-hero-section.html?raw';
import klearPrivacyPolicyProse from '../data/klear-privacy-policy-prose.html?raw';
import enterpriseMirror from '../data/mirror/services__webflow-enterprise.json';
import aeoAgencyMirror from '../data/mirror/aeo-agency.json';
import technicalSeoMirror from '../data/mirror/services__technical-seo.json';
import { isKlearOperationMirror } from '../data/klear-nav-urls';
import { servicesNavAccordionLabel } from '../data/navigation';
import { buildClosingDpServiceChoicesHtml } from './klear-closing-dp-cards';
import {
  KLEAR_ICON_AUDIT_ALERT,
  KLEAR_ICON_CAPTURE_STRUCTURE,
  KLEAR_ICON_DATA_BRACES,
  KLEAR_ICON_DOC_INGESTION,
  KLEAR_ICON_DRAYAGE,
  KLEAR_ICON_MANUAL_ENTRY,
  KLEAR_ICON_OPS_INSIGHT,
  KLEAR_ICON_VALIDATE_DOC,
  applyFoundationCardIcons,
  klearFoundationIconSvg,
  patchFoundCardIconByTitle,
  patchFoundationBareIconChips,
} from './klear-foundation-icons';
import {
  ICON_BELL,
  ICON_BRIEFCASE,
  ICON_CLIPBOARD,
  ICON_DOC_INGESTION,
  ICON_DRAYAGE,
  ICON_FILE_CHECK,
  ICON_FILE_SEARCH,
  ICON_GLOBE,
  ICON_LANDED_COST,
  ICON_LAYERS,
  ICON_LAYOUT,
  ICON_LINK,
  ICON_MAIL,
  ICON_MAP_PIN,
  ICON_MESSAGE,
  ICON_SHIELD_CHECK,
  ICON_TARIFF_CHART,
  ICON_TREND_UP,
  ICON_USERS,
  ICON_USER_X,
} from './klear-icon-paths';
import { klearStrokeSvg } from './klear-stroke-icons';

/** KlearData / FF two-card vs band (not Legency “tool vs agency” `vs__grid` elsewhere). */
const KLEAR_DATA_TWO_CARD_VS_MARKER = 'NO NEW PORTAL, NO NEW HABITS';

function replaceTierDarkVideo(html: string): string {
  const marker = '<div class="tier__video" aria-hidden="true" data-astro-cid-lcdefpme>';
  const start = html.indexOf(marker);
  if (start === -1) return html;

  let depth = 0;
  let i = start;
  while (i < html.length) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
      continue;
    }

    depth -= 1;
    i = nextClose + 6;
    if (depth === 0) {
      return html.slice(0, start) + TIER_DARK_CANVAS + html.slice(i);
    }
  }

  return html;
}

const TIER_DARK_CANVAS = `<div class="tier__video" aria-hidden="true" data-astro-cid-lcdefpme><canvas data-nav-dither data-dither-mode="visible" aria-hidden="true"></canvas></div>`;

/** Execution-layer card: Legency donut video → KlearNow teal procedural dither. */
export function patchTierDarkDither(mainHtml: string): string {
  return replaceTierDarkVideo(mainHtml);
}

/** KlearNow earth texture + marketing hero class (replaces Saturn home-planet). */
export function patchHeroEarthDither(mainHtml: string): string {
  let html = mainHtml;
  html = html.replace('<section class="hero"', '<section class="hero hero--home"');
  html = html.replace(
    /(<section class="hero hero--home"[^>]*>)/,
    '$1<div class="hero-bg" aria-hidden="true"><div class="hero-glow"></div><div class="hero-grid"></div></div>',
  );
  html = html.replace(
    /<div class="hero__planet"[^>]*>/,
    '<div class="hero__planet" data-klear-earth-dither="/img/klearnow/home-earth.webp" data-live-dither-theme="light" data-astro-cid-lcdefpme>',
  );
  return html;
}

const ABOUT_HERO_EARTH_STAGE =
  '<div class="hero__stage" data-live-dither-host data-astro-cid-ta2fbyqs>' +
  '<div class="hero__art" aria-hidden="true" data-astro-cid-ta2fbyqs>' +
  '<div class="hero__planet" data-klear-earth-dither="/img/klearnow/home-earth.webp" data-live-dither-theme="light" data-astro-cid-ta2fbyqs></div>' +
  '</div>';

/** Legency about creds/separates canvas dither — electric blue accent pixels. */
const ABOUT_DITHER_BLUE_ACCENT = 'a[h]=C?0:6,a[h+1]=C?4:6,a[h+2]=C?246:12';

/** KlearNow teal (#007499) for about `creds__panel` and band dithers. */
const ABOUT_DITHER_TEAL_ACCENT = 'a[h]=C?0:6,a[h+1]=C?116:6,a[h+2]=C?153:12';

export function patchAboutDitherModuleTeal(inlineModule: string): string {
  if (!inlineModule.includes('aboutDither')) return inlineModule;
  if (!inlineModule.includes(ABOUT_DITHER_BLUE_ACCENT)) return inlineModule;
  return inlineModule.replace(ABOUT_DITHER_BLUE_ACCENT, ABOUT_DITHER_TEAL_ACCENT);
}

export function patchAboutInlineModulesTeal(
  inlineModules: string[] | undefined,
): string[] | undefined {
  if (!inlineModules?.length) return inlineModules;
  return inlineModules.map(patchAboutDitherModuleTeal);
}

const ABOUT_HERO_TITLE = 'Be Part of a Digital Transformation Journey';

/** About Us: hero headline. */
export function patchAboutHeroTitle(mainHtml: string): string {
  if (!mainHtml.includes('class="hero__title"')) return mainHtml;

  return mainHtml.replace(
    /<h1 class="hero__title"[^>]*>Your Webflow<br[^>]*>Partner<\/h1>/,
    `<h1 class="hero__title" data-astro-cid-ta2fbyqs>${ABOUT_HERO_TITLE}</h1>`,
  );
}

/** About Us: drop Legency hero subcopy. */
export function removeAboutHeroSub(mainHtml: string): string {
  if (!mainHtml.includes('class="hero__sub"')) return mainHtml;
  return mainHtml.replace(/<p class="hero__sub"[^>]*>[\s\S]*?<\/p>/, '');
}

/** About Us: drop hero “About” eyebrow. */
export function removeAboutHeroLabel(mainHtml: string): string {
  return mainHtml.replace(
    /<span class="label" data-astro-cid-ta2fbyqs>About<\/span>/,
    '',
  );
}

/** About Us: drop hero CTA button. */
export function removeAboutHeroCta(mainHtml: string): string {
  const heroStart = mainHtml.indexOf('<section class="hero');
  if (heroStart === -1) return mainHtml;

  const hero = sliceSectionAt(mainHtml, heroStart);
  if (!hero) return mainHtml;

  const patched = hero.replace(
    /<a class="btn-bubble-arrow btn-bubble-arrow--blue"[^>]*>[\s\S]*?<\/a>/,
    '',
  );
  if (patched === hero) return mainHtml;

  return mainHtml.slice(0, heroStart) + patched + mainHtml.slice(heroStart + hero.length);
}

const ABOUT_CREDS_ITEMS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: '6 Global Locations',
    body: 'We operate across 6 strategic locations worldwide, ensuring local support with global reach.',
  },
  {
    title: '240+ Employees',
    body: 'Our diverse team of 180+ dedicated professionals drives innovation and delivers excellence every day.',
  },
  {
    title: '2,000+ Customers',
    body: 'Trusted by over 2000 customers globally, we’re committed to delivering value and building lasting relationships.',
  },
];

function aboutCredsProofHtml(): string {
  const items = ABOUT_CREDS_ITEMS.map(
    ({ title, body }) =>
      `<div class="klear-creds-proof__item">` +
      `<h3 class="klear-creds-proof__title">${title}</h3>` +
      `<p class="klear-creds-proof__body">${body}</p>` +
      `</div>`,
  ).join('');
  return (
    `<div class="klear-creds-proof" role="list" aria-label="Company credentials">` +
    items +
    `</div>`
  );
}

/** About Us: credentials as one proof component (not three list rows). */
export function patchAboutCredsList(mainHtml: string): string {
  if (!mainHtml.includes('class="creds__list"')) return mainHtml;
  return mainHtml.replace(
    /<ul class="creds__list"[^>]*>[\s\S]*?<\/ul>/,
    aboutCredsProofHtml(),
  );
}

function sliceDivAt(mainHtml: string, start: number): string | null {
  if (start === -1 || !mainHtml.startsWith('<div', start)) return null;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<div', i);
    const close = mainHtml.indexOf('</div>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 4;
      continue;
    }
    depth -= 1;
    i = close + 6;
    if (depth === 0) return mainHtml.slice(start, i);
  }
  return null;
}

/** About Us: hide “The System” + intro from AT (space kept via CSS). */
export function hideAboutCredsIntro(mainHtml: string): string {
  let html = mainHtml.replace(
    /<span class="label" data-astro-cid-ta2fbyqs>The System<\/span>/,
    '<span class="label" data-astro-cid-ta2fbyqs aria-hidden="true">The System</span>',
  );
  html = html.replace(
    /(<p class="creds__intro"[^>]*)(>)/,
    '$1 aria-hidden="true"$2',
  );
  return html;
}

const ABOUT_SEPARATES_STORY_TITLE = 'About Us';

const ABOUT_SEPARATES_STORY_HTML =
  `<div class="separates__rows" data-astro-cid-ta2fbyqs>` +
  `<div class="separates__row separates__row--about-story" data-astro-cid-ta2fbyqs>` +
  `<div class="klear-about-story" data-astro-cid-ta2fbyqs>` +
  `<p data-astro-cid-ta2fbyqs>In 2018, in the heart of Silicon Valley, KlearNow.AI saw an opportunity to futurize the customs clearance processes globally. Our customs clearance software, compliance control tower, and Licensed Customs Broker services tackle critical pain points in the complex world of trade management.</p>` +
  `<p data-astro-cid-ta2fbyqs>KlearNow.AI enhances importers, self-filers, and customs brokers trade operations by ingesting, contextualizing and structuring data from multiple silos across internal and external sources. We automate workflows for clearance and compliance processes with improved data accuracy, speed, reduced costs, and continuous financial and compliance validations.</p>` +
  `<h3 data-astro-cid-ta2fbyqs>Part of a Digital Transformation Journey</h3>` +
  `<p data-astro-cid-ta2fbyqs>Global trade has become increasingly complex, shaped by shifting tariffs, trade uncertainty, supply chain disruptions, and regulatory changes. During Trump’s initial IEEPA tariffs, Brexit, the upheaval in supply chains during the Covid pandemic and now Trump on Trade 2.0 with 232s, 122S and more 301s, the tariff complexity is coming increasingly faster, we’ve helped our customers navigate uncertainty with confidence.</p>` +
  `<p data-astro-cid-ta2fbyqs>Today, over 2,000 businesses rely on KlearNow.AI to replace manual processes with smart automation, eliminating lost emails, spreadsheets, and delays. The future of trade demands new thinking, and we’re proud to be part of that transformation.</p>` +
  `</div></div></div>`;

/** About Us: section title + company story (replaces Legency separates rows). */
export function patchAboutSeparatesStory(mainHtml: string): string {
  if (!mainHtml.includes('class="separates__title"')) return mainHtml;

  let html = mainHtml.replace(
    /<h2 class="separates__title"[^>]*>[\s\S]*?<\/h2>/,
    `<h2 class="separates__title" data-astro-cid-ta2fbyqs data-no-roll>${ABOUT_SEPARATES_STORY_TITLE}</h2>`,
  );

  if (!html.includes('class="separates__rows"')) return html;

  return html.replace(
    /<div class="separates__rows"[^>]*>[\s\S]*?<\/div><\/div><\/section>/,
    `${ABOUT_SEPARATES_STORY_HTML}</div></section>`,
  );
}

/** About Us: blog teaser section title. */
export function patchAboutBlogteaserTitle(mainHtml: string): string {
  if (!mainHtml.includes('class="blogteaser__title"')) return mainHtml;
  return mainHtml.replace(
    /<h2 class="blogteaser__title"[^>]*>[\s\S]*?<\/h2>/,
    '<h2 class="blogteaser__title" data-astro-cid-ta2fbyqs data-no-roll>Our story</h2>',
  );
}

const ABOUT_YOUTUBE_ID = 'QX_b_Pb_rdg';

function aboutBlogteaserYoutubeHtml(): string {
  const thumb = `https://i.ytimg.com/vi/${ABOUT_YOUTUBE_ID}/maxresdefault.jpg`;
  return (
    `<div class="klear-yt" data-klear-yt="${ABOUT_YOUTUBE_ID}" data-klear-yt-title="Our story">` +
    `<button type="button" class="klear-yt__facade" data-klear-yt-play aria-label="Play Our story video">` +
    `<img class="klear-yt__thumb" src="${thumb}" alt="" width="1280" height="720" loading="lazy" decoding="async" />` +
    `<span class="klear-yt__play" aria-hidden="true"></span>` +
    `</button>` +
    `</div>`
  );
}

/** About Us: blog grid → YouTube story thumbnail / player. */
export function patchAboutBlogteaserYoutube(mainHtml: string): string {
  const gridStart = mainHtml.indexOf('<div class="blogteaser__grid"');
  if (gridStart === -1) return mainHtml;

  const grid = sliceDivAt(mainHtml, gridStart);
  if (!grid) return mainHtml;

  return (
    mainHtml.slice(0, gridStart) +
    aboutBlogteaserYoutubeHtml() +
    mainHtml.slice(gridStart + grid.length)
  );
}

/** About Us: drop Legency “Evidence” quote band. */
export function removeAboutQuoteSection(mainHtml: string): string {
  const marker = '<section class="quote"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;
  const section = sliceSectionAt(mainHtml, start);
  if (!section) return mainHtml;
  return mainHtml.slice(0, start) + mainHtml.slice(start + section.length);
}

function aboutLeaderPlaceholderCardHtml(): string {
  return (
    `<article class="klear-leader-card klear-leader-card--placeholder">` +
    `<div class="klear-leader-card__photo" aria-hidden="true"></div>` +
    `<div class="klear-leader-card__meta">` +
    `<p class="klear-leader-card__name">Name</p>` +
    `<p class="klear-leader-card__role">ROLE <span aria-hidden="true">→</span></p>` +
    `</div></article>`
  );
}

function aboutLeaderPanelHtml(id: string, cardCount: number, active: boolean): string {
  const cards = Array.from({ length: cardCount }, () => aboutLeaderPlaceholderCardHtml()).join('');
  const hidden = active ? '' : ' hidden';
  return (
    `<div class="klear-leadership__panel" id="leadership-${id}" role="tabpanel" ` +
    `aria-labelledby="leadership-tab-${id}"${hidden} data-leadership-panel="${id}">` +
    `<div class="klear-leadership__grid">${cards}</div>` +
    `</div>`
  );
}

function aboutLeadershipSectionHtml(): string {
  const tabs = [
    { id: 'founders', label: 'Founders' },
    { id: 'board', label: 'Board' },
    { id: 'advisors', label: 'Advisors' },
  ];
  const tabButtons = tabs
    .map(
      ({ id, label }, i) =>
        `<button type="button" class="klear-leadership__tab${i === 0 ? ' is-active' : ''}" ` +
        `role="tab" id="leadership-tab-${id}" aria-controls="leadership-${id}" ` +
        `aria-selected="${i === 0 ? 'true' : 'false'}" data-leadership-tab="${id}">${label}</button>`,
    )
    .join('');

  return (
    `<section class="section klear-leadership" aria-labelledby="leadership-heading">` +
    `<div class="container">` +
    `<h2 class="klear-leadership__title" id="leadership-heading">Meet our Leadership Team</h2>` +
    `<div class="klear-leadership__tabs" role="tablist" aria-label="Leadership groups">` +
    tabButtons +
    `</div>` +
    aboutLeaderPanelHtml('founders', 3, true) +
    aboutLeaderPanelHtml('board', 7, false) +
    aboutLeaderPanelHtml('advisors', 7, false) +
    `</div></section>`
  );
}

/**
 * About Us: replace Legency pillars (or insert after Our story) with leadership placeholders.
 */
export function patchAboutLeadershipSection(mainHtml: string): string {
  if (mainHtml.includes('class="section klear-leadership"')) return mainHtml;

  const leadership = aboutLeadershipSectionHtml();
  const pillarsMarker = '<section class="section pillars"';
  const pillarsStart = mainHtml.indexOf(pillarsMarker);
  if (pillarsStart !== -1) {
    const pillars = sliceSectionAt(mainHtml, pillarsStart);
    if (pillars) {
      return (
        mainHtml.slice(0, pillarsStart) +
        leadership +
        mainHtml.slice(pillarsStart + pillars.length)
      );
    }
  }

  const blogMarker = '<section class="section blogteaser"';
  const blogStart = mainHtml.indexOf(blogMarker);
  if (blogStart !== -1) {
    const blog = sliceSectionAt(mainHtml, blogStart);
    if (blog) {
      const insertAt = blogStart + blog.length;
      return mainHtml.slice(0, insertAt) + leadership + mainHtml.slice(insertAt);
    }
  }

  return mainHtml + leadership;
}

/** About Us: place blog teaser immediately after the About Us (separates) band. */
export function moveAboutBlogteaserAfterSeparates(mainHtml: string): string {
  const blogMarker = '<section class="section blogteaser"';
  const blogStart = mainHtml.indexOf(blogMarker);
  if (blogStart === -1) return mainHtml;

  const blog = sliceSectionAt(mainHtml, blogStart);
  if (!blog) return mainHtml;

  const withoutBlog =
    mainHtml.slice(0, blogStart) + mainHtml.slice(blogStart + blog.length);

  const separatesStart = withoutBlog.indexOf('<section class="separates"');
  if (separatesStart === -1) return mainHtml;

  const separates = sliceSectionAt(withoutBlog, separatesStart);
  if (!separates) return mainHtml;

  const insertAt = separatesStart + separates.length;
  return withoutBlog.slice(0, insertAt) + blog + withoutBlog.slice(insertAt);
}

/** About Us: put specialists headline on the left, intro + list on the right. */
export function swapAboutCredsColumns(mainHtml: string): string {
  const leftStart = mainHtml.indexOf('<div class="creds__left"');
  const rightStart = mainHtml.indexOf('<div class="creds__right"');
  if (leftStart === -1 || rightStart === -1 || rightStart < leftStart) return mainHtml;

  const left = sliceDivAt(mainHtml, leftStart);
  const right = sliceDivAt(mainHtml, rightStart);
  if (!left || !right) return mainHtml;

  return (
    mainHtml.slice(0, leftStart) +
    right +
    left +
    mainHtml.slice(rightStart + right.length)
  );
}

/** About page: Legency secondary-hero (Saturn) → homepage earth dither. */
export function patchAboutHeroEarthDither(mainHtml: string): string {
  if (!mainHtml.includes('data-us-project-src="/scene/secondary-hero.json"')) return mainHtml;

  let html = mainHtml.replace(
    '<section class="hero" data-astro-cid-ta2fbyqs>',
    '<section class="hero hero--home" data-astro-cid-ta2fbyqs>' +
      '<div class="hero-bg" aria-hidden="true"><div class="hero-glow"></div><div class="hero-grid"></div></div>',
  );

  html = html.replace(
    /<div class="hero__tex" aria-hidden="true" data-us-project-src="\/scene\/secondary-hero\.json"[^>]*><\/div><div class="container hero__inner"/,
    `${ABOUT_HERO_EARTH_STAGE}<div class="container hero__inner"`,
  );

  html = html.replace(
    /(<section class="hero hero--home" data-astro-cid-ta2fbyqs>[\s\S]*?btn-bubble-arrow[\s\S]*?<\/a>)<\/div><\/section>/,
    '$1</div></div></section>',
  );

  return html;
}

/** Swap the mirrored Legency testimonial slider for the Klear Agent marketing demo. */
export function replaceQuoteSliderWithAgent(mainHtml: string): string {
  const marker = '<div class="quote__slider"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const nextOpen = mainHtml.indexOf('<div', i);
    const nextClose = mainHtml.indexOf('</div>', i);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 4;
      continue;
    }

    depth -= 1;
    i = nextClose + 6;
    if (depth === 0) {
      return mainHtml.slice(0, start) + marketingAgentShell + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

export const MARKETING_AGENT_STYLES = [
  '/marketing-agent/tokens.css',
  '/marketing-agent/assist-kn-type.css',
  '/marketing-agent/assist-panel.css',
  '/marketing-agent/assist-thread-messages.css',
] as const;

export const MARKETING_AGENT_DEFERRED_SCRIPTS = [
  '/marketing-agent/vendor/marketing-composer-files.js',
  '/marketing-agent/vendor/kn-next-actions.js',
  '/marketing-agent/vendor/klear-agent-ghost-autocomplete.js',
] as const;

export const MARKETING_AGENT_MODULE = '/marketing-agent/assist-panel.js';

export const TIER_DITHER_MODULE = '/scripts/tier-dark-dither-init.js';

export const KLEAR_HERO_STYLES = [
  '/css/klear-hero-tokens.css',
  '/css/klear-hero-bg.css',
  '/css/klear-hero-home.css',
] as const;

export const KLEAR_HERO_DITHER_MODULE = '/scripts/klear-hero-dither-init.js?v=klear-earth-3';

export const KLEAR_DATA_HERO_STYLES = ['/css/klear-hero-svc-data.css'] as const;

/** Shared Legency service page layout (`svc-hero`, bands, FAQ chrome). */
export const KLEAR_SVC_LAYOUT_STYLESHEET = '/_astro/ServiceLayout.DWPKQstD.css';
export const KLEAR_FAQ_SECTION_STYLESHEET = '/_astro/FaqSection.BU63QfoB.css';

export const KLEAR_DATA_DP_SECTION_STYLESHEET = '/css/klear-data-dp-section.css';

export const KLEAR_DATA_TESTIMONIALS_STYLESHEET = '/css/testimonials-section.css';
export const KLEAR_DATA_TESTIMONIALS_SCRIPT = '/scripts/testimonials-slider.js';

export const KLEAR_DATA_LEAKS_STYLESHEET = '/css/klear-data-leaks-section.css';
export const KLEAR_DATA_LEAKS_SCRIPT = '/scripts/leaks-accordion.js';

/** Turnaround bands block (mirrored from webflow-support). */
export const HOME_BANDS_STYLESHEET = '/_astro/webflow-support.BcWisDxm.css';

export const HOME_ASTRO_SERVICES_STYLESHEET = '/_astro/astro-agency.DUQtvsbn.css';

export const KLEAR_DATA_VS_STYLESHEET = '/_astro/aeo-agency.DlZCVDPA.css';

/** Retainer “How the fee is set” steps (from webflow-support scope band). */
export const KLEAR_DATA_FEE_STYLESHEET = '/_astro/webflow-support.BcWisDxm.css';

function indexOfSectionEnd(mainHtml: string, sectionStart: number): number {
  let depth = 0;
  let i = sectionStart;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) return i;
  }
  return -1;
}

/** Replace one module card SVG (locate the `article` that contains this `service-choice__title`). */
function patchServiceChoiceIconByTitle(html: string, title: string, paths: string): string {
  const h3 = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${title}</h3>`;
  const h3Pos = html.indexOf(h3);
  if (h3Pos === -1) return html;

  const articleStart = html.lastIndexOf('<article class="service-choice"', h3Pos);
  if (articleStart === -1) return html;

  const articleEnd = html.indexOf('</article>', h3Pos);
  if (articleEnd === -1) return html;

  const articleEndFull = articleEnd + '</article>'.length;
  const article = html.slice(articleStart, articleEndFull);
  const svg = klearStrokeSvg(paths, 'data-astro-cid-jg2u4s4c');
  const patchedArticle = article.replace(/<svg[\s\S]*?<\/svg>/, svg);
  if (patchedArticle === article) return html;

  return html.slice(0, articleStart) + patchedArticle + html.slice(articleEndFull);
}

const KLEAR_DATA_SVC_HERO_TEX =
  '<div class="svc-hero__tex svc-hero__tex--klear-earth" aria-hidden="true" data-astro-cid-asdozulm>' +
  '<div class="svc-hero__planet" data-klear-earth-dither="/img/klearnow/home-earth.webp" data-live-dither-theme="light" data-astro-cid-asdozulm></div></div>';

const KLEAR_SVC_HERO_BG =
  '<div class="hero-bg svc-hero__bg" aria-hidden="true"><div class="hero-glow"></div><div class="hero-grid"></div></div>';

/** Klear svc-hero: Legency scene → homepage-style earth dither. */
export function patchKlearSvcHeroEarth(mainHtml: string): string {
  let html = mainHtml.replace(
    /<div class="svc-hero__tex" aria-hidden="true"[^>]*>[\s\S]*?<\/div>/,
    KLEAR_DATA_SVC_HERO_TEX,
  );
  if (!html.includes('svc-hero__bg')) {
    html = html.replace(/(<section class="svc-hero[^"]*"[^>]*>)/, `$1${KLEAR_SVC_HERO_BG}`);
  }
  return html;
}

/** @deprecated Use {@link patchKlearSvcHeroEarth}. */
export const patchKlearDataSvcHeroEarth = patchKlearSvcHeroEarth;

export const KLEAR_SVC_HERO_CTA = 'Request for Demo';

/** Klear operation pages: primary `svc-hero` bubble CTA label. */
export function patchKlearSvcHeroCta(mainHtml: string): string {
  const heroStart = mainHtml.indexOf('<section class="svc-hero');
  if (heroStart === -1) return mainHtml;

  const heroEnd = indexOfSectionEnd(mainHtml, heroStart);
  if (heroEnd === -1) return mainHtml;

  const hero = mainHtml.slice(heroStart, heroEnd);
  const patched = hero.replace(
    /(<span class="btn-bubble-arrow__content-text"[^>]*>)([\s\S]*?)(<\/span>)/,
    (match, before, label, after) => {
      if (label.trim() === KLEAR_SVC_HERO_CTA) return match;
      return `${before}${KLEAR_SVC_HERO_CTA}${after}`;
    },
  );
  if (patched === hero) return mainHtml;

  return mainHtml.slice(0, heroStart) + patched + mainHtml.slice(heroEnd);
}

/** KlearData product page (/services/webflow-enterprise/). */
export function removeKlearDataSvcHeroLabel(mainHtml: string): string {
  let html = mainHtml.replace(
    /(<section class="svc-hero[^"]*"[\s\S]*?)<span class="label"[^>]*>Services<\/span>/,
    '$1',
  );
  html = html.replace(
    /(<section class="svc-hero[^"]*"[\s\S]*?)<span class="label"[^>]*>AEO Agency<\/span>/,
    '$1',
  );
  return html;
}

export function patchKlearDataSvcHeroTitle(mainHtml: string): string {
  return mainHtml.replace(
    /(<h1 class="svc-hero__title"[^>]*>)Enterprise Webflow Agency(<\/h1>)/,
    '$1Every trade document, turned into data you can file on$2',
  );
}

/** KlearHub (`/klear-hub/`, webflow-support mirror). */
export function patchKlearHubSvcHeroLabel(mainHtml: string): string {
  return mainHtml.replace(
    /(<span class="label"[^>]*>)Webflow Support &amp; Maintenance(<\/span>)/,
    '$1Operating system$2',
  );
}

const KLEAR_HUB_HERO_TITLE_FLAT = 'The software your customs operation runs on';
const KLEAR_HUB_HERO_TITLE =
  'The software<br data-astro-cid-asdozulm>your customs<br data-astro-cid-asdozulm>operation<br data-astro-cid-asdozulm>runs on';

export function patchKlearHubSvcHeroTitle(mainHtml: string): string {
  let html = mainHtml.replace(
    /(<h1 class="svc-hero__title"[^>]*>)Webflow Retainer for B2B Marketing Teams(<\/h1>)/,
    `$1${KLEAR_HUB_HERO_TITLE}$2`,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${KLEAR_HUB_HERO_TITLE_FLAT}</h1>`,
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${KLEAR_HUB_HERO_TITLE}</h1>`,
  );
  return html;
}

const FREIGHT_FORWARDERS_HERO_TITLE =
  'Automate Workflows for Customs Clearance and Port to Door moves in one Platform';

const FREIGHT_FORWARDERS_HERO_TITLE_HTML =
  'Automate Workflows for<br data-astro-cid-asdozulm>Customs Clearance and<br data-astro-cid-asdozulm>Port to Door moves<br data-astro-cid-asdozulm>in one Platform';

function hasFreightForwardersHeroContext(mainHtml: string): boolean {
  return mainHtml.includes('Automate Workflows for');
}

/** Freight Forwarders (`/freight-forwarders/`, search-ai-visibility mirror). */
export function patchFreightForwardersSvcHeroTitle(mainHtml: string): string {
  let html = mainHtml.replace(
    /(<h1 class="svc-hero__title"[^>]*>)AI Visibility Agency, Measured Monthly(<\/h1>)/,
    `$1${FREIGHT_FORWARDERS_HERO_TITLE_HTML}$2`,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${FREIGHT_FORWARDERS_HERO_TITLE}</h1>`,
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${FREIGHT_FORWARDERS_HERO_TITLE_HTML}</h1>`,
  );
  return html;
}

export function patchFreightForwardersSvcHeroCta(mainHtml: string): string {
  return patchKlearSvcHeroCta(mainHtml);
}

const FREIGHT_FORWARDERS_HERO_SUB =
  'Unlock AI-driven workflows, from document intake all the way through dray and inland trucking.';

export function patchFreightForwardersSvcHeroSub(mainHtml: string): string {
  return mainHtml.replace(
    /<p class="svc-hero__sub"[^>]*>Find out where buyers encounter your brand in search and AI answers\.[\s\S]*?<\/p>/,
    `<p class="svc-hero__sub" data-astro-cid-asdozulm>${FREIGHT_FORWARDERS_HERO_SUB}</p>`,
  );
}

const SELF_FILERS_HERO_TITLE = 'Self-File Faster With Confidence';
const SELF_FILERS_HERO_SUB =
  'Turn emails and PDFs into entry-ready data, validate instantly, and file through ABI with real-time status and audit-ready records.';

/** Self Filers: Legency astro-hero → operation-type earth svc-hero shell. */
export function replaceSelfFilersAstroHeroWithOperationSvcHero(mainHtml: string): string {
  if (!mainHtml.includes('<section class="astro-hero"')) return mainHtml;

  const sectionStart = mainHtml.indexOf('<section class="astro-hero"');
  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  return (
    mainHtml.slice(0, sectionStart) +
    klearOperationSvcHeroSection +
    mainHtml.slice(sectionStart + section.length)
  );
}

const GET_IN_TOUCH_ENQUIRY_HEADING =
  'Transform your inland transportation operations with our AI-driven solutions';
const GET_IN_TOUCH_ENQUIRY_SUMMARY =
  'Streamline shipments with digital customs clearance and seamless drayage procurement.';

/** Contact / get-in-touch enquiry intro heading. */
export function patchGetInTouchEnquiryHeading(mainHtml: string): string {
  if (!mainHtml.includes('<section class="enquiry"')) return mainHtml;

  return mainHtml.replace(
    /(<div class="enquiry__intro"[^>]*>[\s\S]*?<h1[^>]*>)Let's talk about your next stage of growth\.(<\/h1>)/,
    `$1${GET_IN_TOUCH_ENQUIRY_HEADING}$2`,
  );
}

/** Contact / get-in-touch: Saturn enquiry dither → Earth on the same dark navy palette. */
export function patchGetInTouchEnquiryEarthArt(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__art"')) return mainHtml;

  let html = mainHtml.replace(
    /data-live-dither="\/img\/enquiry-planet\.webp"/g,
    'data-live-dither="/img/klearnow/home-earth.webp" data-live-dither-theme="enq-earth"',
  );
  if (!html.includes('data-live-dither-theme="enq-earth"') && html.includes('class="enquiry__art"')) {
    html = html.replace(
      /(<div class="enquiry__art"[^>]*data-live-dither="\/img\/klearnow\/home-earth\.webp")/,
      '$1 data-live-dither-theme="enq-earth"',
    );
  }
  return html;
}

const GET_IN_TOUCH_FORM_HEADING = 'Tell us a little bit about you';

/** Privacy policy page — replace Legency prose with KlearNow.AI policy. */
export function patchPrivacyPolicyContent(mainHtml: string): string {
  if (!mainHtml.includes('class="section legal"')) return mainHtml;
  if (!mainHtml.includes('class="prose"')) return mainHtml;

  let html = mainHtml.replace(
    /<div class="prose"[^>]*>[\s\S]*?<\/div>/,
    `<div class="prose" data-astro-cid-u6ohjolg>${klearPrivacyPolicyProse}</div>`,
  );
  html = html.replace(/<p class="legalhead__updated"[^>]*>[\s\S]*?<\/p>/, '');
  return html;
}

/** Contact / get-in-touch form card heading. */
export function patchGetInTouchEnquiryFormHeading(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__form-head"')) return mainHtml;

  return mainHtml.replace(
    /(<div class="enquiry__form-head"[^>]*>[\s\S]*?<h2[^>]*>)Tell us a little about your plans\.(<\/h2>)/,
    `$1${GET_IN_TOUCH_FORM_HEADING}$2`,
  );
}

/** Contact / get-in-touch enquiry summary. */
export function patchGetInTouchEnquirySummary(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__summary"')) return mainHtml;

  return mainHtml.replace(
    /<p class="enquiry__summary"[^>]*>[\s\S]*?<\/p>/,
    `<p class="enquiry__summary" data-astro-cid-acgmji4b>${GET_IN_TOUCH_ENQUIRY_SUMMARY}</p>`,
  );
}

/** Contact / get-in-touch: drop Legency client logos + quote proof band. */
export function removeGetInTouchEnquiryProof(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__proof"')) return mainHtml;
  return removeDivBlock(mainHtml, '<div class="enquiry__proof"');
}

/** Contact / get-in-touch: drop “Prefer a conversation? Book a call”. */
export function removeGetInTouchEnquiryCall(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__call"')) return mainHtml;
  return mainHtml.replace(/<p class="enquiry__call"[^>]*>[\s\S]*?<\/p>/, '');
}

const GET_IN_TOUCH_ENQUIRY_CHANNELS: ReadonlyArray<{
  label: string;
  email: string;
  hint?: string;
}> = [
  { label: 'General', email: 'info@klearnow.com' },
  { label: 'Shipment documents', email: 'documents@klearnow.net' },
  { label: 'Careers', email: 'jobs@klearnow.com' },
  {
    label: 'PAPS',
    hint: 'US truck clearances',
    email: 'paps@klearnow.net',
  },
  {
    label: 'PARS',
    hint: 'Canada truck clearances',
    email: 'pars@klearnow.net',
  },
];

function getInTouchEnquiryChannelsHtml(): string {
  const items = GET_IN_TOUCH_ENQUIRY_CHANNELS.map(({ label, email, hint }) => {
    const meta =
      `<p class="enquiry__channel-label" data-astro-cid-acgmji4b>` +
      (hint
        ? `${label}<span class="enquiry__channel-hint" data-astro-cid-acgmji4b> · ${hint}</span>`
        : label) +
      `</p>`;
    return (
      `<div class="enquiry__channel" data-astro-cid-acgmji4b>` +
      meta +
      `<a class="enquiry__channel-email" href="mailto:${email}" data-astro-cid-acgmji4b>${email}</a>` +
      `</div>`
    );
  }).join('');
  return `<div class="enquiry__channels" data-astro-cid-acgmji4b>${items}</div>`;
}

/** Contact / get-in-touch: primary form CTA label. */
export function patchGetInTouchEnquiryContinueLabel(mainHtml: string): string {
  if (!mainHtml.includes('id="enquiry-continue"')) return mainHtml;

  return mainHtml.replace(
    /(<button[^>]*id="enquiry-continue"[^>]*>[\s\S]*?<span class="btn-bubble-arrow__content-text"[^>]*>)Continue(<\/span>)/,
    '$1Submit$2',
  );
}

/** Contact / get-in-touch: drop “Step X of 3” eyebrow. */
export function removeGetInTouchEnquiryStepCount(mainHtml: string): string {
  if (!mainHtml.includes('id="step-count"')) return mainHtml;
  return mainHtml.replace(
    /<p id="step-count" class="enquiry__eyebrow"[^>]*>[\s\S]*?<\/p>/,
    '',
  );
}

/** Contact / get-in-touch: drop step progress nav (Your details / project / budget). */
export function removeGetInTouchEnquirySteps(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__steps"')) return mainHtml;
  return mainHtml.replace(/<ol class="enquiry__steps"[^>]*>[\s\S]*?<\/ol>/, '');
}

const GET_IN_TOUCH_CONSENT_LABEL =
  'I agree to receive occasional marketing communications from KlearNow';

const GET_IN_TOUCH_INQUIRY_OPTIONS = [
  ['careers', 'Careers'],
  ['finance', 'Finance'],
  ['media', 'Media'],
  ['partnerships', 'Partnerships'],
  ['products', 'KlearNow Products'],
] as const;

const GET_IN_TOUCH_COUNTRIES = [
  'United States',
  'Canada',
  'Mexico',
  'United Kingdom',
  'Germany',
  'France',
  'Netherlands',
  'Belgium',
  'Spain',
  'Italy',
  'Switzerland',
  'Ireland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Portugal',
  'Austria',
  'Czech Republic',
  'China',
  'Hong Kong',
  'Taiwan',
  'Japan',
  'South Korea',
  'India',
  'Singapore',
  'Malaysia',
  'Thailand',
  'Vietnam',
  'Indonesia',
  'Philippines',
  'Australia',
  'New Zealand',
  'United Arab Emirates',
  'Saudi Arabia',
  'Israel',
  'Turkey',
  'South Africa',
  'Brazil',
  'Chile',
  'Colombia',
  'Argentina',
  'Other',
] as const;

function getInTouchEnquiryFieldHtml(
  id: string,
  label: string,
  control: string,
  options?: { span?: boolean; optional?: boolean },
): string {
  const spanClass = options?.span ? ' enquiry__field--span' : '';
  const optional = options?.optional
    ? '<span data-astro-cid-acgmji4b> (optional)</span>'
    : '';
  return (
    `<div class="enquiry__field${spanClass}" data-field="${id}" data-astro-cid-acgmji4b>` +
    `<label for="${id}" data-astro-cid-acgmji4b>${label}${optional}</label>` +
    control +
    `<p class="enquiry__error" id="error-${id}" data-astro-cid-acgmji4b></p>` +
    `</div>`
  );
}

function getInTouchEnquiryDetailsGridHtml(): string {
  const inquiry = getInTouchEnquiryFieldHtml(
    'inquiryAbout',
    "I'm interested to inquire about:",
    `<select id="inquiryAbout" name="inquiryAbout" required aria-describedby="error-inquiryAbout" data-astro-cid-acgmji4b>` +
      `<option value="" data-astro-cid-acgmji4b>I'm interested to inquire about:</option>` +
      GET_IN_TOUCH_INQUIRY_OPTIONS.map(
        ([value, label]) =>
          `<option value="${value}" data-astro-cid-acgmji4b>${label}</option>`,
      ).join('') +
      `</select>`,
    { span: true },
  );
  const firstName = getInTouchEnquiryFieldHtml(
    'firstName',
    'First name',
    `<input id="firstName" name="firstName" type="text" inputmode="text" autocomplete="given-name" required maxlength="80" aria-describedby="error-firstName" data-astro-cid-acgmji4b>`,
  );
  const lastName = getInTouchEnquiryFieldHtml(
    'lastName',
    'Last name',
    `<input id="lastName" name="lastName" type="text" inputmode="text" autocomplete="family-name" required maxlength="80" aria-describedby="error-lastName" data-astro-cid-acgmji4b>`,
  );
  const email = getInTouchEnquiryFieldHtml(
    'email',
    'Email',
    `<input id="email" name="email" type="email" inputmode="email" autocomplete="email" required maxlength="254" aria-describedby="error-email" data-astro-cid-acgmji4b>`,
  );
  const phone = getInTouchEnquiryFieldHtml(
    'phone',
    'Phone number',
    `<input id="phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required maxlength="40" aria-describedby="error-phone" data-astro-cid-acgmji4b>`,
  );
  const country = getInTouchEnquiryFieldHtml(
    'country',
    'Country',
    `<select id="country" name="country" required aria-describedby="error-country" data-astro-cid-acgmji4b>` +
      `<option value="" data-astro-cid-acgmji4b>Country</option>` +
      GET_IN_TOUCH_COUNTRIES.map(
        (name) => `<option value="${name}" data-astro-cid-acgmji4b>${name}</option>`,
      ).join('') +
      `</select>`,
    { span: true },
  );
  const message = getInTouchEnquiryFieldHtml(
    'message',
    'Message',
    `<textarea id="message" name="message" rows="4" maxlength="3000" aria-describedby="error-message" data-astro-cid-acgmji4b></textarea>`,
    { span: true, optional: true },
  );

  return (
    `<div class="enquiry__grid" data-astro-cid-acgmji4b>` +
    inquiry +
    firstName +
    lastName +
    email +
    phone +
    country +
    message +
    `</div>`
  );
}

/** Contact / get-in-touch: details grid → inquire, names, email, phone, country, message. */
export function insertGetInTouchEnquiryExtraDetailsFields(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__grid"')) return mainHtml;
  if (mainHtml.includes('id="firstName"') && mainHtml.includes('id="message"')) {
    return mainHtml;
  }

  const gridOpen = mainHtml.indexOf('<div class="enquiry__grid"');
  if (gridOpen === -1) return mainHtml;

  let depth = 0;
  let i = gridOpen;
  let gridCloseEnd = -1;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<div', i);
    const close = mainHtml.indexOf('</div>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 4;
      continue;
    }
    depth -= 1;
    i = close + 6;
    if (depth === 0) {
      gridCloseEnd = i;
      break;
    }
  }
  if (gridCloseEnd === -1) return mainHtml;

  return (
    mainHtml.slice(0, gridOpen) +
    getInTouchEnquiryDetailsGridHtml() +
    mainHtml.slice(gridCloseEnd)
  );
}

/** Contact / get-in-touch: marketing consent checkbox label. */
export function patchGetInTouchEnquiryConsentLabel(mainHtml: string): string {
  if (!mainHtml.includes('class="enquiry__consent"')) return mainHtml;

  return mainHtml.replace(
    /(<label class="enquiry__consent"[^>]*>[\s\S]*?<span[^>]*>)You can email me about this enquiry if I don't finish it\.(<\/span>)/,
    `$1${GET_IN_TOUCH_CONSENT_LABEL}$2`,
  );
}

/** Contact / get-in-touch: KlearNow email channels under the intro. */
export function insertGetInTouchEnquiryChannels(mainHtml: string): string {
  if (!mainHtml.includes('<section class="enquiry"')) return mainHtml;
  if (mainHtml.includes('class="enquiry__channels"')) return mainHtml;

  const introMarker = '<div class="enquiry__intro"';
  const introStart = mainHtml.indexOf(introMarker);
  if (introStart === -1) return mainHtml;

  let depth = 0;
  let i = introStart;
  let introEnd = -1;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<div', i);
    const close = mainHtml.indexOf('</div>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 4;
      continue;
    }
    depth -= 1;
    i = close + 6;
    if (depth === 0) {
      introEnd = i;
      break;
    }
  }
  if (introEnd === -1) return mainHtml;

  return (
    mainHtml.slice(0, introEnd) + getInTouchEnquiryChannelsHtml() + mainHtml.slice(introEnd)
  );
}

/** Self Filers (`/self-filers/`, astro-agency mirror). */
export function patchSelfFilersSvcHeroTitle(mainHtml: string): string {
  return mainHtml.replace(
    /(<h1 class="svc-hero__title"[^>]*>)Technical SEO Agency(<\/h1>)/,
    `$1${SELF_FILERS_HERO_TITLE}$2`,
  );
}

export function patchSelfFilersSvcHeroSub(mainHtml: string): string {
  const heroStart = mainHtml.indexOf('<section class="svc-hero"');
  if (heroStart === -1) return mainHtml;

  const hero = sliceSectionAt(mainHtml, heroStart);
  if (!hero) return mainHtml;

  const patched = hero.replace(
    /<p class="svc-hero__sub"[^>]*>[\s\S]*?<\/p>/,
    `<p class="svc-hero__sub" data-astro-cid-asdozulm>${SELF_FILERS_HERO_SUB}</p>`,
  );
  if (patched === hero) return mainHtml;

  return mainHtml.slice(0, heroStart) + patched + mainHtml.slice(heroStart + hero.length);
}

export function patchSelfFilersSvcHeroCta(mainHtml: string): string {
  return patchKlearSvcHeroCta(mainHtml);
}

/** Self Filers: drop Legency “Tell us about your Astro project” closer. */
export function removeSelfFilersAstroCloseSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-close',
    'data-astro-closer',
  );
}

/** Self Filers: drop Legency “Planning your Astro website” FAQ band. */
export function removeSelfFilersAstroFaqSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-faq',
    'Planning your Astro website',
  );
}

/** Self Filers: drop Legency “Custom applications connected to your Astro website” detail band. */
export function removeSelfFilersAstroApplicationsSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-detail section" id="applications"',
    'Custom applications connected to your Astro website',
  );
}

/** Self Filers: drop Legency “Our Astro development process” band. */
export function removeSelfFilersAstroProcessSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-process section"',
    'Our Astro development process',
  );
}

/** Self Filers: drop Legency “Astro websites your marketing team can manage” detail band. */
export function removeSelfFilersAstroWebsitesSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-detail section" id="websites"',
    'Astro websites your marketing team can manage',
  );
}

/** Self Filers: drop Legency “Astro development services for your next project” services band. */
export function removeSelfFilersAstroServicesSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-services section" id="services"',
    'Astro development services for your next project',
  );
}

/** Self Filers: drop Legency “SEO and AI visibility for Astro websites” detail band. */
export function removeSelfFilersAstroVisibilitySection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="astro-detail astro-detail--dark section" id="visibility"',
    'SEO and AI visibility for Astro websites',
  );
}

function hasSelfFilersContext(mainHtml: string): boolean {
  return mainHtml.includes(SELF_FILERS_HERO_TITLE);
}

/** Self Filers: Custom Brokers “How it works” scope band directly after svc-hero. */
export function insertSelfFilersScopeAfterHero(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  return insertKlearHowItWorksScopeAfterHero(mainHtml);
}

/** Self Filers: four-step “How it works” scope band copy. */
export function patchSelfFilersScopeHowItWorksBand(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  return patchKlearHowItWorksScopeBandWithSteps(mainHtml, SELF_FILERS_SCOPE_STEPS);
}

const SELF_FILERS_FOUNDATION_HEADING = 'Common Self-Filer Bottlenecks';

/** Self Filers: foundation band headline (Custom Brokers mirror heading). */
export function patchSelfFilersFoundationHeading(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<h2 class="foundation__heading"[^>]*>Addressing key broker challenges<\/h2>/,
    `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6 data-no-roll>${SELF_FILERS_FOUNDATION_HEADING}</h2>`,
  );
}

const SELF_FILERS_FOUNDATION_CARD_REPLACEMENTS: [string, string][] = [
  [
    '<h3 data-astro-cid-6q4o4ab6>Complex documentation</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Manual Intake &amp; Re-Keying</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>Automate intake and eliminate re-keying across emails, PDFs, and EDI.</p>',
    '<p data-astro-cid-6q4o4ab6>Automate document capture and cut copy-paste errors that slow filings and trigger rework.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>Compliance and accuracy</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Compliance Drift</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>AI validation plus a complete, searchable audit trail for every entry.</p>',
    '<p data-astro-cid-6q4o4ab6>Embed rule checks and document completeness so changes in tariffs or PGA rules don\u2019t derail clearance.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>Pre- &amp; Post-Audit Support</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Fragmented Status</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>Validates entry details before filing to reduce errors, and enables easy post-entry audits for compliance.</p>',
    '<p data-astro-cid-6q4o4ab6>See milestones, holds, and releases across ports and partners in one live dashboard instead of scattered emails.</p>',
  ],
];

/** Self Filers: three bottleneck cards (titles + bodies). */
export function patchSelfFilersFoundationCards(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(SELF_FILERS_FOUNDATION_HEADING)) return mainHtml;

  let html = mainHtml;
  for (const [from, to] of SELF_FILERS_FOUNDATION_CARD_REPLACEMENTS) {
    if (html.includes(from)) html = html.replace(from, to);
  }
  return html;
}

const SELF_FILERS_FOUNDATION_ICON_CARDS = [
  { title: 'Manual Intake &amp; Re-Keying', paths: KLEAR_ICON_MANUAL_ENTRY },
  { title: 'Compliance Drift', paths: KLEAR_ICON_VALIDATE_DOC },
  { title: 'Fragmented Status', paths: KLEAR_ICON_OPS_INSIGHT },
] as const;

/** Self Filers: foundation card icons matched to bottleneck titles. */
export function patchSelfFilersFoundationCardIcons(mainHtml: string): string {
  if (!mainHtml.includes(SELF_FILERS_FOUNDATION_HEADING)) return mainHtml;

  let html = applyFoundationCardIcons(
    mainHtml,
    (h) => hasSelfFilersContext(h) && h.includes(SELF_FILERS_FOUNDATION_HEADING),
    SELF_FILERS_FOUNDATION_ICON_CARDS,
  );
  return patchFoundationBareIconChips(html, SELF_FILERS_FOUNDATION_HEADING);
}

/** Self Filers: Freight Forwarders two-card vs band after foundation bottlenecks. */
export function insertSelfFilersVsAfterFoundation(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  return insertKlearTwoCardVsAfterFoundation(mainHtml, SELF_FILERS_FOUNDATION_HEADING);
}

const SELF_FILERS_VS_CARD1_TITLE = 'From Inbox to ABI — No Heavy IT';
const SELF_FILERS_VS_CARD1_BODY =
  'Your inbox becomes a live self-filing system. Operations, compliance, and finance work from the same data with instant alerts, standardized workflows, and exportable reports — without long integration projects.';
const SELF_FILERS_VS_CARD2_TITLE = 'ABI-Certified, Broker-Grade Controls';
const SELF_FILERS_VS_CARD2_BODY =
  'Developed with licensed customs brokers and ABI-certified in the U.S. (with licensed coverage in Canada, the Netherlands, Spain, and the U.K.), the platform validates entries, accelerates release, and maintains a complete, audit-ready record.';

function applySelfFilersVsCardCopy(mainHtml: string): string {
  let html = mainHtml;
  html = html.replace(
    '<h3 data-astro-cid-hsjbckyb>NO NEW PORTAL, NO NEW HABITS</h3>',
    `<h3 data-astro-cid-hsjbckyb>${SELF_FILERS_VS_CARD1_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-hsjbckyb>Your documents already arrive by email. Copy KlearData into the thread and it reads them where they land, so nobody has to learn a system or change how they work.</p>',
    `<p data-astro-cid-hsjbckyb>${SELF_FILERS_VS_CARD1_BODY}</p>`,
  );
  html = html.replace(
    '<h3 data-astro-cid-hsjbckyb>EVERY FIELD, BACK TO ITS SOURCE</h3>',
    `<h3 data-astro-cid-hsjbckyb>${SELF_FILERS_VS_CARD2_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-hsjbckyb>Extraction is only useful if you can prove it. Each value KlearData captures stays linked to the document it came from, so an audit question has an answer instead of a search.</p>',
    `<p data-astro-cid-hsjbckyb>${SELF_FILERS_VS_CARD2_BODY}</p>`,
  );
  return html;
}

/** Self Filers: two-card vs band copy. */
export function patchSelfFilersVsCards(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(SELF_FILERS_FOUNDATION_HEADING)) return mainHtml;
  if (!mainHtml.includes('<section class="section vs"')) return mainHtml;
  if (mainHtml.includes(SELF_FILERS_VS_CARD1_TITLE)) return mainHtml;
  if (!mainHtml.includes('NO NEW PORTAL, NO NEW HABITS')) return mainHtml;
  return applySelfFilersVsCardCopy(mainHtml);
}

/** Self Filers: vs card icons. */
export function patchSelfFilersVsIcons(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(SELF_FILERS_VS_CARD1_TITLE)) return mainHtml;

  let html = mainHtml;
  html = patchFreightForwardersVsCardIcon(
    html,
    SELF_FILERS_VS_CARD1_TITLE,
    ICON_DOC_INGESTION,
  );
  html = patchFreightForwardersVsCardIcon(
    html,
    SELF_FILERS_VS_CARD2_TITLE,
    ICON_LAYERS,
  );
  return html;
}

const SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING = 'Ideal for Self-Filing Teams Who:';
const SELF_FILERS_IDEAL_IMPORTERS_CARD1_TITLE =
  'Handle high volumes and need to scale throughput without new headcount';
const SELF_FILERS_IDEAL_IMPORTERS_CARD2_TITLE =
  'Want fewer rejects and holds through automated validation and completeness checks';
const SELF_FILERS_IDEAL_IMPORTERS_CARD3_TITLE =
  'Need one source of truth for status, exceptions, and documents—plus clean exports for BI/finance';

function buildIdealImportersDpAltSectionHtml(
  heading: string,
  card1: string,
  card2: string,
  card3: string,
): string {
  let section = freightForwardersDpAltSection;
  section = section.replace(
    `<h2 class="dp__heading" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_HEADING}</h2>`,
    `<h2 class="dp__heading" data-astro-cid-thdesxtn>${heading}</h2>`,
  );
  section = section.replace(
    new RegExp(
      `(<h2 class="dp__heading" data-astro-cid-thdesxtn>${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/h2>)<p class="dp__sub" data-astro-cid-thdesxtn>[\\s\\S]*?<\\/p>`,
    ),
    '$1',
  );
  section = section.replace(
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD1_TITLE}</h3>`,
    `<h3 data-astro-cid-thdesxtn>${card1}</h3>`,
  );
  section = section.replace(
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD2_TITLE}</h3>`,
    `<h3 data-astro-cid-thdesxtn>${card2}</h3>`,
  );
  section = section.replace(
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD3_TITLE}</h3>`,
    `<h3 data-astro-cid-thdesxtn>${card3}</h3>`,
  );
  section = section.replace(
    /(<article class="dp__card" data-astro-cid-thdesxtn>[\s\S]*?)<p data-astro-cid-thdesxtn>[\s\S]*?<\/p>/g,
    '$1',
  );
  return section;
}

/** Self Filers: ideal-importers dp--alt band after “From Inbox to ABI” vs section. */
export function insertSelfFilersIdealImportersDpAltAfterVs(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (mainHtml.includes(SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING)) return mainHtml;
  if (!mainHtml.includes(SELF_FILERS_VS_CARD1_TITLE)) return mainHtml;

  const titlePos = mainHtml.indexOf(SELF_FILERS_VS_CARD1_TITLE);
  const vsStart = mainHtml.lastIndexOf('<section class="section vs"', titlePos);
  if (vsStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, vsStart);
  if (insertAt === -1) return mainHtml;

  return (
    mainHtml.slice(0, insertAt) +
    buildIdealImportersDpAltSectionHtml(
      SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING,
      SELF_FILERS_IDEAL_IMPORTERS_CARD1_TITLE,
      SELF_FILERS_IDEAL_IMPORTERS_CARD2_TITLE,
      SELF_FILERS_IDEAL_IMPORTERS_CARD3_TITLE,
    ) +
    mainHtml.slice(insertAt)
  );
}

let klearOperationRegressSectionCache: string | null = null;

/** Patched “Why Being Prepared Matters” regress band (technical-seo mirror). */
function getKlearOperationRegressSection(): string {
  if (klearOperationRegressSectionCache) return klearOperationRegressSectionCache;

  let html = technicalSeoMirror.mainHtml as string;
  html = removeKlearOperationRegressLabel(html);
  html = removeKlearOperationRegressFoot(html);
  html = removeKlearOperationRegressThirdPartyCard(html);
  html = patchKlearOperationRegressHeading(html);
  html = patchKlearOperationRegressCard1Title(html);
  html = patchKlearOperationRegressCard1Body(html);
  html = patchKlearOperationRegressCard2Title(html);
  html = patchKlearOperationRegressCard2Body(html);
  html = patchKlearOperationRegressCard3Title(html);
  html = patchKlearOperationRegressCard3Body(html);

  const start = html.indexOf('<section class="section regress"');
  const section = start === -1 ? '' : (sliceSectionAt(html, start) ?? '');
  klearOperationRegressSectionCache = section;
  return section;
}

const SELF_FILERS_LEAKS_HEADING = 'Self-Filers are facing more and more challenges';
const SELF_FILERS_LEAKS_STEP1_TITLE = 'Data chaos is slowing you down';
const SELF_FILERS_LEAKS_STEP1_BODY =
  'emails, PDFs, and EDI streams need a single, trusted view.';
const SELF_FILERS_LEAKS_STEP2_TITLE = 'Reporting is stealing time';
const SELF_FILERS_LEAKS_STEP2_BODY =
  'give ops/finance self-serve dashboards and cut spreadsheet work.';
const SELF_FILERS_LEAKS_STEP3_TITLE = 'IT bandwidth is limited';
const SELF_FILERS_LEAKS_STEP3_BODY =
  'start fast with zero-code capture and simple connectors.';

function selfFilersLeaksHeadHtml(): string {
  return (
    `<div class="leaks__head" data-astro-cid-kn3eqkos>` +
    `<h2 class="leaks__heading" data-no-roll data-astro-cid-kn3eqkos>${SELF_FILERS_LEAKS_HEADING}</h2>` +
    `</div>`
  );
}

/** Self Filers: challenges leaks accordion after ideal-teams dp--alt (before regress). */
export function insertSelfFilersLeaksAfterIdealImporters(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('class="section leaks"')) return mainHtml;
  if (!mainHtml.includes(SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING)) return mainHtml;

  const headingPos = mainHtml.indexOf(SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING);
  const sectionStart = mainHtml.lastIndexOf('<section', headingPos);
  if (sectionStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, sectionStart);
  if (insertAt === -1) return mainHtml;

  let html = mainHtml.slice(0, insertAt) + klearDataLeaksSection + mainHtml.slice(insertAt);
  html = html.replace(
    /<div class="leaks__head" data-astro-cid-kn3eqkos>[\s\S]*?<\/div>/,
    selfFilersLeaksHeadHtml(),
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'Data capture',
    SELF_FILERS_LEAKS_STEP1_TITLE,
    'Ingest emails, PDFs, EDI feeds, and portal exports to collect every field required for an entry.',
    SELF_FILERS_LEAKS_STEP1_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'Multi-Agent extraction',
    SELF_FILERS_LEAKS_STEP2_TITLE,
    'Document training, and agentic feedback loops.',
    SELF_FILERS_LEAKS_STEP2_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'LCB knowledge built in',
    SELF_FILERS_LEAKS_STEP3_TITLE,
    'Access to preprocessing exception management constructed by licensed brokers.',
    SELF_FILERS_LEAKS_STEP3_BODY,
  );
  html = removeLeaksItemByNum(html, '06');
  html = removeLeaksItemByNum(html, '05');
  html = removeLeaksItemByNum(html, '04');
  return html;
}

const SELF_FILERS_REGRESS_HEADING = 'Why Being Prepared Matters';
const SELF_FILERS_REGRESS_CARD1_TITLE = 'First-Time-Right Filings';
const SELF_FILERS_REGRESS_CARD1_BODY =
  'reduce rework and rejects with automated checks and completeness validation.';
const SELF_FILERS_REGRESS_CARD2_TITLE = 'Duty &amp; Bond Forecasting';
const SELF_FILERS_REGRESS_CARD2_BODY =
  'project cash needs weeks ahead using live entry data.';
const SELF_FILERS_REGRESS_CARD3_TITLE = 'Audit-Ready on Day One';
const SELF_FILERS_REGRESS_CARD3_BODY =
  'every document and data point is searchable by entry, PO, SKU, container, or date.';

/** Self Filers: data-advantage regress band after ideal-teams (and leaks when present). */
export function insertSelfFilersRegressAfterIdealImporters(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('class="section regress"')) return mainHtml;
  if (!mainHtml.includes(SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING)) return mainHtml;

  let regress = getKlearOperationRegressSection();
  if (!regress) return mainHtml;

  regress = regress.replace(
    /<h2 class="regress__heading"[^>]*>[\s\S]*?<\/h2>/,
    `<h2 class="regress__heading" data-astro-cid-diqpbc75 data-no-roll>${SELF_FILERS_REGRESS_HEADING}</h2>`,
  );
  regress = regress.replace(
    /<div class="regress__grid"[^>]*>[\s\S]*?<\/div>/,
    `<div class="regress__grid" data-astro-cid-diqpbc75>` +
      `<article class="regress__card" data-astro-cid-diqpbc75>` +
      `<h3 data-astro-cid-diqpbc75>${SELF_FILERS_REGRESS_CARD1_TITLE}</h3>` +
      `<p data-astro-cid-diqpbc75>${SELF_FILERS_REGRESS_CARD1_BODY}</p>` +
      `</article>` +
      `<article class="regress__card" data-astro-cid-diqpbc75>` +
      `<h3 data-astro-cid-diqpbc75>${SELF_FILERS_REGRESS_CARD2_TITLE}</h3>` +
      `<p data-astro-cid-diqpbc75>${SELF_FILERS_REGRESS_CARD2_BODY}</p>` +
      `</article>` +
      `<article class="regress__card" data-astro-cid-diqpbc75>` +
      `<h3 data-astro-cid-diqpbc75>${SELF_FILERS_REGRESS_CARD3_TITLE}</h3>` +
      `<p data-astro-cid-diqpbc75>${SELF_FILERS_REGRESS_CARD3_BODY}</p>` +
      `</article>` +
      `</div>`,
  );

  const anchor =
    mainHtml.includes('class="section leaks"') && mainHtml.includes(SELF_FILERS_LEAKS_HEADING)
      ? mainHtml.indexOf(SELF_FILERS_LEAKS_HEADING)
      : mainHtml.indexOf(SELF_FILERS_IDEAL_IMPORTERS_DP_ALT_HEADING);
  const sectionStart = mainHtml.lastIndexOf('<section', anchor);
  if (sectionStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, sectionStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + regress + mainHtml.slice(insertAt);
}

/** Self Filers: KlearData “What it does” / #home-services before post-entry caseband. */
export function insertSelfFilersHomeServicesBeforeCaseband(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('id="home-services"')) return mainHtml;

  const casebandStart = mainHtml.indexOf('<section class="caseband"');
  if (casebandStart === -1) return mainHtml;

  const caseband = sliceSectionAt(mainHtml, casebandStart);
  if (!caseband?.includes('Post Entry Audit Finds')) return mainHtml;

  return mainHtml.slice(0, casebandStart) + klearDataEntryLineSection + mainHtml.slice(casebandStart);
}

function patchSelfFilersHomeServicesSection(
  mainHtml: string,
  patcher: (sectionHtml: string) => string,
): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  const servicesId = mainHtml.indexOf('id="home-services"');
  const sectionStart = mainHtml.lastIndexOf('<section', servicesId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = patcher(section);
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const SELF_FILERS_HOME_SERVICES_DROP_TITLES = [
  'Ready-to-file output',
  'Rules that run on arrival',
  'Audits always on',
] as const;

/** Self Filers `#home-services` — keep Ingest / Extract / Comply row only. */
export function removeSelfFilersHomeServicesBottomRow(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) => {
    let patched = section;
    for (const title of SELF_FILERS_HOME_SERVICES_DROP_TITLES) {
      patched = removeServiceChoiceArticlesContaining(patched, title);
    }
    return patched;
  });
}

const SELF_FILERS_HOME_SERVICES_INTRO =
  'KlearData sits at the front of the operation. It reads, classifies, and validates every document before anyone touches an entry.';

/** Self Filers `#home-services` — drop intro under “From inbox to filing-ready”. */
export function removeSelfFilersHomeServicesIntro(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) => {
    const headingBlock = `<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>From inbox to filing-ready</h2><p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_INTRO}</p>`;
    if (!section.includes(headingBlock)) return section;
    return section.replace(
      headingBlock,
      `<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>From inbox to filing-ready</h2>`,
    );
  });
}

/** Self Filers `#home-services` — drop “What it does” eyebrow. */
export function removeSelfFilersHomeServicesLabel(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace('<span class="label" data-astro-cid-jg2u4s4c>What it does</span>', ''),
  );
}

const SELF_FILERS_HOME_SERVICES_TITLE = 'Why Being Prepared Matters';

/** Self Filers `#home-services` section heading (KlearData keeps “From inbox to filing-ready”). */
export function patchSelfFilersHomeServicesTitle(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace(
      /<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>[\s\S]*?<\/h2>/,
      `<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_TITLE}</h2>`,
    ),
  );
}

const SELF_FILERS_HOME_SERVICES_CARD1_TITLE = 'First-Time-Right Filings';
const SELF_FILERS_HOME_SERVICES_CARD1_BODY =
  'reduce rework and rejects with automated checks and completeness validation.';

/** Self Filers `#home-services` card 1 title (KlearData keeps “Auto-read documents”). */
export function patchSelfFilersHomeServicesCard1Title(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace(
      /(<span data-astro-cid-jg2u4s4c>Ingest<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Auto-read documents(<\/h3>)/,
      `$1${SELF_FILERS_HOME_SERVICES_CARD1_TITLE}$2`,
    ),
  );
}

/** Self Filers `#home-services` card 1 body (KlearData keeps no-uploads copy). */
export function patchSelfFilersHomeServicesCard1Body(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace(
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD1_TITLE}</h3><p data-astro-cid-jg2u4s4c>No uploads, no re-keying, no integration to get started.</p>`,
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD1_TITLE}</h3><p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD1_BODY}</p>`,
    ),
  );
}

const SELF_FILERS_HOME_SERVICES_CARD2_TITLE = 'Duty & Bond Forecasting';
const SELF_FILERS_HOME_SERVICES_CARD2_BODY =
  'project cash needs weeks ahead using live entry data.';

/** Self Filers `#home-services` card 2 title (KlearData keeps “Accurate data capture”). */
export function patchSelfFilersHomeServicesCard2Title(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace(
      /(<span data-astro-cid-jg2u4s4c>Extract<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Accurate data capture(<\/h3>)/,
      `$1${SELF_FILERS_HOME_SERVICES_CARD2_TITLE}$2`,
    ),
  );
}

/** Self Filers `#home-services` card 2 body (KlearData keeps 98% accuracy copy). */
export function patchSelfFilersHomeServicesCard2Body(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace(
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD2_TITLE}</h3><p data-astro-cid-jg2u4s4c>Get it right the first time, over 98% accurate document determination.</p>`,
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD2_TITLE}</h3><p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD2_BODY}</p>`,
    ),
  );
}

const SELF_FILERS_HOME_SERVICES_CARD3_TITLE = 'Audit-Ready on Day One';
const SELF_FILERS_HOME_SERVICES_CARD3_BODY =
  'every document and data point is searchable by entry, PO, SKU, container, or date.';
const SELF_FILERS_HOME_SERVICES_CARD3_SURFACES_BODY =
  'Surfaces Sec 232, Sec 301, and USMCA implications for review before you file.';

/** Self Filers `#home-services` card 3 title (KlearData keeps “Built-in tariff rules”). */
export function patchSelfFilersHomeServicesCard3Title(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) => {
    let patched = section.replace(
      /(<span data-astro-cid-jg2u4s4c>Comply<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)(?:Built-in tariff rules|Duty & Bond Forecasting)(<\/h3>)/,
      `$1${SELF_FILERS_HOME_SERVICES_CARD3_TITLE}$2`,
    );
    if (patched !== section) return patched;

    return section.replace(
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD2_TITLE}</h3><p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD3_BODY}</p>`,
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD3_TITLE}</h3><p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD3_BODY}</p>`,
    );
  });
}

/** Self Filers `#home-services` card 3 body (KlearData keeps Sec 232 / 301 copy). */
export function patchSelfFilersHomeServicesCard3Body(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) => {
    const surfacesP = `<p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD3_SURFACES_BODY}</p>`;
    if (!section.includes(surfacesP)) return section;
    return section.replace(
      surfacesP,
      `<p data-astro-cid-jg2u4s4c>${SELF_FILERS_HOME_SERVICES_CARD3_BODY}</p>`,
    );
  });
}

/** Self Filers `#home-services` — drop Ingest / Extract / Comply eyebrows; keep icons. */
export function removeSelfFilersHomeServicesCardLabels(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) =>
    section.replace(
      /<span class="service-choice__top" data-astro-cid-jg2u4s4c><span data-astro-cid-jg2u4s4c>[\s\S]*?<\/span><\/span>/g,
      '',
    ),
  );
}

const SELF_FILERS_HOME_SERVICES_FOUNDATION_ICONHEAD =
  /<div class="service-choice__iconhead" data-astro-cid-jg2u4s4c>\s*(<span class="icon-chip[^"]*"[^>]*style=")--icon-chip-size:22px([^"]*"[^>]*>[\s\S]*?<\/span>)\s*<\/div>\s*<hr class="service-choice__divider"[^>]*>/g;

/** Self Filers `#home-services` → foundation card grid (matches “Common Self-Filer Bottlenecks”). */
export function restructureSelfFilersHomeServicesAsFoundationCards(mainHtml: string): string {
  return patchSelfFilersHomeServicesSection(mainHtml, (section) => {
    const alreadyFoundation =
      section.includes('foundation__grid') &&
      section.includes('class="found-card"') &&
      section.includes('data-astro-cid-6q4o4ab6">');

    if (alreadyFoundation) {
      return section;
    }

    let s = section.includes('class="section foundation"')
      ? section
      : section.replace('class="astro-services section"', 'class="section foundation"');

    if (s.includes('class="service-choices"') || s.includes('class="service-choice"')) {
      s = s.replace(
        /<div class="section-heading" data-astro-cid-jg2u4s4c>\s*<h2/,
        '<div class="foundation__head" data-astro-cid-6q4o4ab6><div data-astro-cid-6q4o4ab6><h2 class="foundation__heading"',
      );

      s = s.replace(/<\/h2>\s*<\/div>\s*<div class="service-choices"/, '</h2></div></div><div class="foundation__grid"');

      s = s
        .replace(/class="service-choices"/g, 'class="foundation__grid"')
        .replace(/<article class="service-choice"/g, '<article class="found-card"')
        .replace(SELF_FILERS_HOME_SERVICES_FOUNDATION_ICONHEAD, '$1--icon-chip-size:48px$2')
        .replace(/<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>/g, '<h3 data-astro-cid-6q4o4ab6>');
    }

    // Legency astro-agency CSS targets div[data-astro-cid-jg2u4s4c] with display:flex / 10px type — use foundation scope.
    s = s
      .replace(
        /<section class="section foundation" id="home-services"([^>]*)data-astro-cid-jg2u4s4c/g,
        '<section class="section foundation" id="home-services"$1data-astro-cid-6q4o4ab6',
      )
      .replace(
        /<div class="container" data-astro-cid-jg2u4s4c>/g,
        '<div class="container" data-astro-cid-6q4o4ab6>',
      )
      .replace(
        /<div class="foundation__grid" data-astro-cid-jg2u4s4c>/g,
        '<div class="foundation__grid" data-astro-cid-6q4o4ab6>',
      )
      .replace(/<article class="found-card" data-astro-cid-jg2u4s4c>/g, '<article class="found-card" data-astro-cid-6q4o4ab6>')
      .replace(
        /<h2 class="foundation__heading"([^>]*)data-astro-cid-jg2u4s4c/g,
        '<h2 class="foundation__heading"$1data-astro-cid-6q4o4ab6',
      )
      .replace(/<p data-astro-cid-jg2u4s4c>/g, '<p data-astro-cid-6q4o4ab6>');

    s = s.replace(
      /<span class="icon-chip icon-chip--bare" style="--icon-chip-size:48px" aria-hidden="true">/g,
      '<span class="icon-chip icon-chip--bare" style="--icon-chip-size:48px" aria-hidden="true" data-astro-cid-ccg5yoga>',
    );

    return s;
  });
}

/** Self Filers: drop “Efficiency and cost reduction” foundation card (3-up grid). */
export function removeSelfFilersFoundationEfficiencyCard(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(CUSTOM_BROKERS_FOUNDATION_HEADING)) return mainHtml;

  const titleRe = /<h3[^>]*>Efficiency and cost reduction<\/h3>/;
  const titleMatch = titleRe.exec(mainHtml);
  if (!titleMatch) return mainHtml;

  const titleIdx = titleMatch.index;
  const articleStart = mainHtml.lastIndexOf('<article class="found-card"', titleIdx);
  if (articleStart === -1) return mainHtml;

  const articleEnd = mainHtml.indexOf('</article>', titleIdx);
  if (articleEnd === -1) return mainHtml;

  let removeEnd = articleEnd + '</article>'.length;
  if (mainHtml[removeEnd] === '\n') removeEnd += 1;

  return mainHtml.slice(0, articleStart) + mainHtml.slice(removeEnd);
}

/** Self Filers: Custom Brokers foundation band after hero (and scope when present). */
export function insertSelfFilersFoundationAfterHero(mainHtml: string): string {
  if (!hasSelfFilersContext(mainHtml)) return mainHtml;
  if (mainHtml.includes(CUSTOM_BROKERS_FOUNDATION_HEADING)) return mainHtml;

  const foundation = getCustomBrokersFoundationSection();
  if (!foundation) return mainHtml;

  const heroStart = mainHtml.indexOf('<section class="svc-hero');
  if (heroStart === -1) return mainHtml;

  const scopeStart = mainHtml.indexOf('<section class="section scope"');
  let insertAt = -1;
  if (scopeStart !== -1 && scopeStart > heroStart) {
    insertAt = indexOfSectionEnd(mainHtml, scopeStart);
  } else {
    insertAt = indexOfSectionEnd(mainHtml, heroStart);
  }
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + foundation + mainHtml.slice(insertAt);
}

/** Self Filers: strip Legency mark / dither poster assets from remaining Astro bands. */
export function patchSelfFilersLegencyBrandAssets(mainHtml: string): string {
  return mainHtml
    .replace(/\/img\/marks\/legency\.svg/g, '/img/klearnow-mark.svg')
    .replace(/<img class="astro-dither-logo__fallback"[^>]*>/g, '')
    .replace(
      /<canvas class="astro-close__dither"[^>]*><\/canvas>/g,
      '',
    );
}

const SELF_FILERS_KLEAR_DITHER_LOGO = `<div class="astro-dither-logo astro-dither-logo--klear" aria-hidden="true" data-astro-cid-favbfrhj><img class="astro-dither-logo__brand" src="/img/klearnow-mark.svg" alt="" width="190" height="109" data-astro-cid-favbfrhj></div>`;

/** Self Filers: Legency dither poster → static KlearNow mark (no AstroDitherLogo script on page). */
export function patchSelfFilersAstroDitherLogos(mainHtml: string): string {
  return mainHtml.replace(
    /<div class="astro-dither-logo" data-astro-dither-logo[^>]*>[\s\S]*?<\/div>/g,
    SELF_FILERS_KLEAR_DITHER_LOGO,
  );
}

/** Freight Forwarders: drop Legency “What does an AI visibility agency do?” page-brief. */
export function removeFreightForwardersAiVisibilityBrief(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="page-brief"',
    'What does an AI visibility agency do?',
  );
}

/** Freight Forwarders: drop Legency “Working alongside Webflow AEO” page-brief. */
export function removeFreightForwardersWebflowAeoBrief(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="page-brief" id="webflow-aeo"',
    'Working alongside Webflow AEO',
  );
}

/** Freight Forwarders: drop Legency “Why Rankings Alone No Longer Fill the Pipeline” evo block. */
export function removeFreightForwardersEvoSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section evo"',
    'Why Rankings Alone No Longer Fill the Pipeline',
  );
}

/** Freight Forwarders: drop Legency “Two Surfaces” dp block (search vs answer engines). */
export function removeFreightForwardersTwoSurfacesDpSection(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  return removeSectionContaining(
    mainHtml,
    '<section class="section dp"',
    'Your Buyers Now Search in Two Places at Once',
  );
}

/** Operation TYpe pages: drop shared closing “Where it fits” dp (KlearData / KlearHub cards). */
export function removeKlearOperationClosingDpSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section dp"',
    'File it yourself, or hand it off',
  );
}

/** Operation TYpe pages: drop Legency “Technical SEO Audit” weights band. */
export function removeKlearOperationAuditSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section audit"',
    'Findings Are Ordered by What They Cost You',
  );
}

/** Operation TYpe pages (Trade Compliance mirror): drop Legency SEO “What It Moves” proof band. */
export function removeKlearOperationProofSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section proof"',
    'Google Clicks Up 90% in Four Months on One Site',
  );
}

/** Operation TYpe pages (Trade Compliance mirror): drop Legency “Crawl Waste” band. */
export function removeKlearOperationCrawlSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section crawl"',
    'Most Estates Spend Their Crawl on Nothing',
  );
}

/** @deprecated Use {@link removeKlearOperationClosingDpSection}. */
export const removeFreightForwardersClosingDpSection = removeKlearOperationClosingDpSection;

/** Freight Forwarders: KlearData six-step leaks band before post-entry case study. */
export function insertFreightForwardersLeaksBeforeCaseband(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('class="section leaks"')) return mainHtml;

  const casebandStart = mainHtml.indexOf('<section class="caseband"');
  if (casebandStart === -1) return mainHtml;

  return mainHtml.slice(0, casebandStart) + klearDataLeaksSection + mainHtml.slice(casebandStart);
}

/** Freight Forwarders: audience band before leaks (insert before caseband; leaks follows). */
export function insertFreightForwardersHomeServicesRepeatBeforeLeaks(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const casebandStart = mainHtml.indexOf('<section class="caseband"');
  if (casebandStart === -1) return mainHtml;

  return (
    mainHtml.slice(0, casebandStart) +
    managedTradeHomeServicesRepeatSection +
    mainHtml.slice(casebandStart)
  );
}

const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_TITLE = 'Ideal users and usage scenarios';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_SUB =
  'This platform is ideal for inland transport companies of all sizes that are looking to improve their operational efficiency and customer service. It is particularly beneficial for those who';

/** Freight Forwarders: audience band heading (not Managed Trade repeat title). */
export function patchFreightForwardersHomeServicesRepeatTitle(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="services-title-repeat"')) return mainHtml;

  return mainHtml.replace(
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE}</h2>`,
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_TITLE}</h2>`,
  );
}

const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_SUB_LEGACY = [
  'Teams that would rather own the outcome than the process',
  'This platform is ideal for inland transport companies of all sizes that are looking to improve their operational efficiency and customer service. It is particularly beneficial for those who:',
] as const;

/** Freight Forwarders: audience band subheading under #services-title-repeat. */
export function patchFreightForwardersHomeServicesRepeatSub(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_TITLE)) return mainHtml;

  const pHtml = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_SUB}</p>`;
  if (mainHtml.includes(pHtml)) return mainHtml;

  let html = mainHtml;
  for (const legacy of FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_SUB_LEGACY) {
    const legacyP = `<p data-astro-cid-jg2u4s4c>${legacy}</p>`;
    if (html.includes(legacyP)) {
      return html.replace(legacyP, pHtml);
    }
  }

  return html.replace(
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_TITLE}</h2>`,
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_TITLE}</h2>${pHtml}`,
  );
}

const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_TITLE = 'Need to manage';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_BODY =
  'high volumes of container movements efficiently.';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_TITLE = 'Are looking';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_BODY =
  'to reduce operational costs and increase profitability.';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_TITLE = 'Want to enhance';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_BODY =
  'service delivery through better communication and real-time updates.';

/** Freight Forwarders: audience band three cards (not Managed Trade repeat copy). */
export function patchFreightForwardersHomeServicesRepeatCards(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;
  if (
    mainHtml.includes(FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_TITLE) &&
    !mainHtml.includes('Importers of Record')
  ) {
    return mainHtml;
  }
  if (!mainHtml.includes('Importers of Record')) return mainHtml;

  let html = mainHtml;
  html = html.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Importers of Record</h3>',
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-jg2u4s4c>Customs is not your core operation and you have no interest in making it one. We run it, you keep the visibility and the accountability trail.</p>',
    `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_BODY}</p>`,
  );
  html = html.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Trade Compliance Leaders</h3>',
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-jg2u4s4c>You carry the exposure when an entry clears wrong. A licensed broker of record is accountable for every filing, and you can see all of it.</p>',
    `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_BODY}</p>`,
  );
  html = html.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Teams scaling into new countries</h3>',
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-jg2u4s4c>You are moving into markets faster than you can hire. KlearNow already holds the licences in five of them.</p>',
    `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_BODY}</p>`,
  );
  return html;
}

/** Freight Forwarders: audience band icons match inland transport copy. */
export function patchFreightForwardersHomeServicesRepeatCardIcons(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_TITLE)) return mainHtml;

  let html = mainHtml;
  html = patchHubRepeatCardIconByTitle(
    html,
    FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_TITLE,
    ICON_DRAYAGE,
  );
  html = patchHubRepeatCardIconByTitle(
    html,
    FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_TITLE,
    ICON_TARIFF_CHART,
  );
  html = patchHubRepeatCardIconByTitle(
    html,
    FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_TITLE,
    ICON_MESSAGE,
  );
  return html;
}

const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID = 'home-services-repeat-2';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID = 'services-title-repeat-2';
const FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE = 'When to use KlearData';

/** Freight Forwarders: drop duplicate `#home-services-repeat-2` band (KlearData story lives in dp--alt). */
export function removeFreightForwardersHomeServicesRepeat2Section(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  const marker = `id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`;
  if (!mainHtml.includes(marker)) return mainHtml;

  const idPos = mainHtml.indexOf(marker);
  const sectionStart = mainHtml.lastIndexOf('<section', idPos);
  if (sectionStart === -1) return mainHtml;

  const end = indexOfSectionEnd(mainHtml, sectionStart);
  if (end === -1) return mainHtml;

  return mainHtml.slice(0, sectionStart) + mainHtml.slice(end);
}

/** Freight Forwarders: duplicate audience band immediately below the first (copy TBD). */
export function duplicateFreightForwardersHomeServicesRepeatAfterFirst(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;
  if (mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const copy = section
    .replace(/id="home-services-repeat"/g, `id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)
    .replace(/id="services-title-repeat"/g, `id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}"`)
    .replace(
      'aria-labelledby="services-title-repeat"',
      `aria-labelledby="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}"`,
    );

  const insertAt = indexOfSectionEnd(mainHtml, sectionStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + copy + mainHtml.slice(insertAt);
}

/** Freight Forwarders: second audience band heading (not band 1). */
export function patchFreightForwardersHomeServicesRepeat2Title(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}"`)) return mainHtml;

  const target = `<h2 data-no-roll id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE}</h2>`;
  if (mainHtml.includes(target)) return mainHtml;

  const from = `<h2 data-no-roll id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_TITLE}</h2>`;
  if (!mainHtml.includes(from)) return mainHtml;

  return mainHtml.replace(from, target);
}

/** Freight Forwarders: second audience band intro (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Sub(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}"`)) return mainHtml;

  const anchor = `<h2 data-no-roll id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE_ID}" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_TITLE}</h2>`;
  const targetP = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_FOOT}</p>`;
  const from = anchor + `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_SUB}</p>`;
  const to = anchor + targetP;

  if (mainHtml.includes(to)) return mainHtml;
  if (!mainHtml.includes(from)) return mainHtml;

  return mainHtml.replace(from, to);
}

/** Freight Forwarders: second audience band card 1 title (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Card1Title(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_TITLE}</h3>`;
  const to = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_CARD1_TITLE}</h3>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

/** Freight Forwarders: second audience band card 1 body (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Card1Body(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD1_BODY}</p>`;
  const to = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_CARD1_BODY}</p>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

/** Freight Forwarders: second audience band card 2 title (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Card2Title(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_TITLE}</h3>`;
  const to = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_CARD2_TITLE}</h3>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

/** Freight Forwarders: second audience band card 2 body (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Card2Body(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD2_BODY}</p>`;
  const to = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_CARD2_BODY}</p>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

/** Freight Forwarders: second audience band card 3 title (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Card3Title(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_TITLE}</h3>`;
  const to = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_CARD3_TITLE}</h3>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

/** Freight Forwarders: second audience band card 3 body (scoped to #home-services-repeat-2). */
export function patchFreightForwardersHomeServicesRepeat2Card3Body(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_HOME_SERVICES_REPEAT_CARD3_BODY}</p>`;
  const to = `<p data-astro-cid-jg2u4s4c>${FREIGHT_FORWARDERS_DP_ALT_CARD3_BODY}</p>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

const FREIGHT_FORWARDERS_LEAKS_HEADING = 'When to Use KlearHub';
const FREIGHT_FORWARDERS_LEAKS_STEP1_TITLE = 'Clearance Delays Are Costing You';
const FREIGHT_FORWARDERS_LEAKS_STEP1_BODY =
  'Holds, re-keys, and surprise exams drive demurrage; automated validation catches errors before they snowball.';
const FREIGHT_FORWARDERS_LEAKS_STEP2_TITLE = 'Compliance Risk Keeps Growing';
const FREIGHT_FORWARDERS_LEAKS_STEP2_BODY =
  'New tariffs, PGA rules, and audit requests demand AI-checked filings and a searchable document vault.';
const FREIGHT_FORWARDERS_LEAKS_STEP3_TITLE = 'Duty &amp; Bond Forecasts Matter';
const FREIGHT_FORWARDERS_LEAKS_STEP3_BODY =
  'Finance needs forward visibility into cash-flow; live entry powers accurate projections.';
const FREIGHT_FORWARDERS_LEAKS_STEP4_TITLE = 'You Need Port-to-Door Capacity';
const FREIGHT_FORWARDERS_LEAKS_STEP5_TITLE = 'A Need to Diversify Brokers';
const FREIGHT_FORWARDERS_LEAKS_STEP5_BODY =
  'Including a technology enabled licensed customs brokers ensures every entry files on time, even when volumes spike on short notice.';

function hasFreightForwardersLeaksContext(mainHtml: string): boolean {
  return (
    hasFreightForwardersHeroContext(mainHtml) && mainHtml.includes('class="section leaks"')
  );
}

function freightForwardersLeaksHeadHtml(): string {
  return (
    `<div class="leaks__head" data-astro-cid-kn3eqkos>` +
    `<h2 class="leaks__heading" data-no-roll data-astro-cid-kn3eqkos>${FREIGHT_FORWARDERS_LEAKS_HEADING}</h2>` +
    `</div>`
  );
}

/** Freight Forwarders leaks — section intro (replaces KlearData filing-ready copy). */
export function patchFreightForwardersLeaksHead(mainHtml: string): string {
  if (!hasFreightForwardersLeaksContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<div class="leaks__head" data-astro-cid-kn3eqkos>[\s\S]*?<\/div>/,
    freightForwardersLeaksHeadHtml(),
  );
}

function patchFreightForwardersLeaksStep(
  html: string,
  fromTitle: string,
  toTitle: string,
  fromBody: string,
  toBody: string,
): string {
  let out = html.replace(
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${fromTitle}</span>`,
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${toTitle}</span>`,
  );
  out = out.replace(`<p data-astro-cid-kn3eqkos>${fromBody}</p>`, `<p data-astro-cid-kn3eqkos>${toBody}</p>`);
  return out;
}

function patchFreightForwardersLeaksStepsOnBand(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_LEAKS_HEADING)) return mainHtml;

  let html = mainHtml;
  html = patchFreightForwardersLeaksStep(
    html,
    'Data capture',
    FREIGHT_FORWARDERS_LEAKS_STEP1_TITLE,
    'Ingest emails, PDFs, EDI feeds, and portal exports to collect every field required for an entry.',
    FREIGHT_FORWARDERS_LEAKS_STEP1_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'Multi-Agent extraction',
    FREIGHT_FORWARDERS_LEAKS_STEP2_TITLE,
    'Document training, and agentic feedback loops.',
    FREIGHT_FORWARDERS_LEAKS_STEP2_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'LCB knowledge built in',
    FREIGHT_FORWARDERS_LEAKS_STEP3_TITLE,
    'Access to preprocessing exception management constructed by licensed brokers.',
    FREIGHT_FORWARDERS_LEAKS_STEP3_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'Integrate your rules',
    FREIGHT_FORWARDERS_LEAKS_STEP4_TITLE,
    'SOP business rules, audit rules, components set up by agentic agents.',
    FREIGHT_FORWARDERS_FOUNDATION_CARD4_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'File Ready Rules',
    FREIGHT_FORWARDERS_LEAKS_STEP5_TITLE,
    'Filing-ready output, inbound &amp; outbound · data sharing included.',
    FREIGHT_FORWARDERS_LEAKS_STEP5_BODY,
  );
  return html;
}

function removeLeaksItemByNum(mainHtml: string, num: string): string {
  return mainHtml.replace(
    new RegExp(
      `<li class="leaks__item" data-astro-cid-kn3eqkos><span class="leaks__num" data-astro-cid-kn3eqkos>${num}</span>[\\s\\S]*?</li>`,
      'g',
    ),
    '',
  );
}

function removeFreightForwardersLeaksStepSix(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_LEAKS_HEADING)) return mainHtml;
  return removeLeaksItemByNum(mainHtml, '06');
}

/** Freight Forwarders leaks — four workflow steps (aligned with foundation cards). */
export function patchFreightForwardersLeaksSteps(mainHtml: string): string {
  if (!hasFreightForwardersLeaksContext(mainHtml)) return mainHtml;
  return patchFreightForwardersLeaksStepsOnBand(mainHtml);
}

/** Freight Forwarders leaks — drop step 06 (five-step list). */
export function removeFreightForwardersLeaksExtraSteps(mainHtml: string): string {
  if (!hasFreightForwardersLeaksContext(mainHtml)) return mainHtml;
  return removeFreightForwardersLeaksStepSix(mainHtml);
}

const TRADE_COMPLIANCE_LEAKS_STEP1_TITLE = 'Holds, re-keys, and demurrage are rising';
const TRADE_COMPLIANCE_LEAKS_STEP1_BODY =
  'Catch errors with automated validation and release faster.';
const TRADE_COMPLIANCE_LEAKS_STEP2_TITLE = 'Finance needs a forward view of duties and bonds';
const TRADE_COMPLIANCE_LEAKS_STEP2_BODY =
  'Forecast cash outlays and bond sufficiency from live entry data.';
const TRADE_COMPLIANCE_LEAKS_STEP3_TITLE = 'Port-to-door transparency is required';
const TRADE_COMPLIANCE_LEAKS_STEP3_BODY =
  'Track dray and inland milestones on the same timeline as customs release.';

function hasTradeComplianceLeaksContext(mainHtml: string): boolean {
  return (
    mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING) &&
    mainHtml.includes('class="section leaks"')
  );
}

/** Trade Compliance: leaks accordion after foundation (Freight Forwarders placeholder copy). */
export function insertTradeComplianceLeaksAfterFoundation(mainHtml: string): string {
  if (!mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)) return mainHtml;
  return insertKlearDataLeaksAfterFoundation(mainHtml);
}

const TRADE_COMPLIANCE_DP_ALT_HEADING = 'This platform is ideal for importers who:';
const TRADE_COMPLIANCE_DP_ALT_CARD1_TITLE =
  'Manage high volumes and need faster, cleaner entries across multiple brokers';
const TRADE_COMPLIANCE_DP_ALT_CARD2_TITLE =
  'Want one source of truth for status, exceptions, and documents';
const TRADE_COMPLIANCE_DP_ALT_CARD3_TITLE =
  'Need audit-ready records and fewer surprises on duties and bonds';

/** Trade Compliance: “When to use KlearData” dp--alt — immediately before the leaks (KlearHub) band. */
export function insertTradeComplianceDpAltBeforeLeaks(mainHtml: string): string {
  if (!hasTradeComplianceLeaksContext(mainHtml)) return mainHtml;
  if (
    mainHtml.includes(TRADE_COMPLIANCE_DP_ALT_HEADING) ||
    mainHtml.includes(FREIGHT_FORWARDERS_DP_ALT_HEADING)
  ) {
    return mainHtml;
  }

  const leaksStart = mainHtml.indexOf('<section class="section leaks"');
  if (leaksStart === -1) return mainHtml;

  return mainHtml.slice(0, leaksStart) + freightForwardersDpAltSection + mainHtml.slice(leaksStart);
}

function hasTradeComplianceDpAltBand(mainHtml: string): boolean {
  if (!hasTradeComplianceLeaksContext(mainHtml)) return false;
  return (
    mainHtml.includes(TRADE_COMPLIANCE_DP_ALT_HEADING) ||
    mainHtml.includes(FREIGHT_FORWARDERS_DP_ALT_HEADING)
  );
}

/** Trade Compliance: dp--alt section heading. */
export function patchTradeComplianceDpAltHeading(mainHtml: string): string {
  if (!hasTradeComplianceDpAltBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    `<h2 class="dp__heading" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_HEADING}</h2>`,
    `<h2 class="dp__heading" data-astro-cid-thdesxtn>${TRADE_COMPLIANCE_DP_ALT_HEADING}</h2>`,
  );
}

/** Trade Compliance: dp--alt three-card titles. */
export function patchTradeComplianceDpAltCards(mainHtml: string): string {
  if (!hasTradeComplianceDpAltBand(mainHtml)) return mainHtml;

  let html = mainHtml;
  html = html.replace(
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD1_TITLE}</h3>`,
    `<h3 data-astro-cid-thdesxtn>${TRADE_COMPLIANCE_DP_ALT_CARD1_TITLE}</h3>`,
  );
  html = html.replace(
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD2_TITLE}</h3>`,
    `<h3 data-astro-cid-thdesxtn>${TRADE_COMPLIANCE_DP_ALT_CARD2_TITLE}</h3>`,
  );
  html = html.replace(
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD3_TITLE}</h3>`,
    `<h3 data-astro-cid-thdesxtn>${TRADE_COMPLIANCE_DP_ALT_CARD3_TITLE}</h3>`,
  );
  return html;
}

/** Trade Compliance: dp--alt — titles only (drop card body paragraphs). */
export function removeTradeComplianceDpAltCardBodies(mainHtml: string): string {
  if (!hasTradeComplianceDpAltBand(mainHtml)) return mainHtml;

  const section =
    extractSectionContaining(
      mainHtml,
      '<section class="section dp dp--alt"',
      'dp__cards--three',
    ) ?? '';
  if (!section.includes('dp__cards--three')) return mainHtml;

  const stripped = section.replace(
    /(<article class="dp__card" data-astro-cid-thdesxtn>[\s\S]*?)<p data-astro-cid-thdesxtn>[\s\S]*?<\/p>/g,
    '$1',
  );
  if (stripped === section) return mainHtml;

  const sectionStart = mainHtml.indexOf(section);
  if (sectionStart === -1) return mainHtml;
  return mainHtml.slice(0, sectionStart) + stripped + mainHtml.slice(sectionStart + section.length);
}

/** Trade Compliance: drop dp--alt sub under “When to use KlearData”. */
export function removeTradeComplianceDpAltSub(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_DP_ALT_HEADING)) return mainHtml;
  if (!hasTradeComplianceLeaksContext(mainHtml)) return mainHtml;

  const headOpen = `<div class="container dp__head" data-astro-cid-thdesxtn><h2 class="dp__heading" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_HEADING}</h2>`;
  return mainHtml.replace(
    new RegExp(`${headOpen}<p class="dp__sub" data-astro-cid-thdesxtn>[\\s\\S]*?</p>`),
    headOpen,
  );
}

/** Trade Compliance leaks section intro. */
export function patchTradeComplianceLeaksHead(mainHtml: string): string {
  if (!hasTradeComplianceLeaksContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<div class="leaks__head" data-astro-cid-kn3eqkos>[\s\S]*?<\/div>/,
    freightForwardersLeaksHeadHtml(),
  );
}

/** Trade Compliance leaks accordion steps (three items). */
export function patchTradeComplianceLeaksSteps(mainHtml: string): string {
  if (!hasTradeComplianceLeaksContext(mainHtml)) return mainHtml;

  let html = mainHtml;
  html = patchFreightForwardersLeaksStep(
    html,
    'Data capture',
    TRADE_COMPLIANCE_LEAKS_STEP1_TITLE,
    'Ingest emails, PDFs, EDI feeds, and portal exports to collect every field required for an entry.',
    TRADE_COMPLIANCE_LEAKS_STEP1_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'Multi-Agent extraction',
    TRADE_COMPLIANCE_LEAKS_STEP2_TITLE,
    'Document training, and agentic feedback loops.',
    TRADE_COMPLIANCE_LEAKS_STEP2_BODY,
  );
  html = patchFreightForwardersLeaksStep(
    html,
    'LCB knowledge built in',
    TRADE_COMPLIANCE_LEAKS_STEP3_TITLE,
    'Access to preprocessing exception management constructed by licensed brokers.',
    TRADE_COMPLIANCE_LEAKS_STEP3_BODY,
  );
  return html;
}

/** Trade Compliance leaks — three steps (drop 04–06). */
export function removeTradeComplianceLeaksExtraSteps(mainHtml: string): string {
  if (!hasTradeComplianceLeaksContext(mainHtml)) return mainHtml;
  let html = mainHtml;
  html = removeLeaksItemByNum(html, '06');
  html = removeLeaksItemByNum(html, '05');
  html = removeLeaksItemByNum(html, '04');
  return html;
}

/** Freight Forwarders: drop foundation eyebrows (Legency / aeo-agency mirror labels). */
export function removeFreightForwardersFoundationLabel(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;

  let html = mainHtml;
  html = html.replace(/<span class="label" data-astro-cid-6q4o4ab6>[^<]*<\/span>\s*/g, '');
  html = html.replace(/<span class="label" data-astro-cid-asdozulm>AEO Agency<\/span>\s*/g, '');
  return html;
}

const FREIGHT_FORWARDERS_DP_ALT_HEADING = 'When to use KlearData';
const FREIGHT_FORWARDERS_DP_ALT_FOOT =
  'For Freight Forwarders who are looking to ingest data from your trade documents, KlearNow can offer KlearData as a stand alone product.';

/** Freight Forwarders: “The Overlap” dp--alt band — KlearData positioning. */
export function patchFreightForwardersDpAltHeading(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;

  let html = mainHtml.replace(/<span class="label" data-astro-cid-thdesxtn>The Overlap<\/span>/, '');

  if (html.includes('Why Running Them Separately Costs You Twice')) {
    html = html.replace(
      /<h2 class="dp__heading" data-astro-cid-thdesxtn>Why Running Them Separately Costs You Twice<\/h2>/,
      `<h2 class="dp__heading" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_HEADING}</h2>`,
    );
  }
  return html;
}

export function patchFreightForwardersDpAltFoot(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;

  const legencyFoot =
    'The measurement is where they differ, and that is the part most programmes skip: rankings and clicks on one side, citation counts across four engines on the other, in one monthly report.';
  if (!mainHtml.includes(legencyFoot)) return mainHtml;

  return mainHtml.replace(
    `<p class="dp__foot" data-astro-cid-thdesxtn>${legencyFoot}</p>`,
    `<p class="dp__foot" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_FOOT}</p>`,
  );
}

const FREIGHT_FORWARDERS_DP_ALT_CARD1_TITLE = 'Your documents arrive in fifty formats';
const FREIGHT_FORWARDERS_DP_ALT_CARD1_BODY =
  'Invoices, packing lists, ISF data, and broker emails land from parties who see them before you do, in whatever format they choose.';
const FREIGHT_FORWARDERS_DP_ALT_CARD2_TITLE = 'Someone keys it in by hand';
const FREIGHT_FORWARDERS_DP_ALT_CARD2_BODY =
  'Re-typing the same fields into portals and spreadsheets is where the hours go, and where the errors start.';
const FREIGHT_FORWARDERS_DP_ALT_CARD3_TITLE = 'A mistake shows up after the shipment cleared';
const FREIGHT_FORWARDERS_DP_ALT_CARD3_BODY =
  'A wrong value or a missing document shows up months later, when correcting it costs the most.';

/** Freight Forwarders: dp--alt three-card row — KlearData “when to use” story. */
export function patchFreightForwardersDpAltCards(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('The same pages')) return mainHtml;

  let html = mainHtml;
  html = html.replace(
    '<h3 data-astro-cid-thdesxtn>The same pages</h3>',
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD1_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-thdesxtn>Both disciplines want the same twenty pages fixed. Split across two vendors, those pages get edited twice, in two directions, and each vendor reports the movement the other caused.</p>',
    `<p data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD1_BODY}</p>`,
  );
  html = html.replace(
    '<h3 data-astro-cid-thdesxtn>The same technical layer</h3>',
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD2_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-thdesxtn>Crawlability, structure, speed and clean markup decide whether either surface can use your site. It is one job. Paying for it twice is the most common waste we find on arriving.</p>',
    `<p data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD2_BODY}</p>`,
  );
  html = html.replace(
    '<h3 data-astro-cid-thdesxtn>The same authority</h3>',
    `<h3 data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD3_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-thdesxtn>Being cited elsewhere lifts both. A mention on a source an engine already trusts helps the answer and the ranking, and no one has ever needed two separate plans to earn it.</p>',
    `<p data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_CARD3_BODY}</p>`,
  );
  return html;
}

/** Freight Forwarders: dp--alt — foot copy above the three cards (Legency mirror had cards first). */
export function swapFreightForwardersDpAltFootAndCards(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_DP_ALT_HEADING)) return mainHtml;

  const section =
    extractSectionContaining(
      mainHtml,
      '<section class="section dp dp--alt"',
      FREIGHT_FORWARDERS_DP_ALT_HEADING,
    ) ?? '';
  if (!section.includes('dp__cards--three') || !section.includes('dp__foot')) return mainHtml;

  const swapped = section.replace(
    /(<div class="container dp__cards dp__cards--three" data-astro-cid-thdesxtn>[\s\S]*?<\/div>)(<div class="container" data-astro-cid-thdesxtn><p class="dp__foot" data-astro-cid-thdesxtn>[\s\S]*?<\/p><\/div>)/,
    '$2$1',
  );
  if (swapped === section) return mainHtml;

  const sectionStart = mainHtml.indexOf(section);
  if (sectionStart === -1) return mainHtml;
  return mainHtml.slice(0, sectionStart) + swapped + mainHtml.slice(sectionStart + section.length);
}

/** Freight Forwarders: dp--alt — intro copy under heading (dp__sub), not a separate foot block. */
export function nestFreightForwardersDpAltFootInHead(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_DP_ALT_HEADING)) return mainHtml;

  const subInHead = `<p class="dp__sub" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_FOOT}</p>`;
  const headOpen = `<div class="container dp__head" data-astro-cid-thdesxtn><h2 class="dp__heading" data-astro-cid-thdesxtn>${FREIGHT_FORWARDERS_DP_ALT_HEADING}</h2>`;

  if (mainHtml.includes(headOpen + subInHead)) return mainHtml;

  let html = mainHtml;
  if (html.includes(headOpen + '</div>')) {
    html = html.replace(headOpen + '</div>', headOpen + subInHead + '</div>');
  }

  html = html.replace(
    /<div class="container" data-astro-cid-thdesxtn><p class="dp__foot" data-astro-cid-thdesxtn>[\s\S]*?<\/p><\/div>(?=<div class="container dp__cards dp__cards--three")/,
    '',
  );
  return html;
}

/** Freight Forwarders: audience band above “When to use KlearData” dp--alt (before caseband / leaks). */
export function swapFreightForwardersDpAltAndHomeServicesRepeat(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_DP_ALT_HEADING)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const dpAlt =
    extractSectionContaining(
      mainHtml,
      '<section class="section dp dp--alt"',
      FREIGHT_FORWARDERS_DP_ALT_HEADING,
    ) ?? '';
  if (!dpAlt) return mainHtml;

  const repeatMarker = 'id="home-services-repeat"';
  const repeatId = mainHtml.indexOf(repeatMarker);
  if (repeatId === -1) return mainHtml;
  const repeatStart = mainHtml.lastIndexOf('<section', repeatId);
  if (repeatStart === -1) return mainHtml;
  const repeatSection = sliceSectionAt(mainHtml, repeatStart);
  if (!repeatSection?.includes(repeatMarker)) return mainHtml;

  const dpStart = mainHtml.indexOf(dpAlt);
  if (dpStart === -1) return mainHtml;

  if (repeatStart > dpStart) {
    const before = mainHtml.slice(0, dpStart);
    const between = mainHtml.slice(dpStart + dpAlt.length, repeatStart);
    const after = mainHtml.slice(repeatStart + repeatSection.length);
    return before + repeatSection + between + dpAlt + after;
  }

  if (repeatStart < dpStart) {
    const before = mainHtml.slice(0, repeatStart);
    const between = mainHtml.slice(repeatStart + repeatSection.length, dpStart);
    const after = mainHtml.slice(dpStart + dpAlt.length);
    return before + dpAlt + between + repeatSection + after;
  }

  return mainHtml;
}

const FREIGHT_FORWARDERS_ROT_HEADING = 'Overcome modern challenges for freight forwarders';

/** Freight Forwarders rot headline (replaces shared KlearHub “One system, multiple countries”). */
export function patchFreightForwardersRotHeading(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('One system, multiple countries')) return mainHtml;

  return mainHtml.replace(
    '<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>One system, multiple countries</h2>',
    `<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_HEADING}</h2>`,
  );
}

/** Freight Forwarders rot — drop licence intro beside the headline. */
export function removeFreightForwardersRotIntro(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_ROT_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<div class="rot__intro" data-astro-cid-r7auhxne><p data-astro-cid-r7auhxne>KlearNow holds customs licences in the United States, Canada, the United Kingdom, the Netherlands, and Spain\. Same platform, same data model, same audit trail in each of them\.<\/p><\/div>/,
    '',
  );
}

const FREIGHT_FORWARDERS_ROT_STEP1_LABEL = 'Digital Integration';
const FREIGHT_FORWARDERS_ROT_STEP1_BODY =
  'Zero-code APIs and TMS connectors sync shipment and clearance data in minutes, not days.';
const FREIGHT_FORWARDERS_ROT_STEP2_LABEL = 'Data Security &amp; Compliance';
const FREIGHT_FORWARDERS_ROT_STEP2_BODY =
  'KlearData encrypts every record and keeps audit-ready trails that satisfy local customs authorities, GDPR, and CTPAT.';
const FREIGHT_FORWARDERS_ROT_STEP3_LABEL = 'Customer Transparency';
const FREIGHT_FORWARDERS_ROT_STEP3_BODY =
  'Share customs clearance updates and port-to-door milestone updates through a white labeled portal your shippers will love.';
const FREIGHT_FORWARDERS_ROT_STEP4_LABEL = 'Combine your agents and in-house teams';
const FREIGHT_FORWARDERS_ROT_STEP4_BODY =
  'Non complex integrations allow internal and external data sources to be combined providing accurate reporting as soon as shipment data is available.';

function hasFreightForwardersRotContext(mainHtml: string): boolean {
  return (
    hasFreightForwardersHeroContext(mainHtml) &&
    mainHtml.includes(FREIGHT_FORWARDERS_ROT_HEADING)
  );
}

/** Freight Forwarders rot — four-step labels and bodies. */
export function patchFreightForwardersRotSteps(mainHtml: string): string {
  if (!hasFreightForwardersRotContext(mainHtml)) return mainHtml;
  return patchFreightForwardersRotStepsOnRotBand(mainHtml);
}

/** Trade Compliance: KlearHub rot band directly after foundation (placeholder — Freight Forwarders copy). */
export function insertTradeComplianceRotAfterFoundation(mainHtml: string): string {
  if (!mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)) return mainHtml;
  if (mainHtml.includes('<section class="section rot"')) return mainHtml;

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, foundationStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearHubRotSection + mainHtml.slice(insertAt);
}

/** Drop Legency rot timeline intro (KlearHub / Operation rot band). */
export function removeKlearHubRotLegencyTimelineIntro(mainHtml: string): string {
  if (!mainHtml.includes('Nothing on this timeline')) return mainHtml;

  return mainHtml.replace(
    /<div class="rot__intro" data-astro-cid-r7auhxne><p data-astro-cid-r7auhxne>Nothing on this timeline[\s\S]*?<\/p><\/div>\s*/,
    '',
  );
}

function hasTradeComplianceRotContext(mainHtml: string): boolean {
  return (
    mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING) &&
    mainHtml.includes(FREIGHT_FORWARDERS_ROT_HEADING)
  );
}

/** Trade Compliance rot headline (Freight Forwarders placeholder). */
export function patchTradeComplianceRotHeading(mainHtml: string): string {
  if (!mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)) return mainHtml;
  if (!mainHtml.includes('One system, multiple countries')) return mainHtml;

  return mainHtml.replace(
    '<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>One system, multiple countries</h2>',
    `<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_HEADING}</h2>`,
  );
}

/** Trade Compliance rot — four-step labels and bodies (Freight Forwarders placeholder). */
export function patchTradeComplianceRotSteps(mainHtml: string): string {
  if (!hasTradeComplianceRotContext(mainHtml)) return mainHtml;
  return patchFreightForwardersRotStepsOnRotBand(mainHtml);
}

function removeRotStepByMonthLabel(mainHtml: string, label: string): string {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return mainHtml.replace(
    new RegExp(
      `<li class="rot__step" data-astro-cid-r7auhxne>[\\s\\S]*?<span class="rot__month" data-astro-cid-r7auhxne>${escaped}</span>[\\s\\S]*?</li>`,
    ),
    '',
  );
}

/** Trade Compliance rot — drop “Customer Transparency” (three cards remain). */
export function removeTradeComplianceRotCustomerTransparencyStep(mainHtml: string): string {
  if (!hasTradeComplianceRotContext(mainHtml)) return mainHtml;
  return removeRotStepByMonthLabel(mainHtml, FREIGHT_FORWARDERS_ROT_STEP3_LABEL);
}

/** Trade Compliance: remove rot band (“Overcome modern challenges…”). */
export function removeTradeComplianceRotSection(mainHtml: string): string {
  if (!mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)) return mainHtml;
  if (!mainHtml.includes('<section class="section rot"')) return mainHtml;

  const sectionStart = mainHtml.indexOf('<section class="section rot"');
  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + mainHtml.slice(sectionStart + section.length);
}

function patchFreightForwardersRotStepsOnRotBand(mainHtml: string): string {
  let html = mainHtml;
  html = html.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Direct customs filing</span>',
    `<span class="rot__month" data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP1_LABEL}</span>`,
  );
  html = html.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP1_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP1_BODY}</p>`,
  );
  html = html.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Full audit trail</span>',
    `<span class="rot__month" data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP2_LABEL}</span>`,
  );
  html = html.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP2_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP2_BODY}</p>`,
  );
  html = html.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>SOC2 standards</span>',
    `<span class="rot__month" data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP3_LABEL}</span>`,
  );
  html = html.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP3_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP3_BODY}</p>`,
  );
  html = html.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>One data model</span>',
    `<span class="rot__month" data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP4_LABEL}</span>`,
  );
  html = html.replace(
    `<p data-astro-cid-r7auhxne>A change in one place breaks a page nobody was watching. Quotes come in for a rebuild.</p>`,
    `<p data-astro-cid-r7auhxne>${FREIGHT_FORWARDERS_ROT_STEP4_BODY}</p>`,
  );
  return html;
}

/** Freight Forwarders: KlearData “vs” two-card band after rot. */
export function insertFreightForwardersVsAfterRot(mainHtml: string): string {
  if (!hasFreightForwardersRotContext(mainHtml)) return mainHtml;
  if (mainHtml.includes(KLEAR_DATA_TWO_CARD_VS_MARKER)) return mainHtml;

  const rotStart = mainHtml.indexOf('<section class="section rot"');
  if (rotStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, rotStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataVsSection + mainHtml.slice(insertAt);
}

const FREIGHT_FORWARDERS_VS_CARD1_TITLE =
  'Streamline your operations with cutting-edge technology';
const FREIGHT_FORWARDERS_VS_CARD1_BODY =
  'KlearHub converts emailed docs into live data, while KlearCustoms & the KlearDray module extend that data all the way to final delivery.';
const FREIGHT_FORWARDERS_VS_CARD2_TITLE = 'Build your forwarding stack — on your terms';
const FREIGHT_FORWARDERS_VS_CARD2_BODY =
  'Begin with a live data hub, expand to automated customs clearance, and switch on port-to-door moves when you need capacity. One connected workspace, zero added complexity.';

function applyFreightForwardersStyleVsCardCopy(mainHtml: string): string {
  let html = mainHtml;
  html = html.replace(
    '<h3 data-astro-cid-hsjbckyb>NO NEW PORTAL, NO NEW HABITS</h3>',
    `<h3 data-astro-cid-hsjbckyb>${FREIGHT_FORWARDERS_VS_CARD1_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-hsjbckyb>Your documents already arrive by email. Copy KlearData into the thread and it reads them where they land, so nobody has to learn a system or change how they work.</p>',
    `<p data-astro-cid-hsjbckyb>${FREIGHT_FORWARDERS_VS_CARD1_BODY}</p>`,
  );
  html = html.replace(
    '<h3 data-astro-cid-hsjbckyb>EVERY FIELD, BACK TO ITS SOURCE</h3>',
    `<h3 data-astro-cid-hsjbckyb>${FREIGHT_FORWARDERS_VS_CARD2_TITLE}</h3>`,
  );
  html = html.replace(
    '<p data-astro-cid-hsjbckyb>Extraction is only useful if you can prove it. Each value KlearData captures stays linked to the document it came from, so an audit question has an answer instead of a search.</p>',
    `<p data-astro-cid-hsjbckyb>${FREIGHT_FORWARDERS_VS_CARD2_BODY}</p>`,
  );
  return html;
}

/** Freight Forwarders: replace KlearData vs card copy. */
export function patchFreightForwardersVsCards(mainHtml: string): string {
  if (!hasFreightForwardersRotContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('NO NEW PORTAL, NO NEW HABITS')) return mainHtml;
  return applyFreightForwardersStyleVsCardCopy(mainHtml);
}

function patchFreightForwardersVsCardIcon(
  mainHtml: string,
  cardTitle: string,
  paths: string,
): string {
  const escapedTitle = cardTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const titleRe = new RegExp(`<h3[^>]*>${escapedTitle}<\\/h3>`);
  const titleMatch = titleRe.exec(mainHtml);
  if (!titleMatch) return mainHtml;

  const titleIdx = titleMatch.index;
  const articleStart = mainHtml.lastIndexOf('<article class="vs__card', titleIdx);
  if (articleStart === -1) return mainHtml;

  const articleEnd = mainHtml.indexOf('</article>', titleIdx);
  if (articleEnd === -1) return mainHtml;
  const articleEndIdx = articleEnd + '</article>'.length;

  const articleHtml = mainHtml.slice(articleStart, articleEndIdx);
  const iconSvg = klearStrokeSvg(paths, 'data-astro-cid-ccg5yoga');
  const updatedArticle = articleHtml.replace(
    /<svg[\s\S]*?data-astro-cid-ccg5yoga>[\s\S]*?<\/svg>/,
    iconSvg,
  );

  return mainHtml.slice(0, articleStart) + updatedArticle + mainHtml.slice(articleEndIdx);
}

function applyFreightForwardersStyleVsIcons(mainHtml: string): string {
  let html = mainHtml;
  html = patchFreightForwardersVsCardIcon(
    html,
    FREIGHT_FORWARDERS_VS_CARD1_TITLE,
    ICON_DOC_INGESTION,
  );
  html = patchFreightForwardersVsCardIcon(
    html,
    FREIGHT_FORWARDERS_VS_CARD2_TITLE,
    ICON_LAYERS,
  );
  return html;
}

/** Freight Forwarders: vs card icons aligned to Hub / modular stack copy. */
export function patchFreightForwardersVsIcons(mainHtml: string): string {
  if (!hasFreightForwardersRotContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_VS_CARD1_TITLE)) return mainHtml;
  return applyFreightForwardersStyleVsIcons(mainHtml);
}

/** Freight Forwarders: KlearHub rot band after foundation (placeholder copy; patch later). */
export function insertFreightForwardersRotAfterFoundation(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('<section class="section rot"')) return mainHtml;

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, foundationStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearHubRotSection + mainHtml.slice(insertAt);
}

const FREIGHT_FORWARDERS_FOUNDATION_HEADING =
  'How KlearNow<br>Empowers Freight Forwarders';

export function patchFreightForwardersFoundationHeading(mainHtml: string): string {
  return mainHtml.replace(
    /<h2 class="foundation__heading"[^>]*>Four Things That Decide Whether You Are Cited<\/h2>/,
    `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_HEADING}</h2>`,
  );
}

const FREIGHT_FORWARDERS_FOUNDATION_CARD1_TITLE = 'Capture &amp; Structure Docs';
const FREIGHT_FORWARDERS_FOUNDATION_CARD1_BODY =
  'Ingest emails, PDFs, EDI feeds, and transport data, then convert everything into structured, searchable fields';

const FREIGHT_FORWARDERS_FOUNDATION_CARD2_TITLE = 'AI Validation &amp; Visibility';
const FREIGHT_FORWARDERS_FOUNDATION_CARD2_BODY =
  'A real-time control tower continuously monitors live trade data. Automatically cross-check declared values and documents against expected fields; ensuring accuracy at every step.';

const FREIGHT_FORWARDERS_FOUNDATION_CARD3_TITLE = 'Issue Alerts &amp; Custom BI';
const FREIGHT_FORWARDERS_FOUNDATION_CARD3_BODY =
  'instant exception alerts plus white-label dashboards and downloadable KPI reports for your shippers.';

const FREIGHT_FORWARDERS_FOUNDATION_CARD4_TITLE = 'Book Dray &amp; Inland Capacity';
const FREIGHT_FORWARDERS_FOUNDATION_CARD4_BODY =
  'reserve vetted dray and truck capacity nationwide, activated automatically with your KlearHub contract.';

export function patchFreightForwardersFoundationCard1Title(mainHtml: string): string {
  if (!mainHtml.includes('How KlearNow')) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>Pages Written to Be Quoted<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD1_TITLE}</h3>`,
  );
}

export function patchFreightForwardersFoundationCard1Body(mainHtml: string): string {
  if (!mainHtml.includes('Capture &amp; Structure Docs')) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Question-led pages that answer what buyers actually ask, in the first sentences\. Written to be quoted by engines and useful to humans, and refreshed on a set cycle\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD1_BODY}</p>`,
  );
}

export function patchFreightForwardersFoundationCard2Title(mainHtml: string): string {
  if (!mainHtml.includes('Capture &amp; Structure Docs')) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>A Site Engines Can Read<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD2_TITLE}</h3>`,
  );
}

export function patchFreightForwardersFoundationCard2Body(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_FOUNDATION_CARD2_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Schema on every page type, clean semantic structure, fast pages and a machine-readable site\. The unglamorous layer that decides whether engines can read you at all\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD2_BODY}</p>`,
  );
}

export function patchFreightForwardersFoundationCard3Title(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_FOUNDATION_CARD2_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>Authority Built Off-Site as Well as On<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD3_TITLE}</h3>`,
  );
}

export function patchFreightForwardersFoundationCard3Body(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_FOUNDATION_CARD3_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Bylines tied to real author entities, and a citation plan that earns mentions on the sites engines already trust\. Authority is built off-site as much as on it\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD3_BODY}</p>`,
  );
}

export function patchFreightForwardersFoundationCard4Title(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_FOUNDATION_CARD3_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>A Citation Count Every Month<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD4_TITLE}</h3>`,
  );
}

export function patchFreightForwardersFoundationCard4Body(mainHtml: string): string {
  if (!mainHtml.includes(FREIGHT_FORWARDERS_FOUNDATION_CARD4_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Monthly citation checks across four AI engines, plus rankings and AI-referred sessions in analytics\. Every recommendation traces back to a number you can show upward\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD4_BODY}</p>`,
  );
}

const FREIGHT_FORWARDERS_FOUNDATION_2_ID = 'freight-forwarders-foundation-2';

/** Freight Forwarders: duplicate foundation band above dp--alt (copy TBD). */
export function duplicateFreightForwardersFoundationBeforeDpAlt(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(FREIGHT_FORWARDERS_FOUNDATION_HEADING)) return mainHtml;
  if (!mainHtml.includes('<section class="section dp dp--alt"')) return mainHtml;
  if (mainHtml.includes(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`)) return mainHtml;

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, foundationStart);
  if (!section) return mainHtml;

  const copy = section.replace(
    /^<section class="section foundation"/,
    `<section class="section foundation" id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`,
  );

  const dpAltStart = mainHtml.indexOf('<section class="section dp dp--alt"');
  if (dpAltStart === -1) return mainHtml;

  return mainHtml.slice(0, dpAltStart) + copy + mainHtml.slice(dpAltStart);
}

const FREIGHT_FORWARDERS_FOUNDATION_2_HEADING = 'When to use KlearHub';

/** Freight Forwarders: duplicate foundation band heading (#freight-forwarders-foundation-2). */
export function patchFreightForwardersFoundation2Heading(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_HEADING}</h2>`;
  const to = `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_HEADING}</h2>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

const FREIGHT_FORWARDERS_FOUNDATION_2_CARD1_TITLE = 'When file management needs automating';

/** Freight Forwarders: duplicate foundation card 1 title (#freight-forwarders-foundation-2). */
export function patchFreightForwardersFoundation2Card1Title(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD1_TITLE}</h3>`;
  const to = `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD1_TITLE}</h3>`;
  if (!section.includes(from)) return mainHtml;

  const patched = section.replace(from, to);
  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

const FREIGHT_FORWARDERS_FOUNDATION_2_CARD1_BODY =
  'Emails, PDFs, and EDI feeds pour in from brokers, carriers, and clients, and no one has a single, trusted view.';
const FREIGHT_FORWARDERS_FOUNDATION_2_CARD2_TITLE = 'Juggling Multiple Partners &amp; Ports';
const FREIGHT_FORWARDERS_FOUNDATION_2_CARD2_BODY =
  'You need a real-time control tower that stitches every milestone together, regardless of who moves the freight or clears the goods.';
const FREIGHT_FORWARDERS_FOUNDATION_2_CARD3_TITLE = 'Manual Reporting Eats Up Hours';
const FREIGHT_FORWARDERS_FOUNDATION_2_CARD3_BODY =
  'Finance, ops, and customers all want status updates; self-serve dashboards would free your team from spreadsheets';
const FREIGHT_FORWARDERS_FOUNDATION_2_CARD4_BODY =
  'Reserve vetted dray and truck capacity nationwide, activated automatically with your KlearHub contract.';

/** Freight Forwarders: duplicate foundation cards 1–4 copy (#freight-forwarders-foundation-2). */
export function patchFreightForwardersFoundation2CardCopy(mainHtml: string): string {
  if (!hasFreightForwardersHeroContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`)) return mainHtml;

  const repeat2Id = mainHtml.indexOf(`id="${FREIGHT_FORWARDERS_FOUNDATION_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeat2Id);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  let patched = section;
  const replacements: [string, string][] = [
    [
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD1_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD1_BODY}</p>`,
    ],
    [
      `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD2_TITLE}</h3>`,
      `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD2_TITLE}</h3>`,
    ],
    [
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD2_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD2_BODY}</p>`,
    ],
    [
      `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD3_TITLE}</h3>`,
      `<h3 data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD3_TITLE}</h3>`,
    ],
    [
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD3_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD3_BODY}</p>`,
    ],
    [
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_CARD4_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${FREIGHT_FORWARDERS_FOUNDATION_2_CARD4_BODY}</p>`,
    ],
  ];

  for (const [from, to] of replacements) {
    if (patched.includes(from)) patched = patched.replace(from, to);
  }

  if (patched === section) return mainHtml;

  const sectionEnd = sectionStart + section.length;
  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionEnd);
}

const MANAGED_TRADE_HERO_TITLE_FLAT = 'When you would rather hand it off to our experts.';
const MANAGED_TRADE_HERO_TITLE =
  'When you would<br data-astro-cid-asdozulm>rather hand<br data-astro-cid-asdozulm>it off to<br data-astro-cid-asdozulm>our experts.';

/** Managed Trade (`/managed-trade/`, wordpress migration mirror). */
export function patchManagedTradeSvcHeroLabel(mainHtml: string): string {
  return mainHtml.replace(
    /(<section class="svc-hero"[^>]*>[\s\S]*?)<span class="label"[^>]*>Services<\/span>/,
    `$1<span class="label" data-astro-cid-asdozulm>${servicesNavAccordionLabel}</span>`,
  );
}

export function patchManagedTradeSvcHeroTitle(mainHtml: string): string {
  let html = mainHtml.replace(
    /(<h1 class="svc-hero__title"[^>]*>)WordPress to Webflow Migration Agency(<\/h1>)/,
    `$1${MANAGED_TRADE_HERO_TITLE}$2`,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${MANAGED_TRADE_HERO_TITLE_FLAT}</h1>`,
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${MANAGED_TRADE_HERO_TITLE}</h1>`,
  );
  return html;
}

const MANAGED_TRADE_HERO_SUB =
  'KlearNow’s licensed brokers operate the platform for you, from managed clearance end-to-end to finding and filing duty refunds on your behalf. Same software as KlearData and KlearHub, run by our team instead of yours.';

export function patchManagedTradeSvcHeroSub(mainHtml: string): string {
  return mainHtml.replace(
    /<p class="svc-hero__sub"[^>]*>A WordPress to Webflow migration rebuilds your site[\s\S]*?<\/p>/,
    `<p class="svc-hero__sub" data-astro-cid-asdozulm>${MANAGED_TRADE_HERO_SUB}</p>`,
  );
}

/** Managed Trade: drop Legency WordPress migration page-brief bands. */
export function removeManagedTradeMigrationPlanningBrief(mainHtml: string): string {
  let html = removeSectionContaining(
    mainHtml,
    '<section class="page-brief"',
    'Migration planning',
  );
  return removeSectionContaining(
    html,
    '<section class="page-brief"',
    'Considering a Webflow to WordPress migration?',
  );
}

/** Managed Trade: drop Legency “Migrated Properly” evo block. */
export function removeManagedTradeEvoSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section evo"',
    'Migrated Properly',
  );
}

/** Managed Trade: drop Legency WordPress migration FAQ. */
export function removeManagedTradeFaqSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section faq"',
    'How long does a WordPress to Webflow migration take?',
  );
}

const MANAGED_TRADE_MIGRATION_CONTENT_DP_HEADING =
  "Outsourcing clearance shouldn't mean going blind.";

const MANAGED_TRADE_MIGRATION_CONTENT_DP_HEADING_HTML =
  'Outsourcing clearance<br data-astro-cid-t5ifmcvy>shouldn&#39;t mean going blind.';

function hasManagedTradeMigrationContentBand(mainHtml: string): boolean {
  return (
    mainHtml.includes('id="migration-content"') ||
    mainHtml.includes('Outsourcing clearance') ||
    mainHtml.includes(MANAGED_TRADE_MIGRATION_CONTENT_DP_HEADING)
  );
}

const MANAGED_TRADE_MIGRATION_CONTENT_DP_SUB =
  "When you hand clearance to a broker, the data leaves your systems. KlearNow is both the broker and the platform, so it doesn't leave your systems.";

/** Managed Trade: drop Legency “The Trade You Are Making” dp--alt band. */
export function removeManagedTradeTradeComparisonSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section dp dp--alt"',
    'The Trade You Are Making',
  );
}

/** Managed Trade: drop Legency migration traffic / SEO risk dp band. */
export function removeManagedTradeMigrationTrafficRiskSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section dp"',
    'A Migration Can Lose You Traffic You Spent Years Earning',
  );
}

/** Managed Trade `#migration-content` heading. */
export function patchManagedTradeMigrationContentDpHeading(mainHtml: string): string {
  const target = `<h2 class="dp__heading" data-astro-cid-t5ifmcvy data-no-roll>${MANAGED_TRADE_MIGRATION_CONTENT_DP_HEADING_HTML}</h2>`;

  let html = mainHtml.replace(
    /<h2 class="dp__heading" data-astro-cid-t5ifmcvy(?:\s+data-no-roll)?>What moves from WordPress to Webflow\?<\/h2>/,
    target,
  );
  html = html.replace(
    new RegExp(
      `<h2 class="dp__heading" data-astro-cid-t5ifmcvy(?:\\s+data-no-roll)?>${MANAGED_TRADE_MIGRATION_CONTENT_DP_HEADING.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/h2>`,
    ),
    target,
  );
  return html;
}

/** Managed Trade `#migration-content` intro (WordPress mirror dp head). */
export function patchManagedTradeMigrationContentDpSub(mainHtml: string): string {
  return mainHtml.replace(
    /<p class="dp__sub" data-astro-cid-t5ifmcvy>The move from WordPress to Webflow includes content, templates and integrations\. A content import transfers records; the website design and behaviour still need to be built and checked\.<\/p>/,
    `<p class="dp__sub" data-astro-cid-t5ifmcvy>${MANAGED_TRADE_MIGRATION_CONTENT_DP_SUB}</p>`,
  );
}

/** Managed Trade: drop `#migration-content` eyebrow “Content and functionality”. */
export function removeManagedTradeMigrationContentLabel(mainHtml: string): string {
  return mainHtml.replace(
    /<span class="label" data-astro-cid-t5ifmcvy>Content and functionality<\/span>/,
    '',
  );
}

/** Managed Trade `#migration-content` card 1 title. */
export function patchManagedTradeMigrationContentCard1Title(mainHtml: string): string {
  return mainHtml.replace(
    /<h3 data-astro-cid-t5ifmcvy>Posts, pages and media<\/h3>/,
    '<h3 data-astro-cid-t5ifmcvy>Managed Customs Clearance in Five Countries</h3>',
  );
}

const MANAGED_TRADE_MIGRATION_CONTENT_CARD1_BODY =
  'End to end filing across five countries with KlearNow as broker of record, or in the US use our network of brokers.';

/** Managed Trade `#migration-content` card 1 body. */
export function patchManagedTradeMigrationContentCard1Body(mainHtml: string): string {
  return mainHtml.replace(
    /<p data-astro-cid-t5ifmcvy>Map fields to Webflow CMS collections, import a sample and check images, references and slugs\. Confirm the plan's collection limits before the full import\.[\s\S]*?explains the XML-to-CSV content route\.<\/p>/,
    `<p data-astro-cid-t5ifmcvy>${MANAGED_TRADE_MIGRATION_CONTENT_CARD1_BODY}</p>`,
  );
}

/** Managed Trade `#migration-content` card 2 title. */
export function patchManagedTradeMigrationContentCard2Title(mainHtml: string): string {
  return mainHtml.replace(
    /<h3 data-astro-cid-t5ifmcvy>Templates and plugin behaviour<\/h3>/,
    '<h3 data-astro-cid-t5ifmcvy>Post Entry Audits (PEA) and Refunds</h3>',
  );
}

const MANAGED_TRADE_MIGRATION_CONTENT_CARD2_BODY =
  'Pre and post entry audits, Post summary corrections, CAPE filings, and refund recovery run for you.';

/** Managed Trade `#migration-content` card 2 body. */
export function patchManagedTradeMigrationContentCard2Body(mainHtml: string): string {
  return mainHtml.replace(
    /<p data-astro-cid-t5ifmcvy>Rebuild layouts as reusable components\. Review forms, search, localisation and other plugin-dependent features separately, with a named replacement or an agreed reason to retain the current setup\.<\/p>/,
    `<p data-astro-cid-t5ifmcvy>${MANAGED_TRADE_MIGRATION_CONTENT_CARD2_BODY}</p>`,
  );
}

/** Managed Trade `#migration-content` card 3 title. */
export function patchManagedTradeMigrationContentCard3Title(mainHtml: string): string {
  return mainHtml.replace(
    /<h3 data-astro-cid-t5ifmcvy>URLs and launch checks<\/h3>/,
    '<h3 data-astro-cid-t5ifmcvy>Integration services</h3>',
  );
}

const MANAGED_TRADE_MIGRATION_CONTENT_CARD3_BODY =
  'Broker, ERP, TMS, and WMS connections built and maintained.';

/** Managed Trade `#migration-content` card 3 body. */
export function patchManagedTradeMigrationContentCard3Body(mainHtml: string): string {
  return mainHtml.replace(
    /<p data-astro-cid-t5ifmcvy>Keep useful URLs where possible, redirect changed paths and check links, metadata, forms and analytics\. Retain a recoverable copy of the old site and agree who can approve the cutover\.<\/p>/,
    `<p data-astro-cid-t5ifmcvy>${MANAGED_TRADE_MIGRATION_CONTENT_CARD3_BODY}</p>`,
  );
}

/** Managed Trade `#migration-content` — three service cards in one row. */
export function patchManagedTradeMigrationContentCardsThreeColumn(mainHtml: string): string {
  if (!mainHtml.includes('id="migration-content"')) return mainHtml;

  const migId = mainHtml.indexOf('id="migration-content"');
  const sectionStart = mainHtml.lastIndexOf('<section', migId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    '<div class="container dp__cards" data-astro-cid-t5ifmcvy>',
    '<div class="container dp__cards dp__cards--three" data-astro-cid-t5ifmcvy>',
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** Managed Trade: KlearHub `#home-services` after `#migration-content`. */
export function insertManagedTradeHomeServicesAfterMigration(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (mainHtml.includes('id="home-services"')) return mainHtml;

  const migId = mainHtml.indexOf('id="migration-content"');
  if (migId === -1) return mainHtml;

  const sectionStart = mainHtml.lastIndexOf('<section', migId);
  if (sectionStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, sectionStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataEntryLineSection + mainHtml.slice(insertAt);
}

/** Managed Trade `#home-services` eyebrow (KlearHub keeps “What is included”). */
export function patchManagedTradeHomeServicesLabel(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  const servicesId = mainHtml.indexOf('id="home-services"');
  const sectionStart = mainHtml.lastIndexOf('<section', servicesId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    '<span class="label" data-astro-cid-jg2u4s4c>What is included</span>',
    '<span class="label" data-astro-cid-jg2u4s4c>What we run</span>',
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const MANAGED_TRADE_HOME_SERVICES_TITLE = 'Your customs operation, staffed by us';
const MANAGED_TRADE_HOME_SERVICES_SUB =
  'Take the whole operation or a single lane. Everything below runs on the same platform you would have used yourself, so nothing is a black box.';

function patchManagedTradeHomeServicesSectionHeading(
  mainHtml: string,
  patcher: (sectionHtml: string) => string,
): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  const servicesId = mainHtml.indexOf('id="home-services"');
  const sectionStart = mainHtml.lastIndexOf('<section', servicesId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = patcher(section);
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** Managed Trade `#home-services` heading (KlearHub keeps hub modules title). */
export function patchManagedTradeHomeServicesTitle(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>Everything the operation needs, in one system</h2>',
      `<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_TITLE}</h2>`,
    ),
  );
}

/** Managed Trade `#home-services` intro (KlearHub keeps nine-modules copy). */
export function patchManagedTradeHomeServicesSub(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>Nine modules that share the same data. Take the platform, or take only the pieces that close a gap you already have.</p>',
      `<p data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_SUB}</p>`,
    ),
  );
}

const MANAGED_TRADE_HOME_SERVICES_DROP_TITLES = [
  'Clearance and filing workspace',
  'Never miss a milestone',
  "Find money you're owed",
] as const;

/** Managed Trade `#home-services` — drop File / Track / Audit row (keep six modules). */
export function removeManagedTradeHomeServicesExtraCards(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) => {
    let patched = section;
    for (const title of MANAGED_TRADE_HOME_SERVICES_DROP_TITLES) {
      patched = removeServiceChoiceArticlesContaining(patched, title);
    }
    return patched;
  });
}

function patchManagedTradeHomeServicesRepeatSection(
  mainHtml: string,
  patcher: (sectionHtml: string) => string,
): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = patcher(section);
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const MANAGED_TRADE_HOME_SERVICES_REPEAT_DROP_TITLES = [
  'Expert help on tap',
  'A named team, not a queue',
  'Your process, written down',
] as const;

/** Managed Trade `#home-services-repeat` — drop section eyebrow (KlearHub keeps “The operating problem”). */
export function removeManagedTradeHomeServicesRepeatLabel(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatSection(mainHtml, (section) => {
    let patched = section;
    for (const label of [
      'What we run',
      'The operating problem',
      'What is included',
    ] as const) {
      patched = patched.replace(
        `<span class="label" data-astro-cid-jg2u4s4c>${label}</span>`,
        '',
      );
    }
    return patched;
  });
}

const MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE =
  'Teams that would rather own the outcome than the process';

/** Managed Trade `#home-services-repeat` heading (first band keeps staffed-by-us title). */
export function patchManagedTradeHomeServicesRepeatTitle(mainHtml: string): string {
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  let html = mainHtml;
  if (html.includes(MANAGED_TRADE_HOME_SERVICES_TITLE)) {
    html = html.replace(
      `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_TITLE}</h2>`,
      `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE}</h2>`,
    );
  }
  if (html.includes(KLEAR_HUB_HOME_SERVICES_REPEAT_TITLE)) {
    html = html.replace(
      `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_TITLE}</h2>`,
      `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE}</h2>`,
    );
  }
  return html;
}

/** Managed Trade `#home-services-repeat` — drop intro (first band keeps sub). */
export function removeManagedTradeHomeServicesRepeatSub(mainHtml: string): string {
  if (!mainHtml.includes('id="services-title-repeat"')) return mainHtml;
  if (!mainHtml.includes(MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE)) return mainHtml;

  return mainHtml.replace(
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE}</h2><p data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_SUB}</p>`,
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${MANAGED_TRADE_HOME_SERVICES_REPEAT_TITLE}</h2>`,
  );
}

/** Managed Trade `#home-services-repeat` — keep first three audience cards only. */
export function removeManagedTradeHomeServicesRepeatExtraCards(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatSection(mainHtml, (section) => {
    let patched = section;
    for (const title of MANAGED_TRADE_HOME_SERVICES_REPEAT_DROP_TITLES) {
      patched = removeServiceChoiceArticlesContaining(patched, title);
    }
    return patched;
  });
}

const MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD1_TITLE = 'Importers of Record';
const MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD1_BODY =
  'Customs is not your core operation and you have no interest in making it one. We run it, you keep the visibility and the accountability trail.';

const MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD2_TITLE = 'Trade Compliance Leaders';
const MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD2_BODY =
  'You carry the exposure when an entry clears wrong. A licensed broker of record is accountable for every filing, and you can see all of it.';

const MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD3_TITLE = 'Teams scaling into new countries';
const MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD3_BODY =
  'You are moving into markets faster than you can hire. KlearNow already holds the licences in five of them.';

const MANAGED_TRADE_REPEAT_CARD1_SOURCE_TITLE = 'Customs clearance in five countries';
const MANAGED_TRADE_REPEAT_CARD1_SOURCE_BODY = 'We run your customs end to end.';
const MANAGED_TRADE_REPEAT_CARD2_SOURCE_TITLE = 'Managed refund recovery';
const MANAGED_TRADE_REPEAT_CARD2_SOURCE_BODY =
  'Get it right the first time, over 98% accurate document determination.';
const MANAGED_TRADE_REPEAT_CARD3_SOURCE_TITLE = 'Connect your systems';
const MANAGED_TRADE_REPEAT_CARD3_SOURCE_BODY = 'We build and test your integrations.';

function patchManagedTradeRepeatAudienceCard(
  section: string,
  fromPairs: ReadonlyArray<readonly [string, string]>,
  toTitle: string,
  toBody: string,
): string {
  let patched = section;
  for (const [fromTitle, fromBody] of fromPairs) {
    const next = patched.replace(
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${fromTitle}</h3><p data-astro-cid-jg2u4s4c>${fromBody}</p>`,
      `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${toTitle}</h3><p data-astro-cid-jg2u4s4c>${toBody}</p>`,
    );
    if (next !== patched) return next;
  }
  return patched;
}

/** Managed Trade `#home-services-repeat` card 1 (KlearHub keeps “Customs Brokers”). */
export function patchManagedTradeHomeServicesRepeatCard1Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatSection(mainHtml, (section) =>
    patchManagedTradeRepeatAudienceCard(
      section,
      [
        [MANAGED_TRADE_REPEAT_CARD1_SOURCE_TITLE, MANAGED_TRADE_REPEAT_CARD1_SOURCE_BODY],
        [KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_TITLE, KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_BODY],
        [
          'File your own customs',
          'Run entries in-house: ISF, in-bond, delivery orders, and more.',
        ],
      ],
      MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD1_TITLE,
      MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD1_BODY,
    ),
  );
}

/** Managed Trade `#home-services-repeat` card 1 body. */
export function patchManagedTradeHomeServicesRepeatCard1Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatCard1Title(mainHtml);
}

/** Managed Trade `#home-services-repeat` card 2. */
export function patchManagedTradeHomeServicesRepeatCard2Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatSection(mainHtml, (section) =>
    patchManagedTradeRepeatAudienceCard(
      section,
      [
        [MANAGED_TRADE_REPEAT_CARD2_SOURCE_TITLE, MANAGED_TRADE_REPEAT_CARD2_SOURCE_BODY],
        [KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_TITLE, KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_BODY],
        [
          'Work with the brokers you already have',
          'Bring existing broker relationships into one view instead of replacing them.',
        ],
      ],
      MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD2_TITLE,
      MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD2_BODY,
    ),
  );
}

/** Managed Trade `#home-services-repeat` card 2 body. */
export function patchManagedTradeHomeServicesRepeatCard2Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatCard2Title(mainHtml);
}

/** Managed Trade `#home-services-repeat` card 3. */
export function patchManagedTradeHomeServicesRepeatCard3Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatSection(mainHtml, (section) =>
    patchManagedTradeRepeatAudienceCard(
      section,
      [
        [MANAGED_TRADE_REPEAT_CARD3_SOURCE_TITLE, MANAGED_TRADE_REPEAT_CARD3_SOURCE_BODY],
        [KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_TITLE, KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_BODY],
        ['See every shipment', 'One place to answer "where is my shipment?"'],
      ],
      MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD3_TITLE,
      MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD3_BODY,
    ),
  );
}

/** Managed Trade `#home-services-repeat` card 3 body. */
export function patchManagedTradeHomeServicesRepeatCard3Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesRepeatCard3Title(mainHtml);
}

/** Managed Trade `#home-services-repeat` — audience icons bound to Managed Trade card titles. */
export function patchManagedTradeHomeServicesRepeatCardIcons(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  let html = mainHtml;
  html = patchHubRepeatCardIconByTitle(
    html,
    MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD1_TITLE,
    ICON_USERS,
  );
  html = patchHubRepeatCardIconByTitle(
    html,
    MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD2_TITLE,
    ICON_SHIELD_CHECK,
  );
  html = patchHubRepeatCardIconByTitle(
    html,
    MANAGED_TRADE_HOME_SERVICES_REPEAT_CARD3_TITLE,
    ICON_LAYERS,
  );
  return html;
}

/** Managed Trade home-services card 1 title (KlearHub keeps “File your own customs”). */
export function patchManagedTradeHomeServicesCard1Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>File your own customs</h3>',
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Customs clearance in five countries</h3>',
    ),
  );
}

/** Managed Trade home-services card 1 eyebrow (KlearHub keeps country module list). */
export function patchManagedTradeHomeServicesCard1Label(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<span data-astro-cid-jg2u4s4c>CUSTOMS MODULES · US, CA, UK, NL, ES</span>',
      '<span data-astro-cid-jg2u4s4c>Managed Clearance</span>',
    ),
  );
}

/** Managed Trade home-services card 1 body (KlearHub keeps in-house filing copy). */
export function patchManagedTradeHomeServicesCard1Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>Run entries in-house: ISF, in-bond, delivery orders, and more.</p>',
      '<p data-astro-cid-jg2u4s4c>We run your customs end to end.</p>',
    ),
  );
}

/** Managed Trade home-services card 2 title (KlearHub keeps broker connectivity copy). */
export function patchManagedTradeHomeServicesCard2Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Work with the brokers you already have</h3>',
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Managed refund recovery</h3>',
    ),
  );
}

/** Managed Trade home-services card 2 body (KlearHub keeps broker view copy). */
export function patchManagedTradeHomeServicesCard2Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>Bring existing broker relationships into one view instead of replacing them.</p>',
      '<p data-astro-cid-jg2u4s4c>Get it right the first time, over 98% accurate document determination.</p>',
    ),
  );
}

/** Managed Trade home-services card 2 eyebrow (KlearHub keeps “BROKER CONNECTIVITY”). */
export function patchManagedTradeHomeServicesCard2Label(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<span data-astro-cid-jg2u4s4c>BROKER CONNECTIVITY</span>',
      '<span data-astro-cid-jg2u4s4c>Managed Post-Entry &amp; Refunds</span>',
    ),
  );
}

/** Managed Trade home-services card 3 title (KlearHub keeps track & trace copy). */
export function patchManagedTradeHomeServicesCard3Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>See every shipment</h3>',
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Connect your systems</h3>',
    ),
  );
}

/** Managed Trade home-services card 3 body (KlearHub keeps track & trace copy). */
export function patchManagedTradeHomeServicesCard3Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>One place to answer "where is my shipment?"</p>',
      '<p data-astro-cid-jg2u4s4c>We build and test your integrations.</p>',
    ),
  );
}

/** Managed Trade home-services card 3 eyebrow (KlearHub keeps “TRACK & TRACE”). */
export function patchManagedTradeHomeServicesCard3Label(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<span data-astro-cid-jg2u4s4c>TRACK &amp; TRACE</span>',
      '<span data-astro-cid-jg2u4s4c>Integration Services</span>',
    ),
  );
}

/** Managed Trade home-services card 4 title (KlearHub keeps analytics copy). */
export function patchManagedTradeHomeServicesCard4Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Turn history into decisions</h3>',
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Expert help on tap</h3>',
    ),
  );
}

/** Managed Trade home-services card 4 body (KlearHub keeps analytics copy). */
export function patchManagedTradeHomeServicesCard4Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>See duty spend and risk before it happens.</p>',
      '<p data-astro-cid-jg2u4s4c>Trade and compliance experts, on demand.</p>',
    ),
  );
}

/** Managed Trade home-services card 4 eyebrow (KlearHub keeps “ANALYTICS”). */
export function patchManagedTradeHomeServicesCard4Label(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<span data-astro-cid-jg2u4s4c>ANALYTICS</span>',
      '<span data-astro-cid-jg2u4s4c>Advisory Services &amp; Support</span>',
    ),
  );
}

/** Managed Trade home-services card 5 title (KlearHub keeps document retention copy). */
export function patchManagedTradeHomeServicesCard5Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Stay audit-ready</h3>',
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>A named team, not a queue</h3>',
    ),
  );
}

/** Managed Trade home-services card 5 body (KlearHub keeps retention copy). */
export function patchManagedTradeHomeServicesCard5Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>Retention aligned to recordkeeping requirements.</p>',
      '<p data-astro-cid-jg2u4s4c>The same people on your entries every day.</p>',
    ),
  );
}

/** Managed Trade home-services card 5 eyebrow (KlearHub keeps “DOCUMENT RETANTION”). */
export function patchManagedTradeHomeServicesCard5Label(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<span data-astro-cid-jg2u4s4c>DOCUMENT RETANTION</span>',
      '<span data-astro-cid-jg2u4s4c>Service Model · Dedicated Pod</span>',
    ),
  );
}

/** Managed Trade home-services card 6 eyebrow (KlearHub keeps “MASTER DATA · PARTS”). */
export function patchManagedTradeHomeServicesCard6Label(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<span data-astro-cid-jg2u4s4c>MASTER DATA · PARTS</span>',
      '<span data-astro-cid-jg2u4s4c>SOP Design &amp; Governance</span>',
    ),
  );
}

/** Managed Trade home-services card 6 title (KlearHub keeps parts library copy). */
export function patchManagedTradeHomeServicesCard6Title(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>One parts library</h3>',
      '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Your process, written down</h3>',
    ),
  );
}

/** Managed Trade home-services card 6 body (KlearHub keeps parts library copy). */
export function patchManagedTradeHomeServicesCard6Body(mainHtml: string): string {
  return patchManagedTradeHomeServicesSectionHeading(mainHtml, (section) =>
    section.replace(
      '<p data-astro-cid-jg2u4s4c>Consistent part data on every entry.</p>',
      '<p data-astro-cid-jg2u4s4c>Document how your entries get handled before we file one.</p>',
    ),
  );
}

/** Managed Trade `#home-services` — stroke icons matched to managed-service copy (not Hub module icons). */
export function patchManagedTradeHomeServicesCardIcons(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  const iconByTitle: readonly [string, string][] = [
    ['Customs clearance in five countries', ICON_GLOBE],
    ['Managed refund recovery', ICON_FILE_SEARCH],
    ['Connect your systems', ICON_LINK],
    ['Expert help on tap', ICON_MESSAGE],
    ['A named team, not a queue', ICON_USERS],
    ['Your process, written down', ICON_CLIPBOARD],
  ];

  let html = mainHtml;
  for (const [title, paths] of iconByTitle) {
    html = patchServiceChoiceIconByTitle(html, title, paths);
  }
  return html;
}

const MANAGED_TRADE_FOUNDATION_HEADING = 'The work does not scale with the team';

/** Rot / scope / repeat bands — KlearHub and Managed Trade after `#home-services`. */
function hasKlearHubProductBandsContext(mainHtml: string): boolean {
  return (
    mainHtml.includes(KLEAR_HUB_HERO_TITLE_FLAT) ||
    mainHtml.includes('customs operation runs on') ||
    mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING) ||
    mainHtml.includes(MANAGED_TRADE_HOME_SERVICES_TITLE)
  );
}

function hasKlearHubRotFoundationContext(mainHtml: string): boolean {
  return (
    mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING) ||
    mainHtml.includes(MANAGED_TRADE_FOUNDATION_HEADING) ||
    hasManagedTradeMigrationContentBand(mainHtml) ||
    mainHtml.includes('Empowers Freight Forwarders') ||
    mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)
  );
}
const MANAGED_TRADE_FOUNDATION_SUB =
  'Customs volume moves with sourcing decisions, tariff actions, and demand. Headcount moves with req approvals and a hiring market that has not been kind.';

/** Managed Trade foundation eyebrow (WordPress mirror “What Stays Measurable”). */
export function patchManagedTradeFoundationLabel(mainHtml: string): string {
  return mainHtml.replace(
    /<span class="label" data-astro-cid-6q4o4ab6>What Stays Measurable<\/span>/,
    '<span class="label" data-astro-cid-6q4o4ab6>Why teams hand it off</span>',
  );
}

/** Managed Trade foundation headline + sub (WordPress mirror “What You Can Still Prove…”). */
export function patchManagedTradeFoundationHeading(mainHtml: string): string {
  const subHtml = `<p class="foundation__sub" data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_SUB}</p>`;

  let out = mainHtml.replace(
    /<h2 class="foundation__heading"([^>]*)>What You Can Still Prove After the Move<\/h2>/,
    `<h2 class="foundation__heading"$1>${MANAGED_TRADE_FOUNDATION_HEADING}</h2>${subHtml}`,
  );

  out = out.replace(
    /(<h2 class="foundation__heading"[^>]*>The work does not scale with the team<\/h2>)(?!\s*<p class="foundation__sub")/,
    `$1${subHtml}`,
  );

  return out.replace(
    /(<h2 class="foundation__heading"[^>]*>The work does not scale with the team<\/h2>\s*)<p class="foundation__sub" data-astro-cid-6q4o4ab6>[\s\S]*?<\/p>/,
    `$1${subHtml}`,
  );
}

const MANAGED_TRADE_FOUNDATION_CARD1_TITLE = 'Customs talent is hard to hire';
const MANAGED_TRADE_FOUNDATION_CARD2_TITLE = 'Volume spikes do not warn you';
const MANAGED_TRADE_FOUNDATION_CARD3_TITLE = 'Coverage disappears when someone is out';

const MANAGED_TRADE_FOUNDATION_CARD1_BODY =
  'Licensed brokers are scarce, expensive, and take months to onboard. Your volume does not wait for a req to close.';

/** Managed Trade foundation card 1 title. */
export function patchManagedTradeFoundationCard1Title(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>Rankings tracked through the switch<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_CARD1_TITLE}</h3>`,
  );
}

/** Managed Trade foundation card 1 body. */
export function patchManagedTradeFoundationCard1Body(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_CARD1_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>The old site stays live until the new one is proven, and rankings are tracked through the switch rather than checked after the fact\. If a page moves, you know which one and why\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_CARD1_BODY}</p>`,
  );
}

const MANAGED_TRADE_FOUNDATION_CARD2_BODY =
  'A sourcing change or a new tariff action can double your entry count in a week. A team cannot flex that fast.';

/** Managed Trade foundation card 2 title. */
export function patchManagedTradeFoundationCard2Title(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>Before-and-after comparisons that hold<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_CARD2_TITLE}</h3>`,
  );
}

/** Managed Trade foundation card 2 body. */
export function patchManagedTradeFoundationCard2Body(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_CARD2_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Goals, events and historical data carry over, so the first report after launch compares like with like instead of starting from a blank dashboard\. The question of whether the migration hurt gets a numbered answer\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_CARD2_BODY}</p>`,
  );
}

const MANAGED_TRADE_FOUNDATION_CARD3_BODY =
  'One person on leave, and the entries only they understood sit until they are back.';

/** Managed Trade foundation card 3 title. */
export function patchManagedTradeFoundationCard3Title(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-6q4o4ab6>AI citations counted from launch day<\/h3>/,
    `<h3 data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_CARD3_TITLE}</h3>`,
  );
}

/** Managed Trade foundation card 3 body. */
export function patchManagedTradeFoundationCard3Body(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_CARD3_TITLE)) return mainHtml;

  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>The same monthly citation checks we run for every client start the day the new site goes live, so visibility in AI answers is measured from the first month rather than assumed\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${MANAGED_TRADE_FOUNDATION_CARD3_BODY}</p>`,
  );
}

export function patchKlearHubSvcHeroSub(mainHtml: string): string {
  const sub =
    'Entries, corrections, tracking, and refund audits in one place, built on the data KlearData already structured. Buy the platform or the modules you need.';
  return mainHtml.replace(
    /<p class="svc-hero__sub"[^>]*>Your website should move at the speed of your pipeline, not your engineering backlog\.[\s\S]*?<\/p>/,
    `<p class="svc-hero__sub" data-astro-cid-asdozulm>${sub}</p>`,
  );
}

/** KlearHub: drop fourth Legency foundation card (“Named Team”). */
export function removeKlearHubFoundationNamedTeamCard(mainHtml: string): string {
  return mainHtml.replace(
    /<article class="found-card"[^>]*>[\s\S]*?<h3[^>]*>A Named Team That Already Knows Your Site<\/h3>[\s\S]*?<\/article>/,
    '',
  );
}

export function removeKlearDataSvcHeroProof(mainHtml: string): string {
  return mainHtml.replace(
    /<p class="svc-hero__proof"[^>]*>[\s\S]*?<\/p>\s*/,
    '',
  );
}

export function patchKlearDataFoundationLabel(mainHtml: string): string {
  return mainHtml.replace(
    /(<span class="label"[^>]*>)What the Build Carries(<\/span>)/,
    '$1Before anything else works$2',
  );
}

const KLEAR_DATA_FOUNDATION_HEADING = 'The data has to be right first';
const KLEAR_DATA_FOUNDATION_SUB =
  'Every downstream problem in customs starts as a data problem. You cannot validate an entry, forecast a duty bill, or answer an audit against fields nobody trusts.';

const KLEAR_HUB_FOUNDATION_HEADING = 'Your customs operation is spread across multiple systems';
const KLEAR_HUB_FOUNDATION_SUB =
  'Filing happens in one place, tracking in another, records in a third, and the answer to any real question lives in somebody’s inbox.';

function klearHubHasInsertedFoundation(mainHtml: string): boolean {
  return (
    mainHtml.includes(KLEAR_DATA_FOUNDATION_HEADING) ||
    mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)
  );
}

export function patchKlearDataFoundationHeading(mainHtml: string): string {
  const subHtml = `<p class="foundation__sub" data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_SUB}</p>`;

  let out = mainHtml.replace(
    /(<h2 class="foundation__heading"[^>]*>)(?:What an Enterprise Build Buys Marketing|The data has to be right first)(<\/h2>)(?:\s*<p class="foundation__sub"[^>]*>[\s\S]*?<\/p>)?/,
    `$1${KLEAR_DATA_FOUNDATION_HEADING}$2${subHtml}`,
  );

  return out.replace(
    /<p class="foundation__sub"[^>]*>[\s\S]*?<\/p>/,
    subHtml,
  );
}

export function patchKlearDataFoundationCard1Title(mainHtml: string): string {
  return mainHtml.replace(
    /(<article class="found-card"[^>]*>[\s\S]*?<h3[^>]*>)A Site Your Team Runs Without a Developer(<\/h3>)/,
    '$1Your documents arrive in fifty formats$2',
  );
}

const KLEAR_DATA_FOUNDATION_CARD1_BODY =
  'Invoices, packing lists, ISF data, and broker emails land from parties who see them before you do, in whatever format they choose.';

export function patchKlearDataFoundationCard1Body(mainHtml: string): string {
  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Every page assembles from a library of tested components, so your marketing team publishes new pages and changes layouts in minutes\. The design system keeps each one on brand, and the site takes on no technical debt as it grows\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD1_BODY}</p>`,
  );
}

export function patchKlearDataFoundationCard2Title(mainHtml: string): string {
  return mainHtml.replace(
    /(<h3[^>]*>)A Migration That Keeps the Rankings You Earned(<\/h3>)/,
    '$1Someone keys it in by hand$2',
  );
}

const KLEAR_DATA_FOUNDATION_CARD2_BODY =
  'Re-typing the same fields into portals and spreadsheets is where the hours go, and where the errors start.';

export function patchKlearDataFoundationCard2Body(mainHtml: string): string {
  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Moving to Webflow Enterprise is a rebuild done properly: content audited, templates rebuilt as components, every URL mapped to its new home\. The old site stays live until the new one is proven, and rankings are watched through cutover\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD2_BODY}</p>`,
  );
}

export function patchKlearDataFoundationCard3Title(mainHtml: string): string {
  return mainHtml.replace(
    /(<h3[^>]*>)A Build Whoever Comes Next Can Run(<\/h3>)/,
    '$1The mistake surfaces at audit$2',
  );
}

const KLEAR_DATA_FOUNDATION_CARD3_BODY =
  'A wrong value or a missing document shows up months later, when correcting it costs the most.';

export function patchKlearDataFoundationCard3Body(mainHtml: string): string {
  return mainHtml.replace(
    /<p data-astro-cid-6q4o4ab6>Every build ships with documentation, naming standards and role-based permissions\. A new hire finds their way around in a day, the system stays clean long after launch, and that includes handover away from us\.<\/p>/,
    `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD3_BODY}</p>`,
  );
}

const KLEAR_DATA_DP_BUDGET_SUB =
  'KlearData is the foundation. What happens after extraction is your call, and you can change your mind later without changing systems.';

const KLEAR_HUB_DP_LABEL = 'Where it fits';
const KLEAR_HUB_DP_SUB =
  'KlearHub sits on the data KlearData structures. If you would rather not run it at all, the same platform can be operated for you.';

const KLEAR_CLOSING_DP_HEADING_DEFAULT = 'File it yourself, or hand it off';
const KLEAR_HUB_CLOSING_DP_HEADING = 'The layer above, and the option below';

const MANAGED_TRADE_CLOSING_DP_HEADING = 'The same platform, whoever is driving';
const MANAGED_TRADE_CLOSING_DP_SUB =
  'Managed Trade is not a separate product. It is KlearData and KlearHub with our team on the controls, so moving between models does not mean changing systems.';

/** KlearData: replace remaining “Budget” dp eyebrow. */
export function patchKlearDataDpBudgetLabel(mainHtml: string): string {
  const subHtml = `<p class="dp__sub" data-astro-cid-biwego7o>${KLEAR_DATA_DP_BUDGET_SUB}</p>`;
  let html = mainHtml.replace(
    /<span class="label" data-astro-cid-biwego7o>Budget<\/span>(?=<h2 class="dp__heading" data-astro-cid-biwego7o>What Webflow for Enterprise Costs<\/h2>)/,
    '<span class="label" data-astro-cid-biwego7o>Where the data goes next</span>',
  );
  html = html.replace(
    /<h2 class="dp__heading" data-astro-cid-biwego7o>What Webflow for Enterprise Costs<\/h2>/,
    '<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off</h2>',
  );
  html = html.replace(
    /<span class="label" data-astro-cid-biwego7o>How it works<\/span><h2 class="dp__heading" data-astro-cid-biwego7o>Three steps, none of them yours<\/h2>/,
    '<span class="label" data-astro-cid-biwego7o>Where the data goes next</span><h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off</h2>',
  );
  html = html.replace(
    /<p class="dp__sub" data-astro-cid-biwego7o>A budget you can defend to finance has three separate lines\. Webflow's pricing page sends Enterprise buyers to its sales team for a custom quote, and it publishes no universal Enterprise price\.<\/p>/,
    '',
  );
  html = html.replace(
    /(<span class="label" data-astro-cid-biwego7o>(?:How it works|Where the data goes next)<\/span><h2 class="dp__heading" data-astro-cid-biwego7o>)(?:File it yourself, or hand it off|Three steps, none of them yours)(<\/h2>)(?!<p class="dp__sub")/,
    `<span class="label" data-astro-cid-biwego7o>Where the data goes next</span><h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off$2${subHtml}`,
  );
  html = html.replace(
    /<span class="label" data-astro-cid-biwego7o>How it works<\/span>(?=<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself)/,
    '<span class="label" data-astro-cid-biwego7o>Where the data goes next</span>',
  );
  html = html.replace(
    /<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off<\/h2>(?!<p class="dp__sub")/,
    `<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off</h2>${subHtml}`,
  );
  html = html.replace(
    /<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off<\/h2><p class="dp__sub" data-astro-cid-biwego7o><\/p>/,
    `<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off</h2>${subHtml}`,
  );
  return html;
}

/** KlearData: drop Legency Webflow pricing footnote under budget dp cards. */
export function removeKlearDataDpFoot(mainHtml: string): string {
  return mainHtml.replace(/<p class="dp__foot" data-astro-cid-biwego7o>[\s\S]*?<\/p>/, '');
}

/** KlearData: drop third Legency budget card (support / measurement). */
export function removeKlearDataDpBudgetCard3(mainHtml: string): string {
  return mainHtml.replace(
    /<article class="dp__card" data-astro-cid-biwego7o><h3 data-astro-cid-biwego7o>Support and measurement are agreed before launch<\/h3><p data-astro-cid-biwego7o>The agreement names the work, the capacity, the response windows and the reporting cadence after launch\. The ongoing cost then sits beside the initial proposal when the board reviews the spend\.<\/p><\/article>/,
    '',
  );
}

const KLEAR_DATA_DP_BUDGET_CARD_NEEDLE = 'Webflow quotes the platform contract';

/** KlearData: swap Legency budget dp cards for Self Filers service-choice row. */
export function replaceKlearDataDpBudgetCardsWithServiceChoices(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_DATA_DP_BUDGET_CARD_NEEDLE)) return mainHtml;

  const marker = '<div class="container dp__cards dp__cards--three"';
  let searchFrom = 0;

  while (searchFrom < mainHtml.length) {
    const start = mainHtml.indexOf(marker, searchFrom);
    if (start === -1) return mainHtml;

    let depth = 0;
    let i = start;
    let end = -1;
    while (i < mainHtml.length) {
      const nextOpen = mainHtml.indexOf('<div', i);
      const nextClose = mainHtml.indexOf('</div>', i);
      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        i = nextOpen + 4;
        continue;
      }

      depth -= 1;
      i = nextClose + 6;
      if (depth === 0) {
        end = i;
        break;
      }
    }

    if (end === -1) return mainHtml;
    const block = mainHtml.slice(start, end);
    if (block.includes(KLEAR_DATA_DP_BUDGET_CARD_NEEDLE)) {
      return mainHtml.slice(0, start) + klearDataDpServiceChoices + mainHtml.slice(end);
    }

    searchFrom = end;
  }

  return mainHtml;
}

/** KlearData: fee steps band — above “How it works” (dp--alt). Placeholder copy from retainer page. */
export function insertKlearDataFeeBeforeDpAlt(mainHtml: string): string {
  if (mainHtml.includes('klear-data-fee-band')) return mainHtml;

  const marker = '<section class="section dp dp--alt"';
  const idx = mainHtml.indexOf(marker);
  if (idx === -1) return mainHtml;

  return mainHtml.slice(0, idx) + klearDataFeeSection + mainHtml.slice(idx);
}

/** KlearData: dp--alt — drop duplicate head (lives on fee band above). */
export function patchKlearDataDpAltHead(mainHtml: string): string {
  return mainHtml.replace(
    /(<section class="section dp dp--alt" data-astro-cid-biwego7o>)<div class="container dp__head" data-astro-cid-biwego7o>[\s\S]*?<\/div>/,
    '$1',
  );
}

/** KlearData: remove dp--alt three-card row (replaced by fee steps band). */
export function removeKlearDataDpAltSection(mainHtml: string): string {
  const marker = '<section class="section dp dp--alt"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

/** KlearData: Honest Limits dp--alt card 1 title. */
export function patchKlearDataDpAltCard1Title(mainHtml: string): string {
  let html = mainHtml.replace(
    /<h3 data-astro-cid-biwego7o>Deep application logic<\/h3>/,
    '<h3 data-astro-cid-biwego7o>Copy KlearData into your email threads</h3>',
  );
  html = html.replace(
    /<p data-astro-cid-biwego7o>Anything that is really software wearing a website's clothes: account areas, complex permissions, heavy transactional flows\. Those belong in an application, with Webflow doing the marketing site beside it\.<\/p>/,
    '<p data-astro-cid-biwego7o>No uploads, no portal to log into, no integration project to schedule. Documents arrive the way they already arrive.</p>',
  );
  return html;
}

/** KlearData: Honest Limits dp--alt card 2 title. */
export function patchKlearDataDpAltCard2Title(mainHtml: string): string {
  let html = mainHtml.replace(
    /<h3 data-astro-cid-biwego7o>Very large structured catalogues<\/h3>/,
    '<h3 data-astro-cid-biwego7o>Every document is read, classified, and extracted</h3>',
  );
  html = html.replace(
    /<p data-astro-cid-biwego7o>CMS collection limits arrive sooner than people expect on large product or location estates\. Better to model that honestly at the start than to discover the ceiling mid-build\.<\/p>/,
    '<p data-astro-cid-biwego7o>Your business rules run as each one lands, so restriction checks, address validation, and party screening happen before review.</p>',
  );
  return html;
}

/** KlearData: Honest Limits dp--alt card 3 title and body. */
export function patchKlearDataDpAltCard3Title(mainHtml: string): string {
  let html = mainHtml.replace(
    /<h3 data-astro-cid-biwego7o>Teams that will not own it<\/h3>/,
    '<h3 data-astro-cid-biwego7o>Clean data flows where you need it</h3>',
  );
  html = html.replace(
    /<p data-astro-cid-biwego7o>Webflow's advantage is that marketing can publish\. If nobody on the team is going to touch it, the main benefit is gone and the decision should be made on other grounds\.<\/p>/,
    "<p data-astro-cid-biwego7o>Into KlearHub for your team to file, or to KlearNow's licensed brokers who file for you. Same data either way.</p>",
  );
  return html;
}

/** KlearData: Honest Limits dp--alt — step numbers above each card title. */
export function insertKlearDataDpAltCardNumbers(mainHtml: string): string {
  const marker = '<section class="section dp dp--alt"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;
  const sectionEnd = mainHtml.indexOf('</section>', start);
  if (sectionEnd === -1) return mainHtml;

  const nums = ['01', '02', '03'];
  let i = 0;
  const section = mainHtml.slice(start, sectionEnd).replace(
    /<article class="dp__card" data-astro-cid-biwego7o>/g,
    (articleOpen) => {
      if (i >= nums.length) return articleOpen;
      const num = nums[i++];
      return `${articleOpen}<span class="dp__num" data-astro-cid-biwego7o aria-hidden="true">${num}</span>`;
    },
  );

  return mainHtml.slice(0, start) + section + mainHtml.slice(sectionEnd);
}

/** KlearData page: drop first Legency “What Enterprise Means Here” dp block. */
export function removeKlearDataEnterpriseDpSection(mainHtml: string): string {
  const marker = 'What Enterprise Means Here';
  let pos = 0;

  while (pos < mainHtml.length) {
    const start = mainHtml.indexOf('<section class="section dp"', pos);
    if (start === -1) break;

    const end = indexOfSectionEnd(mainHtml, start);
    if (end === -1) break;

    const chunk = mainHtml.slice(start, end);
    if (chunk.includes(marker)) {
      return mainHtml.slice(0, start) + mainHtml.slice(end);
    }

    pos = end;
  }

  return mainHtml;
}

/** KlearData page: drop Legency “Before and After” evo block. */
export function removeKlearDataEvoSection(mainHtml: string): string {
  const marker = '<section class="section evo"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

const CUSTOM_BROKERS_EVO_HEADING_NEEDLES = [
  'Why Most Technical Audits Change Nothing',
  'What an AEO Engagement Has to Prove',
] as const;

/** Custom Brokers — drop all Legency `section.evo` bands (AEO + technical SEO mirrors). */
export function removeCustomBrokersEvoSections(mainHtml: string): string {
  let html = mainHtml;

  for (const needle of CUSTOM_BROKERS_EVO_HEADING_NEEDLES) {
    while (html.includes(needle)) {
      const next = removeSectionContaining(html, '<section class="section evo"', needle);
      if (next === html) break;
      html = next;
    }
  }

  let guard = 0;
  while (html.includes('<section class="section evo"') && guard < 4) {
    const next = removeKlearDataEvoSection(html);
    if (next === html) break;
    html = next;
    guard += 1;
  }

  return html;
}

/** Operation TYpe pages: drop Legency `section.evo` compare bands (technical SEO + AEO mirrors). */
export const removeKlearOperationEvoSections = removeCustomBrokersEvoSections;

export function patchKlearDataSvcHeroCta(mainHtml: string): string {
  return patchKlearSvcHeroCta(mainHtml);
}

/** KlearHub svc-hero primary CTA (mirrors KlearData). */
export const patchKlearHubSvcHeroCta = patchKlearDataSvcHeroCta;

const KLEAR_DATA_CASEBAND_HEADING_LINES = [
  'Post Entry Audit Finds',
  '$1.7M in Duty Overcharges Hidden by Tariff Stacking',
] as const;

function klearDataCasebandHeadingHtml(): string {
  return KLEAR_DATA_CASEBAND_HEADING_LINES.map(
    (line) =>
      `<h2 class="caseband__heading" data-astro-cid-od6mpv6f data-no-roll>${line}</h2>`,
  ).join('');
}

export function patchKlearDataCasebandHeading(mainHtml: string): string {
  const headings = klearDataCasebandHeadingHtml();
  let html = mainHtml.replace(
    /<h2 class="caseband__heading"[^>]*>One build, carried through a funding round and a rebrand\.<\/h2>/,
    headings,
  );
  // Repair markup broken when “$1.7M” was parsed as a replace() capture reference.
  html = html.replace(
    /<h2 class="caseband__heading"[^>]*>Post Entry Audit Finds <h2 class="caseband__heading"[^>]*>\.7M in Duty Overcharges Hidden by Tariff Stacking<\/h2>/,
    headings,
  );
  html = html.replace(
    /<h2 class="caseband__heading"[^>]*>Post Entry Audit Finds \$1\.7M in Duty Overcharges Hidden by Tariff Stacking<\/h2>/,
    headings,
  );
  return html;
}

export const KLEAR_POST_ENTRY_AUDIT_CASE_SUMMARY =
  "KlearNow's Post Entry Audit software reconciled 10,246 customs entries, flagged 128 hidden stacking overcharges, and turned $1,723,490.03 in invisible overpayments into filing-ready recovery.";

const KLEAR_DATA_CASEBAND_TEXT = KLEAR_POST_ENTRY_AUDIT_CASE_SUMMARY;

export function patchKlearDataCasebandText(mainHtml: string): string {
  return mainHtml.replace(
    /<p class="caseband__text"[^>]*>Blueflame’s marketing team publishes on a component library we built once and have extended since\. The same build carried the company through a funding round, an acquisition and a rebrand, and organic search now brings more demo requests than paid\.<\/p>/,
    `<p class="caseband__text" data-astro-cid-od6mpv6f>${KLEAR_DATA_CASEBAND_TEXT}</p>`,
  );
}

/** Case study band — drop Legency client logo chip (Blueflame). */
export function removeKlearDataCasebandChip(mainHtml: string): string {
  return mainHtml.replace(
    /<span class="caseband__chip"[^>]*>[\s\S]*?<\/span>\s*/,
    '',
  );
}

/** CRO “Five Leaks” section — after foundation (“Before anything else works”). */
export function insertKlearDataLeaksAfterFoundation(mainHtml: string): string {
  if (mainHtml.includes('class="section leaks"')) return mainHtml;

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, foundationStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataLeaksSection + mainHtml.slice(insertAt);
}

const CAREERS_JOIN_BLOCK_MARKER =
  '<div class="klear-careers__block" data-astro-cid-careers>\n' +
  '<h2 class="klear-careers__heading" data-astro-cid-careers>Ready to join us?</h2>';

/** Careers: copy KlearData “How it works” leaks accordion before “Ready to join us?”. */
export function insertCareersLeaksBeforeJoin(mainHtml: string): string {
  if (mainHtml.includes('class="section leaks"')) return mainHtml;

  const joinStart = mainHtml.indexOf(CAREERS_JOIN_BLOCK_MARKER);
  if (joinStart === -1) return mainHtml;

  const joinSectionOpen =
    `<section class="section legal klear-careers klear-careers--join" data-astro-cid-careers>` +
    `<div class="container" data-astro-cid-careers>`;

  const leaks = klearDataLeaksSection
    .replace(
      /(<span class="label"[^>]*>)How it works(<\/span>)/,
      '$1Why work at KlearNow$2',
    )
    .replace(
      /(<h2 class="leaks__heading"[^>]*>)Six steps to filing-ready data(<\/h2>)/,
      '$1<span class="leaks__heading-line">KlearNow is an equal opportunity employer</span><span class="leaks__heading-line">committed to diversity and inclusion.</span>$2',
    )
    .replace(/<p class="leaks__sub"[^>]*>[\s\S]*?<\/p>/, '')
    .replace(
      /(<span class="leaks__q-text"[^>]*>)Data capture(<\/span>)/,
      '$1We invest in our people$2',
    )
    .replace(
      /(<div class="leaks__panel-inner"[^>]*>)<p([^>]*)>Ingest emails, PDFs, EDI feeds, and portal exports to collect every field required for an entry\.<\/p>/,
      '$1<p$2>We invest in our people: We invest in the latest tools—AmpUp, HubSpot, LinkedIn Sales Navigator, BambooHR, ThoughtSpot—and train our teams to use them effectively. We support continuous learning and career growth for everyone, helping us deliver the competitive edge our customers expect.</p>',
    )
    .replace(
      /(<span class="leaks__q-text"[^>]*>)Multi-Agent extraction(<\/span>)/,
      '$1Our work is critical$2',
    )
    .replace(
      /Document training, and agentic feedback loops\./,
      'At KlearNow, we create software that clears borders. We’re experts in trade compliance, supply chains, and global logistics–by air, ocean, rail, truck, or intermodal. We aim to simplify international trade for all our customers.',
    )
    .replace(
      /(<span class="leaks__q-text"[^>]*>)LCB knowledge built in(<\/span>)/,
      '$1We are growing$2',
    )
    .replace(
      /Access to preprocessing exception management constructed by licensed brokers\./,
      'Since launching in 2018, our founders Sam, Rick, and Ulf have led us through consistent 3x annual growth. We’ve scaled organically by delivering unmatched service and technology. Today we’re a trusted advisor to Fortune 100 companies and backed by top VC firms including Kayne Capital, Autotech Ventures, GPV, Montevista Capital, and Argean Capital.',
    )
    .replace(
      /(<span class="leaks__q-text"[^>]*>)Integrate your rules(<\/span>)/,
      '$1We love what we do.$2',
    )
    .replace(
      /SOP business rules, audit rules, components set up by agentic agents\./,
      'We solve real-time puzzles every day.<br><br>Each customer brings unique challenges and that’s part of the thrill. Tariff volatility had made speed and precision more critical than ever. Getting the details fast has real-world impact. When we simplify complexity, remove roadblocks, and reduce risk, our customers win and so do we.',
    )
    .replace(/(<ol class="leaks__list"[^>]*>)([\s\S]*?)(<\/ol>)/, (_m, open, body, close) => {
      const kept = [...String(body).matchAll(/<li class="leaks__item"[\s\S]*?<\/li>/g)]
        .map((match) => match[0])
        .filter((li) => !/>0[56]<\/span>/.test(li))
        .join('');
      return open + kept + close;
    });

  return (
    mainHtml.slice(0, joinStart) +
    `</div></section>` +
    leaks +
    joinSectionOpen +
    mainHtml.slice(joinStart)
  );
}

const KLEAR_HUB_LEAKS_HEADING = 'The KlearHub Data Advantage';
const KLEAR_HUB_LEAKS_STEP1_TITLE = 'Tariff “What-If” Modelling';
const KLEAR_HUB_LEAKS_STEP1_BODY =
  'Run instant simulations on tariff impacts, see landed-costs, and adjust sourcing or pricing before new rates hit.';
const KLEAR_HUB_LEAKS_STEP2_TITLE = 'Cross-Broker Visibility';
const KLEAR_HUB_LEAKS_STEP2_BODY =
  'See clearance speed, exceptions, and fees for every broker in one dashboard, so you can spot issues early and keep freight moving.';
const KLEAR_HUB_LEAKS_STEP3_TITLE = 'Duty & Bond Forecasting';
const KLEAR_HUB_LEAKS_STEP4_TITLE = 'Consolidates Customs Data';
const KLEAR_HUB_LEAKS_STEP4_BODY =
  'From every partner and country into one interactive dashboard, so you can track filings, spot exceptions, and stay audit-ready without the back-and-forth.';
const KLEAR_HUB_LEAKS_STEP5_TITLE = 'Ideal for Multinationals';
const KLEAR_HUB_LEAKS_STEP5_BODY =
  'Shippers, freight forwarders, and customs house brokers who manage a high volume of global shipments and require a scalable solution for trade data management.';
const KLEAR_HUB_LEAKS_STEP3_BODY =
  'Forecast duty spend and bond sufficiency weeks ahead with live data, so finance secures cash and avoids clearance delays.';

function klearHubLeaksHeadHtml(): string {
  return `<div class="leaks__head" data-astro-cid-kn3eqkos><h2 class="leaks__heading" data-no-roll data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_HEADING}</h2></div>`;
}

/** KlearHub leaks band — section intro above the accordion (Hub-specific copy). */
export function patchKlearHubLeaksHead(mainHtml: string): string {
  if (!mainHtml.includes('The software your customs operation runs on')) return mainHtml;
  if (!mainHtml.includes('class="section leaks"')) return mainHtml;

  const headBlock = klearHubLeaksHeadHtml();
  if (mainHtml.includes('leaks__head')) {
    return mainHtml.replace(/<div class="leaks__head" data-astro-cid-kn3eqkos>[\s\S]*?<\/div>/, headBlock);
  }

  return mainHtml.replace(
    /(<section class="section leaks" data-astro-cid-kn3eqkos><div class="container" data-astro-cid-kn3eqkos>)/,
    `$1${headBlock}`,
  );
}

function hasKlearHubLeaksBand(mainHtml: string): boolean {
  return (
    hasKlearHubProductBandsContext(mainHtml) &&
    mainHtml.includes('class="section leaks"') &&
    mainHtml.includes(KLEAR_HUB_LEAKS_HEADING)
  );
}

/** KlearHub leaks accordion — step 01 (Hub story; KlearData keeps data-capture copy). */
export function patchKlearHubLeaksStep1(mainHtml: string): string {
  if (!hasKlearHubLeaksBand(mainHtml)) return mainHtml;

  let html = mainHtml.replace(
    '<span class="leaks__q-text" data-astro-cid-kn3eqkos>Data capture</span>',
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP1_TITLE}</span>`,
  );
  html = html.replace(
    '<p data-astro-cid-kn3eqkos>Ingest emails, PDFs, EDI feeds, and portal exports to collect every field required for an entry.</p>',
    `<p data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP1_BODY}</p>`,
  );
  return html;
}

/** KlearHub leaks accordion — step 02 title. */
export function patchKlearHubLeaksStep2(mainHtml: string): string {
  if (!hasKlearHubLeaksBand(mainHtml)) return mainHtml;

  let html = mainHtml.replace(
    '<span class="leaks__q-text" data-astro-cid-kn3eqkos>Multi-Agent extraction</span>',
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP2_TITLE}</span>`,
  );
  html = html.replace(
    '<p data-astro-cid-kn3eqkos>Document training, and agentic feedback loops.</p>',
    `<p data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP2_BODY}</p>`,
  );
  return html;
}

/** KlearHub leaks accordion — step 03 title + panel. */
export function patchKlearHubLeaksStep3(mainHtml: string): string {
  if (!hasKlearHubLeaksBand(mainHtml)) return mainHtml;

  let html = mainHtml.replace(
    '<span class="leaks__q-text" data-astro-cid-kn3eqkos>LCB knowledge built in</span>',
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP3_TITLE}</span>`,
  );
  html = html.replace(
    '<p data-astro-cid-kn3eqkos>Access to preprocessing exception management constructed by licensed brokers.</p>',
    `<p data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP3_BODY}</p>`,
  );
  return html;
}

/** KlearHub leaks accordion — step 04 title. */
export function patchKlearHubLeaksStep4(mainHtml: string): string {
  if (!hasKlearHubLeaksBand(mainHtml)) return mainHtml;

  let html = mainHtml.replace(
    '<span class="leaks__q-text" data-astro-cid-kn3eqkos>Integrate your rules</span>',
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP4_TITLE}</span>`,
  );
  html = html.replace(
    '<p data-astro-cid-kn3eqkos>SOP business rules, audit rules, components set up by agentic agents.</p>',
    `<p data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP4_BODY}</p>`,
  );
  return html;
}

/** KlearHub leaks accordion — step 05 title. */
export function patchKlearHubLeaksStep5(mainHtml: string): string {
  if (!hasKlearHubLeaksBand(mainHtml)) return mainHtml;

  let html = mainHtml.replace(
    '<span class="leaks__q-text" data-astro-cid-kn3eqkos>File Ready Rules</span>',
    `<span class="leaks__q-text" data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP5_TITLE}</span>`,
  );
  html = html.replace(
    '<p data-astro-cid-kn3eqkos>Filing-ready output, inbound &amp; outbound · data sharing included.</p>',
    `<p data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_STEP5_BODY}</p>`,
  );
  return html;
}

/** KlearHub leaks accordion — drop step 06 (KlearData keeps full six-step list). */
export function removeKlearHubLeaksStep6(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('class="section leaks"')) return mainHtml;

  return mainHtml.replace(/<li class="leaks__item"[^>]*>[\s\S]*?<\/li>/g, (block) =>
    /<span class="leaks__num"[^>]*>\s*06\s*<\/span>/.test(block) ? '' : block,
  );
}

/** KlearHub leaks band — drop “How it works” eyebrow (KlearData keeps it). */
export function removeKlearHubLeaksLabel(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('class="section leaks"')) return mainHtml;

  return mainHtml.replace(
    /<span class="label" data-astro-cid-kn3eqkos>How it works<\/span>\s*/,
    '',
  );
}

/** KlearHub leaks band — drop intro sub (KlearData keeps it). */
export function removeKlearHubLeaksSub(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('class="section leaks"')) return mainHtml;

  return mainHtml.replace(
    /<p class="leaks__sub" data-astro-cid-kn3eqkos>[\s\S]*?<\/p>\s*/,
    '',
  );
}

/** KlearHub leaks band heading (KlearData keeps “Six steps to filing-ready data”). */
export function patchKlearHubLeaksHeading(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('class="section leaks"')) return mainHtml;

  return mainHtml.replace(
    '<h2 class="leaks__heading" data-no-roll data-astro-cid-kn3eqkos>Six steps to filing-ready data</h2>',
    `<h2 class="leaks__heading" data-no-roll data-astro-cid-kn3eqkos>${KLEAR_HUB_LEAKS_HEADING}</h2>`,
  );
}

/** KlearHub: same leaks accordion as KlearData — immediately before closing “Where it fits” dp band. */
export function insertKlearHubLeaksBeforeDp(mainHtml: string): string {
  return insertKlearHubLeaksAfterOperatingProblem(mainHtml);
}

/** KlearHub: KlearData leaks accordion (`section.leaks`) after `#home-services-repeat` (“The operating problem”). */
export function insertKlearHubLeaksAfterOperatingProblem(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('class="section leaks"')) return mainHtml;
  if (!mainHtml.includes(`id="${KLEAR_HUB_HOME_SERVICES_REPEAT_ID}"`)) return mainHtml;

  const repeatId = mainHtml.indexOf(`id="${KLEAR_HUB_HOME_SERVICES_REPEAT_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, sectionStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataLeaksSection + mainHtml.slice(insertAt);
}

/** Home “FROM THE ENTRY LINE” cards — after “How it works?” leaks on KlearData. */
export function insertKlearDataEntryLineAfterLeaks(mainHtml: string): string {
  if (mainHtml.includes('id="home-services"')) return mainHtml;

  const leaksStart = mainHtml.indexOf('<section class="section leaks"');
  if (leaksStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, leaksStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataEntryLineSection + mainHtml.slice(insertAt);
}

/** “Before You Buy Either” tool vs agency band — after What it does on KlearData. */
export function insertKlearDataVsAfterEntryLine(mainHtml: string): string {
  if (mainHtml.includes(KLEAR_DATA_TWO_CARD_VS_MARKER)) return mainHtml;

  const servicesId = mainHtml.indexOf('id="home-services"');
  if (servicesId === -1) return mainHtml;

  const sectionStart = mainHtml.lastIndexOf('<section', servicesId);
  if (sectionStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, sectionStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataVsSection + mainHtml.slice(insertAt);
}

/** KlearData page: drop Legency “Talk to the People Who Will Build It” CTA band. */
export function removeKlearDataCtabandSection(mainHtml: string): string {
  const marker = '<section class="ctaband"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  const end = indexOfSectionEnd(mainHtml, start);
  if (end === -1) return mainHtml;

  return mainHtml.slice(0, start) + mainHtml.slice(end);
}

/** KlearData page: drop Legency Webflow FAQ block. */
export function removeKlearDataFaqSection(mainHtml: string): string {
  const marker = '<section class="section faq"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

function sliceSectionAt(mainHtml: string, start: number): string | null {
  const end = indexOfSectionEnd(mainHtml, start);
  if (end === -1) return null;
  return mainHtml.slice(start, end);
}

function extractSectionContaining(
  mainHtml: string,
  sectionOpen: string,
  needle: string,
): string | null {
  let pos = 0;
  while (pos < mainHtml.length) {
    const start = mainHtml.indexOf(sectionOpen, pos);
    if (start === -1) return null;
    const section = sliceSectionAt(mainHtml, start);
    if (!section) return null;
    if (section.includes(needle)) return section;
    pos = start + sectionOpen.length;
  }
  return null;
}

function removeSectionContaining(
  mainHtml: string,
  sectionOpen: string,
  needle: string,
): string {
  let pos = 0;
  while (pos < mainHtml.length) {
    const start = mainHtml.indexOf(sectionOpen, pos);
    if (start === -1) return mainHtml;
    const section = sliceSectionAt(mainHtml, start);
    if (!section) return mainHtml;
    if (section.includes(needle)) {
      const end = indexOfSectionEnd(mainHtml, start);
      if (end === -1) return mainHtml;
      return mainHtml.slice(0, start) + mainHtml.slice(end);
    }
    pos = start + sectionOpen.length;
  }
  return mainHtml;
}

/** KlearHub: drop Legency “Built From Your Components” build band. */
export function removeKlearHubBuildSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section build"',
    'Built From Your Components',
  );
}

/** KlearHub: drop Legency “The Monthly Record” shape band. */
export function removeKlearHubShapeSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section shape"',
    'The Monthly Record',
  );
}

/** KlearHub rot headline (Legency mirror keeps “Support Is What Stops the Rebuild in Year Two”). */
export function patchKlearHubRotHeading(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>Support Is What Stops the Rebuild in Year Two</h2>',
    '<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>One system, multiple countries</h2>',
  );
}

/** Remove a single div block starting at `marker` (e.g. `<div class="scope__grid"`). */
function removeDivBlock(mainHtml: string, marker: string): string {
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<div', i);
    const close = mainHtml.indexOf('</div>', i);
    if (close === -1) break;
    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 4;
      continue;
    }
    depth -= 1;
    i = close + 6;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }
  return mainHtml;
}

/** KlearHub: drop Legency scope comparison grid (“Covered every month”). */
export function removeKlearHubScopeGrid(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('Covered every month')) return mainHtml;

  return removeDivBlock(mainHtml, '<div class="scope__grid"');
}

/** KlearHub: drop Legency scope band head + Webflow Designer viz (`div.zhead`). */
export function removeKlearHubScopeZhead(mainHtml: string): string {
  if (!mainHtml.includes('What a Webflow Retainer Includes')) return mainHtml;
  if (!mainHtml.includes('<div class="zhead"')) return mainHtml;

  return removeDivBlock(mainHtml, '<div class="zhead"');
}

/** KlearHub scope fee band eyebrow (Legency “How the fee is set”). */
export function patchKlearHubScopeFeeHeading(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<h3 class="fee__heading" data-astro-cid-r7auhxne>How the fee is set</h3>',
    '<h3 class="fee__heading" data-astro-cid-r7auhxne>How it works</h3>',
  );
}

/** KlearHub scope fee — drop Legency tier pills (Core / Velocity / Premium). */
export function removeKlearHubScopeFeeTiers(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('fee__tiers')) return mainHtml;

  return mainHtml.replace(/<div class="fee__tiers"[^>]*>[\s\S]*?<\/div>/, '');
}

const KLEAR_HUB_SCOPE_FEE_STEP1_COPY =
  'Using KlearData, we scan and convert emails, PDFs, spreadsheets, and paper documents into structured digital data.';

const KLEAR_HUB_SCOPE_FEE_STEP2_COPY =
  'We store every trade document related to a shipment in a secure cloud platform that you can access from anywhere.';

const KLEAR_HUB_SCOPE_FEE_STEP3_COPY =
  'We turn raw trade data into interactive intelligence that surface trends, highlight risk, and feed exportable global reports for approved stakeholders.';

/** KlearHub scope fee step 03 (Legency “Fixed monthly fee”). */
export function patchKlearHubScopeFeeStep3(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<h4 data-astro-cid-r7auhxne>Fixed monthly fee</h4><p data-astro-cid-r7auhxne>Agreed up front, so the line item is the same every month.</p>',
    `<h4 data-astro-cid-r7auhxne>${KLEAR_HUB_SCOPE_FEE_STEP3_COPY}</h4>`,
  );
}

const KLEAR_HUB_HOME_SERVICES_REPEAT_ID = 'home-services-repeat';

/** KlearHub: duplicate finalized #home-services after scope “How it works” band. */
export function duplicateKlearHubHomeServicesAfterScope(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (mainHtml.includes(`id="${KLEAR_HUB_HOME_SERVICES_REPEAT_ID}"`)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;
  if (!mainHtml.includes('How it works')) return mainHtml;

  const idPos = mainHtml.indexOf('id="home-services"');
  const sectionStart = mainHtml.lastIndexOf('<section', idPos);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const copy = section
    .replace(/id="home-services"/g, `id="${KLEAR_HUB_HOME_SERVICES_REPEAT_ID}"`)
    .replace(/id="services-title"/g, 'id="services-title-repeat"')
    .replace(
      'aria-labelledby="services-title"',
      'aria-labelledby="services-title-repeat"',
    );

  const scopeStart = mainHtml.indexOf('<section class="section scope"');
  if (scopeStart === -1) return mainHtml;
  const insertAt = indexOfSectionEnd(mainHtml, scopeStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + copy + mainHtml.slice(insertAt);
}

/** KlearHub #home-services-repeat eyebrow (first band keeps “What is included”). */
export function patchKlearHubHomeServicesRepeatLabel(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    '<span class="label" data-astro-cid-jg2u4s4c>What is included</span>',
    '<span class="label" data-astro-cid-jg2u4s4c>The operating problem</span>',
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const KLEAR_HUB_HOME_SERVICES_REPEAT_TITLE = 'The people the operation depends on';

const KLEAR_HUB_HOME_SERVICES_SUB =
  'Nine modules that share the same data. Take the platform, or take only the pieces that close a gap you already have.';

/** KlearHub #home-services-repeat — drop modules intro (first band keeps sub). */
export function removeKlearHubHomeServicesRepeatSub(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="services-title-repeat"')) return mainHtml;

  return mainHtml.replace(
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_TITLE}</h2><p data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_SUB}</p>`,
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_TITLE}</h2>`,
  );
}

function removeServiceChoiceArticlesContaining(html: string, needle: string): string {
  let out = html;
  let searchFrom = 0;
  while (searchFrom < out.length) {
    const articleStart = out.indexOf('<article class="service-choice"', searchFrom);
    if (articleStart === -1) break;
    const articleEnd = out.indexOf('</article>', articleStart);
    if (articleEnd === -1) break;
    const block = out.slice(articleStart, articleEnd + '</article>'.length);
    if (block.includes(needle)) {
      out = out.slice(0, articleStart) + out.slice(articleEnd + '</article>'.length);
      searchFrom = articleStart;
      continue;
    }
    searchFrom = articleEnd + '</article>'.length;
  }
  return out;
}

const KLEAR_HUB_HOME_SERVICES_REPEAT_DROP_TITLES = [
  'Turn history into decisions',
  'Stay audit-ready',
  'One parts library',
  'Clearance and filing workspace',
  'Never miss a milestone',
  "Find money you're owed",
] as const;

const KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_TITLE = 'Customs Brokers';
const KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_BODY =
  'You file for clients and you are measured on throughput. KlearHub gives your team one system for entries, corrections, and client reporting.';

/** KlearHub #home-services-repeat card 1 body (first band keeps ISF / in-bond copy). */
export function patchKlearHubHomeServicesRepeatCard1Body(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
  `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_TITLE}</h3><p data-astro-cid-jg2u4s4c>Run entries in-house: ISF, in-bond, delivery orders, and more.</p>`,
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_TITLE}</h3><p data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_BODY}</p>`,
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_TITLE = 'Trade compliance leaders';
const KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_BODY =
  'You need to show what happened and when. Every entry carries its documents and a field-level trail back to the source.';

/** KlearHub #home-services-repeat card 2 body (first band keeps broker view copy). */
export function patchKlearHubHomeServicesRepeatCard2Body(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_TITLE}</h3><p data-astro-cid-jg2u4s4c>Bring existing broker relationships into one view instead of replacing them.</p>`,
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_TITLE}</h3><p data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_BODY}</p>`,
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_TITLE = 'Self-filers and IORs';
const KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_BODY =
  'You hold your own filer code and intend to keep it. KlearHub is the system you file on, without building it yourself.';

function patchHubRepeatCardIconByTitle(mainHtml: string, title: string, paths: string): string {
  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  if (repeatId === -1) return mainHtml;
  const sectionEnd = mainHtml.indexOf('</section>', repeatId);
  if (sectionEnd === -1) return mainHtml;
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1 || sectionStart > repeatId) return mainHtml;

  const titleNeedle = `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${title}</h3>`;
  const titleIdx = mainHtml.indexOf(titleNeedle, sectionStart);
  if (titleIdx === -1 || titleIdx > sectionEnd) return mainHtml;

  const articleStart = mainHtml.lastIndexOf('<article class="service-choice"', titleIdx);
  if (articleStart === -1 || articleStart < sectionStart) return mainHtml;
  const articleEnd = mainHtml.indexOf('</article>', titleIdx);
  if (articleEnd === -1 || articleEnd > sectionEnd) return mainHtml;

  const article = mainHtml.slice(articleStart, articleEnd + '</article>'.length);
  const svg = klearStrokeSvg(paths, 'data-astro-cid-jg2u4s4c');
  const patchedArticle = article.replace(/<svg[\s\S]*?<\/svg>/, svg);
  if (patchedArticle === article) return mainHtml;

  return mainHtml.slice(0, articleStart) + patchedArticle + mainHtml.slice(articleEnd + '</article>'.length);
}

/** KlearHub #home-services-repeat — audience-specific stroke icons (not module grid icons). */
export function patchKlearHubHomeServicesRepeatCardIcons(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  let html = mainHtml;
  html = patchHubRepeatCardIconByTitle(html, 'Customs Brokers', ICON_USERS);
  html = patchHubRepeatCardIconByTitle(html, 'Trade compliance leaders', ICON_SHIELD_CHECK);
  html = patchHubRepeatCardIconByTitle(html, 'Self-filers and IORs', ICON_LAYERS);
  return html;
}

/** KlearHub #home-services-repeat — drop module eyebrows; keep bare icons only. */
export function removeKlearHubHomeServicesRepeatCardLabels(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    /<span class="service-choice__top" data-astro-cid-jg2u4s4c><span data-astro-cid-jg2u4s4c>[\s\S]*?<\/span><\/span>/g,
    '',
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat — drop card divider rules (first band keeps them). */
export function removeKlearHubHomeServicesRepeatDividers(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    /<hr[^>]*class="service-choice__divider"[^>]*\/?>/gi,
    '',
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat card 3 body (first band keeps track & trace copy). */
export function patchKlearHubHomeServicesRepeatCard3Body(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_TITLE}</h3><p data-astro-cid-jg2u4s4c>One place to answer "where is my shipment?"</p>`,
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_TITLE}</h3><p data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_BODY}</p>`,
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat card 3 title (first band keeps “See every shipment”). */
export function patchKlearHubHomeServicesRepeatCard3Title(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>See every shipment</h3>',
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD3_TITLE}</h3>`,
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat card 2 title (first band keeps broker connectivity copy). */
export function patchKlearHubHomeServicesRepeatCard2Title(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Work with the brokers you already have</h3>',
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD2_TITLE}</h3>`,
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat card 1 title (first band keeps “File your own customs”). */
export function patchKlearHubHomeServicesRepeatCard1Title(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = section.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>File your own customs</h3>',
    `<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_CARD1_TITLE}</h3>`,
  );
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat — keep first three module cards only. */
export function removeKlearHubHomeServicesRepeatExtraCards(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  const repeatId = mainHtml.indexOf('id="home-services-repeat"');
  const sectionStart = mainHtml.lastIndexOf('<section', repeatId);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  let patched = section;
  for (const title of KLEAR_HUB_HOME_SERVICES_REPEAT_DROP_TITLES) {
    patched = removeServiceChoiceArticlesContaining(patched, title);
  }
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearHub #home-services-repeat heading (first band keeps hub modules title). */
export function patchKlearHubHomeServicesRepeatTitle(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services-repeat"')) return mainHtml;

  return mainHtml.replace(
    '<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>Everything the operation needs, in one system</h2>',
    `<h2 data-no-roll id="services-title-repeat" data-astro-cid-jg2u4s4c>${KLEAR_HUB_HOME_SERVICES_REPEAT_TITLE}</h2>`,
  );
}

/** KlearHub scope fee step 02 (Legency “Tier agreed”). */
export function patchKlearHubScopeFeeStep2(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<h4 data-astro-cid-r7auhxne>Tier agreed</h4><p data-astro-cid-r7auhxne>Set by how much your launch calendar asks of the site.</p>',
    `<h4 data-astro-cid-r7auhxne>${KLEAR_HUB_SCOPE_FEE_STEP2_COPY}</h4>`,
  );
}

/** KlearHub scope fee step 01 (Legency “Build review”). */
export function patchKlearHubScopeFeeStep1(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<h4 data-astro-cid-r7auhxne>Build review</h4><p data-astro-cid-r7auhxne>We look at the site first, so the quote reflects the site you actually have.</p>',
    `<h4 data-astro-cid-r7auhxne>${KLEAR_HUB_SCOPE_FEE_STEP1_COPY}</h4>`,
  );
}

/** KlearHub scope fee — drop Legency step 04 (“Cancel on notice”); keep three steps. */
export function removeKlearHubScopeFeeStep4(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;

  const scopeStart = mainHtml.indexOf('<section class="section scope"');
  if (scopeStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, scopeStart);
  if (!section) return mainHtml;

  const patched = section
    .replace(/<li class="fee__step"[^>]*>[\s\S]*?<\/li>/g, (block) =>
      /<span class="fee__num"[^>]*>\s*04\s*<\/span>/.test(block) ? '' : block,
    )
    .replace(/<ol class="fee__steps fee__steps--four"/, '<ol class="fee__steps"');

  if (patched === section) return mainHtml;

  return mainHtml.slice(0, scopeStart) + patched + mainHtml.slice(scopeStart + section.length);
}

/** KlearHub rot eyebrow — drop Legency “The Real Cost”. */
export function removeKlearHubRotLabel(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="label" data-astro-cid-r7auhxne>The Real Cost</span>',
    '',
  );
}

/** KlearHub rot step 1 label (Legency keeps “Month 1”). */
export function patchKlearHubRotStep1Label(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Month 1</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>Direct customs filing</span>',
  );
}

/** KlearHub rot step 2 label (Legency keeps “Month 4”). */
export function patchKlearHubRotStep2Label(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Month 4</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>Full audit trail</span>',
  );
}

/** KlearHub rot step 3 label (Legency keeps “Month 8”). */
export function patchKlearHubRotStep3Label(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Month 8</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>SOC2 standards</span>',
  );
}

const KLEAR_HUB_ROT_STEP1_BODY_LEGENCY =
  'A clean component system. Every page is built from the same parts, and your team can add one without a developer.';
const KLEAR_HUB_ROT_STEP1_BODY =
  'Five countries covered by KlearNow’s own licences, not a referral chain.';

/** KlearHub rot step 1 body (Legency “clean component system…” copy). */
export function patchKlearHubRotStep1Body(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(KLEAR_HUB_ROT_STEP1_BODY_LEGENCY)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP1_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP1_BODY}</p>`,
  );
}

const KLEAR_HUB_ROT_STEP2_BODY_LEGENCY =
  'A rushed campaign page adds six one-off classes. Nobody notices.';
const KLEAR_HUB_ROT_STEP2_BODY =
  'Every entry carries the documents and field-level provenance behind it.';

/** KlearHub rot step 2 body (Legency “rushed campaign page…” copy). */
export function patchKlearHubRotStep2Body(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(KLEAR_HUB_ROT_STEP2_BODY_LEGENCY)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP2_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP2_BODY}</p>`,
  );
}

const KLEAR_HUB_ROT_STEP3_BODY_LEGENCY =
  'Three people have edited the same section three ways. The parts no longer match, and a prospect can tell.';
const KLEAR_HUB_ROT_STEP3_BODY =
  'Independently audited controls on the platform your records sit in.';

/** KlearHub rot step 3 body (Legency “three people have edited…” copy). */
export function patchKlearHubRotStep3Body(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes(KLEAR_HUB_ROT_STEP3_BODY_LEGENCY)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP3_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP3_BODY}</p>`,
  );
}

/** KlearHub rot step 4 label (Legency keeps “Month 12”). */
export function patchKlearHubRotStep4Label(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Month 12</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>One data model</span>',
  );
}

/** KlearHub rot steps — drop decorative pixel grids (`rot__px`). */
export function removeKlearHubRotPxGrids(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;
  if (!mainHtml.includes('class="rot__px"')) return mainHtml;

  return mainHtml.replace(/<div class="rot__px"[^>]*>[\s\S]*?<\/div>/g, '');
}

const MANAGED_TRADE_ROT_HEADING = 'A licensed broker is accountable for every entry';

/** Managed Trade rot headline (KlearHub keeps “One system, multiple countries”). */
export function patchManagedTradeRotHeading(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>One system, multiple countries</h2>',
    `<h2 class="rot__heading" data-no-roll data-astro-cid-r7auhxne>${MANAGED_TRADE_ROT_HEADING}</h2>`,
  );
}

const MANAGED_TRADE_ROT_STEP1_BODY =
  'KlearNow files on its own licences rather than handing you to a referral chain.';

/** Managed Trade rot step 1 body (KlearHub keeps five-country licence copy). */
export function patchManagedTradeRotStep1Body(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes(KLEAR_HUB_ROT_STEP1_BODY)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP1_BODY}</p>`,
    `<p data-astro-cid-r7auhxne>${MANAGED_TRADE_ROT_STEP1_BODY}</p>`,
  );
}

/** Managed Trade rot step 1 label (KlearHub keeps “Direct customs filing”). */
export function patchManagedTradeRotStep1Label(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Direct customs filing</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>First-party filing</span>',
  );
}

/** Managed Trade rot step 2 label (KlearHub keeps “Full audit trail”). */
export function patchManagedTradeRotStep2Label(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>Full audit trail</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>Named broker of record</span>',
  );
}

const MANAGED_TRADE_ROT_STEP2_BODY =
  'You know who is accountable for your entries, and you can reach them.';

/** Managed Trade rot step 2 body (KlearHub keeps provenance copy). */
export function patchManagedTradeRotStep2Body(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-r7auhxne>${KLEAR_HUB_ROT_STEP2_BODY}</p>`,
    `<p data-astro-cid-r7auhxne>${MANAGED_TRADE_ROT_STEP2_BODY}</p>`,
  );
}

/** Managed Trade rot step 3 label (KlearHub keeps “SOC2 standards”). */
export function patchManagedTradeRotStep3Label(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>SOC2 standards</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>Full audit trail</span>',
  );
}

/** Managed Trade rot step 4 label (KlearHub keeps “One data model”). */
export function patchManagedTradeRotStep4Label(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    '<span class="rot__month" data-astro-cid-r7auhxne>One data model</span>',
    '<span class="rot__month" data-astro-cid-r7auhxne>Your data stays yours</span>',
  );
}

const MANAGED_TRADE_ROT_STEP4_BODY_LEGENCY =
  'A change in one place breaks a page nobody was watching. Quotes come in for a rebuild.';
const MANAGED_TRADE_ROT_STEP4_BODY =
  'Hand off the work, not the visibility. The platform stays open to your team.';

/** Managed Trade rot step 4 body (Legency “rebuild” copy; KlearHub keeps it). */
export function patchManagedTradeRotStep4Body(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes(MANAGED_TRADE_ROT_STEP4_BODY_LEGENCY)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-r7auhxne>${MANAGED_TRADE_ROT_STEP4_BODY_LEGENCY}</p>`,
    `<p data-astro-cid-r7auhxne>${MANAGED_TRADE_ROT_STEP4_BODY}</p>`,
  );
}

const MANAGED_TRADE_SCOPE_FEE_ONBOARDING_H4 =
  'Scoping and SOP design. We document how your entries should be handled before we file anything.<br data-astro-cid-r7auhxne>Named team assignment. A dedicated pod, not a queue.';

/** Managed Trade “How it works” step 01 (KlearHub keeps KlearData ingest copy). */
export function patchManagedTradeScopeFeeStep1(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    `<h4 data-astro-cid-r7auhxne>${KLEAR_HUB_SCOPE_FEE_STEP1_COPY}</h4>`,
    `<h4 data-astro-cid-r7auhxne>${MANAGED_TRADE_SCOPE_FEE_ONBOARDING_H4}</h4>`,
  );
}

/** Managed Trade “How it works” step 02 (KlearHub keeps document storage copy). */
export function patchManagedTradeScopeFeeStep2(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    `<h4 data-astro-cid-r7auhxne>${KLEAR_HUB_SCOPE_FEE_STEP2_COPY}</h4>`,
    `<h4 data-astro-cid-r7auhxne>${MANAGED_TRADE_SCOPE_FEE_ONBOARDING_H4}</h4>`,
  );
}

const MANAGED_TRADE_SCOPE_FEE_OPERATIONS_H4 =
  'Post-entry management. PEA audits, PSC and CAPE handled on your behalf.<br data-astro-cid-r7auhxne>Reporting and review. Audit-ready archive plus a standing operating review.';

/** Managed Trade “How it works” step 03 (KlearHub keeps intelligence / reporting copy). */
export function patchManagedTradeScopeFeeStep3(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    `<h4 data-astro-cid-r7auhxne>${KLEAR_HUB_SCOPE_FEE_STEP3_COPY}</h4>`,
    `<h4 data-astro-cid-r7auhxne>${MANAGED_TRADE_SCOPE_FEE_OPERATIONS_H4}</h4>`,
  );
}

function hasCustomBrokersContext(mainHtml: string): boolean {
  return (
    mainHtml.includes(CUSTOM_BROKERS_HERO_TITLE_FLAT) ||
    mainHtml.includes(`>${CUSTOM_BROKERS_HERO_TITLE}<`) ||
    mainHtml.includes(CUSTOM_BROKERS_HERO_TITLE_LEGACY) ||
    mainHtml.includes('An AEO Agency That Measures First') ||
    mainHtml.includes('Built for Brokers by Brokers') ||
    mainHtml.includes('Addressing key broker challenges')
  );
}

/** Klear “How it works” scope band (KlearHub fee layout) — insert directly after svc-hero. */
export function insertKlearHowItWorksScopeAfterHero(mainHtml: string): string {
  if (mainHtml.includes('<section class="section scope"')) return mainHtml;

  const heroStart = mainHtml.indexOf('<section class="svc-hero"');
  if (heroStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, heroStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearHubScopeFeeSection + mainHtml.slice(insertAt);
}

/** Custom Brokers: Managed Trade–style “How it works” scope band after svc-hero. */
export function insertCustomBrokersScopeAfterHero(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;
  return insertKlearHowItWorksScopeAfterHero(mainHtml);
}

/** Trade Compliance — placeholder “How it works” band after hero (copy TBD). */
export const insertTradeComplianceScopeAfterHero = insertKlearHowItWorksScopeAfterHero;

type KlearHowItWorksScopeStep = { readonly num: string; readonly title: string; readonly body: string };

const CUSTOM_BROKERS_SCOPE_STEPS: readonly KlearHowItWorksScopeStep[] = [
  {
    num: '01',
    title: 'Capture & structure',
    body: 'Ingest emails, PDFs, and EDI and convert every field into searchable entry data.',
  },
  {
    num: '02',
    title: 'Validate & flag',
    body: 'AI checks HTS Code, values, and documents in real time and raises exception alerts.',
  },
  {
    num: '03',
    title: 'File & update',
    body: 'Submit compliant entries and keep clients current on holds, exams, and release.',
  },
  {
    num: '04',
    title: 'Share & report',
    body: 'Automatically create your shipment file. AI gathers all relevant information and consolidates into a dynamic shipment file.',
  },
];

const SELF_FILERS_SCOPE_STEPS: readonly KlearHowItWorksScopeStep[] = [
  {
    num: '01',
    title: 'Capture & structure',
    body: 'Ingest emails, PDFs, EDI, and portal exports; convert everything into clean, searchable entry fields.',
  },
  {
    num: '02',
    title: 'Validate & Prep',
    body: 'AI surfaces exceptions for licensed broker review on values, parties, and PGA requirements, flags missing docs, and queues fixes before you file.',
  },
  {
    num: '03',
    title: 'File & Track',
    body: 'Entries submitted via ABI under licensed broker oversight, receive ACE responses instantly, and monitor holds, exams, and releases in one view.',
  },
  {
    num: '04',
    title: 'Archive & Report',
    body: 'Keep a searchable, audit-ready trail with dashboards for operations and duty/bond forecasts for finance, then export in a single click.',
  },
];

const TRADE_COMPLIANCE_SCOPE_STEPS: readonly KlearHowItWorksScopeStep[] = [
  {
    num: '01',
    title: 'Capture & Structure',
    body: 'Ingest emails, PDFs, EDI and portal exports; convert everything into clean, searchable fields',
  },
  {
    num: '02',
    title: 'Validate & track',
    body: 'AI checks HS codes, values, and required docs while you track entries across all brokers and ports.',
  },
  {
    num: '03',
    title: 'Resolve & Collaborate',
    body: 'Instant alerts for holds/missing docs with shared tasks for brokers, suppliers, and your team.',
  },
  {
    num: '04',
    title: 'Report & Forecast',
    body: 'Self-serve dashboards plus duty and bond forecasting for finance — export in a click.',
  },
];

function klearHowItWorksScopeFeeStepLi(step: KlearHowItWorksScopeStep): string {
  return `<li class="fee__step" data-astro-cid-r7auhxne><span class="fee__num" data-astro-cid-r7auhxne>${step.num}</span><h4 data-astro-cid-r7auhxne>${step.title}</h4><p data-astro-cid-r7auhxne>${step.body}</p></li>`;
}

function buildKlearHowItWorksScopeFeeStepsHtml(steps: readonly KlearHowItWorksScopeStep[]): string {
  return steps.map(klearHowItWorksScopeFeeStepLi).join('');
}

function patchKlearHowItWorksScopeBandWithSteps(
  mainHtml: string,
  steps: readonly KlearHowItWorksScopeStep[],
): string {
  if (!mainHtml.includes('<section class="section scope"')) return mainHtml;

  const scopeStart = mainHtml.indexOf('<section class="section scope"');
  const section = sliceSectionAt(mainHtml, scopeStart);
  if (!section) return mainHtml;

  let patched = section;
  patched = patched.replace(
    /<h3 class="fee__heading" data-astro-cid-r7auhxne>How the fee is set<\/h3>/,
    '<h3 class="fee__heading" data-astro-cid-r7auhxne>How it works</h3>',
  );
  if (!patched.includes('class="fee__heading" data-astro-cid-r7auhxne>How it works')) {
    patched = patched.replace(
      /<h3 class="fee__heading" data-astro-cid-r7auhxne>[\s\S]*?<\/h3>/,
      '<h3 class="fee__heading" data-astro-cid-r7auhxne>How it works</h3>',
    );
  }
  patched = patched.replace(
    '<div class="fee__tiers" data-astro-cid-r7auhxne><span data-astro-cid-r7auhxne>Core</span><span data-astro-cid-r7auhxne>Velocity</span><span data-astro-cid-r7auhxne>Premium</span></div>',
    '',
  );
  patched = patched.replace(
    /<ol class="fee__steps(?: fee__steps--four)?" data-astro-cid-r7auhxne>[\s\S]*?<\/ol>/,
    `<ol class="fee__steps fee__steps--four" data-astro-cid-r7auhxne>${buildKlearHowItWorksScopeFeeStepsHtml(steps)}</ol>`,
  );

  if (patched === section) return mainHtml;

  return mainHtml.slice(0, scopeStart) + patched + mainHtml.slice(scopeStart + section.length);
}

/** Custom Brokers: scope band copy/layout — four distinct “How it works” steps. */
export function patchCustomBrokersScopeHowItWorksBand(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;
  return patchKlearHowItWorksScopeBandWithSteps(mainHtml, CUSTOM_BROKERS_SCOPE_STEPS);
}

const TRADE_COMPLIANCE_HERO_TITLE_FLAT =
  "See What's Clearing, What's Stuck, and What It Costs — In Real Time";
const TRADE_COMPLIANCE_HERO_TITLE =
  "See What's Clearing,<br data-astro-cid-asdozulm>What's Stuck, and What It Costs —<br data-astro-cid-asdozulm>In Real Time";

/** Trade Compliance (`/trade-compliance/`, technical-seo mirror). */
export function patchTradeComplianceSvcHeroTitle(mainHtml: string): string {
  const target = `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${TRADE_COMPLIANCE_HERO_TITLE}</h1>`;
  if (mainHtml.includes(target)) return mainHtml;

  let html = mainHtml.replace(
    /(<h1 class="svc-hero__title"[^>]*>)Technical SEO Agency(<\/h1>)/,
    `$1${TRADE_COMPLIANCE_HERO_TITLE}$2`,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${TRADE_COMPLIANCE_HERO_TITLE_FLAT}</h1>`,
    target,
  );
  return html;
}

const TRADE_COMPLIANCE_SVC_HERO_SUB =
  'Combine emails and docs into live, searchable import data with global clearance status, exception alerts, and compliance audit-ready records.';

/** Trade Compliance (`/trade-compliance/`, technical-seo mirror). */
export function patchTradeComplianceSvcHeroSub(mainHtml: string): string {
  const target = `<p class="svc-hero__sub" data-astro-cid-asdozulm>${TRADE_COMPLIANCE_SVC_HERO_SUB}</p>`;
  if (mainHtml.includes(target)) return mainHtml;

  const heroStart = mainHtml.indexOf('<section class="svc-hero"');
  if (heroStart === -1) return mainHtml;
  const heroEnd = indexOfSectionEnd(mainHtml, heroStart);
  if (heroEnd === -1) return mainHtml;

  const hero = mainHtml.slice(heroStart, heroEnd);
  const patchedHero = hero.replace(/<p class="svc-hero__sub"[^>]*>[\s\S]*?<\/p>/, target);
  if (patchedHero === hero) return mainHtml;

  return mainHtml.slice(0, heroStart) + patchedHero + mainHtml.slice(heroEnd);
}

/** Trade Compliance: scope band — four “How it works” steps. */
export function patchTradeComplianceScopeHowItWorksBand(mainHtml: string): string {
  return patchKlearHowItWorksScopeBandWithSteps(mainHtml, TRADE_COMPLIANCE_SCOPE_STEPS);
}

/** Trade Compliance: drop Legency “Technical SEO Services” foundation eyebrow. */
export function removeTradeComplianceFoundationLabel(mainHtml: string): string {
  return mainHtml.replace(
    /<span class="label" data-astro-cid-6q4o4ab6>Technical SEO Services<\/span>\s*/,
    '',
  );
}

const TRADE_COMPLIANCE_FOUNDATION_HEADING = 'Overcoming Traditional Customs Challenges';

/** Trade Compliance: foundation band headline. */
export function patchTradeComplianceFoundationHeading(mainHtml: string): string {
  return mainHtml.replace(
    /<h2 class="foundation__heading"[^>]*>Four Things That Decide Whether a Page Is Found<\/h2>/,
    `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6 data-no-roll>${TRADE_COMPLIANCE_FOUNDATION_HEADING}</h2>`,
  );
}

/** Trade Compliance: drop fourth Legency foundation card (“Machine Readability”). */
export function removeTradeComplianceFoundationMachineReadabilityCard(mainHtml: string): string {
  const titleRe = /<h3[^>]*>Machine Readability<\/h3>/;
  const titleMatch = titleRe.exec(mainHtml);
  if (!titleMatch) return mainHtml;

  const titleIdx = titleMatch.index;
  const articleStart = mainHtml.lastIndexOf('<article class="found-card"', titleIdx);
  if (articleStart === -1) return mainHtml;

  const articleEnd = mainHtml.indexOf('</article>', titleIdx);
  if (articleEnd === -1) return mainHtml;

  let removeEnd = articleEnd + '</article>'.length;
  if (mainHtml[removeEnd] === '\n') removeEnd += 1;

  return mainHtml.slice(0, articleStart) + mainHtml.slice(removeEnd);
}

const TRADE_COMPLIANCE_FOUNDATION_CARD_REPLACEMENTS: [string, string][] = [
  [
    '<h3 data-astro-cid-6q4o4ab6>Crawl and Index</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Inefficiencies &amp; Delays</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>A page an engine never reaches cannot rank, convert or be cited. Canonicals, redirects, sitemaps, robots rules, and the junk URLs that eat a crawl budget before the real pages get seen.</p>',
    '<p data-astro-cid-6q4o4ab6>Replace manual re-keying and email chase with automated intake and exception alerts.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>Speed and Core Web Vitals</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Lack of Visibility</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>A slow page loses the visit before the form loads and ranks below faster ones. Field data first, lab data second: image weight, font loading, third-party scripts and layout shift, measured on the pages that carry traffic.</p>',
    '<p data-astro-cid-6q4o4ab6>One live view of filings, milestones, and holds across every broker, mode, and port.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>Structure and Schema</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Compliance Risks</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>The markup that tells an engine what a page is and what to quote from it. One H1, a heading order that reflects the page, main content an engine can separate from the navigation, and schema per page type that describes what is there.</p>',
    '<p data-astro-cid-6q4o4ab6>AI validation and a searchable archive keep you audit-ready and reduce penalties.</p>',
  ],
];

/** Trade Compliance foundation grid — three challenge cards. */
export function patchTradeComplianceFoundationCards(mainHtml: string): string {
  if (!mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)) return mainHtml;

  let html = mainHtml;
  for (const [from, to] of TRADE_COMPLIANCE_FOUNDATION_CARD_REPLACEMENTS) {
    if (html.includes(from)) html = html.replace(from, to);
  }
  return html;
}

const CUSTOM_BROKERS_FOUNDATION_HEADING = 'Addressing key broker challenges';

const CUSTOM_BROKERS_REGRESS_HEADING = 'Why Being Prepared Matters';

/** Operation TYpe pages — drop Legency “Why the Crawl Runs Monthly” regress eyebrow. */
export function removeKlearOperationRegressLabel(mainHtml: string): string {
  let html = mainHtml.replace(
    /(<div class="regress__head"[^>]*>)\s*<span class="label"[^>]*>Why the Crawl Runs Monthly<\/span>\s*/g,
    '$1',
  );
  html = html.replace(/<span class="label"[^>]*>Why the Crawl Runs Monthly<\/span>\s*/g, '');
  return html;
}

/** @deprecated Use {@link removeKlearOperationRegressLabel}. */
export const removeCustomBrokersRegressLabel = removeKlearOperationRegressLabel;

/** Operation TYpe pages — drop Legency monthly-crawl footnote on regress band. */
export function removeKlearOperationRegressFoot(mainHtml: string): string {
  if (!mainHtml.includes('<section class="section regress"')) return mainHtml;

  return mainHtml.replace(
    /<p class="regress__foot"[^>]*>Each of these is cheap to catch the month it happens and expensive to find two quarters later, which is the entire argument for a monthly crawl rather than an annual audit\.<\/p>\s*/g,
    '',
  );
}

/** @deprecated Use {@link removeKlearOperationRegressFoot}. */
export const removeCustomBrokersRegressFoot = removeKlearOperationRegressFoot;

/** Operation TYpe pages — drop fourth regress card (“A third-party script”). */
export function removeKlearOperationRegressThirdPartyCard(mainHtml: string): string {
  const needle = 'A third-party script';
  if (!mainHtml.includes(needle)) return mainHtml;

  const h3Pos = mainHtml.indexOf(needle);
  const articleStart = mainHtml.lastIndexOf('<article class="regress__card"', h3Pos);
  if (articleStart === -1) return mainHtml;

  const articleEnd = mainHtml.indexOf('</article>', h3Pos);
  if (articleEnd === -1) return mainHtml;

  const articleEndFull = articleEnd + '</article>'.length;
  return mainHtml.slice(0, articleStart) + mainHtml.slice(articleEndFull);
}

/** @deprecated Use {@link removeKlearOperationRegressThirdPartyCard}. */
export const removeCustomBrokersRegressThirdPartyCard = removeKlearOperationRegressThirdPartyCard;

const KLEAR_OPERATION_REGRESS_CARD1_TITLE = 'Tariff &quot;What-If&quot; Modeling';
const KLEAR_OPERATION_REGRESS_CARD1_BODY =
  'simulate rate changes by SKU/supplier and see landed-cost impact before new rates hit.';

/** Operation TYpe — regress grid card 1 title (technical SEO mirror). */
export function patchKlearOperationRegressCard1Title(mainHtml: string): string {
  if (!mainHtml.includes('A template edit')) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-diqpbc75>A template edit<\/h3>/,
    `<h3 data-astro-cid-diqpbc75>${KLEAR_OPERATION_REGRESS_CARD1_TITLE}</h3>`,
  );
}

const KLEAR_OPERATION_REGRESS_CARD2_TITLE = 'Cross-Broker Visibility';

/** Operation TYpe — regress grid card 2 title (technical SEO mirror). */
export function patchKlearOperationRegressCard2Title(mainHtml: string): string {
  if (!mainHtml.includes('A CMS migration')) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-diqpbc75>A CMS migration<\/h3>/,
    `<h3 data-astro-cid-diqpbc75>${KLEAR_OPERATION_REGRESS_CARD2_TITLE}</h3>`,
  );
}

const KLEAR_OPERATION_REGRESS_CARD2_BODY =
  'track clearance speed, holds, and fees in one dashboard to spot issues early.';

const KLEAR_OPERATION_REGRESS_CARD3_TITLE = 'Duty &amp; Bond Forecasting';

/** Operation TYpe — regress grid card 3 title (technical SEO mirror). */
export function patchKlearOperationRegressCard3Title(mainHtml: string): string {
  if (!mainHtml.includes('A page published outside the process')) return mainHtml;

  return mainHtml.replace(
    /<h3 data-astro-cid-diqpbc75>A page published outside the process<\/h3>/,
    `<h3 data-astro-cid-diqpbc75>${KLEAR_OPERATION_REGRESS_CARD3_TITLE}</h3>`,
  );
}

const KLEAR_OPERATION_REGRESS_CARD3_BODY =
  'project outlays weeks ahead so finance can plan cash and avoid bond shortfalls.';

/** Operation TYpe — regress grid card 3 body (technical SEO mirror). */
export function patchKlearOperationRegressCard3Body(mainHtml: string): string {
  const target = `<p data-astro-cid-diqpbc75>${KLEAR_OPERATION_REGRESS_CARD3_BODY}</p>`;
  if (mainHtml.includes(target)) return mainHtml;

  const from =
    '<p data-astro-cid-diqpbc75>A campaign landing page goes up in a hurry with no meta description, no schema and a noindex left on from staging. Nobody notices, because nobody is crawling.</p>';
  if (!mainHtml.includes(from)) return mainHtml;

  return mainHtml.replace(from, target);
}

/** Operation TYpe — regress grid card 2 body (technical SEO mirror). */
export function patchKlearOperationRegressCard2Body(mainHtml: string): string {
  const target = `<p data-astro-cid-diqpbc75>${KLEAR_OPERATION_REGRESS_CARD2_BODY}</p>`;
  if (mainHtml.includes(target)) return mainHtml;

  const from =
    '<p data-astro-cid-diqpbc75>Slugs change, redirects get half-written, and the old URLs stay in the index for months pointing at nothing. This is the most common way a site loses traffic it had already earned.</p>';
  if (!mainHtml.includes(from)) return mainHtml;

  return mainHtml.replace(from, target);
}

/** Operation TYpe — regress grid card 1 body (technical SEO mirror). */
export function patchKlearOperationRegressCard1Body(mainHtml: string): string {
  const target = `<p data-astro-cid-diqpbc75>${KLEAR_OPERATION_REGRESS_CARD1_BODY}</p>`;
  if (mainHtml.includes(target)) return mainHtml;

  const from =
    '<p data-astro-cid-diqpbc75>One change to a shared component reaches every page using it. A heading level moved, a canonical dropped, a link turned into a button, and a hundred pages change behaviour at once.</p>';
  if (!mainHtml.includes(from)) return mainHtml;

  return mainHtml.replace(from, target);
}

/** Operation TYpe — regress band headline (technical SEO mirror). */
export function patchKlearOperationRegressHeading(mainHtml: string): string {
  if (!mainHtml.includes('<section class="section regress"')) return mainHtml;

  return mainHtml.replace(
    /<h2 class="regress__heading"[^>]*>Fixes Do Not Stay Fixed<\/h2>/,
    `<h2 class="regress__heading" data-astro-cid-diqpbc75 data-no-roll>${CUSTOM_BROKERS_REGRESS_HEADING}</h2>`,
  );
}

/** @deprecated Use {@link patchKlearOperationRegressHeading}. */
export const patchCustomBrokersRegressHeading = patchKlearOperationRegressHeading;

/** Custom Brokers foundation band headline (Legency AEO programme copy). */
export function patchCustomBrokersFoundationHeading(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<h2 class="foundation__heading"[^>]*>Four Things the Programme Puts in Your Hands<\/h2>/,
    `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6 data-no-roll>${CUSTOM_BROKERS_FOUNDATION_HEADING}</h2>`,
  );
}

/** Custom Brokers: drop Legency “The Engagement” foundation eyebrow. */
export function removeCustomBrokersFoundationLabel(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<span class="label" data-astro-cid-6q4o4ab6>The Engagement<\/span>\s*/,
    '',
  );
}

/** Custom Brokers: drop Legency “Straight Answers” eyebrow on notdo band. */
export function removeCustomBrokersNotdoLabel(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<span class="label" data-astro-cid-hsjbckyb>Straight Answers<\/span>\s*/,
    '',
  );
}

const CUSTOM_BROKERS_NOTDO_HEADING = 'When to use KlearHub Clearance Software';

const CUSTOM_BROKERS_NOTDO_CARD_REPLACEMENTS: [string, string][] = [
  [
    '<h3 data-astro-cid-hsjbckyb>We do not sell schema as the AI play</h3>',
    '<h3 data-astro-cid-hsjbckyb>Need to improve</h3>',
  ],
  [
    '<p data-astro-cid-hsjbckyb>No search vendor has ever stated that its AI reads FAQ markup, and the most-cited research on AI citations never tested schema at all. We keep structured data because it still earns rich results in ordinary search. That is the honest reason, and it is the one we give.</p>',
    '<p data-astro-cid-hsjbckyb>the speed and accuracy of their customs clearance processes.</p>',
  ],
  [
    '<h3 data-astro-cid-hsjbckyb>We do not promise a timeline we control</h3>',
    '<h3 data-astro-cid-hsjbckyb>Want to ensure</h3>',
  ],
  [
    '<p data-astro-cid-hsjbckyb>Engines re-crawl and re-index on their own schedule. First movement usually shows in the second or third monthly run. Anyone quoting you a number of weeks is describing something that is not theirs to promise.</p>',
    '<p data-astro-cid-hsjbckyb>compliance with increasingly complex international trade regulations.</p>',
  ],
  [
    '<h3 data-astro-cid-hsjbckyb>We do not report a number we cannot stand over</h3>',
    '<h3 data-astro-cid-hsjbckyb>Are looking</h3>',
  ],
  [
    '<p data-astro-cid-hsjbckyb>Where an engine is too unstable across its own runs to support a claim, the report says so. A figure that moved inside the noise is not a result, and putting it in a deck is how a programme loses the room six months later.</p>',
    '<p data-astro-cid-hsjbckyb>to provide enhanced value to their clients through faster and more reliable service.</p>',
  ],
];

/** Custom Brokers notdo band — KlearHub “when to use” copy. */
export function patchCustomBrokersNotdoBand(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  let html = mainHtml.replace(
    /<h2 class="notdo__heading"[^>]*>Four Things We Will Not Sell You<\/h2>/,
    `<h2 class="notdo__heading" data-astro-cid-hsjbckyb data-no-roll>${CUSTOM_BROKERS_NOTDO_HEADING}</h2>`,
  );

  for (const [from, to] of CUSTOM_BROKERS_NOTDO_CARD_REPLACEMENTS) {
    if (html.includes(from)) html = html.replace(from, to);
  }

  return html;
}

/** Custom Brokers — drop fourth Legency notdo card (“nothing to cite”). */
export function removeCustomBrokersNotdoFourthCard(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  const needle = 'We do not take on a site with nothing to cite';
  if (!mainHtml.includes(needle)) return mainHtml;

  const h3Pos = mainHtml.indexOf(needle);
  const articleStart = mainHtml.lastIndexOf('<article class="notdo__card"', h3Pos);
  if (articleStart === -1) return mainHtml;

  const articleEnd = mainHtml.indexOf('</article>', h3Pos);
  if (articleEnd === -1) return mainHtml;

  const articleEndFull = articleEnd + '</article>'.length;
  return mainHtml.slice(0, articleStart) + mainHtml.slice(articleEndFull);
}

const CUSTOM_BROKERS_FOUNDATION_CARD_REPLACEMENTS: [string, string][] = [
  [
    '<h3 data-astro-cid-6q4o4ab6>A Number Before Any Work Starts</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Complex documentation</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>Four engines, the questions that matter to your market, each repeated for stability. It returns your share of answers, the competitors named ahead of you, and the questions where nobody is named yet, which is the cheapest place to start.</p>',
    '<p data-astro-cid-6q4o4ab6>Automate intake and eliminate re-keying across emails, PDFs, and EDI.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>Pages an Engine Can Quote</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Compliance and accuracy</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>The pages that should be cited, rewritten to be liftable: the question as the heading, the answer directly under it, short self-contained passages, and a source behind every figure.</p>',
    '<p data-astro-cid-6q4o4ab6>AI validation plus a complete, searchable audit trail for every entry.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>Nothing Stopping an Engine From Reading You</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Efficiency and cost reduction</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>Schema per page type, an llms.txt that resolves, clean semantic structure and no broken internal links. It will not win a citation on its own, and its absence can cost you one.</p>',
    '<p data-astro-cid-6q4o4ab6>Increase entry throughput and reduce manual effort across teams.</p>',
  ],
  [
    '<h3 data-astro-cid-6q4o4ab6>A Report That Goes Upward Unedited</h3>',
    '<h3 data-astro-cid-6q4o4ab6>Pre- &amp; Post-Audit Support</h3>',
  ],
  [
    '<p data-astro-cid-6q4o4ab6>The same panel re-run and reported beside rankings and AI-referred sessions. One document, in the same shape every month, written so a marketing leader can forward it to a CEO or a board as it is.</p>',
    '<p data-astro-cid-6q4o4ab6>Validates entry details before filing to reduce errors, and enables easy post-entry audits for compliance.</p>',
  ],
];

/** Custom Brokers foundation grid — four challenge cards (Legency AEO copy). */
export function patchCustomBrokersFoundationCards(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  let html = mainHtml;
  for (const [from, to] of CUSTOM_BROKERS_FOUNDATION_CARD_REPLACEMENTS) {
    if (html.includes(from)) html = html.replace(from, to);
  }
  return html;
}

const CUSTOM_BROKERS_FOUNDATION_ICON_CARDS = [
  { title: 'Complex documentation', paths: KLEAR_ICON_CAPTURE_STRUCTURE },
  { title: 'Compliance and accuracy', paths: KLEAR_ICON_VALIDATE_DOC },
  { title: 'Efficiency and cost reduction', paths: KLEAR_ICON_DATA_BRACES },
  { title: 'Pre- &amp; Post-Audit Support', paths: KLEAR_ICON_OPS_INSIGHT },
] as const;

/** Custom Brokers foundation icons — broker challenge strip (48px bare stroke). */
export function patchCustomBrokersFoundationCardIcons(mainHtml: string): string {
  let html = applyFoundationCardIcons(mainHtml, hasCustomBrokersContext, CUSTOM_BROKERS_FOUNDATION_ICON_CARDS);
  if (!hasCustomBrokersContext(html)) return html;
  return patchFoundationBareIconChips(html, CUSTOM_BROKERS_FOUNDATION_HEADING);
}

function applyCustomBrokersFoundationPatches(mainHtml: string): string {
  let html = mainHtml;
  html = patchCustomBrokersFoundationHeading(html);
  html = removeCustomBrokersFoundationLabel(html);
  html = patchCustomBrokersFoundationCards(html);
  html = patchCustomBrokersFoundationCardIcons(html);
  return html;
}

let customBrokersFoundationSectionCache: string | null = null;

/** Patched Custom Brokers foundation block (from aeo-agency mirror). */
function getCustomBrokersFoundationSection(): string {
  if (customBrokersFoundationSectionCache) return customBrokersFoundationSectionCache;

  const html = applyCustomBrokersFoundationPatches(aeoAgencyMirror.mainHtml);
  const start = html.indexOf('<section class="section foundation"');
  const section = start === -1 ? '' : (sliceSectionAt(html, start) ?? '');
  customBrokersFoundationSectionCache = section;
  return section;
}

const FREIGHT_FORWARDERS_FOUNDATION_ICON_CARDS = [
  { title: FREIGHT_FORWARDERS_FOUNDATION_CARD1_TITLE, paths: KLEAR_ICON_CAPTURE_STRUCTURE },
  { title: FREIGHT_FORWARDERS_FOUNDATION_CARD2_TITLE, paths: KLEAR_ICON_VALIDATE_DOC },
  { title: FREIGHT_FORWARDERS_FOUNDATION_CARD3_TITLE, paths: KLEAR_ICON_OPS_INSIGHT },
  { title: FREIGHT_FORWARDERS_FOUNDATION_CARD4_TITLE, paths: KLEAR_ICON_DRAYAGE },
] as const;

/** Freight Forwarders foundation — content-matched stroke icons (first + duplicated band). */
export function patchFreightForwardersFoundationCardIcons(mainHtml: string): string {
  let html = applyFoundationCardIcons(
    mainHtml,
    (h) => h.includes(FREIGHT_FORWARDERS_FOUNDATION_HEADING),
    FREIGHT_FORWARDERS_FOUNDATION_ICON_CARDS,
  );
  if (!html.includes(FREIGHT_FORWARDERS_FOUNDATION_HEADING)) return html;
  return patchFoundationBareIconChips(html, FREIGHT_FORWARDERS_FOUNDATION_HEADING);
}

const KLEAR_DATA_FOUNDATION_ICON_CARDS = [
  { title: 'Your documents arrive in fifty formats', paths: KLEAR_ICON_DOC_INGESTION },
  { title: 'Someone keys it in by hand', paths: KLEAR_ICON_MANUAL_ENTRY },
  { title: 'The mistake surfaces at audit', paths: KLEAR_ICON_AUDIT_ALERT },
] as const;

/** KlearData foundation problem cards. */
export function patchKlearDataFoundationCardIcons(mainHtml: string): string {
  let html = applyFoundationCardIcons(
    mainHtml,
    (h) => h.includes(KLEAR_DATA_FOUNDATION_HEADING),
    KLEAR_DATA_FOUNDATION_ICON_CARDS,
  );
  if (!html.includes(KLEAR_DATA_FOUNDATION_HEADING)) return html;
  return patchFoundationBareIconChips(html, KLEAR_DATA_FOUNDATION_HEADING);
}

const KLEAR_DATA_FOUNDATION_2_ID = 'klear-data-foundation-2';

function patchKlearDataFoundation2Section(
  mainHtml: string,
  patcher: (sectionHtml: string) => string,
): string {
  if (!mainHtml.includes(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`)) return mainHtml;

  const dupIdIdx = mainHtml.indexOf(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', dupIdIdx);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const patched = patcher(section);
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearData: duplicate foundation band after “Where the data goes next” fee row (copy TBD). */
export function duplicateKlearDataFoundationBeforeFeeBand(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_DATA_FOUNDATION_HEADING)) return mainHtml;
  if (!mainHtml.includes('klear-data-fee-band')) return mainHtml;

  const feeMarker = '<section class="section scope klear-data-fee-band"';

  const placeAfterFee = (html: string, sectionHtml: string): string => {
    const feeStart = html.indexOf(feeMarker);
    if (feeStart === -1) return html;
    const feeSection = sliceSectionAt(html, feeStart);
    if (!feeSection) return html;
    const feeEnd = feeStart + feeSection.length;
    return html.slice(0, feeEnd) + sectionHtml + html.slice(feeEnd);
  };

  const dupIdIdx = mainHtml.indexOf(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`);
  if (dupIdIdx !== -1) {
    const dupStart = mainHtml.lastIndexOf('<section', dupIdIdx);
    const duplicate = sliceSectionAt(mainHtml, dupStart);
    if (!duplicate) return mainHtml;

    const feeStart = mainHtml.indexOf(feeMarker);
    const feeEnd = feeStart + (sliceSectionAt(mainHtml, feeStart)?.length ?? 0);
    if (feeStart !== -1 && feeEnd > 0 && feeStart < dupStart) {
      return mainHtml;
    }

    const withoutDup = mainHtml.slice(0, dupStart) + mainHtml.slice(dupStart + duplicate.length);
    return placeAfterFee(withoutDup, duplicate);
  }

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, foundationStart);
  if (!section?.includes(KLEAR_DATA_FOUNDATION_HEADING)) return mainHtml;

  const copy = section.replace(
    /^<section class="section foundation"/,
    `<section class="section foundation" id="${KLEAR_DATA_FOUNDATION_2_ID}"`,
  );

  return placeAfterFee(mainHtml, copy);
}

const KLEAR_DATA_FOUNDATION_2_HEADING = 'Who KlearData Is Built For';

/** KlearData `#klear-data-foundation-2` heading (primary foundation keeps data-first title). */
export function patchKlearDataFoundation2Heading(mainHtml: string): string {
  if (!mainHtml.includes(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`)) return mainHtml;

  const dupIdIdx = mainHtml.indexOf(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', dupIdIdx);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6 data-no-roll>${KLEAR_DATA_FOUNDATION_HEADING}</h2>`;
  const fromAlt = `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_HEADING}</h2>`;
  const to = `<h2 class="foundation__heading" data-astro-cid-6q4o4ab6 data-no-roll>${KLEAR_DATA_FOUNDATION_2_HEADING}</h2>`;

  let patched = section;
  if (section.includes(from)) {
    patched = section.replace(from, to);
  } else if (section.includes(fromAlt)) {
    patched = section.replace(fromAlt, to.replace(' data-no-roll', ''));
  } else if (section.includes(KLEAR_DATA_FOUNDATION_2_HEADING)) {
    return mainHtml;
  } else {
    return mainHtml;
  }

  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

const KLEAR_DATA_FOUNDATION_2_SUB = 'Anyone whose name is on the entry';

/** KlearData `#klear-data-foundation-2` intro (primary foundation keeps data-problem copy). */
export function patchKlearDataFoundation2Sub(mainHtml: string): string {
  if (!mainHtml.includes(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`)) return mainHtml;

  const dupIdIdx = mainHtml.indexOf(`id="${KLEAR_DATA_FOUNDATION_2_ID}"`);
  const sectionStart = mainHtml.lastIndexOf('<section', dupIdIdx);
  if (sectionStart === -1) return mainHtml;

  const section = sliceSectionAt(mainHtml, sectionStart);
  if (!section) return mainHtml;

  const from = `<p class="foundation__sub" data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_SUB}</p>`;
  const to = `<p class="foundation__sub" data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_SUB}</p>`;
  if (!section.includes(from) && !section.includes(to)) return mainHtml;

  const patched = section.includes(from) ? section.replace(from, to) : section;
  if (patched === section) return mainHtml;

  return mainHtml.slice(0, sectionStart) + patched + mainHtml.slice(sectionStart + section.length);
}

/** KlearData `#klear-data-foundation-2` — drop “Before anything else works” eyebrow. */
export function removeKlearDataFoundation2Label(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      /<span class="label" data-astro-cid-6q4o4ab6>Before anything else works<\/span>\s*/,
      '',
    ),
  );
}

const KLEAR_DATA_FOUNDATION_2_CARD1_TITLE = 'Customs brokers';

/** KlearData `#klear-data-foundation-2` card 1 title. */
export function patchKlearDataFoundation2Card1Title(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      /<h3 data-astro-cid-6q4o4ab6>Your documents arrive in fifty formats<\/h3>/,
      `<h3 data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_CARD1_TITLE}</h3>`,
    ),
  );
}

const KLEAR_DATA_FOUNDATION_2_CARD1_BODY =
  'You are judged on speed and accuracy. Clean data at intake means higher volume on the same team, with fewer errors reaching customs.';

/** KlearData `#klear-data-foundation-2` card 1 body (Customs brokers). */
export function patchKlearDataFoundation2Card1Body(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD1_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_CARD1_BODY}</p>`,
    ),
  );
}

const KLEAR_DATA_FOUNDATION_2_CARD2_TITLE = 'Trade compliance leaders';

/** KlearData `#klear-data-foundation-2` card 2 title. */
export function patchKlearDataFoundation2Card2Title(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      /<h3 data-astro-cid-6q4o4ab6>Someone keys it in by hand<\/h3>/,
      `<h3 data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_CARD2_TITLE}</h3>`,
    ),
  );
}

const KLEAR_DATA_FOUNDATION_2_CARD2_BODY =
  'Your name is on the entry. Every field traces back to the document it came from, so you can show your work when someone asks.';

/** KlearData `#klear-data-foundation-2` card 2 body (Trade compliance leaders). */
export function patchKlearDataFoundation2Card2Body(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD2_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_CARD2_BODY}</p>`,
    ),
  );
}

const KLEAR_DATA_FOUNDATION_2_CARD3_TITLE = 'Self-filers and IORs';

/** KlearData `#klear-data-foundation-2` card 3 title. */
export function patchKlearDataFoundation2Card3Title(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      /<h3 data-astro-cid-6q4o4ab6>The mistake surfaces at audit<\/h3>/,
      `<h3 data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_CARD3_TITLE}</h3>`,
    ),
  );
}

const KLEAR_DATA_FOUNDATION_2_CARD3_BODY =
  'You hold your own filer code and want to keep it. KlearData gets your data ready without adding headcount or another portal.';

/** KlearData `#klear-data-foundation-2` card 3 body (Self-filers and IORs). */
export function patchKlearDataFoundation2Card3Body(mainHtml: string): string {
  return patchKlearDataFoundation2Section(mainHtml, (section) =>
    section.replace(
      `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD3_BODY}</p>`,
      `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_2_CARD3_BODY}</p>`,
    ),
  );
}

function insertKlearTwoCardVsAfterFoundation(mainHtml: string, foundationHeading: string): string {
  if (!mainHtml.includes(foundationHeading)) return mainHtml;

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, foundationStart);
  if (insertAt === -1) return mainHtml;

  if (mainHtml.slice(insertAt, insertAt + 120).includes('<section class="section vs"')) {
    return mainHtml;
  }
  if (mainHtml.includes(KLEAR_DATA_TWO_CARD_VS_MARKER)) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataVsSection + mainHtml.slice(insertAt);
}

/** Custom Brokers: KlearData two-card vs band after foundation (copy placeholder — same as Freight Forwarders for now). */
export function insertCustomBrokersVsAfterFoundation(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;
  return insertKlearTwoCardVsAfterFoundation(mainHtml, CUSTOM_BROKERS_FOUNDATION_HEADING);
}

/** Trade Compliance: two-card vs band after foundation (placeholder copy — same as Custom Brokers for now). */
export function insertTradeComplianceVsAfterFoundation(mainHtml: string): string {
  return insertKlearTwoCardVsAfterFoundation(mainHtml, TRADE_COMPLIANCE_FOUNDATION_HEADING);
}

const CUSTOM_BROKERS_VS_CARD1_TITLE = 'Built for Brokers by Brokers';
const CUSTOM_BROKERS_VS_CARD1_BODY =
  'Designed with Licensed Customs Brokers, our platform reflects real filing workflows — not theory. We are ABI-certified in the United States and a licensed customs broker in Canada, the Netherlands, Spain, and the United Kingdom, so entry rules and PGA checks are built in. The result: cleaner data, faster compliant filings, and a complete, audit-ready trail for every transaction.';

const CUSTOM_BROKERS_VS_CARD2_TITLE = 'Document Intelligence for Customs Teams';
const CUSTOM_BROKERS_VS_CARD2_BODY =
  'AI converts emails, PDFs, spreadsheets, EDI, and creates a structured shipment file and entry data, no heavy IT lift. It normalizes key fields, flags gaps before filing, and pushes clean data into your ABI/TMS while keeping every document in an audit-ready, searchable archive.';

function klearTwoCardVsBandPresent(mainHtml: string): boolean {
  return (
    mainHtml.includes(KLEAR_DATA_TWO_CARD_VS_MARKER) ||
    mainHtml.includes(CUSTOM_BROKERS_VS_CARD1_TITLE) ||
    mainHtml.includes(FREIGHT_FORWARDERS_VS_CARD1_TITLE) ||
    mainHtml.includes(TRADE_COMPLIANCE_VS_CARD1_TITLE)
  );
}

function customBrokersTwoCardVsBand(mainHtml: string): boolean {
  if (!hasCustomBrokersContext(mainHtml)) return false;
  if (!mainHtml.includes(CUSTOM_BROKERS_FOUNDATION_HEADING)) return false;
  return klearTwoCardVsBandPresent(mainHtml);
}

function tradeComplianceTwoCardVsBand(mainHtml: string): boolean {
  if (!mainHtml.includes(TRADE_COMPLIANCE_FOUNDATION_HEADING)) return false;
  return klearTwoCardVsBandPresent(mainHtml);
}

function patchKlearBrokerStyleTwoCardVsCards(mainHtml: string): string {
  if (
    mainHtml.includes(`<h3 data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD1_TITLE}</h3>`) &&
    mainHtml.includes(`<h3 data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD2_TITLE}</h3>`) &&
    mainHtml.includes(`<p data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD1_BODY}</p>`) &&
    mainHtml.includes(`<p data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD2_BODY}</p>`)
  ) {
    return mainHtml;
  }

  const card1Titles = [
    'NO NEW PORTAL, NO NEW HABITS',
    FREIGHT_FORWARDERS_VS_CARD1_TITLE,
    CUSTOM_BROKERS_VS_CARD1_TITLE,
  ];
  const card1Bodies = [
    'Your documents already arrive by email. Copy KlearData into the thread and it reads them where they land, so nobody has to learn a system or change how they work.',
    FREIGHT_FORWARDERS_VS_CARD1_BODY,
    CUSTOM_BROKERS_VS_CARD1_BODY,
  ];
  const card2Titles = [
    'EVERY FIELD, BACK TO ITS SOURCE',
    FREIGHT_FORWARDERS_VS_CARD2_TITLE,
    CUSTOM_BROKERS_VS_CARD2_TITLE,
  ];
  const card2Bodies = [
    'Extraction is only useful if you can prove it. Each value KlearData captures stays linked to the document it came from, so an audit question has an answer instead of a search.',
    FREIGHT_FORWARDERS_VS_CARD2_BODY,
    CUSTOM_BROKERS_VS_CARD2_BODY,
  ];

  let html = mainHtml;
  for (const from of card1Titles) {
    if (from === CUSTOM_BROKERS_VS_CARD1_TITLE) continue;
    html = html.replace(
      `<h3 data-astro-cid-hsjbckyb>${from}</h3>`,
      `<h3 data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD1_TITLE}</h3>`,
    );
  }
  for (const from of card1Bodies) {
    if (from === CUSTOM_BROKERS_VS_CARD1_BODY) continue;
    html = html.replace(
      `<p data-astro-cid-hsjbckyb>${from}</p>`,
      `<p data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD1_BODY}</p>`,
    );
  }
  for (const from of card2Titles) {
    if (from === CUSTOM_BROKERS_VS_CARD2_TITLE) continue;
    html = html.replace(
      `<h3 data-astro-cid-hsjbckyb>${from}</h3>`,
      `<h3 data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD2_TITLE}</h3>`,
    );
  }
  for (const from of card2Bodies) {
    if (from === CUSTOM_BROKERS_VS_CARD2_BODY) continue;
    html = html.replace(
      `<p data-astro-cid-hsjbckyb>${from}</p>`,
      `<p data-astro-cid-hsjbckyb>${CUSTOM_BROKERS_VS_CARD2_BODY}</p>`,
    );
  }
  return html;
}

/** Custom Brokers two-card vs band after foundation. */
export function patchCustomBrokersVsCards(mainHtml: string): string {
  if (!customBrokersTwoCardVsBand(mainHtml)) return mainHtml;
  return patchKlearBrokerStyleTwoCardVsCards(mainHtml);
}

const TRADE_COMPLIANCE_VS_CARD1_TITLE = 'Make Customs Decisions in Real-Time Without IT Assistance';
const TRADE_COMPLIANCE_VS_CARD1_BODY =
  'Your inbox becomes a live import system. Operations, compliance, and finance work from the same data, with real-time status and exportable reports.';

const TRADE_COMPLIANCE_VS_CARD2_TITLE =
  'Get Licensed Expertise and Automated Workflows To Work For You';
const TRADE_COMPLIANCE_VS_CARD2_BODY =
  'Built with Licensed Customs Brokers and ABI-certified in the U.S. (and licensed in Canada, the Netherlands, Spain, and the U.K.), the platform validates entries, tracks releases, and keeps a complete, audit-ready trail — at scale.';

function patchTradeComplianceTwoCardVsCards(mainHtml: string): string {
  if (
    mainHtml.includes(`<h3 data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD1_TITLE}</h3>`) &&
    mainHtml.includes(`<h3 data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD2_TITLE}</h3>`) &&
    mainHtml.includes(`<p data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD1_BODY}</p>`) &&
    mainHtml.includes(`<p data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD2_BODY}</p>`)
  ) {
    return mainHtml;
  }

  const card1Titles = [
    'NO NEW PORTAL, NO NEW HABITS',
    FREIGHT_FORWARDERS_VS_CARD1_TITLE,
    CUSTOM_BROKERS_VS_CARD1_TITLE,
    TRADE_COMPLIANCE_VS_CARD1_TITLE,
  ];
  const card1Bodies = [
    'Your documents already arrive by email. Copy KlearData into the thread and it reads them where they land, so nobody has to learn a system or change how they work.',
    FREIGHT_FORWARDERS_VS_CARD1_BODY,
    CUSTOM_BROKERS_VS_CARD1_BODY,
    TRADE_COMPLIANCE_VS_CARD1_BODY,
  ];
  const card2Titles = [
    'EVERY FIELD, BACK TO ITS SOURCE',
    FREIGHT_FORWARDERS_VS_CARD2_TITLE,
    CUSTOM_BROKERS_VS_CARD2_TITLE,
    TRADE_COMPLIANCE_VS_CARD2_TITLE,
  ];
  const card2Bodies = [
    'Extraction is only useful if you can prove it. Each value KlearData captures stays linked to the document it came from, so an audit question has an answer instead of a search.',
    FREIGHT_FORWARDERS_VS_CARD2_BODY,
    CUSTOM_BROKERS_VS_CARD2_BODY,
    TRADE_COMPLIANCE_VS_CARD2_BODY,
  ];

  let html = mainHtml;
  for (const from of card1Titles) {
    if (from === TRADE_COMPLIANCE_VS_CARD1_TITLE) continue;
    html = html.replace(
      `<h3 data-astro-cid-hsjbckyb>${from}</h3>`,
      `<h3 data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD1_TITLE}</h3>`,
    );
  }
  for (const from of card1Bodies) {
    if (from === TRADE_COMPLIANCE_VS_CARD1_BODY) continue;
    html = html.replace(
      `<p data-astro-cid-hsjbckyb>${from}</p>`,
      `<p data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD1_BODY}</p>`,
    );
  }
  for (const from of card2Titles) {
    if (from === TRADE_COMPLIANCE_VS_CARD2_TITLE) continue;
    html = html.replace(
      `<h3 data-astro-cid-hsjbckyb>${from}</h3>`,
      `<h3 data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD2_TITLE}</h3>`,
    );
  }
  for (const from of card2Bodies) {
    if (from === TRADE_COMPLIANCE_VS_CARD2_BODY) continue;
    html = html.replace(
      `<p data-astro-cid-hsjbckyb>${from}</p>`,
      `<p data-astro-cid-hsjbckyb>${TRADE_COMPLIANCE_VS_CARD2_BODY}</p>`,
    );
  }
  return html;
}

/** Trade Compliance two-card vs band after foundation. */
export function patchTradeComplianceVsCards(mainHtml: string): string {
  if (!tradeComplianceTwoCardVsBand(mainHtml)) return mainHtml;
  return patchTradeComplianceTwoCardVsCards(mainHtml);
}

const CUSTOM_BROKERS_VS_CARD1_ICON_PATHS = ICON_DOC_INGESTION;
const CUSTOM_BROKERS_VS_CARD2_ICON_PATHS = ICON_LAYERS;

/** Custom Brokers — drop Legency “Before You Buy Either” tool vs agency band (keep two-card vs). */
export function removeCustomBrokersLegencyVsBand(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;
  return removeSectionContaining(
    mainHtml,
    '<section class="section vs"',
    'Before You Buy Either',
  );
}

/** Custom Brokers — drop all Legency AEO `qset` bands (GEO, method, questions). */
export function removeCustomBrokersQsetSections(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  let html = mainHtml;
  const marker = '<section class="section qset';
  while (html.includes(marker)) {
    const start = html.indexOf(marker);
    const end = indexOfSectionEnd(html, start);
    if (end === -1) break;
    html = html.slice(0, start) + html.slice(end);
  }
  return html;
}

/** @deprecated Renamed to {@link removeCustomBrokersQsetSections}. */
export const removeCustomBrokersQsetSection = removeCustomBrokersQsetSections;

/** Custom Brokers — drop Legency AEO split, stability, panel, and ninety-day timeline bands. */
export function removeCustomBrokersLegencySplitStabilitySections(mainHtml: string): string {
  if (!hasCustomBrokersContext(mainHtml)) return mainHtml;

  let html = mainHtml;
  html = removeSectionContaining(html, '<section class="section split"', 'Four Engines, Four Answers');
  html = removeSectionContaining(
    html,
    '<section class="section split split--alt"',
    'Cited More Often Than the Category Leader',
  );
  html = removeSectionContaining(
    html,
    '<section class="section stability"',
    'Where a Number Is Too Unstable to Report',
  );
  html = removeSectionContaining(html, '<section class="section panel"', 'What We Hand You in Week One');
  html = removeSectionContaining(
    html,
    '<section class="section timeline"',
    'Your First Ninety Days, Month by Month',
  );
  return html;
}

function patchKlearBrokerStyleTwoCardVsIcons(mainHtml: string): string {
  if (!mainHtml.includes(CUSTOM_BROKERS_VS_CARD1_TITLE)) return mainHtml;

  let html = mainHtml;
  html = patchFreightForwardersVsCardIcon(
    html,
    CUSTOM_BROKERS_VS_CARD1_TITLE,
    CUSTOM_BROKERS_VS_CARD1_ICON_PATHS,
  );
  html = patchFreightForwardersVsCardIcon(
    html,
    CUSTOM_BROKERS_VS_CARD2_TITLE,
    CUSTOM_BROKERS_VS_CARD2_ICON_PATHS,
  );
  return html;
}

/** Custom Brokers vs band icons (ingestion stack + modular layers). */
export function patchCustomBrokersVsIcons(mainHtml: string): string {
  if (!customBrokersTwoCardVsBand(mainHtml)) return mainHtml;
  return patchKlearBrokerStyleTwoCardVsIcons(mainHtml);
}

/** Trade Compliance vs band icons (same stroke set as Custom Brokers for now). */
export function patchTradeComplianceVsIcons(mainHtml: string): string {
  if (!tradeComplianceTwoCardVsBand(mainHtml)) return mainHtml;
  if (!mainHtml.includes(TRADE_COMPLIANCE_VS_CARD1_TITLE)) return mainHtml;

  let html = mainHtml;
  html = patchFreightForwardersVsCardIcon(
    html,
    TRADE_COMPLIANCE_VS_CARD1_TITLE,
    CUSTOM_BROKERS_VS_CARD1_ICON_PATHS,
  );
  html = patchFreightForwardersVsCardIcon(
    html,
    TRADE_COMPLIANCE_VS_CARD2_TITLE,
    CUSTOM_BROKERS_VS_CARD2_ICON_PATHS,
  );
  return html;
}

/** Managed Trade rot — drop licence intro (KlearHub keeps it beside the headline). */
export function removeManagedTradeRotIntro(mainHtml: string): string {
  if (!hasManagedTradeMigrationContentBand(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<div class="rot__intro" data-astro-cid-r7auhxne><p data-astro-cid-r7auhxne>KlearNow holds customs licences in the United States, Canada, the United Kingdom, the Netherlands, and Spain\. Same platform, same data model, same audit trail in each of them\.<\/p><\/div>/,
    '',
  );
}

/** KlearHub rot intro (Legency “timeline / cumulative damage” copy). */
export function patchKlearHubRotIntro(mainHtml: string): string {
  if (!hasKlearHubRotFoundationContext(mainHtml)) return mainHtml;

  return mainHtml.replace(
    "<p data-astro-cid-r7auhxne>Nothing on this timeline is anyone's fault. Each change was reasonable and urgent. The damage is cumulative, which is exactly the kind of damage no single person is responsible for catching.</p>",
    '<p data-astro-cid-r7auhxne>KlearNow holds customs licences in the United States, Canada, the United Kingdom, the Netherlands, and Spain. Same platform, same data model, same audit trail in each of them.</p>',
  );
}

/** KlearHub: drop Legency rot callout strip (“On a retainer”). */
export function removeKlearHubRotFixStrip(mainHtml: string): string {
  if (!mainHtml.includes('On a retainer')) return mainHtml;

  return mainHtml.replace(
    /<div class="rot__fix"[^>]*>[\s\S]*?On a retainer[\s\S]*?<\/div>/,
    '',
  );
}

/** KlearHub: drop Legency turnaround bands (“Every Request Gets a Committed Turnaround”). */
export function removeKlearHubTurnaroundBandsSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section bands"',
    'Turnaround You Can Plan Around',
  );
}

/** KlearHub: Legency Blueflame caseband (Post Entry caseband below testimonials is kept). */
export function removeKlearHubBlueflameCasebandSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="caseband"',
    'Organic visits up 77% through an acquisition and rebrand',
  );
}

function applyKlearDataFoundationPatches(mainHtml: string): string {
  let html = mainHtml;
  html = patchKlearDataFoundationLabel(html);
  html = patchKlearDataFoundationHeading(html);
  html = patchKlearDataFoundationCard1Title(html);
  html = patchKlearDataFoundationCard1Body(html);
  html = patchKlearDataFoundationCard2Title(html);
  html = patchKlearDataFoundationCard2Body(html);
  html = patchKlearDataFoundationCard3Title(html);
  html = patchKlearDataFoundationCard3Body(html);
  return html;
}

let klearDataFoundationSectionCache: string | null = null;

/** Patched KlearData foundation block (from enterprise mirror). */
function getKlearDataFoundationSection(): string {
  if (klearDataFoundationSectionCache) return klearDataFoundationSectionCache;

  const html = applyKlearDataFoundationPatches(enterpriseMirror.mainHtml);
  const start = html.indexOf('<section class="section foundation"');
  const section = start === -1 ? '' : (sliceSectionAt(html, start) ?? '');
  klearDataFoundationSectionCache = section;
  return section;
}

/** KlearHub: KlearData foundation directly after svc-hero. */
export function insertKlearHubKlearDataFoundationAfterHero(mainHtml: string): string {
  const foundation = getKlearDataFoundationSection();
  if (!foundation) return mainHtml;

  const heroStart = mainHtml.indexOf('<section class="svc-hero');
  if (heroStart === -1) return mainHtml;

  const afterHero = indexOfSectionEnd(mainHtml, heroStart);
  if (afterHero === -1) return mainHtml;

  const following = mainHtml.slice(afterHero, afterHero + 400);
  if (klearHubHasInsertedFoundation(following)) return mainHtml;

  return mainHtml.slice(0, afterHero) + foundation + mainHtml.slice(afterHero);
}

/** KlearHub: drop Legency retainer foundation band (“Four Things…”). */
export function removeKlearHubLegencyFoundationSection(mainHtml: string): string {
  return removeSectionContaining(
    mainHtml,
    '<section class="section foundation"',
    'Four Things You Stop Worrying About',
  );
}

/** KlearHub foundation eyebrow (KlearData keeps “Before anything else works”). */
export function patchKlearHubFoundationLabel(mainHtml: string): string {
  if (!klearHubHasInsertedFoundation(mainHtml)) return mainHtml;

  return mainHtml.replace(
    /<span class="label" data-astro-cid-6q4o4ab6>Before anything else works<\/span>/,
    '<span class="label" data-astro-cid-6q4o4ab6>The operating problem</span>',
  );
}

/** KlearHub foundation headline (KlearData keeps “The data has to be right first”). */
export function patchKlearHubFoundationHeading(mainHtml: string): string {
  if (!klearHubHasInsertedFoundation(mainHtml)) return mainHtml;
  if (mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h2 class="foundation__heading"([^>]*)>The data has to be right first<\/h2>/,
    `<h2 class="foundation__heading"$1>${KLEAR_HUB_FOUNDATION_HEADING}</h2>`,
  );
}

/** KlearHub foundation subcopy (KlearData keeps data-problem intro). */
export function patchKlearHubFoundationSub(mainHtml: string): string {
  if (!klearHubHasInsertedFoundation(mainHtml)) return mainHtml;

  return mainHtml.replace(
    `<p class="foundation__sub" data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_SUB}</p>`,
    `<p class="foundation__sub" data-astro-cid-6q4o4ab6>${KLEAR_HUB_FOUNDATION_SUB}</p>`,
  );
}

const KLEAR_HUB_FOUNDATION_CARD1_TITLE = 'Every system holds part of the picture';

/** KlearHub foundation card 1 title. */
export function patchKlearHubFoundationCard1Title(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h3([^>]*)>Your documents arrive in fifty formats<\/h3>/,
    `<h3$1>${KLEAR_HUB_FOUNDATION_CARD1_TITLE}</h3>`,
  );
}

const KLEAR_HUB_FOUNDATION_CARD1_BODY =
  'The broker portal knows the entry. The spreadsheet knows the duty. Neither one knows what the other changed.';

/** KlearHub foundation card 1 body. */
export function patchKlearHubFoundationCard1Body(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD1_BODY}</p>`,
    `<p data-astro-cid-6q4o4ab6>${KLEAR_HUB_FOUNDATION_CARD1_BODY}</p>`,
  );
}

const KLEAR_HUB_FOUNDATION_CARD2_TITLE = 'Nobody can answer where it is';

/** KlearHub foundation card 2 title. */
export function patchKlearHubFoundationCard2Title(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h3([^>]*)>Someone keys it in by hand<\/h3>/,
    `<h3$1>${KLEAR_HUB_FOUNDATION_CARD2_TITLE}</h3>`,
  );
}

const KLEAR_HUB_FOUNDATION_CARD2_BODY =
  '“Where is my shipment” becomes three phone calls and an email thread, every time somebody asks.';

/** KlearHub foundation card 2 body. */
export function patchKlearHubFoundationCard2Body(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD2_BODY}</p>`,
    `<p data-astro-cid-6q4o4ab6>${KLEAR_HUB_FOUNDATION_CARD2_BODY}</p>`,
  );
}

const KLEAR_HUB_FOUNDATION_CARD3_TITLE = 'The record you need is in an inbox';

/** KlearHub foundation card 3 title. */
export function patchKlearHubFoundationCard3Title(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    /<h3([^>]*)>The mistake surfaces at audit<\/h3>/,
    `<h3$1>${KLEAR_HUB_FOUNDATION_CARD3_TITLE}</h3>`,
  );
}

const KLEAR_HUB_FOUNDATION_CARD3_BODY =
  'When an audit lands, the document that proves the value is attached to a message someone sent last March.';

/** KlearHub foundation card 3 body. */
export function patchKlearHubFoundationCard3Body(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  return mainHtml.replace(
    `<p data-astro-cid-6q4o4ab6>${KLEAR_DATA_FOUNDATION_CARD3_BODY}</p>`,
    `<p data-astro-cid-6q4o4ab6>${KLEAR_HUB_FOUNDATION_CARD3_BODY}</p>`,
  );
}


/** KlearHub foundation card icons — match Hub problem copy. */
export function patchKlearHubFoundationCardIcons(mainHtml: string): string {
  if (!mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING)) return mainHtml;

  let html = mainHtml;
  html = patchFoundCardIconByTitle(
    html,
    KLEAR_HUB_FOUNDATION_CARD1_TITLE,
    klearFoundationIconSvg(ICON_LAYOUT),
  );
  html = patchFoundCardIconByTitle(
    html,
    KLEAR_HUB_FOUNDATION_CARD2_TITLE,
    klearFoundationIconSvg(ICON_MAP_PIN),
  );
  html = patchFoundCardIconByTitle(
    html,
    KLEAR_HUB_FOUNDATION_CARD3_TITLE,
    klearFoundationIconSvg(ICON_MAIL),
  );
  return html;
}

/** Managed Trade foundation card icons — staffing, volume risk, coverage gaps. */
export function patchManagedTradeFoundationCardIcons(mainHtml: string): string {
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_HEADING)) return mainHtml;
  if (!mainHtml.includes(MANAGED_TRADE_FOUNDATION_CARD1_TITLE)) return mainHtml;

  let html = mainHtml;
  html = patchFoundCardIconByTitle(
    html,
    MANAGED_TRADE_FOUNDATION_CARD1_TITLE,
    klearFoundationIconSvg(ICON_USERS),
  );
  html = patchFoundCardIconByTitle(
    html,
    MANAGED_TRADE_FOUNDATION_CARD2_TITLE,
    klearFoundationIconSvg(ICON_TREND_UP),
  );
  html = patchFoundCardIconByTitle(
    html,
    MANAGED_TRADE_FOUNDATION_CARD3_TITLE,
    klearFoundationIconSvg(ICON_USER_X),
  );

  return patchManagedTradeFoundationCardIconChips(html);
}

/** Managed Trade foundation cards — bare Klear stroke chips (not 48px Legency tiles). */
export function patchManagedTradeFoundationCardIconChips(mainHtml: string): string {
  return patchFoundationBareIconChips(mainHtml, MANAGED_TRADE_FOUNDATION_HEADING);
}

/** KlearHub foundation bare chips (icons patched separately). */
export function patchKlearHubFoundationBareIconChips(mainHtml: string): string {
  return patchFoundationBareIconChips(mainHtml, KLEAR_HUB_FOUNDATION_HEADING);
}

function patchHubServiceChoiceIconByTitle(mainHtml: string, title: string, paths: string): string {
  return patchServiceChoiceIconByTitle(mainHtml, title, paths);
}

/** KlearHub #home-services — stroke icons matched to Hub module copy (KlearData keeps KlearData icons). */
export function patchKlearHubHomeServicesCardIcons(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  let html = mainHtml;
  html = patchHubServiceChoiceIconByTitle(html, 'File your own customs', ICON_FILE_CHECK);
  html = patchHubServiceChoiceIconByTitle(html, 'Work with the brokers you already have', ICON_USERS);
  html = patchHubServiceChoiceIconByTitle(html, 'See every shipment', ICON_MAP_PIN);
  html = patchHubServiceChoiceIconByTitle(html, 'Turn history into decisions', ICON_LANDED_COST);
  html = patchHubServiceChoiceIconByTitle(html, 'Stay audit-ready', ICON_BRIEFCASE);
  html = patchHubServiceChoiceIconByTitle(html, 'One parts library', ICON_LAYERS);
  html = patchHubServiceChoiceIconByTitle(html, 'Clearance and filing workspace', ICON_SHIELD_CHECK);
  html = patchHubServiceChoiceIconByTitle(html, 'Never miss a milestone', ICON_BELL);
  html = patchHubServiceChoiceIconByTitle(html, "Find money you're owed", ICON_FILE_SEARCH);
  return html;
}

/** KlearHub: KlearData “What it does” / #home-services after foundation. */
export function insertKlearHubHomeServicesAfterFoundation(mainHtml: string): string {
  if (mainHtml.includes('id="home-services"')) return mainHtml;
  if (!klearHubHasInsertedFoundation(mainHtml)) return mainHtml;

  const foundationStart = mainHtml.indexOf('<section class="section foundation"');
  if (foundationStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, foundationStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearDataEntryLineSection + mainHtml.slice(insertAt);
}


/** KlearHub-style #home-services band (KlearHub foundation or Managed Trade migration). */
function klearHubPrimaryHomeServicesPage(mainHtml: string): boolean {
  return (
    mainHtml.includes(KLEAR_HUB_FOUNDATION_HEADING) ||
    hasManagedTradeMigrationContentBand(mainHtml)
  );
}

/** KlearHub #home-services eyebrow (KlearData keeps “What it does”). */
export function patchKlearHubHomeServicesLabel(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<span class="label" data-astro-cid-jg2u4s4c>What it does</span><h2 data-no-roll id="services-title"',
    '<span class="label" data-astro-cid-jg2u4s4c>What is included</span><h2 data-no-roll id="services-title"',
  );
}

/** KlearHub #home-services heading (KlearData keeps “From inbox to filing-ready”). */
export function patchKlearHubHomeServicesTitle(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>From inbox to filing-ready</h2>',
    '<h2 data-no-roll id="services-title" data-astro-cid-jg2u4s4c>Everything the operation needs, in one system</h2>',
  );
}

/** KlearHub #home-services intro (KlearData keeps KlearData front-of-operation copy). */
export function patchKlearHubHomeServicesSub(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<p data-astro-cid-jg2u4s4c>KlearData sits at the front of the operation. It reads, classifies, and validates every document before anyone touches an entry.</p>',
    '<p data-astro-cid-jg2u4s4c>Nine modules that share the same data. Take the platform, or take only the pieces that close a gap you already have.</p>',
  );
}

const KLEAR_HUB_HOME_SERVICES_EXTRA_SENTINEL = 'Clearance and filing workspace';

/** KlearHub: append File / Track / Audit cards (9 modules with KlearData’s six). */
export function appendKlearHubHomeServicesCards(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;
  if (mainHtml.includes(KLEAR_HUB_HOME_SERVICES_EXTRA_SENTINEL)) return mainHtml;

  const anchor =
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Audits always on</h3><p data-astro-cid-jg2u4s4c>Every extracted field traceable back to the source document.</p></article>';

  if (!mainHtml.includes(anchor)) return mainHtml;

  return mainHtml.replace(anchor, `${anchor}${klearHubHomeServicesExtraCards}`);
}

/** KlearHub cards 7–9: refresh legacy append copy (labels / titles / bodies). */
export function patchKlearHubHomeServicesExtraCards(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;
  if (!mainHtml.includes('Clearance and filing workspace')) return mainHtml;
  if (mainHtml.includes('USER &amp; ENTITY MGMT · SSO')) return mainHtml;

  let html = mainHtml;
  const swaps: [string, string][] = [
    [
      '<span data-astro-cid-jg2u4s4c>File</span></span></div><hr class="service-choice__divider" aria-hidden="true" data-astro-cid-jg2u4s4c><h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Clearance and filing workspace</h3>',
      '<span data-astro-cid-jg2u4s4c>USER &amp; ENTITY MGMT · SSO</span></span></div><hr class="service-choice__divider" aria-hidden="true" data-astro-cid-jg2u4s4c><h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Clearance and filing workspace</h3>',
    ],
    [
      '<span data-astro-cid-jg2u4s4c>Track</span></span></div><hr class="service-choice__divider" aria-hidden="true" data-astro-cid-jg2u4s4c><h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Live shipment visibility</h3><p data-astro-cid-jg2u4s4c>Status, holds, and milestones in one place—without broker callbacks or a fresh email thread.</p>',
      '<span data-astro-cid-jg2u4s4c>NOTIFICATIONS</span></span></div><hr class="service-choice__divider" aria-hidden="true" data-astro-cid-jg2u4s4c><h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Never miss a milestone</h3><p data-astro-cid-jg2u4s4c>Alerts across email, app, and mobile.</p>',
    ],
    [
      '<span data-astro-cid-jg2u4s4c>Audit</span></span></div><hr class="service-choice__divider" aria-hidden="true" data-astro-cid-jg2u4s4c><h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Corrections and refund recovery</h3><p data-astro-cid-jg2u4s4c>Amend entries, reconcile duties, and catch overpayments while the record and source documents are still connected.</p>',
      '<span data-astro-cid-jg2u4s4c>POST-ENTRY AUDIT · PSC · CAPE</span></span></div><hr class="service-choice__divider" aria-hidden="true" data-astro-cid-jg2u4s4c><h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Find money you\'re owed</h3><p data-astro-cid-jg2u4s4c>Recover overpaid duty, self-serve.</p>',
    ],
  ];
  for (const [from, to] of swaps) {
    html = html.replace(from, to);
  }
  return html;
}

/** KlearHub home-services card 1 title (KlearData keeps “Auto-read documents”). */
export function patchKlearHubHomeServicesCard1Title(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<span data-astro-cid-jg2u4s4c>Ingest<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Auto-read documents(<\/h3>)/,
    '$1File your own customs$2',
  );
}

/** KlearHub home-services card 1 eyebrow (KlearData keeps “Ingest”). */
export function patchKlearHubHomeServicesCard1Label(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<div class="service-choice__iconhead" data-astro-cid-jg2u4s4c>[\s\S]*?<span class="service-choice__top" data-astro-cid-jg2u4s4c><span data-astro-cid-jg2u4s4c>)Ingest(<\/span>)/,
    '$1CUSTOMS MODULES · US, CA, UK, NL, ES$2',
  );
}

/** KlearHub home-services card 2 title (KlearData keeps “Accurate data capture”). */
export function patchKlearHubHomeServicesCard2Title(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<span data-astro-cid-jg2u4s4c>Extract<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Accurate data capture(<\/h3>)/,
    '$1Work with the brokers you already have$2',
  );
}

/** KlearHub home-services card 3 body (KlearData keeps comply copy). */
export function patchKlearHubHomeServicesCard3Body(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>See every shipment</h3><p data-astro-cid-jg2u4s4c>Surfaces Sec 232, Sec 301, and USMCA implications for review before you file.</p>',
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>See every shipment</h3><p data-astro-cid-jg2u4s4c>One place to answer "where is my shipment?"</p>',
  );
}

/** KlearHub home-services card 3 eyebrow (KlearData keeps “Comply”). */
export function patchKlearHubHomeServicesCard3Label(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /<span data-astro-cid-jg2u4s4c>Comply<\/span>/,
    '<span data-astro-cid-jg2u4s4c>TRACK &amp; TRACE</span>',
  );
}

/** KlearHub home-services card 3 title (KlearData keeps “Built-in tariff rules”). */
export function patchKlearHubHomeServicesCard3Title(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<span data-astro-cid-jg2u4s4c>Comply<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Built-in tariff rules(<\/h3>)/,
    '$1See every shipment$2',
  );
}

/** KlearHub home-services card 5 title (KlearData keeps “Rules that run on arrival”). */
export function patchKlearHubHomeServicesCard5Title(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<span data-astro-cid-jg2u4s4c>SOP Automation<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Rules that run on arrival(<\/h3>)/,
    '$1Stay audit-ready$2',
  );
}

/** KlearHub home-services card 6 title (KlearData keeps “Audits always on”). */
export function patchKlearHubHomeServicesCard6Title(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<span data-astro-cid-jg2u4s4c>Agentic Framework<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Audits always on(<\/h3>)/,
    '$1One parts library$2',
  );
}

/** KlearHub home-services card 6 eyebrow (KlearData keeps “Agentic Framework”). */
export function patchKlearHubHomeServicesCard6Label(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /<span data-astro-cid-jg2u4s4c>Agentic Framework<\/span>/,
    '<span data-astro-cid-jg2u4s4c>MASTER DATA · PARTS</span>',
  );
}

/** KlearHub home-services card 6 body (KlearData keeps agentic copy). */
export function patchKlearHubHomeServicesCard6Body(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>One parts library</h3><p data-astro-cid-jg2u4s4c>Every extracted field traceable back to the source document.</p>',
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>One parts library</h3><p data-astro-cid-jg2u4s4c>Consistent part data on every entry.</p>',
  );
}

/** KlearHub home-services card 5 eyebrow (KlearData keeps “SOP Automation”). */
export function patchKlearHubHomeServicesCard5Label(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /<span data-astro-cid-jg2u4s4c>SOP Automation<\/span>/,
    '<span data-astro-cid-jg2u4s4c>DOCUMENT RETANTION</span>',
  );
}

/** KlearHub home-services card 5 body (KlearData keeps SOP automation copy). */
export function patchKlearHubHomeServicesCard5Body(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Stay audit-ready</h3><p data-astro-cid-jg2u4s4c>Restriction rules, address validation, and party checks fire on every document as it lands.</p>',
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Stay audit-ready</h3><p data-astro-cid-jg2u4s4c>Retention aligned to recordkeeping requirements.</p>',
  );
}

/** KlearHub home-services card 4 eyebrow (KlearData keeps “Transform”). */
export function patchKlearHubHomeServicesCard4Label(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /<span data-astro-cid-jg2u4s4c>Transform<\/span>/,
    '<span data-astro-cid-jg2u4s4c>ANALYTICS</span>',
  );
}

/** KlearHub home-services card 4 title (KlearData keeps “Ready-to-file output”). */
export function patchKlearHubHomeServicesCard4Title(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /(<span data-astro-cid-jg2u4s4c>Transform<\/span>[\s\S]*?<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>)Ready-to-file output(<\/h3>)/,
    '$1Turn history into decisions$2',
  );
}

/** KlearHub home-services card 4 body (KlearData keeps transform copy). */
export function patchKlearHubHomeServicesCard4Body(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Turn history into decisions</h3><p data-astro-cid-jg2u4s4c>Extract once, use everywhere.</p>',
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Turn history into decisions</h3><p data-astro-cid-jg2u4s4c>See duty spend and risk before it happens.</p>',
  );
}

/** KlearHub home-services card 2 body (KlearData keeps extract copy). */
export function patchKlearHubHomeServicesCard2Body(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Work with the brokers you already have</h3><p data-astro-cid-jg2u4s4c>Get it right the first time, over 98% accurate document determination.</p>',
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>Work with the brokers you already have</h3><p data-astro-cid-jg2u4s4c>Bring existing broker relationships into one view instead of replacing them.</p>',
  );
}

/** KlearHub home-services card 2 eyebrow (KlearData keeps “Extract”). */
export function patchKlearHubHomeServicesCard2Label(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    /<span data-astro-cid-jg2u4s4c>Extract<\/span>/,
    '<span data-astro-cid-jg2u4s4c>BROKER CONNECTIVITY</span>',
  );
}

/** KlearHub home-services card 1 body (KlearData keeps ingest copy). */
export function patchKlearHubHomeServicesCard1Body(mainHtml: string): string {
  if (!klearHubPrimaryHomeServicesPage(mainHtml)) return mainHtml;
  if (!mainHtml.includes('id="home-services"')) return mainHtml;

  return mainHtml.replace(
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>File your own customs</h3><p data-astro-cid-jg2u4s4c>No uploads, no re-keying, no integration to get started.</p>',
    '<h3 class="service-choice__title" data-astro-cid-jg2u4s4c>File your own customs</h3><p data-astro-cid-jg2u4s4c>Run entries in-house: ISF, in-bond, delivery orders, and more.</p>',
  );
}

let klearDataDpBudgetAndCasebandCache: { dp: string; caseband: string } | null = null;

/** KlearData “Where the data goes next” dp + post-entry caseband (from enterprise mirror patches). */
function getKlearDataDpBudgetAndCasebandSections(): { dp: string; caseband: string } {
  if (!import.meta.env.DEV && klearDataDpBudgetAndCasebandCache) {
    return klearDataDpBudgetAndCasebandCache;
  }

  let html = enterpriseMirror.mainHtml;
  html = patchKlearDataDpBudgetLabel(html);
  html = removeKlearDataDpFoot(html);
  html = removeKlearDataDpBudgetCard3(html);
  html = replaceKlearDataDpBudgetCardsWithServiceChoices(html);
  html = patchKlearDataCasebandHeading(html);
  html = patchKlearDataCasebandText(html);
  html = removeKlearDataCasebandChip(html);

  let dp =
    extractSectionContaining(html, '<section class="section dp"', 'Where the data goes next') ??
    '';
  dp = dp.replace(/<div class="container" data-astro-cid-biwego7o>\s*<\/div>/, '');
  const caseband =
    extractSectionContaining(html, '<section class="caseband"', 'Post Entry Audit Finds') ?? '';

  const sections = { dp, caseband };
  if (!import.meta.env.DEV) klearDataDpBudgetAndCasebandCache = sections;
  return sections;
}

function removeLegencyCasebandSections(mainHtml: string): string {
  let html = mainHtml;
  let pos = 0;
  while (true) {
    const start = html.indexOf('<section class="caseband"', pos);
    if (start === -1) return html;
    const end = indexOfSectionEnd(html, start);
    if (end === -1) return html;
    const section = html.slice(start, end);
    if (section.includes('Post Entry Audit Finds')) {
      pos = end;
      continue;
    }
    html = html.slice(0, start) + html.slice(end);
    pos = start;
  }
}

function removeAllFaqSections(mainHtml: string): string {
  let html = mainHtml;
  while (html.includes('<section class="section faq"')) {
    const next = removeKlearDataFaqSection(html);
    if (next === html) break;
    html = next;
  }
  return html;
}

/** Drop Legency service closers so Klear dp → caseband → testimonials can sit at page end (KlearHub order). */
export function stripLegencyTailBeforeKlearClosingStack(mainHtml: string): string {
  let html = removeKlearDataCtabandSection(mainHtml);
  html = removeAllFaqSections(html);
  html = removeLegencyCasebandSections(html);

  let changed = true;
  while (changed) {
    changed = false;
    const trimmed = html.trimEnd();
    for (const marker of ['<section class="page-brief"', '<section class="section dp"']) {
      const start = trimmed.lastIndexOf(marker);
      if (start === -1) continue;
      const end = indexOfSectionEnd(trimmed, start);
      if (end === -1) continue;
      if (trimmed.slice(end).trim() !== '') continue;
      const section = trimmed.slice(start, end);
      if (
        marker.includes('section dp') &&
        (section.includes('Where the data goes next') ||
          section.includes('File it yourself, or hand it off') ||
          section.includes('id="migration-content"') ||
          section.includes('Outsourcing clearance'))
      ) {
        continue;
      }
      html = trimmed.slice(0, start).trimEnd();
      changed = true;
      break;
    }
  }

  return html;
}

/** Product + Operation TYpe pages: KlearHub closing stack (Where it fits dp → post-entry caseband → testimonials). */
export function applyKlearProductClosingStack(mainHtml: string, mirrorSlug: string): string {
  let html = stripLegencyTailBeforeKlearClosingStack(mainHtml);
  html = insertKlearDataTestimonialsAboveFooter(html);
  html = insertKlearHubDpAndCasebandBeforeTestimonials(html);
  if (mirrorSlug === 'services__astro-agency') {
    html = insertSelfFilersHomeServicesBeforeCaseband(html);
    html = removeSelfFilersHomeServicesBottomRow(html);
    html = removeSelfFilersHomeServicesIntro(html);
    html = patchSelfFilersHomeServicesTitle(html);
    html = removeSelfFilersHomeServicesLabel(html);
    html = patchSelfFilersHomeServicesCard1Title(html);
    html = patchSelfFilersHomeServicesCard1Body(html);
    html = patchSelfFilersHomeServicesCard2Title(html);
    html = patchSelfFilersHomeServicesCard2Body(html);
    html = patchSelfFilersHomeServicesCard3Body(html);
    html = patchSelfFilersHomeServicesCard3Title(html);
    html = removeSelfFilersHomeServicesCardLabels(html);
    html = restructureSelfFilersHomeServicesAsFoundationCards(html);
  }
  if (html.includes('File it yourself, or hand it off')) {
    html = patchKlearClosingDpServiceChoicesForSlug(html, mirrorSlug);
    html = patchKlearHubDpHead(html, mirrorSlug);
  }
  if (isKlearOperationMirror(mirrorSlug)) {
    html = removeKlearOperationEvoSections(html);
    html = removeKlearOperationClosingDpSection(html);
    html = removeKlearOperationAuditSection(html);
    html = removeKlearOperationProofSection(html);
    html = removeKlearOperationCrawlSection(html);
    html = removeKlearOperationRegressLabel(html);
    html = patchKlearOperationRegressHeading(html);
    html = patchKlearOperationRegressCard1Title(html);
    html = patchKlearOperationRegressCard1Body(html);
    html = patchKlearOperationRegressCard2Title(html);
    html = patchKlearOperationRegressCard2Body(html);
    html = patchKlearOperationRegressCard3Title(html);
    html = patchKlearOperationRegressCard3Body(html);
    html = removeKlearOperationRegressFoot(html);
    html = removeKlearOperationRegressThirdPartyCard(html);
  }
  return html;
}

function klearClosingDpHeadingPatternSource(): string {
  const headings = [
    KLEAR_CLOSING_DP_HEADING_DEFAULT,
    KLEAR_HUB_CLOSING_DP_HEADING,
    MANAGED_TRADE_CLOSING_DP_HEADING,
  ].map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return `(?:${headings.join('|')})`;
}

function klearClosingDpCustomHeading(mirrorSlug: string): string | null {
  if (mirrorSlug === 'services__webflow-support') return KLEAR_HUB_CLOSING_DP_HEADING;
  if (mirrorSlug === 'services__wordpress-to-webflow-migration') return MANAGED_TRADE_CLOSING_DP_HEADING;
  return null;
}

/** Shared closing dp band: eyebrow + sub (KlearData page keeps foundation sub). */
export function patchKlearHubDpHead(mainHtml: string, mirrorSlug: string): string {
  const hasClosingDp =
    mainHtml.includes(KLEAR_CLOSING_DP_HEADING_DEFAULT) ||
    mainHtml.includes(KLEAR_HUB_CLOSING_DP_HEADING) ||
    mainHtml.includes(MANAGED_TRADE_CLOSING_DP_HEADING);
  if (!hasClosingDp) return mainHtml;

  const isManagedTradeClosing = mirrorSlug === 'services__wordpress-to-webflow-migration';
  const sub =
    mirrorSlug === 'services__webflow-enterprise'
      ? KLEAR_DATA_DP_BUDGET_SUB
      : isManagedTradeClosing
        ? MANAGED_TRADE_CLOSING_DP_SUB
        : KLEAR_HUB_DP_SUB;

  let html = mainHtml.replace(
    new RegExp(
      `<span class="label" data-astro-cid-biwego7o>(?:Where the data goes next|Where it fits)<\\/span>(?=[\\s\\S]*?<h2 class="dp__heading" data-astro-cid-biwego7o>${klearClosingDpHeadingPatternSource()}<\\/h2>)`,
    ),
    `<span class="label" data-astro-cid-biwego7o>${KLEAR_HUB_DP_LABEL}</span>`,
  );
  html = html.replace(
    `<p class="dp__sub" data-astro-cid-biwego7o>${KLEAR_DATA_DP_BUDGET_SUB}</p>`,
    `<p class="dp__sub" data-astro-cid-biwego7o>${sub}</p>`,
  );
  html = html.replace(
    `<p class="dp__sub" data-astro-cid-biwego7o>${KLEAR_HUB_DP_SUB}</p>`,
    `<p class="dp__sub" data-astro-cid-biwego7o>${sub}</p>`,
  );

  const customHeading = klearClosingDpCustomHeading(mirrorSlug);
  if (customHeading) {
    html = html.replace(
      /<h2 class="dp__heading" data-astro-cid-biwego7o>File it yourself, or hand it off<\/h2>/,
      `<h2 class="dp__heading" data-astro-cid-biwego7o>${customHeading}</h2>`,
    );
  }

  return html;
}

/** Replace the two closing dp service-choice cards for this mirror slug (same layout, different destinations). */
export function patchKlearClosingDpServiceChoicesForSlug(mainHtml: string, mirrorSlug: string): string {
  if (!mainHtml.includes('File it yourself, or hand it off')) return mainHtml;

  const headingAt = mainHtml.indexOf('File it yourself, or hand it off');
  const sectionStart = mainHtml.lastIndexOf('<section class="section dp"', headingAt);
  if (sectionStart === -1) return mainHtml;

  const sectionEnd = indexOfSectionEnd(mainHtml, sectionStart);
  if (sectionEnd === -1) return mainHtml;

  const choices = buildClosingDpServiceChoicesHtml(mirrorSlug);
  const containerPattern =
    /<div class="container" data-astro-cid-jg2u4s4c><div class="service-choices" data-astro-cid-jg2u4s4c>[\s\S]*?<\/div><\/div>/;

  let section = mainHtml.slice(sectionStart, sectionEnd);
  if (!containerPattern.test(section)) return mainHtml;

  section = section.replace(containerPattern, choices);
  return mainHtml.slice(0, sectionStart) + section + mainHtml.slice(sectionEnd);
}

/** KlearHub: same dp + caseband as KlearData, directly above testimonials. */
export function insertKlearHubDpAndCasebandBeforeTestimonials(mainHtml: string): string {
  const { dp, caseband } = getKlearDataDpBudgetAndCasebandSections();
  if (!dp || !caseband) return mainHtml;

  const testimonialAt = mainHtml.indexOf('<section class="testimonials section"');
  if (testimonialAt === -1) return mainHtml;

  const beforeTestimonials = mainHtml.slice(0, testimonialAt);
  if (
    (beforeTestimonials.includes('Where the data goes next') ||
      beforeTestimonials.includes(KLEAR_HUB_DP_LABEL)) &&
    beforeTestimonials.includes('Post Entry Audit Finds')
  ) {
    return mainHtml;
  }

  return beforeTestimonials + dp + caseband + mainHtml.slice(testimonialAt);
}

/** Client testimonials slider — above footer (after CTA band when FAQ removed). */
export function insertKlearDataTestimonialsAboveFooter(mainHtml: string): string {
  if (mainHtml.includes('class="testimonials section"')) return mainHtml;

  const faqStart = mainHtml.lastIndexOf('<section class="section faq"');
  if (faqStart !== -1) {
    const insertAt = indexOfSectionEnd(mainHtml, faqStart);
    if (insertAt !== -1) {
      return mainHtml.slice(0, insertAt) + klearDataTestimonialsSection + mainHtml.slice(insertAt);
    }
  }

  const ctaStart = mainHtml.lastIndexOf('<section class="ctaband"');
  if (ctaStart !== -1) {
    const insertAt = indexOfSectionEnd(mainHtml, ctaStart);
    if (insertAt !== -1) {
      return mainHtml.slice(0, insertAt) + klearDataTestimonialsSection + mainHtml.slice(insertAt);
    }
  }

  const casebandStart = mainHtml.lastIndexOf('<section class="caseband"');
  if (casebandStart !== -1) {
    const insertAt = indexOfSectionEnd(mainHtml, casebandStart);
    if (insertAt !== -1) {
      return mainHtml.slice(0, insertAt) + klearDataTestimonialsSection + mainHtml.slice(insertAt);
    }
  }

  return mainHtml + klearDataTestimonialsSection;
}

const CUSTOM_BROKERS_HERO_TITLE_FLAT = 'Scale Entry Throughput. Cut Errors. Keep Clients Informed';
const CUSTOM_BROKERS_HERO_TITLE =
  'Scale Entry Throughput.<br data-astro-cid-asdozulm>Cut Errors.<br data-astro-cid-asdozulm>Keep Clients Informed';

const CUSTOM_BROKERS_HERO_TITLE_LEGACY =
  "See What's Clearing, What's Stuck, and What It Costs — In Real Time";
const CUSTOM_BROKERS_HERO_TITLE_LEGACY_HTML =
  "See What's Clearing,<br data-astro-cid-asdozulm>What's Stuck, and What It Costs —<br data-astro-cid-asdozulm>In Real Time";

/** Custom Brokers (`/custom-brokers/`, aeo-agency mirror). */
export function patchCustomBrokersSvcHeroTitle(mainHtml: string): string {
  const target = `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${CUSTOM_BROKERS_HERO_TITLE}</h1>`;
  if (mainHtml.includes(target)) return mainHtml;

  let html = mainHtml.replace(
    /<h1 class="svc-hero__title"[^>]*>[\s\S]*?<\/h1>/,
    target,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${CUSTOM_BROKERS_HERO_TITLE_FLAT}</h1>`,
    target,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${CUSTOM_BROKERS_HERO_TITLE_LEGACY}</h1>`,
    target,
  );
  html = html.replace(
    `<h1 class="svc-hero__title" data-astro-cid-asdozulm>${CUSTOM_BROKERS_HERO_TITLE_LEGACY_HTML}</h1>`,
    target,
  );
  return html;
}

/** Custom Brokers — drop Legency svc-hero eyebrow (Services, AEO Agency, etc.). */
export function removeCustomBrokersSvcHeroLabel(mainHtml: string): string {
  const heroStart = mainHtml.indexOf('<section class="svc-hero"');
  if (heroStart === -1) return mainHtml;
  const heroEnd = indexOfSectionEnd(mainHtml, heroStart);
  if (heroEnd === -1) return mainHtml;

  const hero = mainHtml.slice(heroStart, heroEnd);
  const withoutLabel = hero.replace(/<span class="label"[^>]*>[\s\S]*?<\/span>\s*/, '');
  if (withoutLabel === hero) return mainHtml;

  return mainHtml.slice(0, heroStart) + withoutLabel + mainHtml.slice(heroEnd);
}

/** Custom Brokers (`/custom-brokers/`, aeo-agency mirror). */
export function patchCustomBrokersSvcHeroCta(mainHtml: string): string {
  return patchKlearSvcHeroCta(mainHtml);
}

const CUSTOM_BROKERS_SVC_HERO_SUB =
  'Turn emailed documents into clean data, validate instantly, and file faster — without adding headcount.';

/** Custom Brokers (`/custom-brokers/`, aeo-agency mirror). */
export function patchCustomBrokersSvcHeroSub(mainHtml: string): string {
  const target = `<p class="svc-hero__sub" data-astro-cid-asdozulm>${CUSTOM_BROKERS_SVC_HERO_SUB}</p>`;
  if (mainHtml.includes(target)) return mainHtml;

  const heroStart = mainHtml.indexOf('<section class="svc-hero"');
  if (heroStart === -1) return mainHtml;
  const heroEnd = indexOfSectionEnd(mainHtml, heroStart);
  if (heroEnd === -1) return mainHtml;

  const hero = mainHtml.slice(heroStart, heroEnd);
  const patchedHero = hero.replace(/<p class="svc-hero__sub"[^>]*>[\s\S]*?<\/p>/, target);
  if (patchedHero === hero) return mainHtml;

  return mainHtml.slice(0, heroStart) + patchedHero + mainHtml.slice(heroEnd);
}

const KLEAR_DATA_SVC_HERO_SUB =
  'Turn emailed documents into clean data, validate instantly, and file faster — without adding headcount.';

export function patchKlearDataSvcHeroSub(mainHtml: string): string {
  const target = `<p class="svc-hero__sub" data-astro-cid-asdozulm>${KLEAR_DATA_SVC_HERO_SUB}</p>`;
  if (mainHtml.includes(target)) return mainHtml;

  const replaced = mainHtml.replace(/<p class="svc-hero__sub"[^>]*>[\s\S]*?<\/p>/, target);
  return replaced === mainHtml ? mainHtml : replaced;
}

export function insertTurnaroundBandsAfterQuote(mainHtml: string): string {
  if (mainHtml.includes('class="section bands"')) return mainHtml;

  const afterQuote = '</section><section class="greviews"';
  const idx = mainHtml.indexOf(afterQuote);
  if (idx === -1) return mainHtml;

  const insertAt = idx + '</section>'.length;
  return mainHtml.slice(0, insertAt) + homeBandsSection + mainHtml.slice(insertAt);
}

/** Astro agency “How we can help” cards (from services/astro-agency). */
export function insertAstroServicesAfterBands(mainHtml: string): string {
  if (mainHtml.includes('class="astro-services section"')) return mainHtml;

  const bandsStart = mainHtml.indexOf('<section class="section bands"');
  if (bandsStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, bandsStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + homeAstroServicesSection + mainHtml.slice(insertAt);
}

/** “The Real Cost” drift timeline (mirrored from webflow-support), after entry-line cards. */
export function insertRotSectionAfterEntryLine(mainHtml: string): string {
  let html = mainHtml;

  const existingRot = html.indexOf('<section class="section rot"');
  if (existingRot !== -1) {
    const rotEnd = indexOfSectionEnd(html, existingRot);
    if (rotEnd === -1) return html;
    html = html.slice(0, existingRot) + html.slice(rotEnd);
  }

  const servicesId = html.indexOf('id="home-services"');
  if (servicesId === -1) return html;

  const sectionStart = html.lastIndexOf('<section', servicesId);
  if (sectionStart === -1) return html;

  const insertAt = indexOfSectionEnd(html, sectionStart);
  if (insertAt === -1) return html;

  if (html.slice(insertAt, insertAt + 80).includes('class="section rot"')) {
    return html;
  }

  return html.slice(0, insertAt) + homeRotSection + html.slice(insertAt);
}

/** Legency rot band (mirrored from webflow-support), after `#home-services` — KlearHub / Managed Trade. */
export function insertKlearHubRotSectionAfterHomeServices(mainHtml: string): string {
  let html = mainHtml;

  const existingRot = html.indexOf('<section class="section rot"');
  if (existingRot !== -1) {
    const rotEnd = indexOfSectionEnd(html, existingRot);
    if (rotEnd === -1) return html;
    html = html.slice(0, existingRot) + html.slice(rotEnd);
  }

  const servicesId = html.indexOf('id="home-services"');
  if (servicesId === -1) return html;

  const sectionStart = html.lastIndexOf('<section', servicesId);
  if (sectionStart === -1) return html;

  const insertAt = indexOfSectionEnd(html, sectionStart);
  if (insertAt === -1) return html;

  if (html.slice(insertAt, insertAt + 80).includes('class="section rot"')) {
    return html;
  }

  return html.slice(0, insertAt) + klearHubRotSection + html.slice(insertAt);
}

/** Legency scope band (mirrored from webflow-support), after rot — KlearHub / Managed Trade. */
export function insertKlearHubScopeSectionAfterRot(mainHtml: string): string {
  if (!hasKlearHubProductBandsContext(mainHtml)) return mainHtml;
  if (mainHtml.includes('<section class="section scope"')) return mainHtml;

  const rotStart = mainHtml.indexOf('<section class="section rot"');
  if (rotStart === -1) return mainHtml;

  const insertAt = indexOfSectionEnd(mainHtml, rotStart);
  if (insertAt === -1) return mainHtml;

  return mainHtml.slice(0, insertAt) + klearHubScopeFeeSection + mainHtml.slice(insertAt);
}

/** Legency Google reviews band — not used on KlearNow home. */
export function removeGreviewsSection(mainHtml: string): string {
  const marker = '<section class="greviews"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

/** Separates band: one KlearNow step, no Legency 02/03 or multi-step pin. */
export function collapseSeparatesToSingleStep(mainHtml: string): string {
  let html = mainHtml;

  const removeItem = (num: string) => {
    const badNeedle = `<div class="separates__item" data-sticky-feature-item data-astro-cid-lcdefpme><span class="separates__num" data-sticky-feature-text data-astro-cid-lcdefpme>${num}</span>`;
    const altNeedle = `<div class="separates__item" data-astro-cid-lcdefpme><span class="separates__num" data-sticky-feature-text data-astro-cid-lcdefpme>${num}</span>`;
    const start = html.indexOf(badNeedle) !== -1 ? html.indexOf(badNeedle) : html.indexOf(altNeedle);
    if (start === -1) return;

    let depth = 0;
    let i = start;
    while (i < html.length) {
      const open = html.indexOf('<div', i);
      const close = html.indexOf('</div>', i);
      if (close === -1) break;

      if (open !== -1 && open < close) {
        depth += 1;
        i = open + 4;
        continue;
      }

      depth -= 1;
      i = close + 6;
      if (depth === 0) {
        html = html.slice(0, start) + html.slice(i);
        return;
      }
    }
  };

  removeItem('03');
  removeItem('02');

  html = html.replace(/<div class="separates__visual separates__visual--2"[\s\S]*?<\/div>/g, '');
  html = html.replace(/<div class="separates__visual separates__visual--3"[\s\S]*?<\/div>/g, '');
  html = html.replace(/<div class="separates__progress"[\s\S]*?<\/div>/g, '');

  if (!html.includes('separates__panel--single')) {
    html = html.replace(
      '<div class="separates__panel" data-sticky-feature-wrap data-live-dither-host',
      '<div class="separates__panel separates__panel--single" data-live-dither-host',
    );
    html = html.replace(
      '<div class="separates__panel" data-live-dither-host',
      '<div class="separates__panel separates__panel--single" data-live-dither-host',
    );
  }
  html = html.replace(/ data-sticky-feature-item/g, '');
  html = html.replace(/ data-sticky-feature-wrap/g, '');

  return html;
}

/** Separates demo CTA blurb — explicit two-line break. */
export function patchSeparatesDemoBlurbTwoLines(mainHtml: string): string {
  const needle =
    "Thirty minutes, your data, live KlearAssist. We'll show you the exposure and recovery sitting in entries you've already filed.";
  const replacement =
    "Thirty minutes, your data, live KlearAssist.<br>We'll show you the exposure and recovery sitting in entries you've already filed.";
  return mainHtml.includes(needle) ? mainHtml.replace(needle, replacement) : mainHtml;
}

/** Legency “How we work” team cards — not used on KlearNow home. */
export function removeTeamSection(mainHtml: string): string {
  const marker = '<section class="section team"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

/** Legency blog teaser grid — not used on KlearNow home. */
export function removeBlogteaserSection(mainHtml: string): string {
  const marker = '<section class="section blogteaser"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}

/** Legency case-study teaser grid — not used on KlearNow home. */
export function removeCasesSection(mainHtml: string): string {
  const marker = '<section class="section cases"';
  const start = mainHtml.indexOf(marker);
  if (start === -1) return mainHtml;

  let depth = 0;
  let i = start;
  while (i < mainHtml.length) {
    const open = mainHtml.indexOf('<section', i);
    const close = mainHtml.indexOf('</section>', i);
    if (close === -1) break;

    if (open !== -1 && open < close) {
      depth += 1;
      i = open + 8;
      continue;
    }

    depth -= 1;
    i = close + 10;
    if (depth === 0) {
      return mainHtml.slice(0, start) + mainHtml.slice(i);
    }
  }

  return mainHtml;
}
