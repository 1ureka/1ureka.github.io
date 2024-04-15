import { Button, Container, Stack, Typography } from "@mui/material";
import GridBackground from "../../components/GridBackground";
import { useNavigateTo } from "../../utils/hooks";

export default function NotFound() {
  const navigate = useNavigateTo("/");

  return (
    <Container sx={{ py: 10, height: "100%" }}>
      <GridBackground />
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={"100%"}
        spacing={5}
      >
        <Typography variant="h3">404 Not Found</Typography>
        <Button variant="outlined" onClick={navigate}>
          Back To Home
        </Button>
      </Stack>
    </Container>
  );
}
