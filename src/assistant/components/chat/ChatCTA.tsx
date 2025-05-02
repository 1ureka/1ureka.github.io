import { Box, Button, TextField, Typography } from "@mui/material";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";

import { useSubmitChat } from "@/assistant/hooks/api";
import { useState } from "react";
import { generateStretchRadius } from "@/utils/commonSx";
import { OutlinedInteractionSx } from "@/assistant/utils/commonSx";

import { z } from "zod";
const InputSchema = z.string().max(500, "問題過長，請簡化後再試一次").trim().min(1, "請輸入問題");

const ChatCTA = () => {
  const [input, setInput] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { handleSubmit, loading } = useSubmitChat();
  const handleClick = () => {
    const result = InputSchema.safeParse(input);
    if (!result.success) return console.error(result.error.issues[0].message);

    setInput("");
    handleSubmit(result.data);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, width: 1, maxWidth: 750 }}>
      <TextField
        variant="outlined"
        fullWidth
        multiline
        maxRows={5}
        placeholder="問我任何關於 Blender 手冊的問題..."
        value={input}
        onChange={handleInputChange}
        sx={{
          "& fieldset": { border: "none" },
          "& > div": { px: 3 },
          bgcolor: "background.paper",
          ...OutlinedInteractionSx,
          ...generateStretchRadius([2, 1.8]),
        }}
      />

      <Box sx={{ ...OutlinedInteractionSx, ...generateStretchRadius([2, 1.8]), height: 56, outlineOffset: -1 }}>
        <Button
          variant="contained"
          endIcon={<NavigationRoundedIcon sx={{ rotate: "90deg" }} />}
          sx={{ textWrap: "nowrap", height: 1, ...generateStretchRadius([2, 1.8]) }}
          disableElevation
          onClick={handleClick}
          loading={loading}
        >
          <Typography>送出</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export { ChatCTA };
