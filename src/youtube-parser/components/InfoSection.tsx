import { Alert, Box, Typography } from "@mui/material";
import { videoStore } from "@/youtube-parser/utils/store";

/**
 * ?
 */
const InfoSection = () => {
  const videoInfo = videoStore((s) => s.videoInfo);
  const error = videoStore((s) => s.error);

  if (error) {
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
  }

  if (!videoInfo) {
    return (
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          影片資訊會在成功解析後顯示
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 2.5 }}>
      <Typography sx={{ color: "text.secondary" }}>影片名稱</Typography>
      <Typography component="a" href={videoInfo.url} target="_blank" rel="noopener noreferrer">
        {videoInfo.title}
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>作者名稱</Typography>
      <Typography component="a" href={videoInfo.author_url} target="_blank" rel="noopener noreferrer">
        {videoInfo.author_name}
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>影片類型</Typography>
      <Typography>{videoInfo.type}</Typography>

      <Typography sx={{ color: "text.secondary" }}>提供者</Typography>
      <Typography component="a" href={videoInfo.provider_url} target="_blank" rel="noopener noreferrer">
        {videoInfo.provider_name}
      </Typography>
    </Box>
  );
};

export { InfoSection };
