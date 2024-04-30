import * as React from "react";
import { Box, Stack, ThemeProvider, Tooltip } from "@mui/material";
import { Radio, RadioGroup } from "@mui/material";

import Layout from "../../components/layout/Layout";
import { darkTheme } from "../../utils/theme";

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
    background: "radial-gradient(transparent, transparent, rgb(0 0 0 / 0.35))",
  };
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <img src="./PJ28-2 とびら-1.webp" style={imgStyle} alt="" />
      <Box sx={gradientSx} />
    </Box>
  );
}

function Title(params) {}

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

// Cover name
function SubTitle(params) {}

function Control(params) {}

function ContentLayout({ justify, align, children }) {
  return (
    <Stack
      direction="row"
      justifyContent={justify}
      alignItems={align}
      sx={{ flexGrow: 1 }}
    >
      {children}
    </Stack>
  );
}

function Content() {
  return (
    <Stack sx={{ height: "100%" }}>
      <ContentLayout justify="center" align="flex-start"></ContentLayout>
      <ContentLayout justify="flex-end" align="center">
        <Radios />
      </ContentLayout>
      <ContentLayout justify="center" align="flex-end"></ContentLayout>
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
