import { useEffect, useRef, useState } from 'react';
import MotionIllustrationBackdrop from './MotionIllustrationBackdrop';

const CHANNELS = [
  { id: 'email', label: 'Email', hint: '2 docs' },
  { id: 'sftp', label: 'SFTP', hint: '4 files' },
  { id: 'api', label: 'API', hint: 'live' },
] as const;

const FILES_BY_CHANNEL: Record<(typeof CHANNELS)[number]['id'], readonly string[]> = {
  email: ['invoice.pdf', 'packing.pdf'],
  sftp: ['bol_20481.csv', 'ci_scan.tif', 'pl_edi.xml', 'ancillary.zip'],
  api: ['payload.json', 'webhook batch'],
};

const DOC_RIBBON = [
  { code: 'CI', name: 'Invoice' },
  { code: 'PL', name: 'Packing' },
  { code: 'BOL', name: 'BOL' },
] as const;

const ChannelIcon = ({ id }: { id: (typeof CHANNELS)[number]['id'] }) => {
  if (id === 'email') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden className="cr-kleardata-illust__icon">
        <path
          d="M2.5 5.5A1.5 1.5 0 0 1 4 4h12a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 16 16H4a1.5 1.5 0 0 1-1.5-1.5v-9Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="m3 6 7 5 7-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (id === 'sftp') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden className="cr-kleardata-illust__icon">
        <path
          d="M4 6.5h12v7H4v-7Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M7 9.5h6M7 11.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" aria-hidden className="cr-kleardata-illust__icon">
      <path
        d="M6 5.5h8v9H6v-9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M8 4h4v2H8V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
};

