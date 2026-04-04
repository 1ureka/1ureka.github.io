import { IconButton, Stack, Tooltip } from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
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

const Sidebar = () => {
  const { update, pathname } = useUrl();

  const createHandleNav = (path: string) => () => {
    update(path, (prev) => ({ db: prev.db ?? "forum" }));
  };

  return (
    <Stack sx={{ position: "relative", bgcolor: "primary.dark", p: 1, py: 2, color: "#fffc", height: 1, gap: 2 }}>
      <NavButton
        title="概覽"
        active={pathname.get() === routes.datahub_home}
        onClick={createHandleNav(routes.datahub_home)}
      >
        <DashboardRoundedIcon />
      </NavButton>

      <NavButton
        title="資料庫結構"
        active={pathname.get() === routes.datahub_schema}
        onClick={createHandleNav(routes.datahub_schema)}
      >
        <SchemaRoundedIcon />
      </NavButton>

      <NavButton
        title="表格檢視"
        active={pathname.get() === routes.datahub_tables}
        onClick={createHandleNav(routes.datahub_tables)}
      >
        <ViewListRoundedIcon />
      </NavButton>
    </Stack>
  );
};

export { Sidebar };
