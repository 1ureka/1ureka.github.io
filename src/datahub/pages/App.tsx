import { Box, Breadcrumbs, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useState } from "react";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/sidebar/Sidebar";

function App() {
  const { isSm } = useResponsiveFontSize();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  const handleClose = () => setAnchorEl(null);

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
            <Box
              sx={{
                position: "relative",
                p: 5,
                overflow: "hidden",
                borderRadius: 4,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    maskImage: "radial-gradient(circle at 50% 25%, #0003 0%, #000a 100%)",
                    bgcolor: "primary.main",
                    fill: "var(--mui-palette-background-paper)",
                    fillOpacity: 0.375,
                    width: 1,
                    minWidth: 1200,
                    height: 1,
                  }}
                >
                  <svg
                    style={{ scale: "1.01 -1" }}
                    width="100%"
                    height="200"
                    viewBox="0 0 1920 300"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z" />
                    <path d="M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z" />
                    <path d="M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z" />
                  </svg>
                </Box>
              </Box>

              <Box sx={{ position: "relative" }}>
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <DnsRoundedIcon fontSize="small" sx={{ color: "text.secondary" }} />
                  <Breadcrumbs>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      資料庫
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ "&:hover": { textDecoration: "underline" }, cursor: "pointer", color: "text.primary" }}
                      onClick={handleOpen}
                    >
                      論壇資料庫
                    </Typography>
                  </Breadcrumbs>

                  <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
                    <MenuItem onClick={handleClose} selected>
                      <Typography variant="body2" sx={{ color: "text.primary" }}>
                        論壇資料庫
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>

                <Typography variant="h4" component="h2" sx={{ pt: 1.5 }}>
                  概覽
                </Typography>
              </Box>
            </Box>

            <Paper sx={{ p: 5, borderRadius: 4, boxShadow: "none", flex: 1 }}>
              {/* <Box sx={{ height: 2000 }} /> */}
            </Paper>
          </Stack>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
