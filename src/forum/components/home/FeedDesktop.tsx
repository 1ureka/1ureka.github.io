import { Paper } from "@mui/material";
import { FeedHotSection } from "./FeedHotSection";
import { FeedTopics } from "./FeedTopics";
import { FeedAuthors } from "./FeedAuthors";

const FeedDesktop = () => {
  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <FeedHotSection length={3} />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <FeedTopics length={5} />
      </Paper>

      <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
        <FeedAuthors length={5} />
      </Paper>
    </>
  );
};

export { FeedDesktop };
