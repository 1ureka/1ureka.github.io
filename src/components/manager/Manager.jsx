import * as React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Stack, Typography } from "@mui/material";

import { MANAGER_CATEGORY } from "../../utils/store";
import { TABLE_PAGE, TABLE_SELECTED } from "../../utils/store";
import { MotionStack, managerItemVar } from "../Motion";

import Table from "./table/Table";
import AddButton from "./button/AddButton";
import VerifyButton from "./button/VerifyButton";
import { DialogDel } from "./dialog/Dialog";

function Title({ title }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {title}
    </Typography>
  );
}

function Toggles() {
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

function Operation() {
  return (
    <>
      <MotionStack variants={managerItemVar} gap={1}>
        <Title title="CATEGORY:" />
        <Toggles />
      </MotionStack>
      <MotionStack variants={managerItemVar} gap={1} alignItems="flex-start">
        <Title title="OPERATION:" />
        <AddButton />
        <VerifyButton />
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
    <MotionStack variants={managerItemVar} sx={containerSx}>
      <img
        src="./decal3.webp"
        alt=""
        style={{ width: "150px", scale, opacity: 0.2 }}
        decoding="async"
      />
    </MotionStack>
  );
}

export default function Manager() {
  const containerSx = { position: "relative", width: "100%", height: "100%" };

  const leftSx = {
    px: 4,
    py: 3,
    mr: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  };

  const rightSx = {
    flexGrow: 1,
    px: "10%",
    py: 3.5,
    height: "100%",
    overflowY: "auto",
  };

  const [open, setOpen] = React.useState(false);

  return (
    <Stack direction="row" sx={containerSx}>
      <Decal sx={{ left: 0 }} scale="1" />
      <Decal sx={{ right: 0 }} scale="-1 1" />
      <MotionStack variants={managerItemVar} sx={leftSx} gap={8}>
        <Operation />
      </MotionStack>
      <MotionStack variants={managerItemVar} sx={rightSx}>
        <Table onDelete={() => setOpen(true)} />
        <DialogDel open={open} onClose={() => setOpen(false)} />
      </MotionStack>
    </Stack>
  );
}
