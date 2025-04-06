import { memo, useMemo, useState } from "react";
import { BoxM } from "@/components/Motion";
import { Box, Button } from "@mui/material";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import CloseFullscreenRoundedIcon from "@mui/icons-material/CloseFullscreenRounded";

import { useFlowChart } from "@/datahub/hooks/read";
import { ReactFlowProvider } from "@xyflow/react";
import { ReactFlow } from "./ReactFlow";
import "@xyflow/react/dist/style.css";

const MemoFlow = memo(ReactFlow);

const Flow = () => {
  const { nodes, edges, isFetching } = useFlowChart();
  const [fullScreen, setFullScreen] = useState(false);

  const nodesMemo = useMemo(
    () => nodes.map((data) => ({ id: data.tableName, type: "tableNode", data, position: { x: 0, y: 0 } })),
    [nodes]
  );

  return (
    <BoxM
      sx={{
        position: fullScreen ? "fixed" : "relative",
        flex: 1,
        inset: fullScreen ? 0 : undefined,
        zIndex: fullScreen ? "snackbar" : undefined,
      }}
      layout="position"
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "background.paper" }}>
        <ReactFlowProvider>
          <MemoFlow isFetching={isFetching} nodes={nodesMemo} edges={edges} />
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
        <Button
          color="inherit"
          sx={{ py: 0.2 }}
          endIcon={fullScreen ? <CloseFullscreenRoundedIcon /> : <OpenInFullRoundedIcon />}
          loading={isFetching}
          onClick={() => setFullScreen((prev) => !prev)}
        >
          {fullScreen ? "退出全螢幕" : "全螢幕"}
        </Button>
      </Box>
    </BoxM>
  );
};

export default Flow;
