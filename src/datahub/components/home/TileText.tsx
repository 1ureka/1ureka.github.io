import { Typography, type TypographyProps } from "@mui/material";
import { ellipsisSx } from "./commonSx";

const TileTitle = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography variant="subtitle1" component="h3" sx={{ color: "text.secondary", textWrap: "nowrap", ...sx }} {...props}>
    {children}
  </Typography>
);

const TileContent = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography variant="h5" component="p" sx={{ ...ellipsisSx, ...sx }} {...props}>
    {children}
  </Typography>
);

export { TileTitle, TileContent };
