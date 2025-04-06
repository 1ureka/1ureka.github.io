import { useUsers } from "@/forum/hooks/user";
import { Box, Typography } from "@mui/material";
import { AuthorDisplay, AuthorLoadingDisplay } from "../userElement/AuthorDisplay";

const FeedAuthors = ({ length }: { length: number }) => {
  const { data, isFetching } = useUsers({ limit: length, orderBy: "followerCount", order: "desc", isUnfollowed: true });
  const authors = data ? (data.pages[0] ? data.pages[0].users : []) : [];

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
        推薦追蹤
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 2 }}>
        {isFetching || !authors
          ? [...Array(length)].map((_, i) => <AuthorLoadingDisplay key={i} />)
          : authors.map((user) => <AuthorDisplay key={user.id} {...user} />)}
      </Box>
    </>
  );
};

export { FeedAuthors };
