import { Box, Button, FormControlLabel, FormHelperText, Paper, Stack, Switch, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/sidebar/Sidebar";

import { Header } from "../components/home/Header";
import { SmallTiles } from "../components/home/SmallTiles";
import { BarChart } from "../components/home/charts/BarChart";

import { ellipsisSx, lgSpace, mdSpace, noSpace, smSpace, underlineSx } from "../components/home/commonSx";
import { FlatDonutBar } from "../components/home/charts/FlatDonutBar";
import { Fragment } from "react";
import { TileTooltip } from "../components/home/TileTooltip";
import { StripedBackground } from "../components/home/charts/StripedBackground";

const LargeTiles = () => {
  const data = {
    name: 11,
    email: 9,
    phone: 8,
    address_location_name: 3,
    birthday: 2,
  };

  const dataArray = Object.entries(data).map(([key, value]) => ({ key, value }));

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

              <Box
                sx={{ position: "absolute", inset: "auto 0 0 auto", color: "secondary.dark", translate: "1rem 50%" }}
              >
                <Button
                  color="inherit"
                  size="large"
                  variant="outlined"
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

      {/* Chart 4 */}
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

        <Box sx={{ position: "relative", maxWidth: 1, flex: 1, overflowX: "auto", overflowY: "hidden" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: smSpace,
              placeItems: "center",
              "& > :nth-of-type(3n + 1)": { justifySelf: "flex-start" },
              p: smSpace,
              pt: noSpace,
              width: 1,
              height: 1,
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                最常使用
              </Typography>
            </Box>
            <Box />
            <Box>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                出現次數
              </Typography>
            </Box>

            {dataArray.map(({ key, value }, i) => (
              <Fragment key={key}>
                <Box>
                  <TileTooltip title={<Typography>{key}</Typography>}>
                    <Typography variant="body1" sx={{ ...ellipsisSx, ...underlineSx, maxWidth: "6rem" }}>
                      {key}
                    </Typography>
                  </TileTooltip>
                </Box>

                <TileTooltip
                  title={
                    <Box>
                      <Typography variant="subtitle2">{key}</Typography>
                      <Typography>所有欄位名稱中的 {`${((value / 11) * 36).toFixed(1)}%`}</Typography>
                    </Box>
                  }
                >
                  <Box
                    sx={{
                      width: 1,
                      height: "1rem",
                      borderRadius: 99,
                      position: "relative",
                      overflow: "clip",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": { bgcolor: "action.hover", "& .bar-content": { opacity: 1 } },
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={5} />

                    <Box
                      sx={{
                        position: "absolute",
                        width: `${(value / 11) * 36}%`,
                        height: 1,
                        borderRadius: 9,
                        overflow: "clip",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Box
                        className="bar-content"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          bgcolor: "primary.main",
                          opacity: i === 0 ? 0.9 : 0.65,
                          transition: "all 0.2s ease-in-out",
                        }}
                      />
                    </Box>
                  </Box>
                </TileTooltip>

                <Box>
                  <Typography variant="body1" sx={{ ...ellipsisSx, maxWidth: "10rem" }}>
                    {value}
                  </Typography>
                </Box>
              </Fragment>
            ))}
          </Box>
        </Box>
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
