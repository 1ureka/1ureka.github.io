import { Tooltip, type TooltipProps } from "@mui/material";

const TileTooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <Tooltip followCursor slotProps={{ transition: { timeout: { appear: 250, enter: 250, exit: 0 } } }} {...props}>
      {children}
    </Tooltip>
  );
};

export { TileTooltip };
