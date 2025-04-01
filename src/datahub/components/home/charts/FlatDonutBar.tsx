import { Box, Stack, Typography } from "@mui/material";
import TypeSpecimenRoundedIcon from "@mui/icons-material/TypeSpecimenRounded";

import { StripedBackground } from "./StripedBackground";
import { TileContent, TileTitle } from "../TileText";
import { TileTooltip } from "../TileTooltip";
import { ellipsisSx, mdSpace, smSpace, tileIconCommonSx } from "../commonSx";

const FlatDonutBar = () => {
  // 假資料，實際上應該從 API 獲取且排序好，若多於 3 筆，則取前 3 筆，並將其他的合併為 Others
  const data: { [dataType: string]: number } = {
    text: 25,
    integer: 15,
    real: 5,
  };

  const { key: mostUsedType } = Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (value > acc.value) return { key, value };
      return acc;
    },
    { key: "", value: 0 }
  );

  const totalCount = Object.values(data).reduce((acc, value) => acc + value, 0);

  const dataArray = Object.entries(data).map(([key, value]) => ({
    dataType: key,
    count: value,
    percentage: value / totalCount,
  }));

  return (
    <Stack
      sx={{
        aspectRatio: { xs: "2/1", ml: "2/1.2" },
        borderTop: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      <Box
        sx={{ display: "flex", gap: smSpace, justifyContent: "space-between", alignItems: "flex-start", p: smSpace }}
      >
        <Stack sx={{ gap: 1 }}>
          <TileTitle>最常使用的型別</TileTitle>
          <TileContent variant="h4" sx={{ textTransform: "uppercase" }}>
            {mostUsedType}
          </TileContent>
        </Stack>

        <TypeSpecimenRoundedIcon sx={{ ...tileIconCommonSx, mt: 0.5 }} />
      </Box>

      <Box sx={{ flex: 1, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: "auto 0 0 0", p: 1.5, borderRadius: 9, overflow: "clip" }}>
          <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={4} />

          <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "stretch", zIndex: 1 }}>
            {dataArray.map(({ dataType, count, percentage }) => (
              <TileTooltip
                key={dataType}
                title={
                  <TileContent variant="body1" sx={{ textTransform: "uppercase" }}>
                    {dataType} 型別使用了 {count} 次
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
            {dataArray.map(({ dataType, percentage }, i) => (
              <Box
                sx={{ width: percentage, px: 0.5, pl: i === 0 ? 1 : 0.5, pr: i === dataArray.length - 1 ? 1 : 0.5 }}
                key={dataType}
              >
                <Box
                  sx={{ py: 0.5, borderRadius: 9, bgcolor: "primary.main", filter: `hue-rotate(-${i * 30 + 10}deg)` }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ position: "absolute", inset: 0, display: "flex" }}>
          {dataArray.map(({ dataType, percentage }, i) => (
            <Box sx={{ width: percentage, height: 1, position: "relative" }} key={dataType}>
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
                  <Typography variant="body2" sx={{ textTransform: "uppercase", color: "text.secondary", ml: 1 }}>
                    {dataType}
                  </Typography>
                  <TileContent sx={{ textTransform: "uppercase", opacity: 0.8, ml: 1 }}>
                    {Math.round(percentage * 100)}%
                  </TileContent>
                </Box>
              </Box>
            </Box>
          ))}
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
        {dataArray.map(({ dataType }, i) => (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }} key={dataType}>
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
              {dataType}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export { FlatDonutBar };
