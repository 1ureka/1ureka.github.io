import { Fragment } from "react";
import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import { FeedHotSection } from "./FeedHotSection";
import { FeedTopics } from "./FeedTopics";
import type { Author } from "@/forum/utils/test";

const FeedDesktop = ({ authors }: { authors: Author[] }) => {
  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <FeedHotSection length={3} />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <FeedTopics length={5} />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
          推薦追蹤
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 2 }}>
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
