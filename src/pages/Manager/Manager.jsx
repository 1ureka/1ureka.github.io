import { useState } from "react";
import { Grow, Stack, Tooltip } from "@mui/material";
import { Box, Container, Divider, IconButton } from "@mui/material";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

import EnhancedTable from "./Table";
import Background from "../../components/Background";
import DialogA from "./DialogA";
import DialogD from "./DialogD";
import AddButton from "./AddButton";
import VerifyDialog from "./VerifyButton";

import { TransitionGroup } from "react-transition-group";
import { useNavigateTo } from "../../utils/hooks";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MANAGER_CATEGORY } from "../../utils/store";
import { TABLE_PAGE, TABLE_SELECTED } from "../../utils/store";

//
// Element
function Title() {
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

function CategoryToggleButton() {
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

//
// Content
function ManagerHeader({ onAdd }) {
  const navigate = useNavigateTo("/");
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Tooltip title={"Go Back"}>
          <IconButton onClick={navigate}>
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </Tooltip>

        <Title />
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
      <CategoryToggleButton />
      <VerifyDialog />
    </Stack>
  );
}

export default function Manager() {
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
    <TransitionGroup component={null}>
      <Grow>
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
            scrollbarColor: "gray transparent",
          }}
        >
          <Container sx={{ py: 10 }}>
            <Background />
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
          </Container>
        </Box>
      </Grow>
    </TransitionGroup>
  );
}
