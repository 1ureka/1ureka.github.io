import { Avatar, Box, Chip, Divider, Skeleton, Typography } from "@mui/material";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import { useAuthors } from "@/forum/hooks/user";
import { routes } from "@/forum/utils/routes";

const LoadingDisplay = () => {
  return (
    <>
      <Skeleton variant="circular" width="2rem" height="2rem" animation="wave" />
      <Box>
        <Skeleton variant="rounded" animation="wave">
          <Typography
            variant="subtitle1"
            sx={{
              textWrap: "nowrap",
              color: "text.primary",
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            作者名稱
          </Typography>
        </Skeleton>
        <Skeleton variant="text" animation="wave">
          <Typography variant="body2" component="p" sx={{ color: "text.secondary" }}>
            作者描述載入中...
          </Typography>
        </Skeleton>
      </Box>
      <Chip variant="outlined" label="追蹤" clickable disabled />
    </>
  );
};

const AuthorDisplay = ({ name, description }: { name: string; description: string }) => {
  return (
    <>
      <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
        <Typography sx={{ translate: "0px 5%" }}>{name.slice(0, 1).toUpperCase()}</Typography>
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
          href={`${routes.users}?user=${name}`}
        >
          {name}
        </Typography>
        <Typography variant="body2" component="p" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </Box>
      <Chip variant="outlined" label="追蹤" clickable />
    </>
  );
};

const FeedAuthors = ({ length }: { length: number }) => {
  const { data, isFetching } = useAuthors();
  const authors = data ? data.slice(0, length) : null;

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
        ? [...Array(length)].map((_, i) => <LoadingDisplay key={i} />)
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
