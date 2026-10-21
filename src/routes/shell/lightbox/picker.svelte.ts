/**
 * @file picker.svelte.ts
 * Lightbox 的取色：從待命、取色中到取色完成的狀態機，以及對圖片像素的取樣。
 *
 * 只屬於 Lightbox——它要知道圖片在畫面上的位置與原始解析度，
 * 也要決定 Esc、點背景時先退回哪一步，這些都不是一個通用取色器該知道的事。
 */

import type { Attachment } from "svelte/attachments";
import type { VirtualElement } from "@floating-ui/dom";
import { rgbToHsl, formatColor, formatHex, hslToRgb } from "#lib/utils/color.ts";
import type { Rgb, Hsl, ColorFormat } from "#lib/utils/color.ts";

/** 放大鏡一邊的像素數；取奇數，取樣點才會正好落在中心格 */
export const LOUPE_GRID = 11;

/** 觸發按鈕、放大鏡與結果面板共用的 crossfade key，三者之間的切換都是同一個東西在變形 */
export const PICKER_KEY = "lightbox-picker";

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

type PickerOptions = {
  /** 目前檢視中的圖片網址，`undefined` 表示 Lightbox 未開啟 */
  src: string | undefined;
};

/**
 * 取色的互動邏輯
 */
export class Picker {
  /** 待命／取色中／已取色 */
  mode = $state<"idle" | "picking" | "picked">("idle");
  /** 取樣用的圖片副本是否可讀；跨來源且未開放 CORS 的圖會是 `unavailable` */
  source = $state<"loading" | "ready" | "unavailable">("loading");
  /** 取色中時游標是否落在圖片上（決定放大鏡是否出現） */
  hovering = $state(false);
  /** 取樣點，原圖的像素座標 */
  px = $state(0);
  py = $state(0);
  /** 取樣點當下的顏色 */
  live = $state<Rgb>({ r: 0, g: 0, b: 0 });
  /** 點下去那一刻取到的顏色 */
  original = $state<Rgb>({ r: 0, g: 0, b: 0 });
  /** 調整後的顏色；以 HSL 保存，灰階時色相才不會在來回換算中遺失 */
  adjusted = $state<Hsl>({ h: 0, s: 0, l: 0 });
  /** 輸出格式 */
  format = $state<ColorFormat>("hex");

  /** 調整後顏色的 hex，給色塊與 CSS 背景用 */
  adjustedHex = $derived(formatHex(hslToRgb(this.adjusted)));
  /** 依目前格式輸出的文字，也就是複製出去的內容 */
  text = $derived(formatColor(this.adjusted, this.format));

  /** 取樣用的圖片副本（以 CORS 模式另外載入，畫面上那張不動） */
  #source: HTMLImageElement | undefined;
  /** 1×1 的取樣畫布 */
  #sampler: OffscreenCanvasRenderingContext2D | null = null;
  #clientX = 0;
  #clientY = 0;

  /**
   * 跟著游標走的虛擬參照點。物件本身從不替換——Popover 的 autoUpdate 每一幀都會重讀
   * 它的位置，有變就重算並交給 Spring，所以放大鏡的追隨方式和 tooltip 完全一樣。
   */
  pointer: VirtualElement = {
    getBoundingClientRect: () => new DOMRect(this.#clientX, this.#clientY, 0, 0),
  };

  constructor(private options: PickerOptions) {
    // 換圖或關閉時回到待命，並為新圖準備一份可讀像素的副本
    $effect(() => {
      const { src } = this.options;
      this.mode = "idle";
      this.hovering = false;
      if (!src) return;

      // 畫面上的 <img> 不帶 crossorigin，否則沒開 CORS 的圖連顯示都會失敗；
      // 副本則一定要帶，否則畫進 canvas 就被汙染、讀不出像素
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;

      let stale = false;
      this.source = "loading";
      img.decode().then(
        () => {
          if (stale) return;
          this.#source = img;
          this.source = "ready";
        },
        () => {
          if (!stale) this.source = "unavailable";
        },
      );

      return () => {
        stale = true;
        this.#source = undefined;
      };
    });
  }

  // ---

  get #active() {
    return this.mode === "picking" && this.source === "ready";
  }

