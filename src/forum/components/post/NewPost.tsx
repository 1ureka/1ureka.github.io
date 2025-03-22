import { Box, Button, Chip, Divider, Skeleton } from "@mui/material";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useState } from "react";
import { useSession } from "@/forum/hooks/session";
import { TopicAutocomplete } from "./TopicAutocomplete";
import { EmojiMenu } from "./EmojiMenu";

const NewPost = () => {
  const { user, authenticated, loading } = useSession();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

  const handleSubmit = () => {
    // TODO: validate form data
    console.log({ title, content, tags, photos, attachments });
  };

  // 處理附件上傳
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFiles = Array.from(event.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);

    // 生成預覽 URL
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPhotoPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFiles = Array.from(event.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...newFiles]);
  };

  // 移除附件
  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoPreviewUrls[index]);

    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setPhotoPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };
  const removeAttachment = (index: number) => {
    setAttachments((prevAttachments) => prevAttachments.filter((_, i) => i !== index));
  };

  // 標籤相關狀態
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleAddTagClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleAddTagClose = () => setAnchorEl(null);
  const handleAddTag = (value: string) => {
    setTags([...tags, value]);
    handleAddTagClose();
  };

  // 插入表情符號到內容中
  const handleEmojiInsert = (emoji: string) => {
    setContent((prevContent) => {
      const textField = document.querySelector('textarea[placeholder="分享你的想法..."]') as HTMLTextAreaElement;

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
    <>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", px: 3 }}>
        <PeopleRoundedIcon
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
        {authenticated ? (
          <>
            <Typography variant="h5" component="h2" color="primary" sx={{ opacity: 0.8 }}>
              {user.name}
            </Typography>
            <Typography variant="h5" component="h2">
              ，你在想些什麼？
            </Typography>
          </>
        ) : loading ? (
          <Skeleton variant="rounded" animation="wave">
            <Typography variant="h5" component="h2">
              登入就能分享你的想法喔 ✨
            </Typography>
          </Skeleton>
        ) : (
          <Typography variant="h5" component="h2">
            登入就能分享你的想法喔 ✨
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ px: 3 }}>
        <TextField
          fullWidth
          label="標題"
          variant="filled"
          sx={{ mb: 0.5 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!authenticated || loading}
        />
        <TextField
          multiline
          fullWidth
          placeholder="分享你的想法..."
          variant="filled"
          minRows={6}
          maxRows={12}
          size="small"
          sx={{ mb: 1 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!authenticated || loading}
        />

        {/* 附件預覽 */}
        {photoPreviewUrls.length > 0 && (
          <Box sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {photoPreviewUrls.map((url, index) => (
              <Box
                key={index}
                sx={{ position: "relative", width: 100, height: 100, borderRadius: 1, overflow: "hidden" }}
              >
                <img
                  src={url}
                  alt={`上傳的圖片 ${index + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  onClick={() => removePhoto(index)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    bgcolor: "divider",
                    color: "white",
                    "&:hover": { bgcolor: "error.main" },
                    p: 0.5,
                  }}
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        {attachments.length > 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
              附件檔案：
            </Typography>
            {attachments.map((file, index) => (
              <Chip
                key={index}
                label={`${file.name} (${(file.size / 1024).toFixed(1)}KB)`}
                onDelete={() => removeAttachment(index)}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
            標籤：
          </Typography>
          {[...new Set(tags)].map((tag) => (
            <Tooltip title="刪除" arrow placement="top" key={tag}>
              <Chip label={tag} clickable onClick={() => setTags(tags.filter((t) => t !== tag))} />
            </Tooltip>
          ))}

          <Chip
            label="新增標籤"
            clickable
            icon={<AddRoundedIcon />}
            variant="outlined"
            onClick={handleAddTagClick}
            disabled={!authenticated || loading}
          />
          <TopicAutocomplete
            type="add"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleAddTagClose}
            onAdd={handleAddTag}
          />
        </Box>
      </Box>

      <Divider sx={{ mt: 1 }} />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 3,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <EmojiMenu onEmojiClick={handleEmojiInsert} disabled={!authenticated || loading} />

          <Tooltip title="插入照片" arrow>
            <span>
              <IconButton
                size="small"
                onClick={() => document.getElementById("photo-upload")?.click()}
                disabled={!authenticated || loading}
              >
                <InsertPhotoRoundedIcon fontSize="small" />
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handlePhotoUpload}
                />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="附加檔案" arrow>
            <span>
              <IconButton
                size="small"
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={!authenticated || loading}
              >
                <AttachFileRoundedIcon fontSize="small" />
                <input type="file" id="file-upload" multiple style={{ display: "none" }} onChange={handleFileUpload} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>

        <Button
          variant="contained"
          color="primary"
          endIcon={<PublishRoundedIcon />}
          onClick={handleSubmit}
          disabled={!authenticated || loading}
        >
          發佈
        </Button>
      </Box>
    </>
  );
};

export { NewPost };
