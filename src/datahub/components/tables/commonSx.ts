import { generateMuiColorMix, generateRadius } from "@/utils/commonSx";
import type { SxProps, Theme } from "@mui/material";

export const smSpace = { xs: 0.5, sm: 1 };
export const mdSpace = { xs: 1, md: 1.5 };
export const lgSpace = { xs: 1.5, md: 2 };

type RadiusKey = "top-left" | "top-right" | "mid-left" | "mid-right" | "no-radius";

const radius: Record<RadiusKey, SxProps<Theme>> = {
  "top-left": generateRadius([3, 0, 0, 1]),
  "top-right": generateRadius([0, 3, 1, 0]),
  "mid-left": generateRadius([2, 0, 0, 2]),
  "mid-right": generateRadius([0, 2, 2, 0]),
  "no-radius": generateRadius([0, 0, 0, 0]),
} as const;

export const generateHeadCellSx = (type: RadiusKey) =>
  ({
    position: "relative",
    border: "none",
    bgcolor: "color-mix(in srgb, var(--mui-palette-divider) 80%, transparent 20%)",
    ...radius[type],
  } as const);

export const tableRowsStyles = {
  checkboxCell: radius["mid-left"],
  checkbox: (checked: boolean) => ({
    color: checked ? generateMuiColorMix("text-primary", "primary-main", 30) : undefined,
  }),

  row: (selected: boolean, index: number) =>
    ({
      "& td, & th": { border: 0 },
      position: "relative",
      bgcolor: selected
        ? generateMuiColorMix("action-hover", "primary-light", 80)
        : index % 2 === 0
        ? "color-mix(in srgb, var(--mui-palette-action-hover), transparent)"
        : "action.hover",
    } as const),

  rowCellFull: { py: 8, borderRadius: 2 },
  rowCell: (isFinal: boolean) => ({ py: 3, ...(isFinal ? radius["mid-right"] : {}) }),
};
