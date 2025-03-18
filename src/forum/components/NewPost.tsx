import { Autocomplete, Box, Button, Chip, Divider } from "@mui/material";
import { IconButton, Menu, TextField, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { useState } from "react";
import { posts } from "../test";

const recommendedTags = posts.flatMap((post) => post.tags).reduce((acc, tag) => acc.add(tag), new Set<string>());

const NewPost = ({ user }: { user: string }) => {
  const [tags, setTags] = useState<string[]>([]);

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
        <TextField fullWidth label="標題" variant="filled" sx={{ mb: 0.5 }} />
        <TextField
          multiline
          fullWidth
          placeholder="分享你的想法..."
          variant="filled"
          minRows={6}
          maxRows={12}
          size="small"
          sx={{ mb: 1 }}
        />
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
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleAddTagClose}
            slotProps={{
              paper: {
                sx: { borderRadius: 3, scale: "0.9" },
              },
              list: {
                disablePadding: true,
                dense: true,
                component: "div",
                sx: { display: "flex", gap: 1, p: 1, pt: 0, alignItems: "flex-end" },
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
            <IconButton size="small">
              <EmojiEmotionsRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="插入照片" arrow>
            <IconButton size="small">
              <InsertPhotoRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="附加檔案" arrow>
            <IconButton size="small">
              <AttachFileRoundedIcon fontSize="small" />
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
