/**
 * @file history.svelte.ts
 * 管理查詢過的影片紀錄。
 *
 * 紀錄只存在這台裝置的 localStorage，快速查詢與批次查詢的成功結果都會流進這裡，
 * 是全站唯一一份「查過什麼」的權威來源。
 */

import { getContext, setContext } from "svelte";
import { readJson, writeJson } from "#lib/utils/storage.ts";
import { thumbnailUrl, type VideoCard } from "#lib/oembed";
import { downloadText } from "#lib/utils/download.ts";

const STORAGE_KEY = "playcard_history";
const LIMIT = 400;

/** 一筆紀錄；刻意不存 `raw` 與內嵌 HTML，那些重查即可得且會迅速撐爆配額 */
export interface HistoryEntry {
  videoId: string;
  url: string;
  title: string;
  authorName: string;
  authorUrl: string;
  thumbnailUrl: string;
  providerName: string;
  width?: number;
  height?: number;
  fetchedAt: number;
  starred: boolean;
}

export type HistorySort = "newest" | "oldest" | "starred";

function isSort(value: string): value is HistorySort {
  return value === "newest" || value === "oldest" || value === "starred";
}

class HistoryController {
  /** 全部紀錄，最新的在前 */
  private entries = $state<HistoryEntry[]>([]);

  /** 目前的搜尋字串 */
  search = $state("");
  /** 目前的排序方式 */
  sort = $state<HistorySort>("newest");

  constructor() {
    // 無依賴，只在掛載後跑一次。放進 effect 是為了避開 SSR 與水合不一致。
    $effect(() => {
      this.entries = readJson<HistoryEntry[]>(STORAGE_KEY, []);
    });
  }

  /** 紀錄總數，不受搜尋影響 */
  total = $derived(this.entries.length);
  /** 出現過的不同頻道數 */
  channelCount = $derived(new Set(this.entries.map((e) => e.authorName)).size);

  /** 套用搜尋與排序後要顯示的紀錄 */
  visible = $derived.by(() => {
    const q = this.search.trim().toLowerCase();
    const matched =
      q.length === 0
        ? this.entries
        : this.entries.filter(
            (e) => e.title.toLowerCase().includes(q) || e.authorName.toLowerCase().includes(q),
          );

    return matched.toSorted((a, b) => {
      if (this.sort === "oldest") return a.fetchedAt - b.fetchedAt;
      if (this.sort === "starred") return Number(b.starred) - Number(a.starred) || b.fetchedAt - a.fetchedAt;
      return b.fetchedAt - a.fetchedAt;
    });
  });

  /** 指定影片是否已加星號；沒有紀錄時為 false */
  isStarred = (videoId: string): boolean => this.entries.find((e) => e.videoId === videoId)?.starred ?? false;

  /** 寫回 localStorage；超過上限時保留全部星號項目，其餘取最新的 */
  private persist() {
    if (this.entries.length > LIMIT) {
      const starred = this.entries.filter((e) => e.starred);
      const rest = this.entries.filter((e) => !e.starred).slice(0, Math.max(0, LIMIT - starred.length));
      this.entries = [...starred, ...rest].toSorted((a, b) => b.fetchedAt - a.fetchedAt);
    }
    writeJson(STORAGE_KEY, this.entries);
  }

  /** 記下一次成功的查詢；同一部影片只留最新一筆，星號狀態沿用 */
  handleRecord = (card: VideoCard) => {
    const previous = this.entries.find((e) => e.videoId === card.videoId);

    const entry: HistoryEntry = {
      videoId: card.videoId,
      url: card.url,
      title: card.title,
      authorName: card.authorName,
      authorUrl: card.authorUrl,
      thumbnailUrl: thumbnailUrl(card.videoId),
      providerName: card.providerName,
      width: card.width,
      height: card.height,
      fetchedAt: card.fetchedAt,
      starred: previous?.starred ?? false,
    };

    this.entries = [entry, ...this.entries.filter((e) => e.videoId !== card.videoId)];
    this.persist();
  };

  /** 切換星號；尚無紀錄的影片無法加星號，呼叫端應先 `handleRecord` */
  handleToggleStar = (videoId: string) => {
    this.entries = this.entries.map((e) => (e.videoId === videoId ? { ...e, starred: !e.starred } : e));
    this.persist();
  };

  handleRemove = (videoId: string) => {
    this.entries = this.entries.filter((e) => e.videoId !== videoId);
    this.persist();
  };

  handleClear = () => {
    this.entries = [];
    this.persist();
  };

  handleSearch = (value: string) => {
    this.search = value;
  };

  handleSortChange = (value: string) => {
    if (isSort(value)) this.sort = value;
  };

  /** 匯出全部紀錄；沒有紀錄時回傳 false，由呼叫端決定怎麼提示 */
  handleExport = (): boolean => {
    if (this.entries.length === 0) return false;
    downloadText(JSON.stringify(this.entries, null, 2), "playcard-history.json", "application/json");
    return true;
  };
}

const key = Symbol("playcard-history-controller");

export const createHistoryContext = () => {
  const controller = new HistoryController();
  setContext(key, controller);
  return controller;
};

export const getHistoryContext = () => getContext<HistoryController>(key);
