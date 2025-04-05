import { Box } from "@mui/material";

const width = 320;

const Sidebar = () => {
  return (
    <Box sx={{ width, borderRight: 1, borderColor: "divider", height: 650, overflow: "auto" }}>
      <Box sx={{ height: 2000 }} />
    </Box>
  );
};

export default Sidebar;
