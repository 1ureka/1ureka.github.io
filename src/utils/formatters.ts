/**
 * 將數字加上逗號分隔
 */
export function formatNumber(value: number, locale = "en-US"): string {
  return value.toLocaleString(locale);
}

/**
 * 將 bytes 格式化為 KB/MB/GB ，會使用 formatNumber 處理數字部分
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes <= 0) return "0 Bytes";
  if (!Number.isFinite(bytes)) return "N/A";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  const fixed = parseFloat(size.toFixed(decimals));
  const unit = sizes[i];

  return `${formatNumber(fixed)} ${unit}`;
}
