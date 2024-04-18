import React, { useEffect, useRef, useState } from "react";
import { Grow, Stack, Tooltip, useMediaQuery } from "@mui/material";
import { Avatar, Box, Divider, IconButton } from "@mui/material";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import EnhancedTable from "./Table";
import DialogA from "./DialogA";
import DialogD from "./DialogD";
import AddButton from "./AddButton";
import VerifyDialog from "./VerifyButton";

import { TransitionGroup } from "react-transition-group";
import { useNavigateTo } from "../../utils/hooks";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MANAGER_CATEGORY, MANAGER_HEADER_H } from "../../utils/store";
import { TABLE_PAGE, TABLE_SELECTED } from "../../utils/store";

//
// Element
function Title() {
  const ref = useRef(null);
  const setHeight = useSetRecoilState(MANAGER_HEADER_H);

  useEffect(() => {
    setHeight(`${ref.current.offsetHeight}px`);
  }, [ref]);

  const sx = {
    position: "fixed",
    left: 0,
    p: "30px",
    zIndex: 2,
  };
  const AvaterSx = {
    width: 70,
    height: 70,
    translate: "0px -7px",
    filter:
      "drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.5)) drop-shadow(4px 4px 1px rgba(0, 0, 0, 0.35))",
  };
  return (
    <Stack spacing={1} direction="row" alignItems="center" sx={sx} ref={ref}>
      <Avatar src={"/favicon.png"} sx={AvaterSx} />
      <Typography variant="h5" component="h1" sx={{ fontFamily: "Comfortaa" }}>
        {"1ureka's CG"}
      </Typography>
    </Stack>
  );
}
//
// Manager
function ManagerTitle() {
  return (
    <Stack>
      <Typography variant="h5" component={"h1"}>
        File Manager
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        {"Here's a list of all the images in the album!"}
      </Typography>
    </Stack>
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

function ManagerHeader({ onAdd }) {
  const navigate = useNavigateTo("/");
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={10}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Tooltip title={"Go Back"}>
          <IconButton onClick={navigate}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </Tooltip>
        <ManagerTitle />
      </Stack>
      <AddButton onAdd={onAdd} />
    </Stack>
  );
}

function ManagerFooter() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <ManagerToggles />
      <VerifyDialog />
    </Stack>
  );
}

function ManagerContent() {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openDelDialog, setOpenDelDialog] = useState(false);

  const [addImgs, setAddImgs] = useState([]);
  const handleOpenAddDialog = (list) => {
    setAddImgs(list);
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  const handleOpenDelDialog = () => {
    setOpenDelDialog(true);
  };
  const handleCloseDelDialog = () => {
    setOpenDelDialog(false);
  };

  return (
    <Box maxWidth={"md"}>
      <ManagerHeader onAdd={handleOpenAddDialog} />
      <Divider sx={{ my: 2 }} variant="middle" />
      <EnhancedTable onDelete={handleOpenDelDialog} />
      <Divider sx={{ my: 2 }} variant="middle" />
      <ManagerFooter />
      <DialogD open={openDelDialog} onClose={handleCloseDelDialog} />
      <DialogA
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        list={addImgs}
      />
    </Box>
  );
}

//
// Content
function LeftComponents() {
  const headerHeight = useRecoilValue(MANAGER_HEADER_H);
  const theme = useTheme();
  const backgroundColor = alpha(theme.palette.background.default, 0.85);

  const placeholderSx = {
    height: headerHeight,
    position: "sticky",
    top: 0,
    backgroundColor,
    zIndex: 1,
  };
  const containerSx = {
    minHeight: `calc(100% - ${headerHeight} - ${headerHeight})`,
  };

  const headerPlaceholder = <Box sx={placeholderSx}></Box>;
  const managerContent = (
    <Stack sx={containerSx} justifyContent={"center"}>
      <ManagerContent />
    </Stack>
  );

  return (
    <Box sx={{ width: "calc(100% - 530px)", height: "100%" }}>
      {headerPlaceholder}
      {managerContent}
    </Box>
  );
}

function RightComponents() {
  const theme = useTheme();
  const containerSx = {
    position: "sticky",
    top: 0,
    width: "450px",
    height: "100%",
    backgroundColor: "gray",
    boxShadow: theme.shadows[5],
  };

  return <Box sx={containerSx}></Box>;
}

export default function Manager() {
  const containerSx = {
    position: "absolute",
    inset: 0,
    pl: "8.5%",
    pr: "6%",
    overflow: "auto",
    scrollbarGutter: "stable",
  };

  const content = (
    <Stack direction={"row"} sx={containerSx} justifyContent={"space-between"}>
      <Title />
      <LeftComponents />
      <RightComponents />
    </Stack>
  );

  return (
    <TransitionGroup component={null}>
      <Grow>{content}</Grow>
    </TransitionGroup>
  );
}
