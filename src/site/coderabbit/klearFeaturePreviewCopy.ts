/** In-place copy updates for hero feature-card preview HTML (trade / customs domain). */

import { applyKlearNowBranding } from './klearNowBranding';

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

const applyPrioritizeColumnLabels = (host: HTMLElement) => {
  host.querySelectorAll('.PriorityQueuePreview-module__9NEAjq__columnTitle').forEach((el) => {
    const text = el.textContent?.trim();
    if (text === 'Now') el.textContent = 'At gate';
    if (text === 'Next') el.textContent = 'Queued';
  });
};

const applyReviewAuthorCopy = (host: HTMLElement) => {
  host.querySelectorAll('.HomeHero-module__cJy2da__commentAuthor').forEach((el) => {
    el.textContent = 'KlearNow AI';
  });
  host.querySelectorAll('.HomeHero-module__cJy2da__commentBadge').forEach((el) => {
    el.textContent = 'assistant';
  });
  host.querySelectorAll('.HomeHero-module__cJy2da__commentMeta').forEach((el) => {
    const text = el.textContent ?? '';
    if (text.includes('commented')) {
      el.textContent = text.replace('commented', 'parsed');
    }
  });
};

/** Repair bad strings from an earlier global "Now" → "At gate" pass that hit "KlearNow". */
const repairAccidentalReplacements = (host: HTMLElement) => {
  replaceTextInTree(host, [
    ['KlearNow AIbot', 'KlearNow AI'],
    ['KlearNow Aibot', 'KlearNow AI'],
    ['KlearAt gate', 'KlearNow'],
    ['KlearAt gatebot', 'KlearNow AI'],
    ['KlearAt gate bot', 'KlearNow AI'],
  ]);
};

const PREVIEW_COPY: [string, string][] = [
  ['Review Change Stack', 'Document intake stack'],
  [
    'Reject expired refresh tokens before issuing a session.',
    'Harmonized tariff mismatch on line 12 — confirm HTS 8471.30 before AES submit.',
  ],
  ['Skip bot-authored comment review tasks', 'Clear customs hold on shipment KN-20481'],
  [
    'Review this early because it can resolve assumptions that may affect nearby PRs and reduce rework.',
    'Prioritize now — PGA hold may block release if not cleared before today’s port cutoff.',
  ],
  [
    'Keep this visible for async review because it is useful work without an immediate interruption signal.',
    'Queue for entry tonight — documents complete; awaiting carrier arrival window.',
  ],
  [
    'Hold this behind refresh work because draft, conflict, or drift signals would make reviewer attention premature.',
    'Hold until broker confirms revised commercial invoice and packing list totals.',
  ],
  [
    'feat(agents): extend per-run prompt_cache_key to cbe/customcheck/mcp-research',
    'SHP-8821 · Missing manufacturer ID on textile declaration',
  ],
  ['fix(dashboard): scope PR details authors by org', 'BRK-4410 · Duplicate ISF consignee identifier'],
  ['[codex] Lean path instruction metrics insert', 'DUTY-1192 · Section 321 eligibility review'],
  ['Low security risk', 'Low duty impact'],
  ['Maintenance', 'Data quality'],
  ['Bug fix', 'Compliance'],
  ['Deep review', 'Full audit'],
  ['Real-time codebase health', 'Real-time exception routing'],
  ['Mostly healthy', 'Mostly clear'],
  ['Scanning every PR', 'Monitoring every shipment'],
  ['0 critical', '0 holds'],
  ['Dependency vulnerability', 'Customs classification issue'],
  ['Detected on PR #482', 'Flagged on entry #482'],
  ['axios · GHSA-4w2v-q235-vp99', 'HTS 8471.30 · PGA hold'],
  ['Add teammate invitations with roles', 'Add broker collaborators with roles'],
  ['Submit review', 'Submit filing'],
  ['Stack:', 'Trail:'],
  ['All remaining reviews', 'All open exceptions'],
  ['Standard review', 'Standard filing'],
  ['AI Deep Scan and Dependencies', 'AI exception triage & duties'],
  ['Healthy ', 'Cleared '],
  ['Unscanned ', 'Pending '],
  ['Last scan now', 'Last check now'],
];

