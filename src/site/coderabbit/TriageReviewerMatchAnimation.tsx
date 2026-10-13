import { useEffect, useRef, useState } from 'react';

const W = {
  surface: 'TriageReviewerMatchAnimation-module__ValKEG__surface',
  card: 'TriageReviewerMatchAnimation-module__ValKEG__card',
  cardCurrent: 'TriageReviewerMatchAnimation-module__ValKEG__cardCurrent',
  cardIncoming: 'TriageReviewerMatchAnimation-module__ValKEG__cardIncoming',
  cardOutgoing: 'TriageReviewerMatchAnimation-module__ValKEG__cardOutgoing',
  cardQueued: 'TriageReviewerMatchAnimation-module__ValKEG__cardQueued',
  priorityPill: 'TriageReviewerMatchAnimation-module__ValKEG__priorityPill',
  priorityDot: 'TriageReviewerMatchAnimation-module__ValKEG__priorityDot',
  rationale: 'TriageReviewerMatchAnimation-module__ValKEG__rationale',
  footerRow: 'TriageReviewerMatchAnimation-module__ValKEG__footerRow',
  footerGroup: 'TriageReviewerMatchAnimation-module__ValKEG__footerGroup',
  primaryMetadata: 'TriageReviewerMatchAnimation-module__ValKEG__primaryMetadata',
  repository: 'TriageReviewerMatchAnimation-module__ValKEG__repository',
  repositoryIcon: 'TriageReviewerMatchAnimation-module__ValKEG__repositoryIcon',
  author: 'TriageReviewerMatchAnimation-module__ValKEG__author',
  separator: 'TriageReviewerMatchAnimation-module__ValKEG__separator',
  reviewerPanel: 'TriageReviewerMatchAnimation-module__ValKEG__reviewerPanel',
  reviewerRow: 'TriageReviewerMatchAnimation-module__ValKEG__reviewerRow',
  requestButton: 'TriageReviewerMatchAnimation-module__ValKEG__requestButton',
  requestLabel: 'TriageReviewerMatchAnimation-module__ValKEG__requestLabel',
  requestMessage: 'TriageReviewerMatchAnimation-module__ValKEG__requestMessage',
  confirmationLabel: 'TriageReviewerMatchAnimation-module__ValKEG__confirmationLabel',
  reviewerAssignedPop: 'TriageReviewerMatchAnimation-module__ValKEG__reviewerAssignedPop',
  panelPosition:
    'pointer-events-none absolute left-1/2 top-1/2 z-20 w-[23rem] max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2',
  illustrationSurface: 'TriageIllustrationSurface-module__FDMM_q__surface',
  p0: 'TriagePriorityPill-module__W2zs-a__p0',
} as const;

type Phase =
  | 'origin'
  | 'trigger-active'
  | 'visible'
  | 'reviewer-active'
  | 'requesting'
  | 'confirmed'
  | 'closing'
  | 'assigned'
  | 'handoff';

const PHASE: Record<Phase, { duration: number; next: Phase }> = {
  origin: { duration: 160, next: 'trigger-active' },
  'trigger-active': { duration: 140, next: 'visible' },
  visible: { duration: 850, next: 'reviewer-active' },
  'reviewer-active': { duration: 650, next: 'requesting' },
  requesting: { duration: 120, next: 'confirmed' },
  confirmed: { duration: 380, next: 'closing' },
  closing: { duration: 340, next: 'assigned' },
  assigned: { duration: 440, next: 'handoff' },
  handoff: { duration: 560, next: 'origin' },
};

const crAvatar = (file: string, size: number) =>
  `https://www.coderabbit.ai/_next/image?url=${encodeURIComponent(`/redesign/${file}`)}&w=${size}&q=75`;

type Reviewer = { id: string; name: string; match: number; avatar: string };
type PullRequest = {
  priority: string;
  title: string;
  rationale: string;
  pills: string[];
  risk: string;
  repository: string;
  reference: string;
  author: string;
  statusLabel: string;
  statusTone: string;
  reviewers: Reviewer[];
};

