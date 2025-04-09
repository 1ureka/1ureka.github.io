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
