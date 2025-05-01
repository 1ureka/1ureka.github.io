import { generateStretchRadius } from "@/utils/commonSx";
import { Box, IconButton, Typography, type IconProps } from "@mui/material";

const FilledButton = ({
  title,
  Icon,
  actived,
}: {
  title: string;
  Icon: React.FC<{ sx?: IconProps["sx"] }>;
  actived?: boolean;
}) => (
  <IconButton
    sx={{
      ...generateStretchRadius([1.5, 1.3]),
      bgcolor: "FilledInput.bg",
      "&:hover": { bgcolor: "FilledInput.disabledBg", scale: "1.02" },
      "&:active": { scale: "0.98" },
      transition: "all 0.2s ease",
    }}
    centerRipple={false}
    color={actived ? "primary" : undefined}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1 }}>
      <Icon />
      <Typography>{title}</Typography>
    </Box>
  </IconButton>
);

export { FilledButton };
