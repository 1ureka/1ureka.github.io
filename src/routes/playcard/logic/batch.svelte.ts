/**
 * @file batch.svelte.ts
 * 管理批次查詢：把一整批連結排隊查完，並保留每一筆的結果
 */

import { getContext, setContext } from "svelte";

import { lookup, normalizeUrl, thumbnailUrl, type VideoCard } from "#lib/oembed/index.ts";
import { downloadText, toCsv } from "#lib/utils/download.ts";
import { copyText } from "#lib/utils/clipboard.ts";
import { formatError, sleep } from "#lib/utils/shared.ts";
import { addToast } from "#lib/components/floating/toast-events.ts";

import { getHistoryContext } from "./history.svelte";

/** 同時在途的請求數；再高對公開端點不禮貌，也不會更快 */
const CONCURRENCY = 4;
/** 每個 worker 取下一筆之前的間隔 */
const INTERVAL = 120;
/** 批次查詢用的內嵌尺寸，固定用最小的，批次結果不需要大尺寸內嵌碼 */
const BATCH_DIMS = { maxwidth: 320, maxheight: 180 };

/** 一列批次結果 */
export type BatchRow =
  | { url: string; status: "pending" }
  | { url: string; status: "ok"; card: VideoCard }
  | { url: string; status: "error"; message: string };

/** 逐行拆解輸入並去重；能正規化的以影片為單位去重，不能的退回整行比對 */
function parseLinks(input: string): string[] {
  const seen = new Set<string>();
  const links: string[] = [];

  for (const raw of input.split("\n")) {
    const line = raw.trim();
    if (line.length === 0) continue;

    const key = normalizeUrl(line) ?? line;
    if (seen.has(key)) continue;

    seen.add(key);
    links.push(line);
  }

  return links;
}

class BatchController {
  private history = getHistoryContext();

  /** 輸入框目前的內容 */
  input = $state("");
  /** 上一次執行的每一列結果 */
  rows = $state<BatchRow[]>([]);
  /** 是否有一次批次正在進行中 */
  running = $state(false);
  /** 已完成的筆數 */
  completed = $state(0);

  /** 自輸入解析出的連結 */
  links = $derived(parseLinks(this.input));
  /** 本次批次的總筆數 */
  total = $derived(this.rows.length);
  /** 完成百分比 */
  percent = $derived(this.total === 0 ? 0 : Math.round((this.completed / this.total) * 100));
  /** 成功的列 */
  private succeeded = $derived(this.rows.filter((r) => r.status === "ok"));
  /** 成功的筆數 */
  successCount = $derived(this.succeeded.length);

  handleInput = (value: string) => {
    this.input = value;
  };

  handleClear = () => {
    this.input = "";
  };

  /** 把第 `index` 列換成新的結果 */
  private settle(index: number, row: BatchRow) {
    this.rows = this.rows.map((r, i) => (i === index ? row : r));
    this.completed += 1;
    if (row.status === "ok") this.history.handleRecord(row.card);
  }

  /** 執行批次查詢；進行中再次呼叫會被忽略 */
  handleRun = async () => {
    if (this.running) return;

    const links = this.links;
    if (links.length === 0) {
      addToast({ message: "請先貼上至少一個連結", variant: "error" });
      return;
    }

    this.running = true;
    this.completed = 0;
    this.rows = links.map((url) => ({ url, status: "pending" }) as BatchRow);

    // 共用一個游標的 worker 池，比切片分配更能吃滿——慢的那一筆不會拖住整個分片
    let cursor = 0;
    const worker = async () => {
      while (cursor < links.length) {
        const index = cursor++;
        const url = links[index];

        try {
          const card = await lookup(url, BATCH_DIMS);
          this.settle(index, { url, status: "ok", card });
        } catch (e) {
          this.settle(index, { url, status: "error", message: formatError(e) });
        }

        await sleep(INTERVAL);
      }
    };

    try {
      await Promise.all(Array.from({ length: Math.min(CONCURRENCY, links.length) }, worker));
      addToast({
        message: `批次查詢完成：${this.successCount} / ${this.total} 筆成功`,
        variant: this.successCount === this.total ? "success" : "info",
      });
    } finally {
      this.running = false;
    }
  };

  handleExportCsv = () => {
    if (this.rows.length === 0) {
      addToast({ message: "沒有可匯出的結果", variant: "error" });
      return;
    }

    const csv = toCsv(
      ["URL", "標題", "頻道", "提供者", "寬度", "高度", "縮圖網址", "狀態"],
      this.rows.map((row) =>
        row.status === "ok"
          ? [
              row.card.url,
              row.card.title,
              row.card.authorName,
              row.card.providerName,
              row.card.width ?? "",
              row.card.height ?? "",
              thumbnailUrl(row.card.videoId, "hqdefault.jpg"),
              "success",
            ]
          : [row.url, "", "", "", "", "", "", row.status === "error" ? "error" : "pending"],
      ),
    );

    downloadText(csv, "playcard-batch.csv", "text/csv;charset=utf-8");
    addToast({ message: "已匯出 CSV", variant: "success" });
  };

  handleExportJson = () => {
    if (this.rows.length === 0) {
      addToast({ message: "沒有可匯出的結果", variant: "error" });
      return;
    }

    downloadText(JSON.stringify(this.rows, null, 2), "playcard-batch.json", "application/json");
    addToast({ message: "已匯出 JSON", variant: "success" });
  };

  handleCopyEmbeds = async () => {
    const rows = this.succeeded;
    if (rows.length === 0) {
      addToast({ message: "沒有成功的內嵌碼可複製", variant: "error" });
      return;
    }

    const text = rows.map((r) => `<!-- ${r.card.title} -->\n${r.card.html}`).join("\n\n");

    try {
      await copyText(text);
      addToast({ message: `已複製 ${rows.length} 筆內嵌程式碼`, variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  };
}

const key = Symbol("playcard-batch-controller");

export const createBatchContext = () => {
  const controller = new BatchController();
  setContext(key, controller);
  return controller;
};

export const getBatchContext = () => getContext<BatchController>(key);
