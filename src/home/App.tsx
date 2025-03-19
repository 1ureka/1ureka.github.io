import { Box, Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { Toaster } from "./components/Toast";
import { ThemeMenu } from "./components/ThemeMenu";
import { useEffect } from "react";
import "./app.css";
import { ProjectCard } from "./components/ProjectCard";
import defaultSvg from "../assets/icon/icon.svg";
import forumSvg from "../assets/icon/forum.svg";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `"timemachine-wa", "NOTO SANS TC"`,
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
            src={defaultSvg}
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
            title="第一次作業"
            description="這是第一次作業的描述，第一次作業是一個簡單的網頁，用來練習 HTML 與 CSS。"
            href="/src/hw1/index.html"
            colors={["rgb(94, 144, 164)", "#222", "#ccc"]}
            iconUrl={defaultSvg}
            isIconWhiteOrBlack
          />
          <ProjectCard
            title="論壇樣板"
            description="這是一個論壇樣板，用來練習 RWD 與 React。"
            href="/src/forum/index.html"
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
