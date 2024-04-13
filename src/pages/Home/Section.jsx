import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import SectionIntro from "./SectionIntro";
import SectionScene from "./SectionScene";
import SectionProps from "./SectionProps";

export default function Section({ type }) {
  const containerRef = useRef(null);
  const [isShow, setShow] = useState(false);

  const show = (entries) => {
    entries.forEach(({ isIntersecting }) => {
      setShow(isIntersecting);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(show, { threshold: 0.3 });
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  const sx = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    clipPath: "inset(0)",
    overflow: "hidden",
    opacity: isShow ? 1 : 0,
    filter: isShow ? "blur(0px)" : "blur(10px)",
    transition: `
      opacity 0.45s cubic-bezier(0.215, 0.61, 0.355, 1),
      filter 0.45s 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
      scale 0.45s 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)`,
  };

  return (
    <Box ref={containerRef} id={type} sx={sx}>
      {type === "Intro" ? <SectionIntro /> : ""}
      {type === "Scene" ? <SectionScene /> : ""}
      {type === "Props" ? <SectionProps /> : ""}
    </Box>
  );
}
