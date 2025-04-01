import { Typography, type TypographyProps } from "@mui/material";

const TileTitle = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography variant="subtitle1" component="h3" sx={{ color: "text.secondary", textWrap: "nowrap", ...sx }} {...props}>
    {children}
  </Typography>
);

const TileContent = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography
    variant="h5"
    component="p"
    sx={{
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-all",
      ...sx,
    }}
    {...props}
  >
    {children}
  </Typography>
);

export { TileTitle, TileContent };
