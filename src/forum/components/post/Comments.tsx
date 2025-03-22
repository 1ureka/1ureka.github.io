import { useCommentsByCommentId, useCommentsByPostId } from "@/forum/hooks/comment";
import { Box, Typography } from "@mui/material";
import { Comment, LoadingComment } from "./Comment";
import { useUrl } from "@/forum/hooks/url";

const NoCommentsDisplay = () => (
  <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", mt: 2 }}>
    還沒有留言，快來發表您的看法吧！
  </Typography>
);

const Replaies = ({ commentId }: { commentId: number }) => {
  const { data: comments, isFetching } = useCommentsByCommentId(commentId);

  if (isFetching)
    return (
      <Box sx={{ pl: 2 }}>
        {[...Array(1)].map((_, i) => (
          <LoadingComment key={i} nestedLevel={1} />
        ))}
      </Box>
    );

  if (!comments) return null;

  return (
    <Box sx={{ pl: 2 }}>
      {comments.map((commentId) => (
        <Comment key={commentId} commentId={commentId} nestedLevel={1} />
      ))}
    </Box>
  );
};

const oddBeforeSx = {
  content: '""',
  display: "block",
  position: "absolute",
  inset: 0,
  bgcolor: "divider",
  opacity: 0.25,
  pointerEvents: "none",
  mr: -2,
} as const;

const Comments = () => {
  const { searchParams } = useUrl();
  const param = searchParams.get("postId");
  const postId = param && /^\d+$/.test(param) && Number(param) > 0 ? Number(param) : -1;
  const { data: comments, isFetching } = useCommentsByPostId(postId);

  if (isFetching)
    return (
      <Box sx={{ pr: 2, "& > .comment:nth-of-type(odd):before": oddBeforeSx }}>
        {[...Array(3)].map((_, i) => (
          <LoadingComment key={i} nestedLevel={0} className="comment" />
        ))}
      </Box>
    );

  if (!comments || comments.length === 0) return <NoCommentsDisplay />;

  return (
    <Box sx={{ pr: 2, "& > .comment:nth-of-type(odd):before": oddBeforeSx }}>
      {comments.map((commentId) => (
        <Comment key={commentId} commentId={commentId} nestedLevel={0} className="comment" />
      ))}
    </Box>
  );
};

export { Comments, Replaies };
