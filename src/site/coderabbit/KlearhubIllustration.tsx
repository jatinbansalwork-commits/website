import { useEffect, useRef, useState, type CSSProperties } from 'react';
import MotionIllustrationBackdrop from './MotionIllustrationBackdrop';

const PHASES = [
  { id: 'prefile', label: 'Pre-file', detail: 'check' },
  { id: 'clear', label: 'Clear', detail: '7501' },
  { id: 'audit', label: 'Audit', detail: 'PEA' },
] as const;

const MODULES = [
  { code: 'Customs', short: 'MOD' },
  { code: 'Post-entry', short: 'AUD' },
  { code: 'Track', short: 'TRK' },
  { code: 'Analytics', short: 'ANL' },
] as const;

const CHECKS = [
  'HTS aligned',
  '12 PGA checks',
  'Value & qty match',
  'PEA ready',
] as const;

const CHECKS_DONE_BY_PHASE = [2, 3, 4] as const;

const STATUS_BY_PHASE = ['Ready to file', 'Cleared', 'Audit OK'] as const;

const KlearhubIllustration = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [running, setRunning] = useState(false);
  const [syncTick, setSyncTick] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;

    const sync = () => {
      setRunning(inView && !reduced.matches && !document.hidden);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.2);
        sync();
      },
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(root);
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  useEffect(() => {
    if (!running) return;

    const timer = window.setInterval(() => {
      setActivePhase((i) => (i + 1) % PHASES.length);
      setSyncTick((t) => t + 1);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [running]);

  const phase = PHASES[activePhase];
  const checksDone = CHECKS_DONE_BY_PHASE[activePhase] ?? CHECKS.length;
  const statusLabel = STATUS_BY_PHASE[activePhase] ?? STATUS_BY_PHASE[0];
  const complyPct = activePhase === 0 ? 88 : activePhase === 1 ? 96 : 100;

  return (
    <div
      ref={rootRef}
      className="cr-klearhub-illust TriageIllustrationSurface-module__FDMM_q__surface absolute inset-0 overflow-hidden"
      data-active-phase={phase?.id}
      aria-hidden
    >
      <MotionIllustrationBackdrop />

      <div className="cr-klearhub-illust__fit">
        <div className="cr-klearhub-illust__stage">
          <article
            className={`cr-klearhub-illust__panel cr-motion-illust__spotlight${running ? ' is-live' : ''}`}
            style={{ '--phase-index': activePhase } as CSSProperties}
          >
            <header className="cr-klearhub-illust__panel-head">
              <div className="cr-klearhub-illust__entry-id-wrap">
                <span className="cr-klearhub-illust__entry-kicker">Entry</span>
                <span className="cr-klearhub-illust__entry-id">EN-44092</span>
              </div>
              <div className="cr-klearhub-illust__head-meta">
                <span className="cr-klearhub-illust__head-chip">Importer · synced</span>
                <span className="cr-klearhub-illust__live">
                  <span className="cr-klearhub-illust__live-dot" aria-hidden />
                  {statusLabel}
                </span>
              </div>
            </header>

            <div className="cr-klearhub-illust__panel-divider" aria-hidden />

            <nav className="cr-klearhub-illust__phase-track" aria-hidden>
              <span className="cr-klearhub-illust__phase-track-kicker">Filing lifecycle</span>
              <span className="cr-klearhub-illust__phase-track-rail" />
              <span className="cr-klearhub-illust__phase-track-fill" />
              <span className="cr-klearhub-illust__phase-track-shimmer" />
              {PHASES.map((item, index) => {
                const state =
                  index < activePhase ? 'done' : index === activePhase ? 'current' : 'upcoming';
                return (
                  <div
                    key={item.id}
                    className={`cr-klearhub-illust__phase-step is-${state}`}
                  >
                    <span className="cr-klearhub-illust__phase-step-mark">
                      {state === 'done' ? (
                        <svg viewBox="0 0 12 12" aria-hidden>
                          <path
                            d="M2.5 6.2 5 8.7 9.5 3.8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : state === 'current' ? (
                        <span className="cr-klearhub-illust__phase-step-pulse" aria-hidden />
                      ) : (
                        index + 1
                      )}
                    </span>
                    <span className="cr-klearhub-illust__phase-step-label">{item.label}</span>
                    <span className="cr-klearhub-illust__phase-step-detail">{item.detail}</span>
                  </div>
                );
              })}
            </nav>

            <div key={syncTick} className="cr-klearhub-illust__panel-body">
              <div className="cr-klearhub-illust__hub">
                <span className="cr-klearhub-illust__hub-spoke cr-klearhub-illust__hub-spoke--n" />
                <span className="cr-klearhub-illust__hub-spoke cr-klearhub-illust__hub-spoke--e" />
                <span className="cr-klearhub-illust__hub-spoke cr-klearhub-illust__hub-spoke--s" />
                <span className="cr-klearhub-illust__hub-spoke cr-klearhub-illust__hub-spoke--w" />
                <span className="cr-klearhub-illust__hub-core">
                  <span className="cr-klearhub-illust__hub-core-ring" aria-hidden />
                  Hub
                </span>
                <div className="cr-klearhub-illust__hub-modules">
                  {MODULES.map((mod, index) => (
                    <div
                      key={mod.short}
                      className={`cr-klearhub-illust__module${
                        running && index === activePhase % MODULES.length ? ' is-pulse' : ''
                      }`}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <span className="cr-klearhub-illust__module-short">{mod.short}</span>
                      <span className="cr-klearhub-illust__module-name">{mod.code}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cr-klearhub-illust__readiness">
                <div className="cr-klearhub-illust__readiness-head">
                  <span className="cr-klearhub-illust__readiness-title">Before you file</span>
                  <span className="cr-klearhub-illust__readiness-note">4 modules</span>
                </div>

                <ul className="cr-klearhub-illust__checklist">
                  {CHECKS.map((label, index) => {
                    const done = index < checksDone;
                    return (
                      <li
                        key={label}
                        className={`cr-klearhub-illust__check${done ? ' is-done' : ''}`}
                        style={{ animationDelay: `${index * 55}ms` }}
                      >
                        <span className="cr-klearhub-illust__check-box" aria-hidden>
                          {done ? (
                            <svg viewBox="0 0 12 12">
                              <path
                                d="M2.5 6.2 5 8.7 9.5 3.8"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : null}
                        </span>
                        <span className="cr-klearhub-illust__check-label">{label}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="cr-klearhub-illust__score" aria-hidden>
                  <svg viewBox="0 0 44 44" className="cr-klearhub-illust__score-ring">
                    <circle
                      className="cr-klearhub-illust__score-track"
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                    />
                    <circle
                      className="cr-klearhub-illust__score-fill"
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      style={
                        {
                          '--score-pct': complyPct / 100,
                        } as CSSProperties
                      }
                    />
                  </svg>
                  <div className="cr-klearhub-illust__score-text">
                    <span className="cr-klearhub-illust__score-value">{complyPct}%</span>
                    <span className="cr-klearhub-illust__score-caption">Comply</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default KlearhubIllustration;
