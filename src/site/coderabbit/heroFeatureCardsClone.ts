import { applyKlearFeaturePreviewCopy } from './klearFeaturePreviewCopy';

const ROTATE_MS = 6000;
const MOBILE_CARDS_MQ = '(max-width: 63.999rem)';

const FEATURES = [
  { id: 'review', lead: 'Pre-Entry', remainder: 'validate documents before filing' },
  { id: 'prioritize', lead: 'Entry', remainder: 'shipments by customs priority' },
  { id: 'understand', lead: 'Post-Entry', remainder: 'release and delivery impact' },
  { id: 'secure', lead: 'Agents', remainder: 'resolve exceptions continually' },
] as const;

type FeatureId = (typeof FEATURES)[number]['id'];

const featureIndex = (id: FeatureId) => FEATURES.findIndex((f) => f.id === id);

const PAUSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="HeroFeatureCards-module__QnOXea__playbackButtonIcon"><path d="M4.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1ZM10.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1Z"></path></svg>`;

const PLAY_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon" class="HeroFeatureCards-module__QnOXea__playbackButtonIcon"><path d="M4.5 3.653v8.694a.75.75 0 0 0 1.124.65l7.682-4.347a.75.75 0 0 0 0-1.3L5.624 3.003a.75.75 0 0 0-1.124.65Z"></path></svg>`;

const syncFeatureBannerLabels = (root: HTMLElement) => {
  const cards = root.querySelector<HTMLElement>('.HeroFeatureCards-module__QnOXea__cards');
  if (cards) {
    cards.setAttribute('aria-label', 'Explore KlearNow trade workflows');
  }

  for (const meta of FEATURES) {
    const button = root.querySelector<HTMLButtonElement>(`button[data-feature="${meta.id}"]`);
    const lead = button?.querySelector('.HeroFeatureCards-module__QnOXea__cardLabelLead');
    if (lead) lead.textContent = meta.lead;
  }
};

const setLabelRemainder = (button: HTMLButtonElement, active: boolean, remainder: string) => {
  const label = button.querySelector('.HeroFeatureCards-module__QnOXea__cardLabel');
  if (!label) return;
  const existing = label.querySelector('.HeroFeatureCards-module__QnOXea__cardLabelRemainder');
  if (active) {
    if (existing) {
      existing.textContent = ` ${remainder}`;
    } else {
      const span = document.createElement('span');
      span.className = 'HeroFeatureCards-module__QnOXea__cardLabelRemainder';
      span.textContent = ` ${remainder}`;
      label.appendChild(span);
    }
  } else if (existing) {
    existing.remove();
  }
};

const remountProgressFill = (
  button: HTMLButtonElement,
  paused: boolean,
  progressKey: string,
  onAnimationEnd: () => void,
) => {
  let track = button.querySelector<HTMLElement>('.HeroFeatureCards-module__QnOXea__cardProgressTrack');
  if (!track) {
    track = document.createElement('span');
    track.className = 'HeroFeatureCards-module__QnOXea__cardProgressTrack';
    track.setAttribute('aria-hidden', 'true');
    const label = button.querySelector('.HeroFeatureCards-module__QnOXea__cardLabel');
    if (label?.parentElement === button) {
      button.insertBefore(track, label.nextSibling);
    } else {
      button.prepend(track);
    }
  }

  track.innerHTML = '';
  const fill = document.createElement('span');
  fill.className = 'HeroFeatureCards-module__QnOXea__cardProgressFill';
  fill.dataset.progressKey = progressKey;
  if (paused) fill.setAttribute('data-paused', 'true');
  fill.addEventListener('animationend', onAnimationEnd);
  track.appendChild(fill);

  if (!paused) {
    fill.style.animation = `${ROTATE_MS}ms linear forwards HeroFeatureCards-module__QnOXea__hero-feature-progress`;
  }
};

const syncWorkflowStage = (host: HTMLElement, featureId: FeatureId) => {
  const stage = host.closest('.cr-cr-hero__root');
  if (stage) stage.setAttribute('data-workflow-active-card', featureId);
};

export const setActiveFeature = (
  root: HTMLElement,
  featureId: FeatureId,
  paused: boolean,
  progressKey: string,
  onProgressComplete: () => void,
) => {
  const cards = root.querySelectorAll<HTMLButtonElement>('button[data-feature]');
  cards.forEach((button) => {
    const id = button.getAttribute('data-feature') as FeatureId;
    const meta = FEATURES.find((f) => f.id === id);
    const isActive = id === featureId;
    button.setAttribute('data-active', isActive ? 'true' : 'false');
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    if (meta) setLabelRemainder(button, isActive, meta.remainder);

    if (isActive) {
      remountProgressFill(button, paused, progressKey, onProgressComplete);
    } else {
      const track = button.querySelector('.HeroFeatureCards-module__QnOXea__cardProgressTrack');
      if (track) track.innerHTML = '';
    }
  });
};