const PULL_REQUESTS: PullRequest[] = [
  {
    priority: 'P0',
    title: 'fix(terraform): scope QA runtime storage access',
    rationale:
      'Prioritize the QA IAM change because its security review identifies high-severity residual storage authority.',
    pills: ['Security', 'Deep review', 'High effort'],
    risk: 'Critical security risk',
    repository: 'rex',
    reference: '#26935',
    author: '@ezrapike',
    statusLabel: 'Changes requested',
    statusTone: 'text-cui-danger',
    reviewers: [
      { id: 'c1', name: 'Casey Reed', match: 84, avatar: crAvatar('triage-casey-reed.jpg', 96) },
      { id: 'm1', name: 'Mateo Alvarez', match: 96, avatar: crAvatar('triage-aarav-mehta.jpg', 96) },
      { id: 'a1', name: 'Amara Okafor', match: 72, avatar: crAvatar('triage-amara-okafor.jpg', 96) },
    ],
  },
  {
    priority: 'P3',
    title: 'docs(api): clarify webhook retry behavior',
    rationale: 'Review this documentation update for accuracy; it changes no runtime behavior.',
    pills: ['Documentation', 'Quick review', 'Low effort'],
    risk: 'Low risk',
    repository: 'hotot',
    reference: '#27018',
    author: '@sofia-alvarez',
    statusLabel: 'Ready to merge',
    statusTone: 'text-cui-success',
    reviewers: [
      { id: 'n1', name: 'Nadia Petrova', match: 81, avatar: crAvatar('triage-amara-okafor.jpg', 48) },
      { id: 'a2', name: 'Aarav Mehta', match: 93, avatar: crAvatar('triage-aarav-mehta.jpg', 48) },
      { id: 'k1', name: 'Kwame Mensah', match: 67, avatar: crAvatar('triage-casey-reed.jpg', 48) },
    ],
  },
  {
    priority: 'P2',
    title: 'fix(search): preserve filters after queue refresh',
    rationale:
      'Review this queue-state fix; it restores expected navigation without touching sensitive paths.',
    pills: ['Bugfix', 'Standard review', 'Medium effort'],
    risk: 'Low risk',
    repository: 'lop',
    reference: '#27041',
    author: '@caseyreed',
    statusLabel: 'In progress',
    statusTone: 'text-cui-accent',
    reviewers: [
      { id: 'a3', name: 'Amara Okafor', match: 78, avatar: crAvatar('triage-amara-okafor.jpg', 96) },
      { id: 'c2', name: 'Casey Reed', match: 91, avatar: crAvatar('triage-casey-reed.jpg', 96) },
      { id: 'n2', name: 'Nadia Petrova', match: 64, avatar: crAvatar('triage-amara-okafor.jpg', 48) },
    ],
  },
];

const DotsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    data-slot="icon"
    className="absolute right-2.5 top-2.5 size-4 text-cui-tertiary"
  >
    <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
  </svg>
);

const RiskIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className="size-3.5 shrink-0"
  >
    <path
      fillRule="evenodd"
      d="M7.5 1.709a.75.75 0 0 1 1 0 8.963 8.963 0 0 0 4.84 2.217.75.75 0 0 1 .654.72 10.499 10.499 0 0 1-5.647 9.672.75.75 0 0 1-.694-.001 10.499 10.499 0 0 1-5.647-9.672.75.75 0 0 1 .654-.719A8.963 8.963 0 0 0 7.5 1.71ZM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 shrink-0" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
      clipRule="evenodd"
    />
  </svg>
);

