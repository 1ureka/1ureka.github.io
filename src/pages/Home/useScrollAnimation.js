import style from "./GSAP.module.css";
import gsap from "gsap";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HOME_IS_SCROLLING, HOME_PAGE } from "../../utils/store";

export const styles = style;

export function useScrollAnimation(entered) {
  const homePage = useRecoilValue(HOME_PAGE);
  const setIsScrolling = useSetRecoilState(HOME_IS_SCROLLING);

  useEffect(() => {
    setIsScrolling(true);

    if (!entered) return;

    const currentIndex = homePage.current;
    const index = homePage.target;
    if (currentIndex === index) {
      setIsScrolling(false);
      return;
    }

    const direction = homePage.direction;

    const sections = document.querySelectorAll(`.${style.section}`);
    const outerWrappers = gsap.utils.toArray(`.${style.wraper1}`);
    const innerWrappers = gsap.utils.toArray(`.${style.wraper2}`);
    const images = document.querySelectorAll(`.${style.background}`);
    const headings = gsap.utils.toArray(`.${style.contents}`);

    let fromTop = direction === -1;
    let dir = fromTop ? -1 : 1;
    let tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
    });

    if (currentIndex >= 0) {
      // The first time this function runs, current is -1
      gsap.set(sections[currentIndex], { zIndex: 0 });
      tl.to(images[currentIndex], { yPercent: -15 * dir }).set(
        sections[currentIndex],
        { autoAlpha: 0 }
      );
    }

    gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
    gsap.set(headings[index], { autoAlpha: 0, yPercent: 150 * dir });

    tl.fromTo(outerWrappers[index], { yPercent: 100 * dir }, { yPercent: 0 }, 0)
      .fromTo(
        innerWrappers[index],
        { yPercent: -100 * dir },
        { yPercent: 0 },
        0
      )
      .fromTo(
        images[index],
        { yPercent: 15 * dir },
        { yPercent: 0, onComplete: () => setIsScrolling(false) },
        0
      )
      .to(
        headings[index],
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 1.5,
          ease: "power2",
        },
        0.35
      );

    return () => {
      tl?.kill();
    };
  }, [homePage, setIsScrolling, entered]);
}
