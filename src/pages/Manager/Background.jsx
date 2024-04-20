import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRecoilValueLoadable } from "recoil";

import { Box } from "@mui/material";
import AsyncImage from "../../components/AsyncImage";

import { ALBUM_CATEGORY, INDEX, THUMBNAILS } from "../../utils/store";
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

function getBoxes() {
  const setCategory = useSetRecoilState(ALBUM_CATEGORY);
  setCategory("props");

  const index = useRecoilValue(INDEX);
  const filtered = index.filter(({ category }) => category === "props");
  const random = gsap.utils.shuffle(filtered.map((item) => item.name));
  const names = random.slice(0, 4);

  const url0 = useRecoilValueLoadable(THUMBNAILS(names[0]));
  const url1 = useRecoilValueLoadable(THUMBNAILS(names[1]));
  const url2 = useRecoilValueLoadable(THUMBNAILS(names[2]));
  const url3 = useRecoilValueLoadable(THUMBNAILS(names[3]));

  const heights = [1.5, 1, 2.75, 1.75, 2, 1];
  const config = heights.map((value) => {
    return {
      height: `${value * 10}%`,
      width: "100%",
      py: 1,
    };
  });

  const elements = [
    <AsyncImage src={url0.state === "hasValue" ? url0.contents : ""} />,
    <FillBox color="primary" />,
    <AsyncImage src={url1.state === "hasValue" ? url1.contents : ""} />,
    <AsyncImage src={url2.state === "hasValue" ? url2.contents : ""} />,
    <AsyncImage src={url3.state === "hasValue" ? url3.contents : ""} />,
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
