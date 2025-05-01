export const OutlinedInteractionSx = {
  outline: 1,
  outlineColor: "border.main",
  "&:hover": { outlineColor: "divider", outlineWidth: 10 },
  "&:has(:focus)": { outlineColor: "primary.main", outlineWidth: 5 },
  "&:has(:focus-visible)": { outlineColor: "primary.main", outlineWidth: 5 },
  "&:active": { outlineColor: "primary.main", outlineWidth: 5 },
  transition: "outline 0.15s ease",
} as const;
