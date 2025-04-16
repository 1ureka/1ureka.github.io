import { useState } from "react";
import { useUrl } from "@/forum/hooks/url";
import { Tooltip, Typography } from "@mui/material";
import { TopicPicker } from "../postElement/shared/TopicPicker";

const TopicSelect = () => {
  const { searchParams, updateSearchParams } = useUrl();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleNavigate = (tag: string | null) => {
    updateSearchParams({ topic: tag });
    handleClose();
  };

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
          #{searchParams.get("topic") ?? "全部"}
        </Typography>
      </Tooltip>

      <TopicPicker
        type="query"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onConfirm={handleNavigate}
      />
    </>
  );
};

export { TopicSelect };
