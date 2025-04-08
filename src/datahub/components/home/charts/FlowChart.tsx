import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ellipsisSx, noSpace, smSpace } from "../commonSx";
import { InactiveReactFlow } from "../../schema/InactiveReactFlow";

import { memo, useMemo } from "react";
import { useUrl } from "@/datahub/hooks/url";
import { routes } from "@/routes";
import { useFlowChart } from "@/datahub/hooks/read";
import "@xyflow/react/dist/style.css";

const MemoFlow = memo(InactiveReactFlow);

const FlowChart = () => {
  const { updatePath } = useUrl();
  const handleClick = () => updatePath(routes.datahub_schema);

  const { nodes, edges, isFetching } = useFlowChart();
  const nodesMemo = useMemo(
    () => nodes.map((data) => ({ id: data.tableName, type: "tableNode", data, position: { x: 0, y: 0 } })),
    [nodes]
  );

  return (
    <Stack sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }}>
      <Box sx={{ display: "flex", gap: smSpace, alignItems: "flex-end", p: smSpace }}>
        <Typography variant="h5" component="h3" sx={{ textWrap: "noWrap" }}>
          資料表關聯圖
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.8, ...ellipsisSx }}>
          透過視覺化的節點與連線，探索資料表彼此的結構與關聯。
        </Typography>
      </Box>

      <Box sx={{ flex: 1, width: 1, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 0, p: smSpace, pt: noSpace }}>
          <Box
            sx={{
              position: "relative",
              width: 1,
              height: 1,
              borderRadius: 3,
              border: 3,
              borderColor: "divider",
              borderStyle: "dashed",
            }}
          >
            <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <Box sx={{ position: "absolute", inset: 0, zIndex: 1 }} />
              <MemoFlow nodes={nodesMemo} edges={edges} isFetching={isFetching} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                inset: "auto 0 0 auto",
                color: "secondary.dark",
                translate: "1rem 50%",
                zIndex: 2,
              }}
            >
              <Button
                color="inherit"
                size="large"
                variant="outlined"
                onClick={handleClick}
                endIcon={<ArrowOutwardRoundedIcon />}
                sx={{
                  "&:hover": { scale: "1.02" },
                  scale: "1.001",
                  transition: "all 0.2s ease-in-out",
                  bgcolor: "background.paper",
                }}
              >
                查看完整關聯圖
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export { FlowChart };
