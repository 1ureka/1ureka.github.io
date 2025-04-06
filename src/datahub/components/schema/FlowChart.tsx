import { Box, Button } from "@mui/material";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

import { useFlowChart } from "@/datahub/hooks/read";
import { ReactFlowProvider } from "@xyflow/react";
import { ReactFlow } from "./ReactFlow";
import "@xyflow/react/dist/style.css";

const Flow = () => {
  const { nodes, edges, isFetching } = useFlowChart();

  //   useEffect(() => {
  //     if (nodes.length > 0) {
  //       const scrollArea = document.getElementById("scroll-area");
  //       if (scrollArea) scrollArea.scrollTo({ top: scrollArea.scrollHeight, behavior: "smooth" });
  //     }
  //   }, [nodes]);

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

      <Box
        sx={{
          position: "absolute",
          inset: "0 0 auto auto",
          color: "text.secondary",
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
          m: "15px",
        }}
      >
        <Button color="inherit" sx={{ py: 0.2 }} endIcon={<OpenInFullRoundedIcon />} loading={isFetching}>
          全螢幕
        </Button>
      </Box>
    </Box>
  );
};

export default Flow;
