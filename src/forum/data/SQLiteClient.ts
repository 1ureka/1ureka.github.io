import initSqlJs from "sql.js";
import type { Database, QueryExecResult, BindParams } from "sql.js";
import { get, set, del } from "idb-keyval";
import { tryCatch } from "@/utils/tryCatch";

const TEST_DELAY = 500; // 最短等待時間，模擬網絡延遲
const DB_KEY = "sqlite-db-forum";
import DB_PATH from "@/assets/db/forum.db?url";

export class SQLiteClient {
  private static dbPromise: Promise<Database> | null = null;

  // ----------------------------
  // SQL操作方法
  // ----------------------------

  /**
   *  執行 SQL 查詢
   */
  static async exec(sql: string, params?: BindParams) {
    const startTime = Date.now(); // 計時

    this.dbPromise = this.dbPromise === null ? this.loadDatabase() : this.dbPromise;
    const db = await this.dbPromise;

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
    if (elapsedTime < TEST_DELAY) {
      await new Promise((resolve) => setTimeout(resolve, TEST_DELAY - elapsedTime));
    }

    return this.parse(result.data);
  }

  /**
   * 重置數據庫到初始狀態
   */
  static async reset(): Promise<void> {
    await del(DB_KEY);
    this.dbPromise = this.loadDatabase();
  }

  // ----------------------------
  // 工具方法 (私有)
  // ----------------------------

  /**
   * 解析 SQL.js 返回的結果
   */
  private static parse(result: QueryExecResult[]) {
    if (result.length === 0 || !result[0]) return [];
    const { columns, values } = result[0];
    return values.map((row) => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
  }

  /**
   * 從 IndexedDB 或初始文件載入數據庫
   */
  private static async loadDatabase(): Promise<Database> {
    const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}` });

    const { data: cached, error: cachedError } = await tryCatch(get<Uint8Array>(DB_KEY));
    if (cachedError) console.error("Failed to get cached database", cachedError);
    if (cached) return new SQL.Database(cached);

    const { data: db, error } = await tryCatch(
      (async () => {
        const res = await fetch(DB_PATH);
        const buffer = await res.arrayBuffer();
        return new SQL.Database(new Uint8Array(buffer));
      })()
    );

    if (error) {
      console.error("Failed to fetch database file", error);
      return new SQL.Database();
    }

    const data = db.export();
    const { error: saveError } = await tryCatch(set(DB_KEY, data));
    if (saveError) console.error("Failed to save database to IndexedDB", saveError);

    return db;
  }

  /**
   * 保存當前數據庫狀態到 IndexedDB
   */
  private static async saveDatabase(db: Database) {
    const data = db.export();
    const { error } = await tryCatch(set(DB_KEY, data));
    if (error) console.error("Failed to save database to IndexedDB", error);
  }
}

export class BlobClient {
  // TODO: 直接使用 IndexedDB API，包裝 hashUrl 的邏輯
}
