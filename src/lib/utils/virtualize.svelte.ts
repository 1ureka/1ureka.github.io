/**
 * @file virtualize.svelte.ts
 * 跟著整頁捲動的瀑布流虛擬化。
 *
 * 這個網站沒有內部捲動容器，捲的是整個視窗，所以可視範圍由內容容器在視窗中的位置推得。
 * 計算本身在 `virtualize.core.ts`，這裡只負責「什麼時候要重算」。
 *
 * - `contentEl` 是容納所有可見項目的容器，項目以絕對定位擺在裡面
 * - `contentEl` 不得帶 padding 與 border，它的內容寬度就是佈局寬度
 * - 有間距時，`contentEl` 四周要以 `-gap / 2` 的 margin 往外推，項目的外緣才會貼齊版面
 */

import type { ItemWithSize, VirtualizeItem, VirtualizeView } from "./virtualize.core";
import { createVirtualizeContent, createVirtualizeLayout } from "./virtualize.core";

type MasonryOptions<T extends ItemWithSize> = {
  /** 原始的項目列表 */
  get items(): T[];
  /** 欄數 */
  get columns(): number;
  /** 項目之間的間距 */
  get gap(): number | undefined;
  /** 可視範圍上下各多算的像素 */
  get overscan(): number | undefined;
};

export class Virtualizer<T extends ItemWithSize> {
  /** 內容容器的 DOM 元素 */
  contentEl = $state<HTMLElement | null>(null);

  /** 需要重新量測時的 `make(chan struct{})`；捲動與尺寸變化只負責把它換掉 */
  #dirtyCh = $state([]);

  /** 可見的項目 */
  visibleItems: VirtualizeItem<T>[];
  /** 內容的總高度，呼叫端要把它設給 `contentEl`，頁面才捲得到底 */
  contentHeight: number;

  private constructor(options: MasonryOptions<T>) {
    const layout = $derived(createVirtualizeLayout({ items: options.items, columns: options.columns }));

    const content = $derived.by(() => {
      const el = this.contentEl;
      if (el === null) return { visibleItems: [], contentHeight: 0 };
      this.#dirtyCh; // _ = <-dirtyCh

      // 容器頂端在視窗中的位置取負號，就是「視窗頂端落在容器的哪裡」
      const view: VirtualizeView = {
        top: -el.getBoundingClientRect().top,
        height: window.innerHeight,
        width: el.clientWidth,
      };

      return createVirtualizeContent({ layout, view, gap: options.gap, overscan: options.overscan });
    });

    this.visibleItems = $derived(content.visibleItems);
    this.contentHeight = $derived(content.contentHeight);

    $effect(() => {
      const el = this.contentEl;
      if (el === null) return;

      const markDirty = () => (this.#dirtyCh = []); // dirtyCh <- []

      // 容器自己的寬度決定欄寬；body 的尺寸變化則涵蓋「容器上方的東西長高了，容器被往下推」
      const resizeObserver = new ResizeObserver(markDirty);
      resizeObserver.observe(el);
      resizeObserver.observe(document.body);

      window.addEventListener("scroll", markDirty, { passive: true });
      window.addEventListener("resize", markDirty, { passive: true });

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("scroll", markDirty);
        window.removeEventListener("resize", markDirty);
      };
    });
  }

  /** 等比例縮放瀑布流：項目依寬高比分配，欄寬變動時等比例縮放 */
  static masonry<T extends ItemWithSize>(options: MasonryOptions<T>): Virtualizer<T> {
    return new Virtualizer<T>(options);
  }
}
