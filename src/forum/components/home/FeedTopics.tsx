import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { routes } from "@/routes";
import { useState } from "react";
import { useTags } from "@/forum/hooks/post";
import { TopicPicker } from "../postElement/shared/TopicPicker";

const LoadingDisplay = () => {
  return <Chip label={<CircularProgress size="1rem" sx={{ mx: 2, color: "divider" }} />} />;
};

const Content = ({ length }: { length: number }) => {
  const { data, isFetching } = useTags();
  const tags = data ? data.slice(0, length) : null;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleNavigate = (tag: string | null) => {
    if (tag === null) {
      window.location.href = routes.forum_posts;
      return;
    }
    window.location.href = `${routes.forum_posts}?topic=${tag}`;
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
      {isFetching || !tags
        ? [...Array(length)].map((_, i) => <LoadingDisplay key={i} />)
        : tags.map(({ name }) => (
            <Chip key={name} label={name} clickable component="a" href={`${routes.forum_posts}?topic=${name}`} />
          ))}

      <Chip label={"..."} clickable disabled={isFetching} onClick={handleOpen} />
      <TopicPicker
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        type="query"
        onConfirm={handleNavigate}
      />
    </Box>
  );
};

const FeedTopics = ({ length }: { length: number }) => (
  <>
    <Typography variant="h6" component="h2">
      你可能會喜歡
    </Typography>

    <Content length={length} />

    <Button sx={{ mt: 1 }} endIcon={<ArrowRightAltRoundedIcon />} href={routes.forum_posts}>
      更多主題
    </Button>
  </>
);

export { FeedTopics };
