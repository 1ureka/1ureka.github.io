<script lang="ts">
  import Modal from "$lib/components/floating/Modal.svelte";
  import Button from "$lib/components/actions/Button.svelte";
  import { getShortcutsContext } from "../logic/shortcuts.svelte";

  const shortcuts = getShortcutsContext();

  const rows = [
    { label: "跳到查詢欄位", keys: "Ctrl / ⌘ K" },
    { label: "查詢目前網址", keys: "Enter" },
    { label: "開始批次查詢", keys: "Ctrl / ⌘ Enter" },
    { label: "切換分頁", keys: "1 / 2 / 3" },
    { label: "切換工具", keys: "Ctrl / ⌘ /" },
    { label: "顯示這個視窗", keys: "?" },
    { label: "關閉視窗", keys: "Esc" },
  ];
</script>

<Modal open={shortcuts.open} onclose={shortcuts.handleClose} aria-label="鍵盤快速鍵">
  <div class="body">
    <h2>鍵盤快速鍵</h2>

    <dl>
      {#each rows as row (row.label)}
        <div class="row">
          <dt>{row.label}</dt>
          <dd><kbd>{row.keys}</kbd></dd>
        </div>
      {/each}
    </dl>

    <div class="footer">
      <Button variant="outlined" onclick={shortcuts.handleClose}>關閉</Button>
    </div>
  </div>
</Modal>

<style>
  .body {
    width: 26rem;
    max-width: 100%;
    padding: 1.625rem;
  }

  h2 {
    font: var(--font-title3);
    margin-bottom: 1rem;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5625rem 0;
    font: var(--font-body2);
  }

  kbd {
    /* font: var(--font-kbd);
    padding: 0.15em 0.45em;
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-color: var(--color-border);
    border-bottom-width: 2px;
    border-radius: var(--radius-sm); */

    font: var(--font-kbd);
    background-color: var(--color-bg-card);
    border: var(--border-style);
    /* border-radius: calc(var(--border-radius) * 0.75); */
    border-radius: var(--radius-sm);
    padding: 0.1em 0.4em;
    box-shadow: 0 2.5px 0 var(--color-border);
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.125rem;
  }
</style>
