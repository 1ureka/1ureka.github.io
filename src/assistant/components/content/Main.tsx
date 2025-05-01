import { Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { generateStretchRadius } from "@/utils/commonSx";
import { ExampleQuestions } from "../chat/ExampleQuestions";
import { ChatMessages } from "../chat/ChatMessages";
import { ChatCTA } from "../chat/ChatCTA";

const Main = () => {
  return (
    <Stack
      component="main"
      sx={{ position: "relative", justifyContent: "space-between", alignItems: "center", flex: 1, p: 3.5, gap: 10 }}
    >
      <Stack sx={{ alignItems: "center", textAlign: "center" }}>
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

      <Stack sx={{ alignItems: "center", gap: 5, width: 1 }}>
        <ExampleQuestions />

        <ChatMessages />

        <ChatCTA />
      </Stack>
    </Stack>
  );
};

export { Main };
