import { useEffect, useRef, useState } from "react";
import { Box, IconButton, LinearProgress, Typography } from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { ellipsisSx } from "@/utils/commonSx";
import { StackM } from "@/components/Motion";
import { AnimatePresence } from "motion/react";

type ToastType = "info" | "error" | "warn";
type ToastContentProps = { type: ToastType; duration: number; onClose: () => void };

const ToastProgress = ({ type, duration, onClose }: ToastContentProps) => {
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progressValue = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressValue);

      if (elapsed < duration) rafRef.current = requestAnimationFrame(animate);
      else onClose();
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current!);
  }, [duration, onClose]);

  return (
    <LinearProgress
      color={type === "warn" ? "warning" : type === "info" ? "success" : "error"}
      sx={{ position: "absolute", inset: "auto 0 0 0", translate: "0px 25%" }}
      variant="determinate"
      value={progress}
    />
  );
};

const ToastContent = ({ type, duration, onClose }: ToastContentProps) => {
  const icon = {
    info: <CheckCircleRoundedIcon color="success" fontSize="small" />,
    error: <ErrorRoundedIcon color="error" fontSize="small" />,
    warn: <WarningRoundedIcon color="warning" fontSize="small" />,
  }[type];

  const color = {
    info: "var(--mui-palette-success-main)",
    error: "var(--mui-palette-error-main)",
    warn: "var(--mui-palette-warning-main)",
  }[type];

  const title = {
    info: "通知",
    error: "錯誤",
    warn: "警告",
  }[type];

  const message = {
    info: "你有一則通知訊息！",
    error: "這是一則錯誤訊息！",
    warn: "這是一則警告訊息！",
  }[type];

  return (
    <StackM
      initial={{ opacity: 0, filter: "blur(3px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(3px)" }}
      sx={{ width: 1, p: "8px 10px", position: "relative" }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon}
          <Typography
            variant="subtitle1"
            sx={{ color: `color-mix(in srgb, ${color} 50%, var(--mui-palette-text-primary) 50%)` }}
          >
            {title}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ pt: 1, pb: 0.5 }}>
        <Typography variant="body2" sx={{ opacity: 0.8, ...ellipsisSx, WebkitLineClamp: 3 }}>
          {message}
        </Typography>
      </Box>

      <ToastProgress type={type} duration={duration} onClose={onClose} />
    </StackM>
  );
};

const demoList: ToastType[] = ["info", "error", "warn"];

const ToastDemo = () => {
  const [toast, setToast] = useState<ToastType>(demoList[0]);
  const handleClose = () => {
    setToast((prev) => {
      const index = demoList.indexOf(prev);
      return demoList[(index + 1) % demoList.length];
    });
  };

  return (
    <AnimatePresence mode="wait">
      <ToastContent key={toast} type={toast} duration={10000} onClose={handleClose} />
    </AnimatePresence>
  );
};

export { ToastDemo };
