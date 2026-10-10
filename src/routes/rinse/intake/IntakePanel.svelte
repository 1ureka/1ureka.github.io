<script lang="ts">
  import { fly, slide } from "svelte/transition";

  import LinearProgress from "$lib/components/display/LinearProgress.svelte";
  import PanelHead from "$lib/components/display/PanelHead.svelte";

  import { getRinseContext } from "../logic/rinse.svelte";
  import RinseIntake from "./RinseIntake.svelte";
  import LatestCard from "./LatestCard.svelte";

  const rinse = getRinseContext();
</script>

<PanelHead
  size="hero"
  eyebrow="Canvas"
  title="把圖片轉為乾淨的 PNG"
  description="從任何網站把圖片拖到這個分頁。它會被重新畫成一張新的 PNG，只保留像素資料。"
/>

<RinseIntake />

<div class="results">
  <!-- 一次丟很多張時，最新一張會一直換；這條讓人知道還沒結束 -->
  {#if rinse.pending > 0}
    <div class="progress" transition:slide={{ duration: 200 }}>
      <LinearProgress size="sm" color="var(--color-accent)" />
      <span>還有 {rinse.pending} 張處理中</span>
    </div>
  {/if}

  {#if rinse.latest !== null}
    <div in:fly={{ y: 12, duration: 260, delay: 60 }}>
      <LatestCard latest={rinse.latest} />
    </div>
  {/if}
</div>

<style>
  .results {
    max-width: 51.25rem;
    margin: 2.75rem auto 0;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding-bottom: 0.875rem;
    font: var(--font-caption);
    white-space: nowrap;
    color: var(--color-text-muted);

    & > :global(:first-child) {
      flex: 1;
    }
  }
</style>
