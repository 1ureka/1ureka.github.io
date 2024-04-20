import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilValueLoadable } from "recoil";

import { Box } from "@mui/material";
import AsyncImage from "../../components/AsyncImage";

import { ALBUM_ROWS, THUMBNAILS } from "../../utils/store";
import gsap from "gsap";

function FillBox({ color }) {
  const sx = {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    backgroundColor: `${color}.main`,
  };

  return <Box sx={sx}></Box>;
}

function ImageBox({ name }) {
  const dataUrl = useRecoilValueLoadable(THUMBNAILS(name));
  return (
    <AsyncImage src={dataUrl.state === "hasValue" ? dataUrl.contents : ""} />
  );
}

function Wrapper({ children }) {
  const sx = (theme) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    boxShadow: theme.shadows[3],
    borderRadius: "5px",
  });

  return <Box sx={sx}>{children}</Box>;
}

function Boxes({ names }) {
  const heights = [1.5, 1, 2.75, 1.75, 2, 1];
  const styles = heights.map((value) => ({
    height: `${value * 10}%`,
    width: "100%",
    py: 1,
  }));

  const configs = [
    { sx: styles[0], e: <ImageBox name={names[0]} /> },
    { sx: styles[1], e: <FillBox color="primary" /> },
    { sx: styles[2], e: <ImageBox name={names[1]} /> },
    { sx: styles[3], e: <ImageBox name={names[2]} /> },
    { sx: styles[4], e: <ImageBox name={names[3]} /> },
    { sx: styles[1], e: <FillBox color="secondary" /> },
  ];

  return configs.map(({ sx, e }, i) => (
    <Box key={i} sx={sx}>
      <Wrapper>{e}</Wrapper>
    </Box>
  ));
}

function useAnimation(ref1, ref2) {
  useEffect(() => {
    const tl = gsap
      .timeline({ repeat: -1, defaults: { ease: "none", duration: 20 } })
      .to([ref1.current, ref2.current], { yPercent: -100 });
    return () => tl.kill();
  }, [ref1, ref2]);
}

export default function Background() {
  const rows = useRecoilValue(ALBUM_ROWS);
  const names = gsap.utils.shuffle(rows.map((item) => item.name));

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useAnimation(ref1, ref2);

  return (
    <>
      <Box sx={{ height: "100%" }} ref={ref1}>
        <Boxes names={names} />
      </Box>
      <Box sx={{ height: "100%" }} ref={ref2}>
        <Boxes names={names} />
      </Box>
    </>
  );
}
