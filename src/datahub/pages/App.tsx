import {
  Badge,
  Box,
  BoxProps,
  Breadcrumbs,
  ButtonBase,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";

// import { routes } from "@/routes";
import { AppWrapper } from "@/datahub/components/AppWrapper";
import { useState } from "react";
import { ThemeMenuWithButton } from "../components/ThemeMenu";
import { useResponsiveFontSize } from "../utils/theme";
import { AppNotSupported } from "../components/AppError";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);

  const href = "#" + search;
  const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = ({ key }) => {
    if (key !== "Enter") return;
    if (!search.trim()) return console.error("請輸入搜尋內容");
    console.log("還沒寫完，請稍後再試");
    window.location.href = "#";
  };

  return (
    <TextField
      variant="outlined"
      label="搜尋"
      size="small"
      sx={{
        width: "20vw",
        maxWidth: "22rem",
        bgcolor: "background.paper",
        backgroundImage: "linear-gradient(#fff1, #fff1)",
        borderRadius: 1,
      }}
      value={search}
      onChange={handleChange}
      onKeyDown={handleKeydown}
      slotProps={{
        input: {
          sx: {
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
          },
          endAdornment: (
            <Tooltip title={search.trim() ? "搜尋" : "請輸入搜尋內容"} arrow>
              <InputAdornment position="end">
                <IconButton edge="end" href={href} disabled={!search.trim()}>
                  <SearchRoundedIcon />
                </IconButton>
              </InputAdornment>
            </Tooltip>
          ),
        },
      }}
    />
  );
};

const flexRowSx: BoxProps["sx"] = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

function App() {
  const { isMd, isSm } = useResponsiveFontSize();

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
      <Box
        component="header"
        sx={{
          position: "relative",
          gap: 3,
          justifyContent: "space-between",
          px: 3.5,
          bgcolor: "background.paper",
          height: 72,
          ...flexRowSx,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.1, pointerEvents: "none" }} />

        <Box sx={{ gap: 6, ...flexRowSx }}>
          <Box sx={{ gap: 1, ...flexRowSx }}>
            <DataExplorationRoundedIcon sx={{ fontSize: "3em", color: "primary.main" }} />
            {isMd && (
              <Typography variant="h4" component="h1" sx={{ fontFamily: `"timemachine-wa"`, color: "secondary.dark" }}>
                資料樣板
              </Typography>
            )}
          </Box>

          <Box sx={{ gap: 0.5, ...flexRowSx }}>
            <TextField
              select
              defaultValue="db"
              size="small"
              variant="outlined"
              sx={{ bgcolor: "background.paper", backgroundImage: "linear-gradient(#fff1, #fff1)", borderRadius: 1 }}
              slotProps={{
                input: {
                  sx: {
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "secondary.main" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                  },
                },
              }}
            >
              <MenuItem value="db" dense>
                資料庫
              </MenuItem>
              <MenuItem value="table" dense>
                資料表
              </MenuItem>
              <MenuItem value="column" dense>
                欄位
              </MenuItem>
              <MenuItem value="record" dense>
                紀錄
              </MenuItem>
            </TextField>
            <SearchBar />
          </Box>
        </Box>

        <Box sx={{ gap: 2, ...flexRowSx }}>
          <ThemeMenuWithButton />

          <Tooltip title="通知" arrow>
            <IconButton>
              <Badge variant="dot" badgeContent={1} color="error">
                <NotificationsRoundedIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <ButtonBase
            sx={{
              gap: 1,
              ...flexRowSx,
              textAlign: "left",
              borderRadius: 1,
              p: 0.5,
              px: 1.5,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box
              sx={{
                width: "2.8rem",
                aspectRatio: 1,
                borderRadius: 1,
                bgcolor: "primary.main",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Typography variant="h6" component="span" sx={{ color: "primary.contrastText" }}>
                1
              </Typography>
            </Box>

            <Box sx={{ pr: { xs: 0, md: 1 } }}>
              <Typography variant="subtitle1" component="h6">
                1ureka
              </Typography>
              {isMd && (
                <Typography variant="body2" component="p" color="text.secondary">
                  資料庫管理員
                </Typography>
              )}
            </Box>

            <Box sx={{ color: "text.secondary" }}>
              <ArrowDropDownRoundedIcon color="inherit" />
            </Box>
          </ButtonBase>
        </Box>
      </Box>

      <Box component="main" sx={{ position: "relative", display: "flex", height: "calc(100dvh - 72px)" }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "primary.main", opacity: 0.2, pointerEvents: "none" }} />

        <Stack sx={{ position: "relative", bgcolor: "primary.dark", p: 2, py: 4, color: "#fffc", height: 1, gap: 2 }}>
          <Tooltip title="概覽" arrow placement="right">
            <IconButton
              color="inherit"
              sx={{
                borderRadius: 1,
                aspectRatio: 1,
                bgcolor: "#fffc",
                boxShadow: 1,
                color: "primary.dark",
                "&:hover": { bgcolor: "#fffc" },
              }}
              centerRipple={false}
            >
              <DashboardRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="資料庫結構" arrow placement="right">
            <IconButton color="inherit" sx={{ borderRadius: 1, aspectRatio: 1 }} centerRipple={false}>
              <SchemaRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="資料表" arrow placement="right">
            <IconButton color="inherit" sx={{ borderRadius: 1, aspectRatio: 1 }} centerRipple={false}>
              <ViewListRoundedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="撰寫查詢" arrow placement="right">
            <IconButton color="inherit" sx={{ borderRadius: 1, aspectRatio: 1 }} centerRipple={false}>
              <TerminalRoundedIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flex: 1 }} />

          <Tooltip title="展開面板" arrow placement="right">
            <IconButton color="inherit" sx={{ borderRadius: 1, aspectRatio: 1 }} centerRipple={false}>
              <PlaylistPlayRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>

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
                  maskImage: "radial-gradient(circle at 50% 25%, #0003 0%, #000a 100%)",
                  pointerEvents: "none",
                  bgcolor: "primary.main",
                  fill: "var(--mui-palette-background-paper)",
                  fillOpacity: 0.375,
                }}
              >
                <svg
                  style={{ scale: "1 -1" }}
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
