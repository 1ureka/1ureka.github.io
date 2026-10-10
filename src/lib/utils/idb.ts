/**
 * @file idb.ts
 * IndexedDB 的極簡 Promise 包裝。
 *
 * 只包「請求」與「交易」兩種回呼成 Promise，結構描述與查詢方式留給呼叫端；
 * 這裡不懂任何一個工具的資料長什麼樣子。
 */

/** 等待一個請求完成，取得它的結果 */
export function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/**
 * 等待一個交易提交。
 *
 * 寫入要等的是交易而不是個別請求：請求成功只代表排進了交易，
 * 交易在 complete 之前都還可能整批中止（例如配額不足），那時什麼都沒有寫進去。
 */
export function commit(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => reject(tx.error ?? new DOMException("交易已中止", "AbortError"));
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * 開啟一個資料庫。
 *
 * `upgrade` 只在版本號高於現存版本（含首次建立）時執行，結構的建立與遷移寫在那裡，
 * `oldVersion` 為 0 代表全新建立。
 */
export function openDatabase(
  name: string,
  version: number,
  upgrade: (db: IDBDatabase, oldVersion: number) => void,
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, version);

    req.onupgradeneeded = (event) => upgrade(req.result, event.oldVersion);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    // 另一個分頁還開著舊版本時升級會卡住；不會失敗，只是一直等，至少要讓它有個結果
    req.onblocked = () => reject(new Error("資料庫正被另一個分頁的舊版本佔用，請關閉其他分頁後重新整理"));
  });
}
