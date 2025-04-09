import { Toaster as T, type ToasterProps } from "react-hot-toast";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Box, Button, Typography } from "@mui/material";
import { ellipsisSx } from "@/utils/commonSx";

/**
 * 用 hot-toast 顯示 console.log、console.error 和 console.warn 的訊息
 */
const useToaster = () => {
  useEffect(() => {
    // 保存原本的 console 方法
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    // 重寫 console.log
    console.log = (...args: unknown[]) => {
      toast.success(`${args.join(" ")}`);
      originalLog(...args);
    };

    // 重寫 console.error
    console.error = (...args: unknown[]) => {
      toast.error(
        (t) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ flex: 1, ...ellipsisSx, WebkitLineClamp: 3 }}>
              {`${args.join(" ")}`}
            </Typography>
            <Button size="small" variant="outlined" color="error" sx={{ ml: 1 }} onClick={() => toast.dismiss(t.id)}>
              關閉
            </Button>
          </Box>
        ),
        { duration: Infinity }
      );
      originalError(...args);
    };

    // 重寫 console.warn
    console.warn = (...args: unknown[]) => {
      toast(`${args.join(" ")}`, { icon: "🚨" });
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

const styledToasterOptions: ToasterProps["toastOptions"] = {
  className: "text-ellipsis-toast",
  style: {
    background: "var(--mui-palette-background-paper)",
    color: "var(--mui-palette-text-primary)",
    borderRadius: "var(--mui-shape-borderRadius)",
    backgroundImage: "var(--mui-overlays-24)",
    boxShadow: "var(--mui-shadows-3)",
  },
};

const Toaster = () => {
  useToaster();
  return <T toastOptions={styledToasterOptions} />;
};

export { Toaster };