const KleardataIllustration = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeChannel, setActiveChannel] = useState(1);
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
      setActiveChannel((i) => (i + 1) % CHANNELS.length);
      setSyncTick((t) => t + 1);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [running]);

  const active = CHANNELS[activeChannel];
  const queueFiles = active ? FILES_BY_CHANNEL[active.id].slice(0, 3) : [];

  return (
    <div
      ref={rootRef}
      className="cr-kleardata-illust TriageIllustrationSurface-module__FDMM_q__surface absolute inset-0 overflow-hidden"
      data-active-channel={active?.id}
      aria-hidden
    >
      <MotionIllustrationBackdrop />

      <div className="cr-kleardata-illust__fit">
        <div className="cr-kleardata-illust__stage">
          <article
            className={`cr-kleardata-illust__panel cr-motion-illust__spotlight${running ? ' is-live' : ''}`}
          >
            <div className="cr-kleardata-illust__panel-split">
              <aside className="cr-kleardata-illust__inbound">
                <div className="cr-kleardata-illust__inbound-head">
                  <span className="cr-kleardata-illust__inbound-title">Inbound</span>
                  <span className="cr-kleardata-illust__inbound-hint">{active?.hint}</span>
                </div>

                <div className="cr-kleardata-illust__source-tabs" role="presentation">
                  {CHANNELS.map((channel, index) => {
                    const isActive = index === activeChannel;
                    return (
                      <div
                        key={channel.id}
                        className={`cr-kleardata-illust__source-tab${isActive ? ' is-active' : ''}`}
                      >
                        {isActive && running ? (
                          <div
                            key={activeChannel}
                            className="cr-kleardata-illust__tab-ingest"
                            aria-hidden
                          >
                            <span className="cr-kleardata-illust__tab-ingest-beam" />
                            <span className="cr-kleardata-illust__tab-ingest-packet" />
                            <span className="cr-kleardata-illust__tab-ingest-packet cr-kleardata-illust__tab-ingest-packet--delay" />
                          </div>
                        ) : null}
                        <span className="cr-kleardata-illust__source-tab-icon">
                          <ChannelIcon id={channel.id} />
                        </span>
                        <span className="cr-kleardata-illust__source-tab-label">{channel.label}</span>
                      </div>
                    );
                  })}
                </div>

                <ul key={syncTick} className="cr-kleardata-illust__file-queue">
                  {queueFiles.map((name, index) => (
                    <li
                      key={name}
                      className="cr-kleardata-illust__file-row"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <span className="cr-kleardata-illust__file-glyph" aria-hidden />
                      <span className="cr-kleardata-illust__file-name">{name}</span>
                      <span className="cr-kleardata-illust__file-status" aria-hidden />
                    </li>
                  ))}
                </ul>
              </aside>

              <div
                className={`cr-kleardata-illust__bridge${running ? ' is-flowing' : ''}`}
                aria-hidden
              >
                <span className="cr-kleardata-illust__bridge-line" />
                <span className="cr-kleardata-illust__bridge-packet" />
                <span className="cr-kleardata-illust__bridge-packet cr-kleardata-illust__bridge-packet--delay" />
              </div>

              <div key={syncTick} className="cr-kleardata-illust__structured">
                <div className="cr-kleardata-illust__shipment-top">
                  <div className="cr-kleardata-illust__shipment-id-wrap">
                    <span className="cr-kleardata-illust__shipment-kicker">Shipment</span>
                    <span className="cr-kleardata-illust__shipment-id">KN-20481</span>
                  </div>
                  <span className="cr-kleardata-illust__live">
                    <span className="cr-kleardata-illust__live-dot" aria-hidden />
                    Structured
                  </span>
                </div>

                <div className="cr-kleardata-illust__shipment-meta" aria-hidden>
                  <span className="cr-kleardata-illust__meta-chip">
                    <span className="cr-kleardata-illust__meta-icon">⇄</span>
                    CN → US
                  </span>
                  <span className="cr-kleardata-illust__meta-chip">
                    <span className="cr-kleardata-illust__meta-dot" />
                    847 fields
                  </span>
                </div>

                <div className="cr-kleardata-illust__doc-ribbon" aria-hidden>
                  {DOC_RIBBON.map((doc, index) => (
                    <span
                      key={doc.code}
                      className="cr-kleardata-illust__doc-chip"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <span className="cr-kleardata-illust__doc-code">{doc.code}</span>
                      <span className="cr-kleardata-illust__doc-name">{doc.name}</span>
                      <span className="cr-kleardata-illust__doc-check" aria-hidden>
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
                      </span>
                    </span>
                  ))}
                </div>

                <div className="cr-kleardata-illust__field-lattice" aria-hidden>
                  {Array.from({ length: 16 }, (_, i) => (
                    <span
                      key={i}
                      className={`cr-kleardata-illust__field-cell${i < 14 ? ' is-filled' : ''}`}
                      style={{ animationDelay: `${(i % 8) * 35}ms` }}
                    />
                  ))}
                </div>

                <div className="cr-kleardata-illust__meters" aria-hidden>
                  <div className="cr-kleardata-illust__meter">
                    <span className="cr-kleardata-illust__meter-name">Extract</span>
                    <div className="cr-kleardata-illust__meter-track">
                      <div className="cr-kleardata-illust__meter-fill" />
                    </div>
                    <span className="cr-kleardata-illust__meter-label">98%</span>
                  </div>
                  <div className="cr-kleardata-illust__meter cr-kleardata-illust__meter--sop">
                    <span className="cr-kleardata-illust__meter-name">SOP</span>
                    <div className="cr-kleardata-illust__meter-track">
                      <div className="cr-kleardata-illust__meter-fill cr-kleardata-illust__meter-fill--sop" />
                    </div>
                    <span className="cr-kleardata-illust__meter-label">OK</span>
                  </div>
                </div>

                <div className="cr-kleardata-illust__footer" aria-hidden>
                  <span className="cr-kleardata-illust__agent-chip">
                    <svg viewBox="0 0 16 16" className="cr-kleardata-illust__agent-icon">
                      <path
                        d="M8 1.5 9.2 5.5 13.5 5.5 10 7.8 11.2 12 8 9.6 4.8 12 6 7.8 2.5 5.5 6.8 5.5Z"
                        fill="currentColor"
                      />
                    </svg>
                    Agentic SOP
                  </span>
                  <span className="cr-kleardata-illust__footer-note">3 docs · validated</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default KleardataIllustration;
