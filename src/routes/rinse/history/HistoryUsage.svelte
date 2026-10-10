<script lang="ts">
  import LinearProgress from "$lib/components/display/LinearProgress.svelte";
  import { formatBytes } from "$lib/utils/shared";

  import { getRinseHistoryContext, MAX_BYTES, MAX_RECORDS } from "../logic/history.svelte";

  const history = getRinseHistoryContext();

  const meters = $derived([
    {
      label: "張數",
      value: `${history.count} / ${MAX_RECORDS}`,
      ratio: history.count / MAX_RECORDS,
    },
    {
      label: "容量",
      value: `${formatBytes(history.totalBytes)} / ${formatBytes(MAX_BYTES)}`,
      ratio: history.totalBytes / MAX_BYTES,
    },
  ]);
</script>

<div class="usage" class:full={history.full}>
  <div class="meters">
    {#each meters as meter (meter.label)}
      {@const percent = Math.min(100, meter.ratio * 100)}
      <div class="meter">
        <div class="row">
          <span class="label">{meter.label}</span>
          <span class="value">{meter.value}</span>
        </div>
        <!-- 到了上限才轉成警示色；接近上限之前都只是資訊 -->
        <LinearProgress
          value={percent}
          color={meter.ratio >= 1 ? "var(--color-error)" : "var(--color-accent)"}
          aria-label={meter.label}
        />
      </div>
    {/each}
  </div>

  {#if history.full}
    <p class="warning">歷史已滿。之後沖洗的圖片照樣會處理與下載，但不會存進來；勾選不需要的圖片刪掉就能騰出空間。</p>
  {/if}
</div>

<style>
  .usage {
    padding: 1rem 1.25rem;
    background-color: var(--color-bg-card);
    border: var(--border-style);
    border-radius: var(--radius-md);
    transition: border-color 0.2s var(--ease);

    &.full {
      border-color: var(--color-error);
    }
  }

  .meters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .meter {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .label {
    font: var(--font-title4);
  }

  .value {
    font: var(--font-kbd);
    color: var(--color-text-muted);
  }

  .warning {
    margin-top: 0.875rem;
    font: var(--font-body2);
    color: var(--color-error);
    text-wrap: pretty;
  }

  @media (max-width: 560px) {
    .meters {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
