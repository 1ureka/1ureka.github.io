import * as React from "react";
import { Box, Checkbox, Stack, ThemeProvider, Tooltip } from "@mui/material";
import { Radio, RadioGroup, Avatar } from "@mui/material";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import Layout from "../../components/layout/Layout";
import { darkTheme, lightTheme } from "../../utils/theme";

function Background() {
  const imgStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    scale: "1.05",
  };

  const gradientSx = {
    ...imgStyle,
    background: "radial-gradient(transparent, transparent, rgb(0 0 0 / 0.55))",
  };
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <img src="./PJ28-2 とびら-1.webp" style={imgStyle} alt="" />
      <Box sx={gradientSx} />
    </Box>
  );
}

function Title() {
  return (
    <Stack direction="row" alignItems="center" sx={{ p: 2 }}>
      <ThemeProvider theme={lightTheme}>
        <Avatar sx={{ width: 80, height: 80 }} />
      </ThemeProvider>
    </Stack>
  );
}

function Radios() {
  const [val, setVal] = React.useState(0);

  const sizeSx = { "& .MuiSvgIcon-root": { fontSize: 22 } };

  return (
    <Tooltip title="Change Cover" placement="left">
      <RadioGroup value={val} onChange={({ target }) => setVal(target.value)}>
        {[0, 1, 2].map((i) => (
          <Radio key={i} value={i} sx={sizeSx} />
        ))}
      </RadioGroup>
    </Tooltip>
  );
}

// change according auth
function MainButton(params) {}

function Control() {
  const [isPaused, setIsPaused] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const handleAnimation = ({ target }) => {
    setIsPaused(target.checked);
  };

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Stack spacing={0.5}>
      <Tooltip
        title={isPaused ? "Play Animation" : "Pause Animation"}
        placement="left"
      >
        <Checkbox
          icon={<PauseRoundedIcon />}
          checkedIcon={<PlayArrowRoundedIcon />}
          onChange={handleAnimation}
          size="small"
        />
      </Tooltip>
      <Tooltip title={!isVisible ? "Show UI" : "Hide UI"} placement="left">
        <Checkbox
          icon={<VisibilityOffRoundedIcon />}
          checkedIcon={<VisibilityRoundedIcon />}
          onChange={handleVisible}
          size="small"
          checked={!isVisible}
        />
      </Tooltip>
    </Stack>
  );
}

function ContentLayout({ align, children }) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems={align}
      sx={{ height: "calc(100% /3)" }}
    >
      {children}
    </Stack>
  );
}

function Content() {
  return (
    <Stack sx={{ height: "100%", zIndex: 1 }}>
      <ContentLayout align="flex-start">
        <Title />
      </ContentLayout>
      <ContentLayout align="center">
        <Radios />
      </ContentLayout>
      <ContentLayout align="flex-end">
        <Control />
      </ContentLayout>
    </Stack>
  );
}

export default function Cover() {
  const exit = {
    opacity: 0,
    scale: 1.5,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
    },
  };

  return (
    <Layout exit={exit}>
      <ThemeProvider theme={darkTheme}>
        <Background />
        <Content />
      </ThemeProvider>
    </Layout>
  );
}
