/**
 * @file color.ts
 * sRGB 與 HSL 之間的換算，以及輸出成 CSS 色彩字串。
 *
 * 換算式取自 CSS Color 4 的參考實作，與瀏覽器解讀 `hsl()` 的方式一致。
 */

/** sRGB，各通道 0–255 的整數 */
export type Rgb = { r: number; g: number; b: number };

/** HSL，h 為 0–360 度，s、l 為 0–100 的百分比；可帶小數，輸出時才取整 */
export type Hsl = { h: number; s: number; l: number };

export const COLOR_FORMATS = [
  { id: "hex", label: "HEX" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
] as const;

export type ColorFormat = (typeof COLOR_FORMATS)[number]["id"];

export function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const [red, green, blue] = [r / 255, g / 255, b / 255];
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const d = max - min;
  const l = (max + min) / 2;

  // 灰階沒有色相；給 0 而不是 NaN，滑桿才有地方放
  if (d === 0) return { h: 0, s: 0, l: l * 100 };

  const s = l === 0 || l === 1 ? 0 : (max - l) / Math.min(l, 1 - l);

  let h: number;
  if (max === red) h = (green - blue) / d + (green < blue ? 6 : 0);
  else if (max === green) h = (blue - red) / d + 2;
  else h = (red - green) / d + 4;

  return { h: h * 60, s: s * 100, l: l * 100 };
}

export function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sat = s / 100;
  const light = l / 100;
  const a = sat * Math.min(light, 1 - light);

  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round((light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
  };

  return { r: f(0), g: f(8), b: f(4) };
}

export function formatHex({ r, g, b }: Rgb): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** 依格式輸出 CSS 色彩字串，rgb / hsl 採 CSS Color 4 的空白分隔語法 */
export function formatColor(hsl: Hsl, format: ColorFormat): string {
  if (format === "hsl") {
    return `hsl(${Math.round(hsl.h) % 360} ${Math.round(hsl.s)}% ${Math.round(hsl.l)}%)`;
  }

  const rgb = hslToRgb(hsl);
  if (format === "rgb") return `rgb(${rgb.r} ${rgb.g} ${rgb.b})`;
  return formatHex(rgb);
}
