/**
 * @file theme.svelte.ts
 * 管理淺色／深色主題
 */

import { getContext, setContext } from "svelte";
import { writeText } from "$lib/utils/storage";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

class ThemeController {
  /**
   * 目前主題。首次繪製前已由 `app.html` 的 inline script 寫進 `data-theme`，
   * 這裡只是把那個既成事實接回響應式狀態，不重新決定一次。
   */
  current = $state<Theme>("light");

  constructor() {
    $effect(() => {
      this.current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    });
  }

  handleToggle = () => {
    const next: Theme = this.current === "dark" ? "light" : "dark";
    this.current = next;
    document.documentElement.dataset.theme = next;
    writeText(STORAGE_KEY, next);
  };
}

const key = Symbol("theme-controller");

export const createThemeContext = () => {
  const controller = new ThemeController();
  setContext(key, controller);
  return controller;
};

export const getThemeContext = () => getContext<ThemeController>(key);
