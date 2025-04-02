import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import type { BoxProps, SkeletonProps } from "@mui/material";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { TileContent, TileTitle } from "./TileText";
import { TileTooltip } from "./TileTooltip";
import { lgSpace, mdSpace, smSpace, tileIconCommonSx, underlineSx } from "./commonSx";
import { useDbBytes, useObjects, useRowCounts } from "@/datahub/hooks/read";
import { formatFileSize, formatNumber } from "@/utils/formatters";
import { toEntries } from "@/utils/typedBuiltins";

const smallTileCommonSx: BoxProps["sx"] = {
  display: "flex",
  alignItems: "center",
  gap: mdSpace,
} as const;

const SkeletonWrapper = ({ children, ...props }: SkeletonProps) => (
  <Skeleton variant="rounded" animation="wave" {...props}>
    {children}
  </Skeleton>
);

const Tile1 = () => {
  const { data: size, isFetching: isFetchingSize } = useDbBytes();
  const { data: objects, isFetching: isFetchingObjects } = useObjects({ types: ["table", "view"] });

  return (
    <Box sx={{ display: "flex", gap: smSpace }}>
      <Stack sx={{ alignItems: "flex-start" }}>
        <TileTitle>資料庫大小</TileTitle>
        {size === undefined || isFetchingSize ? (
          <SkeletonWrapper>
            <TileContent sx={{ textWrap: "nowrap" }}>載入中 Bytes</TileContent>
          </SkeletonWrapper>
        ) : (
          <TileContent sx={{ textWrap: "nowrap" }}>{formatFileSize(size)}</TileContent>
        )}
      </Stack>

      <Divider flexItem orientation="vertical" />

      <Stack sx={{ alignItems: "flex-start" }}>
        <TileTitle>資料表總數</TileTitle>
        {objects === undefined || isFetchingObjects ? (
          <SkeletonWrapper>
            <TileContent>載入中</TileContent>
          </SkeletonWrapper>
        ) : (
          <TileContent sx={{ textWrap: "nowrap" }}>{objects.filter(({ type }) => type === "table").length}</TileContent>
        )}
      </Stack>

      <Divider flexItem orientation="vertical" />

      <Stack sx={{ alignItems: "flex-start" }}>
        <TileTitle>檢視表總數</TileTitle>
        {objects === undefined || isFetchingObjects ? (
          <SkeletonWrapper>
            <TileContent>載入中</TileContent>
          </SkeletonWrapper>
        ) : (
          <TileContent sx={{ textWrap: "nowrap" }}>{objects.filter(({ type }) => type === "view").length}</TileContent>
        )}
      </Stack>
    </Box>
  );
};

const Tile2 = () => {
  const { data, isFetching } = useRowCounts({ types: ["table", "view"] });

  const totalCount = data ? Object.values(data).reduce((acc, count) => acc + count, 0) : 0;
  const max = data
    ? toEntries(data).reduce((acc, [name, count]) => {
        if (count > acc[1]) return [name, count];
        return acc;
      })
    : ["", 0];

  return (
    <Box sx={{ display: "flex", gap: smSpace }}>
      <Stack sx={{ alignItems: "flex-start" }}>
        <TileTitle>總紀錄數</TileTitle>
        {data === undefined || isFetching ? (
          <SkeletonWrapper>
            <TileContent sx={{ textWrap: "nowrap" }}>載入中</TileContent>
          </SkeletonWrapper>
        ) : (
          <TileContent sx={{ textWrap: "nowrap" }}>{formatNumber(totalCount)}</TileContent>
        )}
      </Stack>

      <Divider flexItem orientation="vertical" />

      <Stack sx={{ alignItems: "flex-start" }}>
        <TileTitle>最多紀錄的資料表</TileTitle>
        {data === undefined || isFetching ? (
          <SkeletonWrapper>
            <TileContent sx={underlineSx}>載入中</TileContent>
          </SkeletonWrapper>
        ) : (
          <TileTooltip
            title={
              <Typography>
                {max[0]} 有 {formatNumber(max[1] as number)} 筆紀錄
              </Typography>
            }
          >
            <TileContent sx={underlineSx}>{max[0]}</TileContent>
          </TileTooltip>
        )}
      </Stack>
    </Box>
  );
};

const SmallTiles = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gap: lgSpace,
        gridTemplateColumns: { xs: "repeat(6, 1fr)", lg: "repeat(3, 1fr)" },
      }}
    >
      <Box sx={{ gridColumn: { xs: "span 4", lg: "auto" }, ...smallTileCommonSx }}>
        <BackupTableRoundedIcon sx={tileIconCommonSx} />
        <Tile1 />
      </Box>

      <Box sx={{ gridColumn: { xs: "1 / span 4", lg: "auto" }, ...smallTileCommonSx }}>
        <SummarizeRoundedIcon sx={tileIconCommonSx} />
        <Tile2 />
      </Box>

      <Box
        sx={{ gridRow: { xs: "1", lg: "auto" }, gridColumn: { xs: "5 / span 2", lg: "auto" }, ...smallTileCommonSx }}
      >
        <HealthAndSafetyRoundedIcon sx={tileIconCommonSx} />

        <Stack sx={{ alignItems: "flex-start" }}>
          <TileTitle>潛在問題</TileTitle>
          {true ? (
            <TileContent sx={{ textWrap: "nowrap", color: "warning.main", display: "inline-block", ...underlineSx }}>
              2
              <OpenInNewRoundedIcon fontSize="small" sx={{ verticalAlign: "middle", ml: 0.5 }} />
            </TileContent>
          ) : (
            <SkeletonWrapper>
              <TileContent sx={{ textWrap: "nowrap", color: "warning.main", ...underlineSx }}>載入中</TileContent>
            </SkeletonWrapper>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export { SmallTiles };
