import { Box, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import { HeaderBackground } from "@/datahub/components/aside/HeaderBackground";

const IssueDrawerHeader = ({ onClose }: { onClose: () => void }) => {
  return (
    <Box sx={{ position: "relative", p: 3.5, borderRadius: 5, overflow: "hidden" }}>
      <Box sx={{ position: "absolute", inset: 0, top: "-35%" }}>
        <HeaderBackground />
      </Box>

      <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
          <HealthAndSafetyRoundedIcon fontSize="large" sx={{ color: "text.secondary" }} />
          <Typography variant="h5" component="h2">
            潛在問題分析
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export { IssueDrawerHeader };
