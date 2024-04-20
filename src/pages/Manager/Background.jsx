import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
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

function getBoxes() {
  const rows = useRecoilValue(ALBUM_ROWS);
  const random = gsap.utils.shuffle(rows.map((item) => item.name));
  const names = random.slice(0, 4);

  const heights = [1.5, 1, 2.75, 1.75, 2, 1];
  const config = heights.map((value) => {
    return {
      height: `${value * 10}%`,
      width: "100%",
      py: 1,
    };
  });

  const elements = [
    <ImageBox name={names[0]} />,
    <FillBox color="primary" />,
    <ImageBox name={names[1]} />,
    <ImageBox name={names[2]} />,
    <ImageBox name={names[3]} />,
    <FillBox color="secondary" />,
  ];

  return [config, elements];
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
  const [config, elements] = getBoxes();

  const theme = useTheme();
  const wrapperSx = {
    position: "relative",
    width: "100%",
    height: "100%",
    boxShadow: theme.shadows[3],
    borderRadius: "5px",
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  useAnimation(ref1, ref2);

  return (
    <>
      <Box sx={{ height: "100%" }} ref={ref1}>
        {config.map((sx, i) => (
          <Box key={i} sx={sx}>
            <Box sx={wrapperSx}>{elements[i]}</Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ height: "100%" }} ref={ref2}>
        {config.map((sx, i) => (
          <Box key={i} sx={sx}>
            <Box sx={wrapperSx}>{elements[i]}</Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
