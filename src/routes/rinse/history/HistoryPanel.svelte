<script lang="ts">
  import { onDestroy } from "svelte";

  import { IconAlertCircleFilled, IconCheck, IconClock, IconDownload, IconTrash } from "#lib/icons/index.ts";
  import Button from "#lib/components/actions/Button.svelte";
  import Modal from "#lib/components/floating/Modal.svelte";
  import PanelHead from "#lib/components/display/PanelHead.svelte";
  import EmptyState from "#lib/components/display/EmptyState.svelte";
  import { addToast } from "#lib/components/floating/toast-events.ts";
  import { formatBytes, formatError } from "#lib/utils/shared.ts";

  import type { RinseImage } from "../logic/rinse.svelte";
  import { getRinseHistoryContext } from "../logic/history.svelte";
  import { readBlob, type RinseRecord } from "../logic/store";
  import RinseSaveAs from "../RinseSaveAs.svelte";
  import HistoryUsage from "./HistoryUsage.svelte";
  import HistoryFilters from "./HistoryFilters.svelte";
  import HistoryWall from "./HistoryWall.svelte";

  const history = getRinseHistoryContext();

  // 對話框都是這個面板的呈現細節，不需要進 controller。
  // 關閉時只放掉 open，內容留到下次開啟才換——否則離場動畫會先播在一個空盒子上。
  let confirming = $state(false);
  /** 開啟確認框當下的數字；刪完之後勾選歸零，離場動畫裡不該跟著變成 0 */
  let confirmSummary = $state({ count: 0, bytes: 0 });
  let saving = $state(false);
  let saveTarget = $state.raw<RinseImage | null>(null);

  let downloading = $state(false);

  /** 另存為需要手上有原尺寸的 PNG，先讀出來再開對話框 */
  async function handleSaveAs(record: RinseRecord) {
    try {
      const blob = await readBlob(record.id);
      if (saveTarget !== null) URL.revokeObjectURL(saveTarget.url);
      saveTarget = {
        name: record.name,
        width: record.width,
        height: record.height,
        blob,
        url: URL.createObjectURL(blob),
      };
      saving = true;
    } catch (e) {
      addToast({ message: formatError(e), variant: "error" });
    }
  }

  async function handleDownloadSelected() {
    downloading = true;
    try {
      await history.handleDownloadSelected();
    } finally {
      downloading = false;
    }
  }

  function handleAskDelete() {
    confirmSummary = { count: history.selection.length, bytes: history.selectionBytes };
    confirming = true;
  }

  async function handleConfirmDelete() {
    confirming = false;
    await history.handleDeleteSelected();
  }

  onDestroy(() => {
    if (saveTarget !== null) URL.revokeObjectURL(saveTarget.url);
  });
</script>

<PanelHead
  eyebrow="歷史記錄"
  title="沖洗過的所有圖片"
  description="只保存沖洗後的 PNG，存在這台裝置的瀏覽器裡，不會上傳到任何伺服器。"
/>

{#if history.loadError !== null}
  <EmptyState>
    {#snippet icon()}
      <span class="error-icon"><IconAlertCircleFilled size={36} /></span>
    {/snippet}
    讀不到歷史：{history.loadError}。沖洗本身不受影響，只是不會存進來。
  </EmptyState>
{:else if history.ready}
  <div class="stack">
    <HistoryUsage />
    <HistoryFilters />

    <div class="selection">
      <button
        type="button"
        class="select-all"
        role="checkbox"
        aria-checked={history.allSelected}
        disabled={history.visible.length === 0}
        onclick={history.handleToggleAll}
      >
        <span class="box">
          {#if history.allSelected}
            <IconCheck size={11} />
          {:else if history.selection.length > 0}
            <span class="dash"></span>
          {/if}
        </span>
        全選{history.filtering ? "篩選結果" : ""}
      </button>

      <span class="stats">
        {#if history.selection.length > 0}
          已選 {history.selection.length} 張 · {formatBytes(history.selectionBytes)}
        {:else if history.filtering}
          符合條件 {history.visible.length} 張 · 共 {history.count} 張
        {:else}
          共 {history.count} 張
        {/if}
      </span>

      <div class="selection-actions">
        {#if history.selection.length > 0}
          <Button variant="ghost" onclick={history.handleClearSelection}>取消勾選</Button>
        {/if}

        <Button
          variant="outlined"
          onclick={handleDownloadSelected}
          status={downloading ? "pending" : history.selection.length === 0 ? "disabled" : "default"}
        >
          <IconDownload size={14} />
          下載
        </Button>

        <Button
          variant="destructive"
          onclick={handleAskDelete}
          status={history.selection.length === 0 ? "disabled" : "default"}
        >
          <IconTrash size={14} />
          刪除
        </Button>
      </div>
    </div>

    {#if history.visible.length > 0}
      <HistoryWall onsaveas={handleSaveAs} />
    {:else}
      <EmptyState>
        {#snippet icon()}
          <IconClock size={36} />
        {/snippet}
        {history.count === 0 ? "還沒有紀錄。沖洗過的圖片會自動存在這裡。" : "沒有符合條件的圖片。"}
      </EmptyState>
    {/if}
  </div>
{/if}

<Modal open={confirming} onclose={() => (confirming = false)} aria-label="刪除勾選的圖片">
  <div class="confirm">
    <h3>刪除 {confirmSummary.count} 張圖片？</h3>
    <p>
      會自這台裝置的歷史中刪除，騰出約 {formatBytes(confirmSummary.bytes)}，而且無法復原。已經下載到電腦裡的檔案不受影響。
    </p>
    <div class="confirm-actions">
      <Button variant="outlined" onclick={() => (confirming = false)}>取消</Button>
      <Button variant="destructive" onclick={handleConfirmDelete}>刪除</Button>
    </div>
  </div>
</Modal>

<Modal open={saving} onclose={() => (saving = false)} aria-label="另存為">
  {#if saveTarget !== null}
    <RinseSaveAs image={saveTarget} onclose={() => (saving = false)} />
  {/if}
</Modal>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .error-icon {
    color: var(--color-error);
  }

  .selection {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    padding-top: 0.25rem;
  }

  .select-all {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    height: var(--control-height);
    padding: 0 0.75rem 0 0.5rem;
    font: var(--font-button);
    border-radius: var(--radius-control);
    transition: background-color 0.15s var(--ease);

    &:hover:not(:disabled) {
      background-color: var(--color-bg-hover);
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  .box {
    display: grid;
    place-items: center;
    width: 1.0625rem;
    height: 1.0625rem;
    color: var(--color-accent-text);
    border: var(--border-style);
    border-radius: 5px;
    transition:
      background-color 0.15s var(--ease),
      border-color 0.15s var(--ease);

    .select-all[aria-checked="true"] & {
      background-color: var(--color-accent);
      border-color: var(--color-accent);
    }
  }

  .dash {
    width: 0.5rem;
    height: 2px;
    background-color: var(--color-accent);
    border-radius: 1px;
  }

  .stats {
    flex: 1;
    min-width: 10rem;
    font: var(--font-mono);
    color: var(--color-text-muted);
  }

  .selection-actions {
    display: flex;
    gap: 0.5rem;
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
