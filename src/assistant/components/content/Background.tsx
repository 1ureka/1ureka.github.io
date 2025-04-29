import { Box } from "@mui/material";

const Background = () => {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        inset: 0,
        scale: 1.03333,
        opacity: "var(--mui-palette-bgOpacity-main)",
        transition: "opacity 0.2s ease-in-out",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, filter: "contrast(2) saturate(0.7)" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect fill="#8179D2" width="1200" height="800" />
          <defs>
            <radialGradient id="a" cx="0" cy="800" r="800" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#758ad2" />
              <stop offset="1" stopColor="#758ad2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="b" cx="1200" cy="800" r="800" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9b78d2" />
              <stop offset="1" stopColor="#9b78d2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="c" cx="600" cy="0" r="600" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#7b74d2" />
              <stop offset="1" stopColor="#7b74d2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="d" cx="600" cy="800" r="600" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8179D2" />
              <stop offset="1" stopColor="#8179D2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="e" cx="0" cy="0" r="800" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#71A6D2" />
              <stop offset="1" stopColor="#71A6D2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="f" cx="1200" cy="0" r="800" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#B676D2" />
              <stop offset="1" stopColor="#B676D2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect fill="url(#a)" width="1200" height="800" />
          <rect fill="url(#b)" width="1200" height="800" />
          <rect fill="url(#c)" width="1200" height="800" />
          <rect fill="url(#d)" width="1200" height="800" />
          <rect fill="url(#e)" width="1200" height="800" />
          <rect fill="url(#f)" width="1200" height="800" />
        </svg>
      </Box>

      <Box sx={{ position: "absolute", inset: 0, backdropFilter: "blur(20px)" }} />
    </Box>
  );
};

export { Background };
