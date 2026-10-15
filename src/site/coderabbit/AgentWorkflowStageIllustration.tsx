import { useEffect, useRef, useState } from 'react';

const AgentWorkflowStageIllustration = ({
  html,
  stage = 'collect',
}: {
  html: string;
  stage?: 'collect' | 'verify' | 'analyze';
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    let wasInView = false;

    const sync = () => {
      const next = inView && !reduced.matches && !document.hidden;
      if (next && !wasInView) {
        setCycleKey((k) => k + 1);
      }
      wasInView = next;
      setRunning(next);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.12);
        sync();
      },
      { threshold: [0, 0.12, 0.3] },
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

  return (
    <div
      ref={rootRef}
      className={`cr-agent-collect-illust stage cr-agent-stage-illust--${stage}${running ? ' is-running' : ''}`}
      aria-hidden
      data-stage={stage}
    >
      <div className="cr-agent-collect-illust__fit">
        <div key={cycleKey} className="cr-agent-collect-illust__stage-host">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  );
};

export default AgentWorkflowStageIllustration;
