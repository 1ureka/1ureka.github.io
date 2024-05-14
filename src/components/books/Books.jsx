import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, ButtonBase, Skeleton } from "@mui/material";

import { BOOKS_OPEN, BOOKS_ROWS, BOOKS_SELECTED } from "../../utils/store";
import { THEME } from "../../utils/store";
import { delay } from "../../utils/utils";
import { useImageLoad } from "../../utils/hooks";
import { MotionStack, booksItemVar } from "../Motion";

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

function Image({ category, name }) {
  const [src, state] = useImageLoad(category, name, "1K");

  const size = { width: "100%", height: "100%" };
  const imageSX = {
    borderRadius: "5px",
    objectFit: "cover",
    opacity: 0.95,
    ...size,
  };

  return (
    <Box sx={size}>
      {state ? (
        <img src={src} alt={`Thumbnail of ${name}`} style={imageSX} />
      ) : (
        <Skeleton animation="wave" variant="rounded" sx={size} />
      )}
    </Box>
  );
}

function Button({ category, name, index }) {
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
        <Image category={category} name={name} />
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
  }, [setOpen]);

  return (
    <Grid>
      {rows.map(({ category, name }, i) => (
        <Button key={name} category={category} name={name} index={i} />
      ))}
    </Grid>
  );
}
