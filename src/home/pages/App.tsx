import { useEffect } from "react";
import { Box, Button, CssBaseline, Divider, Stack, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import type { BoxProps } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import CameraRoundedIcon from "@mui/icons-material/CameraRounded";

import "@/home/utils/app.css";
import { Toaster } from "@/components/Toast";
import { routes } from "@/routes";
import { theme } from "@/home/utils/theme";

import { ProjectCard } from "@/home/components/ProjectCard";
import { GithubIcon } from "@/home/components/GithubIcon";
import { ThemeButtonGroup } from "@/home/components/ThemeButtonGroup";
import { ListControlBar } from "@/home/components/ListControlBar";

const Title = () => (
  <>
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontFamily: "timemachine-wa", "&:first-letter": { color: "primary.main" } }}
      >
        1ureka
      </Typography>

      {/* dot */}
      <Box sx={{ position: "relative", display: "grid", placeItems: "center" }}>
        <Box sx={{ p: 1, borderRadius: 1, bgcolor: "primary.light", m: 2 }} />
        <Box
          sx={{ p: 2, borderRadius: 1, bgcolor: "primary.main", opacity: 0.3, position: "absolute", rotate: "45deg" }}
        />
      </Box>
    </Box>
    <Typography variant="h2" component="h1" sx={{ fontFamily: "timemachine-wa" }}>
      Space
    </Typography>
  </>
);

const Actions = ({ sx, ...props }: BoxProps) => (
  <Box sx={{ color: "text.secondary", ...sx }} {...props}>
    <Button
      color="inherit"
      variant="outlined"
      sx={{ borderRadius: 2, display: "flex", alignItems: "center", gap: 1, p: 1.5, mb: 2 }}
      href="https://github.com/1ureka"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon fontSize="large" />
      <Typography variant="h6" component="span">
        GitHub
      </Typography>
    </Button>

    <ThemeButtonGroup />
  </Box>
);

function App() {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  useEffect(() => {
    document.documentElement.style.fontSize = isSm ? "16px" : "14px";
  }, [isSm]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />

      <Box
        sx={{
          p: { xs: 2.5, sm: 3.5, md: 5 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100dvh",
          overflow: "auto",
        }}
      >
        <Stack
          sx={{
            position: { xs: "relative", md: "sticky" },
            top: 0,
            flexDirection: { xs: "row", md: "column" },
            justifyContent: "space-between",
            height: 1,
            width: { xs: 1, md: "13rem", lg: "15rem" },
          }}
        >
          <Box>
            <Title />
            {isMd && (
              <Typography variant="body1" component="p" sx={{ color: "text.primary", mt: 2, opacity: 0.9 }}>
                這是一個模組化的 UI/UX
                展示平台，透過各種類型的樣板，探索多種真實場景中的介面開發與使用者流程設計。專案將持續打磨，期盼從視覺層次、結構邏輯到互動細節，逐步走向更完整、細膩且具啟發性的使用體驗。
              </Typography>
            )}
          </Box>

          {isSm && <Actions />}
        </Stack>

        {!isMd && (
          <Typography variant="body1" component="p" sx={{ color: "text.primary", mt: 2, opacity: 0.9 }}>
            這是一個模組化的 UI/UX
            展示平台，透過各種類型的樣板，探索多種真實場景中的介面開發與使用者流程設計。專案將持續打磨，期盼從視覺層次、結構邏輯到互動細節，逐步走向更完整、細膩且具啟發性的使用體驗。
          </Typography>
        )}

        {!isSm && <Actions sx={{ mt: 2 }} />}

        {isMd ? (
          <Divider orientation="vertical" flexItem sx={{ mx: 5 }} />
        ) : (
          <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
        )}

        <Box component="main" sx={{ flex: 1 }}>
          <ListControlBar />

          <Box
            sx={{
              mt: 5,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fill, minmax(500px, 1fr))" },
              gap: 2,
              pb: 5,
            }}
          >
            <ProjectCard
              title="資料樣板"
              description="探索資料結構、互動體驗與儀表板 UX 的設計樣板，結合可視化與開發工具的一站式後台模組"
              color="#66cccc"
              icon={<DataExplorationRoundedIcon sx={{ fontSize: "4em", color: "#66cccc" }} />}
              actionLabel="開始探索"
              actionHref={routes.datahub_home}
              actionTarget="_blank"
              progress={25}
            />

            <ProjectCard
              title="論壇樣板"
              description="模擬真實社群互動平台，展示從發文、留言到通知的完整 UI/UX 流程與資料驅動的體驗"
              color="#ff9d69"
              icon={<ForumRoundedIcon sx={{ fontSize: "4em", color: "#ff9d69" }} />}
              actionLabel="開始探索"
              actionHref={routes.forum_home}
              actionTarget="_blank"
              progress={80}
            />

            <ProjectCard
              title="相簿樣板"
              description="探索相簿的 UI/UX 設計樣板，嘗試在瀏覽器中實現 windows 的相簿體驗"
              color="#d077a1"
              icon={<CameraRoundedIcon sx={{ fontSize: "4em", color: "#d077a1" }} />}
              actionLabel="開始探索"
              actionHref={routes.photos_home}
              actionTarget="_blank"
              progress={2}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
