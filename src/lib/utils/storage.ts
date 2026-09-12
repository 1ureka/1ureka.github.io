/**
 * @file storage.ts
 * localStorage 的安全存取層。
 *
 * 所有存取皆為 SSR 安全（`localStorage` 不存在時降級為空值 / no-op），
 * 並吞掉隱私模式、配額不足等例外。
 */

/** 讀取並解析 localStorage 中的 JSON 值；不可用或解析失敗時回傳 `fallback` */
export function readJson<T>(key: string, fallback: T): T {
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** 將值序列化並寫入 localStorage；不可用時靜默略過 */
export function writeJson(key: string, value: unknown): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // 隱私模式 / 配額不足等情況，靜默降級
  }
}

/** 讀取 localStorage 中的字串值 */
export function readText(key: string): string | null {
  if (typeof localStorage === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** 寫入 localStorage 的字串值 */
export function writeText(key: string, value: string): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // 靜默降級
  }
}
