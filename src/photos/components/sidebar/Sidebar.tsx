import { Box, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import BookmarksRoundedIcon from "@mui/icons-material/BookmarksRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";

import { useState } from "react";
import { MenuButton } from "./MenuButton";
import { SidebarButton } from "./SidebarButton";
import { BoxM } from "@/components/Motion";
import { UsageAndImport } from "./UsageAndImport";

const Sidebar = ({ onMenuClick, expanded }: { onMenuClick: () => void; expanded: boolean }) => {
  const [selected, setSelected] = useState(0);

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

      <UsageAndImport expanded={expanded} />
    </Stack>
  );
};

export { Sidebar };
