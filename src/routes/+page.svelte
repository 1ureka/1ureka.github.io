<script lang="ts">
  import { fly } from "svelte/transition";

  import { readDropPayload } from "$lib/utils/dnd";

  import { createThemeContext } from "./logic/theme.svelte";
  import { createToolContext } from "./logic/tool.svelte";
  import { createDropzoneContext } from "./logic/dropzone.svelte";
  import { createShortcutsContext } from "./logic/shortcuts.svelte";
  import { createLightboxContext } from "./logic/lightbox.svelte";

  import { createTabsContext } from "./playcard/logic/tabs.svelte";
  import { createHistoryContext } from "./playcard/logic/history.svelte";
  import { createEmbedContext } from "./playcard/logic/embed.svelte";
  import { createLookupContext } from "./playcard/logic/lookup.svelte";
  import { createBatchContext } from "./playcard/logic/batch.svelte";

  import { createSanitizeContext } from "./sanitizer/logic/sanitize.svelte";

  import Header from "./shell/Header.svelte";
  import DropOverlay from "./shell/DropOverlay.svelte";
  import ShortcutsModal from "./shell/ShortcutsModal.svelte";
  import Lightbox from "./shell/Lightbox.svelte";
  import Playcard from "./playcard/Playcard.svelte";
  import Sanitizer from "./sanitizer/Sanitizer.svelte";

  // 殼層：彼此獨立，順序只是閱讀上的分組
  createThemeContext();
  const tool = createToolContext();
  const dropzone = createDropzoneContext();
  const shortcuts = createShortcutsContext();
  createLightboxContext();

  // Playcard
  const tabs = createTabsContext();
  createHistoryContext();
  createEmbedContext();
  const lookup = createLookupContext();
  const batch = createBatchContext();

  // Sanitizer
  const sanitizer = createSanitizeContext();

  /** 使用者正在輸入時，單鍵快速鍵必須讓路 */
  function isTyping(): boolean {
    const tag = document.activeElement?.tagName;
    return tag === "INPUT" || tag === "TEXTAREA";
  }

  function handleKeydown(event: KeyboardEvent) {
    const mod = event.metaKey || event.ctrlKey;

    if (mod && event.key.toLowerCase() === "k") {
      event.preventDefault();
      lookup.handleFocusInput();
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
    if (tool.current === "sanitizer") sanitizer.handleDrop(payload);
  }
</script>

<svelte:head>
  <title>Playcard</title>
  <meta
    name="description"
    content="貼上 YouTube 連結，透過官方 oEmbed 服務讀取標題、頻道、縮圖與內嵌程式碼。支援快速查詢、批次處理與歷史記錄，免安裝、免金鑰。"
  />
</svelte:head>

<svelte:window
  onkeydown={handleKeydown}
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
          <Sanitizer />
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
