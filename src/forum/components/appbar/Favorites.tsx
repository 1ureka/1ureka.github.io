import { Box, Dialog, Collapse, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CollectionsBookmarkRoundedIcon from "@mui/icons-material/CollectionsBookmarkRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import { useState } from "react";
import { useSession } from "@/forum/hooks/session";
import { useUserFavPosts } from "@/forum/hooks/postInteraction";
import { useFollowing } from "@/forum/hooks/userInteraction";
import { SmallLoadingPost, SmallPost } from "../postElement/SmallPost";
import { AuthorDisplay, AuthorLoadingDisplay } from "../userElement/AuthorDisplay";
import { FavTextButton } from "../postElement/shared/FavButton";

const usersContainerSx = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto auto 1fr auto",
  alignItems: "center",
  gap: 2,
  "& > *:nth-of-type(6n - 3)": {
    "&::after": {
      content: '""',
      position: "absolute",
      display: { xs: "none", md: "block" },
      inset: 0,
      pointerEvents: "none",
      borderRight: "1px solid",
      borderColor: "divider",
      mr: -1,
      my: -2.1,
    },
  },
} as const;

const FavoriteUsers = ({ userId }: { userId: number }) => {
  const { data, isFetching } = useFollowing({ userId });

  if (isFetching) {
    return (
      <Box sx={usersContainerSx}>
        {[...Array(4)].map((_, i) => (
          <AuthorLoadingDisplay key={i} />
        ))}
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box>
        <Typography variant="subtitle2" color="text.secondary" align="center">
          你還沒追蹤任何使用者
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={usersContainerSx}>
      {data.map((user) => (
        <AuthorDisplay key={user.id} {...user} ellipsis />
      ))}
    </Box>
  );
};

const postsContainerSx = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 1,
  "& > *:nth-of-type(4n+2), & > *:nth-of-type(4n+3)": { bgcolor: "action.hover" },
} as const;

const FavroitePosts = () => {
  const { data, loading } = useUserFavPosts();

  if (loading) {
    return (
      <Box sx={postsContainerSx}>
        {[...Array(4)].map((_, i) => (
          <SmallLoadingPost key={i} />
        ))}
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box sx={{ m: 3 }}>
        <Typography variant="subtitle2" color="text.secondary" align="center">
          你尚未收藏任何貼文
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={postsContainerSx}>
      {data.map((postId) => (
        <Box key={postId} sx={{ position: "relative" }}>
          <SmallPost postId={postId} action={<FavTextButton postId={postId} />} />
        </Box>
      ))}
    </Box>
  );
};

const FavroitesDesktop = () => {
  const { user, authenticated, loading } = useSession();
  const [open, setOpen] = useState(false);
  const [usersExpanded, setUsersExpanded] = useState(true);
  const [postsExpanded, setPostsExpanded] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleUsers = () => setUsersExpanded(!usersExpanded);
  const togglePosts = () => setPostsExpanded(!postsExpanded);

  return (
    <>
      <Tooltip title="收藏與追蹤" arrow>
        <span>
          <IconButton onClick={handleOpen} disabled={!authenticated} loading={loading}>
            <FavoriteRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            gap: 1,
            alignItems: "center",
            p: 2,
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "action.hover" }} />

          <CollectionsBookmarkRoundedIcon
            className="mode-light"
            sx={{ fontSize: 48, mr: 1, bgcolor: "primary.main", borderRadius: 1, color: "background.default", p: 1 }}
          />
          <Typography variant="h6" component="h2" sx={{ color: "text.primary" }}>
            收藏與追蹤
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Tooltip title="關閉" arrow>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Stack>
          <Box sx={{ bgcolor: "action.hover", cursor: "pointer" }} onClick={toggleUsers}>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 1 }}>
              <Typography variant="subtitle1">追蹤的使用者</Typography>
              <ExpandMoreRoundedIcon
                sx={{ transform: usersExpanded ? "rotate(180deg)" : "", transition: "all 0.2s ease" }}
              />
            </Box>
            <Divider />
          </Box>

          <Collapse in={usersExpanded}>
            <Box sx={{ px: 3, py: 2 }}>
              {user ? (
                <FavoriteUsers userId={user.id} />
              ) : (
                <Box>
                  <Typography variant="subtitle2" color="error" align="center">
                    出了點問題，請稍後再試
                  </Typography>
                </Box>
              )}
            </Box>
          </Collapse>

          <Box sx={{ bgcolor: "action.hover", cursor: "pointer" }} onClick={togglePosts}>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 1 }}>
              <Typography variant="subtitle1">收藏的貼文</Typography>
              <ExpandMoreRoundedIcon
                sx={{ transform: postsExpanded ? "rotate(180deg)" : "", transition: "all 0.2s ease" }}
              />
            </Box>
            <Divider />
          </Box>

          <Collapse in={postsExpanded}>
            <Box sx={{ px: 3, py: 2 }}>
              <FavroitePosts />
            </Box>
          </Collapse>
        </Stack>
      </Dialog>
    </>
  );
};

export { FavroitesDesktop };
