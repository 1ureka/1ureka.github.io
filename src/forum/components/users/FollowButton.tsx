import { Button } from "@mui/material";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useUser } from "@/forum/hooks/user";
import { useSession } from "@/forum/hooks/session";

const FollowButton = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));
  const { user: userSession, loading: isLoadingSession } = useSession();

  if (!isFetching && user === null) {
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

export { FollowButton };
