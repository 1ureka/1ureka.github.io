import * as React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Box,
  ButtonBase,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import { BOOKS_ROWS, BOOKS_TAB, THEME } from "../../utils/store";
import Tabs from "../../components/generic/Tabs";
import Layout from "../../components/generic/Layout";

const MotionStack = motion(Stack);

const intro = {
  scene: {
    project: "PJ27, PJ28",
    includes: "15 Images",
    info: `Reimagining classic scenes from anime and games with a realistic
      touch, along with original works inspired by Japan’s countryside.`,
  },
  props: {
    project: "PJ26",
    includes: "30 Images",
    info: `It includes a variety of models, from small screws to buildings, 
      to meet outdoor scene requirements. It provides pre-packaged objects
      based on instances.`,
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

function ContentIntroBox({ title, info }) {
  const fontSize = "0.65rem";
  const containerSx = { p: 3, alignItems: "flex-start" };

  return (
    <MotionStack variants={itemVariants} sx={containerSx} gap={0.5}>
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
    <MotionStack variants={itemVariants} alignItems="center" sx={sx}>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {info}
      </Typography>
    </MotionStack>
  );
}

function FakeImg() {
  return (
    <Skeleton
      variant="rounded"
      sx={{ width: "100%", height: "100%" }}
      animation="wave"
    />
  );
}

function ImageReflect({ hover, x, clipPath }) {
  const theme = useRecoilValue(THEME);

  const reflectVariants = {
    notHover: { opacity: 0, x: x - 60 },
    hover: { opacity: 1, x },
  };

  const background = `linear-gradient(150deg, ${theme.palette.divider}, transparent)`;

  return (
    <MotionStack
      variants={reflectVariants}
      animate={hover ? "hover" : "notHover"}
      sx={{
        zIndex: 1,
        pointerEvents: "none",
        position: "absolute",
        inset: 0,
        clipPath,
        background,
        filter: "blur(35px)",
      }}
    ></MotionStack>
  );
}

function AlbumImage() {
  const [hover, setHover] = React.useState(false);
  return (
    <MotionStack
      variants={itemVariants}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02, filter: "brightness(1.05)", rotate: 2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <ButtonBase sx={{ width: "100%", aspectRatio: "16/9" }}>
        <FakeImg />
      </ButtonBase>
      <ImageReflect
        hover={hover}
        x={-30}
        clipPath={"polygon(35% 0, 50% 0, 25% 100%, 10% 100%)"}
      />
      <ImageReflect
        hover={hover}
        x={10}
        clipPath={"polygon(40% 0, 50% 0, 25% 100%, 15% 100%)"}
      />
    </MotionStack>
  );
}

function Album() {
  const rows = useRecoilValue(BOOKS_ROWS);

  const containerSx = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  };

  return (
    <Box sx={containerSx}>
      {rows.map(({ name }) => (
        <AlbumImage key={name} />
      ))}
    </Box>
  );
}

function Content() {
  const tab = useRecoilValue(BOOKS_TAB);
  const rows = useRecoilValue(BOOKS_ROWS);

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

  const transition = { staggerChildren: 0.05, delayChildren: 0.15 };
  const variants = { animate: { transition } };
  const albumTransition = { staggerChildren: 0.3 / rows.length };
  const albumVariants = { animate: { transition: albumTransition } };

  return (
    <MotionStack sx={containerSx} variants={variants} key={intro[tab]?.project}>
      <Box sx={{ height: 55 }}></Box>
      <Stack direction="row" alignItems="flex-end" width="100%" gap={1}>
        <ContentIntroBox title={"PROJECTS:"} info={intro[tab]?.project} />
        <ContentIntroBox title={"INCLUDES:"} info={intro[tab]?.includes} />
        <ContentIntroTypo info={intro[tab]?.info} />
      </Stack>
      <Divider flexItem variant="middle" />
      <Box sx={contentSx}>
        <MotionStack variants={albumVariants}>
          <Album />
        </MotionStack>
      </Box>
    </MotionStack>
  );
}

export default function Books() {
  const labels = ["Scene", "Props"];
  const [tab, setTab] = useRecoilState(BOOKS_TAB);

  return (
    <Layout>
      <Tabs labels={labels} value={tab} onChange={(tab) => setTab(tab)} />
      <Content />
    </Layout>
  );
}
