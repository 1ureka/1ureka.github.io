import * as React from "react";
import { useRecoilState } from "recoil";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { HINTS } from "../../utils/store";

export default function Snackbars() {
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [messageQuene, setMessageQuene] = useRecoilState(HINTS);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (messageQuene.length === 0) return;
    // 當一個新訊息加入佇列時，如果有一個正在顯示的 Snackbar，則不會打斷它的顯示
    if (messageInfo && open) {
      setOpen(false);
      return;
    }
    // 當沒有正在顯示的 Snackbar 時，設置一條新的 Snackbar 訊息
    if (!messageInfo) {
      setMessageInfo({ ...messageQuene[0] });
      setMessageQuene((prev) => prev.slice(1));
      setOpen(true);
    }
  }, [messageQuene, messageInfo, open]);

  const handleClose = (_, reason) => {
    if (reason !== "clickaway") setOpen(false);
  };
  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const action = (
    <IconButton color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
      <CloseRoundedIcon />
    </IconButton>
  );

  return (
    <Snackbar
      key={messageInfo?.key}
      open={open}
      onClose={handleClose}
      autoHideDuration={3500}
      TransitionProps={{ onExited: handleExited }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      message={messageInfo?.message}
      action={action}
    />
  );
}
