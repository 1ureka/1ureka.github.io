import { Box, ButtonBase, Typography } from "@mui/material";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const AccountMenu = () => {
  return (
    <ButtonBase
      sx={{
        display: "flex",
        alignItems: "center",
        p: 0.5,
        pr: 0,
        borderRadius: 2,
        textAlign: "left",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Box
        sx={{
          width: "2.3rem",
          aspectRatio: 1,
          borderRadius: 1.5,
          bgcolor: "primary.light",
          display: "grid",
          placeItems: "center",
          mr: 1,
        }}
      >
        <Typography variant="h6" component="span" sx={{ color: "primary.contrastText" }}>
          1
        </Typography>
      </Box>

      <Typography variant="subtitle1" component="h6">
        1ureka
      </Typography>

      <Box sx={{ color: "text.secondary" }}>
        <ArrowDropDownRoundedIcon color="inherit" />
      </Box>
    </ButtonBase>
  );
};

export { AccountMenu };
