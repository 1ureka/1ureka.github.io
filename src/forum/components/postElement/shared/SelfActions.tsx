import type { FetchPostByIdResult } from "@/forum/data/post";
import { Box, Button } from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { routes } from "@/routes";

const SelfActions = ({ post }: { post: FetchPostByIdResult }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<EditNoteRoundedIcon />}
        href={`${routes.forum_edit}?postId=${post.id}`}
      >
        編輯貼文
      </Button>
      <Button variant="outlined" size="small" color="error" startIcon={<DeleteSweepRoundedIcon />}>
        刪除貼文
      </Button>

      {/* TODO: popover */}
    </Box>
  );
};

export { SelfActions };
