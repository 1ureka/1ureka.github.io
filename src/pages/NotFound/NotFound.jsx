import { Button, Box, Stack, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { useNavigateTo } from "../../utils/hooks";
import { alpha } from "@mui/material/styles";

const Background = () => {
  const sx = {
    zIndex: -1,
    position: "absolute",
    inset: 0,
    backgroundImage: `url("/images/background/project.webp")`,
    backgroundPosition: "center center",
    overflow: "hidden",
  };

  return <Box sx={sx}></Box>;
};

function Title() {
  return (
    <Stack
      direction={"row-reverse"}
      justifyContent={"center"}
      alignItems={"center"}
      spacing={1}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Comfortaa",
          fontWeight: 700,
          m: 0,
        }}
      >
        {"1ureka's CG"}
      </Typography>
      <Avatar
        src={"/favicon.png"}
        sx={{
          width: 70,
          height: 70,
          translate: "0px -7px",
        }}
      />
    </Stack>
  );
}

export default function NotFound() {
  const navigate = useNavigateTo("/");

  const containerStyle = (theme) => {
    const backgroundColor = alpha(theme.palette.background.default, 0.95);
    const boxShadow = theme.shadows[10];
    return {
      position: "absolute",
      width: "1000px",
      height: "100%",
      boxShadow,
      backgroundColor,
    };
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Background />
      <Box sx={containerStyle} maxWidth="lg">
        <Stack
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          width={"100%"}
          spacing={5}
        >
          <Title />
          <Typography variant="h3" sx={{ fontFamily: "Comfortaa" }}>
            404 Not Found
          </Typography>
          <Button variant="outlined" onClick={navigate}>
            Back To Home
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
