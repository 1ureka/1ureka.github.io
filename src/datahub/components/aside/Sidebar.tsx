import { Box, ButtonBase, Drawer, IconButton, MenuItem, Stack, TextField, Tooltip, Typography } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import PlaylistPlayRoundedIcon from "@mui/icons-material/PlaylistPlayRounded";
import DataExplorationRoundedIcon from "@mui/icons-material/DataExplorationRounded";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useState } from "react";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";

type NavButtonProps = {
  title: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

const NavButton = ({ title, active, onClick, children }: NavButtonProps) => {
  return (
    <Tooltip title={title} arrow placement="right">
      <IconButton
        color="inherit"
        centerRipple={false}
        onClick={onClick}
        sx={{
          borderRadius: 1,
          aspectRatio: 1,
          bgcolor: active ? "#fffc" : undefined,
          boxShadow: active ? 1 : undefined,
          color: active ? "primary.dark" : undefined,
          "&:hover": { bgcolor: active ? "#fffe" : undefined },
          transition: "all 0.2s ease-in-out",
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};

type ExpandedNavButtonProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

const ExpandedNavButton = ({ title, description, icon, active, onClick }: ExpandedNavButtonProps) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        borderRadius: 1,
        bgcolor: active ? "#fffc" : undefined,
        boxShadow: active ? 1 : undefined,
        "&:hover": { bgcolor: active ? "#fffe" : "#fff1" },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 2, width: 1 }}>
        <Box>{icon}</Box>

        <Box sx={{ flex: 1, textAlign: "left" }}>
          <Typography variant="h6" component="h6" sx={{ color: active ? "primary.dark" : "#fffc" }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" component="p" sx={{ color: active ? "primary.dark" : "#fffc", opacity: 0.8 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </ButtonBase>
  );
};

const ExpandedSidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { searchParams, updateSearchParams, updatePath, pathname } = useUrl();
  const createHandleDbClick = (dbName: string) => () => {
    updateSearchParams({ db: dbName });
  };
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 450,
          maxWidth: "100vw",
          bgcolor: "primary.dark",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DataExplorationRoundedIcon sx={{ fontSize: "3em", color: "#fffc" }} />
          <Typography variant="h4" component="h1" sx={{ fontFamily: `"timemachine-wa"`, color: "#fffc" }}>
            資料樣板
          </Typography>
        </Box>

        <TextField
          className="mode-dark"
          select
          label="資料庫"
          variant="outlined"
          slotProps={{ select: { IconComponent: ExpandMoreRoundedIcon } }}
          value={searchParams.get("db") || "forum"}
        >
          <MenuItem value="forum" dense>
            <Typography variant="body2" sx={{ color: "text.primary" }} onClick={createHandleDbClick("forum")}>
              論壇資料庫
            </Typography>
          </MenuItem>
        </TextField>
      </Box>

      <ExpandedNavButton
        title="概覽"
        description="快速掌握資料庫狀態與視覺化圖表"
        icon={
          <DashboardRoundedIcon
            sx={{ color: pathname.get() === routes.datahub_home ? "primary.dark" : "#fffc", fontSize: "3.5rem" }}
          />
        }
        active={pathname.get() === routes.datahub_home}
        onClick={() => {
          updatePath(routes.datahub_home);
          onClose();
        }}
      />

      <ExpandedNavButton
        title="資料庫結構"
        description="圖像化呈現資料表間的關聯"
        icon={
          <SchemaRoundedIcon
            sx={{ color: pathname.get() === routes.datahub_schema ? "primary.dark" : "#fffc", fontSize: "3.5rem" }}
          />
        }
        active={pathname.get() === routes.datahub_schema}
        onClick={() => {
          updatePath(routes.datahub_schema);
          onClose();
        }}
      />

      <ExpandedNavButton
        title="表格檢視"
        description="檢視、編輯與標準化資料表內容"
        icon={
          <ViewListRoundedIcon
            sx={{ color: pathname.get() === routes.datahub_tables ? "primary.dark" : "#fffc", fontSize: "3.5rem" }}
          />
        }
        active={pathname.get() === routes.datahub_tables}
        onClick={() => {
          updatePath(routes.datahub_tables);
          onClose();
        }}
      />

      <ExpandedNavButton
        title="撰寫查詢"
        description="手動撰寫 SQL 以進行自定義查詢"
        icon={<TerminalRoundedIcon sx={{ color: "#fffc", fontSize: "3.5rem" }} />}
        onClick={onClose}
      />

      <Box sx={{ flex: 1 }} />

      <ExpandedNavButton
        title="收起側邊欄"
        icon={<FirstPageRoundedIcon sx={{ color: "#fffc", fontSize: "2rem" }} />}
        onClick={onClose}
      />
    </Drawer>
  );
};

const Sidebar = () => {
  const { updatePath, pathname } = useUrl();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Stack sx={{ position: "relative", bgcolor: "primary.dark", p: 2, py: 4, color: "#fffc", height: 1, gap: 2 }}>
      <NavButton
        title="概覽"
        active={pathname.get() === routes.datahub_home}
        onClick={() => updatePath(routes.datahub_home)}
      >
        <DashboardRoundedIcon />
      </NavButton>

      <NavButton
        title="資料庫結構"
        active={pathname.get() === routes.datahub_schema}
        onClick={() => updatePath(routes.datahub_schema)}
      >
        <SchemaRoundedIcon />
      </NavButton>

      <NavButton
        title="表格檢視"
        active={pathname.get() === routes.datahub_tables}
        onClick={() => updatePath(routes.datahub_tables)}
      >
        <ViewListRoundedIcon />
      </NavButton>

      <NavButton title="撰寫查詢">
        <TerminalRoundedIcon />
      </NavButton>

      <Box sx={{ flex: 1 }} />

      <NavButton title="展開面板" onClick={toggleDrawer}>
        <PlaylistPlayRoundedIcon />
      </NavButton>

      <ExpandedSidebar open={drawerOpen} onClose={toggleDrawer} />
    </Stack>
  );
};

export { Sidebar };
