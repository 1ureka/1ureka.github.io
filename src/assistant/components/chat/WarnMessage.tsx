import { Button, Typography } from "@mui/material";

export const warningMessage = (
  <>
    <Typography variant="body1" component="span" sx={{ display: "block", mb: 1 }}>
      API 已斷開連線或正在啟動中，詳情請參考：
    </Typography>
    <Button
      href="https://github.com/1ureka/1ureka.blender.docs.rag"
      target="_blank"
      variant="text"
      size="small"
      sx={{ textTransform: "none" }}
    >
      <Typography variant="body1" component="span" sx={{ textDecoration: "underline" }}>
        1ureka/1ureka.blender.docs.rag
      </Typography>
    </Button>
  </>
);
