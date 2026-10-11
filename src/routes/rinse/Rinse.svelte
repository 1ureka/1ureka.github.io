<script lang="ts">
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  import { IconCheck } from "#lib/icons/index.ts";
  import Tabs from "#lib/components/display/Tabs.svelte";
  import { tooltip } from "#lib/components/floating/tooltip.core.svelte.ts";

  import { getRinseContext } from "./logic/rinse.svelte";
  import { getRinseTabsContext, type RinseTab } from "./logic/tabs.svelte";
  import IntakePanel from "./intake/IntakePanel.svelte";
  import HistoryPanel from "./history/HistoryPanel.svelte";

  const rinse = getRinseContext();
  const tabs = getRinseTabsContext();

  const ITEMS: { id: RinseTab; label: string; hint: string }[] = [
    { id: "intake", label: "沖洗", hint: "1" },
    { id: "history", label: "歷史記錄", hint: "2" },
  ];

  /** 內容自切換方向的那一側進場、往反側退場，來回切才會是兩個不同的動作 */
  const enter = $derived({ x: 28 * tabs.direction, duration: 260, delay: 110, easing: cubicOut });
  const leave = $derived({ x: -28 * tabs.direction, duration: 160, easing: cubicIn });
</script>

<div class="tabbar">
  <Tabs items={ITEMS} current={tabs.current} label="功能分頁" onselect={tabs.handleSelect}>
    <!-- 與分頁同一條帶子，但它是開關不是分頁：按下只切換設定，不換畫面 -->
    {#snippet leading()}
      <button
        type="button"
        class="toggle"
        aria-pressed={rinse.autoDownload}
        onclick={rinse.handleToggleAutoDownload}
        {@attach tooltip({ content: rinse.autoDownload ? "沖洗完會直接存檔" : "沖洗完只留在頁面與歷史裡" })}
      >
        <span class="box">
          {#if rinse.autoDownload}
            <IconCheck size={11} />
          {/if}
        </span>
        自動下載
      </button>
    {/snippet}
  </Tabs>
</div>

<div class="panels">
  {#key tabs.current}
    <section class="panel" class:center={tabs.current === "intake"} in:fly={enter} out:fly={leave}>
      {#if tabs.current === "intake"}
        <IntakePanel />
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

  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.4375rem;
    height: calc(var(--control-height) * 0.8);
    padding: 0 0.875rem 0 0.75rem;
    white-space: nowrap;
    font: var(--font-button);
    color: var(--color-text-muted);
    border-radius: var(--radius-pill);
    transition:
      color 0.18s var(--ease),
      background-color 0.18s var(--ease);

    &:hover {
      color: var(--color-text);
      background-color: var(--color-bg-hover);
    }

    &[aria-pressed="true"] {
      color: var(--color-text);
    }
  }

  .box {
    display: grid;
    place-items: center;
    width: 0.9375rem;
    height: 0.9375rem;
    color: var(--color-accent-text);
    border: var(--border-style);
    border-radius: 5px;
    transition:
      background-color 0.18s var(--ease),
      border-color 0.18s var(--ease);

    .toggle[aria-pressed="true"] & {
      background-color: var(--color-accent);
      border-color: var(--color-accent);
    }
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
