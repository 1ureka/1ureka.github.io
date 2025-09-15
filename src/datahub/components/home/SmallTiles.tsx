import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import type { BoxProps, SkeletonProps } from "@mui/material";
import BackupTableRoundedIcon from "@mui/icons-material/BackupTableRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import { TileContent, TileTitle } from "./TileText";
import { TileTooltip } from "./TileTooltip";
import { underlineSx } from "@/utils/commonSx";
import { lgSpace, mdSpace, smSpace, tileIconCommonSx } from "./commonSx";

import { formatFileSize, formatNumber } from "@/utils/formatters";
import { toEntries } from "@/utils/typedBuiltins";
import { routes } from "@/routes";
import { useUrl } from "@/hooks/url";
import { useDbBytes, useObjects, useRowCounts } from "@/datahub/hooks/read";
import { IssueAnalysisDrawer } from "@/datahub/components/home/issue/IssueDrawer";
import { useMemo, useState } from "react";
import { useCheckTimeFormat, useForeignKeyCheck, useFreelistCheck } from "@/datahub/hooks/analysis";

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
            <TileContent sx={{ textWrap: "nowrap" }}>載入中</TileContent>
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

const useHandleClick = () => {
  const { update } = useUrl();
  const createHandler = (label: string) => () =>
    update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: label }));
  return createHandler;
};

const Tile2 = () => {
  const { data, isFetching } = useRowCounts({ types: ["table", "view"] });
  const createHandler = useHandleClick();

  const totalCount = data ? Object.values(data).reduce((acc, count) => acc + count, 0) : 0;

  const maxCountItem = useMemo(() => {
    if (!data) return { table: "", count: 0 };
    const dataEntries = toEntries(data).filter(([name]) => typeof name === "string") as [string, number][];
    const max = dataEntries.reduce((acc, [name, count]) => {
      if (count > acc[1]) return [name, count];
      return acc;
    });
    return { table: max[0], count: max[1] };
  }, [data]);

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
                {maxCountItem.table} 有 {formatNumber(maxCountItem.count)} 筆紀錄
              </Typography>
            }
          >
            <TileContent sx={underlineSx} onClick={createHandler(maxCountItem.table)}>
              {maxCountItem.table}
            </TileContent>
          </TileTooltip>
        )}
      </Stack>
    </Box>
  );
};

const Tile3 = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleClick = () => setDrawerOpen(true);

  const { data: fIssues, isFetching: isFetchingF } = useForeignKeyCheck();
  const { data: dIssues, isFetching: isFetchingD } = useCheckTimeFormat();
  const { data: freelistCount, isFetching: isFetchingL } = useFreelistCheck();

  const isFetching = isFetchingF || isFetchingD || isFetchingL;
  const counts = useMemo(() => {
    if (fIssues === undefined || dIssues === undefined || freelistCount === undefined) return null;
    return fIssues.length + dIssues.length + freelistCount;
  }, [fIssues, dIssues, freelistCount]);

  return (
    <>
      <Stack sx={{ alignItems: "flex-start" }}>
        <TileTitle>潛在問題</TileTitle>
        <TileTooltip title={<Typography>查看詳細資料，分析中也能先開啟</Typography>}>
          <TileContent
            onClick={handleClick}
            sx={{
              textWrap: "nowrap",
              color: isFetching || !counts ? undefined : counts > 0 ? "warning.main" : "success.main",
              display: "inline-block",
              ...underlineSx,
            }}
          >
            {isFetching || !counts ? "分析中" : counts}
            <OpenInNewRoundedIcon fontSize="small" sx={{ verticalAlign: "middle", ml: 0.5 }} />
          </TileContent>
        </TileTooltip>
      </Stack>

      <IssueAnalysisDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
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
        <Tile3 />
      </Box>
    </Box>
  );
};

export { SmallTiles };
