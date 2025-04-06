import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { routes } from "@/routes";
import type { FallbackProps } from "react-error-boundary";

const ErrorPage = ({ error, resetErrorBoundary }: FallbackProps) => {
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
        <ErrorOutlineRoundedIcon fontSize="large" sx={{ color: "error.main" }} />
        <Typography variant="h5" component="p" gutterBottom>
          發生錯誤
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error?.message}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          很抱歉，頁面載入時發生問題，請稍後再試
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" href={routes.forum_home} startIcon={<ArrowBackIosNewRoundedIcon />}>
            返回首頁
          </Button>
          <Button variant="outlined" onClick={() => resetErrorBoundary()} startIcon={<RefreshRoundedIcon />}>
            重新載入
          </Button>
        </Box>
      </Paper>

      <Typography className="mode-dark" variant="body2" sx={{ mt: 4, color: "text.secondary" }}>
        如需協助，請聯繫
        <Typography
          component="span"
          variant="body2"
          sx={{
            cursor: "pointer",
            color: "primary.light",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {` 論壇樣板客服 `}
        </Typography>
      </Typography>
    </Box>
  );
};

export { ErrorPage };
