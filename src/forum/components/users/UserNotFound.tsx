import { Box, Divider, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { useUsers } from "@/forum/hooks/user";
import { AuthorDisplay, AuthorLoadingDisplay } from "../userElement/AuthorDisplay";

const FeedAuthors = ({ length }: { length: number }) => {
  const { data, isFetching } = useUsers({ limit: length, orderBy: "postCount", order: "desc" });
  const authors = data ? (data.pages[0] ? data.pages[0].users : null) : null;

  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr auto", md: "auto 1fr auto auto 1fr auto" },
        alignItems: "center",
        gap: 2,
        p: 2,
      }}
    >
      {isFetching || !authors
        ? [...Array(length)].map((_, i) => <AuthorLoadingDisplay key={i} />)
        : authors.map(({ name, description }) => <AuthorDisplay key={name} name={name} description={description} />)}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
        }}
      >
        <Divider orientation="vertical" flexItem variant="middle" />
      </Box>
    </Box>
  );
};

const UserNotFound = () => (
  <>
    <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "6rem", color: "action.disabled" }} />
      <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center" }}>
        使用者不存在或已被刪除
      </Typography>
    </Box>

    <Divider />

    <Box sx={{ position: "relative" }}>
      <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />
      <Typography variant="subtitle1" sx={{ p: 2 }}>
        我們找不到這位使用者...這裡有其他活躍的使用者供你參考！
      </Typography>
    </Box>

    <Divider />

    <FeedAuthors length={6} />
  </>
);

export { UserNotFound };
