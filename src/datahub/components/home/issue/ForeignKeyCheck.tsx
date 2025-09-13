import { Box, Divider, Skeleton, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { useForeignKeyCheck } from "@/datahub/hooks/analysis";

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
        <CheckCircleRoundedIcon sx={{ color: "success.main", fontSize: 20 }} />
      ) : (
        <ErrorRoundedIcon sx={{ color: "warning.main", fontSize: 20 }} />
      )}
      <Typography variant="h6" component="span">
        {issues.length} 個問題
      </Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="h6" component="span" sx={{ color: "text.secondary" }}>
        共 {total} 個資料表
      </Typography>
    </Box>
  );
};

const ForeignKeyCheck = () => {
  const { data, total, isFetching } = useForeignKeyCheck();

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

      {/* TODO: list */}
    </Box>
  );
};

export { ForeignKeyCheck };
