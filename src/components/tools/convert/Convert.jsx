import * as React from "react";
import { useRecoilValue } from "recoil";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { THEME } from "../../../utils/store";
import { MotionPaper, MotionStack, toolsItemVar } from "../../Motion";

function Title() {
  return (
    <MotionStack variants={toolsItemVar}>
      <Typography variant="h6" sx={{ mx: 2 }} color="primary">
        Image Conversion
      </Typography>
    </MotionStack>
  );
}

function TypeSelect() {
  const [type, setType] = React.useState("webp");

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <FormControl sx={{ width: "47%" }} size="small">
      <InputLabel
        id="image-convert-to"
        sx={(theme) => theme.typography.caption}
      >
        Convert To
      </InputLabel>
      <Select
        labelId="image-convert-to"
        value={type}
        label="Convert To"
        onChange={handleChange}
        sx={(theme) => theme.typography.caption}
      >
        <MenuItem value={"webp"} sx={(theme) => theme.typography.caption}>
          webp
        </MenuItem>
        <MenuItem value={"jpg"} sx={(theme) => theme.typography.caption}>
          jpg
        </MenuItem>
        <MenuItem value={"png"} sx={(theme) => theme.typography.caption}>
          png
        </MenuItem>
      </Select>
    </FormControl>
  );
}

function Operation() {
  return (
    <MotionStack
      variants={toolsItemVar}
      direction="row"
      justifyContent={"space-between"}
      width={"100%"}
      sx={{ position: "relative" }}
    >
      <Button
        variant="contained"
        sx={(theme) => ({ width: "47%", ...theme.typography.caption })}
      >
        Convert
      </Button>
      <TypeSelect />
    </MotionStack>
  );
}

function InputArea() {
  const theme = useRecoilValue(THEME);

  return (
    <MotionStack
      variants={toolsItemVar}
      sx={{
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: "10px",
        border: "3px dotted gray",
        bgcolor: theme.palette.divider,
        cursor: "pointer",
      }}
    ></MotionStack>
  );
}

export default function Convert() {
  return (
    <MotionPaper variants={toolsItemVar} sx={{ p: 3 }} elevation={3}>
      <Stack alignItems="center" gap={2}>
        <Title />
        <Divider flexItem />
        <InputArea />
        <Operation />
      </Stack>
    </MotionPaper>
  );
}
