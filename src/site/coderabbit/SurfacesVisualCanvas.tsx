import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  DirectionalLight,
  EdgesGeometry,
  Euler,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
} from 'three';

export type SurfaceVisualKind = 'ide' | 'cli' | 'git';

const ACCENT_VAR: Record<SurfaceVisualKind, string> = {
  ide: '--color-cui-cr-orange-9',
  cli: '--color-cui-secondary-9',
  git: '--color-cui-tertiary-9',
};

/** Monochrome line art — no product tint on the 3D surface cards */
const applyMonochromeLinePalette = (palette: Record<string, string>) => {
  palette.base = '#ffffff';
  palette.raised = '#ffffff';
  palette.accent = '#1a181d';
  palette.stroke = '#65616a';
  palette.text = '#1a181d';
  palette.muted = '#8d8792';
  palette.success = '#1a181d';
  palette.danger = '#1a181d';
};

const readCssVar = (scope: Element, name: string) =>
  getComputedStyle(scope).getPropertyValue(name).trim();

const readThemeVar = (scope: Element, name: string, fallback: string) => {
  const fromScope = readCssVar(scope, name);
  if (fromScope) return fromScope;
  const fromRoot = readCssVar(document.documentElement, name);
  return fromRoot || fallback;
};

const cssColorToHex = (value: string) => {
  const probe = document.createElement('canvas');
  probe.width = 1;
  probe.height = 1;
  const ctx = probe.getContext('2d');
  if (!ctx) return 0;
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return (r << 16) | (g << 8) | b;
};

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const strokeLine = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  length: number,
  color: string,
  width = 8,
) => {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + length, y);
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineWidth = width;
  ctx.stroke();
};

const buildSurfaceTexture = (kind: SurfaceVisualKind, palette: Record<string, string>) => {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = palette.base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (kind === 'ide') {
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 96, 98, 352);
    [148, 220, 292].forEach((y) => {
      roundRect(ctx, 82, y, 30, 30, 5);
      ctx.strokeStyle = palette.stroke;
      ctx.stroke();
    });
    strokeLine(ctx, 190, 154, 360, palette.stroke);
    strokeLine(ctx, 190, 204, 235, palette.stroke);
    strokeLine(ctx, 190, 254, 320, palette.accent, 9);
    strokeLine(ctx, 190, 304, 280, palette.stroke);
    strokeLine(ctx, 190, 354, 170, palette.stroke);
    roundRect(ctx, 410, 356, 270, 88, 16);
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(454, 400, 13, 0, Math.PI * 2);
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    strokeLine(ctx, 486, 400, 142, palette.stroke, 6);
  } else if (kind === 'cli') {
    ctx.font = '700 30px Hack, monospace';
    ctx.fillStyle = palette.text;
    ctx.fillText('$ klear audit', 62, 142);
    strokeLine(ctx, 62, 186, 640, palette.stroke, 2);
    [234, 336].forEach((y) => {
      roundRect(ctx, 62, y, 640, 74, 12);
      ctx.strokeStyle = palette.stroke;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(102, y + 37, 11, 0, Math.PI * 2);
      ctx.strokeStyle = palette.accent;
      ctx.lineWidth = 2;
      ctx.stroke();
      strokeLine(ctx, 138, y + 37, 280, palette.stroke, 6);
    });
  } else {
    roundRect(ctx, 54, 104, 160, 48, 24);
    ctx.strokeStyle = palette.stroke;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    strokeLine(ctx, 82, 128, 96, palette.stroke, 6);
    roundRect(ctx, 560, 104, 146, 48, 24);
    ctx.stroke();
    strokeLine(ctx, 590, 128, 84, palette.stroke, 6);
    strokeLine(ctx, 54, 192, 500, palette.stroke, 6);
    strokeLine(ctx, 54, 230, 380, palette.muted, 5);
    roundRect(ctx, 54, 278, 652, 48, 8);
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    roundRect(ctx, 54, 342, 652, 48, 8);
    ctx.strokeStyle = palette.stroke;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(76, 430, 14, 0, Math.PI * 2);
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 2;
    ctx.stroke();
    strokeLine(ctx, 112, 430, 210, palette.stroke, 6);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
};

const disposeMaterial = (material: Material) => {
  if (
    (material instanceof MeshStandardMaterial || material instanceof MeshBasicMaterial) &&
    material.map
  ) {
    material.map.dispose();
  }
  material.dispose();
};

const damp = (current: number, target: number, smoothing: number) =>
  current + (target - current) * smoothing;

type SurfacesVisualCanvasProps = {
  kind: SurfaceVisualKind;
};

