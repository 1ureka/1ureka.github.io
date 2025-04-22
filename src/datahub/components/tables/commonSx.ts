import { generateMuiColorMix } from "@/utils/commonSx";

export const smSpace = { xs: 0.5, sm: 1 };
export const mdSpace = { xs: 1, md: 1.5 };
export const lgSpace = { xs: 1.5, md: 2 };

export const generateHeadCellSx = (type: "first" | "last" | "middle") => {
  const borderRadius =
    type === "first"
      ? {
          borderRadius: 3,
          borderBottomLeftRadius: "calc(1 * var(--mui-shape-borderRadius))",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }
      : type === "last"
      ? {
          borderRadius: 3,
          borderBottomRightRadius: "calc(1 * var(--mui-shape-borderRadius))",
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }
      : { borderRadius: 0 };

  return {
    position: "relative",
    border: "none",
    bgcolor: "color-mix(in srgb, var(--mui-palette-divider) 80%, transparent 20%)",
    ...borderRadius,
  } as const;
};

export const tableRowsStyles = {
  checkboxCell: { borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  checkbox: (checked: boolean) => ({
    color: checked ? generateMuiColorMix("text-primary", "primary-main", 30) : undefined,
  }),

  row: (selected: boolean, index: number) =>
    ({
      "& td, & th": { border: 0 },
      position: "relative",
      borderRadius: 2,
      bgcolor: selected
        ? generateMuiColorMix("action-hover", "primary-light", 80)
        : index % 2 === 0
        ? "color-mix(in srgb, var(--mui-palette-action-hover), transparent)"
        : "action.hover",
    } as const),

  rowCellFull: { py: 8, borderRadius: 2 },
  rowCell: (isFinal: boolean) => ({
    py: 3,
    ...(isFinal ? { borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {}),
  }),
};
