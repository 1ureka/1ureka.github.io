import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Divider, Stack, Typography } from "@mui/material";

import { BOOKS_ROWS, BOOKS_TAB } from "../utils/store";
import { MotionStack } from "../components/Motion";
import { booksItemVar, orchestrationVar } from "../components/Motion";
import Tabs from "./Tabs";
import Layout from "./Layout";
import Books from "../components/books/Books";

const intro = {
  scene: {
    project: "PJ27, PJ28",
    info: `Reimagining classic scenes from anime and games with a realistic
      touch, along with original works inspired by Japan’s countryside.`,
  },
  props: {
    project: "PJ26",
    info: `It includes a variety of models, from small screws to buildings, 
      to meet outdoor scene requirements. It provides pre-packaged objects
      based on instances.`,
  },
};

function ContentIntroBox({ title, info }) {
  const fontSize = "0.65rem";
  const containerSx = { p: 3, alignItems: "flex-start" };

  return (
    <MotionStack variants={booksItemVar} sx={containerSx} gap={0.5}>
      <Typography variant="caption" sx={{ color: "text.secondary", fontSize }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ fontSize }}>
        {info}
      </Typography>
    </MotionStack>
  );
}

function ContentIntroTypo({ info }) {
  const sx = { flexGrow: 1, p: 3 };
  return (
    <MotionStack variants={booksItemVar} alignItems="center" sx={sx}>
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
    overflowY: "auto",
    scrollbarGutter: "stable",
  };

  const tab = useRecoilValue(BOOKS_TAB);
  const rows = useRecoilValue(BOOKS_ROWS);
  const { project, info } = intro[tab];
  const includes = `${rows.length} Images`;

  const containerVar = orchestrationVar({ delay: 0.15, stagger: 0.05 });
  const contentVar = orchestrationVar({ delay: 0, stagger: 0.3 / rows.length });

  return (
    <MotionStack sx={containerSx} variants={containerVar} key={project}>
      <Box sx={{ height: 55 }}></Box>
      <Stack direction="row" alignItems="flex-end" width="100%" gap={1}>
        <ContentIntroBox title={"PROJECTS:"} info={project} />
        <ContentIntroBox title={"INCLUDES:"} info={includes} />
        <ContentIntroTypo info={info} />
      </Stack>
      <Divider flexItem variant="middle" />
      <Box sx={contentSx}>
        <MotionStack variants={contentVar}>
          <Books />
        </MotionStack>
      </Box>
    </MotionStack>
  );
}

export default function Page() {
  const labels = ["Scene", "Props"];
  const [tab, setTab] = useRecoilState(BOOKS_TAB);

  return (
    <Layout>
      <Tabs labels={labels} value={tab} onChange={(tab) => setTab(tab)} />
      <Content />
    </Layout>
  );
}
