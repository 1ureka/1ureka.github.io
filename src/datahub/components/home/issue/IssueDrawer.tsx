import { Box, Drawer } from "@mui/material";
import { IssueDrawerStat } from "./IssueDrawerStat";
import { IssueDrawerHeader } from "./IssueDrawerHeader";

interface IssueAnalysisDrawerProps {
  open: boolean;
  onClose: () => void;
}

const IssueAnalysisDrawer = ({ open, onClose }: IssueAnalysisDrawerProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 480, md: 600 }, maxWidth: "90vw" } } }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <IssueDrawerHeader onClose={onClose} />
        <IssueDrawerStat />
      </Box>
    </Drawer>
  );
};

export { IssueAnalysisDrawer };
