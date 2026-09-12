/**
 * @file dnd.ts
 * 把瀏覽器的 `DataTransfer` 正規化成與工具無關的投放內容。
 *
 * 拖曳過程中（dragover / dragenter）瀏覽器只允許讀 `types`，
 * 因此「有沒有東西可收」與「收到了什麼」必須是兩個獨立的判斷。
 */

/** 一次投放帶進來的內容；兩者皆可能為空，由接手的工具自行決定能不能用 */
export type DropPayload = {
  /** 連結或純文字，優先取 uri-list */
  text: string | null;
  /** 檔案 */
  files: File[];
};

/** 這次拖曳是否帶有文字或檔案，用於決定要不要顯示投放提示 */
export function hasDragPayload(transfer: DataTransfer | null): boolean {
  if (transfer === null) return false;
  return ["text/uri-list", "text/plain", "Files"].some((t) => transfer.types.includes(t));
}

/** 自投放事件取出內容 */
export function readDropPayload(transfer: DataTransfer | null): DropPayload {
  if (transfer === null) return { text: null, files: [] };

  const uri = transfer.getData("text/uri-list").trim();
  const plain = transfer.getData("text/plain").trim();
  // uri-list 可能是多行（含 # 註解行），只取第一個有效的
  const firstUri = uri
    .split(/\r?\n/)
    .map((l) => l.trim())
    .find((l) => l.length > 0 && !l.startsWith("#"));

  return { text: firstUri ?? (plain.length > 0 ? plain : null), files: [...transfer.files] };
}
