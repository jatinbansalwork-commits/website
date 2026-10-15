import { applyKlearTriageCardHeaders, applyKlearTriageSectionHeader } from './klearTriageCardCopy';

const CR_ORIGIN = 'https://www.coderabbit.ai';

/** Leftover high-risk demo PRs when the risky-prs bento card was removed from the snapshot. */
const removeOrphanedGridPrCards = (root: HTMLElement) => {
  const grid = root.querySelector<HTMLElement>('.TriageValueBento-module__NAnOyq__responsiveGrid');
  if (!grid) return;

  for (const article of [...grid.querySelectorAll<HTMLElement>('article')]) {
    if (article.className.includes('absolute') && article.className.includes('left-1/2')) {
      article.remove();
    }
  }
};

const fixAssetUrls = (root: HTMLElement) => {
  root.querySelectorAll<HTMLElement>('[src], [href]').forEach((el) => {
    const attr = el.hasAttribute('src') ? 'src' : 'href';
    const raw = el.getAttribute(attr);
    if (!raw) return;
    let next = raw.replace(/&amp;/g, '&');
    if (next.startsWith('/') && !next.startsWith('//')) {
      next = `${CR_ORIGIN}${next}`;
    }
    el.setAttribute(attr, next);
  });

  root.querySelectorAll<HTMLElement>('[class*="undefined"]').forEach((el) => {
    el.className = el.className.replace(/\bundefined\b/g, '').replace(/\s+/g, ' ').trim();
  });
};

export const mountTriageValueBentoClone = (host: HTMLElement) => {
  fixAssetUrls(host);
  removeOrphanedGridPrCards(host);
  applyKlearTriageSectionHeader(host);
  applyKlearTriageCardHeaders(host);

  return () => {};
};

export const prepareKleardataMount = (host: HTMLElement): HTMLElement | null => {
  const slot = host.querySelector<HTMLElement>('[data-mobile-illustration="value-first"]');
  const canvas = slot?.querySelector<HTMLElement>(
    '.TriageValueBento-module__NAnOyq__illustrationCanvas',
  );
  if (!canvas) return null;

  canvas.innerHTML = '';
  const mount = document.createElement('div');
  mount.className = 'cr-kleardata-mount relative h-full min-h-[9.5rem] w-full';
  canvas.appendChild(mount);
  return mount;
};

export const prepareKlearhubMount = (host: HTMLElement): HTMLElement | null => {
  const slot = host.querySelector<HTMLElement>('[data-mobile-illustration="safe-prs"]');
  const canvas = slot?.querySelector<HTMLElement>(
    '.TriageValueBento-module__NAnOyq__illustrationCanvas',
  );
  if (!canvas) return null;

  canvas.innerHTML = '';
  const mount = document.createElement('div');
  mount.className = 'cr-klearhub-mount relative h-full min-h-[9.5rem] w-full';
  canvas.appendChild(mount);
  return mount;
};

export const prepareReviewerMatchMount = (host: HTMLElement): HTMLElement | null => {
  const slot = host.querySelector<HTMLElement>('[data-mobile-illustration="reviewer-fit"]');
  const canvas = slot?.querySelector<HTMLElement>(
    '.TriageValueBento-module__NAnOyq__illustrationCanvas',
  );
  if (!canvas) return null;

  canvas.innerHTML = '';
  const mount = document.createElement('div');
  mount.className = 'cr-triage-reviewer-mount relative h-full min-h-[16rem] w-full';
  canvas.appendChild(mount);
  return mount;
};
