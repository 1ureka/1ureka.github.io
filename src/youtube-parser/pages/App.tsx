import { Container } from "@mui/material";
import { AppWrapper } from "@/youtube-parser/components/AppWrapper";
import { FormSection } from "@/youtube-parser/components/InputSection";

const Layout = () => {
  return (
    <Container sx={{ my: 4 }}>
      <FormSection />
    </Container>
  );
};

const App = () => (
  <AppWrapper>
    <Layout />
  </AppWrapper>
);

export default App;
