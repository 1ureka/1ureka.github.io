import { Avatar, Box, keyframes, Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { formatRelativeTime } from "@/utils/formatters";
import { memo, useEffect, useMemo, useState } from "react";
import { generateStretchRadius } from "@/utils/commonSx";
import { useThinkingMessage } from "@/assistant/hooks/utils";
import { BoxM } from "@/components/Motion";

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
  isThinking: boolean;
};

const ChatMessage = ({ content, isUser, timestamp, isThinking }: ChatMessageProps) => {
  const thinkingText = useThinkingMessage(isThinking);

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
        <Box sx={{ position: "relative", p: 2.5, zIndex: 1 }}>
          <BoxM
            layout
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

          {isThinking ? (
            <Typography variant="subtitle1" component="p" sx={shimmerTextSx}>
              {thinkingText}
            </Typography>
          ) : (
            <Typography>{content}</Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

const memoizedChatMessage = memo(ChatMessage);

export { memoizedChatMessage as ChatMessage };
