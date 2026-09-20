<script lang="ts">
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  import { IconTrash } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import Modal from "$lib/components/floating/Modal.svelte";
  import { addToast } from "$lib/components/floating/toast-events";
  import { formatBytes } from "$lib/utils/shared";

  import { getRinseContext, type RinseEntry } from "./logic/rinse.svelte";
  import RinseItem from "./RinseItem.svelte";
  import RinseSaveAs from "./RinseSaveAs.svelte";

  const rinse = getRinseContext();

  // 另存為的對話框是這個面板的呈現細節，不需要進 controller。
  // 關閉時只放掉 open，target 留到下次開啟才換——否則離場動畫會先播在一個空盒子上。
  let target = $state<RinseEntry | null>(null);
  let saving = $state(false);

  function handleSaveAs(entry: RinseEntry) {
    target = entry;
    saving = true;
  }

  function handleClear() {
    const count = rinse.entries.length;
    rinse.handleClear();
    addToast({ message: `已清空 ${count} 筆紀錄`, variant: "info" });
  }
</script>

<div class="head">
  <div class="title">
    <h3>本次沖洗</h3>
    <span class="stats">
      {rinse.entries.length} 張 · 共 {formatBytes(rinse.totalBytes)}
    </span>
  </div>

  <Button variant="ghost" onclick={handleClear}>
    <IconTrash size={14} />
    清空
  </Button>
</div>

<div class="list">
  {#each rinse.entries as entry (entry.id)}
    <div animate:flip={{ duration: 250 }} transition:fly={{ y: 8, duration: 180 }}>
      <RinseItem {entry} onsaveas={handleSaveAs} />
    </div>
  {/each}
</div>

<p class="note">
  這份清單只活在這個分頁裡，重新整理就會消失——沖好的 PNG 當下就已經存下來了，留在這裡是為了還能換個格式再存一次。
</p>

<Modal open={saving} onclose={() => (saving = false)} aria-label="另存為">
  {#if target !== null}
    <RinseSaveAs entry={target} onclose={() => (saving = false)} />
  {/if}
</Modal>

<style>
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.875rem;
  }

  .title {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.625rem;
    min-width: 0;
  }

  h3 {
    font: var(--font-title3);
  }

  .stats {
    font: var(--font-mono);
    color: var(--color-text-muted);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding: 0.75rem;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-md);
  }

  .note {
    margin-top: 0.875rem;
    font: var(--font-caption);
    line-height: 1.6;
    color: var(--color-text-muted);
    text-wrap: pretty;
  }
</style>
