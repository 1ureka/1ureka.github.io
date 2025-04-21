import { Box, Stack, Tooltip, type TooltipProps, Typography, type TypographyProps } from "@mui/material";
import TypeSpecimenRoundedIcon from "@mui/icons-material/TypeSpecimenRounded";

import { ellipsisSx } from "@/utils/commonSx";
import { StripedBackground } from "@/datahub/components/home/charts/StripedBackground";

const TileTitle = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography variant="subtitle1" component="h3" sx={{ color: "text.secondary", textWrap: "nowrap", ...sx }} {...props}>
    {children}
  </Typography>
);

const TileContent = ({ children, sx, ...props }: { children: React.ReactNode } & TypographyProps) => (
  <Typography variant="h5" component="p" sx={{ ...ellipsisSx, ...sx }} {...props}>
    {children}
  </Typography>
);

const TileTooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <Tooltip followCursor slotProps={{ transition: { timeout: { appear: 250, enter: 250, exit: 0 } } }} {...props}>
      {children}
    </Tooltip>
  );
};

const tileIconCommonSx = {
  color: "background.paper",
  bgcolor: "primary.main",
  borderRadius: 1,
  p: 1,
  fontSize: "3rem",
} as const;

type DataArray = {
  type: string;
  count: number;
  percentage: number;
}[];

const dataArray: DataArray = [
  { type: "integer", count: 43, percentage: 0.5972222222222222 },
  { type: "text", count: 13, percentage: 0.18055555555555555 },
  { type: "date", count: 12, percentage: 0.16666666666666666 },
  { type: "其他 (json_array)", count: 4, percentage: 0.05555555555555555 },
] as const;

const xsSpace = 0.5;
const smSpace = 1.5;
const mdSpace = 3;

const ChartDemo = () => {
  return (
    <Stack sx={{ aspectRatio: "2/1.3", position: "relative", p: xsSpace }}>
      <Box
        sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
      >
        <Stack sx={{ gap: 1 }}>
          <TileTitle>最常使用的型別</TileTitle>
          <TileContent variant="h4" sx={{ textTransform: "uppercase" }}>
            {dataArray[0].type}
          </TileContent>
        </Stack>

        <TypeSpecimenRoundedIcon sx={{ ...tileIconCommonSx, mt: 0.5 }} />
      </Box>

      <Box sx={{ flex: 1, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: "auto 0 0 0", p: 1.5, borderRadius: 9, overflow: "clip" }}>
          <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={4} />

          <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "stretch", zIndex: 1 }}>
            {dataArray.map(({ type, count, percentage }, i) => (
              <TileTooltip
                key={i}
                title={
                  <TileContent variant="body1" sx={{ textTransform: "uppercase" }}>
                    {type} 型別使用了 {count} 次
                  </TileContent>
                }
              >
                <Box
                  sx={{
                    width: percentage,
                    "&:hover": { bgcolor: "divider" },
                    opacity: 0.9,
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              </TileTooltip>
            ))}
          </Box>
        </Box>

        <Box sx={{ position: "absolute", inset: "auto 0 0 0", my: 1.5, display: "grid", placeItems: "center" }}>
          <Box sx={{ position: "absolute", width: 1, display: "flex", alignItems: "center" }}>
            {dataArray.map(({ percentage }, i) => (
              <Box
                key={i}
                sx={{ width: percentage, px: 0.5, pl: i === 0 ? 1 : 0.5, pr: i === dataArray.length - 1 ? 1 : 0.5 }}
              >
                <Box
                  sx={{ py: 0.5, borderRadius: 9, bgcolor: "primary.main", filter: `hue-rotate(-${i * 30 + 10}deg)` }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ position: "absolute", inset: 0, display: "flex" }}>
          {dataArray.map(
            ({ type, percentage }, i) =>
              i < dataArray.length - 1 && (
                <Box sx={{ width: percentage, height: 1, position: "relative" }} key={i}>
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      ml: i === 0 ? 1 : 0,
                      mb: 3,
                      borderLeft: 4,
                      borderColor: "divider",
                    }}
                  >
                    <Box sx={{ position: "absolute", inset: "0 auto auto 0" }}>
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "uppercase", color: "text.secondary", ml: 1, ...ellipsisSx }}
                      >
                        {type}
                      </Typography>
                      <TileContent sx={{ textTransform: "uppercase", opacity: 0.8, ml: 1 }}>
                        {Math.round(percentage * 100)}%
                      </TileContent>
                    </Box>
                  </Box>
                </Box>
              )
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: mdSpace,
          p: smSpace,
          alignItems: "center",
          justifyContent: "space-around",
          width: "fit-content",
          minWidth: 0.5,
        }}
      >
        {dataArray.map(({ type }, i) => (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }} key={i}>
            <Box
              sx={{
                borderRadius: 99,
                width: "1rem",
                height: "1rem",
                bgcolor: "primary.main",
                filter: `hue-rotate(-${i * 30 + 10}deg)`,
              }}
            />
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary", textTransform: "uppercase", ...ellipsisSx }}
            >
              {type}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export { ChartDemo };
