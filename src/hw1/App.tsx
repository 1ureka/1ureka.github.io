import {
  Box,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import type { BoxProps } from "@mui/material";
import MaleRoundedIcon from "@mui/icons-material/MaleRounded";
import PortraitRoundedIcon from "@mui/icons-material/PortraitRounded";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";
import CustomIcon from "./SVG.tsx";
import Autobiography from "./Autobiography.tsx";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `"Noto Sans TC", "Roboto"`,
  },
  colorSchemes: {
    light: {
      palette: { background: { paper: "#ccc" }, text: { primary: "#222" }, primary: { main: "rgb(94, 144, 164)" } },
    },
    dark: {
      palette: { background: { default: "#222" }, text: { primary: "#ccc" }, primary: { main: "rgb(94, 144, 164)" } },
    },
  },
});

const spacing = 3;
const elevation = 8;

const BlockTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="h3" component="h1" sx={{ "::first-letter": { color: "primary.main" } }}>
    {children}
  </Typography>
);

const Block = ({ children, sx }: React.ComponentProps<typeof Paper>) => (
  <Paper sx={{ p: spacing, ...sx }} className="mode-light" elevation={elevation}>
    <Stack sx={{ gap: spacing / 3 }}>{children}</Stack>
  </Paper>
);

const pageContainerSx: BoxProps["sx"] = {
  height: "100dvh",
  overflow: "auto",
  bgcolor: "background.default",
  scrollbarWidth: "thin",
  scrollbarColor: "gray transparent",
};

/**
 * 滾動容器與頁面包裝 (兩側的auto margin)
 */
const PageContainer = ({ children }: { children: React.ReactNode }) => (
  <Box sx={pageContainerSx} className="mode-dark">
    <Container sx={{ display: "grid", placeItems: "center", height: 1 }}>{children}</Container>
  </Box>
);

const Intro = () => (
  <Stack sx={{ "& > *:nth-of-type(2n + 1)": { bgcolor: "divider", borderRadius: 1 } }}>
    <Box sx={{ display: "flex", gap: spacing / 2, alignItems: "center", p: spacing / 3 }}>
      <Typography variant="h6">姓名</Typography>
      <Box sx={{ display: "flex", gap: spacing / 3, alignItems: "center" }}>
        <Typography>王恩齊</Typography>
        <Typography>/</Typography>
        <Typography sx={{ color: "text.secondary" }}>Andy Wang</Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", gap: spacing / 2, alignItems: "center", p: spacing / 3 }}>
      <Typography variant="h6">生日</Typography>
      <Typography>2003-05-17</Typography>
    </Box>
    <Box sx={{ display: "flex", gap: spacing / 2, alignItems: "center", p: spacing / 3 }}>
      <Typography variant="h6">性別</Typography>
      <Box sx={{ display: "flex", gap: spacing / 3, alignItems: "center" }}>
        <MaleRoundedIcon sx={{ color: "#1560BDcc" }} />
        <Typography color="#1560BDcc">男</Typography>
      </Box>
    </Box>
    <Box sx={{ display: "flex", gap: spacing / 2, alignItems: "center", p: spacing / 3 }}>
      <Typography variant="h6">系級</Typography>
      <Typography>輔仁大學 資訊數學組 4年級</Typography>
    </Box>
  </Stack>
);

const Skill = () => (
  <Stack sx={{ flexDirection: "row", flexWrap: "wrap", gap: spacing / 3 }}>
    <Chip icon={<CustomIcon name="html" />} label="HTML" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="css" />} label="CSS" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="js" />} label="JavaScript" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="ts" />} label="TypeScript" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="vite" />} label="Vite" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="react" />} label="React" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="next" />} label="NextJS" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="node" />} label="NodeJS" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="vercel" />} label="Vercel" sx={{ pl: 0.5 }} />
    <Chip icon={<CustomIcon name="electron" />} label="Electron" sx={{ pl: 0.5 }} />
  </Stack>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <title>個人履歷資料網頁 410170017</title>
      <CssBaseline />
      <PageContainer>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: spacing,
            alignItems: "flex-start",
            justifyContent: "center",
            py: spacing,
          }}
        >
          {/*  */}
          {/* left */}
          <Box
            sx={{
              position: { xs: "relative", md: "sticky" },
              top: { xs: undefined, md: `calc(${spacing} * var(--mui-spacing))` },
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: spacing,
              flex: 1,
              minWidth: 300,
            }}
          >
            <Block sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", gap: spacing / 2, alignItems: "center" }}>
                <PortraitRoundedIcon sx={{ fontSize: "4.5rem", color: "primary.main" }} />
                <BlockTitle>介紹</BlockTitle>
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Intro />
            </Block>

            <Block sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", gap: spacing / 2, alignItems: "center" }}>
                <EmojiObjectsRoundedIcon sx={{ fontSize: "4.5rem", color: "primary.main" }} />
                <BlockTitle>專長</BlockTitle>
              </Box>

              <Divider sx={{ mb: 1 }} />

              <Skill />
            </Block>
          </Box>

          {/*  */}
          {/* right */}
          <Block sx={{ flex: 1.5, minWidth: 300 }}>
            <BlockTitle>自傳</BlockTitle>

            <Divider sx={{ mb: 1 }} />

            <Autobiography />
          </Block>
        </Box>
      </PageContainer>
    </ThemeProvider>
  );
}

export default App;
