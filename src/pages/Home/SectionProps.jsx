import React from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import { ImageList, ImageListItem, Box, Tooltip } from "@mui/material";
import { Card, CardContent, CardActions, Button, Divider } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import AsyncImage from "../../components/AsyncImage";
import gsap from "gsap";

import { useNavigateTo } from "../../utils/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ALBUM_CATEGORY, ALBUM_SELECTED } from "../../utils/store";
import { HOME_IS_AUTH } from "../../utils/store";

const background = "/images/background/gridV.png";
const status1 = "/images/clip/status1.webp";
const status2 = "/images/clip/status2.webp";
const status3 = "/images/clip/status3.webp";
const prop1 = "/images/clip/prop1.webp";
const prop2 = "/images/clip/prop2.webp";
const prop3 = "/images/clip/prop3.webp";

//
// Contents(Elements)
function IntroCardAction() {
  const isAuth = useRecoilValue(HOME_IS_AUTH);
  const navigate = useNavigateTo("/album");
  const setCategory = useSetRecoilState(ALBUM_CATEGORY);
  const setSelected = useSetRecoilState(ALBUM_SELECTED);
  const handleClick = () => {
    setCategory("props");
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
  return (
    <Card
      sx={{
        py: 1,
        width: "450px",
        backdropFilter: "blur(15px)",
        backgroundColor: "appBar",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
      variant="outlined"
    >
      <CardContent>
        <Stack direction={"column"} spacing={1}>
          <Stack direction={"row"} alignItems={"flex-end"} spacing={2}>
            <Typography variant="h4" sx={{ color: "primary.main" }}>
              Props
            </Typography>
            <Typography variant="h5">PJ26</Typography>
          </Stack>

          <Divider flexItem sx={{ m: 0 }} />

          <Typography variant="body1">
            It includes a variety of models, from small screws to buildings, to
            meet outdoor scene requirements. It provides pre-packaged objects
            based on instances.
          </Typography>
        </Stack>
      </CardContent>

      <IntroCardAction />
    </Card>
  );
}

function Background() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "visible",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <img
        src={background}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Box>
  );
}

//
// Contents(Logic)
function useAnimation(ref1, ref2) {
  React.useEffect(() => {
    const init = () => {
      if (ref1.current)
        gsap.set(ref1.current, {
          y: -20,
          rotate: "0deg",
          scaleX: -1.35,
          scaleY: 1.35,
        });
      if (ref2.current)
        gsap.set(ref2.current, {
          y: 20,
          rotate: "-15deg",
          scaleX: -1.25,
          scaleY: 1.25,
        });
    };

    init();

    const tl = gsap
      .timeline({ repeat: -1, yoyo: true })
      .to(
        ref1.current,
        {
          ease: "power1.inOut",
          duration: 3.75,
          y: 20,
          rotate: "5deg",
        },
        "<"
      )
      .to(
        ref2.current,
        {
          ease: "power1.inOut",
          duration: 3.75,
          y: -20,
          rotate: "-20deg",
        },
        "<"
      );

    return () => {
      tl.kill();
      init();
    };
  }, [ref1, ref2]);
}

function Images() {
  const matche1 = useMediaQuery("(min-width:1400px)");
  const matche2 = useMediaQuery("(min-width:1100px)");
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);

  useAnimation(ref1, ref2);

  const style1 = { objectFit: "contain" };
  const style2 = { display: matche1 ? "block" : "none", objectFit: "contain" };
  const styleM = { ...style1, scale: matche2 ? "1" : "1.5" };
  const styleL = { ...style2, scale: "-1.2 1.2" };
  const styleR = {
    ...style2,
    objectPosition: "bottom",
    transform: "scale(1.2) translate(-45px) rotate(-10deg)",
    maskImage:
      "linear-gradient(rgb(0 0 0 / 1), rgb(0 0 0 / 1), rgb(0 0 0 / 0.7),rgb(0 0 0 / 0))",
  };

  const imageListItems = [
    { c: 3, r: 2, e: <AsyncImage ref={ref1} src={prop1} style={style2} /> },
    { c: 2, r: 4, e: <AsyncImage src={status1} style={styleM} /> },
    { c: 1, r: 1, e: null },
    { c: 2, r: 4, e: <AsyncImage src={status2} style={styleM} /> },
    { c: 1, r: 1, e: null },
    { c: 2, r: 4, e: <AsyncImage src={status3} style={styleM} /> },
    { c: 3, r: 4, e: <AsyncImage src={prop3} style={styleR} /> },
    { c: 3, r: 2, e: <AsyncImage ref={ref2} src={prop2} style={styleL} /> },
  ];

  return (
    <ImageList
      sx={{
        minWidth: matche2 ? "2100px" : "1400px",
        position: "absolute",
        filter: "drop-shadow(0px 0px 10px black)",
        overflow: "visible",
        pt: 10,
      }}
      variant="quilted"
      cols={14}
      rowHeight={150}
      gap={20}
    >
      {imageListItems.map(({ c, r, e }, index) => (
        <ImageListItem key={index} cols={c} rows={r}>
          {e}
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default function Content() {
  return (
    <React.Fragment>
      <Background />
      <Images />
      <IntroCard />
    </React.Fragment>
  );
}
