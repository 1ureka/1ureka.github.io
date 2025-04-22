import { ButtonBase, MenuItem, Popover, Tooltip, Typography } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { routes } from "@/routes";

const iconSize = 4; // mui space

const TreeActionDemo = ({ table }: { table: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={<Typography variant="body2">更多操作</Typography>} arrow placement="bottom">
        <ButtonBase
          sx={{
            display: "grid",
            placeItems: "center",
            p: iconSize / 2,
            borderRadius: 1,
            "&:hover": { bgcolor: "action.hover" },
            "&:active": { bgcolor: "action.selected" },
          }}
          onClick={handleClick}
        >
          <MoreHorizRoundedIcon sx={{ color: "text.secondary", position: "absolute" }} />
        </ButtonBase>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        elevation={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: { sx: { borderRadius: 2, display: "flex", flexDirection: "column", gap: 0.5, p: 1 } },
        }}
      >
        <MenuItem
          sx={{ p: 0, px: 1, py: 0.25, m: 0, borderRadius: 1.5, transition: "none" }}
          dense
          href={`${routes.datahub_tables}?table=${table}`}
          component="a"
        >
          <Typography variant="body1">以表格檢視</Typography>
        </MenuItem>
      </Popover>
    </>
  );
};

export { TreeActionDemo };
