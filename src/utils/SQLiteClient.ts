import initSqlJs from "sql.js";
import type { Database, QueryExecResult, BindParams } from "sql.js";
import { get, set, del } from "idb-keyval";
import { tryCatch } from "@/utils/tryCatch";

const TEST_DELAY = 500; // 最短等待時間，模擬網絡延遲

export class SQLiteClient {
  private dbPromise: Promise<Database> | null = null;
  private dbPath: string;
  private storageKey: string;
  private timestamp: number | null = null; // 用於版本檢查

  constructor(config: { dbPath: string; storageKey: string }) {
    this.dbPath = config.dbPath;
    this.storageKey = config.storageKey;
  }

  private ready() {
    this.checkTimestamp(); // 檢查時間戳，若有變化則重新載入資料庫
    this.dbPromise = this.dbPromise === null ? this.loadDatabase() : this.dbPromise;
    return this.dbPromise;
  }

  // ----------------------------
  // SQL操作方法
  // ----------------------------

  /**
   * 執行 SQL 查詢
   */
  async exec(sql: string, params?: BindParams, noDelay = false) {
    const startTime = Date.now(); // 計時

    // 確保資料庫已載入
    const db = await this.ready();

    // 確保外鍵約束開啟
    db.run("PRAGMA foreign_keys = ON;");
    const [{ values }] = db.exec("PRAGMA foreign_keys;");
    if (values[0][0] !== 1) {
      console.error("Failed to enable foreign keys");
      return this.parse([]);
    }

    // 執行 SQL 查詢
    const result = await tryCatch(
      (async () => {
        const result = db.exec(sql, params);
        await this.saveDatabase(db);
        return result;
      })()
    );

    // 處理錯誤
    if (result.error !== null) {
      console.error("Failed to execute SQL query", result.error);
      return this.parse([]);
    }

    // 至少等待 TEST_DELAY 毫秒
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < TEST_DELAY && !noDelay) {
      await new Promise((resolve) => setTimeout(resolve, TEST_DELAY - elapsedTime));
    }

    return this.parse(result.data);
  }

  // ----------------------------
  // indexedDB操作方法
  // ----------------------------

  /**
   * 下載目前資料庫狀態為檔案
   * @param fileName 下載檔案名稱
   * @returns 是否成功下載
   */
  async downloadDatabase(fileName: string = "database.db") {
    const startTime = Date.now(); // 計時

    // 確保資料庫已載入
    const db = await this.ready();

    // 匯出資料庫為 Uint8Array
    const data = db.export();

    // 建立 Blob 並下載
    const blob = new Blob([data], { type: "application/x-sqlite3" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.style.display = "none";
    document.body.appendChild(a);

    // 至少等待 TEST_DELAY 毫秒
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < TEST_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, TEST_DELAY - elapsedTime));
    }

    a.click();

    // 清理
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  /**
   * 重置數據庫到初始狀態
   */
  async reset(): Promise<void> {
    const startTime = Date.now(); // 計時

    const { error } = await tryCatch(del(this.storageKey));
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < TEST_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, TEST_DELAY - elapsedTime));
    }

    if (error) console.error("刪除本地資料庫失敗");
    else console.log("刪除本地資料庫成功");

    this.dbPromise = this.loadDatabase();
  }

  /**
   * 獲取資料庫大小
   */
  async getDatabaseSize(): Promise<number> {
    // 確保資料庫已載入
    await this.ready();

    const { data: cached, error } = await tryCatch(get<Uint8Array>(this.storageKey));
    if (error) {
      console.error("Failed to get database size", error);
      return 0;
    }

    return cached ? cached.byteLength : 0;
  }

  // ----------------------------
  // 工具方法 (私有)
  // ----------------------------

  /**
   * 檢查時間戳，若有變化則重新載入資料庫
   */
  private checkTimestamp() {
    const raw = localStorage.getItem("__db_timestamp__") ?? Date.now().toString();
    const stamp = parseInt(raw, 10);
    if (this.timestamp === null) this.timestamp = stamp;
    else if (this.timestamp !== stamp) {
      this.timestamp = stamp;
      this.dbPromise = null; // 重新載入資料庫
    }
  }

  /**
   * 設置時間戳
   */
  private setTimestamp() {
    const stamp = Date.now();
    localStorage.setItem("__db_timestamp__", stamp.toString());
    this.timestamp = stamp;
  }

  /**
   * 解析 SQL.js 返回的結果
   */
  private parse(result: QueryExecResult[]) {
    if (result.length === 0 || !result[0]) return [];
    const { columns, values } = result[0];
    return values.map((row) => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
  }

  /**
   * 從 IndexedDB 或初始文件載入數據庫
   */
  private async loadDatabase(): Promise<Database> {
    const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });

    const { data: cached, error: cachedError } = await tryCatch(get<Uint8Array>(this.storageKey));
    if (cachedError) console.error("Failed to get cached database", cachedError);
    if (cached) return new SQL.Database(cached);

    const { data: db, error } = await tryCatch(
      (async () => {
        const res = await fetch(this.dbPath);
        const buffer = await res.arrayBuffer();
        return new SQL.Database(new Uint8Array(buffer));
      })()
    );

    if (error) {
      console.error("Failed to fetch database file", error);
      return new SQL.Database();
    }

    const data = db.export();
    const { error: saveError } = await tryCatch(set(this.storageKey, data));
    if (saveError) console.error("Failed to save database to IndexedDB", saveError);

    return db;
  }

  /**
   * 保存當前數據庫狀態到 IndexedDB
   */
  private async saveDatabase(db: Database) {
    this.setTimestamp(); // 更新時間戳，使其他頁面能夠檢測到變化
    const data = db.export();
    const { error } = await tryCatch(set(this.storageKey, data));
    if (error) console.error("Failed to save database to IndexedDB", error);
  }
}
