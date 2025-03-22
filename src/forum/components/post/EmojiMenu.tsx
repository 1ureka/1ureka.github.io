import { Box, Divider, IconButton, Menu, Tooltip, Typography } from "@mui/material";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import { useState } from "react";

const emojiGroups = [
  { name: "表情", emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇"] },
  { name: "手勢", emojis: ["👍", "👎", "✌️", "🤞", "👌", "🤟", "👏", "🙌", "🤝", "👊"] },
  { name: "符號", emojis: ["❤️", "💔", "💯", "✨", "🔥", "💩", "⭐", "🌟", "💪", "🎉"] },
  { name: "動物", emojis: ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐨", "🦁", "🐮"] },
];

const EmojiMenu = ({ onEmojiClick, disabled }: { onEmojiClick: (emoji: string) => void; disabled: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleEmojiMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEmojiMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="表情符號" arrow>
        <span>
          <IconButton size="small" onClick={handleEmojiMenuOpen} disabled={disabled}>
            <EmojiEmotionsRoundedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
                    if (!disabled) onEmojiClick(emoji);
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
    </>
  );
};

export { EmojiMenu };
