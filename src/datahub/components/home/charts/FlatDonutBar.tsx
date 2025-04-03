import { Box, Chip, CircularProgress, Skeleton, Stack, Typography } from "@mui/material";
import type { SkeletonProps } from "@mui/material";
import TypeSpecimenRoundedIcon from "@mui/icons-material/TypeSpecimenRounded";

import { StripedBackground } from "./StripedBackground";
import { TileContent, TileTitle } from "../TileText";
import { TileTooltip } from "../TileTooltip";
import { chartChangeTransition, ellipsisSx, mdSpace, smSpace, tileIconCommonSx } from "../commonSx";

import { useTableInfo } from "@/datahub/hooks/read";
import { useMemo } from "react";

const SkeletonWrapper = ({ children, loading, ...props }: SkeletonProps & { loading: boolean }) => {
  if (!loading) return children;
  return (
    <Skeleton variant="rounded" animation="wave" {...props}>
      {children}
    </Skeleton>
  );
};

type DataArray = {
  type: string;
  count: number;
  percentage: number;
}[];

const FlatDonutBar = () => {
  const { data: tableInfo, isFetching } = useTableInfo({ types: ["table", "view"] });

  const dataArray: DataArray | null = useMemo(() => {
    if (!tableInfo || isFetching) return null;

    const typeCount: Record<string, number> = {};
    let total = 0;
    tableInfo.forEach((columnInfo) => {
      columnInfo.forEach(({ type }) => {
        typeCount[type] = (typeCount[type] || 0) + 1;
        total += 1;
      });
    });

    // 選擇前三個或佔比 ≥10% 的項目，其他歸為「其他」
    const selected: [string, number][] = [];
    const otherTypes = new Set<string>();
    let otherCount = 0;

    for (const [type, count] of Object.entries(typeCount).sort((a, b) => b[1] - a[1])) {
      const percentage = count / total;
      if (selected.length < 3 || percentage >= 0.1) selected.push([type, count]);
      else {
        otherCount += count;
        otherTypes.add(type);
      }
    }

    if (otherCount > 0) {
      const preview = Array.from(otherTypes).slice(0, 5);
      const previewStr = preview.join(", ") + (preview.length > 5 ? ", ..." : "");
      selected.push([`其他 (${previewStr})`, otherCount]);
    }

    // 建立結果
    return selected.map(([type, count]) => ({
      type,
      count,
      percentage: count / total,
    }));
  }, [tableInfo, isFetching]);

  const loading = dataArray === null;
  const notEnoughData = !loading && dataArray.length < 3;
  const showChart = !loading && !notEnoughData;

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
          <SkeletonWrapper loading={loading}>
            <TileContent variant="h4" sx={{ textTransform: "uppercase" }}>
              {loading ? "載入中" : notEnoughData ? "N/A" : dataArray[0].type}
            </TileContent>
          </SkeletonWrapper>
        </Stack>

        <TypeSpecimenRoundedIcon sx={{ ...tileIconCommonSx, mt: 0.5 }} />
      </Box>

      <Box sx={{ flex: 1, position: "relative" }}>
        <Box sx={{ position: "absolute", inset: "auto 0 0 0", p: 1.5, borderRadius: 9, overflow: "clip" }}>
          <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={4} />

          {showChart && (
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
          )}
        </Box>

        <Box sx={{ position: "absolute", inset: "auto 0 0 0", my: 1.5, display: "grid", placeItems: "center" }}>
          <Box
            sx={{
              position: "absolute",
              width: 1,
              display: "flex",
              alignItems: "center",
              scale: showChart ? "1 1" : "0 1",
              opacity: showChart ? 1 : 0,
              transition: chartChangeTransition,
            }}
          >
            {showChart &&
              dataArray.map(({ percentage }, i) => (
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

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            transformOrigin: "left",
            scale: showChart ? "1 1" : "1 0",
            transition: chartChangeTransition,
          }}
        >
          {showChart &&
            dataArray.map(({ type, percentage }, i) => (
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
            ))}
        </Box>

        {loading && (
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            {<CircularProgress />}
          </Box>
        )}

        {notEnoughData && (
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            <Chip
              sx={{ p: 3, borderRadius: 99 }}
              label={
                <Typography variant="h6" component="p" sx={{ color: "text.secondary" }}>
                  資料不足
                </Typography>
              }
            />
          </Box>
        )}
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
        {showChart
          ? dataArray.map(({ type }, i) => (
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
            ))
          : [...Array(3)].map((_, i) => (
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
                <SkeletonWrapper loading>
                  <Typography variant="body1" component="p">
                    載入中
                  </Typography>
                </SkeletonWrapper>
              </Box>
            ))}
      </Box>
    </Stack>
  );
};

export { FlatDonutBar };
