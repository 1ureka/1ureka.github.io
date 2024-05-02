import * as React from "react";
import { motion } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button, Stack, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import AddToPhotosRoundedIcon from "@mui/icons-material/AddToPhotosRounded";
import ImageSearchRoundedIcon from "@mui/icons-material/ImageSearchRounded";

import Table from "../../components/table/Table";
import { MANAGER_CATEGORY } from "../../utils/store";
import { TABLE_PAGE, TABLE_SELECTED } from "../../utils/store";

const MotionStack = motion(Stack);

const variants = {
  initial: {
    opacity: 0,
    y: 100,
    transition: { duration: 0 },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0 },
  },
};

function ManagerTitle({ title }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {title}
    </Typography>
  );
}

function ManagerToggles() {
  const [category, setCategory] = useRecoilState(MANAGER_CATEGORY);
  const setPage = useSetRecoilState(TABLE_PAGE);
  const setSelected = useSetRecoilState(TABLE_SELECTED);

  const handleChange = (_, category) => {
    if (!category) return;
    setPage(0);
    setSelected([]);
    setCategory(category);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={category}
      exclusive
      onChange={handleChange}
      size="small"
    >
      <ToggleButton value="scene" sx={{ py: 1 }}>
        Scene
      </ToggleButton>
      <ToggleButton value="props" sx={{ py: 1 }}>
        Props
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function ManagerAddButton() {
  return (
    <Button
      startIcon={<AddToPhotosRoundedIcon fontSize="small" />}
      sx={(theme) => theme.typography.caption}
    >
      Add Image
    </Button>
  );
}

function ManagerVerButton() {
  return (
    <Button
      startIcon={<ImageSearchRoundedIcon fontSize="small" />}
      sx={(theme) => theme.typography.caption}
    >
      Verify Integrity
    </Button>
  );
}

function ManagerOperation() {
  return (
    <>
      <MotionStack variants={variants} gap={1}>
        <ManagerTitle title="CATEGORY:" />
        <ManagerToggles />
      </MotionStack>
      <MotionStack variants={variants} gap={1} alignItems="flex-start">
        <ManagerTitle title="OPERATION:" />
        <ManagerAddButton />
        <ManagerVerButton />
      </MotionStack>
    </>
  );
}

function Decal({ sx, scale }) {
  const containerSx = {
    position: "absolute",
    bottom: 0,
    p: 1,
    pointerEvents: "none",
    ...sx,
  };

  return (
    <MotionStack variants={variants} sx={containerSx}>
      <img
        src="./decal3.png"
        alt=""
        style={{ width: "150px", scale, opacity: 0.2 }}
        decoding="async"
      />
    </MotionStack>
  );
}

export default function Manager() {
  return (
    <>
      <Stack
        direction="row"
        sx={{ position: "relative", width: "100%", height: "100%" }}
      >
        <Decal sx={{ left: 0 }} scale="1" />
        <Decal sx={{ right: 0 }} scale="-1 1" />
        <MotionStack
          variants={variants}
          sx={{ px: 4, py: 3, mr: 5 }}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          gap={8}
        >
          <ManagerOperation />
        </MotionStack>
        <MotionStack
          variants={variants}
          sx={{
            flexGrow: 1,
            px: "10%",
            py: 3.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Table />
        </MotionStack>
      </Stack>
    </>
  );
}
