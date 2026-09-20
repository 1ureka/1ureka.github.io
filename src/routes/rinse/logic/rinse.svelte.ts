/**
 * @file rinse.svelte.ts
 * 管理沖洗：接手一張圖，重畫成 PNG，並留下這次工作階段的紀錄。
 *
 * 圖可以來自四個地方——全域投放、貼上、圖片連結，或 Playcard 直接遞過來的縮圖。
 * 四者只在「怎麼拿到位元組」這一步不同，拿到之後走的是同一條管線，
 * 所以輸出的保證對誰都一樣。
 *
 * 紀錄只活在記憶體裡。沖洗好的 PNG 當下就已經進了下載資料夾，留在這裡的那一份
 * 是為了「剛剛那幾張」還能再換個格式存一次，不是為了長期保存——localStorage 也
 * 存不下 Blob。
 */

import { getContext, setContext } from "svelte";

import { formatError } from "$lib/utils/shared";
import { readText, writeText } from "$lib/utils/storage";
import { downloadBlob } from "$lib/utils/download";
import { copyImage } from "$lib/utils/clipboard";
import { addToast } from "$lib/components/floating/toast-events";
import type { DropPayload } from "$lib/utils/dnd";
import {
  RINSE_FORMAT,
  baseName,
  decodeImage,
  encodeImage,
  fetchImageBlob,
  fileNameFromUrl,
  getFormat,
  type EncodeOptions,
} from "$lib/utils/image";

/** 紀錄的上限；筆數與位元組兩個都是為了記憶體，任一超出就自最舊的開始丟 */
const MAX_ENTRIES = 24;
const MAX_BYTES = 192 * 1024 * 1024;

/** 列表縮圖的最大邊長。不縮的話整份列表會把原尺寸點陣圖全解進記憶體 */
const PREVIEW_EDGE = 360;

const AUTO_DOWNLOAD_KEY = "rinse_auto_download";

/** 這張圖是打哪來的 */
export type RinseSource = "drop" | "paste" | "url" | "playcard";

export const SOURCE_LABELS: Record<RinseSource, string> = {
  drop: "拖曳",
  paste: "貼上",
  url: "連結",
  playcard: "Playcard",
};

/** 一筆沖洗紀錄 */
export interface RinseEntry {
  id: number;
  /** 不含副檔名的檔名 */
  name: string;
  source: RinseSource;
  /** 原始位元組的 MIME 與大小，用來對照輸出 */
  originalType: string;
  originalSize: number;
  width: number;
  height: number;
  /** 沖洗後的 PNG。PNG 無損，所以任何再輸出都自這裡重新解碼，像素與當初完全相同 */
  blob: Blob;
  /** 沖洗結果本身的 object URL，放大檢視時看的是這一份 */
  url: string;
  /** 列表用的小張預覽。列表若直接掛原尺寸，整份紀錄會把點陣圖全解進記憶體 */
  previewUrl: string;
  createdAt: number;
}

/** 佇列中的一件工作。位元組延後到輪到它才取，一次丟十個連結才不會同時發十個請求 */
type RinseJob = {
  name: string;
  source: RinseSource;
  load: () => Promise<Blob>;
};

/** 放掉一筆紀錄佔住的 object URL，Blob 本身才收得回去 */
function release(entry: RinseEntry) {
  URL.revokeObjectURL(entry.url);
  URL.revokeObjectURL(entry.previewUrl);
}

/** 列表縮圖只要看得清楚就好 */
function previewScale(width: number, height: number): number {
  const longest = Math.max(width, height);
  return longest > PREVIEW_EDGE ? PREVIEW_EDGE / longest : 1;
}

class RinseController {
  /** 這次工作階段沖洗過的圖，最新的在前 */
  entries = $state<RinseEntry[]>([]);
  /** 還有幾張在排隊或處理中 */
  pending = $state(0);
  /** 連結輸入欄目前的值 */
  input = $state("");
  /** 連結輸入欄的錯誤；投放與貼上的失敗走 toast，因為那裡沒有欄位可以掛 */
  error = $state<string | null>(null);
  /** 沖洗完是否立刻下載 */
  autoDownload = $state(true);

