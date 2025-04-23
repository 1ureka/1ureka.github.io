import { Avatar, Box, Button, Chip, Divider, Tooltip, Typography } from "@mui/material";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import PersonPinCircleRoundedIcon from "@mui/icons-material/PersonPinCircleRounded";

import { routes } from "@/routes";
import { useState } from "react";
import { underlineSx } from "@/utils/commonSx";
import { formatRelativeTime } from "@/utils/formatters";

const LikeButton = () => {
  const [state, setState] = useState({ liked: true, likeCount: 15 });
  const toggleLike = () => {
    setState((prev) => ({
      ...prev,
      liked: !prev.liked,
      likeCount: prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
    }));
  };

  return (
    <Tooltip
      title={<Typography variant="body2">{state.liked ? "取消喜歡" : "喜歡"}</Typography>}
      arrow
      placement="left"
    >
      <span>
        <Button
          startIcon={<ThumbUpRoundedIcon />}
          size="small"
          color={state.liked ? "primary" : "inherit"}
          onClick={toggleLike}
        >
          <Typography variant="caption" component="span">
            {state.likeCount} 個讚
          </Typography>
        </Button>
      </span>
    </Tooltip>
  );
};

const post = {
  id: 2,
  title: "Tailwind CSS vs. MUI：哪個適合你的專案？",
  content:
    "在前端開發中，選擇適合的 UI 框架會直接影響專案的成敗。Tailwind CSS 和 MUI 是目前兩個熱門選項，但各有特色，適用於不同場景。\r\n\r\nTailwind CSS：自由與靈活\r\nTailwind 是功能類優先（utility-first）的 CSS 框架，提供大量可組合的工具類。\r\n- 優點：高度自定義、無需自定義 CSS、小體積、開發速度快。\r\n- 缺點：學習曲線陡峭、HTML 標記臃腫、無障礙支援不足、需自行建立元件系統。\r\n\r\nMUI：設計系統與效率\r\nMUI 基於 Google Material Design，提供完整設計系統與豐富元件庫。\r\n- 優點：預製元件豐富、主題系統強大、一致性佳、內建無障礙支援、社區活躍。\r\n- 缺點：打包體積較大、默認樣式明顯、依賴 JavaScript、簡單專案可能過於複雜。\r\n\r\n如何選擇？\r\n- 選擇 Tailwind：適合需要高度自定義、快速開發、小型專案或性能敏感的應用。\r\n- 選擇 MUI：適合企業級應用、時間有限、重視無障礙功能，或需要設計系統支援的專案。\r\n\r\n個人觀點\r\n我更偏好 MUI，因為它提供完整的設計系統，確保視覺一致性；元件庫成熟，節省開發時間；主題系統靈活，適應不同需求。\r\n\r\n結論\r\nTailwind 與 MUI 各有優缺點，關鍵在於專案需求與團隊技能。甚至可將兩者結合，使用 MUI 元件系統配合 Tailwind 進行細微樣式調整，達到最佳效果。",
  tags: ["CSS", "MUI", "Tailwind", "前端設計"],
  attachments: [{ name: "document.pdf", size: 8564, url: "/attachments/document.pdf" }],
  viewCount: 1988,
  createdAt: Date.now() - 3 * 30 * 24 * 60 * 60 * 1000,
  updatedAt: Date.now() - 2 * 30 * 24 * 60 * 60 * 1000,
  userId: 3,
  userName: "Bob Smith",
  likeCount: 15,
  commentCount: 3,
  isFromFollowing: true,
  isSelf: false,
};

const UserAvatar = ({ name }: { name: string }) => {
  return (
    <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
      <Typography sx={{ translate: "0px 5%" }}>{name.slice(0, 1).toUpperCase()}</Typography>
    </Avatar>
  );
};

const PostHeader = () => {
  const isUpdated = Math.abs(post.updatedAt - post.createdAt) > 1000;
  const createdAt = new Date(post.createdAt);
  const updatedAt = new Date(post.updatedAt);
  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
      <UserAvatar name={post.userName} />
      <Typography
        variant="subtitle1"
        component="a"
        href={`${routes.forum_users}?user=${post.userName}`}
        sx={{
          color: "text.secondary",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline", color: "text.primary" },
        }}
      >
        by {post.userName}
      </Typography>
      <Box sx={{ flex: 1 }} />
      {isUpdated ? (
        <Tooltip title={<Typography variant="body2">{`上次編輯於 ${updatedAt.toLocaleString()}`}</Typography>} arrow>
          <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9, ...underlineSx }}>
            {formatRelativeTime(createdAt)} (已編輯)
          </Typography>
        </Tooltip>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9 }}>
          {formatRelativeTime(createdAt)}
        </Typography>
      )}
    </Box>
  );
};

const TopicTags = () => {
  const displayCount = 3;
  const { tags, id: postId } = post;
  return (
    <>
      {tags.map(
        (tag, i) =>
          i < displayCount && (
            <Chip
              key={tag}
              label={tag}
              clickable
              size="small"
              component="a"
              href={`${routes.forum_posts}?topic=${tag}`}
            />
          )
      )}
      {tags.length > displayCount && (
        <Chip
          label={`+${tags.length - displayCount}`}
          clickable
          size="small"
          variant="outlined"
          component="a"
          href={`${routes.forum_post}?postId=${postId}`}
        />
      )}
    </>
  );
};

const PostDemo = () => {
  const handleNavigateToPost = () => (window.location.href = `${routes.forum_post}?postId=${2}`);

  return (
    <>
      <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }} onClick={handleNavigateToPost}>
        <PostHeader />

        <Typography
          variant="h6"
          component="h3"
          sx={{
            textAlign: "start",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          component="p"
          sx={{
            color: "text.secondary",
            textAlign: "start",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "pre-line",
          }}
        >
          {post.content}
        </Typography>

        <Box sx={{ display: "flex", gap: 1.5, mt: 2, alignItems: "center" }}>
          <TopicTags />

          {(post.isFromFollowing || post.isSelf) && (
            <>
              <Box sx={{ flex: 1 }} />
              {post.isFromFollowing && (
                <Chip size="small" label={"來自追蹤者"} variant="outlined" icon={<PersonPinCircleRoundedIcon />} />
              )}
              {post.isSelf && (
                <Chip size="small" label={"我的貼文"} variant="outlined" icon={<PersonPinCircleRoundedIcon />} />
              )}
            </>
          )}
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

        <LikeButton />

        <Button
          color="inherit"
          startIcon={<CommentRoundedIcon />}
          size="small"
          href={`${routes.forum_post}?postId=${post.id}`}
        >
          <Typography variant="caption" component="span">
            {post.commentCount} 則回覆
          </Typography>
        </Button>

        <Button
          startIcon={<VisibilityRoundedIcon />}
          disabled
          size="small"
          sx={{ "button&.Mui-disabled": { color: "text.secondary", opacity: 0.8 } }}
        >
          <Typography variant="caption" component="span">
            {post.viewCount} 次瀏覽
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export { PostDemo };
