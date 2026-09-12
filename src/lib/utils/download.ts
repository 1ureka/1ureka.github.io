/**
 * @file download.ts
 * 產生純前端的檔案下載，以及不涉及任何欄位語意的 CSV 組裝
 */

/** 觸發瀏覽器下載一份由字串內容組成的檔案 */
export function downloadText(content: string, filename: string, type: string): void {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** 依 RFC 4180 逸出單一欄位 */
function escapeCell(value: unknown): string {
  const s = value === undefined || value === null ? "" : String(value);
  return /[",\n\r]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

/** 組出帶 BOM 的 CSV，讓 Excel 正確辨識 UTF-8 */
export function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers, ...rows].map((row) => row.map(escapeCell).join(","));
  return `\uFEFF${lines.join("\r\n")}`;
}
