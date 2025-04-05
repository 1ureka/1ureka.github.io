import { Box, Button } from "@mui/material";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

import { useEffect } from "react";
import { useFlowChart } from "@/datahub/hooks/read";
import { ReactFlowProvider } from "@xyflow/react";
import { ReactFlow } from "./ReactFlow";
import "@xyflow/react/dist/style.css";

const Flow = () => {
  const { nodes, edges, isFetching } = useFlowChart();

  useEffect(() => {
    if (nodes.length > 0) {
      const scrollArea = document.getElementById("scroll-area");
      if (scrollArea) scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: "smooth" });
    }
  }, [nodes]);

  return (
    <Box sx={{ position: "relative", flex: 1 }}>
      <Box sx={{ position: "absolute", inset: 0 }}>
        <ReactFlowProvider>
          <ReactFlow
            isFetching={isFetching}
            nodes={nodes.map((data) => ({ id: data.tableName, type: "tableNode", data, position: { x: 0, y: 0 } }))}
            edges={edges}
          />
        </ReactFlowProvider>
      </Box>

      <Box sx={{ position: "absolute", inset: "auto 0 0 auto", color: "text.secondary", pointerEvents: "none" }}>
        <Button
          color="inherit"
          variant="outlined"
          endIcon={<OpenInFullRoundedIcon />}
          sx={{ m: 2, pointerEvents: "auto" }}
          loading={isFetching}
        >
          全螢幕
        </Button>
      </Box>
    </Box>
  );
};

export default Flow;
