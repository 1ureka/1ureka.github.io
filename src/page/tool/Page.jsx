import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

import { TOOLS_TAB } from "../../utils/store";
import Tabs from "../../components/generic/Tabs";
import Layout from "../../components/generic/Layout";
import Manager from "./Manager";
import Tools from "./Tools";

const MotionStack = motion(Stack);

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

const itemVariants = {
  initial: { opacity: 0, y: 70, transition: { duration: 0 } },
  exit: { opacity: 0, y: 70, transition: { duration: 0 } },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

function ContentTitle({ title }) {
  return (
    <MotionStack variants={itemVariants} sx={{ p: 3 }}>
      <Typography>{title}</Typography>
    </MotionStack>
  );
}

function ContentIntroTypo({ info }) {
  const sx = { flexGrow: 1, p: 3, alignItems: "center" };
  return (
    <MotionStack variants={itemVariants} sx={sx}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {info}
      </Typography>
    </MotionStack>
  );
}

function Content() {
  const tab = useRecoilValue(TOOLS_TAB);

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

  const transition = { staggerChildren: 0.05, delayChildren: 0.15 };
  const variants = { animate: { transition } };

  return (
    <MotionStack sx={containerSx} variants={variants} key={intro[tab]?.title}>
      <Box sx={{ height: 55 }}></Box>
      <Stack direction="row" alignItems="flex-end" width="100%" gap={1}>
        <ContentTitle title={intro[tab]?.title} />
        <ContentIntroTypo info={intro[tab]?.info} />
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
