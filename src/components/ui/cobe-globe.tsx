import { useCallback, useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export interface GlobeMarker {
  id: string;
  location: [number, number];
  label: string;
}

export interface GlobeArc {
  id: string;
  from: [number, number];
  to: [number, number];
  label?: string;
}

export interface GlobeProps {
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  className?: string;
  markerColor?: [number, number, number];
  baseColor?: [number, number, number];
  arcColor?: [number, number, number];
  glowColor?: [number, number, number];
  dark?: number;
  mapBrightness?: number;
  markerSize?: number;
  markerElevation?: number;
  arcWidth?: number;
  arcHeight?: number;
  speed?: number;
  theta?: number;
  /** Starting longitude offset so the globe does not always begin at the same meridian */
  initialPhi?: number;
  diffuse?: number;
  mapSamples?: number;
  /** 0–1 canvas opacity passed to cobe */
  opacity?: number;
  interactive?: boolean;
}

/** Survives React remounts (phrase cycle, HMR) so spin never snaps to 0 */
let heroGlobePhi: number | undefined;

export function Globe({
  markers = [],
  arcs = [],
  className = '',
  markerColor = [0, 0.251, 0.361],
  baseColor = [1, 1, 1],
  arcColor = [0, 0.251, 0.361],
  glowColor = [0.945, 0.961, 0.976],
  dark = 0,
  mapBrightness = 6,
  markerSize = 0.025,
  markerElevation = 0.01,
  arcWidth = 0.4,
  arcHeight = 0.2,
  speed = 0.002,
  theta = 0.2,
  initialPhi = 1.35,
  diffuse = 1.2,
  mapSamples = 12000,
  opacity = 0.85,
  interactive = false,
}: GlobeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const velocity = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  if (heroGlobePhi === undefined) heroGlobePhi = initialPhi;
  const phiRef = useRef(heroGlobePhi);

  const propsRef = useRef({
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
    opacity,
  });
  propsRef.current = {
    markers,
    arcs,
    markerColor,
    baseColor,
    arcColor,
    glowColor,
    dark,
    mapBrightness,
    markerSize,
    markerElevation,
    arcWidth,
    arcHeight,
    speed,
    theta,
    diffuse,
    mapSamples,
    opacity,
  };

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!interactive) return;
      pointerInteracting.current = { x: e.clientX, y: e.clientY };
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
      isPausedRef.current = true;
    },
    [interactive],
  );

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (pointerInteracting.current === null) return;
    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;
    dragOffset.current = { phi: deltaX / 300, theta: deltaY / 1000 };
    const now = Date.now();
    if (lastPointer.current) {
      const dt = Math.max(now - lastPointer.current.t, 1);
      const maxVelocity = 0.15;
      velocity.current = {
        phi: Math.max(-maxVelocity, Math.min(maxVelocity, ((e.clientX - lastPointer.current.x) / dt) * 0.3)),
        theta: Math.max(-maxVelocity, Math.min(maxVelocity, ((e.clientY - lastPointer.current.y) / dt) * 0.08)),
      };
    }
    lastPointer.current = { x: e.clientX, y: e.clientY, t: now };
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
      lastPointer.current = null;
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = interactive ? 'grab' : 'default';
    isPausedRef.current = false;
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp, interactive]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId = 0;
    let lastSize = 0;
    let resizeObserver: ResizeObserver | undefined;

    const readSize = () => Math.round(wrapper.getBoundingClientRect().width);

    const buildGlobeConfig = (size: number) => {
      const p = propsRef.current;
      return {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: size,
        height: size,
        phi: phiRef.current,
        theta: p.theta,
        dark: p.dark,
        diffuse: p.diffuse,
        mapSamples: p.mapSamples,
        mapBrightness: p.mapBrightness,
        baseColor: p.baseColor,
        markerColor: p.markerColor,
        glowColor: p.glowColor,
        markerElevation: p.markerElevation,
        markers: p.markers.map((m) => ({
          location: m.location,
          size: p.markerSize,
          id: m.id,
        })),
        arcs: p.arcs.map((a) => ({
          from: a.from,
          to: a.to,
          id: a.id,
        })),
        arcColor: p.arcColor,
        arcWidth: p.arcWidth,
        arcHeight: p.arcHeight,
        opacity: p.opacity,
      };
    };

    const updateGlobe = () => {
      if (!globe) return;
      const p = propsRef.current;

      if (!isPausedRef.current) {
        phiRef.current += p.speed;
        heroGlobePhi = phiRef.current;

        if (Math.abs(velocity.current.phi) > 0.0001 || Math.abs(velocity.current.theta) > 0.0001) {
          phiOffsetRef.current += velocity.current.phi;
          thetaOffsetRef.current += velocity.current.theta;
          velocity.current.phi *= 0.95;
          velocity.current.theta *= 0.95;
        }
        const thetaMin = -0.4;
        const thetaMax = 0.4;
        if (thetaOffsetRef.current < thetaMin) {
          thetaOffsetRef.current += (thetaMin - thetaOffsetRef.current) * 0.1;
        } else if (thetaOffsetRef.current > thetaMax) {
          thetaOffsetRef.current += (thetaMax - thetaOffsetRef.current) * 0.1;
        }
      }

      globe.update({
        phi: phiRef.current + phiOffsetRef.current + dragOffset.current.phi,
        theta: p.theta + thetaOffsetRef.current + dragOffset.current.theta,
        markers: p.markers.map((m) => ({
          location: m.location,
          size: p.markerSize,
          id: m.id,
        })),
        arcs: p.arcs.map((a) => ({
          from: a.from,
          to: a.to,
          id: a.id,
        })),
      });
    };

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      updateGlobe();
    };

    const createGlobeInstance = (size: number) => {
      globe?.destroy();
      lastSize = size;
      globe = createGlobe(canvas, buildGlobeConfig(size));
    };

    const boot = () => {
      const size = readSize();
      if (size < 8) return false;
      createGlobeInstance(size);
      canvas.style.opacity = '1';
      return true;
    };

    if (boot()) {
      animationId = requestAnimationFrame(animate);
    }

    resizeObserver = new ResizeObserver(() => {
      const size = readSize();
      if (size < 8) return;
      if (!globe) {
        if (boot()) animationId = requestAnimationFrame(animate);
        return;
      }
      if (Math.abs(size - lastSize) < 4) return;
      createGlobeInstance(size);
    });
    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationId);
      globe?.destroy();
      globe = null;
    };
  }, []);

  return (
    <div ref={wrapperRef} className={`cr-cobe-globe ${className}`.trim()}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        className="cr-cobe-globe__canvas"
        aria-hidden="true"
      />
    </div>
  );
}
