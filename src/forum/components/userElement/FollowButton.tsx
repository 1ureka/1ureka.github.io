import { Button, Chip, CircularProgress } from "@mui/material";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useUser } from "@/forum/hooks/user";
import { useSession } from "@/forum/hooks/session";
import { useUserFollowButton } from "@/forum/hooks/userInteraction";

const PrimaryFollowButton = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));
  const { user: userSession, loading: isLoadingSession } = useSession();

  const isLogout = !isLoadingSession && userSession === null;
  const isUserNotFound = !isFetching && user === null;
  if (isLogout || isUserNotFound) {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<NotificationAddRoundedIcon />}
        disabled
        sx={{ borderRadius: 99, transition: "all 0.2s ease", boxShadow: 3, scale: "1.001" }}
      >
        追蹤
      </Button>
    );
  }

  if (isLoadingSession || isFetching || !user || !userSession) {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<NotificationAddRoundedIcon />}
        loading
        sx={{ borderRadius: 99, transition: "all 0.2s ease", boxShadow: 3, scale: "1.001" }}
      >
        追蹤
      </Button>
    );
  }

  if (userSession.name === user.name) {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<EditNoteRoundedIcon />}
        sx={{
          borderRadius: 99,
          transition: "all 0.2s ease",
          boxShadow: 3,
          scale: "1.001",
          "&:hover": { bgcolor: "primary.main", scale: "1.05", boxShadow: 3 },
          "&:active": { scale: "0.95" },
        }}
      >
        編輯個人資料
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<NotificationAddRoundedIcon />}
      sx={{
        borderRadius: 99,
        transition: "all 0.2s ease",
        boxShadow: 3,
        scale: "1.001",
        "&:hover": { bgcolor: "primary.main", scale: "1.05", boxShadow: 3 },
        "&:active": { scale: "0.95" },
      }}
    >
      追蹤
    </Button>
  );
};

const SmallFollowButton = ({ targetId }: { targetId: number }) => {
  const { isFollowed, handleFollow, disabled, loading } = useUserFollowButton(targetId);

  if (loading) {
    return <Chip variant="outlined" clickable disabled label={<CircularProgress size="1rem" />} />;
  }

  if (disabled) {
    return <Chip variant="outlined" label="追蹤" clickable disabled />;
  }

  return (
    <Chip
      variant="outlined"
      label={isFollowed ? "已追蹤" : "追蹤"}
      clickable
      onClick={handleFollow}
      color={isFollowed ? "primary" : "default"}
    />
  );
};

export { PrimaryFollowButton, SmallFollowButton };
