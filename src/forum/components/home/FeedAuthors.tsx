import { useAuthors } from "@/forum/hooks/user";
import { routes } from "@/forum/utils/routes";
import { Avatar, Box, Chip, Skeleton, Typography } from "@mui/material";

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
    <>
      <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
        推薦追蹤
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 2 }}>
        {isFetching || !authors
          ? [...Array(length)].map((_, i) => <LoadingDisplay key={i} />)
          : authors.map(({ name, description }) => <AuthorDisplay key={name} name={name} description={description} />)}
      </Box>
    </>
  );
};

export { FeedAuthors };
