/**
 * @file clipboard.ts
 * 複製到剪貼簿；文字在不支援 Clipboard API 時降級為隱藏 textarea，圖片則沒有降級可用
 */

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * 複製一張圖片到剪貼簿。
 *
 * 只接受 PNG——各家瀏覽器對剪貼簿圖片型別的支援只在 PNG 上有交集，
 * 寫入其他型別會被當成不支援而整批拒絕。
 */
export async function copyImage(blob: Blob): Promise<void> {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error("這個瀏覽器不支援複製圖片到剪貼簿");
  }

  if (blob.type !== "image/png") throw new Error("只能複製 PNG 到剪貼簿");

  await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
}
