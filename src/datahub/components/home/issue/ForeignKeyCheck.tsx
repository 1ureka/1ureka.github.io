import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useForeignKeyCheck } from "@/datahub/hooks/analysis";
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

const OverviewItem = ({ data, total, isFetching }: ReturnType<typeof useForeignKeyCheck>) => {
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
          <Typography variant="h6" component="span" sx={{ color: "success.main" }}>
            {issues.length} 個問題
          </Typography>
        </>
      ) : (
        <>
          <ErrorRoundedIcon sx={{ color: "warning.main", fontSize: 20 }} />
          <Typography variant="h6" component="span" sx={{ color: "warning.main" }}>
            {issues.length} 個問題
          </Typography>
        </>
      )}
      <Divider orientation="vertical" flexItem />
      <Typography variant="h6" component="span">
        共 {total} 個資料表
      </Typography>
    </Box>
  );
};

const useHandleClick = () => {
  const { update } = useUrl();
  const createHandler = (label: string) => () =>
    update(routes.datahub_tables, (prev) => ({ db: prev.db ?? null, table: label }));
  return createHandler;
};

const ForeignKeyCheck = () => {
  const { data, total, isFetching } = useForeignKeyCheck();
  const createHandler = useHandleClick();

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", minHeight: 60 }}>
        <Stack sx={{ alignItems: "flex-start", flex: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
            是否有資料表引用不存在的外鍵
          </Typography>
          {OverviewItem({ data, total, isFetching })}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <CheckState isFetching={isFetching} />
      </Box>

      {data && data.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            受影響的資料表
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

export { ForeignKeyCheck };