const SurfacesVisualCanvas = ({ kind }: SurfacesVisualCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const tokenScope =
      canvas.closest('.cr-reviews-surfaces-clone') ?? document.documentElement;

    const palette = {
      accent: readThemeVar(tokenScope, ACCENT_VAR[kind], '#ff570a'),
      base: readThemeVar(tokenScope, '--color-cui-mauve-1', '#121014'),
      raised: readThemeVar(tokenScope, '--color-cui-mauve-3', '#1a181d'),
      stroke: readThemeVar(tokenScope, '--color-cui-mauve-7', '#4a464f'),
      text: readThemeVar(tokenScope, '--color-cui-mauve-12', '#efedf0'),
      muted: readThemeVar(tokenScope, '--color-cui-mauve-10', '#b5b2b9'),
      success: readThemeVar(tokenScope, '--color-cui-success', '#19d59e'),
      danger: readThemeVar(tokenScope, '--color-cui-danger', '#e54666'),
    };

    applyMonochromeLinePalette(palette);

    const texture = buildSurfaceTexture(kind, palette);
    if (!texture) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: 'high-performance',
      });
    } catch {
      texture.dispose();
      return;
    }

    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearAlpha(0);

    const scene = new Scene();
    const camera = new PerspectiveCamera(31, 1, 0.1, 100);
    camera.position.set(0, 0.25, 8.4);
    camera.lookAt(0, 0, 0);

    scene.add(new AmbientLight(0xffffff, 1.35));
    const keyLight = new DirectionalLight(0xffffff, 0.55);
    keyLight.position.set(-3, 5, 7);
    scene.add(keyLight);

    const panel = new Group();
    const geometry = new BoxGeometry(3.4, 2.2, 0.12);
    const sideMaterial = new MeshBasicMaterial({ color: 0xffffff });
    const edgeMaterial = new MeshBasicMaterial({ color: 0xffffff });
    const faceMaterial = new MeshBasicMaterial({ map: texture });
    const mesh = new Mesh(geometry, [
      sideMaterial,
      sideMaterial,
      edgeMaterial,
      sideMaterial,
      faceMaterial,
      sideMaterial,
    ]);
    mesh.position.z = 0.04;
    panel.add(mesh);

    const outline = new LineSegments(
      new EdgesGeometry(geometry),
      new LineBasicMaterial({ color: 0x1a181d }),
    );
    outline.position.copy(mesh.position);
    panel.add(outline);

    const restRotation = new Euler(-0.47, -0.58, 0.08);
    panel.rotation.copy(restRotation);
    panel.position.y = -0.24;
    scene.add(panel);

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);

      panel.position.x = 0;
      panel.updateMatrixWorld(true);

      const positions = geometry.getAttribute('position');
      const projected = new Vector3();
      let minScreenX = Infinity;

      for (let i = 0; i < positions.count; i += 1) {
        projected.fromBufferAttribute(positions, i);
        mesh.localToWorld(projected);
        projected.project(camera);
        minScreenX = Math.min(minScreenX, ((projected.x + 1) / 2) * width);
      }

      const origin = new Vector3().applyMatrix4(panel.matrixWorld);
      const originScreen = ((origin.clone().project(camera).x + 1) / 2) * width;
      const unitScreen =
        ((origin.clone().add(new Vector3(1, 0, 0)).project(camera).x + 1) / 2) * width -
        originScreen;

      if (unitScreen > 0) {
        panel.position.x = -minScreenX / unitScreen;
      }

      renderer.render(scene, camera);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let pointerActive = false;
    let targetRotation = restRotation.clone();
    let frameId = 0;
    let visible = true;
    let startedAt = performance.now();

    const resetPointer = () => {
      pointerActive = false;
      targetRotation.copy(restRotation);
    };

    const raycaster = new Raycaster();
    const pointer = new Vector2();

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === 'touch') return;

      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const hit = raycaster.intersectObject(mesh)[0];
      if (!hit?.uv) {
        resetPointer();
        return;
      }

      const nx = hit.uv.x * 2 - 1;
      const ny = hit.uv.y * 2 - 1;
      pointerActive = true;
      targetRotation.set(
        restRotation.x + 0.15 * ny,
        restRotation.y - 0.24 * nx,
        restRotation.z + 0.03 * nx,
      );
    };

    const tick = (time: number) => {
      frameId = 0;
      if (reducedMotion || !visible) return;

      panel.position.y = -0.24 + 0.06 * Math.sin((time - startedAt) * 0.0007);
      if (!pointerActive) {
        targetRotation.z = restRotation.z + 0.012 * Math.sin((time - startedAt) * 0.000045);
      }

      panel.rotation.x = damp(panel.rotation.x, targetRotation.x, 0.09);
      panel.rotation.y = damp(panel.rotation.y, targetRotation.y, 0.09);
      panel.rotation.z = damp(panel.rotation.z, targetRotation.z, 0.09);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!reducedMotion && visible && frameId === 0) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        cancelAnimationFrame(frameId);
        frameId = 0;
        resetPointer();
        panel.position.y = -0.24;
        panel.rotation.copy(restRotation);
        renderer.render(scene, camera);
        return;
      }
      startLoop();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
      if (!visible) {
        cancelAnimationFrame(frameId);
        frameId = 0;
        return;
      }
      startLoop();
    });
    intersectionObserver.observe(canvas);

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', resetPointer);
    motionQuery.addEventListener('change', onMotionPreferenceChange);

    resize();
    startLoop();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener('change', onMotionPreferenceChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', resetPointer);

      scene.remove(panel);
      geometry.dispose();
      disposeMaterial(sideMaterial);
      disposeMaterial(edgeMaterial);
      disposeMaterial(faceMaterial);
      outline.geometry.dispose();
      (outline.material as Material).dispose();
      renderer.dispose();
    };
  }, [kind]);

  return <canvas ref={canvasRef} className="block size-full" aria-hidden="true" />;
};

export default SurfacesVisualCanvas;
