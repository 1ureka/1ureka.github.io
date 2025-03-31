import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";

const NavButton = ({ title, active, children }: { title: string; active?: boolean; children: React.ReactNode }) => {
  return (
    <Tooltip title={title} arrow placement="right">
      <IconButton
        color="inherit"
        centerRipple={false}
        sx={{
          borderRadius: 1,
          aspectRatio: 1,
          bgcolor: active ? "#fffc" : undefined,
          boxShadow: active ? 1 : undefined,
          color: active ? "primary.dark" : undefined,
          "&:hover": { bgcolor: active ? "#fffe" : undefined },
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

const Sidebar = () => {
  return (
    <Stack sx={{ position: "relative", bgcolor: "primary.dark", p: 2, py: 4, color: "#fffc", height: 1, gap: 2 }}>
      <NavButton title="概覽" active>
        <DashboardRoundedIcon />
      </NavButton>

      <NavButton title="資料庫結構">
        <SchemaRoundedIcon />
      </NavButton>

      <NavButton title="資料表">
        <ViewListRoundedIcon />
      </NavButton>

      <NavButton title="撰寫查詢">
        <TerminalRoundedIcon />
      </NavButton>

      <Box sx={{ flex: 1 }} />

      <NavButton title="展開面板">
        <PlaylistPlayRoundedIcon />
      </NavButton>
    </Stack>
  );
};

export { Sidebar };
