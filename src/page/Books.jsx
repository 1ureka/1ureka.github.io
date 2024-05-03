import * as React from "react";
import { useRecoilValue } from "recoil";
import { Typography } from "@mui/material";

import { BOOKS_ROWS, BOOKS_TAB } from "../utils/store";
import { MotionStack } from "../components/Motion";
import { booksItemVar, orchestrationVar } from "../components/Motion";

import Books from "../components/books/Books";
import Layout from "./Layout";

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

function IntroBox({ title, info }) {
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

function IntroTypo({ info }) {
  const sx = { flexGrow: 1, p: 3 };
  return (
    <MotionStack variants={booksItemVar} alignItems="center" sx={sx}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {info}
      </Typography>
    </MotionStack>
  );
}

function Header() {
  const tab = useRecoilValue(BOOKS_TAB);
  const rows = useRecoilValue(BOOKS_ROWS);
  const { project, info } = intro[tab];
  const includes = `${rows.length} Images`;

  return (
    <>
      <IntroBox title={"PROJECTS:"} info={project} />
      <IntroBox title={"INCLUDES:"} info={includes} />
      <IntroTypo info={info} />
    </>
  );
}

function Content() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const contentVar = orchestrationVar({
    delay: 0,
    stagger: 0.3 / rows.length,
  });

  return (
    <MotionStack variants={contentVar}>
      <Books />
    </MotionStack>
  );
}

export default function Page() {
  return (
    <Layout
      tabState={BOOKS_TAB}
      tabs={["Scene", "Props"]}
      header={<Header />}
      content={<Content />}
      scroll={true}
    />
  );
}