const syncPlaybackButton = (root: HTMLElement, paused: boolean, reducedMotion: boolean) => {
  const playback = root.querySelector<HTMLButtonElement>('[data-hero-playback-control]');
  if (!playback) return;

  const effectivelyPaused = paused || reducedMotion;
  playback.setAttribute(
    'aria-label',
    effectivelyPaused ? 'Resume automatic feature rotation' : 'Pause automatic feature rotation',
  );
  playback.innerHTML = effectivelyPaused ? PLAY_ICON : PAUSE_ICON;
};

export const mountHeroFeatureCardsClone = (host: HTMLElement) => {
  const root = host.querySelector<HTMLElement>('.HeroFeatureCards-module__QnOXea__root');
  const cardsEl = root?.querySelector<HTMLElement>('.HeroFeatureCards-module__QnOXea__cards');
  if (!root || !cardsEl) return () => {};

  syncFeatureBannerLabels(root);
  applyKlearFeaturePreviewCopy(root);

  let activeIndex = 0;
  let progressGeneration = 0;
  let userPlayback: 'playing' | 'paused' | null = null;
  let isAnimationActive = false;
  let scrollTimer: number | undefined;

  const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

  const isPaused = () => {
    if (userPlayback === 'paused') return true;
    if (userPlayback === 'playing') return false;
    return reducedMotionMq.matches;
  };

  const shouldPauseProgress = () => isPaused() || !isAnimationActive;

  const scrollActiveCardIntoView = (featureId: FeatureId) => {
    if (!window.matchMedia(MOBILE_CARDS_MQ).matches) return;
    window.requestAnimationFrame(() => {
      const card = cardsEl.querySelector<HTMLElement>(`[data-feature='${featureId}']`);
      if (!card) return;
      const reduceMotion = reducedMotionMq.matches;
      cardsEl.scrollTo({
        behavior: reduceMotion ? 'auto' : 'smooth',
        left: card.offsetLeft,
      });
    });
  };

  const selectFeature = (featureId: FeatureId, scrollIntoView = false) => {
    const idx = featureIndex(featureId);
    if (idx < 0) return;
    activeIndex = idx;
    progressGeneration += 1;
    sync();
    if (scrollIntoView) scrollActiveCardIntoView(featureId);
  };

  const advanceFeature = () => {
    if (shouldPauseProgress()) return;
    activeIndex = (activeIndex + 1) % FEATURES.length;
    progressGeneration += 1;
    sync();
  };

  const sync = () => {
    const featureId = FEATURES[activeIndex].id;
    const paused = shouldPauseProgress();
    setActiveFeature(root, featureId, paused, `${featureId}-${progressGeneration}`, advanceFeature);
    syncWorkflowStage(host, featureId);
    syncPlaybackButton(root, isPaused(), reducedMotionMq.matches);
    cardsEl.dataset.animationActive = isAnimationActive ? 'true' : 'false';
  };

  const onScroll = () => {
    if (!window.matchMedia(MOBILE_CARDS_MQ).matches) return;
    if (scrollTimer) window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const cards = Array.from(cardsEl.querySelectorAll<HTMLElement>('[data-feature]'));
      const nearest = cards.reduce<HTMLElement | null>((best, card) => {
        if (!best) return card;
        return Math.abs(card.offsetLeft - cardsEl.scrollLeft) <
          Math.abs(best.offsetLeft - cardsEl.scrollLeft)
          ? card
          : best;
      }, null);
      const id = nearest?.dataset.feature as FeatureId | undefined;
      if (id) selectFeature(id);
    }, 100);
  };

  const pointerState = {
    hasSwiped: false,
    pointerId: null as number | null,
    startTime: 0,
    startX: 0,
    startY: 0,
    suppressClick: false,
  };

  const onPointerDown = (event: PointerEvent) => {
    if (!window.matchMedia(MOBILE_CARDS_MQ).matches) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerState.hasSwiped = false;
    pointerState.pointerId = event.pointerId;
    pointerState.startTime = Date.now();
    pointerState.startX = event.clientX;
    pointerState.startY = event.clientY;
    pointerState.suppressClick = false;
    cardsEl.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (pointerState.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - pointerState.startX;
    const deltaY = event.clientY - pointerState.startY;
    if (!pointerState.hasSwiped && Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      pointerState.hasSwiped = true;
    }
    if (pointerState.hasSwiped) event.preventDefault();
  };

  const finishPointer = (event: PointerEvent) => {
    if (pointerState.pointerId !== event.pointerId) return;
    if (cardsEl.hasPointerCapture(event.pointerId)) {
      cardsEl.releasePointerCapture(event.pointerId);
    }

    const deltaX = event.clientX - pointerState.startX;
    const deltaY = event.clientY - pointerState.startY;
    const velocity = Math.abs(deltaX) / Math.max(1, Date.now() - pointerState.startTime);
    const shouldSwipe =
      pointerState.hasSwiped &&
      Math.abs(deltaX) > Math.abs(deltaY) &&
      (Math.abs(deltaX) >= 48 || velocity >= 0.25);

    if (pointerState.hasSwiped) {
      pointerState.suppressClick = true;
      window.setTimeout(() => {
        if (pointerState.pointerId === null) {
          pointerState.hasSwiped = false;
          pointerState.suppressClick = false;
        }
      }, 350);
    }

    pointerState.pointerId = null;

    if (shouldSwipe) {
      const dir = deltaX < 0 ? 1 : -1;
      const next = (activeIndex + dir + FEATURES.length) % FEATURES.length;
      selectFeature(FEATURES[next].id, true);
    }
  };

  const onPointerUp = (event: PointerEvent) => finishPointer(event);
  const onPointerCancel = (event: PointerEvent) => {
    if (pointerState.pointerId !== event.pointerId) return;
    if (cardsEl.hasPointerCapture(event.pointerId)) {
      cardsEl.releasePointerCapture(event.pointerId);
    }
    pointerState.pointerId = null;
    pointerState.hasSwiped = false;
    pointerState.suppressClick = false;
  };

  const onClickCapture = (event: Event) => {
    if (!window.matchMedia(MOBILE_CARDS_MQ).matches) return;
    if (!pointerState.suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    pointerState.hasSwiped = false;
    pointerState.suppressClick = false;
  };

  const onClick = (event: Event) => {
    const target = event.target as HTMLElement | null;

    const changeStack = target?.closest('[data-review-change-stack-trigger]');
    if (changeStack && root.contains(changeStack)) {
      selectFeature('understand', true);
      return;
    }

    const card = target?.closest<HTMLButtonElement>('button[data-feature]');
    if (card && root.contains(card)) {
      const id = card.getAttribute('data-feature') as FeatureId;
      selectFeature(id, true);
      return;
    }

    const prev = target?.closest('button[aria-label="Show previous feature"]');
    const next = target?.closest('button[aria-label="Show next feature"]');
    if (prev) {
      const idx = (activeIndex - 1 + FEATURES.length) % FEATURES.length;
      selectFeature(FEATURES[idx].id, true);
    }
    if (next) {
      const idx = (activeIndex + 1) % FEATURES.length;
      selectFeature(FEATURES[idx].id, true);
    }

    const playback = target?.closest<HTMLButtonElement>('[data-hero-playback-control]');
    if (playback) {
      userPlayback = isPaused() ? 'playing' : 'paused';
      sync();
    }
  };

  const onReducedMotionChange = () => sync();

  const cardButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('button[data-feature]'));
  const onCardActivate = (event: Event) => {
    const card = event.currentTarget as HTMLButtonElement;
    const id = card.getAttribute('data-feature') as FeatureId;
    selectFeature(id);
  };
  cardButtons.forEach((button) => {
    button.addEventListener('pointerenter', onCardActivate);
    button.addEventListener('focus', onCardActivate);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      isAnimationActive = entries.some((entry) => entry.isIntersecting);
      sync();
    },
    { threshold: 0.2 },
  );
  observer.observe(cardsEl);

  root.addEventListener('click', onClick);
  cardsEl.addEventListener('click', onClickCapture, true);
  cardsEl.addEventListener('scroll', onScroll);
  cardsEl.addEventListener('pointerdown', onPointerDown);
  cardsEl.addEventListener('pointermove', onPointerMove);
  cardsEl.addEventListener('pointerup', onPointerUp);
  cardsEl.addEventListener('pointercancel', onPointerCancel);
  reducedMotionMq.addEventListener('change', onReducedMotionChange);

  sync();

  return () => {
    observer.disconnect();
    if (scrollTimer) window.clearTimeout(scrollTimer);
    root.removeEventListener('click', onClick);
    cardsEl.removeEventListener('click', onClickCapture, true);
    cardButtons.forEach((button) => {
      button.removeEventListener('pointerenter', onCardActivate);
      button.removeEventListener('focus', onCardActivate);
    });
    cardsEl.removeEventListener('scroll', onScroll);
    cardsEl.removeEventListener('pointerdown', onPointerDown);
    cardsEl.removeEventListener('pointermove', onPointerMove);
    cardsEl.removeEventListener('pointerup', onPointerUp);
    cardsEl.removeEventListener('pointercancel', onPointerCancel);
    reducedMotionMq.removeEventListener('change', onReducedMotionChange);
  };
};
