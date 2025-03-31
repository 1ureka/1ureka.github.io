import { Box, ButtonBase, Typography, useMediaQuery } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const AccountMenu = () => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <ButtonBase
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
        textAlign: "left",
        borderRadius: 1,
        p: 0.5,
        px: 1.5,
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Box
        sx={{
          width: "2.8rem",
          aspectRatio: 1,
          borderRadius: 1,
          bgcolor: "primary.main",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="h6" component="span" sx={{ color: "primary.contrastText" }}>
          1
        </Typography>
      </Box>

      <Box sx={{ pr: { xs: 0, md: 1 } }}>
        <Typography variant="subtitle1" component="h6">
          1ureka
        </Typography>
        {isMd && (
          <Typography variant="body2" component="p" color="text.secondary">
            資料庫管理員
          </Typography>
        )}
      </Box>

      <Box sx={{ color: "text.secondary" }}>
        <ArrowDropDownRoundedIcon color="inherit" />
      </Box>
    </ButtonBase>
  );
};

export { AccountMenu };
