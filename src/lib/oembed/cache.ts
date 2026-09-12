/**
 * @file cache.ts
 * oEmbed 回應的本地快取。
 *
 * 快取鍵包含尺寸，因為不同 maxwidth / maxheight 拿到的是不同的內嵌 HTML；
 * 同一部影片因此可能有數筆，上限以整體筆數計算，超出時捨棄最舊的。
 */

import { readJson, writeJson } from "$lib/utils/storage";
import type { VideoCard } from "./types";

const STORAGE_KEY = "playcard_cache";
const LIMIT = 250;

/** 快取中保存的是取得當下的原樣，`fromCache` 由讀取端決定，不進快取 */
type CachedCard = Omit<VideoCard, "fromCache">;

/** 插入順序即為新舊順序，Map 的迭代順序保證這一點 */
let entries: Map<string, CachedCard> | null = null;

function store(): Map<string, CachedCard> {
  entries ??= new Map(readJson<[string, CachedCard][]>(STORAGE_KEY, []));
  return entries;
}

/** 依影片與尺寸組出快取鍵 */
export function cacheKey(videoId: string, maxwidth?: number, maxheight?: number): string {
  const size = maxwidth === undefined ? "default" : `${maxwidth}x${maxheight ?? ""}`;
  return `${videoId}::${size}`;
}

/** 讀取快取；未命中回傳 `null` */
export function readCache(key: string): VideoCard | null {
  const cached = store().get(key);
  return cached === undefined ? null : { ...cached, fromCache: true };
}

/** 寫入快取並持久化，超過上限時自最舊的開始捨棄 */
export function writeCache(key: string, card: VideoCard): void {
  const { fromCache: _ignored, ...rest } = card;
  const map = store();

  map.delete(key); // 重新插入以更新新舊順序
  map.set(key, rest);

  while (map.size > LIMIT) {
    const oldest = map.keys().next();
    if (oldest.done === true) break;
    map.delete(oldest.value);
  }

  writeJson(STORAGE_KEY, [...map.entries()]);
}
