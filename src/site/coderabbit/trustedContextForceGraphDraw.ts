import graphData from './trustedContextGraphData.json';
import { buildCenterGraph } from './trustedContextCenterGraph';
import type { GraphLink, GraphNode } from './trustedContextGraphTypes';

export type TrustedContextStage =
  | 'codegraph'
  | 'adaptive-systems'
  | 'business-context'
  | 'review-generation'
  | 'ensemble-of-models';

const CENTER_ID = 'apps/api/src/stream/client.ts';
const SPOKE_TARGETS = [
  'apps/api/src/stream/session.ts',
  'packages/transport',
  'services/gateway',
  'apps/api/src/state/run-store.ts',
  'packages/protocol',
  'apps/api/src/lib/abort.ts',
  'packages/telemetry',
];

const LEFT_LABELS = [
  'Codebase Systems',
  'Configurations',
  'History',
  'Learnings',
  'Knowledge Base',
];
const RIGHT_LABELS = [
  'Business',
  'Tracked Issues',
  'PRDs, Docs, etc.',
  'Concerns / Security',
  'Priorities',
];

const STAGE_LAYOUT: Record<
  TrustedContextStage,
  { scale: number; x: number; leftOpacity: number; rightOpacity: number }
> = {
  codegraph: { scale: 1, x: 0, leftOpacity: 1, rightOpacity: 1 },
  'adaptive-systems': { scale: 0.58, x: 0, leftOpacity: 1, rightOpacity: 0 },
  'business-context': { scale: 0.58, x: 0, leftOpacity: 0, rightOpacity: 1 },
  'review-generation': { scale: 0.76, x: 0, leftOpacity: 0, rightOpacity: 0 },
  'ensemble-of-models': { scale: 0.76, x: -464, leftOpacity: 0, rightOpacity: 0 },
};

const TONE_COLORS = {
  green: '#2f9b70',
  purple: '#6670cf',
  grey: '#6a6a6a',
} as const;

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.72 ? lerp(0, 1.12, t / 0.72) : lerp(1.12, 1, (t - 0.72) / 0.28));

const nodeMap = new Map<string, GraphNode>(
  (graphData.nodes as GraphNode[]).map((node) => [node.id, node]),
);

const reviewLinkRows = (graphData.links as GraphLink[]).filter(
  (link) => nodeMap.has(link.source) && nodeMap.has(link.target),
);

const centerGraph = buildCenterGraph(nodeMap, reviewLinkRows);

export const TRUSTED_CONTEXT_GRAPH_NODE_COUNT = centerGraph.nodeCount;
export const TRUSTED_CONTEXT_GRAPH_LINK_COUNT = centerGraph.linkCount;

const drawableNodes = [...centerGraph.drawableNodeIds]
  .map((id) => centerGraph.layoutNodes.get(id))
  .filter((node): node is GraphNode => Boolean(node));

const expandCluster = (startId: string, blocked: Set<string>, limit: number) => {
  const cluster = new Set<string>();
  const queue = [startId];
  while (queue.length && cluster.size < limit) {
    const id = queue.shift();
    if (!id || blocked.has(id) || cluster.has(id)) continue;
    cluster.add(id);
    const node = nodeMap.get(id);
    if (!node) continue;
    const neighbors = reviewLinkRows
      .flatMap((link) => {
        if (link.source === id) return [link.target];
        if (link.target === id) return [link.source];
        return [];
      })
      .filter((nid) => !blocked.has(nid) && !cluster.has(nid))
      .sort((a, b) => {
        const na = nodeMap.get(a);
        const nb = nodeMap.get(b);
        if (!na || !nb) return 0;
        return Math.hypot(node.x - na.x, node.y - na.y) - Math.hypot(node.x - nb.x, node.y - nb.y);
      });
    queue.push(...neighbors);
  }
  return cluster;
};

const sortedNodes = [...drawableNodes].sort((a, b) => a.x + 0.35 * a.y - (b.x + 0.35 * b.y));
const seedA = sortedNodes[0]?.id ?? CENTER_ID;
const clusterSize = Math.max(18, Math.round(drawableNodes.length * 0.18));
const greenCluster = expandCluster(seedA, new Set(), clusterSize);
const seedB =
  [...drawableNodes]
    .filter((node) => !greenCluster.has(node.id))
    .sort(
      (a, b) =>
        Math.hypot(b.x - (nodeMap.get(seedA)?.x ?? 0), b.y - (nodeMap.get(seedA)?.y ?? 0)) -
        Math.hypot(a.x - (nodeMap.get(seedA)?.x ?? 0), a.y - (nodeMap.get(seedA)?.y ?? 0)),
    )[0]?.id ?? seedA;
