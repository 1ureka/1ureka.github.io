<script lang="ts">
  import { fly } from "svelte/transition";

  import { IconCheckFilled, IconDownload } from "$lib/icons";
  import Chip from "$lib/components/display/Chip.svelte";
  import PanelHead from "$lib/components/display/PanelHead.svelte";
  import { tooltip } from "$lib/components/floating/tooltip.core.svelte";

  import { getRinseContext } from "./logic/rinse.svelte";
  import RinseIntake from "./RinseIntake.svelte";
  import RinseList from "./RinseList.svelte";

  const rinse = getRinseContext();
</script>

<!-- 與 Playcard 的分頁列同一個位置。這個工具沒有分頁，那條帶子就給它唯一的設定 -->
<div class="toolbar">
  <Chip
    variant={rinse.autoDownload ? "filled" : "outlined"}
    onclick={rinse.handleToggleAutoDownload}
    aria-pressed={rinse.autoDownload}
    {@attach tooltip({ content: rinse.autoDownload ? "沖洗完會直接存檔" : "沖洗完只留在下面的清單裡" })}
  >
    {#if rinse.autoDownload}
      <IconCheckFilled size={13} />
    {:else}
      <IconDownload size={13} />
    {/if}
    自動下載
  </Chip>
</div>

<div class="panel">
  <PanelHead
    size="hero"
    eyebrow="Canvas"
    title="把圖片轉為乾淨的 PNG"
    description="從任何網站把圖片拖到這個分頁。它會被重新畫成一張新的 PNG，只保留像素資料。"
  />

  <RinseIntake />

  {#if rinse.entries.length > 0}
    <div class="list" in:fly={{ y: 12, duration: 260, delay: 60 }}>
      <RinseList />
    </div>
  {/if}
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.625rem;
    padding-top: 1.75rem;
  }

  .panel {
    padding: 2.5rem 0 5rem;
    margin-top: auto;
    margin-bottom: auto;
  }

  .list {
    max-width: 51.25rem;
    margin: 2.75rem auto 0;
  }
</style>
