export type TriageCardCopyMeta = {
  title: string;
  heading: string;
  subheading?: string;
  chips: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const TRIAGE_SECTION_COPY = {
  heading: 'The base expands into three products',
  subheading:
    'One system connecting trade data, customs clearance, and the licensed brokers who run both. From the first emailed document to a filed entry you can audit.',
} as const;

export const TRIAGE_CARD_COPY: Record<string, TriageCardCopyMeta> = {
  'value-first': {
    title: '01. Is it Complete',
    heading: 'Kleardata',
    subheading:
      'Every document, from every channel, read and structured into one shipment.',
    chips: [],
    ctaLabel: 'Explore',
    ctaHref: '#talk-to-klear',
  },
  'safe-prs': {
    title: '02. Was it done right',
    heading: 'Klearhub',
    subheading:
      'Check before you file. Audit after it clears. Customs software for brokers and importers.',
    chips: [],
    ctaLabel: 'Explore',
    ctaHref: '#talk-to-klear',
  },
  'reviewer-fit': {
    title: '03. Who Handles it?',
    heading: 'Managed Trade',
    subheading:
      'KlearNow runs it as your licensed broker of record, or runs the audits and refunds for you.',
    chips: ['Customs 260', 'Managed post-entry', 'Integration services'],
    ctaLabel: 'Explore',
    ctaHref: '#talk-to-klear',
  },
};

const chevronSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="cr-triage-card__tertiary-icon"><path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd"></path></svg>`;

const buildChips = (chips: string[]) => {
  const list = document.createElement('ul');
  list.className = 'cr-triage-card__chips';
  list.setAttribute('aria-label', 'Highlights');
  for (const label of chips) {
    const item = document.createElement('li');
    const chip = document.createElement('span');
    chip.className = 'cr-triage-card__chip';
    chip.textContent = label;
    item.appendChild(chip);
    list.appendChild(item);
  }
  return list;
};

const buildTertiary = (label: string, href: string) => {
  const link = document.createElement('a');
  link.className = 'cr-triage-card__tertiary';
  link.href = href;
  link.innerHTML = `<span>${label}</span>${chevronSvg}`;
  return link;
};

export const applyKlearReviewsSurfacesHeader = (root: HTMLElement) => {
  const header = root.querySelector<HTMLElement>(
    'section[aria-labelledby="review-surfaces-title"] header',
  );
  if (!header) return;

  header.classList.add('cr-reviews-surfaces__header');
  if (header.dataset.klearEnriched === 'true') return;

  const h2 = header.querySelector<HTMLElement>('#review-surfaces-title');
  if (h2) {
    h2.textContent = TRIAGE_SECTION_COPY.heading;
    h2.classList.add('cr-reviews-surfaces__heading');
  }

  let subheading = header.querySelector('p');
  if (!subheading) {
    subheading = document.createElement('p');
    subheading.className = 'max-w-xl text-pretty text-body-lg text-cui-secondary md:mt-2';
    h2?.insertAdjacentElement('afterend', subheading);
  }
  subheading.textContent = TRIAGE_SECTION_COPY.subheading;

  header.dataset.klearEnriched = 'true';
};

export const REVIEWS_SURFACE_KINDS = ['ide', 'cli', 'git'] as const;

export const REVIEWS_SURFACE_KIND_TO_CARD: Record<
  (typeof REVIEWS_SURFACE_KINDS)[number],
  keyof typeof TRIAGE_CARD_COPY
> = {
  ide: 'value-first',
  cli: 'safe-prs',
  git: 'reviewer-fit',
};

export type ReviewsSurfaceCtaMount = {
  kind: (typeof REVIEWS_SURFACE_KINDS)[number];
  node: HTMLElement;
};

const findReviewsSurfaceItem = (root: HTMLElement, kind: (typeof REVIEWS_SURFACE_KINDS)[number]) => {
  const mount = root.querySelector<HTMLElement>(
    `.cr-surfaces-visual-mount[data-surface-kind="${kind}"]`,
  );
  if (mount) {
    return mount.closest<HTMLElement>('.SurfacesVisual-module__y_ILJq__surfaceItem');
  }

  const index = REVIEWS_SURFACE_KINDS.indexOf(kind);
  return root.querySelectorAll<HTMLElement>('.SurfacesVisual-module__y_ILJq__surfaceItem')[index];
};

export const applyKlearReviewsSurfacesCaptions = (root: HTMLElement) => {
  for (const kind of REVIEWS_SURFACE_KINDS) {
    const meta = TRIAGE_CARD_COPY[REVIEWS_SURFACE_KIND_TO_CARD[kind]];
    const item = findReviewsSurfaceItem(root, kind);
    if (!meta || !item) continue;

    const caption = item.querySelector<HTMLElement>(
      '.SurfacesVisual-module__y_ILJq__surfaceCaption',
    );
    const copyBlock = caption?.querySelector<HTMLElement>('div');
    if (!copyBlock) continue;

    const title = copyBlock.querySelector<HTMLElement>('p.font-heading');
    if (title) title.textContent = meta.heading;

    let subtitle = copyBlock.querySelector<HTMLElement>('p.text-body-sm, p.text-cui-secondary');
    if (meta.subheading) {
      if (!subtitle) {
        subtitle = document.createElement('p');
        subtitle.className = 'mt-1 text-pretty text-body-sm text-cui-secondary';
        title?.insertAdjacentElement('afterend', subtitle);
      }
      subtitle.textContent = meta.subheading;
    }
  }
};

export const prepareReviewsSurfaceCtaMounts = (root: HTMLElement): ReviewsSurfaceCtaMount[] => {
  applyKlearReviewsSurfacesCaptions(root);
  const mounts: ReviewsSurfaceCtaMount[] = [];

  for (const kind of REVIEWS_SURFACE_KINDS) {
    const item = findReviewsSurfaceItem(root, kind);
    const copyBlock = item?.querySelector<HTMLElement>(
      '.SurfacesVisual-module__y_ILJq__surfaceCaption div',
    );
    if (!copyBlock) continue;

    const anchor =
      copyBlock.querySelector<HTMLElement>('p.text-body-sm') ??
      copyBlock.querySelector<HTMLElement>('p.font-heading');
    if (!anchor) continue;

    const nextSibling = anchor.nextElementSibling;
    let mountEl: HTMLElement;
    if (
      nextSibling instanceof HTMLElement &&
      nextSibling.classList.contains('cr-reviews-surfaces__cta-mount')
    ) {
      mountEl = nextSibling;
    } else {
      mountEl = document.createElement('div');
      mountEl.className = 'cr-reviews-surfaces__cta-mount';
      anchor.insertAdjacentElement('afterend', mountEl);
    }

    mounts.push({ kind, node: mountEl });
  }

  return mounts;
};

/** Section title lives on reviews-surfaces block above the bento grid. */
export const applyKlearTriageSectionHeader = (root: HTMLElement) => {
  const header = root.querySelector<HTMLElement>('.TriageValueBento-module__NAnOyq__header');
  if (!header || header.dataset.klearEnriched === 'true') return;

  header.hidden = true;
  header.dataset.klearEnriched = 'true';
};

export const applyKlearTriageCardHeaders = (root: HTMLElement) => {
  const articles = root.querySelectorAll<HTMLElement>(
    '.TriageValueBento-module__NAnOyq__responsiveGrid > article',
  );

  for (const article of articles) {
    const illustrationId = article.querySelector('[data-mobile-illustration]')?.getAttribute(
      'data-mobile-illustration',
    );
    if (!illustrationId) continue;

    const meta = TRIAGE_CARD_COPY[illustrationId];
    if (!meta) continue;

    const copy = article.querySelector<HTMLElement>('div.relative.z-10');
    if (!copy || copy.dataset.klearEnriched === 'true') continue;

    const heading = copy.querySelector('h3');
    const subheading = copy.querySelector('p');
    if (!heading || !subheading) continue;

    const title = document.createElement('p');
    title.className = 'cr-triage-card__title';
    title.textContent = meta.title;

    heading.textContent = meta.heading;
    heading.classList.add('cr-triage-card__heading');
    if (meta.subheading) {
      subheading.textContent = meta.subheading;
    }
    subheading.classList.add('cr-triage-card__subheading');

    copy.classList.add('cr-triage-card__copy');
    copy.insertBefore(title, heading);
    if (meta.chips.length > 0) {
      copy.appendChild(buildChips(meta.chips));
    }
    copy.appendChild(buildTertiary(meta.ctaLabel, meta.ctaHref));

    copy.dataset.klearEnriched = 'true';
  }
};
