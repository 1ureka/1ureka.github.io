import React, { useRef, useEffect } from "react";
import Header from "./Header";
import Section from "./Section";
import { scrollTo } from "../../utils/utils";
import { Box, Grow } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HOME_PAGE, HOME_IS_AUTH } from "../../utils/store";

export default function Home() {
  const containerRef = useRef(null);
  const [homePage, setHomePage] = useRecoilState(HOME_PAGE);
  const setIsAuth = useSetRecoilState(HOME_IS_AUTH);

  useEffect(() => {
    setHomePage("Intro");
  }, [setHomePage]);

  useEffect(() => {
    setIsAuth(sessionStorage.getItem("auth") ? true : false);
  }, [setIsAuth]);

  useEffect(() => {
    const snap = (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        setHomePage(target.id);
      });
    };

    let observer = new IntersectionObserver(snap, { threshold: 0.05 });

    (async function () {
      await scrollTo(document.getElementById(homePage), 0.65);

      if (!observer) return;

      observer.observe(document.getElementById("Intro"));
      observer.observe(document.getElementById("Scene"));
      observer.observe(document.getElementById("Props"));
    })();

    return () => {
      observer.disconnect();
      observer = null;
    };
  }, [homePage, setHomePage]);

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      e.preventDefault();
      container.scrollTo({
        top: container.scrollTop + e.deltaY,
        behavior: "smooth",
      });
    };

    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <TransitionGroup component={null}>
      <Grow>
        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none",
            width: "100%",
            height: "100%",
          }}
          ref={containerRef}
        >
          <Header />
          <Section type={"Intro"} />
          <Section type={"Scene"} />
          <Section type={"Props"} />
        </Box>
      </Grow>
    </TransitionGroup>
  );
}
