import React from "react";

interface StripedBackgroundProps {
  color1?: string;
  color2?: string;
  angle?: number; // 條紋角度
  stripeWidth?: number; // 單一顏色寬度
  backgroundSize?: number; // 條紋週期長度（預設 2*stripeWidth）
  zIndex?: number;
  className?: string;
  style?: React.CSSProperties;
}

function resolveMuiColor(color?: string): string | undefined {
  if (!color) return;

  const paletteMatch = color.match(/^([a-z]+)(?:\.(\w+))?$/);
  if (paletteMatch) {
    const [, section, tone] = paletteMatch;
    const parts = ["--mui-palette", section];
    if (tone) parts.push(tone);
    return `var(${parts.join("-")})`;
  }

  return color;
}

const StripedBackground: React.FC<StripedBackgroundProps> = ({
  color1 = "white",
  color2 = "transparent",
  angle = 45,
  stripeWidth = 10,
  backgroundSize,
  zIndex = 0,
  className = "",
  style = {},
}) => {
  const resolvedColor1 = resolveMuiColor(color1);
  const resolvedColor2 = resolveMuiColor(color2);
  const totalSize = backgroundSize ?? stripeWidth * 2;

  const background = `repeating-linear-gradient(
    ${angle}deg,
    ${resolvedColor1},
    ${resolvedColor1} ${stripeWidth}px,
    ${resolvedColor2} ${stripeWidth}px,
    ${resolvedColor2} ${totalSize}px
  )`;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex,
        background,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};

export { StripedBackground };
