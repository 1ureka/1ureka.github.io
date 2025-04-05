import { Box, Button, Stack, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { BarChart } from "./charts/BarChart";
import { FlatDonutBar } from "./charts/FlatDonutBar";
import { FlatBarChart } from "./charts/FlatBarChart";
import { ellipsisSx, lgSpace, noSpace, smSpace } from "./commonSx";
import { useUrl } from "@/datahub/hooks/url";

const FlowChart = () => {
  const { updateHash } = useUrl();
  const handleClick = () => {
    updateHash("schema");
  };

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
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                資料表關聯圖正在開發中，敬請期待！
              </Typography>
            </Box>

            <Box sx={{ position: "absolute", inset: "auto 0 0 auto", color: "secondary.dark", translate: "1rem 50%" }}>
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

const LargeTiles = () => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: lgSpace,
        display: "grid",
        gap: lgSpace,
        gridTemplateColumns: { xs: "1fr", ml: "repeat(2, 1fr)" },
        width: 1,
      }}
    >
      <BarChart />
      <FlatDonutBar />
      <FlowChart />
      <FlatBarChart />
    </Box>
  );
};

export { LargeTiles };
