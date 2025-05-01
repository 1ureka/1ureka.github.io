import { Avatar, Box, keyframes, Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { memo, useEffect, useMemo, useState } from "react";
import { formatRelativeTime } from "@/utils/formatters";
import { generateStretchRadius } from "@/utils/commonSx";
import { useThinkingMessage } from "@/assistant/hooks/utils";
import { components } from "../markdown/MarkdownComponents";
import { FilledButton } from "./FilledButton";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

const shimmerTextSx = {
  background:
    "linear-gradient(90deg, var(--mui-palette-text-secondary), var(--mui-palette-divider), var(--mui-palette-text-secondary))",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: `${shimmer} 3s linear infinite`,
};

const TimestampDisplay = ({ timestamp }: { timestamp: number }) => {
  const [, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const date = useMemo(() => new Date(timestamp), [timestamp]);
  const formattedTime = formatRelativeTime(date);

  return (
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {formattedTime}
    </Typography>
  );
};

type ChatMessageProps = {
  content: string;
  isUser: boolean;
  timestamp: number;
  status: "loading" | "streaming" | "finished" | "error";
};

const ChatMessage = ({ content, isUser, timestamp, status }: ChatMessageProps) => {
  const thinkingText = useThinkingMessage(status === "loading");

  return (
    <Stack
      sx={{
        gap: 1.5,
        alignItems: isUser ? "flex-end" : "flex-start",
        animation: `${fadeIn} 0.3s ease`,
        width: 1,
        maxWidth: 1200,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar className="mode-light" variant="rounded" sx={{ bgcolor: isUser ? "primary.main" : "action.active" }}>
          {isUser ? <PersonRoundedIcon /> : <AutoAwesomeRoundedIcon />}
        </Avatar>

        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
          <Typography>{isUser ? "使用者" : "Blender RAG 助手"}</Typography>
          <TimestampDisplay timestamp={timestamp} />
        </Box>
      </Box>

      <Box sx={{ width: 1, display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
        <Box sx={{ position: "relative", p: isUser ? 2.5 : 3.5, transform: "translateZ(0)" }}>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "background.paper",
              outline: 1,
              outlineColor: "border.main",
              zIndex: -1,
              ...generateStretchRadius([2, 1.8]),
            }}
          />

          {status === "loading" ? (
            <Typography variant="subtitle1" component="span" sx={shimmerTextSx}>
              {thinkingText}
            </Typography>
          ) : status === "error" ? (
            <Typography variant="subtitle1" component="span" sx={{ color: "error.main" }}>
              發生錯誤，請稍後再試
            </Typography>
          ) : (
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          )}
        </Box>
      </Box>

      {!isUser && status === "finished" && <FilledButton title="重新生成" Icon={RestartAltRoundedIcon} />}
    </Stack>
  );
};

const memoizedChatMessage = memo(ChatMessage);

export { memoizedChatMessage as ChatMessage };
