import { useEffect, useState } from "react";
import { Box, Grow } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { useSetRecoilState } from "recoil";
import { HOME_IS_AUTH } from "../../utils/store";

import Header from "./Header";
import SectionIntro from "./SectionIntro";
import SectionProps from "./SectionProps";
import { FrontElements, BackElements } from "./SectionScene";

import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { styles, useScrollTo } from "./useScrollTo";

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
    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%),
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
  const bgStyle = { backgroundColor: "background.default" };

  const contents = (
    <div className={styles.contents}>
      <FrontElements />
    </div>
  );

  return (
    <div id="Scene" className={styles.section}>
      <Wrapper>
        <Box className={styles.background} sx={bgStyle}>
          {contents}
          <BackElements />
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

function useScrollTrigger(entered) {
  const scrollTo = useScrollTo();

  useEffect(() => {
    if (!entered) return;
    gsap.registerPlugin(Observer);

    const wrap = gsap.utils.wrap(0, 3);

    const handleDown = () =>
      scrollTo((current) => ({
        target: wrap(current - 1),
        direction: -1,
      }));
    const handleUp = () =>
      scrollTo((current) => ({
        target: wrap(current + 1),
        direction: 1,
      }));

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: handleDown,
      onUp: handleUp,
      tolerance: 10,
      preventDefault: true,
    });

    scrollTo((current) => ({
      target: current,
      direction: 1,
      isReset: true,
    }));

    return () => {
      observer?.kill();
    };
  }, [scrollTo, entered]);
}

export default function Home() {
  useAuth();

  const [entered, setEntered] = useState(false);
  const handleEntered = () => setEntered(true);
  useScrollTrigger(entered);

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
