import { Box, Button, IconButton, MenuItem, MenuList, Popover, Tooltip, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

type CommentMenuProps = {
  onEdit: () => void;
  onDelete: () => Promise<void>;
  isPending: boolean;
  isSelf: boolean;
};

const CommentMenu = ({ onEdit, onDelete, isPending, isSelf }: CommentMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [deleteAnchorEl, setDeleteAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenDelete = (event: React.MouseEvent<HTMLElement>) => setDeleteAnchorEl(event.currentTarget);
  const handleCloseDelete = () => setDeleteAnchorEl(null);

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleDelete = async () => {
    await onDelete();
    handleClose();
    handleCloseDelete();
  };

  return (
    <>
      <Tooltip title={isSelf ? "更多選項" : "只有自己的留言才能編輯或刪除"} arrow>
        <span>
          <IconButton size="small" onClick={handleOpen} disabled={!isSelf}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={6}
      >
        <MenuList dense>
          <MenuItem onClick={handleEdit}>編輯</MenuItem>
          <MenuItem onClick={handleOpenDelete} sx={{ color: "error.main" }}>
            刪除
          </MenuItem>
        </MenuList>
      </Popover>

      <Popover
        anchorEl={deleteAnchorEl}
        open={Boolean(deleteAnchorEl)}
        onClose={handleCloseDelete}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        elevation={6}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            確認刪除留言
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            確認刪除留言後，將無法復原，請謹慎操作。
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={handleCloseDelete} color="inherit" loading={isPending}>
              取消
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDelete}
              loading={isPending}
              disableElevation
            >
              確認刪除
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export { CommentMenu };
