import * as React from "react";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { THEME } from "../../utils/store";

const MotionPaper = motion(Paper);
const MotionStack = motion(Stack);

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
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

function ConvertTitle() {
  return (
    <MotionStack variants={itemVariants}>
      <Typography variant="h6" sx={{ mx: 2 }} color="primary">
        Image Conversion
      </Typography>
    </MotionStack>
  );
}

function ConvertSelect() {
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

function ConvertOperation() {
  return (
    <MotionStack
      variants={itemVariants}
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
      <ConvertSelect />
    </MotionStack>
  );
}

function ConvertContent() {
  const theme = useRecoilValue(THEME);
  return (
    <>
      <MotionStack
        variants={itemVariants}
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          borderRadius: "10px",
          border: "3px dotted gray",
          bgcolor: theme.palette.divider,
          cursor: "pointer",
        }}
      ></MotionStack>
      <ConvertOperation />
    </>
  );
}

function Convert() {
  return (
    <MotionPaper variants={itemVariants} sx={{ p: 3 }} elevation={3}>
      <Stack alignItems="center" gap={2}>
        <ConvertTitle />
        <Divider flexItem />
        <ConvertContent />
      </Stack>
    </MotionPaper>
  );
}

export default function Tools() {
  return (
    <Stack direction="row" flexWrap="wrap">
      <Convert />
    </Stack>
  );
}
