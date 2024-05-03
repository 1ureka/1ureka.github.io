import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Divider, Stack, Typography } from "@mui/material";

import { TOOLS_TAB } from "../utils/store";
import { MotionStack } from "../components/Motion";
import { orchestrationVar, toolsItemVar } from "../components/Motion";

import Tabs from "./Tabs";
import Layout from "./Layout";
import Manager from "../components/manager/Manager";
import Tools from "../components/tools/Tools";

const intro = {
  manager: {
    title: "File Manager",
    info: `Synced in real-time with the backend, 
    manage the images in your album with ease, 
    facilitating effortless addition, updating, and deletion of images.`,
  },
  tools: {
    title: "Tools",
    info: `Dive into a toolkit featuring image conversion, compression, 
    and 3D utilities like height map to normal map conversion, 
    continually expanding with new features.`,
  },
};

function ContentTitle({ title }) {
  return (
    <MotionStack variants={toolsItemVar} sx={{ p: 3 }}>
      <Typography>{title}</Typography>
    </MotionStack>
  );
}

function ContentIntroTypo({ info }) {
  const sx = { flexGrow: 1, p: 3, alignItems: "center" };
  return (
    <MotionStack variants={toolsItemVar} sx={sx}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {info}
      </Typography>
    </MotionStack>
  );
}

function Content() {
  const containerSx = (theme) => ({
    backgroundColor: theme.palette.custom.content,
    flexGrow: 1,
    borderRadius: "0 50px 5px 5px",
  });

  const contentSx = {
    flexGrow: 1,
    p: 3,
    height: "1px",
  };

  const containerVar = orchestrationVar({ delay: 0.15, stagger: 0.05 });
  const tab = useRecoilValue(TOOLS_TAB);
  const { title, info } = intro[tab];

  return (
    <MotionStack sx={containerSx} variants={containerVar} key={title}>
      <Box sx={{ height: 55 }}></Box>
      <Stack direction="row" alignItems="flex-end" width="100%" gap={1}>
        <ContentTitle title={title} />
        <ContentIntroTypo info={info} />
      </Stack>
      <Divider flexItem variant="middle" />
      <Box sx={contentSx}>{tab === "manager" ? <Manager /> : <Tools />}</Box>
    </MotionStack>
  );
}

export default function Page() {
  const labels = ["Manager", "Tools"];
  const [tab, setTab] = useRecoilState(TOOLS_TAB);

  return (
    <Layout>
      <Tabs labels={labels} value={tab} onChange={(tab) => setTab(tab)} />
      <Content />
    </Layout>
  );
}
