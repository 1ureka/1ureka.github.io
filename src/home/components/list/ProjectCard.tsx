import { Box, Chip, keyframes, LinearProgress, Stack, Typography, useMediaQuery } from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import HardwareRoundedIcon from "@mui/icons-material/HardwareRounded";
import { BoxM } from "@/components/Motion";
import type { Highlight } from "@/hooks/fuse";

const scrollKeyframes = keyframes`
  from {
    translate: -50% 0;
  }
  to {
    translate: 50% 0;
  }
`;

const getProgressLabel = (p: number): string => {
  if (p <= 10) return "剛起步";
  if (p <= 30) return "初步架構完成";
  if (p <= 50) return "功能建構中";
  if (p <= 70) return "進入整合階段";
  if (p <= 90) return "細節優化中";
  return "快完成了！";
};

export type ProjectCardProps = {
  title: Highlight[];
  description: Highlight[];
  progress?: number;
  color: string;
  icon: React.ReactNode;
  /** CTA 的文字，例如「開始探索」 */
  actionLabel?: string;
  actionHref: string;
  /** 預覽圖片的url */
  images?: string[];
};

export const ProjectCard = ({
  title,
  description,
  progress = 0,
  color,
  icon,
  actionLabel = "開始探索",
  actionHref,
  images = [...Array(16)].map(() => ""),
}: ProjectCardProps) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <BoxM
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      layout
      sx={{ height: "400px", position: "relative", borderRadius: 2, overflow: "hidden" }}
    >
      <Box sx={{ position: "absolute", inset: 0, bgcolor: color, opacity: 0.4, pointerEvents: "none", zIndex: 1 }} />

      <Stack sx={{ height: 1 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", p: 2, pb: { xs: 0, sm: 2 } }}>
          {icon}
          <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
            <Typography variant="h4" component="h2" sx={{ fontFamily: "timemachine-wa", textWrap: "nowrap" }}>
              {title.map(({ text, highlight }, i) => (
                <Typography
                  key={i}
                  variant="h4"
                  component="span"
                  sx={{
                    fontFamily: "inherit",
                    color: highlight ? `color-mix(in srgb, yellow, var(--mui-palette-text-primary))` : undefined,
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body2" component="p" sx={{ color: "text.secondary", p: 2, pt: 0 }}>
          {description.map(({ text, highlight }, i) => (
            <Typography
              key={i}
              variant="body2"
              component="span"
              sx={{
                color: highlight ? `color-mix(in srgb, ${color}, var(--mui-palette-text-secondary))` : undefined,
              }}
            >
              {text}
            </Typography>
          ))}
        </Typography>

        <Stack sx={{ alignItems: "center", flex: 1, gap: 1 }}>
          {[...Array(1)].map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", flex: 1 }}
              onMouseEnter={(e) => {
                const targets = e.currentTarget.children;
                Array.from(targets).forEach((e) => {
                  const target = e as HTMLElement;
                  target.style.animationPlayState = "paused";
                });
              }}
              onMouseLeave={(e) => {
                const targets = e.currentTarget.children;
                Array.from(targets).forEach((e) => {
                  const target = e as HTMLElement;
                  target.style.animationPlayState = "running";
                });
              }}
            >
              {[...Array(2)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    height: 1,
                    animation: `${scrollKeyframes} 20s linear infinite`,
                    animationDirection: index === 1 ? "reverse" : "normal",
                  }}
                >
                  {images.slice(index * 8, index * 8 + 8).map((_, i) => (
                    <Box key={i} sx={{ position: "relative", aspectRatio: "16/9", height: 1, px: 0.5 }}>
                      <Box
                        sx={{
                          width: 1,
                          height: 1,
                          borderRadius: 2,
                          overflow: "hidden",
                          bgcolor: "divider",
                          opacity: 0.7,
                        }}
                      ></Box>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))}
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", p: 2 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", pr: { xs: 1, sm: 0 } }}>
            <HardwareRoundedIcon sx={{ fontSize: "1.5em", color: "text.secondary" }} />
            <Typography variant={isSm ? "subtitle1" : "body2"} sx={{ opacity: 0.7 }}>
              {progress === 0 && "準備中"}
              {progress > 0 && progress < 100 && `目前進度 ${progress}%（${getProgressLabel(progress)}）`}
              {progress === 100 && "已完成 ✅"}
            </Typography>
          </Box>

          <Chip
            clickable
            label={actionLabel}
            variant="filled"
            icon={<OpenInNewRoundedIcon />}
            sx={{
              p: 1,
              height: "auto",
              borderRadius: 99,
              "&:hover": { scale: "1.05" },
              scale: "1.001",
              transition: "all 0.2s ease",
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
    </BoxM>
  );
};
