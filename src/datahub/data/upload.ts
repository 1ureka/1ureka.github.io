import { getClient } from "./client";
import { tryCatch } from "@/utils/tryCatch";

/**
 * 手動上傳並替換資料庫
 * @param file SQLite 資料庫檔案
 * @returns 上傳結果
 */
export const uploadDatabase = async (file: File): Promise<{ success: boolean; error: string | null }> => {
  try {
    // 檢查檔案類型
    if (!file.name.endsWith('.db') && !file.name.endsWith('.sqlite') && !file.name.endsWith('.sqlite3')) {
      return { success: false, error: "請選擇有效的 SQLite 資料庫檔案 (.db, .sqlite, .sqlite3)" };
    }

    // 檢查檔案大小 (限制為 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      return { success: false, error: "檔案大小不能超過 50MB" };
    }

    const client = getClient();
    
    // 讀取檔案內容
    const { data: arrayBuffer, error: readError } = await tryCatch(
      file.arrayBuffer()
    );

    if (readError) {
      return { success: false, error: "讀取檔案失敗" };
    }

    // 嘗試使用上傳的資料庫資料建立新的 SQLite 實例
    const { error: loadError } = await tryCatch(
      client.loadFromArrayBuffer(new Uint8Array(arrayBuffer))
    );

    if (loadError) {
      return { success: false, error: "無效的 SQLite 資料庫檔案" };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Database upload error:", error);
    return { success: false, error: "上傳過程中發生錯誤" };
  }
};

/**
 * 驗證資料庫檔案是否有效
 * @param file 要驗證的檔案
 * @returns 驗證結果
 */
export const validateDatabaseFile = async (file: File): Promise<{ valid: boolean; error: string | null }> => {
  try {
    // 檢查檔案擴展名
    const validExtensions = ['.db', '.sqlite', '.sqlite3'];
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidExtension) {
      return { valid: false, error: "請選擇有效的 SQLite 資料庫檔案" };
    }

    // 檢查檔案大小
    if (file.size === 0) {
      return { valid: false, error: "檔案不能為空" };
    }

    if (file.size > 50 * 1024 * 1024) {
      return { valid: false, error: "檔案大小不能超過 50MB" };
    }

    // 檢查檔案頭是否為 SQLite 格式
    const { data: header, error: readError } = await tryCatch(
      file.slice(0, 16).arrayBuffer()
    );

    if (readError) {
      return { valid: false, error: "無法讀取檔案" };
    }

    const headerArray = new Uint8Array(header);
    const sqliteSignature = "SQLite format 3\0";
    const signatureBytes = new TextEncoder().encode(sqliteSignature);
    
    for (let i = 0; i < signatureBytes.length; i++) {
      if (headerArray[i] !== signatureBytes[i]) {
        return { valid: false, error: "不是有效的 SQLite 資料庫檔案" };
      }
    }

    return { valid: true, error: null };
  } catch (error) {
    return { valid: false, error: "檔案驗證失敗" };
  }
};