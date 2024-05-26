import * as React from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { Badge, Box, Skeleton } from "@mui/material";

import { THEME } from "../../../utils/store";
import { useBooksImageLoad } from "../../../utils/hooks";
import { MotionButtonBase, booksItemVar } from "../../Motion";

function Reflect({ hover, x, clipPath }) {
  const variants = {
    notHover: { opacity: 0, x: x - 60 },
    hover: { opacity: 1, x },
  };

  const theme = useRecoilValue(THEME);
  const style = {
    clipPath,
    zIndex: 1,
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    filter: "blur(35px)",
    background: `linear-gradient(150deg, ${theme.palette.divider}, transparent)`,
  };

  return (
    <motion.div
      variants={variants}
      animate={hover ? "hover" : "notHover"}
      style={style}
    />
  );
}

function Reflects({ hover }) {
  return (
    <>
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
    </>
  );
}

function Image({ category, name }) {
  const [src, state] = useBooksImageLoad(category, name, "1K");

  return (
    <Box sx={{ width: "100%", aspectRatio: "172/100" }}>
      {state ? (
        <img
          src={src}
          alt={`Thumbnail of ${name}`}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.95,
          }}
        />
      ) : (
        <Skeleton
          animation="wave"
          variant="rounded"
          sx={{ width: "100%", height: "100%" }}
        />
      )}
    </Box>
  );
}

function Button({ children, onClick, amount }) {
  const buttonSx = { borderRadius: "5px", overflow: "clip", width: "100%" };

  return (
    <motion.div
      style={{ width: "100%" }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02, filter: "brightness(1.05)", rotate: 2 }}
    >
      <Badge badgeContent={amount} color="primary" sx={{ width: "100%" }}>
        <MotionButtonBase sx={buttonSx} onClick={onClick}>
          {children}
        </MotionButtonBase>
      </Badge>
    </motion.div>
  );
}

export default function Preview({ category, name, onClick, amount }) {
  const [hover, setHover] = React.useState(false);

  return (
    <motion.div
      layout
      variants={booksItemVar}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Button onClick={onClick} amount={amount}>
        <Image category={category} name={name} />
        <Reflects hover={hover} />
      </Button>
    </motion.div>
  );
}
