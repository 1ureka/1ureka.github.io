import { Box, Button, Divider, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";

import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { SidebarButton } from "./SidebarButton";
import { BoxM } from "@/components/Motion";
import { ellipsisSx, underlineSx } from "@/utils/commonSx";
import { formatFileSize } from "@/utils/formatters";

const Sidebar = ({ onMenuClick, expanded }: { onMenuClick: () => void; expanded: boolean }) => {
  const [selected, setSelected] = useState(0);
  const maxUsage = 100 * 1024 * 1024;
  const currentUsage = 65.3612564 * 1024 * 1024; // 假設目前使用了65.36MB
  const usagePercentage = (currentUsage / maxUsage) * 100; // 計算使用百分比
  const usageMessage = `已使用 ${formatFileSize(currentUsage)}，總共 ${formatFileSize(
    maxUsage
  )} (${usagePercentage.toFixed(2)}%)`;

  return (
    <Stack sx={{ gap: 0.5, p: 1, pr: 0, alignItems: "flex-start", minHeight: 1 }}>
      <MenuButton onClick={onMenuClick} />

      {!expanded && (
        <BoxM layoutId={"add-folder"}>
          <Tooltip title={<Typography variant="body2">新增資料夾</Typography>} arrow placement="right">
            <IconButton
              centerRipple={false}
              sx={{ borderRadius: 2, width: "2.5rem", height: "2.5rem" }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <CreateNewFolderRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </BoxM>
      )}

      <SidebarButton
        expanded={expanded}
        active={selected === 0}
        icon={<CollectionsRoundedIcon fontSize="small" color="inherit" />}
        title="圖庫"
        action={
          <BoxM layoutId={"add-folder"}>
            <Tooltip title={<Typography variant="body2">新增資料夾</Typography>} arrow placement="right">
              <IconButton
                centerRipple={false}
                sx={{ borderRadius: 2 }}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                component="span"
              >
                <CreateNewFolderRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </BoxM>
        }
        onClick={() => setSelected(0)}
      />

      <SidebarButton
        expanded={expanded}
        active={selected === 1}
        icon={<BookmarksRoundedIcon fontSize="small" color="inherit" />}
        title="我的最愛"
        onClick={() => setSelected(1)}
      />

      <Divider flexItem />

      <SidebarButton
        expanded={expanded}
        active={selected === 2}
        icon={<CloudRoundedIcon fontSize="small" color="inherit" />}
        title="個人相簿"
        onClick={() => setSelected(2)}
        children={[...Array(5)].map((_, i) => ({
          active: selected === i + 3,
          icon: <FolderOpenRoundedIcon fontSize="small" color="inherit" />,
          title: `資料夾${i + 1}`,
          onClick: () => setSelected(i + 3),
          children:
            i === 3
              ? [...Array(2)].map((_, j) => ({
                  active: selected === j + 8,
                  icon: <FolderOpenRoundedIcon fontSize="small" color="inherit" />,
                  title: `子資料夾${j + 1}`,
                  onClick: () => setSelected(j + 8),
                }))
              : [],
        }))}
      />

      <Box sx={{ flex: 1 }} />

      {expanded ? (
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
      ) : (
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
      )}
    </Stack>
  );
};

export { Sidebar };
