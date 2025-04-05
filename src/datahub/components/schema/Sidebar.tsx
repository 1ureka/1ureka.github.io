import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const width = 320;

const Sidebar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(-1);

  useEffect(() => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setHeight(height);
    }
  }, []);

  if (height < 0) {
    return (
      <Box sx={{ width, display: "grid", placeItems: "center", borderRight: 1, borderColor: "divider" }} ref={ref}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width, borderRight: 1, borderColor: "divider", height, overflow: "auto" }}>
      <Box sx={{ height: 2000 }} />
    </Box>
  );
};

export default Sidebar;
