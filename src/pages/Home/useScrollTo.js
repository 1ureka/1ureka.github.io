import style from "./GSAP.module.css";
import gsap from "gsap";
import { useSetRecoilState } from "recoil";
import { HOME_PAGE } from "../../utils/store";

export const styles = style;

let isScrolling;
let current = 0;

export function useScrollTo() {
  const setPage = useSetRecoilState(HOME_PAGE);

  return (scrollFunction) => {
    if (isScrolling) return;
    isScrolling = true;

    const { target, direction, isReset } = scrollFunction(current);
    setPage(target);

    const handleComplete = () => {
      current = target;
      isScrolling = false;
    };

    if (target === current && !isReset) {
      handleComplete();
      return;
    }

    const dir = target === 0 ? -1 : direction;
    const sections = gsap.utils.toArray(`.${style.section}`);
    const outerWrappers = gsap.utils.toArray(`.${style.wraper1}`);
    const innerWrappers = gsap.utils.toArray(`.${style.wraper2}`);
    const backgrounds = gsap.utils.toArray(`.${style.background}`);
    const contents = gsap.utils.toArray(`.${style.contents}`);

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
    });

    if (!isReset) {
      gsap.set(sections[current], { zIndex: 0 });
      tl.to(backgrounds[current], { yPercent: -15 * dir });
      tl.set(sections[current], { autoAlpha: 0 });
    }

    gsap.set(sections[target], { autoAlpha: 1, zIndex: 1 });
    gsap.set(contents[target], { autoAlpha: 0, yPercent: 150 * dir });

    tl.fromTo(
      outerWrappers[target],
      { yPercent: 100 * dir },
      { yPercent: 0 },
      0
    );
    tl.fromTo(
      innerWrappers[target],
      { yPercent: -100 * dir },
      { yPercent: 0 },
      0
    );
    tl.fromTo(
      backgrounds[target],
      { yPercent: 15 * dir },
      { yPercent: 0, onComplete: handleComplete },
      0
    );
    tl.to(
      contents[target],
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1.5,
        ease: "power2",
      },
      0.35
    );
  };
}
