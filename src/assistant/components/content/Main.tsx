import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";

import { generateStretchRadius } from "@/utils/commonSx";
import { useApiStatus } from "@/assistant/hooks/api";
import { useState } from "react";
import { z } from "zod";

const examples = [
  { Icon: DescriptionRoundedIcon, title: "在 Blender 中，材質節點是什麼？", description: "功能概要介紹" },
  { Icon: PsychologyRoundedIcon, title: "怎麼讓角色骨架自動綁定權重？", description: "操作流程說明" },
  { Icon: QuestionMarkRoundedIcon, title: "為什麼我無法匯入 FBX 檔？", description: "具體問題解決" },
];

const OutlinedInteractionSx = {
  outline: 1,
  outlineColor: "border.main",
  "&:hover": { outlineColor: "divider", outlineWidth: 10 },
  "&:has(:focus)": { outlineColor: "primary.main", outlineWidth: 5 },
  "&:has(:focus-visible)": { outlineColor: "primary.main", outlineWidth: 5 },
  "&:active": { outlineColor: "primary.main", outlineWidth: 5 },
  transition: "outline 0.15s ease",
} as const;

const ExampleBlock = ({ Icon, title, description }: (typeof examples)[number]) => {
  const apiStatus = useApiStatus();
  const isConnected = apiStatus === "connected";

  const handleClick = () => {
    if (!isConnected) return console.warn("API 已斷開連線或正在啟動中");
    console.log("API 已連線，執行相關操作");
  };

  return (
    <Stack
      sx={{
        position: "relative",
        p: 3,
        bgcolor: "background.paper",
        overflow: "hidden",
        ...OutlinedInteractionSx,
        ...generateStretchRadius([2, 1.8]),
      }}
    >
      <Box sx={{ pb: 1.5 }}>
        <Icon
          sx={{
            fontSize: "3rem",
            bgcolor: "text.secondary",
            color: "background.default",
            p: 1,
            ...generateStretchRadius([1.8, 1.6]),
          }}
        />
      </Box>

      <Typography variant="h6" component="h6">
        {title}
      </Typography>
      <Typography variant="body1" component="p" sx={{ color: "text.secondary" }}>
        {description}
      </Typography>

      <IconButton
        centerRipple={false}
        sx={{ position: "absolute", inset: 0, ...generateStretchRadius([2, 1.8]) }}
        onClick={handleClick}
      />
    </Stack>
  );
};

const InputSchema = z.string().max(500, "問題過長，請簡化後再試一次").trim().min(1, "請輸入問題");

const CTA = () => {
  const apiStatus = useApiStatus();
  const isConnected = apiStatus === "connected";

  const [input, setInput] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    const result = InputSchema.safeParse(input);
    if (!result.success) return console.warn(result.error.issues[0].message);
    if (!isConnected) return console.warn("API 已斷開連線或正在啟動中");

    console.log("API 已連線，執行相關操作");
    setInput("");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
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
        >
          <Typography>送出</Typography>
        </Button>
      </Box>
    </Box>
  );
};

const Main = () => {
  return (
    <Stack
      component="main"
      sx={{ position: "relative", justifyContent: "space-between", alignItems: "center", flex: 1, p: 3.5, gap: 10 }}
    >
      <Stack sx={{ alignItems: "center" }}>
        <AutoAwesomeRoundedIcon
          className="mode-light"
          sx={{
            fontSize: "6rem",
            bgcolor: "text.secondary",
            color: "background.default",
            p: 1,
            mb: 4,
            ...generateStretchRadius([3.2, 2.9]),
          }}
        />
        <Typography variant="h3" component="h1" sx={{ opacity: 0.6, mb: 0.5 }}>
          嗨，Blender 使用者
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          有什麼想知道的嗎？
        </Typography>
        <Typography variant="h6" component="p" sx={{ textAlign: "center", maxWidth: 600, color: "text.secondary" }}>
          不管是想快速了解功能、查詢操作流程，還是遇到具體問題，我都能即時協助，並用繁體中文回覆你！
        </Typography>
      </Stack>

      <Stack sx={{ alignItems: "stretch", maxWidth: 750, gap: 5 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
          {examples.map(({ Icon, title, description }, i) => (
            <ExampleBlock key={i} Icon={Icon} title={title} description={description} />
          ))}
        </Box>

        <CTA />
      </Stack>
    </Stack>
  );
};

export { Main };