  /** 連結輸入欄的 DOM 參照，由欄位元件掛上，供快速鍵直接聚焦 */
  inputEl = $state<HTMLInputElement | undefined>();

  /** 下一筆紀錄的流水號 */
  private nextId = 1;
  /** 待處理的工作；不是 $state，畫面看的是 pending 與 entries */
  private queue: RinseJob[] = [];
  /** 是否已經有一份處理迴圈在跑 */
  private draining = false;

  constructor() {
    // 無依賴，只在掛載後跑一次。放進 effect 是為了避開 SSR 與水合不一致。
    $effect(() => {
      this.autoDownload = readText(AUTO_DOWNLOAD_KEY) !== "off";
    });
  }

  /** 目前留著的沖洗成果總共佔多少位元組 */
  totalBytes = $derived(this.entries.reduce((sum, entry) => sum + entry.blob.size, 0));

  // --- 佇列 ---

  private enqueue(jobs: RinseJob[]) {
    if (jobs.length === 0) return;
    this.queue.push(...jobs);
    this.pending += jobs.length;
    void this.drain();
  }

  /**
   * 逐一處理佇列。
   *
   * `draining` 在第一個 await 之前就同步設起來，所以同一個迴圈永遠只有一份在跑；
   * 每件工作自己的失敗都在迴圈內收掉，一張壞圖不會讓後面的全部停擺。
   */
  private async drain() {
    if (this.draining) return;
    this.draining = true;

    try {
      while (this.queue.length > 0) {
        const job = this.queue.shift();
        if (job === undefined) break;

        try {
          await this.process(job);
          if (job.source === "url") this.error = null;
        } catch (e) {
          const message = formatError(e);
          if (job.source === "url") this.error = message;
          else addToast({ message: `${job.name}：${message}`, variant: "error" });
        } finally {
          this.pending -= 1;
        }
      }
    } finally {
      this.draining = false;
    }
  }

  /** 一張圖的完整生命週期：取得位元組、解碼、重畫、留底、下載 */
  private async process(job: RinseJob) {
    const blob = await job.load();

    // 型別說了不是圖片就不必再往下走；沒說的（例如某些拖曳來源）交給解碼器判斷
    if (blob.type.length > 0 && !blob.type.startsWith("image/")) {
      throw new Error(`這是 ${blob.type}，不是圖片`);
    }

    const decoded = await decodeImage(blob);

    try {
      const rinsed = await encodeImage(decoded, { format: RINSE_FORMAT });
      const preview = await encodeImage(decoded, {
        format: RINSE_FORMAT,
        scale: previewScale(decoded.width, decoded.height),
      });

      this.insert({
        id: this.nextId++,
        name: job.name,
        source: job.source,
        originalType: blob.type,
        originalSize: blob.size,
        width: decoded.width,
        height: decoded.height,
        blob: rinsed,
        url: URL.createObjectURL(rinsed),
        previewUrl: URL.createObjectURL(preview),
        createdAt: Date.now(),
      });

      if (this.autoDownload) downloadBlob(rinsed, `${job.name}.png`);

      // 由 Playcard 遞過來時使用者不在這個工具的畫面上，沒有別的方式知道事情成了
      if (job.source === "playcard") {
        addToast({
          message: this.autoDownload ? `已沖洗並下載 ${job.name}.png` : `已沖洗 ${job.name}，可到 Rinse 下載`,
          variant: "success",
        });
      }
    } finally {
      decoded.close();
    }
  }

  private insert(entry: RinseEntry) {
    const next = [entry, ...this.entries];
    let bytes = next.reduce((sum, e) => sum + e.blob.size, 0);

    // 單獨一張就超出位元組上限時仍然留著，否則剛沖好的圖會立刻消失
    while (next.length > MAX_ENTRIES || (next.length > 1 && bytes > MAX_BYTES)) {
      const dropped = next.pop();
      if (dropped === undefined) break;
      bytes -= dropped.blob.size;
      release(dropped);
    }

    this.entries = next;
  }

