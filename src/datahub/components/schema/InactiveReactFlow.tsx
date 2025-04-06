import { ReactFlow, Background, MarkerType, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import type { Node, Edge, NodeTypes, OnNodesChange, OnEdgesChange } from "@xyflow/react";
import { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress, useColorScheme } from "@mui/material";

import { TableNode } from "./TableNode";
import { getLayoutedElements } from "./layout";

const nodeTypes: NodeTypes = { tableNode: TableNode };

export function InactiveReactFlow({
  nodes: propNodes,
  edges: propEdges,
  isFetching,
}: {
  nodes: Node[];
  edges: Edge[];
  isFetching: boolean;
}) {
  const { mode } = useColorScheme();

  const [nodes, setNodes] = useState<Node[]>(propNodes);
  const [edges, setEdges] = useState<Edge[]>(propEdges);

  const [layouted, setLayouted] = useState(false);
  useEffect(() => {
    if (layouted) return;

    let rafId: number;
    let lastCheckTime = 0;
    const check = (time: number) => {
      if (time - lastCheckTime < 200) {
        rafId = requestAnimationFrame(check);
        return;
      }

      lastCheckTime = time;
      const allMeasured = nodes.every((n) => n.measured?.width && n.measured?.height);
      if (!allMeasured) {
        rafId = requestAnimationFrame(check);
        return;
      }

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, "horizontal");
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setLayouted(true);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [nodes, edges, layouted]);

  useEffect(() => {
    if (isFetching) return;
    setNodes(propNodes);
    setEdges(propEdges);
    setLayouted(false);
  }, [propNodes, propEdges, isFetching]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <>
      <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", bgcolor: "action.hover" }}>
        <CircularProgress />
      </Box>

      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        deleteKeyCode={null}
        colorMode={mode}
        defaultViewport={{
          x: 10,
          y: 10,
          zoom: 0.7,
        }}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          selectable: false,
          style: { strokeWidth: 2, stroke: "#b1b1b7" },
          markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 },
        }}
        style={{
          position: "relative",
          opacity: !layouted || isFetching ? 0 : 1,
          transition: !layouted || isFetching ? undefined : "opacity 0.5s ease",
          background: "var(--mui-palette-background-paper)",
        }}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        zoomOnScroll={false}
      >
        <Background bgColor="var(--mui-palette-action-hover)" />
      </ReactFlow>
    </>
  );
}
