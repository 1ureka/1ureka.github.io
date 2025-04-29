import { Box, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { ThemeSwitch } from "../ThemeSwitch";

const FilledContainerSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  borderRadius: 1,
  bgcolor: "FilledInput.bg",
  p: 1.5,
};

const HeaderLeft = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <AutoAwesomeRoundedIcon
        className="mode-light"
        sx={{ fontSize: "2.8rem", bgcolor: "text.secondary", borderRadius: 1, color: "background.default", p: 1 }}
      />
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontSize: "1.85rem", lineHeight: 1, translate: "0 2px", display: { xs: "none", sm: "block" } }}
      >
        Blender RAG
      </Typography>
    </Box>
  );
};

const HeaderRight = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "stretch", gap: 2 }}>
      <ThemeSwitch />

      <Box sx={FilledContainerSx}>
        <Box sx={{ position: "relative", p: 1 }}>
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "success.light", borderRadius: 99, scale: 0.7 }} />
        </Box>
        <Typography variant="body2" sx={{ textWrap: "nowrap", lineHeight: 1 }}>
          伺服器狀態：已啟動
        </Typography>
      </Box>
    </Box>
  );
};

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        p: 3.5,
        zIndex: 1,
      }}
    >
      <HeaderLeft />
      <HeaderRight />
    </Box>
  );
};

export { Header };
