import { Box, Button, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";

import { BoxM } from "@/components/Motion";
import { ellipsisSx, underlineSx } from "@/utils/commonSx";
import { formatFileSize } from "@/utils/formatters";

// 由於直接讓普通布局的 icon Wrapper 進行 layout 動畫會導致上上..層的滾動容器的未知的 overflowY 出現，
// 因此特別設計成讓普通布局元素只做為高寬infer，實際顯示與 layout 動畫的元素是專門的 position: absolute 的元素

const UsageAndImport = ({ expanded }: { expanded: boolean }) => {
  const maxUsage = 100 * 1024 * 1024;
  const currentUsage = 65.3612564 * 1024 * 1024; // 假設目前使用了65.36MB
  const usagePercentage = (currentUsage / maxUsage) * 100; // 計算使用百分比
  const usageMessage = `已使用 ${formatFileSize(currentUsage)}，總共 ${formatFileSize(
    maxUsage
  )} (${usagePercentage.toFixed(2)}%)`;

  if (expanded)
    return (
      <Box sx={{ ml: -1, p: 1, borderTop: 1, borderColor: "divider", width: 1, boxSizing: "content-box" }}>
        <Box sx={{ p: 3, display: "flex", gap: 2 }}>
          <Box
            sx={{
              color: "text.secondary",
              display: "grid",
              placeItems: "center",
              height: "fit-content",
              position: "relative",
            }}
          >
            <CloudRoundedIcon color="inherit" sx={{ opacity: 0 }} />
            <BoxM layoutId="cloud-icon" layout="position" sx={{ color: "text.secondary", position: "absolute" }}>
              <CloudRoundedIcon color="inherit" sx={{ display: "block" }} />
            </BoxM>
          </Box>

          <Stack sx={{ width: 1, gap: 1, "& p": ellipsisSx, "& h6": ellipsisSx }}>
            <Typography variant="subtitle1">儲存空間</Typography>
            <LinearProgress variant="determinate" value={usagePercentage} sx={{ borderRadius: 9 }} />
            <Tooltip title={<Typography variant="body2">{usageMessage}</Typography>} arrow placement="right">
              <Typography variant="body2" sx={{ color: "text.secondary", ...underlineSx }}>
                {usageMessage}
              </Typography>
            </Tooltip>

            <BoxM layoutId="import-button" layout="position">
              <Button
                variant="contained"
                size="small"
                disableElevation
                startIcon={<PublishRoundedIcon />}
                fullWidth
                sx={{ borderRadius: 1.5, flexWrap: "nowrap" }}
              >
                <Typography variant="body2">匯入</Typography>
              </Button>
            </BoxM>
          </Stack>
        </Box>
      </Box>
    );
  else
    return (
      <>
        <Tooltip title={<Typography variant="body2">{usageMessage}</Typography>} arrow placement="right">
          <Box
            sx={{
              color: "text.secondary",
              display: "grid",
              placeItems: "center",
              width: "2.5rem",
              p: 0.5,
              bgcolor: "action.hover",
              borderRadius: 2,
            }}
          >
            <Box sx={{ width: 0, display: "grid", placeItems: "center" }}>
              <Box sx={{ opacity: 0 }}>
                <CloudRoundedIcon color="inherit" sx={{ translate: "-50%" }} />
              </Box>
              <BoxM layoutId="cloud-icon" layout="position" sx={{ position: "absolute" }}>
                <CloudRoundedIcon color="inherit" />
              </BoxM>
            </Box>
            <LinearProgress variant="determinate" value={usagePercentage} sx={{ borderRadius: 9, width: 1 }} />
          </Box>
        </Tooltip>

        <Tooltip title={<Typography variant="body2">從本地匯入圖片</Typography>} arrow placement="right">
          <BoxM layoutId="import-button" layout="position">
            <Button
              variant="contained"
              size="small"
              disableElevation
              sx={{
                borderRadius: 2,
                flexWrap: "nowrap",
                p: 1,
                minWidth: 0,
                width: "2.5rem",
                height: "2.5rem",
                mt: 0.5,
              }}
            >
              <PublishRoundedIcon />
            </Button>
          </BoxM>
        </Tooltip>
      </>
    );
};

export { UsageAndImport };
