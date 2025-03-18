import { Autocomplete, Box, Button, Chip, Divider } from "@mui/material";
import { IconButton, Menu, TextField, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { posts } from "../test";

const recommendedTags = posts.flatMap((post) => post.tags).reduce((acc, tag) => acc.add(tag), new Set<string>());

// 常用表情符號分組
const emojiGroups = [
  { name: "表情", emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"] },
  { name: "手勢", emojis: ["👍", "👎", "✌️", "🤞", "👌", "🤟", "👏", "🙌", "🤝", "👊"] },
  { name: "符號", emojis: ["❤️", "💔", "💯", "✨", "🔥", "💩", "⭐", "🌟", "💪", "🎉"] },
  { name: "動物", emojis: ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐨", "🦁", "🐮"] },
];

const NewPost = ({ user }: { user: string }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);

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
  const open = Boolean(anchorEl);
  const handleAddTagClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleAddTagClose = () => setAnchorEl(null);

  const [tagInput, setTagInput] = useState<string>("");
  const handleAddTag = () => {
    setTags([...tags, tagInput]);
    setTagInput("");
    handleAddTagClose();
  };

  // 表情符號選擇器相關狀態
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null);
  const emojiMenuOpen = Boolean(emojiAnchorEl);

  const handleEmojiMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEmojiAnchorEl(event.currentTarget);
  };
  const handleEmojiMenuClose = () => {
    setEmojiAnchorEl(null);
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
        <Typography variant="h5" component="h2" color="primary" sx={{ opacity: 0.8 }}>
          {user}
        </Typography>
        <Typography variant="h5" component="h2">
          ，你在想些什麼？
        </Typography>
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
          <Chip label="新增標籤" clickable icon={<AddRoundedIcon />} variant="outlined" onClick={handleAddTagClick} />

          {/* 標籤選單 */}
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleAddTagClose}
            slotProps={{
              paper: { sx: { borderRadius: 3, scale: "0.9" } },
              list: {
                disablePadding: true,
                dense: true,
                component: "div",
                sx: { display: "flex", gap: 1, p: 1, pl: 1.5, pt: 0, alignItems: "flex-end" },
              },
            }}
          >
            <Autocomplete
              freeSolo
              options={Array.from(recommendedTags)}
              value={tagInput}
              onChange={(_, value) => setTagInput(value ?? "")}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                if (!tagInput.trim()) return console.error("請輸入標籤名稱");
                e.preventDefault();
                handleAddTag();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  autoFocus
                  required
                  label="標籤"
                  variant="standard"
                  size="small"
                  sx={{ minWidth: 150 }}
                  onChange={(e) => setTagInput(e.target.value)}
                />
              )}
            />
            <Tooltip title={tagInput.trim() ? "添加" : "請輸入標籤名稱"} arrow>
              <span>
                <IconButton disabled={!tagInput.trim()} onClick={handleAddTag} size="small">
                  <AddRoundedIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Menu>
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
          <Tooltip title="表情符號" arrow>
            <IconButton size="small" onClick={handleEmojiMenuOpen}>
              <EmojiEmotionsRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* 表情符號選單 */}
          <Menu
            anchorEl={emojiAnchorEl}
            open={emojiMenuOpen}
            onClose={handleEmojiMenuClose}
            slotProps={{ paper: { sx: { borderRadius: 2, maxHeight: 300, width: 280 } } }}
          >
            {emojiGroups.map((group) => (
              <Box key={group.name} sx={{ px: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", pl: 1 }}>
                  {group.name}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {group.emojis.map((emoji) => (
                    <IconButton
                      key={emoji}
                      size="small"
                      disableRipple
                      onClick={() => {
                        handleEmojiInsert(emoji);
                        handleEmojiMenuClose();
                      }}
                      sx={{
                        fontSize: "1.2rem",
                        p: 0.5,
                        minWidth: "auto",
                        borderRadius: 1,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      {emoji}
                    </IconButton>
                  ))}
                </Box>
                {group !== emojiGroups[emojiGroups.length - 1] && <Divider sx={{ mt: 0.5 }} />}
              </Box>
            ))}
          </Menu>

          <Tooltip title="插入照片" arrow>
            <IconButton size="small" onClick={() => document.getElementById("photo-upload")?.click()}>
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
          </Tooltip>

          <Tooltip title="附加檔案" arrow>
            <IconButton size="small" onClick={() => document.getElementById("file-upload")?.click()}>
              <AttachFileRoundedIcon fontSize="small" />
              <input type="file" id="file-upload" multiple style={{ display: "none" }} onChange={handleFileUpload} />
            </IconButton>
          </Tooltip>
        </Box>

        <Button variant="contained" color="primary" endIcon={<PublishRoundedIcon />}>
          發佈
        </Button>
      </Box>
    </>
  );
};

export { NewPost };