const ENTRY_QUEUE_REASONS = [
  'Prioritize now — PGA hold may block release if not cleared before today’s port cutoff.',
  'Resolve manufacturer ID gap — textile PGA requires MID before CBP may release.',
  'Queue for entry tonight — documents complete; awaiting carrier arrival window.',
  'Hold until broker confirms revised commercial invoice and packing list totals.',
];

const ENTRY_SHIPMENT_IDS = ['KN-20481', 'SHP-8821', 'BRK-4410', 'DUTY-1192'];

/** Entry tab (prioritize queue) — customs clearance copy only; layout unchanged. */
const applyEntryPrioritizeCopy = (host: HTMLElement) => {
  const entryCard = host.querySelector('[data-feature="prioritize"]');
  if (!entryCard) return;

  replaceTextInTree(entryCard, [
    ["Within each person's daily capacity", "Within today's port capacity"],
    ['Skip bot-authored comment review tasks', 'Clear customs hold on shipment KN-20481'],
    [
      'feat(agents): extend per-run prompt_cache_key to cbe/customcheck/mcp-research',
      'SHP-8821 · Missing manufacturer ID on textile declaration',
    ],
    ['fix(dashboard): scope PR details authors by org', 'BRK-4410 · Duplicate ISF consignee identifier'],
    ['[codex] Lean path instruction metrics insert', 'DUTY-1192 · Section 321 eligibility review'],
    ['Low security risk', 'Low duty impact'],
    ['Maintenance', 'Data quality'],
    ['Bug fix', 'Compliance'],
    ['Deep review', 'Full audit'],
    ['Standard review', 'Standard filing'],
    ['Feature', 'Import filing'],
    ['Needs author action', 'Awaiting broker docs'],
    ['@ezrapike[bot]', '@klear-ai'],
    ['@arlopike', '@broker-desk'],
    ['@miravale', '@ops-lead'],
  ]);

  entryCard.querySelectorAll('.PriorityQueuePreview-module__9NEAjq__column').forEach((column, index) => {
    const description = column.querySelector('.PriorityQueuePreview-module__9NEAjq__columnDescription');
    if (!description) return;
    description.textContent =
      index === 0 ? "Within today's port capacity" : 'All open exceptions';
  });

  entryCard.querySelectorAll('.PriorityQueuePreview-module__9NEAjq__card').forEach((card, index) => {
    const reason = card.querySelector('.PriorityQueuePreview-module__9NEAjq__reason');
    if (reason && ENTRY_QUEUE_REASONS[index]) {
      reason.textContent = ENTRY_QUEUE_REASONS[index];
    }
  });

  entryCard.querySelectorAll('.PriorityQueuePreview-module__9NEAjq__reference').forEach((el, index) => {
    const shipmentId = ENTRY_SHIPMENT_IDS[index];
    if (shipmentId) el.textContent = shipmentId;
  });

  entryCard.querySelectorAll('.PriorityQueuePreview-module__9NEAjq__tag').forEach((el) => {
    const label = el.textContent?.trim();
    if (label === 'Draft' || label === 'Draft entry entry') el.textContent = 'Draft entry';
    if (label === 'Needs author action') el.textContent = 'Awaiting broker docs';
  });
};

const UNDERSTAND_SIDEBAR_ICON_PATHS: Record<string, string> = {
  overview:
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="M3.27 6.96 12 12.01l8.73-5.05"></path><path d="M12 22.08V12"></path>',
  'blast-radius':
    '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>',
  'architecture-impact':
    '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11"></path><path d="M15 18H9"></path><path d="M19 18h2v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 16.52 9H14"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>',
  qa: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path><path d="m9 12 2 2 4-4"></path>',
};

