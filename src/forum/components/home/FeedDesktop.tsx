import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { Fragment } from "react";
import type { Author } from "@/forum/utils/test";
import { FeedHotSection } from "./FeedHotSection";

const FeedDesktop = ({ tags, authors }: { tags: string[]; authors: Author[] }) => {
  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <FeedHotSection length={3} />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <Typography variant="h6" component="h2">
          你可能會喜歡
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              clickable
              component="a"
              href={`/src/forum/pages/posts/index.html?topic=${tag}`}
            />
          ))}
        </Box>

        <Button sx={{ mt: 1 }} endIcon={<ArrowRightAltRoundedIcon />} href="/src/forum/pages/posts/index.html">
          更多主題
        </Button>
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
          推薦追蹤
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            alignItems: "center",
            gap: 2,
          }}
        >
          {authors.slice(0, 5).map(({ name, description }) => (
            <Fragment key={name}>
              <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
                {name.slice(0, 1).toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    textWrap: "nowrap",
                    color: "text.primary",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  component="a"
                  href={`/src/forum/pages/users/index.html?user=${name}`}
                >
                  {name}
                </Typography>
                <Typography variant="body2" component="p" sx={{ color: "text.secondary" }}>
                  {description}
                </Typography>
              </Box>
              <Chip variant="outlined" label="追蹤" clickable />
            </Fragment>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export { FeedDesktop };
