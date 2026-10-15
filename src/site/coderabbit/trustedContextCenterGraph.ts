import type { GraphLink, GraphNode } from './trustedContextGraphTypes';

export const hashUnit = (seed: string): number => {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return ((h >>> 0) % 2001) / 1000 - 1;
};

const CENTER_ID = 'apps/api/src/stream/client.ts';

export type PositionedNode = GraphNode & { x: number; y: number };

export type CenterGraph = {
  drawableNodeIds: Set<string>;
  layoutNodes: Map<string, PositionedNode>;
  reviewLinks: Array<{ key: string; source: PositionedNode; target: PositionedNode; value: number }>;
  centerLinks: Array<{ key: string; source: PositionedNode; target: PositionedNode }>;
  nodeCount: number;
  linkCount: number;
};

const buildCenterPositions = (nodes: GraphNode[], center: GraphNode | undefined) => {
  const Q = new Map<string, { x: number; y: number }>();
  const placed: { x: number; y: number }[] = [];
  if (center) placed.push({ x: center.x, y: center.y });

  const candidates = nodes.filter((node) => {
    if (node.group !== 'Source Files') return false;
    return Math.hypot(node.x, node.y) < 210;
  });

  candidates.forEach((node) => {
    let best: { x: number; y: number } | null = null;
    let bestScore = 0;
    for (let attempt = 0; attempt < 160; attempt += 1) {
      const ox = hashUnit(`center-filler-x-${node.id}-${attempt}`);
      const oy = hashUnit(`center-filler-y-${node.id}-${attempt}`);
      if (ox * ox + oy * oy > 1) continue;
      const pos = { x: 168 * ox, y: 158 * oy };
      if (
        center &&
        ((pos.x - center.x) / 88) ** 2 + ((pos.y - center.y) / 78) ** 2 < 1
      ) {
        continue;
      }
      const minDist = Math.min(
        ...placed.map((p) => Math.hypot(pos.x - p.x, pos.y - p.y)),
        Number.POSITIVE_INFINITY,
      );
      if (minDist > bestScore) {
        best = pos;
        bestScore = minDist;
      }
    }
    if (best) {
      Q.set(node.id, best);
      placed.push(best);
    }
  });

  return Q;
};

const buildSupplementalNodes = (
  placed: { x: number; y: number }[],
  center: GraphNode | undefined,
): PositionedNode[] => {
  const anchors = [...placed];
  return Array.from({ length: 12 }, (_, index) => {
    let best = { x: 0, y: 0 };
    let bestScore = 0;
    for (let attempt = 0; attempt < 240; attempt += 1) {
      const ox = hashUnit(`center-supplemental-x-${index}-${attempt}`);
      const oy = hashUnit(`center-supplemental-y-${index}-${attempt}`);
      if (ox * ox + oy * oy > 1) continue;
      const pos = { x: 168 * ox, y: 158 * oy };
      if (
        center &&
        ((pos.x - center.x) / 58) ** 2 + ((pos.y - center.y) / 52) ** 2 < 1
      ) {
        continue;
      }
      const minDist = Math.min(...anchors.map((p) => Math.hypot(pos.x - p.x, pos.y - p.y)));
      if (minDist > bestScore) {
        best = pos;
        bestScore = minDist;
      }
    }
    anchors.push(best);
    return {
      group: 'Source Files',
      id: `context-gap-${index + 1}.ts`,
      x: best.x,
      y: best.y,
    };
  });
};

