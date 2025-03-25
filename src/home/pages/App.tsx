import { useEffect } from "react";
import type { BoxProps } from "@mui/material";
import { Box, Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";

import "@/home/utils/app.css";
import iconSvg from "@/assets/icon/icon.svg";
import forumSvg from "@/assets/icon/forum.svg";

import { routes } from "@/routes";
import { Toaster } from "@/components/Toast";
import { ThemeMenu } from "@/home/components/ThemeMenu";
import { ProjectCard } from "@/home/components/ProjectCard";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `"timemachine-wa", "Noto Sans TC"`,
  },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: "#000" },
        primary: { main: "#222" },
        secondary: { main: "#333" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#fff" },
        secondary: { main: "#eee" },
        background: { default: "#222", paper: "#222" },
      },
    },
  },
  spacing: "0.5rem",
});

const overflowSx: BoxProps["sx"] = {
  position: "relative",
  height: "100dvh",
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "gray transparent",
};

/**
 * 滾動容器
 */
const ScrollArea = ({ children, ...props }: BoxProps) => (
  <Box sx={overflowSx} {...props}>
    {children}
  </Box>
);

function App() {
  useEffect(() => {
    document.documentElement.style.fontSize = "16px";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />

      <ScrollArea>
        <Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", gap: 2, py: 5 }}>
          <img
            src={iconSvg}
            alt="icon"
            style={{ width: "4.5rem", height: "4.5rem", mixBlendMode: "exclusion", opacity: 0.9 }}
          />
          <Typography variant="h2" component="h1">
            1ureka 的專案
          </Typography>
        </Container>

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridAutoRows: "200px",
            gap: 2,
            my: 2,
          }}
        >
          <ProjectCard
            title="論壇樣板"
            description="這是一個論壇樣板，用來練習 RWD 與 React。"
            href={routes.forum_home}
            colors={["#FF772E", "#075056", "#222", "#fff"]}
            iconUrl={forumSvg}
          />

          <Box sx={{ position: "fixed", right: 0, top: 0, m: 2 }}>
            <ThemeMenu />
          </Box>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
