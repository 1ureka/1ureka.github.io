import { Typography } from "@mui/material";

const sharedSx = {
  whiteSpace: "pre-line",
  textAlign: "center",
  fontFamily: "timemachine-wa",
};

const HeroTitle = () => (
  <>
    <Typography
      variant="h4"
      component="h2"
      gutterBottom
      sx={{
        ...sharedSx,
        fontSize: "clamp(1.6rem, 2vw + 1rem, 2.125rem)",
        color: "text.colored",
        letterSpacing: "clamp(0.1rem, 0.2vw, 0.15rem)",
      }}
    >
      專為探索而設計的網站作品集
    </Typography>
    <Typography
      variant="h1"
      component="h1"
      sx={{
        ...sharedSx,
        fontSize: "clamp(4.5rem, 10vw + 1rem, 6rem)",
        color: "text.primary",
        mb: 1.5,
      }}
    >
      {"視覺與體驗\n合而為一"}
    </Typography>
  </>
);

export { HeroTitle };
