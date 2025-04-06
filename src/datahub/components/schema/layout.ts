import type { Node, Edge } from "@xyflow/react";
import Dagre from "@dagrejs/dagre";

const getDisconnectedNodes = (nodes: Node[], edges: Edge[]): Node[] => {
  const connectedIds = new Set<string>();
  edges.forEach((e) => {
    connectedIds.add(e.source);
    connectedIds.add(e.target);
  });
  return nodes.filter((n) => !connectedIds.has(n.id));
};

const layoutDisconnectedNodes = (
  disconnectedNodes: Node[],
  startX = 0,
  startY = 0,
  paddingX = 50,
  paddingY = 50
): Node[] => {
  if (disconnectedNodes.length === 0) return [];

  const maxWidth = Math.max(...disconnectedNodes.map((n) => n.measured?.width ?? 0));
  const maxHeight = Math.max(...disconnectedNodes.map((n) => n.measured?.height ?? 0));

  const cellWidth = maxWidth + paddingX;
  const cellHeight = maxHeight + paddingY;

  const cols = Math.ceil(Math.sqrt(disconnectedNodes.length));

  return disconnectedNodes.map((node, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const width = node.measured?.width ?? 0;
    const height = node.measured?.height ?? 0;

    return {
      ...node,
      position: {
        x: startX + col * cellWidth + (maxWidth - width) / 2, // 居中放進格子
        y: startY + row * cellHeight + (maxHeight - height) / 2,
      },
    };
  });
};

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: "horizontal" | "vertical") => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: direction === "horizontal" ? "LR" : "TB",
    nodesep: 150,
    ranksep: 100,
    marginx: 20,
    marginy: 20,
    align: "UL",
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => {
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    });
  });

  Dagre.layout(g);

  const disconnectedNodes = getDisconnectedNodes(nodes, edges);
  const connectedNodes = nodes
    .filter((n) => !disconnectedNodes.includes(n))
    .map((node) => {
      const position = g.node(node.id);
      if (!node.measured || !position) return node;

      const x = position.x - (node.measured.width ?? 0) / 2;
      const y = position.y - (node.measured.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    });

  const maxX = Math.max(...connectedNodes.map((n) => (n.position?.x ?? 0) + (n.measured?.width ?? 0)));
  const maxY = Math.max(...connectedNodes.map((n) => (n.position?.y ?? 0) + (n.measured?.height ?? 0)));

  const startX = direction === "horizontal" ? maxX + 200 : 0;
  const startY = direction === "horizontal" ? 0 : maxY + 200;

  const layoutedDisconnected = layoutDisconnectedNodes(disconnectedNodes, startX, startY);

  return {
    nodes: [...connectedNodes, ...layoutedDisconnected],
    edges,
  };
};
