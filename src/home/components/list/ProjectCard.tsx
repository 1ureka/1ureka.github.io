import { Box, Chip, LinearProgress, Stack, Typography, useColorScheme } from "@mui/material";
import type { IconProps } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";
import WebStoriesRoundedIcon from "@mui/icons-material/WebStoriesRounded";

import { BoxM } from "@/components/Motion";
import type { Highlight } from "@/hooks/fuse";

export type ProjectCardProps = {
  title: Highlight[];
  description: Highlight[];
  progress?: number;
  color: string;
  icon: React.FC<{ sx: IconProps["sx"] }>;
  /** CTA 的文字，例如「開始探索」 */
  actionLabel?: string;
  actionHref: string;
  /** 預覽圖片的url */
  images?: string[];
};

const hoverTransition = "all 0.3s ease" as const;
const hoverTextColor = { ".project-card:hover &": { color: "#fff" }, transition: hoverTransition } as const;

export const ProjectCard = ({
  title,
  description,
  progress = 0,
  color,
  icon,
  actionLabel = "開始探索",
  actionHref,
}: ProjectCardProps) => {
  const { mode, systemMode } = useColorScheme();
  const isLight = mode === "light" || (mode === "system" && systemMode === "light");
  const Icon = icon;

  return (
    <BoxM
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      layout
      sx={{ position: "relative", bgcolor: "action.hover", borderRadius: 3, overflow: "hidden" }}
    >
      <Box
        className="mode-light"
        sx={{
          clipPath: { xs: "circle(65.0% at 50% 5%)", sm: "circle(65.0% at 50% -2%)" },
          ".project-card:hover > &": { clipPath: { xs: "circle(90.0% at 50% 50%)", sm: "circle(90.0% at 50% 50%)" } },
          transition: "clip-path 0.5s ease",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          bgcolor: isLight ? color : `color-mix(in srgb, ${color} 75%, black)`,
        }}
      >
        <Box sx={{ position: "absolute", width: 1, display: "flex", justifyContent: "flex-end", p: 2 }}>
          <Chip
            variant="outlined"
            avatar={
              <Box sx={{ display: "grid", placeItems: "center" }}>
                <WebStoriesRoundedIcon fontSize="small" sx={{ color: "background.default" }} />
              </Box>
            }
            label={"專案"}
            sx={{ color: "background.default", borderColor: "background.default", fontSize: "1rem" }}
          />
        </Box>

        <Box sx={{ height: 0.65, display: "grid", placeItems: "flex-start center", mt: -1.5 }}>
          <Box sx={{ height: 1, aspectRatio: 1 }}>
            <Icon sx={{ display: "block", width: 1, height: 1, color: "background.default", opacity: 0.35 }} />
          </Box>
        </Box>
      </Box>

      <Stack sx={{ position: "relative", height: 1, justifyContent: "space-between" }}>
        <Box sx={{ height: 0.65, display: "grid", placeItems: "flex-start center", mt: -4 }}>
          <Box sx={{ height: 1, aspectRatio: 1 }}>
            <Icon sx={{ display: "block", width: 1, height: 1, color: "background.default", opacity: 0 }} />
          </Box>
        </Box>

        <Stack sx={{ p: 2, pt: 0, gap: 1.5 }}>
          <Box sx={{ ".project-card:hover &": { textShadow: "0 0 10px #0005" }, transition: hoverTransition }}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ fontFamily: "timemachine-wa", textWrap: "nowrap", ...hoverTextColor }}
            >
              {title.map(({ text, highlight }, i) => (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    bgcolor: highlight ? "color-mix(in srgb, yellow 20%, transparent)" : undefined,
                    borderRadius: 2,
                  }}
                >
                  {text}
                </Box>
              ))}
            </Typography>

            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary", ".project-card:hover &": { color: "#fffc" }, transition: hoverTransition }}
            >
              {description.map(({ text, highlight }, i) => (
                <Box
                  key={i}
                  component="span"
                  sx={{
                    bgcolor: highlight ? "color-mix(in srgb, yellow 20%, transparent)" : undefined,
                    borderRadius: 2,
                  }}
                >
                  {text}
                </Box>
              ))}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", pr: { xs: 1, sm: 0 } }}>
              <HardwareRoundedIcon sx={{ fontSize: "1.5em", color: "text.secondary", ...hoverTextColor }} />
              <Typography variant={"body2"} sx={{ opacity: 0.7, ...hoverTextColor }}>
                {progress === 0 && "準備中"}
                {progress > 0 && progress < 100 && `完成進度 ${progress}%`}
                {progress === 100 && "已完成 ✅"}
              </Typography>
            </Box>

            <Chip
              clickable
              label={actionLabel}
              variant="filled"
              icon={<OpenInNewRoundedIcon sx={{ ...hoverTextColor }} />}
              sx={{
                p: 1,
                height: "auto",
                borderRadius: 99,
                "&:hover": { scale: "1.05" },
                scale: "1.001",
                ...hoverTextColor,
              }}
              component="a"
              href={actionHref}
            />

            <LinearProgress
              sx={{ position: "absolute", inset: "auto 0 0 0", opacity: 0.2 }}
              variant="determinate"
              value={progress}
              color="inherit"
            />
          </Box>
        </Stack>
      </Stack>
    </BoxM>
  );
};
