import { Box, Drawer, Divider } from "@mui/material";
import { IssueDrawerList } from "./IssueDrawerList";
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

        <Box sx={{ flex: 1, overflow: "auto", p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <IssueDrawerStat />
          <Divider />
          <IssueDrawerList />
        </Box>
      </Box>
    </Drawer>
  );
};

export { IssueAnalysisDrawer };
