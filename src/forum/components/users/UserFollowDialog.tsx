import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { useUrl } from "@/hooks/url";
import { useFollowers, useFollowing } from "@/forum/hooks/userInteraction";
import { AuthorDisplay, AuthorLoadingDisplay } from "../userElement/AuthorDisplay";
import { useUser } from "@/forum/hooks/user";

const UserFollowersWrapper = ({ userId, counts }: { userId: number; counts: number }) => {
  const { data, isFetching } = useFollowers({ userId });

  if (isFetching || data === undefined || data === null) {
    return (
      <>
        {[...Array(counts)].map((_, i) => (
          <AuthorLoadingDisplay key={i} />
        ))}
      </>
    );
  }

  return (
    <>
      {data.map((user) => (
        <AuthorDisplay key={user.id} {...user} />
      ))}
    </>
  );
};

const UserFollowingWrapper = ({ userId, counts }: { userId: number; counts: number }) => {
  const { data, isFetching } = useFollowing({ userId });

  if (isFetching || data === undefined || data === null) {
    return (
      <>
        {[...Array(counts)].map((_, i) => (
          <AuthorLoadingDisplay key={i} />
        ))}
      </>
    );
  }

  return (
    <>
      {data.map((user) => (
        <AuthorDisplay key={user.id} {...user} />
      ))}
    </>
  );
};

const UserFollowDialog = ({
  open,
  onClose,
  type,
  counts,
}: {
  open: boolean;
  onClose: () => void;
  type: "followers" | "following";
  counts: number;
}) => {
  const { searchParams } = useUrl();
  const userName = searchParams.get("user");
  const { data: user, isFetching } = useUser(userName);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", p: 2, bgcolor: "action.hover" }}>
        <PeopleRoundedIcon
          className="mode-light"
          sx={{
            fontSize: 36,
            mr: 1,
            bgcolor: "primary.main",
            borderRadius: 1,
            color: "background.default",
            p: 1,
          }}
        />
        <Typography variant="h6" component="h2" sx={{ color: "text.primary" }}>
          {type === "followers" ? "追蹤者" : "正在追蹤"}
        </Typography>
      </Box>

      <DialogContent>
        <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", gap: 2 }}>
          {isFetching || user?.id === undefined ? (
            <>
              {[...Array(counts)].map((_, i) => (
                <AuthorLoadingDisplay key={i} />
              ))}
            </>
          ) : type === "followers" ? (
            <UserFollowersWrapper userId={user.id} counts={counts} />
          ) : (
            <UserFollowingWrapper userId={user.id} counts={counts} />
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
};

export { UserFollowDialog };
