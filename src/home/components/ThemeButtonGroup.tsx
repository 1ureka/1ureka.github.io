import { Button, ButtonGroup, useColorScheme } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

export const ThemeButtonGroup = () => {
  const { mode, setMode, systemMode } = useColorScheme();

  const lightMode = mode === "light" || systemMode === "light";
  const darkMode = mode === "dark" || systemMode === "dark";

  return (
    <ButtonGroup fullWidth variant="outlined" sx={{ borderRadius: 2 }}>
      <Button
        startIcon={<LightModeRoundedIcon />}
        onClick={() => setMode("light")}
        color={lightMode ? "primary" : "inherit"}
        variant={lightMode ? "contained" : "outlined"}
      >
        淺色
      </Button>
      <Button
        startIcon={<DarkModeRoundedIcon />}
        onClick={() => setMode("dark")}
        color={darkMode ? "primary" : "inherit"}
        variant={darkMode ? "contained" : "outlined"}
      >
        深色
      </Button>
    </ButtonGroup>
  );
};
