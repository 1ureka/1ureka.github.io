import { Background, MarkerType, Panel, useReactFlow } from "@xyflow/react";
import { ReactFlow, addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
import type { Node, Edge, OnConnect, OnNodesChange, OnEdgesChange, NodeTypes } from "@xyflow/react";
import { useState, useCallback, useEffect } from "react";

import { Box, CircularProgress, Divider, ToggleButton } from "@mui/material";
import { Tooltip, Typography, useColorScheme } from "@mui/material";
import ResetTvRoundedIcon from "@mui/icons-material/ResetTvRounded";
import AlignHorizontalLeftRoundedIcon from "@mui/icons-material/AlignHorizontalLeftRounded";
import AlignVerticalTopRoundedIcon from "@mui/icons-material/AlignVerticalTopRounded";
import CenterFocusStrongRoundedIcon from "@mui/icons-material/CenterFocusStrongRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { TableNode } from "./TableNode";
import { getLayoutedElements } from "./layout";

type ActionsProps = {
  alignDirection: "horizontal" | "vertical";
  selectedNodes: Node[];
  onAlign: (direction: "horizontal" | "vertical") => void;
  onResetAlign: () => void;
  onResetView: () => void;
  onFocus: () => void;
};

const Actions = ({ alignDirection, selectedNodes, onAlign, onResetAlign, onResetView, onFocus }: ActionsProps) => {
  return (
    <Panel position="top-left">
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          borderRadius: 1,
          bgcolor: "background.paper",
          p: 1,
          px: 2,
          outline: 1,
          outlineColor: "divider",
          userSelect: "none",
        }}
      >
        <Box
          sx={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 1, boxShadow: 2, opacity: 0.35 }}
        />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="subtitle1" color="text.secondary">
            布局
          </Typography>

          <Tooltip title="水平排列" arrow>
            <ToggleButton
              size="small"
              value="horizontal"
              selected={alignDirection === "horizontal"}
              onClick={() => onAlign("horizontal")}
            >
              <AlignHorizontalLeftRoundedIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="垂直排列" arrow>
            <ToggleButton
              size="small"
              value="vertical"
              selected={alignDirection === "vertical"}
              onClick={() => onAlign("vertical")}
            >
              <AlignVerticalTopRoundedIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="重新排版" arrow>
            <ToggleButton size="small" value="none" onClick={onResetAlign}>
              <RestartAltRoundedIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography variant="subtitle1" color="text.secondary">
            視圖
          </Typography>

          <Tooltip title="重設視圖" arrow>
            <ToggleButton size="small" value="reset" onClick={onResetView}>
              <ResetTvRoundedIcon fontSize="small" />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="聚焦至選取元素" arrow>
            <span>
              <ToggleButton size="small" value="select" onClick={onFocus} disabled={selectedNodes.length === 0}>
                <CenterFocusStrongRoundedIcon fontSize="small" />
              </ToggleButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Panel>
  );
};

const nodeTypes: NodeTypes = { tableNode: TableNode };

function Flow({
  nodes: propNodes,
  edges: propEdges,
  isFetching,
}: {
  nodes: Node[];
  edges: Edge[];
  isFetching: boolean;
}) {
  const { mode } = useColorScheme();
  const { fitView } = useReactFlow();

  const [nodes, setNodes] = useState<Node[]>(propNodes);
  const [edges, setEdges] = useState<Edge[]>(propEdges);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [align, setAlign] = useState<"horizontal" | "vertical">("horizontal");

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

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, align);
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
      setLayouted(true);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [nodes, edges, layouted, align, fitView]);

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
  const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => setSelectedNodes(nodes), [setSelectedNodes]);

  const onAlign = useCallback((direction: "horizontal" | "vertical") => {
    setAlign(direction);
    setLayouted(false);
  }, []);

  const onResetAlign = useCallback(() => setLayouted(false), []);

  const onResetView = useCallback(() => fitView({ padding: 0.2, duration: 375 }), [fitView]);

  const onFocus = useCallback(
    () => fitView({ padding: 0.2, duration: 375, nodes: selectedNodes }),
    [fitView, selectedNodes]
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
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange}
        deleteKeyCode={null}
        colorMode={mode}
        minZoom={0.7}
        maxZoom={1.5}
        defaultViewport={{
          x: 100,
          y: 100,
          zoom: 0.9,
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
      >
        <Background bgColor="var(--mui-palette-action-hover)" />
        <Actions
          alignDirection={align}
          selectedNodes={selectedNodes}
          onAlign={onAlign}
          onResetAlign={onResetAlign}
          onResetView={onResetView}
          onFocus={onFocus}
        />
      </ReactFlow>
    </>
  );
}

export { Flow as ReactFlow };
