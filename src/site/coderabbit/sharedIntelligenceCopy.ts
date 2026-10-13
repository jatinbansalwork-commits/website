export const SHARED_INTELLIGENCE_SECTION = {
  eyebrow: 'What exceptions-only feels like',
  heading: 'Twenty-four entries move through. You hear about one.',
} as const;

export type SharedIntelligenceStep = {
  id: string;
  label: string;
  description: string;
};

/** Placeholder — CodeRabbit copy; swap for KlearNow when ready. */
export const SHARED_INTELLIGENCE_STEPS: SharedIntelligenceStep[] = [
  {
    id: 'codegraph',
    label: 'Document Arrive',
    description:
      'Invoice, packing lists and bills of lading land from email and uploads',
  },
  {
    id: 'adaptive-systems',
    label: 'Fields are extracted',
    description: 'Each field is read and tied to the document it came from',
  },
  {
    id: 'business-context',
    label: 'Entries are validated',
    description:
      'Every entry is checked against your rules and the current tariff and agency rules.',
  },
  {
    id: 'review-generation',
    label: 'One exception surfaces',
    description:
      'An origin that differs between two documents is held for a person… nothing else waits',
  },
  {
    id: 'ensemble-of-models',
    label: 'The rest clear',
    description: 'Clean entries are filed and cleared without anyone touching them.',
  },
];
