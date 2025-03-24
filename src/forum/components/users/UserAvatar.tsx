import { useUser } from "@/forum/hooks/user";
import { Avatar, Box, CircularProgress, Skeleton, Typography } from "@mui/material";

const LoadingAvatar = () => (
  <>
    <Skeleton
      variant="circular"
      sx={{ position: "absolute", bottom: 0, width: 1, height: "auto", aspectRatio: 1 }}
      animation="wave"
    />
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
  </>
);

const UserAvatar = ({ size = 6, borderSize = 0.8 }: { size?: number; borderSize?: number }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const { data: user, isFetching } = useUser(urlParams.get("user"));

  if (!isFetching && user === null) {
    window.location.replace("/404");
    return null;
  }

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
        <LoadingAvatar />
      )}
    </Box>
  );
};

export { UserAvatar };
