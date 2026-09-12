/**
 * @file shortcuts.svelte.ts
 * 管理鍵盤快速鍵說明對話框的開闔
 */

import { getContext, setContext } from "svelte";

class ShortcutsController {
  open = $state(false);

  handleOpen = () => {
    this.open = true;
  };

  handleClose = () => {
    this.open = false;
  };
}

const key = Symbol("shortcuts-controller");

export const createShortcutsContext = () => {
  const controller = new ShortcutsController();
  setContext(key, controller);
  return controller;
};

export const getShortcutsContext = () => getContext<ShortcutsController>(key);
