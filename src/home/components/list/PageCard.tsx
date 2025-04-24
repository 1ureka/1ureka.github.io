import { BoxM } from "@/components/Motion";
import { Box, Button, Chip, Stack, Typography, useColorScheme } from "@mui/material";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import type { Highlight } from "@/hooks/fuse";
import type { IconProps } from "@mui/material";
import { ellipsisSx } from "@/utils/commonSx";

export type PageCardProps = {
  Icon: React.FC<{ sx: IconProps["sx"] }>;
  title: Highlight[];
  href: string;
  color: string;
};

const bgSize = "4.5rem";
const hoverBgSize = "5.5rem";

export const PageCard = ({ Icon, title, href, color }: PageCardProps) => {
  const { mode, systemMode } = useColorScheme();
  const isLight = mode === "light" || (mode === "system" && systemMode === "light");

  return (
    <BoxM
      className="page-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      layout
      sx={{ position: "relative", bgcolor: "action.hover", borderRadius: 3, overflow: "hidden" }}
    >
      <Box
        className="mode-light"
        sx={{
          clipPath: `circle(${bgSize} at 0% 50%)`,
          ".page-card:hover > &": { clipPath: `circle(${hoverBgSize} at 0% 50%)` },
          transition: "clip-path 0.5s ease",
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          bgcolor: isLight ? color : `color-mix(in srgb, ${color} 75%, black)`,
        }}
      />

      <Button
        href={href}
        sx={{
          p: 0,
          color: "inherit",
          textTransform: "none",
          display: "block",
          width: 1,
          textAlign: "left",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Box sx={{ position: "relative", display: "flex", alignItems: "stretch", p: 1, gap: 1 }}>
          <Box className="mode-light" sx={{ aspectRatio: 1, display: "grid", placeItems: "center", mx: 2 }}>
            <Icon sx={{ display: "block", color: "background.default", opacity: 0.35, scale: 1.75 }} />
          </Box>

          <Stack sx={{ flex: 1, p: 1, justifyContent: "center" }}>
            <Typography variant="h6" component="h6">
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
            <Typography variant="body2" component="p" sx={{ color: "text.secondary", ...ellipsisSx }}>
              {window.location.origin + href}
            </Typography>
          </Stack>

          <Stack sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
            <Chip
              variant="outlined"
              avatar={
                <Box sx={{ display: "grid", placeItems: "center" }}>
                  <InsertDriveFileRoundedIcon fontSize="small" />
                </Box>
              }
              label={"頁面"}
              sx={{ fontSize: "1rem" }}
            />
          </Stack>
        </Box>
      </Button>
    </BoxM>
  );
};
