import * as React from "react";
import { useRecoilValue } from "recoil";
import { Box, ButtonBase, Skeleton, Stack } from "@mui/material";
import { motion } from "framer-motion";

import { BOOKS_ROWS, THEME } from "../../utils/store";

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
    },
  },
};

function FakeImg() {
  return (
    <Skeleton
      variant="rounded"
      sx={{ width: "100%", height: "100%" }}
      animation="wave"
    />
  );
}

function Reflect({ hover, x, clipPath }) {
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

function Image() {
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
      <Reflect
        hover={hover}
        x={-30}
        clipPath={"polygon(35% 0, 50% 0, 25% 100%, 10% 100%)"}
      />
      <Reflect
        hover={hover}
        x={10}
        clipPath={"polygon(40% 0, 50% 0, 25% 100%, 15% 100%)"}
      />
    </MotionStack>
  );
}

function Grid({ children }) {
  const containerSx = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  };

  return <Box sx={containerSx}>{children}</Box>;
}

export default function Album() {
  const rows = useRecoilValue(BOOKS_ROWS);

  return (
    <Grid>
      {rows.map(({ name }) => (
        <Image key={name} />
      ))}
    </Grid>
  );
}
