import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PsychologyRoundedIcon from "@mui/icons-material/PsychologyRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";

import { useResponsiveFontSize } from "../utils/theme";
import { AppWrapper } from "@/assistant/components/AppWrapper";
import { ThemeSwitch } from "../components/ThemeSwitch";
import { generateStretchRadius } from "@/utils/commonSx";

const examples = [
  { Icon: DescriptionRoundedIcon, title: "在 Blender 中，材質節點是什麼？", description: "功能概要介紹" },
  { Icon: PsychologyRoundedIcon, title: "怎麼讓角色骨架自動綁定權重？", description: "操作流程說明" },
  { Icon: QuestionMarkRoundedIcon, title: "為什麼我無法匯入 FBX 檔？", description: "具體問題解決" },
];

function App() {
  useResponsiveFontSize();

  return (
    <AppWrapper>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          scale: 1.03333,
          opacity: "var(--mui-palette-bgOpacity-main)",
          transition: "opacity 0.2s ease-in-out",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, filter: "contrast(2) saturate(0.7)" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <rect fill="#8179D2" width="1200" height="800" />
            <defs>
              <radialGradient id="a" cx="0" cy="800" r="800" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#758ad2" />
                <stop offset="1" stopColor="#758ad2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="b" cx="1200" cy="800" r="800" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9b78d2" />
                <stop offset="1" stopColor="#9b78d2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="c" cx="600" cy="0" r="600" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#7b74d2" />
                <stop offset="1" stopColor="#7b74d2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="d" cx="600" cy="800" r="600" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#8179D2" />
                <stop offset="1" stopColor="#8179D2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="e" cx="0" cy="0" r="800" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#71A6D2" />
                <stop offset="1" stopColor="#71A6D2" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="f" cx="1200" cy="0" r="800" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#B676D2" />
                <stop offset="1" stopColor="#B676D2" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect fill="url(#a)" width="1200" height="800" />
            <rect fill="url(#b)" width="1200" height="800" />
            <rect fill="url(#c)" width="1200" height="800" />
            <rect fill="url(#d)" width="1200" height="800" />
            <rect fill="url(#e)" width="1200" height="800" />
            <rect fill="url(#f)" width="1200" height="800" />
          </svg>
        </Box>

        <Box sx={{ position: "absolute", inset: 0, backdropFilter: "blur(20px)" }} />
      </Box>

      <Stack sx={{ minHeight: "100dvh" }}>
        <Box
          component="header"
          sx={{
            position: "sticky",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            top: 0,
            p: 3.5,
            zIndex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <AutoAwesomeRoundedIcon
              sx={{ fontSize: "2.8rem", bgcolor: "text.secondary", borderRadius: 1, color: "background.default", p: 1 }}
            />
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontFamily: "timemachine-wa", fontSize: "1.85rem", display: { xs: "none", sm: "block" } }}
            >
              對話樣板
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "stretch", gap: 2 }}>
            <ThemeSwitch />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderRadius: 1,
                bgcolor: "FilledInput.bg",
                p: 1.5,
              }}
            >
              <Box sx={{ position: "relative", p: 1 }}>
                <Box sx={{ position: "absolute", inset: 0, bgcolor: "success.light", borderRadius: 99, scale: 0.7 }} />
              </Box>
              <Typography variant="body2" sx={{ textWrap: "nowrap", lineHeight: 1 }}>
                伺服器狀態：已啟動
              </Typography>
            </Box>
          </Box>
        </Box>

        <Stack
          component="main"
          sx={{ position: "relative", justifyContent: "space-between", alignItems: "center", flex: 1, p: 3.5, gap: 10 }}
        >
          <Stack sx={{ alignItems: "center" }}>
            <AutoAwesomeRoundedIcon
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
                <Stack
                  key={i}
                  sx={{
                    position: "relative",
                    p: 3,
                    outline: 1,
                    outlineColor: "border.main",
                    "&:hover": { outlineColor: "divider", outlineWidth: 10 },
                    "&:has(:focus)": { outlineColor: "primary.main", outlineWidth: 5 },
                    "&:has(:focus-visible)": { outlineColor: "primary.main", outlineWidth: 5 },
                    "&:active": { outlineColor: "primary.main", outlineWidth: 5 },
                    transition: "outline 0.15s ease",
                    bgcolor: "background.paper",
                    overflow: "hidden",
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

                  <Box>
                    <Typography variant="h6" component="h6">
                      {title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" component="p" sx={{ color: "text.secondary" }}>
                      {description}
                    </Typography>
                  </Box>

                  <IconButton
                    centerRipple={false}
                    sx={{ position: "absolute", inset: 0, ...generateStretchRadius([2, 1.8]) }}
                  />
                </Stack>
              ))}
            </Box>

            <Box>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                maxRows={5}
                placeholder="問我任何關於 Blender 手冊的問題..."
                sx={{
                  "& fieldset": { border: "none" },
                  "& > div": { px: 3 },
                  outline: 1,
                  outlineColor: "border.main",
                  "&:hover": { outlineColor: "divider", outlineWidth: 10 },
                  "&:has(:focus)": { outlineColor: "primary.main", outlineWidth: 5 },
                  "&:has(:focus-visible)": { outlineColor: "primary.main", outlineWidth: 5 },
                  transition: "outline 0.15s ease",
                  bgcolor: "background.paper",
                  ...generateStretchRadius([2, 1.8]),
                }}
              />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </AppWrapper>
  );
}

export default App;
