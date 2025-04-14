import { Box, Button, ButtonGroup, useColorScheme } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { BoxM } from "@/components/Motion";

const ActiveBg = () => (
  <BoxM
    layoutId="theme-switch-bg"
    sx={{ position: "absolute", inset: "0 0 0 0", pointerEvents: "none", bgcolor: "primary.main", zIndex: -1 }}
  />
);

export const ThemeButtonGroup = () => {
  const { mode, setMode, systemMode } = useColorScheme();

  const lightMode = mode === "light" || systemMode === "light";
  const darkMode = mode === "dark" || systemMode === "dark";

  return (
    <ButtonGroup
      fullWidth
      variant="text"
      sx={{ borderRadius: 2, overflow: "hidden", outline: 1, outlineColor: "text.secondary" }}
    >
      <Box sx={{ color: lightMode ? "background.default" : "text.secondary", width: 1 }}>
        <Button
          startIcon={<LightModeRoundedIcon />}
          onClick={() => setMode("light")}
          color={"inherit"}
          sx={{ textWrap: "none", whiteSpace: "nowrap" }}
        >
          {lightMode && <ActiveBg />}
          淺色
        </Button>
      </Box>
      <Box sx={{ color: darkMode ? "background.default" : "text.secondary", width: 1 }}>
        <Button
          startIcon={<DarkModeRoundedIcon />}
          onClick={() => setMode("dark")}
          color={"inherit"}
          sx={{ textWrap: "none", whiteSpace: "nowrap" }}
        >
          {darkMode && <ActiveBg />}
          深色
        </Button>
      </Box>
    </ButtonGroup>
  );
};
