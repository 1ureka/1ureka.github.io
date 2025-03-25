import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import { useTags } from "@/forum/hooks/post";
import { routes } from "@/forum/utils/routes";

const LoadingDisplay = () => {
  return <Chip label={<CircularProgress size="1rem" sx={{ mx: 2, color: "divider" }} />} />;
};

const FeedTopics = ({ length }: { length: number }) => {
  const { data, isFetching } = useTags();
  const tags = data ? data.slice(0, length) : null;

  return (
    <>
      <Typography variant="h6" component="h2">
        你可能會喜歡
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
        {isFetching || !tags
          ? [...Array(length)].map((_, i) => <LoadingDisplay key={i} />)
          : tags.map((tag) => (
              <Chip key={tag} label={tag} clickable component="a" href={`${routes.posts}?topic=${tag}`} />
            ))}
      </Box>

      <Button sx={{ mt: 1 }} endIcon={<ArrowRightAltRoundedIcon />} href={routes.posts}>
        更多主題
      </Button>
    </>
  );
};

export { FeedTopics };
