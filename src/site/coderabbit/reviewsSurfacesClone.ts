import {
  applyKlearReviewsSurfacesCaptions,
  applyKlearReviewsSurfacesHeader,
} from './klearTriageCardCopy';
import { applyKlearNowBranding } from './klearNowBranding';
import type { SurfaceVisualKind } from './SurfacesVisualCanvas';

const SURFACE_KINDS: SurfaceVisualKind[] = ['ide', 'cli', 'git'];

export type SurfaceCanvasMount = {
  kind: SurfaceVisualKind;
  node: HTMLElement;
};

export const prepareReviewsSurfacesCanvasMounts = (host: HTMLElement): SurfaceCanvasMount[] => {
  const items = host.querySelectorAll<HTMLElement>('.SurfacesVisual-module__y_ILJq__surfaceItem');
  const mounts: SurfaceCanvasMount[] = [];

  SURFACE_KINDS.forEach((kind, index) => {
    const item = items[index];
    if (!item) return;

    const existing = item.querySelector<HTMLElement>(
      `.cr-surfaces-visual-mount[data-surface-kind="${kind}"]`,
    );
    if (existing) {
      mounts.push({ kind, node: existing });
      return;
    }

    const canvas = item.querySelector('canvas');
    if (!canvas) return;

    const mount = document.createElement('div');
    mount.className = 'cr-surfaces-visual-mount';
    mount.dataset.surfaceKind = kind;
    canvas.replaceWith(mount);
    mounts.push({ kind, node: mount });
  });

  return mounts;
};

export const mountReviewsSurfacesClone = (host: HTMLElement) => {
  applyKlearReviewsSurfacesHeader(host);
  applyKlearReviewsSurfacesCaptions(host);
  applyKlearNowBranding(host);
};
