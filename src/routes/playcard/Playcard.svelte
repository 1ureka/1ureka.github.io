<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  import Tabs from "$lib/components/display/Tabs.svelte";

  import { getTabsContext, type PlaycardTab } from "./logic/tabs.svelte";
  import QuickPanel from "./quick/QuickPanel.svelte";
  import BatchPanel from "./batch/BatchPanel.svelte";
  import HistoryPanel from "./history/HistoryPanel.svelte";

  const tabs = getTabsContext();

  const ITEMS: { id: PlaycardTab; label: string; hint: string }[] = [
    { id: "quick", label: "快速查詢", hint: "1" },
    { id: "batch", label: "批次處理", hint: "2" },
    { id: "history", label: "歷史記錄", hint: "3" },
  ];

  /** 內容自切換方向的那一側進場、往反側退場，來回切才會是兩個不同的動作 */
  const enter = $derived({ x: 28 * tabs.direction, duration: 260, delay: 110, easing: cubicOut });
  const leave = $derived({ x: -28 * tabs.direction, duration: 160, easing: cubicIn });
</script>

<div class="tabbar">
  <Tabs items={ITEMS} current={tabs.current} label="功能分頁" onselect={tabs.handleSelect} />
</div>

<div class="panels">
  {#key tabs.current}
    <section class="panel" class:center={tabs.current === "quick"} in:fly={enter} out:fly={leave}>
      {#if tabs.current === "quick"}
        <QuickPanel />
      {:else if tabs.current === "batch"}
        <BatchPanel />
      {:else}
        <HistoryPanel />
      {/if}
    </section>
  {/key}
</div>

<style>
  .tabbar {
    display: flex;
    justify-content: center;
    padding-top: 1.75rem;
  }

  /* 進場與退場刻意重疊，兩個面板共用同一格才不會在切換當下塌成零高度 */
  .panels {
    display: grid;
    grid-template-areas: "stack";
    padding-bottom: 5rem;
  }

  .panel {
    grid-area: stack;
    min-width: 0;
    padding: 2.5rem 0 3rem;
  }

  .panel.center {
    margin-top: auto;
    margin-bottom: auto;
  }
</style>
