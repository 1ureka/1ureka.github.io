import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

import "@/forum/app.css";
import { AppWrapper } from "@/forum/components/AppWrapper";
import { ScrollArea } from "@/forum/components/ScrollArea";
import { useResponsiveFontSize } from "@/forum/utils/theme";
import { useState } from "react";

const TOTAL_USRS = 1202;

function App() {
  useResponsiveFontSize();
  const [isSent, setIsSent] = useState(false);

  return (
    <AppWrapper>
      <ScrollArea>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            bgcolor: "secondary.main",
            color: "text.primary",
            textAlign: "center",
          }}
        >
          <Box
            className="mode-dark"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1, mb: 4 }}
          >
            <ForumRoundedIcon color="primary" sx={{ fontSize: "2.5rem" }} />
            <Typography variant="h4" component="h1" sx={{ color: "text.primary" }}>
              論壇樣板
            </Typography>
          </Box>

          <Paper
            component="form"
            className="mode-light"
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 3,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EmailRoundedIcon fontSize="large" sx={{ color: "text.secondary" }} />
            <Typography variant="h5" component="p">
              驗證您的郵件
            </Typography>
            <Typography variant="body1" color="text.secondary">
              驗證碼已寄送至您的電子郵件
            </Typography>

            <TextField name="code" required type="text" label="驗證碼" variant="filled" fullWidth sx={{ mt: 1 }} />

            <Button variant="contained" type="submit" size="large" sx={{ mt: 1 }}>
              驗證
            </Button>

            <Typography variant="body2" color="text.secondary">
              未收到驗證碼？
              <Button variant="text" color="primary" onClick={() => setIsSent(!isSent)} disabled={isSent}>
                {isSent ? "已重新寄送" : "重新寄送"}
              </Button>
            </Typography>
          </Paper>

          <Typography className="mode-dark" variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
            與其他
            <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>
              {` ${TOTAL_USRS} `}
            </Typography>
            位使用者一同加入我們
          </Typography>
        </Box>
      </ScrollArea>
    </AppWrapper>
  );
}

export default App;
