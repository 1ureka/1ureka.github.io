import { useUser } from "@/forum/hooks/user";
import { Box, Skeleton, Typography } from "@mui/material";

const UserIntro = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));

  if (isFetching || !user) {
    return (
      <Box sx={{ m: 2 }}>
        {urlParams.get("user") ? (
          <Typography variant="h5" component="h2">
            {urlParams.get("user")}
          </Typography>
        ) : (
          <Skeleton variant="rounded" animation="wave">
            <Typography variant="h5" component="h2">
              使用者名稱
            </Typography>
          </Skeleton>
        )}
        <Skeleton variant="text" animation="wave">
          <Typography variant="body2">佔位符佔位符佔位符佔位符佔位符佔位符佔位符</Typography>
        </Skeleton>
      </Box>
    );
  }

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" component="h2">
        {user.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.description}
      </Typography>
    </Box>
  );
};

export { UserIntro };
