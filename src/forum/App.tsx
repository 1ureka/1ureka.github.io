import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type { BoxProps } from "@mui/material";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { Toaster } from "./Toast";
import "./app.css";
import { posts, authors } from "./test";
import { AccountMenu } from "./components/AccountMenu";
import { AppTitle } from "./components/AppTitle";
import { SearchBar } from "./components/SearchBar";
import { DesktopMenu } from "./components/DesktopMenu";
import { MobileMenu } from "./components/MobileMenu";
import { Fragment, useEffect } from "react";

const theme = createTheme({
  cssVariables: { colorSchemeSelector: ".mode-%s" },
  typography: {
    fontFamily: `"timemachine-wa", "NOTO SANS TC"`,
  },
  colorSchemes: {
    light: {
      palette: {
        text: { primary: "#000" },
        primary: { main: "#FF772E", contrastText: "#fff" },
        secondary: { main: "#075056" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#FF772E", contrastText: "#fff" },
        secondary: { main: "#075056" },
        background: { default: "#222", paper: "#222" },
      },
    },
  },
});

const overflowSx: BoxProps["sx"] = {
  position: "relative",
  height: "100dvh",
  overflow: "auto",
  scrollbarWidth: "thin",
  scrollbarColor: "gray transparent",
};

/**
 * 滾動容器
 */
const ScrollArea = ({ children, ...props }: BoxProps) => (
  <Box sx={overflowSx} {...props}>
    {children}
  </Box>
);

const USER = "1ureka";

function App() {
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isMd) document.documentElement.style.fontSize = "16px";
    else document.documentElement.style.fontSize = "14px";
  }, [isMd]);

  const top3Posts = posts.toSorted((a, b) => b.viewCount - a.viewCount).slice(0, 3);
  const tags = posts.flatMap((post) => post.tags).slice(0, 5);

  return (
    <ThemeProvider theme={theme}>
      <title>論壇樣板</title>
      <CssBaseline />
      <Toaster />

      <Box sx={{ bgcolor: "secondary.main", height: "35vh", position: "absolute", inset: "0 0 auto 0" }} />

      <ScrollArea>
        <Toolbar
          className="mode-dark"
          disableGutters
          sx={{ zIndex: 1, bgcolor: "secondary.main", borderBottom: "solid 1px #fff2", position: "sticky", top: 0 }}
        >
          <Container sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }} maxWidth="xl">
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flex: { xs: undefined, md: 1 } }}>
              {!isMd && <MobileMenu />}
              <AppTitle mobile={!isMd} />
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center", justifyContent: "center", flex: 1 }}>
              <SearchBar />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "flex-end",
                flex: { xs: 0.5, md: 1 },
              }}
            >
              {isMd && <DesktopMenu />}
              <AccountMenu user={USER} mobile={!isMd} />
            </Box>
          </Container>
        </Toolbar>

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            my: 10,
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ py: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center", px: 3 }}>
                <PeopleRoundedIcon
                  className="mode-light"
                  sx={{
                    fontSize: 48,
                    mr: 1,
                    bgcolor: "primary.main",
                    borderRadius: 1,
                    color: "background.default",
                    p: 1,
                    opacity: 0.8,
                  }}
                />
                <Typography variant="h5" component="h2" color="primary" sx={{ opacity: 0.8 }}>
                  {USER}
                </Typography>
                <Typography variant="h5" component="h2">
                  ，你在想些什麼？
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ px: 3 }}>
                <TextField
                  multiline
                  fullWidth
                  placeholder="分享你的想法..."
                  variant="filled"
                  minRows={6}
                  maxRows={12}
                  sx={{ mb: 1 }}
                />
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography variant="body2" component="span" sx={{ color: "text.secondary" }}>
                    標籤：
                  </Typography>
                  <Tooltip title="刪除" arrow placement="top">
                    <Chip label="標籤1" clickable />
                  </Tooltip>
                  <Tooltip title="刪除" arrow placement="top">
                    <Chip label="標籤2" clickable />
                  </Tooltip>
                  <Tooltip title="刪除" arrow placement="top">
                    <Chip label="標籤3" clickable />
                  </Tooltip>
                  <Chip label="新增標籤" clickable icon={<AddRoundedIcon />} variant="outlined" />
                </Box>
              </Box>

              <Divider sx={{ mt: 1 }} />

              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                  px: 3,
                }}
              >
                <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Tooltip title="表情符號" arrow>
                    <IconButton size="small">
                      <EmojiEmotionsRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="插入照片" arrow>
                    <IconButton size="small">
                      <InsertPhotoRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="附加檔案" arrow>
                    <IconButton size="small">
                      <AttachFileRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Button variant="contained" color="primary" endIcon={<PublishRoundedIcon />}>
                  發佈
                </Button>
              </Box>

              <Divider />

              <Stack sx={{ alignItems: "stretch", mb: 1.5 }}>
                {posts.slice(0, 5).map((post, i) => (
                  <Fragment key={post.id}>
                    <Box sx={{ p: 1.5, cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}>
                      <Box sx={{ display: "flex", gap: 1.5, mb: 2, alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
                          {post.author.slice(0, 1).toUpperCase()}
                        </Avatar>
                        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                          by {post.author}
                        </Typography>
                        <Box sx={{ flex: 1 }} />
                        <Typography variant="body2" sx={{ color: "text.secondary", opacity: 0.9 }}>
                          {post.createdAt.toLocaleString()}
                        </Typography>
                      </Box>

                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          textAlign: "start",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        component="p"
                        sx={{
                          color: "text.secondary",
                          textAlign: "start",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.content}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1.5, mt: 2 }}>
                        {post.tags.map((tag, i) => i < 3 && <Chip key={tag} label={tag} clickable size="small" />)}
                        {post.tags.length > 3 && (
                          <Chip label={`+${post.tags.length - 3}`} clickable size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>

                    <Divider flexItem />

                    <Box
                      sx={{
                        p: 1.5,
                        py: 1,
                        display: "flex",
                        gap: 1.5,
                        alignItems: "center",
                        position: "relative",
                        color: "text.secondary",
                      }}
                    >
                      <Box sx={{ position: "absolute", inset: 0, bgcolor: "divider", opacity: 0.35 }} />

                      <Button
                        startIcon={<ThumbUpRoundedIcon />}
                        size="small"
                        color={i % 2 === 0 ? "primary" : "inherit"}
                      >
                        <Typography variant="caption" component="span">
                          {post.likeCount} 個讚
                        </Typography>
                      </Button>
                      <Button color="inherit" startIcon={<CommentRoundedIcon />} size="small">
                        <Typography variant="caption" component="span">
                          {post.replyCount} 則回覆
                        </Typography>
                      </Button>
                      <Button
                        startIcon={<VisibilityRoundedIcon />}
                        disabled
                        size="small"
                        sx={{ "button&.Mui-disabled": { color: "text.secondary", opacity: 0.8 } }}
                      >
                        <Typography variant="caption" component="span">
                          {post.viewCount} 次瀏覽
                        </Typography>
                      </Button>
                    </Box>

                    <Divider flexItem />
                  </Fragment>
                ))}
              </Stack>

              <Box sx={{ mx: 1.5 }}>
                <Button variant="outlined" color="primary" fullWidth>
                  查看更多
                </Button>
              </Box>
            </Paper>
          </Box>

          <Stack sx={{ gap: 4, maxWidth: { xs: 1, md: 400 }, width: { xs: 1, md: "30vw" } }}>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
              <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
                本週熱門討論 🔥
              </Typography>

              {top3Posts.map((post, i) => (
                <Stack key={post.id} sx={{ gap: 0.5, my: i < 2 ? 1 : 0 }}>
                  <Typography variant="subtitle1" component="h3">
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ color: "text.secondary", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {post.content}
                  </Typography>
                  <Button endIcon={<ArrowRightAltRoundedIcon />} href={`#${post.id}`} sx={{ width: "fit-content" }}>
                    查看更多
                  </Button>
                  {i < 2 && <Divider />}
                </Stack>
              ))}
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
              <Typography variant="h6" component="h2">
                你可能會喜歡
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mt: 1 }}>
                {tags.map((tag) => (
                  <Chip key={tag} label={tag} clickable />
                ))}
              </Box>

              <Button sx={{ mt: 1 }} endIcon={<ArrowRightAltRoundedIcon />}>
                更多主題
              </Button>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider" }} elevation={1}>
              <Typography variant="h6" component="h2" sx={{ mb: 1.5 }}>
                推薦追蹤
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {authors.slice(0, 5).map(({ name, description }) => (
                  <Fragment key={name}>
                    <Avatar sx={{ bgcolor: "primary.main", width: "2rem", height: "2rem" }}>
                      {name.slice(0, 1).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ textWrap: "nowrap" }}>
                        {name}
                      </Typography>
                      <Typography variant="body2" component="p" sx={{ color: "text.secondary" }}>
                        {description}
                      </Typography>
                    </Box>
                    <Chip variant="outlined" label="追蹤" clickable />
                  </Fragment>
                ))}
              </Box>
            </Paper>
          </Stack>
        </Container>
      </ScrollArea>
    </ThemeProvider>
  );
}

export default App;
