import { Link, Stack, Typography } from "@mui/material";

export default function LinkButton({ title, info, icon, url }) {
  const linkSx = {
    color: "text.secondary",
    "&:hover": { color: "text.primary" },
  };

  return (
    <Stack spacing={1}>
      <Typography variant="caption">{title}</Typography>
      <Stack direction={"row"} spacing={2}>
        {icon}
        <Link
          variant="h6"
          sx={linkSx}
          underline="hover"
          href={url}
          target="_blank"
          rel="noopener"
        >
          {info}
        </Link>
      </Stack>
    </Stack>
  );
}
