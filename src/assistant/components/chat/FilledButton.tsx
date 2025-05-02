import { generateMuiColorMix, generateStretchRadius } from "@/utils/commonSx";
import { Box, CircularProgress, IconButton, Typography, type IconProps } from "@mui/material";

const FilledButton = ({
  title,
  Icon,
  actived,
  loading,
  onClick,
}: {
  title: string;
  Icon?: React.FC<{ sx?: IconProps["sx"] }>;
  actived?: boolean;
  loading?: boolean;
  onClick?: () => void;
}) => (
  <IconButton
    onClick={onClick}
    sx={{
      ...generateStretchRadius([1.5, 1.3]),
      bgcolor: "FilledInput.bg",
      "&:hover": { bgcolor: "FilledInput.disabledBg", scale: "1.02" },
      "&:active": { scale: "0.98" },
      transition: "all 0.2s ease",
      pointerEvents: loading ? "none" : undefined,
    }}
    centerRipple={false}
  >
    {loading ? (
      <Box sx={{ display: "grid", placeItems: "center", height: 24, width: 24 }}>
        <CircularProgress size={16} sx={{ color: "text.secondary" }} />
      </Box>
    ) : (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1 }}>
        {Icon && (
          <Icon sx={{ color: actived ? generateMuiColorMix("primary-main", "text-secondary", 65) : undefined }} />
        )}
        <Typography sx={{ color: actived ? generateMuiColorMix("primary-main", "text-secondary", 65) : undefined }}>
          {title}
        </Typography>
      </Box>
    )}
  </IconButton>
);

export { FilledButton };
