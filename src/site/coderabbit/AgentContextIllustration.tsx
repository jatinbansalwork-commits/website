import { useEffect, useRef, useState, type CSSProperties } from 'react';

type AgentContextIllustrationProps = {
  /** Stagger motion when multiple panels are on screen */
  phaseOffset?: number;
};

const GCP_BASE = 38;
const AWS_BASE = 56;

const AgentContextIllustration = ({ phaseOffset = 0 }: AgentContextIllustrationProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [gcpCount, setGcpCount] = useState(GCP_BASE);
  const [awsCount, setAwsCount] = useState(AWS_BASE);
  const [pulseTop, setPulseTop] = useState(false);
  const [pulseBottom, setPulseBottom] = useState(false);

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
        inView = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.15);
        sync();
      },
      { threshold: [0, 0.15, 0.35] },
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

    let tick = 0;
    const interval = window.setInterval(() => {
      tick += 1;
      const wave = Math.sin(tick * 0.85 + phaseOffset);
      setGcpCount(GCP_BASE + Math.round(wave * 2));
      setAwsCount(AWS_BASE + Math.round(Math.cos(tick * 0.7 + phaseOffset) * 3));
      setPulseTop(tick % 2 === 0);
      setPulseBottom(tick % 2 === 1);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [running, phaseOffset]);

  return (
    <div
      ref={rootRef}
      className={`cr-agent-slack-illust${running ? ' cr-agent-slack-illust--running' : ''}`}
      style={{ '--illust-phase': phaseOffset } as CSSProperties}
      aria-hidden
    >
      <div className="cr-agent-slack-illust__dots" />
      <div className="cr-agent-slack-illust__axis">
        <span className="cr-agent-slack-illust__flow" />

        <div
          className={`cr-agent-slack-illust__node cr-agent-slack-illust__node--top${pulseTop ? ' is-pulse' : ''}`}
        >
          <span className="cr-agent-slack-illust__cloud" />
          <div className="cr-agent-slack-illust__feed">
            <span className="cr-agent-slack-illust__count">{gcpCount}</span>
            <span className="cr-agent-slack-illust__feed-label">GCP Updates</span>
          </div>
        </div>

        <div className="cr-agent-slack-illust__hub">
          <span className="cr-agent-slack-illust__hub-ring cr-agent-slack-illust__hub-ring--outer" />
          <span className="cr-agent-slack-illust__hub-ring cr-agent-slack-illust__hub-ring--inner" />
          <span className="cr-agent-slack-illust__hub-mark" />
        </div>

        <div
          className={`cr-agent-slack-illust__node cr-agent-slack-illust__node--bottom${pulseBottom ? ' is-pulse' : ''}`}
        >
          <span className="cr-agent-slack-illust__aws">aws</span>
          <div className="cr-agent-slack-illust__feed">
            <span className="cr-agent-slack-illust__count">{awsCount}</span>
            <span className="cr-agent-slack-illust__feed-label">AWS Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentContextIllustration;
