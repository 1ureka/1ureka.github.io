import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, ButtonBase } from "@mui/material";

import { BOOKS_OPEN, BOOKS_ROWS, BOOKS_SELECTED } from "../../utils/store";
import { THEME } from "../../utils/store";
import { delay } from "../../utils/utils";
import { MotionStack, booksItemVar } from "../Motion";
import BooksImage from "./image/BooksImage";

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

function Image({ category, name, index }) {
  const [hover, setHover] = React.useState(false);
  const buttonSx = { width: "100%", aspectRatio: "16/9" };

  const setSelected = useSetRecoilState(BOOKS_SELECTED);
  const setOpen = useSetRecoilState(BOOKS_OPEN);
  const handleClick = async () => {
    await delay(200);
    setSelected(index);
    setOpen(true);
  };

  return (
    <MotionStack
      variants={booksItemVar}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02, filter: "brightness(1.05)", rotate: 2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <ButtonBase sx={buttonSx} onClick={handleClick}>
        <BooksImage category={category} name={name} />
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

export default function Books() {
  const rows = useRecoilValue(BOOKS_ROWS);
  const setOpen = useSetRecoilState(BOOKS_OPEN);

  React.useEffect(() => {
    return () => setOpen(false);
  }, []);

  return (
    <Grid>
      {rows.map(({ category, name }, i) => (
        <Image key={name} category={category} name={name} index={i} />
      ))}
    </Grid>
  );
}
