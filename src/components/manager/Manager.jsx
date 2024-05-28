import { useRecoilState, useSetRecoilState } from "recoil";
import { Box, Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormControl, FormControlLabel, FormHelperText } from "@mui/material";
import { Stack, Typography } from "@mui/material";

import { MANAGER_CATEGORY } from "../../utils/store";
import { MANAGER_PAGE, MANAGER_SELECTED } from "../../utils/store";
import { MotionBox, MotionStack, managerItemVar } from "../Motion";

import Table from "./table/Table";
import AddButton from "./button/AddButton";
import VerifyButton from "./button/VerifyButton";

function Toggles() {
  const [category, setCategory] = useRecoilState(MANAGER_CATEGORY);
  const setPage = useSetRecoilState(MANAGER_PAGE);
  const setSelected = useSetRecoilState(MANAGER_SELECTED);

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

export default function Manager() {
  return (
    <Stack
      direction="row"
      sx={{ position: "relative", width: "100%", height: "100%" }}
    >
      <MotionStack variants={managerItemVar} sx={{ px: 4, py: 3 }} spacing={8}>
        <MotionStack variants={managerItemVar} gap={1} alignItems="flex-start">
          <Typography variant="subTitle2">CATEGORY:</Typography>
          <Toggles />
        </MotionStack>

        <MotionStack variants={managerItemVar} gap={1} alignItems="flex-start">
          <Typography variant="subTitle2">OPERATION:</Typography>
          <AddButton />
          <VerifyButton />
        </MotionStack>

        <Box sx={{ flexGrow: 1 }} />

        <MotionBox variants={managerItemVar}>
          <FormControl variant="standard">
            <FormControlLabel control={<Switch />} label={"dry mode"} />
            <FormHelperText>
              <Typography variant="caption">
                Simulates actions without affecting backend data.
              </Typography>
            </FormHelperText>
          </FormControl>
        </MotionBox>
      </MotionStack>

      <MotionStack
        variants={managerItemVar}
        sx={{
          flexGrow: 1,
          px: 8,
          py: 3,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Table />
      </MotionStack>
    </Stack>
  );
}
