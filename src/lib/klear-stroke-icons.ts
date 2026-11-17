/**
 * KlearNow stroke icon standard (homepage tier lists).
 * Lucide-like 24×24 viewBox, 1.5px round caps, currentColor, no fill.
 */

export const KLEAR_ICON_SIZE_PX = 22;

export const KLEAR_STROKE_WIDTH = 1.5;

export const KLEAR_STROKE_ICON_ATTRS =
  'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';

/** Inline SVG for HTML patches (`?raw` fragments, mirror JSON). */
export function klearStrokeSvg(paths: string, extraAttrs = ''): string {
  const attrs = extraAttrs ? ` ${extraAttrs}` : '';
  return `<svg ${KLEAR_STROKE_ICON_ATTRS}${attrs}>${paths}</svg>`;
}

/** `icon-chip icon-chip--bare` wrapper used beside list and card copy. */
export function klearStrokeIconChip(paths: string, sizePx = KLEAR_ICON_SIZE_PX): string {
  return `<span class="icon-chip icon-chip--bare" style="--icon-chip-size:${sizePx}px" aria-hidden="true">${klearStrokeSvg(paths)}</span>`;
}

export * from './klear-icon-paths';