const buildCenterFillerLinks = (nodes: PositionedNode[], peripheral: PositionedNode[]) => {
  const links = new Map<string, { key: string; source: PositionedNode; target: PositionedNode }>();
  const degree = new Map<string, number>(nodes.map((node) => [node.id, 0]));

  const addLink = (a: PositionedNode, b: PositionedNode) => {
    if (a.id === b.id) return;
    const ids = [a.id, b.id].sort();
    const key = `center-filler-${ids.join('--')}`;
    if (links.has(key)) return;
    links.set(key, { key, source: a, target: b });
    degree.set(a.id, (degree.get(a.id) ?? 0) + 1);
    degree.set(b.id, (degree.get(b.id) ?? 0) + 1);
  };

  if (!nodes.length) return [...links.values()];

  const connected = new Set<string>([nodes[0].id]);
  const pending = new Map(
    nodes.slice(1).map((node) => [
      node.id,
      {
        distance: Math.hypot(nodes[0].x - node.x, nodes[0].y - node.y),
        source: nodes[0],
      },
    ]),
  );

  while (connected.size < nodes.length) {
    let next: PositionedNode | undefined;
    let edge:
      | {
          distance: number;
          source: PositionedNode;
        }
      | undefined;

    pending.forEach((value, id) => {
      if (connected.has(id)) return;
      if (!edge || value.distance < edge.distance) {
        next = nodes.find((node) => node.id === id);
        edge = value;
      }
    });

    if (!next || !edge) break;
    addLink(edge.source, next);
    connected.add(next.id);

    nodes.forEach((node) => {
      if (connected.has(node.id)) return;
      const distance = Math.hypot(next!.x - node.x, next!.y - node.y);
      const existing = pending.get(node.id);
      if (!existing || distance < existing.distance) {
        pending.set(node.id, { distance, source: next! });
      }
    });
  }

  nodes.forEach((node) => {
    while ((degree.get(node.id) ?? 0) < 2) {
      const partner = nodes
        .filter((candidate) => candidate.id !== node.id)
        .filter((candidate) => (degree.get(candidate.id) ?? 0) < 3)
        .filter((candidate) => {
          const ids = [node.id, candidate.id].sort();
          return !links.has(`center-filler-${ids.join('--')}`);
        })
        .sort(
          (a, b) =>
            Math.hypot(node.x - a.x, node.y - a.y) - Math.hypot(node.x - b.x, node.y - b.y),
        )[0];
      if (!partner) break;
      addLink(node, partner);
    }
  });

  const sorted = nodes
    .filter((node) => (degree.get(node.id) ?? 0) < 3)
    .sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));
  const spokes = sorted.slice(0, Math.min(6, sorted.length));
  spokes.forEach((node) => {
    const nearest = [...peripheral].sort(
      (a, b) => Math.hypot(node.x - a.x, node.y - a.y) - Math.hypot(node.x - b.x, node.y - b.y),
    )[0];
    if (nearest) addLink(node, nearest);
  });

  return [...links.values()];
};

export const buildCenterGraph = (
  nodeMap: Map<string, GraphNode>,
  reviewLinkRows: GraphLink[],
): CenterGraph => {
  const allNodes = [...nodeMap.values()];
  const center = nodeMap.get(CENTER_ID);
  const reviewIds = new Set(allNodes.map((node) => node.id));
  const centerPositions = buildCenterPositions(allNodes, center);

  const repositionedIds = new Set(centerPositions.keys());
  const supplemental = buildSupplementalNodes(
    [
      ...(center ? [{ x: center.x, y: center.y }] : []),
      ...[...centerPositions.values()],
    ],
    center,
  );

  const layoutNodes = new Map<string, PositionedNode>();
  allNodes.forEach((node) => {
    const override = centerPositions.get(node.id);
    layoutNodes.set(node.id, override ? { ...node, ...override } : node);
  });
  supplemental.forEach((node) => layoutNodes.set(node.id, node));

  const centerNodeIds = new Set([
    ...[...repositionedIds],
    ...supplemental.map((node) => node.id),
  ]);
  const drawableNodeIds = new Set([...reviewIds, ...centerNodeIds]);

  const layoutReviewNodes = [...reviewIds]
    .map((id) => layoutNodes.get(id))
    .filter((node): node is PositionedNode => Boolean(node));

  const centerNodes = [...centerNodeIds]
    .map((id) => layoutNodes.get(id))
    .filter((node): node is PositionedNode => Boolean(node));

  const reviewLinks = reviewLinkRows
    .filter((link) => reviewIds.has(link.source) && reviewIds.has(link.target))
    .flatMap((link, index) => {
      const source = layoutNodes.get(link.source);
      const target = layoutNodes.get(link.target);
      if (!source || !target) return [];
      return [
        {
          key: `${link.source}--${link.target}-${index}`,
          source,
          target,
          value: link.value,
        },
      ];
    });

  const centerLinks = buildCenterFillerLinks(centerNodes, layoutReviewNodes);

  return {
    drawableNodeIds,
    layoutNodes,
    reviewLinks,
    centerLinks,
    nodeCount: drawableNodeIds.size,
    linkCount: reviewLinks.length + centerLinks.length,
  };
};
