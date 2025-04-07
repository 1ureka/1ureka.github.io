import { Box, Button, CircularProgress, Container, Divider, Paper, Typography, useMediaQuery } from "@mui/material";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";

import { AppWrapper } from "@/forum/components/AppWrapper";
import { AppBackground } from "@/forum/components/AppBackground";
import { AppbarDesktop } from "@/forum/components/appbar/AppbarDesktop";
import { AppbarMobile } from "@/forum/components/appbar/AppbarMobile";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { AppFooter } from "@/forum/components/appbar/AppFooter";

import { useResponsiveFontSize } from "@/forum/utils/theme";
import { routes } from "@/routes";
import { useUrl } from "@/forum/hooks/url";
import { usePostById } from "@/forum/hooks/post";
import { NewPost } from "@/forum/components/postElement/NewPost";

const EditPage = () => {
  const isMd = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { searchParams } = useUrl();
  const postId = searchParams.get("postId");
  if (!postId) {
    throw new Error("網址缺失 postId 參數");
  }

  const { data: post, isFetching } = usePostById({ postId: Number(postId) });

  return (
    <Paper sx={{ pb: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", p: 3 }}>
        <EditNoteRoundedIcon
          className="mode-light"
          sx={{
            fontSize: 48,
            mr: 1,
            bgcolor: "primary.main",
            borderRadius: 1,
            color: "background.default",
            p: 1,
            opacity: 0.8,
          }}
        />
        <Typography variant="h5" component="h2">
          編輯貼文
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ position: "relative", px: 3, py: 1 }}>
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35, pointerEvents: "none" }} />

        <Button variant="outlined" startIcon={<ArrowBackIosRoundedIcon />} size="small" href={routes.forum_home}>
          {isMd ? "返回首頁" : "首頁"}
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {isFetching ? (
        <Box sx={{ py: 8, display: "grid", placeItems: "center" }}>
          <CircularProgress />
        </Box>
      ) : post ? (
        post.isSelf ? (
          <NewPost
            mode="edit"
            postId={post.id}
            initialValues={{
              title: post.title,
              content: post.content,
              tags: post.tags,
              photos: post.photos?.map(
                ({ name, size }) => new File([new Uint8Array(size)], name, { type: "image/jpeg" })
              ),
              attachments: post.attachments?.map(
                ({ name, size }) => new File([new Uint8Array(size)], name, { type: "application/pdf" })
              ),
            }}
          />
        ) : (
          <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "6rem", color: "action.disabled" }} />
            <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center" }}>
              你沒有權限編輯此貼文
            </Typography>
          </Box>
        )
      ) : (
        <Box sx={{ py: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <SentimentDissatisfiedRoundedIcon sx={{ fontSize: "6rem", color: "action.disabled" }} />
          <Typography variant="body1" component="p" sx={{ color: "text.secondary", textAlign: "center" }}>
            貼文不存在或已被刪除
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

function App() {
  const { isMd } = useResponsiveFontSize();

  return (
    <AppWrapper>
      <AppBackground />

      <ScrollArea>
        {isMd ? <AppbarDesktop /> : <AppbarMobile />}

        <Container maxWidth="lg" sx={{ position: "relative", my: 10, px: 0 }}>
          <EditPage />
        </Container>

        <AppFooter />
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
