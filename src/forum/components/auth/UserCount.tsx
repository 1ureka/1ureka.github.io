import { useUserCounts } from "@/forum/hooks/user";
import { Skeleton, Typography } from "@mui/material";

const LoadingDisplay = () => (
  <Skeleton variant="rounded" animation="wave" component="span" sx={{ display: "inline", mx: 0.5 }}>
    <Typography variant="body2" component="span" sx={{ color: "primary.light" }}>
      100
    </Typography>
  </Skeleton>
);

const UserCounts = () => {
  const { data: userCounts, isFetching: isFetchingUser } = useUserCounts();

  return (
    <Typography className="mode-dark" variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
      與其他
      {isFetchingUser || userCounts === undefined ? (
        <LoadingDisplay />
      ) : (
        <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>
          {` ${userCounts} `}
        </Typography>
      )}
      位使用者一同加入我們
    </Typography>
  );
};

export { UserCounts };
