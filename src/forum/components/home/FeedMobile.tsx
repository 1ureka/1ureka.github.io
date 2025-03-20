import { Box, Divider, Paper } from "@mui/material";
import { FeedHotSection } from "./FeedHotSection";
import { FeedTopics } from "./FeedTopics";
import { FeedAuthors } from "./FeedAuthors";

const FeedMobile = () => {
  return (
    <Paper sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
      <Box sx={{ p: 3 }}>
        <FeedHotSection length={3} />
      </Box>

      <Divider />

      <Box sx={{ p: 3, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />
        <FeedTopics length={5} />
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        <FeedAuthors length={5} />
      </Box>
    </Paper>
  );
};

export { FeedMobile };
