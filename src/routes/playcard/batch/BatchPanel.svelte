<script lang="ts">
  import { fly } from "svelte/transition";

  import { IconCopy, IconDownload, IconPlayerPlayFilled } from "$lib/icons";
  import Button from "$lib/components/actions/Button.svelte";
  import PanelHead from "$lib/components/display/PanelHead.svelte";
  import EmptyState from "$lib/components/display/EmptyState.svelte";
  import LinearProgress from "$lib/components/display/LinearProgress.svelte";

  import { getBatchContext } from "../logic/batch.svelte";
  import BatchRow from "./BatchRow.svelte";

  const batch = getBatchContext();

  const PLACEHOLDER = [
    "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    "https://youtu.be/dQw4w9WgXcQ",
    "https://www.youtube.com/shorts/...",
  ].join("\n");
</script>

<PanelHead
  eyebrow="批次處理"
  title="一次查詢多個影片"
  description="每行貼上一個連結。系統會同時處理最多 4 筆請求，並自動略過重複的網址。"
/>

<div class="grid">
  <div class="input-card">
    <label class="sr-only" for="batch-input">批次連結清單</label>
    <textarea
      id="batch-input"
      placeholder={PLACEHOLDER}
      value={batch.input}
      oninput={(e) => batch.handleInput(e.currentTarget.value)}
    ></textarea>

    <div class="toolbar">
      <span class="count">{batch.links.length} 個連結</span>
      <div class="toolbar-actions">
        <Button variant="ghost" onclick={batch.handleClear}>清空</Button>
        <Button variant="primary" status={batch.running ? "pending" : "default"} onclick={batch.handleRun}>
          <IconPlayerPlayFilled size={14} />
          開始查詢
        </Button>
      </div>
    </div>

    {#if batch.total > 0}
      <div class="progress" transition:fly={{ y: -6, duration: 180 }}>
        <LinearProgress value={batch.percent} color="var(--color-accent)" />
        <div class="progress-label">
          <span>{batch.completed} / {batch.total}</span>
          <span>{batch.percent}%</span>
        </div>
      </div>
    {/if}
  </div>

  {#if batch.total > 0}
    <div class="results" in:fly={{ y: 10, duration: 240, delay: 60 }}>
      <div class="results-head">
        <h3>查詢結果</h3>
        <div class="exports">
          <Button variant="outlined" onclick={batch.handleExportCsv}>
            <IconDownload size={13} />
            匯出 CSV
          </Button>
          <Button variant="outlined" onclick={batch.handleExportJson}>
            <IconDownload size={13} />
            匯出 JSON
          </Button>
          <Button variant="outlined" onclick={batch.handleCopyEmbeds}>
            <IconCopy size={13} />
            複製全部內嵌碼
          </Button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>影片</th>
            <th>頻道</th>
            <th>狀態</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody>
          {#each batch.rows as row, index (index)}
            <BatchRow {row} />
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <EmptyState>貼上多個 YouTube 連結，一次取得所有資訊卡。</EmptyState>
  {/if}
</div>

<style>
  .grid {
    display: flex;
    flex-direction: column;
    gap: 1.375rem;
    max-width: 51.25rem;
    margin: 0 auto;
  }

  .input-card {
    padding: 1.375rem;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }

  textarea {
    width: 100%;
    min-height: 9.375rem;
    padding: 0.875rem;
    font: var(--font-mono);
    background-color: var(--color-bg-subtle);
    border: var(--border-style);
    border-radius: var(--radius-control);
    resize: vertical;

    &::placeholder {
      color: var(--color-text-muted);
    }
  }

  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.625rem;
    margin-top: 0.75rem;
  }

  .toolbar-actions {
    display: flex;
    gap: 0.5rem;
  }

  .count {
    font: var(--font-mono);
    color: var(--color-text-muted);
  }

  .progress {
    margin-top: 1rem;
  }

  .progress-label {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font: var(--font-mono);
    color: var(--color-text-muted);
  }

  .results-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font: var(--font-title4);
  }

  .exports {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  table {
    width: 100%;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-collapse: separate;
    border-spacing: 0;
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  th {
    padding: 0.6875rem 0.875rem;
    font: var(--font-caption);
    font-weight: 600;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-muted);
    background-color: var(--color-bg-subtle);
    border-bottom: var(--border-style);
  }

  @media (max-width: 680px) {
    thead {
      display: none;
    }

    table,
    tbody {
      display: block;
      width: 100%;
    }
  }
</style>