  /** 把游標位置換算成原圖像素並取樣；游標會被夾在圖片範圍內，拖出圖片時放大鏡停在邊緣 */
  #track(e: PointerEvent, img: HTMLImageElement) {
    const source = this.#source;
    if (!source) return;

    const rect = img.getBoundingClientRect();
    this.#clientX = clamp(e.clientX, rect.left, rect.right);
    this.#clientY = clamp(e.clientY, rect.top, rect.bottom);

    const { naturalWidth: w, naturalHeight: h } = source;
    this.px = clamp(Math.floor(((this.#clientX - rect.left) / rect.width) * w), 0, w - 1);
    this.py = clamp(Math.floor(((this.#clientY - rect.top) / rect.height) * h), 0, h - 1);
    this.live = this.#sample(source, this.px, this.py);
    this.hovering = true;
  }

  #sample(source: HTMLImageElement, x: number, y: number): Rgb {
    this.#sampler ??= new OffscreenCanvas(1, 1).getContext("2d", { willReadFrequently: true });
    const ctx = this.#sampler;
    if (!ctx) return this.live;

    ctx.clearRect(0, 0, 1, 1);
    ctx.drawImage(source, x, y, 1, 1, 0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b };
  }

  #pick() {
    this.original = this.live;
    this.adjusted = rgbToHsl(this.live);
    this.mode = "picked";
    this.hovering = false;
  }

  // ---

  /** 掛在畫面上的 <img>：取色中時，滑鼠移動即預覽、按下放開即取色；觸控則是按住拖曳、放開取色 */
  target: Attachment<HTMLImageElement> = (img) => {
    const handleMove = (e: PointerEvent) => {
      if (this.#active) this.#track(e, img);
    };

    const handleDown = (e: PointerEvent) => {
      if (!this.#active || e.button !== 0) return;
      // 捕捉指標：拖出圖片甚至拖出視窗都持續收到事件，不必掛 window 監聽
      img.setPointerCapture(e.pointerId);
      this.#track(e, img);
    };

    const handleUp = (e: PointerEvent) => {
      if (!this.#active || !img.hasPointerCapture(e.pointerId)) return;
      this.#track(e, img);
      this.#pick();
    };

    const handleLeave = () => {
      this.hovering = false;
    };

    img.addEventListener("pointermove", handleMove);
    img.addEventListener("pointerdown", handleDown);
    img.addEventListener("pointerup", handleUp);
    img.addEventListener("pointerleave", handleLeave);
    img.addEventListener("pointercancel", handleLeave);

    return () => {
      img.removeEventListener("pointermove", handleMove);
      img.removeEventListener("pointerdown", handleDown);
      img.removeEventListener("pointerup", handleUp);
      img.removeEventListener("pointerleave", handleLeave);
      img.removeEventListener("pointercancel", handleLeave);
    };
  };

  /** 掛在放大鏡的 canvas：取樣點一變就把周圍 LOUPE_GRID² 個像素原樣畫上去，放大交給 CSS */
  loupe: Attachment<HTMLCanvasElement> = (canvas) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const half = (LOUPE_GRID - 1) / 2;

    $effect(() => {
      const { px, py } = this;
      ctx.clearRect(0, 0, LOUPE_GRID, LOUPE_GRID);
      // 取樣框超出原圖時，drawImage 會等比裁掉超出的部分，邊緣之外就留空
      if (this.#source) ctx.drawImage(this.#source, px - half, py - half, LOUPE_GRID, LOUPE_GRID, 0, 0, LOUPE_GRID, LOUPE_GRID);
    });
  };

  // ---

  handleToggle = () => {
    this.mode = this.mode === "picking" ? "idle" : "picking";
    this.hovering = false;
  };

  handleRepick = () => {
    this.mode = "picking";
  };

  handleDismiss = () => {
    this.mode = "idle";
  };

  handleRestore = () => {
    this.adjusted = rgbToHsl(this.original);
  };

  /**
   * Esc 與點背景先交給取色退一步；回傳 `true` 表示這次已被取色消化，Lightbox 不必關閉
   */
  handleBack = (): boolean => {
    if (this.mode === "idle") return false;
    this.mode = "idle";
    this.hovering = false;
    return true;
  };
}
