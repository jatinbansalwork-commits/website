import { applyKlearNowBranding } from './klearNowBranding';

export const MERGE_AUTOMATION_HEADING =
  "What the entry data says about the week's rule changes.";

/** Short label above each card headline — edit copy here. */
export const MERGE_AUTOMATION_CARD_EYEBROWS = [
  'Tariff stacking',
  'Manual math',
  'Myth versus filing',
] as const;

export const MERGE_AUTOMATION_CARD_TITLES = [
  'A "simple" auto part can carry two tariffs and one rejected entry.',
  'What IEEPA refunds cost you when reconciled by hand.',
  '"Our broker has compliance handled."',
] as const;

export const MERGE_AUTOMATION_CARD_BODIES = [
  'Section 232 and 301 can stack on a single HTS 8708.29 line. Static rule tables miss it, and CBP can reject the entry on submission.',
  'Reconciling refunds manually, versus structured entry data that already knows what is owed on every line.',
  'How often manual classification drifts once tariff rules start changing weekly.',
] as const;

const MERGE_AUTOMATION_CARD_EYEBROW_CLASS = 'cr-merge-automation-card-eyebrow';

export type MergeAutomationIllustrationKind =
  | 'tariff-stacking'
  | 'ieepa-refunds'
  | 'classification-drift';

export type MergeAutomationIllustrationMount = {
  kind: MergeAutomationIllustrationKind;
  node: HTMLElement;
};

const MERGE_ILLUSTRATION_BY_CARD: Partial<Record<number, MergeAutomationIllustrationKind>> = {
  0: 'tariff-stacking',
  1: 'ieepa-refunds',
  2: 'classification-drift',
};

export const prepareMergeAutomationIllustrationMounts = (
  host: HTMLElement,
): MergeAutomationIllustrationMount[] => {
  const articles = host.querySelectorAll<HTMLElement>(
    '.mt-12.grid.gap-4 article, div.mt-12.grid article',
  );
  const mounts: MergeAutomationIllustrationMount[] = [];

  articles.forEach((article, index) => {
    const kind = MERGE_ILLUSTRATION_BY_CARD[index];
    if (!kind) return;

    const existing = article.querySelector<HTMLElement>(`[data-merge-illustration="${kind}"]`);
    if (existing) {
      mounts.push({ kind, node: existing });
      return;
    }

    const preview = article.querySelector<HTMLElement>('.mt-auto > div');
    if (!preview) return;

    const panel = document.createElement('div');
    panel.className =
      'relative w-full rounded-lg border border-cui-neutral bg-cui-base-0 p-3 cr-merge-automation-illust-panel';
    panel.dataset.mergeIllustration = kind;
    preview.replaceWith(panel);
    mounts.push({ kind, node: panel });
  });

  return mounts;
};

const applyKlearMergeAutomationCards = (host: HTMLElement) => {
  const articles = host.querySelectorAll<HTMLElement>(
    '.mt-12.grid.gap-4 article, div.mt-12.grid article',
  );
  articles.forEach((article, index) => {
    const h3 = article.querySelector('h3');
    const eyebrowCopy = MERGE_AUTOMATION_CARD_EYEBROWS[index];
    if (h3 && eyebrowCopy) {
      let eyebrow = article.querySelector<HTMLElement>(
        `.${MERGE_AUTOMATION_CARD_EYEBROW_CLASS}`,
      );
      if (!eyebrow) {
        eyebrow = document.createElement('p');
        eyebrow.className = MERGE_AUTOMATION_CARD_EYEBROW_CLASS;
        h3.before(eyebrow);
      }
      eyebrow.textContent = eyebrowCopy;
    }

    const title = MERGE_AUTOMATION_CARD_TITLES[index];
    if (title && h3) h3.textContent = title;

    const body = MERGE_AUTOMATION_CARD_BODIES[index];
    const paragraph = article.querySelector('p.text-cui-secondary, p.text-body-md');
    if (body && paragraph) paragraph.textContent = body;
  });
};

export const mountMergeAutomationClone = (host: HTMLElement) => {
  const container = host.querySelector<HTMLElement>('.container');
  container?.setAttribute('id', 'merge-automation');

  host.querySelector('header p.text-cui-secondary')?.remove();
  host.querySelector('#merge-automation-section-title')?.remove();
  host.querySelector('#review-automation-title')?.remove();

  const header = host.querySelector<HTMLElement>('header');
  if (!header) return;

  const heading = document.createElement('h2');
  heading.id = 'review-automation-title';
  heading.className =
    'max-w-3xl text-balance font-heading font-medium tracking-tight text-cui-primary text-heading-sm-sm md:text-heading-md';
  heading.textContent = MERGE_AUTOMATION_HEADING;
  header.append(heading);

  host.querySelector('section')?.setAttribute('aria-labelledby', 'review-automation-title');

  applyKlearMergeAutomationCards(host);
  applyKlearNowBranding(host);
};