const TRADE_DETAIL_PANELS: { match: RegExp; rows: string[] }[] = [
  {
    match: /release gate|permissions|Capture customs/i,
    rows: [
      'CBP release timestamp captured for Entry 482',
      'PGA status synced — FDA line items cleared',
      'Port-out event queued for Oakland terminal',
    ],
  },
  {
    match: /ETA|delivery-eta|Propagate delivery/i,
    rows: [
      'TMS delivery window updated (+2 business days)',
      'Broker portal sync complete for KN-20481',
      'Consignee alerts queued (email + SMS)',
    ],
  },
  {
    match: /impact-routes|stakeholder|Surface release/i,
    rows: [
      'Customer dashboard status chip refreshed',
      'Carrier webhook fired for last-mile partner',
      'Exception queue closed — 3 holds cleared',
    ],
  },
];

const applyUnderstandCenterColumn = (understandCard: ParentNode) => {
  const center = understandCard.querySelector('.HomeHero-module__cJy2da__reviewStackCenterColumn');
  if (!center) return;

  const main = center.querySelector('main');
  if (main) main.setAttribute('aria-label', 'Delivery impact detail');

  center.querySelectorAll('section[aria-label="Layer file review stack"]').forEach((el) => {
    el.setAttribute('aria-label', 'Release milestone updates');
  });

  replaceTextInTree(center, [
    ['Mark viewed', 'Broker acknowledged'],
    ['Mark as viewed', 'Broker acknowledged'],
    ['Modified', 'Updated'],
    ['Add file comment on src/server/auth/permissions.ts', 'Add broker note on release gate'],
    ['filings/kn-20481/release-gate.ts', 'Shipment KN-20481 · Release gate'],
    ['events/delivery-eta-service.ts', 'KN-20481 · Delivery ETA sync'],
    ['api/delivery-impact-routes.ts', 'KN-20481 · Stakeholder notifications'],
  ]);

  center.querySelectorAll('[data-pierre-file-icon]').forEach((el) => {
    el.textContent = 'DOC';
  });

  center.querySelectorAll('article[aria-label]').forEach((article) => {
    const label = article.getAttribute('aria-label') ?? '';
    if (label.includes('permissions.ts')) {
      article.setAttribute('aria-label', 'Shipment KN-20481 · Release gate');
    } else if (label.includes('invitationService.ts')) {
      article.setAttribute('aria-label', 'KN-20481 · Delivery ETA sync');
    } else if (label.includes('invitationRouter.ts')) {
      article.setAttribute('aria-label', 'KN-20481 · Stakeholder notifications');
    }
  });

  center.querySelectorAll('.tabular-nums').forEach((el) => {
    const compact = (el.textContent ?? '').replace(/\s/g, '');
    if (compact.includes('-3') && compact.includes('+11')) {
      el.textContent = '3 cleared · 11 updated';
    }
  });

  const title =
    center.querySelector('.HomeHero-module__cJy2da__reviewStackCenterColumn h2')?.textContent?.trim() ?? '';
  const panelDef =
    TRADE_DETAIL_PANELS.find((def) => def.match.test(title)) ?? TRADE_DETAIL_PANELS[1];

  const stackSection =
    center.querySelector('section[aria-label="Release milestone updates"]') ??
    center.querySelector('section[aria-label="Layer file review stack"]');

  if (stackSection instanceof HTMLElement) {
    stackSection.querySelectorAll('[data-diff-type]').forEach((diff) => {
      const block = diff.closest('[class*="18161c"]');
      if (block instanceof HTMLElement) block.hidden = true;
    });

    const legacyFileStack = stackSection.querySelector(':scope > div.min-h-full');
    if (legacyFileStack instanceof HTMLElement) {
      legacyFileStack.hidden = true;
    }

    if (!stackSection.querySelector('.cr-klear-trade-detail')) {
      const panel = document.createElement('div');
      panel.className = 'cr-klear-trade-detail';
      panel.setAttribute('role', 'list');

      const heading = document.createElement('p');
      heading.className = 'cr-klear-trade-detail__heading';
      heading.textContent = 'Downstream updates';
      panel.appendChild(heading);

      panelDef.rows.forEach((row) => {
        const item = document.createElement('div');
        item.className = 'cr-klear-trade-detail__row';
        item.setAttribute('role', 'listitem');
        item.textContent = row;
        panel.appendChild(item);
      });

      stackSection.appendChild(panel);
    }
  }
};

