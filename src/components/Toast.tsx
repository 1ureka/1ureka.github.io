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
  }, [duration, onClose]);

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

const configMap: Record<
  ToastType,
  Pick<ToastContentProps, "duration"> & {
    toastFn: "success" | "error" | null;
    toastOptions: ToasterProps["toastOptions"];
  }
> = {
  info: { duration: 10000, toastFn: "success", toastOptions: { duration: Infinity } },
  error: { duration: 15000, toastFn: "error", toastOptions: { duration: Infinity } },
  warn: { duration: 10000, toastFn: null, toastOptions: { duration: Infinity, icon: "🚨" } },
} as const;

const useToaster = () => {
  const idMap = useRef<Record<string, string>>({});

  useEffect(() => {
    // 保存原本的 console 方法
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    // 自定義的 makeToast 函數
    const makeToast = (type: ToastType, args: unknown[]) => {
      const stringifyArgs = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)));
      const mapKey = [type, ...stringifyArgs].join(",");

      if (idMap.current[mapKey]) toast.dismiss(idMap.current[mapKey]);
      const { toastFn, toastOptions, duration } = configMap[type];
      const props = { type, duration, args };
      const toastId = toastFn
        ? toast[toastFn]((t) => <ToastContent {...props} onClose={() => toast.dismiss(t.id)} />, toastOptions)
        : toast((t) => <ToastContent {...props} onClose={() => toast.dismiss(t.id)} />, toastOptions);

      idMap.current[mapKey] = toastId;
    };

    // 重寫 console.log
    console.log = (...args: unknown[]) => {
      makeToast("info", args);
      originalLog(...args);
    };

    // 重寫 console.error
    console.error = (...args: unknown[]) => {
      makeToast("error", args);
      originalError(...args);
    };

    // 重寫 console.warn
    console.warn = (...args: unknown[]) => {
      makeToast("warn", args);
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
