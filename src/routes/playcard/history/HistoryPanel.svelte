<script lang="ts">
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  import { IconClock, IconDownload, IconSearch, IconTrash } from "#lib/icons";
  import Button from "#lib/components/actions/Button.svelte";
  import TextInput from "#lib/components/inputs/TextInput.svelte";
  import Select from "#lib/components/inputs/Select.svelte";
  import Modal from "#lib/components/floating/Modal.svelte";
  import PanelHead from "#lib/components/display/PanelHead.svelte";
  import EmptyState from "#lib/components/display/EmptyState.svelte";
  import { addToast } from "#lib/components/floating/toast-events.ts";

  import { getHistoryContext, type HistorySort } from "../logic/history.svelte";
  import HistoryItem from "./HistoryItem.svelte";

  const history = getHistoryContext();

  const SORTS: Record<HistorySort, string> = {
    newest: "最新優先",
    oldest: "最舊優先",
    starred: "已加星號優先",
  };

  const SORT_KEYS = Object.keys(SORTS);

  // 確認框純粹是這個面板的呈現細節，不需要進 controller
  let confirming = $state(false);

  function handleExport() {
    if (history.handleExport()) addToast({ message: "已匯出歷史記錄", variant: "success" });
    else addToast({ message: "目前沒有紀錄可以匯出", variant: "error" });
  }

  function handleConfirmClear() {
    history.handleClear();
    confirming = false;
    addToast({ message: "已清除全部紀錄", variant: "success" });
  }
</script>

<PanelHead
  eyebrow="歷史記錄"
  title="你查過的所有影片"
  description="紀錄只會儲存在這台裝置的瀏覽器中，不會上傳到任何伺服器。"
/>

<div class="panel">
  <div class="toolbar">
    <!-- 版面（撐滿剩餘寬度）只能交給元件的 root，scoped 樣式跨不過元件邊界 -->
    <TextInput
      label="搜尋紀錄"
      labelHidden
      placeholder="搜尋標題或頻道…"
      value={history.search}
      oninput={(e) => history.handleSearch(e.currentTarget.value)}
      rootProps={{ style: "flex: 1; min-width: 12rem;" }}
    >
      {#snippet adornmentLeft()}
        <span class="adornment"><IconSearch size={16} /></span>
      {/snippet}
    </TextInput>

    <label class="sr-only" for="history-sort">排序方式</label>
    <Select
      id="history-sort"
      value={history.sort}
      options={SORT_KEYS}
      matchWidth={false}
      onchange={history.handleSortChange}
    >
      {#snippet option(key: string)}
        {SORTS[key as HistorySort]}
      {/snippet}
    </Select>

    <Button variant="ghost" onclick={handleExport}>
      <IconDownload size={14} />
      匯出
    </Button>

    <Button variant="ghost" onclick={() => (confirming = true)} status={history.total === 0 ? "disabled" : "default"}>
      <IconTrash size={14} />
      清除全部
    </Button>
  </div>

  <p class="stats">共 {history.total} 筆紀錄 · {history.channelCount} 個不同頻道</p>

  {#if history.visible.length > 0}
    <div class="list">
      {#each history.visible as entry (entry.videoId)}
        <div animate:flip={{ duration: 250 }} transition:fly={{ y: 8, duration: 180 }}>
          <HistoryItem {entry} />
        </div>
      {/each}
    </div>
  {:else}
    <EmptyState>
      {#snippet icon()}
        <IconClock size={36} />
      {/snippet}
      {history.total === 0 ? "還沒有紀錄。查詢過的影片會自動顯示在這裡。" : "沒有符合搜尋條件的紀錄。"}
    </EmptyState>
  {/if}
</div>

<Modal open={confirming} onclose={() => (confirming = false)} aria-label="清除全部紀錄">
  <div class="confirm">
    <h3>清除全部歷史記錄？</h3>
    <p>這會刪除本機保存的 {history.total} 筆紀錄，包含已加星號的項目，而且無法復原。</p>
    <div class="confirm-actions">
      <Button variant="outlined" onclick={() => (confirming = false)}>取消</Button>
      <Button variant="destructive" onclick={handleConfirmClear}>清除全部</Button>
    </div>
  </div>
</Modal>

<style>
  .panel {
    max-width: 51.25rem;
    margin: 0 auto;
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.125rem;
  }

  .adornment {
    display: flex;
    align-items: center;
    padding-left: 0.65rem;
    color: var(--color-text-muted);
  }

  .stats {
    margin-bottom: 0.875rem;
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

  .confirm {
    width: 24rem;
    max-width: 100%;
    padding: 1.625rem;
  }

  .confirm h3 {
    margin-bottom: 0.625rem;
    font: var(--font-title3);
  }

  .confirm p {
    font: var(--font-body2);
    color: var(--color-text-muted);
  }

  .confirm-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
</style>
