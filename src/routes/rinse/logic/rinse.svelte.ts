/**
 * @file rinse.svelte.ts
 * 管理沖洗：接手一張圖，重畫成 PNG，存進歷史，並留著最新的那一張給首頁看。
 *
 * 圖可以來自四個地方——全域投放、貼上、圖片連結，或 Playcard 直接遞過來的縮圖。
 * 四者只在「怎麼拿到位元組」這一步不同，拿到之後走的是同一條管線，
 * 所以輸出的保證對誰都一樣。
 *
 * 歷史滿了不影響沖洗：圖照樣洗、照樣下載、照樣顯示在首頁，只是不存。
 */

import { getContext, setContext } from "svelte";

import { formatError } from "#lib/utils/shared.ts";
import { readText, writeText } from "#lib/utils/storage.ts";
import { downloadBlob } from "#lib/utils/download.ts";
import { copyImage } from "#lib/utils/clipboard.ts";
import { addToast } from "#lib/components/floating/toast-events.ts";
import type { DropPayload } from "#lib/utils/dnd.ts";
import {
  RINSE_FORMAT,
  baseName,
  decodeImage,
  encodeImage,
  fetchImageBlob,
  fileNameFromUrl,
  getFormat,
  type EncodeOptions,
} from "#lib/utils/image.ts";

import { getRinseTabsContext } from "./tabs.svelte";
import { getRinseHistoryContext } from "./history.svelte";
import type { RinseRecord, RinseSource } from "./store";

export type { RinseRecord, RinseSource } from "./store";

/** 歷史列表預覽圖的最大邊長。不縮的話整份列表會把原尺寸點陣圖全解進記憶體 */
const PREVIEW_EDGE = 360;

const AUTO_DOWNLOAD_KEY = "rinse_auto_download";

export const SOURCE_LABELS: Record<RinseSource, string> = {
  drop: "拖曳",
  paste: "貼上",
  url: "連結",
  playcard: "Playcard",
};

/** 一張已經沖洗好、手上有位元組的圖；另存為與複製只需要這些 */
export interface RinseImage {
  /** 不含副檔名的檔名 */
  name: string;
  width: number;
  height: number;
  /** 沖洗後的 PNG。PNG 無損，所以任何再輸出都自這裡重新解碼，像素與當初完全相同 */
  blob: Blob;
  /** 這份 PNG 的 object URL */
  url: string;
}

/** 首頁顯示的最新一張 */
export interface RinseLatest extends RinseImage {
  record: RinseRecord;
  /** 有沒有存進歷史 */
  saved: boolean;
}

/** 佇列中的一件工作。位元組延後到輪到它才取，一次丟十個連結才不會同時發十個請求 */
type RinseJob = {
  name: string;
  source: RinseSource;
  load: () => Promise<Blob>;
};

/** 列表縮圖只要看得清楚就好 */
function previewScale(width: number, height: number): number {
  const longest = Math.max(width, height);
  return longest > PREVIEW_EDGE ? PREVIEW_EDGE / longest : 1;
}

class RinseController {
  private tabs = getRinseTabsContext();
  private history = getRinseHistoryContext();

  /** 最新沖洗好的那一張；raw 是因為裡面有 Blob，而且只會整筆換掉 */
  latest = $state.raw<RinseLatest | null>(null);
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

  /** 待處理的工作；不是 $state，畫面看的是 pending 與 latest */
  private queue: RinseJob[] = [];
  /** 是否已經有一份處理迴圈在跑 */
  private draining = false;
  /** 這一輪處理中因為歷史已滿而沒存的張數，整輪結束時一次告知 */
  private skipped = 0;

