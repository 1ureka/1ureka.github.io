import { Typography } from "@mui/material";

export function Title({ title, sx }) {
  return (
    <Typography variant="caption" sx={{ color: "text.secondary", ...sx }}>
      {title}
    </Typography>
  );
}

export function SubTitle({ title }) {
  return <Typography variant="caption">{title}</Typography>;
}
