/** Short label above the section headline — edit copy here. */
export const BORDER_RULE_STATS_EYEBROW = 'Coverage';

export const BORDER_RULE_STATS_HEADING = 'Depth where trade gets hard.';

export const BORDER_RULE_STATS_SUBHEADING =
  'Anyone can file a clean consumption entry. KlearNow is built for the regulations that keep compliance teams up at night, with licensed brokers and domain logic behind every one.';

export type BorderRuleStatCard =
  | {
      kind: 'stat';
      label: string;
      previousStat?: string;
      currentStat: string;
      body: string;
      sourceLabel?: string;
      sourceHref?: string;
    }
  | {
      kind: 'percent';
      label: string;
      stat: string;
      body: string;
      sourceLabel?: string;
      sourceHref?: string;
    }
  | {
      kind: 'visual';
      title: string;
      body: string;
    };

export const BORDER_RULE_STATS_CARDS: BorderRuleStatCard[] = [
  {
    kind: 'stat',
    label: 'Canada',
    currentStat: 'CARM',
    body: "CBSA Assessment and Revenue Management, Canada's customs accounting system.",
  },
  {
    kind: 'percent',
    label: 'United States',
    stat: 'IEEPA duty refunds',
    body: 'Refund audits for duties collected under the International Emergency Economic Powers Act.',
  },
  {
    kind: 'percent',
    label: 'United States',
    stat: 'Section 301 and 232',
    body: 'Tariffs on specific origins (301) and on goods such as steel, aluminum and auto parts (232), stacked line by line under Chapter 99.',
  },
  {
    kind: 'stat',
    label: 'United States',
    currentStat: 'ADD/CVD',
    body: 'Antidumping and countervailing duties on specific goods from specific origins.',
  },
  {
    kind: 'percent',
    label: 'United States',
    stat: 'CPSC eFiling',
    body: 'Electronic certificate filing for consumer products regulated by the Consumer Product Safety Commission.',
  },
  {
    kind: 'percent',
    label: 'United States',
    stat: 'ISF and multi-agency filings',
    body: 'The Importer Security Filing (10+2), and the filings other agencies require alongside the entry.',
  },
  {
    kind: 'stat',
    label: 'United Kingdom',
    currentStat: 'CDS',
    body: "Customs Declaration Service, the UK's customs declaration system.",
  },
  {
    kind: 'percent',
    label: 'Netherlands',
    stat: 'DMS',
    body: 'Countries supported across KlearNow products—with direct customs connections in five.',
  },
  {
    kind: 'stat',
    label: 'Spain',
    currentStat: 'AEAT',
    body: "Agencia Estatal de Administración Tributaria, Spain's tax and customs agency.",
  },
];
