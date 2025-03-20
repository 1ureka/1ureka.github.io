import { useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import { TopicAutocomplete } from "../post/TopicAutocomplete";

const TopicSelect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="換一個主題" arrow>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "text.secondary",
            "&:hover": { cursor: "pointer", textDecoration: "underline", color: "text.primary" },
          }}
          onClick={handleOpen}
        >
          #{urlParams.get("topic") ?? "全部"}
        </Typography>
      </Tooltip>

      <TopicAutocomplete type="query" open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} />
    </>
  );
};

export { TopicSelect };
