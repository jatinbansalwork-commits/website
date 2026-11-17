import { klearProductNavHrefs } from '../data/klear-nav-urls';
import { ICON_FILE_CHECK, ICON_LAYERS, ICON_USERS } from './klear-icon-paths';
import { klearStrokeSvg } from './klear-stroke-icons';

const ICON_DATA_LAYER = klearStrokeSvg(ICON_LAYERS);
const ICON_FILE = klearStrokeSvg(ICON_FILE_CHECK);
const ICON_TEAM = klearStrokeSvg(ICON_USERS);

export const KLEAR_CLOSING_DP_HUB_CARD_BODY =
  'Entries, corrections, tracking, records, and refund audits in one place, across five countries.';

export const KLEAR_CLOSING_DP_DATA_CARD_BODY =
  'Documents read, classified, and structured before they ever reach an entry.';

export const KLEAR_CLOSING_DP_RUN_YOURSELF_BODY =
  'The same operating layer, if you would rather your own team filed on it.';

export const KLEAR_CLOSING_DP_MANAGED_TRADE_BODY =
  'KlearNow’s licensed brokers run clearance end to end, with the same data landing in your hands.';

type ClosingDpCard = {
  href: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: string;
};

function renderClosingDpCard(card: ClosingDpCard): string {
  return (
    `<a class="service-choice" href="${card.href}" data-astro-cid-jg2u4s4c>` +
    `<span class="service-choice__top" data-astro-cid-jg2u4s4c>` +
    `<span data-astro-cid-jg2u4s4c>${card.eyebrow}</span>` +
    `<span class="service-choice__symbol" aria-hidden="true" data-astro-cid-jg2u4s4c>${card.icon}</span>` +
    `</span>` +
    `<h3 data-astro-cid-jg2u4s4c>${card.title}</h3>` +
    `<p data-astro-cid-jg2u4s4c>${card.body}</p>` +
    `<span class="service-choice__link" data-astro-cid-jg2u4s4c>Explore <span aria-hidden="true" data-astro-cid-jg2u4s4c>↗</span></span>` +
    `</a>`
  );
}

/** Two-up service-choice row for the shared “Where it fits” dp — content differs by mirror slug. */
export function buildClosingDpServiceChoicesHtml(slug: string): string {
  const { klearData, klearHub, managedTrade } = klearProductNavHrefs;

  let left: ClosingDpCard;
  let right: ClosingDpCard;

  switch (slug) {
    case 'services__webflow-enterprise':
      left = {
        href: klearHub,
        eyebrow: 'Your Team Files',
        title: 'KlearHub',
        body: KLEAR_CLOSING_DP_HUB_CARD_BODY,
        icon: ICON_DATA_LAYER,
      };
      right = {
        href: managedTrade,
        eyebrow: 'Run for you',
        title: 'Managed Trade',
        body: KLEAR_CLOSING_DP_MANAGED_TRADE_BODY,
        icon: ICON_TEAM,
      };
      break;
    case 'services__webflow-support':
      left = {
        href: klearData,
        eyebrow: 'The Foundation',
        title: 'KlearData',
        body: KLEAR_CLOSING_DP_DATA_CARD_BODY,
        icon: ICON_DATA_LAYER,
      };
      right = {
        href: managedTrade,
        eyebrow: 'Run for you',
        title: 'Managed Trade',
        body: KLEAR_CLOSING_DP_MANAGED_TRADE_BODY,
        icon: ICON_TEAM,
      };
      break;
    case 'services__wordpress-to-webflow-migration':
    default:
      left = {
        href: klearData,
        eyebrow: 'The Foundation',
        title: 'KlearData',
        body: KLEAR_CLOSING_DP_DATA_CARD_BODY,
        icon: ICON_DATA_LAYER,
      };
      right = {
        href: klearHub,
        eyebrow: 'Run it Yourself',
        title: 'Klearhub',
        body: KLEAR_CLOSING_DP_RUN_YOURSELF_BODY,
        icon: ICON_FILE,
      };
      break;
  }

  return (
    `<div class="container" data-astro-cid-jg2u4s4c><div class="service-choices" data-astro-cid-jg2u4s4c>` +
    `${renderClosingDpCard(left)}${renderClosingDpCard(right)}` +
    `</div></div>`
  );
}