const applyUnderstandReviewStackToolbar = (understandCard: ParentNode) => {
  const toolbar = understandCard.querySelector('.HomeHero-module__cJy2da__reviewStackToolbar');
  if (!toolbar) return;

  toolbar.setAttribute('aria-label', 'Shipment release workflow');

  toolbar.querySelectorAll('[title*="Pull request"]').forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    el.setAttribute('title', 'Shipment status: Release pending');
    el.querySelectorAll('svg').forEach((svg) => svg.remove());
    el.textContent = 'Release pending';
  });

  toolbar.querySelectorAll('span[title*="acme"], span[title*="web-app"], span[title*="logistics-hub"]').forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    el.setAttribute('title', 'Shipment KN-20481 · Entry 482');
    el.querySelectorAll('svg').forEach((svg) => svg.remove());
    el.textContent = 'Shipment KN-20481 · Entry 482';
  });
};

const applyUnderstandSidebarIcons = (understandCard: ParentNode) => {
  understandCard.querySelectorAll('[data-sidebar-icon]').forEach((svg) => {
    if (!(svg instanceof SVGElement)) return;
    const key = svg.getAttribute('data-sidebar-icon');
    const paths = key ? UNDERSTAND_SIDEBAR_ICON_PATHS[key] : undefined;
    if (paths) svg.innerHTML = paths;
  });

  understandCard.querySelectorAll('[aria-label]').forEach((el) => {
    const label = el.getAttribute('aria-label') ?? '';
    if (label.startsWith('Pull request overview')) {
      el.setAttribute('aria-label', 'Shipment overview — Release pending, 1 hold');
    }
    if (label === 'Security blast radius') {
      el.setAttribute('aria-label', 'Duty and tariff exposure');
    }
    if (label === 'Architecture impact') {
      el.setAttribute('aria-label', 'Delivery network impact');
    }
  });
};

