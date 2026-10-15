import cohortsWorkflowStageHtml from './workflow-cohorts-stage.html?raw';
import verifyStageHtml from './workflow-verify-stage.html?raw';
import analyzeStageHtml from './workflow-analyze-stage.html?raw';

export type ChangeStackFocusId = 'cohorts' | 'layers' | 'architecture';

const STAGE_HTML: Record<ChangeStackFocusId, string> = {
  cohorts: cohortsWorkflowStageHtml,
  layers: verifyStageHtml,
  architecture: analyzeStageHtml,
};

const STAGE_KIND: Record<ChangeStackFocusId, 'workflow' | 'verify' | 'analyze'> = {
  cohorts: 'workflow',
  layers: 'verify',
  architecture: 'analyze',
};

const TOOLBAR_TITLE: Record<ChangeStackFocusId, string> = {
  cohorts: 'Shipment KN-20481 · Apex Industrial Parts · 7 documents',
  layers: 'Entry validation · KN-20481',
  architecture: 'Exception queue · KN-20481',
};

const TOOLBAR_META: Record<ChangeStackFocusId, string> = {
  cohorts: 'apex/logistics-portal · 7 documents',
  layers: 'Pre-entry & post-entry · same rules layer',
  architecture: '3 open exceptions · routing active',
};

const repairSidebarLabels = (screen: HTMLElement) => {
  const archBtn = screen.querySelector<HTMLElement>(
    '[data-review-layer-id="architecture-impact"] [title]',
  );
  if (archBtn) archBtn.textContent = 'Compliance impact';

  screen.querySelectorAll<HTMLElement>('[data-review-sidebar-items] button [title]').forEach((el) => {
    const t = el.textContent?.trim() ?? '';
    if (t.includes('Same engine') || t.includes('Every document in')) {
      el.textContent = 'Compliance impact';
    }
  });
};

const updateToolbarCopy = (screen: HTMLElement, focus: ChangeStackFocusId) => {
  const toolbar = screen.querySelector<HTMLElement>('[aria-label="Pull request toolbar"]');
  if (!toolbar) return;

  const mainTitle = toolbar.querySelector<HTMLElement>('.font-semibold');
  if (mainTitle) {
    mainTitle.textContent = TOOLBAR_TITLE[focus];
    mainTitle.setAttribute('title', TOOLBAR_TITLE[focus]);
  }

  const metaRow = toolbar.querySelector<HTMLElement>('.text-cui-secondary span[title]');
  if (metaRow) {
    metaRow.setAttribute('title', TOOLBAR_META[focus]);
    metaRow.textContent = TOOLBAR_META[focus];
  }
};

const syncStageRunning = (screen: HTMLElement, focus: ChangeStackFocusId) => {
  const mount = screen.querySelector<HTMLElement>('.cr-change-stack-focus-stages');
  if (!mount) return;

  mount.querySelectorAll<HTMLElement>('.cr-change-stack-focus-stage').forEach((panel) => {
    const active = panel.dataset.changeStackFocus === focus;
    panel.hidden = !active;
    panel.classList.toggle('is-running', active);
  });
};

export const mountChangeStackWalkthroughStages = (host: HTMLElement): (() => void) => {
  const screen = host.querySelector<HTMLElement>(
    '.ChangeStackProductEvidence-module__8lvVya__walkthroughScreen',
  );
  const stack = screen?.querySelector<HTMLElement>(
    '.HomeHero-module__cJy2da__reviewStackScreen',
  );
  if (!screen || !stack) return () => {};

  repairSidebarLabels(screen);

  stack.classList.add('cr-change-stack-product-shell');
  stack.querySelector<HTMLElement>(':scope > .grid')?.setAttribute('hidden', '');

  const mount = document.createElement('div');
  mount.className = 'cr-change-stack-focus-stages cr-change-stack-focus-stages--fullbleed';

  (Object.keys(STAGE_HTML) as ChangeStackFocusId[]).forEach((focus) => {
    const panel = document.createElement('div');
    const kind = STAGE_KIND[focus];
    panel.className =
      kind === 'workflow'
        ? 'cr-change-stack-focus-stage cr-change-stack-workflow-stage'
        : `cr-change-stack-focus-stage cr-agent-collect-illust stage cr-agent-stage-illust--${kind}`;
    panel.dataset.changeStackFocus = focus;
    panel.dataset.stage = kind;
    panel.hidden = focus !== 'cohorts';

    if (kind === 'workflow') {
      panel.innerHTML = STAGE_HTML[focus];
    } else {
      const fit = document.createElement('div');
      fit.className = 'cr-agent-collect-illust__fit';
      const inner = document.createElement('div');
      inner.className = 'cr-agent-collect-illust__stage-host';
      inner.innerHTML = STAGE_HTML[focus];
      fit.appendChild(inner);
      panel.appendChild(fit);
    }
    mount.appendChild(panel);
  });

  stack.appendChild(mount);

  const onFocus = (focus: ChangeStackFocusId) => {
    updateToolbarCopy(screen, focus);
    syncStageRunning(screen, focus);
  };

  screen.addEventListener('change-stack-focus', ((event: CustomEvent<{ focus: ChangeStackFocusId }>) => {
    if (event.detail?.focus) onFocus(event.detail.focus);
  }) as EventListener);

  onFocus('cohorts');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (!visible) {
        mount.querySelectorAll('.cr-change-stack-focus-stage').forEach((panel) => {
          panel.classList.remove('is-running');
        });
        return;
      }
      const focus = (screen.getAttribute('data-focus') ?? 'cohorts') as ChangeStackFocusId;
      syncStageRunning(screen, focus);
    },
    { threshold: 0.15 },
  );
  observer.observe(mount);
  const onReducedMotionChange = () => {
    const focus = (screen.getAttribute('data-focus') ?? 'cohorts') as ChangeStackFocusId;
    syncStageRunning(screen, focus);
  };
  reduced.addEventListener('change', onReducedMotionChange);

  return () => {
    observer.disconnect();
    reduced.removeEventListener('change', onReducedMotionChange);
    mount.remove();
    stack.classList.remove('cr-change-stack-product-shell');
    stack.querySelector<HTMLElement>(':scope > .grid')?.removeAttribute('hidden');
  };
};

export const emitChangeStackWalkthroughFocus = (
  screen: HTMLElement | null | undefined,
  focus: ChangeStackFocusId,
) => {
  screen?.dispatchEvent(new CustomEvent('change-stack-focus', { detail: { focus } }));
};
