import { useMediaQuery } from "@mui/material";

class ScreenWidthError extends Error {
  constructor(width: number) {
    super(`請使用寬度超過 ${width}px 的裝置或將視窗放大，以使用此應用程式。`);
    this.name = "ScreenWidthError";
    // 修正原型鏈，讓 instanceof 正常
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type WidthNotSupportProps = {
  minWidth: number;
  render: (error: ScreenWidthError) => React.ReactNode;
};

const WidthNotSupport = ({ minWidth, render }: WidthNotSupportProps) => {
  const isSupport = useMediaQuery(`(min-width:${minWidth}px)`);
  if (isSupport) return null;
  return render(new ScreenWidthError(minWidth));
};

export { WidthNotSupport };
