import { applyKlearNowBranding } from './klearNowBranding';
import { applyChangeStackDashboardChrome } from './changeStackDashboardChrome';
import { applyChangeStackLayersCopy } from './changeStackLayersCopy';
import {
  emitChangeStackWalkthroughFocus,
  mountChangeStackWalkthroughStages,
  type ChangeStackFocusId,
} from './changeStackWalkthroughStages';

const CR_ORIGIN = 'https://www.coderabbit.ai';

const fixRelativeUrls = (host: HTMLElement) => {
  host.querySelectorAll<HTMLElement>('[src^="/"]').forEach((el) => {
    const src = el.getAttribute('src');
    if (src) el.setAttribute('src', `${CR_ORIGIN}${src}`);
  });
  host.querySelectorAll<HTMLElement>('[srcset]').forEach((el) => {
    const srcset = el.getAttribute('srcset');
    if (srcset) {
      el.setAttribute(
        'srcset',
        srcset.replace(/(^|\s)\//g, `$1${CR_ORIGIN}/`),
      );
    }
  });
  host.querySelectorAll<HTMLElement>('[href^="/"]').forEach((el) => {
    const href = el.getAttribute('href');
    if (href?.startsWith('/')) el.setAttribute('href', `${CR_ORIGIN}${href}`);
  });
};

/** Homepage uses static two-column walkthrough — not CR’s full scroll-morph sync sequence. */
const ensureStaticWalkthrough = (host: HTMLElement) => {
  const sequence = host.querySelector<HTMLElement>(
    '.ChangeStackSyncAnimation-module__mn0tNa__sequence',
  );
  if (!sequence) return;

  sequence.removeAttribute('data-animated');
  sequence.removeAttribute('data-phase');
  sequence.style.removeProperty('--sync-scroll-progress');
};

const removeBlastRadiusFeature = (host: HTMLElement) => {
  host.querySelector('[data-feature-id="blast-radius"]')?.remove();
};

/** Desktop: highlight whichever feature block is nearest the focus line while scrolling. */
const wireFeatureScrollSpy = (
  host: HTMLElement,
  selectFeature: (id: string | null) => void,
) => {
  const features = [
    ...host.querySelectorAll<HTMLElement>('.ChangeStackProductEvidence-module__8lvVya__feature'),
  ];
  if (features.length === 0) return () => {};

  const mq = window.matchMedia('(min-width: 48rem)');
  let frame = 0;

  const syncFromScroll = () => {
    frame = 0;
    if (!mq.matches) return;

    const focusY = window.innerHeight * 0.42;
    let bestId: string | null = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const feature of features) {
      const id = feature.getAttribute('data-feature-id');
      if (!id) continue;
      const rect = feature.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - focusY);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestId = id;
      }
    }

    if (bestId) selectFeature(bestId);
  };

  const onScroll = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(syncFromScroll);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  mq.addEventListener('change', onScroll);
  syncFromScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    mq.removeEventListener('change', onScroll);
    if (frame) window.cancelAnimationFrame(frame);
  };
};

const wireFeatureControls = (host: HTMLElement): (() => void) => {
  const walkthroughScreen = host.querySelector<HTMLElement>(
    '.ChangeStackProductEvidence-module__8lvVya__walkthroughScreen',
  );

  const selectFeature = (id: string | null) => {
    if (!id) return;
    host.querySelectorAll<HTMLElement>('[data-feature-id]').forEach((item) => {
      const selected = item.getAttribute('data-feature-id') === id;
      item.setAttribute('data-selected', selected ? 'true' : 'false');
      const button = item.querySelector<HTMLButtonElement>('button');
      if (button) button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    walkthroughScreen?.setAttribute('data-focus', id);
    emitChangeStackWalkthroughFocus(
      walkthroughScreen,
      id as ChangeStackFocusId,
    );
  };

  const onFeatureActivate = (target: EventTarget | null) => {
    const item = (target as HTMLElement | null)?.closest<HTMLElement>('[data-feature-id]');
    selectFeature(item?.getAttribute('data-feature-id') ?? null);
  };

  host.querySelectorAll<HTMLButtonElement>('.ChangeStackProductEvidence-module__8lvVya__featureControl').forEach(
    (button) => {
      button.addEventListener('click', () => onFeatureActivate(button));
    },
  );

  host.querySelectorAll<HTMLElement>('.ChangeStackProductEvidence-module__8lvVya__feature').forEach((item) => {
    item.addEventListener('click', (event) => {
      if ((event.target as HTMLElement).closest('button')) return;
      onFeatureActivate(item);
    });
  });

  const initial =
    host.querySelector<HTMLElement>('[data-feature-id][data-selected="true"]')?.getAttribute(
      'data-feature-id',
    ) ?? 'cohorts';
  selectFeature(initial);

  const teardownScrollSpy = wireFeatureScrollSpy(host, selectFeature);
  return () => {
    teardownScrollSpy();
  };
};

export const mountChangeStackLayersClone = (host: HTMLElement): (() => void) => {
  fixRelativeUrls(host);
  applyChangeStackLayersCopy(host);
  applyChangeStackDashboardChrome(host);
  applyKlearNowBranding(host);
  ensureStaticWalkthrough(host);
  removeBlastRadiusFeature(host);
  const teardownStages = mountChangeStackWalkthroughStages(host);
  const teardownFeatureControls = wireFeatureControls(host);
  return () => {
    teardownStages();
    teardownFeatureControls();
  };
};
