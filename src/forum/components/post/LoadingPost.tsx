import { Box, Button, Chip, Divider, Skeleton, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { LoadingPostHeader } from "./PostHeader";

const CollapsedLoadingPost = () => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <LoadingPostHeader />

        <Skeleton variant="rounded" animation="wave">
          <Typography variant="h6" component="h3" sx={{ textAlign: "start" }}>
            正在載入標題...
          </Typography>
        </Skeleton>

        <Typography variant="body2" component="p" sx={{ textAlign: "start", opacity: 0 }}>
          正在載入內容...
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          {new Array(3).fill(null).map((_, i) => (
            <Skeleton key={i} variant="rounded" animation="wave">
              <Chip label="loading..." size="small" />
            </Skeleton>
          ))}
        </Box>
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          p: 1.5,
          py: 1,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          position: "relative",
          color: "text.secondary",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Button color="inherit" startIcon={<ThumbUpRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 個讚
          </Typography>
        </Button>

        <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 則回覆
          </Typography>
        </Button>

        <Button color="inherit" startIcon={<VisibilityRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            1000 次瀏覽
          </Typography>
        </Button>
      </Box>

      <Divider flexItem />
    </>
  );
};

const ExpandedLoadingPost = () => {
  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
        <LoadingPostHeader />

        <Skeleton variant="rounded" animation="wave">
          <Typography variant="h6" component="h3" sx={{ textAlign: "start" }}>
            正在載入標題...
          </Typography>
        </Skeleton>

        <Skeleton variant="text" sx={{ width: 0.8 }} animation="wave" />
        <Skeleton variant="text" sx={{ width: 0.7 }} animation="wave" />
        <Skeleton variant="text" sx={{ width: 0.2 }} animation="wave" />

        <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
          {new Array(3).fill(null).map((_, i) => (
            <Skeleton key={i} variant="rounded" animation="wave">
              <Chip label="loading..." size="small" />
            </Skeleton>
          ))}
        </Box>
      </Box>

      <Divider flexItem />

      <Box
        sx={{
          p: 1.5,
          py: 1,
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          position: "relative",
          color: "text.secondary",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Button color="inherit" startIcon={<ThumbUpRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 個讚
          </Typography>
        </Button>

        <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            100 則回覆
          </Typography>
        </Button>

        <Box sx={{ flex: 1 }} />

        <Button color="inherit" startIcon={<VisibilityRoundedIcon />} size="small" loading={true}>
          <Typography variant="caption" component="span">
            1000 次瀏覽
          </Typography>
        </Button>
      </Box>

      <Divider flexItem />
    </>
  );
};

export { CollapsedLoadingPost, ExpandedLoadingPost };
