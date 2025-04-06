import { Box } from "@mui/material";
import { BarChart } from "./charts/BarChart";
import { FlatDonutBar } from "./charts/FlatDonutBar";
import { FlowChart } from "./charts/FlowChart";
import { FlatBarChart } from "./charts/FlatBarChart";
import { lgSpace } from "./commonSx";

const LargeTiles = () => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: lgSpace,
        display: "grid",
        gap: lgSpace,
        gridTemplateColumns: { xs: "1fr", ml: "repeat(2, 1fr)" },
        width: 1,
      }}
    >
      <BarChart />
      <FlatDonutBar />
      <FlowChart />
      <FlatBarChart />
    </Box>
  );
};

export { LargeTiles };
