import { BottomNavigation, BottomNavigationAction, Box, Button, Container, Fab } from "@mui/material";
import { Toolbar, Typography, type ToolbarProps } from "@mui/material";

import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useEffect, useRef, useState } from "react";
import { routes } from "@/forum/utils/routes";
import { ThemeDrawer } from "../ThemeMenu";
import { AccountMenuMobile } from "./AccountMenu";
import { NotificationMenuMobile } from "./NotificationMenu";

const TopSx = {
  position: "sticky",
  top: 0,
  zIndex: "appBar",
  bgcolor: "secondary.main",
  borderBottom: "solid 1px #fff2",
  boxShadow: 3,
  ".top &": { boxShadow: "none" },
  transition: "all 0.2s ease-in-out",
} as const;

const BottomSx = {
  position: "fixed",
  inset: "auto 0 0 0",
  zIndex: "appBar",
  bgcolor: "secondary.main",
  borderTop: "solid 1px #fff2",
  boxShadow: 3,
};

const AppbarMobile = ({ sx, ...props }: ToolbarProps) => {
  // 主題選單狀態
  const [themeOpen, setThemeOpen] = useState(false);
  const handleThemeOpen = () => setThemeOpen(true);
  const handleThemeClose = () => setThemeOpen(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!bottomRef.current) return;
    const scrollContiainer = document.getElementById("scroll-area");
    if (!scrollContiainer) return;

    // 為底部預留空間
    const bottomHeight = bottomRef.current.clientHeight;
    scrollContiainer.style.paddingBottom = `${bottomHeight}px`;
    return () => {
      scrollContiainer.style.paddingBottom = "0px";
    };
  }, [bottomRef]);

  return (
    <>
      <Toolbar className="mode-dark" disableGutters sx={{ ...TopSx, ...sx }} {...props}>
        <Container sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }} maxWidth="xl">
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", flex: 1 }}>
            <ForumRoundedIcon fontSize="large" color="primary" />
            <Typography variant="h4" component="h1" sx={{ mr: 1, fontFamily: `"timemachine-wa"` }}>
              論壇樣板
            </Typography>
          </Box>

          <Button
            href={routes.search}
            startIcon={<SearchRoundedIcon />}
            variant="outlined"
            color="inherit"
            size="large"
          >
            搜尋
          </Button>
        </Container>
      </Toolbar>

      {/* 底部導航 */}
      <BottomNavigation className="mode-dark" value={2} showLabels sx={BottomSx} ref={bottomRef}>
        <NotificationMenuMobile />

        <BottomNavigationAction label="主題" icon={<DarkModeRoundedIcon />} onClick={handleThemeOpen} />

        <BottomNavigationAction
          sx={{ cursor: "default", minWidth: "auto" }}
          disableRipple
          label={
            <Fab
              color="primary"
              size="large"
              href={routes.home}
              component="a"
              sx={{
                position: "absolute",
                transform: "translate(-50%, -80%) scale(1.2)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              <Box>
                <HomeRoundedIcon />
                <Typography variant="caption" component="h5">
                  首頁
                </Typography>
              </Box>
            </Fab>
          }
        />

        <BottomNavigationAction label="收藏" icon={<FavoriteRoundedIcon />} />

        <AccountMenuMobile />
      </BottomNavigation>

      <ThemeDrawer open={themeOpen} onClose={handleThemeClose} onOpen={handleThemeOpen} />
    </>
  );
};

export { AppbarMobile };
