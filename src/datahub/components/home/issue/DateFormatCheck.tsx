import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useCheckTimeFormat } from "@/datahub/hooks/analysis";
import { underlineSx } from "@/utils/commonSx";
import { useUrl } from "@/hooks/url";
import { routes } from "@/routes";
import { TileTooltip } from "../TileTooltip";

const CheckState = ({ isFetching }: { isFetching: boolean }) => (
  <Stack sx={{ alignItems: "flex-start" }}>
    <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
      檢查狀態
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: "medium" }}>
      {isFetching ? "檢查中..." : "已完成"}
    </Typography>
  </Stack>
);

const OverviewItem = ({ data, isFetching }: ReturnType<typeof useCheckTimeFormat>) => {
  const issues = data;

  if (isFetching || issues === undefined)
    return (
      <Skeleton variant="rounded" animation="wave" width={80} height={24}>
        <Typography variant="h6">載入中</Typography>
      </Skeleton>
    );

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {issues.length === 0 ? (
        <>
          <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: 20 }} />
          <Typography variant="h6" sx={{ color: "success.main" }}>
            日期皆符合 ISO 格式
          </Typography>
        </>
      ) : (
        <>
          <ErrorRoundedIcon sx={{ color: "warning.main", fontSize: 20 }} />
          <Typography variant="h6" sx={{ color: "warning.main" }}>
            {issues.length} 個問題
          </Typography>
        </>
      )}
    </Box>
  );
};

const useHandleClick = () => {
  const { update } = useUrl();
  const createHandler = (label: string) => () =>
    update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: label }));
  return createHandler;
};

const DateFormatCheck = () => {
  const { data, isFetching } = useCheckTimeFormat();
  const createHandler = useHandleClick();

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", minHeight: 60 }}>
        <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
            是否有資料表的日期欄位未使用 ISO 8601 格式
          </Typography>
          {OverviewItem({ data, isFetching })}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <CheckState isFetching={isFetching} />
      </Box>

      {data && data.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            受影響的資料表與欄位
          </Typography>
          <Stack sx={{ gap: 1 }}>
            {data.slice(0, 6).map((issue) => (
              <Typography key={issue.id}>
                <TileTooltip title={<Typography variant="body2">點擊前往資料表</Typography>}>
                  <Typography component="span" sx={underlineSx} onClick={createHandler(issue.table)}>
                    資料表 {issue.table}
                  </Typography>
                </TileTooltip>
                <Typography component="span">{" ・ "}</Typography>
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  欄位 {issue.column}
                </Typography>
                <Typography component="span">{" ・ "}</Typography>
                <Typography component="span" sx={{ color: "text.secondary" }}>
                  {typeof issue.count === "number" ? issue.count : "99+"} 筆資料
                </Typography>
              </Typography>
            ))}
            {data.length > 6 && <Typography>...</Typography>}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export { DateFormatCheck };
