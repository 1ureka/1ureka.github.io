import { Box, FormControlLabel, FormHelperText, Paper, Stack, Switch, Typography } from "@mui/material";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/sidebar/Sidebar";

import { Header } from "../components/home/Header";
import { SmallTiles } from "../components/home/SmallTiles";
import { BarChart } from "../components/home/charts/BarChart";

import { lgSpace, mdSpace, smSpace } from "../components/home/commonSx";
import { FlatDonutBar } from "../components/home/charts/FlatDonutBar";

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

      {/* Chart 3 */}
      <Box sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }} />

      {/* Chart 4 */}
      <Stack sx={{ aspectRatio: { xs: "2/1", ml: "2/1.2" }, borderTop: "1px solid", borderColor: "divider" }}>
        <Box
          sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
        >
          <Typography variant="h5" component="h3">
            使用的欄位名稱
          </Typography>

          <Stack sx={{ alignItems: "flex-end" }}>
            <FormControlLabel
              control={<Switch />}
              labelPlacement="start"
              label={
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  包含系統欄位
                </Typography>
              }
            />
            <FormHelperText>(id, createdAt, updatedAt, ...)</FormHelperText>
          </Stack>
        </Box>

        <Box sx={{ flex: 1 }} />
      </Stack>
    </Box>
  );
};

function App() {
  const { isSm } = useResponsiveFontSize();

  if (!isSm)
    return (
      <AppWrapper>
        <AppNotSupported />
      </AppWrapper>
    );

  return (
    <AppWrapper>
      <Appbar />

      <Box component="main" sx={{ position: "relative", display: "flex", height: `calc(100dvh - ${APPBAR_HEIGHT}px)` }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.2, pointerEvents: "none" }} />

        <Sidebar />

        <Box sx={{ position: "relative", flex: 1, height: 1, overflow: "auto" }}>
          <Stack sx={{ minHeight: 1, gap: 3, px: 6, pb: 3 }}>
            <Header />

            <Paper sx={{ borderRadius: 4, boxShadow: "none", flex: 1, p: mdSpace }}>
              <SmallTiles />
              <LargeTiles />
            </Paper>
          </Stack>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
