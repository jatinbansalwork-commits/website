import type { MirrorManifest } from './mirror-types';
import { brandDocumentTitle, brandMetaDescription, SITE_NAME } from './brand';

export type KlearPageMeta = { title: string; description: string };

/** Canonical `<title>` + meta description for KlearNow routes (mirror JSON may still carry Legency copy). */
const KLEAR_PAGE_META: Record<string, KlearPageMeta> = {
  home: {
    title: `${SITE_NAME} | Autonomous Customs & Trade Intelligence`,
    description:
      'Autonomous customs clearance and trade intelligence across five countries. KlearNow turns trade documents into filing-ready data with a full audit trail.',
  },
  'services__webflow-enterprise': {
    title: `KlearData | Trade Document Intelligence | ${SITE_NAME}`,
    description:
      'KlearData ingests trade documents from email, PDF, EDI, and portals—then extracts, classifies, and validates every field with traceability back to the source.',
  },
  'services__webflow-support': {
    title: `KlearHub | Customs Operations Software | ${SITE_NAME}`,
    description:
      'KlearHub is the software your customs operation runs on: entries, corrections, tracking, records, and refund audits in one system, built on KlearData.',
  },
  'services__wordpress-to-webflow-migration': {
    title: `Managed Trade | Licensed Customs Operations | ${SITE_NAME}`,
    description:
      'When you would rather hand customs off to licensed experts, KlearNow runs clearance, compliance, and filing on the same platform your data already lives in.',
  },
  'services__search-ai-visibility': {
    title: `Freight Forwarders | Customs & Dray Automation | ${SITE_NAME}`,
    description:
      'Unlock AI-driven workflows, from document intake all the way through dray and inland trucking.',
  },
  'aeo-agency': {
    title: `Custom Brokers | Licensed Customs Software | ${SITE_NAME}`,
    description:
      'Turn emailed documents into clean data, validate instantly, and file faster — without adding headcount.',
  },
  'services__technical-seo': {
    title: `Trade Compliance | Customs Compliance Software | ${SITE_NAME}`,
    description:
      'Keep classifications, PGA checks, and entry rules aligned before filing—with traceable data and audit-ready records on the KlearNow platform.',
  },
  'services__astro-agency': {
    title: `Self Filers | Customs Filing Software | ${SITE_NAME}`,
    description:
      'Turn emails and PDFs into entry-ready data, validate instantly, and file through ABI with real-time status and audit-ready records.',
  },
  privacy: {
    title: `Privacy Policy | ${SITE_NAME}`,
    description:
      'How KlearNow collects, uses, and shares information from Customers, Brokers, and Truckers on the KlearNow Platform.',
  },
  careers: {
    title: `Careers | ${SITE_NAME}`,
    description:
      'Join KlearNow and help build the future of customs clearance and trade intelligence. Open roles across product, operations, and engineering.',
  },
};

export function resolveKlearPageMeta(
  manifest: Pick<MirrorManifest, 'slug' | 'title' | 'description'>,
): { title: string; description: string | undefined } {
  const override = KLEAR_PAGE_META[manifest.slug];
  if (override) {
    return { title: override.title, description: override.description };
  }

  return {
    title: brandDocumentTitle(manifest.title),
    description: manifest.description ? brandMetaDescription(manifest.description) : undefined,
  };
}