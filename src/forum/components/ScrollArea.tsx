import { Box, type BoxProps } from "@mui/material";

const overflowSx: BoxProps["sx"] = {
  position: "relative",
  height: "100dvh",
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "gray transparent",
};

/**
 * 滾動容器
 */
const ScrollArea = ({ children, ...props }: BoxProps) => (
  <Box
    sx={overflowSx}
    className="top"
    onScroll={(e) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop < 25) target.classList.add("top");
      else target.classList.remove("top");
    }}
    {...props}
  >
    {children}
  </Box>
);

export { ScrollArea };
