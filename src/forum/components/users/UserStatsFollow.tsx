import { Skeleton, Typography } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import type { FetchUserByNameResult } from "@/forum/data/user";
import { useUser, useUserStats } from "@/forum/hooks/user";
import { useState } from "react";
import { UserFollowDialog } from "./UserFollowDialog";

const LoadingDisplay = () => (
  <>
    <PeopleRoundedIcon fontSize="small" color="inherit" />
    <Skeleton variant="rounded" animation="wave">
      <Typography variant="body2">0 位追蹤者</Typography>
    </Skeleton>
    <Typography variant="body2">·</Typography>
    <Skeleton variant="rounded" animation="wave">
      <Typography variant="body2">正在追蹤 0 人</Typography>
    </Skeleton>
  </>
);

const UserStatsFollow = ({ user }: { user: FetchUserByNameResult }) => {
  const [openFollowers, setOpenFollowers] = useState(false);
  const [openFollowing, setOpenFollowing] = useState(false);
  const { data, isFetching } = useUserStats(user.id);

  if (data === undefined || isFetching) {
    return <LoadingDisplay />;
  }

  const { followerCount, followingCount } = data;

  return (
    <>
      <PeopleRoundedIcon fontSize="small" color="inherit" />
      <Typography
        variant="body2"
        sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer", color: "text.primary" } }}
        onClick={() => setOpenFollowers(true)}
      >
        {`${followerCount} 位追蹤者`}
      </Typography>
      <Typography variant="body2">·</Typography>
      <Typography
        variant="body2"
        sx={{ "&:hover": { textDecoration: "underline", cursor: "pointer", color: "text.primary" } }}
        onClick={() => setOpenFollowing(true)}
      >
        {`正在追蹤 ${followingCount} 人`}
      </Typography>

      <UserFollowDialog
        open={openFollowers}
        onClose={() => setOpenFollowers(false)}
        type="followers"
        counts={followerCount}
      />
      <UserFollowDialog
        open={openFollowing}
        onClose={() => setOpenFollowing(false)}
        type="following"
        counts={followingCount}
      />
    </>
  );
};

const UserStatsWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));

  if (isFetching || user === undefined || user === null) {
    return <LoadingDisplay />;
  }

  return <UserStatsFollow user={user} />;
};

export { UserStatsWrapper as UserStatsFollow };
