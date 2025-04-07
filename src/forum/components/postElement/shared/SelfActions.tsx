import type { FetchPostByIdResult } from "@/forum/data/post";
import { Box, Button, Popover, Typography } from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { routes } from "@/routes";
import { useState } from "react";
import { useDeletePost } from "@/forum/hooks/post";

const SelfActions = ({ post }: { post: FetchPostByIdResult }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const { mutateAsync: deletePost, isPending } = useDeletePost();
  const handleDelete = async () => {
    const result = await deletePost(post.id);
    if (result === null) {
      window.location.reload();
      return;
    }
    console.error("刪除貼文失敗" + result.error);
    handleClose();
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Button size="small" startIcon={<EditNoteRoundedIcon />} href={`${routes.forum_edit}?postId=${post.id}`}>
        編輯貼文
      </Button>
      <Button size="small" color="error" startIcon={<DeleteSweepRoundedIcon />} onClick={handleOpen}>
        刪除貼文
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={6}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            確認刪除貼文
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            確認刪除貼文後，將無法復原，請謹慎操作。
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleClose} color="inherit" loading={isPending}>
              取消
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDelete}
              loading={isPending}
              disableElevation
            >
              確認刪除
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export { SelfActions };
