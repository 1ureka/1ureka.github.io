import { Box, ButtonBase, Container, IconButton, type ToolbarProps } from "@mui/material";
import { Toolbar, Tooltip, Typography } from "@mui/material";

import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

import { ThemeMenuWithButton } from "../ThemeMenu";
import { AccountMenuDesktop } from "./AccountMenu";
import { SearchBar } from "./SearchBar";
import { NotificationMenuDesktop } from "./NotificationMenu";

const Title = () => (
  <Tooltip title="返回首頁" arrow>
    <ButtonBase
      href="/"
      sx={{
        display: "flex",
        gap: 1.5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        p: 1,
        "&:hover": { bgcolor: "divider" },
        "&:active": { scale: "0.95" },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <ForumRoundedIcon fontSize="large" color="primary" />
      <Typography variant="h4" component="h1" sx={{ fontFamily: `"timemachine-wa"` }}>
        論壇樣板
      </Typography>
    </ButtonBase>
  </Tooltip>
);

const DesktopSx = {
  position: "sticky",
  top: 0,
  zIndex: "appBar",
  bgcolor: "secondary.main",
  borderBottom: "solid 1px #fff2",
  boxShadow: 3,
  ".top &": { boxShadow: "none" },
  transition: "all 0.2s ease-in-out",
} as const;

const AppbarDesktop = ({ sx, ...props }: ToolbarProps) => {
  return (
    <Toolbar className="mode-dark" disableGutters sx={{ ...DesktopSx, ...sx }} {...props}>
      <Container sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }} maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "flex-start", flex: { xs: undefined, md: 1 } }}>
          <Title />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <SearchBar />
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
          <ThemeMenuWithButton />
          <Tooltip title="收藏與追蹤" arrow>
            <IconButton>
              <FavoriteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <NotificationMenuDesktop />

          <AccountMenuDesktop />
        </Box>
      </Container>
    </Toolbar>
  );
};

export { AppbarDesktop };
