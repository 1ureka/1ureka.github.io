import "@/components/toast.css";
import toast from "react-hot-toast";
import { Toaster as T, type ToasterProps } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

import { Box, IconButton, LinearProgress, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ellipsisSx } from "@/utils/commonSx";

type ToastType = "info" | "error" | "warn";
type ToastContentProps = { type: ToastType; duration: number; args: unknown[]; onClose: () => void };
type ToastProgressProps = Pick<ToastContentProps, "type" | "duration" | "onClose">;

const ToastProgress = ({ type, duration, onClose }: ToastProgressProps) => {
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
  }, [duration]);

  return (
    <LinearProgress
      color={type === "warn" ? "warning" : type === "info" ? "success" : "error"}
      sx={{ position: "absolute", inset: "auto 0 0 0", translate: "0px 40%" }}
      variant="determinate"
      value={progress}
    />
  );
};

const ToastContent = ({ type, duration, args, onClose }: ToastContentProps) => {
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

  return (
    <Stack sx={{ minWidth: 250 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1, pl: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: `color-mix(in srgb, ${color} 50%, var(--mui-palette-text-primary) 50%)` }}
        >
          {title}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ pt: 1, pb: 0.5 }}>
        <Typography variant="body2" sx={{ opacity: 0.8, ml: "-20px", ...ellipsisSx, WebkitLineClamp: 3 }}>
          {args.join(", ")}
        </Typography>
      </Box>

      <ToastProgress type={type} duration={duration} onClose={onClose} />
    </Stack>
  );
};

const useToaster = () => {
  useEffect(() => {
    // 保存原本的 console 方法
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    // 重寫 console.log
    console.log = (...args: unknown[]) => {
      toast.success(
        (t) => <ToastContent type="info" duration={10000} args={args} onClose={() => toast.dismiss(t.id)} />,
        {
          duration: Infinity,
        }
      );
      originalLog(...args);
    };

    // 重寫 console.error
    console.error = (...args: unknown[]) => {
      toast.error(
        (t) => <ToastContent type="error" duration={15000} args={args} onClose={() => toast.dismiss(t.id)} />,
        {
          duration: Infinity,
        }
      );
      originalError(...args);
    };

    // 重寫 console.warn
    console.warn = (...args: unknown[]) => {
      toast((t) => <ToastContent type="warn" duration={10000} args={args} onClose={() => toast.dismiss(t.id)} />, {
        icon: "🚨",
        duration: Infinity,
      });
      originalWarn(...args);
    };

    // 當元件卸載時，恢復原本的 console 方法
    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);
};

const toasterOptions: ToasterProps["toastOptions"] = {
  className: "custom-toast",
  style: {
    background: "var(--mui-palette-background-paper)",
    color: "var(--mui-palette-text-primary)",
    borderRadius: "var(--mui-shape-borderRadius)",
    backgroundImage: "var(--mui-overlays-24)",
    boxShadow: "var(--mui-shadows-3)",
  },
};

const Toaster = ({ position }: { position?: ToasterProps["position"] }) => {
  useToaster();
  return <T toastOptions={{ ...toasterOptions, position }} />;
};

export { Toaster };
