import { Box, Skeleton, Stack, Typography } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { ThemeMenuWithButton } from "@/forum/components/ThemeMenu";
import { usePostCounts } from "@/forum/hooks/post";
import { useUserCounts } from "@/forum/hooks/user";

const LoadingDisplay = () => (
  <Skeleton variant="rounded" animation="wave" component="span" sx={{ display: "inline", mx: 0.5 }}>
    <Typography variant="body2" component="span" sx={{ color: "primary.light" }}>
      100
    </Typography>
  </Skeleton>
);

const Stats = () => {
  const { data: postCounts, isFetching: isFetchingPost } = usePostCounts();
  const { data: userCounts, isFetching: isFetchingUser } = useUserCounts();

  return (
    <Typography variant="body2" sx={{ textAlign: "center" }}>
      與另外
      {isFetchingUser || userCounts === undefined ? (
        <LoadingDisplay />
      ) : (
        <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>{` ${userCounts} `}</Typography>
      )}
      位使用者以及
      {isFetchingPost || postCounts === undefined ? (
        <LoadingDisplay />
      ) : (
        <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>{` ${postCounts} `}</Typography>
      )}
      篇文章互動 🎉
    </Typography>
  );
};

const AuthIntro = () => {
  return (
    <Stack sx={{ height: 1 }}>
      <Box sx={{ alignSelf: "flex-end", p: 2, display: "flex", placeItems: "center" }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          切換主題
        </Typography>
        <ThemeMenuWithButton />
      </Box>

      <Box sx={{ p: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
        <ForumRoundedIcon color="primary" sx={{ fontSize: "3rem" }} />
        <Typography variant="h3" component="h1" sx={{ fontFamily: `"timemachine-wa"` }}>
          論壇樣板
        </Typography>
      </Box>

      <Box sx={{ position: "relative", p: 4, pb: 8, display: "grid", placeItems: "center" }}>
        <Stack
          sx={{
            height: "18rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "fit-content",
          }}
        >
          <Typography variant="subtitle1" sx={{ alignSelf: "center" }}>
            登入後你可以：
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PostAddRoundedIcon fontSize="large" color="inherit" />
            <Typography variant="h6" component="p">
              發表與編輯文章
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CommentRoundedIcon fontSize="large" color="inherit" />
            <Typography variant="h6" component="p">
              回覆文章
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FavoriteRoundedIcon fontSize="large" color="inherit" />
            <Typography variant="h6" component="p">
              收藏文章
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonAddRoundedIcon fontSize="large" color="inherit" />
            <Typography variant="h6" component="p">
              追蹤其他使用者
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          加入我們的社群，
        </Typography>
        <Stats />
      </Box>
    </Stack>
  );
};

export { AuthIntro };
