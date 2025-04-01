import { Box, FormControlLabel, FormHelperText, Paper, Stack, Switch, Typography } from "@mui/material";
import TypeSpecimenRoundedIcon from "@mui/icons-material/TypeSpecimenRounded";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/sidebar/Sidebar";

import { Header } from "../components/home/Header";
import { TileContent, TileTitle } from "../components/home/TileText";
import { StripedBackground } from "../components/home/charts/StripedBackground";
import { TileTooltip } from "../components/home/TileTooltip";
import { SmallTiles } from "../components/home/SmallTiles";
import { BarChart } from "../components/home/charts/BarChart";

import { lgSpace, mdSpace, smSpace } from "../components/home/commonSx";
import { tileIconCommonSx, ellipsisSx } from "../components/home/commonSx";

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

      {/* Chart 2 */}
      <Stack
        sx={{
          aspectRatio: { xs: "2/1", ml: "2/1.2" },
          borderTop: "1px solid",
          borderColor: "divider",
          position: "relative",
        }}
      >
        <Box
          sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
        >
          <Stack sx={{ gap: 1 }}>
            <TileTitle>最常使用的型別</TileTitle>
            <TileContent variant="h4" sx={{ textTransform: "uppercase" }}>
              text
            </TileContent>
          </Stack>

          <TypeSpecimenRoundedIcon sx={{ ...tileIconCommonSx, mt: 0.5 }} />
        </Box>

        <Box sx={{ flex: 1, position: "relative" }}>
          <Box sx={{ position: "absolute", inset: "auto 0 0 0", p: 1.5, borderRadius: 9, overflow: "clip" }}>
            <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={4} />

            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "stretch", zIndex: 1 }}>
              <TileTooltip
                title={
                  <TileContent variant="body1" sx={{ textTransform: "uppercase" }}>
                    text 型別使用了 25 次
                  </TileContent>
                }
              >
                <Box
                  sx={{
                    width: 0.6,
                    "&:hover": { bgcolor: "divider" },
                    opacity: 0.9,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              </TileTooltip>
              <TileTooltip
                title={
                  <TileContent variant="body1" sx={{ textTransform: "uppercase" }}>
                    integer 型別使用了 15 次
                  </TileContent>
                }
              >
                <Box
                  sx={{
                    width: 0.3,
                    "&:hover": { bgcolor: "divider" },
                    opacity: 0.9,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              </TileTooltip>
              <TileTooltip
                title={
                  <TileContent variant="body1" sx={{ textTransform: "uppercase" }}>
                    real 型別使用了 5 次
                  </TileContent>
                }
              >
                <Box
                  sx={{
                    width: 0.1,
                    "&:hover": { bgcolor: "divider" },
                    opacity: 0.9,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              </TileTooltip>
            </Box>
          </Box>

          <Box sx={{ position: "absolute", inset: "auto 0 0 0", my: 1.5, display: "grid", placeItems: "center" }}>
            <Box sx={{ position: "absolute", width: 1, display: "flex", alignItems: "center" }}>
              <Box sx={{ width: 0.6, px: 0.5, pl: 1 }}>
                <Box sx={{ py: 0.5, borderRadius: 9, bgcolor: "primary.main", filter: "hue-rotate(-10deg)" }} />
              </Box>
              <Box sx={{ width: 0.3, px: 0.5 }}>
                <Box sx={{ py: 0.5, borderRadius: 9, bgcolor: "primary.main", filter: "hue-rotate(-40deg)" }} />
              </Box>
              <Box sx={{ width: 0.1, px: 0.5, pr: 1 }}>
                <Box sx={{ py: 0.5, borderRadius: 9, bgcolor: "primary.main", filter: "hue-rotate(-70deg)" }} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ position: "absolute", inset: 0, display: "flex" }}>
            <Box sx={{ width: 0.6, height: 1, position: "relative" }}>
              <Box sx={{ position: "absolute", inset: 0, ml: 1, mb: 3, borderLeft: 4, borderColor: "divider" }}>
                <Box sx={{ position: "absolute", inset: "0 auto auto 0" }}>
                  <Typography variant="body2" sx={{ textTransform: "uppercase", color: "text.secondary", ml: 1 }}>
                    text
                  </Typography>
                  <TileContent sx={{ textTransform: "uppercase", opacity: 0.8, ml: 1 }}>60%</TileContent>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: 0.3, height: 1, position: "relative" }}>
              <Box sx={{ position: "absolute", inset: 0, mb: 3, borderLeft: 4, borderColor: "divider" }}>
                <Box sx={{ position: "absolute", inset: "0 auto auto 0" }}>
                  <Typography variant="body2" sx={{ textTransform: "uppercase", color: "text.secondary", ml: 1 }}>
                    integer
                  </Typography>
                  <TileContent sx={{ textTransform: "uppercase", opacity: 0.8, ml: 1 }}>30%</TileContent>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: 0.1, height: 1, position: "relative" }}>
              <Box sx={{ position: "absolute", inset: 0, mb: 3, borderLeft: 4, borderColor: "divider" }}>
                <Box sx={{ position: "absolute", inset: "0 auto auto 0" }}>
                  <Typography variant="body2" sx={{ textTransform: "uppercase", color: "text.secondary", ml: 1 }}>
                    real
                  </Typography>
                  <TileContent sx={{ textTransform: "uppercase", opacity: 0.8, ml: 1 }}>10%</TileContent>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: mdSpace,
            p: smSpace,
            alignItems: "center",
            justifyContent: "space-around",
            width: "fit-content",
            minWidth: 0.5,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }} key={i}>
              <Box
                sx={{
                  borderRadius: 99,
                  width: "1rem",
                  height: "1rem",
                  bgcolor: "primary.main",
                  filter: `hue-rotate(-${i * 30 + 10}deg)`,
                }}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ color: "text.secondary", textTransform: "uppercase", ...ellipsisSx }}
              >
                {["text", "integer", "real"][i]}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

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