/** Post-Entry tab (understand stack) — release & delivery impact copy only; layout unchanged. */
const applyPostEntryUnderstandCopy = (host: HTMLElement) => {
  const understandCard = host.querySelector('[data-feature="understand"]');
  if (!understandCard) return;

  replaceTextInTree(understandCard, [
    ['Add broker collaborators with roles', 'Release impact on delivery timeline'],
    [
      'Trail: Invitation data model, API emails, and members UI',
      'Trail: CBP release, port pickup, last-mile delivery',
    ],
    [
      'Stack: Invitation data model, API emails, and members UI',
      'Trail: CBP release, port pickup, last-mile delivery',
    ],
    ['9 files', '9 milestones'],
    ['Security blast radius', 'Duty & tariff exposure'],
    ['Architecture impact', 'Delivery network impact'],
    ['QA Agent', 'Compliance agent'],
    ['Add the invitation data model', 'Capture customs release event'],
    ['Add the invitation API and emails', 'Propagate delivery ETA updates'],
    ['Build the invite & members UI', 'Surface release status to stakeholders'],
    ['2 files touched', '2 milestones updated'],
    ['3 files touched', '3 systems updated'],
    ['4 files touched', '4 touchpoints updated'],
    [
      'Introduce the `Invitation` record and `MemberRole` enum, and the migration that creates the invitations table. This is the foundation the API and UI build on.',
      'Record CBP release timestamp, entry number, and PGA status — the anchor event downstream ETA and warehouse scheduling depend on.',
    ],
    [
      'Endpoints to create, list, and accept invitations; token generation; the invitation email; and the admin-only permission gate.',
      'Push recalculated delivery windows to TMS, broker portal, and consignee alerts when release or holds change.',
    ],
    [
      'The Members settings page, the invite dialog, the data hook that talks to the API, and a reusable role picker.',
      'Shipment timeline view, hold banner, webhook to carrier, and a customer-ready status chip on the delivery dashboard.',
    ],
    ['None · foundation layer', 'None · port of entry'],
    ['src/server/auth/permissions.ts', 'Shipment KN-20481 · Release gate'],
    ['src/server/invitations/invitationService.ts', 'KN-20481 · Delivery ETA sync'],
    ['src/server/invitations/invitationRouter.ts', 'KN-20481 · Stakeholder notifications'],
    ['20 unmodified lines', '20 unchanged fields'],
    ['canRemoveMember(', 'clearCustomsHold('],
    ['canInviteMembers(', 'notifyConsignee('],
    [
      'Whether the member may create or revoke teammate',
      'Whether the broker may clear holds or reassign',
    ],
    ['invitations.', 'delivery slots.'],
    ['Restricted to org admins.', 'Restricted to licensed broker admins.'],
    [
      'createInvitation builds the invite token, sets...',
      'Release event ingests CBP status, stamps port out...',
    ],
    [
      'acceptInvitation validates the token and expiry,...',
      'ETA refresh validates carrier window and cutoff,...',
    ],
    ["GET /invitations returns the org's pending...", "GET /shipments returns pending release..."],
    ['POST /invitations validates input, checks the...', 'POST /release validates PGA, checks the...'],
    [
      'Renders the invitation email with the...',
      'Renders the consignee alert with the...',
    ],
    [
      'Adds canInviteMembers , restricting invitation create/revoke...',
      'Adds notifyConsignee , restricting delivery updates...',
    ],
  ]);

  understandCard.querySelectorAll('.HomeHero-module__cJy2da__layerHoverDescription').forEach((el, index) => {
    const descriptions = [
      'Record CBP release timestamp, entry number, and PGA status — the anchor event downstream ETA and warehouse scheduling depend on.',
      'Push recalculated delivery windows to TMS, broker portal, and consignee alerts when release or holds change.',
      'Shipment timeline view, hold banner, webhook to carrier, and a customer-ready status chip on the delivery dashboard.',
    ];
    if (descriptions[index]) el.textContent = descriptions[index];
  });

  understandCard.querySelectorAll('[aria-label]').forEach((el) => {
    const label = el.getAttribute('aria-label');
    if (!label) return;
    const next = label
      .replace('src/server/auth/permissions.ts', 'Shipment KN-20481 · Release gate')
      .replace('src/server/invitations/invitationService.ts', 'KN-20481 · Delivery ETA sync')
      .replace('src/server/invitations/invitationRouter.ts', 'KN-20481 · Stakeholder notifications')
      .replace('Review stack file review', 'Delivery impact detail')
      .replace('Layer file review stack', 'Release milestone updates');
    if (next !== label) el.setAttribute('aria-label', next);
  });

  applyUnderstandCenterColumn(understandCard);
  applyUnderstandReviewStackToolbar(understandCard);
  applyUnderstandSidebarIcons(understandCard);
  applyUnderstandLayoutCleanup(understandCard);
  applyUnderstandLightPanels(understandCard);
};

