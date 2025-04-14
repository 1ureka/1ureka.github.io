import { useState } from "react";
import { Box, ButtonBase, IconButton, Tooltip, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { BoxM, StackM } from "@/components/Motion";
import { ellipsisSx } from "@/utils/commonSx";

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

export { SidebarButton };
