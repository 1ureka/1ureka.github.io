/**
 * @file tabs.svelte.ts
 * 管理 Rinse 目前顯示哪一個分頁
 */

import { getContext, setContext } from "svelte";

export type RinseTab = "intake" | "history";

/** 分頁順序，同時是 1 / 2 快速鍵的對應順序 */
export const TAB_ORDER: RinseTab[] = ["intake", "history"];

class RinseTabsController {
  /** 目前的分頁 */
  current = $state<RinseTab>("intake");

  /** 上一次切換的方向（1 往後、-1 往前），切換動畫靠它決定內容往哪一側進出 */
  direction = $state(1);

  /** 切換到指定分頁 */
  handleSelect = (tab: RinseTab) => {
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

const key = Symbol("rinse-tabs-controller");

export const createRinseTabsContext = () => {
  const controller = new RinseTabsController();
  setContext(key, controller);
  return controller;
};

export const getRinseTabsContext = () => getContext<RinseTabsController>(key);
