/**
 * @file tabs.svelte.ts
 * 管理 Playcard 目前顯示哪一個分頁
 */

import { getContext, setContext } from "svelte";

export type PlaycardTab = "quick" | "batch" | "history";

/** 分頁順序，同時是 1 / 2 / 3 快速鍵的對應順序 */
export const TAB_ORDER: PlaycardTab[] = ["quick", "batch", "history"];

class TabsController {
  /** 目前的分頁 */
  current = $state<PlaycardTab>("quick");

  /**
   * 上一次切換的方向（1 往後、-1 往前）。
   * 切換動畫要靠它決定內容該往哪一側進出，否則來回切看起來會是同一個動作。
   */
  direction = $state(1);

  /** 切換到指定分頁 */
  handleSelect = (tab: PlaycardTab) => {
    if (tab === this.current) return;
    this.direction = TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(this.current) ? 1 : -1;
    this.current = tab;
  };

  /** 依序號（1-based）切換分頁，超出範圍時忽略 */
  handleSelectAt = (position: number) => {
    const tab = TAB_ORDER[position - 1];
    if (tab !== undefined) this.handleSelect(tab);
  };
}

const key = Symbol("playcard-tabs-controller");

export const createTabsContext = () => {
  const controller = new TabsController();
  setContext(key, controller);
  return controller;
};

export const getTabsContext = () => getContext<TabsController>(key);
