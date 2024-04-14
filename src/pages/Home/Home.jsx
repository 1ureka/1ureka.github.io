import { useEffect, useState } from "react";
import { Box, Grow } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HOME_IS_AUTH, HOME_IS_SCROLLING, HOME_PAGE } from "../../utils/store";

import Header from "./Header";
import SectionIntro from "./SectionIntro";
import SectionScene from "./SectionScene";
import SectionProps from "./SectionProps";
import { SceneBackground } from "./SectionScene";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { styles, useScrollAnimation } from "./useScrollAnimation";

function useAuth() {
  const setIsAuth = useSetRecoilState(HOME_IS_AUTH);

  useEffect(() => {
    setIsAuth(sessionStorage.getItem("auth") ? true : false);
  }, [setIsAuth]);
}

function Wrapper({ children }) {
  return (
    <div className={styles.wraper1}>
      <div className={styles.wraper2}>{children}</div>
    </div>
  );
}

function ContainerIntro() {
  const bgStyle = {
    backgroundImage: `linear-gradient( 180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100% ),
    url(https://fakeimg.pl/1920x1080/?text=こんにちは&font=noto)`,
  };

  const contents = (
    <div className={styles.contents}>
      <SectionIntro />
    </div>
  );

  return (
    <div id="Intro" className={styles.section}>
      <Wrapper>
        <div className={styles.background} style={bgStyle}>
          {contents}
        </div>
      </Wrapper>
    </div>
  );
}

function ContainerScene() {
  const contents = (
    <div className={styles.contents}>
      <SectionScene />
    </div>
  );

  return (
    <div id="Scene" className={styles.section}>
      <Wrapper>
        <Box
          className={styles.background}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.default,
          })}
        >
          <SceneBackground />
          {contents}
        </Box>
      </Wrapper>
    </div>
  );
}

function ContainerProps() {
  const bgStyle = {
    backgroundColor: "background.default",
    backgroundImage: `url(./images/background/gridV.png)`,
  };

  const contents = (
    <div className={styles.contents}>
      <SectionProps />
    </div>
  );

  return (
    <div id="Props" className={styles.section}>
      <Wrapper>
        <Box className={styles.background} sx={bgStyle}>
          {contents}
        </Box>
      </Wrapper>
    </div>
  );
}

export default function Home() {
  gsap.registerPlugin(Observer);

  useAuth();

  const [isScrolling, setIsScrolling] = useRecoilState(HOME_IS_SCROLLING);
  const setHomePage = useSetRecoilState(HOME_PAGE);
  const wrap = gsap.utils.wrap(0, 3);

  useEffect(() => {
    const handleDown = () => {
      if (isScrolling) return;
      setIsScrolling(true);
      setHomePage((prev) => ({
        current: prev.target,
        target: wrap(prev.target - 1),
        direction: -1,
      }));
    };

    const handleUp = () => {
      if (isScrolling) return;
      setIsScrolling(true);
      setHomePage((prev) => ({
        current: prev.target,
        target: wrap(prev.target + 1),
        direction: 1,
      }));
    };

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: handleDown,
      onUp: handleUp,
      tolerance: 10,
      preventDefault: true,
    });

    return () => {
      observer.kill();
    };
  }, [isScrolling, setIsScrolling, setHomePage, wrap]);

  const [entered, setEntered] = useState(false);
  const handleEntered = () => setEntered(true);
  useScrollAnimation(entered);

  return (
    <TransitionGroup component={null}>
      <Grow onEntered={handleEntered}>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
          }}
        >
          <Header />
          <ContainerIntro />
          <ContainerScene />
          <ContainerProps />
        </Box>
      </Grow>
    </TransitionGroup>
  );
}
