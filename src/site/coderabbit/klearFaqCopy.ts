export type KlearFaqItem = {
  question: string;
  /** Plain answer; include editorial notes in `editorialNote` when possible */
  answer: string;
  editorialNote?: string;
};

export const KLEAR_FAQ_ITEMS: KlearFaqItem[] = [
  {
    question: 'What is KlearNow?',
    answer:
      'KlearNow.AI is an AI-native customs brokerage and trade compliance platform. It structures data from trade documents, validates entries before filing, audits them after clearance, tracks shipments, and routes exceptions to people.',
  },
  {
    question: 'Which countries does KlearNow support?',
    answer: '80+ countries are supported, with direct customs connections in 5.',
    editorialNote: 'NAME THE 5 COUNTRIES',
  },
  {
    question: 'What is a post-entry audit?',
    answer:
      'A review of entries after they clear. KlearNow checks each entry across 11 lenses, including classification, value, origin, duty rate, IEEPA, Section 232 and 301, USMCA and ADD/CVD, then flags findings that can be corrected through a post summary correction (PSC). Findings are compliance analysis, not legal advice, and recovery is subject to statutory windows and CBP adjudication.',
  },
  {
    question: 'Where is the post-entry audit available?',
    answer: '',
    editorialNote: 'CONFIRM PUBLIC COUNTRY LINE: US live, Canada next, EU-oriented next wave',
  },
  {
    question: 'Does KlearNow replace my customs broker?',
    answer:
      'No. KlearNow works alongside licensed brokers. It does the repeatable work and routes exceptions to a person: yours, or ours through Managed Trade.',
  },
  {
    question: 'What is a zero-touch entry?',
    answer:
      "An entry filed and cleared without a person touching it. When a line can't be resolved with confidence, it becomes an exception and goes to a person.",
    editorialNote: 'CONFIRM DEFINITION WITH OPS',
  },
  {
    question: 'Can I audit entries that another broker filed?',
    answer:
      'Yes. The audit reads entry data from ACE, so it works on entries filed by any broker. Corrections can be filed by your broker or through KlearNow.',
    editorialNote: 'CONFIRM PUBLIC WORDING',
  },
  {
    question: 'Who files the entry?',
    answer:
      "KlearNow prepares, validates and transmits filings. The licensed broker or self-filer retains the filing act: you, your broker, or KlearNow's licensed brokerage through Managed Trade.",
  },
];
