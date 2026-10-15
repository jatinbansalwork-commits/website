import type { ChangeStackFocusId } from './changeStackWalkthroughStages';

const FILING_LAYER_STEPS: Record<ChangeStackFocusId, [string, string, string]> = {
  cohorts: [
    'Intake: email, portal & API',
    'Classify & extract fields',
    'Build shipment KN-20481',
  ],
  layers: [
    'Cross-check invoice & packing list',
    'Validate HTS & PGA rules',
    'Queue for filing when clean',
  ],
  architecture: [
    '23 lines auto-cleared',
    '1 exception · B/L page 4',
    'Route to Maria Chen · agent queue',
  ],
};

const replaceTextInTree = (root: ParentNode, replacements: [string, string][]) => {
  const ordered = [...replacements].sort((a, b) => b[0].length - a[0].length);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    let value = node.nodeValue ?? '';
    let changed = false;
    for (const [from, to] of ordered) {
      if (value.includes(from)) {
        value = value.split(from).join(to);
        changed = true;
      }
    }
    if (changed) node.nodeValue = value;
  }
};

const ACTIVITY_COPY: [string, string][] = [
  ['feat: add teammate invitations with roles', 'Shipment KN-20481 · 7 documents ingested'],
  ['demo-author requested review from demo-reviewer', '23 entry lines auto-cleared · no tariff flags'],
  ['demo-deploy-bot Comment', 'Exception agent · B/L page 4 missing'],
  ['demo-deploy-bot deployed the PR preview', 'Follow-up sent to Maria Chen · portal upload'],
  ['KlearNow reviewed the changes', 'Pre-entry validation · 3 passed, 1 in review'],
  ['The invitation workflow is ready to preview', 'One exception held · 23 lines cleared'],
  ['Preview checks passed', '3 checks passed · 1 sent to review'],
  ['Members settings conflict', 'Bill of lading page 4 missing'],
  ['Reviews', 'Validation'],
  ['Commits', 'Documents'],
  ['PR Status', 'Exceptions'],
  ['Bots', 'Agents'],
  ['CodeRabbit', 'KlearNow'],
  ['Pull request overview', 'Shipment overview'],
  ['Severity findings', 'Validation findings'],
  ['Files changed', 'Documents'],
  ['What changed', 'What was checked'],
  ['release blocker', 'filing hold'],
  ['merge blocker', 'filing hold'],
  ['Continue in GitHub', 'Continue in portal'],
];

const FILING_LAYER_ROW_IDS = ['schemas', 'storage', 'artifact-builder'] as const;

export const applyChangeStackDashboardChrome = (host: HTMLElement) => {
  replaceTextInTree(host, ACTIVITY_COPY);

  const screen = host.querySelector<HTMLElement>(
    '.ChangeStackProductEvidence-module__8lvVya__walkthroughScreen',
  );
  if (!screen) return;

  const syncFilingLayers = (focus: ChangeStackFocusId) => {
    const steps = FILING_LAYER_STEPS[focus];
    FILING_LAYER_ROW_IDS.forEach((layerId, index) => {
      const label = steps[index];
      if (!label) return;
      const titleEl = screen.querySelector<HTMLElement>(
        `[data-review-layer-id="${layerId}"] [title]`,
      );
      if (titleEl) {
        titleEl.textContent = label;
        titleEl.setAttribute('title', label);
      }
      const layerBtn = screen.querySelector<HTMLElement>(`[data-review-layer-id="${layerId}"]`);
      layerBtn?.setAttribute('aria-label', `Layer ${index + 1}: ${label}`);
    });
  };

  syncFilingLayers('cohorts');

  screen.addEventListener('change-stack-focus', ((event: CustomEvent<{ focus: ChangeStackFocusId }>) => {
    if (event.detail?.focus) syncFilingLayers(event.detail.focus);
  }) as EventListener);
};
