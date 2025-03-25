import { Box, Button, Paper, Typography } from "@mui/material";
import MonitorRoundedIcon from "@mui/icons-material/MonitorRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { theme } from "@/forum/utils/theme";
import { routes } from "../utils/routes";

const TOTAL_USRS = 1202;

const NotSupportPage = () => {
  return (
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
        <Typography variant="h4" component="h1" sx={{ color: "text.primary", fontFamily: `"timemachine-wa"` }}>
          論壇樣板
        </Typography>
      </Box>

      <Paper
        className="mode-light"
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <MonitorRoundedIcon fontSize="large" sx={{ color: "text.secondary" }} />
        <Typography variant="h5" component="p" gutterBottom>
          該頁面僅支援桌面瀏覽器 (寬度大於 {theme.breakpoints.values.sm}px)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          請使用電腦訪問以獲得最佳體驗
        </Typography>
        <Button variant="contained" href={routes.home} startIcon={<ArrowBackIosNewRoundedIcon />} sx={{ mt: 2 }}>
          返回首頁
        </Button>
      </Paper>

      <Typography className="mode-dark" variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
        與其他
        <Typography component="span" variant="body2" sx={{ color: "primary.light" }}>
          {` ${TOTAL_USRS} `}
        </Typography>
        位使用者一同加入我們
      </Typography>
    </Box>
  );
};

export { NotSupportPage };