const purpleCluster = expandCluster(seedB, greenCluster, clusterSize);

const linkTone = (a: string, b: string) => {
  if (greenCluster.has(a) && greenCluster.has(b)) return 'green' as const;
  if (purpleCluster.has(a) && purpleCluster.has(b)) return 'purple' as const;
  return 'grey' as const;
};

const nodeTone = (id: string) => {
  if (greenCluster.has(id)) return 'green' as const;
  if (purpleCluster.has(id)) return 'purple' as const;
  return 'grey' as const;
};

const mixColor = (from: string, to: string, t: number) => {
  const parse = (hex: string) => ({
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  });
  const a = parse(from);
  const b = parse(to);
  const ch = (x: number, y: number) => Math.round(lerp(x, y, t));
  return `rgb(${ch(a.r, b.r)}, ${ch(a.g, b.g)}, ${ch(a.b, b.b)})`;
};

const drawSidePanels = (
  ctx: CanvasRenderingContext2D,
  labels: string[],
  x: number,
  y: number,
  width: number,
  rowHeight: number,
  gap: number,
  fill: string,
  opacity: number,
  xOffset: number,
) => {
  if (opacity <= 0.001) return;
  ctx.save();
  ctx.globalAlpha *= opacity;
  ctx.translate(xOffset, 0);
  ctx.font = '600 17px Geist, ui-sans-serif, sans-serif';
  ctx.textBaseline = 'middle';
  labels.forEach((label, index) => {
    const top = y + index * (rowHeight + gap);
    ctx.fillStyle = index === 0 ? fill : '#000000';
    ctx.beginPath();
    ctx.roundRect(x, top, width, rowHeight, 4);
    ctx.fill();
    if (index !== 0) {
      ctx.strokeStyle = fill;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
    ctx.fillStyle = index === 0 ? '#000000' : fill;
    ctx.fillText(label, x + (index === 0 ? 9 : 12), top + rowHeight / 2);
  });
  ctx.restore();
};

const drawOrangeArc = (ctx: CanvasRenderingContext2D, radius: number, lineWidth: number, alpha: number) => {
  if (alpha <= 0.001) return;
  ctx.save();
  ctx.globalAlpha *= alpha;
  const gradient = ctx.createLinearGradient(0, -radius, 0, radius);
  gradient.addColorStop(0, 'rgba(138, 37, 4, 0)');
  gradient.addColorStop(0.22, 'rgba(240, 64, 6, 0.72)');
  gradient.addColorStop(0.5, 'rgba(255, 95, 24, 1)');
  gradient.addColorStop(0.78, 'rgba(240, 64, 6, 0.72)');
  gradient.addColorStop(1, 'rgba(138, 37, 4, 0)');
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();
};

export type DrawTrustedContextOptions = {
  stage: TrustedContextStage;
  timestamp: number;
  revealStart: number;
  reduceMotion: boolean;
  backgroundColor?: string;
};

export const drawTrustedContextGraph = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: DrawTrustedContextOptions,
) => {
  const bg = options.backgroundColor ?? '#151318';
  const layout = STAGE_LAYOUT[options.stage];
  const revealDuration = options.stage === 'codegraph' ? 900 : 0;
  const revealElapsed =
    options.revealStart > 0 ? options.timestamp - options.revealStart : revealDuration;
  const revealProgress =
    options.stage !== 'codegraph' || options.reduceMotion
      ? 1
      : clamp(revealElapsed / revealDuration, 0, 1);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  const baseScale = Math.min(width / 928, height / 680);
  const spin = options.reduceMotion ? 0 : options.timestamp * 0.00003;

  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(baseScale, baseScale);
  ctx.translate(layout.x, 0);
  ctx.scale(layout.scale, layout.scale);

  drawSidePanels(ctx, LEFT_LABELS, -392, -85, 232, 30, 5, '#7382ff', layout.leftOpacity, 0);
  drawSidePanels(ctx, RIGHT_LABELS, 168, -85, 232, 30, 5, '#3dd68c', layout.rightOpacity, 0);

  const reviewFade =
    options.stage === 'review-generation' || options.stage === 'ensemble-of-models' ? 1 : 0;
  const ringMix = options.stage === 'business-context' || options.stage === 'review-generation' ? 1 : 0;
  const outerRadius = lerp(315, 374, ringMix);
  const graphHoleRadius = 315;
  const punchCenterHole =
    options.stage === 'business-context' ||
    options.stage === 'review-generation' ||
    options.stage === 'ensemble-of-models';

  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.setLineDash([13, 2.2]);
  ctx.lineDashOffset = options.reduceMotion ? 0 : -32 * spin;
  ctx.strokeStyle = '#3dd68c';
  ctx.lineWidth = 2 / Math.max(layout.scale, 0.001);
  ctx.beginPath();
  ctx.arc(0, 0, 353, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  drawOrangeArc(ctx, outerRadius, 12 / Math.max(layout.scale, 0.001), 0.2 + reviewFade * 0.75);
  drawOrangeArc(ctx, outerRadius + 1.8, 2 / Math.max(layout.scale, 0.001), 0.12 + reviewFade * 0.4);

  if (punchCenterHole) {
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.arc(0, 0, graphHoleRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  centerGraph.centerLinks.forEach((link, index) => {
    const fade =
      options.stage === 'codegraph'
        ? clamp((revealProgress * 900 - (320 + (index % 72) * 2.2)) / 160, 0, 1)
        : 1;
    if (fade <= 0) return;
    ctx.globalAlpha = fade * 0.48;
    ctx.strokeStyle = mixColor('#505050', '#292929', 0.35);
    ctx.lineWidth = 0.85;
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  centerGraph.reviewLinks.forEach((link, index) => {
    const tone = linkTone(link.source.id, link.target.id);
    const toneColor = TONE_COLORS[tone];
    const fade =
      options.stage === 'codegraph'
        ? clamp((revealProgress * 900 - (350 + (index % 88) * 2.5)) / 180, 0, 1)
        : 1;
    if (fade <= 0) return;
    ctx.globalAlpha = fade * (tone === 'grey' ? 0.54 : 0.86);
    ctx.strokeStyle = mixColor(toneColor, '#292929', 0.35);
    ctx.lineWidth = (Math.sqrt(link.value) + (tone !== 'grey' ? 0.25 : 0)) * 0.85;
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  drawableNodes.forEach((node, index) => {
    const tone = nodeTone(node.id);
    const base = node.group === 'Source Files' ? '#494949' : '#383838';
    const fill = mixColor(base, TONE_COLORS[tone], tone === 'grey' ? 0.35 : 0.55);
    let nodeReveal = 1;
    if (options.stage === 'codegraph') {
      nodeReveal = clamp((revealProgress * 900 - index * 3.5) / 130, 0, 1);
      nodeReveal = nodeReveal < 1 ? ease(nodeReveal) : 1;
    }
    if (nodeReveal <= 0) return;
    ctx.fillStyle = mixColor(fill, '#292929', 0.15);
    ctx.beginPath();
    ctx.arc(node.x, node.y, 6.25 * nodeReveal, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = mixColor(fill, '#292929', 0.35);
    ctx.lineWidth = 1.1;
    ctx.stroke();
  });

  const center = centerGraph.layoutNodes.get(CENTER_ID);
  if (center && options.stage === 'codegraph') {
    SPOKE_TARGETS.forEach((targetId, index) => {
      const target = centerGraph.layoutNodes.get(targetId);
      if (!target) return;
      const fade = clamp((revealProgress * 900 - (830 + index * 46)) / 310, 0, 1);
      if (fade <= 0) return;
      ctx.strokeStyle = '#f5f5f5';
      ctx.lineWidth = 1.45;
      ctx.globalAlpha = fade * 0.92;
      ctx.beginPath();
      ctx.moveTo(center.x, center.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(target.x, target.y, 8.25 * ease(fade), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f5f5f5';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    const hubFade = clamp((revealProgress * 900 - 740) / 280, 0, 1);
    if (hubFade > 0) {
      ctx.fillStyle = bg;
      ctx.beginPath();
      ctx.arc(center.x, center.y, 8 * ease(hubFade), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#f5f5f5';
      ctx.lineWidth = 2;
      ctx.stroke();

      const badgeFade = clamp((revealProgress * 900 - 1150) / 250, 0, 1);
      if (badgeFade > 0) {
        ctx.save();
        ctx.translate(center.x + 20, center.y - 11);
        ctx.globalAlpha = badgeFade;
        ctx.font = '600 17px Geist Mono, ui-monospace, monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('+8', 0, 15);
        ctx.fillStyle = '#1a181d';
        ctx.fillRect(30, 0, 88, 18);
        ctx.strokeStyle = '#3dd68c';
        ctx.lineWidth = 0.8;
        ctx.strokeRect(30, 0, 88, 18);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(30, 0, 3, 18);
        ctx.fillText('135-142', 43, 15);
        ctx.restore();
      }
    }
  }

  ctx.restore();
};