/** Post-Entry — drop dev-only chrome that clips into dark slivers on the card edge. */
const applyUnderstandLayoutCleanup = (understandCard: ParentNode) => {
  understandCard.querySelectorAll('.HomeHero-module__cJy2da__layerHoverCard').forEach((el) => {
    if (el instanceof HTMLElement) el.hidden = true;
  });

  understandCard.querySelectorAll('.HomeHero-module__cJy2da__reviewStackRightSidebar').forEach((el) => {
    if (el instanceof HTMLElement) el.hidden = true;
  });

  const stackGrid = understandCard.querySelector(
    '.HomeHero-module__cJy2da__reviewStackScreen .grid.h-full',
  );
  if (stackGrid instanceof HTMLElement) {
    stackGrid.style.gridTemplateColumns = 'minmax(0, 13.5rem) minmax(0, 1fr)';
  }

  understandCard
    .querySelectorAll('.HomeHero-module__cJy2da__reviewStackSidebar .group.overflow-hidden')
    .forEach((el) => {
      if (el instanceof HTMLElement) el.classList.replace('overflow-hidden', 'overflow-visible');
    });

  understandCard.querySelectorAll('.HomeHero-module__cJy2da__reviewStackScreen').forEach((el) => {
    if (el instanceof HTMLElement) el.style.overflow = 'hidden';
  });
};

/** Post-Entry — trade labels on sidebar chips and layer tooltips. */
const applyUnderstandLightPanels = (understandCard: ParentNode) => {
  understandCard.querySelectorAll('.HomeHero-module__cJy2da__layerHoverDescription').forEach((el) => {
    if (el instanceof HTMLElement) el.classList.remove('text-gray-300');
  });

  // Status chip stays on the stack toolbar only — drop the duplicate beside "Overview".
  const sidebar = understandCard.querySelector('.HomeHero-module__cJy2da__reviewStackSidebar');
  sidebar
    ?.querySelectorAll('[title="Pull request: Open"], [title="Shipment status: Release pending"]')
    .forEach((el) => {
      el.remove();
    });

  understandCard.querySelectorAll('[title="Pull request: Open"]').forEach((el) => {
    if (!(el instanceof HTMLElement)) return;
    if (el.closest('.HomeHero-module__cJy2da__reviewStackSidebar')) return;
    el.setAttribute('title', 'Shipment status: Release pending');
    el.textContent = 'Release pending';
    el.querySelectorAll('svg').forEach((svg) => svg.remove());
  });
};

/** Agents tab (secure) — trade exception dashboard copy only; layout unchanged. */
const applyAgentsPreviewCopy = (host: HTMLElement) => {
  const secureCard = host.querySelector('[data-feature="secure"]');
  if (!secureCard) return;

  replaceTextInTree(secureCard, [
    ['Real-time codebase health', 'Real-time exception routing'],
    ['Real-time exception routing', 'REAL-TIME EXCEPTION ROUTING'],
    ['Mostly healthy', 'Mostly clear'],
    ['Scanning every PR', 'Monitoring every shipment'],
    ['Last scan now', 'Last check now'],
    ['0 critical', '0 holds'],
    ['Dependency vulnerability', 'Customs classification issue'],
    ['axios · GHSA-4w2v-q235-vp99', 'HTS 8471.30 · PGA hold'],
    ['Detected on PR #482', 'Flagged on entry #482'],
    ['Fix ready', 'Broker verified'],
    ['Severity distribution', 'Exception severity mix'],
    ['AI Deep Scan and Dependencies', 'AI exception triage & duties'],
    ['1,999', '847'],
    ['findings', 'open exceptions'],
    ['Unscanned', 'Pending'],
    ['Healthy', 'Cleared'],
  ]);
};

export const applyKlearFeaturePreviewCopy = (host: HTMLElement) => {
  repairAccidentalReplacements(host);
  applyReviewAuthorCopy(host);
  replaceTextInTree(host, PREVIEW_COPY);
  applyEntryPrioritizeCopy(host);
  applyPostEntryUnderstandCopy(host);
  applyAgentsPreviewCopy(host);
  applyPrioritizeColumnLabels(host);
  applyKlearNowBranding(host);
};
