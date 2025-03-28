import { useUser } from "@/forum/hooks/user";
import { Skeleton, Typography, useMediaQuery } from "@mui/material";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import type { FetchUserByNameResult } from "@/forum/data/user";
import { theme } from "@/forum/utils/theme";
import { useUserStats } from "@/forum/hooks/user";

const LoadingDisplay = () => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <BarChartRoundedIcon fontSize="small" color="inherit" />
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body2">{isMd ? "發布了 0 篇文章" : "0 篇文章"}</Typography>
      </Skeleton>
      <Typography variant="body2">·</Typography>
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body2">{isMd ? "獲得了 0 次讚" : "0 次讚"}</Typography>
      </Skeleton>
      <Typography variant="body2">·</Typography>
      <Skeleton variant="rounded" animation="wave">
        <Typography variant="body2">{isMd ? "文章總瀏覽次數 0 次" : "0 次瀏覽"}</Typography>
      </Skeleton>
    </>
  );
};

const UserStats = ({ user }: { user: FetchUserByNameResult }) => {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { data, isFetching } = useUserStats(user.id);

  if (data === undefined || isFetching) {
    return <LoadingDisplay />;
  }

  const { postCount, likeCount, viewCount } = data;

  return (
    <>
      <BarChartRoundedIcon fontSize="small" color="inherit" />
      <Typography variant="body2">{isMd ? `發布了 ${postCount} 篇文章` : `${postCount} 篇文章`}</Typography>
      <Typography variant="body2">·</Typography>
      <Typography variant="body2">{isMd ? `獲得了 ${likeCount} 次讚` : `${likeCount} 次讚`}</Typography>
      <Typography variant="body2">·</Typography>
      <Typography variant="body2">{isMd ? `文章總瀏覽次數 ${viewCount} 次` : `${viewCount} 次瀏覽`}</Typography>
    </>
  );
};

const UserStatsWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));

  if (isFetching || user === undefined || user === null) {
    return <LoadingDisplay />;
  }

  return <UserStats user={user} />;
};

export { UserStatsWrapper as UserStats };
