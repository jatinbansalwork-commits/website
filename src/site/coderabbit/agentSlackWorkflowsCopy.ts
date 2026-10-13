export const AGENT_SLACK_SECTION_COPY = {
  eyebrow: 'THE COMPLETE TRADE STACK, THREE WAYS IN',
  heading: "You'll only hear about the exceptions.",
} as const;

export type AgentSlackPanelCopy = {
  id: string;
  /** Illustration column on the left at lg+ (CodeRabbit mirrored layout) */
  mirrored?: boolean;
  label: string;
  title: string;
  description: string;
  items: { term: string; detail: string; active?: boolean }[];
};

/** Placeholder panels — replace copy when KlearNow messaging is ready. */
export const AGENT_SLACK_PANELS: AgentSlackPanelCopy[] = [
  {
    id: 'context',
    mirrored: true,
    label: '1 · Is it complete?',
    title: 'Every document in. One complete shipment out.',
    description:
      'Email, SFTP, EDI, API or upload. KlearData classifies each document, extracts the fields with agents that cross-check each other, and builds one shipment record. Anything missing or low-confidence is flagged before anything is filed.',
    items: [],
  },
  {
    id: 'plan',
    mirrored: true,
    label: '2 · Was it done right?',
    title: 'Checked before it files. Audited again after it clears.',
    description:
      'Brokers need entries validated before they file. Importers need entries audited after they clear. KlearNow runs both on the same rules layer, so what you file and what you audit are held to the same standard.',
    items: [],
  },
  {
    id: 'execute',
    mirrored: true,
    label: '3 · Who handles the exceptions?',
    title: 'Your team, ours, or an agent. Same engine.',
    description:
      'Every entry that cannot be resolved with confidence becomes an exception. You choose who works it, and the mix can shift as agents learn your documents and rules.',
    items: [],
  },
];
