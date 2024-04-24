import * as React from "react";
import { Stack, Typography } from "@mui/material";
import { Card, CardActions, CardContent, useMediaQuery } from "@mui/material";
import { ImageList, ImageListItem } from "@mui/material";
import { Button, Divider, Box, Tooltip } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AsyncImage from "../../components/AsyncImage";

import gsap from "gsap";
import { useNavigateTo } from "../../utils/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ALBUM_CATEGORY, ALBUM_SELECTED, THEME } from "../../utils/store";
import { HOME_IS_AUTH } from "../../utils/store";

//
// Contents(Elements)
function IntroCardAction() {
  const isAuth = useRecoilValue(HOME_IS_AUTH);
  const navigate = useNavigateTo("/album");
  const setCategory = useSetRecoilState(ALBUM_CATEGORY);
  const setSelected = useSetRecoilState(ALBUM_SELECTED);
  const handleClick = () => {
    setCategory("scene");
    setSelected(0);
    navigate();
  };

  return (
    <CardActions>
      <Tooltip title={isAuth ? "Enter Album" : "Sign in Required"}>
        <Box sx={{ mx: 1, width: "100%" }}>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            endIcon={<ArrowForwardIosRoundedIcon />}
            onClick={handleClick}
            disabled={!isAuth}
          >
            <Typography variant="button" sx={{ translate: "0 1px" }}>
              more
            </Typography>
          </Button>
        </Box>
      </Tooltip>
    </CardActions>
  );
}

function IntroCard() {
  const sx = {
    position: "absolute",
    zIndex: 1,
    py: 1,
    width: "100%",
    maxWidth: "100vw",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "transparent",
  };
  return (
    <Card sx={sx} variant="outlined">
      <CardContent>
        <Stack direction={"column"} spacing={1}>
          <Stack direction={"row"} alignItems={"flex-end"} spacing={2}>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              Scene
            </Typography>
            <Typography variant="h5">PJ27, 28</Typography>
          </Stack>

          <Divider flexItem sx={{ m: 0 }} />

          <Typography variant="body1">
            Reimagining classic scenes from anime and games with a realistic
            touch, along with original works inspired by Japan’s countryside.
          </Typography>
        </Stack>
      </CardContent>

      <IntroCardAction />
    </Card>
  );
}

function FillBox({ sx }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "5px",
        ...sx,
      }}
    ></Box>
  );
}

function ClipBox({ sx, src }) {
  const matche = useMediaQuery("(min-width:1200px)");

  const theme = useRecoilValue(THEME);
  const filter =
    theme === "dark"
      ? "drop-shadow(0px 0px 10px black)"
      : "drop-shadow(0px 0px 6px rgb(0 0 0 / 0.5))";

  const style = {
    position: "absolute",
    width: "300px",
    height: "500px",
    display: matche ? "flex" : "none",
    pointerEvents: "none",
    objectFit: "contain",
    filter,
    ...sx,
  };

  return <AsyncImage src={src} style={style} />;
}

//
// Contents(Logic)
function useAnimation(refs, onHideAtIndex) {
  React.useEffect(() => {
    const elements = refs.current;
    let elementsIndex = -1;

    const updateIndex = () => {
      elementsIndex += 1;
      onHideAtIndex(elementsIndex);
    };
    const frame1 = {
      scale: 0.75,
      filter: "blur(15px)",
      opacity: 0,
      ease: "power2.in",
    };
    const frame2 = {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      ease: "power2.out",
      onStart: updateIndex,
    };
    const tl = gsap.to(elements, {
      repeatDelay: 1,
      repeat: -1,
      duration: 2,
      stagger: { amount: 2.7 },
      keyframes: [frame1, frame2],
      onRepeat: () => (elementsIndex = -1),
    });

    return () => tl.kill();
  }, [refs, onHideAtIndex]);
}

function ContentItems({ indexes, refs }) {
  const colorP = { backgroundColor: "primary.main" };
  const colorS = { backgroundColor: "secondary.main" };
  const imageSrc = (i) => `/images/clip2/scene${indexes[i] + 1}-${i + 1}.webp`;
  const img = (i, opacity) => (
    <AsyncImage
      src={imageSrc(i)}
      ref={(node) => (refs.current[i] = node)}
      style={{
        borderRadius: "5px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        maskImage: `linear-gradient(rgb(0 0 0 / ${opacity}), rgb(0 0 0 / ${opacity}))`,
      }}
    />
  );

  const itemListConfig = [
    { c: 4, r: 6 },
    { c: 2, r: 2, e: <FillBox sx={colorS} /> },
    { c: 1, r: 2, e: img(0) },
    { c: 2, r: 1, e: img(1) },
    { c: 1, r: 1, e: img(2) },
    { c: 4, r: 6 },
    { c: 1, r: 1, e: img(3) },
    { c: 2, r: 1, e: <FillBox sx={colorP} /> },
    { c: 1, r: 2, e: img(4) },
    { c: 4, r: 2, e: img(5, 0.375) },
    { c: 1, r: 2, e: img(6) },
    { c: 1, r: 2, e: <FillBox sx={colorS} /> },
    { c: 2, r: 1, e: <FillBox sx={colorP} /> },
    { c: 2, r: 2, e: img(7) },
    { c: 1, r: 2, e: <FillBox sx={colorS} /> },
    { c: 2, r: 1, e: img(8) },
  ];

  const sx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageListItems = itemListConfig.map(({ c, r, e }, i) => (
    <ImageListItem key={i} cols={c} rows={r} sx={sx}>
      {e}
      {i === 9 ? <IntroCard /> : ""}
    </ImageListItem>
  ));

  return <>{imageListItems}</>;
}

function Content() {
  const [indexes, setIndexes] = React.useState(Array(9).fill(0));

  const handleHideAtIndex = React.useCallback((index) => {
    setIndexes((prev) => {
      const indexes = [...prev];
      indexes[index] = (indexes[index] + 1) % 3;
      return indexes;
    });
  }, []);

  const refs = React.useRef([]);
  useAnimation(refs, handleHideAtIndex);

  return (
    <ImageList
      variant="quilted"
      cols={14}
      rowHeight={130}
      gap={20}
      sx={{ minWidth: "2100px" }}
    >
      <ContentItems indexes={indexes} refs={refs} />
    </ImageList>
  );
}

//
// Page
export function BackElements() {
  const sx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pt: 10,
  };

  return (
    <Box sx={sx}>
      <Content />
    </Box>
  );
}

export function FrontElements() {
  const sx1 = { top: 100, left: 50, scale: "-1" };
  const sx2 = { bottom: 100, right: 50 };
  return (
    <>
      <ClipBox sx={sx1} src="/images/clip/cam.png" />
      <ClipBox sx={sx2} src="/images/clip/cam.png" />
    </>
  );
}
