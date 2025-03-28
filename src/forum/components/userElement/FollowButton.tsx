import { Button, ButtonProps, Chip, CircularProgress } from "@mui/material";
import NotificationAddRoundedIcon from "@mui/icons-material/NotificationAddRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { useUser } from "@/forum/hooks/user";
import { useUserFollowButton } from "@/forum/hooks/userInteraction";

const primaryButtonProps: ButtonProps = {
  variant: "contained",
  color: "primary",
  size: "large",
  startIcon: <NotificationAddRoundedIcon />,
};

const primaryButtonSx: ButtonProps["sx"] = {
  borderRadius: 99,
  transition: "all 0.2s ease",
  boxShadow: 3,
  scale: "1.001",
} as const;

const PrimaryFollowButton = ({ targetId }: { targetId: number }) => {
  const { isFollowed, handleFollow, disabled, loading, isSelf } = useUserFollowButton(targetId);

  if (isSelf) {
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<EditNoteRoundedIcon />}
        sx={{
          ...primaryButtonSx,
          "&:hover": { bgcolor: "primary.main", scale: "1.05", boxShadow: 3 },
          "&:active": { scale: "0.95" },
        }}
      >
        編輯個人資料
      </Button>
    );
  }

  if (disabled) {
    return (
      <Button {...primaryButtonProps} disabled sx={primaryButtonSx}>
        追蹤
      </Button>
    );
  }

  if (loading) {
    return (
      <Button {...primaryButtonProps} loading sx={primaryButtonSx}>
        追蹤
      </Button>
    );
  }

  return (
    <Button
      {...primaryButtonProps}
      onClick={handleFollow}
      sx={{
        ...primaryButtonSx,
        "&:hover": { bgcolor: "primary.main", scale: "1.05", boxShadow: 3 },
        "&:active": { scale: "0.95" },
      }}
    >
      {isFollowed ? "已追蹤" : "追蹤"}
    </Button>
  );
};

const PrimaryFollowButtonWrapper = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));
  const isUserNotFound = !isFetching && user === null;

  if (isUserNotFound) {
    return (
      <Button {...primaryButtonProps} disabled sx={primaryButtonSx}>
        追蹤
      </Button>
    );
  }

  if (isFetching || !user) {
    return (
      <Button {...primaryButtonProps} loading sx={primaryButtonSx}>
        追蹤
      </Button>
    );
  }

  return <PrimaryFollowButton targetId={user.id} />;
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

export { PrimaryFollowButtonWrapper as PrimaryFollowButton, SmallFollowButton };
