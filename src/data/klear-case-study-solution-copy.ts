import { KLEAR_GRATA_SOLUTION_SOURCE_COMPARE_HTML } from './klear-grata-solution-source-compare-html';
import { KLEAR_GRATA_VERIFICATION_ENGINE_HTML } from './klear-grata-verification-engine-html';

/** Rich HTML bodies (tables, etc.) — keyed by slug segment, then card index. */
export type KlearSolutionCardBody = string | readonly string[] | { readonly html: string };

/** Extra solution cards appended after patched mirror cards (`article.sol-card`). */
export type KlearExtraSolutionCardBody =
  | KlearSolutionCardBody
  | readonly (string | { readonly html: string })[];

export type KlearExtraSolutionCard = {
  readonly heading: string;
  readonly body: KlearExtraSolutionCardBody;
  /** Mirror `article.sol-card` index to copy icon markup (0–3). */
  readonly iconSourceIndex?: number;
};

export const KLEAR_CASE_STUDY_SOLUTION_CARDS: Readonly<
  Record<string, readonly KlearExtraSolutionCard[]>
> = {
  grata: [
    {
      heading: 'From invisible overpayment to filing-ready recovery',
      body: [
        '$1,723,490.03 in overpaid base-rate duty identified: Quantified per entry across the full audited population and packaged for correction.',
        { html: KLEAR_GRATA_VERIFICATION_ENGINE_HTML },
      ],
      iconSourceIndex: 3,
    },
  ],
};

/** Case study detail — `section.solution` card headings by mirror slug segment (card index). */
export const KLEAR_CASE_STUDY_SOLUTION_CARD_HEADINGS: Readonly<Record<string, readonly string[]>> = {
  grata: [
    'Why the exposure is larger than it looks',
    'Reasonable care sits with the importer under international trade laws',
    'What the review found',
    'How the error surfaced: cross-checking the sources of record',
  ],
};

/** Case study detail — `section.solution` card body copy by mirror slug segment (card index). */
export const KLEAR_CASE_STUDY_SOLUTION_CARD_TEXT: Readonly<
  Record<string, readonly KlearSolutionCardBody[]>
> = {
  grata: [
    [
      'The number of HTS codes that must be reported on a single entry line has at minimum doubled since Liberation Day, and supply chain mapping, anomaly detection and risk scoring, which lets CBP test pattern recognition across entries at scale. Enforcement priorities are broader than classification and valuation alone. The White House has published multiple guides addressing transshipment and origin circumvention used to avoid duty. A post-entry audit needs to cover the same ground CBP does, not a narrow slice of it.',
      'The asymmetry matters. CBP’s data analytics look for underpayment, because that is what the agency is owed. Penalties, though, can attach to any non-conformance: duty underpaid, duty overpaid, or no duty change at all. What CBP’s systems will not do is hand an importer back money it should never have paid. Overpayment is the one error class no one else has an incentive to find.',
    ],
    [
      'The Customs Modernization and Informed Compliance Act of 1994, known as the Mod Act, is the US implementing legislation that established the Reasonable Care standard. Under it, the importer of record carries the Reasonable Care obligation regardless of which licensed customs broker prepared and filed the entry, and a post-entry audit is one way to demonstrate that Reasonable Care was exercised.',
      'Software does not file entries. AI prepares and validates. A licensed customs broker, directly employed by the brokerage and physically located in the United States, decides and files.',
      'A broker error does not transfer the liability from the importer, and it does not refund the money either, outside of commercial terms negotiated between the importer and the customs broker. The importer remains responsible for legal compliance even when a third-party broker files the entry.',
      'Where an error results in revenue loss to the government, 19 U.S.C. section 1592 scales penalties by levels of culpability. The exposure varies by scenario, by liquidation status and by whether the importer came forward first. Where the error runs the other way, as it could have here, CBP has no reason to notify the importer, but the error is still an error and still reportable. The money simply stays with the government until the importer identifies it and files.',
      'Recovering overpayment does not replace the compliance obligation, but it does help fund it. In an era of enforcement, the charter is accuracy in both directions, and the same review that surfaces overpaid duty surfaces underpaid duty.',
    ],
    [
      'Checking every entry against the reciprocal rule exposed a stacking pattern. The EU preferential cap on IEEPA Reciprocal duties should have overridden the Column 1 rate. Instead the two were combined. It is worth being precise about where CAPE lands on this: Column 1 duty remains payable even when the Reciprocal cap is applied correctly on entry. The Column 1 duty is deducted from the capped duty paid, and the IEEPA refund is the difference.',
      'Using KlearNow, the importer cross-checked multiple independent representations of every entry against each other and against the reciprocal treatment that should apply for that entry’s rate-determination date. The three sources below are the ones that mattered for this finding.',
      'Finding errors first preserves options. Importers may file a voluntary prior disclosure, which often mitigates penalties to interest only. Once CBP initiates a formal investigation, CBP will no longer accept a prior disclosure from the importer for the scope covered by that investigation.',
    ],
    { html: KLEAR_GRATA_SOLUTION_SOURCE_COMPARE_HTML },
  ],
};
