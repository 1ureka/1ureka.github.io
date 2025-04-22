import { useState } from "react";
import { Box, Button, ButtonBase, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";

import { BoxM, StackM } from "@/components/Motion";
import { ellipsisSx, underlineSx } from "@/utils/commonSx";
import { formatFileSize } from "@/utils/formatters";

const sx = { borderRadius: 2, "& svg": { transition: "scale 0.15s ease" }, "&:active svg": { scale: "0.5 1" } };

const MenuButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton onClick={onClick} centerRipple={false} sx={sx}>
    <MenuRoundedIcon />
  </IconButton>
);

type SidebarButtonNode = {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  onClick: () => void;
  children?: SidebarButtonNode[];
};

type SidebarButtonProps = {
  expanded: boolean;
  nestedLevel?: number;
} & SidebarButtonNode;

const isAnyChildActive = (children: SidebarButtonNode[]): boolean =>
  children.some((child) => {
    if (child.active) return true;
    if (child.children && child.children.length > 0) return isAnyChildActive(child.children);
    return false;
  });

const SidebarButton = ({
  expanded,
  active,
  icon,
  title,
  action,
  onClick,
  children,
  nestedLevel,
}: SidebarButtonProps) => {
  const [isLayouting, setIsLayouting] = useState(false);
  const [selfExpanded, setSelfExpanded] = useState(nestedLevel === undefined);
  const isActived = active || isAnyChildActive(children ?? []);

  return (
    <>
      <Tooltip title={expanded ? null : <Typography variant="body2">{title}</Typography>} arrow placement="right">
        <BoxM layout sx={{ width: 1 }}>
          <ButtonBase
            onClick={onClick}
            sx={{
              pl: nestedLevel ? nestedLevel * 2 : 0,
              width: expanded ? 1 : undefined,
              borderRadius: 2,
              display: "flex",
              justifyContent: expanded ? "space-between" : "center",
              alignItems: "center",
              bgcolor: isActived ? "FilledInput.bg" : "transparent",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 3, p: 1.2 }}>
              <Box sx={{ color: "action.active", display: "contents" }}>{icon}</Box>
              {expanded && (
                <Typography variant="subtitle1" component="h6" sx={{ ...ellipsisSx, lineHeight: 1 }}>
                  {title}
                </Typography>
              )}
            </Box>

            {expanded && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {action}
                {children && children.length > 0 && (
                  <Tooltip
                    title={<Typography variant="body2">{selfExpanded ? "收起資料夾" : "展開資料夾"}</Typography>}
                    placement="right"
                    arrow
                  >
                    <IconButton
                      centerRipple={false}
                      sx={{ borderRadius: 2 }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelfExpanded((prev) => !prev);
                      }}
                      component="span"
                    >
                      <ExpandMoreRoundedIcon
                        fontSize="small"
                        sx={{ rotate: selfExpanded ? "180deg" : "0deg", transition: "rotate 0.2s ease" }}
                      />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}

            {isActived && (
              <BoxM
                layoutId={`selected-bar-${nestedLevel ?? -1}`}
                onLayoutAnimationStart={() => setIsLayouting(true)}
                onLayoutAnimationComplete={() => setIsLayouting(false)}
                sx={{ position: "absolute", inset: "0 auto 0 0", display: "grid", placeItems: "center" }}
              >
                <Box
                  sx={{
                    px: 0.2,
                    height: 0.5,
                    bgcolor: "primary.main",
                    borderRadius: 99,
                    translate: "-50%",
                    scale: isLayouting ? "1 1.5" : "1 1",
                    transition: "scale 0.7s cubic-bezier(0.4, 0, 0.25, 1)",
                    transitionDuration: isLayouting ? "0.2s" : "0.7s",
                  }}
                />
              </BoxM>
            )}
          </ButtonBase>
        </BoxM>
      </Tooltip>

      {children && children.length > 0 && expanded ? (
        <StackM
          sx={{ gap: 0.5, width: 1, clipPath: "polygon(-50% 0, 150% 0, 150% 100%, -50% 100%)", transformOrigin: "top" }}
          transition={{ type: "spring", bounce: 0.3 }}
          variants={{ initial: { height: 0, x: -20, opacity: 0 }, animate: { height: "auto", x: 0, opacity: 1 } }}
          initial="initial"
          animate={selfExpanded ? "animate" : "initial"}
        >
          {children.map((child, index) => (
            <SidebarButton key={index} {...child} expanded={expanded} nestedLevel={(nestedLevel ?? 0) + 1} />
          ))}
        </StackM>
      ) : (
        <>{/* TODO: Popover on right side */}</>
      )}
    </>
  );
};

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
      <Box sx={{ p: 3, borderTop: 1, borderColor: "divider", width: 1 }}>
        <Stack sx={{ width: 1, gap: 1, "& p": ellipsisSx, "& h6": ellipsisSx }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
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
            <Typography variant="subtitle1">儲存空間</Typography>
          </Box>

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

export { MenuButton, SidebarButton, UsageAndImport };
