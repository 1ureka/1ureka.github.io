import { Stack, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { generateStretchRadius } from "@/utils/commonSx";
import { ExampleQuestions } from "../chat/ExampleQuestions";
import { ChatMessage } from "../chat/ChatMessage";
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

        {/* <ChatMessage
          content="在 Blender 中，材質節點是什麼？"
          isUser={true}
          timestamp={Date.now()}
          isThinking={false}
        />

        <ChatMessage
          content="材質節點是 Blender 中用來定義材質的工具，透過節點連接，可以創建複雜的材質效果。 材質節點是 Blender 中用來定義材質的工具，透過節點連接，可以創建複雜的材質效果。 材質節點是 Blender 中用來定義材質的工具，透過節點連接，可以創建複雜的材質效果。 材質節點是 Blender 中用來定義材質的工具，透過節點連接，可以創建複雜的材質效果。"
          isUser={false}
          timestamp={Date.now()}
          isThinking={true}
        /> */}

        <ChatCTA />
      </Stack>
    </Stack>
  );
};

export { Main };
