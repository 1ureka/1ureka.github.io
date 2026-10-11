/**
 * @file history.svelte.ts
 * 管理 Rinse 的歷史：沖洗過的圖、它們佔了多少空間、篩選與勾選。
 *
 * 中繼資料整批放在記憶體裡，篩選、勾選、容量統計都直接算；圖片本身留在 IndexedDB，
 * 要用到時才讀。歷史滿了就不再收，絕不自動刪掉舊的——刪什麼由使用者決定。
 */

import { getContext, setContext } from "svelte";
import { SvelteSet } from "svelte/reactivity";

import { formatBytes, formatError, sleep } from "#lib/utils/shared.ts";
import { downloadBlob } from "#lib/utils/download.ts";
import { addToast } from "#lib/components/floating/toast-events.ts";

import { getLightboxContext } from "../../logic/lightbox.svelte";
import {
  deleteRecords,
  loadRecords,
  readBlob,
  recordBytes,
  requestPersistence,
  saveRecord,
  type RinseRecord,
  type RinseSource,
} from "./store";

/** 歷史的上限；兩個都是硬上限，任一到了就不再收新的 */
export const MAX_RECORDS = 1000;
export const MAX_BYTES = 1024 * 1024 * 1024;

/** 連續下載之間的間隔；一口氣觸發太多次，瀏覽器會把後面的吞掉 */
const DOWNLOAD_INTERVAL = 200;

export type SourceFilter = RinseSource | "all";

