import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
  TypographyProps,
} from "@mui/material";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useState } from "react";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";
import { Appbar, APPBAR_HEIGHT } from "../components/appbar/Appbar";
import { Sidebar } from "../components/sidebar/Sidebar";

const TileTitle = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography variant="subtitle1" component="h3" sx={{ color: "text.secondary", textWrap: "nowrap", ...sx }} {...props}>
    {children}
  </Typography>
);

const TileContent = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography
    variant="h5"
    component="p"
    sx={{
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-all",
      ...sx,
    }}
    {...props}
  >
    {children}
  </Typography>
);

const largeSpacing = { xs: 4, md: 6, xl: 8 };
const mediumSpacing = { xs: 3, md: 4, xl: 5 };
const smallSpacing = { xs: 1, md: 2, xl: 3 };

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

              <Box
                sx={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
              >
                <Box>
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

                <Box sx={{ display: "flex", gap: 1.5, color: "text.primary" }}>
                  <Button
                    startIcon={<UploadRoundedIcon />}
                    variant="outlined"
                    color="inherit"
                    sx={{
                      scale: "1.001",
                      "&:hover": { scale: "1.05" },
                      "&:active": { scale: "0.95" },
                      transition: "all 0.2s ease",
                    }}
                  >
                    匯入
                  </Button>
                  <Button
                    startIcon={<DownloadRoundedIcon />}
                    variant="contained"
                    color="inherit"
                    disableElevation
                    sx={{
                      bgcolor: "background.paper",
                      scale: "1.001",
                      "&:hover": { scale: "1.05" },
                      "&:active": { scale: "0.95" },
                      transition: "all 0.2s ease",
                    }}
                  >
                    匯出
                  </Button>
                  <Tooltip
                    title={<Typography variant="body2">從伺服器複製一份副本取代目前資料</Typography>}
                    placement="bottom"
                    arrow
                  >
                    <Button
                      startIcon={<RestartAltRoundedIcon />}
                      variant="contained"
                      color="error"
                      disableElevation
                      sx={{
                        cursor: "help",
                        scale: "1.001",
                        "&:hover": { scale: "1.05" },
                        "&:active": { scale: "0.95" },
                        transition: "all 0.2s ease",
                        pr: 2.5,
                      }}
                    >
                      重置
                    </Button>
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            <Paper sx={{ borderRadius: 4, boxShadow: "none", flex: 1, p: mediumSpacing }}>
              <Box
                sx={{
                  position: "relative",
                  display: "grid",
                  gap: largeSpacing,
                  gridTemplateColumns: { xs: "repeat(6, 1fr)", lg: "repeat(3, 1fr)" },
                }}
              >
                <Box
                  sx={{
                    gridColumn: { xs: "span 4", lg: "auto" },
                    display: "flex",
                    alignItems: "center",
                    gap: mediumSpacing,
                  }}
                >
                  <BackupTableRoundedIcon
                    sx={{ color: "background.paper", bgcolor: "primary.main", borderRadius: 1, p: 1, fontSize: "3rem" }}
                  />

                  <Box sx={{ display: "flex", gap: smallSpacing }}>
                    <Stack sx={{ alignItems: "flex-start" }}>
                      <TileTitle>資料庫大小</TileTitle>
                      <TileContent sx={{ textWrap: "nowrap" }}>1,234 Bytes</TileContent>
                    </Stack>

                    <Divider flexItem orientation="vertical" />

                    <Stack sx={{ alignItems: "flex-start" }}>
                      <TileTitle>資料表總數</TileTitle>
                      <TileContent>8</TileContent>
                    </Stack>

                    <Divider flexItem orientation="vertical" />

                    <Stack sx={{ alignItems: "flex-start" }}>
                      <TileTitle>檢視表總數</TileTitle>
                      <TileContent>6</TileContent>
                    </Stack>
                  </Box>
                </Box>

                <Box
                  sx={{
                    gridColumn: { xs: "1 / span 4", lg: "auto" },
                    display: "flex",
                    alignItems: "center",
                    gap: mediumSpacing,
                  }}
                >
                  <SummarizeRoundedIcon
                    sx={{ color: "background.paper", bgcolor: "primary.main", borderRadius: 1, p: 1, fontSize: "3rem" }}
                  />

                  <Box sx={{ display: "flex", gap: smallSpacing }}>
                    <Stack sx={{ alignItems: "flex-start" }}>
                      <TileTitle>總紀錄數</TileTitle>
                      <TileContent sx={{ textWrap: "nowrap" }}>1,234</TileContent>
                    </Stack>

                    <Divider flexItem orientation="vertical" />

                    <Stack sx={{ alignItems: "flex-start" }}>
                      <TileTitle>最多紀錄的資料表</TileTitle>
                      <Tooltip title={<Typography>comments_interactions</Typography>} followCursor>
                        <TileContent sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
                          comments_interactions
                        </TileContent>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Box>

                <Box
                  sx={{
                    gridRow: { xs: "1", lg: "auto" },
                    gridColumn: { xs: "5 / span 2", lg: "auto" },
                    display: "flex",
                    alignItems: "center",
                    gap: mediumSpacing,
                  }}
                >
                  <HealthAndSafetyRoundedIcon
                    sx={{ color: "background.paper", bgcolor: "primary.main", borderRadius: 1, p: 1, fontSize: "3rem" }}
                  />

                  <Stack sx={{ alignItems: "flex-start" }}>
                    <TileTitle>潛在問題</TileTitle>
                    <TileContent
                      sx={{
                        textWrap: "nowrap",
                        color: "warning.main",
                        display: "inline-block",
                        "&:hover": { textDecoration: "underline" },
                        cursor: "pointer",
                      }}
                    >
                      2
                      <OpenInNewRoundedIcon fontSize="small" sx={{ verticalAlign: "middle", ml: 0.5 }} />
                    </TileContent>
                  </Stack>
                </Box>
              </Box>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default App;
