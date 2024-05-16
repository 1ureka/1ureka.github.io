import * as React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Badge, Box, ButtonBase, Skeleton } from "@mui/material";
import { LayoutGroup } from "framer-motion";

import { BOOKS_OPEN, BOOKS_ROWS, BOOKS_SELECTED } from "../../utils/store";
import { BOOKS_FOLD, BOOKS_TAB, THEME } from "../../utils/store";
import { delay } from "../../utils/utils";
import { useImageLoad } from "../../utils/hooks";
import { MotionStack, booksItemVar, orchestrationVar } from "../Motion";

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

function GridItem({ category, name, onClick, amount }) {
  const [hover, setHover] = React.useState(false);
  return (
    <MotionStack
      layout
      variants={booksItemVar}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02, filter: "brightness(1.05)", rotate: 2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: "relative", overflow: "visible" }}
    >
      <Badge
        sx={{ width: "100%", aspectRatio: "16/9" }}
        badgeContent={amount}
        color="primary"
      >
        <ButtonBase sx={{ width: "100%", height: "100%" }} onClick={onClick}>
          <Image category={category} name={name} />
        </ButtonBase>
      </Badge>
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

function useGroup(isGrouping) {
  const rows = useRecoilValue(BOOKS_ROWS);

  const groups = {};
  rows.forEach((item, i) => {
    const matches = item.name.match(`^(.+)-\\d+`);
    const groupName = matches ? matches[1] : item.name;
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push({ ...item, i });
  });

  const length = isGrouping ? Object.keys(groups).length : rows.length;
  const variants = orchestrationVar({
    delay: 0,
    stagger: 0.3 / length,
  });

  return { groups, variants };
}

function useBookActions() {
  const [group, setGroup] = React.useState("");
  const setOpen = useSetRecoilState(BOOKS_OPEN);
  const setSelected = useSetRecoilState(BOOKS_SELECTED);

  React.useEffect(() => {
    return () => setOpen(false);
  }, [setOpen]);

  const handleGroupClick = (group) => async () => {
    await delay(200);
    setGroup(group);
  };

  const handleImageClick = (index) => async () => {
    await delay(200);
    setSelected(index);
    setOpen(true);
  };

  return { group, handleGroupClick, handleImageClick };
}

export default function Books() {
  const tab = useRecoilValue(BOOKS_TAB);
  const isFold = useRecoilValue(BOOKS_FOLD);
  const isGrouping = tab === "props" && isFold;

  const { groups, variants } = useGroup(isGrouping);
  const { group, handleGroupClick, handleImageClick } = useBookActions();

  const items = Object.entries(groups).map(([groupName, groupItems]) => {
    if (groupItems.length === 1 || groupName === group || !isGrouping)
      return groupItems.map(({ category, name, i }) => (
        <GridItem
          key={name}
          category={category}
          name={name}
          onClick={handleImageClick(i)}
          amount={0}
        />
      ));

    const { category, name } = groupItems[0];
    return (
      <GridItem
        key={name}
        category={category}
        name={name}
        onClick={handleGroupClick(groupName)}
        amount={groupItems.length}
      />
    );
  });

  return (
    <MotionStack variants={variants}>
      <Grid>
        <LayoutGroup>{items}</LayoutGroup>
      </Grid>
    </MotionStack>
  );
}