/** `YYYY-MM-DD` 轉成當地時間那一天的起點；空字串代表不限 */
function dayStart(value: string): number | null {
  if (value.length === 0) return null;
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

class RinseHistoryController {
  private lightbox = getLightboxContext();

  /** 全部紀錄，最新的在前。raw 是因為紀錄只會整筆換掉，不會就地修改 */
  records = $state.raw<RinseRecord[]>([]);
  /** 是否已經自資料庫讀完 */
  ready = $state(false);
  /** 讀取資料庫失敗時的訊息；這時歷史整個不可用，但沖洗本身照常 */
  loadError = $state<string | null>(null);

  /** 篩選條件 */
  search = $state("");
  source = $state<SourceFilter>("all");
  /** 日期區間，`YYYY-MM-DD`，兩端都含當天；空字串代表不限 */
  from = $state("");
  to = $state("");

  /** 勾選的紀錄 id */
  private checked = new SvelteSet<string>();

  /** 放大檢視中的原尺寸圖的 object URL，換下一張時放掉 */
  private viewingUrl: string | null = null;
  /** 是否已經請求過持久化 */
  private persistRequested = false;
  /** 第一次讀取完成時兌現；在那之前寫入，讀回來的結果會蓋掉剛存的那筆 */
  private loaded = Promise.withResolvers<void>();

  constructor() {
    // 無依賴，只在掛載後跑一次。放進 effect 是為了避開 SSR。
    $effect(() => {
      void this.load();
    });
  }

  private async load() {
    try {
      this.records = await loadRecords();
    } catch (e) {
      this.loadError = formatError(e);
    } finally {
      this.ready = true;
      this.loaded.resolve();
    }
  }

  /** 等到第一次讀取完成；容量判斷在那之前不準 */
  whenReady = (): Promise<void> => this.loaded.promise;

  // --- 容量 ---

  count = $derived(this.records.length);
  totalBytes = $derived(this.records.reduce((sum, r) => sum + recordBytes(r), 0));
  /** 任一上限到了就算滿 */
  full = $derived(this.count >= MAX_RECORDS || this.totalBytes >= MAX_BYTES);

  /** 再放一筆這麼大的紀錄是否還在上限內 */
  canFit = (bytes: number): boolean => {
    return this.loadError === null && this.count < MAX_RECORDS && this.totalBytes + bytes <= MAX_BYTES;
  };

  // --- 篩選 ---

  filtering = $derived(this.search.trim().length > 0 || this.source !== "all" || this.from !== "" || this.to !== "");

  /** 套用篩選後的紀錄，維持最新在前 */
  visible = $derived.by(() => {
    const q = this.search.trim().toLowerCase();
    const start = dayStart(this.from);
    const toStart = dayStart(this.to);
    // 「到」那天整天都算，所以界線是隔天的起點
    const end = toStart === null ? null : toStart + 24 * 60 * 60 * 1000;

    return this.records.filter(
      (r) =>
        (q.length === 0 || r.name.toLowerCase().includes(q)) &&
        (this.source === "all" || r.source === this.source) &&
        (start === null || r.createdAt >= start) &&
        (end === null || r.createdAt < end),
    );
  });

  // --- 勾選 ---

  /**
   * 實際生效的勾選：只算目前篩選結果裡的那些。
   * 被篩掉的勾選先留著，條件放寬時會回來，但看不見的東西永遠不會被一起刪掉或下載。
   */
  selection = $derived(this.visible.filter((r) => this.checked.has(r.id)));
  selectionBytes = $derived(this.selection.reduce((sum, r) => sum + r.size, 0));
  /** 目前的篩選結果是否全部勾選 */
  allSelected = $derived(this.visible.length > 0 && this.selection.length === this.visible.length);

  isChecked = (id: string): boolean => this.checked.has(id);

  handleToggleCheck = (id: string) => {
    if (this.checked.has(id)) this.checked.delete(id);
    else this.checked.add(id);
  };

  /** 全選或全不選目前的篩選結果 */
  handleToggleAll = () => {
    if (this.allSelected) {
      for (const r of this.visible) this.checked.delete(r.id);
    } else {
      for (const r of this.visible) this.checked.add(r.id);
    }
  };

  handleClearSelection = () => {
    this.checked.clear();
  };

  // --- 寫入 ---

  /**
   * 存入一筆沖洗結果。呼叫端應先以 `canFit` 確認放得下；
   * 失敗（例如瀏覽器配額不足）時拋出，紀錄不會留在記憶體裡。
   */
  handleRecord = async (record: RinseRecord, blob: Blob, preview: Blob) => {
    await saveRecord(record, blob, preview);
    this.records = [record, ...this.records];

    if (!this.persistRequested) {
      this.persistRequested = true;
      void requestPersistence();
    }
  };

  handleDelete = async (ids: string[]) => {
    try {
      await deleteRecords(ids);
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
      return;
    }

    const removed = new Set(ids);
    this.records = this.records.filter((r) => !removed.has(r.id));
    for (const id of ids) this.checked.delete(id);
  };

  /** 刪除目前生效的勾選 */
  handleDeleteSelected = async () => {
    const targets = this.selection;
    if (targets.length === 0) return;

    const bytes = targets.reduce((sum, r) => sum + recordBytes(r), 0);
    await this.handleDelete(targets.map((r) => r.id));
    addToast({ message: `已刪除 ${targets.length} 張，騰出 ${formatBytes(bytes)}`, variant: "success" });
  };

  /** 逐張下載目前生效的勾選 */
  handleDownloadSelected = async () => {
    const targets = this.selection;
    if (targets.length === 0) return;

    let failed = 0;
    for (const [i, record] of targets.entries()) {
      try {
        downloadBlob(await readBlob(record.id), `${record.name}.png`);
      } catch {
        failed += 1;
      }
      if (i < targets.length - 1) await sleep(DOWNLOAD_INTERVAL);
    }

    if (failed > 0) addToast({ message: `${failed} 張讀取失敗，沒有下載`, variant: "error" });
    else addToast({ message: `已下載 ${targets.length} 張`, variant: "success" });
  };

  // --- 單張 ---

  handleDownload = async (record: RinseRecord) => {
    try {
      downloadBlob(await readBlob(record.id), `${record.name}.png`);
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  };

  /** 以原尺寸放大檢視 */
  handleOpen = async (record: RinseRecord) => {
    try {
      const blob = await readBlob(record.id);
      if (this.viewingUrl !== null) URL.revokeObjectURL(this.viewingUrl);
      this.viewingUrl = URL.createObjectURL(blob);
      this.lightbox.handleOpen(this.viewingUrl, `${record.name}.png`);
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  };

  // --- 篩選條件 ---

  handleSearch = (value: string) => {
    this.search = value;
  };

  handleSourceChange = (value: string) => {
    this.source = value as SourceFilter;
  };

  handleFromChange = (value: string) => {
    this.from = value;
  };

  handleToChange = (value: string) => {
    this.to = value;
  };

  handleResetFilters = () => {
    this.search = "";
    this.source = "all";
    this.from = "";
    this.to = "";
  };
}

const key = Symbol("rinse-history-controller");

export const createRinseHistoryContext = () => {
  const controller = new RinseHistoryController();
  setContext(key, controller);
  return controller;
};

export const getRinseHistoryContext = () => getContext<RinseHistoryController>(key);
