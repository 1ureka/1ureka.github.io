import { Box, ButtonBase, Divider, Stack, Typography } from "@mui/material";
import SchemaRoundedIcon from "@mui/icons-material/SchemaRounded";
import ShortcutRoundedIcon from "@mui/icons-material/ShortcutRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";

const transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";

type ActionButtonProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

const ActionButton = ({ icon, title, description, onClick }: ActionButtonProps) => (
  <ButtonBase
    onClick={onClick}
    sx={{
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      placeItems: "stretch",
      gap: 1,
      borderRadius: 2,
      bgcolor: "action.hover",
      "&:hover .hover-icon": { opacity: 1 },
      "&:hover": { bgcolor: "action.selected" },
      transition,
      p: 1,
      py: 1.5,
    }}
  >
    <Stack
      sx={{
        justifyContent: "flex-start",
        color: "color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-secondary) 50%)",
      }}
    >
      {icon}
    </Stack>

    <Stack sx={{ gap: 0.5, textAlign: "left" }}>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>
    </Stack>

    <Stack className="hover-icon" sx={{ justifyContent: "flex-end", opacity: 0.5, transition }}>
      <ShortcutRoundedIcon sx={{ color: "text.secondary", scale: "-1" }} />
    </Stack>
  </ButtonBase>
);

const QuickActions = () => {
  const { updatePathAndSearchParams, updateSearchParams } = useUrl();

  return (
    <Box sx={{ p: 1.5, pt: 0 }}>
      <Stack sx={{ gap: 1 }}>
        <Divider />

        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          延伸功能
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
          <ActionButton
            icon={<SchemaRoundedIcon color="inherit" />}
            title="資料庫結構"
            description="了解資料庫結構與關聯"
            onClick={() => {
              updatePathAndSearchParams(routes.datahub_schema, null);
            }}
          />
          <ActionButton
            icon={<TerminalRoundedIcon color="inherit" />}
            title="SQL 查詢"
            description="自行撰寫 SQL 查詢，或使用範本"
            onClick={() => {
              console.log("還沒做完");
              //   updatePath(routes.datahub_query);
              updateSearchParams({ search: "false" }, true);
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export { QuickActions };
