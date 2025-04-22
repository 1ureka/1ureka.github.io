import { keyframes } from "@mui/material";

export const smSpace = { xs: 1, sm: 1.5 };
export const mdSpace = { xs: 2, sm: 3.5 };
export const lgSpace = { xs: 2.5, sm: 5 };

const pxToVh = (px: number) => `${px * 0.5}dvh`;

type GenerateKeyFrameParams = { from?: number; to?: number };
const generateKeyframes = ({ from, to }: GenerateKeyFrameParams) =>
  keyframes({
    "0%": { transform: `translateY(${pxToVh(from ?? 0)})` },
    "100%": { transform: `translateY(${pxToVh(to ?? 0)})` },
  });

type ViewTimelineSxParams = { targetView: `--${string}`; range?: string } & GenerateKeyFrameParams;
export const viewTimelineSx = ({ targetView, range = "entry", ...params }: ViewTimelineSxParams) =>
  ({
    animationTimeline: targetView,
    animationName: `${generateKeyframes(params ?? {})}`,
    animationFillMode: "both",
    animationDuration: "1ms",
    animationTimingFunction: "linear",
    animationRange: range,
  } as const);
