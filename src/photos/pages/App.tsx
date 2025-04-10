import { Button, Typography } from "@mui/material";
import { useResponsiveFontSize } from "../utils/theme";

import { AppWrapper } from "@/photos/components/AppWrapper";

function App() {
  useResponsiveFontSize();

  return (
    <AppWrapper>
      <Button variant="contained" sx={{ m: 3 }} disableElevation>
        你好
      </Button>
    </AppWrapper>
  );
}

export default App;