  // --- 各種來源 ---

  private fileJob(file: File, source: RinseSource): RinseJob {
    return { name: baseName(file.name), source, load: async () => file };
  }

  private urlJob(url: string, source: RinseSource, name?: string): RinseJob {
    return { name: name ?? fileNameFromUrl(url), source, load: () => fetchImageBlob(url) };
  }

  /**
   * 接手一次全域投放。
   * 殼層只負責把內容送到目前的工具，能不能用是這裡自己的判斷。
   */
  handleDrop = (payload: DropPayload) => {
    if (payload.files.length > 0) {
      this.enqueue(payload.files.map((file) => this.fileJob(file, "drop")));
      return;
    }

    // 有些來源（背景圖、或已經被壓成連結的拖曳）只帶得出網址而沒有位元組
    if (payload.text !== null) {
      this.enqueue([this.urlJob(payload.text, "drop")]);
      return;
    }

    addToast({ message: "這次投放沒有帶進任何圖片", variant: "error" });
  };

  /** 接手一次貼上。剪貼簿裡沒有圖片時退而求其次試試看網址 */
  handlePaste = (data: DataTransfer | null) => {
    if (data === null) return;

    const files = [...data.files].filter((file) => file.type.startsWith("image/"));
    if (files.length > 0) {
      this.enqueue(files.map((file) => this.fileJob(file, "paste")));
      return;
    }

    const text = data.getData("text/plain").trim();
    if (/^https?:\/\//i.test(text)) this.enqueue([this.urlJob(text, "paste")]);
  };

  /** 由其他工具直接遞來一張圖；Playcard 的縮圖走這裡，不必開第二個分頁再拖一次 */
  handleAdopt = (url: string, name: string) => {
    this.enqueue([this.urlJob(url, "playcard", baseName(name))]);
  };

  /** 使用者自己挑的檔案 */
  handlePick = (files: FileList | null) => {
    if (files === null) return;
    this.enqueue([...files].map((file) => this.fileJob(file, "drop")));
  };

  handleInput = (value: string) => {
    this.input = value;
    this.error = null;
  };

  handleSubmit = () => {
    const value = this.input.trim();
    if (value.length === 0) {
      this.error = "請先貼上一個圖片網址";
      return;
    }
    this.enqueue([this.urlJob(value, "url")]);
  };

  /** 聚焦連結欄位 */
  handleFocusInput = () => {
    this.inputEl?.focus();
    this.inputEl?.select();
  };

  // --- 已沖洗的成果 ---

  /**
   * 以指定設定再輸出一次。
   * 來源是當初沖洗出來的 PNG，無損，所以像素與從原圖轉出的結果完全一致。
   */
  handleSave = async (entry: RinseEntry, options: EncodeOptions, filename?: string) => {
    const format = getFormat(options.format);

    try {
      const decoded = await decodeImage(entry.blob);
      try {
        const blob = await encodeImage(decoded, options);
        downloadBlob(blob, `${baseName(filename ?? entry.name)}.${format.ext}`);
      } finally {
        decoded.close();
      }
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  };

  handleCopy = async (entry: RinseEntry) => {
    try {
      await copyImage(entry.blob);
      addToast({ message: "已複製 PNG 到剪貼簿", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  };

  handleRemove = (id: number) => {
    const entry = this.entries.find((e) => e.id === id);
    if (entry === undefined) return;

    release(entry);
    this.entries = this.entries.filter((e) => e.id !== id);
  };

  handleClear = () => {
    for (const entry of this.entries) release(entry);
    this.entries = [];
  };

  handleToggleAutoDownload = () => {
    this.autoDownload = !this.autoDownload;
    writeText(AUTO_DOWNLOAD_KEY, this.autoDownload ? "on" : "off");
  };
}

const key = Symbol("rinse-controller");

export const createRinseContext = () => {
  const controller = new RinseController();
  setContext(key, controller);
  return controller;
};

export const getRinseContext = () => getContext<RinseController>(key);
