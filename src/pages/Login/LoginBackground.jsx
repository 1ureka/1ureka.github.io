import { useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { Box, useMediaQuery } from "@mui/material";

import gsap from "gsap/gsap-core";
import AsyncImage from "../../components/AsyncImage";

function BackgroundIntro() {
  const matches = useMediaQuery("(min-width:1600px)");

  return (
    <Typography
      variant={matches ? "h4" : "h5"}
      component={"h2"}
      sx={{ fontFamily: "Comfortaa", color: "white" }}
    >
      P17 is the first piece included in the portfolio, inspired by the anime
      <i> {"Girls' Last Tour"}</i>.
    </Typography>
  );
}

function BackgroundImage() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      <AsyncImage
        src={"/images/background/login.webp"}
        alt=""
        style={{
          objectFit: "cover",
          filter: "brightness(1.5) contrast(1.12)",
        }}
      />
    </Box>
  );
}

function useAnimation(containerRef, matches) {
  useEffect(() => {
    if (!matches) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const container = containerRef.current;
    const total = 50;

    gsap.set(container, { perspective: 600 });

    let divs = [];
    let tls = [];

    const style = {
      width: "5px",
      height: "5px",
      position: "fixed",
      borderRadius: "100%",
      backdropFilter: "blur(10px) brightness(2)",
    };

    for (let i = 0; i < total; i++) {
      const div = document.createElement("div");
      gsap.set(div, {
        ...style,
        x: R(0, w),
        y: R(-200, -150),
        z: R(-200, 200),
      });
      container.appendChild(div);
      animm(div);
      divs.push(div);
    }

    function animm(elm) {
      const tl = gsap
        .timeline()
        .to(elm, {
          duration: R(15, 23),
          y: h + 200,
          ease: "none",
          repeat: -1,
          delay: -200,
        })
        .to(
          elm,
          {
            duration: R(4, 8),
            x: "+=100",
            rotationZ: R(0, 180),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
          "<"
        )
        .to(
          elm,
          {
            duration: R(2, 8),
            rotationX: R(0, 360),
            rotationY: R(0, 360),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: -5,
          },
          "<"
        );

      tls.push(tl);
    }

    function R(min, max) {
      return min + Math.random() * (max - min);
    }

    return () => {
      tls.forEach((tl) => tl.kill());
      divs.forEach((div) => div.remove());
    };
  }, [containerRef, matches]);
}

function BackgroundParticle() {
  const containerRef = useRef(null);
  const matches = useMediaQuery("(min-width:1000px)");

  useAnimation(containerRef, matches);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        userSelect: "none",
        pointerEvents: "none",
      }}
    ></Box>
  );
}

export default function Background() {
  return (
    <>
      <BackgroundImage />
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: 30,
          maxWidth: "70%",
        }}
      >
        <BackgroundIntro />
      </Box>
      <BackgroundParticle />
    </>
  );
}
