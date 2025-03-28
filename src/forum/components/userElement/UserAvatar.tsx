import { useUser } from "@/forum/hooks/user";
import { Avatar, Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import type { AvatarProps, SkeletonProps } from "@mui/material";

const UserAvatarSkeleton = (props: SkeletonProps) => (
  <Skeleton variant="circular" width="2rem" height="2rem" animation="wave" {...props} />
);

const UserAvatar = ({ name, sx, ...props }: { name: string } & AvatarProps) => {
  return (
    <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem", ...sx }} {...props}>
      <Typography sx={{ translate: "0px 5%" }}>{name.slice(0, 1).toUpperCase()}</Typography>
    </Avatar>
  );
};

const PrimaryLoadingAvatar = ({ showProgress }: { showProgress: boolean }) => (
  <>
    <Skeleton
      variant="circular"
      sx={{ position: "absolute", bottom: 0, width: 1, height: "auto", aspectRatio: 1 }}
      animation="wave"
    />
    {showProgress && (
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: 1,
          height: "auto",
          aspectRatio: 1,
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    )}
  </>
);

const PrimaryUserAvatar = ({ size = 6, borderSize = 0.8 }: { size?: number; borderSize?: number }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        width: `${size}rem`,
        alignSelf: "flex-end",
        m: 2,
      }}
    >
      <Box sx={{ position: "absolute", bottom: 0, width: 1, height: "auto", aspectRatio: 1 }}>
        <Box
          sx={{
            borderRadius: "50%",
            position: "absolute",
            inset: `${-borderSize}rem`,
            bgcolor: "background.paper",
            backgroundImage: "var(--Paper-overlay)",
          }}
        />
      </Box>

      {!isFetching && user ? (
        <Avatar
          sx={{
            position: "absolute",
            bottom: 0,
            width: 1,
            height: "auto",
            aspectRatio: 1,
            bgcolor: "primary.main",
            boxShadow: 3,
          }}
        >
          <Typography variant="h3" component="span" sx={{ translate: "0px 5%", color: "white" }}>
            {user.name.charAt(0).toUpperCase()}
          </Typography>
        </Avatar>
      ) : (
        <PrimaryLoadingAvatar showProgress={isFetching} />
      )}
    </Box>
  );
};

export { PrimaryUserAvatar, UserAvatar, UserAvatarSkeleton };