const TriageReviewerMatchAnimation = () => {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('origin');
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const effectivePhase: Phase = reducedMotion ? 'reviewer-active' : phase;
  const panelOpen =
    effectivePhase === 'visible' ||
    effectivePhase === 'reviewer-active' ||
    effectivePhase === 'requesting' ||
    effectivePhase === 'confirmed';
  const panelState = panelOpen ? 'open' : effectivePhase === 'closing' ? 'closing' : 'closed';
  const highlightRing =
    effectivePhase === 'trigger-active' ||
    effectivePhase === 'visible' ||
    effectivePhase === 'reviewer-active' ||
    effectivePhase === 'requesting' ||
    effectivePhase === 'confirmed';
  const reviewerRowsActive =
    effectivePhase === 'reviewer-active' ||
    effectivePhase === 'requesting' ||
    effectivePhase === 'confirmed' ||
    effectivePhase === 'closing';
  const confirmed = effectivePhase === 'confirmed' || effectivePhase === 'closing';
  const assigned = effectivePhase === 'assigned' || effectivePhase === 'handoff';
  const nextIndex = (index + 1) % PULL_REQUESTS.length;
  const pr = PULL_REQUESTS[index] ?? PULL_REQUESTS[0];
  const pickReviewer = pr.reviewers[1];

  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;

    const sync = () => {
      setReducedMotion(mq.matches);
      setRunning(inView && !document.hidden && !mq.matches);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.2);
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    mq.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      observer.disconnect();
      mq.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    const { duration, next } = PHASE[phase];
    const timer = window.setTimeout(() => {
      if (phase === 'handoff') setIndex(nextIndex);
      setPhase(next);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [running, phase, nextIndex]);

  const cardRole = (i: number) => {
    const isCurrent = i === index;
    const isIncoming = effectivePhase === 'handoff' && i === nextIndex;
    if (isCurrent) {
      return effectivePhase === 'handoff' ? W.cardOutgoing : W.cardCurrent;
    }
    if (isIncoming) return W.cardIncoming;
    return W.cardQueued;
  };

  return (
    <div
      ref={surfaceRef}
      aria-hidden="true"
      className={`${W.surface} ${W.illustrationSurface} absolute inset-0 flex items-center justify-center px-4 py-10 lg:px-8`}
    >
      <div className="relative z-10 grid w-full max-w-[42rem] overflow-hidden rounded-lg border border-cui-neutral bg-cui-base-2 shadow-md">
        {PULL_REQUESTS.map((item, i) => {
          const isCurrent = i === index;
          return (
            <article
              key={item.reference}
              aria-hidden={!isCurrent}
              data-priority={item.priority}
              className={`${W.card} relative flex min-w-0 flex-col p-3 ${cardRole(i)} ${
                isCurrent && effectivePhase !== 'handoff' ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              <DotsIcon />
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex min-w-0 flex-col gap-2 pr-7">
                  <div className="flex min-h-6 items-start">
                    <span
                      data-priority={item.priority}
                      className={`${W.priorityPill} inline-flex h-6 items-center gap-1 rounded-full border border-current px-2 py-1 text-label-sm font-normal ${
                        item.priority === 'P0' ? W.p0 : ''
                      }`}
                    >
                      <span className={`${W.priorityDot} size-1.5 shrink-0 rounded-full`} aria-hidden="true" />
                      {item.priority}
                    </span>
                  </div>
                  <h4 className="truncate text-body-md font-semibold text-cui-primary">{item.title}</h4>
                  <p className={`${W.rationale} truncate border-l pl-2 text-body-sm leading-4`}>{item.rationale}</p>
                  <div className="flex min-w-0 flex-wrap items-center gap-1 pt-0.5">
                    {item.pills.slice(0, 1).map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex min-w-0 items-center truncate rounded-full border border-cui-neutral-strong px-2 py-1 text-label-sm font-normal text-cui-secondary"
                      >
                        {pill}
                      </span>
                    ))}
                    <span className="inline-flex min-w-0 items-center gap-1 truncate rounded-full border border-cui-neutral-strong px-2 py-1 text-label-sm font-normal text-cui-secondary">
                      <RiskIcon />
                      {item.risk}
                    </span>
                    {item.pills.slice(1).map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex min-w-0 items-center truncate rounded-full border border-cui-neutral-strong px-2 py-1 text-label-sm font-normal text-cui-secondary"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto grid min-w-0 grid-cols-[minmax(0,1fr)_2.5rem] items-end gap-2 text-label-sm text-cui-tertiary">
                  <div className={W.footerRow}>
                    <span className={W.primaryMetadata}>
                      <span className={`${W.footerGroup} ${W.repository}`}>
                        <span className={`${W.repositoryIcon} size-3 shrink-0`} aria-hidden="true" />
                        <span className="truncate">{item.repository}</span>
                        <span className="shrink-0 tabular-nums">{item.reference}</span>
                      </span>
                      <span className={`${W.footerGroup} ${W.author}`}>
                        <span className={W.separator} aria-hidden="true" />
                        <span className="truncate" title={item.author}>
                          {item.author}
                        </span>
                      </span>
                    </span>
                    <span className={W.footerGroup}>
                      <span className={W.separator} aria-hidden="true" />
                      <span className={item.statusTone}>{item.statusLabel}</span>
                    </span>
                  </div>
                  <span
                    data-reviewer-assigned-state="true"
                    className={`flex justify-end -space-x-2 ${isCurrent && assigned ? W.reviewerAssignedPop : ''}`}
                  >
                    {[item.reviewers[0], ...(isCurrent && assigned ? [pickReviewer] : [])].map((reviewer) => (
                      <img
                        key={reviewer.id}
                        src={reviewer.avatar}
                        alt=""
                        width={24}
                        height={24}
                        className={`size-6 shrink-0 rounded-full object-cover ring-1 ${
                          isCurrent && highlightRing ? 'ring-cui-accent' : 'ring-cui-neutral'
                        }`}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className={W.panelPosition}>
        <section
          aria-hidden={!panelOpen}
          data-state={panelState}
          className={`${W.reviewerPanel} rounded-lg border border-cui-neutral bg-cui-base-1 p-4 shadow-2xl`}
        >
          <div className="flex items-center gap-2">
            <h5 className="text-body-lg font-semibold text-cui-primary">Reviewers</h5>
          </div>
          <p className="mt-4 text-body-md text-cui-secondary">Reviewers</p>
          <div className="mt-3 flex flex-col gap-1">
            {pr.reviewers.map((reviewer, rowIndex) => (
              <div
                key={reviewer.id}
                data-selected={reviewerRowsActive && rowIndex === 1}
                className={`${W.reviewerRow} flex min-w-0 items-center gap-3 rounded-md px-2 py-1.5 hover:bg-cui-neutral-subtle ${
                  reviewerRowsActive && rowIndex === 1 ? 'bg-cui-neutral-subtle' : ''
                }`}
              >
                <img
                  src={reviewer.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className={`size-9 shrink-0 rounded-full object-cover ring-2 ${
                    rowIndex < 2 ? 'ring-cui-warn' : 'ring-cui-neutral-strong'
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-md font-medium text-cui-primary">{reviewer.name}</p>
                  <p className="text-body-sm tabular-nums text-cui-secondary">{reviewer.match}% match</p>
                </div>
                {rowIndex === 1 ? (
                  <span className="relative grid h-7 w-[6rem] shrink-0 place-items-center">
                    <span
                      data-confirmed={confirmed}
                      data-pressing={effectivePhase === 'requesting'}
                      className={`${W.requestButton} grid h-7 w-full place-items-center rounded-sm border border-white bg-white px-2 text-label-sm font-medium text-neutral-950 shadow-sm`}
                    >
                      <span className={W.requestLabel}>Request</span>
                      <span className={`${W.confirmationLabel} inline-flex items-center gap-1`}>
                        <CheckIcon />
                        Requested
                      </span>
                    </span>
                  </span>
                ) : rowIndex > 1 ? (
                  <span className="text-label-sm text-cui-secondary">Follow</span>
                ) : (
                  <span className="text-label-sm text-cui-secondary">Assigned</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TriageReviewerMatchAnimation;
