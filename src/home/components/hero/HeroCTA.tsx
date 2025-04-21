import { Box, Button, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const fontSize = "clamp(1.2rem, 1.5vw + 1rem, 1.6rem)";
const iconSize = "2.2rem";

const HeroCTA = () => (
  <Button
    variant="contained"
    size="large"
    sx={{ borderRadius: 99, color: "background.default", p: 1.5, px: 2, "&:hover": { bgcolor: "primary.main" } }}
  >
    <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
      <Typography
        component="span"
        sx={{
          fontSize,
          lineHeight: 1,
          translate: "0.15rem",
          "button:hover &": { opacity: 0 },
          transition: "all 0.2s",
        }}
      >
        開始探索
      </Typography>

      <ArrowForwardRoundedIcon
        sx={{
          display: "block",
          width: iconSize,
          height: iconSize,
          color: "primary.main",
          bgcolor: "background.default",
          borderRadius: 99,
          opacity: 0,
          boxSizing: "content-box",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          display: "grid",
          placeItems: "center",
          bgcolor: "background.default",
          borderRadius: 99,
          inset: "0 0 0 auto",
          width: iconSize,
          "button:hover &": { width: 1 },
          "button:active &": { scale: 0.9 },
          transition: "all 0.2s",
        }}
      >
        <ArrowForwardRoundedIcon
          sx={{ display: "block", color: "primary.main", width: iconSize, height: iconSize, rotate: "90deg" }}
        />
      </Box>
    </Box>
  </Button>
);

export { HeroCTA };
