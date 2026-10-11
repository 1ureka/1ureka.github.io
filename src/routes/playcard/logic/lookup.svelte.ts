/**
 * @file lookup.svelte.ts
 * 管理快速查詢：一次查詢自輸入到結果的完整生命週期
 */

import { getContext, setContext, untrack } from "svelte";
import { lookup, type VideoCard } from "#lib/oembed";
import { formatError } from "#lib/utils/shared.ts";
import type { DropPayload } from "#lib/utils/dnd.ts";

import { getTabsContext } from "./tabs.svelte";
import { getHistoryContext } from "./history.svelte";
import { getEmbedContext } from "./embed.svelte";

/** 沒有連結可試時的範例池 */
export const EXAMPLES = [
  "https://www.youtube.com/watch?v=jNQXAC9IVRw",
  "https://www.youtube.com/watch?v=9bZkp7q19f0",
  "https://www.youtube.com/watch?v=hFZFjoX2cGg",
  "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
];

class LookupController {
  private tabs = getTabsContext();
  private history = getHistoryContext();
  private embed = getEmbedContext();

  /** 查詢欄位目前的值 */
  input = $state("");
  /** 是否有一次查詢正在進行中 */
  pending = $state(false);
  /** 上一次查詢的錯誤訊息 */
  error = $state<string | null>(null);
  /** 目前的查詢結果 */
  result = $state<VideoCard | null>(null);

  /** 查詢欄位的 DOM 參照，由欄位元件掛上，供快速鍵直接聚焦 */
  inputEl = $state<HTMLInputElement | undefined>();

  /** 在途查詢的流水號，較早送出、已過時的回應靠它作廢 */
  private seq = 0;

  constructor() {
    // 尺寸改變時以新尺寸重取目前這部影片；同一部影片的每個尺寸各有快取，切回去不會再發請求。
    $effect(() => {
      this.embed.dims;
      const url = untrack(() => this.result?.url);
      if (url === undefined) return;
      untrack(() => void this.run(url));
    });
  }

  /** 送出一次查詢 */
  private async run(raw: string) {
    const value = raw.trim();
    if (value.length === 0) {
      this.error = "請先貼上一個 YouTube 影片連結";
      return;
    }

    const seq = ++this.seq;
    this.pending = true;
    this.error = null;

    try {
      const { width, height } = this.embed.dims;
      const card = await lookup(value, { maxwidth: width, maxheight: height });
      if (seq !== this.seq) return; // 已有更新的查詢送出，這次的結果作廢

      this.result = card;
      this.history.handleRecord(card);
    } catch (e) {
      if (seq !== this.seq) return;
      this.error = formatError(e);
      this.result = null;
    } finally {
      if (seq === this.seq) this.pending = false;
    }
  }

  handleInput = (value: string) => {
    this.input = value;
  };

  /** 查詢欄位目前的內容 */
  handleSubmit = () => {
    void this.run(this.input);
  };

  /**
   * 以外部來源給定的連結查詢：範例、歷史紀錄、全域投放都走這裡。
   * 一併切回快速查詢分頁，因為結果只在那裡看得到。
   */
  handleUse = (rawInput: string) => {
    this.tabs.handleSelect("quick");
    this.input = rawInput;
    void this.run(rawInput);
  };

  /**
   * 接手一次全域投放。
   * 殼層只負責把內容送到目前的工具，能不能用是這裡自己的判斷。
   */
  handleDrop = (payload: DropPayload) => {
    if (payload.text === null) {
      this.tabs.handleSelect("quick");
      this.error = "這次投放沒有帶進任何連結或文字，Playcard 只能處理 YouTube 連結";
      return;
    }
    this.handleUse(payload.text);
  };

  /** 隨機挑一個範例來查 */
  handleUseRandom = () => {
    this.handleUse(EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]);
  };

  /** 貼上即查詢，省掉再按一次的步驟 */
  handlePaste = () => {
    // paste 的預設行為與隨後的 input 事件都排在這個處理函式之後，
    // 微任務可能還早於它們，必須等到下一個巨集任務才讀得到新值
    setTimeout(() => {
      if (this.input.trim().length > 0) void this.run(this.input);
    }, 0);
  };

  /** 切回快速查詢並聚焦查詢欄位 */
  handleFocusInput = () => {
    this.tabs.handleSelect("quick");
    this.inputEl?.focus();
    this.inputEl?.select();
  };

  /** 切換目前結果的星號 */
  handleToggleStar = () => {
    if (this.result === null) return;
    this.history.handleToggleStar(this.result.videoId);
  };
}

const key = Symbol("playcard-lookup-controller");

export const createLookupContext = () => {
  const controller = new LookupController();
  setContext(key, controller);
  return controller;
};

export const getLookupContext = () => getContext<LookupController>(key);
