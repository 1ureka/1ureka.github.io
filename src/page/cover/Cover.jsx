import { Box, Stack } from "@mui/material";
import Layout from "../../components/layout/Layout";

function Background() {
  const imgStyle = { width: "100%", height: "100%", objectFit: "cover" };
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <img
        src="https://fakeimg.pl/1920x1080/?text=こんにちは&font=noto"
        alt=""
        style={imgStyle}
      />
    </Box>
  );
}

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
      <ContentLayout justify="flex-end" align="center"></ContentLayout>
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
      <Background />
      <Content />
    </Layout>
  );
}
