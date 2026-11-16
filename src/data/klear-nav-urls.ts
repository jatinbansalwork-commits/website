import type { PageKind } from './sitemap';
import { slugFromPath } from '../lib/mirror';

/** KlearNow nav labels map to these canonical paths (mirror content via `mirrorPath`). */
export const klearSiteNavHrefs = {
  home: '/',
  postEntryAudit: '/post-entry-audit/',
  tariffCalcultor: '/tariff-calcultor/',
  coverage: '/coverage/',
  blog: '/blog/',
  resources: '/resources/',
  getInTouch: '/get-in-touch/',
  careers: '/careers/',
} as const;

export const klearProductNavHrefs = {
  klearData: '/klear-data/',
  klearHub: '/klear-hub/',
  managedTrade: '/managed-trade/',
} as const;

export const klearOperationNavHrefs = {
  freightForwarders: '/freight-forwarders/',
  customBrokers: '/custom-brokers/',
  tradeCompliance: '/trade-compliance/',
  selfFilers: '/self-filers/',
} as const;

/** Legency mirror path → KlearNow public path (for href rewrites). */
export const klearNavHrefRewrites: ReadonlyArray<readonly [from: string, to: string]> = [
  ['/about/', klearSiteNavHrefs.postEntryAudit],
  ['/how-we-work/', klearSiteNavHrefs.tariffCalcultor],
  ['/case-studies/', klearSiteNavHrefs.coverage],
  ['/services/webflow-enterprise/', klearProductNavHrefs.klearData],
  ['/services/webflow-support/', klearProductNavHrefs.klearHub],
  ['/services/wordpress-to-webflow-migration/', klearProductNavHrefs.managedTrade],
  ['/services/search-ai-visibility/', klearOperationNavHrefs.freightForwarders],
  ['/aeo-agency/', klearOperationNavHrefs.customBrokers],
  ['/services/technical-seo/', klearOperationNavHrefs.tradeCompliance],
  ['/services/astro-agency/', klearOperationNavHrefs.selfFilers],
];

/** Extra static routes that reuse an existing mirror page. */
export const klearRouteAliases: ReadonlyArray<{
  path: string;
  mirrorPath: string;
  kind: PageKind;
  title: string;
}> = [
  {
    path: klearSiteNavHrefs.postEntryAudit,
    mirrorPath: '/about/',
    kind: 'about',
    title: 'Post-Entry Audit',
  },
  {
    path: klearSiteNavHrefs.tariffCalcultor,
    mirrorPath: '/how-we-work/',
    kind: 'how-we-work',
    title: 'Tariff Calcultor',
  },
  {
    path: klearSiteNavHrefs.coverage,
    mirrorPath: '/case-studies/',
    kind: 'case-studies-index',
    title: 'Coverage',
  },
  {
    path: klearProductNavHrefs.klearData,
    mirrorPath: '/services/webflow-enterprise/',
    kind: 'service',
    title: 'KlearData',
  },
  {
    path: klearProductNavHrefs.klearHub,
    mirrorPath: '/services/webflow-support/',
    kind: 'service',
    title: 'KlearHub',
  },
  {
    path: klearProductNavHrefs.managedTrade,
    mirrorPath: '/services/wordpress-to-webflow-migration/',
    kind: 'service',
    title: 'Managed Trade',
  },
  {
    path: klearOperationNavHrefs.freightForwarders,
    mirrorPath: '/services/search-ai-visibility/',
    kind: 'service',
    title: 'Freight Forwarders',
  },
  {
    path: klearOperationNavHrefs.customBrokers,
    mirrorPath: '/aeo-agency/',
    kind: 'landing',
    title: 'Custom Brokers',
  },
  {
    path: klearOperationNavHrefs.tradeCompliance,
    mirrorPath: '/services/technical-seo/',
    kind: 'service',
    title: 'Trade Compliance',
  },
  {
    path: klearOperationNavHrefs.selfFilers,
    mirrorPath: '/services/astro-agency/',
    kind: 'service',
    title: 'Self Filers',
  },
];

/** Legency `svc-hero` mirrors that use the KlearNow earth dither (not `astro-hero`). */
export const KLEAR_SVC_HERO_EARTH_MIRROR_SLUGS = [
  'services__webflow-enterprise',
  'services__webflow-support',
  'services__wordpress-to-webflow-migration',
  'services__search-ai-visibility',
  'aeo-agency',
  'services__technical-seo',
  'services__astro-agency',
] as const;

export function isKlearSvcHeroEarthMirror(slug: string): boolean {
  return (KLEAR_SVC_HERO_EARTH_MIRROR_SLUGS as readonly string[]).includes(slug);
}

/** Mirror slugs for KlearNow product + Operation TYpe routes (canonical nav aliases). */
export const KLEAR_PRODUCT_AND_OPERATION_MIRROR_SLUGS = [
  'services__webflow-enterprise',
  'services__webflow-support',
  'services__wordpress-to-webflow-migration',
  'services__search-ai-visibility',
  'aeo-agency',
  'services__technical-seo',
  'services__astro-agency',
] as const;

export function isKlearProductOrOperationMirror(slug: string): boolean {
  return (KLEAR_PRODUCT_AND_OPERATION_MIRROR_SLUGS as readonly string[]).includes(slug);
}

/** Operation TYpe nav routes (not KlearData / KlearHub / Managed Trade). */
export const KLEAR_OPERATION_MIRROR_SLUGS = [
  'services__search-ai-visibility',
  'aeo-agency',
  'services__technical-seo',
  'services__astro-agency',
] as const;

export function isKlearOperationMirror(slug: string): boolean {
  return (KLEAR_OPERATION_MIRROR_SLUGS as readonly string[]).includes(slug);
}

/** Public canonical path for a mirror slug (Klear aliases), else the mirror JSON `path`. */
export function resolveKlearCanonicalPath(slug: string, mirrorPath: string): string {
  const alias = klearRouteAliases.find((a) => slugFromPath(a.mirrorPath) === slug);
  if (alias) return alias.path;

  const rewrite = klearNavHrefRewrites.find(([from]) => from === mirrorPath);
  if (rewrite) return rewrite[1];

  return mirrorPath;
}
