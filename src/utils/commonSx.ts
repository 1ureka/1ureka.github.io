import type { SxProps, Theme } from "@mui/material";

export const underlineSx = {
  "&:hover": { textDecoration: "underline" },
  cursor: "pointer",
} as const;

export const ellipsisSx = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-all",
} as const;

/** 將兩個 MUI 調色盤顏色按指定比例混合，比例為第一個顏色的百分比 */
export const generateMuiColorMix = (color1: string, color2: string, percentage: number) => {
  return `color-mix(in srgb, var(--mui-palette-${color1}) ${percentage}%, var(--mui-palette-${color2}) ${
    100 - percentage
  }%)`;
};

export const generateRadius = (numbers: [number, number, number, number]): SxProps<Theme> => ({
  borderRadius: ({ shape }) => numbers.map((n) => `${n * shape.borderRadius}px`).join(" "),
});

export const generateStretchRadius = ([horizontal, vertical]: [number, number]): SxProps<Theme> => ({
  borderRadius: ({ shape }) => `${horizontal * shape.borderRadius}px / ${vertical * shape.borderRadius}px`,
});