  constructor() {
    // 無依賴，只在掛載後跑一次。放進 effect 是為了避開 SSR 與水合不一致。
    $effect(() => {
      this.autoDownload = readText(AUTO_DOWNLOAD_KEY) !== "off";
    });
  }

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
      this.reportSkipped();
    }
  }

  private reportSkipped() {
    if (this.skipped === 0) return;
    const count = this.skipped;
    this.skipped = 0;
    addToast({
      message: `歷史已滿，${count === 1 ? "這張" : `${count} 張`}沒有存進歷史；圖片本身已照常沖洗`,
      variant: "error",
    });
  }

  /** 一張圖的完整生命週期：取得位元組、解碼、重畫、存進歷史、下載 */
  private async process(job: RinseJob) {
    const blob = await job.load();

    // 型別說了不是圖片就不必再往下走；沒說的（例如某些拖曳來源）交給解碼器判斷
    if (blob.type.length > 0 && !blob.type.startsWith("image/")) {
      throw new Error(`這是 ${blob.type}，不是圖片`);
    }

    const decoded = await decodeImage(blob);
    let rinsed: Blob;
    let preview: Blob;

    try {
      rinsed = await encodeImage(decoded, { format: RINSE_FORMAT });
      preview = await encodeImage(decoded, {
        format: RINSE_FORMAT,
        scale: previewScale(decoded.width, decoded.height),
      });
    } finally {
      decoded.close();
    }

    const record: RinseRecord = {
      id: crypto.randomUUID(),
      name: job.name,
      source: job.source,
      originalType: blob.type,
      originalSize: blob.size,
      width: decoded.width,
      height: decoded.height,
      size: rinsed.size,
      previewSize: preview.size,
      createdAt: Date.now(),
    };

    // 下載先於存檔：存檔失敗不該連累已經洗好的圖
    if (this.autoDownload) downloadBlob(rinsed, `${job.name}.png`);

    const saved = await this.save(record, rinsed, preview);
    this.show({
      name: job.name,
      width: record.width,
      height: record.height,
      blob: rinsed,
      url: URL.createObjectURL(rinsed),
      record,
      saved,
    });

    // 由 Playcard 遞過來時使用者不在這個工具的畫面上，沒有別的方式知道事情成了
    if (job.source === "playcard") {
      addToast({
        message: this.autoDownload ? `已沖洗並下載 ${job.name}.png` : `已沖洗 ${job.name}，可到 Rinse 下載`,
        variant: "success",
      });
    }
  }

  /** 試著存進歷史，回傳有沒有存成；放不下或寫入失敗都不中斷沖洗 */
  private async save(record: RinseRecord, rinsed: Blob, preview: Blob): Promise<boolean> {
    await this.history.whenReady();

    if (!this.history.canFit(rinsed.size + preview.size)) {
      // 讀不到資料庫時歷史本來就不可用，那件事在歷史分頁說，不必每張都提醒一次
      if (this.history.loadError === null) this.skipped += 1;
      return false;
    }

    try {
      await this.history.handleRecord(record, rinsed, preview);
      return true;
    } catch (e) {
      addToast({ message: `${record.name} 沒有存進歷史：${formatError(e)}`, variant: "error" });
      return false;
    }
  }

  /** 換上新的最新一張，放掉上一張的 object URL */
  private show(next: RinseLatest) {
    if (this.latest !== null) URL.revokeObjectURL(this.latest.url);
    this.latest = next;
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
    // 結果只在首頁看得到，在歷史分頁投放也要切回去
    this.tabs.handleSelect("intake");

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
      this.tabs.handleSelect("intake");
      this.enqueue(files.map((file) => this.fileJob(file, "paste")));
      return;
    }

    const text = data.getData("text/plain").trim();
    if (/^https?:\/\//i.test(text)) {
      this.tabs.handleSelect("intake");
      this.enqueue([this.urlJob(text, "paste")]);
    }
  };

  /** 由其他工具直接遞來一張圖；Playcard 的縮圖走這裡，不必開第二個分頁再拖一次 */
  handleAdopt = (url: string, name: string) => {
    // 使用者之後切到 Rinse 時，看到的就是這一張
    this.tabs.handleSelect("intake");
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

  /** 切回首頁並聚焦連結欄位 */
  handleFocusInput = () => {
    this.tabs.handleSelect("intake");
    this.inputEl?.focus();
    this.inputEl?.select();
  };

  // --- 已沖洗的成果 ---

  /**
   * 以指定設定再輸出一次。
   * 來源是當初沖洗出來的 PNG，無損，所以像素與從原圖轉出的結果完全一致。
   */
  handleSave = async (image: RinseImage, options: EncodeOptions, filename?: string) => {
    const format = getFormat(options.format);

    try {
      const decoded = await decodeImage(image.blob);
      try {
        const blob = await encodeImage(decoded, options);
        downloadBlob(blob, `${baseName(filename ?? image.name)}.${format.ext}`);
      } finally {
        decoded.close();
      }
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  };

  /**
   * 複製 PNG 到剪貼簿。
   * 可以直接給一個還在讀取中的 Promise：剪貼簿會等它，使用者手勢也不會因為先 await 而失效。
   */
  handleCopy = async (blob: Blob | Promise<Blob>) => {
    try {
      await copyImage(blob);
      addToast({ message: "已複製 PNG 到剪貼簿", variant: "success" });
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
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
