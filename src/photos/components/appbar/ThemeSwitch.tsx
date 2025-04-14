import { Box, IconButton, useColorScheme } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { BoxM } from "@/components/Motion";

const ThemeSwitch = () => {
  const { mode, setMode, systemMode } = useColorScheme();
  const isLight = mode === "light" || systemMode === "light";
  const isDark = mode === "dark" || systemMode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        p: 0.5,
        gap: 0.5,
        bgcolor: "action.hover",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <BoxM
        layout
        sx={{
          position: "absolute",
          left: isLight ? 0 : undefined,
          ml: isLight ? 0.5 : undefined,
          right: isDark ? 0 : undefined,
          mr: isDark ? 0.5 : undefined,
          p: 1,
          width: "1.25rem",
          height: "1.25rem",
          boxSizing: "content-box",
          bgcolor: "primary.light",
          borderRadius: 1.5,
        }}
      />

      <IconButton
        onClick={() => setMode("light")}
        centerRipple={false}
        sx={{
          position: "relative",
          borderRadius: 1.5,
          overflow: "hidden",
          color: isLight ? "background.paper" : undefined,
          transition: "0.25s all ease",
        }}
      >
        <LightModeRoundedIcon fontSize="small" />
      </IconButton>
      <IconButton
        onClick={() => setMode("dark")}
        centerRipple={false}
        sx={{
          position: "relative",
          borderRadius: 1.5,
          overflow: "hidden",
          color: isDark ? "background.paper" : undefined,
          transition: "0.25s all ease",
        }}
      >
        <DarkModeRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export { ThemeSwitch };
