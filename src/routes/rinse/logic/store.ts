/**
 * @file store.ts
 * Rinse 歷史的持久層：IndexedDB 裡的三個 object store。
 *
 * - `meta`：每筆紀錄的中繼資料，小到可以開頁時整批讀進記憶體，篩選與勾選都在記憶體裡做
 * - `previews`：列表用的小張預覽，只在卡片出現在畫面上時才讀
 * - `blobs`：沖洗出來的原尺寸 PNG，只在放大、另存、複製、下載時才讀
 *
 * 存進來的永遠是沖洗後的 PNG，原始位元組從來不落地——Rinse「碰到本機之前就已經洗好」
 * 的保證不因為多了歷史而改變。Blob 直接存，不轉 base64：IndexedDB 原生支援，
 * 轉了只會變大三分之一，還要多編解碼一次。
 */

import { commit, openDatabase, request } from "$lib/utils/idb";

const DB_NAME = "rinse";
const DB_VERSION = 1;

const META = "meta";
const PREVIEWS = "previews";
const BLOBS = "blobs";

/** 這張圖是打哪來的 */
export type RinseSource = "drop" | "paste" | "url" | "playcard";

/** 一筆歷史紀錄的中繼資料 */
export interface RinseRecord {
  id: string;
  /** 不含副檔名的檔名 */
  name: string;
  source: RinseSource;
  /** 原始位元組的 MIME 與大小，用來對照輸出 */
  originalType: string;
  originalSize: number;
  width: number;
  height: number;
  /** 沖洗後 PNG 的大小 */
  size: number;
  /** 預覽圖的大小；同樣佔著空間，所以也算進容量 */
  previewSize: number;
  createdAt: number;
}

/** 一筆紀錄實際佔用的位元組 */
export function recordBytes(record: RinseRecord): number {
  return record.size + record.previewSize;
}

let connection: Promise<IDBDatabase> | null = null;

/** 資料庫連線只開一次，之後共用 */
function db(): Promise<IDBDatabase> {
  connection ??= openDatabase(DB_NAME, DB_VERSION, (database) => {
    database.createObjectStore(META, { keyPath: "id" });
    database.createObjectStore(PREVIEWS);
    database.createObjectStore(BLOBS);
  }).catch((e) => {
    // 失敗的連線不留著，下次呼叫才有機會重試
    connection = null;
    throw e;
  });
  return connection;
}

/** 讀出全部紀錄的中繼資料，最新的在前 */
export async function loadRecords(): Promise<RinseRecord[]> {
  const database = await db();
  const records = await request<RinseRecord[]>(database.transaction(META).objectStore(META).getAll());
  return records.toSorted((a, b) => b.createdAt - a.createdAt);
}

/** 存入一筆紀錄；三份資料在同一個交易裡，要嘛全部寫進去，要嘛都沒有 */
export async function saveRecord(record: RinseRecord, blob: Blob, preview: Blob): Promise<void> {
  const database = await db();
  const tx = database.transaction([META, PREVIEWS, BLOBS], "readwrite");

  tx.objectStore(META).put(record);
  tx.objectStore(PREVIEWS).put(preview, record.id);
  tx.objectStore(BLOBS).put(blob, record.id);

  await commit(tx);
}

/** 刪除多筆紀錄 */
export async function deleteRecords(ids: string[]): Promise<void> {
  if (ids.length === 0) return;

  const database = await db();
  const tx = database.transaction([META, PREVIEWS, BLOBS], "readwrite");

  for (const id of ids) {
    tx.objectStore(META).delete(id);
    tx.objectStore(PREVIEWS).delete(id);
    tx.objectStore(BLOBS).delete(id);
  }

  await commit(tx);
}

async function readFrom(store: string, id: string): Promise<Blob> {
  const database = await db();
  const blob = await request<Blob | undefined>(database.transaction(store).objectStore(store).get(id));
  if (blob === undefined) throw new Error("這筆紀錄的圖片已經不在了");
  return blob;
}

/** 讀出一筆紀錄的預覽圖 */
export function readPreview(id: string): Promise<Blob> {
  return readFrom(PREVIEWS, id);
}

/** 讀出一筆紀錄的原尺寸 PNG */
export function readBlob(id: string): Promise<Blob> {
  return readFrom(BLOBS, id);
}

/**
 * 請瀏覽器把這個網站的儲存空間標成持久。
 * 沒有這個標記時，磁碟吃緊的瀏覽器可以不經詢問整批清掉；拿不到也不影響使用。
 */
export async function requestPersistence(): Promise<void> {
  try {
    if (await navigator.storage.persisted()) return;
    await navigator.storage.persist();
  } catch {
    // 不支援或被拒絕都只是少了一層保障
  }
}
