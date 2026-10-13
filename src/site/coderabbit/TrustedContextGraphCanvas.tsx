import { useEffect, useRef, useState } from 'react';
import {
  drawTrustedContextGraph,
  TRUSTED_CONTEXT_GRAPH_LINK_COUNT,
  TRUSTED_CONTEXT_GRAPH_NODE_COUNT,
  type TrustedContextStage,
} from './trustedContextForceGraphDraw';

type TrustedContextGraphCanvasProps = {
  stage: TrustedContextStage;
};

const TrustedContextGraphCanvas = ({ stage }: TrustedContextGraphCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(stage);
  const revealStartRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'paused' | 'running'>('paused');

  stageRef.current = stage;

  useEffect(() => {
    revealStartRef.current = stage === 'codegraph' ? 0 : performance.now();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.dispatchEvent(new CustomEvent('cr-trusted-graph-stage-change'));
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;

    const tick = (timestamp: number) => {
      frameRef.current = null;
      if (document.hidden) return;
      if (inView) {
        if (
          stageRef.current === 'codegraph' &&
          revealStartRef.current <= 0 &&
          !reduced.matches
        ) {
          revealStartRef.current = timestamp;
        }
        drawTrustedContextGraph(ctx, canvas.clientWidth, canvas.clientHeight, {
          stage: stageRef.current,
          timestamp,
          revealStart: revealStartRef.current,
          reduceMotion: reduced.matches,
          backgroundColor: '#151318',
        });
      }
      if (needsAnimation(timestamp)) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const needsAnimation = (timestamp: number) => {
      if (reduced.matches || !inView || document.hidden) return false;
      if (stageRef.current === 'codegraph') {
        const revealStart = revealStartRef.current;
        if (revealStart <= 0) return true;
        if (timestamp - revealStart < 900) return true;
      }
      return true;
    };

    const sync = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      const now = performance.now();
      tick(now);
      const running = needsAnimation(now);
      setAnimationState(running ? 'running' : 'paused');
      if (graphRef.current) {
        graphRef.current.dataset.trustedContextAnimationState = running ? 'running' : 'paused';
      }
      if (running) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sync();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = Boolean(
          entry?.isIntersecting && (entry.intersectionRatio ?? 0) >= 0.08,
        );
        if (next === inView) return;
        inView = next;
        sync();
      },
      { threshold: [0, 0.08, 0.35, 0.5] },
    );
    observer.observe(canvas);

    const onStageChange = () => sync();
    canvas.addEventListener('cr-trusted-graph-stage-change', onStageChange);

    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    requestAnimationFrame(() => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight) {
        if (!inView) {
          inView = true;
          sync();
        }
      }
    });

    return () => {
      ro.disconnect();
      observer.disconnect();
      canvas.removeEventListener('cr-trusted-graph-stage-change', onStageChange);
      reduced.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={graphRef}
      className={`trusted-force-graph trusted-force-graph--${stage} cr-shared-intelligence__force-graph absolute inset-0 overflow-hidden bg-transparent`}
      data-trusted-context-force-graph="true"
      data-trusted-context-force-graph-stage={stage}
      data-trusted-context-animation-state={animationState}
      data-trusted-context-node-count={TRUSTED_CONTEXT_GRAPH_NODE_COUNT}
      data-trusted-context-link-count={TRUSTED_CONTEXT_GRAPH_LINK_COUNT}
      data-trusted-context-transition-kind="none"
    >
      <canvas
        ref={canvasRef}
        className="cr-shared-intelligence__canvas absolute inset-0 block h-full w-full"
        aria-hidden
        data-trusted-context-force-graph-canvas="true"
      />
    </div>
  );
};

export default TrustedContextGraphCanvas;
