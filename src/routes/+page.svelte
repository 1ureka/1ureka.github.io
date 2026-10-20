<script lang="ts">
  import { fly } from "svelte/transition";

  import { readDropPayload } from "#lib/utils/dnd.ts";

  import { createThemeContext } from "./logic/theme.svelte";
  import { createToolContext } from "./logic/tool.svelte";
  import { createDropzoneContext } from "./logic/dropzone.svelte";
  import { createShortcutsContext } from "./logic/shortcuts.svelte";
  import { createLightboxContext } from "./logic/lightbox.svelte";

  import { createRinseTabsContext } from "./rinse/logic/tabs.svelte";
  import { createRinseHistoryContext } from "./rinse/logic/history.svelte";
  import { createRinseContext } from "./rinse/logic/rinse.svelte";

  import { createTabsContext } from "./playcard/logic/tabs.svelte";
  import { createHistoryContext } from "./playcard/logic/history.svelte";
  import { createEmbedContext } from "./playcard/logic/embed.svelte";
  import { createLookupContext } from "./playcard/logic/lookup.svelte";
  import { createBatchContext } from "./playcard/logic/batch.svelte";

  import Header from "./shell/Header.svelte";
  import DropOverlay from "./shell/DropOverlay.svelte";
  import ShortcutsModal from "./shell/ShortcutsModal.svelte";
  import Lightbox from "./shell/lightbox/Lightbox.svelte";
  import { TOOLS } from "./shell/config";
  import Playcard from "./playcard/Playcard.svelte";
  import Rinse from "./rinse/Rinse.svelte";

  // 殼層：彼此獨立，順序只是閱讀上的分組
  createThemeContext();
  const tool = createToolContext();
  const dropzone = createDropzoneContext();
  const shortcuts = createShortcutsContext();
  createLightboxContext();

  // Rinse 排在 Playcard 前面是因為方向：Playcard 的縮圖可以直接遞給 Rinse 沖洗，反過來沒有
  const rinseTabs = createRinseTabsContext();
  createRinseHistoryContext();
  const rinse = createRinseContext();

  // Playcard
  const tabs = createTabsContext();
  createHistoryContext();
  createEmbedContext();
  const lookup = createLookupContext();
  const batch = createBatchContext();

  /** 使用者正在輸入時，單鍵快速鍵必須讓路 */
  function isTyping(): boolean {
    const tag = document.activeElement?.tagName;
    return tag === "INPUT" || tag === "TEXTAREA";
  }

  function handleKeydown(event: KeyboardEvent) {
    const mod = event.metaKey || event.ctrlKey;

    if (mod && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (tool.current === "playcard") lookup.handleFocusInput();
      else rinse.handleFocusInput();
      return;
    }

    if (mod && event.key === "/") {
      event.preventDefault();
      tool.handleSwitch();
      return;
    }

    if (mod && event.key === "Enter" && document.activeElement?.tagName === "TEXTAREA") {
      event.preventDefault();
      void batch.handleRun();
      return;
    }

    if (isTyping()) return;

    if (event.key === "?") {
      event.preventDefault();
      shortcuts.handleOpen();
      return;
    }

    if (tool.current === "playcard" && ["1", "2", "3"].includes(event.key)) {
      event.preventDefault();
      tabs.handleSelectAt(Number(event.key));
      return;
    }

    if (tool.current === "rinse" && ["1", "2"].includes(event.key)) {
      event.preventDefault();
      rinseTabs.handleSelectAt(Number(event.key));
    }
  }

  /**
   * 投放一律交給目前的工具，不會為了內容而自動換工具；
   * 收到的東西能不能用，是接手的那個工具自己的判斷。
   */
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dropzone.handleDrop();

    const payload = readDropPayload(event.dataTransfer);
    if (tool.current === "playcard") lookup.handleDrop(payload);
    if (tool.current === "rinse") rinse.handleDrop(payload);
  }

  /**
   * 貼上與投放是同一件事的兩種手勢，所以也走同一條分派。
   * 差別在於貼上會撞到輸入框：貼文字進欄位是在填欄位，只有圖片檔才越過焦點直接交給工具。
   */
  function handlePaste(event: ClipboardEvent) {
    if (tool.current !== "rinse") return;

    const data = event.clipboardData;
    if (data === null) return;

    const hasImage = [...data.files].some((file) => file.type.startsWith("image/"));
    if (!hasImage && isTyping()) return;

    rinse.handlePaste(data);
  }
</script>

<svelte:head>
  <title>{TOOLS[tool.current].name}</title>
  <meta
    name="description"
    content="兩個不用安裝、不用金鑰的小工具。Playcard 透過官方 oEmbed 把 YouTube 連結變成資訊卡；Rinse 把任何來源的圖片重新畫成一張只含像素的 PNG。"
  />
</svelte:head>

<svelte:window
  onkeydown={handleKeydown}
  onpaste={handlePaste}
  ondragenter={dropzone.handleDragEnter}
  ondragover={dropzone.handleDragOver}
  ondragleave={dropzone.handleDragLeave}
  ondrop={handleDrop}
/>

<a class="sr-only" href="#main">跳到主要內容</a>

<div class="layout">
  <Header />

  <main id="main">
    {#key tool.current}
      <div in:fly={{ y: 14, duration: 300, delay: 90 }} out:fly={{ y: -14, duration: 180 }}>
        {#if tool.current === "playcard"}
          <Playcard />
        {:else}
          <Rinse />
        {/if}
      </div>
    {/key}
  </main>
</div>

<DropOverlay />
<ShortcutsModal />
<Lightbox />

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
  }

  main {
    display: grid;
    grid-template-areas: "stack";
    justify-items: center;
    flex: 1;
  }

  main > div {
    grid-area: stack;
    width: 100%;
    max-width: var(--wrap-max);
    padding: 0 1.5rem;
    display: grid;
    grid-template-rows: auto 1fr;
  }
</style>
