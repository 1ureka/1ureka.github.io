import { Box } from "@mui/material";

const AppBackground = () => (
  <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    <Box sx={{ bgcolor: "secondary.main", height: "34vh" }} />
    <Box
      sx={{
        height: "100px",
        backgroundColor: "secondary.main",
        maskImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' fill-rule='evenodd' d='M0,0H200V100H0Z M0,0C0,0 100,100 200,0L200,100L0,100Z'/%3E%3C/svg%3E")`,
        maskRepeat: "repeat-x",
        maskPosition: "center bottom",
        maskSize: "auto 100px",
      }}
    />
  </Box>
);

export { AppBackground };
