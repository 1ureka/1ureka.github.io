import { Box, ButtonBase, Chip, Stack, Typography } from "@mui/material";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import ViewColumnRoundedIcon from "@mui/icons-material/ViewColumnRounded";
import ShortcutRoundedIcon from "@mui/icons-material/ShortcutRounded";

import type { SearchTopic } from "./searchTopic";
import type { Highlight } from "@/hooks/fuse";
import { memo } from "react";

const hightlightColor = "color-mix(in srgb, var(--mui-palette-primary-main) 70%, var(--mui-palette-text-primary) 30%)";
const transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
const iconSize = "medium";
const iconSx = { fontSize: 48, mr: 1, bgcolor: "action.hover", borderRadius: 1.5, color: "action.active", p: 1 };
const iconMap: Record<SearchTopic, React.ReactNode> = {
  db: <StorageRoundedIcon fontSize={iconSize} sx={iconSx} />,
  table: <BorderAllRoundedIcon fontSize={iconSize} sx={iconSx} />,
  column: <ViewColumnRoundedIcon fontSize={iconSize} sx={iconSx} />,
};

type ResultButtonProps = {
  variant: SearchTopic;
  primary: Highlight[];
  secondary: Highlight[];
  type: string;
};

const ResultButton = memo(({ variant, primary, secondary, type }: ResultButtonProps) => (
  <ButtonBase
    sx={{
      display: "grid",
      gap: 2.5,
      alignItems: "center",
      gridTemplateColumns: "auto 1fr auto auto",
      borderRadius: 2,
      "&:hover .hover-icon": { opacity: 1 },
      "&:hover": { bgcolor: "action.hover" },
      transition,
      p: 1,
    }}
  >
    <Box>{iconMap[variant]}</Box>

    <Stack sx={{ gap: 0.5, textAlign: "left" }}>
      <Typography variant="subtitle1">
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
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {secondary.map(({ text, highlight }, i) => (
          <Typography key={i} variant="body2" component="span" sx={{ color: highlight ? hightlightColor : undefined }}>
            {text}
          </Typography>
        ))}
      </Typography>
    </Stack>

    <Box className="hover-icon" sx={{ opacity: 0, transition }}>
      <ShortcutRoundedIcon sx={{ color: "text.secondary", scale: "-1" }} />
    </Box>

    <Chip variant="filled" label={type} sx={{ textTransform: "uppercase" }} />
  </ButtonBase>
));

export { ResultButton };
