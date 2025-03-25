import { Box, Container, Link, Typography, Divider, Stack, useMediaQuery } from "@mui/material";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";
import { routes } from "@/forum/utils/routes";
import { useState } from "react";

const linkSx = {
  display: "flex",
  alignItems: "center",
  gap: 1,
} as const;

const linkBlockSx = (isLastElement?: boolean) => ({
  gap: 1,
  flex: 1,
  borderRight: isLastElement ? 0 : 1,
  borderColor: "divider",
  px: 3,
});

const AppFooter = () => {
  const isBetweenSm = useMediaQuery((theme) => theme.breakpoints.between("xs", "md"));
  const isBelowSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [error, setError] = useState(false);
  if (error) throw new Error("測試目的的錯誤，請忽略");

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        mt: "auto",
        py: 3,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        "&::before": {
          bgcolor: "action.hover",
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Stack sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Stack sx={{ alignItems: "center" }}>
            <Typography variant="h6" gutterBottom>
              相關連結
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              故意引發錯誤或使用錯誤參數，用於展示網站對於真實錯誤的處理能力。
            </Typography>
          </Stack>

          <Divider orientation="horizontal" flexItem variant="middle" />

          <Box
            sx={{
              display: "grid",
              width: 1,
              rowGap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
            }}
          >
            <Stack sx={linkBlockSx(isBelowSm)}>
              <Link
                href="#"
                variant="body2"
                color="primary"
                sx={linkSx}
                underline="hover"
                onClick={() => setError(true)}
              >
                <ErrorRoundedIcon fontSize="small" />
                觸發錯誤
              </Link>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                測試任意頁面發生錯誤時的情境
              </Typography>
            </Stack>

            <Stack sx={linkBlockSx(isBetweenSm)}>
              <Link href="/this/is/a/not/exist/route" variant="body2" color="primary" sx={linkSx} underline="hover">
                <SearchOffRoundedIcon fontSize="small" />
                404 錯誤
              </Link>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                測試要求資源不存在的情境
              </Typography>
            </Stack>

            <Stack sx={linkBlockSx(isBelowSm)}>
              <Link href={`${routes.users}?user=`} variant="body2" color="primary" sx={linkSx} underline="hover">
                <PersonOffRoundedIcon fontSize="small" />
                使用者不存在
              </Link>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                測試使用者頁面，但所要求的使用者不存在的情況
              </Typography>
            </Stack>

            <Stack sx={linkBlockSx(true)}>
              <Link href={`${routes.post}?postId=`} variant="body2" color="primary" sx={linkSx} underline="hover">
                <DisabledByDefaultRoundedIcon fontSize="small" />
                貼文不存在
              </Link>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                測試單個貼文頁面，但所要求的貼文不存在的情況
              </Typography>
            </Stack>
          </Box>
        </Stack>

        <Typography variant="caption" sx={{ mt: 2, textAlign: "center", display: "block", color: "text.secondary" }}>
          © {new Date().getFullYear()} 論壇樣板 by 1ureka
        </Typography>
      </Container>
    </Box>
  );
};

export { AppFooter };
