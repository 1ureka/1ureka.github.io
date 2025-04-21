import { keyframes } from "@mui/material";

export const smSpace = { xs: 1, sm: 1.5 };
export const mdSpace = { xs: 2, sm: 3.5 };
export const lgSpace = { xs: 2.5, sm: 5 };

export const parallaxScrollContainerSx = {
  position: "relative",
  height: "100dvh",
  overflowY: "auto",
  overflowX: "hidden",
  scrollTimelineName: "--scroll",
  scrollTimelineAxis: "block",
} as const;

const parallaxItemKeyframes = (offset: number) => keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(${offset}px);
  }
`;

export const parallaxItemSx = (offset: number) => {
  return {
    animation: `${parallaxItemKeyframes(offset)} linear`,
    animationTimeline: "--scroll",
    animationRange: "entry 0% exit 100%",
    willChange: "transform",
  } as const;
};
