import { Box, Button } from "@mui/material";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import { useFlowChart } from "@/datahub/hooks/read";

const Flow = () => {
  const { nodes, isFetching } = useFlowChart();

  return (
    <Box sx={{ position: "relative", flex: 1 }}>
      <Box sx={{ position: "absolute", inset: "auto 0 0 auto", color: "text.secondary" }}>
        <Button color="inherit" variant="outlined" endIcon={<OpenInFullRoundedIcon />} sx={{ m: 2 }}>
          全螢幕
        </Button>
      </Box>
    </Box>
  );
};

export default Flow;
