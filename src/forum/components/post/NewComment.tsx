import { useSession } from "@/forum/hooks/session";
import { Avatar, Box, Button, TextField, type BoxProps } from "@mui/material";
import { useState } from "react";
import { EmojiMenu } from "./EmojiMenu";

const NewComment = ({ sx, ...props }: BoxProps) => {
  const { user, authenticated, loading } = useSession();

  const [content, setContent] = useState("");

  // 插入表情符號到內容中
  const handleEmojiInsert = (emoji: string) => {
    setContent((prevContent) => {
      const textField = document.querySelector(
        "input[name='comment'], textarea[name='comment']"
      ) as HTMLTextAreaElement;

      if (textField) {
        const start = textField.selectionStart || 0;
        const end = textField.selectionEnd || 0;

        // 在光標位置插入表情符號
        const newContent = prevContent.substring(0, start) + emoji + prevContent.substring(end);

        // 在下一個更新後設置光標位置
        setTimeout(() => {
          textField.focus();
          textField.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);

        return newContent;
      }

      // 如果無法獲取光標位置，則直接附加到文本末尾
      return prevContent + emoji;
    });
  };

  return (
    <Box sx={{ position: "relative", py: 1, px: 2, ...sx }} {...props}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
        {authenticated && user ? (
          <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem", mt: 1.5 }}>
            {user.name.slice(0, 1).toUpperCase()}
          </Avatar>
        ) : (
          <Avatar sx={{ width: "2rem", height: "2rem", mt: 1.5 }} />
        )}

        <Box sx={{ flex: 1 }} component="form">
          <TextField
            variant="standard"
            size="small"
            name="comment"
            label={authenticated ? "發表你的想法" : "登入後即可發表留言"}
            fullWidth
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!authenticated || loading}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, alignItems: "center", gap: 1 }}>
            <EmojiMenu onEmojiClick={handleEmojiInsert} disabled={!authenticated || loading} />

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="small"
                disabled={!authenticated || loading}
                sx={{ color: "text.secondary" }}
                onClick={() => setContent("")}
              >
                取消
              </Button>
              <Button
                size="small"
                disabled={!authenticated || loading || content.trim().length === 0}
                variant="contained"
              >
                留言
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { NewComment };
