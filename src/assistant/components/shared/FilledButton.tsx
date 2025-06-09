import { generateMuiColorMix, generateStretchRadius } from "@/utils/commonSx";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import type { ButtonProps, IconButtonProps } from "@mui/material";

type FilledButtonProps = {
  title?: string;
  Icon?: React.FC<{ sx?: IconButtonProps["sx"] }>;
  loading?: boolean;
} & ButtonProps;

const FilledButton = ({ title, Icon, loading, ...props }: FilledButtonProps) => (
  <Button
    centerRipple={false}
    sx={{
      ...generateStretchRadius([1.5, 1.3]),
      bgcolor: "FilledInput.bg",
      color: generateMuiColorMix("text-secondary", "text-primary", 50),
      "&:hover": { bgcolor: "FilledInput.disabledBg", scale: "1.02" },
      "&:active": { scale: "0.98" },
      transition: "all 0.2s ease",
      pointerEvents: loading ? "none" : undefined,
    }}
    {...props}
  >
    {loading ? (
      <Box sx={{ display: "grid", placeItems: "center", height: 24, width: 24 }}>
        <CircularProgress size={16} color="inherit" />
      </Box>
    ) : (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1 }}>
        {Icon && <Icon sx={{ color: "inherit" }} />}
        {title && <Typography sx={{ color: "inherit" }}>{title}</Typography>}
      </Box>
    )}
  </Button>
);

export { FilledButton };
