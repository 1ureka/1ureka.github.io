import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import ShortcutRoundedIcon from "@mui/icons-material/ShortcutRounded";

import type { SearchTopic } from "@/datahub/hooks/search";
import type { Highlight } from "@/hooks/fuse";
import { memo } from "react";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";
import { ellipsisSx } from "@/utils/commonSx";

const transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
const hightlightColor = "color-mix(in srgb, var(--mui-palette-primary-main) 70%, var(--mui-palette-text-primary) 30%)";

const iconSize = "medium";
const iconSx = { fontSize: 48, mr: 1, bgcolor: "action.hover", borderRadius: 1.5, color: "action.active", p: 1 };
const iconMap: Record<SearchTopic, React.ReactNode> = {
  db: <StorageRoundedIcon fontSize={iconSize} sx={iconSx} />,
  table: <BorderAllRoundedIcon fontSize={iconSize} sx={iconSx} />,
  column: <ViewColumnRoundedIcon fontSize={iconSize} sx={iconSx} />,
};

type ResultButtonProps = {
  id: string;
  variant: SearchTopic;
  primary: Highlight[];
  secondary: Highlight[];
  type: string;
};

const ResultButton = memo(({ id, variant, primary, secondary, type }: ResultButtonProps) => {
  const { update } = useUrl();

  let handleClick: (() => void) | null = null;

  if (variant === "db") {
    handleClick = () =>
      update(routes.datahub_home, (prev) => ({
        db: id,
        searchTopic: prev.searchTopic ?? null,
        searchQuery: prev.searchQuery ?? null,
      }));
  } else if (variant === "table") {
    handleClick = () =>
      update(routes.datahub_tables, (prev) => ({
        db: prev.db ?? null,
        table: id,
        searchTopic: prev.searchTopic ?? null,
        searchQuery: prev.searchQuery ?? null,
      }));
  } else if (variant === "column") {
    handleClick = () =>
      update(routes.datahub_tables, (prev) => ({
        db: prev.db ?? null,
        table: id.split(".")[0],
        searchTopic: prev.searchTopic ?? null,
        searchQuery: prev.searchQuery ?? null,
      }));
  } else {
    handleClick = () => {};
  }

  return (
    <Button
      onClick={handleClick}
      color="inherit"
      sx={{
        display: "grid",
        gap: 2.5,
        alignItems: "center",
        gridTemplateColumns: "auto 1fr auto auto",
        borderRadius: 2,
        textTransform: "none",
        lineHeight: undefined,
        "&:hover .hover-icon": { opacity: 1 },
        "&:hover": { bgcolor: "action.hover" },
        transition,
        p: 1,
      }}
    >
      <Box sx={{ display: "grid", placeItems: "center" }}>{iconMap[variant]}</Box>

      <Stack sx={{ gap: 0.5, textAlign: "left" }}>
        <Typography variant="subtitle1" sx={ellipsisSx}>
          {primary.map(({ text, highlight }, i) => (
            <Typography
              key={i}
              variant="subtitle1"
              component="span"
              sx={{ color: highlight ? hightlightColor : undefined }}
            >
              {text}
            </Typography>
          ))}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", ...ellipsisSx }}>
          {secondary.map(({ text, highlight }, i) => (
            <Typography
              key={i}
              variant="body2"
              component="span"
              sx={{ color: highlight ? hightlightColor : undefined }}
            >
              {text}
            </Typography>
          ))}
        </Typography>
      </Stack>

      <Box className="hover-icon" sx={{ display: "grid", placeItems: "center", opacity: 0, transition }}>
        <ShortcutRoundedIcon sx={{ color: "text.secondary", scale: "-1" }} />
      </Box>

      <Chip variant="filled" label={type} sx={{ textTransform: "uppercase" }} />
    </Button>
  );
});

export { ResultButton };
