import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useRef } from "react";
import AsyncImage from "../../components/AsyncImage";
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

export default function Background() {
  const heights = [1.5, 1, 2.75, 1.75, 2, 1];

  const config = heights.map((value) => {
    return {
      height: `${value * 10}%`,
      width: "100%",
      py: 1,
    };
  });

  const elements = [
    <AsyncImage />,
    <FillBox color="primary" />,
    <AsyncImage />,
    <AsyncImage />,
    <AsyncImage />,
    <FillBox color="secondary" />,
  ];

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

  useEffect(() => {
    const tl = gsap
      .timeline({ repeat: -1, defaults: { ease: "none", duration: 15 } })
      .to([ref1.current, ref2.current], { yPercent: -100 });
    return () => tl.kill();
  }, [ref1, ref2]);

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
