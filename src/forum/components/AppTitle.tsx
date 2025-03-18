import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { ButtonBase, Tooltip, Typography } from "@mui/material";

const AppTitle = ({ mobile }: { mobile: boolean }) => (
  <>
    {!mobile && <ForumRoundedIcon fontSize="large" color="primary" />}
    {mobile ? (
      <Typography variant="h4" component="h1" sx={{ ml: mobile ? 0 : 1, mr: mobile ? 1 : 0 }}>
        論壇樣板
      </Typography>
    ) : (
      <Tooltip title="返回首頁" arrow>
        <ButtonBase
          href="/"
          sx={{
            ml: mobile ? 0 : 1,
            mr: mobile ? 1 : 0,
            borderRadius: 1,
            p: 1,
            "&:hover": { bgcolor: "divider" },
            "&:active": { scale: "0.95" },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Typography variant="h4" component="h1">
            論壇樣板
          </Typography>
        </ButtonBase>
      </Tooltip>
    )}
  </>
);

export { AppTitle };
