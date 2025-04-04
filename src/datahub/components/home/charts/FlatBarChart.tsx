import { Skeleton, Stack, Switch, Typography } from "@mui/material";
import { Box, CircularProgress, FormControlLabel, FormHelperText } from "@mui/material";
import type { SkeletonProps } from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { useTableInfo } from "@/datahub/hooks/read";
import { formatNumber } from "@/utils/formatters";

import { TileTooltip } from "../TileTooltip";
import { StripedBackground } from "./StripedBackground";
import { chartChangeTransition, ellipsisSx, noSpace, smSpace, underlineSx } from "../commonSx";

const SkeletonWrapper = ({ children, loading, ...props }: SkeletonProps & { loading: boolean }) => {
  if (!loading) return children;
  return (
    <Skeleton variant="rounded" animation="wave" {...props}>
      {children}
    </Skeleton>
  );
};

const isSystemField = (field: string): boolean => {
  const value = field.toLowerCase();
  const keywords = ["id", "create", "update", "delete", "timestamp", "modif"];
  return keywords.some((kw) => value.includes(kw));
};

type DataArray = {
  field: string;
  count: number;
  percentage: number;
  loading: boolean;
  noData: boolean;
}[];

const visualMultiplier = 1.375; // 視覺化的比例因子

const FlatBarChart = () => {
  const [isSystemFieldVisible, setIsSystemFieldVisible] = useState(false);
  const { data: tableInfo, isFetching } = useTableInfo({ types: ["table", "view"] });

  const dataArray: DataArray = useMemo(() => {
    if (!tableInfo || isFetching)
      return [...Array(5)].map(() => ({ field: "", count: 0, percentage: 0, loading: true, noData: false }));

    // 統計所有欄位名稱的使用頻率
    const fieldCounts: Record<string, number> = {};

    tableInfo.forEach((table) => {
      table.forEach(({ name }) => {
        fieldCounts[name] = (fieldCounts[name] || 0) + 1;
      });
    });

    // 根據是否顯示系統欄位進行篩選
    const filteredEntries = Object.entries(fieldCounts)
      .filter(([field]) => isSystemFieldVisible || !isSystemField(field))
      .toSorted((a, b) => b[1] - a[1])
      .slice(0, 5);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const total = filteredEntries.reduce((sum, [_, count]) => sum + count, 0);

    // 轉換為顯示用的數據格式
    const result = filteredEntries.map(([field, count]) => ({
      field,
      count,
      percentage: count / total,
      loading: false,
      noData: false,
    }));

    // 補充不足的元素至長度為 5
    if (result.length < 5) {
      const emptyItems = [...Array(5 - result.length)].map(() => ({
        field: "",
        count: 0,
        percentage: 0,
        loading: false,
        noData: true,
      }));

      return [...result, ...emptyItems];
    }

    return result;
  }, [tableInfo, isFetching, isSystemFieldVisible]);

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
        <Typography variant="h5" component="h3">
          使用的欄位名稱
        </Typography>

        <Stack sx={{ alignItems: "flex-end" }}>
          <FormControlLabel
            checked={isSystemFieldVisible}
            onChange={({ target }) => setIsSystemFieldVisible((target as HTMLInputElement).checked)}
            control={<Switch />}
            labelPlacement="start"
            label={
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                包含系統欄位
              </Typography>
            }
          />
          <FormHelperText>(id, createdAt, updatedAt, ...)</FormHelperText>
        </Stack>
      </Box>

      <Box sx={{ position: "relative", maxWidth: 1, flex: 1, overflowX: "auto", overflowY: "hidden" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: smSpace,
            placeItems: "center",
            "& > :nth-of-type(3n + 1)": { justifySelf: "flex-start" },
            p: smSpace,
            pt: noSpace,
            width: 1,
            height: 1,
          }}
        >
          <Box>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              最常使用
            </Typography>
          </Box>
          <Box />
          <Box>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              出現次數
            </Typography>
          </Box>

          {dataArray.map(({ field, count, percentage, loading, noData }, i) => (
            <Fragment key={i}>
              <Box>
                {loading ? (
                  <SkeletonWrapper loading>
                    <Typography variant="body1" sx={{ ...ellipsisSx, ...underlineSx, width: "6rem" }}>
                      載入中
                    </Typography>
                  </SkeletonWrapper>
                ) : noData ? (
                  <Typography variant="body1" sx={{ ...ellipsisSx, width: "6rem" }}>
                    ---
                  </Typography>
                ) : (
                  <TileTooltip title={<Typography>{field}</Typography>}>
                    <Typography variant="body1" sx={{ ...ellipsisSx, ...underlineSx, width: "6rem" }}>
                      {field}
                    </Typography>
                  </TileTooltip>
                )}
              </Box>

              <TileTooltip
                title={
                  loading || noData ? null : (
                    <Box>
                      <Typography variant="subtitle2">{field}</Typography>
                      <Typography>所有欄位名稱中的 {`${Math.round(percentage * 100)}%`}</Typography>
                    </Box>
                  )
                }
              >
                <Box
                  sx={{
                    width: 1,
                    height: "1rem",
                    borderRadius: 99,
                    position: "relative",
                    overflow: "clip",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": { bgcolor: "action.hover", "& .bar-content": { opacity: 1 } },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <StripedBackground color1="divider" color2="#fff0" angle={-35} stripeWidth={5} />

                  <Box
                    sx={{
                      position: "absolute",
                      width: Math.max(0, Math.min(percentage * visualMultiplier, 1)),
                      height: 1,
                      borderRadius: 9,
                      overflow: "clip",
                      bgcolor: "background.paper",
                      transition: chartChangeTransition,
                    }}
                  >
                    <Box
                      className="bar-content"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "primary.main",
                        opacity: i === 0 ? 0.9 : 0.65,
                        transition: "all 0.2s ease-in-out",
                      }}
                    />
                  </Box>
                </Box>
              </TileTooltip>

              <Box>
                <SkeletonWrapper loading={loading}>
                  <Typography variant="body1" sx={{ ...ellipsisSx, maxWidth: "10rem" }}>
                    {loading ? "載入中" : noData ? "---" : formatNumber(count)}
                  </Typography>
                </SkeletonWrapper>
              </Box>
            </Fragment>
          ))}
        </Box>

        {isFetching && (
          <Box sx={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export { FlatBarChart };
